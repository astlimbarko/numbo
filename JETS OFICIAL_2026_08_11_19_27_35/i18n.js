const IDIOMAS_NUMBO = Object.freeze({
  es: {nombre: 'Español', html: 'es'},
  qu: {nombre: 'Quechua', html: 'qu'},
  ay: {nombre: 'Aymara', html: 'ay'},
  gn: {nombre: 'Guaraní', html: 'gn'},
  pdt: {nombre: 'Plautdietsch', html: 'pdt'}
});

const TRADUCCIONES_NUMBO = Object.freeze({
  es: {
    jugar: 'Jugar', idiomas: 'Idiomas', autor: 'Autor', retornar: 'Retornar',
    pausa: 'PAUSA', nivel: 'Nivel', aciertos: 'Aciertos', continuar: 'Continuar',
    volverMenu: 'Volver al menú', nivelCompletado: '¡NIVEL COMPLETADO!',
    completasteNivel: 'Completaste el nivel {nivel}', siguienteNivel: 'Siguiente nivel',
    ganaste: '¡GANASTE!', perdiste: 'PERDISTE', incorrectas: 'Incorrectas',
    puntaje: 'Puntaje', volverJugar: 'Volver a jugar', reintentar: 'Reintentar',
    instrucciones: 'Instrucciones', controles: 'CONTROLES', mover: 'Mover', saltar: 'Saltar',
    pausar: 'Pausar o continuar', silenciar: 'Silenciar sonido',
    objetivo: 'Atrapa la operación que da el número objetivo.'
  },
  qu: {
    jugar: 'Pukllay', idiomas: 'Simikuna', autor: 'Ruwaq', retornar: 'Kutiy',
    pausa: 'SAMAY', nivel: 'Pata', aciertos: 'Allin kutichiykuna', continuar: 'Qatiy',
    volverMenu: 'Qallariyman kutiy', nivelCompletado: '¡PATA TUKUSQA!',
    completasteNivel: '{nivel} pata tukusqa', siguienteNivel: 'Qatiq pata',
    ganaste: '¡ATIPANKI!', perdiste: 'CHINKARQANKI', incorrectas: 'Pantaykuna',
    puntaje: 'Yupay', volverJugar: 'Musuqmanta pukllay', reintentar: 'Musuqmanta',
    instrucciones: 'Kamachiykuna', controles: 'KAMACHIYKUNA', mover: 'Kuyuchiy', saltar: 'Paway',
    pausar: 'Samay utaq qatiy', silenciar: 'Uyarina upallachiy',
    objetivo: 'Munay yupayta quq rurayta hap’iy.'
  },
  ay: {
    jugar: 'Anataña', idiomas: 'Arunaka', autor: 'Luriri', retornar: 'Kutt’aña',
    pausa: 'SAMART’AWI', nivel: 'Pata', aciertos: 'Waliki luratanaka', continuar: 'Sarantaña',
    volverMenu: 'Qalltawiru kutt’aña', nivelCompletado: '¡PATA TUKUYATA!',
    completasteNivel: '{nivel} pata tukuyata', siguienteNivel: 'Jutiri pata',
    ganaste: '¡ATIPJTAWA!', perdiste: 'CHHAQHTAWA', incorrectas: 'Pantjatanaka',
    puntaje: 'Jakhuwi', volverJugar: 'Wasitata anataña', reintentar: 'Wasitata yant’aña',
    instrucciones: 'Yatichawinaka', controles: 'APNAQAWINAKA', mover: 'Unxtayaña', saltar: 'Thuqtaña',
    pausar: 'Samart’aña jan ukax sarantaña', silenciar: 'Uñt’awi amukt’ayaña',
    objetivo: 'Amtata jakhuwi churki uka lurawi katjaña.'
  },
  gn: {
    jugar: 'Ñembosarái', idiomas: 'Ñe’ẽnguéra', autor: 'Apohára', retornar: 'Jevy',
    pausa: 'PYTU’U', nivel: 'Nivel', aciertos: 'Oĩ porãva', continuar: 'Ehojey',
    volverMenu: 'Ejevy menúpe', nivelCompletado: '¡NIVEL OPA!',
    completasteNivel: 'Remohu’ã nivel {nivel}', siguienteNivel: 'Nivel oúva',
    ganaste: '¡REGANA!', perdiste: 'REPERDE', incorrectas: 'Oĩ vaíva',
    puntaje: 'Puntuación', volverJugar: 'Eñembosarái jey', reintentar: 'Eñeha’ã jey',
    instrucciones: 'Ñe’ẽmondo', controles: 'JEPOKUAHA', mover: 'Mýi', saltar: 'Popo',
    pausar: 'Epytu’u térã ehojey', silenciar: 'Emokirirĩ tyapu',
    objetivo: 'Ejapyhy tembiapo ome’ẽva papapy ojehekáva.'
  },
  pdt: {
    jugar: 'Spälen', idiomas: 'Sproaken', autor: 'Autor', retornar: 'Trigj',
    pausa: 'PAUS', nivel: 'Stuf', aciertos: 'Richtje', continuar: 'Wiedermaken',
    volverMenu: 'Trigj tom Menü', nivelCompletado: 'STUF JEMAKT!',
    completasteNivel: 'Du hast Stuf {nivel} jemaakt', siguienteNivel: 'Näakste Stuf',
    ganaste: 'DU HAST JEWUNNE!', perdiste: 'DU HAST VELUARE', incorrectas: 'Falsch',
    puntaje: 'Punkte', volverJugar: 'Noch mol spälen', reintentar: 'Noch mol versäakjen',
    instrucciones: 'Anwiesungen', controles: 'STIERUNG', mover: 'Bewegen', saltar: 'Sprüngen',
    pausar: 'Pause oder wiedermaken', silenciar: 'Ton utmaken',
    objetivo: 'Fang de Opgow, dee de Teelnummer jeft.'
  }
});

let idiomaActual = localStorage.getItem('numbo.idioma');
if (!IDIOMAS_NUMBO[idiomaActual]) idiomaActual = 'es';

function traducir(clave, variables = {}) {
  const catalogo = TRADUCCIONES_NUMBO[idiomaActual] || TRADUCCIONES_NUMBO.es;
  const plantilla = catalogo[clave] || TRADUCCIONES_NUMBO.es[clave] || clave;
  return Object.entries(variables).reduce(
    (texto, [nombre, valor]) => texto.replaceAll(`{${nombre}}`, String(valor)),
    plantilla
  );
}

function codigoIdioma(nombreOCodigo) {
  if (IDIOMAS_NUMBO[nombreOCodigo]) return nombreOCodigo;
  const buscado = String(nombreOCodigo).toLocaleLowerCase('es');
  return Object.keys(IDIOMAS_NUMBO).find(
    (codigo) => IDIOMAS_NUMBO[codigo].nombre.toLocaleLowerCase('es') === buscado
  ) || null;
}

function seleccionarIdioma(nombreOCodigo) {
  const codigo = codigoIdioma(nombreOCodigo);
  if (!codigo) return false;
  idiomaActual = codigo;
  localStorage.setItem('numbo.idioma', codigo);
  document.documentElement.lang = IDIOMAS_NUMBO[codigo].html;
  menuOne = 2;
  return true;
}

document.documentElement.lang = IDIOMAS_NUMBO[idiomaActual].html;

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {IDIOMAS_NUMBO, TRADUCCIONES_NUMBO};
}
