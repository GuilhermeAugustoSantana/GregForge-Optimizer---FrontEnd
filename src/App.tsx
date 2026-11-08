import { Formulario, PainelResultado, StatusCalculo } from "./components";
import { useCalculador } from "./hooks/useCalculador";

export function App() {
  const { resultado, carregando, erro, calcularProporcao, listaMinerios, setMinerioPesquisado, minerioPesquisado } = useCalculador();
  return (
    <main>
      <h1>⛏️ TerraFirmaGreg Metallurgical Optimizer</h1>

      <Formulario onCalcular={calcularProporcao} listaMinerios={listaMinerios} carregando={carregando} setMinerioPesquisado={setMinerioPesquisado} minerioPesquisado={minerioPesquisado} />

      <StatusCalculo carregando={carregando} erro={erro} />

      <PainelResultado resultado={resultado} />
    </main>
  );
}

export default App;
