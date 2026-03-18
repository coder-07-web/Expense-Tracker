import React from "react";

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex items-center gap-4 bg-white px-4 py-3 rounded-xl shadow-sm border border-green-100">
      <div
        className={`w-12 h-12 flex items-center justify-center text-xl text-white ${color} rounded-full`}
      >
        {icon}
      </div>

      <div>
        <h6 className="text-xs text-gray-500">{label}</h6>
        <span className="text-lg font-semibold">₹{value}</span>
      </div>
    </div>
  );
};

export default InfoCard;
