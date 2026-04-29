interface HeaderProps {
  view: string;
  onNavClick: (view: string) => void;
}

export default function Header({ view, onNavClick }: HeaderProps) {
  return (
    <header className="header">
      <div className="brand">
        <div className="brand-icon">⚕</div>
        <div className="brand-text">
          <h1>Nefroexperto</h1>
          <p>Sistema Experto de Nefrología</p>
        </div>
      </div>
      <nav className="tabs">
        <button
          className={`tab ${view === 'welcome' ? 'active' : ''}`}
          onClick={() => onNavClick('welcome')}
        >
          Inicio
        </button>
      </nav>
    </header>
  );
}
