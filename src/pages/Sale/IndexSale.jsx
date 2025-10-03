import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { GiMoneyStack } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const IndexSale = () => {
  const initialSales = [
    {
      id: 3,
      created_at: "18-05-2568",
      s_number: "S210056967",
      w_number: "D680917024",
      tex_number: "1 23 4 56789",
      buyer_seller: "นางแดง",
      created_by: "นาย ก",
      status: "ส่งแล้ว",
      address: "address3",
    },
    {
      id: 4,
      created_at: "20-05-2568",
      s_number: "S210056968",
      w_number: "D680917025",
      tex_number: "3 45 6 78901",
      buyer_seller: "นายดำ",
      created_by: "นาง ข",
      status: "ยกเลิก",
      address: "address4",
    },
  ];

  const [sales] = useState(initialSales);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredSales = sales.filter(
    (s) =>
      s.s_number.toLowerCase().includes(search.toLowerCase()) ||
      s.buyer_seller.toLowerCase().includes(search.toLowerCase())
  );

  // summary
  const total = sales.length;
  const sent = sales.filter((s) => s.status === "ส่งแล้ว").length;
  const canceled = sales.filter((s) => s.status === "ยกเลิก").length;

  return (
    <div className="flex gap-6 p-4">
      {/* Left: Sale List */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">รายการใบสั่งขาย</h1>
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-full shadow cursor-pointer"
          >
            <FiArrowLeft /> ย้อนกลับ
          </button>
        </div>

<hr />
        {/* Search */}
        <input
          type="text"
          placeholder="ค้นหาใบสั่งขายหรือลูกค้า..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-[500px] border px-4 py-3 rounded-lg mb-4 text-lg mt-4"
        />

        {/* Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredSales.map((s) => (
            <div
              key={s.id}
              className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition p-4 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg font-bold">{s.s_number}</h2>
                <p className="text-sm text-gray-500">วันที่: {s.created_at}</p>
                <p>ใบชั่ง: {s.w_number}</p>
                <p>เลขภาษี: {s.tex_number}</p>
                <p>ลูกค้า: {s.buyer_seller}</p>
                <p>ผู้ชั่ง: {s.created_by}</p>
                <p>ที่อยู่: {s.address}</p>
              </div>

              <div className="mt-2">
                <span
                  className={`inline-block px-3 py-1 text-sm font-semibold rounded-full
                    ${
                      s.status === "ส่งแล้ว"
                        ? "bg-green-100 text-green-800"
                        : s.status === "ยกเลิก"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                >
                  {s.status}
                </span>
              </div>

              {/* Action */}
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => navigate(`/detail_sale/${s.id}`)}
                  className="flex items-center gap-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full cursor-pointer"
                >
                  <GiMoneyStack /> ขาย
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Summary */}
      <div className="h-110 w-80 bg-white border border-gray-200 p-4 rounded-xl shadow-lg hover:shadow-xl transition">
        <h3 className="text-xl font-bold mb-2">สรุปการขาย</h3>
        <p className="text-lg">ทั้งหมด: {total} รายการ</p>
        <p className="text-lg text-green-700">ส่งแล้ว: {sent}</p>
        <p className="text-lg text-red-700">ยกเลิก: {canceled}</p>
      </div>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default IndexSale;
