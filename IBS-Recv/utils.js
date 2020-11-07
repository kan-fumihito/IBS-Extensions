let isFun = (email) => {
    let pattern = /\w@fun.ac.jp$/
    return pattern.test(email)
}

let parseParam = (decMsg) => {
    let msg = decMsg['msg']
    let sigInfo = decMsg['sigInfo']
    let rawP1 = sigInfo['P1']
    let rawP2 = sigInfo['P2']
    let rawS = sigInfo['S']
    let rawR = sigInfo['R']

    let P1 = new mcl.G1()
    let P2 = new mcl.G2()
    let S = new mcl.G1()
    let R = new mcl.G2()

    for (let i = 0; i < P1["a_"].length; i++) {
        P1["a_"][i] = rawP1["a_"][i]
    }
    for (let i = 0; i < P2["a_"].length; i++) {
        P2["a_"][i] = rawP2["a_"][i]
    }
    for (let i = 0; i < S["a_"].length; i++) {
        S["a_"][i] = rawS["a_"][i]
    }
    for (let i = 0; i < R["a_"].length; i++) {
        R["a_"][i] = rawR["a_"][i]
    }

    return [msg, P1, P2, S, R]
}

let getJWT = () => {
    return localStorage.getItem('jwt')
}