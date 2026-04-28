# ✅ Instrucciones de Ejecución

## 🎯 Requisitos Previos

- **Node.js 16+** (descargar de [nodejs.org](https://nodejs.org))
- **Git** (opcional)
- **Navegador moderno** (Chrome, Firefox, Safari, Edge)

## 📥 Paso 1: Clonar o Descargar el Proyecto

### Opción A: Desde Git
```bash
git clone <tu-repo>
cd sistema_experto_nefrologia
```

### Opción B: Desde archivo ZIP
```bash
unzip sistema_experto_nefrologia.zip
cd sistema_experto_nefrologia
```

## 🚀 Paso 2: Instalar Dependencias

```bash
cd frontend
npm install
```

Esto descargará:
- React 18.2.0
- TypeScript 5.0.0
- Vite 4.3.0
- Y otras dependencias

## 📦 Paso 3: Descargar Motor Prolog (Tau-Prolog)

El sistema funciona **100% en navegador** sin servidor. Necesitas descargar el motor Prolog:

### Opción A: Descargar Manual

1. Descarga estos dos archivos:
   - [tau-prolog-0.3.0.js](http://try.tau-prolog.org/js/tau-prolog-0.3.0.js)
   - [tau-prolog-lists-0.3.0.js](http://try.tau-prolog.org/js/tau-prolog-lists-0.3.0.js)

2. Coloca ambos archivos en: `frontend/public/`

### Opción B: Script Automático (en Windows)

Crea un archivo `descargar.bat` en `frontend/` con:

```batch
@echo off
echo Descargando Tau-Prolog...
powershell -Command "(New-Object Net.WebClient).DownloadFile('http://try.tau-prolog.org/js/tau-prolog-0.3.0.js', 'public/tau-prolog.js')"
powershell -Command "(New-Object Net.WebClient).DownloadFile('http://try.tau-prolog.org/js/tau-prolog-lists-0.3.0.js', 'public/tau-prolog-lists.js')"
echo ¡Descarga completada!
pause
```

Luego ejecuta:
```bash
descargar.bat
```

### Opción C: Script Automático (Linux/Mac)

```bash
cd frontend/public
wget http://try.tau-prolog.org/js/tau-prolog-0.3.0.js -O tau-prolog.js
wget http://try.tau-prolog.org/js/tau-prolog-lists-0.3.0.js -O tau-prolog-lists.js
cd ../..
```

## 🏃 Paso 4: Ejecutar el Servidor de Desarrollo

```bash
npm run dev
```

Verás algo como:
```
  VITE v4.3.0  ready in 123 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

El navegador se abrirá automáticamente en `http://localhost:5173`

## ✨ Paso 5: Usar la Aplicación

1. **Lee la bienvenida** y haz clic en "Iniciar consulta"
2. **Responde preguntas** seleccionando Sí, No o No sé
3. **Espera los resultados** - el sistema analizará tus síntomas
4. **Lee el diagnóstico** con recomendaciones
5. **Puedes hacer nueva consulta** o explorar la base de conocimiento

## 🛑 Paso 6: Detener el Servidor

En la terminal, presiona: **Ctrl + C**

## 🏗️ Compilar para Producción

Si quieres crear una versión optimizada para publicar:

```bash
npm run build
```

Se creará una carpeta `dist/` con los archivos optimizados. 

Puedes copiar todo el contenido de `dist/` a un servidor web.

## 📁 Estructura Final (Después de descargar Tau-Prolog)

```
sistema_experto_nefrologia/
├── frontend/
│   ├── public/
│   │   ├── tau-prolog.js              ← Descargado
│   │   └── tau-prolog-lists.js        ← Descargado
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
│   ├── package.json
│   └── .gitignore
├── README.md
├── GUIA_DE_USO.md
├── DESARROLLO_AVANZADO.md
├── INSTRUCCIONES_EJECUCION.md (este archivo)
└── .gitignore
```

## 🆘 Solución de Problemas

### Error: "El término 'npm' no se reconoce"
**Solución:** Node.js no está instalado
- Descarga e instala desde [nodejs.org](https://nodejs.org)
- Reinicia la terminal
- Verifica con: `node --version`

### Error: "EACCES: permission denied"
**Solución (Linux/Mac):**
```bash
sudo npm install
```

### Tau-Prolog no carga ("Cargando motor Prolog..." infinito)
**Solución:**
- Verifica que `tau-prolog.js` está en `frontend/public/`
- Comprueba en el navegador (F12 → Network) que se descarga
- Asegúrate de esperar la descarga completa
- Recarga la página (Ctrl+F5)

### Preguntas o resultados no aparecen
**Solución:**
- Abre la consola (F12)
- Busca errores en rojo
- Verifica que `nefrologia.pl` existe
- Por defecto hay preguntas de ejemplo, esto es normal

### Estilos se ven raros
**Solución:**
- Borra caché (Ctrl+Shift+R)
- Verifica que `styles.css` está en `frontend/src/`

### El puerto 5173 ya está en uso
**Solución:**
Ejecuta en otro puerto:
```bash
npm run dev -- --port 3000
```

## 💻 Comandos Útiles

```bash
# Instalar dependencias
npm install

# Desarrollo con hot reload
npm run dev

# Build para producción
npm run build

# Previsualizar build
npm run preview

# Verificar tipos TypeScript
npm run type-check

# Linting (si está configurado)
npm run lint
```

## 🌐 Publicar en Internet (Gratis)

### Opción 1: Vercel
```bash
npm i -g vercel
vercel
```

### Opción 2: Netlify
```bash
npm run build
# Arrastra la carpeta 'dist/' a netlify.com
```

### Opción 3: GitHub Pages
```bash
npm run build
# Sube 'dist/' a rama 'gh-pages'
```

## 📊 Archivos Importantes

| Archivo | Propósito |
|---------|-----------|
| `vite.config.ts` | Configuración del build tool |
| `tsconfig.json` | Reglas TypeScript |
| `package.json` | Dependencias y scripts |
| `src/prolog/nefrologia.pl` | Base de conocimiento |
| `src/components/App.tsx` | Lógica principal |
| `src/styles.css` | Todos los estilos CSS |

## 🔍 Verificar Instalación

Para confirmar que todo está bien:

1. Abre `http://localhost:5173` en el navegador
2. Presiona F12 para abrir herramientas del desarrollador
3. Busca en la consola (pestaña Console):
   - NO debe haber errores en rojo
   - Debe haber logs de inicialización

## 🎓 Próximos Pasos

1. **Explorar:** Prueba todas las preguntas
2. **Personalizar:** Edita `nefrologia.pl` para agregar enfermedades
3. **Publicar:** Compila con `npm run build` y sube a un hosting
4. **Integrar:** Lee `DESARROLLO_AVANZADO.md` para mejoras

## 📞 Soporte

- Revisa `GUIA_DE_USO.md` para preguntas generales
- Consulta `DESARROLLO_AVANZADO.md` para temas técnicos
- Abre la consola (F12) para ver mensajes de error

---

**¡Listo! Tu sistema experto de Nefrología está funcionando.** 🏥

**Recuerda:** Esta es una herramienta educativa. Para diagnósticos reales, consulta siempre a un especialista.
