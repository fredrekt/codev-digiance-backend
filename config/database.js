const mongoose = require('mongoose');

exports.connect = () => {
    mongoose
      .connect(process.env.DATABASE_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Connected with Atlas");
      })
      .catch((error) => {
        console.error(error);
        process.exit(1);
      });
};