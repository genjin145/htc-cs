import 'nodelist-foreach-polyfill';
import Swiper from './lib/swiper.esm.browser.bundle.min.js';
import Tabs from './lib/tabs.js';
import Modal from './lib/modal.js';
import ScrollBar from './lib/scrollBar.js';
import Auth from './lib/auth.js';

const mySwiper = new Swiper ('.swiper-container', {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,

  breakpoints: {
    576: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 4,
    }
  }
});

const scrollBar = new ScrollBar('.channel', {
  maxHeight: 700
});

const tabs = new Tabs('.tabs');

const modal = new Modal('.modal');

const auth = new Auth(function() {
  let header = document.querySelector('.header'),
      login = document.querySelector('.user-menu__login'),
      btnSignin = document.querySelector('.user-menu__signin');

  if (this.authorized()) {
    header.classList.add('header--authorized');

    login.textContent = this.getLogin();
    login.addEventListener('keydown', (evt) => {
      if (evt.key === 'Enter') {
        evt.preventDefault();
        this.renameLogin(login.textContent);
        login.blur();
      }
    });
    document.addEventListener('click', (evt) => {
      if ( evt.target !== login) {
        this.renameLogin(login.textContent);
      }
    });

    btnSignin.textContent = 'Выйти';
    btnSignin.classList.remove('button');
    btnSignin.classList.add('link');

    btnSignin.addEventListener('click', () => {
      modal.close();
      this.logout();
      location.reload();
    });
  } else {
    btnSignin.addEventListener('click', () => {
      modal.open();

      let form = document.querySelector('.modal__form');

      form.addEventListener('submit', evt => {
        evt.preventDefault();
      
        modal.close();
        auth.login({
          login: form.login.value,
          password: form.password.value
        });
      });
    });
  }
});
