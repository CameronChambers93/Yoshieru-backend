import axios from 'axios';
import parseString from 'xml2js';
import fs from 'fs';
import path from 'path'


let CURRENT_DIRECTORY = process.cwd()
const FILENAME = path.join(CURRENT_DIRECTORY, "easynews.json")

const getNewStories = async function(stories) {
	return new Promise(async resolve => {
	console.log("Fetching stories...")
	let shouldUpdate = false;
	
	let data = await axios.get('https://www.reddit.com/r/NHKEasyNews/.rss')
	await parseString.parseString(data.data, async (err, result) => {
		for (let i = 1; i < result.feed.entry.length; i++) {
			let el = result.feed.entry[i];
			let paragraphs = el.content[0]['_'].replace(/<!-- SC_OFF -->.*<\/a><\/p>|<p>&nbsp;<\/p>|\[comments\]|<a[ A-z":/ \\0-9.=]*>[ A-z":/ \\0-9.=]*<\/a>|<p><em>.*<\/a><\/span>/g,'').replace(/<\/p>/g, '').split('<p>').slice(1);
			paragraphs = paragraphs.map(e => [...e.replace('。  ', '。').split(/(?![^「]*」)。/g).map(e => ({'jpn': e + '。'}))])
			let storyTitle = el.title[0].replace(/\[[0-9]+\/[0-9]+\/[0-9]+\] /g, '')
			if (storyTitle in stories) continue	// Skip if already have story
			shouldUpdate = true;
			let nameTranslationData = await axios.get('https://api-free.deepl.com/v2/translate', {
				params: { 
					auth_key: "a6f1f1bf-dc8a-369f-bb4e-78f010687e3a:fx",
					source_lang: "JA",
					text: storyTitle,
					target_lang: "EN-US",
					split_sentences: 0
				}
			})
			let englishTitle = nameTranslationData.data.translations[0].text
			await paragraphs.forEach(async (e) => {
				e.pop();	// Pop blank element from list
				for (const sentence of e) {
					axios.get('https://api-free.deepl.com/v2/translate', { params: { 
						auth_key: "a6f1f1bf-dc8a-369f-bb4e-78f010687e3a:fx",
						source_lang: "JA",
						text: sentence.jpn,
						target_lang: "EN-US",
						split_sentences: 0
					}
				})
					.then(result => {
						sentence.eng = result.data.translations[0].text
					});
				}
			});
			let tmp = {
				title: {jpn: storyTitle, eng: englishTitle}, 
				date: el.published[0],
				link: el.link[0]["$"].href,
				paragraphs
			};
			tmp.title = {jpn: storyTitle, eng: englishTitle}
			console.log(englishTitle)
			stories[storyTitle] = tmp;
		}
		resolve(shouldUpdate)
	});
});
}


function saveStories(stories) {
	console.log("Saving file...")
	setTimeout(() => {
		fs.writeFile( FILENAME, JSON.stringify(stories), 'UTF-8', function (err) {
			if (err) {
				console.log("An error occured while writing JSON Object to File.");
				return console.log(err);
			}
		
			console.log("JSON file has been saved.");
		});
	}, 5000);
}

function loadOldStories() {
	console.log('Loading file...')
	let data = fs.readFileSync(FILENAME)
	//let data = fs.readFileSync(CURRENT_DIRECTORY + '/server/outputNew.json')
	return JSON.parse(data)
}

async function main() {

	let stories = loadOldStories();
	let shouldUpdate = await getNewStories(stories);
	if (shouldUpdate) saveStories(stories)
	else console.log("No new stories")
}

main()
