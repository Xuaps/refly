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

INSERT INTO refs(id, docset, reference, type, content, uri, parent_id) VALUES (3, 'java', 'search', 'function', 'This is an example
-----

example.foo(bar)

**some** descriptive *text*

				function example.foo(bar){
					return bar;
				}', '/test_3.html', 2);

INSERT INTO refs(id, docset, reference, type, content, uri, parent_id) VALUES (4, 'test', 'update', 'function', 'some value', '/test_4.html', 2);
