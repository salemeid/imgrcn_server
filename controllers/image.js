import Clarifai from 'clarifai';

const app = new Clarifai.App({
    apiKey: 'e7b4a68d79b743cf8eac20c9cf2826c3'
   });
  
const handleApiCall = (req,res) => {
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,req.body.input)
      .then(data=>{
          res.json(data)
      })
      .catch(err => err(400).josn("error API"));
}


const handleImage = (req,res, db) => {
    const {id} = req.body;

    db('users')
        .where('id', id)
        .increment('entries',1)
        .returning('entries')
        .then(entries=> {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('error'))
    }

export default {
    handleImage,
    handleApiCall
}