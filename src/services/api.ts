import type { CalcularRequest, CalcularResponse } from "../types/calcular";

export const enviarDadosCalculador = async (
  dados: CalcularRequest,
): Promise<CalcularResponse> => {
  const response = await fetch("/calcular", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });
  return (await response.json()) as Promise<CalcularResponse>;
};
