ALTER TABLE docsets ADD COLUMN parsed_name text;

UPDATE meta SET version='19';
