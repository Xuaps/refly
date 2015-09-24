ALTER TABLE temp_refs ADD COLUMN source_url text;
ALTER TABLE refs ADD COLUMN source_url text;

UPDATE meta SET version='20';