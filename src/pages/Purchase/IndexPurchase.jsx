import { useState } from "react";
import { FiArrowLeft, FiPlus } from "react-icons/fi";
import { GiTakeMyMoney } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const IndexPurchase = () => {
  const initialPurchases = [
    {
      id: 1,
      created_at: "18-05-2568",
      p_number: "M210056965",
      w_number: "D680917009",
      buyer_seller: "นายดำ",
      status: "จ่ายแล้ว",
      address: "address1",
    },
    {
      id: 2,
      created_at: "18-08-2568",
      p_number: "M210056966",
      w_number: "D680917010",
      buyer_seller: "นางแดง",
      status: "รอการอนุมัติ",
      address: "address2",
    },
  ];

  const [purchases] = useState(initialPurchases);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // filter
  const filteredPurchases = purchases.filter(
    (p) =>
      p.p_number.toLowerCase().includes(search.toLowerCase()) ||
      p.buyer_seller.toLowerCase().includes(search.toLowerCase())
  );

  // summary
  const total = purchases.length;
  const paid = purchases.filter((p) => p.status === "จ่ายแล้ว").length;
  const waiting = purchases.filter((p) => p.status === "รอการอนุมัติ").length;

  return (
    <div className="flex gap-6 p-4">
      {/* Left: list */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">รายการใบสั่งซื้อ</h1>
          <div className="flex gap-2">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-full shadow cursor-pointer"
            >
              <FiArrowLeft /> ย้อนกลับ
            </button>
          </div>
        </div>
        <hr />
        {/* Search bar */}
        <input
          type="text"
          placeholder="ค้นหาใบสั่งซื้อหรือชื่อผู้ขาย..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-[500px] border px-4 py-3 rounded-lg mb-4 text-lg mt-4"
        />

        {/* Card layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredPurchases.map((p) => (
            <div
              key={p.id}
              className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition p-4 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg font-bold">{p.p_number}</h2>
                <p className="text-sm text-gray-500">วันที่: {p.created_at}</p>
                <p>เลขที่ใบชั่ง: {p.w_number}</p>
                <p>ผู้ขาย: {p.buyer_seller}</p>
                <p>ที่อยู่: {p.address}</p>
              </div>

              <div className="mt-2">
                <span
                  className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                    p.status === "จ่ายแล้ว"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {p.status}
                </span>
              </div>

              {/* Action */}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => navigate(`/detail_purchase/${p.id}`)}
                  className="flex items-center gap-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full cursor-pointer"
                >
                  <GiTakeMyMoney /> ซื้อ
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: summary */}
      <div className="h-103 w-80 bg-white bg-gray-200 p-4 rounded-xl shadow-lg hover:shadow-xl transition">
        <h3 className="text-xl font-bold mb-2">สรุปใบสั่งซื้อ</h3>
        <p className="text-lg">ทั้งหมด: {total} รายการ</p>
        <p className="text-lg text-green-700">จ่ายแล้ว: {paid}</p>
        <p className="text-lg text-yellow-700">รอการอนุมัติ: {waiting}</p>
      </div>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default IndexPurchase;
