import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar({ role }) {
  return (
    <aside className="sidebar">
      <div>
        <h4 style={{ padding: '0 1rem 1rem', fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          {role} Menu
        </h4>

        <ul className="sidebar-menu">
          {}
          {role === 'citizen' && (
            <>
              <li className="sidebar-item">
                <NavLink to="/citizen/dashboard">
                  📊 Dashboard
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink to="/citizen/report">
                  ➕ Report New Issue
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink to="/citizen/issues">
                  📋 My Submitted Issues
                </NavLink>
              </li>
            </>
          )}

          {}
          {role === 'resolver' && (
            <>
              <li className="sidebar-item">
                <NavLink to="/resolver/dashboard">
                  📊 Overview
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink to="/resolver/issues">
                  🛠️ Assigned Issues
                </NavLink>
              </li>
            </>
          )}

          {}
          {role === 'admin' && (
            <>
              <li className="sidebar-item">
                <NavLink to="/admin/dashboard">
                  📊 Overview
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink to="/admin/issues">
                  📂 All Complaints
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink to="/admin/users">
                  👥 Manage Citizens
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink to="/admin/resolvers">
                  🛠️ Manage Resolvers
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink to="/admin/departments">
                  🏢 Departments
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      <div className="sidebar-footer">
        <p style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
          CivicConnect Portal v1.0
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;
