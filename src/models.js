const mongoose = require("mongoose");
const logger = require('../logger.js')
mongoose.connect(
  "mongodb+srv://enriquejulian:Ni9zX9WYRJauGui6@cluster0.adqq8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => logger.info('DB connected'));

const studentSchema = new mongoose.Schema({
  name: String,
  surname: String,
  Birthdate: String,
  abilities: [String],
  languages: [String],
  ExtraAbilities: [String],
  picture: String,
  description: String,
  country: String,
  password: String,
  email: String,
  phone: { type: String, lowercase: true, trim: true },
  gender: { type: String, lowercase: true, trim: true },
  location: { type: String, lowercase: true, trim: true },
  education: [
    {
      description: { type: String, lowercase: true, trim: true },
      timeLapse: { type: String, lowercase: true, trim: true },
    },
  ],
  experience: [
    {
      description: { type: String, lowercase: true, trim: true },
      timeLapse: { type: String, lowercase: true, trim: true },
    },
  ],
  favorites: [String],
  isAvailable: { type: Boolean, default: true },
  isAdmin: { type: Boolean, default: false },
});

const recruiterSchema = new mongoose.Schema({
  name: String,
  surname: String,
  picture: String,
  favorites: [String],
  isPremium: { type: Boolean, default: false }, //esto es por si quieren hacer que pague la empresa para ver mas cosas
});

const henrySchema = new mongoose.Schema({
  name: String,
  surname: String,
  picture: String,
  description: String, //para que describa quien es en henry o que hace, si es TL o Toni
});

const companySchema = new mongoose.Schema({
  name: String,
  picture: String,
  description: String,
  email: String,
  password: String,
});

const jobOfferSchema = new mongoose.Schema({
  title: String,
  company: String,
  date: String,
  postulants: [String],
  description: String,
});

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, lowercase: true },
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["student", "company", "henry", "recruiter"] },
  singupDate: { type: Date, default: Date.now() },
  name: String,
  surname: String,
  birthdate: String,
  abilities: [String],
  extraAbilities: [String],
  picture: String,
  description: String,
  country: String,
  isAvailable: { type: Boolean, default: true },
  isAdmin: { type: Boolean, default: false }, // Quienes serian los admin ----- ahora esta como prueba
  isPremium: { type: Boolean, default: false },
});
const favorites = new mongoose.Schema({
  students: [String],
  offers: [String],
});
const review = new mongoose.Schema({
  autor: String,
  description: String,
});

const news = new mongoose.Schema({
  title: String,
  description: String,
});

const Student = mongoose.model("Student", studentSchema);
const Recruiter = mongoose.model("Recruiter", recruiterSchema);
const Henry = mongoose.model("Henry", henrySchema);
const Company = mongoose.model("Company", companySchema);
const JobOffer = mongoose.model("JobOffer", jobOfferSchema);
const Favorites = mongoose.model("Favorites", favorites);
const Review = mongoose.model("Review", review);
const News = mongoose.model("News", news);
const User = mongoose.model("User", userSchema);

module.exports = {
  Student,
  Recruiter,
  Henry,
  Company,
  JobOffer,
  Favorites,
  Review,
  News,
  User,
};
