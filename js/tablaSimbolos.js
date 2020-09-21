const TIPO_DATO = {
    NUMERO: 'NUMBER',
    BOOL:   'BOOLEANO',
    CADENA: 'STRING'
}

function crearSimbolo(acceso,id, tipo, valor) {
    return {
        acceso:acceso,
        id: id,
        tipo: tipo,
        valor: valor
    }
}

class TS {


    constructor (simbolos) {
        this._simbolos = simbolos;
    }

    agregar(acceso,id, tipo, valor) {
        const nuevoSimbolo = crearSimbolo(acceso,id, tipo, valor);
        this._simbolos.push(nuevoSimbolo);
    }

    actualizar(id, valor) {
        const simbolo = this._simbolos.filter(simbolo => simbolo.id === id)[0];
        if (simbolo) simbolo.valor = valor;
        else reportarError("Semantico", "La siguiente variable no existe:<br>"+id, 0, 0);
    }

    obtener(id) {
        const simbolo = this._simbolos.filter(simbolo => simbolo.id === id)[0];

        if (simbolo) return simbolo.valor;
        else reportarError("Semantico", "La siguiente variable no existe:<br>"+id, 0, 0);
    }
    verificarInsertar(id) {
        const simbolo = this._simbolos.filter(simbolo => simbolo.id === id)[0];

        if (simbolo) return false;
        else return true;
    }

    obtenerTipo(id) {
        const simbolo = this._simbolos.filter(simbolo => simbolo.id === id)[0];

        if (simbolo) return simbolo.tipo;
        else reportarError("Semantico", "La siguiente variable no existe:<br>"+id, 0, 0); return null;
    }
    obtenerVariable(id) {
        const simbolo = this._simbolos.filter(simbolo => simbolo.id === id)[0];
        if (simbolo) return simbolo;
        else reportarError("Semantico", "La siguiente variable no existe:<br>"+id, 0, 0);
    }

    enviarVariable(id,sim) {
        let simbolo = this._simbolos.filter(simbolo => simbolo.id === id)[0];
        if (simbolo) simbolo = sim;
        else reportarError("Semantico", "La siguiente variable no existe:<br>"+id, 0, 0);
    }

    get simbolos() {
        return this._simbolos;
    }
}
