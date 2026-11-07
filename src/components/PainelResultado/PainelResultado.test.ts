import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { createElement } from "react";
import { PainelResultado } from "../PainelResultado";

describe("Testando o componente PainelResultado", () => {
  it("Componente deve estar escondido se não ouver resultado", () => {
    render(createElement(PainelResultado, { resultado: null }));
    expect(screen.queryByText(/Desperdício no Cadinho/i)).toBeNull();
  });

  it("Componente deve exibir desperdício em mB e a lista com as quantidade de minérios necessários", () => {
    const mockResultado = {
      metaLingotes: 6,
      desperdicio_mb: 1,
      "minérios necessários": { "Native copper": 1, Malachite: 24 },
    };

    render(createElement(PainelResultado, { resultado: mockResultado }));

    expect(screen.getByText(/Desperdício mB: 1 mB/i)).not.toBeNull();
    expect(screen.getByText(/Native copper: 1/i)).not.toBeNull();
    expect(screen.getByText(/Malachite: 24/i)).not.toBeNull();
  });
});
