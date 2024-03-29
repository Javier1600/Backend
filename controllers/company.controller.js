const Company = require('../models/company.model');
const CompanyPhoto = require('../models/companyPhoto.model');

module.exports.createCompany = (request, response) =>{
    const {nombreEmpresa, correo, direccion, telefono, descripcion, valores, rol, estado, usuario, password, confirmPassword} = request.body;
    console.log(request.body)
    Company.create({
        nombreEmpresa, correo, direccion, telefono, descripcion, valores, rol,estado, usuario, password, confirmPassword
    })
        .then(Company => response.json({insertedCompany: Company, msg: 'Succesful creation'}))
        .catch(err => response.status(400).json(err));
}

module.exports.getAllCompanies = (_,response) =>{
    Company.find({})
    .then(retrievedCompanies => response.json(retrievedCompanies))
    .catch(err => response.json(err))
}

module.exports.getCompany = (request, response) =>{
    Company.findOne({_id: request.params.id})
    .then(Company => response.json(Company))
    .catch(err => response.json(err))
}

module.exports.updateCompany = (request, response) =>{
    Company.findOneAndUpdate({_id: request.params.id}, request.body, {new: true})
    .then(updateCompany => response.json(updateCompany))
    .catch(err => response.json(err))
}

module.exports.deleteCompany = (request, response) =>{
    Company.deleteOne({_id: request.params.id})
    .then(CompanyDeleted => response.json(CompanyDeleted))
    .catch(err => response.json(err))
}

module.exports.addPhoto = (request, response) => {
    if (!request.file) {
        return response.status(400).json({ error: 'No se ha enviado ningún archivo.' });
    }

    const filePath = 'Imagenes/' + request.file.filename;
    const nuevaFoto = {
        foto: request.file.filename,
        ruta: filePath,
        idEmpresa: request.params.id
    };

    CompanyPhoto.findOne({idEmpresa: request.params.id})
        .then(fotoEmpresa => {
            if (!fotoEmpresa) {
                return Company.findById(request.params.id);
            }
            fotoEmpresa.foto = nuevaFoto.foto;
            fotoEmpresa.ruta = nuevaFoto.ruta;
            return fotoEmpresa.save();
        })
        .then(empresaOrFoto => {
            if (!empresaOrFoto) {
                return Promise.reject({ status: 404, message: 'Empresa no encontrada' });
            }
            if (empresaOrFoto instanceof Company) {
                return CompanyPhoto.create(nuevaFoto);
            }
            return empresaOrFoto;
        })
        .then(() => {
            return response.json({ mensaje: 'Foto agregada exitosamente' });
        })
        .catch(error => {
            console.error('Error al agregar la foto:', error);
            if (error.status) {
                return response.status(error.status).json({ error: error.message });
            } else {
                return response.status(500).json({ error: 'Error interno del servidor' });
            }
        });
};
module.exports.getCompanyPhoto = (request, response) => {
    CompanyPhoto.findOne({idEmpresa: request.params.id})
        .then(empresa => {
            if (!empresa) {
                return response.status(404).json({ error: 'Empresa no encontrada.' });
            }
            const imageUrl = empresa.foto ? `https://0vmlb023-8000.use2.devtunnels.ms/Imagenes/${empresa.foto}` : null;
            response.json({ foto: imageUrl });
        })
        .catch(error => {
            console.error('Error al obtener la foto de la empresa:', error);
            response.status(500).json({ error: 'Error interno del servidor' });
        });
};