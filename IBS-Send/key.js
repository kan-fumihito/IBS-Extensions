let getParam1 = () => {
    let P1 = new mcl.Fr()
    P1.setByCSPRNG()

    let g = new mcl.G1()
    g.deserialize(mcl.hashAndMapToG1(P1.getStr()).serialize())
    return g
}

let getParam2 = () => {
    let P2 = new mcl.Fr()
    P2.setByCSPRNG()

    let g = new mcl.G2()
    g.deserialize(mcl.hashAndMapToG2(P2.getStr()).serialize())
    return g
}

// AESの鍵を発生させる(試用)
let genAESkey = () => {
    const key = new mcl.Fr()
    key.setByCSPRNG()

    key.deserialize(key.serialize())
    return key
}

//秘密鍵生成
let getSecretKey = async(ID) => {
    let token = getJWT()

    if (token === null || typeof token === 'undefined') {
        console.log('token is none')
        return null
    }
    try {
        let res = await axios.get('https://key.project15.tk/api/secretkey', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        let len = Object.keys(res.data).length
        let data = new Uint8Array(len)
        for (i = 0; i < len; i++) {
            data[i] = res.data[i]
        }
        let key = new mcl.G1()
        key.deserialize(data)
        return key
    } catch (e) {
        dom.getElementById('log').innerText = e
        return null
    }

}

let getPublicKey = async(P1) => {
    let token = getJWT()
    if (token === null || typeof token === 'undefined') {
        console.log('token is none')
        return null
    }
    try {
        let res = await axios.get('https://key.project15.tk/api/publickey', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'P1': JSON.stringify(P1.serialize())
            }
        })
        let len = Object.keys(res.data).length
        let data = new Uint8Array(len)
        for (i = 0; i < len; i++) {
            data[i] = res.data[i]
        }
        let key = new mcl.G1()
        key.deserialize(data)
        return key
    } catch (e) {
        dom.getElementById('log').innerText = e
        return null
    }


}