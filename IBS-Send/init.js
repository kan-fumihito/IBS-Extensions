let initUI = () => {
    let SendByIBS = async () => {
        let toList = dom.getElementById('tolist')
        if (toList.children.length == 1) {
            email = toList.children[0].getAttribute('email')
            if (isFun(email)) {
                let sigInfo = await signByIBS() //署名検証に必要な情報をMapで受け取る
                let sendBody = {}
                sendBody['msg'] = dom.getElementById('textDoc').value
                sendBody['sigInfo'] = sigInfo
                dom.getElementById('textDoc').value = await encBody(email, sigInfo['P1'], JSON.stringify(sendBody))
            }
        }
        dom.getElementById('sendBtn').children[0].click()
    }

    let menu = dom.getElementById('topMenu')

    let btns = menu.children[0]
    let span = document.createElement('span')
    span.setAttribute('class', 'roundTypeBtn')
    span.setAttribute('asvwidth', '1')
    let _span = document.createElement('span')
    _span.setAttribute('class', 'roundTypeBtnInner')
    _span.onclick = SendByIBS
    _span.innerText = 'ID署名付きで送信'
    span.append(_span)
    btns.prepend(span)

    let signdiv = dom.createElement('div')
    signdiv.innerHTML = `
    <h2>Sign in</h2>
        <input id="emailIBS" type="text" placeholder="email">
        <input id="passwordIBS" type="password" placeholder="Password">
        <button id="SignIn" type="button">Signin</button>
        <a href="https://key.project15.tk/signup">Sign Up</a>
        <p id="log">
        </p>`
    menu.before(signdiv)

    let signinBtn = dom.getElementById('SignIn')
    signinBtn.onclick = () => {
        let email = dom.getElementById('emailIBS').value
        let password = dom.getElementById('passwordIBS').value
        firebase.auth().signInWithEmailAndPassword(email, password).then(res => {
            res.user.getIdToken().then(idToken => {
                localStorage.setItem('jwt', idToken.toString())
                dom.getElementById('log').innerText = 'Successful get token'
            })
        }, err => {
            alert(err.message)
            dom.getElementById('log').innerText = 'Failed sign in'
        })
    }
}

let initFirebase = () => {
    const config = {
        apiKey: "AIzaSyCUrozEOMGg8d-ctz_xDnIWPIGNbZAuPTo",
        databaseURL: "https://ibs-auth-d749c.firebaseio.com",
        storageBucket: "ibs-auth-d749c.appspot.com",
    };
    firebase.initializeApp(config);
}

