import { useState } from "react";
import { FiX, FiCheck, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const CreateDebtor = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    c_number: "",
    name: "",
    address: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("ข้อมูลที่กรอก:", formData);

    // แสดง Toast
    toast.success("บันทึกสำเร็จ!");

    // ไปหน้า /debtor หลัง 1 วินาที
    setTimeout(() => {
      navigate("/debtor");
    }, 1000);
  };

  const handleReset = () => {
    setFormData({
      c_number: "",
      name: "",
      address: "",
      phone: "",
    });
  };

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition max-w-12xl mx-auto mt-6 relative">
      <button
        onClick={() => navigate("/creditor")}
        className="absolute top-4 right-4 flex items-center justify-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 min-w-[100px] rounded-full shadow cursor-pointer"
      >
        <FiArrowLeft className="w-4 h-4" />
        ย้อนกลับ
      </button>
      <h1 className="text-2xl font-bold mb-4">เพิ่มลูกหนี้</h1>
      <hr className="border-b-1 border-gray-400 mb-4" />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="c_number" className="mb-1 font-medium">
              เลขที่ลูกหนี้
            </label>
            <input
              type="text"
              id="c_number"
              name="c_number"
              placeholder="เลขที่ลูกหนี้"
              value={formData.c_number}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 font-medium">
              ชื่อลูกหนี้
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="ชื่อลูกหนี้"
              value={formData.name}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
        </div>
        {/* แถว 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="phone" className="mb-1 font-medium">
              เบอร์โทร
            </label>
            <input
              type="number"
              id="phone"
              name="phone"
              placeholder="เบอร์โทร"
              value={formData.phone}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="address" className="mb-1 font-medium">
              ที่อยู่
            </label>
            <textarea
              id="address"
              name="address"
              placeholder="ที่อยู่"
              value={formData.address}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
              rows={4} // กำหนดความสูงของ textarea
            />
          </div>
        </div>

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
            className="flex items-center justify-center gap-1 bg-green-500 hover:bg-green-700 text-white px-4 py-2 min-w-[100px] rounded-full shadow cursor-pointer"
          >
            <FiCheck className="w-4 h-4" />
            บันทึก
          </button>
        </div>
      </form>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default CreateDebtor;
