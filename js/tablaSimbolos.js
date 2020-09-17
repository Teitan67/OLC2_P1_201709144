const TIPO_DATO = {
    NUMERO: 'NUMERO'
}

function crearSimbolo(id, tipo, valor) {
    return {
        id: id,
        tipo: tipo,
        valor: valor
    }
}

class TS {


    constructor (simbolos) {
        this._simbolos = simbolos;
    }

    agregar(id, tipo) {
        const nuevoSimbolo = crearSimbolo(id, tipo);
        this._simbolos.push(nuevoSimbolo);
    }

    actualizar(id, valor) {
        const simbolo = this._simbolos.filter(simbolo => simbolo.id === id)[0];
        if (simbolo) simbolo.valor = valor;
        else throw 'ERROR: variable: ' + id + ' no ha sido definida';
    }

    obtener(id) {
        const simbolo = this._simbolos.filter(simbolo => simbolo.id === id)[0];

        if (simbolo) return simbolo.valor;
        else throw 'ERROR: variable: ' + id + ' no ha sido definida';
    }

    get simbolos() {
        return this._simbolos;
    }
}
