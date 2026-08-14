function generarMultiDiv(objetivo, nivel) {
    let num1, num2;
    
    let operadores = ['*', '/'];
    let operador = random(operadores);

    // Genera num1
    num1 = Math.floor(Math.random() * 10) + 1;

    // Genera num2
    if(operador == '/') {
        // Asegúrate de que num2 es un divisor de num1 para evitar decimales.
        let possibleDivisors = [];
        for(let i = 1; i <= num1; i++) {
            if(num1 % i == 0) {
                possibleDivisors.push(i);
            }
        }
        num2 = possibleDivisors[Math.floor(Math.random() * possibleDivisors.length)];
    } else {
        // Para la multiplicación, simplemente genera otro número aleatorio.
      num2 = Math.floor(Math.random() * 10) * 2; // Esto dará un número par entre 0 y 18
    }

    // Ajusta num1 y num2 si es necesario para que la operación de resulte en el objetivo
    if (Math.random() < 0.5) {
        if (operador === '*') {
            num2 = Math.floor(objetivo / num1);
        } else if (operador === '/') {
            num1 = objetivo * num2;
        }
    }

    return `${num1} ${operador} ${num2}`;
}