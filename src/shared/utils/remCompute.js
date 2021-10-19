const remCompute = (specifiedWidth = 750) => {
  if (typeof specifiedWidth !== 'number' || typeof window === 'undefined') {
    return;
  }
  const actualWidth = window.innerWidth;
  const ratio = actualWidth / specifiedWidth;
  document.querySelector('html').style.fontSize = 100 * ratio + 'px';
};

export default remCompute;
