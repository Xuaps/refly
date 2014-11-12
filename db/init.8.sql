-- Table: refs

-- DROP TABLE refs;

CREATE TABLE refs
(
  id integer NOT NULL DEFAULT nextval('rid_seq'::regclass),
  docset text NOT NULL,
  reference text NOT NULL,
  type text NOT NULL,
  content text,
  parent_uri text,
  uri text NOT NULL,
  CONSTRAINT refs_pkey PRIMARY KEY (id),
  CONSTRAINT refs_parent_uri_fkey FOREIGN KEY (parent_uri)
      REFERENCES refs (uri) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT unique_refrence UNIQUE (reference, docset, parent_uri),
  CONSTRAINT unique_uri UNIQUE (uri)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE refs
  OWNER TO postgres;

-- Index: anchor

-- DROP INDEX anchor;

CREATE INDEX anchor
  ON refs
  USING btree
  (docset COLLATE pg_catalog."default", reference COLLATE pg_catalog."default", type COLLATE pg_catalog."default");


