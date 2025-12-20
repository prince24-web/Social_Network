-- Add challenge_id to challenge_rooms
-- This is needed to store which random challenge was selected for the room, ensuring all players see the same one.

alter table challenge_rooms 
add column if not exists challenge_id text;
