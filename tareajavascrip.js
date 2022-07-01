var distancia = 0;
//con if
distancia=prompt('Ingrese la distancia a recorrer en metros:', '0' )
if(distancia>100000){
    alert("Viaje en avión.");
}else if(distancia > 30000){
    alert("Viaje en auto.");
}else if(distancia>10000){
    alert("Viaje en colectivo.");
}else if(distancia>1000){
    alert("Viaje en bicicleta.");
}else if(distancia>0){
    alert("Viaje a pie.");
}else{
    alert("Ingrese solo valores postivos.");
}


var num = [54, 2, 21, 89, 5, 34, 99, 27]
var n = 0
var o = 1

for(n=0; num[n-1]<num[n]>num[n+1]; n++){
    n++
}

document.write('El numero mas alto es ' + num[o]);


while(num[n]>num[o]){
    o++;
}


while(0<=n>num.length-1){
    for(n=0; num[n-1]<num[n]>num[n+1]; n++){

    }
}
document.write('El numero mas alto es ' + num[o]);

//voy a tener que esperar a la clase y luego seguir, este me mató
//no se como sacarle el resultado que necesito...
