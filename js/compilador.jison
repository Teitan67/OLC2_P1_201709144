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

\"[^"]*\"         yytext = yytext.slice(1,-1); return 'cadena';



"."                         {}
"("                         {}
")"                         {}
"+"                         {}
";"                         return 'EOS';
<<EOF>>                     return 'EOF';                 //End Of File
/lex

%start PROGRAMA

%% /* language grammar */

PROGRAMA:   
    LSENTENCIAS EOF {console.log("Todo bien hasta ahora");}
;
LSENTENCIAS:
    SENTENCIAS LSENTENCIAS
    |SENTENCIAS
;
SENTENCIAS:
    consola {consolAdd($1);}
;
consola:
    console . log (impresion ) EOS {$$=$3;}
;
 impresion:
    impresion + impresion
    cadena
 ;
