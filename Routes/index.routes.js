const { Router } = require("express");
const router = Router();


//Métodos para los links
const {linkPost, linkGet,linkGetId} = require("../Controllers/ControllerRoute");

//ruta principall
router.get("/", (req, res)=>{
    res.status(200).json({message: "Página de inicio"});
});
router.get("/inicio", (req, res)=>{
    res.status(200).json({message: "Página de inicio"});
});
// 
// Rutas para trabajar con los links que se envian.
router.post("/user/dashboard/register", linkPost);
router.get("/user/dashboard/links", linkGet);
router.get("/user/dashboard/linksId", linkGetId);


module.exports = router;