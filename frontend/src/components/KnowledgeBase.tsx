interface KnowledgeBaseProps {
  prologSource: string;
}

export default function KnowledgeBase({ prologSource }: KnowledgeBaseProps) {
  const escapeHtml = (s: string) => {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  };

  return (
    <div className="card">
      <h2>Base de Conocimiento (Prolog)</h2>
      <p>Edite <code>nefrologia.pl</code> para agregar enfermedades, síntomas y tratamientos.</p>
      <pre className="code-block">
        <code>{escapeHtml(prologSource)}</code>
      </pre>
    </div>
  );
}
