import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const InsuranceProviderSection = ({ insuranceInfo, onUpdateInsurance }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    providerName: insuranceInfo?.providerName || '',
    policyNumber: insuranceInfo?.policyNumber || '',
    groupNumber: insuranceInfo?.groupNumber || '',
    memberName: insuranceInfo?.memberName || '',
    memberId: insuranceInfo?.memberId || '',
    effectiveDate: insuranceInfo?.effectiveDate || '',
    expirationDate: insuranceInfo?.expirationDate || '',
    copayAmount: insuranceInfo?.copayAmount || '',
    deductible: insuranceInfo?.deductible || ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    onUpdateInsurance(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      providerName: insuranceInfo?.providerName || '',
      policyNumber: insuranceInfo?.policyNumber || '',
      groupNumber: insuranceInfo?.groupNumber || '',
      memberName: insuranceInfo?.memberName || '',
      memberId: insuranceInfo?.memberId || '',
      effectiveDate: insuranceInfo?.effectiveDate || '',
      expirationDate: insuranceInfo?.expirationDate || '',
      copayAmount: insuranceInfo?.copayAmount || '',
      deductible: insuranceInfo?.deductible || ''
    });
    setIsEditing(false);
  };

  const hasInsuranceInfo = insuranceInfo && Object.keys(insuranceInfo)?.length > 0;

  return (
    <div className="glass-morphic rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
            <Icon name="CreditCard" size={20} className="text-secondary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Insurance Provider</h2>
            <p className="text-sm text-muted-foreground">Manage your insurance information</p>
          </div>
        </div>
        {hasInsuranceInfo && !isEditing && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(true)}
            iconName="Edit"
            iconSize={16}
          >
            Edit
          </Button>
        )}
      </div>
      {!hasInsuranceInfo && !isEditing ? (
        <div className="text-center py-8">
          <Icon name="CreditCard" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold text-foreground mb-2">No Insurance Information</h3>
          <p className="text-muted-foreground mb-4">Add your insurance details for easy access during appointments</p>
          <Button
            variant="outline"
            onClick={() => setIsEditing(true)}
            iconName="Plus"
            iconPosition="left"
          >
            Add Insurance Info
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Insurance Card Display */}
          {hasInsuranceInfo && !isEditing && (
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-secondary to-primary p-6 text-white">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12" />
              
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{insuranceInfo?.providerName}</h3>
                  <Icon name="Shield" size={24} className="text-white/80" />
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm text-white/80">Member Name</p>
                  <p className="font-semibold">{insuranceInfo?.memberName}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-white/80">Member ID</p>
                    <p className="font-mono font-semibold">{insuranceInfo?.memberId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/80">Group #</p>
                    <p className="font-mono font-semibold">{insuranceInfo?.groupNumber}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Form Fields */}
          {isEditing && (
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  label="Insurance Provider"
                  type="text"
                  value={formData?.providerName}
                  onChange={(e) => handleInputChange('providerName', e?.target?.value)}
                  placeholder="e.g., Blue Cross Blue Shield"
                  required
                />
                
                <Input
                  label="Policy Number"
                  type="text"
                  value={formData?.policyNumber}
                  onChange={(e) => handleInputChange('policyNumber', e?.target?.value)}
                  placeholder="Enter policy number"
                />
                
                <Input
                  label="Group Number"
                  type="text"
                  value={formData?.groupNumber}
                  onChange={(e) => handleInputChange('groupNumber', e?.target?.value)}
                  placeholder="Enter group number"
                />
                
                <Input
                  label="Member Name"
                  type="text"
                  value={formData?.memberName}
                  onChange={(e) => handleInputChange('memberName', e?.target?.value)}
                  placeholder="Name on insurance card"
                  required
                />
                
                <Input
                  label="Member ID"
                  type="text"
                  value={formData?.memberId}
                  onChange={(e) => handleInputChange('memberId', e?.target?.value)}
                  placeholder="Member identification number"
                  required
                />
                
                <Input
                  label="Effective Date"
                  type="date"
                  value={formData?.effectiveDate}
                  onChange={(e) => handleInputChange('effectiveDate', e?.target?.value)}
                />
                
                <Input
                  label="Expiration Date"
                  type="date"
                  value={formData?.expirationDate}
                  onChange={(e) => handleInputChange('expirationDate', e?.target?.value)}
                />
                
                <Input
                  label="Copay Amount"
                  type="text"
                  value={formData?.copayAmount}
                  onChange={(e) => handleInputChange('copayAmount', e?.target?.value)}
                  placeholder="e.g., $25"
                />
                
                <Input
                  label="Annual Deductible"
                  type="text"
                  value={formData?.deductible}
                  onChange={(e) => handleInputChange('deductible', e?.target?.value)}
                  placeholder="e.g., $1,500"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-white/10">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  onClick={handleSave}
                  className="flex-1"
                  iconName="Save"
                  iconPosition="left"
                >
                  Save Insurance Info
                </Button>
              </div>
            </div>
          )}

          {/* Insurance Details */}
          {hasInsuranceInfo && !isEditing && (
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Policy Details</h3>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-3 rounded-lg bg-muted/30">
                  <p className="text-sm text-muted-foreground">Policy Number</p>
                  <p className="font-mono font-semibold text-foreground">{insuranceInfo?.policyNumber}</p>
                </div>
                
                <div className="p-3 rounded-lg bg-muted/30">
                  <p className="text-sm text-muted-foreground">Effective Date</p>
                  <p className="font-semibold text-foreground">{insuranceInfo?.effectiveDate}</p>
                </div>
                
                <div className="p-3 rounded-lg bg-muted/30">
                  <p className="text-sm text-muted-foreground">Copay Amount</p>
                  <p className="font-semibold text-foreground">{insuranceInfo?.copayAmount}</p>
                </div>
                
                <div className="p-3 rounded-lg bg-muted/30">
                  <p className="text-sm text-muted-foreground">Annual Deductible</p>
                  <p className="font-semibold text-foreground">{insuranceInfo?.deductible}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InsuranceProviderSection;