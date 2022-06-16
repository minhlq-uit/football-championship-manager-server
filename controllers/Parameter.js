import parameterDb from '../models/database/parameterDb.js'

const getAllParameters = async (req, res) => {
    try {
        const param = await parameterDb.find()
        res.send(param)
    } catch {
        res.status(404).send({error: "Can't find parameter!"})
    }
}

const getParameterById = async (req, res) => {
    try{
        const param = await parameterDb.findById(req.params.parameterId)
        res.send(param)
    } catch{
        res.status(404).send({error: "Can't find parameter!"})
    }
}

const createNewParameter = async (req, res) => {
    try{
        const param = new parameterDb({
            nameParameter: req.body.nameParameter,
            value: req.body.value,
        })
        await param.save()
        res.send("create successful!")
    } catch{
        res.status(404).send({error: "Can't create parameter!"})
    }
}

const updateParameter = async (req, res) => {
    try{
        const param = await parameterDb.findById(req.params.parameterId)
        param.nameParameter = req.body.nameParameter,
        param.value = req.body.value,
        await param.save()
        res.send("Update successful")
    } catch{
        res.status(404).send({error: "parameter is not found"})
    }
    
}

const deleteParameter = async (req, res) => {
    try{
        const param = await parameterDb.findById(req.params.parameterId)
        await param.remove()
        res.send("delete sucessful!")
    }catch{
        res.status(404).send({error: "parameter is not found"})
    }
}

export {
    getAllParameters,
    getParameterById,
    createNewParameter,
    updateParameter,
    deleteParameter
}   