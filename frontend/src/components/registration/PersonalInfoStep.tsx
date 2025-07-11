import { useRegistrationStore } from '@/store/registration';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { User, Shield, X, FileText, Image as ImageIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

const states = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'Federal Capital Territory',
  'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
  'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers',
  'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
];

const verificationModes = [
  { value: 'nin', label: 'National Identification Number (NIN)' },
  { value: 'passport', label: 'International Passport' },
  { value: 'drivers-license', label: "Driver's License" },
  { value: 'voters-card', label: "Voter's Card" },
];

export default function PersonalInfoStep() {
  const { formData, fileData, setFormData, setFileData } = useRegistrationStore();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Restore preview URL when component mounts
  useEffect(() => {
    if (fileData.verificationDocument.length > 0) {
      const file = fileData.verificationDocument[0];
      if (file && file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      }
    }
  }, [fileData.verificationDocument]);

  // Cleanup preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData({ [field]: value });
  };

  const handleFileChange = (field: keyof typeof fileData, files: File[]) => {
    setFileData({ [field]: files });
    
    // Create preview URL for image files
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      } else {
        setPreviewUrl(null);
      }
    } else {
      setPreviewUrl(null);
    }
  };

  const handleRemoveFile = () => {
    setFileData({ verificationDocument: [] });
    setPreviewUrl(null);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Personal Information Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <User className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold text-blue-900">Personal Information</h3>
        </div>
        <p className="text-sm text-blue-700">Please provide your basic personal details</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-sm font-medium">Full Name *</Label>
          <Input
            id="fullName"
            type="text"
            required
            value={formData.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            placeholder="Enter your full name"
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">Email Address *</Label>
          <Input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="Enter your email address"
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="+2347032378480"
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateOfBirth" className="text-sm font-medium">Date of Birth *</Label>
          <Input
            id="dateOfBirth"
            type="date"
            required
            value={formData.dateOfBirth}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender" className="text-sm font-medium">Gender *</Label>
          <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              {genderOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="stateOfOrigin" className="text-sm font-medium">State of Origin *</Label>
          <Select value={formData.stateOfOrigin} onValueChange={(value) => handleInputChange('stateOfOrigin', value)}>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {states.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="currentResidence" className="text-sm font-medium">Current Residence *</Label>
        <Input
          id="currentResidence"
          type="text"
          required
          value={formData.currentResidence}
          onChange={(e) => handleInputChange('currentResidence', e.target.value)}
          placeholder="Enter your current residence"
          className="h-11"
        />
      </div>

      {/* Identity Verification Section */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Shield className="h-5 w-5 text-yellow-600" />
          <h3 className="font-semibold text-yellow-900">Identity Verification</h3>
        </div>
        <p className="text-sm text-yellow-700 mb-4">Please provide a valid identification document for verification</p>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="verificationMode" className="text-sm font-medium">Verification Method *</Label>
            <Select value={formData.verificationMode} onValueChange={(value) => handleInputChange('verificationMode', value)}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Select verification method" />
              </SelectTrigger>
              <SelectContent>
                {verificationModes.map((mode) => (
                  <SelectItem key={mode.value} value={mode.value}>
                    {mode.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="verificationNumber" className="text-sm font-medium">
              {formData.verificationMode === 'nin' ? 'NIN Number *' : 'Verification Number *'}
            </Label>
            <Input
              id="verificationNumber"
              type="text"
              required
              value={formData.verificationNumber}
              onChange={(e) => handleInputChange('verificationNumber', e.target.value)}
              placeholder={
                formData.verificationMode === 'nin' ? 'Enter your 11-digit NIN' : 'Enter verification number'
              }
              maxLength={11}
              className="h-11"
            />
            <p className="text-xs text-gray-500">
              {formData.verificationMode === 'nin' ? 'Enter your 11-digit National Identification Number' : 'Enter your verification number'}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="verificationDocument" className="text-sm font-medium">Verification Document *</Label>
            <Input
              id="verificationDocument"
              type="file"
              required
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                handleFileChange('verificationDocument', files);
              }}
              className="h-11"
            />
            <p className="text-xs text-gray-500">Upload your NIN slip or verification document (PDF, JPG, PNG)</p>
          </div>

          {/* File Preview Section */}
          {fileData.verificationDocument.length > 0 && (
            <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-gray-900">Uploaded Document</h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRemoveFile}
                  className="h-8 px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <X className="w-4 h-4 mr-1" />
                  Remove
                </Button>
              </div>
              
              <div className="space-y-4">
                {/* Image Preview */}
                {previewUrl ? (
                  <div className="flex justify-center">
                    <div className="relative">
                      <img
                        src={previewUrl}
                        alt="Document preview"
                        className="max-w-full h-auto max-h-80 object-contain rounded-lg border border-gray-200 shadow-sm"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <div className="w-48 h-48 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                      <FileText className="w-16 h-16 text-gray-400" />
                    </div>
                  </div>
                )}
                
                {/* File Information */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    {previewUrl ? (
                      <ImageIcon className="w-5 h-5 text-blue-500" />
                    ) : (
                      <FileText className="w-5 h-5 text-gray-500" />
                    )}
                    <span className="text-sm font-medium text-gray-900 truncate">
                      {fileData.verificationDocument[0]?.name}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
                    <div>
                      <span className="font-medium">Size:</span> {formatFileSize(fileData.verificationDocument[0]?.size || 0)}
                    </div>
                    <div>
                      <span className="font-medium">Type:</span> {fileData.verificationDocument[0]?.type || 'Unknown'}
                    </div>
                  </div>
                  <p className="text-xs text-green-600 font-medium mt-2">
                    ✓ Document uploaded successfully
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 