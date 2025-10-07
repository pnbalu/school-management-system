import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import BranchSwitcher from "@/components/BranchSwitcher";
import HRManagement from "@/components/HRManagement";
import StudentScreen from "@/components/StudentScreen";
import TeacherScreen from "@/components/TeacherScreen";
import FinanceScreen from "@/components/FinanceScreen";
import CoursesScreen from "@/components/CoursesScreen";
import LibraryScreen from "@/components/LibraryScreen";
import TransportScreen from "@/components/TransportScreen";
import SettingsScreen from "@/components/SettingsScreen";
import ReportsScreen from "@/components/ReportsScreen";
import AttendanceScreen from "@/components/AttendanceScreen";
import ExamsScreen from "@/components/ExamsScreen";
import PayrollScreen from "@/components/PayrollScreen";
import AnalyticsScreen from "@/components/AnalyticsScreen";
import BranchManagementScreen from "@/components/BranchManagementScreen";
import {
  User,
  BookOpen,
  Settings,
  GraduationCap,
  BarChart3,
  Calendar,
  FileText,
  Bell,
  Search,
  Plus,
  TrendingUp,
  Users,
  BookOpenCheck,
  Award,
  Clock,
  ChevronRight,
  Sparkles,
  Brain,
  Zap,
  DollarSign,
  PieChart,
  Receipt,
  UserCog,
  BookMarked,
  School,
  LogOut,
  UserCircle,
  Shield
} from "lucide-react";

function SchoolManagementApp() {
  const { user, branch, logout } = useAuth();
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [aiResponse, setAiResponse] = useState("");
  const [aiInput, setAiInput] = useState("");

  const leftMenuItems = [
    { name: "Dashboard", icon: <BarChart3 size={20} />, badge: "New" },
    { name: "Students", icon: <Users size={20} />, count: 1247 },
    { name: "Teachers", icon: <GraduationCap size={20} />, count: 89 },
    { name: "HR Management", icon: <UserCog size={20} />, count: 45 },
    { name: "Finance", icon: <DollarSign size={20} />, count: "$2.4M" },
    { name: "Courses", icon: <BookOpen size={20} />, count: 156 },
    { name: "Library", icon: <BookMarked size={20} />, count: 12.5 },
    { name: "Transport", icon: <School size={20} />, count: 8 },
    { name: "Settings", icon: <Settings size={20} /> },
    { name: "Branches", icon: <School size={20} />, count: 3 },
  ];

  const topMenuItems = [
    { name: "Reports", icon: <FileText size={16} /> },
    { name: "Attendance", icon: <Calendar size={16} /> },
    { name: "Exams", icon: <Award size={16} /> },
    { name: "Payroll", icon: <Receipt size={16} /> },
    { name: "Analytics", icon: <PieChart size={16} /> },
    { name: "AI Assistant", icon: <Brain size={16} />, variant: "gradient" },
  ];

  const handleAiSubmit = async () => {
    setAiResponse(`AI Assistant: I analyzed your query -> "${aiInput}". Here are my insights:

📊 **Key Insights:**
• Student engagement has increased by 23% this semester
• Math performance shows 15% improvement
• Attendance rate is at 94.2%

💡 **Recommendations:**
• Focus on personalized learning paths
• Implement peer tutoring programs
• Schedule parent-teacher conferences

🎯 **Next Steps:**
• Review individual student progress
• Update curriculum based on performance data
• Plan extracurricular activities`);
  };

  const getDashboardContent = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Students", value: "1,247", change: "+12%", icon: <Users className="h-5 w-5" />, color: "text-blue-600" },
          { title: "Active Teachers", value: "89", change: "+3%", icon: <GraduationCap className="h-5 w-5" />, color: "text-green-600" },
          { title: "HR Staff", value: "45", change: "+5%", icon: <UserCog className="h-5 w-5" />, color: "text-purple-600" },
          { title: "Monthly Revenue", value: "$2.4M", change: "+8.2%", icon: <DollarSign className="h-5 w-5" />, color: "text-orange-600" },
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-green-600 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {stat.change}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full bg-primary/10 ${stat.color}`}>
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "New student enrolled", user: "Sarah Johnson", time: "2 minutes ago", type: "success" },
                { action: "Payroll processed", user: "HR Department", time: "15 minutes ago", type: "info" },
                { action: "Teacher hired", user: "Michael Brown", time: "1 hour ago", type: "success" },
                { action: "Grade updated", user: "Alex Rodriguez", time: "2 hours ago", type: "success" },
                { action: "Fee payment received", user: "Parent Portal", time: "3 hours ago", type: "info" },
                { action: "Attendance marked", user: "Class 10A", time: "4 hours ago", type: "info" },
              ].map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">
                      {activity.user.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.user} • {activity.time}</p>
                  </div>
                  <Badge variant={activity.type as any} className="text-xs">
                    {activity.type}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpenCheck className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {[
                { title: "Add Student", icon: <User className="h-4 w-4" />, color: "bg-blue-500" },
                { title: "Process Payroll", icon: <Receipt className="h-4 w-4" />, color: "bg-green-500" },
                { title: "Schedule Exam", icon: <Award className="h-4 w-4" />, color: "bg-purple-500" },
                { title: "Generate Report", icon: <FileText className="h-4 w-4" />, color: "bg-orange-500" },
                { title: "HR Management", icon: <UserCog className="h-4 w-4" />, color: "bg-indigo-500" },
                { title: "Financial Report", icon: <DollarSign className="h-4 w-4" />, color: "bg-emerald-500" },
              ].map((action) => (
                <motion.button
                  key={action.title}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg border hover:shadow-md transition-all"
                >
                  <div className={`p-2 rounded-full ${action.color} text-white`}>
                    {action.icon}
                  </div>
                  <span className="text-xs font-medium">{action.title}</span>
                </motion.button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Sidebar */}
      <motion.div 
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="w-72 bg-white/80 backdrop-blur-xl border-r border-white/20 shadow-soft"
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold gradient-text">EduManage</h2>
              <p className="text-xs text-muted-foreground">School Management</p>
            </div>
          </div>

          <nav className="space-y-2">
            {leftMenuItems.map((item, index) => (
              <motion.button
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveMenu(item.name)}
                className={`sidebar-item w-full ${activeMenu === item.name ? 'active' : ''}`}
              >
                {item.icon}
                <span className="flex-1 text-left">{item.name}</span>
                {item.badge && (
                  <Badge variant="secondary" className="text-xs">
                    {item.badge}
                  </Badge>
                )}
                {item.count && (
                  <Badge variant="outline" className="text-xs">
                    {item.count}
                  </Badge>
                )}
                {activeMenu === item.name && (
                  <ChevronRight className="h-4 w-4" />
                )}
              </motion.button>
            ))}
          </nav>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <motion.div 
          initial={{ y: -60 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-soft"
        >
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search students, courses, or anything..."
                  className="pl-10 pr-4 py-2 w-80 rounded-xl border border-input bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                {topMenuItems.map((item) => (
                  <Button
                    key={item.name}
                    variant={item.variant === "gradient" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveMenu(item.name)}
                    className={`${item.variant === "gradient" ? "bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg" : ""} ${
                      activeMenu === item.name ? "bg-primary/10 text-primary-600" : ""
                    }`}
                  >
                    {item.icon}
                    {item.name}
                  </Button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                {/* Branch Switcher */}
                <div className="w-64">
                  <BranchSwitcher />
                </div>

                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
                </Button>
                
                {/* User Dropdown Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/api/placeholder/32/32" />
                        <AvatarFallback>{user?.firstName?.[0]}{user?.lastName?.[0]}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.firstName} {user?.lastName}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.email}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <Badge variant="outline" className="text-xs">
                            <Shield className="h-3 w-3 mr-1" />
                            {user?.role}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            <School className="h-3 w-3 mr-1" />
                            {branch?.name}
                          </Badge>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <UserCircle className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMenu}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeMenu === "Dashboard" ? (
                getDashboardContent()
              ) : activeMenu === "Students" ? (
                <StudentScreen />
              ) : activeMenu === "Teachers" ? (
                <TeacherScreen />
              ) : activeMenu === "Courses" ? (
                <CoursesScreen />
              ) : activeMenu === "Library" ? (
                <LibraryScreen />
              ) : activeMenu === "Transport" ? (
                <TransportScreen />
              ) : activeMenu === "Finance" ? (
                <FinanceScreen />
              ) : activeMenu === "HR Management" ? (
                <HRManagement />
              ) : activeMenu === "Settings" ? (
                <SettingsScreen />
              ) : activeMenu === "Reports" ? (
                <ReportsScreen />
              ) : activeMenu === "Attendance" ? (
                <AttendanceScreen />
              ) : activeMenu === "Exams" ? (
                <ExamsScreen />
              ) : activeMenu === "Payroll" ? (
                <PayrollScreen />
              ) : activeMenu === "Analytics" ? (
                <AnalyticsScreen />
              ) : activeMenu === "Branches" ? (
                <BranchManagementScreen />
              ) : activeMenu === "AI Assistant" ? (
                <Card className="max-w-4xl mx-auto">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                        <Brain className="h-5 w-5" />
                      </div>
                      AI Assistant
                      <Badge variant="secondary" className="ml-auto">
                        <Sparkles className="h-3 w-3 mr-1" />
                        Powered by AI
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <Textarea
                        value={aiInput}
                        onChange={(e) => setAiInput(e.target.value)}
                        placeholder="Ask me anything about your school management... (e.g., 'How can I improve student engagement?' or 'Generate a report on attendance trends')"
                        className="min-h-[120px] resize-none"
                      />
                      <Button 
                        onClick={handleAiSubmit} 
                        className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg"
                        disabled={!aiInput.trim()}
                      >
                        <Zap className="h-4 w-4 mr-2" />
                        Ask AI Assistant
                      </Button>
                    </div>
                    
                    {aiResponse && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200"
                      >
                        <div className="flex items-center gap-2 mb-3">
                        <div className="p-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
                          <Brain className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-medium text-blue-900">AI Response</span>
                      </div>
                      <div className="prose prose-sm max-w-none text-blue-900 whitespace-pre-line">
                        {aiResponse}
                      </div>
                    </motion.div>
                  )}
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary-600">
                        {leftMenuItems.find(item => item.name === activeMenu)?.icon}
                      </div>
                      {activeMenu}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <div className="p-4 rounded-full bg-primary/10 w-fit mx-auto mb-4">
                        {leftMenuItems.find(item => item.name === activeMenu)?.icon}
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{activeMenu} Management</h3>
                      <p className="text-muted-foreground mb-6">
                        Advanced {activeMenu.toLowerCase()} management features coming soon.
                      </p>
                      <Button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white">
                        <Plus className="h-4 w-4 mr-2" />
                        Add New {activeMenu.slice(0, -1)}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <SchoolManagementApp />
      </ProtectedRoute>
    </AuthProvider>
  );
}