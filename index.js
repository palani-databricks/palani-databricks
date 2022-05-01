var element = document.getElementById("subtitle");

var htmlText = element.innerHTML; 

var i = htmlText.indexOf("(");
var j = htmlText.indexOf(")")+1;

var redText = htmlText.substring(i, j);

element.innerHTML = htmlText.substring(0,i)+"<a style='color:red;'>"+redText+"</a>"+htmlText.substring(j);
