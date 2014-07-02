create sequence rid_seq start 4;
ALTER TABLE refs ALTER COLUMN id SET default nextval('rid_seq');