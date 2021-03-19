const mongoose = require('mongoose');

const dbConnect = () =>
  mongoose.connect(
    'mongodb://localhost:27017/test',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => console.log('DB is ready!')
  );

  
const Message = mongoose.model('Message', { text: String });

module.exports = {
  Message,
  dbConnect,
};
