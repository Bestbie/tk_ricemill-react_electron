import { useState } from "react";
import {
  FiEdit,
  FiTrash2,
  FiPlus,
  FiRotateCw,
  FiInfo,
  FiArrowLeft,
} from "react-icons/fi";
import { IoMdPrint } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import DeleteFinance from "./DeleteFinance";
import PrinterFinance from "./PrinterFinance";
import { Toaster } from "react-hot-toast";

const IndexFinance = () => {
  const initialFinances = [
    {
      id: 1,
      f_number: "BIL-20250922-001",
      created_at: "2025-08-22",
      created_by: "นายดำ",
      amount: "10,000",
      f_type: "ค่าขนส่ง",
      f_tax: "1 %",
      status: "จ่ายแล้ว",
    },
    {
      id: 2,
      f_number: "BIL-20250922-002",
      created_at: "2025-08-23",
      created_by: "นางแดง",
      amount: "5,500",
      f_type: "ค่าวัตถุดิบ",
      f_tax: "3 %",
      status: "รอจ่าย",
    },
    {
      id: 3,
      f_number: "BIL-20250922-003",
      created_at: "2025-08-24",
      created_by: "นายเขียว",
      amount: "8,750",
      f_type: "ค่าบริการ",
      f_tax: "2 %",
      status: "รอจ่าย",
    },
    {
      id: 4,
      f_number: "BIL-20250922-004",
      created_at: "2025-08-25",
      created_by: "นางฟ้า",
      amount: "12,300",
      f_type: "ค่าขนส่ง",
      f_tax: "1 %",
      status: "จ่ายแล้ว",
    },
  ];

  const [finances, setFinances] = useState(initialFinances);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [showPrinter, setShowPrinter] = useState(false);
  const [selectedFinance, setSelectedFinance] = useState(null);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setShowDelete(true);
  };

  const handleConfirmDelete = () => {
    setFinances((prev) => prev.filter((finance) => finance.id !== selectedId));
    setShowDelete(false);
  };

  const [search, setSearch] = useState({
    f_number: "",
    created_by: "",
    f_type: "",
    status: "",
  });

  // Filter finances ตามช่องค้นหา
  const filteredFinances = finances.filter((finance) => {
    return (
      finance.f_number.toLowerCase().includes(search.f_number.toLowerCase()) &&
      finance.created_by
        .toLowerCase()
        .includes(search.created_by.toLowerCase()) &&
      finance.f_type.toLowerCase().includes(search.f_type.toLowerCase()) &&
      finance.status.toLowerCase().includes(search.status.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredFinances.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFinances = filteredFinances.slice(
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
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl fon-bold">รายการการเงิน</h1>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/create_finance")}
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
          name="f_number"
          placeholder="ค้นหาเลขที่บิล]"
          value={search.f_number}
          onChange={handleSearchChange}
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          name="created_by"
          placeholder="ผู้จ่าย"
          value={search.created_by}
          onChange={handleSearchChange}
          className="border rounded px-3 py-2"
        />
        <select
          name="f_type"
          value={search.f_type}
          onChange={handleSearchChange}
          className="border rounded px-3 py-2"
        >
          <option value="">ประเภท</option>
          <option value="ค่าขนส่ง">ค่าขนส่ง</option>
          <option value="ค่าวัตถุดิบ">ค่าวัตถุดิบ</option>
          <option value="ค่าบริการ">ค่าบริการ</option>
        </select>
        <select
          name="status"
          value={search.status}
          onChange={handleSearchChange}
          className="border rounded px-2 py-2 w-36 h-full"
        >
          <option value="">ทั้งหมด</option>
          <option value="จ่ายแล้ว">จ่ายแล้ว</option>
          <option value="รอจ่าย">รอจ่าย</option>
        </select>
        {/* <button
            type="button"
            onClick={() =>
              setSearch({
                f_number: "",
                created_by: "",
                f_type: "",
                status: "",
              })
            }
            className="bg-blue-300 hover:bg-blue-400 text-blue-700 px-4 py-2 rounded shadow flex items-center gap-1 h-full rounded-full cursor-pointer"
          >
            <FiRotateCw className="w-4 h-4" />
            รีเซต
          </button> */}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-md bg-gray-200 shadow-md rounded mb-2">
          <thead>
            <tr className="border-b">
              <th className="text-center p-5 px-5">เลขที่บิล</th>
              <th className="text-center p-5 px-5">วันที่</th>
              <th className="text-center p-5 px-5">ผู้จ่าย</th>
              <th className="text-center p-5 px-5">ยอดเงิน</th>
              <th className="text-center p-5 px-5">ประเภท</th>
              <th className="text-center p-5 px-5">หัก ณ ที่จ่าย</th>
              <th className="text-center p-5 px-5">สถานะ</th>
              <th className="text-center p-5 px-5">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {paginatedFinances.map((item, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-100 bg-white cursor-pointer"
              >
                <td className="text-center p-5 px-5">{item.f_number}</td>
                <td className="text-center p-5 px-5">{item.created_at}</td>
                <td className="text-center p-5 px-5">{item.created_by}</td>
                <td className="text-center p-5 px-5">{item.amount}</td>
                <td className="text-center p-5 px-5">{item.f_type}</td>
                <td className="text-center p-5 px-5">{item.f_tax}</td>
                <td className="text-center p-1">
                  <span
                    className={`inline-block px-3 py-1 text-sm font-semibold ${
                      item.status === "จ่ายแล้ว"
                        ? "bg-green-100 text-green-800 rounded-full"
                        : item.status === "รอจ่าย"
                        ? "bg-yellow-100 text-yellow-800 rounded-full"
                        : ""
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="text-center p-5 px-5 flex justify-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedFinance(item);
                      setShowPrinter(true);
                    }}
                    className="flex items-center gap-1 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded-full cursor-pointer"
                  >
                    <IoMdPrint className="w-4 h-4" /> พิมพ์
                  </button>
                  <button
                    onClick={() => navigate(`/edit_finance/${item.id}`)}
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
        <DeleteFinance
          onClose={() => setShowDelete(false)}
          onConfirm={handleConfirmDelete}
        />
      )}

      {showPrinter && (
        <PrinterFinance  data={selectedFinance} onClose={() => setShowPrinter(false)} />
      )}

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default IndexFinance;
