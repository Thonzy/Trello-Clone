import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import router from "./Routers/Router.js"
import { createServer } from 'http'
import * as io from 'socket.io'

const app = express();
app.use(express.json())
app.use(cors())
const port =process.env.PORT || 8080;
const server = createServer(app);
server.listen(port, () => console.log(`Server is running at ${port}`));
app.get('/', (req, res) => res.send("Server is running......"))


// DB

const connectionURL = process.env.MONGO_URL
mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})


// Change Stream

const socketIo = new io.Server(server, {
    cors: {
        origin: "https://trello-clone-kohl-six.vercel.app/",
        credentials: true
    }
});


socketIo.on('connection', function (socket) {
    console.log('CLient Connected!');
});


const connection = mongoose.connection;


connection.once('open', () => {
    console.log("MongoDB database connected.");

    const changeStream = connection.collection('usermodels').watch({ fullDocument: 'updateLookup' });

    changeStream.on('change', (change) => {
        switch (change.operationType) {
            case 'insert':
                const newUser = {
                    _id: change.fullDocument._id,
                    name: change.fullDocument.name,
                    email: change.fullDocument.email,
                    photo: change.fullDocument.photo,
                    oldBG: change.fullDocument.background
                }
                console.log(newUser)
                socketIo.emit('user-signed', newUser)
                break;

            case 'update':
                const updatedUser ={
                    _id: change.fullDocument._id,
                    name: change.fullDocument.name,
                    email: change.fullDocument.email,
                    lists: change.fullDocument.lists,
                    background: change.fullDocument.background
                }
                socketIo.emit('list-updated', updatedUser.lists)
                break;
        }
    })

})



// Routes

app.use('/api', router)