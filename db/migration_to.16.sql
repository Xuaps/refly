-- Index: fki_user_id_fk

DROP INDEX fki_user_id_fk;

-- Table: clients

DROP TABLE clients;

-- Table: users

DROP TABLE users;

CREATE TABLE users
(
  id integer NOT NULL DEFAULT nextval('uid_seq'::regclass),
  email text,
  auth_token text,
  profile_id numeric,
  profile_provider text,
  CONSTRAINT users_pkey PRIMARY KEY (id),
  CONSTRAINT profile_unique UNIQUE (profile_id, profile_provider)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE users
  OWNER TO postgres;

UPDATE meta SET version='16';
