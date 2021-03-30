// Function to handle the dropdown

const handleDropdown = (dropdownContent) => {
  document.querySelector(dropdownContent).classList.toggle('show')
}

const keyExit = (e, dropdownContent) => {
  const content = document.querySelector(dropdownContent)

  if (e.keyCode === 27 && content.classList.contains('show')) {
    content.classList.toggle('show')
  }
}

const outsideClick = (e, dropdownBtn, dropdownContent) => {
  if (!dropdownBtn.current.contains(e.target)) {
    let x = document.getElementsByClassName(dropdownContent);

    for (let i = 0; i < x.length; i++) {
      if (x[i].classList.contains('show')) x[i].classList.toggle('show');
    }
  }
}

export { handleDropdown, keyExit, outsideClick }