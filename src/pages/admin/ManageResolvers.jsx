
import React, { useState } from 'react';
import Button from '../../components/Button';

function ManageResolvers({ resolvers, departments, onAddResolver }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('resolver123');
  const [department, setDepartment] = useState(departments[0] ? departments[0].name : 'Road & Transport');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedDeptObj = departments.find(d => d.name === department);

    const newResolver = {
      id: Date.now(),
      name: name,
      email: email,
      password: password || 'resolver123',
      department: department,
      departmentId: selectedDeptObj ? selectedDeptObj.id : 1,
      role: 'resolver',
      phone: phone || '+91 98765 00000',
      assignedIssuesCount: 0,
      status: 'Active'
    };

    onAddResolver(newResolver);
    setName('');
    setEmail('');
    setPassword('resolver123');
    setPhone('');
    setShowAddForm(false);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Manage Department Resolvers</h1>
          <p className="page-subtitle">Field technicians and department workers assigned to civic tickets.</p>
        </div>
        <Button variant="primary" onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'Close Form' : '➕ Add New Resolver'}
        </Button>
      </div>

      {showAddForm && (
        <div className="form-card" style={{ marginBottom: '2rem', maxWidth: '600px' }}>
          <h3>Add New Resolver Staff</h3>
          <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Suresh Varma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Gov Email Address</label>
              <input
                type="email"
                className="form-control"
                placeholder="suresh@civicconnect.gov"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Account Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Set password for resolver"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Assigned Department</label>
              <select
                className="form-control"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.name}>{dept.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Phone Number (10 digits)</label>
              <input
                type="tel"
                className="form-control"
                placeholder="e.g. 9876543210"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                maxLength={10}
                minLength={10}
                pattern="[0-9]{10}"
                title="Phone number must be exactly 10 digits"
                required
              />
            </div>
            <Button type="submit" variant="primary">Create Resolver Account</Button>
          </form>
        </div>
      )}

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Resolver Name</th>
              <th>Department</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {resolvers.map((res) => (
              <tr key={res.id}>
                <td><strong>#{res.id}</strong></td>
                <td><strong>{res.name}</strong></td>
                <td><span className="category-pill">{res.department}</span></td>
                <td>{res.email}</td>
                <td>📞 {res.phone}</td>
                <td>
                  <span className="badge badge-resolved">• Active</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageResolvers;
