-- Fix for Room Update Policy
-- The 'Start Challenge' feature fails because there is no RLS policy allowing the creator to UPDATE the room status.

create policy "Creators can update their rooms"
  on challenge_rooms for update
  to authenticated
  using (auth.uid() = created_by);
