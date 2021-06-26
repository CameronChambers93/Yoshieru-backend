import fs from 'fs';

const ROOT_DIRECTORY = process.cwd()

const audioDict = JSON.parse(fs.readFileSync( ROOT_DIRECTORY + '/server/files/audioTranslations.json'))


class Audio {
    static randomAudio(req, res) {
        const keys = Object.keys(audioDict)
        let id = keys[Math.floor(Math.random() * keys.length)]
        res.status(200).send(audioDict[id])
    }
}

export default Audio
