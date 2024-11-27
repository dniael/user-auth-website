import PasswordValidator from 'password-validator'
const validator = new PasswordValidator()
validator
    .is().min(8)
    .is().max(100)
    .has().uppercase()
    .has().lowercase()
    .has().digits(3)
    .has().not().spaces()

export default validator