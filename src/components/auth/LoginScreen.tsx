import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  Building, 
  AlertCircle,
  Loader2,
  School,
  Shield
} from "lucide-react";

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
  branch: string;
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

export default function LoginScreen() {
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    rememberMe: false,
    branch: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [showBranchSelector, setShowBranchSelector] = useState(false);

  // Mock branches data
  const branches: Branch[] = [
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

  const handleInputChange = (field: keyof LoginFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password || !formData.branch) {
      setError("Please fill in all fields");
      return;
    }

    try {
      console.log("Attempting login with:", { email: formData.email, branch: formData.branch });
      const success = await login(formData.email, formData.password, formData.branch);
      console.log("Login result:", success);
      if (!success) {
        setError("Invalid email or password. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred. Please try again.");
    }
  };

  const selectedBranch = branches.find(branch => branch.id === formData.branch);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-4"
          >
            <School className="h-8 w-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your school management account</p>
        </div>

        {/* Login Form */}
        <Card className="glass-effect border-0 shadow-2xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-gray-900">Sign In</CardTitle>
            <p className="text-gray-600">Enter your credentials to access your account</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Branch Selection */}
              <div className="space-y-2">
                <Label htmlFor="branch" className="text-sm font-medium text-gray-700">
                  Select Branch
                </Label>
                <div className="relative">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-start text-left h-11"
                    onClick={() => setShowBranchSelector(!showBranchSelector)}
                  >
                    <Building className="h-4 w-4 mr-2" />
                    {selectedBranch ? selectedBranch.name : "Choose your branch"}
                  </Button>
                  {showBranchSelector && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
                    >
                      {branches.map((branch) => (
                        <button
                          key={branch.id}
                          type="button"
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b last:border-b-0"
                          onClick={() => {
                            handleInputChange("branch", branch.id);
                            setShowBranchSelector(false);
                          }}
                        >
                          <div className="font-medium text-gray-900">{branch.name}</div>
                          <div className="text-sm text-gray-500">{branch.address}, {branch.city}</div>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="pl-10 h-11"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="pl-10 pr-10 h-11"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked: boolean) => handleInputChange("rememberMe", checked)}
                  />
                  <Label htmlFor="remember" className="text-sm text-gray-600">
                    Remember me
                  </Label>
                </div>
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Forgot password?
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700"
                >
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">{error}</span>
                </motion.div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium"
                disabled={isLoading || !formData.branch}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4 mr-2" />
                    Sign In
                  </>
                )}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="text-sm font-medium text-blue-900 mb-2">Demo Credentials</h4>
              <div className="text-xs text-blue-700 space-y-1">
                <div><strong>Email:</strong> admin@eliteschool.edu</div>
                <div><strong>Password:</strong> admin123</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-sm font-medium text-blue-900 mb-2">Demo Credentials</h3>
          <div className="text-xs text-blue-700 space-y-1">
            <p><strong>Admin:</strong> admin@eliteschool.edu (Branch: Main Campus)</p>
            <p><strong>Teacher:</strong> teacher@eliteschool.edu (Branch: Main Campus)</p>
            <p><strong>Principal:</strong> principal@eliteschool.edu (Branch: Downtown Campus)</p>
            <p><strong>Password:</strong> admin123</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-600">
          <p>Don't have an account? <span className="text-blue-600 hover:text-blue-700 cursor-pointer font-medium">Contact Administrator</span></p>
          <p className="mt-2">
            <span className="text-blue-600 hover:text-blue-700 cursor-pointer font-medium">Forgot Password?</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
