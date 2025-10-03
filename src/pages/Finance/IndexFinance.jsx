import { useState } from "react";
import { FiEdit, FiTrash2, FiPlus, FiArrowLeft } from "react-icons/fi";
import { IoMdPrint } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import DeleteFinance from "./DeleteFinance";
import { Toaster } from "react-hot-toast";

const IndexFinance = () => {
  const initialFinances = [
    {
      id: 1,
      f_number: "BIL-20250922-001",
      f_list: "การขาย1",
      created_at: "2025-08-22",
      f_type_money: "เงินสด",
      amount: 10000,
      f_type: "ค่าขนส่ง",
      status: "จ่ายแล้ว",
    },
    {
      id: 2,
      f_number: "BIL-20250922-002",
      f_list: "การซื้อ2",
      created_at: "2025-08-23",
      f_type_money: "โอนจ่าย",
      amount: 25500,
      f_type: "ค่าวัตถุดิบ",
      status: "รอจ่าย",
    },
    {
      id: 3,
      f_number: "BIL-20250922-003",
      f_list: "การขาย3",
      created_at: "2025-08-24",
      f_type_money: "เงินสด",
      amount: 7800,
      f_type: "ค่าบริการ",
      status: "จ่ายแล้ว",
    },
  ];

  const [finances, setFinances] = useState(initialFinances);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setShowDelete(true);
  };

  const handleConfirmDelete = () => {
    setFinances((prev) => prev.filter((f) => f.id !== selectedId));
    setShowDelete(false);
  };

  const filteredFinances = finances.filter(
    (f) =>
      f.f_number.toLowerCase().includes(search.toLowerCase()) ||
      f.f_list.toLowerCase().includes(search.toLowerCase())
  );

  // summary
  const totalAmount = finances.reduce((sum, f) => sum + f.amount, 0);
  const paidAmount = finances
    .filter((f) => f.status === "จ่ายแล้ว")
    .reduce((sum, f) => sum + f.amount, 0);
  const waitingAmount = finances
    .filter((f) => f.status === "รอจ่าย")
    .reduce((sum, f) => sum + f.amount, 0);

  return (
    <div className="flex gap-6 p-4">
      {/* Left: list */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">รายการการเงิน</h1>
          <div className="flex gap-2">
            <button
              onClick={() => navigate("/create_finance")}
              className="flex items-center gap-1 bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-full shadow cursor-pointer"
            >
              <FiPlus /> เพิ่ม
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-full shadow cursor-pointer"
            >
              <FiArrowLeft /> ย้อนกลับ
            </button>
          </div>
        </div>

        <hr />

        {/* Search */}
        <input
          type="text"
          placeholder="ค้นหาเลขบิลหรือรายการ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-[500px] border px-4 py-3 rounded-lg mb-4 text-lg mt-4"
        />

        {/* Card layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredFinances.map((f) => (
            <div
              key={f.id}
              className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition p-4 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg font-bold">{f.f_number}</h2>
                <p className="text-sm text-gray-500">วันที่: {f.created_at}</p>
                <p>รายการ: {f.f_list}</p>
                <p>ประเภท: {f.f_type}</p>
                <p>
                  ประเภทเงิน:{" "}
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-semibold ${
                      f.f_type_money === "เงินสด"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {f.f_type_money}
                  </span>
                </p>
                <p className="font-bold mt-2 text-xl text-gray-700">
                  {f.amount.toLocaleString()} บาท
                </p>
              </div>

              <div className="mt-2">
                <span
                  className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                    f.status === "จ่ายแล้ว"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {f.status}
                </span>
              </div>

              {/* action */}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => {
                    alert("กำลังพิมพ์เอกสาร...");
                  }}
                  className="flex items-center gap-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full cursor-pointer"
                >
                  <IoMdPrint /> พิมพ์
                </button>
                <button
                  onClick={() => navigate(`/edit_finance/${f.id}`)}
                  className="flex items-center gap-1 px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full cursor-pointer"
                >
                  <FiEdit /> แก้ไข
                </button>
                <button
                  onClick={() => handleDeleteClick(f.id)}
                  className="flex items-center gap-1 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full cursor-pointer"
                >
                  <FiTrash2 /> ลบ
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: summary */}
      <div className="h-105 w-80 bg-white border border-gray-100 p-4 rounded-xl shadow-lg hover:shadow-xl transition">
        <h3 className="text-xl font-bold mb-2">สรุปการเงิน</h3>
        <p className="text-lg">จำนวนบิล: {finances.length}</p>
        <p className="text-lg text-green-700">
          จ่ายแล้ว: {paidAmount.toLocaleString()} บาท
        </p>
        <p className="text-lg text-yellow-700">
          รอจ่าย: {waitingAmount.toLocaleString()} บาท
        </p>
        <p className="text-lg font-bold mt-2">
          รวมทั้งหมด: {totalAmount.toLocaleString()} บาท
        </p>
      </div>

      {/* Delete Modal */}
      {showDelete && (
        <DeleteFinance
          onClose={() => setShowDelete(false)}
          onConfirm={handleConfirmDelete}
        />
      )}


      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default IndexFinance;
