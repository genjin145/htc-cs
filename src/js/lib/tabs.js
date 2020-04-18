class Tabs {
  constructor(selector, options = {}) {
    this.element = document.querySelectorAll(selector);

    this.render();
  }

  render() {
    this.element.forEach(elem => {
      Tabs.onBtnClick(elem);
      Tabs.toggleBtnNav(elem);
      Tabs.toggleContent(elem);
    });
  }

  static onBtnClick(elem) {
    let btnNav = elem.querySelectorAll('.tabs__nav-button');

    btnNav.forEach((btn, index) => {
      btn.addEventListener('click', (evt) => {
        evt.preventDefault();

        Tabs.toggleBtnNav(elem, index);
        Tabs.toggleContent(elem, index);
      });
    });
  }

  static toggleBtnNav(elem, index = 0) {
    let btnNav = elem.querySelectorAll('.tabs__nav-button');

    btnNav.forEach((btn) => {
      btn.classList.remove('tabs__nav-button--active');
    });

    btnNav[index].classList.add('tabs__nav-button--active');
  }

  static toggleContent(elem, index = 0) {
    let content = elem.querySelectorAll('.tabs__content');

    content.forEach((el) => {
      el.classList.add('tabs__content--hidden');
    });

    content[index].classList.remove('tabs__content--hidden');
  }
}

export default Tabs;