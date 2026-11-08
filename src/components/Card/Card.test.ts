import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { createElement } from "react";
import { Card } from "../Card";
import type { MineriosItem } from "../../types/calcular";

describe("Testando o componente Card", () => {
  it("Card deve contem as informações dos minérios", () => {
    const DadosMinerios: MineriosItem = {
      id: "copper_native_copper_dust_tiny",
      nome: "Tiny pile of copper",
      mb: 16,
    };

    const PropCard = {
      minerio: { ...DadosMinerios },
      carregando: false,
      estaSelecionado: false,
      aoAlternar: vi.fn(),
    };

    render(createElement(Card, { ...PropCard }));

    expect(screen.getByText(/Tiny pile of copper/i)).not.toBeNull();
    expect(screen.getByText(/16/i)).not.toBeNull();
  });
});
