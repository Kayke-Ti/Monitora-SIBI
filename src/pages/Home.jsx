import React from "react";
import ApiStatus from "../components/ApiStatus";

const Home = () => {
  return (
    <div className="w-full bg-gray-100">
      <div className="max-w-[90%] mx-auto py-8">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-3xl">MONITORA - SIBI</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 mt-4">
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

export default Home;
