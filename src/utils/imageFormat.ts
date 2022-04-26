export const imageFormat = (e: HTMLImageElement, maxWidth: number = 500, maxHeight: number = 300) => {
  const parent = e.parentElement;

  const isFancy = e.hasAttribute('data-fancy');

  const width = e.width;
  const height = e.height;
  const aspectW = width / maxWidth;
  const aspectH = height / maxHeight;

  // if (aspectW > 1 || aspectH > 1) {
  if (aspectW > aspectH) {
    if (parent && !isFancy) {
      parent.style.maxWidth = maxWidth+'px';
      parent.style.maxHeight = height/aspectW+'px';
    }
    e.style.maxWidth = maxWidth+'px';
    e.style.maxHeight = height/aspectW+'px';
  } else {
    if (parent && !isFancy) {
      parent.style.maxWidth = width / aspectH+'px';
      parent.style.maxHeight = maxHeight+'px';
    }

    e.style.maxWidth = width / aspectH+'px';
    e.style.maxHeight = maxHeight+'px';
  }
  // }
};
