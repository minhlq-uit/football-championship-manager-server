import playerDb from '../models/database/playerDb.js';

const getAllPlayers = (req, res) => {
    playerDb.find().populate("clubId", "fullName").then((data)=>{
        res.send(data);
    }, (err) => {
        res.status(400).send(err.message);
    });
}

const getPlayerById = (req, res) => {
    playerDb.findById(req.params.playerId).then((data) => {
        res.send(data);
    }, (err) => {
        res.status(400).send(err.message);
    });
}
const getPlayerByClubId = (req, res) => {
    playerDb.find({clubId: req.params.clubId}).then((data) => {
        res.send(data);
    }, (err) => {
        res.status(400).send(err.message);
    });
}

const createNewPlayer = (req, res) => {
    let player = new playerDb({
        playerName: req.body.playerName,
        playerRole: req.body.playerRole,
        dayOfBirth: req.body.dayOfBirth,
        nationality: req.body.nationality,
        avatar: req.body.avatar,
        clubId: req.body.clubId
    }); 

    player.save
    player.save().then((data)=>{
        res.send(data);
    }, err => {
        res.status(400).send(err.message);
    })
}

const updatePlayer = (req, res) => {
    const query = req.params;
    playerDb.findOneAndUpdate(query, {
        playerName: req.body.playerName,
        playerRole: req.body.playerRole,
        dayOfBirth: req.body.dayOfBirth,
        nationality: req.body.nationality,
        avatar: req.body.avatar,
        clubId: req.body.clubId
    }, (err, player) => {
        if (err) {
            res.send(err.message);
        }
        res.send(player)
    });
}


const deletePlayer = (req, res) => {
    const query = req.params;
    playerDb.findOneAndDelete(query, (err, player) => {
        if (err) {
            res.send(err.message);
        }
        res.send(player);
    });
    
}
export {
    getAllPlayers,
    getPlayerById,
    createNewPlayer,
    updatePlayer,
    deletePlayer,
    getPlayerByClubId
}