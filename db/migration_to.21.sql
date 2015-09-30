-- Sequence: cid_seq

-- DROP SEQUENCE cid_seq;

CREATE SEQUENCE cid_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 3688
  CACHE 1;
ALTER TABLE cid_seq
  OWNER TO postgres;

-- Table: refs_content

-- DROP TABLE refs_content;

CREATE TABLE refs_content
(
  id integer NOT NULL DEFAULT nextval('cid_seq'::regclass),
  source_url text NOT NULL,
  content text,
  CONSTRAINT refs_content_pkey PRIMARY KEY (id),
  CONSTRAINT refs_content_source_url_key UNIQUE (source_url)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE refs_content
  OWNER TO postgres;

UPDATE meta SET version='21';