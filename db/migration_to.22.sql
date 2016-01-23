ALTER TABLE refs DROP COLUMN content;

UPDATE meta SET version='22';