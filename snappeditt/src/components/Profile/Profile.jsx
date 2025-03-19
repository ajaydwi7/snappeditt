"use client"
import { useState, useEffect } from "react"
import useAuth from "../../store/auth"
import { FaSave, FaEdit, FaTimes, FaEye, FaEyeSlash } from "react-icons/fa"
import './profile.css'
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const UserProfile = () => {
  const { state, logout } = useAuth()
  const [user, setUser] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState({})
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate()
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  useEffect(() => {
    if (state.user) {
      fetchUserData(state.user.id)
    }
  }, [state.user])

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
        credentials: "include",
      })
      const userData = await response.json()
      setUser(userData)
      setEditedUser(userData)
    } catch (error) {
      console.error("Error fetching user data:", error)
    }
  }

  const handleSave = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(editedUser),
      })

      if (response.ok) {
        setUser(editedUser)
        setIsEditing(false)
        setSuccessMessage("Profile updated successfully!")
        setTimeout(() => setSuccessMessage(""), 3000)
      } else {
        setErrorMessage("Failed to update profile")
        setTimeout(() => setErrorMessage(""), 3000)
      }
    } catch (error) {
      console.error("Error updating user data:", error)
      setErrorMessage("Error updating profile")
      setTimeout(() => setErrorMessage(""), 3000)
    }
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (response.ok) {
        toast.success('Password changed successfully');
        setCurrentPassword('');
        setNewPassword('');
      } else {
        const error = await response.json();
        toast.error(error.error);
      }
    } catch (error) {
      toast.error('Error changing password');
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="avatar-container">
          <img
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${user?.username}&backgroundColor=ff0000`}
            alt="Profile"
            className="profile-avatar"
          />
          <button className="avatar-edit-btn">
            <FaEdit size={18} />
          </button>
        </div>

        <div className="profile-actions">
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)} className="edit-btn">
              <FaEdit /> Edit Profile
            </button>
          ) : (
            <div className="action-buttons">
              <button onClick={handleSave} className="save-btn">
                <FaSave /> Save Changes
              </button>
              <button onClick={() => setIsEditing(false)} className="cancel-btn">
                <FaTimes /> Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="form-section">
        <h2>Profile Information</h2>
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={editedUser.username || ""}
              onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
              disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={editedUser.email || ""}
              onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
              disabled={!isEditing}
            />
          </div>
        </form>
      </div>

      <div className="form-section">
        <h2>Security Settings</h2>
        <form onSubmit={handlePasswordChange}>
          <div className="form-group">
            <label>Current Password</label>
            <div className="password-input-container">
              <input
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
              <span
                className="toggle-password"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="form-group">
            <label>New Password</label>
            <div className="password-input-container">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength="8"
              />
              <span
                className="toggle-password"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="password-strength">
              {[1, 2, 3, 4].map((_, index) => (
                <div
                  key={index}
                  className="strength-bar"
                  style={{
                    background: newPassword.length > index * 2 ?
                      (newPassword.length > 6 ? '#4CAF50' : '#FF9800') : '#eee'
                  }}
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="save-btn"
            disabled={!currentPassword || !newPassword}
          >
            <FaSave /> Update Password
          </button>
        </form>
      </div>

      <div className="stats-container">
        <div className="stat-item">
          <span className="stat-label">Member Since</span>
          <span className="stat-value">
            {new Date(user?.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short'
            })}
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Total Orders</span>
          <span className="stat-value">12</span>
        </div>
      </div>

      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  )
}

export default UserProfile