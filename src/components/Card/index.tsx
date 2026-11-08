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
    <label htmlFor={id}>
      <input
        type="checkbox"
        id={id}
        checked={estaSelecionado}
        disabled={carregando}
        onChange={() => aoAlternar({ id, nome, mb })}
      />
      <span>{nome}: {mb} mb</span>
    </label>
  );
};