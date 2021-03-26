const { Router } = require("express");
const nodemailer = require("nodemailer");
const router = Router();

//Ruta de Registro
router.post("/send-email", async (req, res) => {
  const { email } = req.body;
  /*
  contentHtml = `
        <h1>User information</h1>
        <ul>
            <li>Username: ${name}</li>
            <li>User email: ${email}</li>
        </ul>
    `;
  //esta es la estructura que se va a enviar por correo
  console.log(contentHtml);
*/
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "henrydevjobs@gmail.com", // generated ethereal user
      pass: "ejpictgicjxfqvwb", // generated ethereal password, guardar en una .env
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  /*
      transporter.verify().then(()=>{
          console.log("ready for send emails")
      })*/

  const info = await transporter.sendMail({
    from: "Tejon Admin  <henrydevjobs@gmail.com>",
    to: `${email}`,
    subject: "Registro",
    text: "¡Felicidades, acabas de registrarte con exito en nuestra pagina!",
  });

  console.log("message sent so", info.messageId);

  res.redirect("/catalogue");
});

//Ruta para contacto
router.post("/contact", async (req, res) => {
  const { email } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "henrydevjobs@gmail.com", // generated ethereal user
      pass: "ejpictgicjxfqvwb", // generated ethereal password, guardar en una .env
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  /*
      transporter.verify().then(()=>{
          console.log("ready for send emails")
      })*/

  const info = await transporter.sendMail({
    from: "Tejon Admin <henrydevjobs@gmail.com>",
    to: `${email}`,
    subject: "Contacto recibido",
    text: "¡Felicidades, te acaba de contactar un reclutador!",
  });

  console.log("message sent so", info.messageId);

  res.redirect("/catalogue");
});

module.exports = router;
