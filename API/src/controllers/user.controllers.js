const _ = require('underscore');

const User = require('../models/user.models');

exports.GetOneUser = (req,res) => {
    let id = req.params.id;

    User.findOne({_id:id},(Err,userDB)=>{
        if (Err) {
            return res.status(404).json({
                ok:false,
                message:'User not found',
                error: Err
            });
        }
        return res.status(200).json({
            ok:true,
            message:'User found successfully',
            userDB
        });
    })
}


exports.GetAllUser = (req,res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limit = req.query.limite || 5;
    limit = Number(limit);
    
    
    User.find({ state: true }, 'name email')
        .skip(desde)
        .limit(limit)
        .exec((err,users) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            User.count({ state: true }, (err, conteo) => {

                res.status(200).json({
                    ok: true,
                    users,
                    content:conteo
                });

            });


        });

}


exports.PostUser = (req,res) => {

    let body = req.body;
    
    let newUser = new User({
        name:body.name,
        email:body.email,
        password:body.password,
        rols:body.role
    });


    User.findOne({email:newUser.email},(Err,user)=>{
        
        if (user) {
            return res.status(400).json({
                ok:false,
                message :"email exits"
            });
        }

        newUser.save((err,doc)=>{
            if (err) {
                return res.status(400).json({
                    ok:false,
                    message:'Bad Request',
                })
            }

            return res.status(200).json({
                ok:true,
                User:doc
            });
        });
        
    });
}


exports.PutUser = (req,res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'email', 'password', 'state', 'rols']);

    User.findByIdAndUpdate(id,body,{new:true,runValidators:true},(err,userDB)=>{
        if (err) {
            return res.status(400).json({
                ok:false,
                message:'Bad Request User not found!',
                error: err
            });
        }
        return res.status(201).json({
            ok:true,
            message:'User Updated successfully!',
            userDB
        });
    })
}


exports.DeleteUser = (req,res) => {
    let id = req.params.id;

    let changedState = {
        state: false
    };

    User.findByIdAndUpdate(id,changedState,{new:true},(err,userDB)=>{
        if (err) {
            return res.status(400).json({
                ok:false,
                message:'Bad Request',
                error: err
            });
        }

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                err: {
                    message: 'User not found'
                }
            });
        }

        return res.status(201).json({
            ok:true,
            message:'User Successfully Deleted',
            userDB
        });
    });
}