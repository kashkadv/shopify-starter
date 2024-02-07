const addToCartButtons = document.querySelectorAll(
  '[data-action="add-to-cart"]'
)

const cart = document.getElementById("cart")
const cartLabel = document.getElementById("cart-label")

document.addEventListener("click", handleDocumentClick)

function handleDocumentClick(e) {
  if (
    e.target.getAttribute("data-action") &&
    e.target.getAttribute("data-action") == "add-to-cart"
  )
    handleAddToCart(e.target)

  if (
    e.target.getAttribute("data-action") &&
    e.target.getAttribute("data-action") == "toggle-cart"
  )
    handleToggleCart(e.target)

  if (
    e.target.getAttribute("data-action") &&
    e.target.getAttribute("data-action") == "close-cart"
  )
    closeCart()
}

async function handleAddToCart(button) {
  const form = button.closest("form")
  if (!form) return

  const data = new FormData(form)

  const req = await fetch("/cart/add.js", {
    method: "POST",
    body: data,
  })
  const res = await req.json()

  console.log(res)

  cartLabel.innerText = Number(cartLabel.innerText) + 1

  setTimeout(() => updateCart(), 0)
}

async function updateCart() {
  const cartDrawer = document.querySelector("cart-drawer")
  await fetch("/?section_id=cart-drawer")
    .then((response) => response.text())
    .then((cart) => {
      const dom = document.createElement("html")
      dom.innerHTML = cart
      const updatedCartDrawer = dom.querySelector("cart-drawer")
      cartDrawer.replaceWith(updatedCartDrawer)

      setTimeout(() => openCart(), 0)
    })
}

function handleToggleCart() {
  cart?.showModal()
}

function openCart() {
  cart?.showModal()
}

function closeCart() {
  cart?.close()
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
