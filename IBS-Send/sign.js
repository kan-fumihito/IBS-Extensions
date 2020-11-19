/*  
    署名文生成
    S_KEY:秘密鍵
    msg  :本文
    P1   :公開パラメータ1
    P2   :公開パラメータ2
    k    :ランダム数字

    return:署名文
*/
let generateSign = (S_KEY, msg, P1, P2, k) => {
    const h2 = new mcl.Fr();
    const h3 = new mcl.Fr();

    h2.setHashOf(msg);
    let R_G2 = mcl.mul(P2, k);

    h3.setHashOf(R_G2.getStr(16));
    let h2_P1 = mcl.mul(P1, h2);
    let h3_S = mcl.mul(S_KEY, h3);
    let h2_h3 = mcl.add(h2_P1, h3_S);
    let k_inv = mcl.inv(k);
    let S_G1 = mcl.mul(h2_h3, k_inv);

    return [S_G1, R_G2]
}

let signByIBS = async() => {
    //本文取得
    let text = dom.getElementById('textDoc')
    let msg = text.value

    // 公開パラメータ,乱数取得
    let P1 = getParam1()
    let P2 = getParam2()
    let k = new mcl.Fr()
    k.setByCSPRNG()
    k.deserialize(k.serialize())

    //ID公開鍵,秘密鍵,PKG公開鍵取得
    let P_KEY = dom.getElementById('fromWrap').innerText
    let S_KEY = new mcl.G1()
    let data = await getSecretKey(P_KEY)
    for (let i = 0; i < S_KEY["a_"].length; i++) {
        S_KEY["a_"][i] = data["a_"][i]
    }

    //署名生成
    let [S, R] = generateSign(S_KEY, msg, P1, P2, k)
    let sigInfo = {}
    sigInfo['P1'] = P1 //.getStr(16)
    sigInfo['P2'] = P2 //.getStr(16)
    sigInfo['S'] = S
    sigInfo['R'] = R

    return sigInfo
}