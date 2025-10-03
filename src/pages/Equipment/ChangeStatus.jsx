import { useState } from "react";
import toast from "react-hot-toast";

const ChangeStatus = ({ currentStatus, currentNote, onClose, onSave }) => {
  const [status, setStatus] = useState(currentStatus || "");
  const [note, setNote] = useState(currentNote || "");

  const handleSave = () => {
    if (!status) {
      toast.error("กรุณาเลือกสถานะก่อนบันทึก");
      return;
    }

    if ((status === "รอซ่อมบำรุง" || status === "กำลังซ่อม") && !note) {
      toast.error("กรุณากรอกรายละเอียดการซ่อมก่อนบันทึก");
      return;
    }

    if (onSave) onSave({ status, note });

    toast.success(`เปลี่ยนสถานะเป็น "${status}" สำเร็จ`);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-lg hover:shadow-xl transition w-96">
        <h2 className="text-xl font-bold mb-4">เปลี่ยนสถานะอุปกรณ์</h2>

        {/* dropdown เลือกสถานะ */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4"
        >
          <option value="">-- เลือกสถานะ --</option>
          <option value="กำลังใช้งาน">กำลังใช้งาน</option>
          <option value="พร้อมใช้งาน">พร้อมใช้งาน</option>
          <option value="รอซ่อมบำรุง">รอซ่อมบำรุง</option>
          <option value="กำลังซ่อม">กำลังซ่อม</option>
        </select>

        {/* ช่องหมายเหตุ จะแสดงเมื่อเลือกสถานะที่เกี่ยวกับซ่อม */}
        {(status === "รอซ่อมบำรุง" || status === "กำลังซ่อม") && (
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="กรอกรายละเอียดการซ่อม..."
            className="w-full border rounded px-3 py-2 mb-4"
            rows="3"
          />
        )}

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-full cursor-pointer"
          >
            ยกเลิก
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded-full cursor-pointer"
          >
            บันทึก
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeStatus;
