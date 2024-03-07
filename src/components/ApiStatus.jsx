import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
        let progressPercentage = (duration / maxResponseTime) * 100;
        if (progressPercentage > 100) {
          progressPercentage = 100; // Limitando a porcentagem a 100%
        }
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
    <motion.div
      className="flex items-center justify-center p-2 rounded-lg"
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        className={`p-6 rounded-lg shadow-md w-[400px] h-[220px] ${cardColor}`}
        transition={{ duration: 0.3 }}
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
          <div className="w-full">
            <div className="h-[0.60rem] bg-gray-200 rounded-full">
              <motion.div
                className="h-full rounded-full"
                style={{ width: `${progress}%`, backgroundColor: "#4CAF50" }}
                transition={{ ease: "easeOut", duration: 1 }}
              />
            </div>
            <span className="text-sm">{Math.round(progress)}%</span>
          </div>
        </div>
        <button
          onClick={fetchApiStatus}
          className="mt-4 flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors duration-300"
        >
          <AiOutlineReload className="w-5 h-5 mr-1" />
          Atualizar status
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ApiStatus;
