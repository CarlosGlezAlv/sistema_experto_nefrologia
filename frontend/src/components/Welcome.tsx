interface WelcomeProps {
  onStart: () => void;
}

export default function Welcome({ onStart }: WelcomeProps) {
  return (
    <div className="card welcome">
      <h2>Evaluación de Salud Renal</h2>
      <p>Responda una serie de preguntas sobre sus síntomas para obtener una evaluación preliminar.</p>
      <p style={{ fontSize: '0.95rem', color: 'var(--muted)' }}>
        Esta herramienta utiliza un sistema experto basado en conocimiento médico especializado.
      </p>
      <div className="disclaimer" style={{ marginBottom: '24px' }}>
        ⚠️ Herramienta educativa. Consulte siempre a un especialista en nefrología para diagnóstico definitivo.
      </div>
      <button className="btn-primary" onClick={onStart}>
        Comenzar Evaluación
      </button>
    </div>
  );
}
