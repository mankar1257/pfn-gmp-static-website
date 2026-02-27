import React from 'react';
import DashboardApp from '../dashboard/DashboardApp';
import '../dashboard/dashboard.css';

/**
 * Dashboard Page — wraps the TN Election Intelligence dashboard.
 * Access-controlled internally via AccessGate (email whitelist + admin panel).
 * This component bridges the main website router with the dashboard's own view system.
 */
const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-root" style={{ height: 'calc(100vh - 4rem)' }}>
      <DashboardApp />
    </div>
  );
};

export default Dashboard;
