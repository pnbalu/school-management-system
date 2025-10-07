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
  Clock,
  CheckCircle
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
  enrollmentDate: string;
  status: "active" | "inactive" | "graduated" | "transferred";
  avatar?: string;
  gpa?: number;
  attendance?: number;
}

interface Grade {
  id: string;
  studentId: string;
  studentName: string;
  subject: string;
  assignment: string;
  score: number;
  maxScore: number;
  percentage: number;
  date: string;
  teacher: string;
}

export default function StudentManagement() {
  const [activeTab, setActiveTab] = useState("students");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGrade, setFilterGrade] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

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
      address: "123 Main St, City",
      parentName: "John Johnson",
      parentPhone: "+1 (555) 987-6543",
      enrollmentDate: "2023-09-01",
      status: "active",
      gpa: 3.8,
      attendance: 95
    },
    {
      id: "2",
      name: "Sarah Chen",
      studentId: "STU002",
      grade: "11th",
      section: "B",
      email: "sarah.chen@student.edu",
      phone: "+1 (555) 234-5678",
      address: "456 Oak Ave, City",
      parentName: "Lisa Chen",
      parentPhone: "+1 (555) 876-5432",
      enrollmentDate: "2022-09-01",
      status: "active",
      gpa: 4.0,
      attendance: 98
    },
    {
      id: "3",
      name: "Mike Rodriguez",
      studentId: "STU003",
      grade: "9th",
      section: "C",
      email: "mike.rodriguez@student.edu",
      phone: "+1 (555) 345-6789",
      address: "789 Pine St, City",
      parentName: "Maria Rodriguez",
      parentPhone: "+1 (555) 765-4321",
      enrollmentDate: "2024-09-01",
      status: "active",
      gpa: 3.2,
      attendance: 87
    },
    {
      id: "4",
      name: "Emma Davis",
      studentId: "STU004",
      grade: "12th",
      section: "A",
      email: "emma.davis@student.edu",
      phone: "+1 (555) 456-7890",
      address: "321 Elm St, City",
      parentName: "Robert Davis",
      parentPhone: "+1 (555) 654-3210",
      enrollmentDate: "2021-09-01",
      status: "graduated",
      gpa: 3.9,
      attendance: 96
    }
  ];

  const grades: Grade[] = [
    {
      id: "1",
      studentId: "STU001",
      studentName: "Alex Johnson",
      subject: "Mathematics",
      assignment: "Algebra Test",
      score: 85,
      maxScore: 100,
      percentage: 85,
      date: "2024-12-15",
      teacher: "Mr. Smith"
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
      date: "2024-12-14",
      teacher: "Ms. Johnson"
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
      date: "2024-12-13",
      teacher: "Dr. Brown"
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
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 80) return "text-blue-600";
    if (percentage >= 70) return "text-yellow-600";
    return "text-red-600";
  };

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
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg">
        {["students", "grades", "enrollment"].map((tab) => (
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
      {activeTab === "students" && (
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
                        <Input placeholder="Address" />
                        <Input placeholder="Parent Name" />
                        <Input placeholder="Parent Phone" />
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
                    <TableHead>GPA</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student, index) => (
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
                        <span className={`font-semibold ${student.gpa && student.gpa >= 3.5 ? 'text-green-600' : student.gpa && student.gpa >= 3.0 ? 'text-blue-600' : 'text-orange-600'}`}>
                          {student.gpa ? student.gpa.toFixed(1) : 'N/A'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`font-semibold ${student.attendance && student.attendance >= 95 ? 'text-green-600' : student.attendance && student.attendance >= 90 ? 'text-blue-600' : 'text-orange-600'}`}>
                          {student.attendance ? `${student.attendance}%` : 'N/A'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(student.status)}>
                          {student.status}
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

      {activeTab === "grades" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Grade Management</CardTitle>
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
                    <TableHead>Teacher</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {grades.map((grade, index) => (
                    <motion.tr
                      key={grade.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-muted/50"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {grade.studentName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{grade.studentName}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{grade.subject}</TableCell>
                      <TableCell>{grade.assignment}</TableCell>
                      <TableCell>{grade.score}/{grade.maxScore}</TableCell>
                      <TableCell>
                        <span className={`font-semibold ${getGradeColor(grade.percentage)}`}>
                          {grade.percentage}%
                        </span>
                      </TableCell>
                      <TableCell>{grade.teacher}</TableCell>
                      <TableCell>{new Date(grade.date).toLocaleDateString()}</TableCell>
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

      {activeTab === "enrollment" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { grade: "9th Grade", students: 45, capacity: 50, color: "bg-blue-500" },
              { grade: "10th Grade", students: 52, capacity: 55, color: "bg-green-500" },
              { grade: "11th Grade", students: 48, capacity: 50, color: "bg-purple-500" },
              { grade: "12th Grade", students: 41, capacity: 45, color: "bg-orange-500" }
            ].map((enrollment, index) => (
              <motion.div
                key={enrollment.grade}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="card-hover">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-full ${enrollment.color} text-white`}>
                        <GraduationCap className="h-5 w-5" />
                      </div>
                      <Badge variant="outline">
                        {enrollment.students}/{enrollment.capacity}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{enrollment.grade}</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Enrollment</span>
                        <span>{enrollment.students} students</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary-500 h-2 rounded-full" 
                          style={{ width: `${(enrollment.students / enrollment.capacity) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {Math.round((enrollment.students / enrollment.capacity) * 100)}% capacity
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <Button variant="outline" size="sm">
                        View Students
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
