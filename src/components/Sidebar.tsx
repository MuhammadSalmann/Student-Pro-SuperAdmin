import { Link, useLocation, useNavigate } from "react-router-dom";
import { Building2, Shield, Plane, Home, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "../lib/toast";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const navItems = [
    { name: "Institutions", path: "/institutions", icon: Building2 },
    { name: "Insurance", path: "/insurance", icon: Shield },
    { name: "Visa Service", path: "/visa-service", icon: Plane },
    { name: "Accommodation", path: "/accommodation", icon: Home },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  return (
    <div className="flex h-screen w-64 flex-col border-r border-gray-200 bg-white">
      {/* Logo Section */}
      <div className="flex h-16 items-center justify-center border-b border-gray-200 px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-green-500">
            <span className="text-xl font-bold text-white">SP</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-900">Student Pro</span>
            <span className="text-xs text-gray-500">Education</span>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                active
                  ? "bg-gradient-to-r from-blue-50 to-green-50 text-blue-700"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Icon className={`h-5 w-5 ${active ? "text-blue-600" : "text-gray-500"}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-gray-200 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition-all hover:bg-red-50"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
