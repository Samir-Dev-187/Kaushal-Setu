import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole, UserSession } from '../types';

interface AuthContextType {
  user: UserSession | null;
  selectedRole: UserRole | null;
  pendingOtpAuth: {
    role: UserRole;
    userId: string;
    userName: string;
    orgName?: string;
  } | null;
  fontScale: 'sm' | 'md' | 'lg';
  language: 'en' | 'mr' | 'hi';
  setSelectedRole: (role: UserRole | null) => void;
  setFontScale: (scale: 'sm' | 'md' | 'lg') => void;
  setLanguage: (lang: 'en' | 'mr' | 'hi') => void;
  loginWithCredentials: (role: UserRole, userId: string, name?: string, orgName?: string) => boolean;
  verifyOtpCode: (code: string) => boolean;
  logout: () => void;
  setPendingUser: (data: { role: UserRole; userId: string; userName: string; orgName?: string }) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserSession | null>(() => {
    try {
      const stored = localStorage.getItem('kaushal_setu_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [selectedRole, setSelectedRole] = useState<UserRole | null>(() => {
    try {
      const storedRole = localStorage.getItem('kaushal_setu_role');
      return (storedRole as UserRole) || null;
    } catch {
      return null;
    }
  });

  const [pendingOtpAuth, setPendingOtpAuth] = useState<{
    role: UserRole;
    userId: string;
    userName: string;
    orgName?: string;
  } | null>(() => {
    try {
      const pending = sessionStorage.getItem('kaushal_setu_pending_otp');
      return pending ? JSON.parse(pending) : null;
    } catch {
      return null;
    }
  });

  const [fontScale, setFontScaleState] = useState<'sm' | 'md' | 'lg'>('md');
  const [language, setLanguageState] = useState<'en' | 'mr' | 'hi'>(() => {
    try {
      const stored = localStorage.getItem('kaushal_setu_language');
      if (stored === 'en' || stored === 'mr' || stored === 'hi') {
        return stored;
      }
    } catch {}
    return 'en';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('font-scale-sm', 'font-scale-md', 'font-scale-lg');
    root.classList.add(`font-scale-${fontScale}`);
  }, [fontScale]);

  const setFontScale = (scale: 'sm' | 'md' | 'lg') => {
    setFontScaleState(scale);
  };

  const setLanguage = (lang: 'en' | 'mr' | 'hi') => {
    setLanguageState(lang);
    try {
      localStorage.setItem('kaushal_setu_language', lang);
      const candidateProfile = localStorage.getItem('kaushal_candidate_profile');
      if (candidateProfile) {
        const parsed = JSON.parse(candidateProfile);
        parsed.language = lang;
        localStorage.setItem('kaushal_candidate_profile', JSON.stringify(parsed));
      }
    } catch (e) {
      console.error('Failed to sync language to localStorage', e);
    }
  };

  const loginWithCredentials = (role: UserRole, userId: string, name = 'Authorized User', orgName = '') => {
    const pendingData = {
      role,
      userId,
      userName: name,
      orgName
    };
    setPendingOtpAuth(pendingData);
    sessionStorage.setItem('kaushal_setu_pending_otp', JSON.stringify(pendingData));
    setSelectedRole(role);
    localStorage.setItem('kaushal_setu_role', role);
    return true;
  };

  const setPendingUser = (data: { role: UserRole; userId: string; userName: string; orgName?: string }) => {
    setPendingOtpAuth(data);
    sessionStorage.setItem('kaushal_setu_pending_otp', JSON.stringify(data));
    setSelectedRole(data.role);
    localStorage.setItem('kaushal_setu_role', data.role);
  };

  const verifyOtpCode = (code: string) => {
    if (code === '123456') {
      if (pendingOtpAuth) {
        const newUser: UserSession = {
          role: pendingOtpAuth.role,
          userId: pendingOtpAuth.userId,
          userName: pendingOtpAuth.userName,
          orgName: pendingOtpAuth.orgName,
          isOtpVerified: true
        };
        setUser(newUser);
        localStorage.setItem('kaushal_setu_user', JSON.stringify(newUser));
        sessionStorage.removeItem('kaushal_setu_pending_otp');
        setPendingOtpAuth(null);
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setPendingOtpAuth(null);
    localStorage.removeItem('kaushal_setu_user');
    sessionStorage.removeItem('kaushal_setu_pending_otp');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        selectedRole,
        pendingOtpAuth,
        fontScale,
        language,
        setSelectedRole,
        setFontScale,
        setLanguage,
        loginWithCredentials,
        verifyOtpCode,
        logout,
        setPendingUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
