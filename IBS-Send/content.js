let text = null
let dom = null

window.onload = () => {
    dom = document.getElementsByTagName('html')[0].children[1].children[0].contentWindow.document
    text = dom.getElementById('textDoc')

    initUI()

    initFirebase()

    loadScript('https://key.project15.tk/mcl_c384_256.js', () => {
        mcl.init(0).then(() => {})
    })
}