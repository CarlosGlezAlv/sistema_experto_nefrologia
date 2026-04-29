interface KnowledgeBaseProps {
  prologSource: string;
}

export default function KnowledgeBase({ prologSource }: KnowledgeBaseProps) {
  const escapeHtml = (s: string) => {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  };

  return (
    <div className="card">
      <h2>Base de Conocimiento</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
        Sistema de reglas Prolog que contiene la lógica de diagnóstico. 
        Modifique <code style={{ background: 'var(--border-light)', padding: '4px 8px', borderRadius: '4px' }}>nefrologia.pl</code> para actualizar enfermedades, síntomas y criterios de diagnóstico.
      </p>
      <pre className="code-block">
        <code>{escapeHtml(prologSource)}</code>
      </pre>
    </div>
  );
}
