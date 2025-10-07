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
  DollarSign, 
  Calendar, 
  TrendingUp, 
  Plus, 
  Edit, 
  Trash2, 
  Download,
  Search,
  GraduationCap,
  Clock,
  Award,
  AlertCircle
} from "lucide-react";

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  salary: number;
  email: string;
  phone: string;
  joinDate: string;
  status: "active" | "inactive" | "on-leave";
  avatar?: string;
}

interface Payroll {
  id: string;
  employeeId: string;
  employeeName: string;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  month: string;
  status: "paid" | "pending" | "overdue";
}

export default function HRManagement() {
  const [activeTab, setActiveTab] = useState("employees");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");

  // Helper function to generate employee photos
  const getEmployeePhoto = (name: string, _position: string) => {
    const photos = {
      "Sarah Johnson": "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      "Michael Chen": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      "Emily Davis": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      "David Rodriguez": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      "Lisa Wang": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      "James Wilson": "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face"
    };
    return photos[name as keyof typeof photos] || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face";
  };

  // Mock data
  const employees: Employee[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      position: "Principal",
      department: "Administration",
      salary: 8500,
      email: "sarah.johnson@school.edu",
      phone: "+1 (555) 123-4567",
      joinDate: "2020-01-15",
      status: "active",
      avatar: getEmployeePhoto("Sarah Johnson", "Principal")
    },
    {
      id: "2",
      name: "Michael Chen",
      position: "Math Teacher",
      department: "Mathematics",
      salary: 4500,
      email: "michael.chen@school.edu",
      phone: "+1 (555) 234-5678",
      joinDate: "2021-08-20",
      status: "active",
      avatar: getEmployeePhoto("Michael Chen", "Math Teacher")
    },
    {
      id: "3",
      name: "Emily Davis",
      position: "English Teacher",
      department: "Languages",
      salary: 4200,
      email: "emily.davis@school.edu",
      phone: "+1 (555) 345-6789",
      joinDate: "2022-03-10",
      status: "on-leave",
      avatar: getEmployeePhoto("Emily Davis", "English Teacher")
    },
    {
      id: "4",
      name: "David Rodriguez",
      position: "IT Administrator",
      department: "IT",
      salary: 5500,
      email: "david.rodriguez@school.edu",
      phone: "+1 (555) 456-7890",
      joinDate: "2021-11-05",
      status: "active",
      avatar: getEmployeePhoto("David Rodriguez", "IT Administrator")
    }
  ];

  const payroll: Payroll[] = [
    {
      id: "1",
      employeeId: "1",
      employeeName: "Sarah Johnson",
      basicSalary: 8500,
      allowances: 1200,
      deductions: 800,
      netSalary: 8900,
      month: "December 2024",
      status: "paid"
    },
    {
      id: "2",
      employeeId: "2",
      employeeName: "Michael Chen",
      basicSalary: 4500,
      allowances: 600,
      deductions: 450,
      netSalary: 4650,
      month: "December 2024",
      status: "paid"
    },
    {
      id: "3",
      employeeId: "3",
      employeeName: "Emily Davis",
      basicSalary: 4200,
      allowances: 500,
      deductions: 420,
      netSalary: 4280,
      month: "December 2024",
      status: "pending"
    }
  ];

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === "all" || emp.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  const totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0);
  const activeEmployees = employees.filter(emp => emp.status === "active").length;
  const pendingPayroll = payroll.filter(p => p.status === "pending").length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "inactive": return "bg-red-100 text-red-800";
      case "on-leave": return "bg-yellow-100 text-yellow-800";
      case "paid": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "overdue": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
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
                  <p className="text-sm font-medium text-muted-foreground">Total Employees</p>
                  <p className="text-2xl font-bold">{employees.length}</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Monthly Payroll</p>
                  <p className="text-2xl font-bold">${totalSalary.toLocaleString()}</p>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +5.2% from last month
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
                  <p className="text-sm font-medium text-muted-foreground">Active Staff</p>
                  <p className="text-2xl font-bold">{activeEmployees}</p>
                  <p className="text-xs text-blue-600 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Currently working
                  </p>
                </div>
                <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                  <Award className="h-5 w-5" />
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
                  <p className="text-sm font-medium text-muted-foreground">Pending Payments</p>
                  <p className="text-2xl font-bold">{pendingPayroll}</p>
                  <p className="text-xs text-orange-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Needs attention
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
        {["employees", "payroll", "departments"].map((tab) => (
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
      {activeTab === "employees" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Employee Management</CardTitle>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search employees..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="Administration">Administration</SelectItem>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Languages">Languages</SelectItem>
                      <SelectItem value="IT">IT</SelectItem>
                    </SelectContent>
                  </Select>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Employee
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Add New Employee</DialogTitle>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-4">
                        <Input placeholder="Full Name" />
                        <Input placeholder="Position" />
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Department" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="administration">Administration</SelectItem>
                            <SelectItem value="mathematics">Mathematics</SelectItem>
                            <SelectItem value="languages">Languages</SelectItem>
                            <SelectItem value="it">IT</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input placeholder="Salary" type="number" />
                        <Input placeholder="Email" type="email" />
                        <Input placeholder="Phone" />
                        <Input placeholder="Join Date" type="date" />
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="on-leave">On Leave</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline">Cancel</Button>
                        <Button className="bg-gradient-to-r from-primary-500 to-primary-600">Add Employee</Button>
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
                    <TableHead>Employee</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Salary</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.map((employee, index) => (
                    <motion.tr
                      key={employee.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-muted/50"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={employee.avatar} />
                            <AvatarFallback>
                              {employee.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{employee.name}</p>
                            <p className="text-sm text-muted-foreground">{employee.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{employee.position}</TableCell>
                      <TableCell>{employee.department}</TableCell>
                      <TableCell>${employee.salary.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(employee.status)}>
                          {employee.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
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
                <div className="flex items-center gap-2">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
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
                    <TableHead>Basic Salary</TableHead>
                    <TableHead>Allowances</TableHead>
                    <TableHead>Deductions</TableHead>
                    <TableHead>Net Salary</TableHead>
                    <TableHead>Month</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payroll.map((pay, index) => (
                    <motion.tr
                      key={pay.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-muted/50"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {pay.employeeName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{pay.employeeName}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>${pay.basicSalary.toLocaleString()}</TableCell>
                      <TableCell>${pay.allowances.toLocaleString()}</TableCell>
                      <TableCell>${pay.deductions.toLocaleString()}</TableCell>
                      <TableCell className="font-semibold">${pay.netSalary.toLocaleString()}</TableCell>
                      <TableCell>{pay.month}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(pay.status)}>
                          {pay.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
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

      {activeTab === "departments" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Administration", employees: 5, budget: 45000, color: "bg-blue-500" },
              { name: "Mathematics", employees: 12, budget: 54000, color: "bg-green-500" },
              { name: "Languages", employees: 8, budget: 38000, color: "bg-purple-500" },
              { name: "IT", employees: 3, budget: 18000, color: "bg-orange-500" },
              { name: "Science", employees: 10, budget: 48000, color: "bg-red-500" },
              { name: "Arts", employees: 6, budget: 32000, color: "bg-pink-500" }
            ].map((dept, index) => (
              <motion.div
                key={dept.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="card-hover">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-full ${dept.color} text-white`}>
                        <GraduationCap className="h-5 w-5" />
                      </div>
                      <Badge variant="outline">{dept.employees} staff</Badge>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{dept.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Monthly budget: ${dept.budget.toLocaleString()}
                    </p>
                    <div className="flex items-center justify-between">
                      <Button variant="outline" size="sm">
                        View Details
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
