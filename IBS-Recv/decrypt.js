let decBody = async(recvBody, myID, time) => {
    let rawMsg = JSON.parse(recvBody)
    let encKey = rawMsg['encKey']
    let encMsg = rawMsg['encMsg']

    let AESkey = await decKeyByIBE(encKey, myID, time)
    if (AESkey == null) {
        return null
    }

    try {
        let decMsg = CryptoJS.AES.decrypt(encMsg, AESkey).toString(CryptoJS.enc.Utf8)
        return JSON.parse(decMsg)
    } catch (e) {
        dom2.getElementById('log').innerText = "復号失敗"
    }
}

let decKeyByIBE = async(encKey, myID, time) => {
    let S_KEY = new mcl.G2()
    let data = await getSecretKey2(myID, time)
    if (data == null) {
        return null
    }
    for (let i = 0; i < S_KEY["a_"].length; i++) {
        S_KEY["a_"][i] = data["a_"][i]
    }

    return IDdec(encKey, S_KEY).getStr()
}

// Dec([U, v]) = v - h(e(U, sk))
let IDdec = (c, sk) => {
    const U = new mcl.G1()
    const v = new mcl.Fr()
    for (i = 0; i < U["a_"].length; i++) {
        U["a_"][i] = c[0]["a_"][i]
    }
    for (i = 0; i < U["a_"].length; i++) {
        v["a_"][i] = c[1]["a_"][i]
    }
    const e = mcl.pairing(U, sk)
    return mcl.sub(v, mcl.hashToFr(e.serialize()))
}