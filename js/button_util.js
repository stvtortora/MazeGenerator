const changeButtonStatus = (status, onlySolvers = false) => {
  const buttons = document.getElementsByTagName('button');

  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    
    if (!onlySolvers || button.getAttribute('class') === 'solver') {
      button.disabled = status;
    }
  }
}

export default changeButtonStatus;
