INSERT INTO refs(
            docset, reference, type, content, uri) VALUES ('slash','search', 'function', 'This is an example
-----

example.foo(bar)

**some** descriptive *text*

				function example.foo(bar){
					return bar;
				}', 'test.html');
INSERT INTO refs(
            docset, reference, type, content,uri) VALUES ('slash','search', 'constant', 'This is an example
-----

example.foo(bar)

**some** descriptive *text*

				function example.foo(bar){
					return bar;
				}', 'test_2.html');
INSERT INTO refs(
            docset, reference, type, content,uri) VALUES ('java','search', 'function', 'This is an example
-----

example.foo(bar)

**some** descriptive *text*

				function example.foo(bar){
					return bar;
				}', 'test_3.html');

INSERT INTO refs(
            docset, reference, type, content, uri) VALUES 
('test','update', 'function', 'some value', 'test_4.html');
