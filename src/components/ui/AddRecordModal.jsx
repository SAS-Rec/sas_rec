import React, { useState } from 'react';
import Icon from '../AppIcon';
import Input from './Input';
import Button from './Button';


const AddRecordModal = ({ 
  isOpen = false, 
  onClose, 
  recordType = 'medical_record',
  className = ''
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: new Date()?.toISOString()?.split('T')?.[0],
    category: '',
    provider: '',
    dosage: '',
    frequency: '',
    notes: ''
  });
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileSelect = (event) => {
    const selectedFiles = Array.from(event?.target?.files);
    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev?.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);
    
    try {
      // TODO: Implement actual submission logic
      console.log('Submitting record:', { formData, files });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Reset form and close modal
      setFormData({
        title: '',
        description: '',
        date: new Date()?.toISOString()?.split('T')?.[0],
        category: '',
        provider: '',
        dosage: '',
        frequency: '',
        notes: ''
      });
      setFiles([]);
      onClose();
    } catch (error) {
      console.error('Error submitting record:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRecordTypeConfig = () => {
    switch (recordType) {
      case 'medical_record':
        return {
          title: 'Add Medical Record',
          icon: 'FileText',
          fields: ['title', 'description', 'date', 'category', 'provider', 'notes'],
          categories: ['Lab Results', 'Imaging', 'Consultation', 'Surgery', 'Other']
        };
      case 'medication':
        return {
          title: 'Add Medication',
          icon: 'Pill',
          fields: ['title', 'dosage', 'frequency', 'date', 'provider', 'notes'],
          categories: ['Prescription', 'Over-the-Counter', 'Supplement', 'Injection']
        };
      case 'document':
        return {
          title: 'Upload Document',
          icon: 'Upload',
          fields: ['title', 'description', 'date', 'category'],
          categories: ['Insurance', 'Prescription', 'Lab Report', 'Medical History', 'Other']
        };
      default:
        return {
          title: 'Add Record',
          icon: 'Plus',
          fields: ['title', 'description', 'date', 'notes'],
          categories: []
        };
    }
  };

  const config = getRecordTypeConfig();

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-200 ${className}`}
      onClick={(e) => e?.target === e?.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-record-title"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" />
      {/* Modal */}
      <div className="absolute inset-x-4 top-8 bottom-8 md:inset-x-8 lg:max-w-2xl lg:mx-auto animate-slide-up">
        <div className="glass-morphic rounded-2xl border border-white/20 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon 
                  name={config?.icon} 
                  size={20} 
                  color="var(--color-primary)"
                />
              </div>
              <h2 
                id="add-record-title"
                className="text-lg font-semibold text-foreground"
              >
                {config?.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors duration-150"
              aria-label="Close"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title Field */}
              {config?.fields?.includes('title') && (
                <Input
                  label="Title"
                  required
                  value={formData?.title}
                  onChange={(e) => handleInputChange('title', e?.target?.value)}
                  placeholder="Enter record title"
                />
              )}

              {/* Category Field */}
              {config?.fields?.includes('category') && config?.categories?.length > 0 && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Category <span className="text-destructive">*</span>
                  </label>
                  <select
                    required
                    value={formData?.category}
                    onChange={(e) => handleInputChange('category', e?.target?.value)}
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="">Select category</option>
                    {config?.categories?.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Date Field */}
              {config?.fields?.includes('date') && (
                <Input
                  type="date"
                  label="Date"
                  required
                  value={formData?.date}
                  onChange={(e) => handleInputChange('date', e?.target?.value)}
                />
              )}

              {/* Provider Field */}
              {config?.fields?.includes('provider') && (
                <Input
                  label="Provider/Doctor"
                  value={formData?.provider}
                  onChange={(e) => handleInputChange('provider', e?.target?.value)}
                  placeholder="Enter healthcare provider name"
                />
              )}

              {/* Medication Specific Fields */}
              {config?.fields?.includes('dosage') && (
                <Input
                  label="Dosage"
                  value={formData?.dosage}
                  onChange={(e) => handleInputChange('dosage', e?.target?.value)}
                  placeholder="e.g. 500mg, 2 tablets"
                />
              )}

              {config?.fields?.includes('frequency') && (
                <Input
                  label="Frequency"
                  value={formData?.frequency}
                  onChange={(e) => handleInputChange('frequency', e?.target?.value)}
                  placeholder="e.g. Once daily, Twice a day"
                />
              )}

              {/* Description Field */}
              {config?.fields?.includes('description') && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Description
                  </label>
                  <textarea
                    value={formData?.description}
                    onChange={(e) => handleInputChange('description', e?.target?.value)}
                    placeholder="Enter description or details"
                    rows={3}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
              )}

              {/* File Upload */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Attachments
                </label>
                <div
                  className="border-2 border-dashed border-input rounded-lg p-4 hover:border-primary/50 transition-colors duration-150"
                  onClick={() => document.getElementById('file-upload')?.click()}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e?.key === 'Enter' || e?.key === ' ') {
                      document.getElementById('file-upload')?.click();
                    }
                  }}
                >
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <div className="text-center">
                    <Icon name="Upload" size={24} className="mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-foreground">Click to upload files</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PDF, DOC, JPG, PNG up to 10MB each
                    </p>
                  </div>
                </div>

                {/* File List */}
                {files?.length > 0 && (
                  <div className="space-y-2 mt-3">
                    {files?.map((file, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 bg-muted/20 rounded-md">
                        <Icon name="File" size={16} className="text-primary flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {file?.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {(file?.size / 1024 / 1024)?.toFixed(2)} MB
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="w-6 h-6 rounded-full bg-destructive/10 hover:bg-destructive/20 flex items-center justify-center transition-colors duration-150"
                          aria-label="Remove file"
                        >
                          <Icon name="X" size={12} className="text-destructive" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Notes Field */}
              {config?.fields?.includes('notes') && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Additional Notes
                  </label>
                  <textarea
                    value={formData?.notes}
                    onChange={(e) => handleInputChange('notes', e?.target?.value)}
                    placeholder="Any additional information..."
                    rows={3}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
              )}
            </form>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-4 border-t border-white/10 flex-shrink-0">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              loading={isSubmitting}
              iconName="Save"
            >
              {isSubmitting ? 'Saving...' : 'Save Record'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRecordModal;