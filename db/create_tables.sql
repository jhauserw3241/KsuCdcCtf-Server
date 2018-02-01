drop table if exists challenges cascade;
drop table if exists users cascade;

create table challenges (name varchar(64) primary key, num integer unique not null, flag varchar(32) unique, points integer not null, clue varchar(2048) not null);
create table users (eid varchar(64) primary key, score integer not null default '0', suspended boolean not null default false, challenge varchar(64) not null, foreign key(challenge) references challenges(name));
