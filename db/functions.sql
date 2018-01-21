-- Change to not accept previous flags
create or replace function submitFlag(seid IN varchar, sflag IN varchar)
returns varchar as $$ begin
if (select suspended from users where eid = seid) = 't' then
  return 'Account suspended.';
end if;
if exists (select * from challenges where name = (select challenge from challenge_user where eid = seid) and flag = sflag) then
  update challenge_user set challenge = (select name from challenges where num = ((select num from challenges where flag = sflag) + 1)) where eid = seid;
  update users set score = score + (select points from challenges where flag = sflag) where eid = seid;
  return (select clue from challenges where num = ((select num from challenges where flag = sflag) + 1));
else return 'Incorrect flag.';
end if;
end;
$$ language plpgsql;

-- Get number of challenge a user with a given eid is on
create or replace function currentNum(varchar)
returns integer as 'select num from challenges where name = (select challenge from challenge_user where eid = $1);'
language sql;

-- Get name of challenge a user with a given eid is on
create or replace function currentName(varchar)
returns varchar as $$ begin
if ((select currentNum($1)) != (select max(num) from challenges)) then
  return (select challenge from challenge_user where eid = $1);
end if;
return ''; end;
$$ language plpgsql;

-- Function to check if user exists and add if they don't
create or replace function addUser(varchar) returns void as $$ begin
if not exists (select * from users where eid = $1) then
  insert into users (eid) values ($1);
end if;
end; $$ language plpgsql;

-- Trigger to put entry in challenge_user if no row exists
create or replace function addFirstChallenge() returns trigger as $$ begin
  insert into challenge_user (eid, challenge) values (new.eid, (select name from challenges where num = 1));
return new; end;
$$ language plpgsql;

drop trigger if exists addFirstChallenge on users;
create trigger addFirstChallenge after insert on users
for each row execute procedure addFirstChallenge();
