interface Diagnosis {
  enfermedad: string;
  coincidentes: number;
  total: number;
  tratamiento: string;
  descripcion: string;
  gravedad: string;
}

interface QuestionDef {
  id: string;
  texto: string;
}

interface ResultsCardProps {
  diagnoses: Diagnosis[];
  answers: Record<string, string>;
  questions: QuestionDef[];
  onRestart: () => void;
  onViewKB: () => void;
}

export default function ResultsCard({
  diagnoses,
  answers,
  questions,
  onRestart,
  onViewKB,
}: ResultsCardProps) {
  const yesSymptoms = Object.entries(answers)
    .filter(([, v]) => v === 'si')
    .map(([k]) => {
      const q = questions.find((q) => q.id === k);
      return q?.id || k;
    });

  const prettyName = (id: string) => id.replace(/_/g, ' ');

  return (
    <div className="card results">
      <h2>Resultados de la evaluación</h2>

      {diagnoses.length === 0 ? (
        <div className="no-result">
          <p>
            <strong>No se identificaron diagnósticos compatibles</strong>
          </p>
        </div>
      ) : (
        <div className="diagnoses">
          {diagnoses.map((d) => {
            const confidence = Math.round((d.coincidentes / d.total) * 100);
            return (
              <div key={d.enfermedad} className="diagnosis">
                <div className="diagnosis-title">
                  <span className="diagnosis-name">{prettyName(d.enfermedad)}</span>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span className={`severity ${d.gravedad}`}>{d.gravedad}</span>
                    <span className="confidence">
                      {confidence}% ({d.coincidentes}/{d.total})
                    </span>
                  </div>
                </div>
                {d.descripcion && (
                  <div className="diagnosis-section">
                    <strong>Descripción</strong>
                    <p>{d.descripcion}</p>
                  </div>
                )}
                {d.tratamiento && (
                  <div className="diagnosis-section">
                    <strong>Tratamiento sugerido</strong>
                    <p>{d.tratamiento}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {yesSymptoms.length > 0 && (
        <div className="symptoms-summary">
          <h3>Síntomas confirmados</h3>
          <div className="symptom-tags">
            {yesSymptoms.map((s) => (
              <span key={s} className="symptom-tag">
                {prettyName(s)}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="disclaimer">⚠️ Esta herramienta es educativa. Consulte siempre a un nefrólogo.</div>

      <div className="actions">
        <button className="btn-primary" onClick={onRestart}>
          Nueva consulta
        </button>
        <button className="btn-secondary" onClick={onViewKB}>
          Ver base de conocimiento
        </button>
      </div>
    </div>
  );
}
