import React, { useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilePreviewModal = ({ file, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleBackdropClick = (e) => {
    if (e?.target === e?.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e?.key === 'Escape') {
      onClose();
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = file?.url;
    link.download = file?.name;
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const isImage = file?.type?.includes('image');
  const isPDF = file?.type?.includes('pdf');

  if (!isOpen || !file) return null;

  return (
    <div 
      className="fixed inset-0 z-300 bg-black/90 backdrop-blur-sm"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="file-preview-title"
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 glass-morphic border-b border-white/10 safe-area-top">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon 
                name={isImage ? 'Image' : isPDF ? 'FileText' : 'File'} 
                size={20} 
                className="text-primary"
              />
            </div>
            <div>
              <h2 
                id="file-preview-title"
                className="font-semibold text-white truncate max-w-[200px] md:max-w-none"
              >
                {file?.name}
              </h2>
              <p className="text-sm text-white/70">
                {formatFileSize(file?.size)} • {new Date(file.uploadDate)?.toLocaleDateString('en-US')}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDownload}
              iconName="Download"
              iconSize={16}
              className="text-white hover:bg-white/10"
            >
              Download
            </Button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors duration-150 text-white"
              aria-label="Close preview"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="absolute inset-0 pt-20 pb-4 px-4 flex items-center justify-center">
        <div className="w-full h-full max-w-4xl max-h-full">
          {isImage ? (
            <div className="w-full h-full flex items-center justify-center">
              <img
                src={file?.url}
                alt={file?.name}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                onError={(e) => {
                  e.target.src = '/assets/images/no_image.png';
                }}
              />
            </div>
          ) : isPDF ? (
            <div className="w-full h-full bg-white rounded-lg shadow-2xl overflow-hidden">
              <iframe
                src={file?.url}
                title={file?.name}
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-white">
              <Icon name="File" size={64} className="mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">Preview Not Available</h3>
              <p className="text-white/70 text-center mb-6">
                This file type cannot be previewed in the browser.
                <br />
                Click download to view the file.
              </p>
              <Button
                variant="default"
                onClick={handleDownload}
                iconName="Download"
                iconPosition="left"
              >
                Download File
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilePreviewModal;