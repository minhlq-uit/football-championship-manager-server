import goalDb from '../models/database/goalDb.js'

const getAllGoals = async (req, res) => {
    try {
        goalDb.find().then((data)=>{
            res.send(data);
        });
    } catch {
        res.status(404).send({error: "Can't find goal!"})
    }
}

const getGoalById = async (req, res) => {
    try{
        goalDb.findById(req.params.goalId).then((data) =>{
            res.send(data);
        })
    } catch{
        res.status(404).send({error: "Can't find goal!"})
    }
}
const getGoalByPlayerId = async (req, res) => {
    try{
        goalDb.find({playerId: req.params.playerId}).then((data) =>{
            res.send(data);
        })
    } catch{
        res.status(404).send({error: "Can't find goal!"})
    }
}

const createNewGoal = async (req, res) => {
    try{
        const goal = new goalDb({
        typeGoal: req.body.typeGoal,
        goalTime: req.body.goalTime,
        playerId: req.body.playerId,
        matchId: req.body.matchId
        })
        await goal.save()
        res.send("create successful!")
    } catch{
        res.status(404).send({error: "Can't create goal!"})
    }
}

const updateGoal = async (req, res) => {
    try{
        const goal = await goalDb.findById(req.params.goalId)
        goal.typeGoal = req.body.typeGoal
        goal.goalTime = req.body.goalTime
        goal.playerId = req.body.playerId
        goal.matchId =  req.body.matchId
        await goal.save()
        res.send("Update successful")
    } catch{
        res.status(404).send({error: "Goal is not found"})
    }
    
}

const deleteGoal = async (req, res) => {
    try{
        const goal = await goalDb.findById(req.params.goalId)
        await goal.remove()
        res.send("delete sucessful!")
    }catch{
        res.status(404).send({error: "Goal is not found"})
    }
}

export {
    getAllGoals,
    getGoalById,
    getGoalByPlayerId,
    createNewGoal,
    updateGoal,
    deleteGoal
}   