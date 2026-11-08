import React, { useState } from "react";
import type { CalcularRequest, MinerioItem } from "../../types/calcular";
import { Card } from "../Card";

interface FormularioProps {
  onCalcular: (dados: CalcularRequest) => void,
  listaMinerios: MinerioItem[] | null,
  carregando: boolean,
}

export const Formulario = ({ onCalcular, listaMinerios = [], carregando }: FormularioProps) => {
  const [meta, setMeta] = useState('');
  const [mineriosSelecionados, setMineriosSelecionados] = useState<MinerioItem[]>([]);
  const alternarMinerioNaLista = (minerio: MinerioItem) => {
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
              <Card minerio={{ id, nome, mb }} carregando={carregando} estaSelecionado={mineriosSelecionados.some((item) => item.id === id)} aoAlternar={() => alternarMinerioNaLista({ id, nome, mb })} />
            </li>
          ))}
        </ul>
        <button type="submit" disabled={carregando}>{carregando ? "Calculando proporções..." : "Calcular proporção"}</button>
      </form>
    </section>
  );
};