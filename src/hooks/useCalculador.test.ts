// @meta-test environment jsdom
import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { enviarDadosCalculador } from "../services/api";
import { useCalculador } from "./useCalculador";

vi.mock("../services/api", () => ({
  enviarDadosCalculador: vi.fn(),
}));

describe("testando o Hook de Cálculo", () => {
  it("Deve iniciar com os estados vazios e limpos", () => {
    const { result } = renderHook(() => useCalculador());
    expect(result.current.resultado).toBeNull();
    expect(result.current.carregando).toBe(false);
    expect(result.current.erro).toBeNull();
  });

  it('Deve gerenciar os estados de carregamento e sucesso ao calcular', async () => {
    const dados = {
      metaLingotes: 6,
      mineriosSelecionados: ['Native copper', 'Malachite']
    }

    const responsaSucesso = {
      metaLingotes: 6,
      desperdicio_mb: 1,
      "minérios necessários": {
        "Native copper": 1,
        Malachite: 24,
      },
    }

    vi.mocked(enviarDadosCalculador).mockResolvedValueOnce(responsaSucesso);
    
    const { result } = renderHook(() => useCalculador());

    await act(async () => {
      await result.current.calcularProporcao(dados);
    })

    expect(result.current.carregando).toBe(false);
    expect(result.current.resultado).toEqual(responsaSucesso);
    expect(result.current.resultado?.desperdicio_mb).toBe(1);
    expect(result.current.erro).toBeNull();
  });
});
