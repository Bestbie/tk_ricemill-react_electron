import { useEffect, useState, useMemo } from "react";
import { FiArrowLeft, FiPlus, FiEdit, FiTrash2 } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const DetailStock = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isRunning, setIsRunning] = useState(false);

  const [lot, setLot] = useState({});
  const [stockCard, setStockCard] = useState([
    // ตัวอย่างสต๊อกการ์ดเริ่มต้น
    {
      id: 1,
      date: "2025-08-22",
      type: "รับเข้า",
      quantity: 10000,
      balance: 10000,
      note: "รับจากนายดำ",
    },
    {
      id: 2,
      date: "2025-08-23",
      type: "เบิกออก",
      quantity: 2000,
      balance: 8000,
      note: "เบิกออกลูกค้า A",
    },
    {
      id: 3,
      date: "2025-08-24",
      type: "เบิกออก",
      quantity: 1500,
      balance: 6500,
      note: "เบิกออกลูกค้า B",
    },
  ]);

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

  const [formData, setFormData] = useState({
    lot_number: "",
    supplier: "",
    gross_weight: "",
    variety: "",
    moisture: "",
    status: "",
  });

  useEffect(() => {
    const stock = initialLots.find((t) => t.id === parseInt(id));
    if (stock) {
      setFormData(stock);
      setLot(stock);
    }
    setIsRunning(false); // reset state ที่นี่ OK
  }, [id]);

  const handleBack = () => navigate("/stock");

  const grossTotal = useMemo(() => {
    // เอา gross_weight ปัจจุบันมาโชว์อย่างเดียว
    return parseFloat(formData.gross_weight.replace(/,/g, "")) || 0;
  }, [formData.gross_weight]);

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
              <label className="font-semibold">เลขที่ Lot :</label>{" "}
              {formData.lot_number}
            </div>
            <div>
              <label className="font-semibold">วัน/เวลา :</label>{" "}
              {formData.created_at}
            </div>
            <div>
              <label className="font-semibold">ผู้ส่ง :</label>{" "}
              {formData.supplier}
            </div>
            <div>
              <label className="font-semibold">น้ำหนักรวม :</label>{" "}
              {formData.gross_weight}
            </div>
            <div>
              <label className="font-semibold">พันธุ์ :</label>{" "}
              {formData.variety}
            </div>
            <div>
              <label className="font-semibold">ความชื้น :</label>{" "}
              {formData.moisture}
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
          </div>
        </div>

        {/* Realtime Weight */}
        <div className="p-6 bg-white rounded shadow flex flex-col">
          <h1 className="text-2xl font-bold mb-2 text-left">น้ำหนักรวม</h1>
          <hr className="border-gray-400 mb-4" />

          {/* กล่องน้ำหนัก */}
          <div className="relative w-full max-w-2xl h-40 mx-auto mb-4">
            <div
              className={`absolute inset-0 rounded ${
                isRunning
                  ? "border-4 border-dashed animate-dash-stock"
                  : "border-4 border-dashed animate-dash-stock-stop"
              }`}
            ></div>

            <div className="flex items-center justify-center h-full">
              <h1 className="text-6xl font-extrabold">
                {grossTotal.toLocaleString()} kg
              </h1>
            </div>
          </div>

          {/* ปุ่มอ่าน Gross/Tare */}
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => navigate(`/admit_stock/${lot.id}`)}
              className="flex items-center gap-1 bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-full cursor-pointer"
            >
              <FiPlus className="w-4 h-4" /> รับเข้า
            </button>
            <button
              onClick={() => navigate(`/dispatch_stock/${lot.id}`)}
              className="flex items-center gap-1 bg-purple-500 hover:bg-purple-700 text-white px-4 py-2 rounded-full cursor-pointer"
            >
              <FiPlus className="w-4 h-4" /> เบิก/ออก
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 bg-white rounded shadow flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-left">สต๊อกเข้า-ออก</h1>
          {/* <div className="flex gap-2">
            <button
              onClick={() => navigate(`/admit_stock/${lot.id}`)}
              className="flex items-center gap-1 bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-full cursor-pointer"
            >
              <FiPlus className="w-4 h-4" /> รับเข้า
            </button>
            <button
              onClick={() => navigate(`/dispatch_stock/${lot.id}`)}
              className="flex items-center gap-1 bg-purple-500 hover:bg-purple-700 text-white px-4 py-2 rounded-full cursor-pointer"
            >
              <FiPlus className="w-4 h-4" /> เบิก/ออก
            </button>
          </div> */}
        </div>

        <hr className="border-gray-400 mb-4" />

        {/* ตารางสต๊อกการ์ด */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-md bg-gray-200 shadow-md rounded mb-2">
            <thead>
              <tr className="border-b">
                <th className="text-center p-5 px-5">วันที่</th>
                <th className="text-center p-5 px-5">รายการ</th>
                <th className="text-center p-5 px-5">จำนวน</th>
                <th className="text-center p-5 px-5">คงเหลือ</th>
                <th className="text-center p-5 px-5">หมายเหตุ</th>
              </tr>
            </thead>
            <tbody>
              {stockCard.map((rec) => (
                <tr
                  key={rec.id}
                  className="border-b hover:bg-gray-100 bg-white cursor-pointer"
                >
                  <td className="text-center p-5 px-5">{rec.date}</td>
                  <td
                    className={`text-center p-5 px-5 font-semibold ${
                      rec.type === "รับเข้า"
                        ? "text-green-700"
                        : "text-purple-700"
                    }`}
                  >
                    {rec.type}
                  </td>
                  <td className="text-center p-5 px-5">{rec.quantity}</td>
                  <td className="text-center p-5 px-5">{rec.balance}</td>
                  <td className="text-center p-5 px-5">{rec.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default DetailStock;
