import { useState } from "react";
import { FiEdit, FiTrash2, FiArrowLeft, FiInfo } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const IndexStock = () => {
  const initialLots = [
    {
      id: 1,
      lot_number: "LOT-20250922-001",
      created_at: "2025-08-22",
      supplier: "นายดำ",
      gross_weight: "10,000",
      variety: "กข43",
      moisture: "13.5%",
      status: "เข้าแล้ว",
    },
    {
      id: 2,
      lot_number: "LOT-20250922-002",
      created_at: "2025-08-23",
      supplier: "นางแดง",
      gross_weight: "5,500",
      variety: "กข31",
      moisture: "12.8%",
      status: "รอเข้า",
    },
    {
      id: 3,
      lot_number: "LOT-20250922-003",
      created_at: "2025-08-24",
      supplier: "นายเขียว",
      gross_weight: "8,750",
      variety: "หอมมะลิ",
      moisture: "14%",
      status: "รอเข้า",
    },
    {
      id: 4,
      lot_number: "LOT-20250922-004",
      created_at: "2025-08-25",
      supplier: "นางฟ้า",
      gross_weight: "12,300",
      variety: "กข43",
      moisture: "13%",
      status: "เข้าแล้ว",
    },
  ];

  const [lots, setLots] = useState(initialLots);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredLots = lots.filter(
    (lot) =>
      lot.lot_number.toLowerCase().includes(search.toLowerCase()) ||
      lot.supplier.toLowerCase().includes(search.toLowerCase()) ||
      lot.variety.toLowerCase().includes(search.toLowerCase())
  );

  // summary
  const total = lots.length;
  const inStock = lots.filter((lot) => lot.status === "เข้าแล้ว").length;
  const waiting = lots.filter((lot) => lot.status === "รอเข้า").length;

  const handleDelete = (id) => {
    setLots((prev) => prev.filter((lot) => lot.id !== id));
  };

  return (
    <div className="flex gap-6 p-4">
      {/* Left: list */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">รายการสต๊อก (Lot)</h1>
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
          placeholder="ค้นหาเลข Lot, ผู้ส่ง หรือพันธุ์ข้าว..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-[500px] border px-4 py-3 rounded-lg mb-4 text-lg mt-4"
        />

        {/* Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredLots.map((lot) => (
            <div
              key={lot.id}
              className="bg-white border border-gray-200 shadow-lg rounded-xl hover:shadow-xl transition p-4 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg font-bold">{lot.lot_number}</h2>
                <p className="text-sm text-gray-500">
                  วันที่: {lot.created_at}
                </p>
                <p>ผู้ส่ง: {lot.supplier}</p>
                <p>พันธุ์: {lot.variety}</p>
                <p>น้ำหนักรวม: {lot.gross_weight} กก.</p>
                <p>ความชื้น: {lot.moisture}</p>
              </div>

              <div className="mt-2">
                <span
                  className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                    lot.status === "เข้าแล้ว"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {lot.status}
                </span>
              </div>

              {/* Action */}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => navigate(`/detail_stock/${lot.id}`)}
                  className="flex items-center gap-1 px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-full cursor-pointer"
                >
                  <FiInfo /> ข้อมูล
                </button>
                <button
                  onClick={() => navigate(`/edit_stock/${lot.id}`)}
                  className="flex items-center gap-1 px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full cursor-pointer"
                >
                  <FiEdit /> แก้ไข
                </button>
                <button
                  onClick={() => handleDelete(lot.id)}
                  className="flex items-center gap-1 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full cursor-pointer"
                >
                  <FiTrash2 /> ลบ
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Summary */}
      <div className="h-103 w-80 bg-white border border-gray-200 p-4 rounded-xl shadow-lg hover:shadow-xl transition">
        <h3 className="text-xl font-bold mb-2">สรุปสต๊อก</h3>
        <p className="text-lg">ทั้งหมด: {total} Lot</p>
        <p className="text-lg text-green-700">เข้าแล้ว: {inStock}</p>
        <p className="text-lg text-yellow-700">รอเข้า: {waiting}</p>
      </div>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default IndexStock;
