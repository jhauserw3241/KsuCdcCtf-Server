drop table if exists challenges cascade;
drop table if exists users cascade;
drop table if exists challenge_user cascade;
drop table if exists settings;

create type privilege as enum ('Admin', 'Member');

create table challenges (name varchar(64) primary key, num integer unique not null, flag varchar(32) unique, clue varchar(2048));
create table users (eid varchar(64) primary key, privilege privilege not null default 'Member', suspended boolean not null default false);
create table challenge_user (eid varchar(64) not null, challenge varchar(64) not null, foreign key(eid) references users(eid) on delete cascade, foreign key(challenge) references challenges(name) on delete cascade);
create table settings (name varchar(64) primary key, setting boolean not null);

insert into settings values ('DisplayAllChallenges', false);
