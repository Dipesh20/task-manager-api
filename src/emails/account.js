const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email,name)=>{

    sgMail.send({
        to:email,
        from:'dipeshjindal20@gmail.com',
        subject:'This is my first Creation',
        text:`I hope ${name} you will like it.`
    })
}

const sendCancelationEmail = (email,name)=>{

    sgMail.send({
        to:email,
        from:'dipeshjindal20@gmail.com',
        subject:'This is my first Creation',
        text:`${name} Sorry to see you go`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}



