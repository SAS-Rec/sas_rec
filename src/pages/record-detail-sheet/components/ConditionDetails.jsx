import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ConditionDetails = ({ data, isEditing, onChange }) => {
  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'chronic', label: 'Chronic' },
    { value: 'monitoring', label: 'Under Monitoring' }
  ];

  const severityOptions = [
    { value: 'mild', label: 'Mild' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'severe', label: 'Severe' }
  ];

  const handleInputChange = (field, value) => {
    onChange(field, value);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-error bg-error/10';
      case 'resolved':
        return 'text-success bg-success/10';
      case 'chronic':
        return 'text-warning bg-warning/10';
      case 'monitoring':
        return 'text-accent bg-accent/10';
      default:
        return 'text-muted-foreground bg-muted/30';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'mild':
        return 'text-success bg-success/10';
      case 'moderate':
        return 'text-warning bg-warning/10';
      case 'severe':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted/30';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Condition Information</h3>
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Diagnosis/Condition
            </label>
            {isEditing ? (
              <Input
                type="text"
                value={data?.diagnosis || ''}
                onChange={(e) => handleInputChange('diagnosis', e?.target?.value)}
                placeholder="Enter diagnosis or condition name"
              />
            ) : (
              <p className="text-foreground font-medium">{data?.diagnosis || 'Not specified'}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Status
              </label>
              {isEditing ? (
                <Select
                  options={statusOptions}
                  value={data?.status || ''}
                  onChange={(value) => handleInputChange('status', value)}
                  placeholder="Select status"
                />
              ) : (
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(data?.status)}`}>
                  {statusOptions?.find(opt => opt?.value === data?.status)?.label || 'Not specified'}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Severity
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Diagnosis Date
              </label>
              {isEditing ? (
                <Input
                  type="date"
                  value={data?.diagnosisDate || ''}
                  onChange={(e) => handleInputChange('diagnosisDate', e?.target?.value)}
                />
              ) : (
                <p className="text-foreground font-mono">
                  {data?.diagnosisDate ? new Date(data.diagnosisDate)?.toLocaleDateString('en-US') : 'Not specified'}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Resolution Date
              </label>
              {isEditing ? (
                <Input
                  type="date"
                  value={data?.resolutionDate || ''}
                  onChange={(e) => handleInputChange('resolutionDate', e?.target?.value)}
                />
              ) : (
                <p className="text-foreground font-mono">
                  {data?.resolutionDate ? new Date(data.resolutionDate)?.toLocaleDateString('en-US') : 'Ongoing'}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Diagnosing Doctor
            </label>
            {isEditing ? (
              <Input
                type="text"
                value={data?.diagnosingDoctor || ''}
                onChange={(e) => handleInputChange('diagnosingDoctor', e?.target?.value)}
                placeholder="Enter doctor's name"
              />
            ) : (
              <p className="text-foreground">{data?.diagnosingDoctor || 'Not specified'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Treatment Notes
            </label>
            {isEditing ? (
              <textarea
                value={data?.treatmentNotes || ''}
                onChange={(e) => handleInputChange('treatmentNotes', e?.target?.value)}
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                placeholder="Treatment plan, medications, or management notes..."
              />
            ) : (
              <p className="text-foreground bg-muted/30 px-3 py-2 rounded-lg min-h-[2.5rem]">
                {data?.treatmentNotes || 'No treatment notes recorded'}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Related Medications
            </label>
            {isEditing ? (
              <textarea
                value={data?.relatedMedications || ''}
                onChange={(e) => handleInputChange('relatedMedications', e?.target?.value)}
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                placeholder="List medications related to this condition..."
              />
            ) : (
              <p className="text-foreground bg-muted/30 px-3 py-2 rounded-lg min-h-[2.5rem]">
                {data?.relatedMedications || 'No related medications listed'}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConditionDetails;