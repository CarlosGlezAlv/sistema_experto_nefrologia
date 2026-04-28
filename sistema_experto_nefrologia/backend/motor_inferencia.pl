% Motor de Inferencia - Sistema Experto de Nefrología
% Realiza el razonamiento y diagnóstico

:- consult('base_conocimiento.pl').

% Diagnosticar enfermedad basado en síntomas
diagnosticar(Enfermedad, Sintomas) :-
    enfermedad(Enfermedad),
    findall(Sintoma, (
        member(Sintoma, Sintomas),
        tiene_sintoma(Enfermedad, Sintoma)
    ), SintomasCoincidentes),
    length(SintomasCoincidentes, N),
    N > 0.

% Encontrar todas las enfermedades posibles
diagnosticos_posibles(Sintomas, Diagnosticos) :-
    findall(Enfermedad, diagnosticar(Enfermedad, Sintomas), Diagnosticos).

% Grado de confianza del diagnóstico
confianza_diagnostico(Enfermedad, Sintomas, Confianza) :-
    findall(Sintoma, tiene_sintoma(Enfermedad, Sintoma), SintomasEsperados),
    length(SintomasEsperados, Total),
    findall(Sintoma, (member(Sintoma, Sintomas), tiene_sintoma(Enfermedad, Sintoma)), SintomasCoincidentes),
    length(SintomasCoincidentes, Coincidentes),
    (Total > 0 -> Confianza is (Coincidentes / Total) * 100 ; Confianza = 0).
