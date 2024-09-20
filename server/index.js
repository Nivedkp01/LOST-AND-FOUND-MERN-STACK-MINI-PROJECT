const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const NewUser = require('./Models/UserModel');
const Verify = require('./Models/VerifyModel')
const Feedback = require('./Models/FeedbackModel')
const Conversation = require('./Models/ConversationModel');
const Chat = require('./Models/ChatModel')
const jwt = require('jsonwebtoken');
const secret = '';
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const multer = require('multer');
const uploadMiddle = multer({ dest: 'uploads/' });
const fs = require('fs');
const path = require('path');
const Item = require('./Models/ItemModel');
const { send } = require('process');

app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());
app.use('/Uploads', express.static(__dirname + '/Uploads'));

mongoose.connect('mongodb+srv://nivedkp001:nivedmon@cluster0.rlufasj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

app.get('/', (req, res) => {
    res.json('Hello');
});

app.post('/reg', async (req, res) => {
    try {
        const { username, createPassword, confirmPassword, Imei, Email, ph } = req.body;

        if (!username || !confirmPassword || !createPassword) {
            return res.status(406).json({ message: 'All fields are required' });
        }

        if (createPassword.length < 6) {
            return res.status(422).json({ message: 'Password must be at least 6 characters long' });
        }

        if (createPassword !== confirmPassword) {
            return res.status(400).json({ message: 'Password do not match' });
        }

        // if (username === "Admin" & createPassword === "admin@321") {
        //     return res.status(200).json({message:'Admin Found'})
        // }

        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(createPassword, salt);

        const userDoc = await NewUser.create({
            username,
            password: hashedpassword,
            Imei,
            Email,
            ph
        });

        res.status(200).json(userDoc);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const userDoc = await NewUser.findOne({ username });

        if (!userDoc) {
            return res.status(400).json({ error: 'User not found' });
        }

        const match = await bcrypt.compare(password, userDoc.password);

        if (match) {
            jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
                if (err) {
                    console.error('Error signing JWT:', err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
                res.cookie('token', token, { httpOnly: true, secure: true }).json({ id: userDoc._id, username, token }); // Also return the token for debugging
                console.log('Login Success');
            });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});




app.get('/profile', async (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) {
            res.status(401).json({ message: 'Unauthorized' })
        }
        res.json(info)

    })
})


app.post('/logout', async (req, res) => {
    res.cookie('token', '').json({ message: 'Usser Loggedout' })
})


app.post('/rep', uploadMiddle.single('file'), async (req, res) => {
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const part = parts[parts.length - 1];
    const fullpath = path + '.' + part;
    fs.renameSync(path, fullpath);

    const { item, model, colour, location, phoneNumber, address, type, username, Userid, Email, category } = req.body;
    const itemDoc = await Item.create({
        item, model, colour, location, phoneNumber, address, type, username, Userid, Email, category,
        fileurl: fullpath
    })
    res.json(itemDoc)
})


app.get('/lostandfound', async (req, res) => {
    res.json(await Item.find())
})



app.get('/lost', async (req, res) => {
    res.json(await Item.find())
})


app.get('/found', async (req, res) => {
    res.json(await Item.find())
})




app.post('/conversation', async (req, res) => {
    const { senderId, receiverId } = req.body;

    try {
        // Create a new conversation instance with sender and receiver IDs
        const newConversation = new Conversation({
            members: [req.body.senderId, req.body.RecvId, req.body.senderName, req.body.RecvName]
        });

        // Save the conversation to the database    
        const savedConversation = await newConversation.save();

        // Log the saved conversation
        console.log('Saved conversation:', savedConversation);

        // Send a success response to the client with the saved conversation
        res.json(savedConversation);
    } catch (error) {
        // Log any errors that occur during the database operation
        console.error('Error saving conversation:', error);

        // Send an error response to the client
        res.status(500).json({ error: 'Failed to save conversation' });
    }
});



app.get('/conversation/:id', async (req, res) => {
    try {
        const conversations = await Conversation.find({
            members: { $in: [req.params.id] }
        });
        res.status(200).json(conversations);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch conversations' });
    }
});



app.post('/chat', async (req, res) => {
    const { conversationId, sender, text } = req.body;
    try {
        const newMessage = new Chat({ conversationId, sender, text });
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to save message' });
    }
});


app.get('/chat/:id', async (req, res) => {
    try {
        const chats = await Chat.find({
            conversationId: req.params.id
        })
        res.status(200).json(chats)
    }
    catch (err) {
        console.error(err)
    }
})



app.get('/connect/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const itemDoc = await Item.findById(id);
        if (!itemDoc) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json(itemDoc);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/connectdata', uploadMiddle.single('file'), async (req, res) => {
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const part = parts[parts.length - 1];
    const fullpath = path + '.' + part;
    fs.renameSync(path, fullpath);

    const { message, rewardAmount, Person, Email, whosends } = req.body;
    const itemDoc = await Verify.create({
        message: message,
        rewardAmount,
        fileurl: fullpath,
        person: Person,
        Email,
        whosends

    })

    res.json(itemDoc)
})


app.get('/notification', async (req, res) => {
    try {
        // Fetch all documents from the Verify collection
        const notifications = await Verify.find({});
        res.json(notifications); // Send the notifications as JSON response
    } catch (error) {
        console.error("Error fetching notifications:", error);
        res.status(500).json({ error: "Failed to fetch notifications" });
    }
});

app.get('/notification/:id', async (req, res) => {
    const id = req.params.id; // Get the ID parameter from the request URL
    try {
        // Fetch the notification document with the specified ID
        const notification = await Verify.findById(id);
        if (!notification) {
            // If no notification found with the given ID, return 404 status code
            return res.status(404).json({ error: "Notification not found" });
        }
        res.json(notification); // Send the notification as JSON response
    } catch (error) {
        console.error("Error fetching notification:", error);
        res.status(500).json({ error: "Failed to fetch notification" });
    }
});



app.post('/feedback', async (req, res) => {
    try {
        const { feedback, username } = req.body;
        const feedDoc = await Feedback.create({
            feedback: feedback,
            username: username
        });
        res.json(feedDoc);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});



app.get('/showfeed', async (req, res) => {
    const feedbacks = await Feedback.find({})
    res.json(feedbacks)
})


app.get('/adminpage',async(req,res)=>{
    const usersDoc=await NewUser.find({})
    res.status(200).json(usersDoc)
})


app.delete('/deleteUser/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await NewUser.findByIdAndDelete(id);
        res.status(200).send('User deleted successfully');
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Internal server error');
    }
});

app.delete('/founddel/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Verify.findByIdAndDelete(id);
        res.status(200).send('Item deleted successfully');
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).send('Internal server error');
    }
});


app.delete('/lostdel/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Verify.findByIdAndDelete(id);
        res.status(200).send('Item deleted successfully');
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).send('Internal server error');
    }
});




app.listen(4000, () => {
    console.log('Server started running');
});
