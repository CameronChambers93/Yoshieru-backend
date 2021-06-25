import fs from 'fs';
const audioDict = JSON.parse(fs.readFileSync('C:/docs/Projects/JapanApp/server/files/audioTranslations.json'))


class Audio {
    static randomAudio(req, res) {
        const keys = Object.keys(audioDict)
        let id = keys[Math.floor(Math.random() * keys.length)]
        res.status(200).send(audioDict[id])
    }
}

export default Audio