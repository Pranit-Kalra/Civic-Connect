
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import { 
  initialDepartments, 
  initialResolvers, 
  initialUsers, 
  initialIssues 
} from './data/mockData';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import CitizenDashboard from './pages/citizen/CitizenDashboard';
import ReportIssue from './pages/citizen/ReportIssue';
import MyIssues from './pages/citizen/MyIssues';
import IssueDetails from './pages/citizen/IssueDetails';

import ResolverDashboard from './pages/resolver/ResolverDashboard';
import AssignedIssues from './pages/resolver/AssignedIssues';
import ResolverIssueDetails from './pages/resolver/ResolverIssueDetails';

import AdminDashboard from './pages/admin/AdminDashboard';
import ManageIssues from './pages/admin/ManageIssues';
import ManageUsers from './pages/admin/ManageUsers';
import ManageResolvers from './pages/admin/ManageResolvers';
import ManageDepartments from './pages/admin/ManageDepartments';

function DashboardLayout({ children, role }) {
  return (
    <div className="dashboard-layout">
      <Sidebar role={role} />
      <div className="dashboard-body">
        {children}
      </div>
    </div>
  );
}

const getStoredUsers = () => {
  const saved = localStorage.getItem('civic_users');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {

        return parsed.filter(u => u.email !== 'amit.kumar@example.com' && u.email !== 'neha.gupta@example.com');
      }
    } catch (e) {
      console.error("Error reading civic_users", e);
    }
  }
  return initialUsers;
};

const getStoredCurrentUser = () => {
  const saved = localStorage.getItem('civic_current_user');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.email !== 'amit.kumar@example.com' && parsed.email !== 'neha.gupta@example.com') {
        return parsed;
      }
    } catch (e) {
      console.error("Error reading civic_current_user", e);
    }
  }
  return null;
};

const getStoredIssues = () => {
  const saved = localStorage.getItem('civic_issues');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch (e) {
      console.error("Error reading civic_issues", e);
    }
  }
  return initialIssues;
};

const getStoredResolvers = () => {
  const saved = localStorage.getItem('civic_resolvers');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch (e) {
      console.error("Error reading civic_resolvers", e);
    }
  }
  return initialResolvers;
};

function App() {

  const [users, setUsers] = useState(getStoredUsers);
  const [currentUser, setCurrentUser] = useState(getStoredCurrentUser);
  const [issues, setIssues] = useState(getStoredIssues);
  const [resolvers, setResolvers] = useState(getStoredResolvers);
  const [departments, setDepartments] = useState(initialDepartments);

  useEffect(() => {
    localStorage.setItem('civic_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('civic_resolvers', JSON.stringify(resolvers));
  }, [resolvers]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('civic_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('civic_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('civic_issues', JSON.stringify(issues));
  }, [issues]);

  const handleLogin = (userObj) => {
    setCurrentUser(userObj);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleAddIssue = (newIssue) => {
    setIssues((prevIssues) => [newIssue, ...prevIssues]);
  };

  const handleUpdateStatus = (issueId, newStatus, resolutionNote = '') => {
    setIssues((prevIssues) =>
      prevIssues.map((issue) => {
        if (issue.id === issueId) {
          return {
            ...issue,
            status: newStatus,
            resolutionNote: resolutionNote !== '' ? resolutionNote : issue.resolutionNote
          };
        }
        return issue;
      })
    );
  };

  const handleAssignResolver = (issueId, resolverName, resolverId) => {
    setIssues((prevIssues) =>
      prevIssues.map((issue) => {
        if (issue.id === issueId) {
          return {
            ...issue,
            assignedTo: resolverName,
            resolverId: resolverId,
            status: issue.status === 'Pending' && resolverName ? 'Assigned' : issue.status
          };
        }
        return issue;
      })
    );
  };

  const handleAddUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const handleAddResolver = (newResolver) => {
    setResolvers((prevResolvers) => [...prevResolvers, newResolver]);
    setUsers((prevUsers) => [...prevUsers, newResolver]);
  };

  return (
    <div className="app-container">
      {}
      <Navbar currentUser={currentUser} onLogout={handleLogout} />

      <main className="main-content">
        <Routes>
          {}
          <Route path="/" element={<Home currentUser={currentUser} />} />
          <Route 
            path="/login" 
            element={<Login onLogin={handleLogin} initialUsers={users} resolvers={resolvers} />} 
          />
          <Route 
            path="/register" 
            element={<Register onLogin={handleLogin} onAddUser={handleAddUser} users={users} resolvers={resolvers} />} 
          />

          {}
          <Route 
            path="/citizen/dashboard" 
            element={
              <DashboardLayout role="citizen">
                <CitizenDashboard issues={issues} currentUser={currentUser} />
              </DashboardLayout>
            } 
          />
          <Route 
            path="/citizen/report" 
            element={
              <DashboardLayout role="citizen">
                <ReportIssue onAddIssue={handleAddIssue} currentUser={currentUser} />
              </DashboardLayout>
            } 
          />
          <Route 
            path="/citizen/issues" 
            element={
              <DashboardLayout role="citizen">
                <MyIssues issues={issues} currentUser={currentUser} />
              </DashboardLayout>
            } 
          />
          <Route 
            path="/citizen/issues/:id" 
            element={
              <DashboardLayout role="citizen">
                <IssueDetails issues={issues} />
              </DashboardLayout>
            } 
          />

          {}
          <Route 
            path="/resolver/dashboard" 
            element={
              <DashboardLayout role="resolver">
                <ResolverDashboard 
                  issues={issues} 
                  currentUser={currentUser} 
                  onUpdateStatus={handleUpdateStatus} 
                />
              </DashboardLayout>
            } 
          />
          <Route 
            path="/resolver/issues" 
            element={
              <DashboardLayout role="resolver">
                <AssignedIssues 
                  issues={issues} 
                  currentUser={currentUser} 
                  onUpdateStatus={handleUpdateStatus} 
                />
              </DashboardLayout>
            } 
          />
          <Route 
            path="/resolver/issues/:id" 
            element={
              <DashboardLayout role="resolver">
                <ResolverIssueDetails 
                  issues={issues} 
                  onUpdateStatus={handleUpdateStatus} 
                />
              </DashboardLayout>
            } 
          />

          {}
          <Route 
            path="/admin/dashboard" 
            element={
              <DashboardLayout role="admin">
                <AdminDashboard 
                  issues={issues} 
                  resolvers={resolvers} 
                  users={users} 
                  departments={departments} 
                />
              </DashboardLayout>
            } 
          />
          <Route 
            path="/admin/issues" 
            element={
              <DashboardLayout role="admin">
                <ManageIssues 
                  issues={issues} 
                  resolvers={resolvers} 
                  onAssignResolver={handleAssignResolver} 
                  onUpdateStatus={handleUpdateStatus} 
                />
              </DashboardLayout>
            } 
          />
          <Route 
            path="/admin/users" 
            element={
              <DashboardLayout role="admin">
                <ManageUsers users={users} />
              </DashboardLayout>
            } 
          />
          <Route 
            path="/admin/resolvers" 
            element={
              <DashboardLayout role="admin">
                <ManageResolvers 
                  resolvers={resolvers} 
                  departments={departments} 
                  onAddResolver={handleAddResolver} 
                />
              </DashboardLayout>
            } 
          />
          <Route 
            path="/admin/departments" 
            element={
              <DashboardLayout role="admin">
                <ManageDepartments 
                  departments={departments} 
                  resolvers={resolvers} 
                />
              </DashboardLayout>
            } 
          />

          {}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
