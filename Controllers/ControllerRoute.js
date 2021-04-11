


const linkPost = (req, res) => {
  let link = req.body.ruta;
  let protocol = req.body.protocolo;
  if (link && protocol) {
    //   console.log(link);
    //   let subCadena = link.split('/');
    //   console.log(protocol+" "+ subCadena);
      res.status(200).json({message: link});

  } else {
        res.status(501).json({message: "Por favor ingrese los datos solicitados"});
  }
};

module.exports = {linkPost};
