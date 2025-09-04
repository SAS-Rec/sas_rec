import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const AppPreferencesSection = ({ preferences, onUpdatePreferences }) => {
  const [settings, setSettings] = useState({
    darkMode: preferences?.darkMode || false,
    pushNotifications: preferences?.pushNotifications || true,
    medicationReminders: preferences?.medicationReminders || true,
    appointmentReminders: preferences?.appointmentReminders || true,
    labResultNotifications: preferences?.labResultNotifications || true,
    emailNotifications: preferences?.emailNotifications || false,
    smsNotifications: preferences?.smsNotifications || false,
    soundEnabled: preferences?.soundEnabled || true,
    vibrationEnabled: preferences?.vibrationEnabled || true,
    language: preferences?.language || 'en',
    timeFormat: preferences?.timeFormat || '12h',
    dateFormat: preferences?.dateFormat || 'MM/DD/YYYY'
  });

  const handleSettingChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onUpdatePreferences(newSettings);
  };

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' },
    { value: 'de', label: 'Deutsch' }
  ];

  const timeFormatOptions = [
    { value: '12h', label: '12 Hour (AM/PM)' },
    { value: '24h', label: '24 Hour' }
  ];

  const dateFormatOptions = [
    { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
    { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
    { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' }
  ];

  return (
    <div className="glass-morphic rounded-2xl p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center">
          <Icon name="Settings" size={20} className="text-warning" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">App Preferences</h2>
          <p className="text-sm text-muted-foreground">Customize your app experience</p>
        </div>
      </div>
      {/* Theme Settings */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground">Appearance</h3>
        
        <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
          <div className="flex items-center gap-3">
            <Icon name={settings?.darkMode ? "Moon" : "Sun"} size={20} className="text-muted-foreground" />
            <div>
              <h4 className="font-medium text-foreground">Dark Mode</h4>
              <p className="text-sm text-muted-foreground">Switch to dark theme</p>
            </div>
          </div>
          <Checkbox
            checked={settings?.darkMode}
            onChange={(e) => handleSettingChange('darkMode', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Notification Settings */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground">Notifications</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
            <div className="flex items-center gap-3">
              <Icon name="Bell" size={20} className="text-muted-foreground" />
              <div>
                <h4 className="font-medium text-foreground">Push Notifications</h4>
                <p className="text-sm text-muted-foreground">Receive app notifications</p>
              </div>
            </div>
            <Checkbox
              checked={settings?.pushNotifications}
              onChange={(e) => handleSettingChange('pushNotifications', e?.target?.checked)}
            />
          </div>

          <div className="ml-8 space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
              <div className="flex items-center gap-3">
                <Icon name="Pill" size={18} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Medication Reminders</span>
              </div>
              <Checkbox
                checked={settings?.medicationReminders}
                onChange={(e) => handleSettingChange('medicationReminders', e?.target?.checked)}
                disabled={!settings?.pushNotifications}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
              <div className="flex items-center gap-3">
                <Icon name="Calendar" size={18} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Appointment Reminders</span>
              </div>
              <Checkbox
                checked={settings?.appointmentReminders}
                onChange={(e) => handleSettingChange('appointmentReminders', e?.target?.checked)}
                disabled={!settings?.pushNotifications}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
              <div className="flex items-center gap-3">
                <Icon name="TestTube" size={18} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Lab Result Notifications</span>
              </div>
              <Checkbox
                checked={settings?.labResultNotifications}
                onChange={(e) => handleSettingChange('labResultNotifications', e?.target?.checked)}
                disabled={!settings?.pushNotifications}
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
            <div className="flex items-center gap-3">
              <Icon name="Mail" size={20} className="text-muted-foreground" />
              <div>
                <h4 className="font-medium text-foreground">Email Notifications</h4>
                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
            </div>
            <Checkbox
              checked={settings?.emailNotifications}
              onChange={(e) => handleSettingChange('emailNotifications', e?.target?.checked)}
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
            <div className="flex items-center gap-3">
              <Icon name="MessageSquare" size={20} className="text-muted-foreground" />
              <div>
                <h4 className="font-medium text-foreground">SMS Notifications</h4>
                <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
              </div>
            </div>
            <Checkbox
              checked={settings?.smsNotifications}
              onChange={(e) => handleSettingChange('smsNotifications', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
      {/* Sound & Vibration */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground">Sound & Vibration</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
            <div className="flex items-center gap-3">
              <Icon name="Volume2" size={20} className="text-muted-foreground" />
              <div>
                <h4 className="font-medium text-foreground">Sound Effects</h4>
                <p className="text-sm text-muted-foreground">Play sounds for notifications</p>
              </div>
            </div>
            <Checkbox
              checked={settings?.soundEnabled}
              onChange={(e) => handleSettingChange('soundEnabled', e?.target?.checked)}
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
            <div className="flex items-center gap-3">
              <Icon name="Smartphone" size={20} className="text-muted-foreground" />
              <div>
                <h4 className="font-medium text-foreground">Vibration</h4>
                <p className="text-sm text-muted-foreground">Vibrate for notifications</p>
              </div>
            </div>
            <Checkbox
              checked={settings?.vibrationEnabled}
              onChange={(e) => handleSettingChange('vibrationEnabled', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
      {/* Language & Format */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground">Language & Format</h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Language</label>
            <div className="grid grid-cols-2 gap-2">
              {languageOptions?.map((option) => (
                <button
                  key={option?.value}
                  onClick={() => handleSettingChange('language', option?.value)}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                    settings?.language === option?.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-muted/70 text-muted-foreground'
                  }`}
                >
                  {option?.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Time Format</label>
            <div className="grid grid-cols-2 gap-2">
              {timeFormatOptions?.map((option) => (
                <button
                  key={option?.value}
                  onClick={() => handleSettingChange('timeFormat', option?.value)}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                    settings?.timeFormat === option?.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-muted/70 text-muted-foreground'
                  }`}
                >
                  {option?.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Date Format</label>
            <div className="grid grid-cols-1 gap-2">
              {dateFormatOptions?.map((option) => (
                <button
                  key={option?.value}
                  onClick={() => handleSettingChange('dateFormat', option?.value)}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                    settings?.dateFormat === option?.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-muted/70 text-muted-foreground'
                  }`}
                >
                  {option?.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Reset Settings */}
      <div className="pt-4 border-t border-white/10">
        <Button
          variant="outline"
          onClick={() => {
            const defaultSettings = {
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
            };
            setSettings(defaultSettings);
            onUpdatePreferences(defaultSettings);
          }}
          iconName="RotateCcw"
          iconPosition="left"
          className="w-full"
        >
          Reset to Default Settings
        </Button>
      </div>
    </div>
  );
};

export default AppPreferencesSection;