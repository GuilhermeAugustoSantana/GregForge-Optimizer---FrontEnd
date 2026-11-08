
interface CampoPesquisaProps {
  setMinerioPesquisado: (minerio: string) => void,
  minerioPesquisado: string,
  carregando: boolean
}

export const CampoPesquisa = ({ setMinerioPesquisado, minerioPesquisado, carregando }: CampoPesquisaProps) => {
  return (
    <section>
      <label htmlFor="pesquisa">Informe o minerio para pesquisar</label>
      <input type="text" id="pesquisa" disabled={carregando} value={minerioPesquisado} onChange={(e) => setMinerioPesquisado(e.target.value)} />
    </section>
  );
}