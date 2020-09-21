//Nommbre de los atributo en el AST
// Constantes para los tipos de 'valores' que reconoce nuestra gramática.
const TIPO_VALOR = {
	NUMERO:        'VAL_NUMERO',
	IDENTIFICADOR: 'VAL_IDENTIFICADOR',
    CADENA:        'VAL_CADENA',
	BOOLEANO:      'VAL_BOOLEANO',
	LLAMADO:	   'VAL_LLAMADO',
	ARREGLO:       'VAL_ARREGLO',
	ATRIBUTO:	   'VAL_ATRIBUTO'
}

// Constantes para los tipos de 'operaciones' que soporta nuestra gramática.
const TIPO_OPERACION = {
	SUMA:           'OP_SUMA',
	RESTA:          'OP_RESTA',
	MULTIPLICACION: 'OP_MULTIPLICACION',
	DIVISION:       'OP_DIVISION',
	NEGATIVO:       'OP_NEGATIVO',
	POTENCIA:		'OP_POTENCIA',
	MODULAR:		'OP_MODULAR',
	
	MAYOR_QUE:      'OP_MAYOR_QUE',
	MENOR_QUE:      'OP_MENOR_QUE',
	MAYOR_IGUAL:    'OP_MAYOR_IGUAL',
	MENOR_IGUAL:	'OP_MENOR_IGUAL',
	IGUAL:			'OP_IGUAL',
	DIFERENTE:		'OP_DIFERENTE',
	NEGACION:  		'OP_NEGACION',
	AND:			'OP_AND',
	OR:				'OP_OR',
    
	CONCATENACION:  'OP_CONCATENACION',
	CREAR_VAR:		'OP_CREAR_VARIABLE',
	ASIGNAR_VAR:	'OP_ASIGNA_VARIABLE'
};

// Constantes para los tipos de 'instrucciones' válidas en nuestra gramática.
const TIPO_INSTRUCCION = {
	IMPRIMIR:    		'INSTR_IMPRIMIR',
	MIENTRAS:    		'INSTR_MIENTRAS',
	DECLARACION: 		'INSTR_DECLARACION',
	ASIGNACION:  		'INSTR_ASIGANCION',
	IF:          		'INSTR_IF',
	IF_ELSE:     		'INSTR_ELSE',
	ERROR:		 		'INSTR_RECUPERACION',
	CREAR_VARIABLE:     'INSTR_CREAR_VARIABLE',
	GRAFICAR:			'INSTR_GRAFICAR'
}

//Operacion generica
function nuevaOperacion(operandoIzq, operandoDer, tipo) {
	return {
		operandoIzq: operandoIzq,
		operandoDer: operandoDer,
		tipo: tipo
	}
}

const instruccionesAST = {

	/**
	 * Crea un nuevo objeto tipo Operación para las operaciones binarias válidas.
	 */
	nuevoOperacionBinaria: function(operandoIzq, operandoDer, tipo) {
		return nuevaOperacion(operandoIzq, operandoDer, tipo);
	},

	/**
	 * Crea un nuevo objeto tipo Operación para las operaciones unarias válidas
	 */
	nuevoOperacionUnaria: function(operando, tipo) {
		return nuevaOperacion(operando, undefined, tipo);
	},

	/**
	 * Crea un nuevo objeto tipo Valor, esto puede ser una cadena, un número o un identificador
	 */
	nuevoValor: function(valor, tipo) {
		return {
			tipo: tipo,
			valor: valor
		}
	},

	/**
	 * Crea un objeto tipo Instrucción para la sentencia Imprimir.
	 */
	nuevoImprimir: function(expresionCadena) {
		return {
			tipo: TIPO_INSTRUCCION.IMPRIMIR,
			expresionCadena: expresionCadena
		};
	},

	/**
	 * Crea un objeto tipo Instrucción para la sentencia If.
	 */
	saltoError: function() {
		return {
			tipo: TIPO_INSTRUCCION.ERROR,
		}
	},

	crearVariable:function(id,tipo,valor){
		return{
			tipo: TIPO_OPERACION.CREAR_VAR,
			identificador:id,
			tipo_var:tipo,
			valor:valor
		}
	},
	nuevaVariable:function(acceso,variables){
		return{
			tipo:TIPO_INSTRUCCION.CREAR_VARIABLE,
			acceso: acceso,
			variables: variables
		}
	},
	nuevasAsignaciones:function(asignaciones){
		return{
			tipo: TIPO_INSTRUCCION.ASIGNACION,
			asignacion:asignaciones
		}
	},
	nuevaAsignacion:function(id,valor){
		return{
			tipo: TIPO_OPERACION.ASIGNAR_VAR,
			identificador:id,
			valor:valor
		}
	},
	graficar_ts:function(){
		return{
			tipo:TIPO_INSTRUCCION.GRAFICAR
		}
	}
}