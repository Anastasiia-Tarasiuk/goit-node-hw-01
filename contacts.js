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























// // function listContacts() {    
// //     return fs.readFileSync(contactsPath, 'utf8', (error, data) => {
    
// //         if (error) {
// //             return console.error(error);
// //         }

// //         console.table(JSON.parse(data));
// //         return JSON.parse(data);
// //     })        
// // }

// function listContacts() {    
//     fs.readFile(contactsPath, 'utf8', (error, data) => {
    
//         if (error) {
//             return console.error(error);
//         }

//         console.table(JSON.parse(data));
//         return JSON.parse(data);
//     })        
// }

// function getContactById(contactId) {
//     fs.readFile(contactsPath, 'utf8', (error, data) => {

//         if (error) {
//             return console.error(error);
//         }
        
//         JSON.parse(data).find(contact => {
//             if (Number(contact.id) === Number(contactId)) {
//                 console.table(contact);
//             }
//         });

//     });
// }

// function removeContact(contactId) {

//     fs.readFile(contactsPath, 'utf8', (error, data) => {
        
//         if (error) {
//             return console.error(error);
//         }
        
//         const filteredContacts = JSON.parse(data).filter(contact => Number(contact.id) !== Number(contactId));
//         console.table(filteredContacts);
//     })
// }

// function addContact(name, email, phone) {
     
//     const prevContacts = listContacts();
//     const newContact = { id: id, name: name, email: email, phone: phone };

//     console.log(prevContacts)
     
//     const allContacts = JSON.parse(prevContacts).push(newContact);


//     fs.writeFile(contactsPath, JSON.stringify(allContacts), 'utf8', (error) => {
        
//         if (error) {
//             return console.error(error);
//         }
//         console.table(allContacts)

//     });

// };

module.exports = { listContacts, getContactById, removeContact, addContact };