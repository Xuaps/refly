create sequence rid_seq start 5;

CREATE TABLE refs
(
  id integer NOT NULL DEFAULT nextval('rid_seq'::regclass),
  docset text NOT NULL,
  reference text NOT NULL,
  type text NOT NULL,
  content text,
  parent_id integer,
  uri text NOT NULL,
  CONSTRAINT refs_pkey PRIMARY KEY (id),
  CONSTRAINT refs_parent_id_fkey FOREIGN KEY (parent_id)
      REFERENCES refs (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT unique_docset_uri UNIQUE (docset, uri),
  CONSTRAINT unique_refrence UNIQUE (reference, docset, parent_id)
)
WITH (
  OIDS=FALSE
);

CREATE INDEX anchor ON refs (docset, reference, type);
