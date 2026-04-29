interface HeaderProps {
  view: string;
  onNavClick: (view: string) => void;
}

export default function Header({ view, onNavClick }: HeaderProps) {
  return (
    <header className="header">
      <div className="brand">
        <div className="brand-icon">N</div>
        <div className="brand-text">
          <h1>Sistema Experto de Nefrología</h1>
          <p>Diagnóstico asistido basado en Prolog</p>
        </div>
      </div>
      <nav className="tabs">
        <button
          className={`tab active`}
          onClick={() => onNavClick('welcome')}
        >
          Consulta
        </button>
      </nav>
    </header>
  );
}
