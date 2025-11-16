import { Search } from "lucide-react";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/institutions") return "Institutions";
    if (path === "/insurance") return "Insurance";
    if (path === "/visa-service") return "Visa Service";
    if (path === "/accommodation") return "Accommodation";
    return "Dashboard";
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <h1 className="text-2xl font-bold text-gray-900">{getPageTitle()}</h1>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="h-10 w-64 rounded-lg border border-gray-300 bg-white pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
