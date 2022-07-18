var express = require('express');
var router = express.Router();


const sequenceGenerator = require('./sequenceGenerator');

const Message = require('../models/message');
const Contact = require('../models/contact');

router.get('/', (req, res, next) => {
    Message.find({}, {_id:0})
        .populate('sender')
        .then(messages => {
            res
                .status(200)
                .json({
                    code: "Messages fetched successfully",
                    messages: messages
                });
        })
        .catch(error => {
            res.status(500).json({
                message:'An error occured',
            error:error
            });
        });
});

router.get('/:id', (req, res, next) => {
    Message.findOne({
        'id': req.params.id
    }, {_id:0})
        .then(message => {
            res
                .status(200)
                .json({
                    code: "Message fetched successfully",
                    message: message
                });
        })
        .catch(error => {
            res.status(500).json({
                message:'An error occured',
            error:error
            });
        });
});

router.post('/', (req, res, next) => {
    const sender = req.body.sender
    console.log(sender);
    const maxMessageId = sequenceGenerator.nextId('messages');

    Contact.findOne({ 
        "id": req.body.sender
    })
    .then(contact =>{

        console.log(sender);
        const message = new Message({
            id: maxMessageId,
            subject: req.body.subject,
            msgText: req.body.msgText,
            sender: contact._id
        });
    
        message.save()
            .then(createdMessage => {
                console.log(sender);
                let newMessage = {
                    id: createdMessage.id,
                    subject: createdMessage.subject,
                    msgText: createdMessage.msgText,
                    sender: sender
                }
                
                console.log(newMessage);
                res
                    .status(201)
                    .json({
                        code:"Message Added Successfully",
                        message: newMessage
                    });
            })
            .catch(error => {
                res.status(500).json({
                    message: "An error occurred",
                    error: error
                })
            })
    })

    
});




module.exports = router