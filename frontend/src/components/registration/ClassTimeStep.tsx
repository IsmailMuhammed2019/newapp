import { useRegistrationStore } from '@/store/registration';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, Info } from 'lucide-react';

const classTimeOptions = [
  { value: 'morning', label: 'Morning (8:00 AM - 12:00 PM)', description: 'Early morning classes for early risers' },
  { value: 'afternoon', label: 'Afternoon (1:00 PM - 5:00 PM)', description: 'Afternoon sessions for balanced schedules' },
  { value: 'evening', label: 'Evening (6:00 PM - 10:00 PM)', description: 'Evening classes for working professionals' },
  { value: 'weekend', label: 'Weekend (Saturday & Sunday)', description: 'Weekend intensive sessions' },
  { value: 'flexible', label: 'Flexible Schedule', description: 'Mix of different time slots based on availability' },
];

export default function ClassTimeStep() {
  const { formData, setFormData } = useRegistrationStore();

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData({ [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Clock className="h-5 w-5 text-green-600" />
          <h3 className="font-semibold text-green-900">Class Schedule Preference</h3>
        </div>
        <p className="text-sm text-green-700">Select your preferred class time to help us schedule your training sessions</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="classTimePreference" className="text-sm font-medium">Preferred Class Time *</Label>
        <Select value={formData.classTimePreference} onValueChange={(value) => handleInputChange('classTimePreference', value)}>
          <SelectTrigger className="h-11">
            <SelectValue placeholder="Select your preferred class time" />
          </SelectTrigger>
          <SelectContent>
            {classTimeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                <div className="flex flex-col">
                  <span className="font-medium">{option.label}</span>
                  <span className="text-xs text-gray-500">{option.description}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Additional Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Info className="h-5 w-5 text-blue-600" />
          <h4 className="font-medium text-blue-900">Schedule Information</h4>
        </div>
        <div className="text-sm text-blue-700 space-y-2">
          <p><strong>Class Duration:</strong> Each session is typically 2-3 hours long</p>
          <p><strong>Frequency:</strong> Classes are held 2-3 times per week</p>
          <p><strong>Flexibility:</strong> We try to accommodate your preferred schedule, but final assignments depend on program availability</p>
          <p><strong>Make-up Classes:</strong> If you miss a class, you can attend make-up sessions or access recorded materials</p>
        </div>
      </div>

      {formData.classTimePreference && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="text-sm text-green-700">
            <p><strong>Selected Preference:</strong> {classTimeOptions.find(opt => opt.value === formData.classTimePreference)?.label}</p>
            <p className="mt-1">{classTimeOptions.find(opt => opt.value === formData.classTimePreference)?.description}</p>
          </div>
        </div>
      )}
    </div>
  );
} 