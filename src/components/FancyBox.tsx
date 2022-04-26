import {imageFormat} from '@app/utils/imageFormat';

export const FancyBox: React.MouseEventHandler = (e) => {
  const path = e.currentTarget.getAttribute('data-path');
  // const name = e.currentTarget.getAttribute('data-name');
  const fancyBoxContainer = document.querySelector('.app-fancybox');

  if (fancyBoxContainer && !fancyBoxContainer.classList.contains('active')) {
    fancyBoxContainer.classList.add('active');

    fancyBoxContainer.addEventListener('click', () => {
      if (fancyBoxContainer.classList.contains('active')) {
        fancyBoxContainer.classList.remove('active');
        fancyBoxContainer.innerHTML = '';
      }
    });

    const image = document.createElement('img');
    if (path != null) {
      image.setAttribute('src', path);
      image.setAttribute('data-fancy', 'true');
    }

    image.addEventListener('load', (e) => {
      if (e.currentTarget) {
        imageFormat(
          e.currentTarget as HTMLImageElement,
          fancyBoxContainer.clientWidth/1.5,
          fancyBoxContainer.clientHeight/1.5,
        );
      }
    });

    fancyBoxContainer.append(image);
  }
};
