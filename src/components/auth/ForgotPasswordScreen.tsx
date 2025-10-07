import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Mail, 
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Loader2,
  Shield,
  Key,
  Send
} from "lucide-react";

interface ForgotPasswordFormData {
  email: string;
  branch: string;
}

interface Branch {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  isActive: boolean;
}

export default function ForgotPasswordScreen() {
  const [formData, setFormPasswordFormData] = useState<ForgotPasswordFormData>({
    email: "",
    branch: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(1); // 1: Email, 2: Verification, 3: Reset

  // Mock branches data
  const branches: Branch[] = [
    {
      id: "1",
      name: "Elite School - Main Campus",
      address: "123 Education Street",
      city: "New York",
      state: "NY",
      country: "USA",
      isActive: true
    },
    {
      id: "2",
      name: "Elite School - Downtown Campus",
      address: "456 Learning Avenue",
      city: "New York",
      state: "NY",
      country: "USA",
      isActive: true
    },
    {
      id: "3",
      name: "Elite School - Suburban Campus",
      address: "789 Knowledge Road",
      city: "Brooklyn",
      state: "NY",
      country: "USA",
      isActive: true
    }
  ];

  const handleInputChange = (field: keyof ForgotPasswordFormData, value: string) => {
    setFormPasswordFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (error) setError("");
  };

  const handleSendResetLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock validation
      if (formData.email === "admin@eliteschool.edu") {
        setStep(2);
      } else {
        setError("Email not found. Please check your email address or contact administrator.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStep(3);
    } catch (err) {
      setError("Invalid verification code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccess(true);
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // const selectedBranch = branches.find(branch => branch.id === formData.branch);

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="glass-effect border-0 shadow-2xl">
            <CardContent className="text-center p-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mb-4"
              >
                <CheckCircle className="h-8 w-8 text-white" />
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Password Reset Successful!</h2>
              <p className="text-gray-600 mb-6">
                Your password has been reset successfully. You can now sign in with your new password.
              </p>
              <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                Continue to Login
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

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
            <Key className="h-8 w-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {step === 1 ? "Forgot Password" : step === 2 ? "Verify Code" : "Reset Password"}
          </h1>
          <p className="text-gray-600">
            {step === 1 ? "Enter your email to receive a reset link" :
             step === 2 ? "Enter the verification code sent to your email" :
             "Enter your new password"}
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    stepNumber <= step
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div
                    className={`w-8 h-0.5 ${
                      stepNumber < step ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <Card className="glass-effect border-0 shadow-2xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-gray-900">
              {step === 1 ? "Reset Password" : step === 2 ? "Verification" : "New Password"}
            </CardTitle>
            <p className="text-gray-600">
              {step === 1 ? "We'll send you a reset link" :
               step === 2 ? "Check your email for the verification code" :
               "Choose a strong password"}
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={step === 1 ? handleSendResetLink : step === 2 ? handleVerifyCode : handleResetPassword} className="space-y-6">
              {/* Step 1: Email */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="branch">Select Branch</Label>
                    <select
                      id="branch"
                      value={formData.branch}
                      onChange={(e) => handleInputChange("branch", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Choose your branch</option>
                      {branches.map((branch) => (
                        <option key={branch.id} value={branch.id}>
                          {branch.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Verification Code */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">Verification Code Sent</span>
                    </div>
                    <p className="text-xs text-blue-700">
                      We've sent a 6-digit verification code to <strong>{formData.email}</strong>
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="code">Verification Code</Label>
                    <Input
                      id="code"
                      type="text"
                      placeholder="Enter 6-digit code"
                      maxLength={6}
                      className="text-center text-lg tracking-widest"
                      required
                    />
                  </div>
                  <div className="text-center">
                    <button
                      type="button"
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Didn't receive the code? Resend
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: New Password */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <div className="relative">
                      <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="newPassword"
                        type="password"
                        placeholder="Enter new password"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm new password"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="text-sm font-medium text-blue-900 mb-2">Password Requirements</h4>
                    <ul className="text-xs text-blue-700 space-y-1">
                      <li>• At least 8 characters long</li>
                      <li>• Include uppercase and lowercase letters</li>
                      <li>• Include at least one number</li>
                      <li>• Include at least one special character</li>
                    </ul>
                  </div>
                </motion.div>
              )}

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
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {step === 1 ? "Sending..." : step === 2 ? "Verifying..." : "Resetting..."}
                  </>
                ) : (
                  <>
                    {step === 1 ? (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Reset Link
                      </>
                    ) : step === 2 ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Verify Code
                      </>
                    ) : (
                      <>
                        <Key className="h-4 w-4 mr-2" />
                        Reset Password
                      </>
                    )}
                  </>
                )}
              </Button>
            </form>

            {/* Back Button */}
            {step > 1 && (
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 mx-auto"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-600">
          <p>Remember your password? <span className="text-blue-600 hover:text-blue-700 cursor-pointer font-medium">Sign In</span></p>
        </div>
      </motion.div>
    </div>
  );
}
