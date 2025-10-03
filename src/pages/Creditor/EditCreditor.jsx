/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { FiX, FiArrowLeft } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { MdEdit } from "react-icons/md";

const EditCreditor = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const dataCreditor = [
    {
      id: 1,
      c_number: "Cfd15457f42",
      name: "นายดำ",
      address: "123/4 หมู่ 5 อ.เมือง",
      phone: "0812345678",
    },
    {
      id: 2,
      c_number: "Cfd15457f87",
      name: "นางแดง",
      address: "12 หมู่ 7 อ.เมือง",
      phone: "0812345458",
    },
  ];

  const [formData, setFormData] = useState({
    c_number: "",
    name: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    const creditor = dataCreditor.find((t) => t.id === parseInt(id));
    if (creditor) {
      setFormData(creditor);
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

    // ไปหน้า /weigh_creditor หลัง 1 วินาที
    setTimeout(() => {
      navigate("/creditor");
    }, 1000);
  };

  const handleReset = () => {
    // โหลดข้อมูลเดิมกลับมา
    const creditor = dataCreditor.find((t) => t.id === parseInt(id));
    if (creditor) setFormData(creditor);
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

      <h1 className="text-2xl font-bold mb-4">แก้ไขเจ้าหนี้</h1>
      <hr className="border-b-1 border-gray-400 mb-4" />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="c_number" className="mb-1 font-medium">
              เลขที่เจ้าหนี้
            </label>
            <input
              type="text"
              id="c_number"
              name="c_number"
              placeholder="เลขที่เจ้าหนี้"
              value={formData.c_number}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 font-medium">
              ชื่อเจ้าหนี้
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="ชื่อเจ้าหนี้"
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
              type="text"
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

export default EditCreditor;
