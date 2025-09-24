import React, { useState } from "react";
import { FiX, FiCheck, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const CreateSale = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    p_number: "",
    customer: "",
    rice_type: "",
    quantity: "",
    price: "",
    payment_method: "",
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

    // ไปหน้า /sale หลัง 1 วินาที
    setTimeout(() => {
      navigate("/sale");
    }, 1000);
  };

  const handleReset = () => {
    setFormData({
      p_number: "",
      customer: "",
      rice_type: "",
      quantity: "",
      price: "",
      payment_method: "",
      status: "",
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow max-w-12xl mx-auto mt-6 relative">
      {/* ปุ่มย้อนกลับมุมขวาบน */}
      <button
        onClick={() => navigate("/sale")}
        className="absolute top-4 right-4 flex items-center justify-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 min-w-[100px] rounded-full shadow cursor-pointer"
      >
        <FiArrowLeft className="w-4 h-4" />
        ย้อนกลับ
      </button>
      <h1 className="text-2xl font-bold mb-4">เพิ่มใบสั่งขาย</h1>
      <hr className="border-b-1 border-gray-400 mb-4" />

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* แถว 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="p_number" className="mb-1 font-medium">
              เลขที่ใบสั่งขาย
            </label>
            <input
              type="text"
              id="p_number"
              name="p_number"
              placeholder="เลขที่ใบสั่งขาย"
              value={formData.p_number}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="customer" className="mb-1 font-medium">
              ผู้ขาย
            </label>
            <input
              type="text"
              id="customer"
              name="customer"
              placeholder="ผู้ขาย"
              value={formData.customer}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
        </div>
        {/* แถว 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="rice_type" className="mb-1 font-medium">
              ประเภทข้าว
            </label>
            <input
              type="text"
              id="rice_type"
              name="rice_type"
              placeholder="ประเภทข้าว"
              value={formData.rice_type}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="quantity" className="mb-1 font-medium">
              จำนวน(กก.)
            </label>
            <input
              type="text"
              id="quantity"
              name="quantity"
              placeholder="จำนวน(กก.)"
              value={formData.quantity}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
        </div>
        {/* แถว 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="price" className="mb-1 font-medium">
              ราคา/กิโลกรัม
            </label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="ราคา/กิโลกรัม"
              value={formData.price}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="payment_method" className="mb-1 font-medium">
              วิธีชำระเงิน
            </label>
            <select
              id="payment_method"
              name="payment_method"
              value={formData.payment_method}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            >
              <option value="">-- เลือกวิธีชำระเงิน --</option>
              <option value="เงินสด">เงินสด</option>
              <option value="โอนเงิน">โอนเงิน</option>
              <option value="เครดิต">เครดิต</option>
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

export default CreateSale;
