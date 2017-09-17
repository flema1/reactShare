//const Newspress = require('../models/newspress');
const axios = require ("axios");
const reactPlayerController = {};
var userhome = require('userhome')
var dir = require('node-dir');
const fs = require('fs');
// var reactPlayerLocation= path.resolve(userhome(),'Music/reactPlayer')
// console.log(reactPlayerLocation); 

var reactPlayer= '/Users/franklinl/Music/reactPlayer';

reactPlayerController.songs= (req,res)=>{
    console.log(dir.readFileSync)
    console.log(dir.readFilesStream)
    console.log (dir.files)

var songsPaths = dir.files(reactPlayer, {sync:true});
console.log("cgfhvbjnm" +songsPaths);

var data=[]; 
    
let trim= function(title){
return title.substring(0, title.length-4);

}


fs.readdir(reactPlayer, (err, files) => {
  files.forEach(file => {
  
    var sFileExtension = file.split('.')[file.split('.').length - 1];
    console.log (sFileExtension);
    console.log("title "+trim(file));
    if (sFileExtension=="mp4"){
         data.push({
        name:trim(file),
        path:reactPlayer+file 
    });
    }
    //console.log (reactPlayer+file );
   

 
  });

  res.json({
        data: data,
  
      });
})


}



// match only filenames with a .txt extension and that don't start with a `.´



reactPlayerController.index  = (req, res) => {
  Newspress.userSources(req.user.id)
    .then( sources => {
        res.json({
        user: req.user,
        data: sources,
      });
    }).catch(err => {
      console.log(err);
      res.status(500).json({err: err});
    });
}




module.exports = reactPlayerController;