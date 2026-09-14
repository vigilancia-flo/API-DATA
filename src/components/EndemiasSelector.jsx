import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, Check } from "lucide-react";

export default function EndemiaSelector({ options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fecha o dropdown se clicar fora dele
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative z-50 w-full sm:w-64" ref={dropdownRef}>
      {/* Botão Principal do Dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-[#054060]/50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#054060]/20"
      >
        <span className="font-bold text-[#054060] truncate">
          {value?.nome || "Selecione uma Endemia"}
        </span>
        {isOpen ? (
          <ChevronUp className="size-5 text-slate-400" />
        ) : (
          <ChevronDown className="size-5 text-slate-400" />
        )}
      </button>

      {/* Lista Suspensa (Dropdown Menu) */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white border border-slate-100 rounded-xl shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 max-h-60 overflow-y-auto">
          <ul className="py-1">
            {options.map((option) => {
              const isActive = value?.id === option.id;

              return (
                <li key={option.id}>
                  <button
                    onClick={() => handleSelect(option)}
                    className={`
                      w-full flex items-center justify-between px-4 py-3 text-left text-sm font-medium transition-colors
                      ${
                        isActive
                          ? "bg-[#054060]/5 text-[#054060] font-bold"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }
                    `}
                  >
                    <span className="truncate">{option.nome}</span>
                    {isActive && (
                      <Check className="size-4 text-[#054060] shrink-0 ml-2" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
