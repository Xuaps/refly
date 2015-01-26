ALTER TABLE docsets DROP COLUMN state;
ALTER TABLE docsets ADD COLUMN active boolean;
ALTER TABLE docsets ADD COLUMN label text;

UPDATE meta SET version='11';
