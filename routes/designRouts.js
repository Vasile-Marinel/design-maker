const designController = require('../controllers/designController')

const router = require('express').Router()
const auth = require('../middlewares/middleware') // Importăm middleware-ul de autentificare
router.post('/create-user-design', auth, designController.create_user_design) // Ruta pentru crearea unui design de utilizator
router.get('/user-design/:designId', auth, designController.get_user_design) // Ruta pentru crearea unui design de utilizator
router.put('/update-user-design/:designId', auth, designController.update_user_design) // Ruta pentru crearea unui design de utilizator

module.exports = router