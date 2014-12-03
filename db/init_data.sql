INSERT INTO meta (version) VALUES ('10');

INSERT INTO refs(id, docset, reference, type, content, uri) VALUES (1, 'slash', 'search', 'function', 'This is an example
-----

example.foo(bar)

**some** descriptive *text*

				function example.foo(bar){
					return bar;
				}', '/slash/test.html');

INSERT INTO refs(id, docset, reference, type, content, uri) VALUES (2, 'slash', 'search', 'constant', 'This is an example
-----

example.foo(bar)

**some** descriptive *text*

				function example.foo(bar){
					return bar;
				}', '/slash/test_2.html');

INSERT INTO refs(id, docset, reference, type, content, uri, parent_uri) VALUES (3, 'slash', 'search(ref)', 'function', 'This is an example
-----

example.foo(bar)

**some** descriptive *text*

				function example.foo(bar){
					return bar;
				}', '/slash/test_3.html', '/slash/test_2.html');

INSERT INTO refs(id, docset, reference, type, content, uri, parent_uri) VALUES (4, 'slash', 'update', 'function', 'some value', '/slash/test_4.html', '/slash/test_2.html');
-- DOCSETS
INSERT INTO docsets (docset, default_uri, update_date, state) VALUES ('slash','/slash/test.html', CURRENT_DATE, 'new');
INSERT INTO docsets (docset, default_uri, state) VALUES ('node', '/node/' , 'soon');
