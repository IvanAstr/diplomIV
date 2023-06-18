const { Brand } = require("../models/models");

class BrandController{
    async create(req, res){
        const {name} = req.body 
        const bran = await Brand.create({name});
        return res.json(bran);
    }   

    async getAll(req, res){
        const brands = await Brand.findAll()
        return res.json(brands) 
    }

    async delete(req, res){
        const brand = await Brand.findOne({
            where: {
                id: req.params.id
            }
        })
        
        if (!brand) {
            return res.status(400).json({
                message: 'Бренд не найден'
            });
        }
    
        await Brand.destroy({where: {id: req.params.id}})
        res.status(200).json({message: 'Бренд удвлен'});
    }
    async update(req, res){
        try {

            const brand = await Brand.findOne({where: {id: req.params.id}})
            if(!brand){
                req.status(400).json({message:"Бренд не найден"})
            }
            console.log(req.body.name)
            console.log(req.params.id)
            Brand.update({
                name: req.body.name,
            },
                { where: { id: req.params.id } });
    
            res.status(200).json({ message: "Тип обновлен" });
            
        } catch (error) {
            console.log(error);
        }
    }


}

module.exports = new BrandController();