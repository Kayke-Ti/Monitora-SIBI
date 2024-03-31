import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import ApiStatus from "../components/ApiStatus";
import Chart from "chart.js/auto";
import { AiOutlineReload } from "react-icons/ai";

const Home = () => {
  const [responseTimes, setResponseTimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const responses = await Promise.all([
        fetch("https://sibi-api.vercel.app/livros"),
        fetch("https://sibi-api.vercel.app/emprestimos"),
        fetch("https://sibi-api.vercel.app/emprestimos/atrasados"),
        fetch("https://sibi-api.vercel.app/livros/disponiveis"),
        fetch("https://sibi-api.vercel.app/equipamentos"),
        fetch("https://sibi-api.vercel.app/agendamentos"),
      ]);

      const responseTimes = await Promise.all(
        responses.map(async (response) => {
          const startTime = performance.now();
          await response.json();
          const endTime = performance.now();
          return endTime - startTime;
        })
      );

      setResponseTimes(responseTimes);
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (responseTimes.length > 0 && !loading) {
      if (chartRef.current !== null) {
        chartRef.current.destroy();
      }

      const ctx = document.getElementById("responseTimeChart");
      chartRef.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            "Livros",
            "Empréstimos",
            "Empréstimos Atrasados",
            "Livros Disponíveis",
            "Equipamentos",
            "Agendamentos",
          ],
          datasets: [
            {
              label: "Tempo de Resposta Médio (ms)",
              data: responseTimes,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          animation: {
            duration: 2000,
            easing: "easeInOutQuart",
          },
        },
      });
    }
  }, [responseTimes, loading]);

  return (
    <>
      <Header />
      <div className="bg-gray-100 py-8">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
      <div className="bg-white py-8">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-semibold mb-4 text-center">
            Tempo de Resposta Médio das APIs
          </h2>
          {loading ? (
            <div className="flex items-center justify-center">
              <AiOutlineReload className="text-zinc-700 animate-spin w-14 h-14 p-1 font-medium outline-none" />
            </div>
          ) : (
            <canvas
              id="responseTimeChart"
              style={{ width: "100%", height: "300px" }}
            ></canvas>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
