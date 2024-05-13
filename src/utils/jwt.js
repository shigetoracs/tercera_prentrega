import jwt from "jsonwebtoken";
import varenv from "../dotenv.js";

export const generateToken = (user) => {
  /*
        1°: Objeto de asociacion del token (Usuario)
        2°: Clave privada del cifrado
        3°: Tiempo de expiracion
    */
  const token = jwt.sign({ user }, "<pass>", {
    expiresIn: "12h",
  });
  return token;
};
//se genera el token
console.log(
  generateToken({
    _id: "66009af8095e061dff5e30d0",
    first_name: "pepe",
    last_name: "pepes",
    age: 33,
    password: "$2b$15$aMYNrIc7800ItZTnn17iseoXJdBWE5xNRf1f2rsUHzbVqNNoCBN2C",
    email: "pepe@pepe.com",
    rol: "User",
  })
);
/*
_id: "66009af8095e061dff5e30d0",
first_name: "pepe",
last_name: "pepes",
age: 33,
password: "$2b$15$aMYNrIc7800ItZTnn17iseoXJdBWE5xNRf1f2rsUHzbVqNNoCBN2C",
email: "pepe@pepe.com",
rol: "User",
__v: 0,
 */
