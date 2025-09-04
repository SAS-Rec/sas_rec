import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PersonalInfoSection = ({ userProfile, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userProfile?.name || '',
    email: userProfile?.email || '',
    phone: userProfile?.phone || '',
    dateOfBirth: userProfile?.dateOfBirth || '',
    gender: userProfile?.gender || '',
    bloodType: userProfile?.bloodType || '',
    height: userProfile?.height || '',
    weight: userProfile?.weight || ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    onUpdateProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: userProfile?.name || '',
      email: userProfile?.email || '',
      phone: userProfile?.phone || '',
      dateOfBirth: userProfile?.dateOfBirth || '',
      gender: userProfile?.gender || '',
      bloodType: userProfile?.bloodType || '',
      height: userProfile?.height || '',
      weight: userProfile?.weight || ''
    });
    setIsEditing(false);
  };

  return (
    <div className="glass-morphic rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon name="User" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Personal Information</h2>
            <p className="text-sm text-muted-foreground">Manage your personal details</p>
          </div>
        </div>
        {!isEditing && (
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
      {/* Profile Picture */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <Image
            src={userProfile?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"}
            alt="Profile picture"
            className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
          />
          {isEditing && (
            <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors">
              <Icon name="Camera" size={16} color="white" />
            </button>
          )}
        </div>
        <div>
          <h3 className="font-semibold text-foreground">{userProfile?.name}</h3>
          <p className="text-sm text-muted-foreground">{userProfile?.email}</p>
          {isEditing && (
            <Button variant="ghost" size="sm" className="mt-1 text-xs">
              Change Photo
            </Button>
          )}
        </div>
      </div>
      {/* Form Fields */}
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Full Name"
          type="text"
          value={formData?.name}
          onChange={(e) => handleInputChange('name', e?.target?.value)}
          disabled={!isEditing}
          required
        />
        
        <Input
          label="Email Address"
          type="email"
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          disabled={!isEditing}
          required
        />
        
        <Input
          label="Phone Number"
          type="tel"
          value={formData?.phone}
          onChange={(e) => handleInputChange('phone', e?.target?.value)}
          disabled={!isEditing}
        />
        
        <Input
          label="Date of Birth"
          type="date"
          value={formData?.dateOfBirth}
          onChange={(e) => handleInputChange('dateOfBirth', e?.target?.value)}
          disabled={!isEditing}
        />
        
        <Input
          label="Gender"
          type="text"
          value={formData?.gender}
          onChange={(e) => handleInputChange('gender', e?.target?.value)}
          disabled={!isEditing}
          placeholder="e.g., Male, Female, Other"
        />
        
        <Input
          label="Blood Type"
          type="text"
          value={formData?.bloodType}
          onChange={(e) => handleInputChange('bloodType', e?.target?.value)}
          disabled={!isEditing}
          placeholder="e.g., A+, B-, O+"
        />
        
        <Input
          label="Height"
          type="text"
          value={formData?.height}
          onChange={(e) => handleInputChange('height', e?.target?.value)}
          disabled={!isEditing}
          placeholder="e.g., 5'8&quot; or 173 cm"
        />
        
        <Input
          label="Weight"
          type="text"
          value={formData?.weight}
          onChange={(e) => handleInputChange('weight', e?.target?.value)}
          disabled={!isEditing}
          placeholder="e.g., 150 lbs or 68 kg"
        />
      </div>
      {/* Action Buttons */}
      {isEditing && (
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
            Save Changes
          </Button>
        </div>
      )}
    </div>
  );
};

export default PersonalInfoSection;