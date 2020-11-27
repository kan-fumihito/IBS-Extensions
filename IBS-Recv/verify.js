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

String.prototype.before = function(word, include) {
    var idx = this.indexOf(word)
    var l = include ? word.length : 0
    return idx >= 0 ?
        this.substr(0, idx + l) :
        ""
}

let verifySign = async(msg, sign, P_KEY, time) => {
    try {
        const [P1, P2, S, R] = parseParam(sign)

        let Ppub = new mcl.G2()
        let data = await getPublicKey2(P2, time)
        if (data == null) {
            return "公開鍵を得られませんでした", false
        }
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
        console.log(msg)
        return [msg, sig.isEqual(eP2)]
    } catch (e) {
        console.log(e)
        return [msg, false]
    }
}

let verifyByIBS = async(recvBody, myID, srcID, time) => {
    //  let decMsg = await decBody(recvBody.innerText, myID, time)
    //  if (decMsg == null) {
    //      window.alert("復号に失敗しました")
    //      return
    //  }
    //let decMsg = await decBody(recvBody.innerText, myID, time)

    let plaMsg = recvBody.innerText.split("\n-----BEGIN SIGNATURE-----\n") //上下分割
    let payMsg = plaMsg[0]
    let signat = plaMsg[1].before("\n-----END SIGNATURE-----") //下部削除


    //let finMsg = msg.before( "\n-----BEGIN SIGNATURE-----\n" );

    let [msg, validity] = await verifySign(payMsg, signat, srcID, time)

    recvBody.innerText = msg
    window.alert(validity ? "〇有効〇" : "×無効×")
}