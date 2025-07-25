import img_1 from './mock_1.svg';
import img_2 from './mock_2.svg';
import img_3 from './mock_3.svg';
import img_4 from './mock_4.svg';

export const imgs = {
  imgs: [img_1, img_2, img_3, img_4],

  randomImg() {
    const randomIndex = Math.floor(Math.random() * this.imgs.length);
    return this.imgs[randomIndex];
  },
};
