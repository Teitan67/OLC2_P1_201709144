

// Procesamos las instrucciones reconocidas en nuestro AST


function procesarBloque(instrucciones, tablaDeSimbolos) {
    instrucciones.forEach(instruccion => {
   
        if (instruccion.tipo === TIPO_INSTRUCCION.IMPRIMIR) {
            // Procesando Instrucción Imprimir
            procesarImprimir(instruccion, tablaDeSimbolos);
        }else if(instruccion.tipo==TIPO_INSTRUCCION.ERROR){
            console.log("Recuperacion activada!");
        }  else {
            throw 'ERROR: tipo de instrucción no válido: ' + instruccion;
        }
    });
}
function procesarImprimir(instruccion, tablaDeSimbolos) {
    const cadena = procesarExpresionCadena(instruccion.expresionCadena, tablaDeSimbolos);
    consolAdd(cadena);
}

function procesarExpresionCadena(expresion, tablaDeSimbolos) {
    if (expresion.tipo === TIPO_OPERACION.CONCATENACION) {

        const cadIzq = procesarExpresionCadena(expresion.operandoIzq, tablaDeSimbolos);      // resolvemos el operando izquierdo.
        const cadDer = procesarExpresionCadena(expresion.operandoDer, tablaDeSimbolos);      // resolvemos el operando derecho.
        
        return cadIzq + cadDer;
    }else if (expresion.tipo === TIPO_VALOR.CADENA) {
        var val = parseCadena.parse(expresion.valor);
        return val;
    }else if (expresion.tipo === TIPO_VALOR.NUMERO 
        || expresion.tipo === TIPO_OPERACION.SUMA 
        || expresion.tipo === TIPO_OPERACION.RESTA
        || expresion.tipo === TIPO_OPERACION.MULTIPLICACION
        || expresion.tipo === TIPO_OPERACION.DIVISION
        ||expresion.tipo === TIPO_OPERACION.NEGATIVO
        
        ) {
        return procesarExpresionNumerica(expresion, tablaDeSimbolos);
    }else if(expresion.tipo===TIPO_OPERACION.MAYOR_QUE
        ||expresion.tipo==TIPO_OPERACION.MENOR_QUE
        ||expresion.tipo==TIPO_OPERACION.MAYOR_IGUAL
        ||expresion.tipo==TIPO_OPERACION.MENOR_IGUAL){
        return procesarExpresionLogicaNumerica(expresion,tablaDeSimbolos);
    }else if(expresion.tipo===TIPO_OPERACION.IGUAL||expresion.tipo===TIPO_OPERACION.DIFERENTE){
        return procesarExpresionLogica(expresion,tablaDeSimbolos);
    }else if(expresion.tipo==TIPO_VALOR.BOOLEANO){
        return expresion.valor;
    }else if(expresion.tipo==TIPO_OPERACION.AND ||expresion.tipo === TIPO_OPERACION.OR||expresion.tipo === TIPO_OPERACION.NEGACION){
        return procesarExpresionComparativa(expresion,tablaDeSimbolos);
    }else{
        console.error("Instruccion no reconocida: "+expresion);
    }
}

function procesarExpresionNumerica(expresion, tablaDeSimbolos) {
     if (expresion.tipo === TIPO_VALOR.NUMERO) {
        return expresion.valor;
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

function procesarExpresionLogica(expresion,tablaDeSimbolos){
    const valorIzq = procesarExpresionCadena(expresion.operandoIzq, tablaDeSimbolos);      // resolvemos el operando izquierdo.
    const valorDer = procesarExpresionCadena(expresion.operandoDer, tablaDeSimbolos);      // resolvemos el operando derecho.

    if (expresion.tipo === TIPO_OPERACION.IGUAL) return valorIzq == valorDer;
    if (expresion.tipo === TIPO_OPERACION.DIFERENTE) return valorIzq != valorDer;

}

function procesarExpresionComparativa(expresion,tablaDeSimbolos){

    if (expresion.tipo === TIPO_OPERACION.NEGACION){
   
        const valor = procesarExpresionCadena(expresion.operandoIzq, tablaDeSimbolos);     // resolvemos el operando
        return !valor;
        
    }else{
        const valorIzq = procesarExpresionCadena(expresion.operandoIzq, tablaDeSimbolos);      // resolvemos el operando izquierdo.
        const valorDer = procesarExpresionCadena(expresion.operandoDer, tablaDeSimbolos);      // resolvemos el operando derecho.
    
        if (expresion.tipo === TIPO_OPERACION.AND) return valorIzq && valorDer;
        if (expresion.tipo === TIPO_OPERACION.OR) return valorIzq || valorDer;
    }
}