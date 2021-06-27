import Entries from '../controllers/entry.js';
import Lookups from '../controllers/lookup.js';
import Audios from '../controllers/audios.js';
import fs from 'fs';
import Audio from '../controllers/audio.js';
import Sentences from '../controllers/sentences.js';
import ms from 'mediaserver'
import express from 'express'
import axios from 'axios';
import parseString from 'xml2js';
import expressStaticGzip from 'express-static-gzip';
const ROOT_DIRECTORY = process.cwd()
let JMDictZipped = {}
fs.readFile( ROOT_DIRECTORY + '/server/files/JMdict_e.json.gz', (res) => {JMDictZipped = res})
const EasyNews = JSON.parse(fs.readFileSync( ROOT_DIRECTORY + '/server/files/easynews.json', 'utf-8'))
export default (app) => {


    app.get('/api/getJMDict', (req, res) => res.status(200).send({
        message: JMDictZipped,
    }));
  
    app.get('/api/find_sentences/', Sentences.findExamples);

    app.get('/api/get_random_sentence/', Sentences.getRandomSentence);

    app.get('/api/sentence/', Sentences.getSentenceExample);
  
    app.get('/api/randomAudio/', Audio.randomAudio);
    
    app.get('/api/news/', (req, res) => {
        res.status(200).send({
            message: Object.values(EasyNews).map(e => ({title: e.title, date: e.date}))
        })
    });
    
    app.get('/api/news/:title', (req, res) => {
        res.status(200).send({
            message: EasyNews[req.params.title]
        })
    });

    app.get('/api/audio/:filename', (req, res) =>
        ms.pipe(req, res, "./server/files/" + req.params.filename)
    );

    app.get('/api/youtube', (req, res) => {
        axios("https://www.youtube.com").then(results => {
            res.status(200).send({
                data: results.data
            })
        })
    })
    app.use("/", expressStaticGzip( ROOT_DIRECTORY + "/server/files/"))
    app.use(express.static( ROOT_DIRECTORY + '/server/dist'));
};

