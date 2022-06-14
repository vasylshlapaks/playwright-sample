const { auth } = require( "../selectors/authentication");
const {
  click,
  typeText,getAllEmails,getLinkToConfirmation,
  navigate
} = require("../helpers/helpers.js");

class Login {
  constructor(page) {
    this.page = page;
  }

  registration = async(email,password,options=true)=>{
    const numb = (Math.floor(Math.random() * (8888 - 1111 + 1) ) + 1111)
    await click(auth.button.SIGN_UP, this.page)
    await typeText(auth.field.EMAIL_ADDRESS, email, this.page);
    await typeText(auth.field.PASSWORD, password, this.page);
    await typeText(auth.field.FIRST_NAME, `Name${numb}`, this.page);
    await typeText(auth.field.LAST_NAME,`Last Name${numb}`, this.page);
    await typeText(auth.field.PHONE_NUMBER,`+163910${numb}72`, this.page);
    await click(auth.button.SIGN_IN, this.page);
    if (options===true){
      await typeText(auth.field.COMPANY_NAME,`Company Name${numb}`, this.page);
      await typeText(auth.field.ETH_ADDRESS,`0x0A66b3a2c7F63e574D82c7c6b8b135F${numb}C8a60`, this.page);
    }
  }

  login = async( email, password) =>{
    await typeText(auth.field.EMAIL_ADDRESS, email, this.page);
    await typeText(auth.field.PASSWORD, password, this.page);
    await click(auth.button.SIGN_IN, this.page);
  }
  confirmation = async(email,index)=>{
    const dataFromEmail = await getAllEmails(email,this.page)
    const confLink = await getLinkToConfirmation(dataFromEmail[0],dataFromEmail[1])
    await navigate(confLink[index],this.page)
  }

  restorePassword = async(email,password) =>{
    await click(auth.button.FORGOT_PASSWORD,this.page)
    await typeText(auth.field.EMAIL_ADDRESS,email,this.page)
    await click(auth.button.SIGN_IN,this.page)
    await this.confirmation(email,1)
    await typeText(auth.field.PASSWORD,password,this.page)
    await typeText(auth.field.PASSWORD_CONF,password,this.page)
    await click(auth.button.SIGN_IN,this.page)
    await this.page.waitForSelector(auth.field.PASSWORD, {state: 'detached'}
    )}
  }
module.exports = { Login };
