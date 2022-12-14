var express = require("express");
const sequenceGenerator = require("./sequenceGenerator");
const Contact = require("../models/contacts");
var router = express.Router();

// Fetch contacts from database
router.get("/", (req, res, next) => {
  Contact.find()
    .populate("group")
    .then((contacts) => {
      //console.log(contacts);
      res.status(200).json({
        message: "Contacts fetch successfully.",
        contacts: contacts,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "An error occurred.",
        error: err,
      });
    });
});

// Create contact
router.post("/", (req, res, next) => {
  function saveContact(contacts) {
    const maxContactId = sequenceGenerator.nextId("contacts");
    let contact = new Contact({
      id: maxContactId,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      imageUrl: req.body.imageUrl,
      group: contacts,
    });

    contact
      .save()
      .then((createdContact) => {
        res.status(201).json({
          message: "Contact added successfully.",
          contact: createdContact,
          id: createdContact.id,
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: "An error occurred.",
          error: error,
        });
      });
  }

  async function getContactsRef(callback) {
    let result = [];

    for (let g of req.body.group) {
      let contactGroup = await Contact.findOne({ id: g.id });
      result.push(contactGroup._id);
    }

    callback(result);
  }

  getContactsRef(saveContact);

  
});

router.put("/:id", (req, res, next) => {
  Contact.findOne({ id: req.params.id })
    .then((contact) => {
      let getGroups = async () => {
        let groups = [];
        for (let g of req.body.group) {
          let contactGroup = await Contact.findOne({ id: g.id });
          groups.push(contactGroup._id);
        }
        return groups;
      };

      getGroups()
        .then((groupResult) => {
          contact.name = req.body.name;
          contact.email = req.body.email;
          contact.phone = req.body.phone;
          contact.imageUrl = req.body.imageUrl;
          contact.group = groupResult;

          Contact.updateOne({ id: req.params.id }, contact).then((result) => {
            res.status(204).json({
              message: "Contact updated successfully.",
            });
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "Contact not found.",
            error: { contact: "Contact not found." },
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Contact not found.",
        error: { contact: "Contact not found." },
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Contact.findOne({ id: req.params.id })
    .then((contact) => {
      Contact.deleteOne({ id: req.params.id }).then((result) => {
        res.status(204).json({
          message: "Contact deleted successfully.",
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "An error occurred.",
        error: err,
      });
    });
});

module.exports = router;