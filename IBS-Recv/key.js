//秘密鍵生成
let getSecretKey2 = async (ID) => {
    let token = getJWT()
    if (token === null || typeof token === 'undefined') {
        console.log('token is none')
        return null
    }

    let res = await axios.get('https://key.project15.tk:8443/secretkey2', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return res.data //可能な形にして
}

let getPublicKey2 = async (P2) => {
    let token = getJWT()
    if (token === null || typeof token === 'undefined') {
        console.log('token is none')
        return null
    }
    let res = await axios.get('https://key.project15.tk:8443/publickey2', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'P2': JSON.stringify(P2["a_"])
        }
    })
    return res.data //可能な形にして
}