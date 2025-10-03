import React from "react";
import { FiX } from "react-icons/fi";

const PurchaseModal = ({ show, onClose, purchase, weighTickets }) => {
  if (!show || !purchase) return null;

  const ticket = weighTickets.find((w) => w.id === purchase.ticket_id);

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-lg hover:shadow-xl transition w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          <FiX
            size={20}
            className="cursor-pointer text-red-600 hover:text-red-300"
          />
        </button>
        <h2 className="text-lg font-bold mb-4">รายละเอียดใบสั่งซื้อ</h2>
        <div>เลขที่ใบสั่งซื้อ: {purchase.invoice_number}</div>
        <div>เลขที่ใบชั่ง: {ticket?.ticket_number}</div>
        <div>ทะเบียนรถ: {ticket?.car_plate}</div>
        <div>สินค้า: {ticket?.product}</div>
        <div>สถานะ: {purchase.status}</div>
        <div>ยอดรวม: {(purchase.total_amount ?? 0).toLocaleString()}</div>
      </div>
    </div>
  );
};

export default PurchaseModal;
