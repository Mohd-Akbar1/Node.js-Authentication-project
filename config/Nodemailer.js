//require nodemailer

const nodemailer=require('nodemailer')

//2. configure email and send it;
async function sendMail(link,email){
    //1.create an email transpoter
    //SMTP simple mail transfer protocol
    const transpoter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'34mohdakbar@gmail.com',
            pass:'ifhr fcsg apke jpig'
        }
    })
    //2 configure email content
    const mailOptions={
        from:'34mohdakbar@gmail.com',
        to:email,
        subject:'Password Reset Link',
        text:link
    }
    //3.send the  email
    try{
        const result=await transpoter.sendMail(mailOptions)
        console.log('email sucessfully sent to',email)
    }catch(err){
        console.log('error in email',err)
    }
}

module.exports={sendMail}