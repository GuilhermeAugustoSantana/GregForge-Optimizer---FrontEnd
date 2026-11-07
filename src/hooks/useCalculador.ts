import type {
  CalcularRequest,
  CalcularResponse,
  MineriosItem,
} from "./../types/calcular";
import { enviarDadosCalculador, receberListaMinerios } from "../services/api";
import { useState, useEffect } from "react";

export const useCalculador = () => {
  const [listaMinerios, setListaMinerios] = useState<MineriosItem[] | null>([]);
  const [resultado, setResultado] = useState<CalcularResponse | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const calcularProporcao = async (dados: CalcularRequest) => {
    setCarregando(true);
    setErro(null);

    try {
      const resposta = await enviarDadosCalculador(dados);
      setResultado(resposta);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErro(err.message);
      } else {
        setErro("Ocorreu um erro ao calcular a proporção.");
      }
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    const carregarMinerios = async () => {
      try {
        const minerios = await receberListaMinerios();
        setListaMinerios(minerios);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setErro(err.message);
        } else {
          setErro("Erro desconhecido ao carregar minérios.");
        }
      }
    };

    void carregarMinerios();
  }, []);

  return { resultado, carregando, erro, calcularProporcao, listaMinerios };
};
