let getParam1 = () => {
    let P1 = new mcl.Fr()
    P1.setByCSPRNG()
    return mcl.hashAndMapToG1(P1.getStr())
}

let getParam2 = () => {
    let P2 = new mcl.Fr()
    P2.setByCSPRNG()
    return mcl.hashAndMapToG2(P2.getStr())
}

// AESの鍵を発生させる(試用)
let genAESkey = () => {
    const key = new mcl.Fr()
    key.setByCSPRNG()
    return key
}

//秘密鍵生成
let getSecretKey = async (ID) => {
    let token = getJWT()

    if (token === null || typeof token === 'undefined') {
        console.log('token is none')
        return null
    }
    let res = await axios.get('https://key.project15.tk:8443/secretkey', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return res.data //可能な形にして
}

let getPublicKey = async (P1) => {
    let token = getJWT()
    if (token === null || typeof token === 'undefined') {
        console.log('token is none')
        return null
    }
    let res = await axios.get('https://key.project15.tk:8443/publickey', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'P1': JSON.stringify(P1["a_"])
        }
    })
    return res.data //可能な形にして
}