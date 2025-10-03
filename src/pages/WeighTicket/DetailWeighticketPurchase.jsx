import { useEffect, useState } from "react";
import { FiArrowLeft, FiX } from "react-icons/fi";
import { MdOutlineFileDownload, MdOutlineFileUpload } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import "./DetailWeighticket.css";

const DetailWeighticketPurchase = () => {
  const { id } = useParams();

  // State สำหรับ form data และ input
  const [formData, setFormData] = useState({
    w_number: "",
    car_reg: "",
    buyer_seller: "",
    w_type: "",
    product: "",
    address: "",
    desc: "",
    gross: null,
    tare: null,
    // status: "",
  });

  const [gross, setGross] = useState(0.0);
  const [tare, setTare] = useState(0.0);
  const [moisture, setMoisture] = useState(26.9);
  const [impurity, setImpurity] = useState(196);
  const [tonprice, setTonprice] = useState(5700);
  const [productvalue, setProductValue] = useState(15561);
  const [testproductvalue] = useState("หนึ่งหมื่นห้าพันห้าร้อยหกสิบเอ็ดถ้วน");

  const navigate = useNavigate();

  const initialUsers = [
    {
      id: 1,
      created_at: "2025-08-22",
      w_number: "D680917009",
      car_reg: "1กข1234",
      buyer_seller: "นายดำ",
      w_type: "การซื้อ",
      product: "ข้าวเปลือก ธรรมดา",
      address: "address1",
      desc: "คำอธิบายในการซื้อ",
      // status: "รอการอนุมัติ",
    },
    {
      id: 2,
      created_at: "2025-08-23",
      w_number: "D680917010",
      car_reg: "2ขค5678",
      buyer_seller: "นางแดง",
      w_type: "การซื้อ",
      product: "ข้าวเปลือก หอมมะลิ",
      address: "address2",
      desc: "ซื้อข้าวเปลือกหอมมะลิจากเกษตรกร",
      // status: "จ่ายแล้ว",
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

  const handleSave = () => {
    try {
      navigate("/weigh_ticket");
      toast.success("บันทึกเรียบร้อย");
    } catch (error) {
      console.log("error save data", error);
    }
  };
  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* ข้อมูลทั่วไป */}
        <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold">รายละเอียดใบสั่งชั่ง</h1>
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
              <label className="font-semibold">เลขที่ใบสั่งชั่ง :</label>{" "}
              {formData.w_number}
            </div>
            <div>
              <label className="font-semibold">ทะเบียนรถ :</label>{" "}
              {formData.car_reg}
            </div>
            <div>
              <label className="font-semibold">ผู้ซื้อ/ผู้ขาย :</label>{" "}
              {formData.buyer_seller}
            </div>
            <div className="flex items-center gap-2">
              <label className="font-semibold">สถานะ :</label>
              <span
                className={`inline-block px-3 py-1 text-sm font-semibold ${
                  formData.w_type === "การขาย"
                    ? "bg-blue-100 text-blue-800 rounded-full"
                    : formData.w_type === "การซื้อ"
                    ? "bg-green-100 text-green-800 rounded-full"
                    : ""
                }`}
              >
                {formData.w_type}
              </span>
            </div>

            <div>
              <label className="font-semibold">สินค้า :</label>{" "}
              {formData.product}
            </div>
            <div>
              <label className="font-semibold">ที่อยู่ :</label>{" "}
              {formData.address}
            </div>

            <div>
              <label className="font-semibold">คำอธิบาย :</label>{" "}
              {formData.desc}
            </div>
          </div>
        </div>

        {/* Realtime Weight */}
        <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition flex flex-col">
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
              น้ำหนักรถเข้า
            </button>
            <button
              className="px-4 py-2 border border-green-600 rounded-full cursor-pointer"
              onClick={readTare}
            >
              น้ำหนักรถออก
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* สรุปน้ำหนัก (ซ้าย) */}
        <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transtion space-y-4">
          <div>
            <h2 className="text-lg font-bold mb-2">สรุปน้ำหนัก</h2>
            <hr className="border-gray-300" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            <div>
              <label>น้ำหนักรถเข้า</label>
              <input
                type="number"
                value={gross}
                onChange={(e) => setGross(parseFloat(e.target.value))}
                className="w-full border rounded px-2 py-1"
              />
            </div>
            <div>
              <label>น้ำหนักรถออก</label>
              <input
                type="number"
                value={tare}
                onChange={(e) => setTare(parseFloat(e.target.value))}
                className="w-full border rounded px-2 py-1"
              />
            </div>
            <div>
              <label>น้ำหนักสินค้า</label>
              <input
                type="number"
                value={calculatedNet}
                readOnly
                className="w-full border rounded px-2 py-1 bg-gray-100"
              />
            </div>
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <label>ความชื้น</label>
                <input
                  type="number"
                  value={moisture}
                  onChange={(e) => setMoisture(parseFloat(e.target.value))}
                  className="w-full border rounded px-2 py-1"
                  step="0.1"
                  min="0"
                  max="100"
                />
              </div>
              <div className="pb-1 text-xl font-bold">=</div>
              <div className="flex-1">
                <label>น้ำหนักหลังหักความชื้น</label>
                <input
                  type="number"
                  readOnly
                  className="w-full border rounded px-2 py-1 bg-gray-100"
                />
              </div>
            </div>

            <div className="flex items-end gap-2">
              <div className="flex-1">
                <label>หักสิ่งเจือปน</label>
                <input
                  type="number"
                  value={impurity}
                  onChange={(e) => setImpurity(parseFloat(e.target.value))}
                  className="w-full border rounded px-2 py-1"
                  step="0.1"
                  min="0"
                  max="100"
                />
              </div>
              <div className="pb-1 text-xl font-bold">=</div>
              <div className="flex-1">
                <label>น้ำหนักหลังหักสิ่งเจือปน</label>
                <input
                  type="number"
                  readOnly
                  className="w-full border rounded px-2 py-1 bg-gray-100"
                />
              </div>
            </div>

            <div>
              <label>น้ำหนักสิทธิ</label>
              <input
                type="number"
                value={0}
                className="w-full border rounded px-2 py-1"
              />
            </div>
          </div>
        </div>

        {/* ราคา (ขวา) */}
        <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transtion space-y-4">
          <div>
            <h2 className="text-lg font-bold mb-2">ราคา</h2>
            <hr className="border-gray-300" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            <div>
              <label>ราคาตันละ</label>
              <input
                type="number"
                value={tonprice}
                onChange={(e) => setTonprice(parseFloat(e.target.value))}
                className="w-full border rounded px-2 py-1"
              />
            </div>
            <div>
              <label>มูลค่าสินค้า</label>
              <input
                type="number"
                value={productvalue}
                onChange={(e) => setProductValue(parseFloat(e.target.value))}
                className="w-full border rounded px-2 py-1"
              />
            </div>
            <div>
              <label>หักค่าชั่ง</label>
              <input
                type="number"
                value={0}
                readOnly
                className="w-full border rounded px-2 py-1 bg-gray-100"
              />
            </div>

            <div>
              <label>สุทธิจ่าย</label>
              <input
                type="number"
                value={15561}
                className="w-full border rounded px-2 py-1"
              />
            </div>
            <div>
              <input
                type="text"
                value={testproductvalue}
                readOnly
                className="w-full border rounded px-2 py-1 bg-gray-100"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ปุ่มบันทึกและยกเลิก */}
      <div className="col-span-1 md:col-span-2 flex justify-center gap-2 mt-4">
        <button
          type="button"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 rounded-full cursor-pointer"
          onClick={() => handleSave()}
        >
          บันทึก
        </button>
        <button
          type="reset"
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 rounded-full cursor-pointer"
        >
          ยกเลิก
        </button>
      </div>
      {/* <Toaster position="top-right" reverseOrder={false} /> */}
    </div>
  );
};

export default DetailWeighticketPurchase;
