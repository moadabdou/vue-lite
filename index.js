
const config = require('../vuelite.config'), 
    system = require('./lib/system')()
    watcher = require('./lib/watcher'), 
    boxen =  require('boxen'), 
    chalk =  require('chalk')

const hello = chalk.hex("#41b883").bold('VueLite!')
const boxenOptions = {
    margin: {
        top : 1 , 
        bottom : 1 , 
        left: 30
    },
    padding : {
        
        top : 1, 
        bottom : 1 ,
        left: 15, 
        right : 15
    }, 
    borderColor: "#0F0"
}
console.log(boxen(hello ,boxenOptions))
console.log(chalk.green('[+]')+' start project ... ')
const Env =  system.setEnv({
    libs : config.use
})
Env.buildChunk(config.sources , (task)=>{
    watcher.chunk(config.sources.src , task)
})
Env.buildCss(config.sources , tasks=> {   
    watcher.css(tasks)
})




