const emailjs = require("@emailjs/browser")

function sendEmail(email, verficationLink){
    emailjs
      .sendForm(
        "service_1yqv2zq", 
        "template_rmd3zmv", 
        form.current,
        "myhy7O7NfOSY1l2Ej"
      )
      .then(() => {
        console.log("User confirmation email sent!");

        // Send email to admin
        emailjs
          .send(
            "service_1yqv2zq",
            "template_3495jke", 
            {
              
              message: `Verify here: ${verficationLink}`,
              to_email: email, 
            },
            "myhy7O7NfOSY1l2Ej"
          )
          .then(() => {
            console.log("Email Sent");
          })
          .catch(() => {
            console.log("Email Not Sent");
          });
      })
      .catch(() => {
        console.log("Some error");
      });
};

module.exports = sendEmail;