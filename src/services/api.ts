import type {
  CalcularRequest,
  CalcularResponse,
  MinerioItem,
} from "../types/calcular";

export const enviarDadosCalculador = async (
  dados: CalcularRequest,
): Promise<CalcularResponse> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/calcular`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });
  if (!response.ok) throw new Error("Erro ao calcular proporções.");
  return (await response.json()) as Promise<CalcularResponse>;
};

export const receberListaMinerios = async (): Promise<MinerioItem[]> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/minerios`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Não foi possível carregar a lista de minérios.");
  }
  return response.json();
};
