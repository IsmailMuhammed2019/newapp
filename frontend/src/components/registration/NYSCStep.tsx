import { useRegistrationStore } from '@/store/registration';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Award, Calendar, FileText, X, Image as ImageIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

const nyscStatusOptions = [
  { value: 'completed', label: 'Completed NYSC' },
  { value: 'serving', label: 'Currently Serving NYSC' },
  { value: 'exempted', label: 'Exempted from NYSC' },
  { value: 'not-started', label: 'Not Started NYSC' },
];

export default function NYSCStep() {
  const { formData, fileData, setFormData, setFileData } = useRegistrationStore();
  const [nyscPreviewUrl, setNyscPreviewUrl] = useState<string | null>(null);

  // Restore preview URL when component mounts
  useEffect(() => {
    if (fileData.nyscDocument.length > 0) {
      const file = fileData.nyscDocument[0];
      if (file && file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        setNyscPreviewUrl(url);
      }
    }
  }, [fileData.nyscDocument]);

  // Cleanup preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (nyscPreviewUrl) {
        URL.revokeObjectURL(nyscPreviewUrl);
      }
    };
  }, [nyscPreviewUrl]);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData({ [field]: value });
  };

  const handleFileChange = (field: keyof typeof fileData, files: File[]) => {
    setFileData({ [field]: files });
    
    // Create preview URL for image files
    if (field === 'nyscDocument' && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        setNyscPreviewUrl(url);
      } else {
        setNyscPreviewUrl(null);
      }
    } else {
      setNyscPreviewUrl(null);
    }
  };

  const handleRemoveFile = () => {
    setFileData({ nyscDocument: [] });
    setNyscPreviewUrl(null);
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

          {/* NYSC Document Preview */}
          {fileData.nyscDocument.length > 0 && (
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
                {nyscPreviewUrl ? (
                  <div className="flex justify-center">
                    <div className="relative">
                      <img
                        src={nyscPreviewUrl}
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
                    {nyscPreviewUrl ? (
                      <ImageIcon className="w-5 h-5 text-blue-500" />
                    ) : (
                      <FileText className="w-5 h-5 text-gray-500" />
                    )}
                    <span className="text-sm font-medium text-gray-900 truncate">
                      {fileData.nyscDocument[0]?.name}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
                    <div>
                      <span className="font-medium">Size:</span> {formatFileSize(fileData.nyscDocument[0]?.size || 0)}
                    </div>
                    <div>
                      <span className="font-medium">Type:</span> {fileData.nyscDocument[0]?.type || 'Unknown'}
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