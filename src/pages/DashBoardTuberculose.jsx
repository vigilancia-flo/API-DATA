import React, { useMemo } from "react";
import {
  Users,
  Activity,
  MapPin,
  AlertTriangle,
  ShieldAlert,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#10b981", "#f59e0b", "#3b82f6", "#f43f5e"];

export default function DashboardTuberculose({ pacientes }) {
  // 1. Processamento de KPIs (Focado na agregação "nu_notific")
  const totalCasos = pacientes.reduce(
    (sum, p) => sum + Number(p.nu_notific || 0),
    0,
  );

  const unidadesAtivas = pacientes.length;

  const unidadeMaisAfetada = useMemo(() => {
    if (!pacientes.length) return "Nenhuma";
    const maior = [...pacientes].sort(
      (a, b) => Number(b.nu_notific || 0) - Number(a.nu_notific || 0),
    )[0];
    return {
      nome: maior.nm_ubs || "Desconhecida",
      casos: maior.nu_notific,
    };
  }, [pacientes]);

  const mediaPorUnidade =
    unidadesAtivas > 0 ? (totalCasos / unidadesAtivas).toFixed(1) : 0;

  // 2. Gráfico de Barras: Top 5 Unidades com mais casos
  const dadosTopUnidades = useMemo(() => {
    return [...pacientes]
      .sort((a, b) => Number(b.nu_notific || 0) - Number(a.nu_notific || 0))
      .slice(0, 5)
      .map((p) => {
        const nomeCurto = p.nm_ubs?.replace("UBS ", "").replace("DE ", "");
        return {
          nomeCurto:
            nomeCurto?.length > 12
              ? nomeCurto.substring(0, 12) + "..."
              : nomeCurto,
          nomeCompleto: p.nm_ubs,
          casos: Number(p.nu_notific || 0),
        };
      });
  }, [pacientes]);

  // 3. Gráfico de Rosca: Perfil de Atendimento (Atenção Básica vs Especializada)
  const dadosCategorias = useMemo(() => {
    let ubs = 0;
    let especializadas = 0; // Hospitais, Centros Especializados, PAM

    pacientes.forEach((p) => {
      const nome = (p.nm_ubs || "").toUpperCase();
      const casos = Number(p.nu_notific || 0);

      if (
        nome.includes("UBS") ||
        nome.includes("POSTO") ||
        nome.includes("ESF")
      ) {
        ubs += casos;
      } else {
        especializadas += casos;
      }
    });

    return [
      { name: "Atenção Básica (UBS)", value: ubs },
      { name: "Atenção Especializada/Hospitalar", value: especializadas },
    ].filter((d) => d.value > 0);
  }, [pacientes]);

  // 4. Tabela de Unidades (Ordenada por volume de casos)
  const listaUnidades = [...pacientes].sort(
    (a, b) => Number(b.nu_notific || 0) - Number(a.nu_notific || 0),
  );

  return (
    <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-500">
      {/* Linha 1: KPIs com Design Moderno (Verde Esmeralda - Padrão Tuberc.) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <KpiCard
          title="Total de Casos"
          value={totalCasos}
          icon={Users}
          color="bg-emerald-500"
          bgLight="bg-emerald-50"
          subtitle="Notificações consolidadas"
        />
        <KpiCard
          title="Unidades com Casos"
          value={unidadesAtivas}
          icon={MapPin}
          color="bg-teal-500"
          bgLight="bg-teal-50"
          subtitle="Cobertura territorial"
        />
        <KpiCard
          title="Maior Foco (Unidade)"
          value={unidadeMaisAfetada.casos}
          icon={AlertTriangle}
          color="bg-amber-500"
          bgLight="bg-amber-50"
          subtitle={unidadeMaisAfetada.nome?.substring(0, 20)}
        />
        <KpiCard
          title="Média por Unidade"
          value={mediaPorUnidade}
          icon={Activity}
          color="bg-blue-500"
          bgLight="bg-blue-50"
          subtitle="Casos / UBS"
        />
      </div>

      {/* Linha 2: Gráficos Principais */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Gráfico de Barras - Top Focos */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Activity className="size-5 text-emerald-600" /> Unidades com Maior
            Incidência
          </h3>
          <div className="h-60 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dadosTopUnidades}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="nomeCurto"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  interval={0}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                />
                <Tooltip
                  cursor={{ fill: "#f8fafc" }}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                  formatter={(value) => [`${value} casos`, "Notificações"]}
                  labelFormatter={(label, payload) =>
                    payload?.[0]?.payload?.nomeCompleto || label
                  }
                />
                <Bar
                  dataKey="casos"
                  fill="#10b981"
                  radius={[6, 6, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico de Rosca - Perfil de Atendimento */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-6 flex flex-col">
          <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <ShieldAlert className="size-5 text-emerald-600" /> Nível de Atenção
          </h3>
          <div className="flex-1 min-h-[200px] sm:min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dadosCategorias}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {dadosCategorias.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value} casos`, "Total"]}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col gap-2 justify-center mt-2">
            {dadosCategorias.map((entry, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between text-[11px] sm:text-xs font-medium text-slate-600"
              >
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full shrink-0"
                    style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                  ></span>
                  <span className="truncate max-w-[150px]">{entry.name}</span>
                </div>
                <span className="font-bold text-slate-800">{entry.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Linha 3: Tabela Consolidada de Unidades */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-6 w-full overflow-hidden">
        <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-4">
          Detalhamento por Unidade de Saúde
        </h3>

        {/* Container com scroll horizontal em telas pequenas */}
        <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
          <table className="w-full text-left text-sm text-slate-600 min-w-[600px]">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-4 py-3 font-semibold rounded-tl-lg whitespace-nowrap">
                  Unidade de Saúde (NM UBS)
                </th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">
                  Código CNES
                </th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">
                  Nível de Atenção
                </th>
                <th className="px-4 py-3 font-semibold rounded-tr-lg whitespace-nowrap text-right">
                  Total de Casos
                </th>
              </tr>
            </thead>
            <tbody>
              {listaUnidades.map((unidade, idx) => {
                const isEspecializada = !(
                  unidade.nm_ubs?.includes("UBS") ||
                  unidade.nm_ubs?.includes("POSTO")
                );
                return (
                  <tr
                    key={idx}
                    className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium text-slate-800 flex items-center gap-2 whitespace-nowrap">
                      <div
                        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold ${isEspecializada ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}
                      >
                        {isEspecializada ? "H" : "U"}
                      </div>
                      {unidade.nm_ubs || "Não informada"}
                    </td>
                    <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                      {unidade.id_unidade || "-"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded-md text-[10px] sm:text-xs font-bold inline-block ${isEspecializada ? "bg-amber-50 text-amber-600 border border-amber-200" : "bg-emerald-50 text-emerald-600 border border-emerald-200"}`}
                      >
                        {isEspecializada
                          ? "Especializada/Hospital"
                          : "Atenção Básica"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <span className="font-bold text-slate-800 bg-slate-100 px-3 py-1 rounded-full">
                        {unidade.nu_notific || 0}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {listaUnidades.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="px-4 py-8 text-center text-slate-400"
                  >
                    Nenhum registro encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Subcomponente de KPI
function KpiCard({ title, value, icon: Icon, color, bgLight, subtitle }) {
  return (
    <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3 sm:gap-4 transition-transform hover:-translate-y-1 duration-300">
      <div
        className={`shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center ${bgLight}`}
      >
        <Icon className={`size-6 sm:size-7 ${color.replace("bg-", "text-")}`} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs sm:text-sm font-semibold text-slate-500 truncate">
          {title}
        </p>
        <h4 className="text-xl sm:text-2xl font-black text-slate-800 truncate">
          {value}
        </h4>
        {subtitle && (
          <p className="text-[10px] sm:text-xs font-medium text-slate-400 mt-0.5 truncate">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
