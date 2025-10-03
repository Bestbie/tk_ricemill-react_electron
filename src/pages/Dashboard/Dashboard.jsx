import { useEffect, useState } from "react";
import {
  FaArrowDown,
  FaArrowUp,
  FaBalanceScale,
} from "react-icons/fa";
import { MdAttachMoney, MdStorage } from "react-icons/md";
import { GiReceiveMoney, GiPayMoney } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState([]);

  const dashboard_Data = [
    {
      title: "ใบชั่งน้ำหนัก",
      icon: FaBalanceScale,
      color: "from-blue-500 to-blue-600",
      link: "/weigh_ticket",
    },
    {
      title: "ซื้อ",
      icon: FaArrowDown,
      color: "from-green-500 to-green-600",
      link: "/purchase",
    },
    {
      title: "ขาย",
      icon: FaArrowUp,
      color: "from-red-500 to-red-600",
      link: "/sale",
    },
    {
      title: "การเงิน",
      icon: MdAttachMoney,
      color: "from-yellow-400 to-yellow-500",
      link: "/finance",
    },
    {
      title: "เจ้าหนี้",
      icon: GiReceiveMoney,
      color: "from-orange-500 to-orange-600",
      link: "/creditor",
    },
    {
      title: "ลูกหนี้",
      icon: GiPayMoney,
      color: "from-pink-500 to-pink-600",
      link: "/debtor",
    },
    {
      title: "สต๊อก (Lot)",
      icon: MdStorage,
      color: "from-purple-500 to-purple-600",
      link: "/stock",
    },
  ];

  useEffect(() => {
    setDashboardData(dashboard_Data);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-xl">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
        Dashboard โรงสี
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {dashboardData.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              onClick={() => item.link && navigate(item.link)}
              className={`cursor-pointer rounded-2xl shadow-lg 
                bg-gradient-to-br ${item.color} text-white 
                flex flex-col items-center justify-center p-8 
                transform hover:scale-105 hover:shadow-2xl 
                transition duration-300 ease-out`}
            >
              <Icon className="text-6xl mb-4 drop-shadow-lg" />
              <h2 className="text-2xl font-bold">{item.title}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
