import Lookup from '../models/lookup.js';

class Lookups {
    static list(req, res) {
        if (req.query.id != null) {
            return Lookup
                .findOne({ where: { id: req.query.id } })
                .then(lookupData => res.status(200).send(lookupData));
        }
        else {
            return Lookup
                .findOne({ where: { k_ele: req.query.k_ele } })
                .then(lookupData => res.status(200).send(lookupData));
        }
    }
}

export default Lookups;