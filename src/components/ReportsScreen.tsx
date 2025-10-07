import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  FileText, 
  Download, 
  Calendar, 
  Search, 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Eye, 
  Edit, 
  Plus,
  RefreshCw,
  Share,
  Mail,
  CheckCircle,
  Info,
  Activity,
  Globe
} from "lucide-react";

interface Report {
  id: string;
  title: string;
  type: "academic" | "financial" | "attendance" | "performance" | "inventory" | "custom";
  category: string;
  description: string;
  createdBy: string;
  createdDate: string;
  lastModified: string;
  status: "draft" | "published" | "archived";
  schedule?: string;
  recipients: string[];
  format: "pdf" | "excel" | "csv" | "html";
  size: number;
  views: number;
  downloads: number;
  isPublic: boolean;
  tags: string[];
}

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  fields: string[];
  format: string;
  isDefault: boolean;
  createdBy: string;
  createdDate: string;
}

interface ReportSchedule {
  id: string;
  reportId: string;
  reportName: string;
  frequency: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
  time: string;
  recipients: string[];
  format: string;
  isActive: boolean;
  lastRun: string;
  nextRun: string;
}

export default function ReportsScreen() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);

  // Mock data
  const reports: Report[] = [
    {
      id: "1",
      title: "Monthly Academic Performance Report",
      type: "academic",
      category: "Student Performance",
      description: "Comprehensive report on student academic performance across all subjects",
      createdBy: "Dr. Sarah Johnson",
      createdDate: "2024-12-01",
      lastModified: "2024-12-15",
      status: "published",
      schedule: "monthly",
      recipients: ["admin@school.edu", "principal@school.edu"],
      format: "pdf",
      size: 2.5,
      views: 45,
      downloads: 12,
      isPublic: false,
      tags: ["academic", "performance", "monthly"]
    },
    {
      id: "2",
      title: "Financial Summary Report",
      type: "financial",
      category: "Finance",
      description: "Monthly financial summary including income, expenses, and budget analysis",
      createdBy: "Finance Team",
      createdDate: "2024-11-30",
      lastModified: "2024-12-10",
      status: "published",
      schedule: "monthly",
      recipients: ["finance@school.edu", "admin@school.edu"],
      format: "excel",
      size: 1.8,
      views: 28,
      downloads: 8,
      isPublic: false,
      tags: ["financial", "budget", "monthly"]
    },
    {
      id: "3",
      title: "Attendance Summary Report",
      type: "attendance",
      category: "Attendance",
      description: "Weekly attendance summary for all students and staff",
      createdBy: "HR Department",
      createdDate: "2024-12-10",
      lastModified: "2024-12-14",
      status: "draft",
      schedule: "weekly",
      recipients: ["hr@school.edu"],
      format: "csv",
      size: 0.8,
      views: 15,
      downloads: 3,
      isPublic: false,
      tags: ["attendance", "weekly", "hr"]
    },
    {
      id: "4",
      title: "Teacher Performance Evaluation",
      type: "performance",
      category: "HR",
      description: "Quarterly teacher performance evaluation and feedback report",
      createdBy: "HR Department",
      createdDate: "2024-12-05",
      lastModified: "2024-12-12",
      status: "published",
      schedule: "quarterly",
      recipients: ["hr@school.edu", "admin@school.edu"],
      format: "pdf",
      size: 3.2,
      views: 32,
      downloads: 15,
      isPublic: false,
      tags: ["performance", "teachers", "quarterly"]
    }
  ];

  const templates: ReportTemplate[] = [
    {
      id: "1",
      name: "Student Academic Report",
      description: "Standard template for student academic performance reports",
      category: "Academic",
      fields: ["Student Name", "Subject", "Grade", "Attendance", "Comments"],
      format: "pdf",
      isDefault: true,
      createdBy: "System",
      createdDate: "2024-01-01"
    },
    {
      id: "2",
      name: "Financial Summary Template",
      description: "Template for financial summary and budget reports",
      category: "Finance",
      fields: ["Income", "Expenses", "Budget", "Variance", "Trends"],
      format: "excel",
      isDefault: true,
      createdBy: "System",
      createdDate: "2024-01-01"
    },
    {
      id: "3",
      name: "Attendance Report Template",
      description: "Template for attendance tracking and analysis",
      category: "Attendance",
      fields: ["Date", "Student", "Status", "Reason", "Teacher"],
      format: "csv",
      isDefault: false,
      createdBy: "HR Department",
      createdDate: "2024-06-15"
    }
  ];

  const schedules: ReportSchedule[] = [
    {
      id: "1",
      reportId: "1",
      reportName: "Monthly Academic Performance Report",
      frequency: "monthly",
      time: "09:00",
      recipients: ["admin@school.edu", "principal@school.edu"],
      format: "pdf",
      isActive: true,
      lastRun: "2024-12-01T09:00:00Z",
      nextRun: "2025-01-01T09:00:00Z"
    },
    {
      id: "2",
      reportId: "2",
      reportName: "Financial Summary Report",
      frequency: "monthly",
      time: "10:00",
      recipients: ["finance@school.edu", "admin@school.edu"],
      format: "excel",
      isActive: true,
      lastRun: "2024-11-30T10:00:00Z",
      nextRun: "2024-12-31T10:00:00Z"
    }
  ];

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || report.type === filterType;
    const matchesStatus = filterStatus === "all" || report.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published": return "bg-green-100 text-green-800";
      case "draft": return "bg-yellow-100 text-yellow-800";
      case "archived": return "bg-gray-100 text-gray-800";
      case "active": return "bg-green-100 text-green-800";
      case "inactive": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "academic": return "bg-blue-100 text-blue-800";
      case "financial": return "bg-green-100 text-green-800";
      case "attendance": return "bg-purple-100 text-purple-800";
      case "performance": return "bg-orange-100 text-orange-800";
      case "inventory": return "bg-pink-100 text-pink-800";
      case "custom": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "pdf": return <FileText className="h-4 w-4 text-red-500" />;
      case "excel": return <BarChart3 className="h-4 w-4 text-green-500" />;
      case "csv": return <Table className="h-4 w-4 text-blue-500" />;
      case "html": return <Globe className="h-4 w-4 text-purple-500" />;
      default: return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const ReportModal = ({ report }: { report: Report }) => (
    <Dialog open={showReportModal} onOpenChange={setShowReportModal}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{report.title}</h2>
              <p className="text-muted-foreground">{report.category} • {report.type}</p>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Report Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Report Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Type</label>
                  <Badge className={getTypeColor(report.type)}>
                    {report.type}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <Badge className={getStatusColor(report.status)}>
                    {report.status}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Format</label>
                  <div className="flex items-center gap-2">
                    {getFormatIcon(report.format)}
                    <span className="text-sm font-semibold uppercase">{report.format}</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Size</label>
                  <p className="text-sm font-semibold">{report.size} MB</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Created By</label>
                  <p className="text-sm">{report.createdBy}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Created Date</label>
                  <p className="text-sm">{new Date(report.createdDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Description</label>
                <p className="text-sm">{report.description}</p>
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
                  <label className="text-sm font-medium text-muted-foreground">Views</label>
                  <p className="text-2xl font-bold text-blue-600">{report.views}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Downloads</label>
                  <p className="text-2xl font-bold text-green-600">{report.downloads}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Last Modified</label>
                  <p className="text-sm">{new Date(report.lastModified).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Public</label>
                  <p className="text-sm">{report.isPublic ? 'Yes' : 'No'}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Tags</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {report.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recipients */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Recipients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {report.recipients.map((recipient, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{recipient}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Schedule */}
          {report.schedule && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Frequency</span>
                    <Badge variant="outline" className="capitalize">
                      {report.schedule}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Next Run</span>
                    <span className="text-sm text-muted-foreground">
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setShowReportModal(false)}>
            Close
          </Button>
          <Button className="bg-gradient-to-r from-primary-500 to-primary-600">
            <Download className="h-4 w-4 mr-2" />
            Download Report
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
                  <p className="text-sm font-medium text-muted-foreground">Total Reports</p>
                  <p className="text-2xl font-bold">{reports.length}</p>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +3 this month
                  </p>
                </div>
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <FileText className="h-5 w-5" />
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
                  <p className="text-sm font-medium text-muted-foreground">Published</p>
                  <p className="text-2xl font-bold">{reports.filter(r => r.status === "published").length}</p>
                  <p className="text-xs text-blue-600 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Ready to view
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
                  <p className="text-sm font-medium text-muted-foreground">Total Downloads</p>
                  <p className="text-2xl font-bold">{reports.reduce((sum, r) => sum + r.downloads, 0)}</p>
                  <p className="text-xs text-purple-600 flex items-center gap-1">
                    <Download className="h-3 w-3" />
                    This month
                  </p>
                </div>
                <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                  <Download className="h-5 w-5" />
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
                  <p className="text-sm font-medium text-muted-foreground">Scheduled Reports</p>
                  <p className="text-2xl font-bold">{schedules.length}</p>
                  <p className="text-xs text-orange-600 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Auto-generated
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
        {["overview", "reports", "templates", "schedules"].map((tab) => (
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
            {/* Recent Reports */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reports.slice(0, 5).map((report, index) => (
                    <motion.div
                      key={report.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                          {getFormatIcon(report.format)}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{report.title}</p>
                          <p className="text-xs text-muted-foreground">{report.category} • {report.createdBy}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-blue-600">
                          {report.downloads} downloads
                        </p>
                        <Badge className={getStatusColor(report.status)} variant="outline">
                          {report.status}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Report Types */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Report Types
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["academic", "financial", "attendance", "performance"].map((type, index) => {
                    const count = reports.filter(r => r.type === type).length;
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
                            <p className="font-medium capitalize">{type} Reports</p>
                            <p className="text-sm text-muted-foreground">{count} reports</p>
                          </div>
                          <Badge className={getTypeColor(type)}>
                            {type}
                          </Badge>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${(count / reports.length) * 100}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>{Math.round((count / reports.length) * 100)}% of total</span>
                          <span>{count} reports</span>
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

      {activeTab === "reports" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Report Management</CardTitle>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search reports..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="academic">Academic</SelectItem>
                      <SelectItem value="financial">Financial</SelectItem>
                      <SelectItem value="attendance">Attendance</SelectItem>
                      <SelectItem value="performance">Performance</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Report
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Downloads</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map((report, index) => (
                    <motion.tr
                      key={report.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-muted/50"
                    >
                      <TableCell>
                        <div>
                          <p className="font-medium">{report.title}</p>
                          <p className="text-sm text-muted-foreground">{report.description}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getTypeColor(report.type)}>
                          {report.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getFormatIcon(report.format)}
                          <span className="text-sm font-semibold uppercase">{report.format}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">{report.size} MB</TableCell>
                      <TableCell className="font-semibold text-blue-600">{report.downloads}</TableCell>
                      <TableCell>{new Date(report.createdDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              setSelectedReport(report);
                              setShowReportModal(true);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share className="h-4 w-4" />
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

      {activeTab === "templates" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Report Templates</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Templates
                  </Button>
                  <Button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Template
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Template</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead>Fields</TableHead>
                    <TableHead>Default</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {templates.map((template, index) => (
                    <motion.tr
                      key={template.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-muted/50"
                    >
                      <TableCell>
                        <div>
                          <p className="font-medium">{template.name}</p>
                          <p className="text-sm text-muted-foreground">{template.description}</p>
                        </div>
                      </TableCell>
                      <TableCell>{template.category}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getFormatIcon(template.format)}
                          <span className="text-sm font-semibold uppercase">{template.format}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {template.fields.slice(0, 3).map((field, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {field}
                            </Badge>
                          ))}
                          {template.fields.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{template.fields.length - 3}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <input type="checkbox" defaultChecked={template.isDefault} disabled />
                      </TableCell>
                      <TableCell>{new Date(template.createdDate).toLocaleDateString()}</TableCell>
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

      {activeTab === "schedules" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Scheduled Reports</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Run All
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
                    <TableHead>Report</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Recipients</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Next Run</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schedules.map((schedule, index) => (
                    <motion.tr
                      key={schedule.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-muted/50"
                    >
                      <TableCell>
                        <div>
                          <p className="font-medium">{schedule.reportName}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {schedule.frequency}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold">{schedule.time}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{schedule.recipients.length} recipients</p>
                          <p className="text-muted-foreground">{schedule.recipients[0]}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getFormatIcon(schedule.format)}
                          <span className="text-sm font-semibold uppercase">{schedule.format}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(schedule.isActive ? "active" : "inactive")}>
                          {schedule.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(schedule.nextRun).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <RefreshCw className="h-4 w-4" />
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

      {/* Report Modal */}
      {selectedReport && (
        <ReportModal report={selectedReport} />
      )}
    </div>
  );
}
