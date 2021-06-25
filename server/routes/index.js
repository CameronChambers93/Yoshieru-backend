import Audio from '../controllers/audio';
import ms from 'mediaserver'
import JMDict from '../controllers/jmdict';


export default (app) => {

    app.get('/api', (req, res) => res.status(200).send({
    	message: jpnDict,
    }));

    app.get('/api/entries/', JMDict.findByID);
  
    app.get('/api/lookups/', JMDict.findByText);

    app.get('/api/find_sentences/', JMDict.findExamples);

    app.get('/api/sentence/', JMDict.getSentenceExample);
  
    app.get('/api/randomAudio/', Audio.randomAudio);

    app.get('/api/audio/:filename', (req, res) =>
        ms.pipe(req, res, "./server/files/" + req.params.filename)
    );
};

