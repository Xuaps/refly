-- Sequence: did_seq

-- DROP SEQUENCE did_seq;

CREATE SEQUENCE did_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 9
  CACHE 1;
ALTER TABLE did_seq
  OWNER TO postgres;
-- Sequence: rid_seq

-- DROP SEQUENCE rid_seq;

CREATE SEQUENCE rid_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 35099
  CACHE 1;
ALTER TABLE rid_seq
  OWNER TO postgres;
-- Sequence: source_refs_id_seq

-- DROP SEQUENCE source_refs_id_seq;

CREATE SEQUENCE source_refs_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 28872
  CACHE 1;
ALTER TABLE source_refs_id_seq
  OWNER TO postgres;
-- Table: docsets

-- DROP TABLE docsets;

CREATE TABLE docsets
(
  id integer NOT NULL DEFAULT nextval('did_seq'::regclass),
  docset text,
  default_uri text,
  pub_date timestamp without time zone DEFAULT ('now'::text)::date,
  update_date timestamp without time zone,
  active boolean,
  label text,
  parsed_name text,
  CONSTRAINT docsets_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE docsets
  OWNER TO postgres;
-- Table: meta

-- DROP TABLE meta;

CREATE TABLE meta
(
  version integer NOT NULL
)
WITH (
  OIDS=FALSE
);
ALTER TABLE meta
  OWNER TO postgres;
-- Table: refs

-- DROP TABLE refs;

CREATE TABLE refs
(
  id integer NOT NULL DEFAULT nextval('rid_seq'::regclass),
  docset text NOT NULL,
  reference text NOT NULL,
  type text NOT NULL,
  content text,
  source_url text,
  parent_uri text,
  uri text NOT NULL,
  content_anchor text,
  CONSTRAINT refs_pkey PRIMARY KEY (id),
  CONSTRAINT refs_parent_uri_fkey FOREIGN KEY (parent_uri)
      REFERENCES refs (uri) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION DEFERRABLE INITIALLY IMMEDIATE,
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

-- Table: temp_refs

-- DROP TABLE temp_refs;

CREATE TABLE temp_refs
(
  id integer NOT NULL DEFAULT nextval('rid_seq'::regclass),
  docset text NOT NULL,
  reference text NOT NULL,
  type text NOT NULL,
  content text,
  source_url text,
  parent text,
  content_anchor text,
  uri text NOT NULL
)
WITH (
  OIDS=FALSE
);
ALTER TABLE temp_refs
  OWNER TO postgres;

-- Sequence: uid_seq

-- DROP SEQUENCE uid_seq;

CREATE SEQUENCE uid_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 110
  CACHE 1;
ALTER TABLE uid_seq
  OWNER TO postgres;

-- Table: users

-- DROP TABLE users;

CREATE TABLE users
(
  id integer NOT NULL DEFAULT nextval('uid_seq'::regclass),
  email text,
  auth_token text,
  profile_id numeric,
  profile_provider text,
  stripe_id text,
  CONSTRAINT users_pkey PRIMARY KEY (id),
  CONSTRAINT profile_unique UNIQUE (profile_id, profile_provider)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE users
  OWNER TO postgres;


-- Sequence: settings_id_sec

-- DROP SEQUENCE settings_id_sec;
CREATE SEQUENCE settings_id_sec
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
ALTER TABLE settings_id_sec
  OWNER TO postgres;

-- Table: docsetsxuser

-- DROP TABLE docsetsxuser
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

INSERT INTO meta  values('20');

