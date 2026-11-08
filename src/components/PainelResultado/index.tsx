import type { CalcularResponse } from "../../types/calcular";

interface PainelResultadoProps {
  resultado: CalcularResponse | null;
}

export const PainelResultado = ({ resultado }: PainelResultadoProps) => {
  

  if (!resultado) return null;

  const metaLingote = resultado.metaLingotes;
  const desperdício_mb = resultado.desperdício_mb;
  const mineraisNecessarios = resultado["minérios necessários"];

  return (
    <section>
      <h3>📊 Relatório de Otimização</h3>
      <p>Meta Lingote: {metaLingote}</p>
      <p>Desperdício mB: {desperdício_mb} mB</p>
      <ul>
        {Object.entries(mineraisNecessarios).map(([minerio, quantidade]) => (
          <li key={minerio}>
            {minerio}: {quantidade}
          </li>
        ))}
      </ul>
    </section>
  );
};