const glob = require('glob'), 
    path = require('path'), 
    fs =  require('fs'),
    sp =  require('cli-spinner').Spinner, 
    chalk =  require('chalk')

module.exports = mixins 


function compale(txt, p){
    let name =  path.parse(p).name
    return txt.replace(/vl/gim , 'var '+name) + ';\r\n'
}

function mixins(sources, dist){
    if (sources.mixins){ 
        let spinner = new sp(chalk.blue('[-]')+' building mixins   %s \r\n')
        spinner.setSpinnerString('|/-\\')
        spinner.start()
        let src =  path.join( '.' , sources.src , sources.mixins , '**' , '*.js' )         
        let matches = glob.sync(src)
        matches.forEach(p=> {
            fs.writeFileSync(dist , 
                compale(fs.readFileSync(p , {encoding : 'utf8'}), p)
            ,{flag : 'a'})
        })
        spinner.stop()
    }
}