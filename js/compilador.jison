%lex
%options case-sensitive
%option yylineno
%locations
%x string
%%
\s+                                                       //Omitir espacios en blanco
"//".*										              //comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]			              //comentario multiple líneas
[0-9]+("."[0-9]+)?\b        return 'numero';              //Reconocimiento de numeros
"console"                   return 'console';
"log"                       return 'log';
"true"                      return 'true';
"false"                     return 'false';
\"[^"]*\"                   yytext = yytext.slice(1,-1);  return 'cadena';
\'[^']*\'                   yytext = yytext.slice(1,-1);  return 'cadena';

[N|n]"umber"                    return 'number';
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
    |INST_CREAR_VARIABLES                        {$$=$1;}
    |INST_ASIGNAR_VARIABLES                      {$$=$1;}
    |GRAFICADOR                                  {$$=$1;}
    |IF                                          {$$=$1;}

    |error eos                                   {$$=instruccionesAST.saltoError(); reportarError("Sintactico", "Linea mal escrita:<br>"+editor.getLine(this._$.first_line-1), this._$.first_column, this._$.first_line-1);}
;

CONSOLA:
     console pt log pa DATO_CONSOL pc eos               { $$ = instruccionesAST.nuevoImprimir($5);}
;
DATO_CONSOL:
        EXP_CADENA                                  { $$ = $1; }
//        |DATO_CONSOL mas   DATO_CONSOL              { $$ = instruccionesAST.nuevoOperacionBinaria($1,$3,TIPO_OPERACION.CONCATENACION);}
        |DATO_CONSOL cm DATO_CONSOL                 { $$ = instruccionesAST.nuevoOperacionBinaria($1,$3,TIPO_OPERACION.CONCATENACION);}
        |EXP_NUMERICA                               { $$ = $1; }
//        |CONDICION                                  { $$ = $1; }
;
DATO:
        EXP_CADENA                                  { $$ = $1; }
        |EXP_NUMERICA                               { $$ = $1; }
//        |CONDICION                                  { $$ = $1; }
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
    |id                                         { $$ = instruccionesAST.nuevoValor($1,TIPO_VALOR.IDENTIFICADOR)}
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
//    |false                                          { $$ = instruccionesAST.nuevoValor($1,TIPO_VALOR.BOOLEANO);}
//    |true                                           { $$ = instruccionesAST.nuevoValor($1,TIPO_VALOR.BOOLEANO);}
;
DATO_COMPARACION:
     EXP_CADENA                                 { $$ = $1; }
    |EXP_NUMERICA                               { $$ = $1; }
    |false                                      { $$ = instruccionesAST.nuevoValor($1,TIPO_VALOR.BOOLEANO);}
    |true                                       { $$ = instruccionesAST.nuevoValor($1,TIPO_VALOR.BOOLEANO);}
;

INST_CREAR_VARIABLES:
    VARIABLES_ACCESO VARIABLES_CUERPO eos	{ $$ = instruccionesAST.nuevaVariable($1,$2); }            
;

VARIABLES_ACCESO:
     let            {$$ = $1;}
    |var            {$$ = $1;}
    |const          {$$ = $1;}
;

VARIABLES_CUERPO:
     id                                                                 { $$ = [ instruccionesAST.crearVariable($1,null,null) ];}
    |id VARIABLES_ASIGNACION                                            { $$ = [ instruccionesAST.crearVariable($1,null,$2) ];}
    |id VARIABLES_TIPO                                                  { $$ = [ instruccionesAST.crearVariable($1,$2,null) ];}
    |id VARIABLES_TIPO VARIABLES_ASIGNACION                             { $$ = [ instruccionesAST.crearVariable($1,$2,$3) ];}

    |id cm VARIABLES_CUERPO                                             { $3.push(instruccionesAST.crearVariable($1,null,null)); $$ = $3;}
    |id VARIABLES_ASIGNACION cm VARIABLES_CUERPO                        { $4.push(instruccionesAST.crearVariable($1,null,$2)); $$ = $4;}
    |id VARIABLES_TIPO cm VARIABLES_CUERPO                              { $4.push(instruccionesAST.crearVariable($1,$2,null)); $$ = $4;}
    |id VARIABLES_TIPO VARIABLES_ASIGNACION cm VARIABLES_CUERPO         { $5.push(instruccionesAST.crearVariable($1,$2,$3)); $$ = $5;}
;

VARIABLES_TIPO:
    dspts TIPO_DATO                                                     { $$ = $2;}
;
TIPO_DATO:
     boolean    { $$ = $1;}
    |string     { $$ = $1;}
    |number     { $$ = $1;}
;

VARIABLES_ASIGNACION:
     igual DATO     { $$ = $2;}
;
GRAFICADOR:
    graficar_ts pa pc eos   { $$ = instruccionesAST.graficar_ts(); }
;

INST_ASIGNAR_VARIABLES:
    ASIGNACION eos                                { $$ = instruccionesAST.nuevasAsignaciones($1);}             
;
ASIGNACION:
     id VARIABLES_ASIGNACION                      { $$ = [instruccionesAST.nuevaAsignacion($1,$2)];}
    |id VARIABLES_ASIGNACION cm ASIGNACION        { $4.push(instruccionesAST.nuevaAsignacion($1,$2)); $$ = $4;}
;
IF:
     if pa CONDICION pc lla LSENTENCIAS llc       { $$ = instruccionesAST.nuevoIf($3,$6,"null");}
    |if pa CONDICION pc lla LSENTENCIAS llc ELSE  { $$ = instruccionesAST.nuevoIf($3,$6,$8)}
;
ELSE:
     else IF                    {$$ = $2;}
    |else lla LSENTENCIAS llc   {$$ = instruccionesAST.nuevoElse($3);}
;

WHILE:
    while pa CONDICION pc lla LSENTENCIAS llc     { $$ = ;}
;