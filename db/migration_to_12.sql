CREATE SEQUENCE source_refs_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 28284
  CACHE 1;

CREATE TABLE source_refs
(
  id integer DEFAULT nextval('source_refs_id_seq'::regclass),
  name text,
  parent text,
  uri text,
  parsed_uri text,
  content text,
  docset text,
  alias text,
  type text
);


CREATE TABLE temp_refs
(
  id serial NOT NULL,
  reference text,
  content text,
  parent text,
  type character varying(255),
  docset character varying(255),
  uri text,
  CONSTRAINT temp_refs_pkey PRIMARY KEY (id)
);

UPDATE meta SET version='12';
