import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AllergyDetails = ({ data, isEditing, onChange }) => {
  const severityOptions = [
    { value: 'mild', label: 'Mild' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'severe', label: 'Severe' },
    { value: 'life-threatening', label: 'Life Threatening' }
  ];

  const allergenTypeOptions = [
    { value: 'food', label: 'Food' },
    { value: 'medication', label: 'Medication' },
    { value: 'environmental', label: 'Environmental' },
    { value: 'insect', label: 'Insect' },
    { value: 'other', label: 'Other' }
  ];

  const handleInputChange = (field, value) => {
    onChange(field, value);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'mild':
        return 'text-success bg-success/10';
      case 'moderate':
        return 'text-warning bg-warning/10';
      case 'severe':
        return 'text-error bg-error/10';
      case 'life-threatening':
        return 'text-error bg-error/20 font-semibold';
      default:
        return 'text-muted-foreground bg-muted/30';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Allergy Information</h3>
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Allergen
            </label>
            {isEditing ? (
              <Input
                type="text"
                value={data?.allergen || ''}
                onChange={(e) => handleInputChange('allergen', e?.target?.value)}
                placeholder="Enter allergen name"
              />
            ) : (
              <p className="text-foreground font-medium">{data?.allergen || 'Not specified'}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Allergen Type
              </label>
              {isEditing ? (
                <Select
                  options={allergenTypeOptions}
                  value={data?.allergenType || ''}
                  onChange={(value) => handleInputChange('allergenType', value)}
                  placeholder="Select allergen type"
                />
              ) : (
                <p className="text-foreground capitalize">
                  {allergenTypeOptions?.find(opt => opt?.value === data?.allergenType)?.label || 'Not specified'}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Severity Level
              </label>
              {isEditing ? (
                <Select
                  options={severityOptions}
                  value={data?.severity || ''}
                  onChange={(value) => handleInputChange('severity', value)}
                  placeholder="Select severity"
                />
              ) : (
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(data?.severity)}`}>
                  {severityOptions?.find(opt => opt?.value === data?.severity)?.label || 'Not specified'}
                </span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Reaction Notes
            </label>
            {isEditing ? (
              <textarea
                value={data?.reactionNotes || ''}
                onChange={(e) => handleInputChange('reactionNotes', e?.target?.value)}
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                placeholder="Describe the allergic reaction symptoms..."
              />
            ) : (
              <p className="text-foreground bg-muted/30 px-3 py-2 rounded-lg min-h-[2.5rem]">
                {data?.reactionNotes || 'No reaction notes recorded'}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Onset Date
            </label>
            {isEditing ? (
              <Input
                type="date"
                value={data?.onsetDate || ''}
                onChange={(e) => handleInputChange('onsetDate', e?.target?.value)}
              />
            ) : (
              <p className="text-foreground font-mono">
                {data?.onsetDate ? new Date(data.onsetDate)?.toLocaleDateString('en-US') : 'Not specified'}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Treatment/Management
            </label>
            {isEditing ? (
              <textarea
                value={data?.treatment || ''}
                onChange={(e) => handleInputChange('treatment', e?.target?.value)}
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                placeholder="Treatment or management approach..."
              />
            ) : (
              <p className="text-foreground bg-muted/30 px-3 py-2 rounded-lg min-h-[2.5rem]">
                {data?.treatment || 'No treatment information recorded'}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllergyDetails;