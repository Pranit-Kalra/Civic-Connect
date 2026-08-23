
import React, { useState } from 'react';
import Button from '../../components/Button';

function ManageUsers({ users }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter((u) => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Manage Registered Users</h1>
          <p className="page-subtitle">Directory of registered citizens and portal members.</p>
        </div>
      </div>

      <div style={{ marginBottom: '1.25rem', maxWidth: '400px' }}>
        <input
          type="text"
          className="form-control"
          placeholder="🔍 Search users by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Full Name</th>
              <th>Email Address</th>
              <th>Phone</th>
              <th>City</th>
              <th>System Role</th>
              <th>Joined Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>
                  No users found matching "{searchTerm}".
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td><strong>#{user.id}</strong></td>
                  <td><strong>{user.name}</strong></td>
                  <td>{user.email}</td>
                  <td>{user.phone || 'N/A'}</td>
                  <td>📍 {user.city || 'Rajpura'}</td>
                  <td>
                    <span className="role-tag" style={{ backgroundColor: user.role === 'admin' ? '#ef4444' : user.role === 'resolver' ? '#8b5cf6' : '#2563eb' }}>
                      {user.role}
                    </span>
                  </td>
                  <td>{user.joinedDate || '10 Jan 2026'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageUsers;
