import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Home,
  LayoutDashboard,
  Map,
  Activity,
  ShieldAlert,
  CircleQuestionMark,
} from "lucide-react";

const Sidebar = () => {
  const [isEndemiasOpen, setIsEndemiasOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  // Classes aprimoradas para um visual mais moderno e "clicável"
  const baseClasses =
    "flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 group";

  // Destaque elegante com sombra sutil e fundo na cor principal
  const activeClasses = "bg-[#054060] text-white shadow-md shadow-[#054060]/20";

  // Efeito hover mais limpo com movimento suave
  const inactiveClasses =
    "text-slate-500 hover:bg-slate-100 hover:text-[#054060] hover:translate-x-1";

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 shadow-sm flex flex-col z-50">
      {/* Cabeçalho da Sidebar / Logo */}
      <div className="h-16 flex items-center px-6 border-b border-slate-100 bg-white">
        <Link to="/" className="flex items-center gap-2.5 group cursor-pointer">
          <div className="bg-rose-50 p-1.5 rounded-lg group-hover:scale-105 transition-transform">
            <Activity className="size-6 text-rose-600" />
          </div>
          <span className="text-xl font-black tracking-tight text-[#054060]">
            Epi<span className="text-rose-600">Data</span>
          </span>
        </Link>
      </div>

      {/* Navegação principal */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1.5">
        <div className="mb-6">
          <p className="px-2 text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-3">
            Menu Principal
          </p>

          <div className="space-y-1.5">
            <Link
              to="/"
              className={`${baseClasses} ${isActive("/") ? activeClasses : inactiveClasses}`}
            >
              <Home
                className={`size-5 ${isActive("/") ? "text-white" : "text-slate-400 group-hover:text-[#054060]"}`}
              />
              Home
            </Link>

            <Link
              to="/dados-gerais"
              className={`${baseClasses} ${isActive("/dados-gerais") ? activeClasses : inactiveClasses}`}
            >
              <LayoutDashboard
                className={`size-5 ${isActive("/dados-gerais") ? "text-white" : "text-slate-400 group-hover:text-[#054060]"}`}
              />
              Dashboard
            </Link>

            <Link
              to="/mapa-epidemiologico"
              className={`${baseClasses} ${isActive("/mapa-epidemiologico") ? activeClasses : inactiveClasses}`}
            >
              <Map
                className={`size-5 ${isActive("/mapa-epidemiologico") ? "text-white" : "text-slate-400 group-hover:text-[#054060]"}`}
              />
              Mapa Epidemiológico
            </Link>
            <Link
              to="/suporte"
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
  );
};

export default Sidebar;
