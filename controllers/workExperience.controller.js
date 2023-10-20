const WorkExperience = require('../models/workExperience.model');

module.exports.createWorkExperience = (request, response) =>{
    
    const {descripcionResponsabilidades, ambitoLaboral, empresa, fecha_inicio, fecha_fin, idUsuario} = request.body;
    console.log(request.body)
    WorkExperience.create({
        descripcionResponsabilidades, ambitoLaboral, empresa, fecha_inicio, fecha_fin, idUsuario
    })
        .then(WorkExperience => response.json({insertedWorkExperience: WorkExperience, msg: 'Succesful creation'}))
        .catch(err => response.status(400).json(err));
}

module.exports.getAllWorkExperiences = (_,response) =>{
    WorkExperience.find({})
    .then(retrievedWorkExperiences => response.json(retrievedWorkExperiences))
    .catch(err => response.json(err))
}

module.exports.getWorkExperience = (request, response) =>{
    WorkExperience.findOne({_id: request.params.id})
    .then(WorkExperience => response.json(WorkExperience))
    .catch(err => response.json(err))
}

module.exports.updateWorkExperience = (request, response) =>{
    WorkExperience.findOneAndUpdate({_id: request.params.id}, request.body, {new: true})
    .then(updateWorkExperience => response.json(updateWorkExperience))
    .catch(err => response.json(err))
}

module.exports.deleteWorkExperience = (request, response) =>{
    WorkExperience.deleteOne({_id: request.params.id})
    .then(WorkExperienceDeleted => response.json(WorkExperienceDeleted))
    .catch(err => response.json(err))
}
