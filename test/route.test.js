'use strict';

const expect = require('expect');
const server = require('../lib/server');
const request = require('superagent');
require('dotenv').config();

describe('Testing Lab 8 POST', () => {
    before((done) => {
        server.start(process.env.PORT || 5000);
        done();
    });

    after((done) => {
        server.stop();
        done();
    });

    it('', () => {

    });

});

describe('Testing Lab08 GET', () => {
    before((done) => {
        server.start(process.env.PORT || 5000);
        done();
    });

    after((done) => {
        server.stop();
        done();
    });

    it('Query not passed, tell user there are no notes', (done) => {
    request.get('localhost:3000/api/notes').end(function(err, res) {
        if(res.status == 400) {
        expect(res.text).toEqual('You do not have any notes');
        } else {
        expect(res.text).toEqual('lul');
        } done();
    });
    });

    it('User passes a query, return to user', (done) => {
    request.get('localhost:3000/api/notes?uuid=123').end(function(err, res) {
        expect(res.text).toEqual('lul');
        done();
    });
    });

    it('User requests an id that does not exist, return an error message to user', (done) => {
    request.get('localhost:3000/api/notes?uuid=234').end(function(err, res) {
        expect(res.text).toEqual('Note not found');
        done();
    });
    });


});

describe('Testing Lab08 DELETE', () => {
    before((done) => {
        server.start(process.env.PORT || 5000);
        done();
    });

    after((done) => {
        server.stop();
        done();
    });

    // error no ?uuid= passed in POST
    it('Ask user to POST parameters if there is no body on POST', (done) => {
        request.delete('localhost:3000/api/notes').end((err, res) => {
            expect(res.text).toEqual('Please send a ?uuid= parameter with your POST request');
            done();
        });
    });

    //error if note not found
    it('Reply no note was found if uuid does not exist', (done) => {
        request.delete('localhost:3000/api/notes?uuid=234234234').end((err, res) => {
            expect(res.text).toEqual('Note not found. Please try another uuid');
            done();
        });
    });

    // note is deleted
    it('Reply note is deleted when a uuid exists and is deleted', (done) => {
        request.delete('localhost:3000/api/notes?uuid=123').end((err, res) => {
            expect(res.text).toEqual('Note Deleted.');
            done();
        });
    });
});