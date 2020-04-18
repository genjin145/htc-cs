class Modal {
  constructor(selector) {
    this.element = document.querySelector(selector);

    this.init();
  }

  init() {
    let openElem = document.querySelectorAll('.modal-open'),
        closeElem = document.querySelectorAll('.modal-close'),
        overlay = this.element.querySelector('.modal__overlay');

    openElem.forEach(elem => {
      elem.addEventListener('click', evt => {
        evt.preventDefault();
        this.open();
      });
    });

    closeElem.forEach(elem => {
      elem.addEventListener('click', evt => {
        evt.preventDefault();
        this.close();
      });
    });
    
    overlay.addEventListener('mouseup', evt => {
      evt.preventDefault();
      this.close();
    });

    document.addEventListener('keyup', evt => {
      if (this.element.classList.contains('modal--open') && evt.key === 'Escape') {
        this.close();
      }
    });
  }

  open() {
    this.element.classList.add('modal--open');
  }

  close() {
    this.element.classList.remove('modal--open');
  }
}

export default Modal;