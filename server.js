import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';
import register from './controllers/register.js';
import signin  from './controllers/signin.js';
import profile from './controllers/profile.js';
import image from './controllers/image.js';

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : '5432',
      user : 'postgres',
      password : '123',
      database : 'imgrcn'
    }
  });

app.get('/', (req,res)=> {res.json(database.users)})
app.post('/signin', (req,res)=> {signin.handleSignin(req,res,db,bcrypt)})
app.post('/register', (req,res) => {register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id',(req,res) => {profile.handleProfile(req,res,db)})
app.put('/image',(req,res) => {image.handleImage(req,res,db)})
app.post('/imageurl',(req,res) => {image.handleApiCall(req,res)})



app.listen( process.env.PORT || 3000, () => {
    console.log(`server listens to port ${process.env.PORT}`)
})