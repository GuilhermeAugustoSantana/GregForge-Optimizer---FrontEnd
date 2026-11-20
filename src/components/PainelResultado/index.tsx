import type { CalcularResponse } from "../../types/calcular";

interface PainelResultadoProps {
  resultado: CalcularResponse | null;
}

export const PainelResultado = ({ resultado }: PainelResultadoProps) => {


  if (!resultado) return null;

  const metaLingote = resultado.metaLingotes;
  const desperdício_mb = resultado.desperdicio_mb;
  const mineraisNecessarios = resultado["minérios necessários"];

  return (
    <section className="w-full bg-zinc-900/50 border border-zinc-800 rounded-x1 p-6 mb-6 backdrop-blur-sm animate-fade-in">
      <header className="flex items-center gap-2 border-b border-zinc-800 pb-4 mb-6">
        <span className="text-x1">📊</span>
        <h3 className="text-sm font-bold uppercase tracking-winder text-orange-500">Relatório da Proporção Metalúrgica</h3>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 w-full">
        <div className="bg-zinc-950 border border-zinc-800/80 p-4 rounded-lg flex flex-row items-baseline gap-2 w-full">
          <span className="text-xs uppercase tracking-wide text-zinc-400 font-semibold">
            Meta Lingote:
          </span>
          <span className="text-2x1 font-bold text-emerald-400 font-mono">
            {metaLingote} <span className="text-sm font-sans font-medium text-zinc-400">lingotes</span>
          </span>
        </div>
        <div className="bg-zinc-950 border border-zinc-800/80 p-4 rounded-lg flex flex-row items-baseline gap-2 w-full">
          <span className="text-xs uppercase tracking-wide text-zinc-400 font-semibold">
            Desperdício mB:
          </span>
          <span className="text-2x1 font-bold text-emerald-400 font-mono">
            {desperdício_mb} <span className="text-sm font-sans font-medium text-zinc-400">mB</span>
          </span>
        </div>
      </section>
      <ul className="bg-zinc-950 border border-zinc-800/80 p-4 rounded-lg flex flex-col gap-4">
        {Object.entries(mineraisNecessarios).map(([minerio, quantidade]) => (
          <li className="flex flex-row items-baseline gap-2 w-full" key={minerio}>
            <span className="text-xs uppercase tracking-wide text-zinc-400 font-semibold">
              {minerio}:
            </span>
            <span className="text-2x1 font-bold text-emerald-400 font-mono">
              {quantidade}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};