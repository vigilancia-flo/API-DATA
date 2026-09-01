import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";

// 1. CURVA EPIDÊMICA (Gráfico de Linha)
export function CurvaEpidemica({ pacientes }) {
  const data = useMemo(() => {
    if (!pacientes || pacientes.length === 0) return [];

    // Agrupa os casos pela data de notificação
    const contagem = {};
    pacientes.forEach((p) => {
      const dataNotificacao = p.data_notificacao;
      if (dataNotificacao) {
        contagem[dataNotificacao] = (contagem[dataNotificacao] || 0) + 1;
      }
    });

    // Converte para array e ordena por data
    return Object.entries(contagem)
      .map(([data, casos]) => ({ data, casos }))
      .sort((a, b) => new Date(a.data) - new Date(b.data));
  }, [pacientes]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col h-full">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-800">Curva Epidêmica</h3>
        <p className="text-sm text-slate-500">
          Evolução de casos ao longo do tempo
        </p>
      </div>
      <div className="flex-1 min-h-62.5">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e2e8f0"
            />
            <XAxis
              dataKey="data"
              tick={{ fontSize: 12, fill: "#64748b" }}
              tickMargin={10}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 12, fill: "#64748b" }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
              labelStyle={{ fontWeight: "bold", color: "#334155" }}
            />
            <Line
              type="monotone"
              dataKey="casos"
              name="Casos Notificados"
              stroke="#e11d48"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
              activeDot={{ r: 6, strokeWidth: 0, fill: "#e11d48" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function StatusDonut({ pacientes }) {
  const data = useMemo(() => {
    let confirmado = 0,
      alarme = 0,
      descartado = 0,
      inconclusivo = 0,
      suspeito = 0;

    pacientes.forEach((p) => {
      // Pega o valor e remove espaços, garantindo que seja string
      const classFinal = String(p.classi_fin || "").trim();

      if (classFinal === "10") {
        confirmado++; // Dengue Confirmado / Clássico
      } else if (classFinal === "11") {
        alarme++; // Dengue com Sinais de Alarme
      } else if (classFinal === "5") {
        descartado++; // Descartado
      } else if (classFinal === "8") {
        inconclusivo++; // Inconclusivo / Outro agravo
      } else {
        suspeito++; // [Em branco] (Suspeito / Em investigação)
      }
    });

    return [
      { name: "Confirmado", value: confirmado, color: "#ef4444" }, // Vermelho
      { name: "Sinais de Alarme", value: alarme, color: "#9f1239" }, // Vermelho Escuro
      { name: "Suspeito/Investigação", value: suspeito, color: "#f59e0b" }, // Amarelo/Laranja
      { name: "Inconclusivo", value: inconclusivo, color: "#94a3b8" }, // Cinza
      { name: "Descartado", value: descartado, color: "#10b981" }, // Verde
    ].filter((item) => item.value > 0); // Remove os que estão zerados
  }, [pacientes]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col h-full">
      <div className="mb-2">
        <h3 className="text-lg font-bold text-slate-800">Status dos Casos</h3>
        <p className="text-sm text-slate-500">
          Proporção da classificação final
        </p>
      </div>
      <div className="flex-1 min-h-62.5 relative -mt-20">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              itemStyle={{ color: "#334155", fontWeight: "500" }}
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        {/* Legenda Customizada */}
        <div className="flex flex-wrap justify-center gap-3 -mt-18.75 ">
          {data.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-1.5 text-xs font-medium text-slate-600"
            >
              <span
                className="size-3 rounded-full"
                style={{ backgroundColor: item.color }}
              ></span>
              {item.name} ({item.value})
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ========= PERFIL DEMOGRÁFICO (Gráfico de Barras) =========
export function PerfilDemografico({ pacientes }) {
  const data = useMemo(() => {
    const grupos = {
      "0-9": { faixa: "0-9", M: 0, F: 0 },
      "10-19": { faixa: "10-19", M: 0, F: 0 },
      "20-29": { faixa: "20-29", M: 0, F: 0 },
      "30-39": { faixa: "30-39", M: 0, F: 0 },
      "40-49": { faixa: "40-49", M: 0, F: 0 },
      "50-59": { faixa: "50-59", M: 0, F: 0 },
      "60+": { faixa: "60+", M: 0, F: 0 },
    };

    // Função auxiliar para calcular a idade
    const calcularIdade = (dataNasc) => {
      if (!dataNasc) return null;
      const nascimento = new Date(dataNasc);
      const hoje = new Date();
      let idade = hoje.getFullYear() - nascimento.getFullYear();
      const m = hoje.getMonth() - nascimento.getMonth();
      if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
      }
      return idade;
    };

    pacientes.forEach((p) => {
      // O SINAN geralmente salva sexo como "M", "F" ou "I" (Ignorado).
      // Lemos o cs_sexo do seu model:
      const sexo = p.cs_sexo === "M" ? "M" : p.cs_sexo === "F" ? "F" : null;
      const idade = calcularIdade(p.data_nascimento);

      if (sexo && idade !== null) {
        if (idade <= 9) grupos["0-9"][sexo]++;
        else if (idade <= 19) grupos["10-19"][sexo]++;
        else if (idade <= 29) grupos["20-29"][sexo]++;
        else if (idade <= 39) grupos["30-39"][sexo]++;
        else if (idade <= 49) grupos["40-49"][sexo]++;
        else if (idade <= 59) grupos["50-59"][sexo]++;
        else grupos["60+"][sexo]++;
      }
    });

    return Object.values(grupos);
  }, [pacientes]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col h-full">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-800">Perfil Demográfico</h3>
        <p className="text-sm text-slate-500">
          Distribuição por faixa etária e sexo
        </p>
      </div>
      <div className="flex-1 min-h-62.5">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 0, left: -20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e2e8f0"
            />
            <XAxis
              dataKey="faixa"
              tick={{ fontSize: 11, fill: "#64748b" }}
              tickMargin={10}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 11, fill: "#64748b" }}
            />
            <Tooltip
              cursor={{ fill: "#f1f5f9" }}
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
            <Bar
              dataKey="M"
              name="Masculino"
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
              barSize={12}
            />
            <Bar
              dataKey="F"
              name="Feminino"
              fill="#ec4899"
              radius={[4, 4, 0, 0]}
              barSize={12}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
