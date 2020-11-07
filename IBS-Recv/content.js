let htm = null
let text = null
let dom = null
let dom2 = null
let iframe = null
let mo1 = null
let mo2 = null
let firstInit = true

window.onload = () => {
    let _htm = document.getElementsByTagName('html')
    dom = _htm[0].children[1].children[0].contentWindow.document

    initFirebase()

    mo1 = new MutationObserver((record, observer) => {
        setup()
    });
    let config = { childList: true }
    mo1.observe(dom.getElementById('contents'), config)

    loadScript('https://key.project15.tk/mcl_c384_256.js', () => {
        mcl.init(0).then(() => {
        })
    })
}
