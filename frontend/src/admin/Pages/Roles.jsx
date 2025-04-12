// src/admin/Pages/Roles.jsx
import { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';
import AdminNavbar from '../Components/AdminNavbar';
import AdminSidebar from '../Components/AdminSidebar';
import '../admin.css';

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newRole, setNewRole] = useState({
    name: '',
    permissions: {
      users: false,
      ngos: false,
      donations: false,
      requests: false,
      settings: false
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [rolesRes, adminsRes] = await Promise.all([
          adminAPI.get('/admin/roles'),
          adminAPI.get('/admin/admins')
        ]);
        setRoles(rolesRes.data);
        setAdmins(adminsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handlePermissionChange = (permission) => {
    setNewRole(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permission]: !prev.permissions[permission]
      }
    }));
  };

  const handleCreateRole = async () => {
    try {
      await adminAPI.post('/admin/roles', newRole);
      // Refresh roles list
      const res = await adminAPI.get('/admin/roles');
      setRoles(res.data);
      setNewRole({
        name: '',
        permissions: {
          users: false,
          ngos: false,
          donations: false,
          requests: false,
          settings: false
        }
      });
    } catch (error) {
      console.error('Error creating role:', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <AdminNavbar />
      <div className="admin-content">
        <AdminSidebar />
        <main className="admin-main">
          <h1>Role Management</h1>
          
          <div className="role-management">
            <div className="create-role">
              <h3>Create New Role</h3>
              <input
                type="text"
                placeholder="Role name"
                value={newRole.name}
                onChange={(e) => setNewRole({...newRole, name: e.target.value})}
              />
              <div className="permissions-grid">
                {Object.keys(newRole.permissions).map(permission => (
                  <label key={permission}>
                    <input
                      type="checkbox"
                      checked={newRole.permissions[permission]}
                      onChange={() => handlePermissionChange(permission)}
                    />
                    {permission.charAt(0).toUpperCase() + permission.slice(1)}
                  </label>
                ))}
              </div>
              <button onClick={handleCreateRole}>Create Role</button>
            </div>
            
            <div className="roles-list">
              <h3>Existing Roles</h3>
              {roles.map(role => (
                <div key={role._id} className="role-card">
                  <h4>{role.name}</h4>
                  <ul>
                    {Object.entries(role.permissions)
                      .filter(([_, value]) => value)
                      .map(([permission]) => (
                        <li key={permission}>{permission}</li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Roles;