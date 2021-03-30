// Function to highlight the navigation bar by scrolling the feed

const feedScroll = () => {
  var nav = document.querySelector('.navigation')
      
  if (window.scrollY > 2) {
    nav.style.borderBottom = '0.5px solid var(--tertiary-color)'
  } else {
    nav.style.borderBottom = 'none'
  }
}

export { feedScroll }