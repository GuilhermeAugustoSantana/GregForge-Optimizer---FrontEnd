import { describe, it, expect, vi, beforeEach } from "vitest";
import type { CalcularRequest, CalcularResponse } from "../types/calcular";
import { enviarDadosCalculador, receberListaMinerios } from "./api";

describe("testando o Serviço post da API do Otimizador", () => {
  it("Deve enviar os dados do formulário e retornar a resposta tipada com sucesso", async () => {
    const request: CalcularRequest = {
      metaLingotes: 6,
      mineriosSelecionados: [
        {
          id: "copper_native_copper_dust_tiny",
          nome: "Tiny pile of copper",
          mb: 16,
        },
      ],
    };

    const response: CalcularResponse = {
      metaLingotes: 6,
      desperdicio_mb: 1,
      "minérios necessários": {
        "Native copper": 1,
        Malachite: 24,
      },
    };

    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => response,
    } as Response);

    const result = await enviarDadosCalculador(request);

    expect(result.metaLingotes).toBe(6);
    expect(result.desperdicio_mb).toBe(1);
    expect(result["minérios necessários"]["Native copper"]).toBe(1);
    expect(result["minérios necessários"]["Malachite"]).toBe(24);

    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/calcular"),
      expect.any(Object),
    );
  });
});

describe("testando o serviço get da APi do Otimizador", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });
  it("Deve receber os dados dos minérios da api", async () => {
    const response = [
      {
        id: "copper_native_copper_dust_tiny",
        nome: "Tiny pile of copper",
        mb: 16,
      },
    ];

    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => response,
    } as Response);

    const listaMinerios = await receberListaMinerios();

    expect(listaMinerios).toEqual(response);
    expect(listaMinerios).toHaveLength(1);
    expect(listaMinerios[0].id).toBe("copper_native_copper_dust_tiny");

    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/minerios"),
      expect.any(Object),
    );
  });

  it("Deve estourar um erro com mensagem amigável caso o servidor falhe", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
    } as Response);
    const resposta = receberListaMinerios();

    await expect(resposta).rejects.toThrow(
      "Não foi possível carregar a lista de minérios.",
    );
  });
});
