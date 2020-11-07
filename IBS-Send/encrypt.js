let encBody = async (email, P1, msg) => {
    const key = genAESkey() //mcl::Fr
    const encKey = await encKeyByIBE(email, P1, key) //[IDdecに必要な情報, IDencされた鍵]
    const encMsg = CryptoJS.AES.encrypt(msg, key.getStr())
    console.log(key.getStr())

    let enc = {}
    enc['encKey'] = encKey
    enc['encMsg'] = encMsg.toString()

    return JSON.stringify(enc)
}

// AESパスワードをIDベース暗号で暗号化
let encKeyByIBE = async (email, P1, AESkey) => {
    let mpk = new mcl.G1()
    const data = await getPublicKey(P1)
    for (let i = 0; i < mpk["a_"].length; i++) {
        mpk["a_"][i] = data["a_"][i]
    }


    return IDenc(email, P1, mpk, AESkey)
}

// Enc(m) = [r P, m + h(e(r mpk, H(id)))]
let IDenc = (id, P, mpk, m) => {
    let a_ = new Uint32Array(mpk["a_"])
    console.log("mpk", a_)
    console.log(mpk)
    const r = new mcl.Fr()
    r.setByCSPRNG()
    const Q = mcl.hashAndMapToG2(id)
    const e = mcl.pairing(mcl.mul(mpk, r), Q)

    return [mcl.mul(P, r), mcl.add(m, mcl.hashToFr(e.serialize()))]
}

