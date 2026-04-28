# 🔬 Guía de Desarrollo - Integración Tau-Prolog

Esta guía es para desarrolladores que quieran completar la integración del motor Prolog.

## 📋 Estado Actual

✅ **Completado:**
- Estructura React con TypeScript
- Componentes UI funcionales
- Base de conocimiento Prolog (nefrologia.pl)
- Estilos CSS completos
- Vite build tool configurado

⏳ **Pendiente:**
- Integración real de Tau-Prolog con consultas dinámicas
- Parseo automático de preguntas desde Prolog
- Cálculo de diagnósticos con motor Prolog
- Manejo avanzado de sesiones Prolog

## 📦 Descargar e Integrar Tau-Prolog

### Opción 1: CDN en index.html

Edita `frontend/index.html` y añade antes del cierre de `</body>`:

```html
<script src="https://tau-prolog.org/js/tau-prolog-0.3.0.js"></script>
<script src="https://tau-prolog.org/js/tau-prolog-lists-0.3.0.js"></script>
```

### Opción 2: Archivos locales (recomendado)

1. Descarga:
   - [tau-prolog.js](http://try.tau-prolog.org/js/tau-prolog-0.3.0.js)
   - [tau-prolog-lists.js](http://try.tau-prolog.org/js/tau-prolog-lists-0.3.0.js)

2. Coloca en: `frontend/public/`

3. En `index.html`, añade:
```html
<script src="/tau-prolog.js"></script>
<script src="/tau-prolog-lists.js"></script>
```

## 🎯 Implementar Consultas Prolog

### Paso 1: Crear un módulo helper

Crea `frontend/src/prolog/prolog-engine.ts`:

```typescript
import prologSource from './nefrologia.pl?raw';

declare global {
  interface Window {
    tau: any;
  }
}

export interface PrologSession {
  consult: (code: string) => void;
  query: (query: string, callback: (answer: any) => void) => void;
  clear: () => void;
}

export function createSession(): PrologSession {
  const session = window.tau.runtime.environment.add();
  
  return {
    consult(code: string) {
      window.tau.parseProgram(code, function(err: any, ast: any) {
        if (err) throw new Error(`Parse error: ${err}`);
        window.tau.compile(ast, session, (error: any) => {
          if (error) throw new Error(`Compilation error: ${error}`);
        });
      });
    },
    
    query(queryStr: string, callback: (answer: any) => void) {
      window.tau.query(queryStr, session, function(err: any, answer: any) {
        if (err) console.error('Query error:', err);
        callback(answer);
      });
    },
    
    clear() {
      // Limpiar la sesión
    }
  };
}

export function loadPrologSource(): string {
  return prologSource;
}
```

### Paso 2: Actualizar App.tsx

Modifica `frontend/src/components/App.tsx`:

```typescript
import { useState, useEffect } from 'react';
import { createSession, loadPrologSource } from '../prolog/prolog-engine';
import prologSource from '../prolog/nefrologia.pl?raw';
// ... resto de imports

export default function App() {
  const [view, setView] = useState<ViewType>('welcome');
  const [questions, setQuestions] = useState<QuestionDef[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [loading, setLoading] = useState(true);
  const [prologSession, setPrologSession] = useState<any>(null);

  // Inicializar Prolog y cargar preguntas
  useEffect(() => {
    const initProlog = async () => {
      try {
        setLoading(true);
        
        // Esperar a que Tau-Prolog esté disponible
        let attempts = 0;
        while (!window.tau && attempts < 10) {
          await new Promise(r => setTimeout(r, 100));
          attempts++;
        }
        
        if (!window.tau) {
          throw new Error('Tau-Prolog no cargó correctamente');
        }
        
        // Crear sesión
        const session = window.tau.runtime.environment.add();
        setPrologSession(session);
        
        // Consultar el programa Prolog
        window.tau.parseProgram(prologSource, function(err: any, ast: any) {
          if (err) throw new Error(`Parse error: ${err}`);
          window.tau.compile(ast, session, function(error: any) {
            if (error) throw new Error(`Compilation error: ${error}`);
            
            // Cargar preguntas dinámicamente
            loadQuestionsFromProlog(session);
          });
        });
      } catch (error) {
        console.error('Error initializing Prolog:', error);
        // Fallback a preguntas de ejemplo
        loadExampleQuestions();
      } finally {
        setLoading(false);
      }
    };
    
    initProlog();
  }, []);

  const loadQuestionsFromProlog = (session: any) => {
    const questionsArray: QuestionDef[] = [];
    let completed = false;
    
    window.tau.query('pregunta(Id, Texto)', session, function (answer: any) {
      if (answer) {
        const id = answer.links.Id.id;
        const text = answer.links.Texto.value;
        questionsArray.push({ id, texto: text });
        window.tau.getCurrentOutput(session); // Siguiente respuesta
      } else {
        if (!completed) {
          completed = true;
          setQuestions(questionsArray);
        }
      }
    });
  };

  const loadExampleQuestions = () => {
    const exampleQuestions: QuestionDef[] = [
      { id: 'dolor_flanco_agudo', texto: '¿Siente dolor intenso y repentino en el costado o espalda baja?' },
      { id: 'hematuria', texto: '¿Ha notado sangre o color rojizo en la orina?' },
      // ... resto de preguntas
    ];
    setQuestions(exampleQuestions);
  };

  const handleAnswer = async (value: Answer) => {
    const newAnswers = { ...answers, [questions[currentIndex].id]: value };
    setAnswers(newAnswers);

    if (currentIndex + 1 >= questions.length) {
      await runDiagnosis(newAnswers);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const runDiagnosis = async (finalAnswers: Record<string, Answer>) => {
    setLoading(true);
    
    try {
      // Asegurar hechos de síntomas
      const session = prologSession;
      
      // Retract previos
      window.tau.query('retractall(si(_))', session, (answer: any) => {});
      
      // Assert síntomas confirmados
      for (const [symptom, answer] of Object.entries(finalAnswers)) {
        if (answer === 'si') {
          window.tau.query(`assert(si(${symptom}))`, session, (ans: any) => {});
        }
      }
      
      // Consultar diagnósticos
      const diagnoses: Diagnosis[] = [];
      window.tau.query('diagnostico(E, C, T)', session, (answer: any) => {
        if (answer) {
          const enfermedad = answer.links.E.id;
          const coincidentes = answer.links.C.value;
          const total = answer.links.T.value;
          
          // Obtener tratamiento
          let tratamiento = '';
          window.tau.query(`tratamiento_de(${enfermedad}, T)`, session, (t: any) => {
            if (t) tratamiento = t.links.T.value;
          });
          
          // Obtener descripción
          let descripcion = '';
          window.tau.query(`descripcion_de(${enfermedad}, D)`, session, (d: any) => {
            if (d) descripcion = d.links.D.value;
          });
          
          // Obtener gravedad
          let gravedad = '';
          window.tau.query(`gravedad(${enfermedad}, G)`, session, (g: any) => {
            if (g) gravedad = g.links.G.id;
          });
          
          diagnoses.push({
            enfermedad: enfermedad.replace(/_/g, ' '),
            coincidentes,
            total,
            tratamiento,
            descripcion,
            gravedad
          });
          
          window.tau.getCurrentOutput(session);
        } else {
          // Fin de respuestas
          setDiagnoses(diagnoses.sort((a, b) => 
            (b.coincidentes / b.total) - (a.coincidentes / a.total)
          ));
          setView('results');
          setLoading(false);
        }
      });
    } catch (error) {
      console.error('Error running diagnosis:', error);
      setLoading(false);
    }
  };

  // ... resto del componente
}
```

## 🔄 Flujo de Ejecución

```
1. App monta
   ↓
2. Espera a que Tau-Prolog cargue
   ↓
3. Crea sesión Prolog
   ↓
4. Consulta nefrologia.pl
   ↓
5. Carga preguntas dinámicamente (pregunta/2)
   ↓
6. Usuario responde
   ↓
7. Assert si/1 para síntomas confirmados
   ↓
8. Query diagnostico/3
   ↓
9. Recupera tratamiento/descripcion/gravedad
   ↓
10. Muestra resultados ordenados por confianza
```

## 🧪 Testing de Consultas

En la consola del navegador (F12), prueba:

```javascript
// Ver si Tau-Prolog está cargado
console.log(window.tau);

// Crear sesión
const session = window.tau.runtime.environment.add();

// Consultar un hecho
window.tau.query('pregunta(X, Y)', session, (answer) => {
  console.log(answer);
});
```

## 📝 Documentación Tau-Prolog

- [Sitio oficial](http://tau-prolog.org/)
- [GitHub](https://github.com/jariazavalverde/tau-prolog)
- [Ejemplos](http://tau-prolog.org/try)

## ⚙️ Configuración Avanzada

### 1. Manejo de Errores

```typescript
window.tau.query(queryStr, session, (error, answer) => {
  if (error) {
    console.error('Error:', error.message);
    return;
  }
  if (answer) {
    // Procesar respuesta
  }
});
```

### 2. Múltiples Soluciones

Para obtener todas las soluciones a una query:

```typescript
const solutions: any[] = [];
let done = false;

function getNext() {
  window.tau.getCurrentOutput(session, (answer) => {
    if (answer) {
      solutions.push(answer);
      getNext(); // Siguiente
    } else {
      done = true;
      processSolutions(solutions);
    }
  });
}

window.tau.query('diagnostico(E, C, T)', session, (answer) => {
  if (answer) {
    solutions.push(answer);
    getNext();
  }
});
```

### 3. Debugging

```typescript
// Ver el estado interno
console.log(session);

// Ver qué se ha consultado
window.tau.writeGoal(session, true);
```

## 🐛 Problemas Comunes

### "window.tau is undefined"
- Verifica que tau-prolog.js cargó
- Comprueba en Network (F12)
- Puede tomar tiempo en cargar

### Query no retorna respuestas
- Verifica sintaxis Prolog en nefrologia.pl
- Comprueba que los hechos existen
- Usa writeGoal para debugging

### Caracteres especiales en respuestas
- Tau-Prolog puede escapar caracteres
- Implementa función para limpiar salida

## 🚀 Performance

Para grandes bases de conocimiento:

1. **Precarga:** Compila el programa una sola vez
2. **Caché:** Almacena respuestas frecuentes
3. **Lazy Loading:** Carga preguntas bajo demanda
4. **Web Workers:** Ejecuta Prolog en thread separado

## 📚 Referencias

- [Prolog Basics](https://www.tutorialspoint.com/prolog/)
- [Tau-Prolog API](https://github.com/jariazavalverde/tau-prolog/wiki)
- [Expert Systems](https://en.wikipedia.org/wiki/Expert_system)

---

**Próximo paso:** Implementa estos cambios y prueba la integración con Tau-Prolog.
