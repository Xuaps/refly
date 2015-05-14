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
  CONSTRAINT users_pkey PRIMARY KEY (id),
  CONSTRAINT emai_unique UNIQUE (email)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE users
  OWNER TO postgres;

-- Table: clients

-- DROP TABLE clients;

CREATE TABLE clients
(
  id uuid NOT NULL,
  user_id integer,
  CONSTRAINT clients_pkey PRIMARY KEY (id),
  CONSTRAINT user_id_fk FOREIGN KEY (user_id)
      REFERENCES users (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE clients
  OWNER TO postgres;

-- Index: fki_user_id_fk

-- DROP INDEX fki_user_id_fk;

CREATE INDEX fki_user_id_fk
  ON clients
  USING btree
  (user_id);


UPDATE meta SET version='15';
