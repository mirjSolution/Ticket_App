const ErrorResponse = require('../utils/errorResponse.js');
const asyncHandler = require('../middleware/async');
const sendEmail = require('../utils/sendEmail');

// @desc        Send Message
// @route       POST /api/v1/sendmessage
// @access      Public
exports.sendMessage = asyncHandler(async (req, res, next) => {
  const {
    eventDate,
    eventTime,
    description,
    area,
    urlPic,
    ticketId,
    order_name,
    purchasedAt,
    order_general,
    order_vip,
    order_total,
    userEmail,
  } = req.body;

  try {
    await sendEmail({
      to: userEmail,
      subject: 'Your Purchased Ticket',
      // html: `<p style=color:red>Name: ${name}</p><p>Email: ${email}</p><p>Contact No. ${phone}</p><p>Message: ${message}</p>`,

      html: `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">

      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>A Simple Responsive HTML Email</title>
        <style type="text/css">
        body {margin: 0; padding: 0; min-width: 100%!important;}
        img {height: auto;}
        .content {width: 100%; max-width: 600px;}
        .header {padding: 40px 30px 20px 30px;}
        .innerpadding {padding: 30px 30px 30px 30px;}
        .borderbottom {border-bottom: 1px solid #f2eeed;}
        .subhead {font-size: 15px; color: #ffffff; font-family: sans-serif; letter-spacing: 10px;}
        .h1, .h2, .bodycopy {color: #153643; font-family: sans-serif;}
        .h1 {font-size: 33px; line-height: 38px; font-weight: bold;}
        .h2 {padding: 0 0 15px 0; font-size: 24px; line-height: 28px; font-weight: bold;}
        .bodycopy {font-size: 16px; line-height: 22px;}
        .button {text-align: center; font-size: 18px; font-family: sans-serif; font-weight: bold; padding: 0 30px 0 30px;}
        .button a {color: #ffffff; text-decoration: none;}
        .footer {padding: 20px 30px 15px 30px;}
        .footercopy {font-family: sans-serif; font-size: 14px; color: #ffffff;}
        .footercopy a {color: #ffffff; text-decoration: underline;}

        @media only screen and (max-width: 550px), screen and (max-device-width: 550px) {
        body[yahoo] .hide {display: none!important;}
        body[yahoo] .buttonwrapper {background-color: transparent!important;}
        body[yahoo] .button {padding: 0px!important;}
        body[yahoo] .button a {background-color: #e05443; padding: 15px 15px 13px!important;}
        body[yahoo] .unsubscribe {display: block; margin-top: 20px; padding: 10px 50px; background: #2f3942; border-radius: 5px; text-decoration: none!important; font-weight: bold;}
        }

        /*@media only screen and (min-device-width: 601px) {
          .content {width: 600px !important;}
          .col425 {width: 425px!important;}
          .col380 {width: 380px!important;}
          }*/

        </style>
      </head>

      <body yahoo bgcolor="#f6f8f1">
      <table width="100%" bgcolor="#f6f8f1" border="0" cellpadding="0" cellspacing="0">
      <tr>
        <td>
          <!--[if (gte mso 9)|(IE)]>
            <table width="600" align="center" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td>
          <![endif]-->
          <table bgcolor="#ffffff" class="content" align="center" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td class="innerpadding borderbottom">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                
                <tr>
                  <td class="bodycopy">
                  <img  src=https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${ticketId}
                  alt='qrCode'
                  className='order__img'/>                     
                  </td>
                </tr>
                  <tr>
                    <td class="bodycopy">
                      Event Name: ${order_name}
                    </td>
                  </tr>
                  <tr>
                    <td class="bodycopy">
                      Date Purchased: ${purchasedAt}
                    </td>
                  </tr>
                  <tr>
                    <td class="bodycopy">
                    ${order_general}
                   
                    </td>
                  <tr>
                    <td class="bodycopy">
                    ${order_vip}
                   
                    </td>
                  </tr>
                  <tr>
                    <td class="bodycopy">
                   ${order_total}
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
            </table>

      </body>
      </html>`,
    });

    res.status(200).json({ success: true, data: 'Email sent' });
  } catch (err) {
    console.log(err);
  }

  return next(new ErrorResponse('Email could not be sent', 500));
});
