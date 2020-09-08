var colaAux=["",""];
colaAux.pop();
colaAux.pop();

var noNodo=0;
var codeAST="";
function agregarNodo(etiqueta,concatenar){
    var nodo="nodo"+noNodo;
    codeAST=codeAST+"\n"+nodo+"[label=\""+etiqueta+"\"];";
    noNodo++;
    if(concatenar){
        concatenador(nodo);
    }else{
        colaAux.push(nodo);
    }
    
}

function concatenador(nodo){
    let size=colaAux.length;
    for(let i=0;i<size;i++){    
        codeAST=codeAST+"\n"+nodo+"->"+colaAux.pop();
    }
    colaAux.push(nodo);
}