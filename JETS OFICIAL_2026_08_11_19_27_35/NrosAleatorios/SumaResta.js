function generarSumaResta(objetivo,nivel) {
  let num1;
  let num2;
  if(nivel==1){
    num1 = Math.floor(random(0,10)) + 1;
  }else{ 
    num1 = Math.floor(random(-10,5)) + 1;
  }
  num2 = Math.floor(random() * num1) + 1;
 
  let operadores = ['+', '-'];
  let operador = random(operadores);

  // 35% de las veces, el resultado de la operación será igual al objetivo.
  if (Math.random() < 0.5) {
    // El ajuste es diferente para suma y resta
    if (operador === '+') {
      num2 = objetivo - num1;
    } else if (operador === '-') { 
      num1 = objetivo + num2;
      // Asegura que num1 es mayor o igual que num2 para evitar números negativos
      num2 = Math.min(num1, num2); }
  }
  
  if(nivel==1){
    if(num2<0){num2=num2*-1;}
  }else{
      if(num2<0){
      num2 = String(num2);
      num2= "(" + num2 + ")";}
  }
  return `${num1} ${operador} ${num2}`;
}