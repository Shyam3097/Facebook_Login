const isPresent = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}
const isValidName = function (name) {
    return (/^[a-zA-Z ]{2,30}$/).test(name)
}

const isValidEmail = function (email) {
    return (/^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/).test(email)
}

const isValidPassword = function (password) {
    return (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/).test(password)
}

module.exports = { isPresent, isValidName, isValidEmail, isValidPassword }