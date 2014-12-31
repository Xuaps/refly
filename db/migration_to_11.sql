ALTER TABLE docsets
   ALTER COLUMN state TYPE character varying(50);
ALTER TABLE docsets ADD COLUMN label text;
