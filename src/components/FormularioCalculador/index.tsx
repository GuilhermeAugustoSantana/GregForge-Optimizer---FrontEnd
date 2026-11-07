import React, { useState } from "react";

interface FormularioProps {
  onCalcular: (dados: { metaLingotes: number, mineriosSelecionados: string[] }) => void
}

export const Formulario = ({ onCalcular }: FormularioProps) => {
  const [meta, setMeta] = useState('');

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    onCalcular({
      metaLingotes: Number(meta),
      mineriosSelecionados: []
    });
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="meta">Quantidade de Lingotes</label>
      <input id="meta" type="number" value={meta} onChange={(e) => { setMeta(e.target.value) }} />
      <button type="submit">Calcular proporção</button>
    </form>
  );
};