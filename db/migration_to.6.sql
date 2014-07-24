DROP INDEX anchor;

CREATE INDEX anchor
  ON refs
  USING btree
  (docset COLLATE pg_catalog."default", reference COLLATE pg_catalog."default", type COLLATE pg_catalog."default");