import { FiTrash2, FiX } from "react-icons/fi";
import toast from "react-hot-toast";

const DeleteFinance = ({ onClose, onConfirm }) => {
  const handleDelete = (e) => {
    e.preventDefault();

    // แสดง Toast
    toast.success("ลบข้อมูลสำเร็จ!");

    // เรียก callback ของ parent
    if (onConfirm) onConfirm();

    // ปิด popup
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      {/* Popup */}
      <div className="relative bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition p-6 w-80 z-50 pointer-events-auto">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <FiTrash2 className="w-5 h-5 text-red-500" />
          ยืนยันการลบ?
        </h2>
        <p className="mb-4">คุณต้องการลบบิลนี้หรือไม่?</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 flex items-center gap-1 rounded-full cursor-pointer"
          >
            <FiX className="w-4 h-4" /> ยกเลิก
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 flex items-center gap-1 rounded-full cursor-pointer"
          >
            <FiTrash2 className="w-4 h-4" /> ลบ
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteFinance;
