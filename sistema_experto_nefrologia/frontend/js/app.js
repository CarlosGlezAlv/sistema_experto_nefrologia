// Sistema Experto de Nefrología - Controlador Principal

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar el sistema experto
    const sistema = new SistemaExperto();

    // Elementos del DOM
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');
    
    const initialState = document.getElementById('initial-state');
    const questionState = document.getElementById('question-state');
    const resultState = document.getElementById('result-state');

    const btnStart = document.getElementById('btn-start');
    const btnYes = document.getElementById('btn-yes');
    const btnNo = document.getElementById('btn-no');
    const btnUnsure = document.getElementById('btn-unsure');
    const btnRestart = document.getElementById('btn-restart');

    const questionText = document.getElementById('question-text');
    const questionTitle = document.getElementById('question-title');
    const progressText = document.getElementById('progress-text');
    const progressFill = document.getElementById('progress-fill');
    const resultContent = document.getElementById('result-content');
    const historialList = document.getElementById('historial-list');
    const infoContent = document.getElementById('info-content');

    // Estado de la aplicación
    let respuestasSi = [];
    let respuestasNo = [];
    let historial = JSON.parse(localStorage.getItem('historial_diagnosticos') || '[]');
    let sintomaActual = null;

    // ========== NAVEGACIÓN ==========
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const page = item.dataset.page;
            
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            sections.forEach(s => s.classList.remove('active'));
            document.getElementById(`${page}-section`).classList.add('active');

            if (page === 'historial') {
                mostrarHistorial();
            } else if (page === 'info') {
                mostrarInformacion();
            }
        });
    });

    // ========== DIAGNÓSTICO ==========
    function iniciarDiagnostico() {
        respuestasSi = [];
        respuestasNo = [];
        sintomaActual = null;

        initialState.classList.add('hidden');
        questionState.classList.remove('hidden');
        resultState.classList.add('hidden');

        siguientePregunta();
    }

    function siguientePregunta() {
        const resultado = sistema.evaluar(respuestasSi, respuestasNo);

        if (resultado.estado === 'pregunta') {
            sintomaActual = resultado.sintoma;
            questionTitle.textContent = `${resultado.icono} ¿Presenta el siguiente síntoma?`;
            questionText.textContent = resultado.nombre_sintoma;

            progressText.textContent = `Pregunta ${resultado.pregunta_actual} de ${resultado.total_preguntas}`;
            const porcentaje = (resultado.pregunta_actual / resultado.total_preguntas) * 100;
            progressFill.style.width = `${porcentaje}%`;
        } 
        else if (resultado.estado === 'diagnostico') {
            mostrarDiagnostico(resultado);
        } 
        else {
            mostrarError(resultado);
        }
    }

    function responder(tieneSintoma, conIncertidumbre = false) {
        if (tieneSintoma) {
            if (!respuestasSi.includes(sintomaActual)) {
                respuestasSi.push(sintomaActual);
            }
        } else {
            if (!respuestasNo.includes(sintomaActual)) {
                respuestasNo.push(sintomaActual);
            }
        }

        // Pequeña pausa para efecto visual
        setTimeout(siguientePregunta, 300);
    }

    function mostrarDiagnostico(resultado) {
        initialState.classList.add('hidden');
        questionState.classList.add('hidden');
        resultState.classList.remove('hidden');

        const html = `
            <div class="result-diagnosis">
                <div class="result-diagnosis-title">
                    <i class="fas fa-check-circle"></i> Diagnóstico Probable
                </div>
                <div class="result-diagnosis-name">
                    ${resultado.icono} ${resultado.enfermedad}
                </div>
                <div style="margin-bottom: 1rem; padding: 0.75rem; background: rgba(0,0,0,0.05); border-radius: 8px;">
                    <strong>Confianza:</strong> ${resultado.confianza}%
                </div>
            </div>

            <div class="result-section">
                <h4><i class="fas fa-info-circle"></i> Descripción</h4>
                <p>${resultado.descripcion}</p>
            </div>

            <div class="result-section">
                <h4><i class="fas fa-prescription-bottle"></i> Tratamiento Recomendado</h4>
                <p>${resultado.tratamiento}</p>
            </div>

            <div style="padding: 1rem; background: rgba(220, 53, 69, 0.1); border-radius: 8px; margin-top: 1rem; border-left: 4px solid #dc3545;">
                <strong style="color: #dc3545;">⚠️ Importante:</strong>
                <p style="margin-top: 0.5rem; color: var(--text-muted); font-size: 0.95rem;">Este diagnóstico es solo informativo y no reemplaza la consulta médica profesional. Consulta a un especialista en Nefrología para confirmación y tratamiento adecuado.</p>
            </div>
        `;

        resultContent.innerHTML = html;

        // Guardar en historial
        guardarEnHistorial({
            enfermedad: resultado.enfermedad,
            confianza: resultado.confianza,
            fecha: new Date().toLocaleString('es-ES'),
            sintomas: respuestasSi
        });
    }

    function mostrarError(resultado) {
        initialState.classList.add('hidden');
        questionState.classList.add('hidden');
        resultState.classList.remove('hidden');

        resultContent.innerHTML = `
            <div class="result-box error">
                <div class="result-diagnosis error">
                    <div class="result-diagnosis-title">
                        <i class="fas fa-exclamation-triangle"></i> Evaluación Incompleta
                    </div>
                </div>

                <div class="result-section">
                    <h4><i class="fas fa-info-circle"></i> Resultado</h4>
                    <p>${resultado.mensaje}</p>
                </div>

                <div style="padding: 1rem; background: rgba(220, 53, 69, 0.1); border-radius: 8px; margin-top: 1rem; border-left: 4px solid #dc3545;">
                    <p style="color: var(--text-muted);">Te recomendamos visitar a un especialista en Nefrología para una evaluación completa y diagnóstico preciso.</p>
                </div>
            </div>
        `;
    }

    function guardarEnHistorial(diagnostico) {
        historial.unshift(diagnostico);
        if (historial.length > 10) {
            historial.pop();
        }
        localStorage.setItem('historial_diagnosticos', JSON.stringify(historial));
    }

    // ========== HISTORIAL ==========
    function mostrarHistorial() {
        if (historial.length === 0) {
            historialList.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 2rem;">No hay diagnósticos en el historial aún.</p>';
            return;
        }

        historialList.innerHTML = historial.map((item, index) => `
            <div class="historial-item">
                <h4>${item.enfermedad}</h4>
                <p><strong>Confianza:</strong> ${item.confianza}%</p>
                <p><strong>Síntomas:</strong> ${item.sintomas.length}</p>
                <p style="font-size: 0.85rem; color: #999;">${item.fecha}</p>
            </div>
        `).join('');
    }

    // ========== INFORMACIÓN ==========
    function mostrarInformacion() {
        const enfermedades = sistema.obtenerInformacionEnfermedades();
        
        infoContent.innerHTML = enfermedades.map(e => `
            <div class="info-disease">
                <h3>${e.icono} ${e.nombre}</h3>
                <p><strong>Descripción:</strong> ${e.descripcion}</p>
                
                <h4 style="margin-top: 1rem; margin-bottom: 0.5rem; color: var(--primary-color);">Síntomas asociados:</h4>
                <ul style="margin-left: 1.5rem; color: var(--text-muted);">
                    ${e.sintomas.map(s => `<li>${s}</li>`).join('')}
                </ul>
                
                <p style="margin-top: 1rem;"><strong>Tratamiento:</strong> ${e.tratamiento}</p>
            </div>
        `).join('');
    }

    // ========== EVENT LISTENERS ==========
    btnStart.addEventListener('click', iniciarDiagnostico);
    btnYes.addEventListener('click', () => responder(true));
    btnNo.addEventListener('click', () => responder(false));
    btnUnsure.addEventListener('click', () => responder(false, true));
    btnRestart.addEventListener('click', iniciarDiagnostico);
});
