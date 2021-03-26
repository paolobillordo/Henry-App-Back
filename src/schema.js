const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar JSON
  type Query {
    alumnos(limit: Int, offset: Int, where: JSON, order: JSON): [Alumno]
    alumno(_id: ID): Alumno
    empresa(_id: ID): Empresa
    empresas: [Empresa]
    ofertas: [Oferta]
    ofertasbycompany(company: String): [Oferta]
    oferta(_id: ID): Oferta
    busqueda(name: String): [Alumno]
    favoritosAlumnos: [ID]
    favoritosOfertas: [ID]
    review: [Review]
    news: [News]
    usuario: Usuario
    usuarios: [Usuario]
    alumnoLogueado: Alumno
    empresaLogueada: Empresa
    busquedaAlumnos(search: String): [Alumno]
  }
  type Education {
    _id: ID
    description: String
    timeLapse: String
  }
  type Experiencie {
    _id: ID
    description: String
    timeLapse: String
  }
  type Alumno {
    name: String
    surname: String
    Birthdate: String
    abilities: [String]
    ExtraAbilities: [String]
    languages: [String]
    picture: String
    description: String
    country: String
    email: String
    password: String
    _id: ID
    phone: String
    gender: String
    location: String
    education: [Education]
    experience: [Experiencie]
    isAvailable: Boolean
    isAdmin: Boolean
  }
  input EducationInput {
    _id: ID
    description: String
    timeLapse: String
  }
  input ExperienceInput {
    _id: ID
    description: String
    timeLapse: String
  }
  input AlumnoInput {
    name: String
    surname: String
    Birthdate: String
    abilities: [String]
    ExtraAbilities: [String]
    picture: String
    description: String
    country: String
    email: String
    password: String
    _id: ID
    phone: String
    gender: String
    location: String
    education: [EducationInput]
    experience: [ExperienceInput]
    isAvailable: Boolean
    isAdmin: Boolean
  }
  input EmpresaInput {
    name: String!
    picture: String!
    description: String!
    email: String!
    password: String!
    _id: ID
  }
  type Favorites {
    postulant: String
    describe: String
  }
  type Empresa {
    name: String
    picture: String
    description: String
    email: String
    password: String
    favorites: [Favorites]
    _id: ID
  }
  type Mutation {
    agregarAlumno(
      name: String
      surname: String
      email: String!
      password: String!
    ): AuthPayload!
    agregarEmpresa(
      name: String
      email: String!
      password: String!
    ): AuthPayload!
    borrarAlumno(_id: ID): Alumno
    borrarEmpresa(_id: ID): Empresa
    modificarAlumno(_id: ID, alumno: AlumnoInput): Alumno
    modificarEmpresa(_id: ID, empresa: EmpresaInput): Empresa
    agregarOferta(oferta: OfertaInput): Oferta
    borrarOferta(_id: ID): Oferta
    modificarOferta(_id: ID, oferta: OfertaInput): Oferta
    loginAlumno(email: String!, password: String!): AuthPayload!
    loginEmpresa(email: String!, password: String!): AuthPayload!
    registerUser(
      username: String
      email: String!
      password: String!
      role: String!
    ): AuthPayload!
    modificarUsuario(_id: ID, usuario: UsuarioInput): Usuario
    borrarUsuario(_id: ID): Usuario
    agregarAlumnoFavs(_id: ID): Alumno
    agregarReview(review: ReviewInput): Review
    borrarReview(_id: ID): Review
    modificarReview(_id: ID, input: ReviewInput): Review
    agregarNews(news: NewsInput): News
    borrarNews(_id: ID): News
    modificarNews(_id: ID, input: NewsInput): News
    favoriteType: Favorites
  }
  input OfertaInput {
    title: String
    company: String
    postulants: [String]
    description: String
    _id: ID
  }
  type Oferta {
    title: String
    company: String
    postulants: [String]
    description: String
    _id: ID
  }
  type Usuario {
    _id: ID
    username: String!
    email: String!
    password: String!
    role: String!
    singupDate: String
    name: String!
    surname: String
    birthdate: String
    abilities: [String]
    extraAbilities: [String]
    picture: String
    description: String
    country: String
    isAvailable: Boolean
    isAdmin: Boolean
    isPremium: Boolean
  }
  type AuthPayload {
    token: String!
    user: Usuario!
  }
  input UsuarioInput {
    username: String
    email: String
    password: String
    role: String
    singupDate: String
    name: String!
    surname: String
    birthdate: String
    abilities: [String]
    extraAbilities: [String]
    picture: String
    description: String
    country: String
    isAvailable: Boolean
    isAdmin: Boolean
    isPremium: Boolean
  }
  type Review {
    _id: ID
    autor: String!
    description: String
  }

  input ReviewInput {
    _id: ID
    autor: String!
    description: String
  }

  type News {
    _id: ID
    title: String!
    description: String
  }

  input NewsInput {
    _id: ID
    title: String!
    description: String
  }
`;
module.exports = { typeDefs };
