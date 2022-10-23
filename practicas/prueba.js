class contador {
  constructor(nombre) {
    this.nombre = nombre;
    this.cuentaLocal = 0;
  }

  static cuentaTotal = 0;

  contar() {
    this.cuentaLocal++;
    contador.cuentaTotal++;
  }
}

const pepe = new contador("pepe");
const juana = new contador("juana");

juana.contar();
juana.contar();
juana.contar();

console.log(juana.cuentaLocal);

pepe.contar();
pepe.contar();

console.log(pepe.cuentaLocal);
console.log(contador.cuentaTotal);
