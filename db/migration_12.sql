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
)
