import matchDetailDb from '../models/database/matchDetailDb.js'

const getAllMatchDetails = async (req, res) => {
    try {
        matchDetailDb.find().then((data)=>{
            res.send(data);
        });
    } catch {
        res.status(404).send({error: "Could'n find MatchDetail"})
    }
 
}

const getMatchDetailById = async (req, res) => {
    try{
        matchDetailDb.findById(req.params.matchDetailId).then((data) =>{
        res.send(data);
    })
    } catch{
        res.status(404).send({error: "Could'n find MatchDetail"})
    }
}

const createNewMatchDetail = async (req, res) => {
    try{
        const matchDetail = new matchDetailDb({
            club1Goal: req.body.club1Goal,
            club2Goal: req.body.club2Goal,
            typeMatch: req.body.typeMatch,
            club1Id: req.body.club1Id,
            club2Id: req.body.club2Id,
            matchId: req.body.matchId
        })
        await matchDetail.save()
        res.send("create successful!")
    } catch{
        res.status(404).send({error: "can't create MatchDetail"})
    }
}

const updateMatchDetail = async (req, res) => {
    try{
        const data = await matchDetailDb.findById(req.params.matchDetailId)
        data.club1Goal = req.body.club1Goal,
        data.club2Goal = req.body.club2Goal,
        data.typeMatch = req.body.typeMatch,
        data.club1Id = req.body.club1Id,
        data.club2Id = req.body.club2Id,
        data.matchId = req.body.matchId
        await data.save()
        res.send("Update successful")
    } catch{
        res.status(404).send({error: "MatchDetail is not found"})
    }
    
}

const deleteMatchDetail = async (req, res) => {
    try{
        const matchDetail = await matchDetailDb.findById(req.params.matchDetailId)
        await matchDetail.remove()
        res.send("delete sucessful!")
    }catch{
        res.status(404).send({error: "MatchDetail is not found"})
    }
}

export {
    getAllMatchDetails,
    getMatchDetailById,
    createNewMatchDetail,
    updateMatchDetail,
    deleteMatchDetail
}   