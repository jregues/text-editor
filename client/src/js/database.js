import { openDB } from 'idb';

const initDb = async () => 
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });
;

export const putDb = async (content) => {
  try {
    const db = await openDB('jate', 1);
    const tx = db.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');

    // Add the content to the database
    await store.put({id: 1, value: content});

    console.log('Content added to the database successfully');
  } catch (error) {
    console.error('Error adding content to the database:', error);
  }
};

export const getDb = async () => {
  try {
    const db = await openDB('jate', 1);
    const tx = db.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');

    // Retrieve all content from the database
    const allContent = await store.get(1);

    console.log('All content retrieved from the database:', allContent);
    return allContent;
  } catch (error) {
    console.error('Error retrieving content from the database:', error);
    return null;
  }
};

// Call the method to get all content from the database
initDb()
getDb();
