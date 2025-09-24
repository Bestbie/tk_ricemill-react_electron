import { useEffect } from "react";
import { FiX } from "react-icons/fi";
import { IoMdPrint } from "react-icons/io";

const PrinterFinance = ({ data, onClose }) => {
  // ฟังก์ชันพิมพ์
  const handlePrint = () => {
    window.print();
  };

  // ปิด modal ด้วยปุ่ม Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!data) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
      <div className="bg-white w-[800px] p-8 rounded-lg shadow-lg relative">
        {/* ปุ่มปิด */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
        ></button>

        {/* หัวเอกสาร */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-sm">
              <span className="font-semibold">วันที่:</span> {data.created_at}
            </p>
            <p className="text-sm">
              <span className="font-semibold">เลขที่บิล:</span> {data.f_number}
            </p>
          </div>
          <div className="border border-black px-4 py-1 font-bold text-lg">
            ใบรับสินค้า/บิลการเงิน
          </div>
        </div>

        {/* รายละเอียดผู้จ่าย */}
        <div className="mb-6 text-sm">
          <p>
            <span className="font-semibold">ผู้จ่าย:</span> {data.created_by}
          </p>
          <p>
            <span className="font-semibold">ประเภท:</span> {data.f_type}
          </p>
          <p>
            <span className="font-semibold">หัก ณ ที่จ่าย:</span> {data.f_tax}
          </p>
          <p>
            <span className="font-semibold">สถานะ:</span> {data.status}
          </p>
        </div>

        {/* ตารางรายการสินค้า */}
        <table className="w-full border border-black text-sm mb-6">
          <thead>
            <tr className="bg-gray-100 border-b border-black text-center">
              <th className="border-r border-black px-2 py-1">รายการ</th>
              <th className="border-r border-black px-2 py-1">ราคา/หน่วย</th>
              <th className="px-2 py-1">จำนวนเงิน</th>
            </tr>
          </thead>
          <tbody>
            {data.items?.map((item, i) => (
              <tr key={i} className="text-center">
                <td className="border-t border-r border-black px-2 py-1">
                  {item.created_by}
                </td>
                <td className="border-t border-r border-black px-2 py-1">
                  {item.price}
                </td>
                <td className="border-t border-black px-2 py-1">
                  {item.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* สรุปยอดเงิน */}
        <div className="flex justify-end mb-6">
          <table className="w-1/2 text-sm border-t border-black">
            <tbody>
              <tr>
                <td>ยอดเงินรวม</td>
                <td className="text-right">{data.amount} บาท</td>
              </tr>
              <tr>
                <td>หัก ณ ที่จ่าย</td>
                <td className="text-right">{data.f_tax}</td>
              </tr>
              <tr className="font-bold">
                <td>ยอดเงินสุทธิ</td>
                <td className="text-right">{data.amount} บาท</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ลายเซ็น */}
        <div className="flex justify-between mt-10 text-sm">
          <div>ผู้ส่งสินค้า: ..............................</div>
          <div>ผู้รับสินค้า: ..............................</div>
        </div>

        {/* ปุ่ม */}
        <div className="flex gap-4 justify-center mt-8">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 cursor-pointer"
          >
            <IoMdPrint size={18} /> พิมพ์
          </button>
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 bg-gray-400 text-white rounded-full hover:bg-gray-500 cursor-pointer"
          >
            <FiX size={18} /> ปิด
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrinterFinance;
