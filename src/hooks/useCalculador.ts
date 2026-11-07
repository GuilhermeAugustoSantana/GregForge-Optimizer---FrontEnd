import type { CalcularRequest, CalcularResponse } from "./../types/calcular";
import { enviarDadosCalculador } from "../services/api";
import { useState } from "react";

export const useCalculador = () => {
  const [resultado, setResultado] = useState<CalcularResponse | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const calcularProporcao = async (dados: CalcularRequest) => {
    setCarregando(true);
    setErro(null);

    await enviarDadosCalculador(dados)
      .then((resposta) => {
        setResultado(resposta);
      })
      .catch((error) => {
        setErro(error.message || "Ocorreu um erro ao calcular a proporção.");
      })
      .finally(() => {
        setCarregando(false);
      });
  };

  return { resultado, carregando, erro, calcularProporcao };
};
