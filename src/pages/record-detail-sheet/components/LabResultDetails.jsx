import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import FilePreviewModal from './FilePreviewModal';

const LabResultDetails = ({ data, isEditing, onChange }) => {
  const [previewFile, setPreviewFile] = useState(null);

  const handleInputChange = (field, value) => {
    onChange(field, value);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileData = {
        id: Date.now(),
        name: file.name,
        type: file.type,
        size: file.size,
        url: URL.createObjectURL(file),
        uploadDate: new Date().toISOString()
      };
      
      const currentFiles = data.attachedFiles || [];
      handleInputChange('attachedFiles', [...currentFiles, fileData]);
    }
  };

  const removeFile = (fileId) => {
    const currentFiles = data.attachedFiles || [];
    const updatedFiles = currentFiles.filter(file => file.id !== fileId);
    handleInputChange('attachedFiles', updatedFiles);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type) => {
    if (type?.includes('pdf')) return 'FileText';
    if (type?.includes('image')) return 'Image';
    return 'File';
  };

  const isInRange = (value, range) => {
    if (!value || !range) return null;
    const numValue = parseFloat(value);
    const [min, max] = range.split('-').map(v => parseFloat(v.trim()));
    if (numValue < min) return 'low';
    if (numValue > max) return 'high';
    return 'normal';
  };

  const getRangeColor = (status) => {
    switch (status) {
      case 'low':
        return 'text-warning bg-warning/10';
      case 'high':
        return 'text-error bg-error/10';
      case 'normal':
        return 'text-success bg-success/10';
      default:
        return 'text-muted-foreground bg-muted/30';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Lab Test Information</h3>
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Test Name
            </label>
            {isEditing ? (
              <Input
                type="text"
                value={data.testName || ''}
                onChange={(e) => handleInputChange('testName', e.target.value)}
                placeholder="Enter test name"
              />
            ) : (
              <p className="text-foreground font-medium">{data.testName || 'Not specified'}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Test Value
              </label>
              {isEditing ? (
                <Input
                  type="text"
                  value={data.value || ''}
                  onChange={(e) => handleInputChange('value', e.target.value)}
                  placeholder="Enter test value"
                />
              ) : (
                <p className="text-foreground font-mono bg-muted/30 px-3 py-2 rounded-lg">
                  {data.value || 'Not specified'}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Reference Range
              </label>
              {isEditing ? (
                <Input
                  type="text"
                  value={data.referenceRange || ''}
                  onChange={(e) => handleInputChange('referenceRange', e.target.value)}
                  placeholder="e.g., 70-100"
                />
              ) : (
                <p className="text-foreground font-mono bg-muted/30 px-3 py-2 rounded-lg">
                  {data.referenceRange || 'Not specified'}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Status
              </label>
              {!isEditing && (
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getRangeColor(isInRange(data.value, data.referenceRange))}`}>
                  {isInRange(data.value, data.referenceRange) || 'Unknown'}
                </span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Test Date
            </label>
            {isEditing ? (
              <Input
                type="date"
                value={data.testDate || ''}
                onChange={(e) => handleInputChange('testDate', e.target.value)}
              />
            ) : (
              <p className="text-foreground font-mono">
                {data.testDate ? new Date(data.testDate).toLocaleDateString('en-US') : 'Not specified'}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Laboratory/Facility
            </label>
            {isEditing ? (
              <Input
                type="text"
                value={data.laboratory || ''}
                onChange={(e) => handleInputChange('laboratory', e.target.value)}
                placeholder="Enter laboratory name"
              />
            ) : (
              <p className="text-foreground">{data.laboratory || 'Not specified'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Doctor's Notes
            </label>
            {isEditing ? (
              <textarea
                value={data.doctorNotes || ''}
                onChange={(e) => handleInputChange('doctorNotes', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                placeholder="Doctor's interpretation or notes..."
              />
            ) : (
              <p className="text-foreground bg-muted/30 px-3 py-2 rounded-lg min-h-[2.5rem]">
                {data.doctorNotes || 'No doctor\'s notes'}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* File Attachments */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Attached Files</h3>
        
        {isEditing && (
          <div className="mb-4">
            <input
              type="file"
              id="file-upload"
              accept=".pdf,.jpg,.jpeg,.png,.gif"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button
              variant="outline"
              onClick={() => document.getElementById('file-upload').click()}
              iconName="Upload"
              iconPosition="left"
            >
              Upload File
            </Button>
          </div>
        )}

        <div className="grid gap-3">
          {(data.attachedFiles || []).map((file) => (
            <div key={file.id} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon 
                  name={getFileIcon(file.type)} 
                  size={20} 
                  className="text-primary"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{file.name}</p>
                <p className="text-sm text-muted-foreground">
                  {formatFileSize(file.size)} • {new Date(file.uploadDate).toLocaleDateString('en-US')}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setPreviewFile(file)}
                  iconName="Eye"
                  iconSize={16}
                >
                  Preview
                </Button>
                
                {isEditing && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(file.id)}
                    iconName="Trash2"
                    iconSize={16}
                    className="text-error hover:text-error"
                  >
                    Remove
                  </Button>
                )}
              </div>
            </div>
          ))}
          
          {(!data.attachedFiles || data.attachedFiles.length === 0) && (
            <div className="text-center py-8 text-muted-foreground">
              <Icon name="FileX" size={48} className="mx-auto mb-2 opacity-50" />
              <p>No files attached</p>
            </div>
          )}
        </div>
      </div>

      {previewFile && (
        <FilePreviewModal
          file={previewFile}
          isOpen={!!previewFile}
          onClose={() => setPreviewFile(null)}
        />
      )}
    </div>
  );
};

export default LabResultDetails;