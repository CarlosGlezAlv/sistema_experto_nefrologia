% =====================================================================
% SISTEMA EXPERTO DE NEFROLOGIA
% Base de Conocimientos en Prolog
% =====================================================================
:- use_module(library(lists)).
:- dynamic(si/1).
:- dynamic(no/1).

% =====================================================================
% PREGUNTAS LEGIBLES (se muestran al usuario en la interfaz)
% =====================================================================
pregunta(dolor_flanco_agudo,        '¿Siente dolor intenso y repentino en el costado o espalda baja?').
pregunta(hematuria,                 '¿Ha notado sangre o color rojizo en la orina?').
pregunta(nauseas,                   '¿Ha tenido nauseas o vomito recientemente?').
pregunta(disuria,                   '¿Siente ardor o dolor al momento de orinar?').
pregunta(urgencia_miccional,        '¿Tiene necesidad urgente y frecuente de orinar?').
pregunta(fiebre,                    '¿Ha tenido fiebre o escalofrios en los ultimos dias?').
pregunta(edema,                     '¿Tiene hinchazon en tobillos, piernas o parpados?').
pregunta(fatiga_extrema,            '¿Se siente extremadamente cansado sin razon aparente?').
pregunta(proteinuria,               '¿Su orina presenta consistencia espumosa?').
pregunta(orina_turbia,              '¿Su orina se ve turbia o con mal olor?').
pregunta(dolor_lumbar_bilateral,    '¿Siente dolor sordo en ambos lados de la espalda baja?').
pregunta(hipertension,              '¿Tiene presion arterial alta diagnosticada?').
pregunta(diabetes,                  '¿Tiene diabetes diagnosticada?').
pregunta(antecedente_calculos,      '¿Ha tenido calculos renales anteriormente?').
pregunta(perdida_apetito,           '¿Ha perdido el apetito en las ultimas semanas?').
pregunta(picazon_piel,              '¿Tiene picazon generalizada en la piel?').
pregunta(disminucion_orina,         '¿Ha disminuido notablemente la cantidad de orina que produce?').
pregunta(dolor_suprapubico,         '¿Siente dolor o presion en el bajo vientre?').
pregunta(orina_oscura,              '¿Su orina es de color oscuro (te o cola)?').
pregunta(calambres_musculares,      '¿Sufre calambres musculares frecuentes?').

% =====================================================================
% SINTOMAS POR ENFERMEDAD
% =====================================================================
% --- Calculos Renales ---
sintoma_de(calculos_renales, dolor_flanco_agudo).
sintoma_de(calculos_renales, hematuria).
sintoma_de(calculos_renales, nauseas).

% --- Infeccion Urinaria ---
sintoma_de(infeccion_urinaria, disuria).
sintoma_de(infeccion_urinaria, urgencia_miccional).
sintoma_de(infeccion_urinaria, orina_turbia).

% --- Pielonefritis ---
sintoma_de(pielonefritis, fiebre).
sintoma_de(pielonefritis, dolor_flanco_agudo).
sintoma_de(pielonefritis, disuria).
sintoma_de(pielonefritis, nauseas).

% --- Insuficiencia Renal Cronica ---
sintoma_de(insuficiencia_renal_cronica, edema).
sintoma_de(insuficiencia_renal_cronica, fatiga_extrema).
sintoma_de(insuficiencia_renal_cronica, proteinuria).
sintoma_de(insuficiencia_renal_cronica, picazon_piel).
sintoma_de(insuficiencia_renal_cronica, perdida_apetito).

% --- Insuficiencia Renal Aguda ---
sintoma_de(insuficiencia_renal_aguda, disminucion_orina).
sintoma_de(insuficiencia_renal_aguda, edema).
sintoma_de(insuficiencia_renal_aguda, fatiga_extrema).
sintoma_de(insuficiencia_renal_aguda, nauseas).

% --- Sindrome Nefrotico ---
sintoma_de(sindrome_nefrotico, edema).
sintoma_de(sindrome_nefrotico, proteinuria).
sintoma_de(sindrome_nefrotico, fatiga_extrema).

% --- Glomerulonefritis ---
sintoma_de(glomerulonefritis, hematuria).
sintoma_de(glomerulonefritis, edema).
sintoma_de(glomerulonefritis, hipertension).
sintoma_de(glomerulonefritis, orina_oscura).

% --- Cistitis ---
sintoma_de(cistitis, disuria).
sintoma_de(cistitis, urgencia_miccional).
sintoma_de(cistitis, dolor_suprapubico).

% --- Enfermedad Poliquistica ---
sintoma_de(enfermedad_poliquistica, dolor_lumbar_bilateral).
sintoma_de(enfermedad_poliquistica, hipertension).
sintoma_de(enfermedad_poliquistica, hematuria).

% =====================================================================
% TRATAMIENTOS
% =====================================================================
tratamiento_de(calculos_renales,
    'Hidratacion intensa (3 litros/dia), AINEs y, segun tamano, litotricia o ureteroscopia.').
tratamiento_de(infeccion_urinaria,
    'Antibioticos (nitrofurantoina o trimetoprim-sulfametoxazol) y aumento de liquidos.').
tratamiento_de(pielonefritis,
    'Antibioticos amplio espectro (ciprofloxacino/ceftriaxona), hospitalizacion si hay sepsis.').
tratamiento_de(insuficiencia_renal_cronica,
    'Dieta baja en sodio/potasio/proteinas; control de presion y glucosa; posible dialisis.').
tratamiento_de(insuficiencia_renal_aguda,
    'Tratar la causa, restitucion hidroelectrolitica, suspender nefrotoxicos, evaluar dialisis.').
tratamiento_de(sindrome_nefrotico,
    'Corticoides (prednisona), restriccion de sal, diureticos y estatinas.').
tratamiento_de(glomerulonefritis,
    'IECA/ARA II para presion, corticoides o inmunosupresores segun causa.').
tratamiento_de(cistitis,
    'Antibioticos cortos (3 dias), fenazopiridina y mas liquidos.').
tratamiento_de(enfermedad_poliquistica,
    'Control estricto de presion, hidratacion abundante, evitar nefrotoxicos.').

% =====================================================================
% DESCRIPCIONES Y GRAVEDAD
% =====================================================================
descripcion_de(calculos_renales,            'Depositos solidos de minerales en los rinones.').
descripcion_de(infeccion_urinaria,          'Infeccion bacteriana del tracto urinario bajo.').
descripcion_de(pielonefritis,               'Infeccion bacteriana del rinon. Atencion urgente.').
descripcion_de(insuficiencia_renal_cronica, 'Perdida progresiva e irreversible de funcion renal.').
descripcion_de(insuficiencia_renal_aguda,   'Deterioro brusco de la funcion renal, reversible.').
descripcion_de(sindrome_nefrotico,          'Proteinuria masiva, hipoalbuminemia y edema.').
descripcion_de(glomerulonefritis,           'Inflamacion de los glomerulos renales.').
descripcion_de(cistitis,                    'Inflamacion de la vejiga por infeccion.').
descripcion_de(enfermedad_poliquistica,     'Trastorno hereditario con quistes renales.').

gravedad(calculos_renales,            moderada).
gravedad(infeccion_urinaria,          leve).
gravedad(pielonefritis,               grave).
gravedad(insuficiencia_renal_cronica, grave).
gravedad(insuficiencia_renal_aguda,   grave).
gravedad(sindrome_nefrotico,          grave).
gravedad(glomerulonefritis,           grave).
gravedad(cistitis,                    leve).
gravedad(enfermedad_poliquistica,     moderada).

% =====================================================================
% MOTOR DE INFERENCIA
% =====================================================================
sintomas_coincidentes(Enfermedad, Coincidentes, Total) :-
    findall(S, sintoma_de(Enfermedad, S), TodosSintomas),
    length(TodosSintomas, Total),
    findall(S, (member(S, TodosSintomas), si(S)), Confirmados),
    length(Confirmados, Coincidentes).

diagnostico(Enfermedad, Coincidentes, Total) :-
    sintoma_de(Enfermedad, _),
    sintomas_coincidentes(Enfermedad, Coincidentes, Total),
    Coincidentes > 0,
    Coincidentes * 2 >= Total.

sugerir_tratamiento(Enfermedad, Tratamiento) :-
    diagnostico(Enfermedad, _, _),
    tratamiento_de(Enfermedad, Tratamiento).

limpiar_memoria :-
    retractall(si(_)),
    retractall(no(_)).
