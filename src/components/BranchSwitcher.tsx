import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Building, 
  MapPin, 
  Phone, 
  Check, 
  ChevronDown,
  Loader2,
  Users,
  School,
  Star,
  Award,
  Globe
} from "lucide-react";

export default function BranchSwitcher() {
  const { branch, branches, switchBranch, isLoading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleBranchSwitch = async (branchId: string) => {
    if (branchId === branch?.id) return;
    
    const success = await switchBranch(branchId);
    if (success) {
      setIsOpen(false);
    }
  };

  if (!branch) return null;

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full justify-between h-auto p-3 hover:bg-muted/50"
        disabled={isLoading}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
            <Building className="h-4 w-4" />
          </div>
          <div className="text-left">
            <p className="font-medium text-sm">{branch.name}</p>
            <p className="text-xs text-muted-foreground">{branch.city}, {branch.state}</p>
          </div>
        </div>
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        )}
      </Button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto"
        >
          <div className="p-2">
            <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Available Branches
            </div>
            {branches.map((branchOption) => (
              <motion.button
                key={branchOption.id}
                onClick={() => handleBranchSwitch(branchOption.id)}
                className={`w-full text-left p-3 rounded-lg hover:bg-muted/50 transition-colors ${
                  branchOption.id === branch.id ? 'bg-blue-50 border border-blue-200' : ''
                }`}
                disabled={isLoading}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    branchOption.id === branch.id 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    <Building className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm truncate">{branchOption.name}</p>
                      {branchOption.id === branch.id && (
                        <Check className="h-4 w-4 text-blue-600 flex-shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate">{branchOption.address}, {branchOption.city}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <Phone className="h-3 w-3" />
                      <span>{branchOption.phone}</span>
                    </div>
                  </div>
                </div>
                
                {/* Branch Stats */}
                <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>1,250 students</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <School className="h-3 w-3" />
                    <span>85 teachers</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    <span>4.8 rating</span>
                  </div>
                </div>

                {/* Branch Features */}
                <div className="mt-2 flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                    <Award className="h-3 w-3 mr-1" />
                    Excellence Award
                  </Badge>
                  <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
                    <Globe className="h-3 w-3 mr-1" />
                    International
                  </Badge>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
