// Function to handle the visibility of the Sign In and Sign Up page

export default function handleElem(showPage, hidePage) {
  document.querySelector(showPage).style.display = 'flex'
  document.querySelector(hidePage).style.display = 'none'
}