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

      html: `
      <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">



		<tbody><tr>
			<td align="center">
				<table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0">
					<tbody><tr>
						<td align="center" valign="top" background=${urlPic} bgcolor="#66809b" style="background-size:cover; background-position:center;height=" 400""="">
							<table class="col-600" width="600" height="400" border="0" align="center" cellpadding="0" cellspacing="0">

								<tbody><tr>
									<td height="40"></td>
								</tr>

								<tr>
									<td align="center" style="font-family: 'Raleway', sans-serif; font-size:37px; color:#ffffff; line-height:24px; font-weight: bold; letter-spacing: 7px;">
										 <span style="font-family: 'Raleway', sans-serif; font-size:37px; color:#ffffff; line-height:39px; font-weight: 300; letter-spacing: 7px;"></span>
									</td>
								</tr>





								<tr>
									<td align="center" style="font-family: 'Lato', sans-serif; font-size:15px; color:#ffffff; line-height:24px; font-weight: 300;">
									
									</td>
								</tr>


								<tr>
									<td height="50"></td>
								</tr>
							</tbody></table>
						</td>
					</tr>
				</tbody></table>
			</td>
		</tr>


<!-- END HEADER/BANNER -->


<!-- START 3 BOX SHOWCASE -->

		<tr>
			<td align="center">
				<table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0" style="margin-left:20px; margin-right:20px; border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9;">
					<tbody><tr>
						<td height="35"></td>
					</tr>

					<tr>
						<td align="center" style="font-family: 'Raleway', sans-serif; font-size:22px; font-weight: bold; color:#2a3a4b;">${order_name}</td>
					</tr>

					<tr>
						<td height="10"></td>
					</tr>


					<tr>
						<td align="center" style="font-family: 'Lato', sans-serif; font-size:14px; color:#757575; line-height:24px; font-weight: 300;">
            ${description}
						</td>
					</tr>

				</tbody></table>
			</td>
		</tr>

		<tr>
			<td align="center">
				<table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0" style="border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9; ">
					<tbody><tr>
						<td height="10"></td>
					</tr>
					<tr>
						<td>


							<table class="col3" width="183" border="0" align="left" cellpadding="0" cellspacing="0">
								<tbody><tr>
									<td height="30"></td>
								</tr>
								<tr>
									<td align="center">
										<table class="insider" width="133" border="0" align="center" cellpadding="0" cellspacing="0">

											<tbody><tr align="center" style="line-height:0px;">
												<td>
													<img style="display:block; line-height:0px; font-size:0px; border:0px;" src='https://image.flaticon.com/icons/svg/2983/2983490.svg' width="69" height="78" alt="icon">
												</td>
											</tr>


											<tr>
												<td height="15"></td>
											</tr>


											<tr align="center">
												<td style="font-family: 'Raleway', Arial, sans-serif; font-size:20px; color:#2b3c4d; line-height:24px; font-weight: bold;">${area}</td>
											</tr>


											<tr>
												<td height="10"></td>
											</tr>


											<tr align="center">
												<td style="font-family: 'Lato', sans-serif; font-size:14px; color:#757575; line-height:24px; font-weight: 300;"></td>
											</tr>

										</tbody></table>
									</td>
								</tr>
								<tr>
									<td height="30"></td>
								</tr>
							</tbody></table>





							<table width="1" height="20" border="0" cellpadding="0" cellspacing="0" align="left">
								<tbody><tr>
									<td height="20" style="font-size: 0;line-height: 0;border-collapse: collapse;">
										<p style="padding-left: 24px;">&nbsp;</p>
									</td>
								</tr>
							</tbody></table>



							<table class="col3" width="183" border="0" align="left" cellpadding="0" cellspacing="0">
								<tbody><tr>
									<td height="30"></td>
								</tr>
								<tr>
									<td align="center">
										<table class="insider" width="133" border="0" align="center" cellpadding="0" cellspacing="0">

											<tbody><tr align="center" style="line-height:0px;">
												<td>
													<img style="display:block; line-height:0px; font-size:0px; border:0px;" src='https://image.flaticon.com/icons/svg/747/747310.svg' width="69" height="78" alt="icon">
												</td>
											</tr>


											<tr>
												<td height="15"></td>
											</tr>


											<tr align="center">
												<td style="font-family: 'Raleway', sans-serif; font-size:20px; color:#2b3c4d; line-height:24px; font-weight: bold;">${eventDate}</td>
											</tr>


											<tr>
												<td height="10"></td>
											</tr>


											<tr align="center">
													<td style="font-family: 'Lato', sans-serif; font-size:14px; color:#757575; line-height:24px; font-weight: 300;"></td>
											</tr>



										</tbody></table>
									</td>
								</tr>
								<tr>
									<td height="30"></td>
								</tr>
							</tbody></table>



							<table width="1" height="20" border="0" cellpadding="0" cellspacing="0" align="left">
								<tbody><tr>
									<td height="20" style="font-size: 0;line-height: 0;border-collapse: collapse;">
										<p style="padding-left: 24px;">&nbsp;</p>
									</td>
								</tr>
							</tbody></table>



							<table class="col3" width="183" border="0" align="right" cellpadding="0" cellspacing="0">
								<tbody><tr>
									<td height="30"></td>
								</tr>
								<tr>
									<td align="center">
										<table class="insider" width="133" border="0" align="center" cellpadding="0" cellspacing="0">

											<tbody><tr align="center" style="line-height:0px;">
												<td>
													<img style="display:block; line-height:0px; font-size:0px; border:0px;" src='https://image.flaticon.com/icons/svg/594/594354.svg' width="69" height="78" alt="icon">
												</td>
											</tr>


											<tr>
												<td height="15"></td>
											</tr>


											<tr align="center">
												<td style="font-family: 'Raleway',  sans-serif; font-size:20px; color:#2b3c4d; line-height:24px; font-weight: bold;">${eventTime}</td>
											</tr>


											<tr>
												<td height="10"></td>
											</tr>


											<tr align="center">
												<td style="font-family: 'Lato', sans-serif; font-size:14px; color:#757575; line-height:24px; font-weight: 300;"></td>
											</tr>

										</tbody></table>
									</td>
								</tr>
								<tr>
									<td height="30"></td>
								</tr>
							</tbody></table>


						</td>
					</tr>
				</tbody></table>
			</td>
		</tr>

			<tr>
					<td height="5"></td>
		</tr>


<!-- END 3 BOX SHOWCASE -->


<!-- Ticket App -->

		<tr>
			<td align="center">
				<table align="center" class="col-600" width="600" border="0" cellspacing="0" cellpadding="0">
					<tbody><tr>
						<td align="center" bgcolor="#2a3b4c">
							<table class="col-600" width="600" align="center" border="0" cellspacing="0" cellpadding="0">
								<tbody><tr>
									<td height="33"></td>
								</tr>
								<tr>
									<td>


										<table class="col1" width="183" border="0" align="left" cellpadding="0" cellspacing="0">

											<tbody><tr>
											<td height="18"></td>
											</tr>

											<tr>
												<td align="center">
													<img style="display:block; line-height:0px; font-size:0px; border:0px;" class="images_style" src="https://image.flaticon.com/icons/png/512/2942/2942962.png" alt="img" width="156" height="136">
												</td>



											</tr>
										</tbody></table>



										<table class="col3_one" width="380" border="0" align="right" cellpadding="0" cellspacing="0">

											<tbody><tr align="left" valign="top">
												<td style="font-family: 'Raleway', sans-serif; font-size:20px; color:#f1c40f; line-height:30px; font-weight: bold;">Ticket-App </td>
											</tr>


											<tr>
												<td height="5"></td>
											</tr>


											<tr align="left" valign="top">
												<td style="font-family: 'Lato', sans-serif; font-size:14px; color:#fff; line-height:24px; font-weight: 300;">
												Thank you for purchasing the ticket on ticket-app check out other event and concert click the button below to go to the site.
												</td>
											</tr>

											<tr>
												<td height="10"></td>
											</tr>

											<tr align="left" valign="top">
												<td>
													<table class="button" style="border: 2px solid #fff;" bgcolor="#2b3c4d" width="30%" border="0" cellpadding="0" cellspacing="0">
														<tbody><tr>
															<td width="10"></td>
															<td height="30" align="center" style="font-family: 'Open Sans', Arial, sans-serif; font-size:13px; color:#ffffff;">
																<a href="https://google.com" style="color:#ffffff;">Ticket-App</a>
															</td>
															<td width="10"></td>
														</tr>
													</tbody></table>
												</td>
											</tr>

										</tbody></table>
									</td>
								</tr>
								<tr>
									<td height="33"></td>
								</tr>
							</tbody></table>
						</td>
					</tr>
				</tbody></table>
			</td>
		</tr>


<!-- END AWESOME TITLE -->


<!-- QR Code -->

		<tr>
			<td align="center">
				<table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0" style="margin-left:20px; margin-right:20px;">



		<tbody><tr>
			<td align="center">
				<table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0" style=" border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9;">
					<tbody><tr>
						<td height="50"></td>
					</tr>
					<tr>
						<td align="right">


							<table class="col2" width="287" border="0" align="right" cellpadding="0" cellspacing="0">
								<tbody><tr>
									<td align="center" style="line-height:0px;">
										<img style="display:block; line-height:0px; font-size:0px; border:0px;" class="images_style" src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://google.com/${ticketId}" width="169" height="138">
									</td>
								</tr>
							</tbody></table>






							<table width="287" border="0" align="left" cellpadding="0" cellspacing="0" class="col2" style="">
								<tbody><tr>
									<td align="center">
										<table class="insider" width="237" border="0" align="center" cellpadding="0" cellspacing="0">



											<tbody><tr align="left">
												<td style="font-family: 'Raleway', sans-serif; font-size:23px; color:#2a3b4c; line-height:30px; font-weight: bold;">Your QR Code</td>
											</tr>

											<tr>
												<td height="5"></td>
											</tr>


											<tr>
                        <td style="font-family: 'Lato', sans-serif; font-size:14px; color:#7f8c8d; line-height:24px; font-weight: 300;"> 
                          Don't share your qr code to anybody because it will be used only once and it will be scanned and verified when you enter the venue.
												</td>
											</tr>


										</tbody></table>
									</td>
								</tr>
							</tbody></table>
						</td>
					</tr>
				</tbody></table>
			</td>
		</tr>


<!-- END WHAT WE DO -->



<!-- Ticket Details -->

		<tr>
			<td align="center">
				<table align="center" width="100%" border="0" cellspacing="0" cellpadding="0" style=" border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9;">
					<tbody><tr>
						<td height="50"></td>
					</tr>
					<tr>


						<td align="center" bgcolor="#34495e">
							<table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0">
								<tbody><tr>
									<td height="35"></td>
								</tr>


								<tr>
									<td align="center" style="font-family: 'Raleway', sans-serif; font-size:20px; color:#f1c40f; line-height:24px; font-weight: bold;">Ticket Details</td>
								</tr>


								<tr>
									<td height="20"></td>
								</tr>


								<tr>
									<td align="center" style="font-family: 'Lato', sans-serif; font-size:14px; color:#fff; line-height: 1px; font-weight: 300;">
										Check out your purchase ticket below.
									</td>
								</tr>


								<tr>
									<td height="40"></td>
								</tr>

							</tbody></table>
						</td>
					</tr>
				</tbody></table>
			</td>
		</tr>


<!-- END  -->


<!-- Ticket Details -->

		<tr>
			<td align="center">
				<table width="600" class="col-600" align="center" border="0" cellspacing="0" cellpadding="0" style=" border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9; bgcolor="#34495e">
					<tbody><tr>
						<td height="50"></td>
					</tr>
					<tr>
						<td>


							<table style="border:1px solid #e2e2e2;" class="col2" width="287" border="0" align="left" cellpadding="0" cellspacing="0">


								<tbody><tr>
									<td height="40" align="center" bgcolor="#2b3c4d" style="font-family: 'Raleway', sans-serif; font-size:18px; color:#f1c40f; line-height:30px; font-weight: bold;">V.I.P.</td>
								</tr>


								<tr>
									<td align="center">
										<table class="insider" width="237" border="0" align="center" cellpadding="0" cellspacing="0">
											<tbody><tr>
												<td height="20"></td>
											</tr>

											<tr align="center" style="line-height:0px;">
												<td style="font-family: 'Lato', sans-serif; font-size:20px; color:#2b3c4d; font-weight: bold; line-height: 44px;">${order_vip.replace(
                          'VIP:',
                          ''
                        )}</td>
											</tr>

                      <tr>
                      <td height="30"></td>
                    </tr>




										</tbody></table>
									</td>
								</tr>
								<tr>
									<td height="30"></td>
								</tr>
							</tbody></table>





							<table width="1" height="20" border="0" cellpadding="0" cellspacing="0" align="left">
								<tbody><tr>
									<td height="20" style="font-size: 0;line-height: 0;border-collapse: collapse;">
										<p style="padding-left: 24px;">&nbsp;</p>
									</td>
								</tr>
							</tbody></table>


							<table style="border:1px solid #e2e2e2;" class="col2" width="287" border="0" align="right" cellpadding="0" cellspacing="0">


								<tbody><tr>
									<td height="40" align="center" bgcolor="#2b3c4d" style="font-family: 'Raleway', sans-serif; font-size:18px; color:#f1c40f; line-height:30px; font-weight: bold;">General Admission</td>
								</tr>


								<tr>
									<td align="center">
										<table class="insider" width="237" border="0" align="center" cellpadding="0" cellspacing="0">
											<tbody><tr>
												<td height="20"></td>
											</tr>

											<tr align="center" style="line-height:0px;">
												<td style="font-family: 'Lato', sans-serif; font-size:20px; color:#2b3c4d; font-weight: bold; line-height: 44px;">${order_general.replace(
                          'General Admission:',
                          ''
                        )}</td>
											</tr>


											<tr>
												<td height="30"></td>
											</tr>



									


										</tbody></table>
									</td>
								</tr>
								<tr>
									<td height="20"></td>
								</tr>
							</tbody></table>

						</td>
					</tr>
				</tbody></table>
			</td>
		</tr>


<!-- Ticket Details -->


<!-- START FOOTER -->

<tr>
<td align="center">
  <table align="center" width="100%" border="0" cellspacing="0" cellpadding="0" style=" border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9;">
    <tbody><tr>
      <td height="50"></td>
    </tr>
    <tr>


      <td align="center" bgcolor="#34495e">
        <table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0">
          <tbody><tr>
            <td height="35"></td>
          </tr>


          <tr>
            <td align="center" style="font-family: 'Raleway', sans-serif; font-size:20px; color:#f1c40f; line-height:24px; font-weight: bold;">${order_total}</td>
          </tr>


          <tr>
            <td height="20"></td>
          </tr>



          <tr>
            <td height="40"></td>
          </tr>

        </tbody></table>
      </td>
    </tr>
  </tbody></table>
</td>
</tr>




						
					
				</tbody></table>
    `,
    });

    res.status(200).json({ success: true, data: 'Email sent' });
  } catch (err) {
    console.log(err);
  }

  return next(new ErrorResponse('Email could not be sent', 500));
});
