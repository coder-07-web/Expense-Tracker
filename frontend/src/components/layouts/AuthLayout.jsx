import React from "react";
import CARD_2 from "../../assets/images/card2.png";
import { LuTrendingUpDown } from "react-icons/lu";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* LEFT SIDE (NO STRUCTURE CHANGE) */}
      <div className="w-auto h-screen md:w-[60vw] px-12 pt-8 pb-12 bg-white">
        <h2 className="text-lg font-medium text-gray-800">Expense Tracker</h2>
        {children}
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden md:block w-[40vw] h-screen bg-gradient-to-br from-sky-50 via-white to-sky-100 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative">
        {/* Floating Premium Shapes */}
        <div className="w-48 h-48 rounded-[40px] bg-sky-300/40 absolute -top-7 -left-5 blur-2xl animate-float" />

        <div className="w-48 h-48 rounded-[40px] border-[20px] border-sky-300/50 absolute top-[30%] -right-10 animate-rotateSlow" />

        <div className="w-48 h-48 rounded-[40px] bg-sky-200/40 absolute -bottom-7 -left-5 blur-2xl animate-float delay-200" />

        {/* CARD */}
        <div className="grid grid-cols-1 z-20">
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label="Track Your Income & Expense"
            value="4,30,000"
            color="bg-gradient-to-r from-sky-500 to-sky-400"
          />
        </div>

        {/* IMAGE */}
        <img
          src={CARD_2}
          className="w-64 lg:w-[90%] absolute bottom-10 shadow-xl shadow-sky-300/30 animate-fadeInUp"
        />
      </div>
    </div>
  );
};

export default AuthLayout;

const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div
      className="flex gap-6 bg-white/80 backdrop-blur-md p-4 rounded-xl 
    shadow-lg shadow-sky-300/20 border border-white/50 z-10 animate-fadeInUp"
    >
      <div
        className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full shadow-md`}
      >
        {icon}
      </div>

      <div>
        <h6 className="text-xs text-gray-500 mb-1">{label}</h6>
        <span className="text-[20px] font-semibold text-gray-800">
          ₹ {value}
        </span>
      </div>
    </div>
  );
};
