import fs from 'fs';
const sentences = JSON.parse(fs.readFileSync('C:/docs/Projects/JapanApp/server/files/jpn_sentences.json'))

const CURRENT_DIRECTORY = process.cwd()

import kuromoji from "kuromoji";
import path from 'path';

let reverseDict = {}

kuromoji.builder({ dicPath: path.join(CURRENT_DIRECTORY, '/dict/') }).build(function (err, tokenizer) {
    // tokenizer is ready
    for (const [key, entry] of Object.entries(sentences)) {
        let tokens = tokenizer.tokenize(entry);
        for (let i = 0; i < tokens.length; i++) {
            if (!reverseDict.hasOwnProperty(tokens[i]['basic_form'])) {
                reverseDict[tokens[i]['basic_form']] = []
            }
            reverseDict[tokens[i]['basic_form']].push(key)
        }
    }
    fs.writeFileSync( path.join(CURRENT_DIRECTORY, 'keywordSentences.json'), JSON.stringify(reverseDict));
});


class Audio {
    static randomAudio(req, res) {
        const keys = Object.keys(audioDict)
        let id = keys[Math.floor(Math.random() * keys.length)]
        res.status(200).send(audioDict[id])
    }
}

export default Audio