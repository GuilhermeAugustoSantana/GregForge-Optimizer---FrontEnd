import { Formulario, PainelResultado, StatusCalculo } from "./components";
import { useCalculador } from "./hooks/useCalculador";

export function App() {
  const { resultado, carregando, erro, calcularProporcao, listaMinerios, setMinerioPesquisado, minerioPesquisado } = useCalculador();
  return (
    <main className="min-h-screen w-full bg-zinc-950 text-zinc-100 py-8 px-4 sm:px-6 flex flex-col items-center">
      <div className="w-full max-w-6x1 flex flex-col gap-6">
        <header className="flex flex-col sm:flex-row sm:items-center jutify-between gap-2 border-b borde-zinc-800 pb-5">
          <div className="flex items-center gap-3">
            <span className="bg-zinc-900 border border-orange-500/40 p-2.5 rounded-lg text-2x1 shadow-inner">⛏️</span>
            <div>
              <h1 className="text-x1 sm:text-2x1 font-extrabold tracking-wider text-zinc-100 uppercase"> TerraFirma<span className="text-orange-500">Greg</span></h1>
              <p>Metallurgical Optimizer</p>
            </div>
          </div>
        </header>
      </div>


      <Formulario onCalcular={calcularProporcao} listaMinerios={listaMinerios} carregando={carregando} setMinerioPesquisado={setMinerioPesquisado} minerioPesquisado={minerioPesquisado} />

      <StatusCalculo carregando={carregando} erro={erro} />

      <PainelResultado resultado={resultado} />
    </main>
  );
}

export default App;
