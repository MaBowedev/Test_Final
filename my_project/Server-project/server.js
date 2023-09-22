import express from "express";
import cors from "cors";
import mongoose from "mongoose"
import { UserModel } from './models/User.js'
import { PostModel } from './models/Post.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import multer from 'multer'
import fs from 'fs'
import path from 'path'
const __dirname = path.resolve();




const uploadMiddleware = multer({ dest: 'uploads/' });
const app = express();

const salt = bcrypt.genSaltSync(10);
const secret = 'sfdsfsd564sdf5465sd4f'
app.use(cookieParser());
app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use('/uploads', express.static(__dirname + '/uploads'))

mongoose.connect("mongodb+srv://boeramarco:w5nPeSYcgYYiFFb3@cluster0.uaynokx.mongodb.net/?retryWrites=true&w=majority");


app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await UserModel.create({
            username,
            password: bcrypt.hashSync(password, salt),
        });
        res.json(userDoc);

    } catch (e) {
        res.status(400).json(e)
    }
});


app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const userDoc = await UserModel.findOne({ username });
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
        jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json('ok');
        });

    } else {
        res.status(400).json('credenziali incorrette')
    }

});

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
    })

})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok')
})


app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;
        const { title, genre, summary, content } = req.body;
        const PostDoc = await PostModel.create({
            title,
            genre,
            summary,
            content,
            cover: newPath,
            author: info.id,
        });

        res.json({ PostDoc });


    });

});

app.put('/post', uploadMiddleware.single('file'), async (req, res) => {
    let newPath = null;
    if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
    }
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;
        const {id, title, genre, summary, content } = req.body;
        const postDoc= await PostModel.findById(id)
        const isAuthor =JSON.stringify (postDoc.author) === JSON.stringify(info.id)
        if (!isAuthor) {
         return  res.status(400).json("non sei l'autore dell'articolo")
        } 
        await postDoc.updateOne({
            title,
            genre,
            summary,
            content,
            cover: newPath ? newPath : postDoc.cover,
          });
      
          res.json(postDoc);
        

    });
    
});


app.get('/post', async (req, res) => {
    res.json(
        await PostModel.find()
            .populate('author', ['username']).sort({ createdAt: -1 }).limit(20)


    )

})




app.get('/post/:id', async (req, res) => {
    const { id } = req.params;
    const postArt = await PostModel.findById(id).populate('author', ['username'])
    res.json(postArt)
})




app.delete('/post/:id', async (req, res) => {
    try {
      const itemId = req.params.id;
      const deletedItem = await PostModel.findByIdAndRemove(itemId);
  
      if (!deletedItem) {
        return res.status(404).json({ error: 'Item not found' });
      }
  
      res.json({ message: 'Item deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });




app.listen(8080);
