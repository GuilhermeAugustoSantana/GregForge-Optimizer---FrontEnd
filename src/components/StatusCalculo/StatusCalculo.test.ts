import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { createElement } from "react";
import { StatusCalculo } from "../StatusCalculo";

describe("Testando o componente StausCalculo", () => {
  it("Deve exibir mensagem de carregamento quando estiver calculando as proporções de minérios", () => {
    render(createElement(StatusCalculo, { carregando: true, erro: null }));

    expect(
      screen.queryByText(/Calculando proporções ideal no cadinho.../i),
    ).not.toBeNull();
  });

  it("Deve exibir a mensagem de erro quando houver uma falha", () => {
    render(
      createElement(StatusCalculo, {
        carregando: false,
        erro: "Erro ao conectar com a API metalúrgica",
      }),
    );

    expect(screen.queryByText(/Erro ao conectar/i)).not.toBeNull();
  });

  it("Deve ficar invisível se não estiver carregando e sem erro", () => {
    render(createElement(StatusCalculo, {carregando: false, erro: null}));

    expect(screen.queryByText(/Calculando/i)).toBeNull();
    expect(screen.queryByText(/Erro/i)).toBeNull();
  })
});
