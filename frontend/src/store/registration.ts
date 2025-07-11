import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface RegistrationFormData {
  // Personal Information
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  stateOfOrigin: string;
  currentResidence: string;
  
  // Identity Verification
  verificationMode: string;
  verificationNumber: string;
  verificationDocument: File[];
  
  // Account Security
  password: string;
  confirmPassword: string;
  
  // Educational Background
  education: string;
  graduationYear: string;
  institution: string;
  fieldOfStudy: string;
  educationalDocuments: File[];
  otherQualifications: Array<{
    name: string;
    documents: File[];
  }>;
  
  // NYSC Information
  nyscStatus: string;
  nyscNumber: string;
  nyscDocument: File[];
  
  // Program Selection
  selectedProgram: string;
  
  // Financial Status
  employmentStatus: string;
  hasComputer: string;
  studyRequirements: string[];
  
  // Payment
  hasSocialRegistration: string;
  socialRegistrationNumber: string;
  
  // System
  applicationId: string;
  lastSaved: string;
}

interface SavedFormData {
  formData: RegistrationFormData;
  currentStep: number;
}

interface RegistrationStore {
  formData: RegistrationFormData;
  currentStep: number;
  hasSavedProgress: boolean;
  setFormData: (data: Partial<RegistrationFormData>) => void;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetForm: () => void;
  clearSavedProgress: () => void;
  checkSavedProgress: () => boolean;
  loadSavedProgress: () => void;
}

const initialFormData: RegistrationFormData = {
  fullName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  gender: '',
  stateOfOrigin: '',
  currentResidence: '',
  verificationMode: '',
  verificationNumber: '',
  verificationDocument: [],
  password: '',
  confirmPassword: '',
  education: '',
  graduationYear: '',
  institution: '',
  fieldOfStudy: '',
  educationalDocuments: [],
  otherQualifications: [],
  nyscStatus: '',
  nyscNumber: '',
  nyscDocument: [],
  selectedProgram: '',
  employmentStatus: '',
  hasComputer: '',
  studyRequirements: [],
  hasSocialRegistration: '',
  socialRegistrationNumber: '',
  applicationId: `APP-${new Date().getFullYear()}-${Math.floor(Math.random() * 90000) + 10000}`,
  lastSaved: '',
};

// Custom storage that handles File objects
const customStorage = {
  getItem: (name: string) => {
    const item = localStorage.getItem(name);
    if (!item) return null;
    
    try {
      const parsed = JSON.parse(item);
      // Convert File objects back to empty arrays since File objects can't be serialized
      if (parsed.state?.formData) {
        parsed.state.formData.verificationDocument = [];
        parsed.state.formData.educationalDocuments = [];
        parsed.state.formData.nyscDocument = [];
        parsed.state.formData.otherQualifications = parsed.state.formData.otherQualifications.map((qual: { name: string; documents: File[] }) => ({
          ...qual,
          documents: []
        }));
      }
      return item;
    } catch {
      return null;
    }
  },
  setItem: (name: string, value: string) => {
    try {
      const parsed = JSON.parse(value);
      // Remove File objects before saving since they can't be serialized
      if (parsed.state?.formData) {
        parsed.state.formData.verificationDocument = [];
        parsed.state.formData.educationalDocuments = [];
        parsed.state.formData.nyscDocument = [];
        parsed.state.formData.otherQualifications = parsed.state.formData.otherQualifications.map((qual: { name: string; documents: File[] }) => ({
          ...qual,
          documents: []
        }));
      }
      localStorage.setItem(name, JSON.stringify(parsed));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },
  removeItem: (name: string) => localStorage.removeItem(name),
};

export const useRegistrationStore = create<RegistrationStore>()(
  persist(
    (set) => ({
      formData: initialFormData,
      currentStep: 0,
      hasSavedProgress: false,
      
      setFormData: (data) => set((state) => ({
        formData: { 
          ...state.formData, 
          ...data,
          lastSaved: new Date().toISOString()
        }
      })),
      
      setCurrentStep: (step) => set({ currentStep: step }),
      
      nextStep: () => set((state) => ({
        currentStep: Math.min(state.currentStep + 1, 4)
      })),
      
      prevStep: () => set((state) => ({
        currentStep: Math.max(state.currentStep - 1, 0)
      })),
      
      resetForm: () => set({
        formData: {
          ...initialFormData,
          applicationId: `APP-${new Date().getFullYear()}-${Math.floor(Math.random() * 90000) + 10000}`,
        },
        currentStep: 0,
        hasSavedProgress: false
      }),
      
      clearSavedProgress: () => {
        localStorage.removeItem('registration-store');
        set({
          formData: {
            ...initialFormData,
            applicationId: `APP-${new Date().getFullYear()}-${Math.floor(Math.random() * 90000) + 10000}`,
          },
          currentStep: 0,
          hasSavedProgress: false
        });
      },
      
      checkSavedProgress: () => {
        const saved = localStorage.getItem('registration-store');
        if (saved) {
          try {
            const parsed: { state?: SavedFormData } = JSON.parse(saved);
            const hasData = parsed.state?.formData && (
              parsed.state.formData.fullName ||
              parsed.state.formData.email ||
              parsed.state.formData.phone ||
              parsed.state.formData.selectedProgram
            );
            set({ hasSavedProgress: !!hasData });
            return !!hasData;
          } catch {
            return false;
          }
        }
        return false;
      },
      
      loadSavedProgress: () => {
        const saved = localStorage.getItem('registration-store');
        if (saved) {
          try {
            const parsed: { state?: SavedFormData } = JSON.parse(saved);
            if (parsed.state?.formData) {
              set({
                formData: {
                  ...parsed.state.formData,
                  verificationDocument: [],
                  educationalDocuments: [],
                  nyscDocument: [],
                  otherQualifications: parsed.state.formData.otherQualifications?.map((qual: { name: string; documents: File[] }) => ({
                    ...qual,
                    documents: []
                  })) || []
                },
                currentStep: parsed.state.currentStep || 0,
                hasSavedProgress: true
              });
            }
          } catch (error) {
            console.error('Error loading saved progress:', error);
          }
        }
      },
    }),
    {
      name: 'registration-store',
      storage: createJSONStorage(() => customStorage),
      partialize: (state) => ({
        formData: state.formData,
        currentStep: state.currentStep,
      }),
    }
  )
); 