//秘密鍵生成
let getSecretKey2 = async(ID, time) => {
    let token = getJWT()
    if (token === null || typeof token === 'undefined') {
        console.log('token is none')
        return null
    }

    try {
        let res = await axios.get('https://key.project15.tk/api/secretkey2', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'time': time
            }
        })
        let len = Object.keys(res.data).length
        let data = new Uint8Array(len)
        for (i = 0; i < len; i++) {
            data[i] = res.data[i]
        }
        let key = new mcl.G2()
        key.deserialize(data)
        return key
    } catch (e) {
        dom2.getElementById('log').innerText = e
        return null
    }

}

let getPublicKey2 = async(P2, time) => {
    let token = getJWT()
    if (token === null || typeof token === 'undefined') {
        console.log('token is none')
        return null
    }
    try {
        let res = await axios.get('https://key.project15.tk/api/publickey2', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'P2': JSON.stringify(P2.serialize()),
                'time': time
            }
        })
        let len = Object.keys(res.data).length
        let data = new Uint8Array(len)
        for (i = 0; i < len; i++) {
            data[i] = res.data[i]
        }
        let key = new mcl.G2()
        key.deserialize(data)
        return key
    } catch (e) {
        dom2.getElementById('log').innerText = e
        return null
    }

}