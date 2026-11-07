import { describe, it, expect, vi } from "vitest";
import type { CalcularRequest, CalcularResponse } from "../types/calcular";
import { enviarDadosCalculador } from "./api";

describe("testando o Serviço de API do Otimizado", () => {
  it("Deve enviar os dados do formulário e retornar a resposta tipada com sucesso", async () => {
    const request: CalcularRequest = {
      metaLingotes: 6,
      mineriosSelecionados: ["Native copper", "Malachite"],
    };

    const response: CalcularResponse = {
      metaLingotes: 6,
      desperdicio_mb: 1,
      "minérios necessários": {
        "Native copper": 1,
        Malachite: 24,
      },
    };

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => response,
      }),
    );

    const result = await enviarDadosCalculador(request);

    expect(result.metaLingotes).toBe(6);
    expect(result.desperdicio_mb).toBe(1);
    expect(result["minérios necessários"]["Native copper"]).toBe(1);
    expect(result["minérios necessários"]["Malachite"]).toBe(24);

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/calcular"),
      expect.any(Object),
    );
  });
});
