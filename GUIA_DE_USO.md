# 📘 Guía de Uso - Sistema Experto de Nefrología

## 🎯 Objetivo

Este sistema permite diagnosticar posibles enfermedades renales mediante un cuestionario interactivo basado en síntomas. Es una herramienta **educativa** que utiliza Prolog como motor de inferencia.

## 🚀 Inicio Rápido

### Paso 1: Instalar Node.js

Si no lo tienes instalado, descargalo de [nodejs.org](https://nodejs.org)

### Paso 2: Clonar/Preparar el Proyecto

```bash
cd frontend
npm install
```

### Paso 3: Descargar Motor Prolog (Tau-Prolog)

Descarga estos dos archivos y colócalos en `frontend/public/`:

1. **tau-prolog.js**
   ```
   http://try.tau-prolog.org/js/tau-prolog-0.3.0.js
   ```

2. **tau-prolog-lists.js**
   ```
   http://try.tau-prolog.org/js/tau-prolog-lists-0.3.0.js
   ```

### Paso 4: Ejecutar

```bash
npm run dev
```

Abre tu navegador en `http://localhost:5173`

## 💊 Cómo Usar la Aplicación

### 1. Pantalla de Bienvenida
- Lee el descargo de responsabilidad
- Haz clic en "Iniciar consulta"

### 2. Responder Preguntas
- Se te mostrarán preguntas sobre síntomas
- Selecciona: **Sí**, **No**, o **No sé**
- La barra de progreso muestra tu avance
- Continúa hasta responder todas las preguntas

### 3. Ver Resultados
El sistema te mostrará:
- **Diagnósticos posibles** (ordenados por confianza)
- **Confianza (%)** = síntomas coincidentes / total de síntomas
- **Gravedad** de cada enfermedad (Leve, Moderada, Grave)
- **Descripción** de la enfermedad
- **Tratamiento sugerido**

### 4. Explorar Base de Conocimiento
- En el menú superior, selecciona "Base de Conocimiento"
- Aquí verás todo el código Prolog detrás del sistema
- Puedes copiarlo y modificarlo

## 📊 Interpretación de Resultados

### Confianza

```
Confianza = (Síntomas confirmados / Total síntomas) × 100
```

**Ejemplo:**
- Una enfermedad tiene 4 síntomas totales
- Tú confirmaste 3 síntomas
- Confianza = (3/4) × 100 = 75%

### Gravedad

| Nivel | Significado |
|-------|-----------|
| 🟢 **Leve** | Requiere atención pero no urgente |
| 🟡 **Moderada** | Requiere tratamiento pronto |
| 🔴 **Grave** | Requiere atención médica urgente |

## 🧬 Estructura Técnica

### Componentes React

| Archivo | Función |
|---------|---------|
| `App.tsx` | Controlador principal, gestión de estado |
| `Header.tsx` | Navegación y marca |
| `Welcome.tsx` | Pantalla inicial |
| `QuestionCard.tsx` | Formulario de preguntas |
| `ResultsCard.tsx` | Visualización de diagnósticos |
| `KnowledgeBase.tsx` | Visor de código Prolog |

### Base de Datos (Prolog)

Ubicación: `src/prolog/nefrologia.pl`

**Estructura:**
```prolog
% Preguntas (qué se muestra al usuario)
pregunta(ID, 'Texto en español').

% Síntomas por enfermedad
sintoma_de(enfermedad, sintoma).

% Tratamientos
tratamiento_de(enfermedad, 'Descripción del tratamiento').

% Descripciones
descripcion_de(enfermedad, 'Explicación médica').

% Niveles de gravedad
gravedad(enfermedad, leve|moderada|grave).
```

## 🔧 Personalización

### Agregar una Nueva Enfermedad

Abre `frontend/src/prolog/nefrologia.pl` y añade:

```prolog
% 1. Nueva pregunta (si aplica)
pregunta(nueva_pregunta, '¿Tu pregunta aquí?').

% 2. Síntomas de la enfermedad
sintoma_de(nueva_enfermedad, síntoma1).
sintoma_de(nueva_enfermedad, síntoma2).
sintoma_de(nueva_enfermedad, síntoma3).

% 3. Tratamiento
tratamiento_de(nueva_enfermedad,
    'Descripción detallada del tratamiento recomendado.').

% 4. Descripción
descripcion_de(nueva_enfermedad,
    'Explicación breve de qué es la enfermedad.').

% 5. Gravedad
gravedad(nueva_enfermedad, moderada).
```

**Guarda y recarga el navegador.** Los cambios se aplicarán automáticamente.

### Modificar Síntomas Existentes

Para cambiar qué síntomas se asocian con una enfermedad:

1. Encuentra la enfermedad en `nefrologia.pl`
2. Modifica las líneas `sintoma_de(enfermedad, síntoma)`
3. Recarga el navegador

## 📱 Compatibilidad

- ✅ Chrome/Edge (versiones recientes)
- ✅ Firefox (versiones recientes)
- ✅ Safari (iOS 15+)
- ✅ Responsive en móviles

## ⚠️ Limitaciones y Descargos

1. **Educativo:** Este sistema es con fines educativos únicamente
2. **No reemplaza médico:** Consulta siempre a un especialista
3. **Información general:** Los síntomas pueden variar según el paciente
4. **Motor Prolog:** Tau-Prolog es una implementación en JavaScript, no SWI-Prolog

## 🐛 Solución de Problemas

### "Cargando motor Prolog..." no termina

**Solución:**
- Verifica que `tau-prolog.js` está en `public/`
- Abre la consola (F12) y busca errores
- Reinicia la página

### Las preguntas no cambian después de editar nefrologia.pl

**Solución:**
- El componente App.tsx tiene preguntas de ejemplo hardcodeadas
- Necesitas implementar la integración real con Tau-Prolog
- (Esto se cubre en la sección de desarrollo avanzado)

### Los estilos se ven raros en móvil

**Solución:**
- Borra el caché (Ctrl+Shift+R)
- Verifica que `styles.css` está en `src/`

## 📚 Enfermedades Incluidas

1. **Cálculos Renales** - Depósitos minerales
2. **Infección Urinaria** - ITU bacteria
3. **Pielonefritis** - Infección renal
4. **Insuficiencia Renal Crónica** - Progresiva
5. **Insuficiencia Renal Aguda** - Repentina
6. **Síndrome Nefrótico** - Proteinuria masiva
7. **Glomerulonefritis** - Inflamación
8. **Cistitis** - Inflamación vejiga
9. **Enfermedad Poliquística** - Genética

## 🎓 Conceptos Clave

### Prolog

Lenguaje lógico basado en hechos y reglas:
- **Hechos:** `sintoma_de(calculos_renales, hematuria).`
- **Reglas:** `diagnostico(E) :- sintoma_de(E, _), si(_).`

### Tau-Prolog

Implementación de Prolog en JavaScript para ejecutar en navegador.

### Sistema Experto

Programa que utiliza conocimiento de expertos (reglas) para inferir conclusiones.

## 🤝 Contribuciones

Para mejorar la base de conocimiento:

1. Edita `nefrologia.pl`
2. Prueba la aplicación
3. Verifica que los diagnósticos son correctos

## 📞 Contacto

Para reportar errores o sugerencias sobre el conocimiento médico, consulta con un especialista en Nefrología.

---

**¡Último recordatorio:** Esta herramienta es educativa. Siempre consulta a profesionales de salud certificados. 🏥
