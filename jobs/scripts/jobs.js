require("fs").readdirSync(__dirname+"/jobs").forEach(function(file) {
  exports[file.split('.')[0]]=require("./jobs/" + file);
});