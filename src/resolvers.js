const {
  Student,
  Company,
  JobOffer,
  Favorites,
  News,
  Review,
  User,
} = require("./models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const logger = require('../logger.js')

const resolvers = {
  Query: {
    alumnos: async (parent, { limit, offset, where, order }, context, info) => {
      logger.info('query alumnos')
      const query = Student.find(where);
      if (offset) {
        query.skip(offset);
      }
      if (limit) {
        query.limit(limit);
      }
      if (order) {
        query.sort(order);
      }
      return await query.exec();
    },

    busquedaAlumnos: async (parent, args, context, info) => {
      const { search = null } = args;
      let searchQuery = {};
      if (search) {
        searchQuery = {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { surname: { $regex: search, $options: "i" } },
            { abilities: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
            { country: { $regex: search, $options: "i" } },
          ],
        };
      }
      const alumnos = await Student.find(searchQuery);
      return await alumnos;
    },

    alumno: async (parent, args, context, info) => {
      return await Student.findById(args._id);
    },
    empresa: async (parent, args, context, info) => {
      return await Company.findById(args._id);
    },
    empresas: async () => {
      return await Company.find({});
    },
    ofertas: async () => {
      return await JobOffer.find({});
    },
    ofertasbycompany: async (parent, args, context, info) => {
      return await JobOffer.find().all("company", [args.company]);
    },
    oferta: async (parent, args, context, info) => {
      return await JobOffer.findById(args._id);
    },
    busqueda: async (parent, args, context, info) => {
      return await Student.find().all("name", [args.name]);
    },
    usuarios: async (parent, args, context, info) => {
      return await User.find({});
    },
    usuario: async (parent, args, context, info) => {
      return await User.findById(args._id);
    },
    alumnoLogueado: async (_, args, { user }) => {
      if (!user) throw new Error("You are not authenticated");
      return await Student.findById(user._id);
    },
    empresaLogueada: async (_, args, { user }) => {
      if (!user) throw new Error("You are not authenticated");
      return await Company.findById(user._id);
    },
    favoritosAlumnos: async () => {
      return await Favorites.find().all("students");
    },
    favoritosOfertas: async () => {
      return await Favorites.find().all("offers");
    },
  },
  Mutation: {
    agregarAlumno: async (parent, { name, surname, email, password }) => {
      try {
        const user = await Student.create({
          name,
          surname,
          email,
          password: await bcrypt.hash(password, 10),
        });
        const token = jwt.sign(
          { _id: user._id, email: user.email },
          "secretkey",
          { expiresIn: "1y" }
        );
        return {
          token,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    agregarEmpresa: async (parent, { name, email, password }) => {
      try {
        const user = await Company.create({
          name,
          email,
          password: await bcrypt.hash(password, 10),
        });
        const token = jwt.sign(
          { _id: user._id, email: user.email },
          "secretkey",
          { expiresIn: "1y" }
        );
        return {
          token,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    borrarAlumno: async (parent, { _id }) => {
      return await Student.findByIdAndDelete(_id);
    },
    borrarEmpresa: async (parent, { _id }) => {
      return await Company.findByIdAndDelete(_id);
    },
    modificarAlumno: async (parent, { _id, alumno }) => {
      return await Student.findByIdAndUpdate(_id, alumno, { new: true });
    },
    modificarEmpresa: async (parent, { _id, empresa }) => {
      return await Company.findByIdAndUpdate(_id, empresa, { new: true });
    },
    agregarOferta: async (parent, args) => {
      return await JobOffer.create(args.oferta);
    },
    borrarOferta: async (parent, { _id }) => {
      return await JobOffer.findByIdAndDelete(_id);
    },
    modificarOferta: async (parent, { _id, oferta }) => {
      return await Student.findByIdAndUpdate(_id, oferta, { new: true });
    },
    loginAlumno: async (_, { email, password }) => {
      try {
        const user = await Student.findOne({ email: email });
        if (!user) {
          throw new Error("No user with that email");
        }
        const isValid = bcrypt.compare(password, user.password);
        if (!isValid) {
          throw new Error("Incorrect password");
        }
        // return jwt
        const token = jwt.sign(
          { _id: user._id, email: user.email },
          "secretkey",
          { expiresIn: "1d" }
        );
        return {
          token,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    loginEmpresa: async (_, { email, password }) => {
      try {
        const user = await Company.findOne({ email: email });
        if (!user) {
          throw new Error("No user with that email");
        }
        const isValid = bcrypt.compare(password, user.password);
        if (!isValid) {
          throw new Error("Incorrect password");
        }
        // return jwt
        const token = jwt.sign(
          { _id: user._id, email: user.email },
          "secretkey",
          { expiresIn: "1d" }
        );
        return {
          token,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    agregarReview: async (_, { review }) => {
      return await Review.create(review);
    },
    borrarReview: async (_, { _id }) => {
      return await Review.findByIdAndDelete(_id);
    },
    modificarReview: async (_, { _id, input }) => {
      return await Review.findByIdAndUpdate(_id, input, { new: true });
    },
    agregarNews: async (_, { news }) => {
      return await News.create(news);
    },
    borrarNews: async (_, { _id }) => {
      return await News.findByIdAndDelete(_id);
    },
    modificarNews: async (_, { _id, input }) => {
      return await News.findOneAndUpdate(_id, input, { new: true });
    },
    agregarAlumnoFavs: async (parent, { _id }) => {
      return await Favorites.create(_id);
    },
    registerUser: async (root, { username, email, password, role }) => {
      try {
        const user = await User.create({
          username,
          email,
          password: await bcrypt.hash(password, 10),
          role: role,
        });
        const token = jwt.sign(
          { _id: user._id, email: user.email },
          "secretkey",
          { expiresIn: "1y" }
        );
        return {
          token,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    modificarUsuario: async (parent, { _id, usuario }) => {
      return await User.findByIdAndUpdate(_id, usuario, { new: true });
    },
    borrarUsuario: async (parent, { _id }) => {
      return await User.findByIdAndDelete(_id);
    },
  },
};
module.exports = { resolvers };
