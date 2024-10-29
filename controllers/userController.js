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

  // Verifica que el usuario esté autenticado
  if (!user) return res.status(401).json({ message: 'Usuario no autenticado' });

  try {
    const code = await Code.findOne({ code: codigo, disponible: false });
    if (!code) return res.json({ message: 'Código inválido o ya reclamado' });

    // Cambia la disponibilidad del código y guarda en la base de datos
    code.disponible = true;
    await code.save();

    // Encuentra al usuario en la base de datos usando su ID
    const userInDb = await User.findById(user._id);
    if (!userInDb) return res.status(404).json({ message: 'Usuario no encontrado' });

    // Crea el objeto para el nuevo código ingresado
    const nuevoCodigo = {
      codigo,
      premio: code.prize,
      fechaHora: new Date()
    };

    // Agrega el nuevo código al array `codigosIngresados` del usuario y guarda los cambios
    userInDb.codigosIngresados.push(nuevoCodigo);
    await userInDb.save();

    res.json(nuevoCodigo);
  } catch (error) {
    console.error("Error al ingresar el código:", error);
    res.status(500).json({ message: "Error al ingresar el código" });
  }
};