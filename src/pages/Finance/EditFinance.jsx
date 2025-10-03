/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { FiX, FiArrowLeft } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { MdEdit } from "react-icons/md";

const EditFinance = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const initialFinances = [
    {
      id: 1,
      f_number: "BIL-20250922-001",
      f_list: "การขาย1",
      created_at: "2025-08-22",
      f_type_money: "เงินสด",
      amount: "10,000",
      f_type: "ค่าขนส่ง",
      status: "จ่ายแล้ว",
    },
    {
      id: 2,
      f_number: "BIL-20250922-002",
      f_list: "การซื้อ2",
      created_at: "2025-08-23",
      f_type_money: "โอนจ่าย",
      amount: "25,500",
      f_type: "ค่าวัตถุดิบ",
      status: "รอจ่าย",
    },
    {
      id: 3,
      f_number: "BIL-20250922-003",
      f_list: "การขาย3",
      created_at: "2025-08-24",
      f_type_money: "เงินสด",
      amount: "7,800",
      f_type: "ค่าบริการ",
      status: "จ่ายแล้ว",
    },
  ];

  const [formData, setFormData] = useState({
    f_number: "",
    f_list: "",
    f_type_money: "",
    amount: "",
    f_type: "",
    status: "",
  });

  useEffect(() => {
    const finance = initialFinances.find((t) => t.id === parseInt(id));
    if (finance) {
      setFormData(finance);
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

    // ไปหน้า /finance หลัง 1 วินาที
    setTimeout(() => {
      navigate("/finance");
    }, 1000);
  };

  const handleReset = () => {
    // โหลดข้อมูลเดิมกลับมา
    const finance = initialFinances.find((t) => t.id === parseInt(id));
    if (finance) setFormData(finance);
  };

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition max-w-12xl mx-auto mt-6 relative">
      {/* ปุ่มย้อนกลับ */}
      <button
        onClick={() => navigate("/finance")}
        className="absolute top-4 right-4 flex items-center justify-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 min-w-[100px] rounded-full shadow cursor-pointer"
      >
        <FiArrowLeft className="w-4 h-4" />
        ย้อนกลับ
      </button>

      <h1 className="text-2xl font-bold mb-4">แก้ไขการเงิน</h1>
      <hr className="border-b-1 border-gray-400 mb-4" />

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* แถว 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="f_number" className="mb-1 font-medium">
              เลขที่บิล
            </label>
            <input
              type="text"
              id="f_number"
              name="f_number"
              placeholder="เลขที่บิล"
              value={formData.f_number}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="f_list" className="mb-1 font-medium">
              รายการ
            </label>
            <input
              type="text"
              id="f_list"
              name="f_list"
              placeholder="รายการ"
              value={formData.f_list}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
        </div>

        {/* แถว 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="f_type_money" className="mb-1 font-medium">
              ประเภท
            </label>
            <select
              id="f_type_money"
              name="f_type_money"
              value={formData.f_type_money}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            >
              <option value="">เลือกประเภท</option>
              <option value="เงินสด">เงินสด</option>
              <option value="โอนจ่าย">โอนจ่าย</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="amount" className="mb-1 font-medium">
              ยอดเงิน
            </label>
            <input
              type="text"
              id="amount"
              name="amount"
              placeholder="ยอดเงิน"
              value={formData.amount}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="f_type" className="mb-1 font-medium">
              ประเภท
            </label>
            <select
              id="f_type"
              name="f_type"
              value={formData.f_type}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            >
              <option value="">เลือกประเภท</option>
              <option value="ค่าขนส่ง">ค่าขนส่ง</option>
              <option value="ค่าวัตถุดิบ">ค่าวัตถุดิบ</option>
              <option value="ค่าบริการ">ค่าบริการ</option>
            </select>
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

export default EditFinance;
