function ReferenceVO (obj){
    if(!obj.uri)
        throw new Error('Uri required to build a ReferenceVO object');
    
    this.uri = obj.uri;
    this.name = obj.name;
    this.type = obj.type;
    this.docset_name = obj.docset_name;
};

ReferenceVO.fromRef = function (reference) {
    return {
        uri: reference.uri,
        name: reference.reference,
        type: reference.type,
        docset_name: reference.docset
    };
};

module.exports = ReferenceVO;
