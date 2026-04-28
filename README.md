# 🏥 Sistema Experto de Nefrología

Sistema de diagnóstico asistido basado en **Prolog** y **TypeScript + React** con Vite.

## 📋 Características

- ✅ Motor de inferencia Prolog embebido
- ✅ Interfaz moderna y responsiva
- ✅ Base de conocimiento extensible
- ✅ 9 enfermedades renales configuradas
- ✅ 20 síntomas evaluados
- ✅ Cálculo de confianza de diagnóstico
- ✅ Historial de consultas

## 📁 Estructura del Proyecto

```
sistema_experto_nefrologia/
├── frontend/
│   ├── public/
│   │   ├── tau-prolog.js
│   │   └── tau-prolog-lists.js
│   ├── src/
│   │   ├── components/
│   │   │   ├── App.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Welcome.tsx
│   │   │   ├── QuestionCard.tsx
│   │   │   ├── ResultsCard.tsx
│   │   │   └── KnowledgeBase.tsx
│   │   ├── prolog/
│   │   │   └── nefrologia.pl
│   │   ├── main.tsx
│   │   └── styles.css
│   ├── index.html
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── package.json
├── backend/ (Opcional - para desarrollo Prolog puro)
│   ├── base_conocimiento.pl
│   ├── motor_inferencia.pl
│   └── servidor.pl
├── README.md
└── .gitignore
```

## 🚀 Instalación

### 1. Instalar Dependencias

```bash
cd frontend
npm install
```

### 2. Descargar Tau-Prolog

Descarga desde:
- [tau-prolog.js](http://try.tau-prolog.org/js/tau-prolog-0.3.0.js)
- [tau-prolog-lists.js](http://try.tau-prolog.org/js/tau-prolog-lists-0.3.0.js)

Coloca los archivos en `frontend/public/`

### 3. Ejecutar

```bash
npm run dev
```

Abre `http://localhost:5173`

## 🧠 Base de Conocimiento

Archivo: `frontend/src/prolog/nefrologia.pl`

### Enfermedades Configuradas

1. **Cálculos Renales** - Depósitos de minerales
2. **Infección Urinaria** - Bacteria en tracto urinario
3. **Pielonefritis** - Infección renal urgente
4. **Insuficiencia Renal Crónica** - Degeneración renal
5. **Insuficiencia Renal Aguda** - Fallo repentino
6. **Síndrome Nefrótico** - Proteinuria masiva
7. **Glomerulonefritis** - Inflamación de glomérulos
8. **Cistitis** - Inflamación de vejiga
9. **Enfermedad Poliquística** - Quistes renales hereditarios

## 📝 Scripts

```bash
npm run dev           # Desarrollo
npm run build         # Producción
npm run preview       # Preview
npm run type-check    # Validar tipos
```

## ⚠️ Descargo de Responsabilidad

Este sistema es **únicamente educativo**. No reemplaza la consulta médica profesional.

---

Para más información, consulta la documentación dentro de la aplicación.
