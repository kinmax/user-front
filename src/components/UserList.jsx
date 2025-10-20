import { useEffect } from 'react';
import { useUsers } from '../hooks/useUsers';
import './UserList.css';

function UserList() {
  // Use the custom hook - access all user state and operations
  const { users, loading, error, fetchUsers, deleteUser } = useUsers();

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
        <h2>No Users Found</h2>
        <p>There are no users in the system yet.</p>
        <button onClick={fetchUsers} className="refresh-btn">
          Refresh
        </button>
      </div>
    );
  }

  // Render users list
  return (
    <div className="user-list">
      <div className="header">
        <h1>Users List</h1>
        <span className="user-count">{users.length} users</span>
      </div>
      
      <button onClick={fetchUsers} className="refresh-btn">
        🔄 Refresh
      </button>
      
      <div className="users-grid">
        {users.map((user) => (
          <div key={user.userId} className="user-card">
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
                <span className="value">{user.city}, {user.state}</span>
              </div>
              
              <div className="info-row">
                <span className="label">🌍 Country:</span>
                <span className="value">{user.country}</span>
              </div>
              
              <div className="info-row">
                <span className="label">🎂 Birth Date:</span>
                <span className="value">
                  {new Date(user.birthDate).toLocaleDateString()}
                </span>
              </div>
              
              <div className="info-row">
                <span className="label">🆔 User ID:</span>
                <span className="value user-id">{user.userId}</span>
              </div>
            </div>
            
            <div className="card-actions">
              <button className="edit-btn" title="Edit user">
                ✏️ Edit
              </button>
              <button 
                className="delete-btn"
                onClick={() => handleDelete(user.userId)}
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
