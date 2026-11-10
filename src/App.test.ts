import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { createElement } from "react";
import { App } from "./App";
import type { CalcularResponse } from "./types/calcular";

describe("Testando a Integração Completa no App.tsx", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("Deve preencher a meta, clicar em calcular e exibir o relatório final na tela", async () => {
    const RespostaDadosApi: CalcularResponse = {
      metaLingotes: 6,
      desperdicio_mb: 1,
      "minérios necessários": {
        "Native copper": 1,
        Malachite: 24,
      },
    };

    vi.spyOn(globalThis, "fetch").mockImplementation(async (url) => {
      const urlString = url.toString();

      if (urlString.includes("/minerios")) {
        return {
          ok: true,
          json: async () => [
            {
              id: "copper_native_copper_dust_tiny",
              nome: "Native copper",
              mb: 1,
            },
          ],
        } as Response;
      }

      if (urlString.includes("/calcular")) {
        return {
          ok: true,
          json: async () => RespostaDadosApi,
        } as Response;
      }

      return { ok: false } as Response;
    });

    render(createElement(App));

    const inputsMeta = screen.getByLabelText(/Quantidade de lingotes/i);
    fireEvent.change(inputsMeta, { target: { value: "6" } });

    const checkboxMinerio = await screen.findByLabelText(/Native copper/i);
    fireEvent.click(checkboxMinerio);

    const botaoCalcular = screen.getByRole("button", {
      name: /Calcular Proporção/i,
    });

    fireEvent.click(botaoCalcular);

    await waitFor(() => {
      const painel = screen.getByRole("heading", {
        name: /Relatório de Otimização/i,
      }).parentElement;
      expect(painel?.textContent).toMatch(/Meta Lingote: 6/i);
      expect(painel?.textContent).toMatch(/Desperdício mB: 1 mB/i);
      expect(painel?.textContent).toMatch(/Native copper: 1/);
      expect(painel?.textContent).toMatch(/Malachite: 24/);
    });
  });
});
