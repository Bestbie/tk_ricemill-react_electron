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
      note: "",
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
      note: "",
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
      note: "รออะไหล่จากผู้ผลิต",
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
      status: "กำลังซ่อม",
      note: "ทีมซ่อมกำลังแก้ไข",
    },
  ];

  const [equipments, setEquipments] = useState(initialEquipments);
  const [showChangeStatus, setShowChangeStatus] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleOpenChangeStatus = (item) => {
    setSelectedEquipment(item);
    setShowChangeStatus(true);
  };

  const handleSaveStatus = (id, data) => {
    setEquipments((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, status: data.status, note: data.note || "" } : e
      )
    );
    setShowChangeStatus(false);
  };

  const filteredEquipments = equipments.filter(
    (e) =>
      e.e_number.toLowerCase().includes(search.toLowerCase()) ||
      e.e_name.toLowerCase().includes(search.toLowerCase())
  );

  // Summary
  const total = equipments.length;
  const active = equipments.filter((e) => e.status === "กำลังใช้งาน").length;
  const ready = equipments.filter((e) => e.status === "พร้อมใช้งาน").length;
  const repairWait = equipments.filter(
    (e) => e.status === "รอซ่อมบำรุง"
  ).length;
  const repairing = equipments.filter((e) => e.status === "กำลังซ่อม").length;

  const sampleImg1 =
    "data:image/jpeg;base64,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";
  const sampleImg2 =
    "data:image/jpeg;base64,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";

  return (
    <div className="flex gap-6 p-4">
      {/* Left: list */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">รายการอุปกรณ์</h1>
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
          placeholder="ค้นหาด้วยชื่อหรือเลขที่อุปกรณ์..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-[500px] border px-4 py-3 rounded-lg mb-4 text-lg mt-4"
        />

        {/* Card layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredEquipments.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 shadow-lg rounded-xl hover:shadow-xl transition p-4 flex justify-between items-start"
            >
              {/* ข้อมูล */}
              <div className="flex-1 pr-3">
                <h2 className="text-xl font-bold">{item.e_name}</h2>
                <p className="text-gray-500">{item.e_number}</p>
                <p>รุ่น: {item.e_model}</p>
                <p>ตำแหน่ง: {item.e_location}</p>
                <p>เวลาใช้งาน: {item.e_total_time}</p>
                <p className="text-sm text-gray-500">
                  วันที่: {item.created_at}
                </p>

                {/* status */}
                <div className="mt-2">
                  <span
                    onClick={() => handleOpenChangeStatus(item)}
                    className={`cursor-pointer inline-block px-3 py-1 text-sm font-semibold rounded-full
          ${
            item.status === "กำลังใช้งาน"
              ? "bg-green-100 text-green-800"
              : item.status === "พร้อมใช้งาน"
              ? "bg-yellow-100 text-yellow-800"
              : item.status === "รอซ่อมบำรุง"
              ? "bg-red-100 text-red-800"
              : item.status === "กำลังซ่อม"
              ? "bg-blue-100 text-blue-800"
              : "bg-gray-100 text-gray-700"
          }`}
                  >
                    {item.status}
                  </span>
                </div>

                {/* note */}
                {item.note && (
                  <p className="text-sm text-red-500 mt-1">
                    หมายเหตุ: {item.note}
                  </p>
                )}

                {/* actions */}
                <div className="flex justify-start mt-3">
                  <button
                    onClick={() => navigate(`/detail_equipment/${item.id}`)}
                    className="flex items-center gap-1 text-sm bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded-full cursor-pointer"
                  >
                    <FiInfo /> ข้อมูล
                  </button>
                </div>
              </div>

              {/* ✅ รูป */}
              <div className="w-60 h-60 flex-shrink-0">
                <img
                  src={item.id % 2 === 0 ? sampleImg1 : sampleImg2}
                  alt={item.e_name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: summary */}
      <div className="h-107 w-80 bg-white border border-gray-200 p-4 rounded-xl shadow-lg hover:shadow-xl transition">
        <h3 className="text-xl font-bold mb-2">สรุปอุปกรณ์</h3>
        <p className="text-lg">ทั้งหมด: {total} รายการ</p>
        <p className="text-lg text-green-700">กำลังใช้งาน: {active}</p>
        <p className="text-lg text-yellow-700">พร้อมใช้งาน: {ready}</p>
        <p className="text-lg text-red-700">รอซ่อมบำรุง: {repairWait}</p>
        <p className="text-lg text-blue-700">กำลังซ่อม: {repairing}</p>
      </div>

      {showChangeStatus && selectedEquipment && (
        <ChangeStatus
          currentStatus={selectedEquipment.status}
          currentNote={selectedEquipment.note}
          onClose={() => setShowChangeStatus(false)}
          onSave={(data) => handleSaveStatus(selectedEquipment.id, data)}
        />
      )}

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default IndexEquipment;
