INSERT INTO meta (version) VALUES ('10')

INSERT INTO refs(id, docset, reference, type, content, uri) VALUES (1, 'slash', 'search', 'function', 'This is an example
-----

example.foo(bar)

**some** descriptive *text*

				function example.foo(bar){
					return bar;
				}', '/test.html');

INSERT INTO refs(id, docset, reference, type, content, uri) VALUES (2, 'slash', 'search', 'constant', 'This is an example
-----

example.foo(bar)

**some** descriptive *text*

				function example.foo(bar){
					return bar;
				}', '/test_2.html');

INSERT INTO refs(id, docset, reference, type, content, uri, parent_uri) VALUES (3, 'java', 'search', 'function', 'This is an example
-----

example.foo(bar)

**some** descriptive *text*

				function example.foo(bar){
					return bar;
				}', '/test_3.html', '/test_2.html');

INSERT INTO refs(id, docset, reference, type, content, uri, parent_uri) VALUES (4, 'test', 'update', 'function', 'some value', '/test_4.html', '/test_2.html');
//DOCSETS
INSERT INTO docsets (docset, update_date, state) VALUES ('Javascript', CURRENT_DATE, 'new');
INSERT INTO docsets (docset, update_date, state) VALUES ('node', CURRENT_DATE, 'soon');
