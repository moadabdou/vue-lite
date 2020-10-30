const chkidar =  require('chokidar'), 
    path = require('path')

module.exports = {
    css : css,  
    chunk : chunk
}
function css (tasks) {
    let wt = chkidar.watch(path.join(tasks.src , '**' , '*.{css,scss}'))
    wt.on("change" , tasks.run)
}
function chunk(src, task){
   let wt = chkidar.watch(path.join( '.',src, '**', 'index.{html,js}'))
    wt.on("change" , task)
}

