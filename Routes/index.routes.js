const { Router } = require("express");
const router = Router();


//Métodos para los links
const {linkPost} = require("../Controllers/ControllerRoute");




//ruta principal
router.get("/", (req, res)=>{
    var caracteres = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var contraseña = "";
    for (i=0; i<10; i++) contraseña +=caracteres.charAt(Math.floor(Math.random()*caracteres.length)); 
    console.log(contraseña)
    res.status(200).json({message: "Página de inicio"});
});

// Rutas para trabajar con los links que se envian.
router.post("/user/dashboard/register", linkPost);


module.exports = router;