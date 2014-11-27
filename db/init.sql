CREATE SEQUENCE rid_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 25980
  CACHE 1;
ALTER TABLE rid_seq
  OWNER TO postgres;

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
      ON UPDATE NO ACTION ON DELETE NO ACTION
      DEFERRABLE,
  CONSTRAINT unique_refrence UNIQUE (reference, docset, parent_uri),
  CONSTRAINT unique_uri UNIQUE (uri)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE refs
  OWNER TO postgres;

create sequence Did_seq start 1;
CREATE TABLE docsets (
    id INTEGER PRIMARY KEY default nextval('Did_seq'),
    docset TEXT,
    pub_date TIMESTAMP default CURRENT_DATE,
    update_date TIMESTAMP,
    state TEXT
);

CREATE TABLE meta
(
  version integer NOT NULL
);

-- Index: anchor

-- DROP INDEX anchor;

CREATE INDEX anchor
  ON refs
  USING btree
  (docset COLLATE pg_catalog."default", reference COLLATE pg_catalog."default", type COLLATE pg_catalog."default");


