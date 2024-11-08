import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../Firebase/Firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);
  const navigate =useNavigate(); // Navigation hook
  const isAuthenticated = !!user;
  const adminAuth = role === "admin";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user); // Set the user when authentication state changes
      setLoading(true); // Start loading

      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userRole = userDoc.data().role;
          setRole(userRole); // Set user role from Firestore
        }
      } else {
        setRole(null); // No user, reset the role
      }

      setLoading(false); // End loading
    });

    return unsubscribe;
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  useEffect(() => {
    if (role) {
      if (role === "admin") {
        navigate("/admin-dash"); // Redirect to admin dashboard if the role is "admin"
      } else if (role === "user") {
        navigate("/dashboard"); // Redirect to user dashboard if the role is "user"
      }
    }
  }, [role, navigate]); // Dependency array ensures it runs when role changes

  const logout = async () => {
    await signOut(auth);
    navigate("/"); // Redirect to home (login) page after logout
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, isAuthenticated, adminAuth, role }}>
      {!loading && children} {/* Render children only after loading is complete */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
