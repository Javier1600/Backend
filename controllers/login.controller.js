const User = require('../models/user.model');
const Company = require('../models/company.model');

module.exports.validateUser = (req, res) => {
    User.findOne({usuario:req.body.usuario})
        .then((user) => {
            console.log(req.body);
            if(req.body.password === user.password){
                res.json({loggedUser: user});
            }
            else {
                res.json({msg: 'Contraseña incorrecta, ingrese nuevamente!!'});
            }
        })
        .catch(err => res.json({err: err, msg: "Este usuario no Existe!"}));
}

module.exports.validateCompany = (req, res) => {
    Company.findOne({company:req.body.company})
        .then((company) => {
            console.log(req.body);
            if(req.body.password === company.password){
                res.json({logedCompany: company});
            }
            else {
                res.json({msg: 'Contraseña incorrecta, ingrese nuevamente!!'});
            }
        })
        .catch(err => res.json({err: err, msg: "Este usuario no Existe!"}));
}