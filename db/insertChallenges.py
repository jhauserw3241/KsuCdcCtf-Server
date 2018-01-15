#!/bin/python
import psycopg2
import hashlib

# Better challenge names in progress
challenges = {
	1 : 'Flash Drive Fun',
	2 : 'Where\'s My WiFi?',
	3 : 'Simple Web Stuff',
	4 : 'File Fun',
	5 : 'Dandy Database',
	6 : 'Can\'t Crack This',
	7 : '/Pleasant/Path',
	8 : 'Perfect Passwd',
	9 : 'Can\'t Crack This 2',
	10 : 'Forensic Fun',
	11 : 'Ominous OpenVPN',
	12 : 'Get Smashed',
	13 : 'More Smashed',
	14 : 'Smashed with a Catch',
	15 : 'This is probably the hardest challenge',
	16 : 'Ludicrous Lock',
	17 : 'Love LUKS <3',
	18 : 'Wireless Fiction'
}

db = psycopg2.connect("dbname='scoreboard'")
c = db.cursor()

for ch in challenges.keys():
  c.execute('insert into challenges (name, num, flag, clue, points) values (%s, %s, %s, %s, %s)', (challenges[ch], ch, hashlib.md5((challenges[ch] + 'thisislikesalt').encode('utf-8')).hexdigest(), "c" + str(ch), 10))

db.commit()
