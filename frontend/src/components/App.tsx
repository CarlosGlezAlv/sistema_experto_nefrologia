import { useState, useEffect } from 'react';
import prologSource from '../prolog/nefrologia.pl?raw';
import Header from './Header';
import Welcome from './Welcome';
import QuestionCard from './QuestionCard';
import ResultsCard from './ResultsCard';
import KnowledgeBase from './KnowledgeBase';

type Answer = 'si' | 'no' | 'no_se';
type ViewType = 'welcome' | 'asking' | 'results' | 'kb';

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

export default function App() {
  const [view, setView] = useState<ViewType>('welcome');
  const [questions, setQuestions] = useState<QuestionDef[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar preguntas al iniciar
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        // Aquí iría la lógica para cargar preguntas con Tau-Prolog
        // Por ahora, creamos preguntas de ejemplo
        const exampleQuestions: QuestionDef[] = [
          { id: 'dolor_flanco_agudo', texto: '¿Siente dolor intenso y repentino en el costado o espalda baja?' },
          { id: 'hematuria', texto: '¿Ha notado sangre o color rojizo en la orina?' },
          { id: 'nauseas', texto: '¿Ha tenido nauseas o vomito recientemente?' },
          { id: 'disuria', texto: '¿Siente ardor o dolor al momento de orinar?' },
          { id: 'urgencia_miccional', texto: '¿Tiene necesidad urgente y frecuente de orinar?' },
          { id: 'fiebre', texto: '¿Ha tenido fiebre o escalofrios en los ultimos dias?' },
          { id: 'edema', texto: '¿Tiene hinchazon en tobillos, piernas o parpados?' },
          { id: 'fatiga_extrema', texto: '¿Se siente extremadamente cansado sin razon aparente?' },
          { id: 'proteinuria', texto: '¿Su orina presenta consistencia espumosa?' },
        ];
        setQuestions(exampleQuestions);
      } catch (error) {
        console.error('Error loading questions:', error);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  const handleStart = () => {
    setView('asking');
    setCurrentIndex(0);
    setAnswers({});
  };

  const handleAnswer = async (value: Answer) => {
    const newAnswers = { ...answers, [questions[currentIndex].id]: value };
    setAnswers(newAnswers);

    if (currentIndex + 1 >= questions.length) {
      setLoading(true);
      // Aquí iría la lógica para ejecutar Prolog y obtener diagnósticos
      // Por ahora simulamos
      setTimeout(() => {
        setDiagnoses([
          {
            enfermedad: 'Cálculos Renales',
            coincidentes: 3,
            total: 3,
            tratamiento: 'Hidratación intensa y analgésicos.',
            descripcion: 'Depósitos sólidos de minerales en los riñones.',
            gravedad: 'moderada',
          },
        ]);
        setView('results');
        setLoading(false);
      }, 1500);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleRestart = () => {
    setView('welcome');
    setCurrentIndex(0);
    setAnswers({});
    setDiagnoses([]);
  };

  if (loading && view === 'welcome') {
    return (
      <div className="app">
        <Header view={view} onNavClick={setView} />
        <div className="card loading">
          <div className="spinner"></div>
          <p>Cargando motor Prolog...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Header view={view} onNavClick={setView} />
      {view === 'welcome' && <Welcome onStart={handleStart} />}
      {view === 'asking' && (
        <QuestionCard
          question={questions[currentIndex]}
          currentIndex={currentIndex}
          totalQuestions={questions.length}
          onAnswer={handleAnswer}
          loading={loading}
        />
      )}
      {view === 'results' && (
        <ResultsCard
          diagnoses={diagnoses}
          answers={answers}
          questions={questions}
          onRestart={handleRestart}
          onViewKB={() => setView('kb')}
        />
      )}
      {view === 'kb' && <KnowledgeBase prologSource={prologSource} />}
    </div>
  );
}
