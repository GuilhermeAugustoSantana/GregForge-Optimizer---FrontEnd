import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { createElement } from "react";
import { CampoQuantidadeLingote } from ".";

describe("Testando o componente CampoQuantidadeLingote", () => {
  it("Deve preencher a quantidade de lingotes ", () => {
    const setMetaLingote = vi.fn();
    render(
      createElement(CampoQuantidadeLingote, {
        setMeta: setMetaLingote,
        meta: "",
      }),
    );

    const inputMeta = screen.getByLabelText(/Quantidade de Lingotes/i);

    fireEvent.change(inputMeta, { target: { value: "1" } });

    expect(setMetaLingote).toHaveBeenCalledTimes(1);
    expect(setMetaLingote).toHaveBeenCalledWith("1");
  });
});
