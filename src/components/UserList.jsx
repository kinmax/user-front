import { useEffect, useState } from 'react';
import { useUsers } from '../hooks/useUsers';
import Modal from './Modal';
import UserForm from './UserForm';
import './UserList.css';

function UserList() {
  // Use the custom hook - access all user state and operations
  const { users, loading, error, fetchUsers, deleteUser, createUser, updateUser, deleteAllUsers } = useUsers();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Fetch users when component mounts
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Handle delete with confirmation
  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
        alert('User deleted successfully!');
      } catch (err) {
        alert('Failed to delete user');
      }
    }
  };

  const handleDeleteAllUsers = async () => {
    if (window.confirm('Are you sure you want to delete ALL users? This action cannot be undone.')) {
      try {
        await deleteAllUsers();
        alert('All users deleted successfully!');
      } catch (err) {
        alert('Failed to delete all users');
      }
    } 
  };

  const handleAddUser = () => {
    setIsAddModalOpen(true);
  };

  const handleEditUser = (user) => {
    setIsEditModalOpen(true);
    setEditingUser(user);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingUser(null);
  };

  const handleSubmitUser = async (formData) => {
    try {
      await createUser(formData);
      alert('User created successfully!');
      handleCloseAddModal();
    } catch (err) {
      alert('Failed to create user: ' + (err.message || 'Unknown error'));
      throw err;
    }
  };

  const handleSaveEditedUser = async (formData) => {
    try {
      // Assuming updateUser function is available from useUsers hook
      await updateUser(editingUser.id, formData);
      alert('User updated successfully!');
      handleCloseEditModal();
    } catch (err) {
      alert('Failed to update user: ' + (err.message || 'Unknown error'));
      throw err;
    }
  };

  const formatDataForForm = (user) => {
    if (user) {
      return {
        name: user.name,
        email: user.email,
        birthDate: user.birthDate.split('T')[0], // Format to YYYY-MM-DD
        city: user.location.city,
        state: user.location.state,
        country: user.location.country
      };
    }

    return null;
  };

  // Loading state
  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading users...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="error">
        <h2>⚠️ Error</h2>
        <p>{error}</p>
        <button onClick={fetchUsers} className="retry-btn">
          Retry
        </button>
      </div>
    );
  }

  // Empty state
  if (users.length === 0) {
    return (
      <div className="empty">
        {/* Modal for adding user */}
        <Modal
          isOpen={isAddModalOpen}
          onClose={handleCloseAddModal}
          title="Add New User"
        >
          <UserForm
            onSubmit={handleSubmitUser}
            onCancel={handleCloseAddModal}
          />
        </Modal>
        
        <h2>No Users Found</h2>
        <p>There are no users in the system yet.</p>
        <button onClick={fetchUsers} className="refresh-btn">
          Refresh
        </button>
        <button onClick={handleAddUser} className="add-btn">
          ➕ Add User
        </button>
      </div>
    );
  }

  console.log("users", users);

  // Render users list
  return (
    <div className="user-list">
      <div className="header">
        <h1>Users List</h1>
        <span className="user-count">{users.length} users</span>
      </div>
      
      <div className="action-buttons">
        <button onClick={fetchUsers} className="refresh-btn">
          🔄 Refresh
        </button>

        <button onClick={handleAddUser} className="add-btn">
          ➕ Add User
        </button>

        <button onClick={handleDeleteAllUsers} className="delete-all-btn">
          🗑️ Delete All Users
        </button>
      </div>

      {/* Modal for adding user */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        title="Add New User"
      >
        <UserForm
          onSubmit={handleSubmitUser}
          onCancel={handleCloseAddModal}
        />
      </Modal>

      {/* Modal for editing user */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        title="Edit User"
      >
        <UserForm
          initialData={formatDataForForm(editingUser)}
          onSubmit={handleSaveEditedUser}
          onCancel={handleCloseEditModal}
        />
      </Modal>

      <div className="users-grid">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <div className="user-header">
              <h3>{user.name}</h3>
            </div>
            
            <div className="user-info">
              <div className="info-row">
                <span className="label">📧 Email:</span>
                <span className="value">{user.email}</span>
              </div>
              
              <div className="info-row">
                <span className="label">📍 Location:</span>
                <span className="value">{user.location.city}, {user.location.state}</span>
              </div>
              
              <div className="info-row">
                <span className="label">🌍 Country:</span>
                <span className="value">{user.location.country}</span>
              </div>
              
              <div className="info-row">
                <span className="label">🎂 Birth Date:</span>
                <span className="value">
                  {new Date(user.birthDate).toLocaleDateString()}
                </span>
              </div>
              
              <div className="info-row">
                <span className="label">🆔 User ID:</span>
                <span className="value user-id">{user.id}</span>
              </div>
            </div>
            
            <div className="card-actions">
              <button 
                className="edit-btn"
                onClick={() => handleEditUser(user)}
                title="Edit user"
              >
                ✏️ Edit
              </button>
              <button 
                className="delete-btn"
                onClick={() => handleDelete(user.id)}
                title="Delete user"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;
