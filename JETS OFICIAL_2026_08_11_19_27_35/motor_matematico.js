const PROPORCION_REPASO_NIVEL_3 = 0.35;
const LIMITE_OPERANDO_GRANDE = 100;
const PROPORCION_CONSERVAR_OPERANDO_GRANDE = 0.75;

function enteroAleatorio(minimo, maximo) {
  return Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;
}

function elegirAleatorio(valores) {
  return valores[enteroAleatorio(0, valores.length - 1)];
}

function formatearOperando(valor) {
  return valor < 0 ? `(${valor})` : String(valor);
}

function calcularResultado(num1, operador, num2) {
  if (operador === '+') return num1 + num2;
  if (operador === '-') return num1 - num2;
  if (operador === '×') return num1 * num2;
  if (operador === '÷') return num1 / num2;
  throw new Error(`Operador no soportado: ${operador}`);
}

function crearOperacion(num1, operador, num2, objetivo) {
  const resultado = calcularResultado(num1, operador, num2);
  return {
    num1,
    operador,
    num2,
    resultado,
    texto: `${formatearOperando(num1)} ${operador} ${formatearOperando(num2)}`,
    esCorrecta: resultado === objetivo
  };
}

function generarSumaRestaCorrecta(objetivo, nivelActual) {
  const operador = elegirAleatorio(['+', '-']);
  const limite = nivelActual === 1 ? 10 : 15;

  if (operador === '+') {
    const num1 = nivelActual === 1
      ? enteroAleatorio(0, objetivo)
      : enteroAleatorio(-limite, limite);
    return crearOperacion(num1, operador, objetivo - num1, objetivo);
  }

  const num2 = enteroAleatorio(nivelActual === 1 ? 0 : -limite, limite);
  return crearOperacion(objetivo + num2, operador, num2, objetivo);
}

function generarSumaRestaIncorrecta(objetivo, nivelActual) {
  let operacion;
  do {
    let num1;
    let num2;
    const operador = elegirAleatorio(['+', '-']);

    if (nivelActual === 1) {
      num1 = enteroAleatorio(0, 20);
      num2 = enteroAleatorio(0, num1);
    } else {
      num1 = enteroAleatorio(-15, 20);
      num2 = enteroAleatorio(-15, 15);
    }
    operacion = crearOperacion(num1, operador, num2, objetivo);
  } while (operacion.esCorrecta);
  return operacion;
}

function divisoresPositivos(numero) {
  const divisores = [];
  for (let candidato = 1; candidato <= Math.abs(numero); candidato++) {
    if (numero % candidato === 0) divisores.push(candidato);
  }
  return divisores.length ? divisores : [1];
}

function generarMultiDivCorrecta(objetivo) {
  const operador = elegirAleatorio(['×', '÷']);

  if (operador === '×') {
    const num1 = elegirAleatorio(divisoresPositivos(objetivo));
    return crearOperacion(num1, operador, objetivo / num1, objetivo);
  }

  const num2 = enteroAleatorio(1, 10);
  return crearOperacion(objetivo * num2, operador, num2, objetivo);
}

function generarMultiDivIncorrecta(objetivo) {
  let operacion;
  do {
    const operador = elegirAleatorio(['×', '÷']);
    if (operador === '×') {
      operacion = crearOperacion(enteroAleatorio(1, 10), operador, enteroAleatorio(0, 10), objetivo);
    } else {
      const divisor = enteroAleatorio(1, 10);
      const cociente = enteroAleatorio(1, 12);
      operacion = crearOperacion(divisor * cociente, operador, divisor, objetivo);
    }
  } while (operacion.esCorrecta);
  return operacion;
}

function elegirFamiliaOperacionNivel3(valorAleatorio = Math.random()) {
  return valorAleatorio < PROPORCION_REPASO_NIVEL_3 ? 'sumaResta' : 'multiDiv';
}

function operacionTieneOperandosGrandes(operacion) {
  return Math.abs(operacion.num1) >= LIMITE_OPERANDO_GRANDE
    || Math.abs(operacion.num2) >= LIMITE_OPERANDO_GRANDE;
}

function conservarOperacionGrande(valorAleatorio = Math.random()) {
  return valorAleatorio < PROPORCION_CONSERVAR_OPERANDO_GRANDE;
}

function generarOperacionNivel3(objetivo, debeSerCorrecta) {
  const familia = elegirFamiliaOperacionNivel3();
  const generar = familia === 'sumaResta'
    ? () => debeSerCorrecta
      ? generarSumaRestaCorrecta(objetivo, 3)
      : generarSumaRestaIncorrecta(objetivo, 3)
    : () => debeSerCorrecta
      ? generarMultiDivCorrecta(objetivo)
      : generarMultiDivIncorrecta(objetivo);

  let operacion;
  let intentos = 0;
  do {
    operacion = generar();
    intentos++;
  } while (operacionTieneOperandosGrandes(operacion) && !conservarOperacionGrande() && intentos < 20);
  return operacion;
}

function generarOperacionMatematica(objetivo, nivelActual, debeSerCorrecta = Math.random() < 0.5) {
  if (!Number.isInteger(objetivo)) throw new Error('La misión debe ser un número entero');
  if (![1, 2, 3].includes(nivelActual)) throw new Error(`Nivel no soportado: ${nivelActual}`);

  if (nivelActual <= 2) {
    return debeSerCorrecta
      ? generarSumaRestaCorrecta(objetivo, nivelActual)
      : generarSumaRestaIncorrecta(objetivo, nivelActual);
  }

  return generarOperacionNivel3(objetivo, debeSerCorrecta);
}

function generarOperacion(objetivo, nivelActual) {
  return generarOperacionMatematica(objetivo, nivelActual).texto;
}

function generarSumaResta(objetivo, nivelActual) {
  return generarOperacionMatematica(objetivo, nivelActual).texto;
}

function generarMultiDiv(objetivo) {
  return generarOperacionMatematica(objetivo, 3).texto;
}

function generarObstaculo() {
  const operacion = generarOperacionMatematica(mision, nivel);
  obstaculos.push({
    x: width,
    y: random(height / 2 - 100, height / 2 + 100),
    texto: operacion.texto,
    resultado: operacion.resultado,
    esCorrecta: operacion.esCorrecta,
    colorNum1: color(random(255), random(255), random(255)),
    colorNum2: color(random(255), random(255), random(255)),
    colorOperador: color(random(255), random(255), random(255)),
    colisionada: false
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    calcularResultado,
    crearOperacion,
    divisoresPositivos,
    generarOperacionMatematica,
    elegirFamiliaOperacionNivel3,
    operacionTieneOperandosGrandes,
    conservarOperacionGrande
  };
}
