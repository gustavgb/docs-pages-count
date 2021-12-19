function addPagesCount (mutationList) {
  mutationList.filter(m => m.type === 'childList').forEach(m => {
    m.addedNodes.forEach(node => {
      if (node.className === 'modal-dialog docs-dialog') {
        const table = node.querySelector('.modal-dialog-content > .kix-documentmetricsdialog-table > tbody')
        if (table) {
          const characterCount = table.querySelector('tr:nth-child(3) > .kix-documentmetricsdialog-values')

          if (characterCount) {
            const pages = (parseInt(characterCount.innerText) / 2400).toFixed(1)

            const newRow = document.createElement('tr')
            newRow.innerHTML = `<td class="kix-documentmetricsdialog-row kix-documentmetricsdialog-counts">Academic pages</td><td class="kix-documentmetricsdialog-row kix-documentmetricsdialog-values">${pages}</td>`

            table.appendChild(newRow)
          }
        }
      }
    })
  })
}

window.addEventListener('load', function () {
  if (document.body) {
    const observer = new window.MutationObserver(addPagesCount)
    observer.observe(document.body, {
      childList: true
    })
  }
})
