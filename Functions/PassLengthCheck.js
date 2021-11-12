const PassLengthCheck = (pass) => {
    if (pass.length < 6) {
        return true
    } else return false
}

export default PassLengthCheck