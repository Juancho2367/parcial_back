const User = require('../models/user');
const Code = require('../models/code');

exports.registerUser = async (req, res) => {
  const { nombre, email, password, anioNacimiento } = req.body;

  try {
    // Verifica si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "El usuario ya existe" });
    }

    // Crea un nuevo usuario
    const newUser = new User({
      nombre,
      email,
      password, // Asegúrate de encriptar la contraseña aquí
      anioNacimiento,
    });

    await newUser.save();
    res.status(201).json({ success: true, message: "Usuario registrado exitosamente" });
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    res.status(500).json({ success: false, message: "Error al registrar el usuario" });
  }
};
// Función para iniciar sesión
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (user) {
    req.session.user = user;
    res.json(user);
  } else {
    res.status(400).json({ message: 'Credenciales incorrectas' });
  }
};

// Función para ingresar código
exports.ingresarCodigo = async (req, res) => {
  const { codigo } = req.body;
  const user = req.session.user;

  const code = await Code.findOne({ codigo, disponible: true });
  if (!code) return res.json({ message: 'Código inválido o ya reclamado' });

  code.disponible = false;
  await code.save();

  const nuevoCodigo = {
    codigo,
    premio: code.premio,
    fechaHora: new Date()
  };
  
  user.codigosIngresados.push(nuevoCodigo);
  await user.save();
  
  res.json(nuevoCodigo);
};
exports.getCodigos = async (req, res) => {
  try {
    const users = await User.find({}, 'nombre codigosIngresados');
    const codigos = users.flatMap(user => 
      user.codigosIngresados.map(codigo => ({
        usuario: user.nombre,
        ...codigo._doc
      }))
    );
    res.json(codigos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los códigos" });
  }
};