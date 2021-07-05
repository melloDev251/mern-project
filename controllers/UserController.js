const userModel = require('../models/UserModel')

// pour controller l'id
const objectID = require('mongoose').Types.ObjectId;


module.exports.getAllUsers = async (req, res) => {
    const users = await userModel.find().select("-password");
    res.status(200).json(users);
}


// info d'un seul utilisateur (id)
module.exports.userInfo = (req, res) => {
    console.log(req.params);
    if (!objectID.isValid(req.params.id))
        return res.status(400).send("ID inconnue : " + req.params.id)

    userModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log("ID inconnue : " + err);
    })
};

// update
module.exports.updateUser = async (req, res) => {
    if (!objectID.isValid(req.params.id))
        return res.status(400).send("ID inconnue : " + req.params.id)

    try {
        await userModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    bio: req.body.bio,
                    // pseudo: req.body.pseudo
                },
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                if (err) return res.status(500).send({ message: err });
            }
        );
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

// delete
module.exports.deleteUser = async (req, res) => {
    if (!objectID.isValid(req.params.id))
        return res.status(400).send("ID inconnue : " + req.params.id);

    try {
        await userModel.remove({ _id: req.params.id }).exec();
        res.status(200).json({ message: "Supprimé avec succès. " });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

// follower and following
module.exports.follow = async (req, res) => {
    if (
        !objectID.isValid(req.params.id) ||
        !objectID.isValid(req.body.idToFollow)
    )
        return res.status(400).send("ID inconnue : " + req.params.id);

    try {
        // add to the follower list
        await userModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { following: req.body.idToFollow } },
            { new: true, upsert: true },
            (err, docs) => {
                if (!err) res.status(201).json(docs);
                else return res.status(400).json(err);
            }
        );
        // add to following list
        await userModel.findByIdAndUpdate(
            req.body.idToFollow,
            { $addToSet: { followers: req.params.id } },
            { new: true, upsert: true },
            (err, docs) => {
                // if (!err) res.status(201).json(docs);
                if (err) return res.status(400).json(err);
            }
        );
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

// unfollow
module.exports.unfollow = async (req, res) => {
    if (
        !objectID.isValid(req.params.id) ||
        !objectID.isValid(req.body.idToUnFollow)
    )
        return res.status(400).send("ID inconnue : " + req.params.id);

    try {
        await userModel.findByIdAndUpdate(
            req.params.id,
            { $pull: { following: req.body.idToUnFollow } },
            { new: true, upsert: true },
            (err, docs) => {
                if (!err) res.status(201).json(docs);
                else return res.status(400).json(err);
            }
        );
        // remove to following list
        await userModel.findByIdAndUpdate(
            req.body.idToUnFollow,
            { $pull: { followers: req.params.id } },
            { new: true, upsert: true },
            (err, docs) => {
                // if (!err) res.status(201).json(docs);
                if (err) return res.status(400).json(err);
            }
        );
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};