ALTER TABLE refs
  ADD CONSTRAINT unique_refrence UNIQUE(reference, docset, parent_id);