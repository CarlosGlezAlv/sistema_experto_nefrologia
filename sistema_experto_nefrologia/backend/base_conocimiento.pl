% Base de Conocimiento - Sistema Experto de Nefrología
% Contiene los hechos y reglas sobre enfermedades renales

% Hechos sobre enfermedades renales
enfermedad(insuficiencia_renal_aguda).
enfermedad(insuficiencia_renal_cronica).
enfermedad(glomerulonefritis).
enfermedad(pielonefritis).
enfermedad(litiasis_renal).

% Síntomas
sintoma(dolor_espalda).
sintoma(hematuria).
sintoma(proteinuria).
sintoma(hipertension).
sintoma(edema).
sintoma(oliguria).

% Relaciones entre síntomas y enfermedades
tiene_sintoma(insuficiencia_renal_aguda, oliguria).
tiene_sintoma(insuficiencia_renal_aguda, edema).
tiene_sintoma(insuficiencia_renal_cronica, hipertension).
tiene_sintoma(glomerulonefritis, hematuria).
tiene_sintoma(glomerulonefritis, proteinuria).
tiene_sintoma(pielonefritis, dolor_espalda).
tiene_sintoma(litiasis_renal, dolor_espalda).
tiene_sintoma(litiasis_renal, hematuria).
