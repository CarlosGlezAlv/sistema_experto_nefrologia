// Sistema Experto de Nefrología - Motor de Inferencia en JavaScript

class SistemaExperto {
    constructor() {
        // Base de conocimiento: Enfermedades con síntomas y tratamiento
        this.enfermedades = [
            {
                nombre: 'Cálculos Renales',
                sintomas: ['dolor_flanco', 'hematuria', 'nauseas'],
                tratamiento: 'Hidratación intensa y analgésicos. Posible evaluación urológica.',
                descripcion: 'Los cálculos renales son depósitos duros de minerales y sales que se forman en los riñones. Causan dolor intenso.',
                icono: '🪨'
            },
            {
                nombre: 'Infección Urinaria',
                sintomas: ['ardor_orinar', 'urgencia_miccional', 'fiebre'],
                tratamiento: 'Ciclo de antibióticos y aumento de líquidos.',
                descripcion: 'Infección bacteriana del sistema urinario. Requiere tratamiento antibiótico.',
                icono: '🦠'
            },
            {
                nombre: 'Insuficiencia Renal',
                sintomas: ['edema_piernas', 'fatiga', 'espuma_orina'],
                tratamiento: 'Control estricto de presión, dieta baja en sodio y derivación urgente.',
                descripcion: 'Pérdida progresiva de la función renal. Requiere seguimiento especializado.',
                icono: '⚠️'
            }
        ];

        // Diccionario de síntomas
        this.diccionarioSintomas = {
            'dolor_flanco': { nombre: 'Dolor intenso en el costado', icono: '💔' },
            'hematuria': { nombre: 'Sangre en la orina', icono: '🩸' },
            'nauseas': { nombre: 'Náuseas o vómitos', icono: '🤢' },
            'ardor_orinar': { nombre: 'Ardor al orinar', icono: '🔥' },
            'urgencia_miccional': { nombre: 'Urgencia constante de orinar', icono: '🚽' },
            'fiebre': { nombre: 'Fiebre o escalofríos', icono: '🌡️' },
            'edema_piernas': { nombre: 'Hinchazón en las piernas', icono: '🦵' },
            'fatiga': { nombre: 'Fatiga extrema', icono: '😴' },
            'espuma_orina': { nombre: 'Espuma en la orina', icono: '🫧' }
        };

        this.sintomas = Object.keys(this.diccionarioSintomas);
    }

    // Obtener el siguiente síntoma a preguntar
    obtenerSiguienteSintoma(respuestasSi, respuestasNo) {
        for (let sintoma of this.sintomas) {
            if (!respuestasSi.includes(sintoma) && !respuestasNo.includes(sintoma)) {
                return sintoma;
            }
        }
        return null;
    }

    // Evaluar el estado y devolver diagnóstico o siguiente pregunta
    evaluar(respuestasSi, respuestasNo) {
        let diagnosticoPosible = null;
        let confianzaMaxima = 0;

        // Buscar la enfermedad más probable
        for (let enfermedad of this.enfermedades) {
            // Verificar que no haya síntomas negados
            const hayNegados = enfermedad.sintomas.some(s => respuestasNo.includes(s));
            if (hayNegados) continue;

            // Contar coincidencias
            const coincidencias = enfermedad.sintomas.filter(s => respuestasSi.includes(s)).length;
            const confianza = coincidencias / enfermedad.sintomas.length;

            if (confianza > confianzaMaxima) {
                confianzaMaxima = confianza;
                diagnosticoPosible = { enfermedad, confianza };
            }
        }

        // Si encontramos diagnóstico probable (más del 50% coincidencia)
        if (diagnosticoPosible && confianzaMaxima >= 0.5) {
            return {
                estado: 'diagnostico',
                enfermedad: diagnosticoPosible.enfermedad.nombre,
                tratamiento: diagnosticoPosible.enfermedad.tratamiento,
                descripcion: diagnosticoPosible.enfermedad.descripcion,
                confianza: Math.round(confianzaMaxima * 100),
                icono: diagnosticoPosible.enfermedad.icono
            };
        }

        // Buscar siguiente síntoma a preguntar
        const siguienteSintoma = this.obtenerSiguienteSintoma(respuestasSi, respuestasNo);

        if (siguienteSintoma) {
            return {
                estado: 'pregunta',
                sintoma: siguienteSintoma,
                nombre_sintoma: this.diccionarioSintomas[siguienteSintoma].nombre,
                icono: this.diccionarioSintomas[siguienteSintoma].icono,
                total_preguntas: this.sintomas.length,
                pregunta_actual: Math.max(respuestasSi.length, respuestasNo.length) + 1
            };
        }

        // Si se agotaron las preguntas sin diagnóstico claro
        return {
            estado: 'error',
            mensaje: 'Se requiere evaluación médica. Los síntomas no coinciden claramente con un cuadro específico.'
        };
    }

    // Obtener información de todas las enfermedades
    obtenerInformacionEnfermedades() {
        return this.enfermedades.map(e => ({
            nombre: e.nombre,
            descripcion: e.descripcion,
            sintomas: e.sintomas.map(s => this.diccionarioSintomas[s].nombre),
            tratamiento: e.tratamiento,
            icono: e.icono
        }));
    }
}

// Exportar la clase
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SistemaExperto;
}