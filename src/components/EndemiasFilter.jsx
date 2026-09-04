import React, { useState } from "react";
import { Bug, Activity, ShieldAlert, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EndemiasFilter({ selected, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // 1. Adicionamos a 'rota' direto em cada objeto
  const endemias = [
    {
      id: "gerais",
      name: "Território de UBS",
      icon: Bug,
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
      rota: "/mapa-epidemiologico", // Substitua pela rota real quando criar
    },
    {
      id: "tuberculose",
      name: "Tuberculose",
      icon: ShieldAlert,
      color: "text-emerald-500",
      bg: "bg-emerald-100",
      rota: "/mapa-epidemiologico", // Substitua pela rota real quando criar
    },
  ];

  const handleSelection = (item) => {
    // 2. Atualiza o estado na página pai (usando try/catch para evitar travar se a página pai tiver algum erro)
    if (onChange) {
      try {
        onChange(item.id);
      } catch (e) {
        console.error("Erro ao atualizar o estado:", e);
      }
    }

    // 3. Fecha o menu dropdown
    setIsOpen(false);

    // 4. Faz a navegação automaticamente a partir da rota definida no objeto!
    if (item.rota) {
      navigate(item.rota);
    }
  };

  const selectedItem =
    endemias.find((item) => item.id === selected) || endemias[0];

  return (
    <div className="absolute top-4 left-6 z-20 flex flex-col items-start">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-white/90 backdrop-blur-md px-4 py-3 rounded-xl shadow-lg border border-slate-200/60 hover:bg-white transition-all active:scale-95"
      >
        <div
          className={`p-1.5 rounded-md ${selectedItem.bg} ${selectedItem.color}`}
        >
          <selectedItem.icon className="size-4" />
        </div>

        <span className="text-sm font-bold text-slate-800 uppercase tracking-wider">
          {selectedItem.name}
        </span>

        <ChevronDown
          className={`size-4 text-slate-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Lista Expandível */}
      {isOpen && (
        <div className="mt-2 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-slate-200/60 w-full animate-in fade-in slide-in-from-top-2 duration-200">
          <h4 className="text-xs font-bold text-slate-800 mb-3 uppercase tracking-wider">
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
                    : "hover:bg-slate-50 opacity-70 hover:opacity-100"
                }`}
              >
                <div className={`p-1.5 rounded-md ${item.bg} ${item.color}`}>
                  <item.icon className="size-4" />
                </div>
                <span className="text-slate-700">{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
