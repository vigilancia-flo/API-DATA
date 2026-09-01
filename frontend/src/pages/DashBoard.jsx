import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import {
  Users,
  Activity,
  Bug,
  AlertTriangle,
  Map,
  ArrowRight,
  Calendar,
  Clock,
  RefreshCw,
  Bell,
  UserCircle,
  MapPin,
} from "lucide-react";
import AssinaturaGovernamental from "../assets/AssinaturaGovernoFederal.png";
import PatientModal from "../components/Modal/PatientModal.jsx";
import {
  CurvaEpidemica,
  StatusDonut,
  PerfilDemografico,
} from "../components/Modal/DashboardCharts.jsx";

export default function Dashboard() {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [pacienteSelecionado, setPacienteSelecionado] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);

  const extrairBairro = (endereco) => {
    if (!endereco) return "Não informado";

    const partes = endereco.split(",");
    if (partes.length === 1) return "Endereço incompleto";

    let bairroStr = partes[partes.length - 1].trim();
    if (/^[0-9-]+$/.test(bairroStr) && partes.length > 2) {
      bairroStr = partes[partes.length - 2].trim();
    }
    return bairroStr.charAt(0).toUpperCase() + bairroStr.slice(1).toLowerCase();
  };

  // Busca os dados da API Django
  useEffect(() => {
    fetch("http://localhost:8000/api/pacientes/")
      .then((response) => response.json())
      .then((data) => {
        setPacientes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
        setLoading(false);
      });
  }, []);

  const getColorClasses = (color) => {
    const map = {
      blue: "border-l-blue-500 text-blue-600 bg-blue-50",
      emerald: "border-l-emerald-500 text-emerald-600 bg-emerald-50",
      amber: "border-l-amber-500 text-amber-600 bg-amber-50",
      rose: "border-l-rose-500 text-rose-600 bg-rose-50",
      green: "border-1-green-500 text-green-600 bg-green-50",
    };
    return map[color] || map.blue;
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <p className="text-lg font-medium text-slate-600">
          Carregando dados epidemiológicos...
        </p>
      </div>
    );
  }

  const casosRecentes = [...pacientes]
    .sort((a, b) => {
      // 1. Tenta ordenar pela data de notificação (string em formato YYYY-MM-DD ordena perfeitamente)
      const dateA = a.data_notificacao || "0000-00-00";
      const dateB = b.data_notificacao || "0000-00-00";

      if (dateA !== dateB) {
        return dateB.localeCompare(dateA); // Ordem decrescente (mais recente primeiro)
      }

      // 2. Critério de desempate: se as datas forem iguais, o maior ID (mais recém inserido no banco) vence
      return (b.id || 0) - (a.id || 0);
    })
    .slice(0, 5)
    .map((paciente) => {
      const bairro = extrairBairro(paciente.endereco);

      // Lógica para colorir a bolinha de acordo com o status
      const classFinal = String(paciente.classi_fin || "").trim();
      let statusCor = "bg-amber-500"; // Amarelo por padrão (suspeito)
      if (classFinal === "10" || classFinal === "11") statusCor = "bg-rose-600";
      else if (classFinal === "5") statusCor = "bg-emerald-500";
      else if (classFinal === "8") statusCor = "bg-slate-400";

      return {
        name: `Caso #${paciente.numero_notificacao || "S/N"}`,
        condition: `Sintoma: ${paciente.data_pri_sintoma || "N/I"} | Sexo: ${paciente.cs_sexo || "N/I"}`,
        ubs: `UBS: ${paciente.id_unidade || "N/I"} | ${bairro}`,
        corClassificacao: statusCor, // Passando a cor para o layout
        dadosOriginais: paciente,
      };
    });

  const proximasAcoes = [
    {
      title: "Mutirão de Limpeza",
      location: "Bairro Manguinha",
      date: "Amanhã, 08:00",
    },
  ];

  const contagemBairros = pacientes.reduce((acc, paciente) => {
    const bairro = extrairBairro(paciente.endereco);
    acc[bairro] = (acc[bairro] || 0) + 1;
    return acc;
  }, {});

  const coresDistribuicao = [
    "bg-blue-500",
    "bg-emerald-500",
    "bg-amber-500",
    "bg-rose-500",
    "bg-purple-500",
  ];

  const maxCasos = Math.max(...Object.values(contagemBairros), 1);

  const distribuicaoUbs = Object.entries(contagemBairros)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([nome, valor], index) => ({
      name: nome,
      value: valor,
      max: maxCasos,
      color: coresDistribuicao[index % coresDistribuicao.length],
    }));

  let bairroMaisAfetadoNome = "Nenhum";
  let bairroMaisAfetadoValor = 0;
  if (Object.keys(contagemBairros).length > 0) {
    bairroMaisAfetadoNome = Object.keys(contagemBairros).reduce((a, b) =>
      contagemBairros[a] > contagemBairros[b] ? a : b,
    );
    bairroMaisAfetadoValor = contagemBairros[bairroMaisAfetadoNome];
  }

  const totalCasos = pacientes.length;

  const hoje = new Date();
  const seteDiasAtras = new Date();
  seteDiasAtras.setDate(hoje.getDate() - 7);

  const casosUltimos7Dias = pacientes.filter((p) => {
    if (!p.data_notificacao) return false;

    const [ano, mes, dia] = p.data_notificacao.split("-");
    const dataNotificacao = new Date(ano, mes - 1, dia);

    return dataNotificacao >= seteDiasAtras && dataNotificacao <= hoje;
  }).length;

  let taxaNovosCasos = 0;
  if (totalCasos > 0) {
    taxaNovosCasos = Math.round((casosUltimos7Dias / totalCasos) * 100);
  }

  const kpis = [
    {
      title: "Total de Notificações",
      value: pacientes.length,
      icon: Users,
      color: "blue",
      subtext: "Registros importados do SINAN.",
    },
    {
      title: "Casos em Alerta",
      value: "14",
      icon: AlertTriangle,
      color: "amber",
      subtext: "Requerem atenção.",
    },
    {
      title: "Bairro mais Afetado",
      value: bairroMaisAfetadoNome,
      icon: MapPin,
      color: "rose",
      subtext: `${bairroMaisAfetadoValor} casos no último mês .`,
    },
    {
      title: "Últimos Casos (7 dias)",
      value: `${taxaNovosCasos}%`,
      icon: Activity,
      color: "emerald",
      subtext: `${casosUltimos7Dias} casos recentes`,
    },
  ];

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden text-slate-800">
      {/* Sidebar Fixa */}
      <Sidebar />

      {/* Área de Conteúdo Principal */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto ml-64">
        {/* Header Superior */}
        <header className="px-8 py-3 flex items-center justify-between sticky top-0 z-30 bg-linear-to-r from-[#054060] to-indigo-600 shadow-md border-b border-[#043048]">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-white tracking-wide">
              Visão Geral
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Botão de Notificação */}
            <button
              className="relative p-2 text-slate-200 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Notificações"
            >
              <Bell className="size-5" />
              <span className="absolute top-1.5 right-1.5 size-2.5 bg-rose-500 rounded-full border-2 border-[#054060]"></span>
            </button>

            {/* Divisor */}
            <div className="h-6 w-px bg-white/20"></div>

            {/* Perfil do Usuário */}
            <button className="flex items-center gap-3 p-1.5 pr-4 rounded-full hover:bg-white/10 transition-all duration-200 text-left focus:outline-none focus:ring-2 focus:ring-white/50">
              <div className="bg-white/20 p-1.5 rounded-full">
                <UserCircle className="size-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-white leading-none">
                  Gestão Epidemiológica
                </p>
                <p className="text-[11px] text-slate-300 mt-1 leading-none uppercase tracking-wider font-medium">
                  Administrador
                </p>
              </div>
            </button>
          </div>
        </header>

        <main className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                Dashboard - Dengue
              </h1>
              <p className="text-slate-500 mt-1">
                Acompanhamento epidemiológico dos casos de Dengue
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-400">
                Última atualização: Agora
              </span>
              <button
                onClick={() => window.location.reload()}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm text-sm font-medium hover:bg-slate-50 transition-all active:scale-95"
              >
                <RefreshCw className="size-4 text-slate-500" />
                Atualizar
              </button>
            </div>
          </div>

          {/* Grid de KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpis.map((kpi, idx) => {
              const colors = getColorClasses(kpi.color);
              return (
                <div
                  key={idx}
                  className={`bg-white rounded-xl shadow-sm border border-slate-100 p-6 border-l-4 ${colors.split(" ")[0]} flex flex-col justify-between`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-slate-500 mb-1">
                        {kpi.title}
                      </p>
                      <h3 className="text-3xl font-bold text-slate-800">
                        {kpi.value}
                      </h3>
                    </div>
                    <div className={`p-2 rounded-lg ${colors.split(" ")[2]}`}>
                      <kpi.icon className={`size-5 ${colors.split(" ")[1]}`} />
                    </div>
                  </div>
                  <p className="text-xs font-medium mt-4 text-slate-400">
                    {kpi.subtext}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <CurvaEpidemica pacientes={pacientes} />
            </div>
            <div className="lg:col-span-1">
              <StatusDonut pacientes={pacientes} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <PerfilDemografico pacientes={pacientes} />
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-800">
                  Distribuição por Quadrante
                </h3>
                <p className="text-sm text-slate-500">
                  Casos por área de referência (UBS)
                </p>
              </div>
              <div className="flex-1 space-y-5">
                {distribuicaoUbs.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-medium text-slate-600 flex items-center gap-2">
                        <span
                          className={`size-2.5 rounded-full ${item.color}`}
                        ></span>
                        {item.name}
                      </span>
                      <span className="font-bold text-slate-700">
                        {item.value}
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${item.color}`}
                        style={{ width: `${(item.value / item.max) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Coluna 3: Casos Recentes (Seu componente original) */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-800">
                  Casos Recentes
                </h3>
                <p className="text-sm text-slate-500">
                  Últimos registros inseridos
                </p>
              </div>
              <div className="flex-1 flex flex-col gap-1 overflow-y-auto">
                {casosRecentes.map((caso, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors group cursor-pointer border border-transparent hover:border-slate-100"
                    onClick={() => {
                      setPacienteSelecionado(caso.dadosOriginais);
                      setModalAberto(true);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="size-2 rounded-full bg-rose-500 shadow-sm shadow-rose-200"></div>
                      <div className="truncate w-40">
                        <p className="text-sm font-bold text-slate-800 truncate">
                          {caso.name}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                          {caso.condition} • {caso.ubs}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="size-4 text-slate-300 group-hover:text-slate-600 transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
        <footer className="mt-auto px-8 py-5 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <img
              src={AssinaturaGovernamental}
              alt="Assinatura do Governo Federal e Secretaria de Saúde"
              className="h-10 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default rounded-xs"
            />
          </div>

          <div className="text-xs text-slate-400 font-medium">
            &copy; {new Date().getFullYear()} Controle Epidemiológico. Todos os
            direitos reservados.
          </div>
        </footer>
      </div>
      <PatientModal
        isOpen={modalAberto}
        paciente={pacienteSelecionado}
        onClose={() => setModalAberto(false)}
      />
    </div>
  );
}
