import React, { useState } from 'react';
import SignUpForm from './Signup';
import SignInForm from './SignInForm';

function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(true);

  // Toggle between Sign Up and Sign In
  const toggleAuthMode = () => {
    setIsSignUp((prev) => !prev);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </h2>

        {/* Conditionally render Sign Up or Sign In form */}
        {isSignUp ? <SignUpForm /> : <SignInForm />}

        <p className="text-sm text-center text-gray-600">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={toggleAuthMode}
            className="font-medium text-blue-500 hover:text-blue-700 transition-colors"
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default AuthPage;
