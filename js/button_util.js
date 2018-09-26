const changeButtonStatus = (status) => {
  const buttons = document.getElementsByTagName('button');

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = status;
  }
}

export default changeButtonStatus;
