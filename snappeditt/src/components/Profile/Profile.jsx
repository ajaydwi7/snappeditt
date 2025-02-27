import React, { useEffect, useState } from "react";
import useAuth from "../hooks/auth";
import { toast } from "react-toastify";

const UserProfile = () => {
  const { state, logout } = useAuth();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (state.user) {
      fetch(`${import.meta.env.VITE_API_URL}/users/${state.user.id}`, {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          setFormData({ username: data.username, email: data.email, password: "" });
          setLoading(false);
        })
        .catch(() => {
          toast.error("Failed to fetch user data");
          setLoading(false);
        });
    }
  }, [state.user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${state.user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Profile updated successfully");
        setUser(result);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Error updating profile");
    }
  };

  if (loading) {
    return <div className="text-center text-gray-500 mt-10">Loading profile...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">User Profile</h2>
      <div className="flex flex-col space-y-4">
        <div>
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">New Password (optional)</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <button
          onClick={handleUpdate}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Update Profile
        </button>
        <button
          onClick={logout}
          className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition mt-2"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
