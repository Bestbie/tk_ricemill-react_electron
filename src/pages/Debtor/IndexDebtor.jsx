import { FiEdit, FiTrash2, FiPlus, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import DeleteDebtor from "./DeleteDebtor";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import DebtorModel from "./DebtorModel";

const IndexDebtor = () => {
  const initialDebtors = [
    {
      id: 3,
      c_number: "C001",
      name: "บริษัท อรุณรุ่ง จำกัด",
      address: "123/4 หมู่ 5",
      phone: "0812345678",
      created_at: "12-05-2564",
    },
  ];

  const initialSales = [
    {
      id: 2,
      invoice_number: "P567891",
      seller_id: 3,
      ticket_id: 2,
      total_amount: 17548,
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
  ];

  const [debtors, setDebtors] = useState(initialDebtors);
  const [sales] = useState(initialSales);
  const [weighTickets] = useState(initialWeighTickets);
  const [showSaleModal, setShowSaleModal] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setShowDelete(true);
  };

  const handleConfirmDelete = () => {
    setDebtors((prev) => prev.filter((u) => u.id !== selectedId));
    setShowDelete(false);
  };

  const handleOpenSale = (sale) => {
    setSelectedSale(sale);
    setShowSaleModal(true);
  };

  const handleCloseSale = () => {
    setSelectedSale(null);
    setShowSaleModal(false);
  };

  // filter ตาม search
  const filteredDebtors = debtors.filter(
    (c) =>
      c.c_number.toLowerCase().includes(search.toLowerCase()) ||
      c.name.toLowerCase().includes(search.toLowerCase())
  );

  // ยอดลูกหนี้รวม
  const totalBalance = sales
    .filter((s) => s.status === "ค้างจ่าย")
    .reduce((sum, s) => sum + s.total_amount, 0);

  return (
    <div className="flex gap-6 p-4">
      {/* Left: รายการลูกหนี้ */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">รายการลูกหนี้</h1>
          <div className="flex gap-2">
            <button
              onClick={() => navigate("/create_debtor")}
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
          placeholder="ค้นหาลูกหนี้ด้วยชื่อ หรือ เลขที่..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-[500px] border px-4 py-3 rounded-lg mb-4 text-lg mt-4"
        />

        {/* Card layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredDebtors.map((d) => {
            const relatedSales = sales.filter((s) => s.seller_id === d.id);
            const balance = relatedSales
              .filter((s) => s.status === "ค้างจ่าย")
              .reduce((sum, s) => sum + s.total_amount, 0);

            return (
              <div
                key={d.id}
                className="bg-white border border-gray-200 shadow-lg rounded-xl hover:shadow-xs transition p-4 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl font-bold">{d.name}</h2>
                  <p className="text-gray-500">{d.c_number}</p>
                  <p>{d.phone}</p>
                  <p className="text-sm text-gray-600">{d.address}</p>
                  <p className="mt-2 font-semibold">
                    ยอดคงเหลือ:{" "}
                    <span className="text-red-600">
                      {balance.toLocaleString()} บาท
                    </span>
                  </p>
                </div>

                <div className="mt-4 space-y-2">
                  {relatedSales.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => handleOpenSale(s)}
                      className={`w-full px-3 py-2 rounded-full font-semibold cursor-pointer ${
                        s.status === "ค้างจ่าย"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {s.invoice_number} - {s.status}
                    </button>
                  ))}
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => navigate(`/edit_debtor/${d.id}`)}
                    className="flex items-center gap-1 px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full cursor-pointer"
                  >
                    <FiEdit /> แก้ไข
                  </button>
                  <button
                    onClick={() => handleDeleteClick(d.id)}
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

      {/* Right: Summary panel */}
      <div className="h-104 w-80 bg-white border border-gray-200 p-4 rounded-xl shadow-lg hover:shadow-xl transition">
        <h3 className="text-xl font-bold mb-2">สรุปลูกหนี้</h3>
        <p className="text-lg">ลูกหนี้ทั้งหมด: {debtors.length} ราย</p>
        <p className="text-lg">
          ยอดค้างจ่ายรวม:{" "}
          <span className="text-red-600 font-bold">
            {totalBalance.toLocaleString()} บาท
          </span>
        </p>
      </div>

      {/* Delete modal */}
      {showDelete && (
        <DeleteDebtor
          onClose={() => setShowDelete(false)}
          onConfirm={handleConfirmDelete}
        />
      )}

      {/* Sale modal */}
      <DebtorModel
        show={showSaleModal}
        onClose={handleCloseSale}
        sale={selectedSale}
        weighTickets={weighTickets}
      />

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default IndexDebtor;
