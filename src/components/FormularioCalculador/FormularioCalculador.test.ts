import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { createElement } from "react";
import { Formulario } from "../FormularioCalculador";

describe("testando o FormularioCalculador", () => {
  it("Deve preencher a meta de lingotes e disparar a função de cálculo ao clicar no botão", async () => {
    const mockSubmit = vi.fn();

    render(createElement(Formulario, { onCalcular: mockSubmit }));

    const inputsMeta = screen.getByLabelText(/Quantidade de Lingotes/i);

    fireEvent.change(inputsMeta, { target: { value: "6" } });

    const botaoCalcular = screen.getByRole("button", {
      name: /Calcular proporção/i,
    });

    fireEvent.click(botaoCalcular);

    expect(mockSubmit).toHaveBeenCalledTimes(1);

    expect(mockSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        metaLingotes: 6,
        mineriosSelecionados: []
      }),
    );
  });
});
