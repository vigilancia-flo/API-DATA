import { Map as MapIcon, ShieldAlert, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ParticlesBg from "particles-bg";
import EpiDataLogo from "../assets/EPI-DATA.png";

// Configurações de Particulas
// Para ativar a configParticulas, definir o "type" como "custom"
// Para desativar, definir o "type" como "square"
const configParticulas = {
  num: [5, 10], // Quantidade de partículas
  rps: 0.1,
  radius: [5, 40], // Tamanho
  life: [1.5, 3], // Tempo de vida na tela
  v: [2, 3], // Velocidade
  tha: [-40, 40], // Ângulo
  alpha: [0.6, 0], // Transparência
  scale: [0.1, 0.4], // Escala
  position: "all",
  color: ["#054060", "#e11d48", "#f59e0b", "#3b82f6"], // Coloque sua paleta de cores aqui!
  cross: "dead",
  random: 15,
};

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden bg-li-to-b from-[#eef4f8] via-[#f7f9fb] to-[#eef4f8]">
      {/* Particulas de fundo */}
      <ParticlesBg
        type="square"
        bg={true}
        className="z-0"
        config={configParticulas}
      />

      <div className="max-w-3xl w-full bg-white/85 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-10 md:p-14 text-center space-y-8 border border-white/60 relative z-10">
        <div className="flex flex-col items-center gap-6">
          <img
            src={EpiDataLogo}
            alt="EPI-DATA"
            className="w-56 sm:w-64 md:w-72"
          />

          <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Sistema de mapeamento epidemiológico de Floriano, PI. Acompanhe a
            evolução de casos, dados gerais e as zonas de abrangência das UBSs.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 pt-2 text-left">
          <div className="p-6 sm:p-7 rounded-2xl bg-[#054060]/4 border border-[#054060]/10 flex flex-col gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#054060] flex items-center justify-center shrink-0">
              <MapIcon className="size-5 text-white" aria-hidden="true" />
            </div>
            <h3 className="font-bold text-base text-slate-800">
              Mapa de calor georreferenciado
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Densidade de casos segmentada pelas áreas de abrangência dos
              quadrantes.
            </p>
          </div>

          <div className="p-6 sm:p-7 rounded-2xl bg-amber-50/60 border border-amber-600/10 flex flex-col gap-3">
            <div className="w-11 h-11 rounded-xl bg-amber-600 flex items-center justify-center shrink-0">
              <ShieldAlert className="size-5 text-white" aria-hidden="true" />
            </div>
            <h3 className="font-bold text-base text-slate-800">
              Controle de surtos e vetores
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Mapeamento de risco e suporte à decisão para contenção em tempo
              real.
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col items-center gap-5">
          <button
            onClick={() => navigate("/dados-gerais")}
            className="group flex items-center gap-2 bg-[#054060] hover:bg-[#085883] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#054060] text-white font-semibold text-base sm:text-lg py-3.5 px-8 sm:px-10 rounded-xl transition-colors shadow-lg hover:shadow-blue-600/30 active:scale-95"
          >
            Acessar painel do mapa
            <ArrowRight
              className="size-5 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </button>

          <p className="text-xs font-medium text-slate-400 tracking-wide">
            Secretaria de Saúde — Floriano, PI · 2026
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
