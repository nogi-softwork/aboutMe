
window.onload = () => {
    // navigator.language
    selectItem('home')
}

async function selectItem(item) {
    const nest = document.getElementById('theWholeHomeScreen')
    for (let i = 0; i < nest.childElementCount; i++) {
        nest.children[i].remove()
    }
    fetch(`/static/templates/${item}.html`)
    .then(res => res.text())
    .then(data => {
        // console.log(data)
        const parser = new DOMParser()
        const dom = parser.parseFromString(data, 'text/html').body
        // console.log(dom.innerHTML)
        nest.innerHTML = dom.innerHTML
        if (item == 'portfolio') {
            const root = document.getElementById('portfolio-holder-nest')
            fetch('/static/script/projects.json')
            .then(res => res.text())
            .then(d => {
                let item = JSON.parse(d)
                console.log(Object.keys(item).length)
                
                for (let i = 0; i < Object.keys(item).length; i++) {
                    fetch('/static/templates/portfolio-item.html')
                    .then(response0 => response0.text())
                    .then(data0 => {
                        const itemParser = new DOMParser()
                        let itemDom = itemParser.parseFromString(data0, 'text/html').body.firstElementChild
                        let currentItem = Object.entries(item)[i][1]
                        console.log(currentItem)
                        itemDom.querySelector('#portfolio-itemName').innerText = Object.keys(item)[i]
                        itemDom.querySelector('#portfolio-itemDisplay').src = currentItem[0]
                        itemDom.querySelector('#portfolio-detail').innerHTML = currentItem[1]
                        itemDom.querySelector('#portfolio-techStackDetail').innerText = currentItem[2]
                        if (currentItem[3]) {
                            itemDom.querySelector('#portfolio-item-sourceCode').addEventListener('click', () => {window.open(currentItem[3], 'blank')})
                        } else {
                            let modifyStateTarget = itemDom.querySelector('#portfolio-item-sourceCode')
                            modifyStateTarget.disabled = true
                            modifyStateTarget.innerText = ''
                            modifyStateTarget.innerHTML = '<strike>(not available)</strike>'
                            modifyStateTarget.style.background_color = '#d8bebe'
                        }
                        if (currentItem[4]) {
                            itemDom.querySelector('#portfolio-item-link').addEventListener('click', () => {window.open(currentItem[4], 'blank')})
                        } else {
                            let modifyStateTarget = itemDom.querySelector('#portfolio-item-link')
                            modifyStateTarget.disabled = true
                            modifyStateTarget.innerText = ''
                            modifyStateTarget.innerHTML = '<strike>(not available)</strike>'
                            modifyStateTarget.style.background_color = '#d8bebe'
                        }
                        root.appendChild(itemDom)
                    })
                }
            })
        }
        return true
    })    
}