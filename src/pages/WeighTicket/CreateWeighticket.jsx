import { useState } from "react";
import { FiX, FiCheck, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const CreateWeighticket = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    w_number: "",
    car_reg: "",
    buyer_seller: "",
    w_type: "",
    product: "",
    address: "",
    desc: "",
    status: "",
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

    // ไปหน้า /weigh_ticket หลัง 1 วินาที
    setTimeout(() => {
      navigate("/weigh_ticket");
    }, 1000);
  };

  const handleReset = () => {
    setFormData({
      w_number: "",
      car_reg: "",
      buyer_seller: "",
      w_type: "",
      product: "",
      address: "",
      desc: "",
      status: "",
    });
  };

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition max-w-12xl mx-auto mt-6 relative">
      {/* ปุ่มย้อนกลับมุมขวาบน */}
      <button
        onClick={() => navigate("/weigh_ticket")}
        className="absolute top-4 right-4 flex items-center justify-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 min-w-[100px] rounded-full shadow cursor-pointer"
      >
        <FiArrowLeft className="w-4 h-4" />
        ย้อนกลับ
      </button>
      <h1 className="text-2xl font-bold mb-4">เพิ่มใบชั่งน้ำหนัก</h1>
      <hr className="border-b-1 border-gray-400 mb-4" />

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* แถว 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="w_number" className="mb-1 font-medium">
              เลขที่ใบชั่งน้ำหนัก
            </label>
            <input
              type="text"
              id="w_number"
              name="w_number"
              placeholder="เลขที่ใบชั่งน้ำหนัก"
              value={formData.w_number}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="car_reg" className="mb-1 font-medium">
              ทะเบียนรถ
            </label>
            <input
              type="text"
              id="car_reg"
              name="car_reg"
              placeholder="ทะเบียนรถ"
              value={formData.car_reg}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
        </div>
        {/* แถว 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <label htmlFor="buyer_seller" className="mb-1 font-medium">
              ผู้ซื้อ/ผู้ขาย
            </label>
            <input
              type="text"
              id="buyer_seller"
              name="buyer_seller"
              placeholder="ผู้ซื้อ/ผู้ขาย"
              value={formData.buyer_seller}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="w_type" className="mb-1 font-medium">
              ประเภท
            </label>
            <select
              id="w_type"
              name="w_type"
              value={formData.w_type}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            >
              <option value="">เลือกประเภท</option>
              <option value="การซื้อ">การซื้อ</option>
              <option value="การขาย">การขาย</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="product" className="mb-1 font-medium">
              สินค้า
            </label>
            <input
              type="text"
              id="product"
              name="product"
              placeholder="สินค้า"
              value={formData.product}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
        </div>
        {/* แถว 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          <div className="flex flex-col">
            <label htmlFor="desc" className="mb-1 font-medium">
              คำอธิบาย
            </label>
            <textarea
              id="desc"
              name="desc"
              placeholder="คำอธิบาย"
              value={formData.desc}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
              rows={4} // กำหนดความสูงของ textarea
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
            className="flex items-center justify-center gap-1 bg-green-500 hover:bg-green-700 text-white px-4 py-2 min-w-[100px] rounded-full shadow cursor-pointer"
          >
            <FiCheck className="w-4 h-4" />
            บันทึก
          </button>
        </div>
      </form>

      {/* Toast container */}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default CreateWeighticket;
