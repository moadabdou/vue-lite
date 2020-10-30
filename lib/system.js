const path = require('path'), 
    fs = require('fs') , 
    env = require('./env'), 
    sp =  require('cli-spinner').Spinner, 
    chalk =  require('chalk')

const dist = path.join('.' , 'dist') ,
    distdirs = ["css","js","assets"]
module.exports = function(){
    if (! fs.existsSync(dist)){
        console.log(chalk.red('[!!] ')+'no dist folder matched , start building one ...')
        fs.mkdirSync(dist)
        distdirs.forEach(dir => {
            fs.mkdirSync(path.join(dist , dir))
        })
        console.log(chalk.green('[+] ')+' dist dir is done ')
    }
    return new Stytem()
}

const assets = path.join(__dirname , '..', 'assets' )
function Stytem(){
    this.setEnv = prms => {
        let spinner = new sp(chalk.green('[+]')+' importing libraries .. %s \r\n')
        spinner.setSpinnerString('|/-\\')
        spinner.start()
        fs.writeFileSync(path.join(dist, "js" , "libs.js"), 
            fs.readFileSync(path.join(assets , "vue.min.js") , {encoding : "utf-8"}),
            {flag: "w"}
        )
        prms.libs.forEach(lib => {
            fs.writeFileSync(path.join(dist, "js" , "libs.js"), 
                fs.readFileSync(path.join(assets , lib+".min.js") , {encoding : "utf-8"}),
                {flag: "a"}
            )
        })
        spinner.stop()
        return new env(dist)
    }
}