const glob = require('glob'), 
    path = require('path'), 
    fs =  require('fs'),
    sp =  require('cli-spinner').Spinner, 
    chalk =  require('chalk')

module.exports = components 

function compale(p){
    let name =  path.parse(p).name , 
        html =  fs.readFileSync(path.join(p , 'index.html') , {encoding : 'utf8'}) , 
        js =  fs.readFileSync(path.join(p , 'index.js'), {encoding : 'utf8'})
    let type = (js.match(/\}\(\s*\)/gim)||[''])[0],      
        coma = js.replace(/[vl=\{,\}\(\),\s*]/gim,'') ? ',' : ''
    return js.replace(type, coma+'template:`'+html+'`});\r\n').
                replace(/vl=/gim , 'Vue.component("'+name+'",')
}

function components(sources, dist){
    if (sources.components){ 
        let spinner = new sp(chalk.blue('[-]')+' building components  %s \r\n')
        spinner.setSpinnerString('|/-\\')
        spinner.start()
        let src =  path.join( '.' , sources.src , sources.components , '**' , '*.js' )     
        let matches = glob.sync(src)
        matches.forEach(p=> {
            fs.writeFileSync(dist , 
                compale(path.parse(p).dir)
            ,{flag : 'a'})
        })
        spinner.stop()
    }
}