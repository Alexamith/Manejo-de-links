
//Métodos para los links
const Enlace = require("../Models/linkModel");


const linkPost = (req, res) => {
  let link = req.body.ruta;
  let protocol = req.body.protocolo;
  let localhost = "localhost:3002/"
  if (link && protocol) {
      let codigo = generarCodigo();
      let enlace = new Enlace();
      enlace.codigo = codigo;
      enlace.enlaceCorto = protocol+localhost+codigo;
      enlace.enlaceLargo = protocol+link;

      Enlace.find({ codigo: "YE73VT7" },function (err, enlace) {
        if(err){
          console.log("Ocurrió un error en la búsqueda", err);
        }
        if (enlace.length != 0){
          console.log("Regenerar codigo");
          enlace.codigo = generarCodigo();
        }
      });
      enlace.save(function (err) {  
        if (err) {
          res.status(422);
          console.log("error while saving the link", err);
        }
        res.status(201).json(
          {
          message: link,
          linkNuevo:"http://localhost:3002/"+enlace.codigo
          });
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
