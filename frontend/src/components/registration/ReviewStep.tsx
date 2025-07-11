import { useRegistrationStore } from '@/store/registration';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { 
  User, 
  School, 
  Award, 
  GraduationCap, 
  Laptop, 
  Shield, 
  CreditCard,
  FileText
} from 'lucide-react';

// Helper functions to get display values
const getGenderLabel = (value: string) => {
  const options = { male: 'Male', female: 'Female', other: 'Other' };
  return options[value as keyof typeof options] || value;
};

const getEducationLabel = (value: string) => {
  const options = {
    secondary: 'Secondary School Certificate',
    diploma: 'Diploma',
    bachelor: "Bachelor's Degree",
    master: "Master's Degree",
    phd: 'PhD/Doctorate',
    other: 'Other'
  };
  return options[value as keyof typeof options] || value;
};

const getNYSCStatusLabel = (value: string) => {
  const options = {
    completed: 'Completed NYSC',
    serving: 'Currently Serving NYSC',
    exempted: 'Exempted from NYSC',
    'not-started': 'Not Started NYSC'
  };
  return options[value as keyof typeof options] || value;
};

const getEmploymentStatusLabel = (value: string) => {
  const options = {
    employed: 'Employed',
    unemployed: 'Unemployed',
    student: 'Student',
    'self-employed': 'Self-Employed',
    retired: 'Retired',
    other: 'Other'
  };
  return options[value as keyof typeof options] || value;
};

const getVerificationModeLabel = (value: string) => {
  const options = {
    nin: 'National Identification Number (NIN)',
    passport: 'International Passport',
    'drivers-license': "Driver's License",
    'voters-card': "Voter's Card"
  };
  return options[value as keyof typeof options] || value;
};

export default function ReviewStep() {
  const { formData } = useRegistrationStore();

  return (
    <div className="space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <FileText className="h-5 w-5 text-green-600" />
          <h3 className="font-semibold text-green-900">Review Your Information</h3>
        </div>
        <p className="text-sm text-green-700">Please review all your information before proceeding to payment</p>
      </div>

      <div className="space-y-6">
        {/* Personal Information */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Personal Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div><strong>Application ID:</strong> <span className="font-mono text-blue-600">{formData.applicationId}</span></div>
            <div><strong>Full Name:</strong> {formData.fullName}</div>
            <div><strong>Email:</strong> {formData.email}</div>
            <div><strong>Phone:</strong> {formData.phone}</div>
            <div><strong>Date of Birth:</strong> {formData.dateOfBirth}</div>
            <div><strong>Gender:</strong> {getGenderLabel(formData.gender)}</div>
            <div><strong>State of Origin:</strong> {formData.stateOfOrigin}</div>
            <div><strong>Current Residence:</strong> {formData.currentResidence}</div>
            <div><strong>Verification:</strong> {getVerificationModeLabel(formData.verificationMode)}</div>
            <div><strong>Verification Number:</strong> {formData.verificationNumber}</div>
          </CardContent>
        </Card>

        {/* Educational Background */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <School className="h-5 w-5" />
              <span>Educational Background</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div><strong>Education Level:</strong> {getEducationLabel(formData.education)}</div>
            <div><strong>Institution:</strong> {formData.institution}</div>
            <div><strong>Graduation Year:</strong> {formData.graduationYear}</div>
            <div><strong>Field of Study:</strong> {formData.fieldOfStudy}</div>
            <div><strong>Documents:</strong> {formData.educationalDocuments.length} file(s)</div>
            {formData.otherQualifications.length > 0 && (
              <div><strong>Other Qualifications:</strong> {formData.otherQualifications.length} qualification(s)</div>
            )}
          </CardContent>
        </Card>

        {/* NYSC Information */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <Award className="h-5 w-5" />
              <span>NYSC Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div><strong>Status:</strong> {getNYSCStatusLabel(formData.nyscStatus)}</div>
            {(formData.nyscStatus === 'completed' || formData.nyscStatus === 'exempted') && (
              <>
                <div><strong>Number:</strong> {formData.nyscNumber}</div>
                <div><strong>Document:</strong> {formData.nyscDocument.length} file(s)</div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Program Preference */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <GraduationCap className="h-5 w-5" />
              <span>Program Preference</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div><strong>Program:</strong> {formData.selectedProgram}</div>
          </CardContent>
        </Card>

        {/* Work Experience & Study Requirements */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <Laptop className="h-5 w-5" />
              <span>Work Experience & Study Requirements</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div><strong>Employment Status:</strong> {getEmploymentStatusLabel(formData.employmentStatus)}</div>
            <div><strong>Has Computer:</strong> {formData.hasComputer === 'yes' ? 'Yes' : 'No'}</div>
            <div><strong>Study Requirements:</strong> {formData.studyRequirements.join(', ')}</div>
          </CardContent>
        </Card>

        {/* Documents Uploaded */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Documents Uploaded</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Verification Documents */}
            {formData.verificationDocument.length > 0 && (
              <div>
                <div className="text-sm font-medium mb-2">Verification Documents ({formData.verificationDocument.length})</div>
                <div className="grid grid-cols-2 gap-3">
                  {formData.verificationDocument.map((file, index) => (
                    <div key={index} className="flex flex-col items-center p-2 bg-gray-50 rounded border">
                      {file.type.startsWith('image/') ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="w-full h-32 object-contain rounded border mb-2"
                        />
                      ) : (
                        <div className="w-full h-32 flex items-center justify-center bg-gray-100 rounded border mb-2">
                          <FileText className="h-8 w-8 text-gray-500" />
                        </div>
                      )}
                      <div className="text-center w-full">
                        <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                        <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Educational Documents */}
            {formData.educationalDocuments.length > 0 && (
              <div>
                <div className="text-sm font-medium mb-2">Educational Documents ({formData.educationalDocuments.length})</div>
                <div className="grid grid-cols-2 gap-3">
                  {formData.educationalDocuments.map((file, index) => (
                    <div key={index} className="flex flex-col items-center p-2 bg-gray-50 rounded border">
                      {file.type.startsWith('image/') ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="w-full h-32 object-contain rounded border mb-2"
                        />
                      ) : (
                        <div className="w-full h-32 flex items-center justify-center bg-gray-100 rounded border mb-2">
                          <FileText className="h-8 w-8 text-gray-500" />
                        </div>
                      )}
                      <div className="text-center w-full">
                        <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                        <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Other Qualifications Documents */}
            {formData.otherQualifications.length > 0 && (
              <div>
                <div className="text-sm font-medium mb-2">Other Qualifications ({formData.otherQualifications.length})</div>
                {formData.otherQualifications.map((qualification, qualIndex) => (
                  <div key={qualIndex} className="mb-4 p-2 bg-blue-50 rounded border">
                    <div className="text-sm font-medium text-blue-900 mb-2">{qualification.name}</div>
                    <div className="grid grid-cols-2 gap-3">
                      {qualification.documents.map((file, index) => (
                        <div key={index} className="flex flex-col items-center p-2 bg-gray-50 rounded border">
                          {file.type.startsWith('image/') ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={URL.createObjectURL(file)}
                              alt={file.name}
                              className="w-full h-32 object-contain rounded border mb-2"
                            />
                          ) : (
                            <div className="w-full h-32 flex items-center justify-center bg-gray-100 rounded border mb-2">
                              <FileText className="h-8 w-8 text-gray-500" />
                            </div>
                          )}
                          <div className="text-center w-full">
                            <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                            <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* NYSC Documents */}
            {formData.nyscDocument.length > 0 && (
              <div>
                <div className="text-sm font-medium mb-2">NYSC Documents ({formData.nyscDocument.length})</div>
                <div className="grid grid-cols-2 gap-3">
                  {formData.nyscDocument.map((file, index) => (
                    <div key={index} className="flex flex-col items-center p-2 bg-gray-50 rounded border">
                      {file.type.startsWith('image/') ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="w-full h-32 object-contain rounded border mb-2"
                        />
                      ) : (
                        <div className="w-full h-32 flex items-center justify-center bg-gray-100 rounded border mb-2">
                          <FileText className="h-8 w-8 text-gray-500" />
                        </div>
                      )}
                      <div className="text-center w-full">
                        <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                        <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {formData.verificationDocument.length === 0 && 
             formData.educationalDocuments.length === 0 && 
             formData.nyscDocument.length === 0 &&
             formData.otherQualifications.length === 0 && (
              <div className="text-sm text-gray-500">No documents uploaded yet</div>
            )}
          </CardContent>
        </Card>

        {/* Payment Summary */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <CreditCard className="h-5 w-5" />
              <span>Payment Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {formData.hasSocialRegistration === 'yes' ? (
              <>
                <div><strong>Payment Method:</strong> Social Registration Number</div>
                <div><strong>Social Registration Number:</strong> {formData.socialRegistrationNumber}</div>
                <div className="text-green-600 font-medium">No payment required</div>
              </>
            ) : (
              <>
                <div><strong>Application Fee:</strong> ₦5,000.00</div>
                <div><strong>Payment Method:</strong> Multiple options available (Paystack, Flutterwave, LeadRemit)</div>
                <div className="text-xs text-gray-500 mt-2">
                  * Payment will be processed after form submission
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 