import React from 'react';

function ManageDepartments({ departments, resolvers }) {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Municipal Departments</h1>
          <p className="page-subtitle">Overview of civic infrastructure divisions and staff counts.</p>
        </div>
      </div>

      <div className="categories-grid">
        {departments.map((dept) => {

          const staffInDept = resolvers.filter(r => r.department === dept.name).length;

          return (
            <div key={dept.id} className="category-card" style={{ textAlign: 'left', padding: '1.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '2.5rem' }}>{dept.icon}</span>
                <span className="category-pill">{dept.code}</span>
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.4rem' }}>{dept.name}</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1rem' }}>
                Responsible for public infrastructure repair and maintenance.
              </p>
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem', fontSize: '0.85rem', color: '#334155', fontWeight: 600 }}>
                👥 Active Resolvers: {staffInDept} staff member(s)
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ManageDepartments;
