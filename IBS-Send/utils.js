let loadScript = (url, callback) => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = url
    if (script.readyState) {
        script.onreadystatechange = () => {
            if (script.readyState === 'loaded' || script.readyState === 'complete') {
                script.onreadystatechange = null
                callback()
            }
        }
    } else {
        script.onload = () => callback()
    }
    document.getElementsByTagName('head')[0].appendChild(script)
}

let isFun = (email) => {
    let pattern = /\w@fun.ac.jp$/
    return pattern.test(email)
}

String.prototype.before = function(word, include) {
    var idx = this.indexOf(word)
    var l = include ? word.length : 0
    return idx >= 0 ?
        this.substr(0, idx + l) :
        ""
}

let getJWT = () => {
    return localStorage.getItem('jwt')
}