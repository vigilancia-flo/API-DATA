import React, { useState } from "react";
import { Bug, Activity, ShieldAlert, ChevronDown, MapPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EndemiasFilter({ selected, onChange, className }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // 1. Adicionamos a 'rota' direto em cada objeto
  const endemias = [
    {
      id: "gerais",
      name: "Território de UBS",
      icon: MapPlus,
      color: "text-yellow-500",
      bg: "bg-yellow-100",
      rota: "/mapa-epidemiologico",
    },
    {
      id: "dengue",
      name: "Dengue",
      icon: Bug,
      color: "text-rose-500",
      bg: "bg-rose-100",
      rota: "/mapa-epidemiologico/endemias/dengue",
    },
    {
      id: "sifilis",
      name: "Sífilis",
      icon: Activity,
      color: "text-purple-500",
      bg: "bg-purple-100",
      rota: "/mapa-epidemiologico/endemias/sifi",
    },
    {
      id: "tuberculose",
      name: "Tuberculose",
      icon: ShieldAlert,
      color: "text-emerald-500",
      bg: "bg-emerald-100",
      rota: "/mapa-epidemiologico/endemias/tuberculose",
    },
  ];

  const handleSelection = (item) => {
    if (onChange) {
      try {
        onChange(item.id);
      } catch (e) {
        console.error("Erro ao atualizar o estado:", e);
      }
    }

    setIsOpen(false);

    if (item.rota) {
      navigate(item.rota);
    }
  };

  const selectedItem =
    endemias.find((item) => item.id === selected) || endemias[0];

  return (
    <div
      className={`absolute top-4 left-6 z-20 flex flex-col items-start ${className || ""}`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-white/90 backdrop-blur-md px-4 py-3 rounded-xl shadow-lg border border-slate-200/60 w-37.5 h-11.6 -ml-5 -mt-3 md:mt-0 md:w-full md:ml-0 hover:bg-white transition-all active:scale-95 hover:cursor-pointer"
      >
        <div
          className={`p-1.5 rounded-md ${selectedItem.bg} ${selectedItem.color}`}
        >
          <selectedItem.icon className="size-4" />
        </div>

        <span className="text-[8px] font-bold text-slate-800 uppercase tracking-wider whitespace-nowrap md:text-xs">
          {selectedItem.name}
        </span>

        <ChevronDown
          className={`size-4 text-slate-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Lista Expandível */}
      {isOpen && (
        <div className="mt-2 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-slate-200/60 min-w-max animate-in fade-in slide-in-from-top-2 duration-200 w-37.5 -ml-5 md:w-full md:ml-0">
          <h4 className="text-xs font-bold text-slate-800 mb-3 uppercase tracking-wider whitespace-nowrap">
            Selecione o Agravo
          </h4>
          <div className="flex flex-col gap-2">
            {endemias.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelection(item)} // Passando o objeto inteiro agora
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  selected === item.id
                    ? "bg-slate-100 ring-1 ring-slate-300 shadow-sm"
                    : "hover:bg-slate-50 opacity-70 hover:opacity-100 hover:cursor-pointer"
                }`}
              >
                <div className={`p-1.5 rounded-md ${item.bg} ${item.color}`}>
                  <item.icon className="size-4" />
                </div>
                <span className="text-slate-700 whitespace-nowrap">
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
