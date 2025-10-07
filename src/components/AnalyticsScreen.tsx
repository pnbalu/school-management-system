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
  BarChart3, 
  PieChart, 
  TrendingUp, 
  TrendingDown,
  Search,
  Download,
  Plus,
  Edit,
  Eye,
  Target,
  Activity,
  FileSpreadsheet,
  Globe,
  Monitor
} from "lucide-react";

interface AnalyticsMetric {
  id: string;
  name: string;
  value: number;
  previousValue: number;
  change: number;
  changePercent: number;
  trend: "up" | "down" | "stable";
  category: "academic" | "financial" | "attendance" | "performance" | "enrollment";
  unit: string;
  description: string;
  lastUpdated: string;
}

interface AnalyticsChart {
  id: string;
  title: string;
  type: "line" | "bar" | "pie" | "area" | "scatter";
  data: any[];
  xAxis: string;
  yAxis: string;
  category: string;
  description: string;
  createdBy: string;
  createdDate: string;
  isPublic: boolean;
  tags: string[];
}

interface AnalyticsReport {
  id: string;
  title: string;
  description: string;
  category: string;
  metrics: string[];
  charts: string[];
  generatedBy: string;
  generatedAt: string;
  status: "draft" | "published" | "archived";
  views: number;
  downloads: number;
  isPublic: boolean;
}

interface AnalyticsDashboard {
  id: string;
  name: string;
  description: string;
  layout: string;
  widgets: string[];
  isDefault: boolean;
  createdBy: string;
  createdDate: string;
  lastModified: string;
}

export default function AnalyticsScreen() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [selectedMetric, setSelectedMetric] = useState<AnalyticsMetric | null>(null);
  const [showMetricModal, setShowMetricModal] = useState(false);

  // Mock data
  const analyticsMetrics: AnalyticsMetric[] = [
    {
      id: "1",
      name: "Total Students",
      value: 1250,
      previousValue: 1200,
      change: 50,
      changePercent: 4.2,
      trend: "up",
      category: "enrollment",
      unit: "students",
      description: "Total number of enrolled students",
      lastUpdated: "2024-12-15T10:00:00Z"
    },
    {
      id: "2",
      name: "Average Attendance Rate",
      value: 87.5,
      previousValue: 85.2,
      change: 2.3,
      changePercent: 2.7,
      trend: "up",
      category: "attendance",
      unit: "%",
      description: "Overall attendance rate across all classes",
      lastUpdated: "2024-12-15T10:00:00Z"
    },
    {
      id: "3",
      name: "Monthly Revenue",
      value: 125000,
      previousValue: 118000,
      change: 7000,
      changePercent: 5.9,
      trend: "up",
      category: "financial",
      unit: "$",
      description: "Total monthly revenue from fees and other sources",
      lastUpdated: "2024-12-15T10:00:00Z"
    },
    {
      id: "4",
      name: "Teacher Satisfaction",
      value: 4.2,
      previousValue: 4.0,
      change: 0.2,
      changePercent: 5.0,
      trend: "up",
      category: "performance",
      unit: "/5",
      description: "Average teacher satisfaction rating",
      lastUpdated: "2024-12-15T10:00:00Z"
    },
    {
      id: "5",
      name: "Graduation Rate",
      value: 94.8,
      previousValue: 92.1,
      change: 2.7,
      changePercent: 2.9,
      trend: "up",
      category: "academic",
      unit: "%",
      description: "Percentage of students who successfully graduate",
      lastUpdated: "2024-12-15T10:00:00Z"
    }
  ];

  const analyticsCharts: AnalyticsChart[] = [
    {
      id: "1",
      title: "Student Enrollment Trends",
      type: "line",
      data: [
        { month: "Jan", students: 1200 },
        { month: "Feb", students: 1220 },
        { month: "Mar", students: 1180 },
        { month: "Apr", students: 1250 },
        { month: "May", students: 1280 },
        { month: "Jun", students: 1250 }
      ],
      xAxis: "Month",
      yAxis: "Students",
      category: "enrollment",
      description: "Monthly student enrollment trends over the past 6 months",
      createdBy: "Analytics Team",
      createdDate: "2024-12-01",
      isPublic: true,
      tags: ["enrollment", "trends", "students"]
    },
    {
      id: "2",
      title: "Subject Performance Distribution",
      type: "pie",
      data: [
        { subject: "Mathematics", students: 320, percentage: 25.6 },
        { subject: "Science", students: 280, percentage: 22.4 },
        { subject: "English", students: 250, percentage: 20.0 },
        { subject: "History", students: 200, percentage: 16.0 },
        { subject: "Arts", students: 200, percentage: 16.0 }
      ],
      xAxis: "Subject",
      yAxis: "Students",
      category: "academic",
      description: "Distribution of students across different subjects",
      createdBy: "Academic Team",
      createdDate: "2024-12-05",
      isPublic: true,
      tags: ["subjects", "distribution", "academic"]
    },
    {
      id: "3",
      title: "Monthly Revenue Breakdown",
      type: "bar",
      data: [
        { source: "Tuition Fees", amount: 80000 },
        { source: "Transport", amount: 15000 },
        { source: "Library", amount: 5000 },
        { source: "Sports", amount: 10000 },
        { source: "Other", amount: 15000 }
      ],
      xAxis: "Source",
      yAxis: "Amount ($)",
      category: "financial",
      description: "Monthly revenue breakdown by source",
      createdBy: "Finance Team",
      createdDate: "2024-12-10",
      isPublic: false,
      tags: ["revenue", "financial", "breakdown"]
    }
  ];

  const analyticsReports: AnalyticsReport[] = [
    {
      id: "1",
      title: "Monthly Performance Dashboard",
      description: "Comprehensive monthly performance analysis",
      category: "performance",
      metrics: ["Total Students", "Average Attendance Rate", "Teacher Satisfaction"],
      charts: ["Student Enrollment Trends", "Subject Performance Distribution"],
      generatedBy: "Analytics Team",
      generatedAt: "2024-12-15T10:00:00Z",
      status: "published",
      views: 45,
      downloads: 12,
      isPublic: true
    },
    {
      id: "2",
      title: "Financial Summary Report",
      description: "Monthly financial performance and revenue analysis",
      category: "financial",
      metrics: ["Monthly Revenue", "Average Revenue per Student"],
      charts: ["Monthly Revenue Breakdown"],
      generatedBy: "Finance Team",
      generatedAt: "2024-12-14T15:30:00Z",
      status: "published",
      views: 28,
      downloads: 8,
      isPublic: false
    }
  ];

  const analyticsDashboards: AnalyticsDashboard[] = [
    {
      id: "1",
      name: "Executive Dashboard",
      description: "High-level overview for school administration",
      layout: "grid",
      widgets: ["Total Students", "Average Attendance Rate", "Monthly Revenue", "Teacher Satisfaction"],
      isDefault: true,
      createdBy: "System",
      createdDate: "2024-01-01",
      lastModified: "2024-12-15"
    },
    {
      id: "2",
      name: "Academic Performance Dashboard",
      description: "Detailed academic performance metrics and trends",
      layout: "grid",
      widgets: ["Graduation Rate", "Subject Performance Distribution", "Student Enrollment Trends"],
      isDefault: false,
      createdBy: "Academic Team",
      createdDate: "2024-06-15",
      lastModified: "2024-12-10"
    }
  ];

  const filteredMetrics = analyticsMetrics.filter(metric => {
    const matchesSearch = metric.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         metric.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || metric.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "down": return <TrendingDown className="h-4 w-4 text-red-600" />;
      default: return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up": return "text-green-600";
      case "down": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "academic": return "bg-blue-100 text-blue-800";
      case "financial": return "bg-green-100 text-green-800";
      case "attendance": return "bg-purple-100 text-purple-800";
      case "performance": return "bg-orange-100 text-orange-800";
      case "enrollment": return "bg-pink-100 text-pink-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "line": return "bg-blue-100 text-blue-800";
      case "bar": return "bg-green-100 text-green-800";
      case "pie": return "bg-purple-100 text-purple-800";
      case "area": return "bg-orange-100 text-orange-800";
      case "scatter": return "bg-pink-100 text-pink-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published": return "bg-green-100 text-green-800";
      case "draft": return "bg-yellow-100 text-yellow-800";
      case "archived": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const AnalyticsMetricModal = ({ metric }: { metric: AnalyticsMetric }) => (
    <Dialog open={showMetricModal} onOpenChange={setShowMetricModal}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{metric.name}</h2>
              <p className="text-muted-foreground">{metric.description}</p>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Current Value */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Current Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-4xl font-bold text-blue-600">
                  {metric.value.toLocaleString()}{metric.unit}
                </p>
                <p className="text-sm text-muted-foreground">Current Period</p>
              </div>
            </CardContent>
          </Card>

          {/* Previous Value */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Previous Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-4xl font-bold text-gray-600">
                  {metric.previousValue.toLocaleString()}{metric.unit}
                </p>
                <p className="text-sm text-muted-foreground">Previous Period</p>
              </div>
            </CardContent>
          </Card>

          {/* Change Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getTrendIcon(metric.trend)}
                Change Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Absolute Change</span>
                  <span className={`font-semibold ${getTrendColor(metric.trend)}`}>
                    {metric.change > 0 ? '+' : ''}{metric.change.toLocaleString()}{metric.unit}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Percentage Change</span>
                  <span className={`font-semibold ${getTrendColor(metric.trend)}`}>
                    {metric.changePercent > 0 ? '+' : ''}{metric.changePercent}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Trend</span>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(metric.trend)}
                    <span className="capitalize">{metric.trend}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category & Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Category</span>
                  <Badge className={getCategoryColor(metric.category)}>
                    {metric.category}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Unit</span>
                  <span className="font-semibold">{metric.unit}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Last Updated</span>
                  <span className="text-sm">{new Date(metric.lastUpdated).toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setShowMetricModal(false)}>
            Close
          </Button>
          <Button className="bg-gradient-to-r from-primary-500 to-primary-600">
            <Download className="h-4 w-4 mr-2" />
            Export Data
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
                  <p className="text-sm font-medium text-muted-foreground">Total Metrics</p>
                  <p className="text-2xl font-bold">{analyticsMetrics.length}</p>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +2 this month
                  </p>
                </div>
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <BarChart3 className="h-5 w-5" />
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
                  <p className="text-sm font-medium text-muted-foreground">Active Charts</p>
                  <p className="text-2xl font-bold text-green-600">{analyticsCharts.length}</p>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <PieChart className="h-3 w-3" />
                    Visualizations
                  </p>
                </div>
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  <PieChart className="h-5 w-5" />
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
                  <p className="text-sm font-medium text-muted-foreground">Reports</p>
                  <p className="text-2xl font-bold text-purple-600">{analyticsReports.length}</p>
                  <p className="text-xs text-purple-600 flex items-center gap-1">
                    <FileSpreadsheet className="h-3 w-3" />
                    Generated
                  </p>
                </div>
                <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                  <FileSpreadsheet className="h-5 w-5" />
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
                  <p className="text-sm font-medium text-muted-foreground">Dashboards</p>
                  <p className="text-2xl font-bold text-orange-600">{analyticsDashboards.length}</p>
                  <p className="text-xs text-orange-600 flex items-center gap-1">
                    <Monitor className="h-3 w-3" />
                    Custom views
                  </p>
                </div>
                <div className="p-3 rounded-full bg-orange-100 text-orange-600">
                  <Monitor className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg">
        {["overview", "metrics", "charts", "reports", "dashboards"].map((tab) => (
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
            {/* Key Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Key Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsMetrics.slice(0, 5).map((metric, index) => (
                    <motion.div
                      key={metric.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => {
                        setSelectedMetric(metric);
                        setShowMetricModal(true);
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                          {getTrendIcon(metric.trend)}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{metric.name}</p>
                          <p className="text-xs text-muted-foreground">{metric.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-blue-600">
                          {metric.value.toLocaleString()}{metric.unit}
                        </p>
                        <div className="flex items-center gap-1">
                          {getTrendIcon(metric.trend)}
                          <span className={`text-xs ${getTrendColor(metric.trend)}`}>
                            {metric.changePercent > 0 ? '+' : ''}{metric.changePercent}%
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Charts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Recent Charts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsCharts.slice(0, 5).map((chart, index) => (
                    <motion.div
                      key={chart.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-medium">{chart.title}</p>
                          <p className="text-sm text-muted-foreground">{chart.description}</p>
                        </div>
                        <Badge className={getTypeColor(chart.type)}>
                          {chart.type}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{chart.category}</span>
                        <span>{chart.createdBy}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      )}

      {activeTab === "metrics" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Analytics Metrics</CardTitle>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search metrics..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="academic">Academic</SelectItem>
                      <SelectItem value="financial">Financial</SelectItem>
                      <SelectItem value="attendance">Attendance</SelectItem>
                      <SelectItem value="performance">Performance</SelectItem>
                      <SelectItem value="enrollment">Enrollment</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Metric
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Metric</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Current Value</TableHead>
                    <TableHead>Previous Value</TableHead>
                    <TableHead>Change</TableHead>
                    <TableHead>Trend</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMetrics.map((metric, index) => (
                    <motion.tr
                      key={metric.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-muted/50"
                    >
                      <TableCell>
                        <div>
                          <p className="font-medium">{metric.name}</p>
                          <p className="text-sm text-muted-foreground">{metric.description}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getCategoryColor(metric.category)}>
                          {metric.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold text-blue-600">
                        {metric.value.toLocaleString()}{metric.unit}
                      </TableCell>
                      <TableCell className="font-semibold text-gray-600">
                        {metric.previousValue.toLocaleString()}{metric.unit}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTrendIcon(metric.trend)}
                          <span className={`font-semibold ${getTrendColor(metric.trend)}`}>
                            {metric.change > 0 ? '+' : ''}{metric.change.toLocaleString()}{metric.unit}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTrendIcon(metric.trend)}
                          <span className="capitalize">{metric.trend}</span>
                        </div>
                      </TableCell>
                      <TableCell>{new Date(metric.lastUpdated).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              setSelectedMetric(metric);
                              setShowMetricModal(true);
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

      {activeTab === "charts" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Analytics Charts</CardTitle>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search charts..."
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
                      <SelectItem value="line">Line</SelectItem>
                      <SelectItem value="bar">Bar</SelectItem>
                      <SelectItem value="pie">Pie</SelectItem>
                      <SelectItem value="area">Area</SelectItem>
                      <SelectItem value="scatter">Scatter</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Chart
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Chart</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Data Points</TableHead>
                    <TableHead>Created By</TableHead>
                    <TableHead>Public</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {analyticsCharts.map((chart, index) => (
                    <motion.tr
                      key={chart.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-muted/50"
                    >
                      <TableCell>
                        <div>
                          <p className="font-medium">{chart.title}</p>
                          <p className="text-sm text-muted-foreground">{chart.description}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getTypeColor(chart.type)}>
                          {chart.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getCategoryColor(chart.category)}>
                          {chart.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold">{chart.data.length}</TableCell>
                      <TableCell>{chart.createdBy}</TableCell>
                      <TableCell>
                        <input type="checkbox" defaultChecked={chart.isPublic} disabled />
                      </TableCell>
                      <TableCell>{new Date(chart.createdDate).toLocaleDateString()}</TableCell>
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

      {activeTab === "reports" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Analytics Reports</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Reports
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
                    <TableHead>Report</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Metrics</TableHead>
                    <TableHead>Charts</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Downloads</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {analyticsReports.map((report, index) => (
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
                        <Badge className={getCategoryColor(report.category)}>
                          {report.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold">{report.metrics.length}</TableCell>
                      <TableCell className="font-semibold">{report.charts.length}</TableCell>
                      <TableCell className="font-semibold text-blue-600">{report.views}</TableCell>
                      <TableCell className="font-semibold text-green-600">{report.downloads}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
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

      {activeTab === "dashboards" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Analytics Dashboards</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Dashboards
                  </Button>
                  <Button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Dashboard
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Dashboard</TableHead>
                    <TableHead>Layout</TableHead>
                    <TableHead>Widgets</TableHead>
                    <TableHead>Default</TableHead>
                    <TableHead>Created By</TableHead>
                    <TableHead>Last Modified</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {analyticsDashboards.map((dashboard, index) => (
                    <motion.tr
                      key={dashboard.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-muted/50"
                    >
                      <TableCell>
                        <div>
                          <p className="font-medium">{dashboard.name}</p>
                          <p className="text-sm text-muted-foreground">{dashboard.description}</p>
                        </div>
                      </TableCell>
                      <TableCell className="capitalize">{dashboard.layout}</TableCell>
                      <TableCell className="font-semibold">{dashboard.widgets.length}</TableCell>
                      <TableCell>
                        <input type="checkbox" defaultChecked={dashboard.isDefault} disabled />
                      </TableCell>
                      <TableCell>{dashboard.createdBy}</TableCell>
                      <TableCell>{new Date(dashboard.lastModified).toLocaleDateString()}</TableCell>
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

      {/* Analytics Metric Modal */}
      {selectedMetric && (
        <AnalyticsMetricModal metric={selectedMetric} />
      )}
    </div>
  );
}
