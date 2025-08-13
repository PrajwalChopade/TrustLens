// import express from 'express';
// import cors from 'cors';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcryptjs';
// import { v4 as uuidv4 } from 'uuid';
// import { MongoClient } from "mongodb";

// const app = express();
// const PORT = 5000;
// const JWT_SECRET = 'your-super-secret-jwt-key-change-in-production';

// // Middleware
// app.use(cors());
// app.use(express.json());

// // In-memory database (replace with MongoDB in production)
// const users = [];
// const developers = [];
// const apps = [];
// const activities = [];
// const apiRequests = [];

// // Sample data
// const sampleDeveloper = {
//   id: uuidv4(),
//   email: 'dev@hacronyx.com',
//   password: bcrypt.hashSync('password123', 10),
//   name: 'HACRONYX',
//   role: 'developer',
//   createdAt: new Date(),
//   stats: {
//     totalApps: 4,
//     activeUsers: 2451,
//     apiRequests: 45200,
//     successRate: 99.9
//   }
// };

// const sampleUser = {
//   id: uuidv4(),
//   email: 'kanan.22310614@viit.ac.in',
//   password: bcrypt.hashSync('password123', 10),
//   name: 'Kanan Patel',
//   role: 'user',
//   createdAt: new Date(),
//   stats: {
//     connectedApps: 0,
//     activeConsents: 0,
//     dataAccesses: 0,
//     notifications: 3
//   }
// };

// developers.push(sampleDeveloper);
// users.push(sampleUser);

// // Add sample activities
// activities.push(
//   { id: uuidv4(), type: 'user_registration', message: 'New user registration', timestamp: new Date(Date.now() - 2 * 60 * 1000) },
//   { id: uuidv4(), type: 'user_registration', message: 'New user registration', timestamp: new Date(Date.now() - 2 * 60 * 1000) },
//   { id: uuidv4(), type: 'user_registration', message: 'New user registration', timestamp: new Date(Date.now() - 2 * 60 * 1000) }
// );

// // Authentication middleware
// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) {
//     return res.sendStatus(401);
//   }

//   jwt.verify(token, JWT_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// };

// // Auth routes
// app.post('/api/auth/register', async (req, res) => {
//   try {
//     const { email, password, name, role } = req.body;
    
//     const existingUser = [...users, ...developers].find(u => u.email === email);
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = {
//       id: uuidv4(),
//       email,
//       password: hashedPassword,
//       name,
//       role,
//       createdAt: new Date(),
//       stats: role === 'developer' 
//         ? { totalApps: 0, activeUsers: 0, apiRequests: 0, successRate: 100 }
//         : { connectedApps: 0, activeConsents: 0, dataAccesses: 0, notifications: 0 }
//     };

//     if (role === 'developer') {
//       developers.push(newUser);
//     } else {
//       users.push(newUser);
//     }

//     const token = jwt.sign({ userId: newUser.id, role: newUser.role }, JWT_SECRET);
    
//     res.status(201).json({
//       token,
//       user: {
//         id: newUser.id,
//         email: newUser.email,
//         name: newUser.name,
//         role: newUser.role
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// app.post('/api/auth/login', async (req, res) => { 
  
//   const {email, password, role} = req.body;
//   console.log(email + " " + password + " " + role);
//   const uri = "mongodb://localhost:27017"; 
// const client = new MongoClient(uri);
//   if(role == "user") {
//       try {
//       await client.connect();
//       const db = client.db("users");
//       const collection = db.collection("user_creds");

//       const user = await collection.findOne({ email });

//       if (!user) {
//         return res.status(404).json({ success: false, message: "User not found" });
//       }

//       if (user.password !== password) {
//         return res.status(401).json({ success: false, message: "Incorrect password" });
//       }

//       const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET);
    
//     return res.json({
//       token,
//       user: {
//         id: email,
//         email: email,
//         role: role
//       }
//     });

//     } catch (err) {
//       console.error("Login error:", err);
//       return res.status(500).json({ success: false, message: "Internal server error" });
//     } finally {
//       await client.close();
//     }
//   }
//   else {
//       try {
//       await client.connect();
//       const db = client.db("dev");
//       const collection = db.collection("dev_creds");

//       const user = await collection.findOne({ email });

//       if (!user) {
//         return res.status(404).json({ success: false, message: "User not found" });
//       }

//       if (user.password !== password) {
//         return res.status(401).json({ success: false, message: "Incorrect password" });
//       }

      

//       const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET);
    
//     return res.json({
//       token,
//       user: {
//         id: email,
//         email: email,
//         name: email,
//         role: role
//       }
//     });

//     } catch (err) {
//       console.error("Login error:", err);
//       return res.status(500).json({ success: false, message: "Internal server error" });
//     } finally {
//       await client.close();
//     }
//   }

// });

// app.post('/getApiKeys', (req, res) => {
//   const email = req.body.email;
//   const uri = "mongodb://localhost:27017";
//   const client = new MongoClient(uri);
 

//     try {
//       let fn = async () => {
//          const database = client.db("dev");

//         const collection = database.collection("dev_keys");
//         const user = await collection.find({ email }).toArray();

        
//         return res.json({ user })
//       }
//      fn();

//     }
//     catch(error) {

//     }
//     return;
// })
// app.post('/createApiKey', (req, res) => {
//   console.log(req.body)
//   console.log("hello")
//   const email = req.body.email;
//   const name = req.body.name;
//   const key = req.body.key;
//   const permissions = req.body.permissions;
//   const date = req.body.date;
//    const uri = "mongodb://localhost:27017";
//   const client = new MongoClient(uri);

//   try {
//     let fn = async () => {
//       await client.connect();
//        const database = client.db("dev");

//       const collection = database.collection("dev_keys");
//       const result = await collection.insertOne({email, name, key, permissions, date});
//       console.log(result)
     
//     }
//     fn();
//       return res.json();

//   }
//   catch (error) {
//     console.log(error)
//   }
//       return res.json();
  

// })

// app.get('/test', (req, res) => {
  
//   return res.json({"hello" : "there"})
// })

// app.post('/signUp', (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;
//   const name = req.body.name;
//   const role = req.body.role;
//   console.log(email + " " + password + " " + name + " " + role + " ");
//     const uri = "mongodb://localhost:27017";
//   const client = new MongoClient(uri);
  
//      if(role == "user") {
//       console.log("helo")
//       async function createUserProfile() {
//       console.log("helo2")

//         try {
//            console.log("helo3")
//           await client.connect();
//           const database = client.db("users");

//           const collection = database.collection("user_creds");
//           console.log("hello user")
//           const result = await collection.insertOne({"email" : email, "password" : password, "name" : name});
//           console.log("Inserted document:", result.insertedId);
          
//         } catch (err) {
//           console.error("Error inserting profile:", err);
//         } finally {
//           await client.close();
//         }
//       }
//       createUserProfile();
//     }
//     else {
//       async function createDeveloperProfile() {
//         try {
//           await client.connect();
//           const database = client.db("dev");
//           const collection = database.collection("dev_creds");
//           console.log("hello dev")

//           const result = await collection.insertOne({"email" : email, "password" : password, "name" : name});
//           console.log("Inserted document:", result.insertedId);
//         } catch (err) {
//           console.error("Error inserting profile:", err);
//         } finally {
//           await client.close();
//         }
//       }
//       createDeveloperProfile();
//     }
//     return res.json({"hi" : "there"})
// })
// // Dashboard routes
// app.get('/api/dashboard/stats', authenticateToken, (req, res) => {
//   const userArray = req.user.role === 'developer' ? developers : users;
//   const user = userArray.find(u => u.id === req.user.userId);
  
//   if (!user) {
//     return res.status(404).json({ message: 'User not found' });
//   }

//   res.json(user.stats);
// });
// app.post('/getName', (req, res) => {
//   const {email, role} = req.body;
//   const uri = "mongodb://localhost:27017"; 
// const client = new MongoClient(uri);
//   if(role == 'user') {
//     async function findUserName () {
//       await client.connect();
//       const db = client.db("users");
//       const collection = db.collection("user_creds");

//       const user = await collection.findOne({ email });
//       return res.json({'name' : user.name})
//     }
//     findUserName();
//   }
//   else {
//     async function findDevName () {
//       await client.connect();
//       const db = client.db("dev");
//       const collection = db.collection("dev_creds");

//       const user = await collection.findOne({ email });
//       return res.json({'name' : user.name})
//     }
//     findDevName();
//   }
// }) 

// app.get('/api/dashboard/activities', authenticateToken, (req, res) => {
//   res.json(activities.slice(0, 10));
// });

// app.get('/api/dashboard/profile', authenticateToken, (req, res) => {
//   const userArray = req.user.role === 'developer' ? developers : users;
//   const user = userArray.find(u => u.id === req.user.userId);
  
//   if (!user) {
//     return res.status(404).json({ message: 'User not found' });
//   }

//   res.json({
//     id: user.id,
//     email: user.email,
//     name: user.name,
//     role: user.role,
//     createdAt: user.createdAt
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


















import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { MongoClient } from "mongodb";
import mongoose from 'mongoose';
import UserInfo from './userschema.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = 5000;
const JWT_SECRET = 'your-super-secret-jwt-key-change-in-production';

// MongoDB configuration
const MONGODB_URI = process.env.MONGODB_URI;

// MongoDB client options
const mongoOptions = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

// Mongoose connection for user profile data
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb', extended: true }));


const mongooseDb = mongoose.connection;
mongooseDb.on('error', console.error.bind(console, 'Mongoose connection error:'));
mongooseDb.once('open', function() {
  console.log('Connected to MongoDB via Mongoose for user profiles');
});

// Middleware
app.use(cors());
app.use(express.json());

// In-memory database (replace with MongoDB in production)
const users = [];
const developers = [];
const apps = [];
const activities = [];
const apiRequests = [];

// Sample data
const sampleDeveloper = {
  id: uuidv4(),
  email: 'dev@hacronyx.com',
  password: bcrypt.hashSync('password123', 10),
  name: 'HACRONYX',
  role: 'developer',
  createdAt: new Date(),
  stats: {
    totalApps: 4,
    activeUsers: 2451,
    apiRequests: 45200,
    successRate: 99.9
  }
};

const sampleUser = {
  id: uuidv4(),
  email: 'kanan.22310614@viit.ac.in',
  password: bcrypt.hashSync('password123', 10),
  name: 'Kanan Patel',
  role: 'user',
  createdAt: new Date(),
  stats: {
    connectedApps: 0,
    activeConsents: 0,
    dataAccesses: 0,
    notifications: 3
  }
};

developers.push(sampleDeveloper);
users.push(sampleUser);

// Add sample activities
activities.push(
  { id: uuidv4(), type: 'user_registration', message: 'New user registration', timestamp: new Date(Date.now() - 2 * 60 * 1000) },
  { id: uuidv4(), type: 'user_registration', message: 'New user registration', timestamp: new Date(Date.now() - 2 * 60 * 1000) },
  { id: uuidv4(), type: 'user_registration', message: 'New user registration', timestamp: new Date(Date.now() - 2 * 60 * 1000) }
);

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Auth routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name, role } = req.body;
    
    const existingUser = [...users, ...developers].find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: uuidv4(),
      email,
      password: hashedPassword,
      name,
      role,
      createdAt: new Date(),
      stats: role === 'developer' 
        ? { totalApps: 0, activeUsers: 0, apiRequests: 0, successRate: 100 }
        : { connectedApps: 0, activeConsents: 0, dataAccesses: 0, notifications: 0 }
    };

    if (role === 'developer') {
      developers.push(newUser);
    } else {
      users.push(newUser);
    }

    const token = jwt.sign({ userId: newUser.id, role: newUser.role }, JWT_SECRET);
    
    res.status(201).json({
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {   const {email, password, role} = req.body;
  console.log(email + " " + password + " " + role);
  const client = new MongoClient(MONGODB_URI, mongoOptions);
  if(role == "user") {
      try {
      await client.connect();
      const db = client.db("users");
      const collection = db.collection("user_creds");

      const user = await collection.findOne({ email });

      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      if (user.password !== password) {
        return res.status(401).json({ success: false, message: "Incorrect password" });
      }

      const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET);
    
    return res.json({
      token,
      user: {
        id: email,
        email: email,
        role: role
      }
    });

    } catch (err) {
      console.error("Login error:", err);
      return res.status(500).json({ success: false, message: "Internal server error" });
    } finally {
      await client.close();
    }
  }
  else {
      try {
      await client.connect();
      const db = client.db("dev");
      const collection = db.collection("dev_creds");

      const user = await collection.findOne({ email });

      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      if (user.password !== password) {
        return res.status(401).json({ success: false, message: "Incorrect password" });
      }

      

      const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET);
    
    return res.json({
      token,
      user: {
        id: email,
        email: email,
        name: email,
        role: role
      }
    });

    } catch (err) {
      console.error("Login error:", err);
      return res.status(500).json({ success: false, message: "Internal server error" });
    } finally {
      await client.close();
    }
  }

});

app.post('/getApiKeys', (req, res) => {
  const email = req.body.email;
  const client = new MongoClient(MONGODB_URI, mongoOptions);
 

  
    try {
      let fn = async () => {
         const database = client.db("dev");

        const collection = database.collection("dev_keys");
        const user = await collection.find({ email }).toArray();

        
        return res.json({ user })
      }
      fn();

    }
    catch(error) {

    }
    return;
})
app.post('/createApiKey', (req, res) => {
  console.log(req.body)
  console.log("hello")
  const email = req.body.email;
  const name = req.body.name;
  const key = req.body.key;  const permissions = req.body.permissions;
  const date = req.body.date;
  const client = new MongoClient(MONGODB_URI, mongoOptions);

  try {
    let fn = async () => {
      await client.connect();
       const database = client.db("dev");

      const collection = database.collection("dev_keys");
      const result = await collection.insertOne({email, name, key, permissions, date});
      console.log(result)
     
    }
    fn();
      return res.json();

  }
  catch (error) {
    console.log(error)
  }
      return res.json();
  

})

app.get('/test', (req, res) => {
  
  return res.json({"hello" : "there"})
})
app.post('/getDevInfo', async (req, res) => {
  const { email } = req.body;
  const client = new MongoClient(MONGODB_URI, mongoOptions);
 
  try {
    await client.connect();
    const db = client.db("dev");
    const col = db.collection("dev_profiles");

    const dev = await col.findOne({ email }, { sort: { createdAt: -1 } })

    return res.json(dev);
  }
catch(error) {console.log(error);}
return;
})

app.post('/saveDevInfo', async (req, res) => {
  const bod = req.body;

  const client = new MongoClient(MONGODB_URI, mongoOptions);

  try {
    await client.connect();
    const db = client.db("dev");
    const col = db.collection("dev_profiles");

    // Add timestamp field
    const docWithTimestamp = {
      ...bod,
      createdAt: new Date()
    };

    const result = await col.insertOne(docWithTimestamp);
    console.log("Inserted document:", result.insertedId);
    
    res.status(200).json({ success: true, insertedId: result.insertedId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  } finally {
    await client.close();
  }
});

app.post('/signUp', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;  const role = req.body.role;
  console.log(email + " " + password + " " + name + " " + role + " ");
  const client = new MongoClient(MONGODB_URI, mongoOptions);
  
     if(role == "user") {
      console.log("helo")
      async function createUserProfile() {
      console.log("helo2")

        try {
           console.log("helo3")
          await client.connect();
          const database = client.db("users");
          
          const collection = database.collection("user_creds");
          console.log("hello user")
          const result = await collection.insertOne({"email" : email, "password" : password, "name" : name});
          console.log("Inserted document:", result.insertedId);
          
        } catch (err) {
          console.error("Error inserting profile:", err);
        } finally {
          await client.close();
        }
      }
      createUserProfile();
    }
    else {
      async function createDeveloperProfile() {
        try {
          await client.connect();
          const database = client.db("dev");
          const collection = database.collection("dev_creds");
          console.log("hello dev")

          const result = await collection.insertOne({"email" : email, "password" : password, "name" : name});
          console.log("Inserted document:", result.insertedId);
        } catch (err) {
          console.error("Error inserting profile:", err);
        } finally {
          await client.close();
        }
      }
      createDeveloperProfile();
    }
    return res.json({"hi" : "there"})
})
// Dashboard routes
app.get('/api/dashboard/stats', authenticateToken, (req, res) => {
  const userArray = req.user.role === 'developer' ? developers : users;
  const user = userArray.find(u => u.id === req.user.userId);
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user.stats);
});


app.post('/middleware', async (req, res) => {
  const info = req.body;
  console.log(info)
  try {
    const client = new MongoClient(MONGODB_URI, mongoOptions);
    await client.connect();
    const db = client.db("central");
    const col = db.collection("auth");

   const len = await col.countDocuments({ "userEmail": info.userEmail, "devEmail": info.devEmail });
    const risk = len > 7 ? "Medium" : len > 12 ? "High" : "Low";
    console.log(len);
    let currentTime = new Date();

let currentOffset = currentTime.getTimezoneOffset();

let ISTOffset = 330;   // IST offset UTC +5:30 

let ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
    
    const infoWithTS = {
      ...info,
      timestamp: ISTTime,
      accessFrequency : (len + 1).toString(),
      risk_level : risk
    };

    const obj = await col.insertOne(infoWithTS);
    console.log(obj);

    const col2 = db.collection("apps");

    if(len == 0) {
      await col2.insertOne(infoWithTS);
      console.log("inserted")
    }
    else {
      await col2.deleteOne({"userEmail": info.userEmail, "devEmail": info.devEmail});
      await col2.insertOne(infoWithTS)

      console.log("replaced")

    }
    return res.json({"done" : "yes"});
  }
  catch(error) {
    console.log(error);
  }
  return;
})

app.post('/getConApp',async  (req, res) => {
  const { email } = req.body;
  try {
    const client = new MongoClient(MONGODB_URI, mongoOptions);
    await client.connect();
    const db = client.db('central');
    const col = db.collection('apps');

    const first = await col.find({ "userEmail" : email}).toArray()

   
    return res.json(first);
  }
  catch(error) {

  }
  return;
})

app.post('/getActivityLogs',async  (req, res) => {
  const { email } = req.body;
  try {
    const client = new MongoClient(MONGODB_URI, mongoOptions);
    await client.connect();
    const db = client.db('central');
    const col = db.collection('auth');

    const data = await col.find({ "userEmail" : email}).toArray();
    
    console.log(data)
    return res.json(data);
  }
  catch(error) {

  }
  return;
})

app.post('/signedUp', async (req, res) => {
  const info = req.body;
  try {
    const client = new MongoClient(MONGODB_URI, mongoOptions);
    await client.connect();
    const db = client.db("central");
    const col = db.collection("auth");

   const len = await col.countDocuments({ "userEmail": info.userEmail, "devEmail": info.devEmail });
    
    if(len > 0) {
      return res.json({"found" : true})
    }
    else {
      return res.json({"found" : false})

    }
  }
  catch(error) {
    console.log(error);
  }
  return;
})


app.post('/getName', (req, res) => {
  const {email, role} = req.body;
  const client = new MongoClient(MONGODB_URI, mongoOptions);
  if(role == 'user') {
    async function findUserName () {
      await client.connect();
      const db = client.db("users");
      const collection = db.collection("user_creds");

      const user = await collection.findOne({ email });
      return res.json({'name' : user.name})
    }
    findUserName();
  }
  else {
    async function findDevName () {
      await client.connect();
      const db = client.db("dev");
      const collection = db.collection("dev_creds");

      const user = await collection.findOne({ email });
      return res.json({'name' : user.name})
    }
    findDevName();
  }
}) 

// User Profile API endpoints
app.post('/api/users-info', async (req, res) => {
  try {
    console.log('Received user profile data for update/creation:', req.body);
    
    const { email, basic, personal, business, permissions, digitalId } = req.body;
    
    // Validate required fields
    if (!email || !basic || !basic.name) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and a name in the basic information are required' 
      });
    }

    const filter = { email: email };
    const update = {
      $set: {
        basic,
        personal: personal || {},
        business: business || {},
        permissions: permissions || { basic: [], personal: [], business: [] },
        digitalId
      }
    };
    const options = { 
      new: true, // Return the modified document
      upsert: true, // Create a new document if one doesn't exist
      runValidators: true,
      setDefaultsOnInsert: true
    };

    const savedUserInfo = await UserInfo.findOneAndUpdate(filter, update, options);
    
    console.log('User profile saved/updated successfully:', savedUserInfo._id);

    res.status(200).json({ // 200 OK for both create and update
      success: true,
      message: 'User profile saved successfully',
      userId: savedUserInfo._id,
      digitalId: savedUserInfo.digitalId,
      data: savedUserInfo
    });

  } catch (error) {
    console.error('Error saving user profile:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.keys(error.errors).map(key => ({
          field: key,
          message: error.errors[key].message
        }))
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error while saving user profile',
      error: error.message
    });
  }
});



app.post('/userProfile', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }
  try {
    const user = await UserInfo.findOne({ email }).sort({ updatedAt: -1 });
    if (!user) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }
    return res.json({ success: true, user });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user profile',
      error: error.message
    });
  }
});

app.post('/userImage', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }
  try {
    const user = await UserInfo.findOne({ email }).sort({ updatedAt: -1 });
    if (user && user.basic && user.basic.profilePhoto) {
      return res.json({ success: true, photo: user.basic.profilePhoto });
    }
    return res.status(404).json({ success: false, message: 'Image not found' });
  } catch (error) {
    console.error('Error fetching user image:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user image',
      error: error.message
    });
  }
});



// Get user profile by ID
app.get('/api/users-info/:id', async (req, res) => {
  try {
    const userInfo = await UserInfo.findById(req.params.id);
    
    if (!userInfo) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found'
      });
    }

    res.json({
      success: true,
      data: userInfo
    });

  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user profile',
      error: error.message
    });
  }
});

// Update user profile
app.put('/api/users-info/:id', async (req, res) => {
  try {
    const { basic, personal, business, permissions } = req.body;
    
    const updatedUserInfo = await UserInfo.findByIdAndUpdate(
      req.params.id,
      {
        basic,
        personal,
        business,
        permissions
      },
      { new: true, runValidators: true }
    );

    if (!updatedUserInfo) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found'
      });
    }

    res.json({
      success: true,
      message: 'User profile updated successfully',
      data: updatedUserInfo
    });

  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating user profile',
      error: error.message
    });
  }
});

// Get all user profiles (for admin/developer use)
app.get('/api/users-info', async (req, res) => {
  try {
    const userInfos = await UserInfo.find().select('-__v').sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: userInfos.length,
      data: userInfos
    });

  } catch (error) {
    console.error('Error fetching user profiles:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user profiles',
      error: error.message
    });
  }
});

app.get('/api/dashboard/activities', authenticateToken, (req, res) => {
  res.json(activities.slice(0, 10));
});

app.get('/api/dashboard/profile', authenticateToken, (req, res) => {
  const userArray = req.user.role === 'developer' ? developers : users;
  const user = userArray.find(u => u.id === req.user.userId);
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    createdAt: user.createdAt
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.post('/getPerms', async (req, res) => {
  const { key } = req.body;
  const client = new MongoClient(MONGODB_URI, mongoOptions);
   
  try {
    await client.connect();
    const db = client.db("dev");
    const col = db.collection("dev_keys");

    const perms = await col.findOne({ key });

    return res.json(perms.permissions);
  }
  catch(error) {
    console.log(error)
  }
  return;
})


app.post('/getDevProfile', async (req, res) => {
  const { key } = req.body;
  const client = new MongoClient(MONGODB_URI, mongoOptions);
   
  try {
    await client.connect();
    const db = client.db("dev");
    const col = db.collection("dev_keys");

    const perms = await col.findOne({ key });

    const email = perms.email;

    const col2 = db.collection("dev_profiles");
    const prof = await col2.findOne({ email }, {sort : {createdAt : -1}});
    return res.json(prof);
  }
  catch(error) {
    console.log(error)
  }
  return;
})













// Prajwal's Code
// Add this auto-save endpoint after your existing user-info endpoints

// Auto-save user profile (draft save)
// app.post('/api/users-info/auto-save', authenticateToken, async (req, res) => {
//   try {
//     console.log('🔄 Auto-saving profile for user:', req.user.id);
    
//     const { basic, personal, business, digitalId, isDraft } = req.body;
//     const userId = req.user.id;
//     const userEmail = req.user.email;
    
//     // Find existing profile or create new one
//     let profile = await UserInfo.findOne({ userId: userId });
    
//     const permissions = {
//       basic: basic && basic.accessToReadPost ? ["read:photos"] : [],
//       personal: personal && personal.phoneNumber ? ["read:calendar"] : [],
//       business: business && business.hasBusiness ? ["read:photos"] : []
//     };
    
//     if (profile) {
//       // Update existing profile
//       profile.basic = basic || profile.basic;
//       profile.personal = personal || profile.personal;
//       profile.business = business || profile.business;
//       profile.permissions = permissions;
//       profile.digitalId = digitalId || profile.digitalId;
//       profile.isDraft = isDraft; // Mark as draft if auto-saving
      
//       await profile.save();
//     } else {
//       // Create new profile
//       profile = new UserInfo({
//         userId: userId,
//         userEmail: userEmail,
//         basic: basic || {},
//         personal: personal || {},
//         business: business || {},
//         permissions,
//         digitalId: digitalId || `DID-${Date.now()}`,
//         isDraft: isDraft
//       });
      
//       await profile.save();
//     }
    
//     res.json({
//       success: true,
//       message: 'Profile auto-saved successfully',
//       profileId: profile._id,
//       lastSaved: profile.updatedAt
//     });
    
//   } catch (error) {
//     console.error('❌ Auto-save error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Auto-save failed',
//       error: error.message
//     });
//   }
// });




app.get("/authWindow", (req, res) => {
  res.send(`
    <html>
      <head><title>Auth Window</title></head>
      <body style="font-family:sans-serif; display:flex; justify-content:center; align-items:center; height:100vh;">
        <h1>Hello 👋</h1>
      </body>
    </html>
  `);
});


app.post('/devDashboard', async (req, res) => {
  const {email} = req.body;
  try {
    const client = new MongoClient(MONGODB_URI, mongoOptions);
    await client.connect();
    const db = client.db("central");
    const db2 = client.db("dev")
    const apps = db.collection("apps");
    const auth = db.collection("auth");
    const devApps = db2.collection("dev_keys")

    const totalApps =  await devApps.countDocuments({ email});
    const activeUsers = await apps.countDocuments({ "devEmail" : email})
    const apiRequests = await auth.countDocuments({ "devEmail" : email})
    return res.json({ totalApps, activeUsers, apiRequests})

  }
  catch(error) {console.log(error)}
  return;
})



app.post('/devtActivityLogs',async  (req, res) => {
  const { email } = req.body;
  try {
    const client = new MongoClient(MONGODB_URI, mongoOptions);
    await client.connect();
    const db = client.db('central');
    const col = db.collection('auth');

const data = await col.find({ "devEmail": email }).sort({ timestamp: -1 }).toArray();
    
    console.log(data)
    return res.json(data);
  }
  catch(error) {

  }
  return;
})
