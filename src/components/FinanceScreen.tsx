import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Plus, 
  Edit, 
  Trash2, 
  Download,
  Search,
  FileText,
  CheckCircle,
  Eye,
  BarChart3,
  AlertCircle,
  Receipt,
  Target,
  Activity
} from "lucide-react";

interface FinancialTransaction {
  id: string;
  type: "income" | "expense";
  category: string;
  description: string;
  amount: number;
  date: string;
  status: "completed" | "pending" | "cancelled";
  paymentMethod: string;
  reference: string;
  department?: string;
  studentId?: string;
  teacherId?: string;
}

interface Budget {
  id: string;
  department: string;
  category: string;
  allocatedAmount: number;
  spentAmount: number;
  remainingAmount: number;
  period: string;
  status: "active" | "completed" | "overdue";
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  studentName: string;
  studentId: string;
  amount: number;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
  description: string;
  createdDate: string;
  paidDate?: string;
}

interface FinancialReport {
  id: string;
  title: string;
  type: "income" | "expense" | "budget" | "summary";
  period: string;
  totalAmount: number;
  generatedDate: string;
  status: "draft" | "final";
}

export default function FinanceScreen() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedTransaction, setSelectedTransaction] = useState<FinancialTransaction | null>(null);
  const [showTransactionModal, setShowTransactionModal] = useState(false);

  // Mock data
  const transactions: FinancialTransaction[] = [
    {
      id: "1",
      type: "income",
      category: "Tuition Fees",
      description: "Monthly tuition fee collection",
      amount: 125000,
      date: "2024-12-15",
      status: "completed",
      paymentMethod: "Bank Transfer",
      reference: "TXN001",
      department: "Finance",
      studentId: "STU001"
    },
    {
      id: "2",
      type: "expense",
      category: "Salaries",
      description: "Teacher salary payment",
      amount: 45000,
      date: "2024-12-01",
      status: "completed",
      paymentMethod: "Bank Transfer",
      reference: "TXN002",
      department: "HR",
      teacherId: "TCH001"
    },
    {
      id: "3",
      type: "expense",
      category: "Utilities",
      description: "Electricity bill payment",
      amount: 8500,
      date: "2024-12-10",
      status: "completed",
      paymentMethod: "Online Payment",
      reference: "TXN003",
      department: "Maintenance"
    },
    {
      id: "4",
      type: "income",
      category: "Donations",
      description: "Alumni donation",
      amount: 25000,
      date: "2024-12-12",
      status: "completed",
      paymentMethod: "Check",
      reference: "TXN004",
      department: "Development"
    },
    {
      id: "5",
      type: "expense",
      category: "Equipment",
      description: "Computer lab equipment",
      amount: 15000,
      date: "2024-12-08",
      status: "pending",
      paymentMethod: "Credit Card",
      reference: "TXN005",
      department: "IT"
    },
    {
      id: "6",
      type: "expense",
      category: "Supplies",
      description: "Office supplies and stationery",
      amount: 2500,
      date: "2024-12-05",
      status: "completed",
      paymentMethod: "Cash",
      reference: "TXN006",
      department: "Administration"
    },
    {
      id: "7",
      type: "expense",
      category: "Maintenance",
      description: "Building maintenance and repairs",
      amount: 12000,
      date: "2024-12-03",
      status: "completed",
      paymentMethod: "Bank Transfer",
      reference: "TXN007",
      department: "Maintenance"
    },
    {
      id: "8",
      type: "expense",
      category: "Utilities",
      description: "Internet and phone services",
      amount: 3500,
      date: "2024-12-01",
      status: "completed",
      paymentMethod: "Online Payment",
      reference: "TXN008",
      department: "IT"
    },
    {
      id: "9",
      type: "expense",
      category: "Supplies",
      description: "Laboratory chemicals and materials",
      amount: 8000,
      date: "2024-11-28",
      status: "completed",
      paymentMethod: "Bank Transfer",
      reference: "TXN009",
      department: "Science"
    },
    {
      id: "10",
      type: "expense",
      category: "Equipment",
      description: "Sports equipment for gym",
      amount: 5500,
      date: "2024-11-25",
      status: "completed",
      paymentMethod: "Credit Card",
      reference: "TXN010",
      department: "Physical Education"
    }
  ];

  const budgets: Budget[] = [
    {
      id: "1",
      department: "Academic",
      category: "Teaching Materials",
      allocatedAmount: 50000,
      spentAmount: 35000,
      remainingAmount: 15000,
      period: "2024-2025",
      status: "active"
    },
    {
      id: "2",
      department: "IT",
      category: "Technology",
      allocatedAmount: 75000,
      spentAmount: 60000,
      remainingAmount: 15000,
      period: "2024-2025",
      status: "active"
    },
    {
      id: "3",
      department: "Maintenance",
      category: "Facilities",
      allocatedAmount: 30000,
      spentAmount: 32000,
      remainingAmount: -2000,
      period: "2024-2025",
      status: "overdue"
    },
    {
      id: "4",
      department: "Sports",
      category: "Equipment",
      allocatedAmount: 20000,
      spentAmount: 18000,
      remainingAmount: 2000,
      period: "2024-2025",
      status: "active"
    }
  ];

  const invoices: Invoice[] = [
    {
      id: "1",
      invoiceNumber: "INV-2024-001",
      studentName: "Alex Johnson",
      studentId: "STU001",
      amount: 5000,
      dueDate: "2025-01-15",
      status: "pending",
      description: "Tuition Fee - January 2025",
      createdDate: "2024-12-15"
    },
    {
      id: "2",
      invoiceNumber: "INV-2024-002",
      studentName: "Sarah Chen",
      studentId: "STU002",
      amount: 5500,
      dueDate: "2025-01-15",
      status: "paid",
      description: "Tuition Fee - January 2025",
      createdDate: "2024-12-15",
      paidDate: "2024-12-20"
    },
    {
      id: "3",
      invoiceNumber: "INV-2024-003",
      studentName: "Mike Rodriguez",
      studentId: "STU003",
      amount: 4500,
      dueDate: "2024-12-30",
      status: "overdue",
      description: "Tuition Fee - December 2024",
      createdDate: "2024-12-01"
    }
  ];

  const reports: FinancialReport[] = [
    {
      id: "1",
      title: "Monthly Income Report",
      type: "income",
      period: "December 2024",
      totalAmount: 150000,
      generatedDate: "2024-12-31",
      status: "final"
    },
    {
      id: "2",
      title: "Monthly Expense Report",
      type: "expense",
      period: "December 2024",
      totalAmount: 95000,
      generatedDate: "2024-12-31",
      status: "final"
    },
    {
      id: "3",
      title: "Budget Allocation Report",
      type: "budget",
      period: "2024-2025",
      totalAmount: 175000,
      generatedDate: "2024-12-31",
      status: "final"
    }
  ];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || transaction.type === filterType;
    const matchesStatus = filterStatus === "all" || transaction.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalIncome = transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
  const netProfit = totalIncome - totalExpense;
  const pendingInvoices = invoices.filter(i => i.status === "pending").length;
  const overdueInvoices = invoices.filter(i => i.status === "overdue").length;
  const totalPendingAmount = invoices.filter(i => i.status === "pending" || i.status === "overdue").reduce((sum, i) => sum + i.amount, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "cancelled": return "bg-red-100 text-red-800";
      case "overdue": return "bg-red-100 text-red-800";
      case "active": return "bg-blue-100 text-blue-800";
      case "paid": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    return type === "income" ? "text-green-600" : "text-red-600";
  };

  const getBudgetStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "completed": return "bg-blue-100 text-blue-800";
      case "overdue": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const TransactionModal = ({ transaction }: { transaction: FinancialTransaction }) => (
    <Dialog open={showTransactionModal} onOpenChange={setShowTransactionModal}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className={`p-2 rounded-lg ${transaction.type === "income" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
              <DollarSign className="h-5 w-5" />
            </div>
            Transaction Details
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Transaction ID</label>
            <p className="text-sm font-semibold">{transaction.id}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Reference</label>
            <p className="text-sm font-semibold">{transaction.reference}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Type</label>
            <Badge className={getStatusColor(transaction.type)}>
              {transaction.type}
            </Badge>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Category</label>
            <p className="text-sm">{transaction.category}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Amount</label>
            <p className={`text-lg font-bold ${getTypeColor(transaction.type)}`}>
              ${transaction.amount.toLocaleString()}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Date</label>
            <p className="text-sm">{new Date(transaction.date).toLocaleDateString()}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Status</label>
            <Badge className={getStatusColor(transaction.status)}>
              {transaction.status}
            </Badge>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Payment Method</label>
            <p className="text-sm">{transaction.paymentMethod}</p>
          </div>
          <div className="col-span-2">
            <label className="text-sm font-medium text-muted-foreground">Description</label>
            <p className="text-sm">{transaction.description}</p>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setShowTransactionModal(false)}>
            Close
          </Button>
          <Button className="bg-gradient-to-r from-primary-500 to-primary-600">
            <Edit className="h-4 w-4 mr-2" />
            Edit Transaction
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
                  <p className="text-sm font-medium text-muted-foreground">Total Income</p>
                  <p className="text-2xl font-bold text-green-600">${totalIncome.toLocaleString()}</p>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +12% this month
                  </p>
                </div>
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  <TrendingUp className="h-5 w-5" />
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
                  <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
                  <p className="text-2xl font-bold text-red-600">${totalExpense.toLocaleString()}</p>
                  <p className="text-xs text-red-600 flex items-center gap-1">
                    <TrendingDown className="h-3 w-3" />
                    +8% this month
                  </p>
                </div>
                <div className="p-3 rounded-full bg-red-100 text-red-600">
                  <TrendingDown className="h-5 w-5" />
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
                  <p className="text-sm font-medium text-muted-foreground">Net Profit</p>
                  <p className={`text-2xl font-bold ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${netProfit.toLocaleString()}
                  </p>
                  <p className="text-xs text-blue-600 flex items-center gap-1">
                    <BarChart3 className="h-3 w-3" />
                    Financial health
                  </p>
                </div>
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <DollarSign className="h-5 w-5" />
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
                  <p className="text-sm font-medium text-muted-foreground">Pending Invoices</p>
                  <p className="text-2xl font-bold">{pendingInvoices + overdueInvoices}</p>
                  <p className="text-xs text-orange-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    ${totalPendingAmount.toLocaleString()} pending
                  </p>
                </div>
                <div className="p-3 rounded-full bg-orange-100 text-orange-600">
                  <Receipt className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg">
        {["overview", "transactions", "expenses", "budgets", "invoices", "reports"].map((tab) => (
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
            {/* Recent Transactions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Transactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.slice(0, 5).map((transaction, index) => (
                    <motion.div
                      key={transaction.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${transaction.type === "income" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                          <DollarSign className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{transaction.description}</p>
                          <p className="text-xs text-muted-foreground">{transaction.category} • {new Date(transaction.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-semibold ${getTypeColor(transaction.type)}`}>
                          {transaction.type === "income" ? "+" : "-"}${transaction.amount.toLocaleString()}
                        </p>
                        <Badge className={getStatusColor(transaction.status)} variant="outline">
                          {transaction.status}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Budget Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Budget Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {budgets.map((budget, index) => (
                    <motion.div
                      key={budget.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-medium">{budget.department}</p>
                          <p className="text-sm text-muted-foreground">{budget.category}</p>
                        </div>
                        <Badge className={getBudgetStatusColor(budget.status)}>
                          {budget.status}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Allocated: ${budget.allocatedAmount.toLocaleString()}</span>
                          <span>Spent: ${budget.spentAmount.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${budget.remainingAmount >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                            style={{ width: `${Math.min((budget.spentAmount / budget.allocatedAmount) * 100, 100)}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Remaining: ${budget.remainingAmount.toLocaleString()}</span>
                          <span>{Math.round((budget.spentAmount / budget.allocatedAmount) * 100)}% used</span>
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

      {activeTab === "transactions" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Financial Transactions</CardTitle>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search transactions..."
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
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="expense">Expense</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Transaction
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Add New Transaction</DialogTitle>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-4">
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Transaction Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="income">Income</SelectItem>
                            <SelectItem value="expense">Expense</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input placeholder="Category" />
                        <Input placeholder="Amount" type="number" />
                        <Input placeholder="Date" type="date" />
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Payment Method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cash">Cash</SelectItem>
                            <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                            <SelectItem value="credit-card">Credit Card</SelectItem>
                            <SelectItem value="online-payment">Online Payment</SelectItem>
                            <SelectItem value="check">Check</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input placeholder="Reference" />
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                        <Textarea placeholder="Description" />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline">Cancel</Button>
                        <Button className="bg-gradient-to-r from-primary-500 to-primary-600">Add Transaction</Button>
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
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction, index) => (
                    <motion.tr
                      key={transaction.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-muted/50"
                    >
                      <TableCell>
                        <Badge className={getStatusColor(transaction.type)}>
                          {transaction.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-muted-foreground">{transaction.reference}</p>
                        </div>
                      </TableCell>
                      <TableCell>{transaction.category}</TableCell>
                      <TableCell>
                        <span className={`font-semibold ${getTypeColor(transaction.type)}`}>
                          {transaction.type === "income" ? "+" : "-"}${transaction.amount.toLocaleString()}
                        </span>
                      </TableCell>
                      <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(transaction.status)}>
                          {transaction.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              setSelectedTransaction(transaction);
                              setShowTransactionModal(true);
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

      {activeTab === "expenses" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="h-5 w-5 text-red-500" />
                  Expense Management
                </CardTitle>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search expenses..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Salaries">Salaries</SelectItem>
                      <SelectItem value="Utilities">Utilities</SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                      <SelectItem value="Supplies">Supplies</SelectItem>
                      <SelectItem value="Equipment">Equipment</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Expense
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions
                    .filter(t => t.type === "expense")
                    .filter(t => 
                      t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      t.department?.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .filter(t => filterType === "all" || t.category === filterType)
                    .filter(t => filterStatus === "all" || t.status === filterStatus)
                    .map((transaction, index) => (
                    <motion.tr
                      key={transaction.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-muted/50"
                    >
                      <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                          {transaction.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{transaction.description}</TableCell>
                      <TableCell className="font-semibold text-red-600">
                        -${transaction.amount.toLocaleString()}
                      </TableCell>
                      <TableCell>{transaction.department}</TableCell>
                      <TableCell>
                        <Badge className={
                          transaction.status === "completed" ? "bg-green-100 text-green-800" :
                          transaction.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                          "bg-red-100 text-red-800"
                        }>
                          {transaction.status}
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
                            <Receipt className="h-4 w-4" />
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

      {activeTab === "budgets" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Budget Management</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Budget
                  </Button>
                  <Button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Budget
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Department</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Allocated</TableHead>
                    <TableHead>Spent</TableHead>
                    <TableHead>Remaining</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {budgets.map((budget, index) => (
                    <motion.tr
                      key={budget.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-muted/50"
                    >
                      <TableCell className="font-medium">{budget.department}</TableCell>
                      <TableCell>{budget.category}</TableCell>
                      <TableCell className="font-semibold">${budget.allocatedAmount.toLocaleString()}</TableCell>
                      <TableCell className="text-red-600 font-semibold">${budget.spentAmount.toLocaleString()}</TableCell>
                      <TableCell className={`font-semibold ${budget.remainingAmount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ${budget.remainingAmount.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${budget.remainingAmount >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                              style={{ width: `${Math.min((budget.spentAmount / budget.allocatedAmount) * 100, 100)}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {Math.round((budget.spentAmount / budget.allocatedAmount) * 100)}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getBudgetStatusColor(budget.status)}>
                          {budget.status}
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

      {activeTab === "invoices" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Invoice Management</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Invoices
                  </Button>
                  <Button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Invoice
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice #</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice, index) => (
                    <motion.tr
                      key={invoice.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-muted/50"
                    >
                      <TableCell className="font-mono">{invoice.invoiceNumber}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{invoice.studentName}</p>
                          <p className="text-sm text-muted-foreground">{invoice.studentId}</p>
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">${invoice.amount.toLocaleString()}</TableCell>
                      <TableCell>{new Date(invoice.dueDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(invoice.status)}>
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(invoice.createdDate).toLocaleDateString()}</TableCell>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Reports</p>
                    <p className="text-2xl font-bold">{reports.length}</p>
                  </div>
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                    <FileText className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Final Reports</p>
                    <p className="text-2xl font-bold">{reports.filter(r => r.status === "final").length}</p>
                  </div>
                  <div className="p-3 rounded-full bg-green-100 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Draft Reports</p>
                    <p className="text-2xl font-bold">{reports.filter(r => r.status === "draft").length}</p>
                  </div>
                  <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                    <AlertCircle className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Financial Reports</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export All Reports
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
                    <TableHead>Report Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Generated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.map((report, index) => (
                    <motion.tr
                      key={report.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-muted/50"
                    >
                      <TableCell className="font-medium">{report.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusColor(report.type)}>
                          {report.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{report.period}</TableCell>
                      <TableCell className="font-semibold">${report.totalAmount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(report.generatedDate).toLocaleDateString()}</TableCell>
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

      {/* Transaction Modal */}
      {selectedTransaction && (
        <TransactionModal transaction={selectedTransaction} />
      )}
    </div>
  );
}
