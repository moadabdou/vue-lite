const  fs = require('fs'), 
    path = require('path'), 
    mixins = require('./renders/mixins') , 
    components =  require('./renders/components') , 
    routes = require('./renders/routes') , 
    views = require('./renders/views'), 
    cssbuilder = require('./renders/cssbuilder'), 
    sp =  require('cli-spinner').Spinner, 
    chalk =  require('chalk')

module.exports = Env
const tasks = [
    mixins , 
    components, 
    routes , 
    views
]

function Env(dir){   
    const chunk = path.join(dir , "js" , "chunk.js") 
    this.buildChunk = (sources ,fn)=>{
        let spinner = new sp(chalk.green('[+]')+' building chunk ... %s \r\n')
        spinner.setSpinnerString('|/-\\')
        spinner.start()
        fs.writeFileSync(chunk , '//VueLite[abdou moad] \r\n')
        for (let i in tasks){
            tasks[i](sources , chunk)
        }
        spinner.stop()
        if (fn){         
            fn(()=>{this.buildChunk(sources)})
        }
    }
    this.buildCss = (sources , fn)=>{
        cssbuilder(sources)
        if (fn){     
            fn({
                run : ()=> {cssbuilder(sources)}, 
                src : sources.src
            })
        }
    }
}