const fs = require('fs'), 
    path = require('path'), 
    sass = require('node-sass'), 
    glob = require('glob'),
    sp =  require('cli-spinner').Spinner, 
    chalk =  require('chalk')

module.exports =  Css
const cach = path.join('.' , 'dist' , 'css', 'style.css')
function writecss (paths){
    paths.forEach(p=> {
        //console.log(fs.readFileSync(p , {encoding:"utf8"}))
        fs.writeFileSync(cach, 
            Sass(p, fs.readFileSync(p , {encoding:"utf8"}))
        , {flag : 'a'})
    })
}

function Sass(p,code){
    try {
        return sass.renderSync({
            data : code, 
            outputStyle : "compressed" 
        }).css.toString().replace(/[\r\n]*/gim, '')
    }catch(e){console.error('Path :'+p +'\r\n'+ e)}
}

function Css(sources){
    let spinner = new sp(chalk.green('[+]')+' building css ... %s \r\n')
        spinner.setSpinnerString('|/-\\')
        spinner.start()
    fs.writeFileSync(cach, 
        '/* VueLite[moad abdou] css */'
    , {flag : 'w'})
    src = path.join('.' , sources.src)
    matches = glob.sync(path.join(src ,  '**' , 'index.{css,scss}'), {ignore : '**/sass/**'})
    writecss(matches)
    spinner.stop()
}