-- Change to not accept previous flags
create or replace function submitFlag(seid IN varchar, sflag IN varchar)
returns varchar as $$ begin
if (select suspended from users where eid = seid) = 't' then
  return 'Account suspended.';
end if;
if exists (select * from challenges where name = (select challenge from users where eid = seid) and flag = sflag) then
  update users set challenge = (select name from challenges where num = (currentNum(seid) + 1)) where eid = seid;
  update users set score = score + (select points from challenges where flag = sflag) where eid = seid;
  return (select clue from challenges where num = currentNum(seid));
else return 'Incorrect flag.';
end if;
end;
$$ language plpgsql;

-- Get number of challenge a user with a given eid is on
create or replace function currentNum(varchar)
returns integer as 'select num from challenges where name = (select challenge from users where eid = $1);'
language sql;

-- Function to check if user exists and add if they don't
create or replace function addUser(varchar) returns void as $$ begin
if not exists (select * from users where eid = $1) then
  insert into users (eid,challenge) values ($1, (select name from challenges where num = 1));
end if;
end; $$ language plpgsql;
