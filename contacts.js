const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const id = uuidv4();

const contactsPath = path.resolve('db/contacts.json');

function listContacts() {    

    fs.readFile(contactsPath, 'utf8', (error, data) => {
       
        if (error) {
            return console.error(error);
        }

        console.log(JSON.parse(data));
    })
}

function getContactById(contactId) {

    fs.readFile(contactsPath, 'utf8', (error, data) => {
        
        if (error) {
            return console.error(error);
        }
        
        JSON.parse(data).map(contact => {
            if (Number(contact.id) === contactId) {
                console.table(contact);
            }       
        });

    })
}

function removeContact(contactId) {

    fs.readFile(contactsPath, 'utf8', (error, data) => {
        
        if (error) {
            return console.error(error);
        }
        
        const filteredContacts = JSON.parse(data).filter(contact => Number(contact.id) !== contactId);
        console.log(filteredContacts);
    })
}

async function addContact(name, email, phone) {

    try {
        const prevContacts = listContacts();
        const newContact = `{id: ${id}, name: ${name}, email: ${email}, phone: ${phone}}`;

        // fs.writeFile(contactsPath, `${prevContacts.push(newContact)}`, 'utf8', (error, data) => {
            
        //     if (error) {
        //         return console.error(error);
        //     }
            
    
        //     console.log(data);
        // });

    } catch (error) {
        console.log(error);
    }



};

module.exports = { listContacts, getContactById, removeContact, addContact };