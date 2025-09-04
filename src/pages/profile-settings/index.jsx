import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import GlobalFloatingActionButton from '../../components/ui/GlobalFloatingActionButton';
import PersonalInfoSection from './components/PersonalInfoSection';
import HealthProfileSection from './components/HealthProfileSection';
import PrivacySecuritySection from './components/PrivacySecuritySection';
import EmergencyContactsSection from './components/EmergencyContactsSection';
import InsuranceProviderSection from './components/InsuranceProviderSection';
import AppPreferencesSection from './components/AppPreferencesSection';

const ProfileSettingsPage = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Mock user profile data
  const [userProfile, setUserProfile] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1985-03-15",
    gender: "Female",
    bloodType: "A+",
    height: "5\'6\"",
    weight: "140 lbs",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  });

  // Mock health profile data
  const [healthProfile, setHealthProfile] = useState({
    allergies: [
      { id: "1", name: "Penicillin", severity: "severe" },
      { id: "2", name: "Peanuts", severity: "moderate" }
    ],
    medications: [
      { id: "1", name: "Lisinopril", dosage: "10mg", frequency: "Once daily" },
      { id: "2", name: "Metformin", dosage: "500mg", frequency: "Twice daily" }
    ],
    conditions: [
      { id: "1", name: "Hypertension", status: "active" },
      { id: "2", name: "Type 2 Diabetes", status: "active" }
    ],
    emergencyContacts: [
      {
        id: "1",
        name: "John Johnson",
        relationship: "Spouse",
        phone: "+1 (555) 987-6543",
        email: "john.johnson@email.com"
      }
    ],
    insurance: {
      providerName: "Blue Cross Blue Shield",
      policyNumber: "BC123456789",
      groupNumber: "GRP001",
      memberName: "Sarah Johnson",
      memberId: "MEM123456",
      effectiveDate: "2024-01-01",
      expirationDate: "2024-12-31",
      copayAmount: "$25",
      deductible: "$1,500"
    },
    primaryDoctor: "Dr. Michael Chen"
  });

  // Mock security settings
  const [securitySettings, setSecuritySettings] = useState({
    passcodeEnabled: true,
    biometricEnabled: true,
    autoLockEnabled: true,
    autoLockTimer: 5,
    shareDataEnabled: false,
    analyticsEnabled: true
  });

  // Mock app preferences
  const [appPreferences, setAppPreferences] = useState({
    darkMode: false,
    pushNotifications: true,
    medicationReminders: true,
    appointmentReminders: true,
    labResultNotifications: true,
    emailNotifications: false,
    smsNotifications: false,
    soundEnabled: true,
    vibrationEnabled: true,
    language: 'en',
    timeFormat: '12h',
    dateFormat: 'MM/DD/YYYY'
  });

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const handleUpdateProfile = (updatedProfile) => {
    setUserProfile(updatedProfile);
    showToast();
  };

  const handleUpdateHealth = (section) => {
    console.log('Update health section:', section);
    // Navigate to appropriate section or show modal
    if (section === 'allergies' || section === 'medications') {
      navigate('/records-hub');
    }
  };

  const handleUpdateSecurity = (updatedSettings) => {
    setSecuritySettings(updatedSettings);
    showToast();
  };

  const handleUpdateContacts = (updatedContacts) => {
    setHealthProfile(prev => ({
      ...prev,
      emergencyContacts: updatedContacts
    }));
    showToast();
  };

  const handleUpdateInsurance = (updatedInsurance) => {
    setHealthProfile(prev => ({
      ...prev,
      insurance: updatedInsurance
    }));
    showToast();
  };

  const handleUpdatePreferences = (updatedPreferences) => {
    setAppPreferences(updatedPreferences);
    
    // Save language preference
    if (updatedPreferences?.language !== currentLanguage) {
      setCurrentLanguage(updatedPreferences?.language);
      localStorage.setItem('selectedLanguage', updatedPreferences?.language);
    }
    
    showToast();
  };

  const showToast = () => {
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  const handleSignOut = () => {
    console.log('Sign out clicked');
    // In a real app, this would clear auth tokens and redirect to login
    navigate('/dashboard-home');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-morphic border-b border-white/20 safe-area-top">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/dashboard-home')}
              className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Go back"
            >
              <Icon name="ArrowLeft" size={20} />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Profile Settings</h1>
              <p className="text-sm text-muted-foreground">Manage your account and preferences</p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            iconName="LogOut"
            iconSize={16}
            className="text-error hover:text-error"
          >
            Sign Out
          </Button>
        </div>
      </header>
      {/* Main Content */}
      <main className="pb-20 safe-area-bottom">
        <div className="max-w-4xl mx-auto p-4 space-y-6">
          {/* Personal Information */}
          <PersonalInfoSection
            userProfile={userProfile}
            onUpdateProfile={handleUpdateProfile}
          />

          {/* Health Profile */}
          <HealthProfileSection
            healthProfile={healthProfile}
            onUpdateHealth={handleUpdateHealth}
          />

          {/* Privacy & Security */}
          <PrivacySecuritySection
            securitySettings={securitySettings}
            onUpdateSecurity={handleUpdateSecurity}
          />

          {/* Emergency Contacts */}
          <EmergencyContactsSection
            emergencyContacts={healthProfile?.emergencyContacts}
            onUpdateContacts={handleUpdateContacts}
          />

          {/* Insurance Provider */}
          <InsuranceProviderSection
            insuranceInfo={healthProfile?.insurance}
            onUpdateInsurance={handleUpdateInsurance}
          />

          {/* App Preferences */}
          <AppPreferencesSection
            preferences={appPreferences}
            onUpdatePreferences={handleUpdatePreferences}
          />

          {/* About Section */}
          <div className="glass-morphic rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="Info" size={20} className="text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">About SAS Rec</h2>
                <p className="text-sm text-muted-foreground">Version 1.0.0</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <Button
                variant="ghost"
                onClick={() => console.log('Privacy Policy clicked')}
                iconName="Shield"
                iconPosition="left"
                className="w-full justify-start"
              >
                Privacy Policy
              </Button>
              
              <Button
                variant="ghost"
                onClick={() => console.log('Terms of Service clicked')}
                iconName="FileText"
                iconPosition="left"
                className="w-full justify-start"
              >
                Terms of Service
              </Button>
              
              <Button
                variant="ghost"
                onClick={() => console.log('Help & Support clicked')}
                iconName="HelpCircle"
                iconPosition="left"
                className="w-full justify-start"
              >
                Help & Support
              </Button>
            </div>
            
            <div className="pt-4 border-t border-white/10 text-center">
              <p className="text-sm text-muted-foreground">
                © {new Date()?.getFullYear()} SAS Rec. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </main>
      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed top-20 left-4 right-4 z-200 animate-slide-down">
          <div className="glass-morphic rounded-lg p-4 border border-success/20 bg-success/10">
            <div className="flex items-center gap-3">
              <Icon name="CheckCircle" size={20} className="text-success" />
              <span className="font-medium text-success">Settings saved successfully!</span>
            </div>
          </div>
        </div>
      )}
      {/* Bottom Navigation */}
      <BottomTabNavigation />
      {/* Global FAB */}
      <GlobalFloatingActionButton />
    </div>
  );
};

export default ProfileSettingsPage;