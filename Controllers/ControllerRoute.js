
//Métodos para los links
const enlace = require("../Models/linkModel");


const linkPost = (req, res) => {
  let link = req.body.ruta;
  let protocol = req.body.protocolo;
  let localhost = "localhost:3002/"
  if (link && protocol) {
      let codigo = generarCodigo();
      enlace.codigo = codigo;
      enlace.enlaceCorto = protocol+localhost+codigo;
      enlace.enlaceLargo = protocol+link;

      console.log(enlace.enlaceCorto+"   "+enlace.enlaceLargo)
      res.status(200).
      json(
        {
        message: link,
        linkNuevo:"http://localhost:3002/"+codigo
        });

  } else {
        res.status(501).json({message: "Por favor ingrese los datos solicitados"});
  }
};

function generarCodigo() {
  let caracteres = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let codigo = "";
  for (i=0; i<7; i++) codigo +=caracteres.charAt(Math.floor(Math.random()*caracteres.length)); 
  return codigo;
}

module.exports = {linkPost};
