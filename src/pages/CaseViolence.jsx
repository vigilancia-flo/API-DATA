import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";

export function CaseViolence() {
  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden text-slate-800">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <h1 className="text-black">teste</h1>
    </div>
  );
}

export default CaseViolence;
