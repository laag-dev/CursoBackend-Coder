class ProductManager {
    #products;
  
    constructor() {
      this.#products = [];
    }
  
    create(data) {
      const { title, photo, price, stock } = data;
  
      if (!title || !photo || !price || !stock) {
        console.log("Todos los campos son obligatorios.");
        return;
      }
  
      const id = this.#generateId();
      const newProduct = { id, title, photo, price, stock };
      this.#products.push(newProduct);
  
      console.log("Producto agregado correctamente:", newProduct);
    }
  
    read() {
      return this.#products;
    }
  
    readOne(id) {
      const product = this.#products.find((p) => p.id === id);
  
      if (product) {
        return product;
      } else {
        console.log("Producto no encontrado.");
        return null;
      }
    }
  
    #generateId() {
      return this.#products.length > 0
        ? this.#products[this.#products.length - 1].id + 1
        : 1;
    }
  }
  

  const pManager = new ProductManager();
  
  pManager.create({
    title: "Producto 1",
    photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDesEJzsBm3k0jbEVEoG9ihNO6a1gZkJ7R8A&usqp=CAU",
    price: 50,
    stock: 100,
  });
  
  pManager.create({
    title: "Producto 2",
    photo: "https://static.wixstatic.com/media/05766b_d28194ca67354c56ab045d79f7128514~mv2.jpg/v1/fill/w_520,h_338,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/product2.jpg",
    price: 75,
    stock: 50,
  });
  
  console.log("Todos los productos:", pManager.read());
  console.log("Producto con id 1:", pManager.readOne(1));
  console.log("Producto con id 3:", pManager.readOne(3));