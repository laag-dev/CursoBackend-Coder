class UserManager {
    #users = [];
  
    create(data) {
      const requiredProps = ["name", "photo", "email"];
      const missingProps = requiredProps.filter(
        (prop) => !data.hasOwnProperty(prop)
      );
  
      if (missingProps.length > 0) {
        throw new Error(`Propiedades faltantes: ${missingProps.join(" ")}`);
      }
  
      const id = this.#users.length > 0 ? this.#users.slice(-1)[0].id + 1 : 1;
      const newUser = { id, ...data };
      this.#users.push(newUser);
  
      return newUser;
    }
  
    read() {
      return this.#users;
    }
  
    readOne(id) {
      const user = this.#users.find((user) => user.id === id);
      if (!user) {
        throw new Error(`Usuario con id ${id} no encontrado.`);
      }
      return user;
    }
  }
  
  const userManager = new UserManager();
  
  const user1 = userManager.create({
    name: "Maria José",
    photo: "ruta/imagen1.jpg",
    email: "mjose@gmail.com",
  });
  
  console.log(userManager.read()); // Devuelve un array con el usuario creado
  
  const userById = userManager.readOne(user1.id);
  console.log(userById); // Devuelve el usuario encontrado por ID