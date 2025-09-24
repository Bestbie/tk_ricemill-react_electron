import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiCheck } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import { FiX } from "react-icons/fi";

const initialLots = [
  {
    id: 1,
    lot_number: "LOT-20250922-001",
    gross_weight: "10,000",
  },
  {
    id: 2,
    lot_number: "LOT-20250922-002",
    gross_weight: "5,500",
  },
  {
    id: 3,
    lot_number: "LOT-20250922-003",
    gross_weight: "8,750",
  },
  {
    id: 4,
    lot_number: "LOT-20250922-004",
    gross_weight: "12,300",
  },
];

const DispatchStock = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const lot = initialLots.find((l) => l.id === parseInt(id));
  const lot_number = lot ? lot.lot_number : "ไม่พบ Lot";

  const [formData, setFormData] = useState({
    quantity: "",
    destination: "",
    note: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const oldWeight = parseFloat(lot.gross_weight.replace(/,/g, "")) || 0;
    const minusWeight = parseFloat(formData.quantity) || 0;
    const newWeight = oldWeight - minusWeight;

    lot.gross_weight = newWeight.toLocaleString();

    toast.success("บันทึกสำเร็จ!");
    setTimeout(() => {
      navigate(`/detail_stock/${lot.id}`);
    }, 1000);
  };

  const handleReset = () => {
    setFormData({
      quantity: "",
      destination: "",
      note: "",
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow max-w-12xl mx-auto mt-6 relative">
      <button
        onClick={() => navigate(`/detail_stock/${lot.id}`)}
        className="absolute top-4 right-4 flex items-center justify-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 min-w-[100px] rounded-full shadow cursor-pointer"
      >
        <FiArrowLeft className="w-4 h-4" />
        ย้อนกลับ
      </button>
      <h1 className="text-2xl font-bold mb-4">เบิก/ออก Lot #{lot_number}</h1>
      <hr className="border-b-1 border-gray-400 mb-4" />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <div className="flex flex-col">
            <label htmlFor="quantity" className="mb-1 font-medium">
              จำนวนที่จะเบิก
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              placeholder="จำนวนที่จะเบิก"
              value={formData.quantity}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <div className="flex flex-col">
            <label htmlFor="destination" className="mb-1 font-medium">
              ปลายทาง / ผู้รับ
            </label>
            <input
              type="text"
              id="destination"
              name="destination"
              placeholder="ปลายทาง / ผู้รับ"
              value={formData.destination}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <div className="flex flex-col">
            <label htmlFor="note" className="mb-1 font-medium">
              หมายเหตุ
            </label>
            <textarea
              id="note"
              name="note"
              placeholder="หมายเหตุ"
              value={formData.note}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
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
            className="flex items-center justify-center gap-1 bg-green-500 hover:bg-green-700 text-white px-4 py-2 min-w-[100px] rounded-full shadow cursor-pointer"
          >
            <FiCheck className="w-4 h-4" />
            บันทึกการเบิก/ออก
          </button>
        </div>
      </form>
      {/* <Toaster position="top-right" reverseOrder={false} /> */}
    </div>
  );
};

export default DispatchStock;
