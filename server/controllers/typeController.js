const {Type} = require("../models/models")
const ApiError = require("../error/apiError")
class TypeController {
    
    async create(req, res){
        const {name} = req.body
        const type = await Type.create({name})
        return res.json(type)
    }
    async getAll(req, res){
        const types = await Type.findAll()
        return res.json(types)       

    }
    async delete(req, res){
        const type = await Type.findOne({
            where: {
                id: req.params.id
            }
        })
        
        if (!type) {
            return res.status(400).json({
                message: 'Тип удален'
            });
        }
    
        await Type.destroy({where: {id: req.params.id}})
        res.status(200).json({message: 'Тип удален'});
    }

    async update(req, res){
        try {

            const type = await Type.findOne({where:{id: req.params.id}})
            if(!type){
                res.status(400).json({ message: 'Тип не найден' });
            }
            const {name} = req.body
            console.log(name)
            Type.update({
                name: req.body.name,
            },
                { where: { id: req.params.id } });
    
            res.status(200).json({ message: "Тип обновлен" });
            
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = new TypeController();