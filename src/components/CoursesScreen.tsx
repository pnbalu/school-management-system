import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  BookOpen, 
  GraduationCap, 
  Users, 
  TrendingUp, 
  Plus, 
  Edit, 
  Trash2, 
  Download,
  Search,
  FileText,
  CheckCircle,
  Eye,
  User,
  Star,
  BarChart3,
  Activity
} from "lucide-react";

interface Course {
  id: string;
  courseCode: string;
  courseName: string;
  description: string;
  department: string;
  credits: number;
  duration: number; // in weeks
  level: "beginner" | "intermediate" | "advanced";
  status: "active" | "inactive" | "archived";
  instructor: string;
  instructorId: string;
  maxStudents: number;
  enrolledStudents: number;
  startDate: string;
  endDate: string;
  schedule: string;
  room: string;
  prerequisites?: string[];
  objectives: string[];
  syllabus: string;
  assessment: string;
  materials: string[];
  fee: number;
  rating?: number;
  reviews?: number;
  completionRate?: number;
}

interface Subject {
  id: string;
  subjectCode: string;
  subjectName: string;
  department: string;
  credits: number;
  description: string;
  level: "elementary" | "middle" | "high" | "college";
  status: "active" | "inactive";
  teachers: string[];
  courses: string[];
  prerequisites?: string[];
  objectives: string[];
  assessment: string;
  materials: string[];
}

interface Curriculum {
  id: string;
  programName: string;
  department: string;
  level: "undergraduate" | "graduate" | "certificate";
  duration: number; // in semesters
  totalCredits: number;
  requiredCredits: number;
  electiveCredits: number;
  status: "active" | "inactive" | "draft";
  description: string;
  objectives: string[];
  requirements: string[];
  courses: string[];
  createdDate: string;
  updatedDate: string;
}

interface Enrollment {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseName: string;
  enrollmentDate: string;
  status: "enrolled" | "completed" | "dropped" | "withdrawn";
  grade?: string;
  credits: number;
  semester: string;
  year: string;
}

export default function CoursesScreen() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterLevel, setFilterLevel] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showCourseModal, setShowCourseModal] = useState(false);

  // Mock data
  const courses: Course[] = [
    {
      id: "1",
      courseCode: "MATH101",
      courseName: "Advanced Mathematics",
      description: "Comprehensive study of advanced mathematical concepts including calculus, algebra, and statistics.",
      department: "Mathematics",
      credits: 4,
      duration: 16,
      level: "advanced",
      status: "active",
      instructor: "Dr. Sarah Johnson",
      instructorId: "TCH001",
      maxStudents: 30,
      enrolledStudents: 25,
      startDate: "2025-01-15",
      endDate: "2025-05-15",
      schedule: "Mon, Wed, Fri 9:00-10:30 AM",
      room: "Room 101",
      prerequisites: ["MATH100", "MATH102"],
      objectives: [
        "Master advanced calculus concepts",
        "Apply mathematical principles to real-world problems",
        "Develop analytical thinking skills"
      ],
      syllabus: "Week 1-4: Calculus, Week 5-8: Algebra, Week 9-12: Statistics, Week 13-16: Applications",
      assessment: "Midterm (30%), Final Exam (40%), Assignments (20%), Participation (10%)",
      materials: ["Textbook: Advanced Mathematics", "Calculator", "Graphing Software"],
      fee: 1200,
      rating: 4.8,
      reviews: 45,
      completionRate: 92
    },
    {
      id: "2",
      courseCode: "PHYS201",
      courseName: "Physics Fundamentals",
      description: "Introduction to fundamental physics principles including mechanics, thermodynamics, and electromagnetism.",
      department: "Science",
      credits: 3,
      duration: 14,
      level: "intermediate",
      status: "active",
      instructor: "Prof. Michael Chen",
      instructorId: "TCH002",
      maxStudents: 25,
      enrolledStudents: 20,
      startDate: "2025-01-20",
      endDate: "2025-05-01",
      schedule: "Tue, Thu 10:00-11:30 AM",
      room: "Lab 201",
      prerequisites: ["MATH101"],
      objectives: [
        "Understand fundamental physics laws",
        "Apply physics principles in laboratory settings",
        "Develop problem-solving skills"
      ],
      syllabus: "Week 1-3: Mechanics, Week 4-6: Thermodynamics, Week 7-9: Electromagnetism, Week 10-14: Applications",
      assessment: "Lab Reports (25%), Midterm (25%), Final Exam (35%), Homework (15%)",
      materials: ["Physics Textbook", "Lab Equipment", "Simulation Software"],
      fee: 1000,
      rating: 4.6,
      reviews: 32,
      completionRate: 88
    },
    {
      id: "3",
      courseCode: "ENG301",
      courseName: "English Literature",
      description: "Comprehensive study of English literature from classical to modern periods.",
      department: "English",
      credits: 3,
      duration: 16,
      level: "advanced",
      status: "active",
      instructor: "Ms. Emily Davis",
      instructorId: "TCH003",
      maxStudents: 20,
      enrolledStudents: 18,
      startDate: "2025-01-15",
      endDate: "2025-05-15",
      schedule: "Mon, Wed 2:00-3:30 PM",
      room: "Room 102",
      prerequisites: ["ENG101", "ENG201"],
      objectives: [
        "Analyze literary works critically",
        "Develop writing and communication skills",
        "Understand literary movements and themes"
      ],
      syllabus: "Week 1-4: Classical Literature, Week 5-8: Renaissance, Week 9-12: Modern Literature, Week 13-16: Contemporary",
      assessment: "Essays (40%), Class Participation (20%), Midterm (20%), Final Project (20%)",
      materials: ["Literature Anthology", "Critical Analysis Guide", "Writing Resources"],
      fee: 900,
      rating: 4.7,
      reviews: 28,
      completionRate: 95
    },
    {
      id: "4",
      courseCode: "CS401",
      courseName: "Programming Fundamentals",
      description: "Introduction to programming concepts using modern programming languages.",
      department: "Computer Science",
      credits: 4,
      duration: 14,
      level: "beginner",
      status: "active",
      instructor: "Mr. David Rodriguez",
      instructorId: "TCH004",
      maxStudents: 35,
      enrolledStudents: 30,
      startDate: "2025-01-25",
      endDate: "2025-05-10",
      schedule: "Mon, Wed, Fri 1:00-2:30 PM",
      room: "Computer Lab 301",
      prerequisites: [],
      objectives: [
        "Learn programming fundamentals",
        "Develop coding skills",
        "Understand software development process"
      ],
      syllabus: "Week 1-3: Programming Basics, Week 4-6: Data Structures, Week 7-9: Algorithms, Week 10-14: Projects",
      assessment: "Programming Assignments (40%), Midterm (25%), Final Project (25%), Participation (10%)",
      materials: ["Programming Textbook", "Development Environment", "Online Resources"],
      fee: 1100,
      rating: 4.5,
      reviews: 38,
      completionRate: 85
    }
  ];

  const subjects: Subject[] = [
    {
      id: "1",
      subjectCode: "MATH",
      subjectName: "Mathematics",
      department: "Mathematics",
      credits: 4,
      description: "Core mathematics curriculum covering algebra, geometry, calculus, and statistics.",
      level: "high",
      status: "active",
      teachers: ["Dr. Sarah Johnson", "Prof. John Smith"],
      courses: ["MATH101", "MATH201", "MATH301"],
      prerequisites: ["Basic Algebra"],
      objectives: [
        "Develop mathematical reasoning skills",
        "Apply mathematical concepts to real-world problems",
        "Prepare for advanced mathematics courses"
      ],
      assessment: "Exams, Assignments, Projects",
      materials: ["Mathematics Textbook", "Calculator", "Graphing Tools"]
    },
    {
      id: "2",
      subjectCode: "PHYS",
      subjectName: "Physics",
      department: "Science",
      credits: 3,
      description: "Fundamental physics principles and laboratory experiments.",
      level: "high",
      status: "active",
      teachers: ["Prof. Michael Chen", "Dr. Lisa Wang"],
      courses: ["PHYS201", "PHYS301", "PHYS401"],
      prerequisites: ["Mathematics"],
      objectives: [
        "Understand physical laws and principles",
        "Develop experimental skills",
        "Apply physics to practical problems"
      ],
      assessment: "Lab Reports, Exams, Projects",
      materials: ["Physics Textbook", "Lab Equipment", "Simulation Software"]
    }
  ];

  const curriculums: Curriculum[] = [
    {
      id: "1",
      programName: "Bachelor of Science in Mathematics",
      department: "Mathematics",
      level: "undergraduate",
      duration: 8,
      totalCredits: 120,
      requiredCredits: 90,
      electiveCredits: 30,
      status: "active",
      description: "Comprehensive mathematics program preparing students for careers in mathematics, statistics, and related fields.",
      objectives: [
        "Develop strong mathematical foundation",
        "Apply mathematical concepts to real-world problems",
        "Prepare for graduate studies or professional careers"
      ],
      requirements: [
        "High school diploma or equivalent",
        "Mathematics proficiency test",
        "English language proficiency"
      ],
      courses: ["MATH101", "MATH201", "MATH301", "MATH401"],
      createdDate: "2020-09-01",
      updatedDate: "2024-12-01"
    },
    {
      id: "2",
      programName: "Master of Science in Computer Science",
      department: "Computer Science",
      level: "graduate",
      duration: 4,
      totalCredits: 60,
      requiredCredits: 45,
      electiveCredits: 15,
      status: "active",
      description: "Advanced computer science program focusing on research and advanced applications.",
      objectives: [
        "Develop advanced programming skills",
        "Conduct independent research",
        "Apply computer science to complex problems"
      ],
      requirements: [
        "Bachelor's degree in Computer Science or related field",
        "GRE scores",
        "Letters of recommendation"
      ],
      courses: ["CS501", "CS601", "CS701", "CS801"],
      createdDate: "2021-09-01",
      updatedDate: "2024-12-01"
    }
  ];

  const enrollments: Enrollment[] = [
    {
      id: "1",
      studentId: "STU001",
      studentName: "Alex Johnson",
      courseId: "1",
      courseName: "Advanced Mathematics",
      enrollmentDate: "2024-12-15",
      status: "enrolled",
      credits: 4,
      semester: "Spring 2025",
      year: "2025"
    },
    {
      id: "2",
      studentId: "STU002",
      studentName: "Sarah Chen",
      courseId: "2",
      courseName: "Physics Fundamentals",
      enrollmentDate: "2024-12-20",
      status: "enrolled",
      credits: 3,
      semester: "Spring 2025",
      year: "2025"
    },
    {
      id: "3",
      studentId: "STU003",
      studentName: "Mike Rodriguez",
      courseId: "4",
      courseName: "Programming Fundamentals",
      enrollmentDate: "2024-12-10",
      status: "completed",
      grade: "A",
      credits: 4,
      semester: "Fall 2024",
      year: "2024"
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === "all" || course.department === filterDepartment;
    const matchesStatus = filterStatus === "all" || course.status === filterStatus;
    const matchesLevel = filterLevel === "all" || course.level === filterLevel;
    return matchesSearch && matchesDepartment && matchesStatus && matchesLevel;
  });

  const totalCourses = courses.length;
  const activeCourses = courses.filter(c => c.status === "active").length;
  const totalEnrollments = courses.reduce((sum, c) => sum + c.enrolledStudents, 0);
  const averageRating = courses.filter(c => c.rating).reduce((sum, c) => sum + (c.rating || 0), 0) / courses.filter(c => c.rating).length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "inactive": return "bg-red-100 text-red-800";
      case "archived": return "bg-gray-100 text-gray-800";
      case "enrolled": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-green-100 text-green-800";
      case "dropped": return "bg-red-100 text-red-800";
      case "withdrawn": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner": return "bg-blue-100 text-blue-800";
      case "intermediate": return "bg-yellow-100 text-yellow-800";
      case "advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-green-600";
    if (rating >= 4.0) return "text-blue-600";
    if (rating >= 3.5) return "text-yellow-600";
    return "text-red-600";
  };

  const CourseModal = ({ course }: { course: Course }) => (
    <Dialog open={showCourseModal} onOpenChange={setShowCourseModal}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{course.courseName}</h2>
              <p className="text-muted-foreground">{course.courseCode} • {course.department}</p>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Course Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Course Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Course Code</label>
                  <p className="text-sm font-semibold">{course.courseCode}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Credits</label>
                  <p className="text-sm font-semibold">{course.credits}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Duration</label>
                  <p className="text-sm">{course.duration} weeks</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Level</label>
                  <Badge className={getLevelColor(course.level)}>
                    {course.level}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <Badge className={getStatusColor(course.status)}>
                    {course.status}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Fee</label>
                  <p className="text-sm font-semibold">${course.fee.toLocaleString()}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Description</label>
                <p className="text-sm">{course.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* Instructor Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Instructor Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>
                    {course.instructor.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{course.instructor}</p>
                  <p className="text-sm text-muted-foreground">{course.instructorId}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Schedule</label>
                  <p className="text-sm">{course.schedule}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Room</label>
                  <p className="text-sm">{course.room}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Start Date</label>
                  <p className="text-sm">{new Date(course.startDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">End Date</label>
                  <p className="text-sm">{new Date(course.endDate).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enrollment Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Enrollment Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Enrolled Students</label>
                  <p className="text-2xl font-bold text-blue-600">{course.enrolledStudents}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Max Students</label>
                  <p className="text-2xl font-bold text-gray-600">{course.maxStudents}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Rating</label>
                  <p className={`text-2xl font-bold ${getRatingColor(course.rating || 0)}`}>
                    {course.rating ? course.rating.toFixed(1) : 'N/A'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Completion Rate</label>
                  <p className="text-2xl font-bold text-green-600">
                    {course.completionRate ? `${course.completionRate}%` : 'N/A'}
                  </p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${(course.enrolledStudents / course.maxStudents) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.round((course.enrolledStudents / course.maxStudents) * 100)}% capacity
              </p>
            </CardContent>
          </Card>

          {/* Course Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Course Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Prerequisites</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {course.prerequisites?.map((prereq, index) => (
                    <Badge key={index} variant="outline">{prereq}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Objectives</label>
                <ul className="text-sm space-y-1 mt-2">
                  {course.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {objective}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Assessment</label>
                <p className="text-sm">{course.assessment}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Materials</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {course.materials.map((material, index) => (
                    <Badge key={index} variant="secondary">{material}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setShowCourseModal(false)}>
            Close
          </Button>
          <Button className="bg-gradient-to-r from-primary-500 to-primary-600">
            <Edit className="h-4 w-4 mr-2" />
            Edit Course
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
                  <p className="text-sm font-medium text-muted-foreground">Total Courses</p>
                  <p className="text-2xl font-bold">{totalCourses}</p>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +2 this semester
                  </p>
                </div>
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <BookOpen className="h-5 w-5" />
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
                  <p className="text-sm font-medium text-muted-foreground">Active Courses</p>
                  <p className="text-2xl font-bold">{activeCourses}</p>
                  <p className="text-xs text-blue-600 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Currently running
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
                  <p className="text-sm font-medium text-muted-foreground">Total Enrollments</p>
                  <p className="text-2xl font-bold">{totalEnrollments}</p>
                  <p className="text-xs text-purple-600 flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    Student registrations
                  </p>
                </div>
                <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                  <Users className="h-5 w-5" />
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
                  <p className="text-sm font-medium text-muted-foreground">Average Rating</p>
                  <p className="text-2xl font-bold">{averageRating.toFixed(1)}</p>
                  <p className="text-xs text-orange-600 flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    Course quality
                  </p>
                </div>
                <div className="p-3 rounded-full bg-orange-100 text-orange-600">
                  <Star className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg">
        {["overview", "courses", "subjects", "curriculum", "enrollments"].map((tab) => (
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Courses */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Courses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courses.slice(0, 5).map((course, index) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                          <BookOpen className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{course.courseName}</p>
                          <p className="text-xs text-muted-foreground">{course.courseCode} • {course.department}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-blue-600">
                          {course.enrolledStudents}/{course.maxStudents}
                        </p>
                        <Badge className={getStatusColor(course.status)} variant="outline">
                          {course.status}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Course Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Course Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courses.map((course, index) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-medium">{course.courseName}</p>
                          <p className="text-sm text-muted-foreground">{course.courseCode}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className={`font-semibold ${getRatingColor(course.rating || 0)}`}>
                            {course.rating ? course.rating.toFixed(1) : 'N/A'}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Enrollment: {course.enrolledStudents}/{course.maxStudents}</span>
                          <span>Completion: {course.completionRate || 0}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${(course.enrolledStudents / course.maxStudents) * 100}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{course.credits} credits</span>
                          <span>${course.fee.toLocaleString()} fee</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      )}

      {activeTab === "courses" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Course Management</CardTitle>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search courses..."
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
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterLevel} onValueChange={setFilterLevel}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Course
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Add New Course</DialogTitle>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-4">
                        <Input placeholder="Course Code" />
                        <Input placeholder="Course Name" />
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
                        <Input placeholder="Credits" type="number" />
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input placeholder="Duration (weeks)" type="number" />
                        <Input placeholder="Instructor" />
                        <Input placeholder="Max Students" type="number" />
                        <Input placeholder="Fee" type="number" />
                        <Input placeholder="Start Date" type="date" />
                        <Input placeholder="End Date" type="date" />
                        <Input placeholder="Schedule" />
                        <Input placeholder="Room" />
                        <Textarea placeholder="Description" />
                        <Textarea placeholder="Objectives (one per line)" />
                        <Textarea placeholder="Prerequisites (comma separated)" />
                        <Textarea placeholder="Assessment" />
                        <Textarea placeholder="Materials (comma separated)" />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline">Cancel</Button>
                        <Button className="bg-gradient-to-r from-primary-500 to-primary-600">Add Course</Button>
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
                    <TableHead>Course</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Instructor</TableHead>
                    <TableHead>Credits</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Enrollment</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCourses.map((course, index) => (
                    <motion.tr
                      key={course.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-muted/50"
                    >
                      <TableCell>
                        <div>
                          <p className="font-medium">{course.courseName}</p>
                          <p className="text-sm text-muted-foreground">{course.courseCode}</p>
                        </div>
                      </TableCell>
                      <TableCell>{course.department}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {course.instructor.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{course.instructor}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">{course.credits}</TableCell>
                      <TableCell>
                        <Badge className={getLevelColor(course.level)}>
                          {course.level}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-blue-600">
                          {course.enrolledStudents}/{course.maxStudents}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className={`font-semibold ${getRatingColor(course.rating || 0)}`}>
                            {course.rating ? course.rating.toFixed(1) : 'N/A'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(course.status)}>
                          {course.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              setSelectedCourse(course);
                              setShowCourseModal(true);
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

      {activeTab === "subjects" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Subject Management</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Subjects
                  </Button>
                  <Button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Subject
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Credits</TableHead>
                    <TableHead>Teachers</TableHead>
                    <TableHead>Courses</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subjects.map((subject, index) => (
                    <motion.tr
                      key={subject.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-muted/50"
                    >
                      <TableCell>
                        <div>
                          <p className="font-medium">{subject.subjectName}</p>
                          <p className="text-sm text-muted-foreground">{subject.subjectCode}</p>
                        </div>
                      </TableCell>
                      <TableCell>{subject.department}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getLevelColor(subject.level)}>
                          {subject.level}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold">{subject.credits}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {subject.teachers.slice(0, 2).map((teacher, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {teacher.split(' ')[0]}
                            </Badge>
                          ))}
                          {subject.teachers.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{subject.teachers.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {subject.courses.slice(0, 2).map((course, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {course}
                            </Badge>
                          ))}
                          {subject.courses.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{subject.courses.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(subject.status)}>
                          {subject.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
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

      {activeTab === "curriculum" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Curriculum Management</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Curriculum
                  </Button>
                  <Button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Curriculum
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Program</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Credits</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {curriculums.map((curriculum, index) => (
                    <motion.tr
                      key={curriculum.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-muted/50"
                    >
                      <TableCell>
                        <div>
                          <p className="font-medium">{curriculum.programName}</p>
                          <p className="text-sm text-muted-foreground">{curriculum.description}</p>
                        </div>
                      </TableCell>
                      <TableCell>{curriculum.department}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getLevelColor(curriculum.level)}>
                          {curriculum.level}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold">{curriculum.duration} semesters</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p className="font-semibold">{curriculum.totalCredits} total</p>
                          <p className="text-muted-foreground">{curriculum.requiredCredits} required, {curriculum.electiveCredits} elective</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(curriculum.status)}>
                          {curriculum.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(curriculum.createdDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
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

      {activeTab === "enrollments" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Enrollment Management</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Enrollments
                  </Button>
                  <Button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Enrollment
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Credits</TableHead>
                    <TableHead>Semester</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Enrolled</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {enrollments.map((enrollment, index) => (
                    <motion.tr
                      key={enrollment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-muted/50"
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {enrollment.studentName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{enrollment.studentName}</p>
                            <p className="text-sm text-muted-foreground">{enrollment.studentId}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{enrollment.courseName}</p>
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">{enrollment.credits}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p className="font-medium">{enrollment.semester}</p>
                          <p className="text-muted-foreground">{enrollment.year}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(enrollment.status)}>
                          {enrollment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {enrollment.grade ? (
                          <Badge variant="outline" className="bg-green-100 text-green-800">
                            {enrollment.grade}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>{new Date(enrollment.enrollmentDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
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

      {/* Course Modal */}
      {selectedCourse && (
        <CourseModal course={selectedCourse} />
      )}
    </div>
  );
}
