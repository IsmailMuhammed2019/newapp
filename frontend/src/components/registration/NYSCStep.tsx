import { useRegistrationStore } from '@/store/registration';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Award, Calendar, FileText } from 'lucide-react';

const nyscStatusOptions = [
  { value: 'completed', label: 'Completed NYSC' },
  { value: 'serving', label: 'Currently Serving NYSC' },
  { value: 'exempted', label: 'Exempted from NYSC' },
  { value: 'not-started', label: 'Not Started NYSC' },
];

export default function NYSCStep() {
  const { formData, setFormData } = useRegistrationStore();

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData({ [field]: value });
  };

  const handleFileChange = (field: keyof typeof formData, files: File[]) => {
    setFormData({ [field]: files });
  };

  return (
    <div className="space-y-6">
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Award className="h-5 w-5 text-orange-600" />
          <h3 className="font-semibold text-orange-900">NYSC Information</h3>
        </div>
        <p className="text-sm text-orange-700">Please provide your NYSC status and related information</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="nyscStatus" className="text-sm font-medium">NYSC Status *</Label>
        <Select value={formData.nyscStatus} onValueChange={(value) => handleInputChange('nyscStatus', value)}>
          <SelectTrigger className="h-11">
            <SelectValue placeholder="Select your NYSC status" />
          </SelectTrigger>
          <SelectContent>
            {nyscStatusOptions.map((status) => (
              <SelectItem key={status.value} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {(formData.nyscStatus === 'completed' || formData.nyscStatus === 'exempted') && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-4">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <h4 className="font-medium text-blue-900">
              {formData.nyscStatus === 'completed' ? 'NYSC Certificate Details' : 'NYSC Exemption Details'}
            </h4>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="nyscNumber" className="text-sm font-medium">
              {formData.nyscStatus === 'completed' ? 'NYSC Certificate Number *' : 'Exemption Letter Number *'}
            </Label>
            <Input
              id="nyscNumber"
              type="text"
              required
              value={formData.nyscNumber}
              onChange={(e) => handleInputChange('nyscNumber', e.target.value)}
              placeholder={formData.nyscStatus === 'completed' ? 'Enter NYSC certificate number' : 'Enter exemption letter number'}
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nyscDocument" className="text-sm font-medium">
              {formData.nyscStatus === 'completed' ? 'NYSC Certificate' : 'Exemption Letter'} *
            </Label>
            <Input
              id="nyscDocument"
              type="file"
              required
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                handleFileChange('nyscDocument', files);
              }}
              className="h-11"
            />
            <p className="text-xs text-gray-500">
              Upload your {formData.nyscStatus === 'completed' ? 'NYSC certificate' : 'exemption letter'} document (single file only)
            </p>
          </div>
        </div>
      )}

      {formData.nyscStatus === 'serving' && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-yellow-600" />
            <h4 className="font-medium text-yellow-900">Currently Serving NYSC</h4>
          </div>
          <p className="text-sm text-yellow-700 mt-2">
            You can update your NYSC certificate information once you complete your service.
          </p>
        </div>
      )}

      {formData.nyscStatus === 'not-started' && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-600" />
            <h4 className="font-medium text-gray-900">NYSC Not Started</h4>
          </div>
          <p className="text-sm text-gray-700 mt-2">
            You can update your NYSC information once you begin or complete your service.
          </p>
        </div>
      )}
    </div>
  );
} 