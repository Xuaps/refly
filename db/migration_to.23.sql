ALTER TABLE users DROP COLUMN stripe_id;

UPDATE meta SET version='23';