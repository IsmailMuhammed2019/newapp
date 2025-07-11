
import { useRegistrationStore } from '@/store/registration';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { School, FileText, Plus, X } from 'lucide-react';

const educationLevels = [
  { value: 'secondary', label: 'Secondary School Certificate' },
  { value: 'diploma', label: 'Diploma' },
  { value: 'bachelor', label: "Bachelor's Degree" },
  { value: 'master', label: "Master's Degree" },
  { value: 'phd', label: 'PhD/Doctorate' },
  { value: 'other', label: 'Other' },
];

const fieldOfStudyOptions = [
  { value: 'computer-science', label: 'Computer Science' },
  { value: 'information-technology', label: 'Information Technology' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'business', label: 'Business Administration' },
  { value: 'economics', label: 'Economics' },
  { value: 'law', label: 'Law' },
  { value: 'medicine', label: 'Medicine' },
  { value: 'arts', label: 'Arts & Humanities' },
  { value: 'science', label: 'Natural Sciences' },
  { value: 'other', label: 'Other' },
];

export default function EducationStep() {
  const { formData, setFormData } = useRegistrationStore();

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData({ [field]: value });
  };

  const handleFileChange = (field: keyof typeof formData, files: File[]) => {
    setFormData({ [field]: files });
  };

  const addOtherQualification = () => {
    const newQualification = { name: '', documents: [] };
    setFormData({
      otherQualifications: [...formData.otherQualifications, newQualification]
    });
  };

  const removeOtherQualification = (index: number) => {
    const updatedQualifications = formData.otherQualifications.filter((_, i) => i !== index);
    setFormData({ otherQualifications: updatedQualifications });
  };

  const updateOtherQualification = (index: number, field: 'name' | 'documents', value: string | File[]) => {
    const updatedQualifications = [...formData.otherQualifications];
    updatedQualifications[index] = {
      ...updatedQualifications[index],
      [field]: value
    };
    setFormData({ otherQualifications: updatedQualifications });
  };

  return (
    <div className="space-y-6">
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <School className="h-5 w-5 text-purple-600" />
          <h3 className="font-semibold text-purple-900">Educational Background</h3>
        </div>
        <p className="text-sm text-purple-700">Tell us about your educational qualifications</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="education" className="text-sm font-medium">Highest Education Level *</Label>
          <Select value={formData.education} onValueChange={(value) => handleInputChange('education', value)}>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Select education level" />
            </SelectTrigger>
            <SelectContent>
              {educationLevels.map((level) => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="graduationYear" className="text-sm font-medium">Graduation Year *</Label>
          <Input
            id="graduationYear"
            type="number"
            required
            value={formData.graduationYear}
            onChange={(e) => handleInputChange('graduationYear', e.target.value)}
            placeholder="e.g., 2023"
            min="1950"
            max={new Date().getFullYear()}
            className="h-11"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="institution" className="text-sm font-medium">Institution Name *</Label>
        <Input
          id="institution"
          type="text"
          required
          value={formData.institution}
          onChange={(e) => handleInputChange('institution', e.target.value)}
          placeholder="Enter your institution name"
          className="h-11"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="fieldOfStudy" className="text-sm font-medium">Field of Study *</Label>
        <Select value={formData.fieldOfStudy} onValueChange={(value) => handleInputChange('fieldOfStudy', value)}>
          <SelectTrigger className="h-11">
            <SelectValue placeholder="Select field of study" />
          </SelectTrigger>
          <SelectContent>
            {fieldOfStudyOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="educationalDocuments" className="text-sm font-medium">Educational Documents *</Label>
        <Input
          id="educationalDocuments"
          type="file"
          required
          multiple
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => {
            const files = Array.from(e.target.files || []);
            handleFileChange('educationalDocuments', files);
          }}
          className="h-11"
        />
        <p className="text-xs text-gray-500">Upload your certificates, transcripts, or other educational documents (multiple files allowed)</p>
      </div>

      {/* Other Qualifications Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Other Qualifications</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addOtherQualification}
            className="flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Qualification</span>
          </Button>
        </div>

        {formData.otherQualifications.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <FileText className="h-12 w-12 mx-auto mb-2 text-gray-300" />
            <p>No other qualifications added yet</p>
            <p className="text-sm">Click &quot;Add Qualification&quot; to include additional certificates or qualifications</p>
          </div>
        )}

        {formData.otherQualifications.map((qualification, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-900">Qualification {index + 1}</h4>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeOtherQualification(index)}
                className="text-red-600 hover:text-red-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Qualification Name *</Label>
              <Input
                type="text"
                value={qualification.name}
                onChange={(e) => updateOtherQualification(index, 'name', e.target.value)}
                placeholder="e.g., Professional Certification, Diploma, etc."
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Qualification Documents *</Label>
              <Input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  updateOtherQualification(index, 'documents', files);
                }}
                className="h-11"
              />
              <p className="text-xs text-gray-500">Upload documents for this qualification (multiple files allowed)</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 