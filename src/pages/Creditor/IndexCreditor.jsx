import { FiEdit, FiTrash2, FiPlus, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import DeleteCreditor from "./DeleteCreditor";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import PurchaseModal from "./PurchaseModal";

const IndexCreditor = () => {
  const initialCreditors = [
    {
      id: 1,
      c_number: "C001",
      name: "นายดำ",
      address: "123/4 หมู่ 5",
      phone: "0812345678",
      created_at: "12-05-2564",
    },
    {
      id: 2,
      c_number: "C002",
      name: "นางแดง",
      address: "12 หมู่ 7",
      phone: "0812345458",
      created_at: "12-12-2565",
    },
    {
      id: 3,
      c_number: "C003",
      name: "นายเขียว",
      address: "14",
      phone: "0812345754",
      created_at: "25-12-2565",
    },
  ];

  const initialPurchases = [
    {
      id: 1,
      invoice_number: "P567890",
      seller_id: 1,
      ticket_id: 1,
      total_amount: 15461,
      status: "ค้างจ่าย",
    },
    {
      id: 2,
      invoice_number: "P567891",
      seller_id: 2,
      ticket_id: 2,
      total_amount: 17548,
      status: "จ่ายแล้ว",
    },
    {
      id: 2,
      invoice_number: "P567874",
      seller_id: 3,
      ticket_id: 3,
      total_amount: 17555,
      status: "จ่ายแล้ว",
    },
  ];

  const initialWeighTickets = [
    {
      id: 1,
      ticket_number: "W123456",
      car_plate: "1กข1234",
      product: "ข้าวเปลือก ธรรมดา",
    },
    {
      id: 2,
      ticket_number: "W123457",
      car_plate: "2ขค5678",
      product: "ข้าวหอมมะลิ",
    },
    {
      id: 3,
      ticket_number: "W123458",
      car_plate: "14ก256",
      product: "ข้าวหอมมะลิ",
    },
  ];

  const [creditors, setCreditors] = useState(initialCreditors);
  const [purchases] = useState(initialPurchases);
  const [weighTickets] = useState(initialWeighTickets);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setShowDelete(true);
  };

  const handleConfirmDelete = () => {
    setCreditors((prev) => prev.filter((u) => u.id !== selectedId));
    setShowDelete(false);
  };

  const handleOpenPurchase = (purchase) => {
    setSelectedPurchase(purchase);
    setShowPurchaseModal(true);
  };

  const handleClosePurchase = () => {
    setSelectedPurchase(null);
    setShowPurchaseModal(false);
  };

  const filteredCreditors = creditors.filter(
    (c) =>
      c.c_number.toLowerCase().includes(search.toLowerCase()) ||
      c.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalBalance = purchases
    .filter((p) => p.status === "ค้างจ่าย")
    .reduce((sum, p) => sum + p.total_amount, 0);

  return (
    <div className="flex gap-6 p-4">
      {/* Left: creditor list */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">รายการเจ้าหนี้</h1>
          <div className="flex gap-2">
            <button
              onClick={() => navigate("/create_creditor")}
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
        {/* Search bar */}
        <input
          type="text"
          placeholder="ค้นหาเจ้าหนี้ด้วยชื่อ หรือ เลขที่..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-[500px] border px-4 py-3 rounded-lg mb-4 text-lg mt-4"
        />

        {/* Card layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredCreditors.map((c) => {
            const relatedPurchases = purchases.filter(
              (p) => p.seller_id === c.id
            );
            const balance = relatedPurchases
              .filter((p) => p.status === "ค้างจ่าย")
              .reduce((sum, p) => sum + p.total_amount, 0);

            return (
              <div
                key={c.id}
                className="bg-white border border-gray-200 shadow-lg rounded-xl hover:shadow-xl transition p-4 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl font-bold">{c.name}</h2>
                  <p className="text-gray-500">{c.c_number}</p>
                  <p>{c.phone}</p>
                  <p className="text-sm text-gray-600">{c.address}</p>
                  <p className="mt-2 font-semibold">
                    ยอดคงเหลือ:{" "}
                    <span className="text-red-600">
                      {balance.toLocaleString()} บาท
                    </span>
                  </p>
                </div>

                <div className="mt-4 space-y-2">
                  {relatedPurchases.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handleOpenPurchase(p)}
                      className={`w-full px-3 py-2 rounded-full font-semibold  cursor-pointer ${
                        p.status === "ค้างจ่าย"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {p.invoice_number} - {p.status}
                    </button>
                  ))}
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => navigate(`/edit_creditor/${c.id}`)}
                    className="flex items-center gap-1 px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full cursor-pointer"
                  >
                    <FiEdit /> แก้ไข
                  </button>
                  <button
                    onClick={() => handleDeleteClick(c.id)}
                    className="flex items-center gap-1 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full cursor-pointer"
                  >
                    <FiTrash2 /> ลบ
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: summary panel */}
      <div className="h-104 w-80 bg-white border border-gray-100 p-4 rounded-xl shadow-lg hover:shadow-xl transition">
        <h3 className="text-xl font-bold mb-2">สรุปยอดรวม</h3>
        <p className="text-lg">เจ้าหนี้ทั้งหมด: {creditors.length} ราย</p>
        <p className="text-lg">
          ยอดค้างจ่ายรวม:{" "}
          <span className="text-red-600 font-bold">
            {totalBalance.toLocaleString()} บาท
          </span>
        </p>
      </div>

      {/* Delete modal */}
      {showDelete && (
        <DeleteCreditor
          onClose={() => setShowDelete(false)}
          onConfirm={handleConfirmDelete}
        />
      )}

      {/* Purchase modal */}
      <PurchaseModal
        show={showPurchaseModal}
        onClose={handleClosePurchase}
        purchase={selectedPurchase}
        weighTickets={weighTickets}
      />

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default IndexCreditor;
