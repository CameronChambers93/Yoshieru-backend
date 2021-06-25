import model from '../models';

const { Entry } = model;

class Entries {
  static list(req, res) {
        return Entry
            .findOne({ where: { id: req.params.entryId } })
            .then(entryData => res.status(200).send(entryData));
    }
}

export default Entries;