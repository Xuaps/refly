ALTER TABLE refs ADD COLUMN content_anchor text;
drop table source_refs;

UPDATE meta SET version='13';
