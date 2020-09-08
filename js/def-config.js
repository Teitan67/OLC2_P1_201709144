// Temas
var editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
    lineNumbers: true,
    mode: "javascript",
    theme: "darcula",
    firstLineNumber: 0
  });
//Funcionalidades nativas
function consolAdd(texto){
  var txtConsola=document.getElementById('consol');
  txtConsola.value=txtConsola.value+texto+"\n";
}

function consolClear(){
  var txtConsola=document.getElementById('consol');
  txtConsola.value="";
}
//Agregar error
var noErrores=0;
function reportarError(tipo,descripcion,columna,linea){
    ++noErrores;
    var tabla=document.getElementById("Cabeza");
    tabla.insertAdjacentHTML("afterend", "<tr><td>"+noErrores+"</td><td>"+tipo+"</td><td>"+descripcion+"</td><td>"+columna+"</td><td>"+linea+"</td></tr>"); 
}

//Funciones del compilador
function analizar(){
  consolClear();
  texto=editor.getValue();
  compilador.parse(texto);
}
var arbol='node1[label="hola"]; node2[label="mimir"]; node1->node2';
function mostrarAST(){
  var code_graphviz='digraph  {   graph [bgcolor="transparent"];edge [color=white];node[style=filled];';
  code_graphviz=code_graphviz+arbol+'}';
  d3.select("#graph").graphviz()
  .renderDot(code_graphviz);
}

