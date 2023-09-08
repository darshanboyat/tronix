import nodemailer from "nodemailer";
import Express from "express";
import cors from "cors";

const app = Express();

app.use(cors("*"));
app.use(Express.json());

const sendMail = (mailData) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "pithwalahussain@gmail.com",
      pass: "zdhshrewnhvavdrd",
    },
  });
  let config = {
    from: mailData.email,
    to: mailData.to,
    subject: mailData.subject,
    html: mailData.html,
  };

  transporter
    .sendMail(config)
    .then((resp) => {
      return resp;
    })
    .catch((error) => {
      console.log(error);
    });
};

app.get("/test", (req, res)=>{
    res.send("<h1>Api is live and working fine...</h1>")
})
app.post("/contact", async (req, res) => {
  try {
    const payload = {
      to: "pithwalahussain@gmail.com",
      subject: "Client Inquiry....",
      html: `<html>
            <body>
                <h1>${req.body.name}</h1>
                <h2>${req.body.email}</h2>
                <h2>${req.body.number}</h2>
                <h4>${req.body.message}</h4>
            </body>
        </html>`,
    };
    const payload2 = {
      to: req.body.email,
      subject: "Thank you for reaching out to Tronix Tech IT",
      html: `<html>
            <body>
                <h1>Hey ${req.body.name}! <br></h1>
                <h4><b>Hope you're doing great, we've recorded your inquiry and one of our executive will get back to you soon.</b></h4>
            </body>
        </html>`,
    };

    await sendMail(payload);
    await sendMail(payload2);

    return res.status(200).json({
      success: true,
      error: false,
      message: "Mail has been sent successfully...",
    });
  } catch (Error) {
    return res.status(200).json({
      success: false,
      error: true,
      message: "An Error occurred while sending mail!!!",
    });
  }
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
