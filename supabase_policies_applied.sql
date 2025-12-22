-- These policies were applied directly to your Supabase database to fix the permission issues.

-- 1. Allow participants to update their own data (needed for submitting results)
CREATE POLICY "Participants can update their own row" ON participants
FOR UPDATE
USING ( auth.uid() = user_id );

-- 2. Allow room creators to update participants in their room (needed for starting the game)
CREATE POLICY "Room creators can update participants" ON participants
FOR UPDATE
USING ( auth.uid() IN (SELECT created_by FROM challenge_rooms WHERE id = participants.challenge_room_id) );
