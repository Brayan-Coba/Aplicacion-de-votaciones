// Load the MySQL connection
const conexion = require('../data/config');

async function comprobarUsuario(user) {
  return new Promise ((resolve,reject) => {
    conexion.query("select * from Usuarios where idUsuario = ?", user , function(error,results) {
        if(error) {
           reject(error)
        }
        else {
           resolve(results)
        }
    })
  }) 
}

async function comprobarNombreUsuario(user) {
    return new Promise ((resolve,reject) => {
        conexion.query("select * from Usuarios where Usuario = ?", user , function(error,results) {
            if(error) {
                reject(error)
            }
            else {
                resolve(results)
            }
        })
    }) 
}

async function obtenerRoles(userId){
    return new Promise((resolve,reject) => {
        var peticion = 
        `
        select Usuarios_idUsuario as token,Rol 
        from roles_x_usuario join roles 
        on Roles_idRol = idRol 
        where Usuarios_idUsuario = ?;
        `
        conexion.query(peticion,userId,(err,result)=>{
            if (err) {
                reject(err)
            }
            else {
                resolve(result)
            }
        })
    })

}
  

async function postLogin(req,res){
    var user = req.body.user
    try {
        var db_user = await comprobarNombreUsuario(user)
    
        if (db_user.length == 0){
            res.status(401).send()
        }
        else {
            var userId = db_user[0].idUsuario
            var roles = await obtenerRoles(userId)
            res.send(roles)
        }
    }
    catch(error) {
        res.status(500).send(error)
    }
}

async function verificarLogin(req,res,next){
    if (req.path == "/login"){
        next()
    }
    else {
        
        var user = req.query.user

        if (!user) {
            res.status(401).send()
        }
        else {
            try {
                var db_user = await comprobarUsuario(user)
            
                if (db_user.length == 0){
                    res.status(401).send()
                }
                else {
                next()
                }
            }
            catch(error) {
                res.status(500).send(error)
            }
        }
    }
}
   


module.exports = {
    postLogin : postLogin,
    verificarLogin : verificarLogin
}