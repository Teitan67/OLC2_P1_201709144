// Procesamos las instrucciones reconocidas en nuestro AST


function procesarBloque(instrucciones, tablaDeSimbolos) {
    instrucciones.forEach(instruccion => {

        if (instruccion.tipo === TIPO_INSTRUCCION.IMPRIMIR) {
            // Procesando Instrucción Imprimir
            procesarImprimir(instruccion, tablaDeSimbolos);
        } else if (instruccion.tipo === TIPO_INSTRUCCION.CREAR_VARIABLE) {
            procesarCreacionVariable(instruccion, tablaDeSimbolos);
        } else if (instruccion.tipo == TIPO_INSTRUCCION.ERROR) {
            console.log("Recuperacion activada!");
        } else if (instruccion.tipo == TIPO_INSTRUCCION.GRAFICAR) {
            graficar(tablaDeSimbolos);
        } else if (instruccion.tipo == TIPO_INSTRUCCION.ASIGNACION) {
            procesarAsignaciones(instruccion, tablaDeSimbolos);
        } else if(instruccion.tipo==TIPO_INSTRUCCION.IF){
            procesarIf(instruccion,tablaDeSimbolos);
        }else if(instruccion.tipo==TIPO_INSTRUCCION.WHILE){
            procesarWhile(instruccion,tablaDeSimbolos);
        }else if(instruccion.tipo==TIPO_INSTRUCCION.DO_WHILE){
            procesarDoWhile(instruccion,tablaDeSimbolos);
        }else {
            console.error('ERROR: tipo de instrucción no válido: ' + JSON.stringify(instruccion));
        }
    });
}

function procesarCreacionVariable(instruccion, tablaDeSimbolos) {
    let acceso = instruccion.acceso;

    for (let variable of instruccion.variables) {
        if (tablaDeSimbolos.verificarInsertar(variable.identificador,ambito)) {
            if (puedoInsertar(variable.valor, variable.tipo_var)) {
                if (variable.tipo === TIPO_OPERACION.CREAR_VAR) {
                    let val = null;
                    let tipo_var = variable.tipo_var;
                    if (variable.valor) {
                        tipo_var = tipoDato(variable.valor);
                        val = procesarExpresionCadena(variable.valor, tablaDeSimbolos);
                    }
                    tablaDeSimbolos.agregar(acceso, variable.identificador, tipo_var, val);
                } else {
                    console.error("Operacion sin sentido dentro del AST " + variable);
                }
            }
        } else {
            reportarError("Semantico", "La siguiente variable ya existe:<br>" + variable.identificador, 0, 0);
        }
    }
}

function procesarImprimir(instruccion, tablaDeSimbolos) {
    const cadena = procesarExpresionCadena(instruccion.expresionCadena, tablaDeSimbolos);
    consolAdd(cadena);
}

function procesarExpresionCadena(expresion, tablaDeSimbolos) {

    if (expresion.tipo === TIPO_OPERACION.CONCATENACION) {

        const cadIzq = procesarExpresionCadena(expresion.operandoIzq, tablaDeSimbolos);      // resolvemos el operando izquierdo.
        const cadDer = procesarExpresionCadena(expresion.operandoDer, tablaDeSimbolos);      // resolvemos el operando derecho.
        return cadIzq.toString() + cadDer.toString();
    } else if (expresion.tipo === TIPO_VALOR.CADENA) {
        var val = parseCadena.parse(expresion.valor);
        return val;
    } else if (expresion.tipo === TIPO_VALOR.NUMERO
        || expresion.tipo === TIPO_OPERACION.SUMA
        || expresion.tipo === TIPO_OPERACION.RESTA
        || expresion.tipo === TIPO_OPERACION.MULTIPLICACION
        || expresion.tipo === TIPO_OPERACION.DIVISION
        || expresion.tipo === TIPO_OPERACION.NEGATIVO

    ) {
        return procesarExpresionNumerica(expresion, tablaDeSimbolos);
    } else if (expresion.tipo === TIPO_OPERACION.MAYOR_QUE
        || expresion.tipo === TIPO_OPERACION.MENOR_QUE
        || expresion.tipo === TIPO_OPERACION.MAYOR_IGUAL
        || expresion.tipo === TIPO_OPERACION.MENOR_IGUAL) {
        return procesarExpresionLogicaNumerica(expresion, tablaDeSimbolos);
    } else if (expresion.tipo === TIPO_OPERACION.IGUAL || expresion.tipo === TIPO_OPERACION.DIFERENTE) {
        return procesarExpresionLogica(expresion, tablaDeSimbolos);
    } else if (expresion.tipo === TIPO_VALOR.BOOLEANO) {
        return expresion.valor;
    } else if (expresion.tipo === TIPO_OPERACION.AND || expresion.tipo === TIPO_OPERACION.OR || expresion.tipo === TIPO_OPERACION.NEGACION) {
        return procesarExpresionComparativa(expresion, tablaDeSimbolos);
    } else if (expresion.tipo === TIPO_VALOR.IDENTIFICADOR) {

        return procesarConsultaVariable(expresion, tablaDeSimbolos);
    } else {
        console.error("Instruccion no reconocida: " + JSON.stringify(expresion));
    }
}

function procesarExpresionNumerica(expresion, tablaDeSimbolos) {
    if (expresion.tipo === TIPO_VALOR.NUMERO) {
        return expresion.valor;
    } else if (expresion.tipo === TIPO_VALOR.IDENTIFICADOR) {

        if (tablaDeSimbolos.obtenerTipo(expresion.valor) == "number") {
            return procesarConsultaVariable(expresion, tablaDeSimbolos);
        } else {
            reportarError("Semantico", "No es de tipo numerico esta variable:<br>" + expresion.valor, 0, 0);
        }

    } else if (expresion.tipo === TIPO_OPERACION.SUMA
        || expresion.tipo === TIPO_OPERACION.RESTA
        || expresion.tipo === TIPO_OPERACION.MULTIPLICACION
        || expresion.tipo === TIPO_OPERACION.DIVISION) {

        const valorIzq = procesarExpresionNumerica(expresion.operandoIzq, tablaDeSimbolos);      // resolvemos el operando izquierdo.
        const valorDer = procesarExpresionNumerica(expresion.operandoDer, tablaDeSimbolos);      // resolvemos el operando derecho.

        if (expresion.tipo === TIPO_OPERACION.SUMA) return valorIzq + valorDer;
        if (expresion.tipo === TIPO_OPERACION.RESTA) return valorIzq - valorDer;
        if (expresion.tipo === TIPO_OPERACION.MULTIPLICACION) return valorIzq * valorDer;
        if (expresion.tipo === TIPO_OPERACION.DIVISION) return valorIzq / valorDer;
    } else if (expresion.tipo === TIPO_OPERACION.NEGATIVO) {

        const valor = procesarExpresionNumerica(expresion.operandoIzq, tablaDeSimbolos);     // resolvemos el operando
        return valor * -1;
    }
}

function procesarExpresionLogicaNumerica(expresion, tablaDeSimbolos) {
    // En este caso necesitamos procesar los operandos antes de realizar la comparación.
    const valorIzq = procesarExpresionNumerica(expresion.operandoIzq, tablaDeSimbolos);      // resolvemos el operando izquierdo.
    const valorDer = procesarExpresionNumerica(expresion.operandoDer, tablaDeSimbolos);      // resolvemos el operando derecho.

    if (expresion.tipo === TIPO_OPERACION.MAYOR_QUE) return valorIzq > valorDer;
    if (expresion.tipo === TIPO_OPERACION.MENOR_QUE) return valorIzq < valorDer;
    if (expresion.tipo === TIPO_OPERACION.MAYOR_IGUAL) return valorIzq >= valorDer;
    if (expresion.tipo === TIPO_OPERACION.MENOR_IGUAL) return valorIzq <= valorDer;

}

function procesarExpresionLogica(expresion, tablaDeSimbolos) {
    const valorIzq = procesarExpresionCadena(expresion.operandoIzq, tablaDeSimbolos);      // resolvemos el operando izquierdo.
    const valorDer = procesarExpresionCadena(expresion.operandoDer, tablaDeSimbolos);      // resolvemos el operando derecho.

    if (expresion.tipo === TIPO_OPERACION.IGUAL) return valorIzq == valorDer;
    if (expresion.tipo === TIPO_OPERACION.DIFERENTE) return valorIzq != valorDer;

}

function procesarExpresionComparativa(expresion, tablaDeSimbolos) {

    if (expresion.tipo === TIPO_OPERACION.NEGACION) {

        const valor = procesarExpresionCadena(expresion.operandoIzq, tablaDeSimbolos);     // resolvemos el operando
        return !valor;

    } else {
        const valorIzq = procesarExpresionCadena(expresion.operandoIzq, tablaDeSimbolos);      // resolvemos el operando izquierdo.
        const valorDer = procesarExpresionCadena(expresion.operandoDer, tablaDeSimbolos);      // resolvemos el operando derecho.

        if (expresion.tipo === TIPO_OPERACION.AND) return valorIzq && valorDer;
        if (expresion.tipo === TIPO_OPERACION.OR) return valorIzq || valorDer;
    }
}

function graficar(tablaDeSimbolos) {
    limpiarAmb();
    for (const variable of tablaDeSimbolos._simbolos) {
        addVariable(variable.id, variable.tipo, variable.ambito);
    }
}


function puedoInsertar(expresion, tipo) {
    if (tipo === null || expresion === null) {
        return true;
    }
    if (expresion.tipo === TIPO_OPERACION.CONCATENACION && (tipo === "String" || tipo === "string")) {
        return true;
    } else if (expresion.tipo === TIPO_VALOR.CADENA && (tipo === "String" || tipo === "string")) {
        return true;
    } else if ((expresion.tipo === TIPO_VALOR.NUMERO
        || expresion.tipo === TIPO_OPERACION.SUMA
        || expresion.tipo === TIPO_OPERACION.RESTA
        || expresion.tipo === TIPO_OPERACION.MULTIPLICACION
        || expresion.tipo === TIPO_OPERACION.DIVISION
        || expresion.tipo === TIPO_OPERACION.NEGATIVO
    ) && tipo === "number") {
        return true;
    } else if ((expresion.tipo === TIPO_OPERACION.MAYOR_QUE
        || expresion.tipo == TIPO_OPERACION.MENOR_QUE
        || expresion.tipo == TIPO_OPERACION.MAYOR_IGUAL
        || expresion.tipo == TIPO_OPERACION.MENOR_IGUAL) && tipo === "boolean") {
        return true;
    } else if ((expresion.tipo === TIPO_OPERACION.IGUAL || expresion.tipo === TIPO_OPERACION.DIFERENTE) && tipo === "boolean") {
        return true;
    } else if ((expresion.tipo == TIPO_VALOR.BOOLEANO) && tipo === "boolean") {
        return true;
    } else if ((expresion.tipo == TIPO_OPERACION.AND || expresion.tipo === TIPO_OPERACION.OR || expresion.tipo === TIPO_OPERACION.NEGACION) && tipo === "boolean") {
        return true;
    } else {
        reportarError("Semantico", "No coinciden los datos:<br>" + "La variable es de tipo " + tipo + "<br>El valor es de tipo " + expresion.tipo, 0, 0);
        return false;
    }
}

function tipoDato(expresion) {
    if (expresion === null) {
        return null;
    }
    if (expresion.tipo === TIPO_OPERACION.CONCATENACION) {
        return "String";
    } else if (expresion.tipo === TIPO_VALOR.CADENA) {
        return "String";
    } else if ((expresion.tipo === TIPO_VALOR.NUMERO
        || expresion.tipo === TIPO_OPERACION.SUMA
        || expresion.tipo === TIPO_OPERACION.RESTA
        || expresion.tipo === TIPO_OPERACION.MULTIPLICACION
        || expresion.tipo === TIPO_OPERACION.DIVISION
        || expresion.tipo === TIPO_OPERACION.NEGATIVO
    )) {
        return "number";
    } else if ((expresion.tipo === TIPO_OPERACION.MAYOR_QUE
        || expresion.tipo == TIPO_OPERACION.MENOR_QUE
        || expresion.tipo == TIPO_OPERACION.MAYOR_IGUAL
        || expresion.tipo == TIPO_OPERACION.MENOR_IGUAL)) {
        return "boolean";
    } else if ((expresion.tipo === TIPO_OPERACION.IGUAL || expresion.tipo === TIPO_OPERACION.DIFERENTE)) {
        return "boolean";
    } else if ((expresion.tipo == TIPO_VALOR.BOOLEANO)) {
        return "boolean";
    } else if ((expresion.tipo == TIPO_OPERACION.AND || expresion.tipo === TIPO_OPERACION.OR || expresion.tipo === TIPO_OPERACION.NEGACION) && tipo === "boolean") {
        return "boolean";
    } else {

        return null;
    }
}

function procesarConsultaVariable(expresion, tablaDeSimbolos) {

    return tablaDeSimbolos.obtener(expresion.valor);
    //instruccionesAST.TIPO_VALOR(tipo,valor);
}

function procesarIf(instruccion,tablaDeSimbolos){
    let condicion = procesarExpresionCadena(instruccion.condicion,tablaDeSimbolos);
    condicion=condicion.toString();
    const tsIf = new TS(tablaDeSimbolos.simbolos);
    noAmbito++;
    ambito=ambLocal+noAmbito;
    if(condicion==="true"){
        procesarBloque(instruccion.sentencias,tsIf);
    }else{
        if(instruccion.elseIf!="null"){
            if(instruccion.elseIf.tipo==TIPO_INSTRUCCION.ELSE){
                procesarBloque(instruccion.elseIf.sentencias);
            }else{
                procesarIf(instruccion.elseIf,tsIf);
            }
            
        }
    }
    noAmbito--;
    ambito=ambGlobal;

}

function procesarAsignaciones(instruccion, tablaDeSimbolos) {
    for (let variable of instruccion.asignacion) {
        if (!tablaDeSimbolos.verificarInsertar(variable.identificador)) {
            let auxVariable = tablaDeSimbolos.obtenerVariable(variable.identificador);
            if (puedoInsertar(variable.valor,auxVariable.tipo)) {
                if(auxVariable.acceso!="const"&&(auxVariable.valor!="null"||auxVariable.valor!=null)){
                    auxVariable.tipo=tipoDato(variable.valor);
                    auxVariable.valor = procesarExpresionCadena(variable.valor,tablaDeSimbolos);
                    //console.log(JSON.stringify(variable));
                    tablaDeSimbolos.enviarVariable(auxVariable.id,auxVariable);
                }else{
                    console.log(auxVariable.valor!=="null"||auxVariable.valor!==null,auxVariable.acceso);
                    reportarError("Semantico", "La variable es una constante y<br> no puede cambiar de dato ", 0, 0);    
                }
            }else {
                reportarError("Semantico", "La variable es de tipo: " + auxVariable.tipo+"<br>El valor es de tipo:"+variable.valor, 0, 0);
            }
        } else {
            reportarError("Semantico", "La siguiente variable ya existe:<br>" + variable.identificador, 0, 0);
        }
    }
}

function procesarWhile(instruccion,tablaDeSimbolos){
    let condicion = procesarExpresionCadena(instruccion.condicion,tablaDeSimbolos);
    condicion=condicion.toString();
    let tsWhl = new TS(tablaDeSimbolos.simbolos);
    noAmbito++;
    ambito=ambLocal+noAmbito;
    while (condicion==="true") {
        procesarBloque(instruccion.sentencias,tsWhl);
        condicion = procesarExpresionCadena(instruccion.condicion,tsWhl);
        condicion=condicion.toString();
    }
    noAmbito--;
    ambito=ambGlobal;
}

function procesarDoWhile(instruccion,tablaDeSimbolos){
    let condicion = procesarExpresionCadena(instruccion.condicion,tablaDeSimbolos);
    condicion=condicion.toString();
    let tsDoWhl = new TS(tablaDeSimbolos.simbolos);
    noAmbito++;
    ambito=ambLocal+noAmbito;
    do{
        procesarBloque(instruccion.sentencias,tsDoWhl);
        condicion = procesarExpresionCadena(instruccion.condicion,tsDoWhl);
        condicion=condicion.toString();
        console.log(condicion);
    }while (condicion==="true")
    noAmbito--;
    ambito=ambGlobal;
}

/*


*/ 