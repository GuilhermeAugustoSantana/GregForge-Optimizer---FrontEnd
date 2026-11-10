import React, { useState } from "react";
import type { CalcularRequest, MinerioItem } from "../../types/calcular";
import { Card } from "../Card";
import { CampoPesquisa } from "../CampoPesquisa";
import { CampoQuantidadeLingote } from "../CampoQuantidadeLingote";


interface FormularioProps {
  onCalcular: (dados: CalcularRequest) => void,
  listaMinerios: MinerioItem[] | null,
  carregando: boolean,
  setMinerioPesquisado: (minerio: string) => void,
  minerioPesquisado: string
}

export const Formulario = ({ onCalcular, listaMinerios = [], carregando, setMinerioPesquisado, minerioPesquisado }: FormularioProps) => {
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
    <section className="min-h-screen w-full flex flex-col items-center justify-start bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 mb-6 backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full items-end">
          <CampoQuantidadeLingote meta={meta} setMeta={setMeta} />
          <CampoPesquisa setMinerioPesquisado={setMinerioPesquisado} minerioPesquisado={minerioPesquisado} carregando={carregando} />
        </section>
        {listaMinerios && listaMinerios.length > 0 ?
          (<ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-0 list-none my-6">
            {listaMinerios.map(({ id, nome, mb }) => (
              <li key={id}>
                <Card minerio={{ id, nome, mb }} carregando={carregando} estaSelecionado={mineriosSelecionados.some((item) => item.id === id)} aoAlternar={() => alternarMinerioNaLista({ id, nome, mb })} />
              </li>
            ))}
          </ul>
          ) : (
            <p className="text-center py-8 text-zinc-100 text-sm font-medium w-full my-6 bg-zinc-950/30 rounded-lg border-dashed border-zinc-800">
              🔍 Nenhum minério correspondente foi encontrado.
            </p>
          )
        }
        <button type="submit" disabled={carregando} className="w-full sm:w-auto bg-orange hover:bg-orange-500 active:bg-orange-700 text-white font-semibold text-sm px-6 py-3 rounded-lg transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-orange-950/20 uppercase tracking-wide">{carregando ? "Calculando proporções..." : "Calcular proporção"}</button>
      </form>
    </section>
  );
};