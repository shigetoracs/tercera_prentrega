export const login = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send("usuario o contra no validos");
    }
    req.session.user = {
      email: req.user.email,
      first_name: req.user.first_name,
    };

    res.status(200).render("templates/products", { user: req.user });
  } catch (error) {
    return res.status(500).send(e);
  }
};
export const register = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).send("Usuario ya existente en la aplicacion");
    }

    res.status(200).send("Usuario creado correctamente");
  } catch (e) {
    res.status(500).send("Error al registrar usuario");
  }
};
export const logout = async (req, res) => {
  req.session.destroy(function (e) {
    if (e) {
      console.log(e);
    } else {
      res.status(200).redirect("/");
    }
  });
};
export const sessionGithub = async (req, res) => {
  req.session.user = {
    email: req.user.email,
    first_name: req.user.name,
  };
  res.redirect("/");
};
export const testJWT = async (req, res) => {
  if (req.user.rol == "User") res.status(403).send("Usuario no autorizado");
  else res.status(200).send(req.user);
};
