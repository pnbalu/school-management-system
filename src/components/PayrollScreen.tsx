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
  DollarSign, 
  Users, 
  Clock, 
  TrendingUp, 
  TrendingDown,
  Search,
  Download,
  Plus,
  Edit,
  Eye,
  BarChart3,
  PieChart,
  Target,
  Activity,
  User
} from "lucide-react";

interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  position: string;
  department: string;
  payPeriod: string;
  basicSalary: number;
  allowances: number;
  deductions: number;
  overtime: number;
  bonus: number;
  grossSalary: number;
  netSalary: number;
  status: "pending" | "approved" | "paid" | "cancelled";
  paymentDate: string;
  paymentMethod: "bank_transfer" | "check" | "cash";
  bankAccount?: string;
  checkNumber?: string;
  processedBy: string;
  processedAt: string;
  notes?: string;
}

interface PayrollSummary {
  totalEmployees: number;
  totalGrossSalary: number;
  totalDeductions: number;
  totalNetSalary: number;
  averageSalary: number;
  highestSalary: number;
  lowestSalary: number;
  payPeriod: string;
  processedDate: string;
}

interface SalaryComponent {
  id: string;
  name: string;
  type: "allowance" | "deduction" | "bonus" | "overtime";
  amount: number;
  percentage?: number;
  isTaxable: boolean;
  description: string;
}

interface PayrollReport {
  id: string;
  title: string;
  type: "monthly" | "quarterly" | "yearly" | "custom";
  period: string;
  totalAmount: number;
  employeeCount: number;
  generatedBy: string;
  generatedAt: string;
  status: "draft" | "final" | "approved";
}

export default function PayrollScreen() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPeriod, setFilterPeriod] = useState("all");
  const [selectedRecord, setSelectedRecord] = useState<PayrollRecord | null>(null);
  const [showRecordModal, setShowRecordModal] = useState(false);

  // Mock data
  const payrollRecords: PayrollRecord[] = [
    {
      id: "1",
      employeeId: "EMP001",
      employeeName: "Dr. Sarah Johnson",
      position: "Principal",
      department: "Administration",
      payPeriod: "2024-12",
      basicSalary: 8000,
      allowances: 1200,
      deductions: 800,
      overtime: 0,
      bonus: 1000,
      grossSalary: 10200,
      netSalary: 9400,
      status: "paid",
      paymentDate: "2024-12-15",
      paymentMethod: "bank_transfer",
      bankAccount: "****1234",
      processedBy: "Finance Team",
      processedAt: "2024-12-14T10:00:00Z",
      notes: "Monthly salary with performance bonus"
    },
    {
      id: "2",
      employeeId: "EMP002",
      employeeName: "Prof. Michael Chen",
      position: "Physics Teacher",
      department: "Academics",
      payPeriod: "2024-12",
      basicSalary: 6000,
      allowances: 800,
      deductions: 600,
      overtime: 400,
      bonus: 0,
      grossSalary: 7200,
      netSalary: 6600,
      status: "paid",
      paymentDate: "2024-12-15",
      paymentMethod: "bank_transfer",
      bankAccount: "****5678",
      processedBy: "Finance Team",
      processedAt: "2024-12-14T10:00:00Z"
    },
    {
      id: "3",
      employeeId: "EMP003",
      employeeName: "Ms. Emily Davis",
      position: "English Teacher",
      department: "Academics",
      payPeriod: "2024-12",
      basicSalary: 5500,
      allowances: 600,
      deductions: 550,
      overtime: 200,
      bonus: 500,
      grossSalary: 6800,
      netSalary: 6250,
      status: "approved",
      paymentDate: "2024-12-20",
      paymentMethod: "bank_transfer",
      bankAccount: "****9012",
      processedBy: "Finance Team",
      processedAt: "2024-12-15T14:30:00Z"
    },
    {
      id: "4",
      employeeId: "EMP004",
      employeeName: "Mr. David Wilson",
      position: "IT Administrator",
      department: "IT",
      payPeriod: "2024-12",
      basicSalary: 5000,
      allowances: 500,
      deductions: 500,
      overtime: 300,
      bonus: 0,
      grossSalary: 5800,
      netSalary: 5300,
      status: "pending",
      paymentDate: "2024-12-25",
      paymentMethod: "bank_transfer",
      bankAccount: "****3456",
      processedBy: "Finance Team",
      processedAt: "2024-12-16T09:15:00Z"
    }
  ];

  const payrollSummary: PayrollSummary = {
    totalEmployees: payrollRecords.length,
    totalGrossSalary: payrollRecords.reduce((sum, r) => sum + r.grossSalary, 0),
    totalDeductions: payrollRecords.reduce((sum, r) => sum + r.deductions, 0),
    totalNetSalary: payrollRecords.reduce((sum, r) => sum + r.netSalary, 0),
    averageSalary: payrollRecords.reduce((sum, r) => sum + r.netSalary, 0) / payrollRecords.length,
    highestSalary: Math.max(...payrollRecords.map(r => r.netSalary)),
    lowestSalary: Math.min(...payrollRecords.map(r => r.netSalary)),
    payPeriod: "2024-12",
    processedDate: "2024-12-15"
  };

  const salaryComponents: SalaryComponent[] = [
    {
      id: "1",
      name: "Basic Salary",
      type: "allowance",
      amount: 5000,
      isTaxable: true,
      description: "Base salary for the position"
    },
    {
      id: "2",
      name: "Housing Allowance",
      type: "allowance",
      amount: 1000,
      isTaxable: true,
      description: "Monthly housing allowance"
    },
    {
      id: "3",
      name: "Transport Allowance",
      type: "allowance",
      amount: 500,
      isTaxable: true,
      description: "Monthly transport allowance"
    },
    {
      id: "4",
      name: "Income Tax",
      type: "deduction",
      amount: 0,
      percentage: 10,
      isTaxable: false,
      description: "Income tax deduction"
    },
    {
      id: "5",
      name: "Health Insurance",
      type: "deduction",
      amount: 200,
      isTaxable: false,
      description: "Monthly health insurance premium"
    },
    {
      id: "6",
      name: "Overtime Pay",
      type: "overtime",
      amount: 0,
      isTaxable: true,
      description: "Overtime hours compensation"
    }
  ];

  const payrollReports: PayrollReport[] = [
    {
      id: "1",
      title: "December 2024 Payroll Report",
      type: "monthly",
      period: "2024-12",
      totalAmount: payrollSummary.totalNetSalary,
      employeeCount: payrollSummary.totalEmployees,
      generatedBy: "Finance Team",
      generatedAt: "2024-12-15T10:00:00Z",
      status: "approved"
    },
    {
      id: "2",
      title: "Q4 2024 Payroll Summary",
      type: "quarterly",
      period: "2024-Q4",
      totalAmount: 150000,
      employeeCount: 25,
      generatedBy: "Finance Team",
      generatedAt: "2024-12-01T09:00:00Z",
      status: "final"
    }
  ];

  const filteredRecords = payrollRecords.filter(record => {
    const matchesSearch = record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === "all" || record.department === filterDepartment;
    const matchesStatus = filterStatus === "all" || record.status === filterStatus;
    const matchesPeriod = filterPeriod === "all" || record.payPeriod === filterPeriod;
    return matchesSearch && matchesDepartment && matchesStatus && matchesPeriod;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-green-100 text-green-800";
      case "approved": return "bg-blue-100 text-blue-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "cancelled": return "bg-red-100 text-red-800";
      case "final": return "bg-green-100 text-green-800";
      case "draft": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "allowance": return "bg-green-100 text-green-800";
      case "deduction": return "bg-red-100 text-red-800";
      case "bonus": return "bg-blue-100 text-blue-800";
      case "overtime": return "bg-yellow-100 text-yellow-800";
      case "monthly": return "bg-blue-100 text-blue-800";
      case "quarterly": return "bg-purple-100 text-purple-800";
      case "yearly": return "bg-orange-100 text-orange-800";
      case "custom": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const PayrollRecordModal = ({ record }: { record: PayrollRecord }) => (
    <Dialog open={showRecordModal} onOpenChange={setShowRecordModal}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
              <DollarSign className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{record.employeeName}</h2>
              <p className="text-muted-foreground">{record.position} • {record.department}</p>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Employee Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Employee Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Employee ID</label>
                  <p className="text-sm font-semibold">{record.employeeId}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Position</label>
                  <p className="text-sm">{record.position}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Department</label>
                  <p className="text-sm">{record.department}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Pay Period</label>
                  <p className="text-sm font-semibold">{record.payPeriod}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <Badge className={getStatusColor(record.status)}>
                    {record.status}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Payment Date</label>
                  <p className="text-sm">{new Date(record.paymentDate).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Salary Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Salary Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Basic Salary</span>
                  <span className="font-semibold">${record.basicSalary.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Allowances</span>
                  <span className="font-semibold text-green-600">+${record.allowances.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Overtime</span>
                  <span className="font-semibold text-blue-600">+${record.overtime.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Bonus</span>
                  <span className="font-semibold text-purple-600">+${record.bonus.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Deductions</span>
                  <span className="font-semibold text-red-600">-${record.deductions.toLocaleString()}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Gross Salary</span>
                    <span className="font-semibold">${record.grossSalary.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Net Salary</span>
                    <span className="font-semibold text-green-600">${record.netSalary.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Payment Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Payment Method</label>
                  <p className="text-sm font-semibold capitalize">{record.paymentMethod.replace('_', ' ')}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Bank Account</label>
                  <p className="text-sm">{record.bankAccount || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Processed By</label>
                  <p className="text-sm">{record.processedBy}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Processed At</label>
                  <p className="text-sm">{new Date(record.processedAt).toLocaleString()}</p>
                </div>
              </div>
              {record.notes && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Notes</label>
                  <p className="text-sm">{record.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Earnings</span>
                  <span className="font-semibold text-green-600">
                    ${(record.basicSalary + record.allowances + record.overtime + record.bonus).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Deductions</span>
                  <span className="font-semibold text-red-600">${record.deductions.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Net Pay</span>
                  <span className="font-semibold text-blue-600">${record.netSalary.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Tax Rate</span>
                  <span className="font-semibold">
                    {Math.round((record.deductions / record.grossSalary) * 100)}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setShowRecordModal(false)}>
            Close
          </Button>
          <Button className="bg-gradient-to-r from-primary-500 to-primary-600">
            <Download className="h-4 w-4 mr-2" />
            Download Payslip
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
                  <p className="text-sm font-medium text-muted-foreground">Total Employees</p>
                  <p className="text-2xl font-bold">{payrollSummary.totalEmployees}</p>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +2 this month
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
                  <p className="text-sm font-medium text-muted-foreground">Total Net Salary</p>
                  <p className="text-2xl font-bold text-green-600">
                    ${payrollSummary.totalNetSalary.toLocaleString()}
                  </p>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    This month
                  </p>
                </div>
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  <DollarSign className="h-5 w-5" />
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
                  <p className="text-sm font-medium text-muted-foreground">Average Salary</p>
                  <p className="text-2xl font-bold text-blue-600">
                    ${Math.round(payrollSummary.averageSalary).toLocaleString()}
                  </p>
                  <p className="text-xs text-blue-600 flex items-center gap-1">
                    <BarChart3 className="h-3 w-3" />
                    Per employee
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
          transition={{ delay: 0.4 }}
        >
          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Deductions</p>
                  <p className="text-2xl font-bold text-red-600">
                    ${payrollSummary.totalDeductions.toLocaleString()}
                  </p>
                  <p className="text-xs text-red-600 flex items-center gap-1">
                    <TrendingDown className="h-3 w-3" />
                    Taxes & benefits
                  </p>
                </div>
                <div className="p-3 rounded-full bg-red-100 text-red-600">
                  <TrendingDown className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg">
        {["overview", "payroll", "components", "reports"].map((tab) => (
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
            {/* Recent Payroll */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Payroll
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {payrollRecords.slice(0, 5).map((record, index) => (
                    <motion.div
                      key={record.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                          <DollarSign className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{record.employeeName}</p>
                          <p className="text-xs text-muted-foreground">{record.position} • {record.department}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-green-600">
                          ${record.netSalary.toLocaleString()}
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

            {/* Salary Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Salary Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Basic Salary</span>
                    </div>
                    <span className="font-semibold">
                      ${payrollRecords.reduce((sum, r) => sum + r.basicSalary, 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Allowances</span>
                    </div>
                    <span className="font-semibold">
                      ${payrollRecords.reduce((sum, r) => sum + r.allowances, 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-sm">Overtime</span>
                    </div>
                    <span className="font-semibold">
                      ${payrollRecords.reduce((sum, r) => sum + r.overtime, 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm">Bonus</span>
                    </div>
                    <span className="font-semibold">
                      ${payrollRecords.reduce((sum, r) => sum + r.bonus, 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm">Deductions</span>
                    </div>
                    <span className="font-semibold">
                      ${payrollRecords.reduce((sum, r) => sum + r.deductions, 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      )}

      {activeTab === "payroll" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Payroll Management</CardTitle>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search payroll..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="Administration">Administration</SelectItem>
                      <SelectItem value="Academics">Academics</SelectItem>
                      <SelectItem value="IT">IT</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterPeriod} onValueChange={setFilterPeriod}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Periods</SelectItem>
                      <SelectItem value="2024-12">Dec 2024</SelectItem>
                      <SelectItem value="2024-11">Nov 2024</SelectItem>
                      <SelectItem value="2024-10">Oct 2024</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Process Payroll
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Gross Salary</TableHead>
                    <TableHead>Net Salary</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment Date</TableHead>
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
                              {record.employeeName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{record.employeeName}</p>
                            <p className="text-sm text-muted-foreground">{record.employeeId}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{record.position}</TableCell>
                      <TableCell>{record.department}</TableCell>
                      <TableCell>{record.payPeriod}</TableCell>
                      <TableCell className="font-semibold">${record.grossSalary.toLocaleString()}</TableCell>
                      <TableCell className="font-semibold text-green-600">${record.netSalary.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(record.status)}>
                          {record.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(record.paymentDate).toLocaleDateString()}</TableCell>
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

      {activeTab === "components" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Salary Components</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Components
                  </Button>
                  <Button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Component
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Component</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Percentage</TableHead>
                    <TableHead>Taxable</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salaryComponents.map((component, index) => (
                    <motion.tr
                      key={component.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-muted/50"
                    >
                      <TableCell className="font-medium">{component.name}</TableCell>
                      <TableCell>
                        <Badge className={getTypeColor(component.type)}>
                          {component.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold">
                        {component.amount > 0 ? `$${component.amount.toLocaleString()}` : 'Variable'}
                      </TableCell>
                      <TableCell className="font-semibold">
                        {component.percentage ? `${component.percentage}%` : 'N/A'}
                      </TableCell>
                      <TableCell>
                        <input type="checkbox" defaultChecked={component.isTaxable} disabled />
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{component.description}</TableCell>
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
                <CardTitle>Payroll Reports</CardTitle>
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
                    <TableHead>Type</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Employees</TableHead>
                    <TableHead>Generated By</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payrollReports.map((report, index) => (
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
                          <p className="text-sm text-muted-foreground">{report.period}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getTypeColor(report.type)}>
                          {report.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{report.period}</TableCell>
                      <TableCell className="font-semibold">${report.totalAmount.toLocaleString()}</TableCell>
                      <TableCell className="font-semibold">{report.employeeCount}</TableCell>
                      <TableCell>{report.generatedBy}</TableCell>
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
                            <Download className="h-4 w-4" />
                          </Button>
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

      {/* Payroll Record Modal */}
      {selectedRecord && (
        <PayrollRecordModal record={selectedRecord} />
      )}
    </div>
  );
}
