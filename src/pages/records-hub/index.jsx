import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import GlobalFloatingActionButton from '../../components/ui/GlobalFloatingActionButton';
import RecordDetailSheet from '../../components/ui/RecordDetailSheet';
import SegmentedTabs from './components/SegmentedTabs';
import SearchBar from './components/SearchBar';
import FilterDrawer from './components/FilterDrawer';
import RecordCard from './components/RecordCard';
import EmptyState from './components/EmptyState';

const RecordsHub = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isRecordDetailOpen, setIsRecordDetailOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [filters, setFilters] = useState({
    dateRange: { start: '', end: '' },
    severity: [],
    status: [],
    recordTypes: []
  });

  // Mock health records data
  const mockRecords = [
    {
      id: 1,
      type: 'allergy',
      title: 'Penicillin Allergy',
      description: 'Severe allergic reaction to penicillin-based antibiotics. Causes hives, swelling, and difficulty breathing.',
      date: '2024-08-15',
      severity: 'severe',
      status: 'active',
      reactions: ['Hives', 'Swelling', 'Difficulty breathing'],
      notes: 'Discovered during hospital visit in 2019. Always inform medical staff.'
    },
    {
      id: 2,
      type: 'medication',
      title: 'Lisinopril',
      description: 'ACE inhibitor for blood pressure management. Taken daily for hypertension control.',
      date: '2024-09-01',
      dosage: '10mg',
      frequency: 'Once daily',
      status: 'active',
      prescribedBy: 'Dr. Sarah Johnson',
      instructions: 'Take with food in the morning'
    },
    {
      id: 3,
      type: 'lab',
      title: 'Complete Blood Count',
      description: 'Routine blood work showing normal white and red blood cell counts. All values within normal range.',
      date: '2024-08-28',
      status: 'completed',
      results: {
        wbc: '7.2 K/uL',
        rbc: '4.8 M/uL',
        hemoglobin: '14.2 g/dL',
        hematocrit: '42.1%'
      },
      orderedBy: 'Dr. Michael Chen'
    },
    {
      id: 4,
      type: 'condition',
      title: 'Hypertension',
      description: 'Essential hypertension diagnosed in 2020. Well-controlled with medication and lifestyle modifications.',
      date: '2020-03-15',
      status: 'active',
      severity: 'moderate',
      diagnosedBy: 'Dr. Sarah Johnson',
      treatment: 'Lisinopril 10mg daily, low-sodium diet, regular exercise'
    },
    {
      id: 5,
      type: 'allergy',
      title: 'Shellfish Allergy',
      description: 'Mild allergic reaction to shellfish including shrimp, crab, and lobster.',
      date: '2024-07-10',
      severity: 'mild',
      status: 'active',
      reactions: ['Stomach upset', 'Mild hives'],
      notes: 'Avoid all shellfish and check restaurant ingredients'
    },
    {
      id: 6,
      type: 'medication',
      title: 'Vitamin D3',
      description: 'Daily vitamin D supplement for bone health and immune system support.',
      date: '2024-08-20',
      dosage: '2000 IU',
      frequency: 'Once daily',
      status: 'active',
      prescribedBy: 'Dr. Emily Rodriguez',
      instructions: 'Take with largest meal of the day'
    },
    {
      id: 7,
      type: 'lab',
      title: 'Lipid Panel',
      description: 'Cholesterol and triglyceride levels assessment. Shows improvement from previous results.',
      date: '2024-08-25',
      status: 'completed',
      results: {
        totalCholesterol: '185 mg/dL',
        ldl: '110 mg/dL',
        hdl: '55 mg/dL',
        triglycerides: '120 mg/dL'
      },
      orderedBy: 'Dr. Sarah Johnson'
    },
    {
      id: 8,
      type: 'condition',
      title: 'Seasonal Allergies',
      description: 'Seasonal allergic rhinitis occurring primarily in spring and fall months.',
      date: '2024-04-12',
      status: 'active',
      severity: 'mild',
      diagnosedBy: 'Dr. Robert Kim',
      treatment: 'Antihistamines as needed, nasal spray during peak seasons'
    }
  ];

  // Calculate tab counts
  const tabCounts = useMemo(() => {
    return {
      all: mockRecords?.length,
      allergy: mockRecords?.filter(r => r?.type === 'allergy')?.length,
      medication: mockRecords?.filter(r => r?.type === 'medication')?.length,
      lab: mockRecords?.filter(r => r?.type === 'lab')?.length,
      condition: mockRecords?.filter(r => r?.type === 'condition')?.length
    };
  }, [mockRecords]);

  // Filter and search records
  const filteredRecords = useMemo(() => {
    let filtered = mockRecords;

    // Filter by active tab
    if (activeTab !== 'all') {
      filtered = filtered?.filter(record => record?.type === activeTab);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery?.toLowerCase();
      filtered = filtered?.filter(record =>
        record?.title?.toLowerCase()?.includes(query) ||
        record?.description?.toLowerCase()?.includes(query)
      );
    }

    // Apply advanced filters
    if (filters?.dateRange?.start) {
      filtered = filtered?.filter(record => 
        new Date(record.date) >= new Date(filters.dateRange.start)
      );
    }

    if (filters?.dateRange?.end) {
      filtered = filtered?.filter(record => 
        new Date(record.date) <= new Date(filters.dateRange.end)
      );
    }

    if (filters?.severity?.length > 0) {
      filtered = filtered?.filter(record => 
        record?.severity && filters?.severity?.includes(record?.severity)
      );
    }

    if (filters?.status?.length > 0) {
      filtered = filtered?.filter(record => 
        record?.status && filters?.status?.includes(record?.status)
      );
    }

    if (filters?.recordTypes?.length > 0) {
      filtered = filtered?.filter(record => 
        filters?.recordTypes?.includes(record?.type)
      );
    }

    return filtered?.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [mockRecords, activeTab, searchQuery, filters]);

  // Check if filters are active
  const hasActiveFilters = useMemo(() => {
    return filters?.dateRange?.start || 
           filters?.dateRange?.end || 
           filters?.severity?.length > 0 || 
           filters?.status?.length > 0 || 
           filters?.recordTypes?.length > 0;
  }, [filters]);

  const tabs = [
    { value: 'all', label: 'All', count: tabCounts?.all },
    { value: 'allergy', label: 'Allergies', count: tabCounts?.allergy },
    { value: 'medication', label: 'Medications', count: tabCounts?.medication },
    { value: 'lab', label: 'Lab Results', count: tabCounts?.lab },
    { value: 'condition', label: 'Conditions', count: tabCounts?.condition }
  ];

  const handleRecordClick = (record) => {
    setSelectedRecord(record);
    setIsRecordDetailOpen(true);
  };

  const handleRecordEdit = (record) => {
    console.log('Edit record:', record);
    // Navigate to edit form or open edit modal
  };

  const handleRecordDelete = (record) => {
    console.log('Delete record:', record);
    // Show confirmation dialog and delete
  };

  const handleRecordShare = (record) => {
    console.log('Share record:', record);
    // Open share options
  };

  const handleRecordExport = (record) => {
    console.log('Export record:', record);
    // Export record as PDF or other format
  };

  const handleCreateRecord = () => {
    console.log('Create new record');
    // Open create record form
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 glass-morphic border-b border-white/20 safe-area-top">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Health Records</h1>
              <p className="text-sm text-muted-foreground">
                Manage your medical information
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onFilterClick={() => setIsFilterDrawerOpen(true)}
            hasActiveFilters={hasActiveFilters}
            className="mb-4"
          />

          {/* Segmented Tabs */}
          <SegmentedTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 px-4 py-6 pb-24">
        {filteredRecords?.length > 0 ? (
          <div className="space-y-4">
            {filteredRecords?.map((record) => (
              <RecordCard
                key={record?.id}
                record={record}
                onClick={handleRecordClick}
                onEdit={handleRecordEdit}
                onDelete={handleRecordDelete}
                onShare={handleRecordShare}
                onExport={handleRecordExport}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            type={activeTab}
            searchQuery={searchQuery}
            onCreateRecord={handleCreateRecord}
            onClearSearch={handleClearSearch}
          />
        )}
      </div>
      {/* Filter Drawer */}
      <FilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filters={filters}
        onFiltersChange={handleFiltersChange}
      />
      {/* Record Detail Sheet */}
      <RecordDetailSheet
        isOpen={isRecordDetailOpen}
        onClose={() => setIsRecordDetailOpen(false)}
        recordData={selectedRecord}
        recordType={selectedRecord?.type || 'general'}
      />
      {/* Navigation */}
      <BottomTabNavigation />
      <GlobalFloatingActionButton />
    </div>
  );
};

export default RecordsHub;