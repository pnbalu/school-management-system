import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Settings, 
  User, 
  Shield, 
  Bell, 
  Database, 
  Key, 
  Lock, 
  Eye,
  Save,
  RefreshCw,
  Download,
  Upload,
  Edit,
  Plus,
  Search,
  FileText,
  Info,
  Mail,
  Phone,
  Monitor
} from "lucide-react";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "admin" | "teacher" | "student" | "parent" | "staff";
  avatar?: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other";
  department?: string;
  position?: string;
  joinDate: string;
  lastLogin: string;
  status: "active" | "inactive" | "suspended";
  preferences: UserPreferences;
  permissions: string[];
  twoFactorEnabled: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
}

interface UserPreferences {
  theme: "light" | "dark" | "auto";
  language: string;
  timezone: string;
  dateFormat: string;
  timeFormat: "12h" | "24h";
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  accessibility: AccessibilitySettings;
}

interface NotificationSettings {
  email: boolean;
  sms: boolean;
  push: boolean;
  desktop: boolean;
  announcements: boolean;
  reminders: boolean;
  updates: boolean;
  security: boolean;
  marketing: boolean;
}

interface PrivacySettings {
  profileVisibility: "public" | "private" | "friends";
  showEmail: boolean;
  showPhone: boolean;
  showAddress: boolean;
  allowMessages: boolean;
  dataSharing: boolean;
  analytics: boolean;
}

interface AccessibilitySettings {
  fontSize: "small" | "medium" | "large";
  highContrast: boolean;
  screenReader: boolean;
  keyboardNavigation: boolean;
  reducedMotion: boolean;
  colorBlind: boolean;
}

interface SystemConfig {
  id: string;
  name: string;
  value: string;
  type: "string" | "number" | "boolean" | "json";
  category: "general" | "security" | "email" | "database" | "api" | "ui";
  description: string;
  required: boolean;
  editable: boolean;
  lastModified: string;
  modifiedBy: string;
}

interface SecuritySettings {
  passwordPolicy: PasswordPolicy;
  sessionTimeout: number;
  maxLoginAttempts: number;
  lockoutDuration: number;
  twoFactorRequired: boolean;
  ipWhitelist: string[];
  allowedDomains: string[];
  encryptionEnabled: boolean;
  auditLogging: boolean;
  dataRetention: number;
}

interface PasswordPolicy {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSymbols: boolean;
  maxAge: number;
  preventReuse: number;
}

interface BackupSettings {
  enabled: boolean;
  frequency: "daily" | "weekly" | "monthly";
  retention: number;
  location: string;
  encryption: boolean;
  compression: boolean;
  lastBackup: string;
  nextBackup: string;
  size: number;
}

export default function SettingsScreen() {
  const [activeTab, setActiveTab] = useState("profile");
  const [searchTerm, setSearchTerm] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showBackupModal, setShowBackupModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Mock data
  const userProfile: UserProfile = {
    id: "1",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@school.edu",
    role: "admin",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, City, State 12345",
    dateOfBirth: "1980-05-15",
    gender: "female",
    department: "Administration",
    position: "School Principal",
    joinDate: "2020-01-15",
    lastLogin: "2024-12-15T10:30:00Z",
    status: "active",
    preferences: {
      theme: "light",
      language: "en",
      timezone: "America/New_York",
      dateFormat: "MM/DD/YYYY",
      timeFormat: "12h",
      notifications: {
        email: true,
        sms: false,
        push: true,
        desktop: true,
        announcements: true,
        reminders: true,
        updates: true,
        security: true,
        marketing: false
      },
      privacy: {
        profileVisibility: "private",
        showEmail: false,
        showPhone: false,
        showAddress: false,
        allowMessages: true,
        dataSharing: false,
        analytics: true
      },
      accessibility: {
        fontSize: "medium",
        highContrast: false,
        screenReader: false,
        keyboardNavigation: true,
        reducedMotion: false,
        colorBlind: false
      }
    },
    permissions: ["admin", "user_management", "system_config", "backup_restore"],
    twoFactorEnabled: true,
    emailVerified: true,
    phoneVerified: false
  };

  const systemConfigs: SystemConfig[] = [
    {
      id: "1",
      name: "school_name",
      value: "Elite School Management System",
      type: "string",
      category: "general",
      description: "The name of the school",
      required: true,
      editable: true,
      lastModified: "2024-12-01T09:00:00Z",
      modifiedBy: "Dr. Sarah Johnson"
    },
    {
      id: "2",
      name: "max_students",
      value: "1000",
      type: "number",
      category: "general",
      description: "Maximum number of students allowed",
      required: true,
      editable: true,
      lastModified: "2024-11-15T14:30:00Z",
      modifiedBy: "Dr. Sarah Johnson"
    },
    {
      id: "3",
      name: "session_timeout",
      value: "30",
      type: "number",
      category: "security",
      description: "Session timeout in minutes",
      required: true,
      editable: true,
      lastModified: "2024-12-10T11:15:00Z",
      modifiedBy: "Dr. Sarah Johnson"
    },
    {
      id: "4",
      name: "email_enabled",
      value: "true",
      type: "boolean",
      category: "email",
      description: "Enable email notifications",
      required: false,
      editable: true,
      lastModified: "2024-12-05T16:45:00Z",
      modifiedBy: "Dr. Sarah Johnson"
    }
  ];

  const securitySettings: SecuritySettings = {
    passwordPolicy: {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSymbols: true,
      maxAge: 90,
      preventReuse: 5
    },
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    lockoutDuration: 15,
    twoFactorRequired: true,
    ipWhitelist: ["192.168.1.0/24", "10.0.0.0/8"],
    allowedDomains: ["school.edu", "admin.school.edu"],
    encryptionEnabled: true,
    auditLogging: true,
    dataRetention: 365
  };

  const backupSettings: BackupSettings = {
    enabled: true,
    frequency: "daily",
    retention: 30,
    location: "/backups/school-management",
    encryption: true,
    compression: true,
    lastBackup: "2024-12-15T02:00:00Z",
    nextBackup: "2024-12-16T02:00:00Z",
    size: 2048
  };

  const filteredConfigs = systemConfigs.filter(config => {
    const matchesSearch = config.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         config.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         config.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "inactive": return "bg-red-100 text-red-800";
      case "suspended": return "bg-yellow-100 text-yellow-800";
      case "verified": return "bg-green-100 text-green-800";
      case "unverified": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin": return "bg-red-100 text-red-800";
      case "teacher": return "bg-blue-100 text-blue-800";
      case "student": return "bg-green-100 text-green-800";
      case "parent": return "bg-purple-100 text-purple-800";
      case "staff": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "general": return "bg-blue-100 text-blue-800";
      case "security": return "bg-red-100 text-red-800";
      case "email": return "bg-green-100 text-green-800";
      case "database": return "bg-purple-100 text-purple-800";
      case "api": return "bg-yellow-100 text-yellow-800";
      case "ui": return "bg-pink-100 text-pink-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const PasswordModal = () => (
    <Dialog open={showPasswordModal} onOpenChange={setShowPasswordModal}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Change Password
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Current Password</label>
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">New Password</label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Confirm Password</label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
            />
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Info className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">Password Requirements</span>
            </div>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• At least {securitySettings.passwordPolicy.minLength} characters</li>
              <li>• Include uppercase and lowercase letters</li>
              <li>• Include numbers and symbols</li>
              <li>• Cannot reuse last {securitySettings.passwordPolicy.preventReuse} passwords</li>
            </ul>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setShowPasswordModal(false)}>
            Cancel
          </Button>
          <Button className="bg-gradient-to-r from-primary-500 to-primary-600">
            <Save className="h-4 w-4 mr-2" />
            Change Password
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  const BackupModal = () => (
    <Dialog open={showBackupModal} onOpenChange={setShowBackupModal}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Backup & Restore
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Backup Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Backup Enabled</label>
                  <p className="text-sm">{backupSettings.enabled ? 'Yes' : 'No'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Frequency</label>
                  <p className="text-sm capitalize">{backupSettings.frequency}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Retention (days)</label>
                  <p className="text-sm">{backupSettings.retention}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Last Backup</label>
                  <p className="text-sm">{new Date(backupSettings.lastBackup).toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Next Backup</label>
                  <p className="text-sm">{new Date(backupSettings.nextBackup).toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Size</label>
                  <p className="text-sm">{(backupSettings.size / 1024).toFixed(1)} GB</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Download Backup
            </Button>
            <Button variant="outline" className="flex-1">
              <Upload className="h-4 w-4 mr-2" />
              Restore Backup
            </Button>
            <Button className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600">
              <RefreshCw className="h-4 w-4 mr-2" />
              Create Backup
            </Button>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setShowBackupModal(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account and system preferences</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Settings
          </Button>
          <Button className="bg-gradient-to-r from-primary-500 to-primary-600">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg">
        {["profile", "preferences", "security", "notifications", "system", "backup"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === tab
                ? "bg-white text-primary-600 shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "profile" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Profile Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={userProfile.avatar} />
                    <AvatarFallback className="text-lg">
                      {userProfile.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">{userProfile.name}</h3>
                    <p className="text-muted-foreground">{userProfile.email}</p>
                    <Badge className={getRoleColor(userProfile.role)}>
                      {userProfile.role}
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Phone</label>
                    <p className="text-sm">{userProfile.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Department</label>
                    <p className="text-sm">{userProfile.department}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Position</label>
                    <p className="text-sm">{userProfile.position}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Join Date</label>
                    <p className="text-sm">{new Date(userProfile.joinDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Last Login</label>
                    <p className="text-sm">{new Date(userProfile.lastLogin).toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Status</label>
                    <Badge className={getStatusColor(userProfile.status)}>
                      {userProfile.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button variant="outline" onClick={() => setShowPasswordModal(true)}>
                    <Lock className="h-4 w-4 mr-2" />
                    Change Password
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Security Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span className="text-sm">Email Verification</span>
                    </div>
                    <Badge className={getStatusColor(userProfile.emailVerified ? "verified" : "unverified")}>
                      {userProfile.emailVerified ? "Verified" : "Unverified"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span className="text-sm">Phone Verification</span>
                    </div>
                    <Badge className={getStatusColor(userProfile.phoneVerified ? "verified" : "unverified")}>
                      {userProfile.phoneVerified ? "Verified" : "Unverified"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Key className="h-4 w-4" />
                      <span className="text-sm">Two-Factor Authentication</span>
                    </div>
                    <Badge className={getStatusColor(userProfile.twoFactorEnabled ? "verified" : "unverified")}>
                      {userProfile.twoFactorEnabled ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Permissions</h4>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.permissions.map((permission, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {permission.replace('_', ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      )}

      {activeTab === "preferences" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* General Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  General Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Theme</label>
                    <Select defaultValue={userProfile.preferences.theme}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="auto">Auto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Language</label>
                    <Select defaultValue={userProfile.preferences.language}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Timezone</label>
                    <Select defaultValue={userProfile.preferences.timezone}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/New_York">Eastern Time</SelectItem>
                        <SelectItem value="America/Chicago">Central Time</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Time Format</label>
                    <Select defaultValue={userProfile.preferences.timeFormat}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12h">12 Hour</SelectItem>
                        <SelectItem value="24h">24 Hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Accessibility Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Accessibility Settings
              </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">High Contrast Mode</span>
                    <input type="checkbox" defaultChecked={userProfile.preferences.accessibility.highContrast} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Screen Reader Support</span>
                    <input type="checkbox" defaultChecked={userProfile.preferences.accessibility.screenReader} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Keyboard Navigation</span>
                    <input type="checkbox" defaultChecked={userProfile.preferences.accessibility.keyboardNavigation} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Reduced Motion</span>
                    <input type="checkbox" defaultChecked={userProfile.preferences.accessibility.reducedMotion} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Color Blind Support</span>
                    <input type="checkbox" defaultChecked={userProfile.preferences.accessibility.colorBlind} />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Font Size</label>
                  <Select defaultValue={userProfile.preferences.accessibility.fontSize}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      )}

      {activeTab === "security" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Password Policy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Password Policy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Minimum Length</span>
                    <span className="font-semibold">{securitySettings.passwordPolicy.minLength} characters</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Require Uppercase</span>
                    <input type="checkbox" defaultChecked={securitySettings.passwordPolicy.requireUppercase} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Require Lowercase</span>
                    <input type="checkbox" defaultChecked={securitySettings.passwordPolicy.requireLowercase} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Require Numbers</span>
                    <input type="checkbox" defaultChecked={securitySettings.passwordPolicy.requireNumbers} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Require Symbols</span>
                    <input type="checkbox" defaultChecked={securitySettings.passwordPolicy.requireSymbols} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Maximum Age</span>
                    <span className="font-semibold">{securitySettings.passwordPolicy.maxAge} days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Prevent Reuse</span>
                    <span className="font-semibold">Last {securitySettings.passwordPolicy.preventReuse} passwords</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Session Timeout</span>
                    <span className="font-semibold">{securitySettings.sessionTimeout} minutes</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Max Login Attempts</span>
                    <span className="font-semibold">{securitySettings.maxLoginAttempts}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Lockout Duration</span>
                    <span className="font-semibold">{securitySettings.lockoutDuration} minutes</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Two-Factor Required</span>
                    <input type="checkbox" defaultChecked={securitySettings.twoFactorRequired} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Encryption Enabled</span>
                    <input type="checkbox" defaultChecked={securitySettings.encryptionEnabled} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Audit Logging</span>
                    <input type="checkbox" defaultChecked={securitySettings.auditLogging} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Data Retention</span>
                    <span className="font-semibold">{securitySettings.dataRetention} days</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      )}

      {activeTab === "notifications" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Notification Channels</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span className="text-sm">Email Notifications</span>
                      </div>
                      <input type="checkbox" defaultChecked={userProfile.preferences.notifications.email} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span className="text-sm">SMS Notifications</span>
                      </div>
                      <input type="checkbox" defaultChecked={userProfile.preferences.notifications.sms} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4" />
                        <span className="text-sm">Push Notifications</span>
                      </div>
                      <input type="checkbox" defaultChecked={userProfile.preferences.notifications.push} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Monitor className="h-4 w-4" />
                        <span className="text-sm">Desktop Notifications</span>
                      </div>
                      <input type="checkbox" defaultChecked={userProfile.preferences.notifications.desktop} />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Notification Types</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Announcements</span>
                      <input type="checkbox" defaultChecked={userProfile.preferences.notifications.announcements} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Reminders</span>
                      <input type="checkbox" defaultChecked={userProfile.preferences.notifications.reminders} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">System Updates</span>
                      <input type="checkbox" defaultChecked={userProfile.preferences.notifications.updates} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Security Alerts</span>
                      <input type="checkbox" defaultChecked={userProfile.preferences.notifications.security} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Marketing</span>
                      <input type="checkbox" defaultChecked={userProfile.preferences.notifications.marketing} />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {activeTab === "system" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>System Configuration</CardTitle>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search configurations..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Button className="bg-gradient-to-r from-primary-500 to-primary-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Configuration
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Required</TableHead>
                    <TableHead>Last Modified</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredConfigs.map((config, index) => (
                    <motion.tr
                      key={config.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-muted/50"
                    >
                      <TableCell>
                        <div>
                          <p className="font-medium">{config.name}</p>
                          <p className="text-sm text-muted-foreground">{config.description}</p>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{config.value}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{config.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getCategoryColor(config.category)}>
                          {config.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <input type="checkbox" defaultChecked={config.required} disabled />
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{new Date(config.lastModified).toLocaleDateString()}</p>
                          <p className="text-muted-foreground">{config.modifiedBy}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {activeTab === "backup" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Backup Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Backup Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Status</label>
                    <p className="text-sm font-semibold text-green-600">Active</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Frequency</label>
                    <p className="text-sm capitalize">{backupSettings.frequency}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Last Backup</label>
                    <p className="text-sm">{new Date(backupSettings.lastBackup).toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Next Backup</label>
                    <p className="text-sm">{new Date(backupSettings.nextBackup).toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Size</label>
                    <p className="text-sm">{(backupSettings.size / 1024).toFixed(1)} GB</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Retention</label>
                    <p className="text-sm">{backupSettings.retention} days</p>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Upload className="h-4 w-4 mr-2" />
                      Restore
                    </Button>
                    <Button className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600" onClick={() => setShowBackupModal(true)}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Create
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Backup Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Backup Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Backup Enabled</span>
                    <input type="checkbox" defaultChecked={backupSettings.enabled} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Encryption</span>
                    <input type="checkbox" defaultChecked={backupSettings.encryption} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Compression</span>
                    <input type="checkbox" defaultChecked={backupSettings.compression} />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Backup Location</label>
                  <p className="text-sm font-mono bg-muted p-2 rounded">{backupSettings.location}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Frequency</label>
                  <Select defaultValue={backupSettings.frequency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Retention (days)</label>
                  <Input type="number" defaultValue={backupSettings.retention} />
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      )}

      {/* Modals */}
      <PasswordModal />
      <BackupModal />
    </div>
  );
}
