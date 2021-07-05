const mongoose = require('mongoose');

mongoose
  .connect(
    "mongodb+srv://" +
      process.env.DB_USER_PASS +
      "@cluster0.czopy.mongodb.net/test",

    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Failed to connect with MongoDB", err));