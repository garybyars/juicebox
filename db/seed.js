const { client, 
  getAllUsers, 
  createUser 
} = require('./index');

const dropTables = async() => {
  try {
    console.log('starting to drop tables');

    await client.query(`
    DROP TABLE IF EXISTS users; 
  `)

    console.log('finished dropping tables');
  } catch(err) {
    console.log('error dropping tables')
    throw err;
  }
}

const createTables = async() => {
  try {
    console.log('starting to build tables')

    await client.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );
  `);
  
  console.log('finished building tables');
  } catch(err) {
    console.log('error building tables');
    throw err;
  }
}

const createInitialUsers = async() => {
  try {
    console.log('starting to create users')

    const albert = await createUser({ username: 'albert', password: 'bertie99' });
    const sandra = await createUser({ username: 'sandra', password: '2sandy4me' });
    const glamgal = await createUSer({ username: 'glamgal', password: 'soglam' });

    console.log('finished creating users')

  } catch(err) {
    console.log('error creating users')
    throw err
  }
}

const rebuildDB = async() => {
  try {
    client.connect();

    await dropTables();
    await createTables();
    await createInitialUsers();
  } catch(err) {
    throw err;
  }
}

const testDB = async() => {
  try {
    console.log('starting to test database');

    const users = await getAllUsers();
    console.log('getAllUsers',users);

    console.log('finished testing database');
  } catch (err) {
    console.log('error testing database');
    throw err;
  }
}

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());