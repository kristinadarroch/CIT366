var express = require('express');
var router = express.Router();
var sequenceGenerator = require('./sequenceGenerator');

const Contacts = require('../models/contact');

function returnError(res, error) {
    res.status(500).json({
      message: 'An error occurred',
      error: error
    });
  }

router.get('/',
(req, res, next) => {
Contacts.find()
    .populate('group')
    .then(contacts => {
        res.status(200).json ({
            message: 'contacts fetched successfully!',
            contacts: contacts
        });
    })
    .catch(error => {
    returnError(res, error);
  });
}
);

router.get('/:id',
(req, res, next) => {
Contacts.findOne({"id" : req.params.id})
    .populate('group')
    .then(contact => {
        res.status(200).json ({
            message: 'contacts fetched successfully!',
            contact: contact
        });
    })
    .catch(error => {
    returnError(res, error);
  });
}
);

router.post('/', (req, res, next) => {
    const maxContactId = sequenceGenerator.nextId("contacts");
  
    const contact = new Contacts({
      id: maxContactId,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      imageUrl: req.body.url
    });
  
    contact.save()
      .then(createdContact => {
        res.status(201).json({
          message: 'contact added successfully',
          contact: createdContact
        });
      })
      .catch(error => {
        returnError(res, error);
      });
  });

  router.put('/:id', (req, res, next) => {
    Contacts.findOne({ id: req.params.id })
      .then(contact => {
        contact.name = req.body.name;
        contact.email = req.body.email;
        contact.phone = req.body.phone;
        contact.imageUrl = req.body.url;
        contact.group = req.body.group;
  
        Contacts.updateOne({ id: req.params.id }, contact)
          .then(result => {
            res.status(204).json({
              message: 'contact updated successfully'})
          })
          .catch(error => {
            returnError(res, error);
          });
      })
      .catch(error => {
        res.status(500).json({
          message: 'contact not found.',
          error: { contact: 'contact not found'}
        });
      });
  });

  router.delete("/:id", (req, res, next) => {
    Contacts.findOne({ id: req.params.id })
      .then(contact => {
        Contacts.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({ message: "contact deleted successfully" });
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