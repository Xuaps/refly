INSERT INTO refs(id, docset, reference, type, source_url, uri) VALUES (1, 'slash', 'search', 'function', 'http://slash/search', '/slash/test.html');
INSERT INTO refs_content(id, source_url, content) VALUES(1, 'http://slash/search','This is an example
-----

example.foo(bar)

**some** descriptive *text*

				function example.foo(bar){
					return bar;
				}');

INSERT INTO refs(id, docset, reference, type, source_url, uri) VALUES (2, 'slash', 'search', 'constant', 'http://slash/search2', '/slash/test_2.html');
INSERT INTO refs_content(id, source_url, content) VALUES (2, 'http://slash/search2', 'This is an example
-----

example.foo(bar)

**some** descriptive *text*

				function example.foo(bar){
					return bar;
				}');

INSERT INTO refs(id, docset, reference, type, source_url, uri, parent_uri) VALUES (3, 'slash', 'search(ref)', 'function', 'http://slash/search3', '/slash/test_3.html', '/slash/test_2.html');
INSERT INTO refs_content(id, source_url, content) VALUES (3, 'http://slash/search3', 'This is an example
-----

example.foo(bar)

**some** descriptive *text*

				function example.foo(bar){
					return bar;
				}');

INSERT INTO refs(id, docset, reference, type, source_url, uri, parent_uri) VALUES (4, 'slash', 'update', 'function', 'http://slash/update', '/slash/test_4.html', '/slash/test_2.html');
INSERT INTO refs_content(id, source_url, content) VALUES (4, 'http://slash/update', 'some value');
-- DOCSETS
INSERT INTO docsets (docset, default_uri, update_date, label, active) VALUES ('slash','/slash/test.html', CURRENT_DATE, 'new', true);
INSERT INTO docsets (docset, default_uri, label, active) VALUES ('node', '/node/' , 'soon', false);


