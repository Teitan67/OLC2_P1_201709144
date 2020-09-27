/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var compilador = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,15],$V1=[1,22],$V2=[1,24],$V3=[1,25],$V4=[1,26],$V5=[1,18],$V6=[1,19],$V7=[1,20],$V8=[1,21],$V9=[1,23],$Va=[5,19,36,55,56,57,66,68,70,74,75,76],$Vb=[10,24],$Vc=[1,38],$Vd=[1,39],$Ve=[1,42],$Vf=[2,52],$Vg=[1,49],$Vh=[1,50],$Vi=[1,55],$Vj=[1,65],$Vk=[1,58],$Vl=[1,59],$Vm=[1,60],$Vn=[1,61],$Vo=[1,53],$Vp=[1,63],$Vq=[1,64],$Vr=[1,71],$Vs=[1,80],$Vt=[1,87],$Vu=[1,94],$Vv=[1,95],$Vw=[10,24,40,41],$Vx=[49,50],$Vy=[2,45],$Vz=[1,103],$VA=[1,104],$VB=[1,105],$VC=[1,106],$VD=[1,107],$VE=[1,99],$VF=[1,100],$VG=[1,101],$VH=[1,102],$VI=[10,24,26,31,32,33,34,35,38,40,41,44,45,46,47,49,50],$VJ=[10,24,40,41,49,50],$VK=[10,24,26,38],$VL=[22,29,30,32,33,36,42,51,52],$VM=[10,26,65],$VN=[1,133],$VO=[10,24,26,31,32,38,40,41,44,45,46,47,49,50],$VP=[24,26],$VQ=[10,24,26,31,32,33,34,38,40,41,44,45,46,47,49,50];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"PROGRAMA":3,"LSENTENCIAS":4,"EOF":5,"SENTENCIAS":6,"INST_CONSOLA":7,"INST_CREAR_VARIABLES":8,"INST_ASIGNAR_VARIABLES":9,"eos":10,"INST_GRAFICADOR":11,"INST_IF":12,"INST_WHILE":13,"INST_DO_WHILE":14,"INST_INCREMENTO":15,"INST_FOR":16,"INST_CREAR_ARREGLO":17,"INST_ASIGNAR_ARREGLO":18,"console":19,"pt":20,"log":21,"pa":22,"DATO_CONSOL":23,"pc":24,"EXP_CADENA":25,"cm":26,"EXP_NUMERICA":27,"DATO":28,"cadena":29,"numero":30,"mas":31,"menos":32,"por":33,"div":34,"modular":35,"id":36,"ca":37,"cc":38,"CONDICION":39,"and":40,"or":41,"not":42,"COMPARACION":43,"menor":44,"mayor":45,"menorIgual":46,"mayorIgual":47,"DATO_COMPARACION":48,"mismo":49,"diferente":50,"false":51,"true":52,"VARIABLES_ACCESO":53,"VARIABLES_CUERPO":54,"let":55,"var":56,"const":57,"VARIABLES_ASIGNACION":58,"VARIABLES_TIPO":59,"dspts":60,"TIPO_DATO":61,"boolean":62,"string":63,"number":64,"igual":65,"graficar_ts":66,"ASIGNACION":67,"if":68,"lla":69,"llc":70,"ELSE":71,"else":72,"IF":73,"while":74,"do":75,"for":76,"FOR_ASIGNACION":77,"FOR_AUMENTO":78,"ARREGLO_DATOS":79,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",10:"eos",19:"console",20:"pt",21:"log",22:"pa",24:"pc",26:"cm",29:"cadena",30:"numero",31:"mas",32:"menos",33:"por",34:"div",35:"modular",36:"id",37:"ca",38:"cc",40:"and",41:"or",42:"not",44:"menor",45:"mayor",46:"menorIgual",47:"mayorIgual",49:"mismo",50:"diferente",51:"false",52:"true",55:"let",56:"var",57:"const",60:"dspts",62:"boolean",63:"string",64:"number",65:"igual",66:"graficar_ts",68:"if",69:"lla",70:"llc",72:"else",73:"IF",74:"while",75:"do",76:"for"},
productions_: [0,[3,2],[4,2],[4,1],[6,1],[6,1],[6,2],[6,1],[6,1],[6,1],[6,1],[6,2],[6,1],[6,1],[6,1],[7,7],[23,1],[23,3],[23,1],[28,1],[28,1],[25,1],[27,1],[27,3],[27,3],[27,3],[27,3],[27,2],[27,3],[27,3],[27,1],[27,3],[27,4],[39,3],[39,3],[39,2],[39,1],[39,3],[43,3],[43,3],[43,3],[43,3],[43,3],[43,3],[48,1],[48,1],[48,1],[48,1],[8,3],[53,1],[53,1],[53,1],[54,1],[54,2],[54,2],[54,3],[54,3],[54,4],[54,4],[54,5],[59,2],[61,1],[61,1],[61,1],[58,2],[11,4],[9,1],[67,2],[67,4],[12,7],[12,8],[71,2],[71,4],[13,7],[14,8],[15,3],[15,3],[16,10],[77,1],[77,2],[78,1],[78,1],[17,5],[17,6],[17,9],[17,10],[79,3],[79,1],[18,7]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 return $$[$0-1];
break;
case 2:
 $$[$0-1].push($$[$0]); this.$ = $$[$0-1]; 
break;
case 3:
 this.$ = [$$[$0]]; 
break;
case 4: case 5: case 7: case 8: case 9: case 10: case 12: case 13: case 14: case 78: case 80: case 81:
this.$=$$[$0];
break;
case 6: case 11: case 79:
this.$=$$[$0-1];
break;
case 15:
 this.$ = instruccionesAST.nuevoImprimir($$[$0-2]);
break;
case 16: case 18: case 19: case 20: case 44: case 45:
 this.$ = $$[$0]; 
break;
case 17:
 this.$ = instruccionesAST.nuevoOperacionBinaria($$[$0-2],$$[$0],TIPO_OPERACION.CONCATENACION);
break;
case 21:
 this.$ = instruccionesAST.nuevoValor($$[$0],TIPO_VALOR.CADENA);
break;
case 22:
 this.$ = instruccionesAST.nuevoValor(Number($$[$0]), TIPO_VALOR.NUMERO); 
break;
case 23:
 this.$ = instruccionesAST.nuevoOperacionBinaria($$[$0-2],$$[$0],TIPO_OPERACION.SUMA);
break;
case 24:
 this.$ = instruccionesAST.nuevoOperacionBinaria($$[$0-2],$$[$0],TIPO_OPERACION.RESTA);
break;
case 25:
 this.$ = instruccionesAST.nuevoOperacionBinaria($$[$0-2],$$[$0],TIPO_OPERACION.MULTIPLICACION);
break;
case 26:
 this.$ = instruccionesAST.nuevoOperacionBinaria($$[$0-2],$$[$0],TIPO_OPERACION.DIVISION);
break;
case 27:
 this.$ = instruccionesAST.nuevoOperacionUnaria($$[$0], TIPO_OPERACION.NEGATIVO); 
break;
case 28:
 this.$ = instruccionesAST.nuevoOperacionUnaria($$[$0],TIPO_OPERACION.POTENCIA);
break;
case 29:
 this.$ = instruccionesAST.nuevoOperacionBinaria($$[$0-2],$$[$0],TIPO_OPERACION.MODULAR);
break;
case 30:
 this.$ = instruccionesAST.nuevoValor($$[$0],TIPO_VALOR.IDENTIFICADOR)
break;
case 31: case 37:
 this.$ = $$[$0-1];
break;
case 32:
 this.$ = instruccionesAST.nuevoValorArreglo($$[$0-3],$$[$0-1], TIPO_VALOR.ARREGLO);
break;
case 33:
 this.$ = instruccionesAST.nuevoOperacionBinaria($$[$0-2],$$[$0],TIPO_OPERACION.AND);
break;
case 34:
 this.$ = instruccionesAST.nuevoOperacionBinaria($$[$0-2],$$[$0],TIPO_OPERACION.OR);
break;
case 35:
 this.$ = instruccionesAST.nuevoOperacionUnaria($$[$0],TIPO_OPERACION.NEGACION);
break;
case 36: case 60: case 61: case 62: case 63: case 64:
 this.$ = $$[$0];
break;
case 38:
 this.$ = instruccionesAST.nuevoOperacionBinaria($$[$0-2],$$[$0],TIPO_OPERACION.MENOR_QUE);
break;
case 39:
 this.$ = instruccionesAST.nuevoOperacionBinaria($$[$0-2],$$[$0],TIPO_OPERACION.MAYOR_QUE);
break;
case 40:
 this.$ = instruccionesAST.nuevoOperacionBinaria($$[$0-2],$$[$0],TIPO_OPERACION.MENOR_IGUAL);
break;
case 41:
 this.$ = instruccionesAST.nuevoOperacionBinaria($$[$0-2],$$[$0],TIPO_OPERACION.MAYOR_IGUAL);
break;
case 42:
 this.$ = instruccionesAST.nuevoOperacionBinaria($$[$0-2],$$[$0],TIPO_OPERACION.IGUAL);
break;
case 43:
 this.$ = instruccionesAST.nuevoOperacionBinaria($$[$0-2],$$[$0],TIPO_OPERACION.DIFERENTE);
break;
case 46: case 47:
 this.$ = instruccionesAST.nuevoValor($$[$0],TIPO_VALOR.BOOLEANO);
break;
case 48:
 this.$ = instruccionesAST.nuevaVariable($$[$0-2],$$[$0-1]); 
break;
case 49: case 50: case 51: case 71:
this.$ = $$[$0];
break;
case 52:
 this.$ = [ instruccionesAST.crearVariable($$[$0],null,null) ];
break;
case 53:
 this.$ = [ instruccionesAST.crearVariable($$[$0-1],null,$$[$0]) ];
break;
case 54:
 this.$ = [ instruccionesAST.crearVariable($$[$0-1],$$[$0],null) ];
break;
case 55:
 this.$ = [ instruccionesAST.crearVariable($$[$0-2],$$[$0-1],$$[$0]) ];
break;
case 56:
 $$[$0].push(instruccionesAST.crearVariable($$[$0-2],null,null)); this.$ = $$[$0];
break;
case 57:
 $$[$0].push(instruccionesAST.crearVariable($$[$0-3],null,$$[$0-2])); this.$ = $$[$0];
break;
case 58:
 $$[$0].push(instruccionesAST.crearVariable($$[$0-3],$$[$0-2],null)); this.$ = $$[$0];
break;
case 59:
 $$[$0].push(instruccionesAST.crearVariable($$[$0-4],$$[$0-3],$$[$0-2])); this.$ = $$[$0];
break;
case 65:
 this.$ = instruccionesAST.graficar_ts(); 
break;
case 66:
 this.$ = instruccionesAST.nuevasAsignaciones($$[$0]);
break;
case 67:
 this.$ = [instruccionesAST.nuevaAsignacion($$[$0-1],$$[$0])];
break;
case 68:
 $$[$0].push(instruccionesAST.nuevaAsignacion($$[$0-3],$$[$0-2])); this.$ = $$[$0];
break;
case 69:
 this.$ = instruccionesAST.nuevoIf($$[$0-4],$$[$0-1],"null");
break;
case 70:
 this.$ = instruccionesAST.nuevoIf($$[$0-5],$$[$0-2],$$[$0])
break;
case 72:
this.$ = instruccionesAST.nuevoElse($$[$0-1]);
break;
case 73:
 this.$ = instruccionesAST.nuevoWhile($$[$0-4],$$[$0-1]);
break;
case 74:
 this.$ = instruccionesAST.nuevoDoWhile($$[$0-1],$$[$0-5]);
break;
case 75:
 this.$ = instruccionesAST.nuevoIncremento($$[$0-2]);
break;
case 76:
 this.$ = instruccionesAST.nuevoDecremento($$[$0-2]);
break;
case 77:
this.$ = instruccionesAST.nuevoFor($$[$0-7],$$[$0-6],$$[$0-4],$$[$0-1]);
break;
case 82:
this.$=instruccionesAST.nuevoArreglo($$[$0-4],$$[$0-3],null,[]);
break;
case 83:
this.$=instruccionesAST.nuevoArreglo($$[$0-5],$$[$0-4],$$[$0-1],[]);
break;
case 84:
this.$=instruccionesAST.nuevoArreglo($$[$0-8],$$[$0-7],null,$$[$0-2]);
break;
case 85:
this.$=instruccionesAST.nuevoArreglo($$[$0-9],$$[$0-8],$$[$0-5],$$[$0-2]);
break;
case 86:
 $$[$0].push($$[$0-2]); this.$ = $$[$0];
break;
case 87:
 this.$ = [$$[$0]];
break;
case 88:
 this.$ = instruccionesAST.nuevaAsignacionArreglo($$[$0-6],$$[$0-4],$$[$0-1]);
break;
}
},
table: [{3:1,4:2,6:3,7:4,8:5,9:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:$V0,36:$V1,53:16,55:$V2,56:$V3,57:$V4,66:$V5,67:17,68:$V6,74:$V7,75:$V8,76:$V9},{1:[3]},{5:[1,27],6:28,7:4,8:5,9:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:$V0,36:$V1,53:16,55:$V2,56:$V3,57:$V4,66:$V5,67:17,68:$V6,74:$V7,75:$V8,76:$V9},o($Va,[2,3]),o($Va,[2,4]),o($Va,[2,5]),{10:[1,29]},o($Va,[2,7]),o($Va,[2,8]),o($Va,[2,9]),o($Va,[2,10]),{10:[1,30]},o($Va,[2,12]),o($Va,[2,13]),o($Va,[2,14]),{20:[1,31]},{36:[1,33],54:32},o($Vb,[2,66]),{22:[1,34]},{22:[1,35]},{22:[1,36]},{69:[1,37]},{31:$Vc,32:$Vd,37:[1,40],58:41,65:$Ve},{22:[1,43]},{36:[2,49]},{36:[2,50]},{36:[2,51]},{1:[2,1]},o($Va,[2,2]),o($Va,[2,6]),o($Va,[2,11]),{21:[1,44]},{10:[1,45]},{10:$Vf,26:$Vg,37:[1,46],58:47,59:48,60:$Vh,65:$Ve},{24:[1,51]},{22:$Vi,25:62,27:56,29:$Vj,30:$Vk,32:$Vl,33:$Vm,36:$Vn,39:52,42:$Vo,43:54,48:57,51:$Vp,52:$Vq},{22:$Vi,25:62,27:56,29:$Vj,30:$Vk,32:$Vl,33:$Vm,36:$Vn,39:66,42:$Vo,43:54,48:57,51:$Vp,52:$Vq},{4:67,6:3,7:4,8:5,9:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:$V0,36:$V1,53:16,55:$V2,56:$V3,57:$V4,66:$V5,67:17,68:$V6,74:$V7,75:$V8,76:$V9},{31:[1,68]},{32:[1,69]},{22:$Vr,27:70,30:$Vk,32:$Vl,33:$Vm,36:$Vn},o($Vb,[2,67],{26:[1,72]}),{22:$Vr,25:74,27:75,28:73,29:$Vj,30:$Vk,32:$Vl,33:$Vm,36:$Vn},{8:77,9:78,36:$Vs,53:79,55:$V2,56:$V3,57:$V4,67:17,77:76},{22:[1,81]},o([5,19,22,29,30,32,33,36,42,51,52,55,56,57,66,68,70,74,75,76],[2,48]),{38:[1,82]},{10:[2,53],26:[1,83]},{10:[2,54],26:[1,85],58:84,65:$Ve},{36:$Vt,54:86},{61:88,62:[1,89],63:[1,90],64:[1,91]},{10:[1,92]},{24:[1,93],40:$Vu,41:$Vv},{22:$Vi,25:62,27:56,29:$Vj,30:$Vk,32:$Vl,33:$Vm,36:$Vn,39:96,42:$Vo,43:54,48:57,51:$Vp,52:$Vq},o($Vw,[2,36]),{22:$Vi,25:62,27:98,29:$Vj,30:$Vk,32:$Vl,33:$Vm,36:$Vn,39:97,42:$Vo,43:54,48:57,51:$Vp,52:$Vq},o($Vx,$Vy,{31:$Vz,32:$VA,33:$VB,34:$VC,35:$VD,44:$VE,45:$VF,46:$VG,47:$VH}),{49:[1,108],50:[1,109]},o($VI,[2,22]),{22:$Vr,27:110,30:$Vk,32:$Vl,33:$Vm,36:$Vn},{33:[1,111]},o($VI,[2,30],{37:[1,112]}),o($VJ,[2,44]),o($VJ,[2,46]),o($VJ,[2,47]),o([10,24,26,38,40,41,49,50],[2,21]),{24:[1,113],40:$Vu,41:$Vv},{6:28,7:4,8:5,9:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:$V0,36:$V1,53:16,55:$V2,56:$V3,57:$V4,66:$V5,67:17,68:$V6,70:[1,114],74:$V7,75:$V8,76:$V9},o($Vb,[2,75]),o($Vb,[2,76]),{31:$Vz,32:$VA,33:$VB,34:$VC,35:$VD,38:[1,115]},{22:$Vr,27:116,30:$Vk,32:$Vl,33:$Vm,36:$Vn},{36:$Vs,67:117},o([10,24,26],[2,64]),o($VK,[2,19]),o($VK,[2,20],{31:$Vz,32:$VA,33:$VB,34:$VC,35:$VD}),{22:$Vi,25:62,27:56,29:$Vj,30:$Vk,32:$Vl,33:$Vm,36:$Vn,39:118,42:$Vo,43:54,48:57,51:$Vp,52:$Vq},o($VL,[2,78]),{10:[1,119]},{36:$Vt,54:32},{58:41,65:$Ve},{22:$Vr,23:120,25:121,27:122,29:$Vj,30:$Vk,32:$Vl,33:$Vm,36:$Vn},{10:[1,123],59:124,60:$Vh,65:[1,125]},{36:$Vt,54:126},{10:[2,55],26:[1,127]},{36:$Vt,54:128},{10:[2,56]},{10:$Vf,26:$Vg,58:47,59:48,60:$Vh,65:$Ve},o($VM,[2,60]),o($VM,[2,61]),o($VM,[2,62]),o($VM,[2,63]),o($Va,[2,65]),{69:[1,129]},{22:$Vi,25:62,27:56,29:$Vj,30:$Vk,32:$Vl,33:$Vm,36:$Vn,39:130,42:$Vo,43:54,48:57,51:$Vp,52:$Vq},{22:$Vi,25:62,27:56,29:$Vj,30:$Vk,32:$Vl,33:$Vm,36:$Vn,39:131,42:$Vo,43:54,48:57,51:$Vp,52:$Vq},o($Vw,[2,35]),{24:[1,132],40:$Vu,41:$Vv},o($Vx,$Vy,{24:$VN,31:$Vz,32:$VA,33:$VB,34:$VC,35:$VD,44:$VE,45:$VF,46:$VG,47:$VH}),{22:$Vr,27:134,30:$Vk,32:$Vl,33:$Vm,36:$Vn},{22:$Vr,27:135,30:$Vk,32:$Vl,33:$Vm,36:$Vn},{22:$Vr,27:136,30:$Vk,32:$Vl,33:$Vm,36:$Vn},{22:$Vr,27:137,30:$Vk,32:$Vl,33:$Vm,36:$Vn},{22:$Vr,27:138,30:$Vk,32:$Vl,33:$Vm,36:$Vn},{22:$Vr,27:139,30:$Vk,32:$Vl,33:$Vm,36:$Vn},{22:$Vr,27:140,30:$Vk,32:$Vl,33:$Vm,36:$Vn},{22:$Vr,27:141,30:$Vk,32:$Vl,33:$Vm,36:$Vn},{22:$Vr,27:142,30:$Vk,32:$Vl,33:$Vm,36:$Vn},{22:$Vr,25:62,27:144,29:$Vj,30:$Vk,32:$Vl,33:$Vm,36:$Vn,48:143,51:$Vp,52:$Vq},{22:$Vr,25:62,27:144,29:$Vj,30:$Vk,32:$Vl,33:$Vm,36:$Vn,48:145,51:$Vp,52:$Vq},o($VO,[2,27],{33:$VB,34:$VC,35:$VD}),{22:$Vr,27:146,30:$Vk,32:$Vl,33:$Vm,36:$Vn},{22:$Vr,27:147,30:$Vk,32:$Vl,33:$Vm,36:$Vn},{69:[1,148]},{74:[1,149]},{65:[1,150]},{24:$VN,31:$Vz,32:$VA,33:$VB,34:$VC,35:$VD},o($Vb,[2,68]),{10:[1,151],40:$Vu,41:$Vv},o($VL,[2,79]),{24:[1,152],26:[1,153]},o($VP,[2,16]),o($VP,[2,18],{31:$Vz,32:$VA,33:$VB,34:$VC,35:$VD}),o($Va,[2,82]),{10:[1,154],65:[1,155]},{37:[1,156]},{10:[2,57]},{36:$Vt,54:157},{10:[2,58]},{4:158,6:3,7:4,8:5,9:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:$V0,36:$V1,53:16,55:$V2,56:$V3,57:$V4,66:$V5,67:17,68:$V6,74:$V7,75:$V8,76:$V9},o($Vw,[2,33]),o([10,24,41],[2,34],{40:$Vu}),o($Vw,[2,37]),o($VI,[2,31]),o($Vw,[2,38],{31:$Vz,32:$VA,33:$VB,34:$VC,35:$VD}),o($Vw,[2,39],{31:$Vz,32:$VA,33:$VB,34:$VC,35:$VD}),o($Vw,[2,40],{31:$Vz,32:$VA,33:$VB,34:$VC,35:$VD}),o($Vw,[2,41],{31:$Vz,32:$VA,33:$VB,34:$VC,35:$VD}),o($VO,[2,23],{33:$VB,34:$VC,35:$VD}),o($VO,[2,24],{33:$VB,34:$VC,35:$VD}),o($VQ,[2,25],{35:$VD}),o($VQ,[2,26],{35:$VD}),o($VI,[2,29]),o($Vw,[2,42]),o($Vw,$Vy,{31:$Vz,32:$VA,33:$VB,34:$VC,35:$VD}),o($Vw,[2,43]),o($VQ,[2,28],{35:$VD}),{31:$Vz,32:$VA,33:$VB,34:$VC,35:$VD,38:[1,159]},{4:160,6:3,7:4,8:5,9:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:$V0,36:$V1,53:16,55:$V2,56:$V3,57:$V4,66:$V5,67:17,68:$V6,74:$V7,75:$V8,76:$V9},{22:[1,161]},{22:$Vr,25:74,27:75,28:162,29:$Vj,30:$Vk,32:$Vl,33:$Vm,36:$Vn},{9:165,15:164,36:[1,166],67:17,78:163},{10:[1,167]},{22:$Vr,23:168,25:121,27:122,29:$Vj,30:$Vk,32:$Vl,33:$Vm,36:$Vn},o($Va,[2,83]),{37:[1,169]},{22:$Vr,25:74,27:75,28:171,29:$Vj,30:$Vk,32:$Vl,33:$Vm,36:$Vn,79:170},{10:[2,59]},{6:28,7:4,8:5,9:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:$V0,36:$V1,53:16,55:$V2,56:$V3,57:$V4,66:$V5,67:17,68:$V6,70:[1,172],74:$V7,75:$V8,76:$V9},o($VI,[2,32]),{6:28,7:4,8:5,9:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:$V0,36:$V1,53:16,55:$V2,56:$V3,57:$V4,66:$V5,67:17,68:$V6,70:[1,173],74:$V7,75:$V8,76:$V9},{22:$Vi,25:62,27:56,29:$Vj,30:$Vk,32:$Vl,33:$Vm,36:$Vn,39:174,42:$Vo,43:54,48:57,51:$Vp,52:$Vq},{10:[1,175]},{24:[1,176]},{24:[2,80]},{24:[2,81]},{31:$Vc,32:$Vd,58:41,65:$Ve},o($Va,[2,15]),o($VP,[2,17]),{22:$Vr,25:74,27:75,28:171,29:$Vj,30:$Vk,32:$Vl,33:$Vm,36:$Vn,79:177},{38:[1,178]},{26:[1,179],38:[2,87]},o($Va,[2,69],{71:180,72:[1,181]}),o($Va,[2,73]),{24:[1,182],40:$Vu,41:$Vv},o($Va,[2,88]),{69:[1,183]},{38:[1,184]},{10:[1,185]},{22:$Vr,25:74,27:75,28:171,29:$Vj,30:$Vk,32:$Vl,33:$Vm,36:$Vn,79:186},o($Va,[2,70]),{69:[1,188],73:[1,187]},o($Va,[2,74]),{4:189,6:3,7:4,8:5,9:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:$V0,36:$V1,53:16,55:$V2,56:$V3,57:$V4,66:$V5,67:17,68:$V6,74:$V7,75:$V8,76:$V9},{10:[1,190]},o($Va,[2,84]),{38:[2,86]},o($Va,[2,71]),{4:191,6:3,7:4,8:5,9:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:$V0,36:$V1,53:16,55:$V2,56:$V3,57:$V4,66:$V5,67:17,68:$V6,74:$V7,75:$V8,76:$V9},{6:28,7:4,8:5,9:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:$V0,36:$V1,53:16,55:$V2,56:$V3,57:$V4,66:$V5,67:17,68:$V6,70:[1,192],74:$V7,75:$V8,76:$V9},o($Va,[2,85]),{6:28,7:4,8:5,9:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:$V0,36:$V1,53:16,55:$V2,56:$V3,57:$V4,66:$V5,67:17,68:$V6,70:[1,193],74:$V7,75:$V8,76:$V9},o($Va,[2,77]),o($Va,[2,72])],
defaultActions: {24:[2,49],25:[2,50],26:[2,51],27:[2,1],86:[2,56],126:[2,57],128:[2,58],157:[2,59],164:[2,80],165:[2,81],186:[2,86]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"case-sensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0://Omitir espacios en blanco
break;
case 1://comentario simple línea
break;
case 2://comentario multiple líneas
break;
case 3:return 30;              //Reconocimiento de numeros
break;
case 4:return 19;
break;
case 5:return 21;
break;
case 6:return 52;
break;
case 7:return 51;
break;
case 8:yy_.yytext = yy_.yytext.slice(1,-1);  return 29;
break;
case 9:yy_.yytext = yy_.yytext.slice(1,-1);  return 29;
break;
case 10:return 64;
break;
case 11:return 62;
break;
case 12:return 63;
break;
case 13:return 'function';
break;
case 14:return 'void';
break;
case 15:return 56;
break;
case 16:return 55;
break;
case 17:return 57;
break;
case 18:return 'type';
break;
case 19:return 66;
break;
case 20:return 68;
break;
case 21:return 72;
break;
case 22:return 74;
break;
case 23:return 75;
break;
case 24:return 76;
break;
case 25:return 'of';
break;
case 26:return 'in';
break;
case 27:return 'continue';
break;
case 28:return 'break';
break;
case 29:return 'return';
break;
case 30:return 'switch';
break;
case 31:return 'case';
break;
case 32:return 'default';
break;
case 33:return 'type';
break;
case 34:return 'pop';
break;
case 35:return 'push';
break;
case 36:return 47;
break;
case 37:return 46;
break;
case 38:return 49;
break;
case 39:return 50;
break;
case 40:return 45;
break;
case 41:return 44;
break;
case 42:return 40;
break;
case 43:return 41;
break;
case 44:return 42;
break;
case 45:return 'qEs';
break;
case 46:return 20;
break;
case 47:return 26;
break;
case 48:return 22;
break;
case 49:return 24;
break;
case 50:return 31;
break;
case 51:return 33;
break;
case 52:return 34;
break;
case 53:return 32;
break;
case 54:return 35;
break;
case 55:return 60;
break;
case 56:return 69;
break;
case 57:return 70;
break;
case 58:return 65;
break;
case 59:return 37;
break;
case 60:return 38;
break;
case 61:return 10;
break;
case 62:return 36;
break;
case 63:return 5;                 //End Of File
break;
case 64:reportarError("Lexico", "Caracter no reconocido por el lenguaje <br>"+yy_.yytext, yy_.yylloc.first_column, yy_.yylloc.first_line);
break;
}
},
rules: [/^(?:\s+)/,/^(?:\/\/.*)/,/^(?:[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/])/,/^(?:[0-9]+(\.[0-9]+)?\b)/,/^(?:console\b)/,/^(?:log\b)/,/^(?:true\b)/,/^(?:false\b)/,/^(?:"[^"]*")/,/^(?:'[^']*')/,/^(?:[N|n]umber\b)/,/^(?:boolean\b)/,/^(?:[S|s]tring\b)/,/^(?:function\b)/,/^(?:void\b)/,/^(?:var\b)/,/^(?:let\b)/,/^(?:const\b)/,/^(?:type\b)/,/^(?:graficar_ts\b)/,/^(?:if\b)/,/^(?:else\b)/,/^(?:while\b)/,/^(?:do\b)/,/^(?:for\b)/,/^(?:of\b)/,/^(?:in\b)/,/^(?:continue\b)/,/^(?:break\b)/,/^(?:return\b)/,/^(?:switch\b)/,/^(?:case\b)/,/^(?:default\b)/,/^(?:type\b)/,/^(?:pop\b)/,/^(?:push\b)/,/^(?:>=)/,/^(?:<=)/,/^(?:==)/,/^(?:!=)/,/^(?:>)/,/^(?:<)/,/^(?:&&)/,/^(?:\|\|)/,/^(?:!)/,/^(?:\?)/,/^(?:\.)/,/^(?:,)/,/^(?:\()/,/^(?:\))/,/^(?:\+)/,/^(?:\*)/,/^(?:\/)/,/^(?:-)/,/^(?:%)/,/^(?::)/,/^(?:\{)/,/^(?:\})/,/^(?:=)/,/^(?:\[)/,/^(?:\])/,/^(?:;)/,/^(?:([a-zA-Z])[a-zA-Z0-9_]*)/,/^(?:$)/,/^(?:.)/],
conditions: {"string":{"rules":[],"inclusive":false},"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = compilador;
exports.Parser = compilador.Parser;
exports.parse = function () { return compilador.parse.apply(compilador, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}