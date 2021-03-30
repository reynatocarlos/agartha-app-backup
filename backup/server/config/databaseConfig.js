const mongoose = require('mongoose')

async function connection() {
  const connection_uri = process.env.MONGODB_CONNECTION_URI

  try {
    await mongoose.connect(
      connection_uri,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
      },
      () => console.log('Database Connected')
    )
  } catch (err) {
    console.log(err)
  }
}

module.exports = connection