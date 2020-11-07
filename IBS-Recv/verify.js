/*
    検証用署名文生成
    S_KEY:ID公開鍵
    msg  :本文
    P1   :公開パラメータ1
    P2   :公開パラメータ2
    Ppub :PKG公開鍵
    k    :ランダム数字

    return:署名文
*/
let verifySign = async (decMsg, P_KEY) => {
    const [msg, P1, P2, S, R] = parseParam(decMsg)

    let Ppub = new mcl.G2()
    let data = await getPublicKey2(P2)
    for (let i = 0; i < Ppub["a_"].length; i++) {
        Ppub["a_"][i] = data["a_"][i]
    }

    const h2 = new mcl.Fr()
    const h3 = new mcl.Fr()
    h2.setHashOf(msg)
    let Q = mcl.hashAndMapToG1(P_KEY)
    h3.setHashOf(R.getStr(16))
    let eP = mcl.pairing(P1, P2)
    let eP1 = mcl.pow(eP, h2)
    let PQ = mcl.pairing(Q, Ppub)
    let PQ1 = mcl.pow(PQ, h3)
    let eP2 = mcl.mul(eP1, PQ1)

    let sig = mcl.pairing(S, R)
    return [msg, sig.getStr(16) == eP2.getStr(16)]
}

let verifyByIBS = async (recvBody, myID, srcID) => {
    let decMsg = await decBody(recvBody.innerText, myID)

    let [msg, validity] = await verifySign(decMsg, srcID)

    recvBody.innerText = msg
    window.alert(validity ? "〇有効〇" : "×無効×")
}
