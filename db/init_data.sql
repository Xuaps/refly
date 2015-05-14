INSERT INTO meta (version) VALUES ('11');

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
INSERT INTO docsets (docset, default_uri, update_date, label, active) VALUES ('slash','/slash/test.html', CURRENT_DATE, 'new', true);
INSERT INTO docsets (docset, default_uri, label, active) VALUES ('node', '/node/' , 'soon', false);
-- CLIENTS AND USERS
INSERT INTO users(id, email) VALUES (95, '123456@anonymous');
INSERT INTO clients(id, user_id) VALUES ('44022900-9030-4c57-8b74-f5779ca015d4', 95);


