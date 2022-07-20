const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/wedding-list", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to DB"))
    .catch(console.error); 

const List = require('./models/List');

app.get('/lists', async (req, res) => {
    const lists = await List.find();
    res.json(lists);
} );

app.post('/list/new', (req, res) => {
    const list = new List({
        text: req.body.text
    });

    list.save();

    res.json(list);
});

app.delete('/list/delete/:id', async (req, res) => {
    const result = await List.findByIdAndDelete(req.params.id);
    
    res.json(result);
});

app.put('/list/complete/:id', async (req, res) => {
    const list = await List.findById(req.params.id);

    list.complete = !list.complete;
    
    list.save();

    res.json(todo);
});

app.listen(5500, () => console.log("server started on port 5500"));