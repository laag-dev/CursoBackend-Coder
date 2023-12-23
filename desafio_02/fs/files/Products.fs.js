const fs = require("fs").promises;
const crypto = require("crypto");

class ProductManager {
  #products;

  async init() {
    try {
      await fs.promises.access(this.path);
      this.#products = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
    } catch (error) {
      if (error.code === "ENOENT") {
        await fs.promises.writeFile(this.path, JSON.stringify([], null, 2));
      } else {
        throw error;
      }
    }
  }

  constructor(path) {
    this.path = path;
    this.#products = [];
    this.init();
  }

  async create(data) {
    try {
      const { title, photo, price, stock } = data;
      if (!title || !photo || !price || !stock) {
        throw new Error("Todos los campos son obligatorios.");
      } else {
        const newProduct = {
          id: crypto.randomBytes(12).toString("hex"),
          title,
          photo,
          price,
          stock,
        };
        this.#products.push(newProduct);
        await fs.writeFile(
          this.path,
          JSON.stringify(this.#products, null, 2)
        );
        console.log("Producto creado:", newProduct.id);
        return newProduct.id;
      }
    } catch (error) {
      console.error("Error al crear el producto:", error.message);
    }
  }

  read() {
    try {
      if (this.#products.length === 0) {
        throw new Error("No hay productos.");
      } else {
        console.log("Productos:", this.#products);
        return this.#products;
      }
    } catch (error) {
      console.error("Error al leer los productos:", error.message);
    }
  }

  readOne(id) {
    try {
      const product = this.#products.find((each) => each.id === id);
      if (product) {
        console.log(product);
        return product;
      } else {
        throw new Error("No hay productos con ID: " + id);
      }
    } catch (error) {
      console.error("Error al leer el producto:", error.message);
    }
  }

  async destroy(id) {
    try {
      const product = this.#products.find((each) => each.id === id);
      if (product) {
        this.#products = this.#products.filter(
          (each) => each.id !== product.id
        );
        await fs.writeFile(this.path, JSON.stringify(this.#products, null, 2));
        console.log("Producto eliminado:" + id);
        return product;
      } else {
        throw new Error("No hay productos con el ID: " + id);
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error.message);
    }
  }
}

async function manageProducts() {
  const products = new ProductManager("./desafio_02/fs/files/Products.json");

  await products.create({
    title: "Producto 1",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDesEJzsBm3k0jbEVEoG9ihNO6a1gZkJ7R8A&usqp=CAU",
    price: 50,
    stock: 100,
  });

  await products.create({
    title: "Producto 2",
    photo: "URL del producto 2",
    price: 60,
    stock: 75,
  });

  await products.read();
  await products.readOne("1");
  await products.readOne("e0337fa1527fb8bad66d32f0");
  
  await products.destroy("1");
  await products.destroy("e0337fa1527fb8bad66d32f0");
}

manageProducts();
