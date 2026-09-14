import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import {
  Users,
  Activity,
  AlertTriangle,
  MapPin,
  RefreshCw,
  Menu,
} from "lucide-react";
import PatientModal from "../components/Dashboard/Dengue/Modal/PatientModal.jsx";
import {
  CurvaEpidemica,
  StatusDonut,
  PerfilDemografico,
} from "../components/Dashboard/Dengue/Modal/DashboardCharts.jsx";

import KpisGrid from "../components/Dashboard/Dengue/KpisGrid.jsx";
import DistribuicaoQuadrante from "../components/Dashboard/Dengue/DistribuicaoQuadrante.jsx";
import CasosRecentes from "../components/Dashboard/Dengue/CasosRecentes.jsx";

import DashboardSifilis from "./DashboardSifilis.jsx";
import DashboardTuberculose from "./DashBoardTuberculose.jsx";

const ENDEMIAS = [
  { id: "dengue", nome: "Dengue", endpoint: "/api/dengue/" },
  { id: "sifilis", nome: "Sífilis", endpoint: "/api/sifilis/" },
  { id: "tuberculose", nome: "Tuberculose", endpoint: "/api/tuberculose/" },
];

// Dicionário de Bairros -> UBS (Lógica replicada do Mapa)
const BAIRRO_PARA_UBS = {
  CENTRO: "UBS Floriano (Centro)",
  SAMBAIBA: "UBS Dirceu Arcoverde",
  "SAMBAIBA VELHA": "UBS Dirceu Arcoverde",
  MANGUINHA: "UBS José Paraguassú",
  "ALTO DA CRUZ": "UBS Theodoro F. Sobral",
  "CAMPO VELHO": "UBS Pedro Simplício",
  "REDE NOVA": "UBS Alfredo de Carvalho",
  TABOCA: "UBS Luiz Tavares",
  "IRAPUA I": "UBS Camilo Filho",
  "IRAPUA II": "UBS Camilo Filho",
  "NOSSA SENHORA DA GUIA": "UBS N. Sra. da Guia",
  TIBERAO: "UBS Raimundo Filho",
  "BOM LUGAR": "UBS Paulo Kalume",
  "BOSQUE SANTA TEREZINHA": "UBS João Elias Oka",
  "CAIXA D AGUA": "UBS Theodoro F. Sobral",
  CAJUEIRO: "UBS João Elias Oka",
  "ALTO DA GUIA": "UBS N. Sra. da Guia",
  CURADOR: "UBS Theodoro F. Sobral",
  IBIAPABA: "UBS Viana de Carvalho",
  "PAU FERRADO": "UBS Paulo Martins",
  "SAO BORJA": "UBS Pedro Simplício",
  "PLANALTO SAMBAIBA": "UBS Dirceu Arcoverde",
  CATUMBI: "UBS Raimundo Filho",
  "SAO CRISTOVAO": "UBS Floriano (Centro)",
  TAMBORIL: "UBS Alfredo de Carvalho",
  "CONJUNTO PARAISO": "UBS Jasmina Bucar",
  CANCELA: "UBS Paulo Kalume",
  CANOAS: "UBS José Paraguassú",
  "PLANALTO BELA VISTA": "UBS Pedro Simplício",
  MELADAO: "UBS Pedro Simplício",
  VIAZUL: "UBS Raimundo Filho",
  "PEDRO SIMPLICIO": "UBS Pedro Simplício",
};

export default function Dashboard() {
  const [endemiaSelecionada, setEndemiaSelecionada] = useState(ENDEMIAS[0]);
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pacienteSelecionado, setPacienteSelecionado] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    const baseUrl = import.meta.env.VITE_API_URL;

    fetch(`${baseUrl}${endemiaSelecionada.endpoint}`)
      .then((response) => {
        if (!response.ok)
          throw new Error(`Erro HTTP! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        setPacientes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
        setPacientes([]);
        setLoading(false);
      });
  }, [endemiaSelecionada]);

  // Helpers de Bairro baseados no mapa
  const obterBairroNormalizado = (endereco) => {
    if (!endereco) return "";
    const partes = endereco.split(",");
    let bairroStr = partes[partes.length - 1].trim();

    if (/^[0-9-]+$/.test(bairroStr) && partes.length >= 2) {
      bairroStr = partes[partes.length - 2].trim();
    } else if (/^[0-9-]+$/.test(bairroStr)) {
      return "";
    }
    return bairroStr
      .toUpperCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  const extrairBairroVisual = (endereco) => {
    if (!endereco) return "Não informado";
    const partes = endereco.split(",");
    let bairroStr = partes[partes.length - 1].trim();

    if (/^[0-9-]+$/.test(bairroStr) && partes.length >= 2) {
      bairroStr = partes[partes.length - 2].trim();
    } else if (/^[0-9-]+$/.test(bairroStr)) {
      return "CEP Genérico";
    }
    return bairroStr.charAt(0).toUpperCase() + bairroStr.slice(1).toLowerCase();
  };

  const casosAlerta = pacientes.filter((p) => {
    const classFinal = String(p.classi_fin || "").trim();
    return classFinal === "10" || classFinal === "11";
  }).length;

  const casosRecentes = [...pacientes]
    .sort((a, b) => {
      const dateA = a.data_notificacao || "0000-00-00";
      const dateB = b.data_notificacao || "0000-00-00";
      return dateA !== dateB
        ? dateB.localeCompare(dateA)
        : (b.id || 0) - (a.id || 0);
    })
    .slice(0, 5)
    .map((paciente) => {
      const bairro = extrairBairroVisual(paciente.endereco);

      let ubsTag = "";
      if (endemiaSelecionada.id === "dengue") {
        ubsTag =
          BAIRRO_PARA_UBS[obterBairroNormalizado(paciente.endereco)] ||
          "Não Mapeada";
      } else {
        ubsTag = paciente.nm_ubs || paciente.un_saude || "Não informada";
      }

      const classFinal = String(paciente.classi_fin || "").trim();
      let statusCor = "bg-amber-500";
      if (classFinal === "10" || classFinal === "11") statusCor = "bg-rose-600";
      else if (classFinal === "5") statusCor = "bg-emerald-500";
      else if (classFinal === "8") statusCor = "bg-slate-400";

      return {
        name: `Caso #${paciente.numero_notificacao || "S/N"}`,
        condition: `Sintoma: ${paciente.data_pri_sintoma || "N/I"} | Sexo: ${paciente.cs_sexo || "N/I"}`,
        ubs: `UBS: ${ubsTag} | ${bairro}`,
        corClassificacao: statusCor,
        dadosOriginais: paciente,
      };
    });

  // Distribuição Inteligente: Dengue por Mapa, Outras por API
  const contagemUbs = pacientes.reduce((acc, paciente) => {
    let ubs = "Não Informada";

    if (endemiaSelecionada.id === "dengue") {
      const bairroNormalizado = obterBairroNormalizado(paciente.endereco);
      ubs = BAIRRO_PARA_UBS[bairroNormalizado] || "Outras Regiões";
    } else {
      const nomeAPI = paciente.nm_ubs || paciente.un_saude;
      if (nomeAPI) ubs = nomeAPI;
    }

    acc[ubs] = (acc[ubs] || 0) + 1;
    return acc;
  }, {});

  const maxCasosUbs = Math.max(...Object.values(contagemUbs), 1);
  const coresDistribuicao = [
    "bg-blue-500",
    "bg-emerald-500",
    "bg-amber-500",
    "bg-rose-500",
    "bg-purple-500",
  ];

  const distribuicaoUbs = Object.entries(contagemUbs)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([nome, valor], index) => ({
      name: nome,
      value: valor,
      max: maxCasosUbs,
      color: coresDistribuicao[index % coresDistribuicao.length],
    }));

  const ubsMaisAfetadaNome =
    Object.keys(contagemUbs).length > 0
      ? Object.keys(contagemUbs).reduce((a, b) =>
          contagemUbs[a] > contagemUbs[b] ? a : b,
        )
      : "Nenhuma";
  const ubsMaisAfetadaValor = contagemUbs[ubsMaisAfetadaNome] || 0;

  const hoje = new Date();
  const seteDiasAtras = new Date();
  seteDiasAtras.setDate(hoje.getDate() - 7);
  const casosUltimos7Dias = pacientes.filter((p) => {
    const dt = p.data_notificacao || p.dt_notific;
    if (!dt) return false;
    const [ano, mes, dia] = dt.split("-");
    const dataNotificacao = new Date(ano, mes - 1, dia);
    return dataNotificacao >= seteDiasAtras && dataNotificacao <= hoje;
  }).length;

  const taxaNovosCasos =
    pacientes.length > 0
      ? Math.round((casosUltimos7Dias / pacientes.length) * 100)
      : 0;

  const totalNotificacoes =
    endemiaSelecionada.id === "tuberculose"
      ? pacientes.reduce((acc, p) => acc + Number(p.nu_notific || 0), 0)
      : pacientes.length;

  const kpis = [
    {
      title: "Total de Notificações",
      value: totalNotificacoes,
      icon: Users,
      color: "blue",
      subtext: "Registros importados.",
    },
    {
      title: "Casos em Alerta (Graves)",
      value: casosAlerta,
      icon: AlertTriangle,
      color: "amber",
      subtext: "Graves/Sinais de alarme.",
    },
    {
      title: "UBS mais Afetada",
      value: ubsMaisAfetadaNome,
      icon: MapPin,
      color: "rose",
      subtext: `${ubsMaisAfetadaValor} casos registrados.`,
    },
    {
      title: "Últimos Casos (7 dias)",
      value: `${taxaNovosCasos}%`,
      icon: Activity,
      color: "emerald",
      subtext: `${casosUltimos7Dias} casos recentes.`,
    },
  ];

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden text-slate-800">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col h-full w-full overflow-y-auto overflow-x-hidden ml-0 md:ml-64 transition-all duration-300">
        <header className="px-4 md:px-8 py-3 flex items-center justify-between sticky top-0 z-30 bg-linear-to-r from-[#054060] to-indigo-600 shadow-md border-b border-[#043048]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 text-white bg-white/20 rounded-md hover:bg-white/30 transition-colors"
            >
              <Menu className="size-6" />
            </button>
            <h2 className="text-lg md:text-xl font-bold text-white tracking-wide">
              Visão Geral
            </h2>
          </div>
        </header>

        <main className="p-4 md:p-8 space-y-6 w-full max-w-7xl mx-auto overflow-x-hidden">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
                Dashboard - {endemiaSelecionada.nome}
              </h1>
              <p className="text-sm md:text-base text-slate-500 mt-1">
                Acompanhamento epidemiológico dos casos de{" "}
                {endemiaSelecionada.nome}
              </p>
            </div>

            <div className="flex items-center gap-3 bg-slate-100 p-1 rounded-lg">
              {ENDEMIAS.map((endemia) => (
                <button
                  key={endemia.id}
                  onClick={() => setEndemiaSelecionada(endemia)}
                  className={`px-4 py-2 text-sm font-bold rounded-md transition-colors ${
                    endemiaSelecionada.id === endemia.id
                      ? "bg-white text-[#054060] shadow-sm border border-slate-200"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {endemia.nome}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <RefreshCw className="size-8 text-[#054060] animate-spin" />
            </div>
          ) : (
            <>
              {endemiaSelecionada.id === "sifilis" ? (
                <DashboardSifilis
                  pacientes={pacientes}
                  distribuicaoUbs={distribuicaoUbs}
                />
              ) : endemiaSelecionada.id === "tuberculose" ? (
                <DashboardTuberculose pacientes={pacientes} />
              ) : (
                <>
                  <KpisGrid kpis={kpis} />
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 overflow-hidden w-full">
                      <CurvaEpidemica pacientes={pacientes} />
                    </div>
                    <div className="lg:col-span-1 overflow-hidden w-full">
                      <StatusDonut pacientes={pacientes} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1 overflow-hidden w-full">
                      <PerfilDemografico pacientes={pacientes} />
                    </div>
                    <DistribuicaoQuadrante distribuicaoUbs={distribuicaoUbs} />
                    <CasosRecentes
                      casos={casosRecentes}
                      onSelectPaciente={(paciente) => {
                        setPacienteSelecionado(paciente);
                        setModalAberto(true);
                      }}
                    />
                  </div>
                </>
              )}
            </>
          )}
        </main>
      </div>

      <PatientModal
        isOpen={modalAberto}
        paciente={pacienteSelecionado}
        onClose={() => setModalAberto(false)}
      />
    </div>
  );
}
