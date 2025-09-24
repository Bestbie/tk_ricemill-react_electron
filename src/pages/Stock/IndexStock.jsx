import { useState } from "react";
import {
  FiEdit,
  FiTrash2,
  FiPlus,
  FiArrowLeft,
  FiInfo,
  FiArrowUpRight,
} from "react-icons/fi";
import { IoMdPrint } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
// import DeleteLot from "./DeleteLot";
// import PrinterLot from "./PrinterLot";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [showPrinter, setShowPrinter] = useState(false);
  const [selectedLot, setSelectedLot] = useState(null);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setShowDelete(true);
  };

  const handleConfirmDelete = () => {
    setLots((prev) => prev.filter((lot) => lot.id !== selectedId));
    setShowDelete(false);
  };

  const [search, setSearch] = useState({
    lot_number: "",
    supplier: "",
    variety: "",
    status: "",
  });

  const filteredLots = lots.filter((lot) => {
    return (
      lot.lot_number.toLowerCase().includes(search.lot_number.toLowerCase()) &&
      lot.supplier.toLowerCase().includes(search.supplier.toLowerCase()) &&
      lot.variety.toLowerCase().includes(search.variety.toLowerCase()) &&
      lot.status.toLowerCase().includes(search.status.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredLots.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLots = filteredLots.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearch((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  return (
    <div className="text-gray-900 bg-white min-h-screen p-4 rounded-[20px] shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold">รายการสต๊อก — Lot</h1>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/create_stock")}
            className="flex items-center gap-1 bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-full shadow cursor-pointer"
          >
            <FiPlus className="w-4 h-4" /> เพิ่ม
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-full shadow cursor-pointer"
          >
            <FiArrowLeft className="w-4 h-4" /> ย้อนกลับ
          </button>
        </div>
      </div>
      <hr className="border-b-1 border-gray-400 mb-4" />

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4 items-end">
        <input
          type="text"
          name="lot_number"
          placeholder="ค้นหาเลขที่ Lot"
          value={search.lot_number}
          onChange={handleSearchChange}
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          name="supplier"
          placeholder="ผู้ส่ง"
          value={search.supplier}
          onChange={handleSearchChange}
          className="border rounded px-3 py-2"
        />
        <select
          name="variety"
          value={search.variety}
          onChange={handleSearchChange}
          className="border rounded px-3 py-2"
        >
          <option value="">พันธุ์</option>
          <option value="กข43">กข43</option>
          <option value="กข31">กข31</option>
          <option value="หอมมะลิ">หอมมะลิ</option>
        </select>
        <select
          name="status"
          value={search.status}
          onChange={handleSearchChange}
          className="border rounded px-2 py-2 w-36 h-full"
        >
          <option value="">ทั้งหมด</option>
          <option value="เข้าแล้ว">เข้าแล้ว</option>
          <option value="รอเข้า">รอเข้า</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-md bg-gray-200 shadow-md rounded mb-2">
          <thead>
            <tr className="border-b">
              <th className="text-center p-5 px-5">เลขที่ Lot</th>
              <th className="text-center p-5 px-5">วันที่รับ</th>
              <th className="text-center p-5 px-5">ผู้ส่ง</th>
              <th className="text-center p-5 px-5">น้ำหนักรวม</th>
              <th className="text-center p-5 px-5">พันธุ์</th>
              <th className="text-center p-5 px-5">ความชื้น</th>
              <th className="text-center p-5 px-5">สถานะ</th>
              <th className="text-center p-5 px-5">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {paginatedLots.map((lot, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-100 bg-white cursor-pointer"
              >
                <td className="text-center p-5 px-5">{lot.lot_number}</td>
                <td className="text-center p-5 px-5">{lot.created_at}</td>
                <td className="text-center p-5 px-5">{lot.supplier}</td>
                <td className="text-center p-5 px-5">{lot.gross_weight}</td>
                <td className="text-center p-5 px-5">{lot.variety}</td>
                <td className="text-center p-5 px-5">{lot.moisture}</td>
                <td className="text-center p-1">
                  <span
                    className={`inline-block px-3 py-1 text-sm font-semibold ${
                      lot.status === "เข้าแล้ว"
                        ? "bg-green-100 text-green-800 rounded-full"
                        : lot.status === "รอเข้า"
                        ? "bg-yellow-100 text-yellow-800 rounded-full"
                        : ""
                    }`}
                  >
                    {lot.status}
                  </span>
                </td>
                <td className="text-center p-5 px-5 flex justify-center gap-1 flex-wrap">
                  <button
                    onClick={() => navigate(`/detail_stock/${lot.id}`)}
                    className="flex items-center gap-1 text-sm bg-gray-500 hover:bg-gray-700 text-white py-1 px-3 rounded-full cursor-pointer"
                  >
                    <FiInfo className="w-4 h-4" /> ข้อมูล
                  </button>
                  <button
                    onClick={() => navigate(`/edit_stock/${lot.id}`)}
                    className="flex items-center gap-1 text-sm bg-yellow-500 hover:bg-yellow-700 text-white py-1 px-3 rounded-full cursor-pointer"
                  >
                    <FiEdit className="w-4 h-4" /> แก้ไข
                  </button>
                  <button
                    onClick={() => handleDeleteClick(lot.id)}
                    className="flex items-center gap-1 text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded-full cursor-pointer"
                  >
                    <FiTrash2 className="w-4 h-4" /> ลบ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end gap-2 mb-4">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50 hover:bg-gray-400 cursor-pointer"
          >
            ก่อนหน้า
          </button>
          <span className="px-3 py-1 bg-gray-100 rounded">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50 hover:bg-gray-400 cursor-pointer"
          >
            ถัดไป
          </button>
        </div>
      </div>

      {/* Popup ลบ */}
      {showDelete && (
        <DeleteLot
          onClose={() => setShowDelete(false)}
          onConfirm={handleConfirmDelete}
        />
      )}

      {/* Popup พิมพ์ */}
      {showPrinter && (
        <PrinterLot data={selectedLot} onClose={() => setShowPrinter(false)} />
      )}

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default IndexStock;
