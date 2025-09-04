import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';

const PrivacySecuritySection = ({ securitySettings, onUpdateSecurity }) => {
  const [settings, setSettings] = useState({
    passcodeEnabled: securitySettings?.passcodeEnabled || false,
    biometricEnabled: securitySettings?.biometricEnabled || false,
    autoLockEnabled: securitySettings?.autoLockEnabled || false,
    autoLockTimer: securitySettings?.autoLockTimer || 5,
    shareDataEnabled: securitySettings?.shareDataEnabled || false,
    analyticsEnabled: securitySettings?.analyticsEnabled || true
  });

  const handleSettingChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onUpdateSecurity(newSettings);
  };

  const autoLockOptions = [
    { value: 1, label: '1 minute' },
    { value: 5, label: '5 minutes' },
    { value: 15, label: '15 minutes' },
    { value: 30, label: '30 minutes' },
    { value: 60, label: '1 hour' }
  ];

  return (
    <div className="glass-morphic rounded-2xl p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
          <Icon name="Shield" size={20} className="text-accent" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Privacy & Security</h2>
          <p className="text-sm text-muted-foreground">Manage your security preferences</p>
        </div>
      </div>
      {/* Security Status */}
      <div className="p-4 rounded-lg bg-success/10 border border-success/20">
        <div className="flex items-center gap-3">
          <Icon name="ShieldCheck" size={20} className="text-success" />
          <div>
            <h3 className="font-semibold text-success">Security Status: Good</h3>
            <p className="text-sm text-success/80">Your account is well protected</p>
          </div>
        </div>
      </div>
      {/* Authentication Settings */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground">Authentication</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
            <div className="flex items-center gap-3">
              <Icon name="Lock" size={20} className="text-muted-foreground" />
              <div>
                <h4 className="font-medium text-foreground">Passcode Protection</h4>
                <p className="text-sm text-muted-foreground">Secure app with 4-digit passcode</p>
              </div>
            </div>
            <Checkbox
              checked={settings?.passcodeEnabled}
              onChange={(e) => handleSettingChange('passcodeEnabled', e?.target?.checked)}
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
            <div className="flex items-center gap-3">
              <Icon name="Fingerprint" size={20} className="text-muted-foreground" />
              <div>
                <h4 className="font-medium text-foreground">Biometric Authentication</h4>
                <p className="text-sm text-muted-foreground">Use fingerprint or face recognition</p>
              </div>
            </div>
            <Checkbox
              checked={settings?.biometricEnabled}
              onChange={(e) => handleSettingChange('biometricEnabled', e?.target?.checked)}
              disabled={!settings?.passcodeEnabled}
            />
          </div>
        </div>
      </div>
      {/* Auto-Lock Settings */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground">Auto-Lock</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
            <div className="flex items-center gap-3">
              <Icon name="Timer" size={20} className="text-muted-foreground" />
              <div>
                <h4 className="font-medium text-foreground">Auto-Lock Timer</h4>
                <p className="text-sm text-muted-foreground">Lock app after inactivity</p>
              </div>
            </div>
            <Checkbox
              checked={settings?.autoLockEnabled}
              onChange={(e) => handleSettingChange('autoLockEnabled', e?.target?.checked)}
            />
          </div>

          {settings?.autoLockEnabled && (
            <div className="ml-8 space-y-2">
              <p className="text-sm font-medium text-foreground">Lock after:</p>
              <div className="grid grid-cols-2 gap-2">
                {autoLockOptions?.map((option) => (
                  <button
                    key={option?.value}
                    onClick={() => handleSettingChange('autoLockTimer', option?.value)}
                    className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                      settings?.autoLockTimer === option?.value
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted hover:bg-muted/70 text-muted-foreground'
                    }`}
                  >
                    {option?.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Privacy Settings */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground">Privacy</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
            <div className="flex items-center gap-3">
              <Icon name="Share" size={20} className="text-muted-foreground" />
              <div>
                <h4 className="font-medium text-foreground">Share Health Data</h4>
                <p className="text-sm text-muted-foreground">Allow sharing with healthcare providers</p>
              </div>
            </div>
            <Checkbox
              checked={settings?.shareDataEnabled}
              onChange={(e) => handleSettingChange('shareDataEnabled', e?.target?.checked)}
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
            <div className="flex items-center gap-3">
              <Icon name="BarChart" size={20} className="text-muted-foreground" />
              <div>
                <h4 className="font-medium text-foreground">Analytics & Insights</h4>
                <p className="text-sm text-muted-foreground">Help improve app with usage data</p>
              </div>
            </div>
            <Checkbox
              checked={settings?.analyticsEnabled}
              onChange={(e) => handleSettingChange('analyticsEnabled', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySecuritySection;