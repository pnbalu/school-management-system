import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'teacher' | 'student' | 'parent' | 'staff' | 'principal';
  branch: string;
  branchName: string;
  department: string;
  position: string;
  avatar?: string;
  phone: string;
  isActive: boolean;
  lastLogin: string;
  permissions: string[];
}

interface Branch {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  email: string;
  principal: string;
  established: string;
  isActive: boolean;
}

interface AuthContextType {
  user: User | null;
  branch: Branch | null;
  branches: Branch[];
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, branchId: string) => Promise<boolean>;
  logout: () => void;
  switchBranch: (branchId: string) => Promise<boolean>;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
  forgotPassword: (email: string, branchId: string) => Promise<boolean>;
  resetPassword: (token: string, newPassword: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [branch, setBranch] = useState<Branch | null>(null);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock branches data
  const mockBranches: Branch[] = [
    {
      id: "1",
      name: "Elite School - Main Campus",
      address: "123 Education Street",
      city: "New York",
      state: "NY",
      country: "USA",
      phone: "+1 (555) 123-4567",
      email: "main@eliteschool.edu",
      principal: "Dr. Sarah Johnson",
      established: "2020",
      isActive: true
    },
    {
      id: "2",
      name: "Elite School - Downtown Campus",
      address: "456 Learning Avenue",
      city: "New York",
      state: "NY",
      country: "USA",
      phone: "+1 (555) 234-5678",
      email: "downtown@eliteschool.edu",
      principal: "Prof. Michael Chen",
      established: "2021",
      isActive: true
    },
    {
      id: "3",
      name: "Elite School - Suburban Campus",
      address: "789 Knowledge Road",
      city: "Brooklyn",
      state: "NY",
      country: "USA",
      phone: "+1 (555) 345-6789",
      email: "suburban@eliteschool.edu",
      principal: "Ms. Emily Davis",
      established: "2022",
      isActive: true
    }
  ];

  // Mock users data
  const mockUsers: User[] = [
    {
      id: "1",
      email: "admin@eliteschool.edu",
      firstName: "Sarah",
      lastName: "Johnson",
      role: "admin",
      branch: "1",
      branchName: "Elite School - Main Campus",
      department: "Administration",
      position: "School Administrator",
      phone: "+1 (555) 123-4567",
      isActive: true,
      lastLogin: new Date().toISOString(),
      permissions: ["admin", "user_management", "system_config", "backup_restore", "reports", "analytics"]
    },
    {
      id: "2",
      email: "teacher@eliteschool.edu",
      firstName: "Michael",
      lastName: "Chen",
      role: "teacher",
      branch: "1",
      branchName: "Elite School - Main Campus",
      department: "Mathematics",
      position: "Mathematics Teacher",
      phone: "+1 (555) 234-5678",
      isActive: true,
      lastLogin: new Date().toISOString(),
      permissions: ["teacher", "student_management", "attendance", "grades", "reports"]
    },
    {
      id: "3",
      email: "principal@eliteschool.edu",
      firstName: "Emily",
      lastName: "Davis",
      role: "principal",
      branch: "2",
      branchName: "Elite School - Downtown Campus",
      department: "Administration",
      position: "School Principal",
      phone: "+1 (555) 345-6789",
      isActive: true,
      lastLogin: new Date().toISOString(),
      permissions: ["principal", "teacher_management", "student_management", "reports", "analytics"]
    }
  ];

  useEffect(() => {
    // Initialize branches
    setBranches(mockBranches);

    // Check for existing session
    const checkAuth = async () => {
      try {
        const savedUser = localStorage.getItem('user');
        const savedBranch = localStorage.getItem('currentBranch');
        
        if (savedUser && savedBranch) {
          const userData = JSON.parse(savedUser);
          const branchData = mockBranches.find(b => b.id === savedBranch);
          
          if (branchData) {
            setUser(userData);
            setBranch(branchData);
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string, branchId: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock validation
      console.log("AuthContext: Looking for user with email:", email, "branch:", branchId);
      const userData = mockUsers.find(u => u.email === email && u.branch === branchId);
      const branchData = mockBranches.find(b => b.id === branchId);
      
      console.log("AuthContext: Found user:", userData);
      console.log("AuthContext: Found branch:", branchData);
      console.log("AuthContext: Password check:", password === "admin123");
      
      if (userData && branchData && password === "admin123") {
        setUser(userData);
        setBranch(branchData);
        
        // Save to localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('currentBranch', branchId);
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setBranch(null);
    localStorage.removeItem('user');
    localStorage.removeItem('currentBranch');
  };

  const switchBranch = async (branchId: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const branchData = mockBranches.find(b => b.id === branchId);
      
      if (branchData && user) {
        // Update user's branch
        const updatedUser = { ...user, branch: branchId, branchName: branchData.name };
        setUser(updatedUser);
        setBranch(branchData);
        
        // Save to localStorage
        localStorage.setItem('user', JSON.stringify(updatedUser));
        localStorage.setItem('currentBranch', branchId);
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Branch switch failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (user) {
        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Profile update failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const changePassword = async (currentPassword: string, _newPassword: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation
      if (currentPassword === "admin123") {
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Password change failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email: string, branchId: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation
      const userExists = mockUsers.some(u => u.email === email && u.branch === branchId);
      return userExists;
    } catch (error) {
      console.error('Forgot password failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (token: string, newPassword: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation
      if (token && newPassword) {
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Password reset failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    branch,
    branches,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    switchBranch,
    updateProfile,
    changePassword,
    forgotPassword,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
