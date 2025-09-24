import { useState } from "react";
import { FiX, FiCheck, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const CreateWeighticket = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    w_number: "",
    car_reg: "",
    seller: "",
    varietie: "",
    net: "",
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
      seller: "",
      varietie: "",
      net: "",
      status: "",
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow max-w-12xl mx-auto mt-6 relative">
      {/* ปุ่มย้อนกลับมุมขวาบน */}
      <button
        onClick={() => navigate("/weigh_ticket")}
        className="absolute top-4 right-4 flex items-center justify-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 min-w-[100px] rounded-full shadow cursor-pointer"
      >
        <FiArrowLeft className="w-4 h-4" />
        ย้อนกลับ
      </button>
      <h1 className="text-2xl font-bold mb-4">เพิ่มใบชั่ง</h1>
      <hr className="border-b-1 border-gray-400 mb-4" />

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* แถว 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="w_number" className="mb-1 font-medium">
              เลขที่ใบสั่ง
            </label>
            <input
              type="text"
              id="w_number"
              name="w_number"
              placeholder="เลขที่ใบสั่ง"
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="seller" className="mb-1 font-medium">
              ผู้ขาย
            </label>
            <input
              type="text"
              id="seller"
              name="seller"
              placeholder="ผู้ขาย"
              value={formData.seller}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="varietie" className="mb-1 font-medium">
              พันธุ์
            </label>
            <input
              type="text"
              id="varietie"
              name="varietie"
              placeholder="พันธุ์"
              value={formData.varietie}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
        </div>
        {/* แถว 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="net" className="mb-1 font-medium">
              สุทธิ(กก.)
            </label>
            <input
              type="number"
              id="net"
              name="net"
              placeholder="สุทธิ(กก.)"
              value={formData.net}
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
