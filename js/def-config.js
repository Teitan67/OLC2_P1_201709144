// Temas
var editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
  lineNumbers: true,
  mode: "javascript",
  theme: "darcula",
  firstLineNumber: 0
});
var editorJSON = CodeMirror.fromTextArea(document.getElementById('JSONviwer'), {
  lineNumbers: true,
  mode: "application/ld+json",
  theme: "darcula",
  firstLineNumber: 0
});

function mostrarJSON(json){
  editorJSON.setValue("");
  editorJSON.setValue(json);
}
//Funcionalidades nativas
function consolAdd(texto) {
  var txtConsola = document.getElementById('consol');
  txtConsola.value = txtConsola.value + texto + "\n";
}

function consolClear() {
  var txtConsola = document.getElementById('consol');
  txtConsola.value = "";
}
//Agregar error
var noErrores = 0;
function reportarError(tipo, descripcion, columna, linea) {
  ++noErrores;
  var tabla = document.getElementById("tabla");
  tabla.insertAdjacentHTML("beforeend", "<tr id='Cuerpo'><td>" + noErrores + "</td><td>" + tipo + "</td><td>" + descripcion + "</td><td>" + columna + "</td><td>" + linea + "</td></tr>");
}

let ast ;
const tsGlobal = new TS([]);

//Funciones del compilador
function analizar() {
  limpiar();
  texto = editor.getValue();
  ast = compilador.parse(texto);
  mostrarJSON(JSON.stringify(ast)); 
  procesarBloque(ast, tsGlobal);
   
}

function limpiar(){
  consolClear();
  $("#tabla #Cuerpo").remove(); 
  noErrores = 0 ;
}

/*
var arbol='node1[label="hola"]; node2[label="mimir"]; node1->node2';
function mostrarAST(){
  var code_graphviz='digraph  {   graph [bgcolor="transparent"];edge [color=white];node[style=filled];';
  code_graphviz=code_graphviz+arbol+'}';
  d3.select("#imgAST").graphviz()
  .renderDot(code_graphviz);
}

*/