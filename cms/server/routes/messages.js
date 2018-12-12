var express = require('express');
var router = express.Router();
var sequenceGenerator = require('./sequenceGenerator');

const Message = require('../models/message');

function returnError(res, error) {
    res.status(500).json({
      message: 'An error occurred',
      error: error
    });
  }

router.get('/',
(req, res, next) => {
    Message.find()
    .populate('sender')
    .then(messages => {
        res.status(200).json ({
            message: 'Messages fetched successfully!',
            messages: messages
        });
    })
    .catch(error => {
    returnError(res, error);
  });
}
);

router.post('/', (req, res, next) => {
    const maxMessageId = sequenceGenerator.nextId("messages");
  
    const message = new Message({
      id: maxMessageId,
      name: req.body.name,
      msgText: req.body.msgText,
      sender: req.body.sender
    });
  
    message.save()
      .then(createdMessage => {
        res.status(201).json({
          message: 'Document added successfully',
          messageId: createdMessage.id
        });
      })
      .catch(error => {
        returnError(res, error);
      });
  });

  router.put('/:id', (req, res, next) => {
    Message.findOne({ id: req.params.id })
      .then(message => {
        message.subject = req.body.name;
        message.msgText = req.body.description;
        message.sender = req.body.url;
  
        Message.updateOne({ id: req.params.id }, message)
          .then(result => {
            res.status(204).json({
              message: 'message updated successfully'})
          })
          .catch(error => {
            returnError(res, error);
          });
      })
      .catch(error => {
        res.status(500).json({
          message: 'message not found.',
          error: { message: 'message not found'}
        });
      });
  });

  router.delete("/:id", (req, res, next) => {
    Message.findOne({ id: req.params.id })
      .then(message => {
        Message.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({ message: "message deleted successfully" });
          })
          .catch(error => {
            returnError(res, error);
          })
      })
      .catch(error => {
        returnError(res, error);
      });
  });

module.exports = router;