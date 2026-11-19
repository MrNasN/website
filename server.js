const express = require('express');
const { version } = require('os');
const path = require('path');

const app = express();

const PORT = 3000;

//this will be the middleware between every requset and response we can use it for authentication as well so it is like the middleman for the application we just created from const app = express();
app.use(express.json());


//this will take the absoulute path for anything the user asks for anything that has the end of css,js,font,img,Docs and will join them to return a static type of response which are html or js or img...etc and the code tells the server to go to the specefic path where to get the the specefic type of content the user asked for

app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/JS', express.static(path.join(__dirname, 'JS')));
app.use('/Docs', express.static(path.join(__dirname, 'Docs')));
app.use('/fonts', express.static(path.join(__dirname, 'fonts')));
app.use('/img', express.static(path.join(__dirname, 'img')));


// this will get the user the homepage once he asks for it using the link http://localhost:{port} 
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'index.html'));

});


// and this will be the fisrt API created and responded usning a json because it is easier for a server and me!
app.get('/api/status', (req, res) => {

    res.json({
        status: 'success',
        message: 'server and backend is working',
        website: 'mrnasn.website'
    });


});


// creating the endpoint for the contact page it will take the 4 valouse and validat it if it is true it will console it
app.post('/api/contact', (req,res) => {
    const { name, email, subject, message} = req.body;


    // this is for validating the inserted valuse 
    if(!name || !email || !subject || !message) {
        return res.status(400).json({
            status: 'Error',
            message: 'All fields are required'
        });

    }

    // this will allow us to receive the customer message in our terminal 
    console.log('New comtact message', {
        name,
        email,
        subject,
        message

    });


    // this is for returing the succesfull results with the code (200) 
    res.status(200).json({
        status: 'success',
        message: 'your message were delivered successfully'
    });

});


// this for the info endpoint
app.get('/api/info', (req, res) => {
    res.json({
        name: 'MrNasN website',
        version: '1.0',
        developer: 'MrNasN'
    });
});


// this is for the message endpoint
app.get('/api/message', (req,res) => {
    res.json({
        message: 'welcome to my website!!!'
    });


});


// this will allow us to start the server and make it wait for reqs
app.listen(PORT, () =>{
    console.log(`server is listening on http://localhost:${PORT} and waiting for a req`);
    
})




