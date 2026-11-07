import React, { useState } from "react";
import type { CalcularRequest, MineriosItem } from "../../types/calcular";

interface FormularioProps {
  onCalcular: (dados: CalcularRequest) => void,
  listaMinerios: MineriosItem[] | null,
  carregando: boolean,
}

export const Formulario = ({ onCalcular, listaMinerios = [], carregando }: FormularioProps) => {
  const [meta, setMeta] = useState('');
  const [mineriosSelecionados, setMineriosSelecionados] = useState<MineriosItem[]>([]);
  const alternarMinerioNaLista = (minerio: MineriosItem) => {
    if (mineriosSelecionados.some((item) => item.id === minerio.id)) {
      setMineriosSelecionados(mineriosSelecionados.filter((item) => item.id !== minerio.id))
    } else {
      setMineriosSelecionados([...mineriosSelecionados, minerio]);
    }
  }

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    onCalcular({
      metaLingotes: Number(meta),
      mineriosSelecionados: mineriosSelecionados,
    });
  }
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label htmlFor="meta">Quantidade de Lingotes</label>
        <input id="meta" type="number" value={meta} onChange={(e) => { setMeta(e.target.value) }} />
        <ul>
          {listaMinerios && listaMinerios.map(({ id, nome, mb }) => (
            <li key={id}>
              <input id={id} type="checkbox" disabled={carregando} checked={mineriosSelecionados.some((item) => item.id === id)} onChange={() => alternarMinerioNaLista({ id, nome, mb })} />
              <label htmlFor={id}>{nome}: {mb} mb</label>
            </li>
          ))}
        </ul>
        <button type="submit" disabled={carregando}>{carregando ? "Calculando proporções..." : "Calcular proporção"}</button>
      </form>
    </section>
  );
};