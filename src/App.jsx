import React from "react";
import ApiStatus from "./components/ApiStatus";
import "./App.css";

const App = () => {
  return (
    <div className="bg-zinc-200 h-screen">
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-between max-sm:justify-center">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-8 ml-2">
            Monitora - SIBI
          </h1>

          <p className="text-base font-bold pr-3 max-sm:hidden">
            "Seja a saúde e a taxa de respostas da aplicação." Padrões:
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          <ApiStatus
            apiUrl="https://sibi-api.vercel.app/livros"
            apiName="API de Livros"
          />
          <ApiStatus
            apiUrl="https://sibi-api.vercel.app/emprestimos"
            apiName="API de Empréstimos"
          />
          <ApiStatus
            apiUrl="https://sibi-api.vercel.app/emprestimos/atrasados"
            apiName="API de Empréstimos Atrasados"
          />
          <ApiStatus
            apiUrl="https://sibi-api.vercel.app/livros/disponiveis"
            apiName="API de Livros Disponíveis"
          />
          <ApiStatus
            apiUrl="https://sibi-api.vercel.app/equipamentos"
            apiName="API de Equipamentos"
          />
          <ApiStatus
            apiUrl="https://sibi-api.vercel.app/agendamentos"
            apiName="API de Agendamentos"
          />
        </div>
      </div>
    </div>
  );
};

export default App;
