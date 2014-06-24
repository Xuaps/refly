ALTER TABLE refs RENAME COLUMN uri TO content;

DROP INDEX anchor;

CREATE UNIQUE INDEX anchor ON refs (docset, reference, type);


UPDATE refs SET content = 'This is an example
-----

example.foo(bar)

**some** descriptive *text*

				function example.foo(bar){
					return bar;
				}';