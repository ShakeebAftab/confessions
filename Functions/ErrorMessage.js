const ErrorMessage = (code) => {
    const msg = '';
    if (code == 'auth/email-already-exists') {
        return 'Hey! Supergirl/Superman You might wanna try signing in'
    } else if (code == 'auth/wrong-password') {
        return 'Hey! Supergirl/Superman You wrote the wrong password'
    } else if (code == 'auth/user-not-found') {
        return 'Hey! Supergirl/Superman You might wanna try signing up first'
    }
    return msg
}

export default ErrorMessage;