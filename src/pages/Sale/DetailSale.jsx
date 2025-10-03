import React, { useState, useEffect } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { IoMdPrint } from "react-icons/io";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const DetailSale = () => {
  const [formData, setFormData] = useState({
    p_number: "",
    w_number: "",
    buyer_seller: "",
    address: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("เลือกวิธีชำระเงิน");
  const navigate = useNavigate();

  const initialPurchases = [
    {
      id: 3,
      created_at: "18-05-2568",
      s_number: "S210056967",
      w_number: "D680917024",
      tex_number: "1 23 4 56789",
      buyer_seller: "นางแดง",
      status: "ส่งแล้ว",
      address: "address3",
    },
  ];

  useEffect(() => {
    const purchase = initialPurchases.find((p) => p.id === 3);
    if (purchase) {
      setFormData(purchase);
    }
  }, []);

  const handleBack = () => window.history.back();
  const countries = ["โอนจ่าย", "เงินสด"];

  const handleSelect = (country) => {
    setSelected(country);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 py-10 px-6 w-full">
      {/* ฝั่งซ้าย: รายละเอียดและตาราง */}
      <div className="flex-1 w-full">
        <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-bold text-[24px]">รายละเอียดใบสั่งขาย</h1>
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
              <label className="font-semibold">วันที่ :</label>
              {formData.created_at}
            </div>
            <div>
              <label className="font-semibold">เลขที่ใบสั่งขาย :</label>
              {formData.s_number}
            </div>
            <div>
              <label className="font-semibold">เลขที่ใบสั่งชั่ง :</label>
              {formData.w_number}
            </div>
            <div>
              <label className="font-semibold">เลขประจำตัวผู้เสียภาษี :</label>
              {formData.tex_number}
            </div>
            <div>
              <label className="font-semibold">ชื่อลูกค้า :</label>
              {formData.buyer_seller}
            </div>
            <div>
              <label className="font-semibold">ที่อยู่ :</label>
              {formData.address}
            </div>
          </div>
        </div>

        {/* ตารางสินค้า */}
        <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-[20px]">รายการสินค้า</h2>
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
                  <th className="text-center p-4">รหัส</th>
                  <th className="text-center p-4">ทะเบียนรถ</th>
                  <th className="text-center p-4">สินค้า</th>
                  <th className="text-center p-4">จำนวน/หน่วย</th>
                  <th className="text-center p-4">ราคา/หน่วย</th>
                  <th className="text-center p-4">จำนวนเงิน</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-100 bg-white">
                  <td className="text-center p-4">41</td>
                  <td className="text-center p-4">3งจ9012</td>
                  <td className="text-center p-4">ข้าวสาร หอมมะลิ 5 ตัน</td>
                  <td className="text-center p-4">16,750 กก.</td>
                  <td className="text-center p-4">7.20</td>
                  <td className="text-center p-4">15,561</td>
                </tr>
                <tr className="border-t bg-gray-50 font-bold">
                  <td className="text-center p-4"></td>
                  <td className="text-center p-4">รวม</td>
                  <td colSpan={3}></td>
                  <td className="text-center p-4">15,561</td>
                </tr>
              </tbody>
            </table>

            <div className="flex justify-end mt-5 gap-3"></div>
          </div>
        </div>
      </div>

      {/* ฝั่งขวา: สรุปคำสั่งขาย */}
      <div className="lg:w-[360px] w-full p-6 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition">
        <h2 className="text-2xl font-semibold">สรุปคำสั่งขาย</h2>
        <hr className="border-gray-300 my-5" />

        <div className="text-gray-700 space-y-2">
          <p className="flex justify-between">
            <span>ราคาสินค้า</span>
            <span>15,561 บาท</span>
          </p>
          <p className="flex justify-between">
            <span>ค่าขนส่ง</span>
            <span className="text-green-600">ฟรี</span>
          </p>
          <p className="flex justify-between">
            <span>ภาษี (7%)</span>
            <span>1,089.27 บาท</span>
          </p>
          <p className="flex justify-between text-lg font-bold pt-3 border-t">
            <span>รวมทั้งหมด</span>
            <span>16,650.27 บาท</span>
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
            onClick={() => navigate("/sale")}
            className="w-full py-3 mt-6 cursor-pointer bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition rounded-full"
          >
            ยืนยันการสั่งขาย
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailSale;
