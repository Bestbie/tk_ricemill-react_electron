import React, { useState } from "react";
import { Bell, Menu as MenuIcon, LogOut } from "lucide-react";
import logo from "../../assets/logo-fav.png";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  // สมมุติว่ามีแจ้งเตือนมาจาก backend หรือ state
  const [notifications] = useState([
    { id: 1, text: "มีใบสั่งซื้อใหม่ 2 รายการ", type: "purchase" },
    { id: 2, text: "Lot ข้าวสารเหลือน้อย", type: "stock" },
    { id: 3, text: "มีผู้ใช้งานใหม่สมัครเข้า", type: "user" },
  ]);

  const handleLogout = () => {
    toast.success("ออกจากระบบสำเร็จ!");
    navigate("/login");
    setDropdownOpen(false);
  };

  return (
    <nav className="bg-green-400 text-black px-6 py-3 flex items-center justify-between border-b relative">
      {/* Left: Hamburger + Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 rounded hover:bg-gray-200"
        >
          <MenuIcon className="h-6 w-6" />
        </button>

        <div
          onClick={() => navigate("/dashboard")}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <img src={logo} alt="logo" className="h-12 w-12" />
          <span className="text-black font-bold text-2xl">TK Rice</span>
        </div>
      </div>

      {/* Right: Notifications + Profile */}
      <div className="flex items-center gap-6 relative">
        {/* Notifications */}
        <div className="relative">
          <div
            className="relative cursor-pointer"
            onClick={() => setNotifOpen(!notifOpen)}
          >
            <Bell className="h-6 w-6 text-gray-600 hover:text-black" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {notifications.length}
              </span>
            )}
          </div>

          {notifOpen && (
            <ul className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg z-50 max-h-80 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((n) => {
                  let bgColor = "";
                  let Icon = null;

                  switch (n.type) {
                    case "purchase":
                      bgColor = "bg-blue-100 text-blue-800";
                      break;
                    case "stock":
                      bgColor = "bg-orange-100 text-orange-800";
                      break;
                    case "user":
                      bgColor = "bg-green-100 text-green-800";
                      break;
                    default:
                      bgColor = "bg-gray-100 text-gray-800";
                  }
                  return (
                    <li
                      key={n.id}
                      className={`px-4 py-3 mb-1 cursor-pointer text-base ${bgColor} hover:bg-opacity-80`}
                    >
                      {n.text}
                    </li>
                  );
                })
              ) : (
                <li className="px-4 py-3 text-gray-500 text-base">
                  ไม่มีการแจ้งเตือน
                </li>
              )}
            </ul>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <img
            src="https://i.pravatar.cc/40"
            alt="user avatar"
            className="h-9 w-9 rounded-full border-2 border-gray-300 cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />

          {/* Dropdown */}
          {dropdownOpen && (
            <ul className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
              <li
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" /> ออกจากระบบ
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
