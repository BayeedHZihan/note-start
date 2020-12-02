const express = require('express');
const mongoose = require('mongoose');
const Note = require('./models/note');

const app = express();

//listen view engine
app.set('view engine', 'ejs');

//parses encoded post request body into json ready to use 
//for accepting form data
app.use(express.urlencoded({extended: true}));

//static files to look up
app.use(express.static('public'));

//db connection
const dbURI = 'mongodb+srv://bayeed:12345@cluster0.7myjj.mongodb.net/note-start?retryWrites=true&w=majority'
mongoose.connect(dbURI, {useNewUrlParser:true, useUnifiedTopology:true})
    .then((result) => {
        app.listen(5000);
        console.log("listening on port 5000")
    })
    .catch((err) => console.log(err));

const notes = [
    {
        title: "NOTE 1",
        desc: "note 1 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda veniam minus, earum modi maxime aspernatur id nesciunt eius ea in eos reprehenderit laborum eveniet voluptatibus, deleniti commodi sequi nihil fugit."
    },
    {
        title: "NOTE 2",
        desc: "note 2 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda veniam minus, earum modi maxime aspernatur id nesciunt eius ea in eos reprehenderit laborum eveniet voluptatibus, deleniti commodi sequi nihil fugit."
    }, 
    {
        title: "NOTE 3",
        desc: "note 3 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda veniam minus, earum modi maxime aspernatur id nesciunt eius ea in eos reprehenderit laborum eveniet voluptatibus, deleniti commodi sequi nihil fugit."  
    }       
]



app.get('/', (req, res) => {
    Note.find().sort({createdAt: -1})
        .then((result) => {
            res.render('index', {title: 'Home', notes:result});
        })
        .catch((err) => {
            console.log(err);
        });
})

app.post('/', (req, res) => {
    const note = new Note(req.body);

    note.save()
        .then(result => {
            res.render('create', {title: "Create a new note"});
            //console.log(result);
        })
        .catch(err => {
            console.log(err);
        })
})

app.get('/about', (req, res) => {
    res.render('about', {title:"About"});
})

app.get('/notes/create', (req, res) => {
    res.render("create", {title: "Create a new note"});
})

app.get('/notes/:id', (req, res) => {
    const id = req.params.id;
    Note.findById(id)
        .then((result) => {
            res.render("details", {note: result, title:"Note Details"});
        })
        .catch((err) => {
            console.log(err);
        })
})

app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;

    Note.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/' });
        })
        .catch(err => console.log(err));
})

app.use((req, res) => {
    res.status(404).render('404', {title: "404"});
})

// app.get('/add-note', (req, res) => {
//     const note = new Note({
//         title : "new note 3", 
//         desc : "this is a new note 3"
//     });
//     note.save()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// })

// app.get('/all-notes', (req, res) => {
//     Note.find()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// })

// app.get('/single-note', (req, res) => {
//     Note.findById("5fbce67e336500321ccdf26e")
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// })