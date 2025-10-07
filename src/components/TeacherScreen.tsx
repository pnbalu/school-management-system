import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  TrendingUp, 
  Plus, 
  Edit, 
  Trash2, 
  Download,
  Search,
  Calendar,
  Award,
  UserPlus,
  FileText,
  CheckCircle,
  Eye,
  User,
  DollarSign,
  Star,
  BarChart3,
  AlertCircle
} from "lucide-react";

interface Teacher {
  id: string;
  name: string;
  teacherId: string;
  email: string;
  phone: string;
  address: string;
  department: string;
  subject: string;
  qualification: string;
  experience: number;
  salary: number;
  joinDate: string;
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  emergencyContact: string;
  status: "active" | "inactive" | "on-leave" | "retired";
  avatar?: string;
  rating?: number;
  classes?: string[];
  students?: number;
  achievements?: string[];
  medicalInfo?: string;
  bankAccount?: string;
  lastPaymentDate?: string;
  nextPaymentDate?: string;
  totalSalary?: number;
  paidSalary?: number;
  pendingSalary?: number;
}

interface TeacherSchedule {
  id: string;
  teacherId: string;
  teacherName: string;
  subject: string;
  class: string;
  day: string;
  startTime: string;
  endTime: string;
  room: string;
  status: "scheduled" | "completed" | "cancelled";
}

interface TeacherPerformance {
  id: string;
  teacherId: string;
  teacherName: string;
  subject: string;
  class: string;
  students: number;
  averageScore: number;
  attendance: number;
  rating: number;
  feedback: string;
  semester: string;
  year: string;
}

export default function TeacherScreen() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [showTeacherModal, setShowTeacherModal] = useState(false);

  // Mock data
  const teachers: Teacher[] = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      teacherId: "TCH001",
      email: "sarah.johnson@school.edu",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, City, State 12345",
      department: "Mathematics",
      subject: "Advanced Mathematics",
      qualification: "Ph.D. in Mathematics",
      experience: 15,
      salary: 7500,
      joinDate: "2010-09-01",
      dateOfBirth: "1975-03-15",
      gender: "Female",
      bloodGroup: "A+",
      emergencyContact: "+1 (555) 111-2222",
      status: "active",
      rating: 4.8,
      classes: ["10th Grade", "11th Grade", "12th Grade"],
      students: 45,
      achievements: ["Best Teacher Award 2023", "Mathematics Excellence Award"],
      medicalInfo: "No known allergies",
      bankAccount: "****1234",
      lastPaymentDate: "2024-12-01",
      nextPaymentDate: "2025-01-01",
      totalSalary: 7500,
      paidSalary: 7500,
      pendingSalary: 0
    },
    {
      id: "2",
      name: "Prof. Michael Chen",
      teacherId: "TCH002",
      email: "michael.chen@school.edu",
      phone: "+1 (555) 234-5678",
      address: "456 Oak Ave, City, State 12345",
      department: "Science",
      subject: "Physics",
      qualification: "M.Sc. in Physics",
      experience: 12,
      salary: 6800,
      joinDate: "2012-08-15",
      dateOfBirth: "1980-07-22",
      gender: "Male",
      bloodGroup: "B+",
      emergencyContact: "+1 (555) 333-4444",
      status: "active",
      rating: 4.6,
      classes: ["9th Grade", "10th Grade", "11th Grade"],
      students: 38,
      achievements: ["Science Fair Coordinator", "Physics Olympiad Coach"],
      medicalInfo: "Allergic to pollen",
      bankAccount: "****5678",
      lastPaymentDate: "2024-12-01",
      nextPaymentDate: "2025-01-01",
      totalSalary: 6800,
      paidSalary: 6800,
      pendingSalary: 0
    },
    {
      id: "3",
      name: "Ms. Emily Davis",
      teacherId: "TCH003",
      email: "emily.davis@school.edu",
      phone: "+1 (555) 345-6789",
      address: "789 Pine St, City, State 12345",
      department: "English",
      subject: "English Literature",
      qualification: "M.A. in English Literature",
      experience: 8,
      salary: 5500,
      joinDate: "2016-09-01",
      dateOfBirth: "1985-11-08",
      gender: "Female",
      bloodGroup: "O+",
      emergencyContact: "+1 (555) 555-6666",
      status: "on-leave",
      rating: 4.7,
      classes: ["9th Grade", "10th Grade"],
      students: 32,
      achievements: ["Creative Writing Award", "Debate Team Coach"],
      medicalInfo: "No known conditions",
      bankAccount: "****9012",
      lastPaymentDate: "2024-11-01",
      nextPaymentDate: "2024-12-01",
      totalSalary: 5500,
      paidSalary: 2750,
      pendingSalary: 2750
    },
    {
      id: "4",
      name: "Mr. David Rodriguez",
      teacherId: "TCH004",
      email: "david.rodriguez@school.edu",
      phone: "+1 (555) 456-7890",
      address: "321 Elm St, City, State 12345",
      department: "Computer Science",
      subject: "Programming",
      qualification: "B.Tech in Computer Science",
      experience: 6,
      salary: 6200,
      joinDate: "2018-01-15",
      dateOfBirth: "1990-05-12",
      gender: "Male",
      bloodGroup: "AB+",
      emergencyContact: "+1 (555) 777-8888",
      status: "active",
      rating: 4.5,
      classes: ["11th Grade", "12th Grade"],
      students: 28,
      achievements: ["Coding Competition Winner", "Tech Innovation Award"],
      medicalInfo: "No known conditions",
      bankAccount: "****3456",
      lastPaymentDate: "2024-12-01",
      nextPaymentDate: "2025-01-01",
      totalSalary: 6200,
      paidSalary: 6200,
      pendingSalary: 0
    }
  ];

  const teacherSchedules: TeacherSchedule[] = [
    {
      id: "1",
      teacherId: "TCH001",
      teacherName: "Dr. Sarah Johnson",
      subject: "Advanced Mathematics",
      class: "12th Grade",
      day: "Monday",
      startTime: "09:00",
      endTime: "10:30",
      room: "Room 101",
      status: "scheduled"
    },
    {
      id: "2",
      teacherId: "TCH002",
      teacherName: "Prof. Michael Chen",
      subject: "Physics",
      class: "11th Grade",
      day: "Tuesday",
      startTime: "10:30",
      endTime: "12:00",
      room: "Lab 201",
      status: "scheduled"
    },
    {
      id: "3",
      teacherId: "TCH003",
      teacherName: "Ms. Emily Davis",
      subject: "English Literature",
      class: "10th Grade",
      day: "Wednesday",
      startTime: "08:00",
      endTime: "09:30",
      room: "Room 102",
      status: "completed"
    }
  ];

  const teacherPerformance: TeacherPerformance[] = [
    {
      id: "1",
      teacherId: "TCH001",
      teacherName: "Dr. Sarah Johnson",
      subject: "Advanced Mathematics",
      class: "12th Grade",
      students: 25,
      averageScore: 87.5,
      attendance: 94.2,
      rating: 4.8,
      feedback: "Excellent teaching methodology and student engagement",
      semester: "Fall 2024",
      year: "2024"
    },
    {
      id: "2",
      teacherId: "TCH002",
      teacherName: "Prof. Michael Chen",
      subject: "Physics",
      class: "11th Grade",
      students: 20,
      averageScore: 82.3,
      attendance: 91.5,
      rating: 4.6,
      feedback: "Great practical demonstrations and lab work",
      semester: "Fall 2024",
      year: "2024"
    },
    {
      id: "3",
      teacherId: "TCH003",
      teacherName: "Ms. Emily Davis",
      subject: "English Literature",
      class: "10th Grade",
      students: 18,
      averageScore: 89.1,
      attendance: 96.8,
      rating: 4.7,
      feedback: "Inspiring literature discussions and creative writing",
      semester: "Fall 2024",
      year: "2024"
    }
  ];

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.teacherId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === "all" || teacher.department === filterDepartment;
    const matchesStatus = filterStatus === "all" || teacher.status === filterStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const totalTeachers = teachers.length;
  const activeTeachers = teachers.filter(t => t.status === "active").length;
  const averageRating = teachers.filter(t => t.rating).reduce((sum, t) => sum + (t.rating || 0), 0) / teachers.filter(t => t.rating).length;
  const totalStudents = teachers.reduce((sum, t) => sum + (t.students || 0), 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "inactive": return "bg-red-100 text-red-800";
      case "on-leave": return "bg-yellow-100 text-yellow-800";
      case "retired": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-green-600";
    if (rating >= 4.0) return "text-blue-600";
    if (rating >= 3.5) return "text-yellow-600";
    return "text-red-600";
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const TeacherProfileModal = ({ teacher }: { teacher: Teacher }) => (
    <Dialog open={showTeacherModal} onOpenChange={setShowTeacherModal}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={teacher.avatar} />
              <AvatarFallback>
                {teacher.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{teacher.name}</h2>
              <p className="text-muted-foreground">{teacher.teacherId} • {teacher.department}</p>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Date of Birth</label>
                  <p className="text-sm">{new Date(teacher.dateOfBirth).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Gender</label>
                  <p className="text-sm">{teacher.gender}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Blood Group</label>
                  <p className="text-sm">{teacher.bloodGroup}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Experience</label>
                  <p className="text-sm">{teacher.experience} years</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Address</label>
                <p className="text-sm">{teacher.address}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Medical Information</label>
                <p className="text-sm">{teacher.medicalInfo}</p>
              </div>
            </CardContent>
          </Card>

          {/* Professional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Professional Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Department</label>
                  <p className="text-sm font-semibold">{teacher.department}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Subject</label>
                  <p className="text-sm font-semibold">{teacher.subject}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Qualification</label>
                  <p className="text-sm">{teacher.qualification}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Join Date</label>
                  <p className="text-sm">{new Date(teacher.joinDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Classes</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {teacher.classes?.map((cls, index) => (
                    <Badge key={index} variant="outline">{cls}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Achievements</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {teacher.achievements?.map((achievement, index) => (
                    <Badge key={index} variant="secondary" className="bg-yellow-100 text-yellow-800">
                      <Award className="h-3 w-3 mr-1" />
                      {achievement}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Performance Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Rating</label>
                  <p className={`text-2xl font-bold ${getRatingColor(teacher.rating || 0)}`}>
                    {teacher.rating ? teacher.rating.toFixed(1) : 'N/A'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Students</label>
                  <p className="text-2xl font-bold text-blue-600">
                    {teacher.students || 0}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">Teacher Rating</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= (teacher.rating || 0) ? 'text-yellow-500 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Financial Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Monthly Salary</label>
                  <p className="text-sm font-semibold">${teacher.salary.toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Bank Account</label>
                  <p className="text-sm">{teacher.bankAccount}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Last Payment</label>
                  <p className="text-sm">{teacher.lastPaymentDate ? new Date(teacher.lastPaymentDate).toLocaleDateString() : 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Next Payment</label>
                  <p className="text-sm">{teacher.nextPaymentDate ? new Date(teacher.nextPaymentDate).toLocaleDateString() : 'N/A'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setShowTeacherModal(false)}>
            Close
          </Button>
          <Button className="bg-gradient-to-r from-primary-500 to-primary-600">
            <Edit className="h-4 w-4 mr-2" />
            Edit Teacher
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Teachers</p>
                  <p className="text-2xl font-bold">{totalTeachers}</p>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +3 this semester
                  </p>
                </div>
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <Users className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Teachers</p>
                  <p className="text-2xl font-bold">{activeTeachers}</p>
                  <p className="text-xs text-blue-600 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Currently teaching
                  </p>
                </div>
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  <GraduationCap className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Average Rating</p>
                  <p className="text-2xl font-bold">{averageRating.toFixed(1)}</p>
                  <p className="text-xs text-purple-600 flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    Teacher performance
                  </p>
                </div>
                <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                  <BookOpen className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                  <p className="text-2xl font-bold">{totalStudents}</p>
                  <p className="text-xs text-orange-600 flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    Across all classes
                  </p>
                </div>
                <div className="p-3 rounded-full bg-orange-100 text-orange-600">
                  <Calendar className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg">
        {["overview", "schedule", "performance", "financial"].map((tab) => (
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
      {activeTab === "overview" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Teacher Management</CardTitle>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search teachers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Science">Science</SelectItem>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Computer Science">Computer Science</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="on-leave">On Leave</SelectItem>
                      <SelectItem value="retired">Retired</SelectItem>
                    </SelectContent>
                  </Select>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Add Teacher
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Add New Teacher</DialogTitle>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-4">
                        <Input placeholder="Full Name" />
                        <Input placeholder="Teacher ID" />
                        <Input placeholder="Email" type="email" />
                        <Input placeholder="Phone" />
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Department" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mathematics">Mathematics</SelectItem>
                            <SelectItem value="science">Science</SelectItem>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="computer-science">Computer Science</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input placeholder="Subject" />
                        <Input placeholder="Qualification" />
                        <Input placeholder="Experience (years)" type="number" />
                        <Input placeholder="Salary" type="number" />
                        <Input placeholder="Date of Birth" type="date" />
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input placeholder="Address" />
                        <Input placeholder="Emergency Contact" />
                        <Input placeholder="Blood Group" />
                        <Textarea placeholder="Medical Information" />
                        <Input placeholder="Join Date" type="date" />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline">Cancel</Button>
                        <Button className="bg-gradient-to-r from-primary-500 to-primary-600">Add Teacher</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Teacher ID</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTeachers.map((teacher, index) => (
                    <motion.tr
                      key={teacher.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-muted/50"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={teacher.avatar} />
                            <AvatarFallback>
                              {teacher.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{teacher.name}</p>
                            <p className="text-sm text-muted-foreground">{teacher.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono">{teacher.teacherId}</TableCell>
                      <TableCell>{teacher.department}</TableCell>
                      <TableCell>{teacher.subject}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className={`font-semibold ${getRatingColor(teacher.rating || 0)}`}>
                            {teacher.rating ? teacher.rating.toFixed(1) : 'N/A'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-blue-600">
                          {teacher.students || 0}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(teacher.status)}>
                          {teacher.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              setSelectedTeacher(teacher);
                              setShowTeacherModal(true);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
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

      {activeTab === "schedule" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Teacher Schedules</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Schedule
                  </Button>
                  <Button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Schedule
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Day</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teacherSchedules.map((schedule, index) => (
                    <motion.tr
                      key={schedule.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-muted/50"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {schedule.teacherName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{schedule.teacherName}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{schedule.subject}</TableCell>
                      <TableCell>{schedule.class}</TableCell>
                      <TableCell>{schedule.day}</TableCell>
                      <TableCell>{schedule.startTime} - {schedule.endTime}</TableCell>
                      <TableCell>{schedule.room}</TableCell>
                      <TableCell>
                        <Badge className={
                          schedule.status === "scheduled" ? "bg-blue-100 text-blue-800" :
                          schedule.status === "completed" ? "bg-green-100 text-green-800" :
                          "bg-red-100 text-red-800"
                        }>
                          {schedule.status}
                        </Badge>
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

      {activeTab === "performance" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Teacher Performance</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Performance
                  </Button>
                  <Button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Review
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Avg Score</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Feedback</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teacherPerformance.map((performance, index) => (
                    <motion.tr
                      key={performance.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-muted/50"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {performance.teacherName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{performance.teacherName}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{performance.subject}</TableCell>
                      <TableCell>{performance.class}</TableCell>
                      <TableCell>{performance.students}</TableCell>
                      <TableCell>
                        <span className={`font-semibold ${getPerformanceColor(performance.averageScore)}`}>
                          {performance.averageScore}%
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`font-semibold ${getPerformanceColor(performance.attendance)}`}>
                          {performance.attendance}%
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className={`font-semibold ${getRatingColor(performance.rating)}`}>
                            {performance.rating.toFixed(1)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{performance.feedback}</TableCell>
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

      {activeTab === "financial" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Salary Paid</p>
                    <p className="text-2xl font-bold">${teachers.reduce((sum, t) => sum + (t.paidSalary || 0), 0).toLocaleString()}</p>
                  </div>
                  <div className="p-3 rounded-full bg-green-100 text-green-600">
                    <DollarSign className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pending Salary</p>
                    <p className="text-2xl font-bold">${teachers.reduce((sum, t) => sum + (t.pendingSalary || 0), 0).toLocaleString()}</p>
                  </div>
                  <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                    <AlertCircle className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Average Salary</p>
                    <p className="text-2xl font-bold">${Math.round(teachers.reduce((sum, t) => sum + t.salary, 0) / teachers.length).toLocaleString()}</p>
                  </div>
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Financial Records</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Financial Report
                  </Button>
                  <Button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Process Payment
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Monthly Salary</TableHead>
                    <TableHead>Paid Amount</TableHead>
                    <TableHead>Pending Amount</TableHead>
                    <TableHead>Last Payment</TableHead>
                    <TableHead>Next Payment</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teachers.map((teacher, index) => (
                    <motion.tr
                      key={teacher.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-muted/50"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={teacher.avatar} />
                            <AvatarFallback>
                              {teacher.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{teacher.name}</p>
                            <p className="text-sm text-muted-foreground">{teacher.teacherId}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">${teacher.salary.toLocaleString()}</TableCell>
                      <TableCell className="text-green-600 font-semibold">${teacher.paidSalary?.toLocaleString()}</TableCell>
                      <TableCell className="text-red-600 font-semibold">${teacher.pendingSalary?.toLocaleString()}</TableCell>
                      <TableCell>{teacher.lastPaymentDate ? new Date(teacher.lastPaymentDate).toLocaleDateString() : 'N/A'}</TableCell>
                      <TableCell>{teacher.nextPaymentDate ? new Date(teacher.nextPaymentDate).toLocaleDateString() : 'N/A'}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <DollarSign className="h-4 w-4" />
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

      {/* Teacher Profile Modal */}
      {selectedTeacher && (
        <TeacherProfileModal teacher={selectedTeacher} />
      )}
    </div>
  );
}
