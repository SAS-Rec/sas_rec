import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const MedicationDetails = ({ data, isEditing, onChange }) => {
  const frequencyOptions = [
    { value: 'once-daily', label: 'Once Daily' },
    { value: 'twice-daily', label: 'Twice Daily' },
    { value: 'three-times-daily', label: 'Three Times Daily' },
    { value: 'four-times-daily', label: 'Four Times Daily' },
    { value: 'as-needed', label: 'As Needed' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' }
  ];

  const mealPreferenceOptions = [
    { value: 'before-meals', label: 'Before Meals' },
    { value: 'after-meals', label: 'After Meals' },
    { value: 'with-meals', label: 'With Meals' },
    { value: 'empty-stomach', label: 'Empty Stomach' },
    { value: 'no-preference', label: 'No Preference' }
  ];

  const handleInputChange = (field, value) => {
    onChange(field, value);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Medication Information</h3>
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Medication Name
            </label>
            {isEditing ? (
              <Input
                type="text"
                value={data?.name || ''}
                onChange={(e) => handleInputChange('name', e?.target?.value)}
                placeholder="Enter medication name"
              />
            ) : (
              <p className="text-foreground font-medium">{data?.name || 'Not specified'}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Dosage
              </label>
              {isEditing ? (
                <Input
                  type="text"
                  value={data?.dosage || ''}
                  onChange={(e) => handleInputChange('dosage', e?.target?.value)}
                  placeholder="e.g., 10mg, 1 tablet"
                />
              ) : (
                <p className="text-foreground font-mono bg-muted/30 px-3 py-2 rounded-lg">
                  {data?.dosage || 'Not specified'}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Frequency
              </label>
              {isEditing ? (
                <Select
                  options={frequencyOptions}
                  value={data?.frequency || ''}
                  onChange={(value) => handleInputChange('frequency', value)}
                  placeholder="Select frequency"
                />
              ) : (
                <p className="text-foreground">
                  {frequencyOptions?.find(opt => opt?.value === data?.frequency)?.label || 'Not specified'}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Prescribing Doctor
            </label>
            {isEditing ? (
              <Input
                type="text"
                value={data?.prescribingDoctor || ''}
                onChange={(e) => handleInputChange('prescribingDoctor', e?.target?.value)}
                placeholder="Enter doctor's name"
              />
            ) : (
              <p className="text-foreground">{data?.prescribingDoctor || 'Not specified'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Meal Preference
            </label>
            {isEditing ? (
              <Select
                options={mealPreferenceOptions}
                value={data?.mealPreference || ''}
                onChange={(value) => handleInputChange('mealPreference', value)}
                placeholder="Select meal preference"
              />
            ) : (
              <p className="text-foreground">
                {mealPreferenceOptions?.find(opt => opt?.value === data?.mealPreference)?.label || 'Not specified'}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Start Date
            </label>
            {isEditing ? (
              <Input
                type="date"
                value={data?.startDate || ''}
                onChange={(e) => handleInputChange('startDate', e?.target?.value)}
              />
            ) : (
              <p className="text-foreground font-mono">
                {data?.startDate ? new Date(data.startDate)?.toLocaleDateString('en-US') : 'Not specified'}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Notes
            </label>
            {isEditing ? (
              <textarea
                value={data?.notes || ''}
                onChange={(e) => handleInputChange('notes', e?.target?.value)}
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                placeholder="Additional notes about this medication..."
              />
            ) : (
              <p className="text-foreground bg-muted/30 px-3 py-2 rounded-lg min-h-[2.5rem]">
                {data?.notes || 'No additional notes'}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicationDetails;