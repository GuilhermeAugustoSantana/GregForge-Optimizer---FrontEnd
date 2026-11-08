// @meta-test environment jsdom
import { describe, it, expect, vi } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { enviarDadosCalculador } from "../services/api";
import { useCalculador } from "./useCalculador";

vi.mock("../services/api", () => ({
  enviarDadosCalculador: vi.fn(),
  receberListaMinerios: vi.fn().mockResolvedValue([
    { id: "copper_native_copper_raw_normal", nome: "Native copper", mb: 36 },
    { id: "tin_native_tin_raw_normal", nome: "Native tin", mb: 36 },
  ]),
}));

describe("testando o Hook de Cálculo", () => {
  it("Deve iniciar com os estados vazios e limpos", () => {
    const { result } = renderHook(() => useCalculador());
    expect(result.current.resultado).toBeNull();
    expect(result.current.carregando).toBe(false);
    expect(result.current.erro).toBeNull();
  });

  it("Deve gerenciar os estados de carregamento e sucesso ao calcular", async () => {
    const dados = {
      metaLingotes: 6,
      mineriosSelecionados: [
        {
          id: "copper_native_copper_raw_normal",
          nome: "Native copper",
          mb: 36,
        },
        { id: "malachite", nome: "Malachite", mb: 24 },
      ],
    };

    const responsaSucesso = {
      metaLingotes: 6,
      desperdicio_mb: 1,
      "minérios necessários": {
        "Native copper": 1,
        Malachite: 24,
      },
    };

    vi.mocked(enviarDadosCalculador).mockResolvedValueOnce(responsaSucesso);

    const { result } = renderHook(() => useCalculador());

    await act(async () => {
      await result.current.calcularProporcao(dados);
    });

    expect(result.current.carregando).toBe(false);
    expect(result.current.resultado).toEqual(responsaSucesso);
    expect(result.current.resultado?.desperdicio_mb).toBe(1);
    expect(result.current.erro).toBeNull();
  });

  it("Deve buscar e armazenar a lista de minérios da API ao inicializar o hook", async () => {
    const { result } = renderHook(() => useCalculador());

    await waitFor(() => {
      expect(result.current.listaMinerios).not.toBeNull();
      expect(result.current.listaMinerios).length(2);
      expect(result.current.erro).toBeNull();
    });
  });

  it("Deve mudar a lista de minérios da API com o filtro de pesquisa que o usuario informou", async () => {
    const { result } = renderHook(() => useCalculador());

    await waitFor(() => {
      expect(result.current.listaMinerios).length(2);
    });

    act(() => {
      result.current.setMinerioPesquisado("copper");
    });

    expect(result.current.minerioPesquisado).toBe("copper");
    expect(result.current.listaMinerios).length(1);
    expect(result.current.listaMinerios[0].nome).toBe("Native copper");
  });
});
