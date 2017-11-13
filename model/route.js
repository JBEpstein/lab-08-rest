'use strict';

const Note = require('../model/model.js');
const router = require('../lib/router.js');
const parser = require('../lib/parse-req');
const sendMessage = require('../lib/message.js');
let notes = {'123': 'lul'};

router.POST('/api/notes', (req,res) => {
    if(!req.body) {
        sendMessage(res, 400, 'No content found.');
    } else {
        sendMessage(res, 200, `Found content: ${req.body}`);
    }
});
//
router.DELETE('/api/notes', (req,res) => {

    parser(req);

    if (Object.keys(req.url.query).length > 0) {
        if (typeof notes[req.url.query['uuid']] === 'undefined') {
            sendMessage(res, 404, 'Note not found. Please try another uuid');

        } else {
            notes[req.url.query['uuid']] = null;
            delete notes[req.url.query['uuid']];
            sendMessage(res, 200, 'Note Deleted.');
        }
    } else {
        sendMessage(res, 404, 'Please send a ?uuid= parameter with your POST request');
    }
});

router.GET('/api/notes', (req,res) => {
    parser(req);
    if (Object.keys(req.url.query).length > 0) {
        if(typeof notes[req.url.query['uuid']] === 'undefined'){
            sendMessage(res, 404, 'Note not found');
        } else {
            sendMessage(res, 200, notes[req.url.query['uuid']]);
        }
    } else {
        if(Object.keys(notes).length > 0){
            for (var note in notes) {
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.write(notes[note]);
            }
        }else{
            sendMessage(res, 400, 'You do not have any notes');
        }
        res.end();
    }
});

module.exports = router;
