import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import TimelineView from './pages/timeline-view';
import AppointmentManagement from './pages/appointment-management';
import RecordDetailSheet from './pages/record-detail-sheet';
import ProfileSettingsPage from './pages/profile-settings';
import DashboardHome from './pages/dashboard-home';
import RecordsHub from './pages/records-hub';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AppointmentManagement />} />
        <Route path="/timeline-view" element={<TimelineView />} />
        <Route path="/appointment-management" element={<AppointmentManagement />} />
        <Route path="/record-detail-sheet" element={<RecordDetailSheet />} />
        <Route path="/profile-settings" element={<ProfileSettingsPage />} />
        <Route path="/dashboard-home" element={<DashboardHome />} />
        <Route path="/records-hub" element={<RecordsHub />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
