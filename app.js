const tiempo = {
  segundos: {
    valor: 0,
    limite: 59,
  },
  minutos: {
    valor: 0,
    limite: 59,
  },
  horas: {
    valor: 0,
    limite: 23,
  },
};
const to = document.querySelector("#todo");
const botonesAumentar = document.querySelectorAll(".bAumentar");
const botonesDisminuir = document.querySelectorAll(".bDisminuir");

const bIniciar = document.querySelector("#bIniciar");
const bDetener = document.querySelector("#bDetener");
const bReiniciar = document.querySelector("#bReiniciar");

let contador;

//eventos para botner

botonesAumentar.forEach((bAumentar) => {
  bAumentar.addEventListener("click", (e) => {
    const unidad = e.target.getAttribute("data-unidad");
    incrementar(unidad);
  });
});
botonesDisminuir.forEach((bDisminui) => {
  bDisminui.addEventListener("click", (e) => {
    const unidad = e.target.getAttribute("data-unidad");
    disminuir(unidad);
  });
});

bIniciar.addEventListener("click", iniciarCuenta);
bDetener.addEventListener("click", detenerCuenta);
bReiniciar.addEventListener("click", (e) => {
  detenerCuenta();
  tiempo.segundos.valor = 0;
  tiempo.minutos.valor = 0;
  tiempo.horas.valor = 0;
  pointarInterfaz();
});

function incrementar(unidad) {
  if (tiempo[unidad].valor + 1 <= tiempo[unidad].limite) {
    tiempo[unidad].valor++;
    // console.log(tiempo);
  }
  pointarInterfaz();
}
function disminuir(unidad) {
  if (tiempo[unidad].valor - 1 >= 0) {
    tiempo[unidad].valor--;
    // console.log(tiempo);
  }
  pointarInterfaz();
}
function pointarInterfaz() {
  const horas = document.querySelector("#horas .numero");
  const minutos = document.querySelector("#minutos .numero");
  const segundos = document.querySelector("#segundos .numero");
  horas.textContent = `0${tiempo.horas.valor}`.slice(-2);
  minutos.textContent = `0${tiempo.minutos.valor}`.slice(-2);
  segundos.textContent = `0${tiempo.segundos.valor}`.slice(-2);
}
function iniciarCuenta() {
  to.textContent = "contador";
  contador = setInterval(() => {
    const { horas, minutos, segundos } = tiempo;
    if (horas.valor === 0 && minutos.valor === 0 && segundos.valor === 0) {
      to.textContent = "termino";
      detenerCuenta();
    } else if (segundos.valor === 0) {
      if (minutos.valor === 0) {
        if (horas.valor === 0) {
          //no pasa nada
        } else {
          tiempo.minutos.valor = minutos.limite;
          tiempo.segundos.valor = segundos.limite;
          disminuir("horas");
        }
      } else {
        tiempo.segundos.valor = segundos.limite;
        disminuir("minutos");
      }
    } else {
      disminuir("segundos");
    }
  }, 1000);
}
function detenerCuenta() {
  clearInterval(contador);
}
