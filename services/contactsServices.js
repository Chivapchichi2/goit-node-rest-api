import Contact from "../db/models/Contact.js";

export const listContacts = () => Contact.find();

export const getContactById = (contactId) => Contact.findById(contactId);

export const removeContact = (contactId) =>
  Contact.findByIdAndDelete(contactId);

export const addContact = (data) => Contact.create(data);

export const updateContactById = (id, data) =>
  Contact.findByIdAndUpdate(id, data);
