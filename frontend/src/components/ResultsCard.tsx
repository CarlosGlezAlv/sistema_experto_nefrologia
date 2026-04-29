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
  // Base de datos de síntomas por enfermedad
  const enfermedad_sintomas: Record<string, string[]> = {
    calculos_renales: ['dolor_flanco_agudo', 'hematuria', 'nauseas'],
    infeccion_urinaria: ['disuria', 'urgencia_miccional', 'orina_turbia'],
    pielonefritis: ['fiebre', 'dolor_flanco_agudo', 'disuria', 'nauseas'],
    insuficiencia_renal_cronica: ['edema', 'fatiga_extrema', 'proteinuria', 'picazon_piel', 'perdida_apetito', 'calambres_musculares'],
    insuficiencia_renal_aguda: ['disminucion_orina', 'edema', 'fatiga_extrema', 'nauseas'],
    sindrome_nefrotico: ['edema', 'proteinuria', 'fatiga_extrema'],
    glomerulonefritis: ['hematuria', 'edema', 'hipertension', 'orina_oscura'],
    cistitis: ['disuria', 'urgencia_miccional', 'dolor_suprapubico'],
    enfermedad_poliquistica: ['dolor_lumbar_bilateral', 'hipertension', 'hematuria'],
  };

  const getMatchedSymptoms = (enfermedad: string): string[] => {
    const enfermedadKey = enfermedad.toLowerCase().replace(/ /g, '_');
    const sintomas = enfermedad_sintomas[enfermedadKey] || [];
    const respuestasPositivas = Object.entries(answers)
      .filter(([, v]) => v === 'si')
      .map(([k]) => k);
    
    return sintomas.filter(s => respuestasPositivas.includes(s));
  };

  const yesSymptoms = Object.entries(answers)
    .filter(([, v]) => v === 'si')
    .map(([k]) => {
      const q = questions.find((q) => q.id === k);
      return { id: k, text: q?.texto || k };
    });

  const prettyName = (id: string) => {
    return id
      .toLowerCase()
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getConfidenceColor = (percentage: number): string => {
    if (percentage >= 80) return 'success';
    if (percentage >= 60) return 'moderada';
    if (percentage >= 40) return 'leve';
    return 'text';
  };

  const getConfidenceLabel = (percentage: number): string => {
    if (percentage >= 80) return 'MUY PROBABLE';
    if (percentage >= 60) return 'PROBABLE';
    if (percentage >= 40) return 'POSIBLE';
    return 'BAJO RIESGO';
  };

  return (
    <div className="card results">
      <h2>Resultados de la Evaluación</h2>

      {diagnoses.length === 0 ? (
        <div className="no-result">
          <p>
            <strong>✓ No se identificaron patologías asociadas</strong>
          </p>
          <p style={{ marginTop: '8px', fontSize: '0.9rem' }}>
            Sus síntomas no coinciden con los patrones de enfermedades renales comunes.
          </p>
        </div>
      ) : (
        <div className="diagnoses">
          {diagnoses.map((d, index) => {
            const confidence = Math.round((d.coincidentes / d.total) * 100);
            const confColor = getConfidenceColor(confidence);
            const confLabel = getConfidenceLabel(confidence);
            
            return (
              <div key={d.enfermedad} className="diagnosis" style={{ borderLeft: `4px solid var(--${confColor === 'text' ? 'border' : confColor})` }}>
                <div className="diagnosis-title">
                  <div style={{ flex: 1 }}>
                    <span className="diagnosis-name" style={{ fontSize: '1.15rem' }}>
                      {index + 1}. {prettyName(d.enfermedad.toLowerCase())}
                    </span>
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: 'var(--muted)' }}>
                      ID: {d.enfermedad.toLowerCase()}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                    <span className={`severity ${d.gravedad.toLowerCase()}`}>{d.gravedad}</span>
                    <div style={{ 
                      padding: '8px 14px', 
                      borderRadius: '8px', 
                      background: 'var(--border-light)',
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      textAlign: 'center'
                    }}>
                      <div style={{ color: 'var(--muted)', fontSize: '0.75rem', marginBottom: '2px' }}>
                        CONFIANZA
                      </div>
                      <div style={{ color: confColor === 'text' ? 'var(--text)' : `var(--${confColor})`, fontSize: '1rem' }}>
                        {confidence}%
                      </div>
                    </div>
                  </div>
                </div>
                
                <div style={{ marginTop: '12px', padding: '12px', background: 'var(--border-light)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
                    Estado de Coincidencia
                  </div>
                  <div style={{ fontSize: '0.95rem', color: 'var(--text)', fontWeight: '500' }}>
                    {d.coincidentes} de {d.total} síntomas coinciden
                  </div>
                </div>
                
                {getMatchedSymptoms(d.enfermedad.toLowerCase()).length > 0 && (
                  <div style={{ marginTop: '12px', padding: '12px', background: 'rgba(34, 197, 94, 0.05)', borderLeft: '3px solid var(--success)', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--success)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                      ✓ Síntomas que Coinciden
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {getMatchedSymptoms(d.enfermedad.toLowerCase()).map(s => (
                        <span key={s} style={{
                          display: 'inline-block',
                          background: 'var(--success)',
                          color: 'white',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: '600'
                        }}>
                          {prettyName(s)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {d.descripcion && (
                  <div className="diagnosis-section">
                    <strong>📋 Descripción</strong>
                    <p>{d.descripcion}</p>
                  </div>
                )}
                {d.tratamiento && (
                  <div className="diagnosis-section">
                    <strong>💊 Recomendaciones Médicas</strong>
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
          <h3>✓ Síntomas Confirmados ({yesSymptoms.length})</h3>
          <div className="symptom-tags" style={{ marginTop: '12px' }}>
            {yesSymptoms.map((s) => (
              <div key={s.id} style={{ 
                display: 'inline-block',
                background: 'var(--success)',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: '600',
                marginBottom: '8px',
                marginRight: '8px'
              }}>
                {prettyName(s.id)}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="disclaimer">
        ⚠️ Herramienta educativa. Este análisis no constituye un diagnóstico médico. 
        Consulte con un especialista en nefrología para una evaluación completa.
      </div>

      <div className="actions">
        <button className="btn-primary" onClick={onRestart}>
          Nueva Evaluación
        </button>
      </div>
    </div>
  );
}
