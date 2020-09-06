%lex
%options case-sensitive
%option yylineno
%locations
%x string
%%
\s+                                                 //Omitir espacios en blanco
[0-9]+("."[0-9]+)?\b        return 'numero';              //Reconocimiento de numeros
"console"                   return 'console';
"log"                       return 'log';
"true"                      return 'true';
"false"                     return 'false';
\"[^"]*\"                   yytext = yytext.slice(1,-1);  return 'cadena';


"number"                    return 'number';
"boolean"                   return 'boolean';
[S|s]"tring"                return 'string';

"function"                  return 'function';
"void"                      return 'void';
"var"                       return 'var';
"let"                       return 'let';
"const"                     return 'const';
"type"                      return 'type';
"graficar_ts"               return 'graficar_ts';
"if"                        return 'if';
"else"                      return 'else';
"while"                     return 'while';
"do"                        return 'do';
"for"                       return 'for';

">"                         return 'mayor';
"<"                         return 'menor';
">="                        return 'mayorIgual';
"<="                        return 'menorIgual';
"=="                        return 'mismo';
"!="                        return 'diferente';

"&&"                        return 'and';
"||"                        return 'or';
"!"                         return 'not';

"."                         return 'pt';
","                         return 'cm';
"("                         return 'pa';
")"                         return 'pc';
"+"                         return 'mas';
"*"                         return 'por';
"/"                         return 'div';
"-"                         return 'menos';
"%"                         return 'modular';
":"                         return 'dspts';
"{"                         return 'lla';
"}"                         return 'llc';
"="                         return 'igual';
";"                         return 'eos';
([a-zA-Z])[a-zA-Z0-9_]*	    return 'id';
<<EOF>>                     return 'EOF';                 //End Of File
/lex

%left 'mas' 'menos'
%left 'por' 'div'
%left unmenos
%left 'modular'
%left 'or'
%left 'and'
%left 'not'

%start PROGRAMA

%% /* language grammar */

PROGRAMA:   
    LSENTENCIAS EOF {console.log("Todo bien hasta ahora");}
    |EOF
;

LSENTENCIAS:
    SENTENCIAS LSENTENCIAS
    |SENTENCIAS
;
SENTENCIAS:
    CONSOLA                              //
    |VARIABLES                           //Ingresar al entorno qu le corresponde
    |FUNCIONES
    |F_LLAMADA eos
    |ASIGNACION
    |GRAFICADOR
    |IF
    |WHILE
    |DO_WHILE
    |FOR
    |error eos                           {console.log("Recuperacion:  ");}
;
GRAFICADOR:
    graficar_ts pa pc eos
;
CONSOLA:
    console pt log pa DATO pc eos  {$$=$5;}
;
FOR:
    for pa  pc lla LSENTENCIAS llc 
;
DO_WHILE:
     do lla LSENTENCIAS llc while pa CONDICION pc
    |do lla llc while pa CONDICION pc
;
IF:
     if pa CONDICION pc lla LSENTENCIAS llc 
    |if pa CONDICION pc lla LSENTENCIAS llc ELSE
    |if pa CONDICION pc lla             llc 
    |if pa CONDICION pc lla             llc ELSE
;
ELSE:
     else IF
    |else lla LSENTENCIAS llc 
    |else lla             llc 
;
WHILE:
    while pa CONDICION pc lla LSENTENCIAS llc
    |while pa CONDICION pc lla LSENTENCIAS llc
;
ASIGNACION:
    id igual DATO eos
;
VARIABLES:
    VARIABLES_ACCESO VARIABLES_CUERPO eos
;
VARIABLES_CUERPO:
    id
    |id VARIABLES_ASIGNACION
    |id VARIABLES_TIPO 
    |id VARIABLES_TIPO VARIABLES_ASIGNACION

    |id cm VARIABLES_CUERPO
    |id VARIABLES_ASIGNACION cm VARIABLES_CUERPO
    |id VARIABLES_TIPO cm VARIABLES_CUERPO
    |id VARIABLES_TIPO VARIABLES_ASIGNACION cm VARIABLES_CUERPO
;
VARIABLES_ACCESO:
    let
    |var
    |const
;
VARIABLES_TIPO:
    dspts TIPO_DATO
;
VARIABLES_ASIGNACION:
    igual DATO
    | igual CONDICION
;
PARAMETROS:
    DATO
    | DATO dspts TIPO_DATO 
    | DATO cm PARAMETROS
    | DATO dspts TIPO_DATO cm PARAMETROS
;
TIPO_FUNCION:
    dspts boolean
    |dspts string
    |dspts number
    |dspts void
    |dspts type
    |
;
FUNCIONES:
      function TIPO_FUNCION id pa PARAMETROS pc lla LSENTENCIAS llc 
    | function TIPO_FUNCION  id pa PARAMETROS pc lla  llc 
    | function TIPO_FUNCION id pa  pc lla LSENTENCIAS llc 
    | function TIPO_FUNCION  id pa  pc lla  llc 
;

//Cosas generales
DATO:
    cadena
    |DATO mas DATO             {$$=$1+$3;}
    |NUMEROS
    |id
    |true
    |false
    |F_LLAMADA
;

NUMEROS:
    menos NUMEROS %prec unmenos
    |mas   NUMEROS 
    |por por NUMEROS

    |id mas mas

    |NUMEROS modular NUMEROS

    |NUMEROS mas     NUMEROS
    |NUMEROS menos   NUMEROS

    |NUMEROS por   NUMEROS
    |NUMEROS div   NUMEROS

    |pa NUMEROS pc
    |numero
    |id
    |F_LLAMADA

;
INCREMENTOS:
     id mas mas
    |id menos menos
    |INCREMENTOS mas mas     
    |INCREMENTOS menos menos 
;
TIPO_DATO:
    boolean
    |string
    |number
;
COMPARACION:
    DATO menor DATO
    |DATO mayor DATO

    |DATO menorIgual DATO
    |DATO mayorIgual DATO

    |DATO mismo DATO
    |DATO diferente DATO
;
CONDICION:
    CONDICION and CONDICION
    |CONDICION or CONDICION
    |not CONDICION
    |DATO
    |COMPARACION
    |pa CONDICION pc
;
F_LLAMADA:
    id pa pc
    |id pa PARAMETROS pc
;