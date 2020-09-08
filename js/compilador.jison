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
\'[^']*\'                   yytext = yytext.slice(1,-1);  return 'cadena';

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
"of"                        return 'of';
"in"                        return 'in';
"continue"                  return 'continue';
"break"                     return 'break';
"return"                    return 'return';
"switch"                    return 'switch';
"case"                      return 'case';
"default"                   return 'default';
"type"                      return 'type';
"pop"                       return 'pop';
"push"                      return 'push';

">"                         return 'mayor';
"<"                         return 'menor';
">="                        return 'mayorIgual';
"<="                        return 'menorIgual';
"=="                        return 'mismo';
"!="                        return 'diferente';

"&&"                        return 'and';
"||"                        return 'or';
"!"                         return 'not';

"?"                         return 'qEs';
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
"["                         return 'ca';
"]"                         return 'cc';
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
    INTRUCCIONES EOF {
                        agregarNodo("INTRUCCIONES",true);
                        agregarNodo("PROGRAMA",true);
                        console.log(codeAST);
                        arbol=codeAST;
                    }
    |EOF
;
INTRUCCIONES:
     FUNCIONES   INTRUCCIONES
    |LSENTENCIAS INTRUCCIONES
    |FUNCIONES
    |LSENTENCIAS                   {agregarNodo("LSENTENCIAS",true);}
;
LSENTENCIAS:
    SENTENCIAS LSENTENCIAS      {agregarNodo("SENTENCIAS",true);agregarNodo("LSENTENCIAS",true);}
    |SENTENCIAS                 {agregarNodo("SENTENCIAS",true);}
;
SENTENCIAS:
    CONSOLA                              //
    |VARIABLES eos                      {agregarNodo(";",false); agregarNodo("Variables",true);} 

    |F_LLAMADA  eos
    |ASIGNACION eos
    |GRAFICADOR
    |IF
    |WHILE
    |DO_WHILE
    |FOR
    |TYPE_CREAR
    |INCREMENTOS eos 
    |TRANSFERENCIAS eos
    |SWITCH
    |error eos                           {console.log("Recuperacion:  ");}
    |error llc                           {console.log("Recuperacion:  ");}
;
TYPE_CREAR:
    type id igual lla TYPE_ATRIBUTOS llc
;
TYPE_ATRIBUTOS:
     id dspts TIPO_DATO cm  TYPE_ATRIBUTOS
    |id dspts TIPO_DATO eos TYPE_ATRIBUTOS
    |id dspts TIPO_DATO     TYPE_ATRIBUTOS
    |id dspts TIPO_DATO
    |id dspts TIPO_DATO eos
;
GRAFICADOR:
    graficar_ts pa pc eos
;
CONSOLA:
    console pt log pa DATO pc eos  {$$=$5;}
;
SWITCH:
     switch pa DATO pc lla LISTA_CASES llc 
    |switch pa DATO pc lla LISTA_CASES DEFAULT_CASE llc 
;
LISTA_CASES:
     CASE LISTA_CASES 
    |CASE
;
CASE:
    case DATO dspts LSENTENCIAS
;
DEFAULT_CASE:
    default dspts LSENTENCIAS
;
TRANSFERENCIAS:
    continue 
    |break 
    |return 
    |return DATO 
;
FOR:
     for pa FOR_ASIGNACION eos CONDICION eos FOR_INCREMENTO  pc lla LSENTENCIAS llc 
    |for pa FOR_ASIGNACION in id pc lla LSENTENCIAS llc
    |for pa FOR_ASIGNACION of id pc lla LSENTENCIAS llc 
    |for pa FOR_ASIGNACION eos CONDICION eos FOR_INCREMENTO  pc lla              Sllc 
;
FOR_ASIGNACION:
    VARIABLES
    |ASIGNACION
;

FOR_INCREMENTO:
    INCREMENTOS
    |ASIGNACION
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
     id igual DATO 
    |id igual lla TYPE_CONTENIDO llc
    |id ca NUMEROS cc igual DATO
;
TYPE_CONTENIDO:
     id dspts DATO cm TYPE_CONTENIDO
    |id dspts DATO
;
VARIABLES:
    VARIABLES_ACCESO  VARIABLES_CUERPO             
;
VARIABLES_CUERPO:
     id            {agregarNodo($1,false);}
    |id ca cc 

    |id VARIABLES_ASIGNACION
    |id ca cc VARIABLES_ASIGNACION

    |id VARIABLES_TIPO 
    |id VARIABLES_TIPO VARIABLES_ASIGNACION

    |id cm VARIABLES_CUERPO
    |id ca cc cm VARIABLES_CUERPO

    |id VARIABLES_ASIGNACION cm VARIABLES_CUERPO
    |id ca cc VARIABLES_ASIGNACION cm VARIABLES_CUERPO

    |id VARIABLES_TIPO cm VARIABLES_CUERPO
    |id VARIABLES_TIPO VARIABLES_ASIGNACION cm VARIABLES_CUERPO
;
VARIABLES_ACCESO:
    let                 {agregarNodo($1,false);}
    |var                {agregarNodo($1,false);}
    |const              {agregarNodo($1,false);}
;
VARIABLES_TIPO:
     dspts TIPO_DATO
    |dspts TIPO_DATO ca cc 
;
VARIABLES_ASIGNACION:
    igual DATO
    | igual CONDICION
    | igual lla TYPE_CONTENIDO llc
    | igual lla  llc
    | igual ca ARRAY_CONTENIDO cc
    | igual ca  cc
;
ARRAY_CONTENIDO:
     DATO
    |DATO cm ARRAY_CONTENIDO
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
      function TIPO_FUNCION id pa PARAMETROS pc lla ISTR_FUNCION llc 
    | function TIPO_FUNCION id pa PARAMETROS pc lla              llc 

    | function TIPO_FUNCION  id pa  pc lla ISTR_FUNCION llc 
    | function TIPO_FUNCION  id pa  pc lla              llc
;
ISTR_FUNCION:
     LSENTENCIAS ISTR_FUNCION
    |FUNCIONES   ISTR_FUNCION
    |LSENTENCIAS
    |FUNCIONES
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
    |CONDICION
    |id ca NUMEROS cc
    |id ca NUMEROS cc PROPIEDADES
    |id PROPIEDADES
    |OP_TERNARIO
;

NUMEROS:
    menos NUMEROS %prec unmenos
    |mas   NUMEROS 
    |por por NUMEROS

    |NUMEROS modular NUMEROS

    |NUMEROS mas     NUMEROS
    |NUMEROS menos   NUMEROS

    |NUMEROS por   NUMEROS
    |NUMEROS div   NUMEROS

    |pa NUMEROS pc
    |numero
    |id
    |F_LLAMADA
    |id ca NUMEROSS cc
    |id PROPIEDADES
    |id ca NUMEROSS cc PROPIEDADES

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
    |id
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
PROPIEDADES:  
      pt id 
    | pt id ca NUMEROS cc 
    | pt id PROPIEDADES
    | pt id ca NUMEROS cc PROPIEDADES
    | pt pop pa pc PROPIEDADES
    | pt push pa pc PROPIEDADES
    | pt pop pa pc 
    | pt push pa pc 
;
OP_TERNARIO:
    DATO qEs DATO dspts DATO
;
/*
function a(){

}
let a;
function a(){
  function a(){
    
    }  
}

*/