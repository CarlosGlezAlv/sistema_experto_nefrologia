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
        // Cargar TODAS las preguntas disponibles
        const allQuestions: QuestionDef[] = [
          { id: 'dolor_flanco_agudo', texto: '¿Siente dolor intenso y repentino en el costado o espalda baja?' },
          { id: 'hematuria', texto: '¿Ha notado sangre o color rojizo en la orina?' },
          { id: 'nauseas', texto: '¿Ha tenido nauseas o vomito recientemente?' },
          { id: 'disuria', texto: '¿Siente ardor o dolor al momento de orinar?' },
          { id: 'urgencia_miccional', texto: '¿Tiene necesidad urgente y frecuente de orinar?' },
          { id: 'fiebre', texto: '¿Ha tenido fiebre o escalofrios en los ultimos dias?' },
          { id: 'edema', texto: '¿Tiene hinchazon en tobillos, piernas o parpados?' },
          { id: 'fatiga_extrema', texto: '¿Se siente extremadamente cansado sin razon aparente?' },
          { id: 'proteinuria', texto: '¿Su orina presenta consistencia espumosa?' },
          { id: 'orina_turbia', texto: '¿Su orina se ve turbia o con mal olor?' },
          { id: 'dolor_lumbar_bilateral', texto: '¿Siente dolor sordo en ambos lados de la espalda baja?' },
          { id: 'hipertension', texto: '¿Tiene presion arterial alta diagnosticada?' },
          { id: 'diabetes', texto: '¿Tiene diabetes diagnosticada?' },
          { id: 'antecedente_calculos', texto: '¿Ha tenido calculos renales anteriormente?' },
          { id: 'perdida_apetito', texto: '¿Ha perdido el apetito en las ultimas semanas?' },
          { id: 'picazon_piel', texto: '¿Tiene picazon generalizada en la piel?' },
          { id: 'disminucion_orina', texto: '¿Ha disminuido notablemente la cantidad de orina que produce?' },
          { id: 'dolor_suprapubico', texto: '¿Siente dolor o presion en el bajo vientre?' },
          { id: 'orina_oscura', texto: '¿Su orina es de color oscuro (te o cola)?' },
          { id: 'calambres_musculares', texto: '¿Sufre calambres musculares frecuentes?' },
        ];
        setQuestions(allQuestions);
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

  // Base de datos de enfermedades y sus síntomas
  const enfermededades_sintomas: Record<string, { sintomas: string[]; gravedad: string; descripcion: string; tratamiento: string }> = {
    calculos_renales: {
      sintomas: ['dolor_flanco_agudo', 'hematuria', 'nauseas'],
      gravedad: 'moderada',
      descripcion: 'Depósitos sólidos de minerales en los riñones que obstruyen el flujo urinario.',
      tratamiento: 'Hidratación intensa (3L/día), AINEs, y según tamaño: litotricia o ureteroscopia.',
    },
    infeccion_urinaria: {
      sintomas: ['disuria', 'urgencia_miccional', 'orina_turbia'],
      gravedad: 'leve',
      descripcion: 'Infección bacteriana del tracto urinario bajo.',
      tratamiento: 'Antibióticos (nitrofurantoína o trimetoprim-sulfametoxazol) y aumento de líquidos.',
    },
    pielonefritis: {
      sintomas: ['fiebre', 'dolor_flanco_agudo', 'disuria', 'nauseas'],
      gravedad: 'grave',
      descripcion: 'Infección bacteriana del riñón. Requiere atención urgente.',
      tratamiento: 'Antibióticos amplio espectro (ciprofloxacino/ceftriaxona), hospitalización si hay sepsis.',
    },
    insuficiencia_renal_cronica: {
      sintomas: ['edema', 'fatiga_extrema', 'proteinuria', 'picazon_piel', 'perdida_apetito', 'calambres_musculares'],
      gravedad: 'grave',
      descripcion: 'Pérdida progresiva e irreversible de función renal. Enfermedad crónica.',
      tratamiento: 'Dieta baja en sodio/potasio/proteínas, control de presión y glucosa, posible diálisis.',
    },
    insuficiencia_renal_aguda: {
      sintomas: ['disminucion_orina', 'edema', 'fatiga_extrema', 'nauseas'],
      gravedad: 'grave',
      descripcion: 'Deterioro brusco de la función renal, potencialmente reversible.',
      tratamiento: 'Tratar la causa, restitución hidroelectrolítica, suspender nefrotóxicos, evaluar diálisis.',
    },
    sindrome_nefrotico: {
      sintomas: ['edema', 'proteinuria', 'fatiga_extrema'],
      gravedad: 'grave',
      descripcion: 'Proteinuria masiva, hipoalbuminemia y edema generalizado.',
      tratamiento: 'Corticoides (prednisona), restricción de sal, diuréticos y estatinas.',
    },
    glomerulonefritis: {
      sintomas: ['hematuria', 'edema', 'hipertension', 'orina_oscura'],
      gravedad: 'grave',
      descripcion: 'Inflamación de los glomérulos renales.',
      tratamiento: 'IECA/ARA II para presión, corticoides o inmunodepresores según la causa.',
    },
    cistitis: {
      sintomas: ['disuria', 'urgencia_miccional', 'dolor_suprapubico'],
      gravedad: 'leve',
      descripcion: 'Inflamación de la vejiga por infección bacteriana.',
      tratamiento: 'Antibióticos cortos (3 días), fenazopiridina y aumento de líquidos.',
    },
    enfermedad_poliquistica: {
      sintomas: ['dolor_lumbar_bilateral', 'hipertension', 'hematuria'],
      gravedad: 'moderada',
      descripcion: 'Trastorno hereditario con múltiples quistes renales.',
      tratamiento: 'Control estricto de presión, hidratación abundante, evitar nefrotóxicos.',
    },
  };

  // Síntomas críticos que aumentan la confianza
  const sintomas_criticos = {
    pielonefritis: ['fiebre', 'dolor_flanco_agudo'],
    calculos_renales: ['dolor_flanco_agudo', 'hematuria'],
    insuficiencia_renal_cronica: ['edema', 'fatiga_extrema'],
    glomerulonefritis: ['hematuria', 'orina_oscura'],
  };

  const evaluarRespuestas = (respuestas: Record<string, Answer>) => {
    const diagnosticos: Diagnosis[] = [];
    const respuestasPositivas = Object.entries(respuestas)
      .filter(([, v]) => v === 'si')
      .map(([k]) => k);

    // Evaluar cada enfermedad
    for (const [enfermedad, data] of Object.entries(enfermededades_sintomas)) {
      const totalSintomas = data.sintomas.length;
      const sintomasCoincidentes = data.sintomas.filter(s => respuestasPositivas.includes(s)).length;
      let puntuacion = sintomasCoincidentes / totalSintomas;

      // Aplicar peso a síntomas críticos
      const criticosEnfermedad = sintomas_criticos[enfermedad as keyof typeof sintomas_criticos];
      if (criticosEnfermedad) {
        const criticosPresentes = criticosEnfermedad.filter(s => respuestasPositivas.includes(s)).length;
        if (criticosPresentes > 0) {
          puntuacion *= (1 + criticosPresentes * 0.15); // Boost de 15% por cada crítico
        }
      }

      const porcentajeCoincidencia = Math.min(puntuacion * 100, 100); // Capped a 100%

      // Incluir diagnósticos con al menos el 40% de coincidencia o 2 síntomas positivos
      if (sintomasCoincidentes > 0 && (porcentajeCoincidencia >= 40 || sintomasCoincidentes >= 2)) {
        diagnosticos.push({
          enfermedad: enfermedad.replace(/_/g, ' ').toUpperCase(),
          coincidentes: sintomasCoincidentes,
          total: totalSintomas,
          tratamiento: data.tratamiento,
          descripcion: data.descripcion,
          gravedad: data.gravedad,
        });
      }
    }

    // Ordenar por puntuación de confianza (ponderada) > número de coincidencias > gravedad
    diagnosticos.sort((a, b) => {
      // Calcular puntuación ponderada
      const scoreA = (a.coincidentes / a.total) + (a.gravedad === 'grave' ? 0.1 : a.gravedad === 'moderada' ? 0.05 : 0);
      const scoreB = (b.coincidentes / b.total) + (b.gravedad === 'grave' ? 0.1 : b.gravedad === 'moderada' ? 0.05 : 0);
      
      return scoreB - scoreA;
    });

    return diagnosticos;
  };

  const handleAnswer = async (value: Answer) => {
    const newAnswers = { ...answers, [questions[currentIndex].id]: value };
    setAnswers(newAnswers);

    if (currentIndex + 1 >= questions.length) {
      setLoading(true);
      // Evaluar respuestas de forma asincrónica
      setTimeout(() => {
        const resultados = evaluarRespuestas(newAnswers);
        setDiagnoses(resultados);
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
        <Header view={view} onNavClick={(v) => setView(v as ViewType)} />
        <div className="card loading">
          <div className="spinner"></div>
          <p style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>
            Inicializando Sistema Experto...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Header view={view} onNavClick={(v) => setView(v as ViewType)} />
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
