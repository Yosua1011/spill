var nodemailer = require("nodemailer");

function sendMail() {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: "spillproject14@gmail.com",
          pass: "monitoraoc131final"
        }
        });
        
        var mailOptions = {
          from: `spillproject14@gmail.com`,
          to: `yosua1011@outlook.com`,
          subject: `Spill Reminder`,
          html: `
          <html>
          <!-- Section-9 -->
          <table class="table_full editable-bg-color bg_color_e6e6e6 editable-bg-image" bgcolor="#e6e6e6" width="100%" align="center"  mc:repeatable="castellab" mc:variant="Header" cellspacing="0" cellpadding="0" border="0">
              <!-- header -->
              <tr>
                  <td>
                      <!-- container -->
                      <table class="table1 editable-bg-color bg_color_303f9f" bgcolor="#303f9f" width="600" align="center" border="0" cellspacing="0" cellpadding="0" style="margin: 0 auto;">
                          <!-- padding-top -->
                          <tr><td height="25"></td></tr>
                          <tr>
                              <td>
                                  <!-- Inner container -->
                                  <table class="table1" width="520" align="center" border="0" cellspacing="0" cellpadding="0" style="margin: 0 auto;">
                                      <tr>
                                          <td>
                                              <!-- logo -->
                                              <table width="50%" align="left" border="0" cellspacing="0" cellpadding="0">
                                                  <tr>
                                                  </tr>
                                                  <tr><td height="22"></td></tr>
                                              </table><!-- END logo -->
          
                                              <!-- options -->
                                              <table width="50%" align="right" border="0" cellspacing="0" cellpadding="0">
                                                  <!-- margin-top -->
                                                  <tr><td height="3"></td></tr>
                                                  <tr>
                                                  </tr>
                                              </table><!-- END options -->
          
                                          </td>
                                      </tr>
          
                                      <!-- horizontal gap -->
                                      <tr><td height="60"></td></tr>
          
                                      <tr>
                                          <td align="center">
                                              <div class="editable-img">
                                                  <img editable="true" mc:edit="image003" src="https://i.imgur.com/99NqpPs.png"  style="display:block; line-height:0; font-size:0; border:0;" border="0" alt="" />
                                              </div>
                                          </td>
                                      </tr>
          
                                      <!-- horizontal gap -->
                                      <tr><td height="40"></td></tr>
          
                                      <tr>
                                          <td mc:edit="text001" align="center" class="text_color_ffffff" style="color: #ffffff; font-size: 30px; font-weight: 700; font-family: lato, Helvetica, sans-serif; mso-line-height-rule: exactly;">
                                              <div class="editable-text">
                                                  <span class="text_container">
                                                      <multiline>
                                                          Bill Details
                                                      </multiline>
                                                  </span>
                                              </div>
                                          </td>
                                      </tr>
          
                                      <!-- horizontal gap -->
                                      <tr><td height="30"></td></tr>
                                  </table><!-- END inner container -->
                              </td>
                          </tr>
                          <!-- padding-bottom -->
                          <tr><td height="60"></td></tr>
                      </table><!-- END container -->
                  </td>
              </tr>
          
              <!-- body -->
              <tr>
                  <td>
                      <!-- container -->
                      <table class="table1 editable-bg-color bg_color_ffffff" bgcolor="#ffffff" width="600" align="center" border="0" cellspacing="0" cellpadding="0" style="margin: 0 auto;">
                          <!-- padding-top -->
                          <tr><td height="60"></td></tr>
          
                          <tr>
                              <td>
                                  <!-- inner container -->
                                  <table class="table1" width="520" align="center" border="0" cellspacing="0" cellpadding="0" style="margin: 0 auto;">
          
                                      <tr>
                                          <td mc:edit="text003" align="left" class="center_content text_color_282828" style="color: #282828; font-size: 18px; font-weight: 700; font-family: lato, Helvetica, sans-serif; mso-line-height-rule: exactly;">
                                              <div class="editable-text">
                                                  <span class="text_container">
                                                      <multiline>Hello Payee here is Your Total Bill </multiline><br><br>
                                                      <multiline>Rp 10000 </multiline><br><br>
                                                      <multiline>Please sent the money to your friend's bank account</multiline><br><br>
                                                  </span>
                                              </div>
                                          </td>
                                      </tr>
          
                                      <!-- horizontal gap -->
                                      <tr><td height="50"></td></tr>
                                      <!-- product-1 -->
                                      <tr>
                                          <td>
                                                  <!-- margin-bottom -->
                                                  <tr><td height="5"></td></tr>
                                              </table><!-- END column-1 -->
          
                                              <!-- vertical gap -->
                                              <table class="tablet_hide" width="40" align="left" border="0" cellspacing="0" cellpadding="0">
                                                  <tr><td height="1"></td></tr>
                                              </table>
          
                                              <!-- column-2  -->
                                              <table class="table1-2" width="355" align="left" border="0" cellspacing="0" cellpadding="0">
                                                  <tr>
                                                      <td mc:edit="text005" align="left" class="center_content text_color_282828" style="color: #282828; font-size: 14px; font-weight: 600; font-family: lato, Helvetica, sans-serif; mso-line-height-rule: exactly;">
                                                          <!-- <div class="editable-text">
                                                              <span class="text_container">
                                                                  <multiline>
                                                                      Food 1
                                                                  </multiline>
                                                              </span>
                                                          </div> -->
                                                      </td>
                                                  </tr>
                                                  <!-- horizontal gap -->
                                                  <tr><td height="10"></td></tr>
                                                  <tr>
                                                      <td>
                                                          <!-- sub-column-1  -->
          
                                              </table><!-- END column-2 -->
                                          </td>
                                      </tr>
                                  </table><!-- END inner container -->
                              </td>
                          </tr>
                          <!-- padding-bottom -->
                          <tr><td height="30"></td></tr>
                      </table><!-- END container -->
                  </td>
              </tr>
          
              <!-- footer -->
              <tr>
                  <td>
                      <!-- container -->
                      <table class="table1" width="600" align="center" border="0" cellspacing="0" cellpadding="0" style="margin: 0 auto;">
                          <!-- padding-top -->
                          <tr><td height="40"></td></tr>
          
                          <tr>
                              <td>
                                  <!--  column-1 -->
                                  <table class="table1-2" width="350" align="left" border="0" cellspacing="0" cellpadding="0">
                                      <tr>
                                          <td mc:edit="text032" align="left" class="center_content text_color_929292" style="color: #929292; font-size: 14px; line-height: 2; font-weight: 400; font-family: lato, Helvetica, sans-serif; mso-line-height-rule: exactly;">
                                              <div class="editable-text" style="line-height: 2;">
                                                  <span class="text_container">
                                                      <multiline>
                                                          You are receving this newsletter because your friend subscribe to our service :<a href="#" style="color: #303f9f;text-decoration: none;"> yourwebsite.com</a>
                                                      </multiline>
                                                  </span>
                                              </div>
                                          </td>
                                      </tr>
          
          
                                      <!-- margin-bottom -->
                                      <tr><td height="30"></td></tr>
                                  </table><!-- END column-1 -->
          
                                  <!-- vertical gap -->
                                  <table class="tablet_hide" width="130" align="left" border="0" cellspacing="0" cellpadding="0">
                                      <tr><td height="1"></td></tr>
                                  </table>
                          </tr>
          
                          <!-- padding-bottom -->
                          <tr><td height="70"></td></tr>
                      </table><!-- END container -->
                  </td>
              </tr>
          </table><!-- END wrapper -->
          
          </html>`
        }
    
        transporter.sendMail(mailOptions, function(error) {
          if(error) {
            console.log(error)
          } else {
            console.log('Email Sent')
          }
        })
}

module.exports = sendMail