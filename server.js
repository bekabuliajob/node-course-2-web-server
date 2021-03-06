const express=require('express');
const hbs= require('hbs');
const fs= require('fs');
const port=process.env.PORT || 3000;



hbs.registerPartials(__dirname+'/views/partials')
var app=express();
app.set('view engine', hbs)


app.use((req,res, next)=>{
    var now=new Date().toString();
    var log=(`${now}: ${req.method} ${req.url}`);
    console.log(log);
    fs.appendFile('server.log',log+'\n', (err)=>{
       if(err){
           console.log('unable to append!');
       }
    });
    next();
});
// app.use((req, res, next)=>{
//     res.render('maintenance.hbs');
// });



app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear()
});


hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});

    app.get('/',(req,res)=>{
        res.render('home.hbs', {
            pageTitle:'home page',
            currentyear:new Date().getFullYear(),
            welcomeMessage:'hiiiiiiiiii'

        });
    })

app.get('/about',(req,res)=>{
    res.render('about.hbs', {
        pageTitle:'about page',
        currentyear:new Date().getFullYear()
    });
})

app.get('/projects',(req,res)=>{
    res.render('projects.hbs', {
        pageTitle:'projects page',
        currentyear:new Date().getFullYear(),
        welcomeMessage:'portfolio'
    });
})

app.get('/bad',(req,res)=>{
    res.send({
        errormessage:'error'

    });
})

app.listen(port,()=>{
    console.log(`server is running on ${port} `);
});
