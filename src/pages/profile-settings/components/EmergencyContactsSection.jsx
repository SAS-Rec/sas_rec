import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const EmergencyContactsSection = ({ emergencyContacts, onUpdateContacts }) => {
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    relationship: '',
    phone: '',
    email: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddContact = () => {
    setFormData({ name: '', relationship: '', phone: '', email: '' });
    setIsAddingContact(true);
  };

  const handleEditContact = (contact) => {
    setFormData(contact);
    setEditingContact(contact?.id);
  };

  const handleSaveContact = () => {
    if (editingContact) {
      const updatedContacts = emergencyContacts?.map(contact =>
        contact?.id === editingContact ? { ...formData, id: editingContact } : contact
      );
      onUpdateContacts(updatedContacts);
      setEditingContact(null);
    } else {
      const newContact = {
        ...formData,
        id: Date.now()?.toString()
      };
      onUpdateContacts([...emergencyContacts, newContact]);
      setIsAddingContact(false);
    }
    setFormData({ name: '', relationship: '', phone: '', email: '' });
  };

  const handleDeleteContact = (contactId) => {
    const updatedContacts = emergencyContacts?.filter(contact => contact?.id !== contactId);
    onUpdateContacts(updatedContacts);
  };

  const handleCancel = () => {
    setIsAddingContact(false);
    setEditingContact(null);
    setFormData({ name: '', relationship: '', phone: '', email: '' });
  };

  const isFormValid = formData?.name && formData?.relationship && formData?.phone;

  return (
    <div className="glass-morphic rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center">
            <Icon name="Phone" size={20} className="text-error" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Emergency Contacts</h2>
            <p className="text-sm text-muted-foreground">Manage your emergency contact information</p>
          </div>
        </div>
        {!isAddingContact && !editingContact && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleAddContact}
            iconName="Plus"
            iconSize={16}
          >
            Add Contact
          </Button>
        )}
      </div>
      {/* Add/Edit Form */}
      {(isAddingContact || editingContact) && (
        <div className="p-4 rounded-lg bg-muted/30 space-y-4">
          <h3 className="font-semibold text-foreground">
            {editingContact ? 'Edit Contact' : 'Add New Contact'}
          </h3>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Full Name"
              type="text"
              value={formData?.name}
              onChange={(e) => handleInputChange('name', e?.target?.value)}
              required
              placeholder="Enter full name"
            />
            
            <Input
              label="Relationship"
              type="text"
              value={formData?.relationship}
              onChange={(e) => handleInputChange('relationship', e?.target?.value)}
              required
              placeholder="e.g., Spouse, Parent, Sibling"
            />
            
            <Input
              label="Phone Number"
              type="tel"
              value={formData?.phone}
              onChange={(e) => handleInputChange('phone', e?.target?.value)}
              required
              placeholder="Enter phone number"
            />
            
            <Input
              label="Email Address"
              type="email"
              value={formData?.email}
              onChange={(e) => handleInputChange('email', e?.target?.value)}
              placeholder="Enter email address"
            />
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleSaveContact}
              disabled={!isFormValid}
              className="flex-1"
              iconName="Save"
              iconPosition="left"
            >
              {editingContact ? 'Update Contact' : 'Add Contact'}
            </Button>
          </div>
        </div>
      )}
      {/* Contacts List */}
      <div className="space-y-3">
        {emergencyContacts?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="UserX" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">No Emergency Contacts</h3>
            <p className="text-muted-foreground mb-4">Add emergency contacts for quick access during emergencies</p>
            <Button
              variant="outline"
              onClick={handleAddContact}
              iconName="Plus"
              iconPosition="left"
            >
              Add First Contact
            </Button>
          </div>
        ) : (
          emergencyContacts?.map((contact) => (
            <div key={contact?.id} className="p-4 rounded-lg bg-muted/30 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="User" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{contact?.name}</h4>
                    <p className="text-sm text-muted-foreground">{contact?.relationship}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditContact(contact)}
                    iconName="Edit"
                    iconSize={14}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteContact(contact?.id)}
                    iconName="Trash2"
                    iconSize={14}
                    className="text-error hover:text-error"
                  />
                </div>
              </div>
              
              <div className="grid gap-2 md:grid-cols-2">
                <div className="flex items-center gap-2">
                  <Icon name="Phone" size={16} className="text-muted-foreground" />
                  <span className="text-sm font-mono text-foreground">{contact?.phone}</span>
                </div>
                {contact?.email && (
                  <div className="flex items-center gap-2">
                    <Icon name="Mail" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">{contact?.email}</span>
                  </div>
                )}
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(`tel:${contact?.phone}`)}
                  iconName="Phone"
                  iconSize={14}
                  className="flex-1"
                >
                  Call
                </Button>
                {contact?.email && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`mailto:${contact?.email}`)}
                    iconName="Mail"
                    iconSize={14}
                    className="flex-1"
                  >
                    Email
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EmergencyContactsSection;