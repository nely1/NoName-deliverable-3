const fs = require("fs")



const patient = require('../models/patientModel')
 


const display = (req, res) => {
    res.render('register', {register: "active"})
}

const insert = async(req, res) => {

    const thisPatient = await patient.findById("62675c0d652ecfc70bd91d90")
    var img = fs.readFileSync(req.file.path);
    var encode_img = img.toString('base64');
    var final_img = {
        contentType:req.file.mimetype,
        image:new Buffer.from(encode_img,'base64')
    };
    thisPatient.img.contentType = final_img.contentType;
    thisPatient.img.image = final_img.image;
    await thisPatient.save();


    image.create(final_img,function(err,result){
        if(err){
            console.log(err);
        }else{
            console.log(result.img.Buffer);
            console.log("Saved To database");
            res.contentType(final_img.contentType);
            res.send(final_img.image);
        }
    })

    console.log(req.body)
    res.send("You have inserted a patient")
}

module.exports = {
    display,
    insert,
}