import sys
import json
import pdb
import csv

from config import config

links = {}

eng = {}
jpn = {}

## TODO: Add tsv download since tsv files are too large to host on github
with open("eng_sentences.tsv", "r", encoding='utf-8', errors='ignore') as read_file:
    line = read_file.readlines()
f = csv.reader(line, delimiter = '\t')
for i in f:
    eng[i[0]] = i[2]

with open("jpn_sentences.tsv", "r", encoding='utf-8', errors='ignore') as read_file2:
    line2 = read_file2.readlines()
g = csv.reader(line2, delimiter = '\t')
for j in g:
    jpn[j[0]] = j[2]
    

with open("links.csv", "r", encoding='utf-8', errors='ignore') as read_file3:
    line3 = read_file3.readlines()
h = csv.reader(line3, delimiter = '\t')
for k in h:
    if k[0] in jpn and k[1] in eng:
        links[k[0]] = {'jpn_id': k[0], 'eng_id': k[1], 'jpn_text': jpn[k[0]], 'eng_text': eng[k[1]]}

with open("sentenceLinks.json", "w", encoding='utf-8', errors='ignore') as write_file:
    json.dump(links, write_file, indent=2, ensure_ascii=False)
