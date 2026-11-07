interface PainelResultadoProps {
  resultado: {
    metaLingote: number,
    desperdício_mb: number,
    "minérios necessários": Record<string, number>
  } | null
}

export const PainelResultado = ({ resultado }: PainelResultadoProps) => {
  if (!resultado) return null;

  const metaLingote = resultado?.metaLingote;
  const desperdício_mb = resultado?.desperdício_mb
  const mineraisNecessarios = resultado?.["minérios necessários"];

  return (
    <section>
      <p>Meta Lingote: {metaLingote}</p>
      <p>Desperdício mB: {desperdício_mb} mB</p>
      <ul>
        {Object.entries(mineraisNecessarios).map(([minerio, quantidade]) => (
          <li key={minerio}>{minerio}: {quantidade}</li>
        ))}
      </ul>
    </section>
  );
}