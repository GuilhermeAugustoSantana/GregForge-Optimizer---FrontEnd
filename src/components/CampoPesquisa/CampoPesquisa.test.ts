import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { createElement } from "react";
import { CampoPesquisa } from "../CampoPesquisa";

describe("Testando componente campoPesquisa", () => {
  it("Deve preencher a pesquisa de minério ", () => {
    const setMinerioPesquisaMock = vi.fn();
    render(
      createElement(CampoPesquisa, {
        setMinerioPesquisado: setMinerioPesquisaMock,
        minerioPesquisado: "",
        carregando: false,
      }),
    );

    const inputPesquisa = screen.getByLabelText(
      /Informe o minerio para pesquisar/i,
    );

    fireEvent.change(inputPesquisa, { target: { value: "copper" } });

    expect(setMinerioPesquisaMock).toHaveBeenCalledTimes(1);
    expect(setMinerioPesquisaMock).toHaveBeenCalledWith("copper");
  });
});
