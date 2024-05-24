import Contact from "../db/models/Contact.js";

export const listContacts = (search = {}) => {
  const { filter = {}, fields = "", settings = {} } = search;
  return Contact.find(filter, fields, settings).populate(
    "owner",
    "username email",
  );
};

export const countContacts = (filter) => Contact.countDocuments(filter);

export const getContactById = (filter) => Contact.findOne(filter);

export const removeContact = (filter) => Contact.findOneAndDelete(filter);

export const addContact = (data) => Contact.create(data);

export const updateContactById = (filter, data) =>
  Contact.findOneAndUpdate(filter, data);
