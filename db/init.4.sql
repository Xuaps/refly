create sequence rid_seq start 1;

CREATE TABLE refs
(
  id integer NOT NULL DEFAULT nextval('rid_seq'::regclass),
  docset text,
  reference text,
  type text,
  content text,
  parent_id integer,
  CONSTRAINT refs_pkey PRIMARY KEY (id),
  CONSTRAINT refs_parent_id_fkey FOREIGN KEY (parent_id)
      REFERENCES refs (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);

CREATE UNIQUE INDEX anchor ON refs (docset, reference, type);