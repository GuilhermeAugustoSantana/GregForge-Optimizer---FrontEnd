interface StatusCalculoProps {
  carregando: boolean;
  erro: string | null;
}

export const StatusCalculo = ({ carregando, erro }: StatusCalculoProps) => {

  if (carregando) {
    return (
      <section>
        <p>Calculando proporções ideal no cadinho...</p>
      </section>
    );
  }

  if (erro) {
    return (
      <section>
        <p>Erro ao conectar</p>
      </section>
    );
  }

  return null;
};