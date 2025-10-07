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
  Users, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  TrendingUp, 
  TrendingDown,
  Search,
  Download,
  Plus,
  Edit,
  Eye,
  BarChart3,
  PieChart,
  Activity,
  User
} from "lucide-react";

interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  class: string;
  subject: string;
  teacher: string;
  date: string;
  status: "present" | "absent" | "late" | "excused";
  checkInTime?: string;
  checkOutTime?: string;
  reason?: string;
  notes?: string;
  markedBy: string;
  markedAt: string;
}

interface AttendanceSummary {
  totalStudents: number;
  present: number;
  absent: number;
  late: number;
  excused: number;
  attendanceRate: number;
  date: string;
  class: string;
  subject: string;
}

interface AttendanceStats {
  totalRecords: number;
  averageAttendance: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  excusedCount: number;
  attendanceRate: number;
  trend: "up" | "down" | "stable";
  changePercent: number;
}

interface ClassAttendance {
  classId: string;
  className: string;
  totalStudents: number;
  presentStudents: number;
  attendanceRate: number;
  teacher: string;
  subject: string;
  date: string;
}

export default function AttendanceScreen() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterClass, setFilterClass] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDate, setFilterDate] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | null>(null);
  const [showRecordModal, setShowRecordModal] = useState(false);

  // Mock data
  const attendanceRecords: AttendanceRecord[] = [
    {
      id: "1",
      studentId: "STU001",
      studentName: "Alex Johnson",
      class: "10th Grade",
      subject: "Mathematics",
      teacher: "Dr. Sarah Johnson",
      date: "2024-12-15",
      status: "present",
      checkInTime: "08:30",
      checkOutTime: "15:30",
      markedBy: "Dr. Sarah Johnson",
      markedAt: "2024-12-15T08:35:00Z"
    },
    {
      id: "2",
      studentId: "STU002",
      studentName: "Sarah Chen",
      class: "10th Grade",
      subject: "Mathematics",
      teacher: "Dr. Sarah Johnson",
      date: "2024-12-15",
      status: "late",
      checkInTime: "09:15",
      checkOutTime: "15:30",
      reason: "Traffic jam",
      markedBy: "Dr. Sarah Johnson",
      markedAt: "2024-12-15T09:20:00Z"
    },
    {
      id: "3",
      studentId: "STU003",
      studentName: "Mike Rodriguez",
      class: "11th Grade",
      subject: "Physics",
      teacher: "Prof. Michael Chen",
      date: "2024-12-15",
      status: "absent",
      reason: "Sick",
      notes: "Medical certificate provided",
      markedBy: "Prof. Michael Chen",
      markedAt: "2024-12-15T10:00:00Z"
    },
    {
      id: "4",
      studentId: "STU004",
      studentName: "Emily Davis",
      class: "11th Grade",
      subject: "Physics",
      teacher: "Prof. Michael Chen",
      date: "2024-12-15",
      status: "present",
      checkInTime: "08:45",
      checkOutTime: "15:45",
      markedBy: "Prof. Michael Chen",
      markedAt: "2024-12-15T08:50:00Z"
    },
    {
      id: "5",
      studentId: "STU005",
      studentName: "David Wilson",
      class: "12th Grade",
      subject: "English",
      teacher: "Ms. Emily Davis",
      date: "2024-12-15",
      status: "excused",
      reason: "Family emergency",
      notes: "Parent called to inform",
      markedBy: "Ms. Emily Davis",
      markedAt: "2024-12-15T09:00:00Z"
    }
  ];

  const attendanceSummaries: AttendanceSummary[] = [
    {
      totalStudents: 25,
      present: 20,
      absent: 3,
      late: 2,
      excused: 0,
      attendanceRate: 80,
      date: "2024-12-15",
      class: "10th Grade",
      subject: "Mathematics"
    },
    {
      totalStudents: 22,
      present: 18,
      absent: 2,
      late: 1,
      excused: 1,
      attendanceRate: 81.8,
      date: "2024-12-15",
      class: "11th Grade",
      subject: "Physics"
    },
    {
      totalStudents: 20,
      present: 19,
      absent: 0,
      late: 1,
      excused: 0,
      attendanceRate: 95,
      date: "2024-12-15",
      class: "12th Grade",
      subject: "English"
    }
  ];

  const attendanceStats: AttendanceStats = {
    totalRecords: attendanceRecords.length,
    averageAttendance: 85.6,
    presentCount: attendanceRecords.filter(r => r.status === "present").length,
    absentCount: attendanceRecords.filter(r => r.status === "absent").length,
    lateCount: attendanceRecords.filter(r => r.status === "late").length,
    excusedCount: attendanceRecords.filter(r => r.status === "excused").length,
    attendanceRate: 85.6,
    trend: "up",
    changePercent: 2.3
  };

  const classAttendance: ClassAttendance[] = [
    {
      classId: "1",
      className: "10th Grade",
      totalStudents: 25,
      presentStudents: 20,
      attendanceRate: 80,
      teacher: "Dr. Sarah Johnson",
      subject: "Mathematics",
      date: "2024-12-15"
    },
    {
      classId: "2",
      className: "11th Grade",
      totalStudents: 22,
      presentStudents: 18,
      attendanceRate: 81.8,
      teacher: "Prof. Michael Chen",
      subject: "Physics",
      date: "2024-12-15"
    },
    {
      classId: "3",
      className: "12th Grade",
      totalStudents: 20,
      presentStudents: 19,
      attendanceRate: 95,
      teacher: "Ms. Emily Davis",
      subject: "English",
      date: "2024-12-15"
    }
  ];

  const filteredRecords = attendanceRecords.filter(record => {
    const matchesSearch = record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.class.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = filterClass === "all" || record.class === filterClass;
    const matchesStatus = filterStatus === "all" || record.status === filterStatus;
    const matchesDate = !filterDate || record.date === filterDate;
    return matchesSearch && matchesClass && matchesStatus && matchesDate;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present": return "bg-green-100 text-green-800";
      case "absent": return "bg-red-100 text-red-800";
      case "late": return "bg-yellow-100 text-yellow-800";
      case "excused": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "absent": return <XCircle className="h-4 w-4 text-red-600" />;
      case "late": return <Clock className="h-4 w-4 text-yellow-600" />;
      case "excused": return <AlertCircle className="h-4 w-4 text-blue-600" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "down": return <TrendingDown className="h-4 w-4 text-red-600" />;
      default: return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const AttendanceRecordModal = ({ record }: { record: AttendanceRecord }) => (
    <Dialog open={showRecordModal} onOpenChange={setShowRecordModal}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{record.studentName}</h2>
              <p className="text-muted-foreground">{record.studentId} • {record.class}</p>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Student Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Student Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Student ID</label>
                  <p className="text-sm font-semibold">{record.studentId}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Class</label>
                  <p className="text-sm">{record.class}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Subject</label>
                  <p className="text-sm">{record.subject}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Teacher</label>
                  <p className="text-sm">{record.teacher}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Date</label>
                  <p className="text-sm">{new Date(record.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <Badge className={getStatusColor(record.status)}>
                    {record.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Attendance Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Attendance Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Check In</label>
                  <p className="text-sm font-semibold">{record.checkInTime || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Check Out</label>
                  <p className="text-sm font-semibold">{record.checkOutTime || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Marked By</label>
                  <p className="text-sm">{record.markedBy}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Marked At</label>
                  <p className="text-sm">{new Date(record.markedAt).toLocaleString()}</p>
                </div>
              </div>
              {record.reason && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Reason</label>
                  <p className="text-sm">{record.reason}</p>
                </div>
              )}
              {record.notes && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Notes</label>
                  <p className="text-sm">{record.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setShowRecordModal(false)}>
            Close
          </Button>
          <Button className="bg-gradient-to-r from-primary-500 to-primary-600">
            <Edit className="h-4 w-4 mr-2" />
            Edit Record
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
                  <p className="text-sm font-medium text-muted-foreground">Total Records</p>
                  <p className="text-2xl font-bold">{attendanceStats.totalRecords}</p>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +{attendanceStats.changePercent}% this week
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
                  <p className="text-sm font-medium text-muted-foreground">Present</p>
                  <p className="text-2xl font-bold text-green-600">{attendanceStats.presentCount}</p>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    {Math.round((attendanceStats.presentCount / attendanceStats.totalRecords) * 100)}% of total
                  </p>
                </div>
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  <CheckCircle className="h-5 w-5" />
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
                  <p className="text-sm font-medium text-muted-foreground">Absent</p>
                  <p className="text-2xl font-bold text-red-600">{attendanceStats.absentCount}</p>
                  <p className="text-xs text-red-600 flex items-center gap-1">
                    <XCircle className="h-3 w-3" />
                    {Math.round((attendanceStats.absentCount / attendanceStats.totalRecords) * 100)}% of total
                  </p>
                </div>
                <div className="p-3 rounded-full bg-red-100 text-red-600">
                  <XCircle className="h-5 w-5" />
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
                  <p className="text-sm font-medium text-muted-foreground">Attendance Rate</p>
                  <p className="text-2xl font-bold text-blue-600">{attendanceStats.attendanceRate}%</p>
                  <p className="text-xs text-blue-600 flex items-center gap-1">
                    {getTrendIcon(attendanceStats.trend)}
                    {attendanceStats.changePercent}% change
                  </p>
                </div>
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <BarChart3 className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg">
        {["overview", "records", "summary", "analytics"].map((tab) => (
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
            {/* Recent Attendance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Attendance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {attendanceRecords.slice(0, 5).map((record, index) => (
                    <motion.div
                      key={record.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                          {getStatusIcon(record.status)}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{record.studentName}</p>
                          <p className="text-xs text-muted-foreground">{record.class} • {record.subject}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-blue-600">
                          {record.checkInTime || 'N/A'}
                        </p>
                        <Badge className={getStatusColor(record.status)} variant="outline">
                          {record.status}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Class Attendance Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Class Attendance Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {classAttendance.map((classData, index) => (
                    <motion.div
                      key={classData.classId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-medium">{classData.className}</p>
                          <p className="text-sm text-muted-foreground">{classData.subject} • {classData.teacher}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-blue-600">{classData.attendanceRate}%</p>
                          <p className="text-xs text-muted-foreground">{classData.presentStudents}/{classData.totalStudents}</p>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${classData.attendanceRate}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>{classData.presentStudents} present</span>
                        <span>{classData.totalStudents - classData.presentStudents} absent</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      )}

      {activeTab === "records" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Attendance Records</CardTitle>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search records..."
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
                      <SelectItem value="present">Present</SelectItem>
                      <SelectItem value="absent">Absent</SelectItem>
                      <SelectItem value="late">Late</SelectItem>
                      <SelectItem value="excused">Excused</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="w-40"
                  />
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
                    <TableHead>Class</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Check In</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map((record, index) => (
                    <motion.tr
                      key={record.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-muted/50"
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {record.studentName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{record.studentName}</p>
                            <p className="text-sm text-muted-foreground">{record.studentId}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{record.class}</TableCell>
                      <TableCell>{record.subject}</TableCell>
                      <TableCell>{record.teacher}</TableCell>
                      <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(record.status)}
                          <Badge className={getStatusColor(record.status)}>
                            {record.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">{record.checkInTime || 'N/A'}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              setSelectedRecord(record);
                              setShowRecordModal(true);
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

      {activeTab === "summary" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Attendance Summary</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Summary
                  </Button>
                  <Button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Class</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Total Students</TableHead>
                    <TableHead>Present</TableHead>
                    <TableHead>Absent</TableHead>
                    <TableHead>Late</TableHead>
                    <TableHead>Excused</TableHead>
                    <TableHead>Attendance Rate</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceSummaries.map((summary, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-muted/50"
                    >
                      <TableCell className="font-medium">{summary.class}</TableCell>
                      <TableCell>{summary.subject}</TableCell>
                      <TableCell className="font-semibold">{summary.totalStudents}</TableCell>
                      <TableCell className="text-green-600 font-semibold">{summary.present}</TableCell>
                      <TableCell className="text-red-600 font-semibold">{summary.absent}</TableCell>
                      <TableCell className="text-yellow-600 font-semibold">{summary.late}</TableCell>
                      <TableCell className="text-blue-600 font-semibold">{summary.excused}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${summary.attendanceRate}%` }}
                            ></div>
                          </div>
                          <span className="font-semibold text-blue-600">{summary.attendanceRate}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
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

      {activeTab === "analytics" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Attendance Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Present</span>
                    </div>
                    <span className="font-semibold">{attendanceStats.presentCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm">Absent</span>
                    </div>
                    <span className="font-semibold">{attendanceStats.absentCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm">Late</span>
                    </div>
                    <span className="font-semibold">{attendanceStats.lateCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Excused</span>
                    </div>
                    <span className="font-semibold">{attendanceStats.excusedCount}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Attendance Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-600">{attendanceStats.attendanceRate}%</p>
                    <p className="text-sm text-muted-foreground">Overall Attendance Rate</p>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    {getTrendIcon(attendanceStats.trend)}
                    <span className="text-sm">
                      {attendanceStats.changePercent}% {attendanceStats.trend} from last week
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div 
                      className="bg-blue-500 h-4 rounded-full flex items-center justify-center"
                      style={{ width: `${attendanceStats.attendanceRate}%` }}
                    >
                      <span className="text-white text-xs font-semibold">
                        {attendanceStats.attendanceRate}%
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      )}

      {/* Attendance Record Modal */}
      {selectedRecord && (
        <AttendanceRecordModal record={selectedRecord} />
      )}
    </div>
  );
}
