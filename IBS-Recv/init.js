let initUI = () => {
    let RecvByIBS = () => {
        let divBody = dom2.getElementById('viewmail-textHtml')
        let recvBody = divBody.children[0].children[0].children[0].children[0].children[0].children[0]
        let divHeader = dom2.getElementById('viewmail_header')
        let header = divHeader.children[0].children[0].children[1].children[0].children[0].children[0].innerText
        let srcID = header.match(/From:.+\<(.+@fun\.ac\.jp)\>/)[1]
        let myID = header.match(/To:.+\<+(\w+@fun.ac.jp)\>+/)
        if (myID == null) {
            myID = header.match(/To: (\w+@fun.ac.jp)/)
        }
        if (myID == null) { return }
        myID = myID[1]

        let divNormalHeader = dom2.getElementById('viewmail-normal-header')
        let time = divNormalHeader.children[0].children[0].children[2].children[1].children[0].children[0].innerText
        time = time.replaceAll('/', '-')
        verifyByIBS(recvBody, myID, srcID, time)
    }

    let div = dom2.getElementById('mbox-btn-list')
    let li = dom2.createElement('li')
    li.onclick = RecvByIBS
    let a = dom2.createElement('a')
    a.setAttribute('class', 'roundTypeBtn')
    let span = dom2.createElement('span')
    span.setAttribute('class', 'roundTypeBtnInner')
    span.innerText = "IDベース署名検証"
    a.appendChild(span)
    li.appendChild(a)
    div.prepend(li)

    /*
    if (firstInit) {
        let pane = dom.getElementById('contentsPane')
        let div = dom.createElement('div')
        div.setAttribute('id', 'SignInPage')
        pane.prepend(div)
        firstInit = false
    }
    */
    let pane = dom2.getElementById('mailbody')
    let divSign = dom2.createElement('div')
    divSign.setAttribute('id', 'SignInPage')
    divSign.setAttribute('style', 'width:100%')
    divSign.innerHTML = `
    <div style="margin-left: 2px; position: relative; z-index: 500; border-bottom: 1px solid blue; background-color: #FFFFFF;">
        <h2>Sign in</h2>
        <input id="emailIBS" type="text" placeholder="email">
        <input id="passwordIBS" type="password" placeholder="Password">
        <input id="SignIn" type="button" value="Signin">
        <a href="https://key.project15.tk/signup" target="_blank" rel="noopener norefferer">Sign Up</a>
        <p id="log"></p><br>
    </div>`
    pane.prepend(divSign)


    let signinBtn = dom2.getElementById('SignIn')
    signinBtn.onclick = () => {
        let email = dom2.getElementById('emailIBS').value
        let password = dom2.getElementById('passwordIBS').value
        firebase.auth().signInWithEmailAndPassword(email, password).then(res => {
            res.user.getIdToken().then(idToken => {
                localStorage.setItem('jwt', idToken.toString())
                dom2.getElementById('log').innerText = 'Successful get token'
            })
        }, err => {
            alert(err.message)
            dom2.getElementById('log').innerText = 'Failed sign in'
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


let setup = () => {
    iframe = dom.getElementById('viewmail-iframe')

    /*mo2 = new MutationObserver((record, observer) => {
        refresh()
    });
    let config = { childList: true }
    mo2.observe(dom2.getElementById('maillist'), config)
    */
    iframe.onload = refresh
    mo1.disconnect()
}

let refresh = () => {
    dom2 = iframe.contentWindow.document
    console.log("refresh")

    initUI()
}

let loadScript = (url, callback) => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = url
    if (script.readyState) {
        script.onreadystatechange = () => {
            if (script.readyState === 'loaded' || script.readyState === 'complete') {
                script.onreadystatechange = null
                callback()
            }
        }
    } else {
        script.onload = () => callback()
    }
    document.getElementsByTagName('head')[0].appendChild(script)
}