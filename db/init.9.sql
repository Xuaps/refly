<<<<<<< HEAD
DROP TABLE docsets;
DROP SEQUENCE IF EXISTS Did_seq;
CREATE  sequence Did_seq start 1;
CREATE TABLE docsets (
    id INTEGER PRIMARY KEY default nextval('Did_seq'),
    docset TEXT,
    default_uri TEXT,
    pub_date TIMESTAMP default CURRENT_DATE,
    update_date TIMESTAMP,
    state TEXT
);
