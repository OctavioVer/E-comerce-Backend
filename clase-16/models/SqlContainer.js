//importar { optionsSql } desde "../dbOptions/sqlConnection.js";
import knex from "knex";

export class SqlContainer {
  constructor(options, table) {
    this.options = options;
    this.table = table;
  }

  #connectDb() {
    return (this.sql = knex(this.options));
  }

  async #destroyDb() {
    return await this.sql.destroy();
  }

  async save(object) {
    // CUANDO SE DEVUELVE ERROR, SIN DEFINIR
    try {
      this.#connectDb();
      return await this.sql(this.table).insert(object);
    } catch (error) {
      console.log(error);
    } finally {
      await this.#destroyDb();
    }
  }

  async getById(id) {
    // CUANDO NO SE ENCUENTRA FILA DEVUELVE ARRAY VACÍO
    try {
      this.#connectDb();
      return await this.sql(this.table).select("*").where("id", "=", id);
    } catch (error) {
      console.log(error);
    } finally {
      await this.#destroyDb();
    }
  }

  async update(id, newObject) {
    // DEVUELVE CANTIDAD DE FILAS AFECTADAS
    try {
      this.#connectDb();
      return await this.sql(this.table).where("id", "=", id).update(newObject);
    } catch (error) {
      console.log(error);
    } finally {
      await this.#destroyDb();
    }
  }

  async getAll() {
    // DEVUELVE TODAS LAS FILAS EN ARRAY, VACÍO CUANDO LA MESA ESTÁ VACÍA
    try {
      this.#connectDb();
      return await this.sql(this.table).select("*");
    } catch (error) {
      console.log(error);
    } finally {
      await this.#destroyDb();
    }
  }

  async deleteById(id) {
    // DEVUELVE CANTIDAD DE FILAS AFECTADAS
    try {
      this.#connectDb();
      return await this.sql(this.table).where("id", "=", id).del();
    } catch (error) {
      console.log(error);
    } finally {
      await this.#destroyDb();
    }
  }

  async deleteAll() {
    // DEVOLUCIONES Y OBJETO CUANDO ÉXITO
    try {
      this.#connectDb();
      return await this.sql(this.table).truncate();
    } catch (error) {
      console.log(error);
    } finally {
      await this.#destroyDb();
    }
  }

  // SCRIPTS PARA CREAR TABLAS NEDDED
  async createMessagesTable() {
    try {
      this.#connectDb();
      await this.sql.schema.createTable("messages", (table) => {
        table.increments("id").primary();
        table.string("dateAndTime", 100).notNullable();
        table.string("email", 50).notNullable();
        table.string("message", 200).notNullable();
      });
      return "Messages table was created";
    } catch (error) {
      console.log(error);
    } finally {
      await this.#destroyDb();
    }
  }

  async createProductsTable() {
    try {
      this.#connectDb();
      await this.sql.schema.createTable("products", (table) => {
        table.increments("id").primary();
        table.string("title", 100).notNullable();
        table.float("price").notNullable();
        table.string("thumbnail", 200).notNullable();
      });
    } catch (error) {
    } finally {
      await this.#destroyDb();
    }
  }
}

// const sql = new SqlContainer(optionsSql, "messages");
// console.log(await sql.deleteAll());

// const obj = [ {dateAndTime: Date.now(), email: "email1@gmail.com", message: "message1"}, {dateAndTime: Date.now(), email: "email2@gmail.com", message: "message2"}];
// const data = await sql.getAll();
// console.log(data)
