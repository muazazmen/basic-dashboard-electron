import { useNavigate } from "react-router-dom";

type HeaderProps = {
  onLogout: () => void;
};

export default function Header({ onLogout }: HeaderProps) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    onLogout();
    navigate("/login");
  };
  return (
    <header className="bg-black border-b border-gray-200 shadow-sm">
      <div className="mx-auto px-4">
        <div className="w-full flex justify-between items-center h-16">
          {/* Left section: title */}
          <div className="flex items-center">
            <h1 className="text-xl text-gray-300">Dashboard</h1>
          </div>

          {/* Right section: nav */}
          <nav className="flex items-center space-x-4">
            <button
              onClick={handleLogout}
              className="text-gray-300 hover:text-gray-200 cursor-pointer px-4 py-2 rounded text-sm">
              Sign Out
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
