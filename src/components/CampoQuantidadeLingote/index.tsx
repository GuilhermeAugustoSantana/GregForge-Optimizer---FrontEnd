
interface CampoQuantidadeLingotProps {
  meta: string,
  setMeta: (value: string) => void;
}


export const CampoQuantidadeLingote = ({ meta, setMeta }: CampoQuantidadeLingotProps) => {
  return (
    <section className="flex flex-col gap-2 w-full">
      <label htmlFor="meta" className="text-xs font-semibold uppercase tracking-wider text-zinc-800">Quantidade de Lingotes</label>
      <input id="meta" type="number" value={meta} onChange={(e) => { setMeta(e.target.value) }} placeholder="Ex: 100" className="w-full bg-zinc-950 border border-zinc-800 text-zinc-100 rounded-lg p-3 font-mono text-sm focus:border-oreange-500 focus:ring-orange-500 focus:outline-none transition-all placeholder:text-zinc-400 disabled:opacity-50" />
    </section>
  )
}



