import { Formulario, PainelResultado, StatusCalculo } from "./components";
import { useCalculador } from "./hooks/useCalculador";

export function App() {
  const { resultado, carregando, erro, calcularProporcao } = useCalculador();
  return (
    <main>
      <h1>⛏️ TerraFirmaGreg Metallurgical Optimizer</h1>

      <Formulario onCalcular={calcularProporcao} />

      <StatusCalculo carregando={carregando} erro={erro} />

      <PainelResultado resultado={resultado} />
    </main>
  );
}

export default App;
