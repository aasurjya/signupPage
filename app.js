const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const { Console } = require("console");
const { json } = require("body-parser");
const app = express();
const mailchimp = require("@mailchimp/mailchimp_marketing");
const { response } = require("express");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//Getting html file 
app.get("/", function (req, res){
    res.sendFile(__dirname + "/signup.html")
});

    // trying arror function
// app.post("/", (req, res)=>{
//     const name1 = req.body.inputName;
//     const email = req.body.inputEmail;
// })

    //Getting input from html
app.post("/", function(req, res){
    const name1 = req.body.inputName;
    const email = req.body.inputEmail;

    //Setting up MailChimp
    mailchimp.setConfig({
        apiKey: "b3b77142624e77f69a4b0944b095e526-us13",
        server: "us13",
    });
    const listId = "1706d9c768";
    const data = {
        members: [
            {
               email_address: email,
               status: "subscribed",
               merge_fields:{
                FNAME: name1
               } 
            }

        ]
    }
    async function run() {
        const response = await mailchimp.lists.addListMember(listId, {
         email_address: data.members.email_address,
         status: "subscribed",
         merge_fields: {
         FNAME: subscribingUser.firstName,
         email_address: subscribingUser.lastName
        }
        
        })
        console.log(response)
    };
    run()
    res.write(response);
    res.end()
    
   
    // const url = 'https://us13.api.mailchimp.com/3.0/lists/1706d9c768';
    // const options ={
    //     method: "POST",
    //     auth: "aasurjya:b3b77142624e77f69a4b0944b095e526-us13"
    // }
    
    // const request = https.request(url, options, function(response){
    //     response.on("data", function(data){
    //         Console.log(json.parse(data));

    // })
    // request.write(jsonData);
    // request.end();


})
// })
app.listen(process.env.PORT || 3000, function() {
    console.log("Server is running at port 3000");
});

// b3b77142624e77f69a4b0944b095e526-us13 api_key
// 1706d9c768 audiance id
