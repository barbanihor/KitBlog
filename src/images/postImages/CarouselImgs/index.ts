import img_1 from './img_1.jpg';
import img_2 from './img_2.jpg';
import img_3 from './img_3.jpg';
import img_4 from './img_4.jpg';
import img_5 from './img_5.jpg';
import img_6 from './img_6.jpg';
import img_7 from './img_7.jpg';
import img_8 from './img_8.jpg';
import img_9 from './img_9.jpg';
import img_10 from './img_10.jpg';

export const img_features = {
  imgs: [img_1, img_2, img_3, img_4, img_5, img_6, img_7, img_8, img_9, img_10],

  randomImg() {
    const randomIndex = Math.floor(Math.random() * this.imgs.length);
    return this.imgs[randomIndex];
  },
};
