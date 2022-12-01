const {Objects, ObjectId} = require('mongodb');

class ContactService {
    constructor(client) {
        this.Contact = client.db().collection('guestinfos');
    }

    // dinh nghia cac phuong thuc truy xuat CSDL su dung mongodb API
    extractContactData(payload) {
        const contact = {
            surname: payload.surname,
            name: payload.name,
            email: payload.email,
            phone: payload.phone,
            message: payload.message,
            packetId: payload.packetId,
        };

        // remove underfined fields
        // Object.keys(packet).forEach((key) => {
        //     packet[key] === undefined && delete packet[key]
        // });

        return contact;
    }

    async create(payload) {
        const contact = this.extractContactData(payload);
        const result = await this.Contact.findOneAndUpdate(
            contact,
            { $set: this.contact = contact },
            { returnDocument: 'after', upsert: true}
        );

        return result.value;
    }

    async find(filter) {
        const cursor = await this.Contact.find(filter);
        return await cursor.toArray();
    }

    async findById(id) {
        return await this.Packet.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload){
        const filter = {
            _id: ObjectId.isValid(id)? new ObjectId(id) : null,
        };

        const update = this.extractContactData(payload);
        const result = await this.Packet.findOneAndUpdate(
            filter,
            { $set: update},
            {returnDocument: 'after'}
        );

        return result.value;
    }

    async delete(id){
        const result = await this.Packet.findOneAndDelete({
            _id: ObjectId.isValid(id)? new ObjectId(id) : null,
        });

        return result.value;
    }   

    async deleteAll(){
        const result = await this.Contact.deleteMany({});
        return result.deleteCount;
    }

}

module.exports = ContactService;