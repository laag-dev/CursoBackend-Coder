const fs = require("fs");
const crypto = require("crypto");

class UserManager {
  #users;
  init() {
    const exists = fs.existsSync(this.path);
    //console.log(exists);
    if (!exists) {
      fs.writeFileSync(this.path, JSON.stringify([], null, 2));
    } else {
      this.#users = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    }
  }
  constructor(path) {
    this.path = path;
    this.#users = [];
    this.init();
  }
  async create(data) {
    try {
      const { name, photo, email } = data;
      if (!name || !photo || !email) {
        throw new Error("Todos los campos son obligatorios.");
      } else {
        const newUser = {
          id: crypto.randomBytes(12).toString("hex"),
          name,
          photo,
          email,
        };
        this.#users.push(newUser);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(this.#users, null, 2)
        );
        console.log("Usuario creado:", newUser.id);
        return newUser.id;
      }
    } catch (error) {
      console.error("Error al crear el usuario:", error.message);
    }
  }
  read() {
    try {
      if (this.#users.length === 0) {
        throw new Error("No hay usuarios");
      } else {
        console.log(this.#users);
        return this.#users;
      }
    } catch (error) {
      console.error("Error al crear usuario:", error.message);
    }
  }
  readOne(id) {
    try {
      const usuarios = this.#users.find((each) => each.id === id);
      if (usuarios) {
        console.log(usuarios);
        return usuarios;
      } else {
        throw new Error("No hay usuarios con ID: " + id);
      }
    } catch (error) {
      console.error("Error al leer usuario:", error.message);
    }
  }
  async destroy(id) {
    try {
      const usuarios = this.#users.find((each) => each.id === id);
      if (usuarios) {
        this.#users = this.#users.filter((each) => each.id !== id);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(this.#users, null, 2)
        );
        console.log("Usuario eliminado:" + id);
        return id;
      } else {
        throw new Error("No hay usuario con el ID: " + id);
      }
    } catch (error) {
      console.error("Error al eliminar el usuario:", error.message);
    }
  }
}
const users = new UserManager("./desafio_02/fs/files/Users.json");
users.create({
  name: "Lina",
  photo: "fotoLina.jpg",
  email: "sincorreo@gmail.com",
});
users.read();
users.readOne("527714c5b67510819467fd75");
users.destroy("beb4b63dd26b5e563f847737");