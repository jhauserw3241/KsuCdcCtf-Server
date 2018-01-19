drop table if exists challenges cascade;
drop table if exists users cascade;
drop table if exists challenge_user cascade;

create table challenges (name varchar(64) primary key, num integer unique not null, flag varchar(32) unique not null, points integer not null, clue varchar(2048) not null);
create table users (eid varchar(64) primary key, score integer not null default '0', suspended boolean not null default false);
create table challenge_user (eid varchar(64) primary key, challenge varchar(64) not null, foreign key(eid) references users(eid) on delete cascade, foreign key(challenge) references challenges(name) on delete cascade);
