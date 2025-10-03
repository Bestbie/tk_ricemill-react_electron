/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import "./DetailEquipmet.css";

const DetailEquipment = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    e_number: "",
    e_name: "",
    e_type: "",
    e_model: "",
    e_serial_number: "",
    e_location: "",
    e_total_time: 0, // เก็บเป็นวินาที
    created_at: "",
    status: "",
  });

  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [usageLogs, setUsageLogs] = useState([]);

  // state สำหรับ log เพิ่มเติม
  const [operator, setOperator] = useState("");
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("ผลิต");

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
      status: "กำลังซ่อม",
    },
  ];

  // โหลด equipment ตาม id
  useEffect(() => {
    const equipment = initialEquipments.find((t) => t.id === parseInt(id));
    if (equipment) {
      setFormData({
        ...equipment,
        e_total_time: 0, // reset เวลา
      });
      setIsRunning(false);
    }
  }, [id]);

  // จับเวลา
  useEffect(() => {
    if (isRunning) {
      const id = setInterval(() => {
        setFormData((prev) => ({
          ...prev,
          e_total_time: prev.e_total_time + 1,
        }));
      }, 1000);
      setIntervalId(id);
    } else {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isRunning]);

  const handleBack = () => {
    window.history.back();
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s} นาที`;
  };

  const showToast = (action) => {
    let message = "";
    switch (action) {
      case "start":
        message = `เริ่มนับเวลา: ${formatTime(formData.e_total_time)}`;
        break;
      case "stop":
        message = `หยุดนับเวลา: ${formatTime(formData.e_total_time)}`;
        break;
      case "reset":
        message = "รีเซตเวลา: 00:00 นาที";
        break;
      case "save":
        message = `บันทึกเวลาสำเร็จ: ${formatTime(formData.e_total_time)}`;
        break;
      default:
        message = "";
    }
    toast.success(message);
  };

  // ฟังก์ชันบันทึก
  const handleSave = () => {
    const newLog = {
      date: new Date().toLocaleDateString("th-TH"),
      time: formatTime(formData.e_total_time),
      equipment: formData.e_name,
      operator,
      category,
      note,
    };

    setUsageLogs((prev) => [newLog, ...prev]);
    showToast("save");

    // reset state
    setFormData({ ...formData, e_total_time: 0 });
    setIsRunning(false);
    setOperator("");
    setNote("");
  };

  // Export CSV
  // const handleExportCSV = () => {
  //   const csvHeader = "วันที่,เวลา,อุปกรณ์,ผู้ใช้งาน,หมวดหมู่,หมายเหตุ\n";
  //   const csvRows = usageLogs.map(
  //     (log) =>
  //       `${log.date},${log.time},${log.equipment},${log.operator},${log.category},${log.note}`
  //   );
  //   const blob = new Blob([csvHeader + csvRows.join("\n")], {
  //     type: "text/csv",
  //   });
  //   const url = URL.createObjectURL(blob);
  //   const link = document.createElement("a");
  //   link.href = url;
  //   link.download = "equipment_logs.csv";
  //   link.click();
  // };

  // รวมเวลาสะสมทั้งหมด (นาที)
  const totalMinutes = usageLogs.reduce((sum, l) => {
    const [m, s] = l.time.replace(" นาที", "").split(":").map(Number);
    return sum + m * 60 + s;
  }, 0);

  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* รายละเอียด */}
        <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold">รายละเอียดอุปกรณ์</h1>
            <button
              onClick={handleBack}
              className="flex items-center gap-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full cursor-pointer"
            >
              <FiArrowLeft className="w-4 h-4" />
              <span>ย้อนกลับ</span>
            </button>
          </div>
          <hr className="border-gray-400 mb-4" />

          <div className="space-y-2">
            <div>
              <label className="font-semibold">เลขที่อุปกรณ์ :</label>{" "}
              {formData.e_number}
            </div>
            <div>
              <label className="font-semibold">ชื่ออุปกรณ์ :</label>{" "}
              {formData.e_name}
            </div>
            <div>
              <label className="font-semibold">ประเภทอุปกรณ์ :</label>{" "}
              {formData.e_type}
            </div>
            <div>
              <label className="font-semibold">รุ่น :</label> {formData.e_model}
            </div>
            <div>
              <label className="font-semibold">หมายเลขซีเรียล :</label>{" "}
              {formData.e_serial_number}
            </div>
            <div>
              <label className="font-semibold">ตำแหน่ง :</label>{" "}
              {formData.e_location}
            </div>
            <div>
              <label className="font-semibold">วันที่ :</label>{" "}
              {formData.created_at}
            </div>
            <div className="flex items-center gap-2">
              <label className="font-semibold">สถานะ :</label>
              <span
                className={`inline-block px-3 py-1 text-sm font-semibold ${
                  formData.status === "กำลังใช้งาน"
                    ? "bg-green-100 text-green-800 rounded-full"
                    : formData.status === "พร้อมใช้งาน"
                    ? "bg-yellow-100 text-yellow-800 rounded-full"
                    : formData.status === "รอซ่อมบำรุง"
                    ? "bg-red-100 text-red-800 rounded-full"
                    : formData.status === "กำลังซ่อม"
                    ? "bg-blue-100 text-blue-800 rounded-full"
                    : ""
                }`}
              >
                {formData.status}
              </span>
            </div>
          </div>
        </div>

        {/* เวลาทำงาน + ปุ่ม */}
        <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition flex flex-col">
          <h1 className="text-2xl font-bold mb-2 text-left">
            เวลาทำงานของอุปกรณ์
          </h1>
          <hr className="border-gray-400 mb-4" />

          {/* กล่องเวลา */}
          <div className="relative w-full max-w-2xl h-40 mx-auto mb-4">
            <div
              className={`absolute inset-0 rounded ${
                isRunning
                  ? "border-4 border-dashed animate-dash-equipment"
                  : "border-4 border-dashed animate-dash-equipment-stop"
              }`}
            ></div>
            <div className="flex items-center justify-center h-full">
              <h1 className="text-6xl font-extrabold">
                {formatTime(formData.e_total_time)}
              </h1>
            </div>
          </div>

          {/* ปุ่มควบคุม */}
          <div className="flex gap-2 justify-center">
            <button
              className={`px-4 py-2 rounded-full cursor-pointer text-white ${
                isRunning ? "bg-red-600" : "bg-blue-600"
              }`}
              onClick={() => {
                setIsRunning(!isRunning);
                showToast(isRunning ? "stop" : "start");
              }}
            >
              {isRunning ? "หยุด" : "เริ่ม"}
            </button>

            <button
              className="px-4 py-2 border border-green-600 rounded-full cursor-pointer"
              onClick={() => {
                setFormData({ ...formData, e_total_time: 0 });
                setIsRunning(false);
                showToast("reset");
              }}
            >
              รีเซต
            </button>

            <button
              className="px-4 py-2 bg-green-600 text-white rounded-full cursor-pointer"
              onClick={handleSave}
            >
              บันทึก
            </button>
          </div>

          {/* ฟอร์มบันทึก */}
          <div className="mt-4 space-y-2">
            <input
              type="text"
              value={operator}
              onChange={(e) => setOperator(e.target.value)}
              className="border rounded px-3 py-2 w-full"
              placeholder="ผู้ใช้งาน"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border rounded px-3 py-2 w-full"
            >
              <option value="ผลิต">ผลิต</option>
              <option value="ทดสอบ">ทดสอบ</option>
              <option value="ซ่อมบำรุง">ซ่อมบำรุง</option>
              <option value="หยุดพัก">หยุดพัก</option>
            </select>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="border rounded px-3 py-2 w-full"
              placeholder="หมายเหตุ..."
            />
          </div>
        </div>
      </div>

      {/* ตารางสรุป */}
      <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold">สรุปเวลาใช้งานอุปกรณ์</h2>

            <div className="flex gap-4">
              <div className="p-3 bg-green-100 rounded-lg shadow text-sm">
                เวลาสะสมทั้งหมด: {Math.floor(totalMinutes / 60)}:
                {(totalMinutes % 60).toString().padStart(2, "0")} นาที
              </div>
              <div className="p-3 bg-blue-100 rounded-lg shadow text-sm">
                จำนวนครั้งใช้งาน: {usageLogs.length} ครั้ง
              </div>
              {/* <button
                onClick={handleExportCSV}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
              >
                Export CSV
              </button> */}
            </div>
          </div>

          <hr />
        </div>

        <div className="p-4 space-y-4">
          <div className="overflow-x-auto">
            <table className="min-w-full text-md bg-gray-200 shadow-md rounded mb-2">
              <thead>
                <tr className="border-b">
                  <th className="text-center p-2">วันที่</th>
                  <th className="text-center p-2">เวลา</th>
                  <th className="text-center p-2">อุปกรณ์</th>
                  <th className="text-center p-2">ผู้ใช้งาน</th>
                  <th className="text-center p-2">หมวดหมู่</th>
                  <th className="text-center p-2">หมายเหตุ</th>
                </tr>
              </thead>
              <tbody>
                {usageLogs.length === 0 ? (
                  <tr className="border-b hover:bg-gray-100 bg-white">
                    <td colSpan="6" className="text-center p-4">
                      ยังไม่มีบันทึก
                    </td>
                  </tr>
                ) : (
                  usageLogs.map((log, index) => (
                    <tr
                      key={index}
                      className="border-b bg-white hover:bg-gray-100"
                    >
                      <td className="text-center p-2">{log.date}</td>
                      <td className="text-center p-2">{log.time}</td>
                      <td className="text-center p-2">{log.equipment}</td>
                      <td className="text-center p-2">{log.operator}</td>
                      <td className="text-center p-2">{log.category}</td>
                      <td className="text-center p-2">{log.note}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default DetailEquipment;
