const glob =  require('glob'), 
    fs = require('fs'), 
    path = require('path'),
    sp =  require('cli-spinner').Spinner, 
    chalk =  require('chalk')

module.exports = Rt 


function Rt(sources, dist){
    if (sources.routes){ 
        let spinner = new sp(chalk.blue('[-]')+' building routes   %s \r\n')
        spinner.setSpinnerString('|/-\\')
        spinner.start() 
        let src =  path.join( '.' , sources.src , sources.routes ),
            matches = glob.sync(path.join(src , '**' , '*.js' ),{ignore : "**/index.js"})
        matches.forEach(p=> {
            fs.writeFileSync(dist , 
                fs.readFileSync(p , {encoding:"utf8"}) + ';\r\n'
            ,{flag : 'a'})
        })
        fs.writeFileSync(dist , 
            fs.readFileSync(
                    path.join(src, 'index.js')
                , {encoding:"utf8"}) + ';\r\n'
        ,{flag : 'a'})
        spinner.stop() 
    }
}