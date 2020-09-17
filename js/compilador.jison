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

">="                        return 'mayorIgual';
"<="                        return 'menorIgual';
"=="                        return 'mismo';
"!="                        return 'diferente';
">"                         return 'mayor';
"<"                         return 'menor';


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
.                           {reportarError("Lexico", "Caracter no reconocido por el lenguaje <br>"+yytext, yylloc.first_column, yylloc.first_line);}
/lex

%left 'mayor' 'mayorIgual' 'menor' 'menorIgual' 'cm'
%left 'mismo' 'diferente'
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
    LSENTENCIAS EOF                             { return $1;}
;

LSENTENCIAS:
     LSENTENCIAS SENTENCIAS                     { $1.push($2); $$ = $1; }
    |SENTENCIAS                                 { $$ = [$1]; }
;
SENTENCIAS:
     CONSOLA                                     {$$=$1;}
    |error eos                                   {$$=instruccionesAST.saltoError(); reportarError("Sintactico", "Linea mal escrita:<br>"+editor.getLine(this._$.first_line-1), this._$.first_column, this._$.first_line-1);}
;

CONSOLA:
    console pt log pa DATO pc eos               { $$ = instruccionesAST.nuevoImprimir($5);}
;
DATO:
        EXP_CADENA                                  { $$ = $1; }
        |DATO mas   DATO                            { $$ = instruccionesAST.nuevoOperacionBinaria($1,$3,TIPO_OPERACION.CONCATENACION);}
        |DATO cm DATO                               { $$ = instruccionesAST.nuevoOperacionBinaria($1,$3,TIPO_OPERACION.CONCATENACION);}
        |EXP_NUMERICA                               { $$ = $1; }
        |CONDICION                                  { $$ = $1; }
;

EXP_CADENA:
     cadena                                     { $$ = instruccionesAST.nuevoValor($1,TIPO_VALOR.CADENA);}
;
EXP_NUMERICA:
     numero                                     { $$ = instruccionesAST.nuevoValor(Number($1), TIPO_VALOR.NUMERO); }
    |EXP_NUMERICA mas   EXP_NUMERICA            { $$ = instruccionesAST.nuevoOperacionBinaria($1,$3,TIPO_OPERACION.SUMA);}
    |EXP_NUMERICA menos   EXP_NUMERICA          { $$ = instruccionesAST.nuevoOperacionBinaria($1,$3,TIPO_OPERACION.RESTA);}
    |EXP_NUMERICA por   EXP_NUMERICA            { $$ = instruccionesAST.nuevoOperacionBinaria($1,$3,TIPO_OPERACION.MULTIPLICACION);}
    |EXP_NUMERICA div   EXP_NUMERICA            { $$ = instruccionesAST.nuevoOperacionBinaria($1,$3,TIPO_OPERACION.DIVISION);}
    |menos EXP_NUMERICA %prec UMENOS		    { $$ = instruccionesAST.nuevoOperacionUnaria($2, TIPO_OPERACION.NEGATIVO); }
    |pa EXP_NUMERICA pc                         { $$ = $2;}
;
CONDICION:
     CONDICION and CONDICION                    { $$ = instruccionesAST.nuevoOperacionBinaria($1,$3,TIPO_OPERACION.AND);}
    |CONDICION or CONDICION                     { $$ = instruccionesAST.nuevoOperacionBinaria($1,$3,TIPO_OPERACION.OR);}
    |not CONDICION                              { $$ = instruccionesAST.nuevoOperacionUnaria($2,TIPO_OPERACION.NEGACION);}
    |COMPARACION                                { $$ = $1;}
    |pa CONDICION pc                            { $$ = $2;}
    
;
COMPARACION:
     EXP_NUMERICA menor         EXP_NUMERICA        { $$ = instruccionesAST.nuevoOperacionBinaria($1,$3,TIPO_OPERACION.MENOR_QUE);}
    |EXP_NUMERICA mayor         EXP_NUMERICA        { $$ = instruccionesAST.nuevoOperacionBinaria($1,$3,TIPO_OPERACION.MAYOR_QUE);}
    |EXP_NUMERICA menorIgual    EXP_NUMERICA        { $$ = instruccionesAST.nuevoOperacionBinaria($1,$3,TIPO_OPERACION.MENOR_IGUAL);}
    |EXP_NUMERICA mayorIgual    EXP_NUMERICA        { $$ = instruccionesAST.nuevoOperacionBinaria($1,$3,TIPO_OPERACION.MAYOR_IGUAL);}
    |DATO_COMPARACION mismo DATO_COMPARACION        { $$ = instruccionesAST.nuevoOperacionBinaria($1,$3,TIPO_OPERACION.IGUAL);}
    |DATO_COMPARACION diferente DATO_COMPARACION    { $$ = instruccionesAST.nuevoOperacionBinaria($1,$3,TIPO_OPERACION.DIFERENTE);}
    |false                                          { $$ = instruccionesAST.nuevoValor($1,TIPO_VALOR.BOOLEANO);}
    |true                                           { $$ = instruccionesAST.nuevoValor($1,TIPO_VALOR.BOOLEANO);}
;
DATO_COMPARACION:
     EXP_CADENA                                 { $$ = $1; }
    |EXP_NUMERICA                               { $$ = $1; }
    |false                                      { $$ = instruccionesAST.nuevoValor($1,TIPO_VALOR.BOOLEANO);}
    |true                                       { $$ = instruccionesAST.nuevoValor($1,TIPO_VALOR.BOOLEANO);}
;