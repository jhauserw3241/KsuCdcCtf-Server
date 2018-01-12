create or replace function submitFlag(seid IN varchar, sflag IN varchar)
returns varchar as $$ begin
if (select suspended from users where eid = seid) = 't' then
  return 'Account suspended.';
end if;
if not exists (select * from challenge_user where eid = seid) then
  insert into challenge_user (eid, challenge) values (seid, (select name from challenges where num = 1));
end if;
if exists (select * from challenges c where c.num <= (select num from challenges c join challenge_user cu on cu.challenge = c.name) and c.flag = sflag) then
  if exists (select * from challenge_user cu join challenges c on c.name = cu.challenge where c.flag = sflag) then
    update challenge_user set challenge = (select name from challenges where num = ((select c.num from challenge_user cu join challenges c on c.name = cu.challenge where cu.eid = seid) + 1));
  end if;
  return (select clue from challenges where num = ((select num from challenges where flag = sflag) + 1));
else return 'Incorrect flag.';
end if;
end;
$$ language plpgsql;