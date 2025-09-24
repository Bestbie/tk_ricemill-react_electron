/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { FiX, FiArrowLeft } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { MdEdit } from "react-icons/md";

const EditStock = () => {
  const navigate = useNavigate();
  const { id } = useParams();

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
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("อัปเดตข้อมูล:", formData);

    // แสดง Toast
    toast.success("แก้ไขสำเร็จ!");

    // ไปหน้า /stock หลัง 1 วินาที
    setTimeout(() => {
      navigate("/stock");
    }, 1000);
  };

  const handleReset = () => {
    // โหลดข้อมูลเดิมกลับมา
    const stock = initialLots.find((t) => t.id === parseInt(id));
    if (stock) setFormData(stock);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow max-w-12xl mx-auto mt-6 relative">
      {/* ปุ่มย้อนกลับ */}
      <button
        onClick={() => navigate("/stock")}
        className="absolute top-4 right-4 flex items-center justify-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 min-w-[100px] rounded-full shadow cursor-pointer"
      >
        <FiArrowLeft className="w-4 h-4" />
        ย้อนกลับ
      </button>

      <h1 className="text-2xl font-bold mb-4">แก้ไขสต๊อก — Lot</h1>
      <hr className="border-b-1 border-gray-400 mb-4" />

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* แถว 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="lot_number" className="mb-1 font-medium">
              เลขที่ Lot
            </label>
            <input
              type="text"
              id="lot_number"
              name="lot_number"
              placeholder="เลขที่ Lot"
              value={formData.lot_number}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="supplier" className="mb-1 font-medium">
              ผู้ส่ง
            </label>
            <input
              type="text"
              id="supplier"
              name="supplier"
              placeholder="ผู้ส่ง"
              value={formData.supplier}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
        </div>

        {/* แถว 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="gross_weight" className="mb-1 font-medium">
              น้ำหนักรวม
            </label>
            <input
              type="text"
              id="gross_weight"
              name="gross_weight"
              placeholder="น้ำหนักรวม"
              value={formData.gross_weight}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="variety" className="mb-1 font-medium">
              พันธุ์
            </label>
            <select
              id="variety"
              name="variety"
              value={formData.variety}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            >
              <option value="">เลือกพันธุ์</option>
              <option value="กข43">กข43</option>
              <option value="กข31">กข31</option>
              <option value="หอมมะลิ">หอมมะลิ</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="moisture" className="mb-1 font-medium">
              ความชื้น
            </label>
            <input
              type="text"
              id="moisture"
              name="moisture"
              placeholder="ความชื้น"
              value={formData.moisture}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
        </div>

        {/* ปุ่มบันทึก / ยกเลิก */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center justify-center gap-1 bg-red-500 hover:bg-red-700 text-white px-4 py-2 min-w-[100px] rounded-full shadow cursor-pointer"
          >
            <FiX className="w-4 h-4" />
            ยกเลิก
          </button>

          <button
            type="submit"
            className="flex items-center justify-center gap-1 bg-yellow-500 hover:bg-yellow-700 text-white px-4 py-2 min-w-[100px] rounded-full shadow cursor-pointer"
          >
            <MdEdit className="w-4 h-4" />
            แก้ไข
          </button>
        </div>
      </form>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default EditStock;
