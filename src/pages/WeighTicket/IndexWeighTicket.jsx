import { useState } from "react";
import { FiEdit, FiTrash2, FiPlus, FiArrowLeft, FiInfo } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import DeleteWeighticket from "./DeleteWeighticket";

const IndexWeighTicket = () => {
  const initialTickets = [
    {
      id: 1,
      created_at: "2025-08-22",
      w_number: "D680917009",
      car_reg: "1กข1234",
      buyer_seller: "นายดำ",
      w_type: "การซื้อ",
      product: "ข้าวเปลือก ธรรมดา",
      address: "address1",
      desc: "คำอธิบายในการซื้อ",
    },
    {
      id: 2,
      created_at: "2025-08-23",
      w_number: "D680917010",
      car_reg: "2ขค5678",
      buyer_seller: "นางแดง",
      w_type: "การซื้อ",
      product: "ข้าวเปลือก หอมมะลิ",
      address: "address2",
      desc: "ซื้อข้าวเปลือกหอมมะลิจากเกษตรกร",
    },
    {
      id: 3,
      created_at: "2025-08-24",
      w_number: "D680917024",
      car_reg: "3งจ9012",
      buyer_seller: "บริษัท อรุณรุ่ง จำกัด",
      w_type: "การขาย",
      product: "ข้าวสาร หอมมะลิ 5 ตัน",
      address: "address3",
      desc: "ขายข้าวสารหอมมะลิให้ลูกค้า",
    },
  ];

  const [tickets, setTickets] = useState(initialTickets);
  const [search, setSearch] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const navigate = useNavigate();

  const filteredTickets = tickets.filter(
    (t) =>
      t.w_number.toLowerCase().includes(search.toLowerCase()) ||
      t.car_reg.toLowerCase().includes(search.toLowerCase()) ||
      t.buyer_seller.toLowerCase().includes(search.toLowerCase())
  );

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setShowDelete(true);
  };

  const handleConfirmDelete = () => {
    setTickets((prev) => prev.filter((t) => t.id !== selectedId));
    setShowDelete(false);
  };

  // summary
  const total = tickets.length;
  const buy = tickets.filter((t) => t.w_type === "การซื้อ").length;
  const sale = tickets.filter((t) => t.w_type === "การขาย").length;

  return (
    <div className="flex gap-6 p-4">
      {/* Left side */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">ใบสั่งชั่ง</h1>
          <div className="flex gap-2">
            <button
              onClick={() => navigate("/create_weigh_ticket")}
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
          placeholder="ค้นหาเลขที่, ทะเบียนรถ, ผู้ซื้อ/ผู้ขาย..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-[500px] border px-4 py-3 rounded-lg mb-4 text-lg mt-4"
        />

        {/* Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredTickets.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition rounded-xl p-4 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg font-bold">{item.w_number}</h2>
                <p className="text-sm text-gray-500">{item.created_at}</p>
                <p>ทะเบียนรถ: {item.car_reg}</p>
                <p>ผู้ซื้อ/ผู้ขาย: {item.buyer_seller}</p>
                <p>สินค้า: {item.product}</p>
                <p className="text-sm text-gray-500">หมายเหตุ: {item.desc}</p>
              </div>

              <div className="mt-2">
                <span
                  className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                    item.w_type === "การซื้อ"
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {item.w_type}
                </span>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() =>
                    navigate(
                      item.w_type === "การซื้อ"
                        ? `/detail_weighticket_purchase/${item.id}`
                        : `/detail_weighticket_sale/${item.id}`
                    )
                  }
                  className="flex items-center gap-1 px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-full cursor-pointer"
                >
                  <FiInfo /> ข้อมูล
                </button>
                <button
                  onClick={() => navigate(`/edit_weigh_ticket/${item.id}`)}
                  className="flex items-center gap-1 px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full cursor-pointer"
                >
                  <FiEdit /> แก้ไข
                </button>
                <button
                  onClick={() => handleDeleteClick(item.id)}
                  className="flex items-center gap-1 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full cursor-pointer"
                >
                  <FiTrash2 /> ลบ
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right side summary */}
      <div className="h-103 w-80 bg-white border border-gray-200 p-6 rounded-xl shadow-lg hover:shadow-xl transition">
        <h3 className="text-xl font-bold mb-2">สรุปใบสั่งชั่ง</h3>
        <p className="text-lg">ทั้งหมด: {total} ใบ</p>
        <p className="text-lg text-green-700">การซื้อ: {buy}</p>
        <p className="text-lg text-blue-700">การขาย: {sale}</p>
      </div>

      {/* Popup ลบ */}
      {showDelete && (
        <DeleteWeighticket
          onClose={() => setShowDelete(false)}
          onConfirm={handleConfirmDelete}
        />
      )}

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default IndexWeighTicket;
