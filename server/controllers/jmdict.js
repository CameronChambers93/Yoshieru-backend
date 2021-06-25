import fs from 'fs';
const keywordDict = JSON.parse(fs.readFileSync('C:/docs/Projects/JapanApp/server/files/keywordSentences.json'))
const sentenceLinks = JSON.parse(fs.readFileSync('C:/docs/Projects/JapanApp/server/files/sentenceLinks.json'))


let posDict = {'adj-i': '形容詞',
'adj-ix': 'adj',
"adj-na": 'adj',
"adj-no": 'adj',
"adj-pn": '連体詞',
"adj-t": 'adj',
"adj-f": 'adj',
'pn': '名詞',
'n': '名詞',
'suf': '助詞',
'v': '動詞',
'prt': '助詞',
'n-adv' :'名詞',
'n-suf': '名詞',
'n-pref': '名詞',
'n-t': '名詞',
'exp': 'exp',
'pref': '助詞',
'adv': '副詞',
'num': '名詞',
'ctr': '助詞'}
/*
形容詞 - adj
です - 助動詞 auxiliary verb - marked exp in the jmdict
副詞 - adv
名詞 - n
助詞 - prt
動詞 - v
連体詞 - adj-pn - adnominal adjective; pre-noun adjectival
記号 - symbol
接続詞 - conjunction
接頭詞 - prefix
*/

class JMDict {
    static findExamples(req, res) {
        let text = req.query.k_ele
        res.status(200).send(keywordDict[text])
    }

    static getSentenceExample(req, res) {
        let id = req.query.sentence_id
        res.status(200).send(sentenceLinks[id])
    }

}

export default JMDict;