import React, { useState, useEffect } from "react";
import { AiOutlineReload } from "react-icons/ai";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const ApiStatus = ({ apiUrl, apiName }) => {
  const [status, setStatus] = useState({
    message: "Carregando...",
    isOnline: false,
    health: null,
  });
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [cardColor, setCardColor] = useState("bg-gray-200");

  const fetchApiStatus = () => {
    setStatus({ message: "Atualizando...", isOnline: false });
    const startTime = performance.now();
    fetch(apiUrl)
      .then((response) => {
        const endTime = performance.now();
        const duration = endTime - startTime;
        const maxResponseTime = 1000; // Tempo máximo esperado em milissegundos
        const progressPercentage = (duration / maxResponseTime) * 100;
        setProgress(progressPercentage);

        // Definindo a cor do card com base na porcentagem de progresso
        if (progressPercentage < 50) {
          setCardColor("bg-red-200");
        } else if (progressPercentage >= 50 && progressPercentage < 55) {
          setCardColor("bg-red-200");
        } else if (progressPercentage >= 55 && progressPercentage <= 60) {
          setCardColor("bg-yellow-200");
        } else {
          setCardColor("bg-green-200");
        }

        setTimeout(() => setLoading(false), 2000);
        if (!response.ok) {
          throw new Error("Erro ao recuperar os dados da API");
        }
        return response.json();
      })
      .then((data) => {
        const health = data && data.health ? data.health : "Desconhecido";
        setStatus({
          message: `${apiName} está funcionando`,
          isOnline: true,
          health: health,
        });
      })
      .catch((error) => {
        setStatus({
          message: `${apiName} está fora do ar: ${error.message}`,
          isOnline: false,
          health: "Desconhecido",
        });
      });
  };

  useEffect(() => {
    fetchApiStatus();
    const intervalId = setInterval(fetchApiStatus, 60000);
    return () => clearInterval(intervalId);
  }, [apiUrl, apiName]);

  return (
    <div className="flex items-center justify-center p-2 rounded-lg">
      <div
        className={`p-6 rounded-lg shadow-md w-[400px] h-[220px] ${cardColor} transition-colors duration-300 ease-in-out transform hover:scale-105`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{apiName}</h2>
          {loading ? (
            <div className="animate-spin">
              <AiOutlineReload className="text-gray-500 w-6 h-6" />
            </div>
          ) : status.isOnline ? (
            <FaCheckCircle className="text-green-500 w-6 h-6" />
          ) : (
            <FaTimesCircle className="text-red-500 w-6 h-6" />
          )}
        </div>
        <div>
          <p className="text-sm">{status.message}</p>
          <p className="text-sm mt-2">Saúde: {status.health}</p>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className="w-full mr-4">
            <div className="relative w-full h-2 bg-gray-200 rounded-full">
              <div
                className="absolute left-0 top-0 h-full rounded-full"
                style={{ width: `${progress}%`, backgroundColor: "#4CAF50" }}
              />
            </div>
          </div>
          <span className="text-sm">{Math.round(progress)}%</span>
        </div>
        <button
          onClick={fetchApiStatus}
          className="mt-4 flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors duration-300"
        >
          <AiOutlineReload className="w-5 h-5 mr-1" />
          Atualizar status
        </button>
      </div>
    </div>
  );
};

export default ApiStatus;
