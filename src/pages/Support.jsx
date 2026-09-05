import { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import { IoChatbubbles, IoEllipse, IoClose, IoWarning } from "react-icons/io5";
import { Menu } from "lucide-react";

function Support() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Olá! Sou o assistente virtual. Como posso ajudar você hoje?",
    },
  ]);

  const [inputValue, setInputValue] = useState("");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  const handleSendMessage = async (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      const userText = inputValue;

      // Adiciona a mensagem do usuário na tela
      setMessages((prev) => [...prev, { sender: "user", text: userText }]);
      setInputValue("");

      try {
        const apiUrl = import.meta.env.VITE_API_URL;

        const response = await fetch(`${apiUrl}/chat/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: userText }),
        });

        const data = await response.json();

        if (data.status === "success") {
          setMessages((prev) => [
            ...prev,
            { sender: "bot", text: data.response },
          ]);
        } else {
          throw new Error("Erro na resposta da API");
        }
      } catch (error) {
        console.error("Erro de comunicação com o chatbot:", error);
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "Desculpe, ocorreu um erro de conexão com o servidor. Tente novamente mais tarde.",
          },
        ]);
      }
    }
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden text-slate-800">
      {/* 1. SIDEBAR RESPONSIVA */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* 2. CONTAINER PRINCIPAL RESPONSIVO */}
      {/* Usando ml-0 no mobile e md:ml-64 no desktop */}
      <main className="flex-1 flex flex-col h-full w-full overflow-y-auto ml-0 md:ml-64 relative">
        {/* HEADER RESPONSIVO COM BOTÃO HAMBURGUER (Aparece só no Mobile) */}
        <header className="md:hidden px-4 py-3 flex items-center justify-between sticky top-0 z-30 bg-linear-to-r from-[#054060] to-indigo-600 shadow-md border-b border-[#043048]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 text-white bg-white/20 rounded-md hover:bg-white/30 transition-colors"
            >
              <Menu className="size-6" />
            </button>
            <h2 className="text-lg font-bold text-white tracking-wide">
              Suporte
            </h2>
          </div>
        </header>

        <div className="p-4 md:p-10 w-full max-w-7xl mx-auto space-y-6">
          <section className="bg-linear-to-r from-blue-900 to-[#054060] text-white py-12 md:py-16 lg:py-20 px-6 lg:px-10 relative overflow-hidden rounded-2xl md:rounded-3xl shadow-xl">
            <div className="absolute inset-0 opacity-25 pointer-events-none">
              <div className="absolute top-10 left-10 w-32 md:w-40 h-32 md:h-40 bg-purple-400 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-48 md:w-60 h-48 md:h-60 bg-indigo-500 rounded-full blur-3xl"></div>
            </div>

            <div className="mx-auto flex flex-col lg:flex-row items-center justify-between relative z-10 gap-8 md:gap-10">
              <div className="lg:w-2/3 text-center lg:text-left animate-fade-in-up">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight">
                  Como podemos ajudá-lo hoje?
                </h1>
                <p className="text-base md:text-xl opacity-90 mb-6 md:mb-8 max-w-2xl mx-auto lg:mx-0">
                  Obtenha suporte instantâneo para suas necessidades na
                  plataforma Resource Flow.
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 flex items-center justify-center gap-2 hover-lift cursor-default">
                    <IoEllipse className="text-green-400 text-xs" />
                    <span className="font-medium text-sm md:text-base">
                      Suporte 24/7 Disponível
                    </span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 flex items-center justify-center gap-2 hover-lift cursor-default">
                    <IoEllipse className="text-green-400 text-xs" />
                    <span className="font-medium text-sm md:text-base">
                      Tempo Médio: 5min
                    </span>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/3 flex justify-center hidden sm:flex">
                <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
                  <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse"></div>
                  <div className="absolute inset-4 bg-white/5 rounded-full animate-ping opacity-20"></div>
                  <div className="absolute inset-8 bg-white/5 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
                    <IoChatbubbles className="text-white text-5xl md:text-7xl drop-shadow-lg" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="bg-amber-50/50 border border-amber-500/30 p-5 md:p-6 flex flex-col gap-3 rounded-2xl md:rounded-3xl shadow-sm">
            <h2 className="flex items-center gap-2 text-lg md:text-xl text-amber-600 font-bold">
              <IoWarning size={22} className="shrink-0" /> Atenção
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
              Todas as respostas são dadas por uma IA especializada no contexto
              geral da plataforma. Caso queira uma resposta mais específica,
              entre em contato com:{" "}
              <a
                href="mailto:vigilanciafloriano@gmail.com"
                className="text-blue-600 hover:text-blue-500 hover:underline font-medium break-all"
              >
                vigilanciafloriano@gmail.com
              </a>
            </p>
          </div>
        </div>

        {/* Botão flutuante do Chatbot ajustado no mobile */}
        {!isChatbotOpen && (
          <button
            onClick={toggleChatbot}
            aria-label="Abrir suporte por chat"
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-14 h-14 md:w-16 md:h-16 bg-linear-to-r from-[#054060] to-indigo-600 text-white rounded-full flex items-center justify-center cursor-pointer shadow-2xl hover:shadow-indigo-500/40 transform hover:scale-105 transition-all duration-300 z-50 group"
          >
            <IoChatbubbles className="text-xl md:text-2xl group-hover:rotate-12 transition-transform" />
            <div className="absolute top-2 right-2 md:top-3 md:right-3 w-3 h-3 bg-green-400 rounded-full border-2 border-[#054060]"></div>
          </button>
        )}

        {/* Janela do Chatbot com largura flexível no celular */}
        {isChatbotOpen && (
          <div className="fixed bottom-24 right-4 md:right-8 left-4 md:left-auto w-auto md:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 flex flex-col overflow-hidden animate-fade-in-up">
            <div className="bg-linear-to-r from-[#054060] to-indigo-600 p-4 flex justify-between items-center">
              <h3 className="text-white font-bold flex items-center gap-2 text-sm md:text-base">
                <IoChatbubbles /> Suporte Automatizado
              </h3>
              <button
                onClick={toggleChatbot}
                className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-1.5 transition-colors cursor-pointer"
              >
                <IoClose size={20} />
              </button>
            </div>

            {/* Renderiza as mensagens */}
            <div className="h-64 md:h-80 p-4 text-sm flex flex-col gap-3 overflow-y-auto bg-slate-50">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-2xl max-w-[85%] ${
                    msg.sender === "user"
                      ? "self-end bg-[#054060] text-white rounded-tr-none shadow-sm"
                      : "self-start bg-white border border-slate-200 text-slate-700 rounded-tl-none shadow-sm"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Input do chat */}
            <div className="p-3 bg-white border-t border-slate-100">
              <input
                type="text"
                placeholder="Digite sua mensagem e aperte Enter..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleSendMessage}
                className="w-full bg-slate-50 text-slate-800 px-4 py-2.5 rounded-full border border-slate-200 focus:outline-none focus:border-[#054060] focus:ring-1 focus:ring-[#054060] transition-all text-sm"
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Support;
