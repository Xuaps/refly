INSERT INTO refs(
            docset, reference, type, content VALUES ('slash','search', 'function', 'This is an example
-----

example.foo(bar)

**some** descriptive *text*

				function example.foo(bar){
					return bar;
				}');
INSERT INTO refs(
            docset, reference, type, content) VALUES ('slash','search', 'constant', 'This is an example
-----

example.foo(bar)

**some** descriptive *text*

				function example.foo(bar){
					return bar;
				}');
INSERT INTO refs(
            docset, reference, type, content) VALUES ('java','search', 'function', 'This is an example
-----

example.foo(bar)

**some** descriptive *text*

				function example.foo(bar){
					return bar;
				}');