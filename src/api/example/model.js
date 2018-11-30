module.exports = (mongoose) => {

  let exampleEschema = new mongoose.Schema({
  }, { timestamps: true })
  
  return mongoose.model('example', exampleEschema)
}
