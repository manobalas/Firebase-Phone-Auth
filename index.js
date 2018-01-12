var recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha', {
  'size': 'invisible',
  'callback': function(response) {
    // reCAPTCHA solved, allow signInWithPhoneNumber.
    onSignInSubmit();
  }
});

function auth() {
    var number = '+91' + document.querySelector('input').value;
    firebase.auth().signInWithPhoneNumber(number, recaptcha).then(function (e) {
        console.log('Text transfer successful');
        var code = prompt('Enter Verification Code', '');
        if (code === null) return;
        e.confirm(code).then(function (result) {
            document.querySelector('p').textContent += 'Verified ' + result.user.phoneNumber;
        }).catch(function (error) {
            document.querySelector('p').textContent += 'Verification Failed ' + error;
        });
    })
    .catch(function (error) {
        document.querySelector('p').textContent += 'Text Transfer Failed ' + error;
    });
}