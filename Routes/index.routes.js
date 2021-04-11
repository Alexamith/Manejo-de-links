const { Router } = require("express");
const router = Router();


//Métodos para los links
const {linkPost} = require("../Controllers/ControllerRoute");





router.get("/", (req, res)=>{
    res.status(200).json({message: "Página de inicio"});
});

// Rutas de los links.
router.post("/user/dashboard/register", linkPost);


module.exports = router;