-- slash database

CREATE TABLE refs (
    id INTEGER PRIMARY KEY,
    docset TEXT,
    reference TEXT,
    type TEXT,
    uri TEXT
);

CREATE UNIQUE INDEX anchor ON refs (docset, reference, type, uri);
