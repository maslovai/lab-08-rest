'use strict';
const Note = require('./note.js');
const router = require('./router.js');

let notes = [];

let sendStatus = (res, status)=>{
  res.writeHead(status);
  res.end();
}

let sendJSON = (res, status, data)=>{
  res.writeHead(status,{"Content-Type":"application.json"});
  res.end(JSON.stringify(data));
}
router.post('/api/notes',(req, res) =>{
//400
if(!req.body.title) return sendStatus(res, 400, "Missing Title");
if(!req.body.content) return sendStatus(res, 400, "Missing Content");
//save the note
let note = new Note(req.body);
notes.push(note);
sendJSON(res, 200, note)
});

router.get('/api/notes',(req, res) =>{
  let id = req.url&req.url.query&req.url.query.id;
  if(id){

    let note = notes.filter((note) => note.id === id);

    if (note) sendJSON(res, 200, note)
    else sendStatus(res, 400, "invalid note")
  }
  else{
    let allNotes = {notes:notes};
    sendJSON(res, 200, allNotes)
  }

});
// router.put('/api/notes',(req, res) =>{
//
// });
// router.patch('/api/notes',(req, res) =>{
//
// });
// router.delete('/api/notes',(req, res) =>{
//   // check for id
//   //find id in notes
//   //DELETE
//   //send 200
// })
