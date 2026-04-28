% ==========================================
% motor_inferencia.pl
% ==========================================
:- use_module(library(lists)).
:- ensure_loaded('base_conocimiento.pl'). % Conecta con los datos

% Evalúa las respuestas del usuario y decide el siguiente paso
evaluar_estado(Si, No, Respuesta) :-
    (   % 1. Busca una enfermedad en la base de datos
        enfermedad(Enf, SintomasRequeridos, Trat),
        
        % 2. Verifica que el usuario NO haya negado un síntoma clave
        intersection(SintomasRequeridos, No, []),
        
        % 3. Verifica que los síntomas confirmados pertenezcan a esta enfermedad
        subset(Si, SintomasRequeridos)
    ->  
        % 4. Revisa qué síntomas faltan por preguntar
        subtract(SintomasRequeridos, Si, Faltantes),
        (   Faltantes = [SiguienteSintoma | _] ->
            % Si faltan síntomas, devuelve la pregunta
            Respuesta = _{estado: "pregunta", sintoma: SiguienteSintoma}
        ;   
            % Si ya se confirmaron todos los síntomas, devuelve el diagnóstico
            Respuesta = _{estado: "diagnostico", enfermedad: Enf, tratamiento: Trat}
        )
    ;   
        % Si los síntomas no encajan con nada
        Respuesta = _{estado: "error", mensaje: "No hay diagnostico coincidente"}
    ).
