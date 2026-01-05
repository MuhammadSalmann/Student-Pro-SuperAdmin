import { Link, useLocation, useNavigate } from "react-router-dom";
import { Building2, ShieldCheck, Plane, LogOut, Plus, Minus, X, MessageSquare, GraduationCap } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "../lib/toast";
import { FILTER_COUNTRIES, getCountryCode } from "../utils/helpers";
import { useState, useEffect } from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showCountries, setShowCountries] = useState(false);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const navItems = [
    { name: "Institutions", path: "/institutions", icon: Building2 },
    { name: "Insurance", path: "/insurance", icon: ShieldCheck },
    { name: "Visa & Travel", path: "/visa-service", icon: Plane },
    // { name: "Accommodation", path: "/accommodation", icon: Home },
    { name: "Skill Assessment", path: "/skill-assessment", icon: GraduationCap },
    { name: "PopUp", path: "/popup", icon: MessageSquare },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isOnInstitutionsPage = location.pathname === "/institutions";

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch {
      toast.error("Failed to logout");
    }
  };

  const handleCountryClick = (country: string) => {
    // Navigate to institutions page with country filter
    navigate(`/institutions?country=${encodeURIComponent(country)}`);
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static
        flex flex-col w-64 h-screen bg-[#0A1F38] overflow-y-auto
        z-50 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Custom Scrollbar Styles */}
        <style>{`
        .countries-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .countries-scroll::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }
        .countries-scroll::-webkit-scrollbar-thumb {
          background: rgba(171, 219, 192, 0.3);
          border-radius: 3px;
        }
        .countries-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(171, 219, 192, 0.5);
        }
      `}</style>

      {/* Close button for mobile */}
      <button
        onClick={onClose}
        className="absolute p-2 text-white transition-colors rounded-lg lg:hidden top-4 right-4 hover:bg-white/10"
        aria-label="Close menu"
      >
        <X size={24} />
      </button>

      {/* Logo Section */}
      <div className="flex items-center justify-center px-6 pt-8 pb-6">
        <img
          src="/studentpro white.png"
          alt="Student Pro Education"
          className="object-contain w-full h-auto grayscale"
        />
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          const isInstitutions = item.path === "/institutions";

          return (
            <div key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-1xl font-medium transition-all transform ${active
                  ? "bg-[#ABDBC0] text-[#0A1F38] shadow-md" // active color
                  : "text-white hover:bg-[#ABDBC0] hover:translate-x-1"
                  }`}
              >
                <Icon className={`h-5 w-5 ${active ? "text-[#0A1F38]" : "text-white/80"}`} />
                <span>{item.name}</span>
              </Link>

              {/* By Countries Section - Only show when on Institutions page */}
              {isInstitutions && isOnInstitutionsPage && (
                <div className="mt-1 ml-3">
                  <button
                    onClick={() => setShowCountries(!showCountries)}
                    className="flex items-center w-full gap-2 px-3 py-2 pb-2 text-sm font-medium transition-colors border-b rounded-lg text-white/80 hover:text-white hover:bg-white/10 border-white/10"
                  >
                    {showCountries ? (
                      <Minus className="h-3.5 w-3.5" />
                    ) : (
                      <Plus className="h-3.5 w-3.5" />
                    )}
                    <span>By Countries</span>
                  </button>

                  {/* Countries List */}
                  {showCountries && (
                    <div className="mt-2 ml-6 space-y-0.5 max-h-96 overflow-y-auto countries-scroll pr-2">
                      {FILTER_COUNTRIES.map((country) => {
                        const countryCode = getCountryCode(country);
                        return (
                          <button
                            key={country}
                            onClick={() => handleCountryClick(country)}
                            className="flex items-center gap-2 w-full px-3 py-1.5 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors"
                            title={country}
                          >
                            {countryCode.length === 2 && (
                              <img
                                src={`https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`}
                                srcSet={`https://flagcdn.com/w40/${countryCode.toLowerCase()}.png 2x`}
                                width="16"
                                height="12"
                                alt={country}
                                className="object-contain"
                                loading="lazy"
                              />
                            )}
                            <span className="truncate">{country}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </nav>
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white hover:bg-[#ABDBC0] transition-colors"
        >
          <LogOut className="w-5 h-5 text-white" />
          <span className="text-white">Logout</span>
        </button>
      </div>
    </div>
    </>
  );
};

export default Sidebar;
