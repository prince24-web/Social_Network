-- Challenge Rooms Table
create table if not exists challenge_rooms (
  id uuid default gen_random_uuid() primary key,
  created_by uuid references auth.users(id) not null,
  status text default 'waiting' check (status in ('waiting', 'active', 'finished')),
  language text not null check (language in ('python', 'javascript')),
  difficulty text not null,
  max_players int not null default 2,
  invite_token text unique not null,
  created_at timestamptz default now(),
  started_at timestamptz
);

-- Participants Table
create table if not exists participants (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  challenge_room_id uuid references challenge_rooms(id) not null,
  language text not null check (language in ('python', 'javascript')),
  joined_at timestamptz default now(),
  started_at timestamptz,
  submitted_at timestamptz,
  passed_tests int default 0,
  time_taken int, -- stored in milliseconds or seconds
  unique(user_id, challenge_room_id)
);

-- RLS Policies (Basic examples, can be refined)
alter table challenge_rooms enable row level security;
alter table participants enable row level security;

-- Helper Function to avoid recursion
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

-- Allow authenticated users to create rooms
create policy "Users can create rooms"
  on challenge_rooms for insert
  to authenticated
  with check (auth.uid() = created_by);

-- Allow users to view rooms they are created or are participating in
create policy "Participants can view their rooms"
  on challenge_rooms for select
  to authenticated
  using (
    auth.uid() = created_by or is_room_participant(id)
  );

-- Allow users to view participants in rooms they are part of
create policy "Participants can view other participants in the same room"
  on participants for select
  to authenticated
  using (
    user_id = auth.uid() or is_room_participant(challenge_room_id)
  );

-- Allow users to join (insert themselves)
create policy "Users can join rooms"
  on participants for insert
  to authenticated
  with check (user_id = auth.uid());
  -- Note: Additional logic to check room status/capacity is handled in API, 
  -- but could be enforced here if we trusted the room_id passed.
  -- API handles validation, so basic identity check is enough for RLS here.

-- Allow users to update their own participant record (e.g. submitted_at, passed_tests)
create policy "Users can update their own participant record"
  on participants for update
  to authenticated
  using (user_id = auth.uid());
