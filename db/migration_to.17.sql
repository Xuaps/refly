CREATE SEQUENCE settings_id_sec
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
ALTER TABLE settings_id_sec
  OWNER TO postgres;


CREATE TABLE docsetsxuser
(
  id integer NOT NULL DEFAULT nextval('settings_id_sec'::regclass),
  "user" integer,
  docset text,
  CONSTRAINT pk_stacks PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE docsetsxuser
  OWNER TO postgres;


UPDATE meta SET version='17';
