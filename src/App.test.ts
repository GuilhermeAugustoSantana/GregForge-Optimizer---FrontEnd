import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { createElement } from "react";
import { App } from "./App";

describe("Testando a Integração Completa no App.tsx", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("Deve preencher a meta, clicar em calcular e exibir o relatório final na tela", async () => {
    const RespostaDadosApi = {
      metaLingotes: 6,
      desperdicio_mb: 1,
      "minérios necessários": {
        "Native copper": 1,
        Malachite: 24,
      },
    };

    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => RespostaDadosApi,
    } as Response);

    render(createElement(App));

    const inputsMeta = screen.getByLabelText(/Quantidade de lingotes/i);

    fireEvent.change(inputsMeta, { target: { value: "6" } });

    const botaoCalcular = screen.getByRole("button", {
      name: /Calcular Proporção/i,
    });

    fireEvent.click(botaoCalcular);

    await waitFor(() => {
      expect(screen.queryByText(/Meta Lingote: 6/i)).not.toBeNull();
      expect(screen.queryByText(/Desperdício mB: 1 mB/i)).not.toBeNull();
      expect(screen.queryByText(/Native copper: 1/i)).not.toBeNull();
      expect(screen.queryByText(/Malachite: 24/i)).not.toBeNull();
    });
  });
});
