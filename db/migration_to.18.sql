ALTER TABLE users ADD COLUMN stripe_id text;

UPDATE meta SET version='18';
