import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Building, 
  MapPin, 
  Users, 
  TrendingUp, 
  Search,
  Download,
  Plus,
  Edit,
  Eye,
  BarChart3,
  Activity,
  GraduationCap
} from "lucide-react";

interface Branch {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  email: string;
  principal: string;
  established: string;
  isActive: boolean;
  studentCount: number;
  teacherCount: number;
  revenue: number;
  growth: number;
}

export default function BranchManagementScreen() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Mock branches data
  const branches: Branch[] = [
    {
      id: "1",
      name: "Elite School - Main Campus",
      address: "123 Education Street",
      city: "New York",
      state: "NY",
      country: "USA",
      phone: "+1 (555) 123-4567",
      email: "main@eliteschool.edu",
      principal: "Dr. Sarah Johnson",
      established: "1995",
      isActive: true,
      studentCount: 1250,
      teacherCount: 85,
      revenue: 2500000,
      growth: 12.5
    },
    {
      id: "2",
      name: "Elite School - Downtown Campus",
      address: "456 Learning Avenue",
      city: "New York",
      state: "NY",
      country: "USA",
      phone: "+1 (555) 234-5678",
      email: "downtown@eliteschool.edu",
      principal: "Mr. Michael Chen",
      established: "2005",
      isActive: true,
      studentCount: 800,
      teacherCount: 55,
      revenue: 1800000,
      growth: 8.2
    },
    {
      id: "3",
      name: "Elite School - Suburban Campus",
      address: "789 Knowledge Road",
      city: "Brooklyn",
      state: "NY",
      country: "USA",
      phone: "+1 (555) 345-6789",
      email: "suburban@eliteschool.edu",
      principal: "Dr. Emily Rodriguez",
      established: "2010",
      isActive: true,
      studentCount: 600,
      teacherCount: 40,
      revenue: 1200000,
      growth: 15.3
    }
  ];

  const filteredBranches = branches.filter(branch =>
    branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.principal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewBranch = (branch: Branch) => {
    setSelectedBranch(branch);
    setIsEditMode(false);
    setIsDialogOpen(true);
  };

  const handleEditBranch = (branch: Branch) => {
    setSelectedBranch(branch);
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleAddBranch = () => {
    setSelectedBranch(null);
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const getTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Total Branches */}
            <Card className="glass-effect">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Branches</p>
                    <p className="text-2xl font-bold gradient-text">{branches.length}</p>
                  </div>
                  <Building className="h-8 w-8 text-primary-500/70" />
                </div>
              </CardContent>
            </Card>

            {/* Total Students */}
            <Card className="glass-effect">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                    <p className="text-2xl font-bold gradient-text">
                      {branches.reduce((sum, branch) => sum + branch.studentCount, 0).toLocaleString()}
                    </p>
                  </div>
                  <Users className="h-8 w-8 text-green-500/70" />
                </div>
              </CardContent>
            </Card>

            {/* Total Revenue */}
            <Card className="glass-effect">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                    <p className="text-2xl font-bold gradient-text">
                      ${branches.reduce((sum, branch) => sum + branch.revenue, 0).toLocaleString()}
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-yellow-500/70" />
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="glass-effect lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary-500" /> Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: "New student enrolled", branch: "Main Campus", time: "2 hours ago" },
                    { action: "Teacher hired", branch: "Downtown Campus", time: "4 hours ago" },
                    { action: "Revenue report generated", branch: "Suburban Campus", time: "1 day ago" },
                    { action: "Branch performance updated", branch: "Main Campus", time: "2 days ago" }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.branch} • {activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-primary-500" /> Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button onClick={handleAddBranch} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Branch
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                  <Button variant="outline" className="w-full">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "branches":
        return (
          <div className="space-y-6">
            {/* Search and Filters */}
            <Card className="glass-effect">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search branches..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Button onClick={handleAddBranch}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Branch
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Branches Table */}
            <Card className="glass-effect">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Branch</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Principal</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Growth</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBranches.map((branch) => (
                    <TableRow key={branch.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {branch.name.split(' ').map(word => word[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{branch.name}</p>
                            <p className="text-sm text-muted-foreground">{branch.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{branch.city}, {branch.state}</span>
                        </div>
                      </TableCell>
                      <TableCell>{branch.principal}</TableCell>
                      <TableCell>{branch.studentCount.toLocaleString()}</TableCell>
                      <TableCell>${branch.revenue.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-4 w-4 text-green-500" />
                          <span className="text-green-600 font-medium">+{branch.growth}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={branch.isActive ? "default" : "secondary"}>
                          {branch.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewBranch(branch)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditBranch(branch)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Branch Management</h1>
          <p className="text-muted-foreground">Manage school branches and campuses</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleAddBranch}>
            <Plus className="h-4 w-4 mr-2" />
            Add Branch
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
        {[
          { id: "overview", label: "Overview", icon: <BarChart3 className="h-4 w-4" /> },
          { id: "branches", label: "Branches", icon: <Building className="h-4 w-4" /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {getTabContent()}
      </motion.div>

      {/* Branch Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? (selectedBranch ? "Edit Branch" : "Add New Branch") : "Branch Details"}
            </DialogTitle>
          </DialogHeader>
          {selectedBranch && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Basic Information</h3>
                  <div className="space-y-2">
                    <p><strong>Name:</strong> {selectedBranch.name}</p>
                    <p><strong>Address:</strong> {selectedBranch.address}</p>
                    <p><strong>City:</strong> {selectedBranch.city}, {selectedBranch.state}</p>
                    <p><strong>Country:</strong> {selectedBranch.country}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Contact Information</h3>
                  <div className="space-y-2">
                    <p><strong>Phone:</strong> {selectedBranch.phone}</p>
                    <p><strong>Email:</strong> {selectedBranch.email}</p>
                    <p><strong>Principal:</strong> {selectedBranch.principal}</p>
                    <p><strong>Established:</strong> {selectedBranch.established}</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{selectedBranch.studentCount.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Students</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <GraduationCap className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{selectedBranch.teacherCount}</p>
                    <p className="text-sm text-muted-foreground">Teachers</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <TrendingUp className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold">+{selectedBranch.growth}%</p>
                    <p className="text-sm text-muted-foreground">Growth</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}