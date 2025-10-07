import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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
  AlertCircle,
  UserPlus,
  FileText,
  Clock,
  CheckCircle,
  Eye,
  User,
  DollarSign,
  Phone,
  Mail
} from "lucide-react";

interface Student {
  id: string;
  name: string;
  studentId: string;
  grade: string;
  section: string;
  email: string;
  phone: string;
  address: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  enrollmentDate: string;
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  emergencyContact: string;
  status: "active" | "inactive" | "graduated" | "transferred" | "suspended";
  avatar?: string;
  gpa?: number;
  attendance?: number;
  subjects?: string[];
  achievements?: string[];
  medicalInfo?: string;
  transportRoute?: string;
  feeStatus?: "paid" | "pending" | "overdue";
  lastPaymentDate?: string;
  nextPaymentDate?: string;
  totalFees?: number;
  paidFees?: number;
  pendingFees?: number;
}

interface AcademicRecord {
  id: string;
  studentId: string;
  studentName: string;
  subject: string;
  assignment: string;
  score: number;
  maxScore: number;
  percentage: number;
  grade: string;
  date: string;
  teacher: string;
  semester: string;
  year: string;
}

interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string;
  status: "present" | "absent" | "late" | "excused";
  reason?: string;
  teacher: string;
  subject: string;
}

export default function StudentScreen() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGrade, setFilterGrade] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Helper function to generate student photos
  const getStudentPhoto = (name: string, gender: string) => {
    const photos = {
      "Alex Johnson": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      "Sarah Chen": "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      "Michael Rodriguez": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      "Emily Davis": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      "David Kim": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      "Lisa Wang": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      "James Wilson": "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face",
      "Maria Garcia": "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face"
    };
    return photos[name as keyof typeof photos] || (gender === "Female" 
      ? "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face");
  };

  // Mock data
  const students: Student[] = [
    {
      id: "1",
      name: "Alex Johnson",
      studentId: "STU001",
      grade: "10th",
      section: "A",
      email: "alex.johnson@student.edu",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, City, State 12345",
      parentName: "John Johnson",
      parentPhone: "+1 (555) 987-6543",
      parentEmail: "john.johnson@email.com",
      enrollmentDate: "2023-09-01",
      dateOfBirth: "2008-03-15",
      gender: "Male",
      bloodGroup: "O+",
      emergencyContact: "+1 (555) 111-2222",
      status: "active",
      avatar: getStudentPhoto("Alex Johnson", "Male"),
      gpa: 3.8,
      attendance: 95,
      subjects: ["Mathematics", "English", "Science", "History"],
      achievements: ["Math Olympiad Winner", "Science Fair 1st Place"],
      medicalInfo: "No known allergies",
      transportRoute: "Route A - Downtown",
      feeStatus: "paid",
      lastPaymentDate: "2024-12-01",
      nextPaymentDate: "2025-01-01",
      totalFees: 5000,
      paidFees: 5000,
      pendingFees: 0
    },
    {
      id: "2",
      name: "Sarah Chen",
      studentId: "STU002",
      grade: "11th",
      section: "B",
      email: "sarah.chen@student.edu",
      phone: "+1 (555) 234-5678",
      address: "456 Oak Ave, City, State 12345",
      parentName: "Lisa Chen",
      parentPhone: "+1 (555) 876-5432",
      parentEmail: "lisa.chen@email.com",
      enrollmentDate: "2022-09-01",
      dateOfBirth: "2007-07-22",
      gender: "Female",
      bloodGroup: "A+",
      emergencyContact: "+1 (555) 333-4444",
      status: "active",
      avatar: getStudentPhoto("Sarah Chen", "Female"),
      gpa: 4.0,
      attendance: 98,
      subjects: ["Mathematics", "English", "Physics", "Chemistry"],
      achievements: ["Valedictorian", "Debate Team Captain"],
      medicalInfo: "Allergic to peanuts",
      transportRoute: "Route B - Uptown",
      feeStatus: "paid",
      lastPaymentDate: "2024-12-01",
      nextPaymentDate: "2025-01-01",
      totalFees: 5500,
      paidFees: 5500,
      pendingFees: 0
    },
    {
      id: "3",
      name: "Mike Rodriguez",
      studentId: "STU003",
      grade: "9th",
      section: "C",
      email: "mike.rodriguez@student.edu",
      phone: "+1 (555) 345-6789",
      address: "789 Pine St, City, State 12345",
      parentName: "Maria Rodriguez",
      parentPhone: "+1 (555) 765-4321",
      parentEmail: "maria.rodriguez@email.com",
      enrollmentDate: "2024-09-01",
      dateOfBirth: "2009-11-08",
      gender: "Male",
      bloodGroup: "B+",
      emergencyContact: "+1 (555) 555-6666",
      status: "active",
      avatar: getStudentPhoto("Michael Rodriguez", "Male"),
      gpa: 3.2,
      attendance: 87,
      subjects: ["Mathematics", "English", "Biology", "Geography"],
      achievements: ["Sports Team Member"],
      medicalInfo: "Asthma - inhaler required",
      transportRoute: "Route C - Suburbs",
      feeStatus: "pending",
      lastPaymentDate: "2024-11-01",
      nextPaymentDate: "2024-12-01",
      totalFees: 4500,
      paidFees: 2250,
      pendingFees: 2250
    },
    {
      id: "4",
      name: "Emma Davis",
      studentId: "STU004",
      grade: "12th",
      section: "A",
      email: "emma.davis@student.edu",
      phone: "+1 (555) 456-7890",
      address: "321 Elm St, City, State 12345",
      parentName: "Robert Davis",
      parentPhone: "+1 (555) 654-3210",
      parentEmail: "robert.davis@email.com",
      enrollmentDate: "2021-09-01",
      dateOfBirth: "2006-05-12",
      gender: "Female",
      bloodGroup: "AB+",
      emergencyContact: "+1 (555) 777-8888",
      status: "graduated",
      avatar: getStudentPhoto("Emily Davis", "Female"),
      gpa: 3.9,
      attendance: 96,
      subjects: ["Mathematics", "English", "Physics", "Chemistry", "Biology"],
      achievements: ["National Merit Scholar", "Student Council President"],
      medicalInfo: "No known conditions",
      transportRoute: "Route A - Downtown",
      feeStatus: "paid",
      lastPaymentDate: "2024-05-01",
      nextPaymentDate: "N/A",
      totalFees: 6000,
      paidFees: 6000,
      pendingFees: 0
    },
    {
      id: "5",
      name: "David Kim",
      studentId: "STU005",
      grade: "10th",
      section: "B",
      email: "david.kim@student.edu",
      phone: "+1 (555) 567-8901",
      address: "654 Maple St, City, State 12345",
      parentName: "Jennifer Kim",
      parentPhone: "+1 (555) 543-2109",
      parentEmail: "jennifer.kim@email.com",
      enrollmentDate: "2023-09-01",
      dateOfBirth: "2008-09-15",
      gender: "Male",
      bloodGroup: "O-",
      emergencyContact: "+1 (555) 999-0000",
      status: "active",
      avatar: getStudentPhoto("David Kim", "Male"),
      gpa: 3.6,
      attendance: 92,
      subjects: ["Mathematics", "English", "Computer Science", "Art"],
      achievements: ["Coding Competition Winner", "Art Exhibition Participant"],
      medicalInfo: "No known allergies",
      transportRoute: "Route B - Uptown",
      feeStatus: "paid",
      lastPaymentDate: "2024-12-01",
      nextPaymentDate: "2025-01-01",
      totalFees: 5000,
      paidFees: 5000,
      pendingFees: 0
    },
    {
      id: "6",
      name: "Lisa Wang",
      studentId: "STU006",
      grade: "11th",
      section: "A",
      email: "lisa.wang@student.edu",
      phone: "+1 (555) 678-9012",
      address: "987 Cedar Ave, City, State 12345",
      parentName: "Michael Wang",
      parentPhone: "+1 (555) 432-1098",
      parentEmail: "michael.wang@email.com",
      enrollmentDate: "2022-09-01",
      dateOfBirth: "2007-12-03",
      gender: "Female",
      bloodGroup: "A-",
      emergencyContact: "+1 (555) 888-7777",
      status: "active",
      avatar: getStudentPhoto("Lisa Wang", "Female"),
      gpa: 3.9,
      attendance: 97,
      subjects: ["Mathematics", "English", "Chemistry", "Biology"],
      achievements: ["Science Fair 2nd Place", "Debate Team Member"],
      medicalInfo: "No known conditions",
      transportRoute: "Route A - Downtown",
      feeStatus: "pending",
      lastPaymentDate: "2024-11-15",
      nextPaymentDate: "2024-12-15",
      totalFees: 5500,
      paidFees: 2750,
      pendingFees: 2750
    },
    {
      id: "7",
      name: "James Wilson",
      studentId: "STU007",
      grade: "9th",
      section: "B",
      email: "james.wilson@student.edu",
      phone: "+1 (555) 789-0123",
      address: "147 Birch Lane, City, State 12345",
      parentName: "Sarah Wilson",
      parentPhone: "+1 (555) 321-0987",
      parentEmail: "sarah.wilson@email.com",
      enrollmentDate: "2024-09-01",
      dateOfBirth: "2009-04-20",
      gender: "Male",
      bloodGroup: "B-",
      emergencyContact: "+1 (555) 777-6666",
      status: "active",
      avatar: getStudentPhoto("James Wilson", "Male"),
      gpa: 3.1,
      attendance: 89,
      subjects: ["Mathematics", "English", "History", "Physical Education"],
      achievements: ["Basketball Team Member"],
      medicalInfo: "No known allergies",
      transportRoute: "Route C - Suburbs",
      feeStatus: "paid",
      lastPaymentDate: "2024-12-01",
      nextPaymentDate: "2025-01-01",
      totalFees: 4500,
      paidFees: 4500,
      pendingFees: 0
    },
    {
      id: "8",
      name: "Maria Garcia",
      studentId: "STU008",
      grade: "12th",
      section: "C",
      email: "maria.garcia@student.edu",
      phone: "+1 (555) 890-1234",
      address: "258 Spruce St, City, State 12345",
      parentName: "Carlos Garcia",
      parentPhone: "+1 (555) 210-9876",
      parentEmail: "carlos.garcia@email.com",
      enrollmentDate: "2021-09-01",
      dateOfBirth: "2006-08-10",
      gender: "Female",
      bloodGroup: "AB-",
      emergencyContact: "+1 (555) 666-5555",
      status: "active",
      avatar: getStudentPhoto("Maria Garcia", "Female"),
      gpa: 4.1,
      attendance: 99,
      subjects: ["Mathematics", "English", "Physics", "Spanish", "Art"],
      achievements: ["Valedictorian Candidate", "Spanish Club President", "Art Scholarship Winner"],
      medicalInfo: "No known conditions",
      transportRoute: "Route A - Downtown",
      feeStatus: "paid",
      lastPaymentDate: "2024-12-01",
      nextPaymentDate: "2025-01-01",
      totalFees: 6000,
      paidFees: 6000,
      pendingFees: 0
    }
  ];

  const academicRecords: AcademicRecord[] = [
    {
      id: "1",
      studentId: "STU001",
      studentName: "Alex Johnson",
      subject: "Mathematics",
      assignment: "Algebra Test",
      score: 85,
      maxScore: 100,
      percentage: 85,
      grade: "B+",
      date: "2024-12-15",
      teacher: "Mr. Smith",
      semester: "Fall 2024",
      year: "2024"
    },
    {
      id: "2",
      studentId: "STU002",
      studentName: "Sarah Chen",
      subject: "English",
      assignment: "Essay Writing",
      score: 95,
      maxScore: 100,
      percentage: 95,
      grade: "A",
      date: "2024-12-14",
      teacher: "Ms. Johnson",
      semester: "Fall 2024",
      year: "2024"
    },
    {
      id: "3",
      studentId: "STU003",
      studentName: "Mike Rodriguez",
      subject: "Science",
      assignment: "Chemistry Lab",
      score: 78,
      maxScore: 100,
      percentage: 78,
      grade: "C+",
      date: "2024-12-13",
      teacher: "Dr. Brown",
      semester: "Fall 2024",
      year: "2024"
    },
    {
      id: "5",
      studentId: "STU005",
      studentName: "David Kim",
      subject: "Computer Science",
      assignment: "Programming Project",
      score: 92,
      maxScore: 100,
      percentage: 92,
      grade: "A-",
      date: "2024-12-10",
      teacher: "Mr. Rodriguez",
      semester: "Fall 2024",
      year: "2024"
    },
    {
      id: "6",
      studentId: "STU006",
      studentName: "Lisa Wang",
      subject: "Chemistry",
      assignment: "Lab Report",
      score: 88,
      maxScore: 100,
      percentage: 88,
      grade: "B+",
      date: "2024-12-12",
      teacher: "Dr. Johnson",
      semester: "Fall 2024",
      year: "2024"
    },
    {
      id: "7",
      studentId: "STU007",
      studentName: "James Wilson",
      subject: "History",
      assignment: "Essay",
      score: 76,
      maxScore: 100,
      percentage: 76,
      grade: "C+",
      date: "2024-12-08",
      teacher: "Ms. Davis",
      semester: "Fall 2024",
      year: "2024"
    },
    {
      id: "8",
      studentId: "STU008",
      studentName: "Maria Garcia",
      subject: "Spanish",
      assignment: "Oral Presentation",
      score: 96,
      maxScore: 100,
      percentage: 96,
      grade: "A",
      date: "2024-12-14",
      teacher: "Prof. Martinez",
      semester: "Fall 2024",
      year: "2024"
    }
  ];

  const attendanceRecords: AttendanceRecord[] = [
    {
      id: "1",
      studentId: "STU001",
      date: "2024-12-15",
      status: "present",
      teacher: "Mr. Smith",
      subject: "Mathematics"
    },
    {
      id: "2",
      studentId: "STU002",
      date: "2024-12-15",
      status: "present",
      teacher: "Ms. Johnson",
      subject: "English"
    },
    {
      id: "3",
      studentId: "STU003",
      date: "2024-12-15",
      status: "late",
      reason: "Traffic delay",
      teacher: "Dr. Brown",
      subject: "Science"
    },
    {
      id: "4",
      studentId: "STU005",
      date: "2024-12-15",
      status: "present",
      teacher: "Mr. Rodriguez",
      subject: "Computer Science"
    },
    {
      id: "5",
      studentId: "STU006",
      date: "2024-12-15",
      status: "present",
      teacher: "Dr. Johnson",
      subject: "Chemistry"
    },
    {
      id: "6",
      studentId: "STU007",
      date: "2024-12-15",
      status: "absent",
      reason: "Sick",
      teacher: "Ms. Davis",
      subject: "History"
    },
    {
      id: "7",
      studentId: "STU008",
      date: "2024-12-15",
      status: "present",
      teacher: "Prof. Martinez",
      subject: "Spanish"
    }
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = filterGrade === "all" || student.grade === filterGrade;
    const matchesStatus = filterStatus === "all" || student.status === filterStatus;
    return matchesSearch && matchesGrade && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedStudents = filteredStudents.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.status === "active").length;
  const averageGPA = students.filter(s => s.gpa).reduce((sum, s) => sum + (s.gpa || 0), 0) / students.filter(s => s.gpa).length;
  const averageAttendance = students.filter(s => s.attendance).reduce((sum, s) => sum + (s.attendance || 0), 0) / students.filter(s => s.attendance).length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "inactive": return "bg-red-100 text-red-800";
      case "graduated": return "bg-blue-100 text-blue-800";
      case "transferred": return "bg-yellow-100 text-yellow-800";
      case "suspended": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getFeeStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "overdue": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 80) return "text-blue-600";
    if (percentage >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 95) return "text-green-600";
    if (percentage >= 90) return "text-blue-600";
    if (percentage >= 85) return "text-yellow-600";
    return "text-red-600";
  };

  const StudentProfileModal = ({ student }: { student: Student }) => (
    <Dialog open={showStudentModal} onOpenChange={setShowStudentModal}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={student.avatar} />
              <AvatarFallback>
                {student.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{student.name}</h2>
              <p className="text-muted-foreground">{student.studentId} • {student.grade} - {student.section}</p>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        {/* Quick Parent Contact - Prominent at the top */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Users className="h-5 w-5" />
              Parent Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-full">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-800">Parent Name</p>
                  <p className="text-lg font-semibold">{student.parentName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-full">
                  <Phone className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-green-800">Phone</p>
                  <p className="text-lg font-semibold">{student.parentPhone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-full">
                  <Mail className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-purple-800">Email</p>
                  <p className="text-lg font-semibold">{student.parentEmail}</p>
                </div>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Call Parent
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Parent
              </Button>
            </div>
          </CardContent>
        </Card>
        
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
                  <p className="text-sm">{new Date(student.dateOfBirth).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Gender</label>
                  <p className="text-sm">{student.gender}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Blood Group</label>
                  <p className="text-sm">{student.bloodGroup}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Emergency Contact</label>
                  <p className="text-sm">{student.emergencyContact}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Address</label>
                <p className="text-sm">{student.address}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Medical Information</label>
                <p className="text-sm">{student.medicalInfo}</p>
              </div>
            </CardContent>
          </Card>

          {/* Academic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Academic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">GPA</label>
                  <p className={`text-2xl font-bold ${getGradeColor(student.gpa || 0 * 100)}`}>
                    {student.gpa ? student.gpa.toFixed(1) : 'N/A'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Attendance</label>
                  <p className={`text-2xl font-bold ${getAttendanceColor(student.attendance || 0)}`}>
                    {student.attendance ? `${student.attendance}%` : 'N/A'}
                  </p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Subjects</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {student.subjects?.map((subject, index) => (
                    <Badge key={index} variant="outline">{subject}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Achievements</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {student.achievements?.map((achievement, index) => (
                    <Badge key={index} variant="secondary" className="bg-yellow-100 text-yellow-800">
                      <Award className="h-3 w-3 mr-1" />
                      {achievement}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Parent Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Parent Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Parent Name</label>
                <p className="text-sm">{student.parentName}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Phone</label>
                  <p className="text-sm">{student.parentPhone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="text-sm">{student.parentEmail}</p>
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
                  <label className="text-sm font-medium text-muted-foreground">Fee Status</label>
                  <Badge className={getFeeStatusColor(student.feeStatus || "pending")}>
                    {student.feeStatus}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Total Fees</label>
                  <p className="text-sm font-semibold">${student.totalFees?.toLocaleString()}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Paid Amount</label>
                  <p className="text-sm font-semibold text-green-600">${student.paidFees?.toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Pending Amount</label>
                  <p className="text-sm font-semibold text-red-600">${student.pendingFees?.toLocaleString()}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Last Payment</label>
                  <p className="text-sm">{student.lastPaymentDate ? new Date(student.lastPaymentDate).toLocaleDateString() : 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Next Payment</label>
                  <p className="text-sm">{student.nextPaymentDate ? new Date(student.nextPaymentDate).toLocaleDateString() : 'N/A'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setShowStudentModal(false)}>
            Close
          </Button>
          <Button className="bg-gradient-to-r from-primary-500 to-primary-600">
            <Edit className="h-4 w-4 mr-2" />
            Edit Student
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                  <p className="text-2xl font-bold">{totalStudents}</p>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +12 this semester
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
                  <p className="text-sm font-medium text-muted-foreground">Active Students</p>
                  <p className="text-2xl font-bold">{activeStudents}</p>
                  <p className="text-xs text-blue-600 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Currently enrolled
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
                  <p className="text-sm font-medium text-muted-foreground">Average GPA</p>
                  <p className="text-2xl font-bold">{averageGPA.toFixed(1)}</p>
                  <p className="text-xs text-purple-600 flex items-center gap-1">
                    <Award className="h-3 w-3" />
                    Academic performance
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
                  <p className="text-sm font-medium text-muted-foreground">Avg Attendance</p>
                  <p className="text-2xl font-bold">{averageAttendance.toFixed(1)}%</p>
                  <p className="text-xs text-orange-600 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    This semester
                  </p>
                </div>
                <div className="p-3 rounded-full bg-orange-100 text-orange-600">
                  <Calendar className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Parent Contacts</p>
                  <p className="text-2xl font-bold">{students.length}</p>
                  <p className="text-xs text-indigo-600 flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    Available for contact
                  </p>
                </div>
                <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
                  <User className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg">
        {["overview", "academic", "attendance", "financial"].map((tab) => (
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
                <CardTitle>Student Management</CardTitle>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search students..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Select value={filterGrade} onValueChange={setFilterGrade}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Grades</SelectItem>
                      <SelectItem value="9th">9th Grade</SelectItem>
                      <SelectItem value="10th">10th Grade</SelectItem>
                      <SelectItem value="11th">11th Grade</SelectItem>
                      <SelectItem value="12th">12th Grade</SelectItem>
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
                      <SelectItem value="graduated">Graduated</SelectItem>
                      <SelectItem value="transferred">Transferred</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Add Student
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Add New Student</DialogTitle>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-4">
                        <Input placeholder="Full Name" />
                        <Input placeholder="Student ID" />
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Grade" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="9th">9th Grade</SelectItem>
                            <SelectItem value="10th">10th Grade</SelectItem>
                            <SelectItem value="11th">11th Grade</SelectItem>
                            <SelectItem value="12th">12th Grade</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Section" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="A">Section A</SelectItem>
                            <SelectItem value="B">Section B</SelectItem>
                            <SelectItem value="C">Section C</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input placeholder="Email" type="email" />
                        <Input placeholder="Phone" />
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
                        <Input placeholder="Parent Name" />
                        <Input placeholder="Parent Phone" />
                        <Input placeholder="Parent Email" type="email" />
                        <Input placeholder="Emergency Contact" />
                        <Input placeholder="Blood Group" />
                        <Textarea placeholder="Medical Information" />
                        <Input placeholder="Enrollment Date" type="date" />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline">Cancel</Button>
                        <Button className="bg-gradient-to-r from-primary-500 to-primary-600">Add Student</Button>
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
                    <TableHead>Student</TableHead>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Grade/Section</TableHead>
                    <TableHead>Parent</TableHead>
                    <TableHead>GPA</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Fee Status</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedStudents.map((student, index) => (
                    <motion.tr
                      key={student.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-muted/50"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={student.avatar} />
                            <AvatarFallback>
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-muted-foreground">{student.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono">{student.studentId}</TableCell>
                      <TableCell>{student.grade} - {student.section}</TableCell>
                      <TableCell>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="ghost" className="h-auto p-0 text-left justify-start">
                              <div>
                                <p className="font-medium text-sm">{student.parentName}</p>
                                <p className="text-xs text-muted-foreground">{student.parentPhone}</p>
                              </div>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-80">
                            <div className="space-y-4">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10">
                                  <AvatarFallback>
                                    {student.parentName.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h4 className="font-semibold">{student.parentName}</h4>
                                  <p className="text-sm text-muted-foreground">Parent of {student.name}</p>
                                </div>
                              </div>
                              <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                  <Phone className="h-4 w-4 text-green-600" />
                                  <div>
                                    <p className="text-sm font-medium">Phone</p>
                                    <p className="text-sm">{student.parentPhone}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <Mail className="h-4 w-4 text-blue-600" />
                                  <div>
                                    <p className="text-sm font-medium">Email</p>
                                    <p className="text-sm">{student.parentEmail}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-2 pt-2 border-t">
                                <Button variant="outline" size="sm" className="flex-1">
                                  <Phone className="h-4 w-4 mr-2" />
                                  Call
                                </Button>
                                <Button variant="outline" size="sm" className="flex-1">
                                  <Mail className="h-4 w-4 mr-2" />
                                  Email
                                </Button>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                      <TableCell>
                        <span className={`font-semibold ${getGradeColor(student.gpa || 0 * 100)}`}>
                          {student.gpa ? student.gpa.toFixed(1) : 'N/A'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`font-semibold ${getAttendanceColor(student.attendance || 0)}`}>
                          {student.attendance ? `${student.attendance}%` : 'N/A'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge className={getFeeStatusColor(student.feeStatus || "pending")}>
                          {student.feeStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(student.status)}>
                          {student.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              setSelectedStudent(student);
                              setShowStudentModal(true);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            title="Contact Parent"
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          >
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            title="Email Parent"
                            className="text-green-600 hover:text-green-700 hover:bg-green-50"
                          >
                            <Mail className="h-4 w-4" />
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
          
          {/* Pagination Controls */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredStudents.length)} of {filteredStudents.length} students
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(page)}
                    className="w-8 h-8 p-0"
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </motion.div>
      )}


      {activeTab === "academic" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Academic Records</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Grades
                  </Button>
                  <Button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Grade
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Assignment</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Percentage</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {academicRecords.map((record, index) => (
                    <motion.tr
                      key={record.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-muted/50"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {record.studentName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{record.studentName}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{record.subject}</TableCell>
                      <TableCell>{record.assignment}</TableCell>
                      <TableCell>{record.score}/{record.maxScore}</TableCell>
                      <TableCell>
                        <span className={`font-semibold ${getGradeColor(record.percentage)}`}>
                          {record.percentage}%
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getGradeColor(record.percentage)}>
                          {record.grade}
                        </Badge>
                      </TableCell>
                      <TableCell>{record.teacher}</TableCell>
                      <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
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

      {activeTab === "attendance" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Attendance Records</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Attendance
                  </Button>
                  <Button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Mark Attendance
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceRecords.map((record, index) => (
                    <motion.tr
                      key={record.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-muted/50"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {record.studentId}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{record.studentId}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge className={
                          record.status === "present" ? "bg-green-100 text-green-800" :
                          record.status === "absent" ? "bg-red-100 text-red-800" :
                          record.status === "late" ? "bg-yellow-100 text-yellow-800" :
                          "bg-blue-100 text-blue-800"
                        }>
                          {record.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{record.subject}</TableCell>
                      <TableCell>{record.teacher}</TableCell>
                      <TableCell>{record.reason || "N/A"}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
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
                    <p className="text-sm font-medium text-muted-foreground">Total Fees Collected</p>
                    <p className="text-2xl font-bold">${students.reduce((sum, s) => sum + (s.paidFees || 0), 0).toLocaleString()}</p>
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
                    <p className="text-sm font-medium text-muted-foreground">Pending Fees</p>
                    <p className="text-2xl font-bold">${students.reduce((sum, s) => sum + (s.pendingFees || 0), 0).toLocaleString()}</p>
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
                    <p className="text-sm font-medium text-muted-foreground">Collection Rate</p>
                    <p className="text-2xl font-bold">
                      {Math.round((students.reduce((sum, s) => sum + (s.paidFees || 0), 0) / students.reduce((sum, s) => sum + (s.totalFees || 0), 0)) * 100)}%
                    </p>
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
                    Record Payment
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Total Fees</TableHead>
                    <TableHead>Paid Amount</TableHead>
                    <TableHead>Pending Amount</TableHead>
                    <TableHead>Fee Status</TableHead>
                    <TableHead>Last Payment</TableHead>
                    <TableHead>Next Payment</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student, index) => (
                    <motion.tr
                      key={student.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-muted/50"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={student.avatar} />
                            <AvatarFallback>
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-muted-foreground">{student.studentId}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">${student.totalFees?.toLocaleString()}</TableCell>
                      <TableCell className="text-green-600 font-semibold">${student.paidFees?.toLocaleString()}</TableCell>
                      <TableCell className="text-red-600 font-semibold">${student.pendingFees?.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className={getFeeStatusColor(student.feeStatus || "pending")}>
                          {student.feeStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>{student.lastPaymentDate ? new Date(student.lastPaymentDate).toLocaleDateString() : 'N/A'}</TableCell>
                      <TableCell>{student.nextPaymentDate ? new Date(student.nextPaymentDate).toLocaleDateString() : 'N/A'}</TableCell>
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

      {/* Student Profile Modal */}
      {selectedStudent && (
        <StudentProfileModal student={selectedStudent} />
      )}
    </div>
  );
}
