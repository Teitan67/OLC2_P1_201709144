
var editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
    lineNumbers: true,
    mode: "javascript",
    theme: "darcula",
    firstLineNumber: 0
  });

function consolAdd(texto){
  var txtConsola=document.getElementById('consol');
  txtConsola.value=txtConsola.value+texto+"\n";
}

function consolClear(){
  var txtConsola=document.getElementById('consol');
  txtConsola.value="";
}