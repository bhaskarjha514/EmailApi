const nodemailer = require('nodemailer')

const mailer = (email) => {

    // The output message to be shown
    const output = `
    <p>Congrats! successfully Signup</p>
    <h3>BC GiveAway</h3>
    <ul>  
    <li>Email: ${email}</li>
    </ul>
`;

    var transporter = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user: "starizontech3@gmail.com", // Sender's email address
            pass: "bhaskar123@" // password
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    let mailOptions = {
        from: '"Free BC GiveAway Contact" <starizontech3@gmail.com>', // sender address
        to: email, // list of receivers
        subject: 'BC GIVEAWAY', // Subject line
        text: 'You have participate successfully', // plain text body
        html: output // html body
    };

    try {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });  
    } catch (error) {
       return 'Cannot send email' 
    }

}

module.exports = { mailer }