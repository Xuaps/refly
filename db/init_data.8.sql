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
INSERT INTO docsets (docset, default_uri, update_date, state) VALUES ('Javascript','/javascript/javascript_reference', CURRENT_DATE, 'new');
INSERT INTO docsets (docset, default_uri, state) VALUES ('node', '/node/' , 'soon');
