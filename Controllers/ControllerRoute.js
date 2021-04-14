
//Métodos para los links
const Enlace = require("../Models/linkModel");
function validarURL(url) {
  let sirve = true;
  console.log(url);
  try {
    let miurl = new URL(url);
    
  } catch (error) {
    console.log(error);
    sirve = false;
  }
  return sirve;
}

const linkPost = (req, res) => {
  let link = req.body.ruta;
  let protocol = req.body.protocolo;
  let localhost = "localhost:3002/"
  
  if (link && protocol) {
    if (validarURL(protocol+link)) {
      let codigo = generarCodigo();
      let enlace = new Enlace();
      enlace.codigo = codigo;
      enlace.enlaceCorto = protocol+localhost+codigo;
      enlace.enlaceLargo = protocol+link;
      enlace.cantidadIngresos = 0;

      Enlace.find({ codigo: codigo },function (err, enlace) {
        if(err){
          console.log("Ocurrió un error en la búsqueda", err);
        }
        if (enlace.length != 0){
          console.log("Regenerar codigo");
          enlace.codigo = generarCodigo();
        }
      });
      enlace.save(function (err,enlace) {  
        if (err) {
          res.status(422);
          console.log("error while saving the link", err);
        }
        res.status(201).json(
          {
          message: link,
          linkNuevo:"http://localhost:3002/"+enlace.codigo,
          Objeto:enlace
          });
      });
    }else {
      res.status(422).json({error: "El link ingresado no funciona"});
}
      
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

const linkGet = (req, res) => {
    Enlace.find(function (err, enlace) {
      if (err) {
        res.status(422).json({ error: "Ha ocurrido un error mientras se generaba la consulta" });
      }
      res.status(200).json({enlaces: enlace});
    });
};


module.exports = {linkPost,linkGet};
