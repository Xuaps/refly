var random = require('../app/random-values.js');

describe('Random state', function(){
    it('should return true the 50% of times', function(){
        var count=0;
        for(var i=0;i<10000;i++){
            if(random.boolean())
                count++;
        }
        expect(count).toBeLessThan(5500);
    });

    describe('weighted', function(){
        it('should be true a percentage number of times', function(){
            var count=0;
            for(var i=0;i<10000;i++){
                if(random.boolean.weighted(5))
                    count++;
            }
            expect(count).toBeLessThan(600);
        });

        it('should be true a percentage number of times', function(){
                var count=0;
                for(var i=0;i<10000;i++){
                    if(random.boolean.weighted(100))
                        count++;
                }
                expect(count).toBe(10000);
            });

        it('should be true a percentage number of times', function(){
            var count=0;
            for(var i=0;i<10000;i++){
                if(random.boolean.weighted(0))
                    count++;
            }
           expect(count).toBe(0);
        });
    });
});
