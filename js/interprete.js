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
        }else if(instruccion.tipo==TIPO_INSTRUCCION.INCREMENTO){
            procesarIncremento(instruccion,tablaDeSimbolos);
        }else if(instruccion.tipo==TIPO_INSTRUCCION.DECREMENTO){
            procesarDecremento(instruccion,tablaDeSimbolos);
        }else if(instruccion.tipo==TIPO_INSTRUCCION.FOR){
            procesarFor(instruccion,tablaDeSimbolos);
        }else if(instruccion.tipo==TIPO_INSTRUCCION.CREAR_ARREGLO){
            procesarCrearArreglo(instruccion,tablaDeSimbolos);
        }else if(instruccion.tipo==TIPO_INSTRUCCION.ASIGNAR_ARREGLO){
            procesarAsignacionArreglo(instruccion,tablaDeSimbolos);
        }else {
            console.error('ERROR: tipo de instrucción no válido: ' + JSON.stringify(instruccion));
        }
    });
}

function procesarCreacionVariable(instruccion, tablaDeSimbolos) {
    let acceso = instruccion.acceso;

    for (let variable of instruccion.variables) {
        if (tablaDeSimbolos.verificarInsertarAsig(variable.identificador,ambito)) {
            if (puedoInsertar(variable.valor, variable.tipo_var,tablaDeSimbolos)) {
                if (variable.tipo === TIPO_OPERACION.CREAR_VAR) {
                    let val = null;
                    let tipo_var = variable.tipo_var;
                    if (variable.valor) {
                        tipo_var = tipoDato(variable.valor,tablaDeSimbolos);
                        val = procesarExpresionCadena(variable.valor, tablaDeSimbolos);
                    }
                    tablaDeSimbolos.agregar(acceso, variable.identificador, tipo_var, val);
                } else {
                    console.error("Operacion sin sentido dentro del AST " + variable);
                }
            }else{
                reportarError("Semantico", "La siguiente variable "+JSON.stringify(variable.valor.valor)+"<br> no acepta tipos de datos<br> que se intentan insertar" , 0, 0);
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
        || expresion.tipo === TIPO_OPERACION.POTENCIA
        || expresion.tipo === TIPO_OPERACION.MODULAR
    ) {
        return procesarExpresionNumerica(expresion, tablaDeSimbolos);
    } else if ( expresion.tipo === TIPO_VALOR.ARREGLO&&(tablaDeSimbolos.obtenerTipo(expresion.valor) == "number")) {
        return procesarExpresionNumerica(expresion, tablaDeSimbolos);
    }else if (expresion.tipo === TIPO_OPERACION.MAYOR_QUE
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
        //mimir
        return procesarConsultaVariable(expresion, tablaDeSimbolos);
    }else if (expresion.tipo === TIPO_VALOR.ARREGLO&&(tablaDeSimbolos.obtenerTipo(expresion.valor) == "boolean")) {
        if (tablaDeSimbolos.obtenerTipo(expresion.valor) == "boolean") {
            let simbolo=tablaDeSimbolos.obtenerVariable(expresion.valor)
            let valores=simbolo.valor;
            let indice=procesarExpresionNumerica(expresion.indice,tablaDeSimbolos);
            if(indice<valores.length){
                return valores[indice];
            }else{
                reportarError("Semantico", "El tamaño del arreglo: "+valores.length+" es menor o igual al indice colocado: " + indice, 0, 0);
                return 0;
            } 
        } else {
            reportarError("Semantico", "No es de tipo booleano esta variable:<br>" + expresion.valor, 0, 0);
        }
    } else if (expresion.tipo === TIPO_VALOR.ARREGLO&&tablaDeSimbolos.obtenerTipo(expresion.valor) == "String") {
        if (tablaDeSimbolos.obtenerTipo(expresion.valor) == "String") {
            let simbolo=tablaDeSimbolos.obtenerVariable(expresion.valor)
            let valores=simbolo.valor;
            let indice=procesarExpresionNumerica(expresion.indice,tablaDeSimbolos);
            if(indice<valores.length){
                return valores[indice];
            }else{
                reportarError("Semantico", "El tamaño del arreglo: "+valores.length+" es menor o igual al indice colocado: " + indice, 0, 0);
                return 0;
            } 
        } else {
            reportarError("Semantico", "No es de tipo STRING esta variable:<br>" + expresion.valor, 0, 0);
        }
    }else {
        console.error("Instruccion no reconocida: " + JSON.stringify(expresion));
    }
}

function procesarExpresionNumerica(expresion, tablaDeSimbolos) {
    if (expresion.tipo === TIPO_VALOR.NUMERO) {
        return expresion.valor;
    } else if (expresion.tipo === TIPO_VALOR.IDENTIFICADOR) {
        console.log(JSON.stringify(expresion));
        if (tablaDeSimbolos.obtenerTipo(expresion.valor) == "number") {
            return procesarConsultaVariable(expresion, tablaDeSimbolos);
        } else {
            reportarError("Semantico", "No es de tipo numerico esta variable:<br>" + expresion.valor, 0, 0);
        }
    }else if (expresion.tipo === TIPO_VALOR.ARREGLO) {
        if (tablaDeSimbolos.obtenerTipo(expresion.valor) == "number") {
            let simbolo=tablaDeSimbolos.obtenerVariable(expresion.valor)
            let valores=simbolo.valor;
            let indice=procesarExpresionNumerica(expresion.indice,tablaDeSimbolos);
            if(indice<valores.length){
                return valores[indice];
            }else{
                reportarError("Semantico", "El tamaño del arreglo: "+valores.length+" es menor o igual al indice colocado: " + indice, 0, 0);
                return 0;
            } 
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
    }else if (expresion.tipo === TIPO_OPERACION.POTENCIA) {

        const valor = procesarExpresionNumerica(expresion.operandoIzq, tablaDeSimbolos);     // resolvemos el operando
        return valor * valor;
    }else if (expresion.tipo === TIPO_OPERACION.MODULAR) {

        const valorIzq = procesarExpresionNumerica(expresion.operandoIzq, tablaDeSimbolos);      // resolvemos el operando izquierdo.
        const valorDer = procesarExpresionNumerica(expresion.operandoDer, tablaDeSimbolos);      // resolvemos el operando derecho.
        return valorIzq % valorDer;
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


function puedoInsertar(expresion, tipo,tablaDeSimbolos) {
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
        || expresion.tipo === TIPO_OPERACION.POTENCIA
        || expresion.tipo === TIPO_OPERACION.MODULAR
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
    }else if(expresion.tipo == TIPO_VALOR.IDENTIFICADOR){
        return tipo===tablaDeSimbolos.obtenerTipo(expresion.valor);
    } else {
        reportarError("Semantico", "No coinciden los datos:<br>" + "La variable es de tipo " + tipo + "<br>El valor es de tipo " + expresion.tipo, 0, 0);
        return false;
    }
}
//mimir
function tipoDato(expresion,tablaDeSimbolos) {
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
        || expresion.tipo === TIPO_OPERACION.POTENCIA
        || expresion.tipo === TIPO_OPERACION.MODULAR
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
    }else if(expresion.tipo == TIPO_VALOR.IDENTIFICADOR){
        return tablaDeSimbolos.obtenerTipo(expresion.valor);
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
    let auxAmbito=ambito;
    nuevoAmbito();
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
    finAmbito(auxAmbito,ambito,tablaDeSimbolos);
}

function procesarAsignaciones(instruccion, tablaDeSimbolos) {
    for (let variable of instruccion.asignacion) {
        if (!tablaDeSimbolos.verificarInsertar(variable.identificador)) {
            let auxVariable = tablaDeSimbolos.obtenerVariable(variable.identificador);
            if (puedoInsertar(variable.valor,auxVariable.tipo,tablaDeSimbolos)) {
                if(auxVariable.acceso!="const"&&(auxVariable.valor!="null"||auxVariable.valor!=null)){
                    auxVariable.tipo=tipoDato(variable.valor,tablaDeSimbolos);
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
    let auxAmbito=ambito;
    nuevoAmbito();
    while (condicion==="true") {
        procesarBloque(instruccion.sentencias,tsWhl);
        condicion = procesarExpresionCadena(instruccion.condicion,tsWhl);
        condicion=condicion.toString();
    }
    finAmbito(auxAmbito,ambito,tablaDeSimbolos);
}

function procesarDoWhile(instruccion,tablaDeSimbolos){
    let condicion = procesarExpresionCadena(instruccion.condicion,tablaDeSimbolos);
    condicion=condicion.toString();
    let tsDoWhl = new TS(tablaDeSimbolos.simbolos);
    let auxAmbito=ambito;
    nuevoAmbito();
    do{
        procesarBloque(instruccion.sentencias,tsDoWhl);
        condicion = procesarExpresionCadena(instruccion.condicion,tsDoWhl);
        condicion=condicion.toString();

    }while (condicion==="true")
    finAmbito(auxAmbito,ambito,tablaDeSimbolos);
}

function procesarIncremento(instruccion,tablaDeSimbolos){
    let id=instruccion.identificador;
    let valorIzq=instruccionesAST.nuevoValor(id,TIPO_VALOR.IDENTIFICADOR);
    let valorDer= instruccionesAST.nuevoValor(Number(1), TIPO_VALOR.NUMERO);
    let suma=instruccionesAST.nuevoOperacionBinaria(valorIzq,valorDer,TIPO_OPERACION.SUMA);
    let asignacion=instruccionesAST.nuevaAsignacion(id,suma);
    let asignaciones=[];
    asignaciones.push(asignacion);
    let inst_incremento=instruccionesAST.nuevasAsignaciones(asignaciones);
    procesarAsignaciones(inst_incremento,tablaDeSimbolos);
}

function procesarDecremento(instruccion,tablaDeSimbolos){
    let id=instruccion.identificador;
    let valorIzq=instruccionesAST.nuevoValor(id,TIPO_VALOR.IDENTIFICADOR);
    let valorDer= instruccionesAST.nuevoValor(Number(1), TIPO_VALOR.NUMERO);
    let suma=instruccionesAST.nuevoOperacionBinaria(valorIzq,valorDer,TIPO_OPERACION.RESTA);
    let asignacion=instruccionesAST.nuevaAsignacion(id,suma);
    let asignaciones=[];
    asignaciones.push(asignacion);
    let inst_incremento=instruccionesAST.nuevasAsignaciones(asignaciones);
    procesarAsignaciones(inst_incremento,tablaDeSimbolos);
}

function procesarFor(instruccion,tablaDeSimbolos){

    let tsFor = new TS(tablaDeSimbolos.simbolos);
    let auxAmbito=ambito;
    nuevoAmbito();
    if(instruccion.variable.tipo === TIPO_INSTRUCCION.CREAR_VARIABLE){
        procesarCreacionVariable(instruccion.variable,tsFor);
    }else{
        procesarAsignaciones(instruccion.variable,tsFor);
    }

    let condicion = procesarExpresionCadena(instruccion.condicion,tsFor);
    condicion=condicion.toString();


    while (condicion==="true") {
        procesarBloque(instruccion.sentencias,tsFor);

        if(instruccion.incremento.tipo === TIPO_INSTRUCCION.INCREMENTO){
            procesarIncremento(instruccion.incremento,tsFor);
        }else if(instruccion.incremento.tipo==TIPO_INSTRUCCION.DECREMENTO){
            procesarDecremento(instruccion.incremento,tsFor);
        }else{
            procesarAsignaciones(instruccion.incremento,tsFor);
        }
        condicion = procesarExpresionCadena(instruccion.condicion,tsFor);
        condicion=condicion.toString();
    }
    finAmbito(auxAmbito,ambito,tablaDeSimbolos);

}

function procesarCrearArreglo(instruccion,tablaDeSimbolos){
    if(tablaDeSimbolos.verificarInsertarAsig(instruccion.id,ambito)){
        let datos=[];
        let tipo;
        for (const dato of instruccion.datos) {
            if(puedoInsertar(dato, instruccion.tipo_var,tablaDeSimbolos)){
                tipo=tipoDato(dato,tablaDeSimbolos);
                let registro=procesarExpresionCadena(dato);
                datos.unshift(registro);   
            }else{
                reportarError("Semantico", "No coinciden los datos:<br>" + "La variable es de tipo " + instruccion.tipo_var + "<br>El valor es de tipo " + dato.tipo, 0, 0);
            }
        }
        tablaDeSimbolos.agregar(instruccion.acceso, instruccion.id, tipo, datos);
    }else{
        reportarError("Semantico", "La siguiente variable ya existe:<br>" + instruccion.id, 0, 0);
    }
}

function procesarAsignacionArreglo(instruccion,tablaDeSimbolos){
    if (!tablaDeSimbolos.verificarInsertar(instruccion.identificador)) {
        let auxVariable = tablaDeSimbolos.obtenerVariable(instruccion.identificador);
        if (puedoInsertar(instruccion.valor,auxVariable.tipo,tablaDeSimbolos)) {
            if(auxVariable.acceso!="const"&&(auxVariable.valor!="null"||auxVariable.valor!=null)){
                auxVariable.tipo=tipoDato(instruccion.valor,tablaDeSimbolos);
                let registro = procesarExpresionCadena(instruccion.valor,tablaDeSimbolos);
                let indice =   procesarExpresionCadena(instruccion.indice,tablaDeSimbolos);
                let array = auxVariable.valor;
                array[indice]=registro;
                auxVariable.valor=array;
                tablaDeSimbolos.enviarVariable(auxVariable.id,auxVariable);
            }else{
               
                reportarError("Semantico", "La variable es una constante y<br> no puede cambiar de dato ", 0, 0);    
            }
        }else {
            reportarError("Semantico", "La variable es de tipo: " + auxVariable.tipo+"<br>El valor es de tipo:"+instruccion.valor, 0, 0);
        }
    } else {
        reportarError("Semantico", "La siguiente variable no existe:<br>" + instruccion.identificador, 0, 0);
    }
}

/**
			tipo: TIPO_INSTRUCCION.CREAR_ARREGLO,
			acceso:acceso,
			id: id,
			tipo_var:tipo_Var,
			datos:datos
 */







function nuevoAmbito(){
    noAmbito++;
    ambito=ambLocal+noAmbito;
}
function finAmbito(auxAmbito,borrar,tablaDeSimbolos){
    tablaDeSimbolos.limpiar(borrar);
    noAmbito--;
    ambito=auxAmbito;
}