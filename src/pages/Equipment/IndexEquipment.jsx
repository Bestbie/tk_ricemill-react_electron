import { useState } from "react";
import { FiInfo, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ChangeStatus from "./ChangeStatus";
import { Toaster } from "react-hot-toast";

const IndexEquipment = () => {
  const initialEquipments = [
    {
      id: 1,
      e_number: "E-25-000123",
      e_name: "เครื่องสีข้าว",
      e_type: "เครื่องจักร",
      e_model: "Satake ST-500",
      e_serial_number: 111,
      e_location: "โกดัง 1",
      e_total_time: "10.20 นาที",
      created_at: "2025-08-22",
      status: "กำลังใช้งาน",
    },
    {
      id: 2,
      e_number: "E-25-000124",
      e_name: "เครื่องชั่งน้ำหนัก",
      e_type: "เครื่องมือวัด",
      e_model: "OHAUS-DX200",
      e_serial_number: 245,
      e_location: "หน้าประตูโรงสี",
      e_total_time: "05.45 นาที",
      created_at: "2025-08-25",
      status: "พร้อมใช้งาน",
    },
    {
      id: 3,
      e_number: "E-25-000125",
      e_name: "สายพานลำเลียง",
      e_type: "เครื่องจักร",
      e_model: "Conveyor-BX150",
      e_serial_number: 387,
      e_location: "โกดัง 2",
      e_total_time: "18.00 นาที",
      created_at: "2025-09-01",
      status: "รอซ่อมบำรุง",
    },
    {
      id: 4,
      e_number: "E-25-000126",
      e_name: "เครื่องอัดกระสอบ",
      e_type: "เครื่องจักร",
      e_model: "PackMaster-PM300",
      e_serial_number: 412,
      e_location: "พื้นที่บรรจุภัณฑ์",
      e_total_time: "07.30 นาที",
      created_at: "2025-09-10",
      status: "กำลังใช้งาน",
    },
  ];

  const [equipments, setEquipments] = useState(initialEquipments);
  const [currentPage, setCurrentPage] = useState(1);
  const [showChangeStatus, setShowChangeStatus] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [search, setSearch] = useState({
    e_number: "",
    e_name: "",
    status: "",
  });
  const itemsPerPage = 5;
  const navigate = useNavigate();

  const filteredEquipments = equipments.filter(
    (item) =>
      item.e_number.toLowerCase().includes(search.e_number.toLowerCase()) &&
      item.e_name.toLowerCase().includes(search.e_name.toLowerCase()) &&
      item.status.toLowerCase().includes(search.status.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEquipments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEquipments = filteredEquipments.slice(
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

  const handleOpenChangeStatus = (item) => {
    setSelectedEquipment(item);
    setShowChangeStatus(true);
  };

  const handleSaveStatus = (id, newStatus) => {
    setEquipments((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
    );
    window.electronAPI.updateEquipmentStatus(id, newStatus);
  };

  return (
    <div className="text-gray-900 bg-white min-h-screen p-4 rounded-[20px] shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold">รายการอุปกรณ์</h1>
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-full shadow cursor-pointer"
        >
          <FiArrowLeft className="w-4 h-4" /> ย้อนกลับ
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4 items-end">
        <input
          type="text"
          name="e_number"
          placeholder="ค้นหาเลขที่อุปกรณ์"
          value={search.e_number}
          onChange={handleSearchChange}
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          name="e_name"
          placeholder="ค้นหาชื่ออุปกรณ์"
          value={search.e_name}
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
          <option value="กำลังใช้งาน">กำลังใช้งาน</option>
          <option value="พร้อมใช้งาน">พร้อมใช้งาน</option>
          <option value="รอซ่อมบำรุง">รอซ่อมบำรุง</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-md bg-gray-200 shadow-md rounded mb-2">
          <thead>
            <tr className="border-b">
              <th className="text-center p-5">เลขที่อุปกรณ์</th>
              <th className="text-center p-5">ชื่ออุปกรณ์</th>
              <th className="text-center p-5">ประเภทอุปกรณ์</th>
              <th className="text-center p-5">รุ่น</th>
              <th className="text-center p-5">หมายเลขซีเรียล</th>
              <th className="text-center p-5">ตำแหน่ง</th>
              <th className="text-center p-5">เวลาใช้งาน</th>
              <th className="text-center p-5">วันที่</th>
              <th className="text-center p-5">สถานะ</th>
              <th className="text-center p-5">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {paginatedEquipments.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-100 bg-white cursor-pointer"
              >
                <td className="text-center p-5">{item.e_number}</td>
                <td className="text-center p-5">{item.e_name}</td>
                <td className="text-center p-5">{item.e_type}</td>
                <td className="text-center p-5">{item.e_model}</td>
                <td className="text-center p-5">{item.e_serial_number}</td>
                <td className="text-center p-5">{item.e_location}</td>
                <td className="text-center p-5">{item.e_total_time}</td>
                <td className="text-center p-5">{item.created_at}</td>
                <td className="text-center p-1">
                  <span
                    className={`inline-block px-3 py-1 text-sm font-semibold rounded-full
                      ${
                        item.status === "กำลังใช้งาน"
                          ? "bg-green-100 text-green-800"
                          : item.status === "พร้อมใช้งาน"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    onClick={() => handleOpenChangeStatus(item)}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="text-center p-5 flex justify-center gap-2">
                  <button
                    onClick={() => navigate(`/detail_equipment/${item.id}`)}
                    className="flex items-center gap-1 text-sm bg-gray-500 hover:bg-gray-700 text-white py-1 px-4 rounded-full cursor-pointer"
                  >
                    <FiInfo className="w-4 h-4" /> ข้อมูล
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

      {showChangeStatus && selectedEquipment && (
        <ChangeStatus
          currentStatus={selectedEquipment.status}
          onClose={() => setShowChangeStatus(false)}
          onSave={(newStatus) =>
            handleSaveStatus(selectedEquipment.id, newStatus)
          }
        />
      )}

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default IndexEquipment;
