if (process.env.NODE_ENV !== 'production') {
  console.log('Development mode!');
}

function component() {
  const element = document.createElement('pre');
  element.innerHTML = ['Hello webpack!'];
  return element;
}

document.body.appendChild(component());