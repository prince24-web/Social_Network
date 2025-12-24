-- Enable Realtime for the challenge_rooms and participants tables
-- This adds the tables to the supabase_realtime publication

BEGIN;
  -- Filter-based replication is usually better for performance if supported, 
  -- but for simplicity and to match common Supabase setups:
  
  -- Check if publication exists, and add tables to it.
  -- Note: Supabase usually has a 'supabase_realtime' publication by default.
  
  ALTER PUBLICATION supabase_realtime ADD TABLE challenge_rooms;
  ALTER PUBLICATION supabase_realtime ADD TABLE participants;
COMMIT;
