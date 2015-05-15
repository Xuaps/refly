var RandomValues = function(){
};

RandomValues.boolean = function(){
    return RandomValues.boolean.weighted(50);
};

RandomValues.boolean.weighted = function(weight){
    return ((Math.random()*100)+1)<(weight+1);
};

module.exports = RandomValues;
