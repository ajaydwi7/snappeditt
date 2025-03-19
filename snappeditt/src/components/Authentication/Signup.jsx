// Register.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '@/components/GlobalContext/GlobalContext';
import { Link } from 'react-router-dom';
import { FaUserPlus, FaGoogle, FaGithub } from 'react-icons/fa';

const SignUp = () => {
  const { auth } = useGlobalContext();
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    username: '',
    email: '',
    password: '',
  });

  // Update handleSubmit in Signup.jsx
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await auth.register(formData);
      navigate('/');
    } catch (error) {
      toast.error(error.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primaryRed to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
          <p className="text-gray-500">Join our community today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primaryRed focus:border-transparent transition-all"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primaryRed focus:border-transparent transition-all"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primaryRed focus:border-transparent transition-all"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primaryRed text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
          >
            <FaUserPlus /> Create Account
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or sign up with</span>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              type="button"
              className="p-3 rounded-full border border-gray-200 hover:border-primaryRed transition-colors"
            >
              <FaGoogle className="text-xl text-gray-600" />
            </button>
            <button
              type="button"
              className="p-3 rounded-full border border-gray-200 hover:border-primaryRed transition-colors"
            >
              <FaGithub className="text-xl text-gray-600" />
            </button>
          </div>

          <p className="text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-primaryRed hover:text-red-600 font-semibold">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;