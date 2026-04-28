% Servidor - Sistema Experto de Nefrología
% Este archivo contiene la lógica del servidor

:- dynamic usuario/1.
:- dynamic paciente/1.

% Inicializar servidor
iniciar_servidor :-
    write('Servidor iniciado'),
    nl.

% Conectar usuario
conectar(Usuario) :-
    assert(usuario(Usuario)),
    write('Usuario conectado: '), write(Usuario), nl.
