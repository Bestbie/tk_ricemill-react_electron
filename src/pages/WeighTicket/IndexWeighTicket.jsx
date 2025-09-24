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
import DeleteWeighticket from "./DeleteWeighticket";
import { Toaster } from "react-hot-toast";

const IndexWeighTicket = () => {
  const initialUsers = [
    {
      id: 1,
      w_number: "TCK-25-000123",
      created_at: "2025-08-22 11:18",
      car_reg: "1กข1234",
      seller: "นายดำ",
      varietie: "กข43",
      net: "32,560",
      status: "ฉบับร่าง",
    },
    {
      id: 2,
      w_number: "TCK-25-000124",
      created_at: "2025-08-22 11:18",
      car_reg: "9ฮฮ9999",
      seller: "นางดาว",
      varietie: "กข31",
      net: "28,120",
      status: "เสร็จสิ้น",
    },
    {
      id: 3,
      w_number: "TCK-25-000125",
      created_at: "2025-08-23 09:10",
      car_reg: "2ขค5678",
      seller: "นายแดง",
      varietie: "กข50",
      net: "30,000",
      status: "ฉบับร่าง",
    },
  ];

  const [users, setUsers] = useState(initialUsers);
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
    setUsers((prev) => prev.filter((user) => user.id !== selectedId));
    setShowDelete(false);
  };

  const [search, setSearch] = useState({
    w_number: "",
    car_reg: "",
    seller: "",
    status: "",
  });

  // Filter users ตามช่องค้นหา
  const filteredUsers = users.filter((user) => {
    return (
      user.w_number.toLowerCase().includes(search.w_number.toLowerCase()) &&
      user.car_reg.toLowerCase().includes(search.car_reg.toLowerCase()) &&
      user.seller.toLowerCase().includes(search.seller.toLowerCase()) &&
      user.status.toLowerCase().includes(search.status.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(
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
        <h1 className="text-2xl font-bold">รายการใบสั่งชั่ง</h1>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/create_weigh_ticket")}
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
          name="w_number"
          placeholder="ค้นหาเลขที่ใบชั่ง"
          value={search.w_number}
          onChange={handleSearchChange}
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          name="car_reg"
          placeholder="ค้นหาทะเบียนรถ"
          value={search.car_reg}
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
          <option value="เสร็จสิ้น">เสร็จสิ้น</option>
        </select>
        {/* <button
          type="button"
          onClick={() =>
            setSearch({ w_number: "", car_reg: "", seller: "", status: "" })
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
              <th className="text-center p-5 px-5">เลขที่ใบชั่ง</th>
              <th className="text-center p-5 px-5">วัน/เวลา</th>
              <th className="text-center p-5 px-5">ทะเบียนรถ</th>
              <th className="text-center p-5 px-5">ผู้ขาย</th>
              <th className="text-center p-5 px-5">พันธุ์</th>
              <th className="text-center p-5 px-5">สุทธิ(กก.)</th>
              <th className="text-center p-5 px-5">สถานะ</th>
              <th className="text-center p-5 px-5">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((item, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-100 bg-white cursor-pointer"
              >
                <td className="text-center p-5 px-5">{item.w_number}</td>
                <td className="text-center p-5 px-5">{item.created_at}</td>
                <td className="text-center p-5 px-5">{item.car_reg}</td>
                <td className="text-center p-5 px-5">{item.seller}</td>
                <td className="text-center p-5 px-5">{item.varietie}</td>
                <td className="text-center p-5 px-5">{item.net}</td>
                <td className="text-center p-1">
                  <span
                    className={`inline-block px-3 py-1 text-sm font-semibold ${
                      item.status === "เสร็จสิ้น"
                        ? "bg-green-100 text-green-800 rounded-full"
                        : item.status === "ฉบับร่าง"
                        ? "bg-yellow-100 text-yellow-800 rounded-full"
                        : ""
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="text-center p-5 px-5 flex justify-center gap-2">
                  <button
                    onClick={() => navigate(`/detail_weigh_ticket/${item.id}`)}
                    className="flex items-center gap-1 text-sm bg-gray-500 hover:bg-gray-700 text-white py-1 px-4 rounded-full cursor-pointer"
                  >
                    <FiInfo className="w-4 h-4" /> ข้อมูล
                  </button>
                  <button
                    onClick={() => navigate(`/edit_weigh_ticket/${item.id}`)}
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
        <DeleteWeighticket
          onClose={() => setShowDelete(false)}
          onConfirm={handleConfirmDelete}
        />
      )}

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default IndexWeighTicket;
