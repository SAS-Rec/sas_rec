import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import RecordHeader from './components/RecordHeader';
import MedicationDetails from './components/MedicationDetails';
import AllergyDetails from './components/AllergyDetails';
import LabResultDetails from './components/LabResultDetails';
import ConditionDetails from './components/ConditionDetails';
import ShareModal from './components/ShareModal';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';

const RecordDetailSheet = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isEditing, setIsEditing] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [recordData, setRecordData] = useState(null);
  const [originalData, setOriginalData] = useState(null);

  // Get record type and ID from URL params
  const recordType = searchParams?.get('type') || 'medication';
  const recordId = searchParams?.get('id') || '1';

  // Mock data for different record types
  const mockRecords = {
    medication: {
      id: '1',
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'once-daily',
      prescribingDoctor: 'Dr. Sarah Johnson',
      mealPreference: 'no-preference',
      startDate: '2024-01-15',
      notes: 'Take consistently at the same time each day. Monitor blood pressure weekly.',
      createdDate: '2024-01-15T10:30:00Z'
    },
    allergy: {
      id: '2',
      allergen: 'Penicillin',
      allergenType: 'medication',
      severity: 'severe',
      reactionNotes: 'Severe skin rash, difficulty breathing, swelling of face and throat. Required emergency treatment.',
      onsetDate: '2019-03-22',
      treatment: 'Avoid all penicillin-based antibiotics. Carry epinephrine auto-injector. Use alternative antibiotics like cephalexin or azithromycin.',
      createdDate: '2019-03-22T14:20:00Z'
    },
    lab: {
      id: '3',
      testName: 'Complete Blood Count (CBC)',
      value: '4.8',
      referenceRange: '4.5-5.5',
      testDate: '2024-08-15',
      laboratory: 'Quest Diagnostics',
      doctorNotes: 'All values within normal range. Continue current treatment plan.',
      attachedFiles: [
        {
          id: 1,
          name: 'CBC_Results_Aug2024.pdf',
          type: 'application/pdf',
          size: 245760,
          url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
          uploadDate: '2024-08-15T09:15:00Z'
        },
        {
          id: 2,
          name: 'Lab_Report_Image.jpg',
          type: 'image/jpeg',
          size: 156800,
          url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
          uploadDate: '2024-08-15T09:16:00Z'
        }
      ],
      createdDate: '2024-08-15T09:00:00Z'
    },
    condition: {
      id: '4',
      diagnosis: 'Hypertension (High Blood Pressure)',
      status: 'active',
      severity: 'moderate',
      diagnosisDate: '2023-11-10',
      resolutionDate: '',
      diagnosingDoctor: 'Dr. Michael Chen',
      treatmentNotes: 'Patient responding well to ACE inhibitor therapy. Blood pressure readings have improved significantly. Continue current medication regimen and lifestyle modifications.',
      relatedMedications: 'Lisinopril 10mg daily, Hydrochlorothiazide 25mg daily',
      createdDate: '2023-11-10T16:45:00Z'
    }
  };

  useEffect(() => {
    // Load record data based on type and ID
    const data = mockRecords?.[recordType];
    if (data) {
      setRecordData(data);
      setOriginalData({ ...data });
    }
  }, [recordType, recordId]);

  const handleClose = () => {
    navigate(-1);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    console.log('Saving record:', recordData);
    setOriginalData({ ...recordData });
    setIsEditing(false);
    
    // Show success toast (mock)
    const event = new CustomEvent('showToast', {
      detail: {
        type: 'success',
        message: `${recordType} record updated successfully`,
        action: {
          label: 'Undo',
          onClick: () => {
            setRecordData({ ...originalData });
            console.log('Changes undone');
          }
        }
      }
    });
    window.dispatchEvent(event);
  };

  const handleCancel = () => {
    setRecordData({ ...originalData });
    setIsEditing(false);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    console.log('Deleting record:', recordData?.id);
    
    // Show success toast with undo option
    const event = new CustomEvent('showToast', {
      detail: {
        type: 'success',
        message: `${recordType} record deleted`,
        action: {
          label: 'Undo',
          onClick: () => {
            console.log('Delete undone');
          }
        }
      }
    });
    window.dispatchEvent(event);
    
    // Navigate back
    navigate(-1);
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleExport = () => {
    console.log('Exporting record:', recordData);
    
    // Mock PDF export
    const exportData = {
      recordType,
      data: recordData,
      exportDate: new Date()?.toISOString(),
      format: 'PDF'
    };
    
    console.log('Export data:', exportData);
    
    // Show success toast
    const event = new CustomEvent('showToast', {
      detail: {
        type: 'success',
        message: 'Record exported successfully'
      }
    });
    window.dispatchEvent(event);
  };

  const handleDataChange = (field, value) => {
    setRecordData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderRecordDetails = () => {
    if (!recordData) return null;

    switch (recordType) {
      case 'medication':
        return (
          <MedicationDetails
            data={recordData}
            isEditing={isEditing}
            onChange={handleDataChange}
          />
        );
      case 'allergy':
        return (
          <AllergyDetails
            data={recordData}
            isEditing={isEditing}
            onChange={handleDataChange}
          />
        );
      case 'lab':
        return (
          <LabResultDetails
            data={recordData}
            isEditing={isEditing}
            onChange={handleDataChange}
          />
        );
      case 'condition':
        return (
          <ConditionDetails
            data={recordData}
            isEditing={isEditing}
            onChange={handleDataChange}
          />
        );
      default:
        return (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Unknown record type</p>
          </div>
        );
    }
  };

  if (!recordData) {
    return (
      <div className="fixed inset-0 z-250 bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading record...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${recordType} Record - SAS Rec`}</title>
        <meta name="description" content={`View and manage your ${recordType} record details`} />
      </Helmet>
      <div className="fixed inset-0 z-250 bg-background">
        {/* Header */}
        <RecordHeader
          recordType={recordType}
          createdDate={recordData?.createdDate}
          isEditing={isEditing}
          onEdit={handleEdit}
          onSave={handleSave}
          onCancel={handleCancel}
          onDelete={handleDelete}
          onShare={handleShare}
          onExport={handleExport}
          onClose={handleClose}
        />

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 pb-8">
          <div className="max-w-4xl mx-auto">
            {renderRecordDetails()}
          </div>
        </div>

        {/* Modals */}
        <ShareModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          recordData={recordData}
          recordType={recordType}
        />

        <DeleteConfirmationModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleConfirmDelete}
          recordType={recordType}
          recordTitle={recordData?.name || recordData?.allergen || recordData?.testName || recordData?.diagnosis || 'Record'}
        />
      </div>
    </>
  );
};

export default RecordDetailSheet;