class Audios {
  static list(req, res) {
		var randomNumber = Math.floor(Math.random() * 100) + 1  
        return Audio
            .findOne({ where: { id: randomNumber } })
            .then(lookupData => res.status(200).send(lookupData));
    }
}

export default Audios