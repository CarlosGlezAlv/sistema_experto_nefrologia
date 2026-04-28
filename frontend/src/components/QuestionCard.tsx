interface QuestionDef {
  id: string;
  texto: string;
}

interface QuestionCardProps {
  question: QuestionDef;
  currentIndex: number;
  totalQuestions: number;
  onAnswer: (value: 'si' | 'no' | 'no_se') => void;
  loading: boolean;
}

export default function QuestionCard({
  question,
  currentIndex,
  totalQuestions,
  onAnswer,
  loading,
}: QuestionCardProps) {
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="card">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
      <p className="progress-text">
        Pregunta {currentIndex + 1} de {totalQuestions}
      </p>
      <h2 className="question">{question.texto}</h2>
      <div className="answers">
        <button
          className="answer-btn yes"
          onClick={() => onAnswer('si')}
          disabled={loading}
        >
          Sí
        </button>
        <button
          className="answer-btn no"
          onClick={() => onAnswer('no')}
          disabled={loading}
        >
          No
        </button>
        <button
          className="answer-btn unknown"
          onClick={() => onAnswer('no_se')}
          disabled={loading}
        >
          No sé
        </button>
      </div>
    </div>
  );
}
