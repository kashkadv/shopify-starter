document.addEventListener("click", handleClick)

function handleClick(e) {
  target = e.target

  if (target.matches(".filter-value")) handleFilterChange(target)
  if (target.matches(".sort-value")) handleSortChange(target)
}

function handleFilterChange(target) {
  const url = target.dataset.action
  const sectionId = getSectionId(target)

  const params = url.split("?").at(1)

  fetch(`${url}`)
    .then((response) => response.text())
    .then((text) => updatePage(text, sectionId))
    .then(updateUrl(params))
}

function handleSortChange(target) {
  const queryString = window.location.search
  const params = new URLSearchParams(queryString)
  const sectionId = getSectionId(target)
  const value = target.dataset.value

  if (params.has("sort_by") && params.get("sort_by") == value) {
    params.delete("sort_by")
  } else {
    params.set("sort_by", value)
  }

  let url = window.location.pathname
  if (params.toString()) url = `${url}?${params.toString()}`

  fetch(`${url}`)
    .then((response) => response.text())
    .then((text) => updatePage(text, sectionId))
    .then(updateUrl(params.toString()))
}

function getSectionId(target) {
  const shopifySection = target.closest(".shopify-section")
  const sectionId = shopifySection.id

  return sectionId
}

function updatePage(text, sectionId) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(text, "text/html")

  const section = document.getElementById(sectionId)
  const updatedSection = doc.getElementById(sectionId)

  section.replaceWith(updatedSection)
}

function updateUrl(params) {
  const newurl = `${window.location.protocol}//${window.location.host}${
    window.location.pathname
  }${params ? `?${params}` : ""}`

  window.history.pushState({ path: newurl }, "", newurl)
}
