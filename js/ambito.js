//Contructor de nodo
class Nodo{
    constructor(data,siguiente){
        this.valor=data;
        this.siguiente=null;
    };
};

//Contructor de ListaSimple
class ListaSimple{
    constructor(){
        this.inicio=null;
        this.size=0;
    };
    //Agregar al final
    agregar(data){
        const newNode = new Nodo (data,null);
        if(!this.inicio){
            this.inicio=newNode
        }else{
            let nodoActual= this.inicio;
            while(nodoActual.siguiente){
                nodoActual=nodoActual.siguiente;
            };
            nodoActual.siguiente=newNode;
        };
        this.size++
    };
};

const ambito = new ListaSimple();
console.log(ambito);
ambito.agregar(2);
ambito.agregar(1);
console.log(ambito);