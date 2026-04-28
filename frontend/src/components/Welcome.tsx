interface WelcomeProps {
  onStart: () => void;
}

export default function Welcome({ onStart }: WelcomeProps) {
  return (
    <div className="card welcome">
      <h2>Comencemos su evaluación</h2>
      <p>Le haré una serie de preguntas sobre síntomas relacionados con la salud renal.</p>
      <p className="disclaimer">
        ⚠️ Esta herramienta es educativa. Consulte siempre a un especialista.
      </p>
      <button className="btn-primary" onClick={onStart}>
        Iniciar consulta
      </button>
    </div>
  );
}
