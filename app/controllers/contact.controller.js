const ApiError = require("../api-error");
const ContactService = require("../services/contact.service");
const MongoDB = require('../utils/mongodb.util');


// tao thong tin lien lac
exports.create = async (req, res, next) => {

    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.create(req.body);
        return res.send(document);
    }catch(error){
        return next(new ApiError(500, 'An error occurred while creating the contact'));
    }
}

exports.findAll = async (_req, res, next) => {
    let documents = [];

    try{
        const contactService = new ContactService(MongoDB.client); 
        documents = await contactService.find({});
    }catch(error){
        return next(
            new ApiError(500, 'An error occurred while retrieving contacts')
        );
    }

    return res.send(documents);
};

exports.update = async (req, res, next) => {
    if(Object.keys(req.body).length === 0 ){
        return next(new ApiError(400, 'Data to update can not be empty'));
    }

    try{
        const packetService = new PacketService(MongoDB.client);
        const document = await packetService.update(req.params.id, req.body);

        if(!document){
            return next(new ApiError(404, 'Contact not found'));
        }

        return res.send({message: 'Contact was updated successfully'});
    }catch(error){
        return next(
            new ApiError(500, `Error updating contact with id=${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    try{
        const packetService = new PacketService(MongoDB.client);
        const document = await packetService.delete(req.params.id);

        if(!document){
            return next(new ApiError(404, 'packet not found'));
        }

        return res.send({message: 'packet was deleted successfully'});

    }catch(error){
        return next(
            500, 
            `Could not delete packet with id=${req.params.id}`
        );
    }
};

exports.deleteAll = async (_req, res, next) => {
    try{
        const packetService = new PacketService(MongoDB.client);
        const deleteCount = await packetService.deleteAll().length;

        return res.send({
            message: `${deleteCount} packets were deleted successfully`,
        })
    }catch(error){
        return next(
            new ApiError(500, 'An error occurred while removing all contacts')
        );
    }
};