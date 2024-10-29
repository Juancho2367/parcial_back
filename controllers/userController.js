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
  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  // Almacena el usuario en la sesión
  req.session.user = {
    _id: user._id,
    email: user.email,
    // Otros campos que necesites
  };

  res.json({ message: 'Inicio de sesión exitoso' });
};

// Función para ingresar código
exports.ingresarCodigo = async (req, res) => {
  const { codigo } = req.body;

  // Verifica que el usuario esté autenticado
  const user = req.session.user;
  if (!user || !user._id) {
    return res.status(401).json({ message: 'Usuario no autenticado' });
  }

  try {
    // Busca el código en la base de datos
    const code = await Code.findOne({ code: codigo, disponible: true });
    if (!code) {
      return res.status(400).json({ message: 'Código inválido o ya reclamado' });
    }

    // Marca el código como no disponible
    code.disponible = false;
    await code.save();

    // Crea un nuevo registro de historial
    const nuevoCodigo = {
      codigo: code.code,
      premio: code.prize,
      fechaHora: new Date(),
      email: user.email // Asegúrate de que el usuario tenga un campo email
    };

    // Actualiza el historial del usuario en la base de datos
    const userInDb = await User.findById(user._id);
    if (!userInDb) return res.status(404).json({ message: 'Usuario no encontrado' });

    userInDb.codigosIngresados.push(nuevoCodigo); // Asegúrate de que el esquema de User tenga la propiedad codigosIngresados
    await userInDb.save();

    // Aquí puedes guardar el nuevo registro en una colección de logs, si así lo deseas
    const Historial = mongoose.model('Historial', new mongoose.Schema({
      email: String,
      codigo: String,
      premio: Number,
      fechaHora: Date
    }));

    await Historial.create(nuevoCodigo); // Guarda en la colección de logs

    res.json(nuevoCodigo);
  } catch (error) {
    console.error("Error al ingresar el código:", error);
    res.status(500).json({ message: 'Error al procesar el código' });
  }
};
exports.obtenerHistorial = async (req, res) => {
  const user = req.session.user;

  // Verifica que el usuario esté autenticado
  if (!user || !user._id) {
    return res.status(401).json({ message: 'Usuario no autenticado' });
  }

  try {
    // Busca el usuario con su historial de códigos ingresados
    const userInDb = await User.findById(user._id).select('codigosIngresados email'); // Incluye el email si lo necesitas
    if (!userInDb) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Envía el historial de códigos ingresados al frontend
    res.json(userInDb.codigosIngresados);
  } catch (error) {
    console.error("Error al obtener el historial:", error);
    res.status(500).json({ message: "Error al obtener el historial" });
  }
};