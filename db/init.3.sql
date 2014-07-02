create sequence rid_seq start 1;

CREATE TABLE refs (
    id INTEGER PRIMARY KEY default nextval('rid_seq'),
    docset TEXT,
    reference TEXT,
    type TEXT,
    content TEXT
);

CREATE UNIQUE INDEX anchor ON refs (docset, reference, type);