import React from "react";
import { Layers, Sun, Moon } from "lucide-react";

export default function ButtonTheme({
  activeStyle,
  setActiveStyle,
  toggleTheme,
}) {
  return (
    <div className="absolute top-4 right-4 z-10 flex items-center gap-3">
      <div className="bg-white/90 backdrop-blur-md p-1.5 rounded-xl shadow-lg border border-slate-200/60 flex items-center gap-2 transition-all hover:bg-white">
        <div className="pl-2 text-slate-400">
          <Layers className="size-4" />
        </div>
        <select
          value={activeStyle}
          onChange={(e) => setActiveStyle(e.target.value)}
          className="bg-transparent text-slate-700 rounded-lg pr-8 pl-2 py-2 text-sm focus:outline-none cursor-pointer font-semibold appearance-none"
        >
          <option value="light">Claro (Carto)</option>
          <option value="dark">Escuro (Carto)</option>
          <option value="openstreetmap">OpenStreetMap</option>
          <option value="openstreetmap3d">Visão 3D</option>
        </select>
      </div>
      <button
        onClick={toggleTheme}
        className="bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg border border-slate-200/60 text-slate-700 hover:bg-slate-100 transition-all focus:outline-none focus:ring-2 focus:ring-rose-500 flex items-center justify-center"
        aria-label="Alternar tema do mapa"
      >
        {activeStyle === "dark" ? (
          <Sun className="size-5" />
        ) : (
          <Moon className="size-5" />
        )}
      </button>
    </div>
  );
}
