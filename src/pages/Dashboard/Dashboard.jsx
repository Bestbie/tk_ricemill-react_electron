import { useState, useEffect } from "react";
import {
  FaArrowDown,
  FaArrowUp,
  FaBalanceScale,
  FaBoxes,
} from "react-icons/fa";
import { MdAttachMoney, MdStorage } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const Dashboard = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState([]);
  const [dailyTrend, setDailyTrend] = useState([]);
  const [saleData, setSaleData] = useState([]);
  const [purchaseData, setPurchaseData] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setDashboardData([
        {
          title: "รายการซื้อ",
          quantity: "3,000 kg",
          icon: FaArrowDown,
          color: "text-green-500",
          link: "/purchase",
          badge: "+300 kg วันนี้",
        },
        {
          title: "รายการขาย",
          quantity: "2,500 kg",
          icon: FaArrowUp,
          color: "text-red-500",
          link: "/sale",
          badge: "+200 kg วันนี้",
        },
        {
          title: "ใบสั่งชั่ง",
          quantity: "1,500 kg",
          icon: FaBalanceScale,
          color: "text-blue-500",
          link: "/weigh_ticket",
          badge: "ใหม่ 3 ใบ",
        },
        {
          title: "อุปกรณ์",
          quantity: "500 ชิ้น",
          icon: FaBoxes,
          color: "text-orange-500",
          link: "/equipment",
          badge: "เหลือไม่เยอะ",
        },
        {
          title: "การเงิน",
          quantity: "100,000 บาท",
          icon: MdAttachMoney,
          color: "text-yellow-500",
          link: "/finance",
          badge: "+1,000 วันนี้",
        },
        {
          title: "สต๊อก (Lot)",
          quantity: "100,000 กก.",
          icon: MdStorage,
          color: "text-purple-500",
          link: "/stock",
          badge: "+1,000 กก. วันนี้",
        },
      ]);

      setDailyTrend([
        { day: "จันทร์", buy: 500, sell: 400 },
        { day: "อังคาร", buy: 600, sell: 500 },
        { day: "พุธ", buy: 700, sell: 600 },
        { day: "พฤหัส", buy: 800, sell: 700 },
        { day: "ศุกร์", buy: 900, sell: 800 },
        { day: "เสาร์", buy: 400, sell: 300 },
        { day: "อาทิตย์", buy: 300, sell: 250 },
      ]);

      // mock รายการขาย
      setSaleData([
        {
          id: 1,
          customer: "ชาญชัย",
          product: "ข้าวหอมมะลิ",
          qty: "500 kg",
          price: "10,000 บาท",
        },
        {
          id: 2,
          customer: "ศิริพร",
          product: "ข้าวกล้อง",
          qty: "300 kg",
          price: "6,000 บาท",
        },
        {
          id: 3,
          customer: "อนันต์",
          product: "ปลายข้าว",
          qty: "200 kg",
          price: "3,000 บาท",
        },
      ]);

      // mock รายการซื้อ
      setPurchaseData([
        {
          id: 1,
          supplier: "วิชัย",
          product: "ข้าวเปลือก",
          qty: "600 kg",
          cost: "9,000 บาท",
        },
        {
          id: 2,
          supplier: "สมศรี",
          product: "ข้าวเปลือก",
          qty: "400 kg",
          cost: "6,000 บาท",
        },
        {
          id: 3,
          supplier: "สมชาย",
          product: "ข้าวเปลือก",
          qty: "500 kg",
          cost: "7,500 บาท",
        },
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  if (loading)
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold animate-pulse bg-gray-300 h-10 w-64 rounded"></h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="bg-gray-200 h-32 rounded animate-pulse"
              ></div>
            ))}
        </div>
      </div>
    );

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard โรงสีข้าว</h1>
      </div>

      <hr />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {dashboardData.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              onClick={() => item.link && navigate(item.link)}
              className="bg-white p-6 rounded shadow flex flex-col justify-between cursor-pointer hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2
                    className={`text-lg font-semibold ${
                      item.link
                        ? "text-blue-600 underline hover:text-blue-800"
                        : ""
                    }`}
                  >
                    {item.title}
                  </h2>
                  <p className="text-2xl font-bold mt-2">
                    <span className="text-sm text-gray-500 mr-1">รวม:</span>
                    {item.quantity}
                  </p>
                </div>
                <Icon className={`${item.color} text-3xl`} />
              </div>
              {item.badge && (
                <span className="mt-2 inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                  {item.badge}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* ตารางขาย / ตารางซื้อ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ตารางขาย */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">ตารางสรุปรายการขาย</h2>
          <hr className="w-100% h-4" />
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-base md:text-lg font-bold uppercase bg-gray-100 text-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    ลูกค้า
                  </th>
                  <th scope="col" className="px-6 py-4">
                    สินค้า
                  </th>
                  <th scope="col" className="px-6 py-4">
                    จำนวน
                  </th>
                  <th scope="col" className="px-6 py-4">
                    ราคา
                  </th>
                </tr>
              </thead>
              <tbody>
                {saleData.map((row) => (
                  <tr
                    key={row.id}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {row.customer}
                    </th>
                    <td className="px-6 py-4">{row.product}</td>
                    <td className="px-6 py-4">{row.qty}</td>
                    <td className="px-6 py-4">{row.price}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="font-semibold text-gray-900">
                  <th scope="row" className="px-6 py-3 text-base">
                    รวม
                  </th>
                  <td className="px-6 py-3"></td>
                  <td className="px-6 py-3">
                    {saleData.reduce((sum, r) => sum + parseInt(r.qty), 0)} kg
                  </td>
                  <td className="px-6 py-3">
                    {/* สมมุติว่าตัดคำว่า "บาท" ออกก่อนแล้ว parseInt */}
                    {saleData
                      .reduce((sum, r) => sum + parseInt(r.price), 0)
                      .toLocaleString()}{" "}
                    บาท
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* ตารางซื้อ */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">ตารางสรุปรายการซื้อ</h2>
          <hr className="w-100% h-4" />
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-base md:text-lg font-bold uppercase bg-gray-100 text-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    ผู้ขาย
                  </th>
                  <th scope="col" className="px-6 py-4">
                    สินค้า
                  </th>
                  <th scope="col" className="px-6 py-4">
                    จำนวน
                  </th>
                  <th scope="col" className="px-6 py-4">
                    ต้นทุน
                  </th>
                </tr>
              </thead>
              <tbody>
                {purchaseData.map((row) => (
                  <tr
                    key={row.id}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {row.supplier}
                    </th>
                    <td className="px-6 py-4">{row.product}</td>
                    <td className="px-6 py-4">{row.qty}</td>
                    <td className="px-6 py-4">{row.cost}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="font-semibold text-gray-900">
                  <th scope="row" className="px-6 py-3 text-base">
                    รวม
                  </th>
                  <td className="px-6 py-3"></td>
                  <td className="px-6 py-3">
                    {purchaseData.reduce((sum, r) => sum + parseInt(r.qty), 0)}{" "}
                    kg
                  </td>
                  <td className="px-6 py-3">
                    {purchaseData
                      .reduce((sum, r) => sum + parseInt(r.cost), 0)
                      .toLocaleString()}{" "}
                    บาท
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>

      {/* Daily Buy/Sell Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* กราฟรายวัน */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">ยอดซื้อ-ขายรายวัน</h2>
          <hr className="w-100% h-4" />
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={dailyTrend}
              margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
            >
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="buy" fill="#0088FE" name="ซื้อ" />
              <Bar dataKey="sell" fill="#FF8042" name="ขาย" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* กราฟรายสัปดาห์ */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">ยอดซื้อ-ขายรายสัปดาห์</h2>
          <hr className="w-100% h-4" />
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={[
                { week: "สัปดาห์ที่ 1", buy: 3500, sell: 3000 },
                { week: "สัปดาห์ที่ 2", buy: 4000, sell: 3800 },
                { week: "สัปดาห์ที่ 3", buy: 4200, sell: 3900 },
                { week: "สัปดาห์ที่ 4", buy: 4500, sell: 4100 },
              ]}
              margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
            >
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="buy" fill="#00C49F" name="ซื้อ" />
              <Bar dataKey="sell" fill="#FFBB28" name="ขาย" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
