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
    
	CONCATENACION:  'OP_CONCATENACION'
};

// Constantes para los tipos de 'instrucciones' válidas en nuestra gramática.
const TIPO_INSTRUCCION = {
	IMPRIMIR:    'INSTR_IMPRIMIR',
	MIENTRAS:    'INSTR_MIENTRAS',
	DECLARACION: 'INSTR_DECLARACION',
	ASIGNACION:  'INSTR_ASIGANCION',
	IF:          'INSTR_IF',
	IF_ELSE:     'INSTR_ELSE',
	ERROR:		 'INSTR_RECUPERACION'
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
	 * Crea un objeto tipo Instrucción para la sentencia Mientras.
	 */
	nuevoMientras: function(expresionLogica, instrucciones) {
		return {
			tipo: TIPO_INSTRUCCION.MIENTRAS,
			expresionLogica: expresionLogica,
			instrucciones: instrucciones
		};
	},

	/**
	 * Crea un objeto tipo Instrucción para la sentencia Declaración.
	 */
	nuevoDeclaracion: function(identificador) {
		return {
			tipo: TIPO_INSTRUCCION.DECLARACION,
			identificador: identificador
		}
	},

	/**
	 * Crea un objeto tipo Instrucción para la sentencia Asignación.
	 */
	nuevoAsignacion: function(identificador, expresionNumerica) {
		return {
			tipo: TIPO_INSTRUCCION.ASIGNACION,
			identificador: identificador,
			expresionNumerica: expresionNumerica
		}
	},

	/**
	 * Crea un objeto tipo Instrucción para la sentencia If.
	 */
	nuevoIf: function(expresionLogica, instrucciones) {
		return {
			tipo: TIPO_INSTRUCCION.IF,
			expresionLogica: expresionLogica,
			instrucciones: instrucciones
		}
	},
		/**
	 * Crea un objeto tipo Instrucción para la sentencia If.
	 */
	saltoError: function() {
		return {
			tipo: TIPO_INSTRUCCION.ERROR,
		}
	},

	/**
	 * Crea un objeto tipo Instrucción para la sentencia If-Else.

	 */
	nuevoIfElse: function(expresionLogica, instruccionesIfVerdadero, instruccionesIfFalso) {
		return {
			tipo: TIPO_INSTRUCCION.IF_ELSE,
			expresionLogica: expresionLogica,
			instruccionesIfVerdadero: instruccionesIfVerdadero,
			instruccionesIfFalso: instruccionesIfFalso
		}
	}
}