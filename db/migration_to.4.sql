ALTER TABLE refs
ADD parent_id integer NULL REFERENCES refs(id);