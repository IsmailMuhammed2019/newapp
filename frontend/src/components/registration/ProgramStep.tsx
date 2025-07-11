import { useRegistrationStore } from '@/store/registration';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GraduationCap, Info, CheckCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';

// Sample programs from the course catalog
const programs = [
  {
    id: 1,
    name: 'Cybersecurity Fundamentals',
    duration_months: 4,
    category: 'Cybersecurity',
    price: '₦150,000'
  },
  {
    id: 2,
    name: 'Data Protection & Privacy',
    duration_months: 3,
    category: 'Data Protection',
    price: '₦120,000'
  },
  {
    id: 3,
    name: 'AI & Machine Learning',
    duration_months: 6,
    category: 'Emerging Tech',
    price: '₦200,000'
  },
  {
    id: 4,
    name: 'Network Security Essentials',
    duration_months: 4,
    category: 'Cybersecurity',
    price: '₦140,000'
  },
  {
    id: 5,
    name: 'Digital Forensics',
    duration_months: 5,
    category: 'Cybersecurity',
    price: '₦180,000'
  },
  {
    id: 6,
    name: 'Cloud Security Architecture',
    duration_months: 4,
    category: 'Cloud Security',
    price: '₦160,000'
  }
];

export default function ProgramStep() {
  const { formData, setFormData } = useRegistrationStore();
  const [loadingPrograms] = useState(false);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData({ [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <GraduationCap className="h-5 w-5 text-indigo-600" />
          <h3 className="font-semibold text-indigo-900">Program Preference</h3>
        </div>
        <p className="text-sm text-indigo-700">Select your preferred program for the application</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Info className="h-5 w-5 text-blue-600" />
          <h4 className="font-medium text-blue-900">Application Process Information</h4>
        </div>
        <div className="text-sm text-blue-700 space-y-2">
          <p><strong>Application Fee:</strong> ₦5,000 (required before proceeding)</p>
          <p><strong>Assessment:</strong> After payment, you&apos;ll take an online assessment</p>
          <p><strong>Assessment:</strong> Successful candidates will be contacted via email for an online assessment</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="selectedProgram" className="text-sm font-medium">Select Program Preference *</Label>
          {loadingPrograms ? (
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Loading programs...</span>
            </div>
          ) : (
            <Select 
              value={formData.selectedProgram?.toString() || ''} 
              onValueChange={(value) => handleInputChange('selectedProgram', value)}
            >
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Select a program preference" />
              </SelectTrigger>
              <SelectContent>
                {programs.map((program) => (
                  <SelectItem key={program.id} value={program.id.toString()}>
                    <div className="flex items-center space-x-2">
                      <span>{program.name}</span>
                      <span className="text-xs text-gray-500">({program.duration_months} months)</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {formData.selectedProgram && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <h4 className="font-medium text-green-900">Program Preference Summary</h4>
            </div>
            <div className="text-sm text-green-700 space-y-1">
              <div><strong>Program:</strong> {programs.find(p => p.id === parseInt(formData.selectedProgram))?.name || 'Not found'}</div>
              <div><strong>Duration:</strong> {programs.find(p => p.id === parseInt(formData.selectedProgram))?.duration_months || 'N/A'} months</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 