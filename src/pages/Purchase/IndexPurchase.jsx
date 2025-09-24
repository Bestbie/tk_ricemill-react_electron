import { useState } from "react";
import {
  FiEdit,
  FiTrash2,
  FiPlus,
  FiRotateCw,
  FiInfo,
  FiArrowLeft,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import DeletePurchase from "./DeletePurchase";
import { Toaster } from "react-hot-toast";

const IndexPurchase = () => {
  const initialPurchases = [
    {
      id: 1,
      p_number: "P-25-000123",
      created_at: "2025-08-22 11:18",
      seller: "นายดำ",
      rice_type: "ข้าวหอมมะลิ",
      quantity: "12,000 กก.",
      price: "1,000",
      payment_method: "เงินสด",
      created_by: "นาก ก",
      status: "ฉบับร่าง",
    },
    {
      id: 2,
      p_number: "P-25-000124",
      created_at: "2025-08-23 09:45",
      seller: "นายแดง",
      rice_type: "ข้าวขาว",
      quantity: "8,500 กก.",
      price: "850",
      payment_method: "โอนเงิน",
      created_by: "นาก ข",
      status: "รับเข้าแล้ว",
    },
    {
      id: 3,
      p_number: "P-25-000125",
      created_at: "2025-08-24 14:10",
      seller: "นางสาวเขียว",
      rice_type: "ข้าวกล้อง",
      quantity: "5,200 กก.",
      price: "520",
      payment_method: "เครดิต",
      created_by: "นาก ค",
      status: "ชำระเงินแล้ว",
    },
    {
      id: 4,
      p_number: "P-25-000126",
      created_at: "2025-08-25 10:30",
      seller: "นายฟ้า",
      rice_type: "ข้าวหอมมะลิ",
      quantity: "7,800 กก.",
      price: "780",
      payment_method: "เงินสด",
      created_by: "นาก ง",
      status: "ฉบับร่าง",
    },
  ];

  const [purchases, setPurchases] = useState(initialPurchases);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setShowDelete(true);
  };

  const handleConfirmDelete = () => {
    setPurchases((prev) => prev.filter((item) => item.id !== selectedId));
    setShowDelete(false);
  };

  const [search, setSearch] = useState({
    p_number: "",
    seller: "",
    status: "",
  });

  const filteredPurchases = purchases.filter((item) => {
    return (
      item.p_number.toLowerCase().includes(search.p_number.toLowerCase()) &&
      item.seller.toLowerCase().includes(search.seller.toLowerCase()) &&
      item.status.toLowerCase().includes(search.status.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredPurchases.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPurchases = filteredPurchases.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearch((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1); // กลับไปหน้าที่ 1 เวลา search
  };

  return (
    <div className="text-gray-900 bg-white min-h-screen p-4 rounded-[20px] shadow-lg">
      {/* หัวข้อ + ปุ่มเพิ่ม */}
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold">รายการใบสั่งซื้อ</h1>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/create_purchase")}
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
      {/* ช่องค้นหา */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4 items-end">
        <input
          type="text"
          name="p_number"
          placeholder="ค้นหาเลขที่ใบสั่งซื้อ"
          value={search.p_number}
          onChange={handleSearchChange}
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          name="seller"
          placeholder="ค้นหาผู้ขาย"
          value={search.seller}
          onChange={handleSearchChange}
          className="border rounded px-3 py-2"
        />
          <select
            name="status"
            value={search.status}
            onChange={handleSearchChange}
            className="border rounded px-2 py-2 w-36 h-full"
          >
            <option value="">ทั้งหมด</option>
            <option value="ฉบับร่าง">ฉบับร่าง</option>
            <option value="รับเข้าแล้ว">รับเข้าแล้ว</option>
            <option value="ชำระเงินแล้ว">ชำระเงินแล้ว</option>
            <option value="เสร็จสิ้น">เสร็จสิ้น</option>
            <option value="ยกเลิก">ยกเลิก</option>
          </select>
          {/* <button
            type="button"
            onClick={() =>
              setSearch({ p_number: "", seller: "", status: "" })
            }
            className="bg-blue-300 hover:bg-blue-400 text-blue-700 px-4 py-2 rounded shadow flex items-center gap-1 h-full rounded-full cursor-pointer"
          >
            <FiRotateCw className="w-4 h-4" />
            รีเซต
          </button> */}
      </div>
      {/* ตาราง */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-md bg-gray-200 shadow-md rounded mb-2">
          <thead>
            <tr className="border-b">
              <th className="text-center p-5 px-5">เลขที่ใบสั่งซื้อ</th>
              <th className="text-center p-5 px-5">ผู้ขาย</th>
              <th className="text-center p-5 px-5">ประเภทข้าว</th>
              <th className="text-center p-5 px-5">จำนวน(กก.)</th>
              <th className="text-center p-5 px-5">ราคา/กิโลกรัม</th>
              <th className="text-center p-5 px-5">วิธีชำระเงิน</th>
              <th className="text-center p-5 px-5">สถานะ</th>
              <th className="text-center p-5 px-5">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPurchases.map((item, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-100 bg-white cursor-pointer"
              >
                <td className="text-center p-5 px-5">{item.p_number}</td>
                <td className="text-center p-5 px-5">{item.created_at}</td>
                <td className="text-center p-5 px-5">{item.seller}</td>
                <td className="text-center p-5 px-5">{item.rice_type}</td>
                <td className="text-center p-5 px-5">{item.quantity}</td>
                <td className="text-center p-5 px-5">{item.price}</td>
                <td className="text-center p-5 px-5">{item.payment_method}</td>
                <td className="text-center p-1">
                  <span
                    className={`inline-block px-3 py-1 text-sm font-semibold rounded-full
      ${
        item.status === "เสร็จสิ้น"
          ? "bg-green-100 text-green-800"
          : item.status === "ฉบับร่าง"
          ? "bg-yellow-100 text-yellow-800"
          : item.status === "รับเข้าแล้ว"
          ? "bg-blue-100 text-blue-800"
          : item.status === "ชำระเงินแล้ว"
          ? "bg-purple-100 text-purple-800"
          : item.status === "ยกเลิก"
          ? "bg-red-100 text-red-800"
          : ""
      }
    `}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="text-center p-5 px-5 flex justify-center gap-2">
                  <button
                    onClick={() => navigate(`/edit_purchase/${item.id}`)}
                    className="flex items-center gap-1 text-sm bg-yellow-500 hover:bg-yellow-700 text-white py-1 px-4 rounded-full cursor-pointer"
                  >
                    <FiEdit className="w-4 h-4" /> แก้ไข
                  </button>
                  <button
                    onClick={() => handleDeleteClick(item.id)}
                    className="flex items-center gap-1 text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-4 rounded-full cursor-pointer"
                  >
                    <FiTrash2 className="w-4 h-4" /> ลบ
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination ขวาล่าง */}
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
        <DeletePurchase
          onClose={() => setShowDelete(false)}
          onConfirm={handleConfirmDelete}
        />
      )}

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default IndexPurchase;
