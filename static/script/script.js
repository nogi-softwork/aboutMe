
window.onload = () => {
    // navigator.language
    selectItem('home')
}

function selectItem(item) {
    const nest = document.getElementById('theWholeHomeScreen')
    for (let i = 0; i < nest.childElementCount; i++) {
        nest.children[i].remove()
    }
    const fetched = fetch(`/static/templates/${item}.html`)
    .then(res => res.text())
    .then(data => {
        console.log(data)
        const parser = new DOMParser()
        const dom = parser.parseFromString(data, 'text/html').body
        console.log(dom.innerHTML)
        nest.innerHTML = dom.innerHTML
    })    
}