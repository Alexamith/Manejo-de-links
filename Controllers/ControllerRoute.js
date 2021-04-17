let opn = require('opn');
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
      enlace.enlaceCorto = "http://"+localhost+codigo;
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
        res.status(422).json({ error: "Ha ocurrido un error mientras se generaba la consultaa" });
      }
      res.status(200).json({enlaces: enlace});
    }).sort({ cantidadIngresos: -1 }).limit(20);
};
const linkGetId = (req, res) => {
  if (req.query && req.query.id) {
    
    Enlace.findById(req.query.id, function (err, enlace) {
        if (err) {
          console.log("Error mientras se hace la consulta", err);
          res.status(422).json({ error: "El id no coincide con los registrados." });
          return;
        }
      enlace.cantidadIngresos = enlace.cantidadIngresos + 1;
      console.log( enlace.cantidadIngresos);
      enlace.save(function (err,enlace) {  
        if (err) {
          res.status(422);
          console.log("error while saving the link", err);
        }
        opn(enlace.enlaceLargo);

        res.status(201).json({message: "Todo correcto"});

      });
    })
  }else {
    res.status(404).json({ error: "Provee un id" });
  }
};
const linkDelete = (req, res) => {
  if (req.query && req.query.id) {
    Enlace.findById(req.query.id, function (err, enlace) {
      if (err) {
        res.status(500);
        console.log("error while queryting the enlace", err);
        res.json({ error: "El enlacee no existe" });
      }
      if (enlace) {
        enlace.remove(function (err) {
          if (err) {
            res
              .status(500)
              .json({ error: "Ocurrió un error borrando el enlacee" });
          }else{
          res.status(200).json({ message: "All is ok" });
        }
        });
      } else {
        res.status(404);
        console.log("error while queryting the enlace", err);
        res.json({ error: "El enlacee no existe" });
      }
    });
  } else {
    res.status(404).json({ error: "You must provide a enlace ID" });
  }
};
module.exports = {linkPost,linkGet, linkGetId,linkDelete};
