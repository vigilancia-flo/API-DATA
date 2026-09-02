import React from "react";
import { X, Calendar, Activity, MapPin, Building, Info } from "lucide-react";

export default function PatientModal({ paciente, isOpen, onClose }) {
  if (!isOpen || !paciente) return null;

  let bairro = "Não informado";
  if (paciente.endereco) {
    const partes = paciente.endereco.split(",");
    bairro =
      partes.length > 1
        ? partes[partes.length - 1].trim()
        : "Endereço incompleto";
    bairro = bairro.charAt(0).toUpperCase() + bairro.slice(1).toLowerCase();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      {/* Container do Modal */}
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <h3 className="text-lg font-bold text-slate-800">
            Detalhes do Caso #{paciente.numero_notificacao || "S/N"}
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-rose-500 rounded-md hover:bg-rose-50 transition-colors cursor-pointer"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Corpo do Modal com dados do models.py */}
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <Calendar className="size-3.5" /> Notificação
              </span>
              <p className="text-sm font-semibold text-slate-800">
                {paciente.data_notificacao || "N/I"}
              </p>
            </div>

            <div className="space-y-1">
              <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <Activity className="size-3.5" /> 1º Sintoma
              </span>
              <p className="text-sm font-semibold text-slate-800">
                {paciente.data_pri_sintoma || "N/I"}
              </p>
            </div>

            <div className="space-y-1">
              <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <Info className="size-3.5" /> Sexo
              </span>
              <p className="text-sm font-semibold text-slate-800">
                {paciente.cs_sexo || "N/I"}
              </p>
            </div>

            <div className="space-y-1">
              <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <Activity className="size-3.5" /> Agravo
              </span>
              <p className="text-sm font-semibold text-slate-800">
                {paciente.id_agravo || "N/I"}
              </p>
            </div>
          </div>

          <hr className="border-slate-100" />

          <div className="space-y-4">
            <div className="space-y-1">
              <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <Building className="size-3.5" /> Unidade de Saúde (UBS)
              </span>
              <p className="text-sm font-semibold text-slate-800">
                {paciente.id_unidade || "Não informada"}
              </p>
            </div>

            <div className="space-y-1">
              <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <MapPin className="size-3.5" /> Bairro / Localização
              </span>
              <p className="text-sm font-semibold text-slate-800">{bairro}</p>
            </div>
          </div>
        </div>

        {/* Rodapé */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
