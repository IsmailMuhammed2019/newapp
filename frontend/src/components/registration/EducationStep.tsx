
import { useRegistrationStore } from '@/store/registration';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { School, FileText, Plus, X } from 'lucide-react';
import { useState, useEffect } from 'react';

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
  const { formData, fileData, setFormData, setFileData } = useRegistrationStore();
  const [educationalPreviewUrls, setEducationalPreviewUrls] = useState<string[]>([]);

  // Restore preview URLs when component mounts
  useEffect(() => {
    if (fileData.educationalDocuments.length > 0) {
      const urls = fileData.educationalDocuments.map(file => {
        if (file.type.startsWith('image/')) {
          return URL.createObjectURL(file);
        }
        return null;
      }).filter((url): url is string => url !== null);
      setEducationalPreviewUrls(urls);
    }
  }, [fileData.educationalDocuments]);

  // Cleanup preview URLs when component unmounts
  useEffect(() => {
    return () => {
      educationalPreviewUrls.forEach(url => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, [educationalPreviewUrls]);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData({ [field]: value });
  };

  const handleFileChange = (field: keyof typeof fileData, files: File[]) => {
    setFileData({ [field]: files });
    
    // Create preview URLs for image files
    if (field === 'educationalDocuments') {
      const urls = files.map(file => {
        if (file.type.startsWith('image/')) {
          return URL.createObjectURL(file);
        }
        return null;
      }).filter((url): url is string => url !== null);
      setEducationalPreviewUrls(urls);
    }
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

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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

      {/* Educational Documents Preview */}
      {fileData.educationalDocuments.length > 0 && (
        <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-gray-900">Uploaded Educational Documents</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setFileData({ educationalDocuments: [] });
                setEducationalPreviewUrls([]);
              }}
              className="h-8 px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <X className="w-4 h-4 mr-1" />
              Remove All
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {fileData.educationalDocuments.map((file, index) => (
              <div key={index} className="flex flex-col items-center p-3 bg-gray-50 rounded-lg border">
                {educationalPreviewUrls[index] ? (
                  <img
                    src={educationalPreviewUrls[index]!}
                    alt={file.name}
                    className="w-full h-32 object-contain rounded border mb-2"
                  />
                ) : (
                  <div className="w-full h-32 flex items-center justify-center bg-gray-100 rounded border mb-2">
                    <FileText className="w-8 h-8 text-gray-500" />
                  </div>
                )}
                
                <div className="text-center w-full">
                  <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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

            {/* Qualification Documents Preview */}
            {qualification.documents.length > 0 && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-sm font-medium mb-2">Uploaded Documents ({qualification.documents.length})</div>
                <div className="grid grid-cols-2 gap-3">
                  {qualification.documents.map((file, fileIndex) => (
                    <div key={fileIndex} className="flex flex-col items-center p-2 bg-white rounded border">
                      {file.type.startsWith('image/') ? (
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="w-full h-24 object-contain rounded border mb-1"
                        />
                      ) : (
                        <div className="w-full h-24 flex items-center justify-center bg-gray-100 rounded border mb-1">
                          <FileText className="w-6 h-6 text-gray-500" />
                        </div>
                      )}
                      <div className="text-center w-full">
                        <p className="text-xs font-medium text-gray-900 truncate">{file.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 