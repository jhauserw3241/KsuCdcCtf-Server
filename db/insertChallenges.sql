insert into challenges (name, num, flag, clue, points) values (Flash Drive Fun, 1, 8e3ae803be9f5a4580e6c7233c8eaa70, c1, 10)
insert into challenges (name, num, flag, clue, points) values (Where's My WiFi?, 2, 1aca39d7fb2e30dd26a9ed8a771fc4ab, c2, 20)
insert into challenges (name, num, flag, clue, points) values (Simple Web Stuff, 3, 563de856d36c5654168516dd75083fe1, c3, 30)
insert into challenges (name, num, flag, clue, points) values (File Fun, 4, 087faecf366f2e166b796a02baca57b6, c4, 40)
insert into challenges (name, num, flag, clue, points) values (Dandy Database, 5, c90ae1cf2c88a61005dccee97b4528a6, c5, 50)
insert into challenges (name, num, flag, clue, points) values (Can't Crack This, 6, cd00bfb235d71e3972ea327dd398ace1, c6, 60)
insert into challenges (name, num, flag, clue, points) values (/Pleasant/Path, 7, 40252891563fed74a97e071671df7887, c7, 70)
insert into challenges (name, num, flag, clue, points) values (Perfect Passwd, 8, c34f1868629a4da5a58889087dee366e, c8, 80)
insert into challenges (name, num, flag, clue, points) values (Can't Crack This 2, 9, 04342b6ae0a3c14fee16ca67d38b83c1, c9, 90)
insert into challenges (name, num, flag, clue, points) values (Forensic Fun, 10, d44cbaf1c94713eb92d83f6352bcf28b, c10, 100)
insert into challenges (name, num, flag, clue, points) values (Ominous OpenVPN, 11, b60ae04926cfc33cabdb24bd75be10cd, c11, 110)
insert into challenges (name, num, flag, clue, points) values (Get Smashed, 12, a1ba6ee2673b93943a15fce25bbfbb52, c12, 120)
insert into challenges (name, num, flag, clue, points) values (More Smashed, 13, 1db3d1a25795571bd3f692cd4e560904, c13, 130)
insert into challenges (name, num, flag, clue, points) values (Smashed with a Catch, 14, 4240a07edf21faa6292157b51f248d5c, c14, 140)
insert into challenges (name, num, flag, clue, points) values (This one is probably the hardest, 15, 5c9311c6a759add4493686c6e7e84ee7, c15, 150)
insert into challenges (name, num, flag, clue, points) values (Ludicrous Lock, 16, 0556b5df2e262e9c854beed4ff6b4780, c16, 160)
insert into challenges (name, num, flag, clue, points) values (Love LUKS <3, 17, a69791c7e1f21bf549336950c9fa4ca4, c17, 170)
insert into challenges (name, num, flag, clue, points) values (Wireless Fiction, 18, 13430b4cbc1d1c2e3206e3d050906de9, c18, 180)
insert into challenges (name, num, flag, clue, points) values (Congratulations! More challenges coming soon (maybe), 19, 303ae8e1b0172955b83b78996fc6ee1d, c19, 190)
update challenges set flag = NULL, points = 0, clue = 'Congratulations! You have successfully solved all the challenges.' where num = (select max(num) from challenges);
