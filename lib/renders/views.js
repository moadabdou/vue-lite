const glob = require('glob'), 
    path = require('path'), 
    fs =  require('fs'),
    sp =  require('cli-spinner').Spinner, 
    chalk =  require('chalk')
module.exports = views

function compale(name ,p){
    let html =  fs.readFileSync(path.join(p , 'index.html') , {encoding : 'utf8'}) , 
        js =  fs.readFileSync(path.join(p , 'index.js'), {encoding : 'utf8'})
    let type = (js.match(/\}\(\s*\)/gim)||[''])[0], 
        coma = js.replace(/[vl=\{,\}\(\),\s*]/gim,'') ? ',' : ''
    return js.replace(type , coma+'template:`'+html+'`};\r\n').
                replace(/vl/gim , 'var '+name)
}
function setTags(tags , path){
    let html =  fs.readFileSync(path , {encoding:"utf8"})
    html = html.replace(/([\r\n]*)<\/head>/gim, '\r\n'+tags+'</head>')
    tags = `    <script src="js/libs.js"></script>
    <script src="js/chunk.js"></script>`
    return html.replace(/([\r\n]*)<\/body>/gim, '\r\n'+tags+'</body>')
}
function views(sources, dist){
    let spinner = new sp(chalk.blue('[-]')+' building views   %s \r\n')
        spinner.setSpinnerString('|/-\\')
        spinner.start()
    let distdir = path.parse(dist).dir
    let oldviews = glob.sync(path.join(distdir , '*.js') , 
        {ignore : '**/{libs,chunk}.js'})
    oldviews.forEach(v=> {
        fs.unlinkSync(v)
    })
    let src = path.join('.',sources.src) , 
            vws = '    <link rel="stylesheet" href="css/style.css">\r\n'
        fs.writeFileSync(dist ,
            fs.readFileSync(path.join(src , sources.app , 'index.js'), {encoding : "utf8"})+';'
            ,{flag:"a"})
        if (sources.views){
            let matches = glob.sync(path.join(src , sources.views , "**" , "index.js"))
            matches.forEach(p=> {
                let name =path.parse(path.parse(p).dir).name 
                try {             
                    fs.writeFileSync(
                        path.join(distdir , name+'.js'), 
                        compale(name , path.parse(p).dir) //compile
                    )
                }catch(e){
                    console.error('Error : Cannot render '+p)
                    console.error(e)
                }
                vws = vws + '    <script src="js/'+name+'.js"></script>\r\n'
            })
        }  
        fs.writeFileSync(
            path.join(distdir , '..' ,'index.html' ) ,
                setTags(vws,path.join(src , sources.app , 'index.html')),
                {encoding : "utf8"}
            ) 
        spinner.stop()
}