import { Link, useLocation, useNavigate } from "react-router-dom";
import { Building2, ShieldCheck, Plane, Home, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "../lib/toast";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const navItems = [
    { name: "Institutions", path: "/institutions", icon: Building2 },
    { name: "Insurance", path: "/insurance", icon: ShieldCheck },
    { name: "Visa & Travel", path: "/visa-service", icon: Plane },
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
    <div className="flex flex-col w-64 h-screen bg-[#435663] ">
      {/* bg-[#529A73]  */}
      {/* Logo Section */}
      <div className="flex items-center justify-center h-24 px-6 py-4">
        <img
          src="/student-pro-grayscale.png"
          alt="Student Pro Education"
          className="h-auto w-full object-contain grayscale"
        />
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all transform ${
                  active
                    ? "bg-[#4A5A6A] text-white shadow-md"
                    : "text-white/95 hover:bg-[#4A5A6A] hover:translate-x-1"
                }`}
            >
              <Icon className={`h-5 w-5 ${active ? "text-white" : "text-white/80"}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white hover:bg-red-600/10 transition-colors"
        >
          <LogOut className="w-5 h-5 text-white" />
          <span className="text-white">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
