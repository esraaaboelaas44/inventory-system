const bcrypt = require("bcryptjs");
require("dotenv").config();
const User = require("../models/User");
const connectDB = require("../config/db");

const seedUsers = async () =>
{
  try {
  await connectDB();

  await User.insertMany([
  {  
      name: "Ahmed",
      email: "a@gmail.com",
      password: await bcrypt.hash("123",10),
      role: "admin",
      isActive: true,
  },
  {  
      name: "Ali",
      email: "ab@gmail.com",
      password: await bcrypt.hash("1234",10),
      role: "manager",
      isActive: true,
  },
  {  
      name: "Mona",
      email: "m@gmail.com",
      password: await bcrypt.hash("12345",10),
      role: "staff",
  },
  {  
      name: "Pola",
      email: "p@gmail.com",
      password: await bcrypt.hash("123456",10),
      role: "staff",
      isActive: false,
  }
  ]
  );
    console.log("Users inserted successfully");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedUsers();



