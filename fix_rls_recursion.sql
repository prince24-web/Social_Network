-- Fix for infinite recursion in RLS policies

-- 1. Drop the problematic policies
drop policy if exists "Participants can view other participants in the same room" on participants;
drop policy if exists "Participants can view their rooms" on challenge_rooms;

-- 2. Create a Helper Function (Security Definer to bypass RLS)
create or replace function public.is_room_participant(_room_id uuid)
returns boolean as $$
begin
  return exists (
    select 1 
    from participants 
    where challenge_room_id = _room_id 
    and user_id = auth.uid()
  );
end;
$$ language plpgsql security definer;

-- 3. Re-create Participants Policy using the function
create policy "Participants can view other participants in the same room"
  on participants for select
  to authenticated
  using (
    -- You can see yourself OR anyone in a room you are part of
    user_id = auth.uid() or is_room_participant(challenge_room_id)
  );

-- 4. Re-create Challenge Rooms Policy using the function
create policy "Participants can view their rooms"
  on challenge_rooms for select
  to authenticated
  using (
    auth.uid() = created_by or is_room_participant(id)
  );
