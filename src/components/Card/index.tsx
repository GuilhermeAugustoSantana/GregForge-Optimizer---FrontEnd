import type { MinerioItem } from "../../types/calcular";

interface CardProps {
  minerio: MinerioItem;
  carregando: boolean;
  estaSelecionado: boolean;
  aoAlternar: (minerio: MinerioItem) => void;
}

export const Card = ({
  minerio: { id, nome, mb },
  carregando,
  estaSelecionado,
  aoAlternar,
}: CardProps) => {
  return (
    <label className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 select-none ${estaSelecionado ? "bg-emerald-950/40 border-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.15]" : "bg-zinc-900 border-zinc-800 hover:border-orange-500 hover:bg-zinc-800"}`} htmlFor={id}>
      <input
        className="w-4 h-4 accent-emerald-500 cursor-pointer"
        type="checkbox"
        id={id}
        checked={estaSelecionado}
        disabled={carregando}
        onChange={() => aoAlternar({ id, nome, mb })}
      />
      <div className="flex flex-col">
        <span className="font-semibold text-sm text-zinc-100">{nome} </span>
        <span className={`text-xs font-mono transition-colors duration-200 ${estaSelecionado ? "text-emerald-200/90 font-medium" : "text-zinc-400"}`}>{mb} mb</span>
      </div>

    </label>
  );
};