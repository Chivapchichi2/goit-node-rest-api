import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import path from "path";

const contactsPath = path.resolve("db", "contacts.json");

export async function listContacts() {
  try {
    return await readContacts();
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

export async function getContactById(contactId) {
  try {
    const contacts = await readContacts();
    const contact = contacts.find(({ id }) => id === contactId);
    if (!contact) {
      return null;
    }
    return contact;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

export async function removeContact(contactId) {
  try {
    const contacts = await readContacts();
    const index = contacts.findIndex(({ id }) => id === contactId);
    if (index === -1) {
      return null;
    }
    const removedContact = contacts.splice(index, 1)[0];
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return removedContact;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

export async function addContact({ name, email, phone }) {
  try {
    const contacts = await readContacts();
    const newContact = { id: uuidv4(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

export async function readContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

export async function updateContactById(id, data) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }

  contacts[index] = { ...contacts[index], ...data };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return contacts[index];
}
