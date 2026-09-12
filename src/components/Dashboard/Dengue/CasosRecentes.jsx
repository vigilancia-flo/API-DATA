import React from "react";
import { ArrowRight } from "lucide-react";

export default function CasosRecentes({ casos, onSelectPaciente }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 md:p-6 flex flex-col w-full overflow-hidden">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-800">Casos Recentes</h3>
        <p className="text-sm text-slate-500">Últimos registros inseridos</p>
      </div>
      <div className="flex-1 flex flex-col gap-1 overflow-y-auto">
        {casos.length === 0 ? (
          <p className="text-sm text-slate-500 text-center mt-4">
            Nenhum caso encontrado.
          </p>
        ) : (
          casos.map((caso, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors group cursor-pointer border border-transparent hover:border-slate-100"
              onClick={() => onSelectPaciente(caso.dadosOriginais)}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div
                  className={`size-2 rounded-full flex-shrink-0 ${caso.corClassificacao} shadow-sm`}
                ></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-800 truncate">
                    {caso.name}
                  </p>
                  <p className="text-xs text-slate-500 truncate">
                    {caso.condition} • {caso.ubs}
                  </p>
                </div>
              </div>
              <ArrowRight className="size-4 text-slate-300 group-hover:text-slate-600 transition-colors flex-shrink-0 ml-2" />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
