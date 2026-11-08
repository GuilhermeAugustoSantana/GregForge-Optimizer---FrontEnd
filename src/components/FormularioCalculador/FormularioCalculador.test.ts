import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { createElement } from "react";
import { Formulario } from "../FormularioCalculador";
import type { MinerioItem } from "../../types/calcular";

describe("testando o FormularioCalculador", () => {
  const mockSubmit = vi.fn();
  it("Deve preencher a meta de lingotes e disparar a função de cálculo ao clicar no botão", async () => {
    render(
      createElement(Formulario, {
        onCalcular: mockSubmit,
        listaMinerios: [],
        carregando: false,
      }),
    );

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
        mineriosSelecionados: [],
      }),
    );
  });

  it("Deve renderizar os checkboxes dinamicamente com base na lista de minérios fornecida", () => {
    const listaMinerio: MinerioItem[] = [
      {
        id: "copper_native_copper_dust_tiny",
        nome: "Tiny pile of copper",
        mb: 16,
      },
    ];

    render(
      createElement(Formulario, {
        onCalcular: mockSubmit,
        listaMinerios: listaMinerio,
        carregando: false,
      }),
    );

    const checkBoxCobre = screen.getByLabelText(/Tiny pile of copper/i);

    expect(checkBoxCobre).toBeTruthy();

    expect(checkBoxCobre).toHaveProperty("checked", false);
  });
});
