// Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '@/components/GlobalContext/GlobalContext';
import { Link } from 'react-router-dom';
import { FaSignInAlt, FaGoogle, FaGithub } from 'react-icons/fa';

const SignIn = () => {
  const { auth } = useGlobalContext();
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });


  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await auth.login(formData);
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-primaryRed to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-500">Please sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
            disabled={isLoading}
            className="w-full bg-primaryRed text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Signing In...</span>
              </div>
            ) : (
              <>
                <FaSignInAlt /> Sign In
              </>
            )}
          </button>

          <div className="text-center mt-4">
            <Link to="/forgot-password" className="text-primaryRed hover:text-red-600">
              Forgot Password?
            </Link>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
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
            Don't have an account?{' '}
            <Link to="/register" className="text-primaryRed hover:text-red-600 font-semibold">
              Create one
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;