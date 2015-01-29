module.exports.fromRef = function (reference) {
    return {
        uri: reference.uri,
        name: reference.reference,
        type: reference.type,
        docset_name: reference.docset
    };
};

