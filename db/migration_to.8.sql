ALTER TABLE refs DROP CONSTRAINT refs_parent_id_fkey;
ALTER TABLE refs ALTER COLUMN parent_id TYPE text;
ALTER TABLE refs RENAME COLUMN parent_id to parent_uri;
ALTER TABLE refs DROP CONSTRAINT unique_docset_uri;
ALTER TABLE refs
  ADD CONSTRAINT unique_uri UNIQUE(uri);
UPDATE refs SET parent_uri = (SELECT uri FROM refs a WHERE CAST(a.id as text)= parent_uri);
ALTER TABLE refs
  ADD CONSTRAINT refs_parent_uri_fkey FOREIGN KEY (parent_uri)
      REFERENCES refs (uri) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION;
