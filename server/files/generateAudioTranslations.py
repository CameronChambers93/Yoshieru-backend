import sys
import json
import pdb
import csv

links = {}

## TODO: Add tsv download since tsv files are too large to host on github
with open("jpn_sentences.tsv", "r", encoding='utf8') as jpn_file:
    jpn_line = jpn_file.readlines()


jpn_sentences = {}

f = csv.reader(jpn_line, delimiter='\t')
for i in f:
    jpn_sentences[i[0]] = i[2]



with open("eng_sentences.tsv", "r", encoding='utf-8') as eng_file:
    eng_line = eng_file.readlines()


eng_sentences = {}

g = csv.reader(eng_line, delimiter='\t')
for k in g:
    eng_sentences[k[0]] = k[2]



with open("links.csv", "r", encoding='utf8') as links_file:
    link_line = links_file.readlines()

linkIterator = csv.reader(link_line, delimiter='\t')
for link in linkIterator:
    if link[0] in jpn_sentences:
        if link[1] in eng_sentences:
            links[link[0]] = {'jpn_id': link[0], 'eng_id': link[1],
                              'jpn_text': jpn_sentences[link[0]], 'eng_text': eng_sentences[link[1]]}

audio_examples = {}

with open("sentences_with_audio.csv", "r", encoding='utf8') as audio_file:
    audio_line = audio_file.readlines()

audioIterator = csv.reader(audio_line, delimiter='\t')
for audio in audioIterator:
    if audio[0] in links:
        tmpDict = links[audio[0]]
        tmpDict['author'] = audio[1]
        tmpDict['license_type'] = audio[2]
        tmpDict['license_link'] = audio[3]
        audio_examples[audio[0]] = tmpDict

with open("audioTranslations.json", "w") as jsondump:
    json.dump(audio_examples, jsondump)
