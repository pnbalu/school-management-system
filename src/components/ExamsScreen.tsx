import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  TrendingUp, 
  Search,
  Download,
  Plus,
  Edit,
  Eye,
  BarChart3,
  PieChart,
  Activity,
  Check,
  ClipboardList
} from "lucide-react";

interface Exam {
  id: string;
  title: string;
  subject: string;
  class: string;
  teacher: string;
  type: "midterm" | "final" | "quiz" | "assignment" | "test";
  status: "scheduled" | "ongoing" | "completed" | "cancelled";
  date: string;
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  totalMarks: number;
  passingMarks: number;
  totalStudents: number;
  attendedStudents: number;
  averageScore: number;
  highestScore: number;
  lowestScore: number;
  description: string;
  instructions: string[];
  createdBy: string;
  createdDate: string;
  lastModified: string;
}

interface ExamResult {
  id: string;
  examId: string;
  studentId: string;
  studentName: string;
  class: string;
  subject: string;
  score: number;
  totalMarks: number;
  percentage: number;
  grade: string;
  rank: number;
  status: "passed" | "failed" | "absent";
  examDate: string;
  submittedAt: string;
  reviewedBy: string;
  comments?: string;
}

interface ExamSchedule {
  id: string;
  examId: string;
  examTitle: string;
  subject: string;
  class: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  venue: string;
  supervisor: string;
  status: "upcoming" | "ongoing" | "completed";
  totalStudents: number;
  attendedStudents: number;
}

export default function ExamsScreen() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterClass, setFilterClass] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [showExamModal, setShowExamModal] = useState(false);

  // Mock data
  const exams: Exam[] = [
    {
      id: "1",
      title: "Mathematics Midterm Exam",
      subject: "Mathematics",
      class: "10th Grade",
      teacher: "Dr. Sarah Johnson",
      type: "midterm",
      status: "completed",
      date: "2024-12-10",
      startTime: "09:00",
      endTime: "12:00",
      duration: 180,
      totalMarks: 100,
      passingMarks: 40,
      totalStudents: 25,
      attendedStudents: 23,
      averageScore: 72.5,
      highestScore: 95,
      lowestScore: 35,
      description: "Comprehensive midterm examination covering algebra, geometry, and trigonometry",
      instructions: [
        "Bring your own calculator",
        "No mobile phones allowed",
        "Answer all questions",
        "Show your working clearly"
      ],
      createdBy: "Dr. Sarah Johnson",
      createdDate: "2024-11-15",
      lastModified: "2024-12-10"
    },
    {
      id: "2",
      title: "Physics Final Exam",
      subject: "Physics",
      class: "11th Grade",
      teacher: "Prof. Michael Chen",
      type: "final",
      status: "ongoing",
      date: "2024-12-20",
      startTime: "10:00",
      endTime: "13:00",
      duration: 180,
      totalMarks: 100,
      passingMarks: 40,
      totalStudents: 22,
      attendedStudents: 22,
      averageScore: 0,
      highestScore: 0,
      lowestScore: 0,
      description: "Final examination covering mechanics, thermodynamics, and electromagnetism",
      instructions: [
        "Bring scientific calculator",
        "No reference materials allowed",
        "Answer all questions",
        "Time limit: 3 hours"
      ],
      createdBy: "Prof. Michael Chen",
      createdDate: "2024-11-20",
      lastModified: "2024-12-15"
    },
    {
      id: "3",
      title: "English Literature Quiz",
      subject: "English",
      class: "12th Grade",
      teacher: "Ms. Emily Davis",
      type: "quiz",
      status: "scheduled",
      date: "2024-12-25",
      startTime: "11:00",
      endTime: "12:00",
      duration: 60,
      totalMarks: 50,
      passingMarks: 25,
      totalStudents: 20,
      attendedStudents: 0,
      averageScore: 0,
      highestScore: 0,
      lowestScore: 0,
      description: "Quick quiz on Shakespeare's Hamlet and modern poetry",
      instructions: [
        "Bring pen and paper",
        "No electronic devices",
        "Answer all questions",
        "Time limit: 1 hour"
      ],
      createdBy: "Ms. Emily Davis",
      createdDate: "2024-12-01",
      lastModified: "2024-12-15"
    }
  ];

  const examResults: ExamResult[] = [
    {
      id: "1",
      examId: "1",
      studentId: "STU001",
      studentName: "Alex Johnson",
      class: "10th Grade",
      subject: "Mathematics",
      score: 85,
      totalMarks: 100,
      percentage: 85,
      grade: "A",
      rank: 3,
      status: "passed",
      examDate: "2024-12-10",
      submittedAt: "2024-12-10T11:45:00Z",
      reviewedBy: "Dr. Sarah Johnson",
      comments: "Excellent work, well-structured solutions"
    },
    {
      id: "2",
      examId: "1",
      studentId: "STU002",
      studentName: "Sarah Chen",
      class: "10th Grade",
      subject: "Mathematics",
      score: 92,
      totalMarks: 100,
      percentage: 92,
      grade: "A+",
      rank: 1,
      status: "passed",
      examDate: "2024-12-10",
      submittedAt: "2024-12-10T11:30:00Z",
      reviewedBy: "Dr. Sarah Johnson",
      comments: "Outstanding performance, perfect solutions"
    },
    {
      id: "3",
      examId: "1",
      studentId: "STU003",
      studentName: "Mike Rodriguez",
      class: "10th Grade",
      subject: "Mathematics",
      score: 35,
      totalMarks: 100,
      percentage: 35,
      grade: "F",
      rank: 25,
      status: "failed",
      examDate: "2024-12-10",
      submittedAt: "2024-12-10T11:50:00Z",
      reviewedBy: "Dr. Sarah Johnson",
      comments: "Needs improvement in basic concepts"
    }
  ];

  const examSchedules: ExamSchedule[] = [
    {
      id: "1",
      examId: "2",
      examTitle: "Physics Final Exam",
      subject: "Physics",
      class: "11th Grade",
      date: "2024-12-20",
      startTime: "10:00",
      endTime: "13:00",
      duration: 180,
      venue: "Hall A",
      supervisor: "Prof. Michael Chen",
      status: "upcoming",
      totalStudents: 22,
      attendedStudents: 0
    },
    {
      id: "2",
      examId: "3",
      examTitle: "English Literature Quiz",
      subject: "English",
      class: "12th Grade",
      date: "2024-12-25",
      startTime: "11:00",
      endTime: "12:00",
      duration: 60,
      venue: "Room 101",
      supervisor: "Ms. Emily Davis",
      status: "upcoming",
      totalStudents: 20,
      attendedStudents: 0
    }
  ];

  const filteredExams = exams.filter(exam => {
    const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.class.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = filterClass === "all" || exam.class === filterClass;
    const matchesStatus = filterStatus === "all" || exam.status === filterStatus;
    const matchesType = filterType === "all" || exam.type === filterType;
    return matchesSearch && matchesClass && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled": return "bg-blue-100 text-blue-800";
      case "ongoing": return "bg-yellow-100 text-yellow-800";
      case "completed": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      case "passed": return "bg-green-100 text-green-800";
      case "failed": return "bg-red-100 text-red-800";
      case "absent": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "midterm": return "bg-purple-100 text-purple-800";
      case "final": return "bg-red-100 text-red-800";
      case "quiz": return "bg-blue-100 text-blue-800";
      case "assignment": return "bg-green-100 text-green-800";
      case "test": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A+": return "bg-green-100 text-green-800";
      case "A": return "bg-green-100 text-green-800";
      case "B+": return "bg-blue-100 text-blue-800";
      case "B": return "bg-blue-100 text-blue-800";
      case "C+": return "bg-yellow-100 text-yellow-800";
      case "C": return "bg-yellow-100 text-yellow-800";
      case "D": return "bg-orange-100 text-orange-800";
      case "F": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const ExamModal = ({ exam }: { exam: Exam }) => (
    <Dialog open={showExamModal} onOpenChange={setShowExamModal}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{exam.title}</h2>
              <p className="text-muted-foreground">{exam.subject} • {exam.class}</p>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Exam Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Exam Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Type</label>
                  <Badge className={getTypeColor(exam.type)}>
                    {exam.type}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <Badge className={getStatusColor(exam.status)}>
                    {exam.status}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Date</label>
                  <p className="text-sm font-semibold">{new Date(exam.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Time</label>
                  <p className="text-sm font-semibold">{exam.startTime} - {exam.endTime}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Duration</label>
                  <p className="text-sm font-semibold">{exam.duration} minutes</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Total Marks</label>
                  <p className="text-sm font-semibold">{exam.totalMarks}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Passing Marks</label>
                  <p className="text-sm font-semibold">{exam.passingMarks}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Teacher</label>
                  <p className="text-sm">{exam.teacher}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Description</label>
                <p className="text-sm">{exam.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Total Students</label>
                  <p className="text-2xl font-bold text-blue-600">{exam.totalStudents}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Attended</label>
                  <p className="text-2xl font-bold text-green-600">{exam.attendedStudents}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Average Score</label>
                  <p className="text-2xl font-bold text-purple-600">{exam.averageScore}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Highest Score</label>
                  <p className="text-2xl font-bold text-green-600">{exam.highestScore}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Lowest Score</label>
                  <p className="text-2xl font-bold text-red-600">{exam.lowestScore}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Attendance Rate</label>
                  <p className="text-2xl font-bold text-blue-600">
                    {Math.round((exam.attendedStudents / exam.totalStudents) * 100)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5" />
                Instructions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {exam.instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">{index + 1}.</span>
                    <span className="text-sm">{instruction}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Results */}
          {exam.status === "completed" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Results Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Pass Rate</span>
                    <span className="font-semibold text-green-600">
                      {Math.round((examResults.filter(r => r.examId === exam.id && r.status === "passed").length / exam.attendedStudents) * 100)}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Average Grade</span>
                    <span className="font-semibold text-blue-600">B+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Top Performer</span>
                    <span className="font-semibold text-green-600">
                      {examResults.find(r => r.examId === exam.id && r.rank === 1)?.studentName || "N/A"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setShowExamModal(false)}>
            Close
          </Button>
          <Button className="bg-gradient-to-r from-primary-500 to-primary-600">
            <Download className="h-4 w-4 mr-2" />
            Download Results
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
                  <p className="text-sm font-medium text-muted-foreground">Total Exams</p>
                  <p className="text-2xl font-bold">{exams.length}</p>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +2 this month
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
                  <p className="text-sm font-medium text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-green-600">
                    {exams.filter(e => e.status === "completed").length}
                  </p>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <Check className="h-3 w-3" />
                    {Math.round((exams.filter(e => e.status === "completed").length / exams.length) * 100)}% of total
                  </p>
                </div>
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  <Check className="h-5 w-5" />
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
                  <p className="text-sm font-medium text-muted-foreground">Ongoing</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {exams.filter(e => e.status === "ongoing").length}
                  </p>
                  <p className="text-xs text-yellow-600 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Currently active
                  </p>
                </div>
                <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                  <Clock className="h-5 w-5" />
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
                  <p className="text-sm font-medium text-muted-foreground">Scheduled</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {exams.filter(e => e.status === "scheduled").length}
                  </p>
                  <p className="text-xs text-blue-600 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Upcoming exams
                  </p>
                </div>
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <Calendar className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg">
        {["overview", "exams", "results", "schedule"].map((tab) => (
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
            {/* Recent Exams */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Exams
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {exams.slice(0, 5).map((exam, index) => (
                    <motion.div
                      key={exam.id}
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
                          <p className="text-sm font-medium">{exam.title}</p>
                          <p className="text-xs text-muted-foreground">{exam.class} • {exam.subject}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-blue-600">
                          {exam.totalMarks} marks
                        </p>
                        <Badge className={getStatusColor(exam.status)} variant="outline">
                          {exam.status}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Exam Types */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Exam Types
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["midterm", "final", "quiz", "assignment", "test"].map((type, index) => {
                    const count = exams.filter(e => e.type === type).length;
                    return (
                      <motion.div
                        key={type}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-medium capitalize">{type} Exams</p>
                            <p className="text-sm text-muted-foreground">{count} exams</p>
                          </div>
                          <Badge className={getTypeColor(type)}>
                            {type}
                          </Badge>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${(count / exams.length) * 100}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>{Math.round((count / exams.length) * 100)}% of total</span>
                          <span>{count} exams</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      )}

      {activeTab === "exams" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Exam Management</CardTitle>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search exams..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Select value={filterClass} onValueChange={setFilterClass}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Classes</SelectItem>
                      <SelectItem value="10th Grade">10th Grade</SelectItem>
                      <SelectItem value="11th Grade">11th Grade</SelectItem>
                      <SelectItem value="12th Grade">12th Grade</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="ongoing">Ongoing</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="midterm">Midterm</SelectItem>
                      <SelectItem value="final">Final</SelectItem>
                      <SelectItem value="quiz">Quiz</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Exam
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Exam</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Marks</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredExams.map((exam, index) => (
                    <motion.tr
                      key={exam.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-muted/50"
                    >
                      <TableCell>
                        <div>
                          <p className="font-medium">{exam.title}</p>
                          <p className="text-sm text-muted-foreground">{exam.class} • {exam.subject}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getTypeColor(exam.type)}>
                          {exam.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(exam.status)}>
                          {exam.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(exam.date).toLocaleDateString()}</TableCell>
                      <TableCell className="font-semibold">{exam.duration} min</TableCell>
                      <TableCell className="font-semibold">{exam.totalMarks}</TableCell>
                      <TableCell className="font-semibold">{exam.attendedStudents}/{exam.totalStudents}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              setSelectedExam(exam);
                              setShowExamModal(true);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
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

      {activeTab === "results" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Exam Results</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Results
                  </Button>
                  <Button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Results
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Percentage</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Rank</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {examResults.map((result, index) => (
                    <motion.tr
                      key={result.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-muted/50"
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {result.studentName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{result.studentName}</p>
                            <p className="text-sm text-muted-foreground">{result.studentId}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{result.class}</TableCell>
                      <TableCell>{result.subject}</TableCell>
                      <TableCell className="font-semibold">{result.score}/{result.totalMarks}</TableCell>
                      <TableCell className="font-semibold text-blue-600">{result.percentage}%</TableCell>
                      <TableCell>
                        <Badge className={getGradeColor(result.grade)}>
                          {result.grade}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold">#{result.rank}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(result.status)}>
                          {result.status}
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
                            <Download className="h-4 w-4" />
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
                <CardTitle>Exam Schedule</CardTitle>
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
                    <TableHead>Exam</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Venue</TableHead>
                    <TableHead>Supervisor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {examSchedules.map((schedule, index) => (
                    <motion.tr
                      key={schedule.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-muted/50"
                    >
                      <TableCell>
                        <div>
                          <p className="font-medium">{schedule.examTitle}</p>
                          <p className="text-sm text-muted-foreground">{schedule.subject}</p>
                        </div>
                      </TableCell>
                      <TableCell>{schedule.class}</TableCell>
                      <TableCell>{new Date(schedule.date).toLocaleDateString()}</TableCell>
                      <TableCell className="font-semibold">{schedule.startTime} - {schedule.endTime}</TableCell>
                      <TableCell className="font-semibold">{schedule.duration} min</TableCell>
                      <TableCell>{schedule.venue}</TableCell>
                      <TableCell>{schedule.supervisor}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(schedule.status)}>
                          {schedule.status}
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
                            <Download className="h-4 w-4" />
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

      {/* Exam Modal */}
      {selectedExam && (
        <ExamModal exam={selectedExam} />
      )}
    </div>
  );
}
