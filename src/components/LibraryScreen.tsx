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
  Users, 
  TrendingUp, 
  Plus, 
  Edit, 
  Trash2, 
  Download,
  Search,
  FileText,
  Eye,
  Star,
  BarChart3,
  AlertCircle,
  Target,
  Activity,
  BookMarked,
  Globe
} from "lucide-react";

interface Book {
  id: string;
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  publicationYear: number;
  category: string;
  subject: string;
  language: string;
  pages: number;
  edition: string;
  description: string;
  coverImage?: string;
  totalCopies: number;
  availableCopies: number;
  borrowedCopies: number;
  location: string;
  shelf: string;
  status: "available" | "borrowed" | "reserved" | "maintenance" | "lost";
  price: number;
  dateAdded: string;
  lastBorrowed?: string;
  rating?: number;
  reviews?: number;
  tags: string[];
}

interface Borrowing {
  id: string;
  bookId: string;
  bookTitle: string;
  borrowerId: string;
  borrowerName: string;
  borrowerType: "student" | "teacher" | "staff";
  borrowDate: string;
  dueDate: string;
  returnDate?: string;
  status: "borrowed" | "returned" | "overdue" | "lost";
  fine?: number;
  renewals: number;
  maxRenewals: number;
  notes?: string;
}

interface Resource {
  id: string;
  title: string;
  type: "ebook" | "audiobook" | "video" | "article" | "journal" | "database";
  author: string;
  publisher: string;
  description: string;
  url?: string;
  fileSize?: number;
  duration?: number;
  category: string;
  subject: string;
  language: string;
  accessLevel: "public" | "restricted" | "premium";
  status: "active" | "inactive" | "archived";
  dateAdded: string;
  lastAccessed?: string;
  downloads: number;
  rating?: number;
  tags: string[];
}

interface LibraryStats {
  totalBooks: number;
  totalBorrowings: number;
  activeBorrowings: number;
  overdueBooks: number;
  totalResources: number;
  monthlyBorrowings: number;
  popularCategories: string[];
  topBooks: string[];
}

export default function LibraryScreen() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showBookModal, setShowBookModal] = useState(false);

  // Mock data
  const books: Book[] = [
    {
      id: "1",
      isbn: "978-0-123456-78-9",
      title: "Advanced Mathematics",
      author: "Dr. Sarah Johnson",
      publisher: "Academic Press",
      publicationYear: 2023,
      category: "Mathematics",
      subject: "Calculus",
      language: "English",
      pages: 450,
      edition: "3rd Edition",
      description: "Comprehensive guide to advanced mathematical concepts including calculus, algebra, and statistics.",
      totalCopies: 5,
      availableCopies: 3,
      borrowedCopies: 2,
      location: "Main Library",
      shelf: "A-101",
      status: "available",
      price: 89.99,
      dateAdded: "2024-01-15",
      lastBorrowed: "2024-12-10",
      rating: 4.8,
      reviews: 25,
      tags: ["mathematics", "calculus", "advanced", "academic"]
    },
    {
      id: "2",
      isbn: "978-0-987654-32-1",
      title: "Physics Fundamentals",
      author: "Prof. Michael Chen",
      publisher: "Science Publications",
      publicationYear: 2022,
      category: "Science",
      subject: "Physics",
      language: "English",
      pages: 380,
      edition: "2nd Edition",
      description: "Introduction to fundamental physics principles including mechanics, thermodynamics, and electromagnetism.",
      totalCopies: 4,
      availableCopies: 1,
      borrowedCopies: 3,
      location: "Main Library",
      shelf: "B-205",
      status: "available",
      price: 75.50,
      dateAdded: "2024-02-20",
      lastBorrowed: "2024-12-15",
      rating: 4.6,
      reviews: 18,
      tags: ["physics", "science", "fundamentals", "mechanics"]
    },
    {
      id: "3",
      isbn: "978-0-555555-55-5",
      title: "English Literature",
      author: "Ms. Emily Davis",
      publisher: "Literary Press",
      publicationYear: 2021,
      category: "Literature",
      subject: "English",
      language: "English",
      pages: 320,
      edition: "1st Edition",
      description: "Comprehensive study of English literature from classical to modern periods.",
      totalCopies: 3,
      availableCopies: 0,
      borrowedCopies: 3,
      location: "Main Library",
      shelf: "C-301",
      status: "borrowed",
      price: 65.00,
      dateAdded: "2024-03-10",
      lastBorrowed: "2024-12-12",
      rating: 4.7,
      reviews: 22,
      tags: ["literature", "english", "classical", "modern"]
    },
    {
      id: "4",
      isbn: "978-0-777777-77-7",
      title: "Programming Fundamentals",
      author: "Mr. David Rodriguez",
      publisher: "Tech Books",
      publicationYear: 2024,
      category: "Computer Science",
      subject: "Programming",
      language: "English",
      pages: 520,
      edition: "1st Edition",
      description: "Introduction to programming concepts using modern programming languages.",
      totalCopies: 6,
      availableCopies: 4,
      borrowedCopies: 2,
      location: "Main Library",
      shelf: "D-401",
      status: "available",
      price: 95.00,
      dateAdded: "2024-04-05",
      lastBorrowed: "2024-12-08",
      rating: 4.5,
      reviews: 30,
      tags: ["programming", "computer-science", "coding", "fundamentals"]
    }
  ];

  const borrowings: Borrowing[] = [
    {
      id: "1",
      bookId: "1",
      bookTitle: "Advanced Mathematics",
      borrowerId: "STU001",
      borrowerName: "Alex Johnson",
      borrowerType: "student",
      borrowDate: "2024-12-01",
      dueDate: "2024-12-15",
      status: "borrowed",
      renewals: 0,
      maxRenewals: 2
    },
    {
      id: "2",
      bookId: "2",
      bookTitle: "Physics Fundamentals",
      borrowerId: "STU002",
      borrowerName: "Sarah Chen",
      borrowerType: "student",
      borrowDate: "2024-11-20",
      dueDate: "2024-12-04",
      status: "overdue",
      fine: 5.00,
      renewals: 1,
      maxRenewals: 2
    },
    {
      id: "3",
      bookId: "3",
      bookTitle: "English Literature",
      borrowerId: "TCH001",
      borrowerName: "Dr. Sarah Johnson",
      borrowerType: "teacher",
      borrowDate: "2024-12-10",
      dueDate: "2024-12-24",
      status: "borrowed",
      renewals: 0,
      maxRenewals: 3
    },
    {
      id: "4",
      bookId: "4",
      bookTitle: "Programming Fundamentals",
      borrowerId: "STU003",
      borrowerName: "Mike Rodriguez",
      borrowerType: "student",
      borrowDate: "2024-11-15",
      dueDate: "2024-11-29",
      returnDate: "2024-11-28",
      status: "returned",
      renewals: 0,
      maxRenewals: 2
    }
  ];

  const resources: Resource[] = [
    {
      id: "1",
      title: "Digital Mathematics Library",
      type: "ebook",
      author: "Various Authors",
      publisher: "Digital Press",
      description: "Collection of digital mathematics textbooks and resources.",
      url: "https://library.example.com/math",
      fileSize: 250,
      category: "Mathematics",
      subject: "Mathematics",
      language: "English",
      accessLevel: "public",
      status: "active",
      dateAdded: "2024-01-01",
      lastAccessed: "2024-12-15",
      downloads: 150,
      rating: 4.5,
      tags: ["mathematics", "digital", "ebook", "academic"]
    },
    {
      id: "2",
      title: "Science Video Collection",
      type: "video",
      author: "Science Channel",
      publisher: "Educational Media",
      description: "Collection of educational science videos and documentaries.",
      url: "https://library.example.com/science-videos",
      duration: 1200,
      category: "Science",
      subject: "Science",
      language: "English",
      accessLevel: "restricted",
      status: "active",
      dateAdded: "2024-02-01",
      lastAccessed: "2024-12-14",
      downloads: 89,
      rating: 4.3,
      tags: ["science", "video", "education", "documentary"]
    },
    {
      id: "3",
      title: "Research Database",
      type: "database",
      author: "Academic Consortium",
      publisher: "Research Press",
      description: "Comprehensive database of academic papers and research.",
      url: "https://library.example.com/research",
      category: "Research",
      subject: "General",
      language: "English",
      accessLevel: "premium",
      status: "active",
      dateAdded: "2024-03-01",
      lastAccessed: "2024-12-13",
      downloads: 45,
      rating: 4.7,
      tags: ["research", "database", "academic", "papers"]
    }
  ];

  const libraryStats: LibraryStats = {
    totalBooks: books.length,
    totalBorrowings: borrowings.length,
    activeBorrowings: borrowings.filter(b => b.status === "borrowed").length,
    overdueBooks: borrowings.filter(b => b.status === "overdue").length,
    totalResources: resources.length,
    monthlyBorrowings: 45,
    popularCategories: ["Mathematics", "Science", "Literature", "Computer Science"],
    topBooks: ["Advanced Mathematics", "Physics Fundamentals", "Programming Fundamentals"]
  };

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.isbn.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || book.category === filterCategory;
    const matchesStatus = filterStatus === "all" || book.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || resource.type === filterType;
    const matchesStatus = filterStatus === "all" || resource.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-green-100 text-green-800";
      case "borrowed": return "bg-blue-100 text-blue-800";
      case "reserved": return "bg-yellow-100 text-yellow-800";
      case "maintenance": return "bg-orange-100 text-orange-800";
      case "lost": return "bg-red-100 text-red-800";
      case "returned": return "bg-green-100 text-green-800";
      case "overdue": return "bg-red-100 text-red-800";
      case "active": return "bg-green-100 text-green-800";
      case "inactive": return "bg-gray-100 text-gray-800";
      case "archived": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "ebook": return "bg-blue-100 text-blue-800";
      case "audiobook": return "bg-purple-100 text-purple-800";
      case "video": return "bg-red-100 text-red-800";
      case "article": return "bg-green-100 text-green-800";
      case "journal": return "bg-yellow-100 text-yellow-800";
      case "database": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-green-600";
    if (rating >= 4.0) return "text-blue-600";
    if (rating >= 3.5) return "text-yellow-600";
    return "text-red-600";
  };

  const BookModal = ({ book }: { book: Book }) => (
    <Dialog open={showBookModal} onOpenChange={setShowBookModal}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{book.title}</h2>
              <p className="text-muted-foreground">by {book.author}</p>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Book Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Book Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">ISBN</label>
                  <p className="text-sm font-semibold">{book.isbn}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Publisher</label>
                  <p className="text-sm">{book.publisher}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Publication Year</label>
                  <p className="text-sm">{book.publicationYear}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Edition</label>
                  <p className="text-sm">{book.edition}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Pages</label>
                  <p className="text-sm">{book.pages}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Language</label>
                  <p className="text-sm">{book.language}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Category</label>
                  <p className="text-sm font-semibold">{book.category}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Subject</label>
                  <p className="text-sm font-semibold">{book.subject}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Description</label>
                <p className="text-sm">{book.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* Availability Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Availability Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Total Copies</label>
                  <p className="text-2xl font-bold text-blue-600">{book.totalCopies}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Available</label>
                  <p className="text-2xl font-bold text-green-600">{book.availableCopies}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Borrowed</label>
                  <p className="text-2xl font-bold text-orange-600">{book.borrowedCopies}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <Badge className={getStatusColor(book.status)}>
                    {book.status}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Location</label>
                  <p className="text-sm">{book.location}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Shelf</label>
                  <p className="text-sm">{book.shelf}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Price</label>
                  <p className="text-sm font-semibold">${book.price.toFixed(2)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Date Added</label>
                  <p className="text-sm">{new Date(book.dateAdded).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${(book.availableCopies / book.totalCopies) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.round((book.availableCopies / book.totalCopies) * 100)}% available
              </p>
            </CardContent>
          </Card>

          {/* Rating and Reviews */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Rating & Reviews
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className={`text-3xl font-bold ${getRatingColor(book.rating || 0)}`}>
                    {book.rating ? book.rating.toFixed(1) : 'N/A'}
                  </p>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= (book.rating || 0) ? 'text-yellow-500 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {book.reviews || 0} reviews
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Last borrowed: {book.lastBorrowed ? new Date(book.lastBorrowed).toLocaleDateString() : 'Never'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookMarked className="h-5 w-5" />
                Tags
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {book.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setShowBookModal(false)}>
            Close
          </Button>
          <Button className="bg-gradient-to-r from-primary-500 to-primary-600">
            <Edit className="h-4 w-4 mr-2" />
            Edit Book
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
                  <p className="text-sm font-medium text-muted-foreground">Total Books</p>
                  <p className="text-2xl font-bold">{libraryStats.totalBooks}</p>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +3 this month
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
                  <p className="text-sm font-medium text-muted-foreground">Active Borrowings</p>
                  <p className="text-2xl font-bold">{libraryStats.activeBorrowings}</p>
                  <p className="text-xs text-blue-600 flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    Currently borrowed
                  </p>
                </div>
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  <Users className="h-5 w-5" />
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
                  <p className="text-sm font-medium text-muted-foreground">Overdue Books</p>
                  <p className="text-2xl font-bold text-red-600">{libraryStats.overdueBooks}</p>
                  <p className="text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Need attention
                  </p>
                </div>
                <div className="p-3 rounded-full bg-red-100 text-red-600">
                  <AlertCircle className="h-5 w-5" />
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
                  <p className="text-sm font-medium text-muted-foreground">Digital Resources</p>
                  <p className="text-2xl font-bold">{libraryStats.totalResources}</p>
                  <p className="text-xs text-purple-600 flex items-center gap-1">
                    <Globe className="h-3 w-3" />
                    Online access
                  </p>
                </div>
                <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                  <Globe className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg">
        {["overview", "books", "borrowings", "resources", "analytics"].map((tab) => (
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
            {/* Recent Borrowings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Borrowings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {borrowings.slice(0, 5).map((borrowing, index) => (
                    <motion.div
                      key={borrowing.id}
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
                          <p className="text-sm font-medium">{borrowing.bookTitle}</p>
                          <p className="text-xs text-muted-foreground">{borrowing.borrowerName} • {borrowing.borrowerType}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-blue-600">
                          Due: {new Date(borrowing.dueDate).toLocaleDateString()}
                        </p>
                        <Badge className={getStatusColor(borrowing.status)} variant="outline">
                          {borrowing.status}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Popular Books */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Popular Books
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {books.slice(0, 5).map((book, index) => (
                    <motion.div
                      key={book.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-medium">{book.title}</p>
                          <p className="text-sm text-muted-foreground">by {book.author}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className={`font-semibold ${getRatingColor(book.rating || 0)}`}>
                            {book.rating ? book.rating.toFixed(1) : 'N/A'}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Available: {book.availableCopies}/{book.totalCopies}</span>
                          <span>Borrowed: {book.borrowedCopies}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${(book.availableCopies / book.totalCopies) * 100}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{book.category}</span>
                          <span>{book.reviews || 0} reviews</span>
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

      {activeTab === "books" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Book Management</CardTitle>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search books..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Science">Science</SelectItem>
                      <SelectItem value="Literature">Literature</SelectItem>
                      <SelectItem value="Computer Science">Computer Science</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="borrowed">Borrowed</SelectItem>
                      <SelectItem value="reserved">Reserved</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Book
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Add New Book</DialogTitle>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-4">
                        <Input placeholder="ISBN" />
                        <Input placeholder="Title" />
                        <Input placeholder="Author" />
                        <Input placeholder="Publisher" />
                        <Input placeholder="Publication Year" type="number" />
                        <Input placeholder="Edition" />
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mathematics">Mathematics</SelectItem>
                            <SelectItem value="science">Science</SelectItem>
                            <SelectItem value="literature">Literature</SelectItem>
                            <SelectItem value="computer-science">Computer Science</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input placeholder="Subject" />
                        <Input placeholder="Language" />
                        <Input placeholder="Pages" type="number" />
                        <Input placeholder="Total Copies" type="number" />
                        <Input placeholder="Location" />
                        <Input placeholder="Shelf" />
                        <Input placeholder="Price" type="number" />
                        <Input placeholder="Date Added" type="date" />
                        <Textarea placeholder="Description" />
                        <Textarea placeholder="Tags (comma separated)" />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline">Cancel</Button>
                        <Button className="bg-gradient-to-r from-primary-500 to-primary-600">Add Book</Button>
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
                    <TableHead>Book</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Availability</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBooks.map((book, index) => (
                    <motion.tr
                      key={book.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-muted/50"
                    >
                      <TableCell>
                        <div>
                          <p className="font-medium">{book.title}</p>
                          <p className="text-sm text-muted-foreground">{book.isbn}</p>
                        </div>
                      </TableCell>
                      <TableCell>{book.author}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{book.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p className="font-semibold text-green-600">{book.availableCopies} available</p>
                          <p className="text-muted-foreground">{book.totalCopies} total copies</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className={`font-semibold ${getRatingColor(book.rating || 0)}`}>
                            {book.rating ? book.rating.toFixed(1) : 'N/A'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(book.status)}>
                          {book.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              setSelectedBook(book);
                              setShowBookModal(true);
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

      {activeTab === "borrowings" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Borrowing Management</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Borrowings
                  </Button>
                  <Button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    New Borrowing
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Book</TableHead>
                    <TableHead>Borrower</TableHead>
                    <TableHead>Borrow Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Fine</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {borrowings.map((borrowing, index) => (
                    <motion.tr
                      key={borrowing.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-muted/50"
                    >
                      <TableCell>
                        <div>
                          <p className="font-medium">{borrowing.bookTitle}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {borrowing.borrowerName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{borrowing.borrowerName}</p>
                            <p className="text-sm text-muted-foreground">{borrowing.borrowerType}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{new Date(borrowing.borrowDate).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(borrowing.dueDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(borrowing.status)}>
                          {borrowing.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {borrowing.fine ? (
                          <span className="text-red-600 font-semibold">${borrowing.fine.toFixed(2)}</span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
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

      {activeTab === "resources" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Digital Resources</CardTitle>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search resources..."
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
                      <SelectItem value="ebook">E-book</SelectItem>
                      <SelectItem value="audiobook">Audiobook</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="article">Article</SelectItem>
                      <SelectItem value="journal">Journal</SelectItem>
                      <SelectItem value="database">Database</SelectItem>
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
                  <Button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Resource
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Resource</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Access Level</TableHead>
                    <TableHead>Downloads</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredResources.map((resource, index) => (
                    <motion.tr
                      key={resource.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-muted/50"
                    >
                      <TableCell>
                        <div>
                          <p className="font-medium">{resource.title}</p>
                          <p className="text-sm text-muted-foreground">{resource.description}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getTypeColor(resource.type)}>
                          {resource.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{resource.author}</TableCell>
                      <TableCell>{resource.category}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusColor(resource.accessLevel)}>
                          {resource.accessLevel}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold">{resource.downloads}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(resource.status)}>
                          {resource.status}
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

      {activeTab === "analytics" && (
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
                    <p className="text-sm font-medium text-muted-foreground">Monthly Borrowings</p>
                    <p className="text-2xl font-bold">{libraryStats.monthlyBorrowings}</p>
                  </div>
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Popular Categories</p>
                    <p className="text-2xl font-bold">{libraryStats.popularCategories.length}</p>
                  </div>
                  <div className="p-3 rounded-full bg-green-100 text-green-600">
                    <Target className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Top Books</p>
                    <p className="text-2xl font-bold">{libraryStats.topBooks.length}</p>
                  </div>
                  <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                    <Star className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Popular Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {libraryStats.popularCategories.map((category, index) => (
                    <motion.div
                      key={category}
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
                          <p className="font-medium">{category}</p>
                          <p className="text-sm text-muted-foreground">Books in this category</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-blue-600">
                          {books.filter(b => b.category === category).length} books
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Top Books
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {libraryStats.topBooks.map((bookTitle, index) => {
                    const book = books.find(b => b.title === bookTitle);
                    return book ? (
                      <motion.div
                        key={book.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-medium">{book.title}</p>
                            <p className="text-sm text-muted-foreground">by {book.author}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className={`font-semibold ${getRatingColor(book.rating || 0)}`}>
                              {book.rating ? book.rating.toFixed(1) : 'N/A'}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>{book.category}</span>
                          <span>{book.reviews || 0} reviews</span>
                        </div>
                      </motion.div>
                    ) : null;
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      )}

      {/* Book Modal */}
      {selectedBook && (
        <BookModal book={selectedBook} />
      )}
    </div>
  );
}
