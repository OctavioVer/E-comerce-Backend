const express = require(`express`);
const fs = require(`fs`);

class Contenedor {
  constructor(file) {
    this.file = file;
  }

  async getAll() {
    try {
      const data = await fs.promises.readFile(this.file, `utf-8`);
      return JSON.parse(data);
    } catch (error) {
      return `Error en getAll: ${error}`;
    }
  }
  async save(product) {
    try {
      const data = await fs.promises.readFile(this.file, "utf-8");
      const products = JSON.parse(data);
      const lastId = products[products.length - 1].id;
      const newProduct = { ...product, id: lastId + 1 };
      products.push(newProduct);
      await fs.promises.writeFile(this.file, JSON.stringify(products, null, 2));
      console.log(`Nuevo producto creado con id: ${newProduct.id}`);
    } catch (err) {
      const newProduct = { ...product, id: 1 };
      await fs.promises.writeFile(
        this.file,
        JSON.stringify([newProduct], null, 2)
      );
      console.log("Nuevo producto creado con id: " + newProduct.id);
    }
  }

  async getById(id) {
    try {
      const products = await this.getAll();
      const product = products.find((product) => product.id === id);
      if (!product) {
        return `Null`;
      } else {
        return `Producto con id: `.id, product;
      }
    } catch (error) {
      throw new Error(`No fue encontrado ningun producto con ese id`);
    }
  }

  async deleteById(id) {
    try {
      const products = await this.getAll();
      const product = products.find((product) => product.id === id);
      if (!product) {
        throw new Error(`No fue encontrado un producto con ese id`);
      }

      const newProducts = products.filter((product) => product.id !== id);
      await fs.promises.writeFile(
        this.file,
        JSON.stringify(newProducts, null, 2)
      );
    } catch (error) {
      return `Error en deleteById: ${error}`;
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(this.file, JSON.stringify([], null, 2));
    } catch (error) {
      return `Error en deleteAll: ${error}`;
    }
  }
}

const main = async () => {
  const contenedor = new Contenedor(`productos.txt`);
  await contenedor.save({
    title: `Mapa`,
    price: 150,
    thumbnail: `https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.etapainfantil.com%2Fwp-content%2Fuploads%2F2015%2F11%2FMapamundi.jpg&imgrefurl=https%3A%2F%2Fwww.etapainfantil.com%2Fmapamundi-para-imprimir&tbnid=sNjE2Oyix81ebM&vet=12ahUKEwjqwIf97Jz7AhUfspUCHeOnA4AQMygBegUIARC1Ag..i&docid=5YiE3AC7T5MvfM&w=5600&h=3400&q=mapa&ved=2ahUKEwjqwIf97Jz7AhUfspUCHeOnA4AQMygBegUIARC1Ag`,
  });
  await contenedor.save({
    title: `Calculadora`,
    price: 450,
    thumbnail: `https://www.google.com/imgres?imgurl=https%3A%2F%2Ft2.uc.ltmcdn.com%2Fes%2Fposts%2F7%2F0%2F7%2Fcalculadora_cientifica_eoocoo_52707_4_600.jpg&imgrefurl=https%3A%2F%2Fwww.mundodeportivo.com%2Funcomo%2Feducacion%2Farticulo%2Fcalculadoras-cientificas-para-realizar-todo-tipo-de-operaciones-52707.html&tbnid=MzG1608a_VM1kM&vet=12ahUKEwjbmLSz7Zz7AhU-uZUCHeJ2B6cQMygEegUIARD3AQ..i&docid=OxDDxW2NUyPHeM&w=600&h=400&q=calculadora&ved=2ahUKEwjbmLSz7Zz7AhU-uZUCHeJ2B6cQMygEegUIARD3AQ`,
  });
  await contenedor.save({
    title: `Regla`,
    price: 250,
    thumbnail: `https://www.google.com/imgres?imgurl=https%3A%2F%2Fpng.pngtree.com%2Fpng-vector%2F20210330%2Fourlarge%2Fpngtree-ruler-png-image_3165289.jpg&imgrefurl=https%3A%2F%2Fes.pngtree.com%2Ffreepng%2Fruler_6184979.html&tbnid=sL6npbMeSsPvxM&vet=12ahUKEwjKoI_z7Zz7AhXtjZUCHUEoD-QQMygOegUIARCBAg..i&docid=I4E5JPxSDjXpwM&w=640&h=640&q=reg%C3%B1a&ved=2ahUKEwjKoI_z7Zz7AhXtjZUCHUEoD-QQMygOegUIARCBAg`,
  });

  //await contenedor.deleteAll();
};

main();

const app = express();
const product = new Contenedor(`./productos.txt`);

app.get("/productos", (req, res) => {
  product
    .getAll()
    .then((productos) => res.send(JSON.stringify(productos, null, 2)))
    .catch((err) => console.log(err));
});

app.get("/productosRandom", (req, res) => {
  product
    .getAll()
    .then((productos) => {
      let randomNum =
        Math.floor(Math.random() * (productos.length - 0 + 1)) + 0;
      res.send(JSON.stringify(productos[randomNum], null, 2));
    })
    .catch((err) => console.log(err));
});

const port = 8080;
const server = app.listen(port, (req, res) => {
  console.log(`Escuchando en ${port}`);
});
