-- Fix for Participant Insert Policy Violoation
-- The previous error (42501) occurs because RLS is enabled but no INSERT policy allows users to add rows to 'participants'.

-- Allow authenticated users to insert themselves as participants
-- This covers both creating a room (joining as creator) and joining via token.
drop policy if exists "Users can join rooms" on participants;

create policy "Users can join rooms"
  on participants for insert
  to authenticated
  with check (user_id = auth.uid());
