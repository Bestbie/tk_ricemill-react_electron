import { useEffect, useState } from "react";
import { FiArrowLeft, FiX } from "react-icons/fi";
import { MdOutlineFileDownload, MdOutlineFileUpload } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import "./DetailWeighticket.css";

const DetailWeighticket = () => {
  const { id } = useParams();

  // State สำหรับ form data และ input
  const [formData, setFormData] = useState({
    w_number: "",
    created_at: "",
    car_reg: "",
    seller: "",
    varietie: "",
    gross: null,
    tare: null,
    net: null,
    checkin_at: "",
    checkout_at: "",
    status: "",
  });

  const [gross, setGross] = useState(0.0);
  const [tare, setTare] = useState(0.0);
  const [moisture, setMoisture] = useState(13.5);
  const navigate = useNavigate();

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
  ];

  // โหลด ticket ตาม id
  useEffect(() => {
    const ticket = initialUsers.find((t) => t.id === parseInt(id));
    if (ticket) {
      setFormData(ticket);
    }
  }, [id]);

  const handleBack = () => {
    window.history.back();
  };

  // คำนวณ Net
  const calculatedNet = gross - tare;

  // ฟังก์ชันจำลองการอ่าน Gross
  const readGross = () => {
    const simulatedGross = Math.floor(Math.random() * 50000) + 1000; // 1,000–50,000
    setGross(simulatedGross);
  };

  // ฟังก์ชันจำลองการอ่าน Tare
  const readTare = () => {
    const simulatedTare = Math.floor(Math.random() * 5000) + 500; // 500–5,500
    setTare(simulatedTare);
  };

  // 🟢 บันทึกชั่งเข้า
  const handleSaveGross = () => {
    if (!gross) {
      toast.error("ยังไม่มีค่าน้ำหนัก Gross");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      gross,
      checkin_at: new Date().toLocaleString(),
      status: "ชั่งเข้าแล้ว",
    }));
    toast.success("บันทึกชั่งเข้าเรียบร้อย");
  };

  // 🔵 บันทึกชั่งออก
  const handleSaveTare = () => {
    if (!tare) {
      toast.error("ยังไม่มีค่าน้ำหนัก Tare");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      tare,
      net: gross - tare,
      checkout_at: new Date().toLocaleString(),
      status: "เสร็จสิ้น",
    }));
    toast.success("บันทึกชั่งออกเรียบร้อย");
  };

  // 📁 ปิดเอกสาร
  const handleCloseDoc = () => {
    try {
      if (gross > 0 && tare > 0) {
        setFormData((prev) => ({
          ...prev,
          tare,
          status: "เสร็จสิ้น",
        }));
        toast.success("ปิดเอกสารเรียบร้อย");

        // พากลับไปหน้ารายการ
        navigate("/weigh_ticket");
      } else {
        toast.error("ปิดเอกสารไม่ได้ กรุณากรอก Gross และ Tare ก่อน");
      }
    } catch (err) {
      toast.error("เกิดข้อผิดพลาดในการปิดเอกสาร");
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* ข้อมูลทั่วไป */}
        <div className="p-4 bg-white rounded shadow">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold">รายละเอียดใบสั่ง</h1>
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
              <label className="font-semibold">เลขที่ใบชั่ง :</label>{" "}
              {formData.w_number}
            </div>
            <div>
              <label className="font-semibold">วัน/เวลา สร้าง :</label>{" "}
              {formData.created_at}
            </div>
            <div>
              <label className="font-semibold">ทะเบียนรถ :</label>{" "}
              {formData.car_reg}
            </div>
            <div>
              <label className="font-semibold">ผู้ขาย :</label>{" "}
              {formData.seller}
            </div>
            <div>
              <label className="font-semibold">พันธุ์ :</label>{" "}
              {formData.varietie}
            </div>
            <div>
              <label className="font-semibold">สุทธิ(กก.) :</label>{" "}
              {formData.net || calculatedNet}
            </div>
            <div className="flex items-center gap-2">
              <label className="font-semibold">สถานะ :</label>
              <span
                className={`inline-block px-3 py-1 text-sm font-semibold ${
                  formData.status === "เสร็จสิ้น"
                    ? "bg-green-100 text-green-800 rounded-full"
                    : formData.status === "ฉบับร่าง"
                    ? "bg-yellow-100 text-yellow-800 rounded-full"
                    : ""
                }`}
              >
                {formData.status}
              </span>
            </div>
            <div>
              <label className="font-semibold">เวลาเข้า :</label>{" "}
              {formData.checkin_at || "-"}
            </div>
            <div>
              <label className="font-semibold">เวลาออก :</label>{" "}
              {formData.checkout_at || "-"}
            </div>
          </div>
        </div>

        {/* Realtime Weight */}
        <div className="p-6 bg-white rounded shadow flex flex-col">
          <h1 className="text-2xl font-bold mb-2 text-left">
            ค่าน้ำหนักสด (Realtime)
          </h1>
          <hr className="border-gray-400 mb-4" />

          {/* กล่องน้ำหนัก */}
          <div className="relative w-full max-w-2xl h-40 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-dashed border-gray-500 rounded animate-dash"></div>
            <div className="flex items-center justify-center h-full">
              <h1 className="text-6xl font-extrabold">
                {gross.toLocaleString()} kg
              </h1>
            </div>
          </div>

          {/* ปุ่มอ่าน Gross/Tare */}
          <div className="flex gap-2 justify-center">
            <button
              className="px-4 py-2 bg-green-600 text-white rounded-full cursor-pointer"
              onClick={readGross}
            >
              อ่าน Gross
            </button>
            <button
              className="px-4 py-2 border border-green-600 rounded-full cursor-pointer"
              onClick={readTare}
            >
              อ่าน Tare
            </button>
          </div>
        </div>
      </div>

      {/* สรุป */}
      <div className="p-4 bg-white rounded shadow space-y-4">
        {/* หัวข้อสรุป */}
        <div>
          <h2 className="text-lg font-bold mb-2">สรุปน้ำหนัก</h2>
          <hr className="border-gray-300" />
        </div>

        {/* ตาราง input */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label>Gross</label>
            <input
              type="number"
              value={gross}
              onChange={(e) => setGross(parseFloat(e.target.value))}
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <div>
            <label>Tare</label>
            <input
              type="number"
              value={tare}
              onChange={(e) => setTare(parseFloat(e.target.value))}
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <div>
            <label>สุทธิ(กก.)</label>
            <input
              type="number"
              value={calculatedNet}
              readOnly
              className="w-full border rounded px-2 py-1 bg-gray-100"
            />
          </div>
          <div>
            <label>ความชื้น (%)</label>
            <input
              type="number"
              value={moisture}
              onChange={(e) => setMoisture(parseFloat(e.target.value))}
              className="w-full border rounded px-2 py-1"
            />
          </div>
        </div>

        {/* ปุ่ม action */}
        <div className="flex justify-end gap-2 mt-2">
          <button
            className="flex items-center gap-1 px-4 py-2 border rounded-full cursor-pointer"
            onClick={handleSaveGross}
          >
            <MdOutlineFileUpload className="w-4 h-4" />
            <span>บันทึกชั่งเข้า</span>
          </button>
          <button
            className="flex items-center gap-1 px-4 py-2 border rounded-full cursor-pointer"
            onClick={handleSaveTare}
          >
            <MdOutlineFileDownload className="w-4 h-4" />
            <span>บันทึกชั่งออก</span>
          </button>
          <button
            className="flex items-center gap-1 px-4 py-2 bg-green-700 text-white rounded-full cursor-pointer"
            onClick={handleCloseDoc}
          >
            <FiX className="w-4 h-4" />
            <span>ปิดเอกสาร</span>
          </button>y
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default DetailWeighticket;
