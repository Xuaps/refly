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
  url text,
  parsed_url text,
  content text,
  docset text,
  alias text,
  type text
)
