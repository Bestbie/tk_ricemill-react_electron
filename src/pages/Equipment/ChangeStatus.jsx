import { useState } from "react";
import toast from "react-hot-toast";

const ChangeStatus = ({ currentStatus, onClose, onSave }) => {
  const [status, setStatus] = useState(currentStatus || "");

  const handleSave = () => {
    if (!status) {
      toast.error("กรุณาเลือกสถานะก่อนบันทึก");
      return;
    }

    if (onSave) onSave(status);

    toast.success(`เปลี่ยนสถานะเป็น "${status}" สำเร็จ`);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4">เปลี่ยนสถานะอุปกรณ์</h2>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4"
        >
          <option value="">-- เลือกสถานะ --</option>
          <option value="กำลังใช้งาน">กำลังใช้งาน</option>
          <option value="พร้อมใช้งาน">พร้อมใช้งาน</option>
          <option value="รอซ่อมบำรุง">รอซ่อมบำรุง</option>
        </select>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
          >
            ยกเลิก
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded"
          >
            บันทึก
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeStatus;
