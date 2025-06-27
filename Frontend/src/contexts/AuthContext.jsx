import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isInitialCheckDone, setIsInitialCheckDone] = useState(false);

  // On app mount, try to fetch profile once (but silently)
  useEffect(() => {
    fetch("http://localhost:3001/api/v1/user/profile", {
      method: "GET",
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        if (data.status) {
          setUser(data.data);
        } else {
          setUser(null); // session might be expired
        }
        setIsInitialCheckDone(true);
      })
      .catch(err => {
        console.warn("Silent session check failed:", err);
        setUser(null);
        setIsInitialCheckDone(true);
      });
  }, []);

  const login = (email, password, callback) => {
  fetch("http://localhost:3001/api/v1/user/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(res => res.json())
    .then(data => {
      if (data.status) {
        setUser(data.data);
        toast.success("Login successful!");
        if (callback) callback(); 
      } else {
        toast.error(data.message || "Login failed.");
      }
    })
    .catch(err => {
      console.error("Login error:", err);
      toast.error("Something went wrong during login.");
    });
};

  const logout = () => {
    fetch("http://localhost:3001/api/v1/user/logout", {
      method: "GET",
      credentials: "include",
    })
      .then(() => {
        setUser(null);
        toast.success("Logout successful!");
      })
      .catch(err => {
        console.error("Logout error:", err);
        setUser(null);
        toast.warning("Logout may not have completed.");
      });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isInitialCheckDone }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);