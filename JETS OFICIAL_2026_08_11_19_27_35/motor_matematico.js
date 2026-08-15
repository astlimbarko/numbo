const PROPORCION_RESPUESTA_CORRECTA = 0.5;
const PROPORCION_NEGATIVOS_NIVEL_2 = 0.25;
const PROPORCION_NEGATIVOS_NIVEL_3 = 0.30;
const LIMITE_OPERANDO_GRANDE = 100;
const PROPORCION_CONSERVAR_OPERANDO_GRANDE = 0.75;

const OPERADOR_MULTIPLICACION = '\u00d7';
const OPERADOR_DIVISION = '\u00f7';

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
  if (operador === OPERADOR_MULTIPLICACION) return num1 * num2;
  if (operador === OPERADOR_DIVISION) return num1 / num2;
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

function elegirOperadorPorNivel(nivelActual, valorAleatorio = Math.random()) {
  if (nivelActual === 1) return '+';
  if (nivelActual === 2) return valorAleatorio < 0.55 ? '+' : '-';
  if (valorAleatorio < 0.35) return '+';
  if (valorAleatorio < 0.65) return '-';
  if (valorAleatorio < 0.85) return OPERADOR_MULTIPLICACION;
  return OPERADOR_DIVISION;
}

function elegirFamiliaOperacionNivel3(valorAleatorio = Math.random()) {
  const operador = elegirOperadorPorNivel(3, valorAleatorio);
  return ['+', '-'].includes(operador) ? 'sumaResta' : 'multiDiv';
}

function debeIncluirNegativo(nivelActual, operador, valorAleatorio = Math.random()) {
  if (![ '+', '-' ].includes(operador)) return false;
  if (nivelActual === 2) return valorAleatorio < PROPORCION_NEGATIVOS_NIVEL_2;
  if (nivelActual === 3) return valorAleatorio < PROPORCION_NEGATIVOS_NIVEL_3;
  return false;
}

function limitesSumaResta(nivelActual) {
  if (nivelActual === 1) return {minimo: 0, maximo: 20};
  if (nivelActual === 2) return {minimo: -15, maximo: 30};
  return {minimo: -20, maximo: 45};
}

function generarSumaRestaCorrecta(objetivo, nivelActual, operador, incluirNegativo) {
  const {minimo, maximo} = limitesSumaResta(nivelActual);

  if (operador === '+') {
    let num1;
    if (nivelActual === 1) num1 = enteroAleatorio(0, objetivo);
    else if (incluirNegativo || objetivo < 0) num1 = enteroAleatorio(minimo, -1);
    else num1 = enteroAleatorio(0, Math.min(objetivo, maximo));
    return crearOperacion(num1, operador, objetivo - num1, objetivo);
  }

  let num2;
  if (incluirNegativo) num2 = enteroAleatorio(minimo, -1);
  else num2 = enteroAleatorio(0, nivelActual === 2 ? 15 : 20);
  return crearOperacion(objetivo + num2, operador, num2, objetivo);
}

function generarSumaRestaIncorrecta(objetivo, nivelActual, operador, incluirNegativo) {
  const {minimo, maximo} = limitesSumaResta(nivelActual);
  let operacion;
  do {
    let num1;
    let num2;
    if (incluirNegativo) {
      if (Math.random() < 0.5) {
        num1 = enteroAleatorio(minimo, -1);
        num2 = enteroAleatorio(0, maximo);
      } else {
        num1 = enteroAleatorio(0, maximo);
        num2 = enteroAleatorio(minimo, -1);
      }
    } else {
      num1 = enteroAleatorio(0, maximo);
      num2 = enteroAleatorio(0, maximo);
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

function generarMultiDivCorrecta(objetivo, operador) {
  if (operador === OPERADOR_MULTIPLICACION) {
    const num1 = elegirAleatorio(divisoresPositivos(objetivo));
    return crearOperacion(num1, operador, objetivo / num1, objetivo);
  }
  const num2 = enteroAleatorio(1, 10);
  return crearOperacion(objetivo * num2, operador, num2, objetivo);
}

function generarMultiDivIncorrecta(objetivo, operador) {
  let operacion;
  do {
    if (operador === OPERADOR_MULTIPLICACION) {
      operacion = crearOperacion(enteroAleatorio(1, 10), operador, enteroAleatorio(0, 10), objetivo);
    } else {
      const divisor = enteroAleatorio(1, 10);
      const cociente = enteroAleatorio(1, 12);
      operacion = crearOperacion(divisor * cociente, operador, divisor, objetivo);
    }
  } while (operacion.esCorrecta);
  return operacion;
}

function operacionTieneOperandosGrandes(operacion) {
  return Math.abs(operacion.num1) >= LIMITE_OPERANDO_GRANDE
    || Math.abs(operacion.num2) >= LIMITE_OPERANDO_GRANDE;
}

function conservarOperacionGrande(valorAleatorio = Math.random()) {
  return valorAleatorio < PROPORCION_CONSERVAR_OPERANDO_GRANDE;
}

function generarOperacionMatematica(objetivo, nivelActual, debeSerCorrecta = Math.random() < PROPORCION_RESPUESTA_CORRECTA) {
  if (!Number.isInteger(objetivo)) throw new Error('La mision debe ser un numero entero');
  if (![1, 2, 3].includes(nivelActual)) throw new Error(`Nivel no soportado: ${nivelActual}`);

  const operador = elegirOperadorPorNivel(nivelActual);
  const incluirNegativo = debeIncluirNegativo(nivelActual, operador);
  const generar = () => {
    if (['+', '-'].includes(operador)) {
      return debeSerCorrecta
        ? generarSumaRestaCorrecta(objetivo, nivelActual, operador, incluirNegativo)
        : generarSumaRestaIncorrecta(objetivo, nivelActual, operador, incluirNegativo);
    }
    return debeSerCorrecta
      ? generarMultiDivCorrecta(objetivo, operador)
      : generarMultiDivIncorrecta(objetivo, operador);
  };

  let operacion;
  let intentos = 0;
  do {
    operacion = generar();
    intentos++;
  } while (operacionTieneOperandosGrandes(operacion) && !conservarOperacionGrande() && intentos < 20);
  return operacion;
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
    num1: operacion.num1,
    operador: operacion.operador,
    num2: operacion.num2,
    texto: operacion.texto,
    resultado: operacion.resultado,
    esCorrecta: operacion.esCorrecta,
    colisionada: false
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    calcularResultado,
    crearOperacion,
    divisoresPositivos,
    generarOperacionMatematica,
    elegirOperadorPorNivel,
    elegirFamiliaOperacionNivel3,
    debeIncluirNegativo,
    operacionTieneOperandosGrandes,
    conservarOperacionGrande,
    PROPORCION_RESPUESTA_CORRECTA
  };
}
