import { openDB } from 'idb';

const initdb = async () => {
  const db = await openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });
  return db; // Return the database instance
};

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const db = await initdb(); // Get the database instance
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  await store.put({ content });
  await tx.complete;
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const db = await initdb(); // Get the database instance
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  return store.getAll();
};
initdb();
