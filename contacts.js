const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const id = uuidv4();

const contactsPath = path.resolve('db/contacts.json');

async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath, 'utf8');
        const contacts = JSON.parse(data);
        console.table(contacts);
        
    } catch (error) {
        console.log(error);
    }
}

async function getContactById(contactId) {
    try {
        const data = await fs.readFile(contactsPath, 'utf8');
        const contacts = JSON.parse(data);
        contacts.find(contact => {
            if (contact.id === contactId) {
                console.table(contact);
            }            
        })
    } catch (error) {
        console.log(error);
    }
}

async function removeContact(contactId) {
    try {
        const data = await fs.readFile(contactsPath, 'utf8');
        const contacts = JSON.parse(data);
        const filteredContacts = contacts.filter(contact => contact.id !== contactId)
        console.table(filteredContacts);
    } catch (error) {
        console.log(error);    
    }
}

async function addContact(name, email, phone) {
    try {
        const data = await fs.readFile(contactsPath, 'utf8');
        const prevContacts = JSON.parse(data);
        const newContact = { id, name, email, phone };
        const allContacts = [...prevContacts, newContact];

        await fs.writeFile(contactsPath, JSON.stringify(allContacts), 'utf8');
        console.table(`Contact ${newContact.name} was added succesfully`);
        console.table(newContact);
    } catch (error) {
        console.log(error); 
    }
}

module.exports = { listContacts, getContactById, removeContact, addContact };