
interface CampoPesquisaProps {
  setMinerioPesquisado: (minerio: string) => void,
  minerioPesquisado: string,
  carregando: boolean
}

export const CampoPesquisa = ({ setMinerioPesquisado, minerioPesquisado, carregando }: CampoPesquisaProps) => {
  return (
    <section className="flex flex-col gap-2 w-full ">
      <label htmlFor="pesquisa" className="text-xs font-semibold uppercase tracking-wider text-zinc-800">Informe o minerio para pesquisar</label>
      <input type="text" id="pesquisa" disabled={carregando} value={minerioPesquisado} onChange={(e) => setMinerioPesquisado(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 text-zinc-100 rounded-lg p-3 font-mono text-sm focus:border-oreange-500 focus:ring-orange-500 focus:outline-none transition-all placeholder:text-zinc-400 disabled:opacity-50" />
    </section>
  );
}