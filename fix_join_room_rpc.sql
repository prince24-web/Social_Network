-- Secure Function to Join Room by Token
-- Solves the "Chicken and Egg" RLS problem where a user can't find a private room to join it.

create or replace function public.join_challenge_room(_invite_token text)
returns json as $$
declare
  _room_id uuid;
  _room_lang text;
  _max_players int;
  _current_players int;
  _status text;
  _user_id uuid;
begin
  _user_id := auth.uid();
  
  if _user_id is null then
    return json_build_object('error', 'Unauthorized');
  end if;

  -- 1. Find Room (Bypasses RLS because of SECURITY DEFINER)
  select id, language, max_players, status 
  into _room_id, _room_lang, _max_players, _status
  from challenge_rooms
  where invite_token = _invite_token;

  if _room_id is null then
    return json_build_object('error', 'Invalid invite link or room not found.');
  end if;

  if _status <> 'waiting' then
    return json_build_object('error', 'This room is no longer accepting players.');
  end if;

  -- 2. Check Capacity
  select count(*) into _current_players 
  from participants 
  where challenge_room_id = _room_id;
  
  if _current_players >= _max_players then
     return json_build_object('error', 'Room is full.');
  end if;

  -- 3. Check if already joined
  if exists (select 1 from participants where challenge_room_id = _room_id and user_id = _user_id) then
     return json_build_object('success', true, 'roomId', _room_id, 'message', 'Already joined');
  end if;

  -- 4. Join
  insert into participants (user_id, challenge_room_id, language)
  values (_user_id, _room_id, _room_lang);

  return json_build_object('success', true, 'roomId', _room_id);
end;
$$ language plpgsql security definer;
