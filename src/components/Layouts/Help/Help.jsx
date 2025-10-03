import React, { useState } from "react";

const Help = ({ onClose }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const shortcuts = [
    {
      key: "ctrl + 1",
      description: "เปิดหน้าหลัก (Dashboard)",
    },
    {
      key: "ctrl + 2",
      description: "เปิดหน้าบัญชีใบสั่งชั่ง (Weight Sheet)",
    },
    {
      key: "ctrl + 3",
      description: "เปิดหน้ารายการซื้อ (Purchase List)",
    },
    {
      key: "ctrl + 4",
      description: "เปิดหน้ารายการขาย (sale List)",
    },
    {
      key: "ctrl + 5",
      description: "เปิดหน้าการเงิน (finance List)",
    },
    {
      key: "ctrl + 6",
      description: "เปิดหน้ารายการเจ้าหนี้ (creditor List)",
    },
    {
      key: "ctrl + 7",
      description: "เปิดหน้ารายการลูกหนี้ (debtor List)",
    },
    {
      key: "ctrl + 8",
      description: "เปิดหน้ารายการสต๊อก — Lot (stock List)",
    },
  ];

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white border border-gray-200 p-6 rounded-xl shadow-lg hover:shadow-xl transition w-96 max-h-[80vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-600 hover:text-red-800 cursor-pointer"
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">
          รายการคีย์ลัดของระบบ
        </h2>

        <div className="flex flex-col gap-2">
          {shortcuts.map((shortcut, index) => (
            <div
              key={index}
              className="border-b border-slate-200 py-2 cursor-pointer"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">
                  {shortcut.key} - {shortcut.description.split(" ")[0]}...
                </span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`${
                    openIndex === index ? "rotate-180" : ""
                  } transition-all duration-300 ease-in-out`}
                >
                  <path
                    d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2"
                    stroke="#1D293D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p
                className={`text-sm text-slate-500 transition-all duration-300 ease-in-out pt-2 ${
                  openIndex === index
                    ? "opacity-100 max-h-[200px]"
                    : "opacity-0 max-h-0"
                }`}
              >
                {shortcut.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Help;
