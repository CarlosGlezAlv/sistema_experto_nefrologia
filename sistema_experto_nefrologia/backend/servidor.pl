% ==========================================
% servidor.pl
% ==========================================
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_json)).
:- use_module(library(http/http_cors)).

:- ensure_loaded('motor_inferencia.pl'). % Carga la lógica

% Permitir que el frontend se comunique sin bloqueos de seguridad
:- set_setting(http:cors, [*]).

% Define la URL (Endpoint) donde escuchará el servidor
:- http_handler('/api/consulta', procesar_consulta, [method(post)]).

% Predicado para arrancar el servidor web
iniciar_backend :-
    http_server(http_dispatch, [port(8080)]),
    writeln('Servidor Prolog corriendo en http://localhost:8080').

% Función que procesa el JSON del frontend
procesar_consulta(Request) :-
    cors_enable,
    http_read_json_dict(Request, DictIn),
    RespuestasSi = DictIn.si,
    RespuestasNo = DictIn.no,
    
    % Llama al motor de inferencia
    evaluar_estado(RespuestasSi, RespuestasNo, RespuestaJSON),
    
    % Devuelve el resultado al frontend
    reply_json(RespuestaJSON).
