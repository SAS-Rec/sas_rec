import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ShareModal = ({ isOpen, onClose, recordData, recordType }) => {
  const [shareMethod, setShareMethod] = useState('link');
  const [shareLink, setShareLink] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [shareMessage, setShareMessage] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    if (isOpen && recordData) {
      // Generate mock secure share link
      const mockLink = `https://sasrec.app/shared/${recordType}/${recordData?.id}?token=abc123def456`;
      setShareLink(mockLink);
      
      // Generate QR code URL (using a mock QR code service)
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(mockLink)}`;
      setQrCodeUrl(qrUrl);
      
      // Set default share message
      setShareMessage(`I'm sharing my ${recordType} record with you through SAS Rec. You can view it securely using the link below.`);
    }
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, recordData, recordType]);

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

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard?.writeText(shareLink);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleEmailShare = () => {
    if (!emailAddress?.trim()) return;
    
    console.log('Sharing via email:', {
      to: emailAddress,
      subject: `Health Record Shared - ${recordType}`,
      message: shareMessage,
      link: shareLink
    });
    
    // Mock email sending
    alert(`Share link sent to ${emailAddress}`);
    onClose();
  };

  const handleSMSShare = () => {
    const smsBody = `${shareMessage}\n\n${shareLink}`;
    const smsUrl = `sms:?body=${encodeURIComponent(smsBody)}`;
    window.open(smsUrl, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-300"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" />
      {/* Modal */}
      <div className="absolute inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg animate-slide-up">
        <div className="h-full glass-morphic rounded-2xl border border-white/20 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="Share" size={20} className="text-primary" />
              </div>
              <div>
                <h2 
                  id="share-modal-title"
                  className="text-lg font-semibold text-foreground"
                >
                  Share Record
                </h2>
                <p className="text-sm text-muted-foreground capitalize">
                  {recordType} Record
                </p>
              </div>
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
            {/* Share Method Tabs */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setShareMethod('link')}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-150 ${
                  shareMethod === 'link' ?'bg-primary text-primary-foreground' :'bg-muted/50 text-muted-foreground hover:bg-muted'
                }`}
              >
                Secure Link
              </button>
              <button
                onClick={() => setShareMethod('email')}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-150 ${
                  shareMethod === 'email' ?'bg-primary text-primary-foreground' :'bg-muted/50 text-muted-foreground hover:bg-muted'
                }`}
              >
                Email
              </button>
              <button
                onClick={() => setShareMethod('qr')}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-150 ${
                  shareMethod === 'qr' ?'bg-primary text-primary-foreground' :'bg-muted/50 text-muted-foreground hover:bg-muted'
                }`}
              >
                QR Code
              </button>
            </div>

            {/* Share Link Method */}
            {shareMethod === 'link' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Secure Share Link
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={shareLink}
                      readOnly
                      className="flex-1 px-3 py-2 border border-border rounded-lg bg-muted/30 text-foreground font-mono text-sm"
                    />
                    <Button
                      variant={linkCopied ? 'success' : 'outline'}
                      size="sm"
                      onClick={copyToClipboard}
                      iconName={linkCopied ? 'Check' : 'Copy'}
                      iconSize={16}
                    >
                      {linkCopied ? 'Copied' : 'Copy'}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    This link expires in 7 days and requires verification to access.
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={handleSMSShare}
                    iconName="MessageSquare"
                    iconPosition="left"
                    className="flex-1"
                  >
                    Share via SMS
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      const subject = `Health Record Shared - ${recordType}`;
                      const body = `${shareMessage}\n\n${shareLink}`;
                      window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
                    }}
                    iconName="Mail"
                    iconPosition="left"
                    className="flex-1"
                  >
                    Share via Email
                  </Button>
                </div>
              </div>
            )}

            {/* Email Method */}
            {shareMethod === 'email' && (
              <div className="space-y-4">
                <Input
                  type="email"
                  label="Recipient Email"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e?.target?.value)}
                  placeholder="Enter email address"
                  required
                />
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    value={shareMessage}
                    onChange={(e) => setShareMessage(e?.target?.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                    placeholder="Add a personal message..."
                  />
                </div>

                <Button
                  variant="default"
                  onClick={handleEmailShare}
                  disabled={!emailAddress?.trim()}
                  iconName="Send"
                  iconPosition="left"
                  fullWidth
                >
                  Send Email
                </Button>
              </div>
            )}

            {/* QR Code Method */}
            {shareMethod === 'qr' && (
              <div className="space-y-4 text-center">
                <div className="flex justify-center">
                  <div className="p-4 bg-white rounded-lg shadow-lg">
                    <img
                      src={qrCodeUrl}
                      alt="QR Code for sharing record"
                      className="w-48 h-48"
                      onError={(e) => {
                        e.target.src = '/assets/images/no_image.png';
                      }}
                    />
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Scan to Access Record
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Healthcare providers can scan this QR code to securely access your {recordType} record.
                  </p>
                </div>

                <Button
                  variant="outline"
                  onClick={() => {
                    // Mock QR code download
                    const link = document.createElement('a');
                    link.href = qrCodeUrl;
                    link.download = `${recordType}-record-qr.png`;
                    document.body?.appendChild(link);
                    link?.click();
                    document.body?.removeChild(link);
                  }}
                  iconName="Download"
                  iconPosition="left"
                >
                  Download QR Code
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;