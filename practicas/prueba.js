class Usuario {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }

  getFullName() {
    console.log(`Mi nombre completo es ${this.nombre} ${this.apellido}`);
  }

  addMascotas(masc) {
    this.mascotas.push(masc);
  }

  coutMascotas() {
    return this.mascotas.length;
  }

  addBookNames(lib) {
    this.libros.push(lib);
  }

  getBookNames() {
    const arrayLibro = this.libros.map((e) => e.nombre);
    console.log(arrayLibro);
  }
}

const usuario = new Usuario(
  "Octavio",
  "Vercellone",
  [
    { nombre: "Tus zonas erroneas", autor: "Wayne W. Dyer" },
    { nombre: "Rompe la barrera del no", autor: "Chris Voss" },
  ],
  ["perro"]
);

usuario.getFullName();

usuario.addMascotas("gato");

console.log(`Tengo ${usuario.coutMascotas()} Mascotas`);

usuario.addBookNames({
  nombre: "Los 7 Hábitos de la Gente Altamente Efectiva",
  autor: "Stephen R. Covey",
});

usuario.getBookNames();
