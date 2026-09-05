import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Home,
  LayoutDashboard,
  Map,
  Activity,
  CircleQuestionMark,
  X,
} from "lucide-react";

// Adicionamos as props isOpen e onClose
const Sidebar = ({ isOpen, onClose }) => {
  const [isEndemiasOpen, setIsEndemiasOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const baseClasses =
    "flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 group";
  const activeClasses = "bg-[#054060] text-white shadow-md shadow-[#054060]/20";
  const inactiveClasses =
    "text-slate-500 hover:bg-slate-100 hover:text-[#054060] hover:translate-x-1";

  return (
    <>
      {/* Overlay Escuro para o mobile: Clicar nele fecha a Sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* A classe translate controla o deslize da Sidebar. Ela sempre aparece no desktop (md:translate-x-0) e no mobile depende do isOpen */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 shadow-sm flex flex-col z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Cabeçalho da Sidebar / Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100 bg-white">
          <Link
            to="/"
            className="flex items-center gap-2.5 group cursor-pointer"
            onClick={onClose}
          >
            <div className="bg-blue-50 p-1.5 rounded-lg group-hover:scale-105 transition-transform">
              <Activity className="size-6 text-[#054060]" />
            </div>
            <span className="text-xl font-black tracking-tight text-black">
              Epi<span className="text-[#054060]">Data</span>
            </span>
          </Link>

          {/* Botão de Fechar visível apenas no mobile */}
          <button
            onClick={onClose}
            className="md:hidden text-slate-500 hover:text-slate-800 p-1"
          >
            <X className="size-6" />
          </button>
        </div>

        {/* Navegação principal */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1.5">
          <div className="mb-6">
            <p className="px-2 text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-3">
              Menu Principal
            </p>

            <div className="space-y-1.5">
              {/* Adicionamos onClick={onClose} nos links para fechar a sidebar ao clicar em um menu no celular */}
              <Link
                to="/"
                onClick={onClose}
                className={`${baseClasses} ${isActive("/") ? activeClasses : inactiveClasses}`}
              >
                <Home
                  className={`size-5 ${isActive("/") ? "text-white" : "text-slate-400 group-hover:text-[#054060]"}`}
                />
                Home
              </Link>

              <Link
                to="/dados-gerais"
                onClick={onClose}
                className={`${baseClasses} ${isActive("/dados-gerais") ? activeClasses : inactiveClasses}`}
              >
                <LayoutDashboard
                  className={`size-5 ${isActive("/dados-gerais") ? "text-white" : "text-slate-400 group-hover:text-[#054060]"}`}
                />
                Dashboard
              </Link>

              <Link
                to="/mapa-epidemiologico"
                onClick={onClose}
                className={`${baseClasses} ${isActive("/mapa-epidemiologico") ? activeClasses : inactiveClasses}`}
              >
                <Map
                  className={`size-5 ${isActive("/mapa-epidemiologico") ? "text-white" : "text-slate-400 group-hover:text-[#054060]"}`}
                />
                Mapa Epidemiológico
              </Link>

              <Link
                to="/suporte"
                onClick={onClose}
                className={`${baseClasses} ${isActive("/suporte") ? activeClasses : inactiveClasses}`}
              >
                <CircleQuestionMark
                  className={`size-5 ${isActive("/suporte") ? "text-white" : "text-slate-400 group-hover:text-[#054060]"}`}
                />
                Dúvidas Frequentes
              </Link>
            </div>
          </div>
        </nav>

        {/* Rodapé da Sidebar (Status do Sistema) */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3 px-3 py-2 bg-white border border-slate-200 rounded-lg shadow-sm">
            <div className="relative flex size-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full size-2.5 bg-emerald-500"></span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-700 leading-none">
                Sistema Online
              </span>
              <span className="text-[10px] font-medium text-slate-400 mt-0.5">
                Sincronizado
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
