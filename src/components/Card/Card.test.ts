import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { createElement } from "react";
import { Card } from "../Card";
import type { MinerioItem } from "../../types/calcular";

describe("Testando o componente Card", () => {
  const DadosMinerios: MinerioItem = {
    id: "copper_native_copper_dust_tiny",
    nome: "Tiny pile of copper",
    mb: 16,
  };

  it("Card deve contem as informações dos minérios", () => {
    render(
      createElement(Card, {
        minerio: { ...DadosMinerios },
        carregando: false,
        estaSelecionado: false,
        aoAlternar: vi.fn(),
      }),
    );

    expect(screen.getByText(/Tiny pile of copper/i)).not.toBeNull();
    expect(screen.getByText(/16/i)).not.toBeNull();

    const checkbox = screen.getByRole("checkbox");

    expect((checkbox as HTMLInputElement).checked).toBe(false);
    expect((checkbox as HTMLInputElement).disabled).toBe(false);
  });

  it("Deve disparar a função aoAlternar quando o card for clicado", () => {
    const aoAlternar = vi.fn();

    render(
      createElement(Card, {
        minerio: { ...DadosMinerios },
        carregando: false,
        estaSelecionado: false,
        aoAlternar,
      }),
    );

    fireEvent.click(screen.getByRole("checkbox"));

    expect(aoAlternar).toHaveBeenCalledTimes(1);
  });

  it("Deve desabilitar o checkbox quando estiver carregando", () => {
    render(
      createElement(Card, {
        minerio: { ...DadosMinerios },
        carregando: true,
        estaSelecionado: false,
        aoAlternar: vi.fn(),
      }),
    );

    const checkbox = screen.getByRole("checkbox");

    expect((checkbox as HTMLInputElement).disabled).toBe(true);
  });
});
