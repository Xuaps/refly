var slash_linker = require('../app/slash_linker');

describe('slash_linker', function(){
	xit('should convert local reference links to slash links', function(){
		ref={
			reference:'test',
			type:'test',
			docset:'test',
			content:'blablabl\n\n blabla\n[0]: #zlib_class_zlib_gunzip'
		}

		var res = slash_linker(ref);

		// expect(res.content).
	});

	xit('should convert inner local reference links to slash links', function(){
		
	});

	xit('shouldnt convert third part links to slash links', function(){
		
	});
});
