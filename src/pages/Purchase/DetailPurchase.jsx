import { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { IoMdPrint } from "react-icons/io";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";

const DetailPurchase = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("เลือกวิธีชำระเงิน");
  const navigate = useNavigate();

  const initialPurchases = [
    {
      id: 1,
      created_at: "18-05-2568",
      p_number: "M210056965",
      w_number: "D680917009",
      buyer_seller: "นายดำ",
      address: "address1",
    },
    {
      id: 2,
      created_at: "18-06-2568",
      p_number: "M210056966",
      w_number: "D680917010",
      buyer_seller: "นางแดง",
      address: "address2",
    },
  ];

  useEffect(() => {
    const purchase = initialPurchases.find((p) => p.id === parseInt(id));
    if (purchase) setFormData(purchase);
  }, [id]);

  const handleBack = () => window.history.back();

  // mock รายการซื้อ
  const items = [
    {
      product: "ข้าวเปลือก ธรรมดา",
      car: "1กข1234",
      weigh_in: 15750,
      weigh_out: 9801,
      right_weight: 5949,
      humidity: 26.2,
      avg: 5571,
      amount: 15561,
    },
    {
      product: "ข้าวเปลือก หอมมะลิ",
      car: "1กข1234",
      weigh_in: 13251,
      weigh_out: 7568,
      right_weight: 5683,
      humidity: 31.22,
      avg: 2131,
      amount: 12458,
    },
  ];

  // คำนวณรวม
  const totalWeight = items.reduce((sum, i) => sum + i.right_weight, 0);
  const totalAmount = items.reduce((sum, i) => sum + i.amount, 0);
  const vat = totalAmount * 0.07;
  const grandTotal = totalAmount + vat;

  const countries = ["โอนจ่าย", "เงินสด"];

  const handleSelect = (country) => {
    setSelected(country);
    setIsOpen(false);
  };
  return (
    <div className="flex flex-col lg:flex-row gap-8 py-10 px-6 w-full">
      {/* ฝั่งซ้าย: รายละเอียด + ตาราง */}
      <div className="flex-1 w-full">
        {/* รายละเอียด */}
        <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-bold text-[24px]">รายละเอียดใบสั่งซื้อ</h1>
            <button
              onClick={handleBack}
              className="flex items-center gap-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full cursor-pointer"
            >
              <FiArrowLeft className="w-4 h-4" />
              <span>ย้อนกลับ</span>
            </button>
          </div>
          <hr className="border-gray-400 mb-4" />

          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold">วันที่ :</label>{" "}
              {formData.created_at}
            </div>
            <div>
              <label className="font-semibold">เลขที่ใบสั่งซื้อ :</label>{" "}
              {formData.p_number}
            </div>
            <div>
              <label className="font-semibold">เลขที่ใบสั่งชั่ง :</label>{" "}
              {formData.w_number}
            </div>
            <div>
              <label className="font-semibold">ผู้ขาย :</label>{" "}
              {formData.buyer_seller}
            </div>
            <div>
              <label className="font-semibold">ที่อยู่ :</label>{" "}
              {formData.address}
            </div>
          </div>
        </div>

        {/* ตาราง */}
        <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition">
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-bold text-[20px]">รายการสินค้า</h1>
            <button
              onClick={() => {
                alert("กำลังพิมพ์เอกสาร...");
              }}
              className="flex items-center gap-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-full cursor-pointer text-white"
            >
              <IoMdPrint className="w-4 h-4" />
              <span>พิมพ์</span>
            </button>
          </div>
          <hr className="border-gray-300 mb-3" />
          <div className="overflow-x-auto">
            <table className="min-w-full text-md bg-gray-200 shadow-md rounded">
              <thead>
                <tr className="border-b">
                  <th className="text-center p-4">สินค้า</th>
                  <th className="text-center p-4">ทะเบียนรถ</th>
                  <th className="text-center p-4">รถเข้า</th>
                  <th className="text-center p-4">รถออก</th>
                  <th className="text-center p-4">น้ำหนักสิทธิ</th>
                  <th className="text-center p-4">หักความชื้น</th>
                  <th className="text-center p-4">เฉลี่ย</th>
                  <th className="text-center p-4">จำนวนเงิน</th>
                </tr>
              </thead>
              <tbody>
                {items.map((i, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-100 bg-white">
                    <td className="text-center p-4">{i.product}</td>
                    <td className="text-center p-4">{i.car}</td>
                    <td className="text-center p-4">{i.weigh_in}</td>
                    <td className="text-center p-4">{i.weigh_out}</td>
                    <td className="text-center p-4">{i.right_weight}</td>
                    <td className="text-center p-4">{i.humidity}</td>
                    <td className="text-center p-4">{i.avg}</td>
                    <td className="text-center p-4">
                      {i.amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
                <tr className="border-t bg-gray-50 font-bold">
                  <td className="text-center p-4">รวม</td>
                  <td colSpan={3}></td>
                  <td className="text-center p-4">{totalWeight}</td>
                  <td></td>
                  <td></td>
                  <td className="text-center p-4">
                    {totalAmount.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ฝั่งขวา: สรุปคำสั่งซื้อ */}
      <div className="lg:w-[360px] w-full p-6 bg-white border border-gray-300 rounded-xl shadow-lg hover:shadow-xl transition">
        <h2 className="text-2xl font-semibold">สรุปใบสั่งซื้อ</h2>
        <hr className="border-gray-300 my-5" />
        <div className="text-gray-700 space-y-2">
          <p className="flex justify-between">
            <span>น้ำหนักสิทธิรวม</span>
            <span>{totalWeight} กก.</span>
          </p>
          <p className="flex justify-between">
            <span>ราคารวม</span>
            <span>{totalAmount.toLocaleString()} บาท</span>
          </p>
          <p className="flex justify-between">
            <span>ภาษี (7%)</span>
            <span>{vat.toFixed(2)} บาท</span>
          </p>
          <p className="flex justify-between text-lg font-bold pt-3 border-t">
            <span>ยอดสุทธิ</span>
            <span>{grandTotal.toLocaleString()} บาท</span>
          </p>
        </div>
        <div className="flex flex-col w-dull text-sm relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full text-left px-4 pr-2 py-2 border rounded bg-white text-gray-800 border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none"
          >
            <span>{selected}</span>
            <svg
              className={`w-5 h-5 inline float-right transition-transform duration-200 ${
                isOpen ? "rotate-0" : "-rotate-90"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#6B7280"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isOpen && (
            <ul className="w-full bg-white border border-gray-300 rounded shadow-md mt-1 py-2">
              {countries.map((country) => (
                <li
                  key={country}
                  className="px-4 py-2 hover:bg-indigo-500 hover:text-white cursor-pointer"
                  onClick={() => handleSelect(country)}
                >
                  {country}
                </li>
              ))}
            </ul>
          )}
          <button
            onClick={() => navigate("/purchase")}
            className="w-full py-3 mt-6 cursor-pointer bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition rounded-full"
          >
            ยืนยันการสั่งซื้อ
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailPurchase;
