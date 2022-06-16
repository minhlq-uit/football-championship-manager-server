import standingDb from "../models/database/standingDb.js";
import clubDb from "../models/database/clubDb.js";
import parameterDb from "../models/database/parameterDb.js";

const getStanding = async (req, res) => {
  try {
    await sortStanding();
    const data = await standingDb.find().populate("clubId", "fullName").sort("rank");
    res.send(data);
    // standingDb
    //   .find()
    //   .populate("clubId", "fullName")
    //   .then((data) => {
    //     res.send(data);
    //   });
  } catch {
    res.status(404).send({ error: "Can't find standing!" });
  }
};

const getStandingOnSeason = async (req, res) => {
  try {
    standingDb.find({ season: req.params.season }).then((data) => {
      res.send(data);
    });
  } catch {
    res.status(404).send({ error: "Can't find standing!" });
  }
};

const createNewClubToStanding = async (req, res) => {
  try {
    const newClubStanding = new standingDb({
      rank: 0,
      point: 0,
      played: 0,
      win: 0,
      drawn: 0,
      lose: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      seasonId: req.params.seasonId,
      clubId: req.body.clubId,
    });
    await newClubStanding.save();
    res.send("Add successful");
  } catch {
    res.status(404).send({ error: "Can't create standing!" });
  }
};

const updateStanding = async (req, res) => {
  try {
    const standingCLub = await standingDb.findById(req.params.standingId);
    (standingCLub.rank = req.body.rank),
      (standingCLub.point = req.body.point),
      (standingCLub.played = req.body.played),
      (standingCLub.win = req.body.win),
      (standingCLub.drawn = req.body.drawn),
      (standingCLub.lose = req.body.lose),
      (standingCLub.goalsFor = req.body.goalsFor),
      (standingCLub.goalsAgainst = req.body.goalsAgainst),
      (standingCLub.goalDifference = req.body.goalDifference),
      await standingCLub.save();
    res.send("Update successful");
  } catch {
    res.status(404).send({ error: "club is not found in standing" });
  }
};

const updateStandingAfterMatch = async (req, res) => {
  try {
    const club1 = await standingDb.find({
      clubId: req.body.club1Id,
    });
    const club2 = await standingDb.find({
      clubId: req.body.club2Id,
    });
    // const winPoint = await parameterDb.find({ nameParameter: "winPoint" });
    // const drawPoint = await parameterDb.find({ nameParameter: "drawnPoint" });
    if (req.body.club1Goal > req.body.club2Goal) {
      // club1 win
      let diff = req.body.club1Goal - req.body.club2Goal;
      //update Club1
      club1[0].point = club1[0].point + 3;
      club1[0].goalDifference = club1[0].goalDifference + diff;
      club1[0].goalsAgainst = club1[0].goalsAgainst + req.body.club2Goal;
      club1[0].goalsFor = club1[0].goalsFor + req.body.club1Goal;
      club1[0].win++;
      club1[0].played++;
      //update Club2
      club2[0].goalDifference = club2[0].goalDifference - diff;
      club2[0].goalsAgainst = club2[0].goalsAgainst + req.body.club1Goal;
      club2[0].goalsFor = club2[0].goalsFor + req.body.club2Goal;
      club2[0].lose++;
      club2[0].played++;
    } else if (req.body.club1Goal < req.body.club2Goal) {
      // club2 win
      let diff = req.body.club1Goal - req.body.club2Goal;
      //update Club1
      club1[0].goalDifference = club1[0].goalDifference + diff;
      club1[0].goalsAgainst = club1[0].goalsAgainst + req.body.club2Goal;
      club1[0].goalsFor = club1[0].goalsFor + req.body.club1Goal;
      club1[0].lose++;
      club1[0].played++;
      //update Club2
      club2[0].point = club2[0].point + 3;
      club2[0].goalDifference = club2[0].goalDifference - diff;
      club2[0].goalsAgainst = club2[0].goalsAgainst + req.body.club1Goal;
      club2[0].goalsFor = club2[0].goalsFor + req.body.club2Goal;
      club2[0].win++;
      club2[0].played++;
    } else {
      //drawn
      //update Club1
      club1[0].point = club1[0].point + 1;
      club1[0].goalsAgainst = club1[0].goalsAgainst + req.body.club2Goal;
      club1[0].goalsFor = club1[0].goalsFor + req.body.club1Goal;
      club1[0].drawn++;
      club1[0].played++;
      //update Club2
      club2[0].point = club2[0].point + 1;
      club2[0].goalsAgainst = club2[0].goalsAgainst + infor.club1Goal;
      club2[0].goalsFor = club2[0].goalsFor + req.body.club2Goal;
      club2[0].drawn++;
      club2[0].played++;
    }
    await club1[0].save();
    await club2[0].save();
  } catch {
    res.status(404).send({ error: "can't update" });
  }
};

const deleteClubStanding = async (req, res) => {
  try {
    const club = await standingDb.find({
      clubId: req.params.clubId,
      season: req.body.season,
    });
    await club.remove();
    res.send("delete sucessful!");
  } catch {
    res.status(404).send({ error: "club is not found in standing" });
  }
};
const sortStanding = async () => {
  try {
    const allClub = await standingDb.find();
    let count = Object.keys(allClub).length;
    for (let i = 0; i < count; i++) {
      for (let j = i; j < count; j++) {
        if (allClub[j].point < allClub[i].point) {
          let swap = allClub[j];
          allClub[j] = allClub[i];
          allClub[i] = swap;
        } else if (allClub[j].point == allClub[i].point) {
          if (allClub[j].goalDifference < allClub[i].goalDifference) {
            let swap = allClub[j];
            allClub[j] = allClub[i];
            allClub[i] = swap;
          }
        }
      }
    }
    for (let i = 0; i < count; i++) {
      allClub[i].rank = count - i;
      await allClub[i].save();
    }
  } catch (error) {
    res.status(404).send("error");
  }
};

export {
  getStanding,
  getStandingOnSeason,
  createNewClubToStanding,
  updateStanding,
  updateStandingAfterMatch,
  deleteClubStanding,
  sortStanding,
};
