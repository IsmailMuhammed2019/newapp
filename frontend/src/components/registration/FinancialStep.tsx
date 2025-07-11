import { useRegistrationStore } from '@/store/registration';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Briefcase, Laptop } from 'lucide-react';

const employmentStatuses = [
  { value: 'employed', label: 'Employed' },
  { value: 'unemployed', label: 'Unemployed' },
  { value: 'student', label: 'Student' },
  { value: 'self-employed', label: 'Self-Employed' },
  { value: 'retired', label: 'Retired' },
  { value: 'other', label: 'Other' },
];

const studyRequirementsOptions = [
  { value: 'laptop', label: 'Laptop/Computer' },
  { value: 'internet', label: 'Internet Access' },
  { value: 'study-materials', label: 'Study Materials' },
  { value: 'financial-support', label: 'Financial Support' },
  { value: 'transportation', label: 'Transportation' },
  { value: 'accommodation', label: 'Accommodation' },
  { value: 'none', label: 'No special requirements' },
];

export default function FinancialStep() {
  const { formData, setFormData } = useRegistrationStore();

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData({ [field]: value });
  };

  const handleStudyRequirementsChange = (requirement: string, checked: boolean) => {
    const currentRequirements = formData.studyRequirements;
    const newRequirements = checked
      ? [...currentRequirements, requirement]
      : currentRequirements.filter(req => req !== requirement);
    
    setFormData({ studyRequirements: newRequirements });
  };

  return (
    <div className="space-y-6">
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Briefcase className="h-5 w-5 text-orange-600" />
          <h3 className="font-semibold text-orange-900">Work Experience & Study Requirements</h3>
        </div>
        <p className="text-sm text-orange-700">Please provide your current employment status and study requirements</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="employmentStatus" className="text-sm font-medium">Employment Status *</Label>
        <Select value={formData.employmentStatus} onValueChange={(value) => handleInputChange('employmentStatus', value)}>
          <SelectTrigger className="h-11">
            <SelectValue placeholder="Select employment status" />
          </SelectTrigger>
          <SelectContent>
            {employmentStatuses.map((status) => (
              <SelectItem key={status.value} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="hasComputer" className="text-sm font-medium">
          Do you have access to a computer? *
        </Label>
        <Select value={formData.hasComputer} onValueChange={(value) => handleInputChange('hasComputer', value)}>
          <SelectTrigger className="h-11">
            <SelectValue placeholder="Select answer" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yes">Yes</SelectItem>
            <SelectItem value="no">No</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="studyRequirements" className="text-sm font-medium">
          What study requirements do you need? (Select all that apply) *
        </Label>
        <div className="space-y-2">
          {studyRequirementsOptions.map((option) => (
            <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.studyRequirements.includes(option.value)}
                onChange={(e) => handleStudyRequirementsChange(option.value, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Laptop className="h-5 w-5 text-blue-600" />
          <h4 className="font-medium text-blue-900">Study Support Information</h4>
        </div>
        <div className="text-sm text-blue-700 space-y-2">
          <p><strong>Computer Access:</strong> We provide computer labs at our campuses for students who need access.</p>
          <p><strong>Internet:</strong> Free Wi-Fi is available at all our training locations.</p>
          <p><strong>Study Materials:</strong> All course materials are provided digitally and in print format.</p>
          <p><strong>Financial Support:</strong> We offer flexible payment plans and scholarship opportunities.</p>
        </div>
      </div>
    </div>
  );
} 