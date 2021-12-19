function addPagesCount (mutationList) {
  mutationList.filter(m => m.type === 'childList').forEach(m => {
    m.addedNodes.forEach(node => {
      if (node.className === 'modal-dialog docs-dialog') {
        const table = node.querySelector('.modal-dialog-content > .kix-documentmetricsdialog-table > tbody')
        if (table) {
          const characterCount = table.querySelector('tr:nth-child(3) > .kix-documentmetricsdialog-values')

          if (characterCount) {
            const newRow = document.createElement('tr')
            if (characterCount.innerText.includes(' of ')) {
              const pages = (parseInt(characterCount.innerText.split(' of ')[1]) / 2400).toFixed(1)
              const selected = (parseInt(characterCount.innerText.split(' of ')[0]) / 2400).toFixed(1)

              newRow.innerHTML = `<td class="kix-documentmetricsdialog-row kix-documentmetricsdialog-counts">Academic pages</td><td class="kix-documentmetricsdialog-row kix-documentmetricsdialog-values">${selected} of ${pages}</td>`

              table.appendChild(newRow)
            } else {
              const pages = (parseInt(characterCount.innerText) / 2400).toFixed(1)
              newRow.innerHTML = `<td class="kix-documentmetricsdialog-row kix-documentmetricsdialog-counts">Academic pages</td><td class="kix-documentmetricsdialog-row kix-documentmetricsdialog-values">${pages}</td>`
            }

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
