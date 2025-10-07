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
  Bus, 
  Users, 
  TrendingUp, 
  Plus, 
  Edit, 
  Trash2, 
  Download,
  Search,
  FileText,
  Eye,
  User,
  Star,
  BarChart3,
  Target,
  Activity,
  Route,
  Car,
  DollarSign
} from "lucide-react";

interface Vehicle {
  id: string;
  vehicleNumber: string;
  type: "bus" | "van" | "car" | "truck";
  make: string;
  model: string;
  year: number;
  capacity: number;
  fuelType: "petrol" | "diesel" | "electric" | "hybrid";
  licensePlate: string;
  registrationNumber: string;
  insuranceNumber: string;
  insuranceExpiry: string;
  lastServiceDate: string;
  nextServiceDate: string;
  mileage: number;
  status: "active" | "inactive" | "maintenance" | "retired";
  driverId?: string;
  driverName?: string;
  routeId?: string;
  routeName?: string;
  location: string;
  gpsEnabled: boolean;
  features: string[];
  purchaseDate: string;
  purchasePrice: number;
  currentValue: number;
  maintenanceCost: number;
  fuelEfficiency: number; // km/liter
  safetyRating: number;
  lastInspection: string;
  nextInspection: string;
}

interface Route {
  id: string;
  routeName: string;
  routeNumber: string;
  startLocation: string;
  endLocation: string;
  stops: string[];
  distance: number; // in km
  estimatedTime: number; // in minutes
  status: "active" | "inactive" | "suspended";
  vehicleId?: string;
  vehicleNumber?: string;
  driverId?: string;
  driverName?: string;
  startTime: string;
  endTime: string;
  frequency: "daily" | "weekly" | "monthly";
  days: string[];
  capacity: number;
  currentPassengers: number;
  fare: number;
  description: string;
  createdDate: string;
  lastUpdated: string;
}

interface Driver {
  id: string;
  driverId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other";
  licenseNumber: string;
  licenseType: string;
  licenseExpiry: string;
  experience: number; // in years
  status: "active" | "inactive" | "suspended" | "on-leave";
  vehicleId?: string;
  vehicleNumber?: string;
  routeId?: string;
  routeName?: string;
  salary: number;
  joinDate: string;
  emergencyContact: string;
  bloodGroup: string;
  medicalInfo: string;
  rating: number;
  reviews: number;
  totalTrips: number;
  totalDistance: number;
  safetyRecord: string;
  certifications: string[];
  lastTraining: string;
  nextTraining: string;
}

interface StudentTransport {
  id: string;
  studentId: string;
  studentName: string;
  studentClass: string;
  parentName: string;
  parentPhone: string;
  pickupLocation: string;
  dropoffLocation: string;
  routeId: string;
  routeName: string;
  vehicleId: string;
  vehicleNumber: string;
  driverId: string;
  driverName: string;
  pickupTime: string;
  dropoffTime: string;
  status: "active" | "inactive" | "suspended" | "completed";
  startDate: string;
  endDate?: string;
  fare: number;
  paymentStatus: "paid" | "pending" | "overdue";
  emergencyContact: string;
  medicalInfo: string;
  specialRequirements: string;
  assignedDate: string;
  lastUpdated: string;
}

interface TransportStats {
  totalVehicles: number;
  activeVehicles: number;
  totalRoutes: number;
  activeRoutes: number;
  totalDrivers: number;
  activeDrivers: number;
  totalStudents: number;
  activeStudents: number;
  monthlyRevenue: number;
  averageRating: number;
  safetyIncidents: number;
  maintenanceAlerts: number;
}

export default function TransportScreen() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [showVehicleModal, setShowVehicleModal] = useState(false);

  // Mock data
  const vehicles: Vehicle[] = [
    {
      id: "1",
      vehicleNumber: "SCH-001",
      type: "bus",
      make: "Volvo",
      model: "B7R",
      year: 2022,
      capacity: 50,
      fuelType: "diesel",
      licensePlate: "ABC-1234",
      registrationNumber: "REG-001",
      insuranceNumber: "INS-001",
      insuranceExpiry: "2025-12-31",
      lastServiceDate: "2024-11-15",
      nextServiceDate: "2025-02-15",
      mileage: 45000,
      status: "active",
      driverId: "DRV001",
      driverName: "John Smith",
      routeId: "RT001",
      routeName: "Route A - Downtown",
      location: "School Campus",
      gpsEnabled: true,
      features: ["GPS", "Air Conditioning", "Safety Belts", "Camera"],
      purchaseDate: "2022-01-15",
      purchasePrice: 250000,
      currentValue: 200000,
      maintenanceCost: 15000,
      fuelEfficiency: 8.5,
      safetyRating: 4.8,
      lastInspection: "2024-11-01",
      nextInspection: "2025-05-01"
    },
    {
      id: "2",
      vehicleNumber: "SCH-002",
      type: "van",
      make: "Toyota",
      model: "Hiace",
      year: 2021,
      capacity: 15,
      fuelType: "diesel",
      licensePlate: "XYZ-5678",
      registrationNumber: "REG-002",
      insuranceNumber: "INS-002",
      insuranceExpiry: "2025-06-30",
      lastServiceDate: "2024-10-20",
      nextServiceDate: "2025-01-20",
      mileage: 32000,
      status: "active",
      driverId: "DRV002",
      driverName: "Sarah Johnson",
      routeId: "RT002",
      routeName: "Route B - Suburbs",
      location: "Maintenance Center",
      gpsEnabled: true,
      features: ["GPS", "Air Conditioning", "Safety Belts"],
      purchaseDate: "2021-08-10",
      purchasePrice: 180000,
      currentValue: 140000,
      maintenanceCost: 12000,
      fuelEfficiency: 12.0,
      safetyRating: 4.6,
      lastInspection: "2024-10-15",
      nextInspection: "2025-04-15"
    },
    {
      id: "3",
      vehicleNumber: "SCH-003",
      type: "bus",
      make: "Mercedes",
      model: "Sprinter",
      year: 2023,
      capacity: 30,
      fuelType: "electric",
      licensePlate: "DEF-9012",
      registrationNumber: "REG-003",
      insuranceNumber: "INS-003",
      insuranceExpiry: "2025-09-30",
      lastServiceDate: "2024-12-01",
      nextServiceDate: "2025-03-01",
      mileage: 15000,
      status: "maintenance",
      driverId: "DRV003",
      driverName: "Mike Chen",
      routeId: "RT003",
      routeName: "Route C - Airport",
      location: "Service Center",
      gpsEnabled: true,
      features: ["GPS", "Air Conditioning", "Safety Belts", "Camera", "WiFi"],
      purchaseDate: "2023-03-20",
      purchasePrice: 300000,
      currentValue: 280000,
      maintenanceCost: 8000,
      fuelEfficiency: 0, // Electric
      safetyRating: 4.9,
      lastInspection: "2024-12-01",
      nextInspection: "2025-06-01"
    }
  ];

  const routes: Route[] = [
    {
      id: "1",
      routeName: "Route A - Downtown",
      routeNumber: "RT-001",
      startLocation: "School Campus",
      endLocation: "Downtown Station",
      stops: ["Main Street", "Central Park", "City Center"],
      distance: 15.5,
      estimatedTime: 45,
      status: "active",
      vehicleId: "1",
      vehicleNumber: "SCH-001",
      driverId: "DRV001",
      driverName: "John Smith",
      startTime: "07:00",
      endTime: "08:30",
      frequency: "daily",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      capacity: 50,
      currentPassengers: 35,
      fare: 25.00,
      description: "Main route connecting school to downtown area",
      createdDate: "2024-01-15",
      lastUpdated: "2024-12-01"
    },
    {
      id: "2",
      routeName: "Route B - Suburbs",
      routeNumber: "RT-002",
      startLocation: "School Campus",
      endLocation: "Suburban Area",
      stops: ["Oak Street", "Pine Avenue", "Maple Drive"],
      distance: 22.3,
      estimatedTime: 60,
      status: "active",
      vehicleId: "2",
      vehicleNumber: "SCH-002",
      driverId: "DRV002",
      driverName: "Sarah Johnson",
      startTime: "07:15",
      endTime: "08:45",
      frequency: "daily",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      capacity: 15,
      currentPassengers: 12,
      fare: 30.00,
      description: "Route serving suburban residential areas",
      createdDate: "2024-02-01",
      lastUpdated: "2024-12-01"
    }
  ];

  const drivers: Driver[] = [
    {
      id: "1",
      driverId: "DRV001",
      name: "John Smith",
      email: "john.smith@school.edu",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, City, State 12345",
      dateOfBirth: "1980-05-15",
      gender: "male",
      licenseNumber: "DL-123456",
      licenseType: "Commercial",
      licenseExpiry: "2026-05-15",
      experience: 8,
      status: "active",
      vehicleId: "1",
      vehicleNumber: "SCH-001",
      routeId: "RT001",
      routeName: "Route A - Downtown",
      salary: 4500,
      joinDate: "2020-03-01",
      emergencyContact: "+1 (555) 111-2222",
      bloodGroup: "O+",
      medicalInfo: "No known conditions",
      rating: 4.8,
      reviews: 45,
      totalTrips: 1250,
      totalDistance: 18750,
      safetyRecord: "Excellent",
      certifications: ["Commercial License", "First Aid", "Defensive Driving"],
      lastTraining: "2024-10-15",
      nextTraining: "2025-04-15"
    },
    {
      id: "2",
      driverId: "DRV002",
      name: "Sarah Johnson",
      email: "sarah.johnson@school.edu",
      phone: "+1 (555) 234-5678",
      address: "456 Oak Ave, City, State 12345",
      dateOfBirth: "1985-08-22",
      gender: "female",
      licenseNumber: "DL-234567",
      licenseType: "Commercial",
      licenseExpiry: "2027-08-22",
      experience: 5,
      status: "active",
      vehicleId: "2",
      vehicleNumber: "SCH-002",
      routeId: "RT002",
      routeName: "Route B - Suburbs",
      salary: 4200,
      joinDate: "2021-06-15",
      emergencyContact: "+1 (555) 333-4444",
      bloodGroup: "A+",
      medicalInfo: "Allergic to pollen",
      rating: 4.6,
      reviews: 32,
      totalTrips: 890,
      totalDistance: 13350,
      safetyRecord: "Good",
      certifications: ["Commercial License", "First Aid"],
      lastTraining: "2024-09-20",
      nextTraining: "2025-03-20"
    }
  ];

  const studentTransports: StudentTransport[] = [
    {
      id: "1",
      studentId: "STU001",
      studentName: "Alex Johnson",
      studentClass: "10th Grade",
      parentName: "Robert Johnson",
      parentPhone: "+1 (555) 555-1234",
      pickupLocation: "123 Main Street",
      dropoffLocation: "School Campus",
      routeId: "RT001",
      routeName: "Route A - Downtown",
      vehicleId: "1",
      vehicleNumber: "SCH-001",
      driverId: "DRV001",
      driverName: "John Smith",
      pickupTime: "07:15",
      dropoffTime: "08:30",
      status: "active",
      startDate: "2024-09-01",
      fare: 25.00,
      paymentStatus: "paid",
      emergencyContact: "+1 (555) 555-1234",
      medicalInfo: "No known allergies",
      specialRequirements: "None",
      assignedDate: "2024-08-15",
      lastUpdated: "2024-12-01"
    },
    {
      id: "2",
      studentId: "STU002",
      studentName: "Sarah Chen",
      studentClass: "11th Grade",
      parentName: "David Chen",
      parentPhone: "+1 (555) 555-5678",
      pickupLocation: "456 Oak Avenue",
      dropoffLocation: "School Campus",
      routeId: "RT002",
      routeName: "Route B - Suburbs",
      vehicleId: "2",
      vehicleNumber: "SCH-002",
      driverId: "DRV002",
      driverName: "Sarah Johnson",
      pickupTime: "07:30",
      dropoffTime: "08:45",
      status: "active",
      startDate: "2024-09-01",
      fare: 30.00,
      paymentStatus: "pending",
      emergencyContact: "+1 (555) 555-5678",
      medicalInfo: "Asthma - inhaler required",
      specialRequirements: "Seat near front for easy access",
      assignedDate: "2024-08-20",
      lastUpdated: "2024-12-01"
    }
  ];

  const transportStats: TransportStats = {
    totalVehicles: vehicles.length,
    activeVehicles: vehicles.filter(v => v.status === "active").length,
    totalRoutes: routes.length,
    activeRoutes: routes.filter(r => r.status === "active").length,
    totalDrivers: drivers.length,
    activeDrivers: drivers.filter(d => d.status === "active").length,
    totalStudents: studentTransports.length,
    activeStudents: studentTransports.filter(s => s.status === "active").length,
    monthlyRevenue: 15000,
    averageRating: 4.7,
    safetyIncidents: 0,
    maintenanceAlerts: 2
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || vehicle.type === filterType;
    const matchesStatus = filterStatus === "all" || vehicle.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "inactive": return "bg-red-100 text-red-800";
      case "maintenance": return "bg-yellow-100 text-yellow-800";
      case "retired": return "bg-gray-100 text-gray-800";
      case "suspended": return "bg-orange-100 text-orange-800";
      case "on-leave": return "bg-blue-100 text-blue-800";
      case "paid": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "overdue": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "bus": return "bg-blue-100 text-blue-800";
      case "van": return "bg-green-100 text-green-800";
      case "car": return "bg-purple-100 text-purple-800";
      case "truck": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-green-600";
    if (rating >= 4.0) return "text-blue-600";
    if (rating >= 3.5) return "text-yellow-600";
    return "text-red-600";
  };

  const VehicleModal = ({ vehicle }: { vehicle: Vehicle }) => (
    <Dialog open={showVehicleModal} onOpenChange={setShowVehicleModal}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
              <Bus className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{vehicle.vehicleNumber}</h2>
              <p className="text-muted-foreground">{vehicle.make} {vehicle.model} ({vehicle.year})</p>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Vehicle Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5" />
                Vehicle Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Vehicle Number</label>
                  <p className="text-sm font-semibold">{vehicle.vehicleNumber}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Type</label>
                  <Badge className={getTypeColor(vehicle.type)}>
                    {vehicle.type}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Make & Model</label>
                  <p className="text-sm">{vehicle.make} {vehicle.model}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Year</label>
                  <p className="text-sm">{vehicle.year}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Capacity</label>
                  <p className="text-sm font-semibold">{vehicle.capacity} passengers</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Fuel Type</label>
                  <p className="text-sm">{vehicle.fuelType}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">License Plate</label>
                  <p className="text-sm font-semibold">{vehicle.licensePlate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Mileage</label>
                  <p className="text-sm">{vehicle.mileage.toLocaleString()} km</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Driver Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Driver Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>
                    {vehicle.driverName?.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{vehicle.driverName || 'Unassigned'}</p>
                  <p className="text-sm text-muted-foreground">{vehicle.driverId || 'No driver assigned'}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Route</label>
                  <p className="text-sm">{vehicle.routeName || 'No route assigned'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Location</label>
                  <p className="text-sm">{vehicle.location}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">GPS Enabled</label>
                  <p className="text-sm">{vehicle.gpsEnabled ? 'Yes' : 'No'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <Badge className={getStatusColor(vehicle.status)}>
                    {vehicle.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Maintenance Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Maintenance Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Last Service</label>
                  <p className="text-sm">{new Date(vehicle.lastServiceDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Next Service</label>
                  <p className="text-sm">{new Date(vehicle.nextServiceDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Last Inspection</label>
                  <p className="text-sm">{new Date(vehicle.lastInspection).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Next Inspection</label>
                  <p className="text-sm">{new Date(vehicle.nextInspection).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Maintenance Cost</label>
                  <p className="text-sm font-semibold">${vehicle.maintenanceCost.toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Fuel Efficiency</label>
                  <p className="text-sm">{vehicle.fuelEfficiency} km/liter</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Financial Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Purchase Date</label>
                  <p className="text-sm">{new Date(vehicle.purchaseDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Purchase Price</label>
                  <p className="text-sm font-semibold">${vehicle.purchasePrice.toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Current Value</label>
                  <p className="text-sm font-semibold">${vehicle.currentValue.toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Insurance Expiry</label>
                  <p className="text-sm">{new Date(vehicle.insuranceExpiry).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Features & Safety
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Features</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {vehicle.features.map((feature, index) => (
                    <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Safety Rating</label>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className={`font-semibold ${getRatingColor(vehicle.safetyRating)}`}>
                    {vehicle.safetyRating.toFixed(1)}/5.0
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setShowVehicleModal(false)}>
            Close
          </Button>
          <Button className="bg-gradient-to-r from-primary-500 to-primary-600">
            <Edit className="h-4 w-4 mr-2" />
            Edit Vehicle
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
                  <p className="text-sm font-medium text-muted-foreground">Total Vehicles</p>
                  <p className="text-2xl font-bold">{transportStats.totalVehicles}</p>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {transportStats.activeVehicles} active
                  </p>
                </div>
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <Bus className="h-5 w-5" />
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
                  <p className="text-sm font-medium text-muted-foreground">Active Routes</p>
                  <p className="text-2xl font-bold">{transportStats.activeRoutes}</p>
                  <p className="text-xs text-blue-600 flex items-center gap-1">
                    <Route className="h-3 w-3" />
                    {transportStats.totalRoutes} total routes
                  </p>
                </div>
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  <Route className="h-5 w-5" />
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
                  <p className="text-sm font-medium text-muted-foreground">Active Drivers</p>
                  <p className="text-2xl font-bold">{transportStats.activeDrivers}</p>
                  <p className="text-xs text-purple-600 flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {transportStats.totalDrivers} total drivers
                  </p>
                </div>
                <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                  <User className="h-5 w-5" />
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
                  <p className="text-sm font-medium text-muted-foreground">Student Transport</p>
                  <p className="text-2xl font-bold">{transportStats.activeStudents}</p>
                  <p className="text-xs text-orange-600 flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {transportStats.totalStudents} total students
                  </p>
                </div>
                <div className="p-3 rounded-full bg-orange-100 text-orange-600">
                  <Users className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg">
        {["overview", "vehicles", "routes", "drivers", "students"].map((tab) => (
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
            {/* Recent Vehicles */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Vehicles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {vehicles.slice(0, 5).map((vehicle, index) => (
                    <motion.div
                      key={vehicle.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                          <Bus className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{vehicle.vehicleNumber}</p>
                          <p className="text-xs text-muted-foreground">{vehicle.make} {vehicle.model} • {vehicle.driverName}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-blue-600">
                          {vehicle.capacity} capacity
                        </p>
                        <Badge className={getStatusColor(vehicle.status)} variant="outline">
                          {vehicle.status}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Transport Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Transport Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {vehicles.map((vehicle, index) => (
                    <motion.div
                      key={vehicle.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-medium">{vehicle.vehicleNumber}</p>
                          <p className="text-sm text-muted-foreground">{vehicle.make} {vehicle.model}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className={`font-semibold ${getRatingColor(vehicle.safetyRating)}`}>
                            {vehicle.safetyRating.toFixed(1)}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Capacity: {vehicle.capacity}</span>
                          <span>Mileage: {vehicle.mileage.toLocaleString()} km</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${Math.min((vehicle.mileage / 100000) * 100, 100)}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{vehicle.fuelType}</span>
                          <span>Next service: {new Date(vehicle.nextServiceDate).toLocaleDateString()}</span>
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

      {activeTab === "vehicles" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Vehicle Management</CardTitle>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search vehicles..."
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
                      <SelectItem value="bus">Bus</SelectItem>
                      <SelectItem value="van">Van</SelectItem>
                      <SelectItem value="car">Car</SelectItem>
                      <SelectItem value="truck">Truck</SelectItem>
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
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="retired">Retired</SelectItem>
                    </SelectContent>
                  </Select>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Vehicle
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Add New Vehicle</DialogTitle>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-4">
                        <Input placeholder="Vehicle Number" />
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bus">Bus</SelectItem>
                            <SelectItem value="van">Van</SelectItem>
                            <SelectItem value="car">Car</SelectItem>
                            <SelectItem value="truck">Truck</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input placeholder="Make" />
                        <Input placeholder="Model" />
                        <Input placeholder="Year" type="number" />
                        <Input placeholder="Capacity" type="number" />
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Fuel Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="petrol">Petrol</SelectItem>
                            <SelectItem value="diesel">Diesel</SelectItem>
                            <SelectItem value="electric">Electric</SelectItem>
                            <SelectItem value="hybrid">Hybrid</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input placeholder="License Plate" />
                        <Input placeholder="Registration Number" />
                        <Input placeholder="Insurance Number" />
                        <Input placeholder="Insurance Expiry" type="date" />
                        <Input placeholder="Purchase Date" type="date" />
                        <Input placeholder="Purchase Price" type="number" />
                        <Input placeholder="Location" />
                        <Input placeholder="Mileage" type="number" />
                        <Textarea placeholder="Features (comma separated)" />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline">Cancel</Button>
                        <Button className="bg-gradient-to-r from-primary-500 to-primary-600">Add Vehicle</Button>
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
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Mileage</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVehicles.map((vehicle, index) => (
                    <motion.tr
                      key={vehicle.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-muted/50"
                    >
                      <TableCell>
                        <div>
                          <p className="font-medium">{vehicle.vehicleNumber}</p>
                          <p className="text-sm text-muted-foreground">{vehicle.make} {vehicle.model} ({vehicle.year})</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getTypeColor(vehicle.type)}>
                          {vehicle.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {vehicle.driverName?.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{vehicle.driverName || 'Unassigned'}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{vehicle.routeName || 'No route'}</span>
                      </TableCell>
                      <TableCell className="font-semibold">{vehicle.capacity}</TableCell>
                      <TableCell className="font-semibold">{vehicle.mileage.toLocaleString()} km</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(vehicle.status)}>
                          {vehicle.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              setSelectedVehicle(vehicle);
                              setShowVehicleModal(true);
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

      {activeTab === "routes" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Route Management</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Routes
                  </Button>
                  <Button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Route
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Route</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Distance</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Passengers</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {routes.map((route, index) => (
                    <motion.tr
                      key={route.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-muted/50"
                    >
                      <TableCell>
                        <div>
                          <p className="font-medium">{route.routeName}</p>
                          <p className="text-sm text-muted-foreground">{route.routeNumber}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{route.vehicleNumber || 'No vehicle'}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{route.driverName || 'No driver'}</span>
                      </TableCell>
                      <TableCell className="font-semibold">{route.distance} km</TableCell>
                      <TableCell>
                        <span className="text-sm">{route.startTime} - {route.endTime}</span>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-blue-600">
                          {route.currentPassengers}/{route.capacity}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(route.status)}>
                          {route.status}
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

      {activeTab === "drivers" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Driver Management</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Drivers
                  </Button>
                  <Button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Driver
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Driver</TableHead>
                    <TableHead>License</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {drivers.map((driver, index) => (
                    <motion.tr
                      key={driver.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-muted/50"
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {driver.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{driver.name}</p>
                            <p className="text-sm text-muted-foreground">{driver.driverId}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p className="font-semibold">{driver.licenseNumber}</p>
                          <p className="text-muted-foreground">Expires: {new Date(driver.licenseExpiry).toLocaleDateString()}</p>
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">{driver.experience} years</TableCell>
                      <TableCell>
                        <span className="text-sm">{driver.vehicleNumber || 'No vehicle'}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{driver.routeName || 'No route'}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className={`font-semibold ${getRatingColor(driver.rating)}`}>
                            {driver.rating.toFixed(1)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(driver.status)}>
                          {driver.status}
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

      {activeTab === "students" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Student Transport</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Students
                  </Button>
                  <Button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Student
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
                    <TableHead>Route</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Pickup Time</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentTransports.map((student, index) => (
                    <motion.tr
                      key={student.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-muted/50"
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {student.studentName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{student.studentName}</p>
                            <p className="text-sm text-muted-foreground">{student.studentId}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">{student.studentClass}</TableCell>
                      <TableCell>
                        <span className="text-sm">{student.routeName}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{student.vehicleNumber}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{student.driverName}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{student.pickupTime}</span>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p className="font-semibold">${student.fare.toFixed(2)}</p>
                          <Badge className={getStatusColor(student.paymentStatus)} variant="outline">
                            {student.paymentStatus}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(student.status)}>
                          {student.status}
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

      {/* Vehicle Modal */}
      {selectedVehicle && (
        <VehicleModal vehicle={selectedVehicle} />
      )}
    </div>
  );
}
