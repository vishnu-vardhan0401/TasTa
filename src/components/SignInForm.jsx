import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/Firebase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/GlobalState';

function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { role } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true); // Start loading state
      try {
        await signInWithEmailAndPassword(auth, email, password);
        // The role will be fetched and updated in context after login
      } catch (error) {
        console.error('Error logging in:', error.message);
        setLoading(false); // Stop loading on error
      }
    }
  };

  // Redirect once `role` is available and `loading` is true
  useEffect(() => {
    if (loading && role) {
      setLoading(false); // Stop loading once role is fetched
      if (role === "admin") {
        navigate('/admin-dash');
      } else {
        navigate('/dashboard');
      }
    }
  }, [role, loading, navigate]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-600 text-sm font-medium mb-1">Email Address</label>
        <input
          type="email"
          placeholder="email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-gray-600 text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
      </div>

      <button
        type="submit"
        disabled={loading} // Disable button during loading
        className={`w-full py-2 mt-4 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Signing In...' : 'Sign In'}
      </button>
    </form>
  );
}

export default SignInForm;
