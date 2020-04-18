class ScrollBar {
  constructor(selector, options = {}) {
    this.element = document.querySelectorAll(selector);
    this.options = options;
    this.options.maxHeight = options.maxHeight || 700;
    
    this.element.forEach(elem => {
      elem.innerHTML = this.template(elem.innerHTML);

      let content = elem.querySelector('.scroll-bar__content'),
          track = elem.querySelector('.scroll-bar__track'),
          thumb = elem.querySelector('.scroll-bar__thumb'),

          maxScroll = content.scrollHeight - content.offsetHeight,
          max = track.offsetHeight - thumb.offsetHeight;

      window.addEventListener('resize', () => {
        maxScroll = content.scrollHeight - content.offsetHeight;
        max = track.offsetHeight - thumb.offsetHeight;
      });

      if (this.options.maxHeight >= content.scrollHeight) {
        track.hidden = true;
      }

      content.addEventListener('scroll', () => {
        let shift = content.scrollTop / maxScroll * 100;

        shiftThumb(max / 100 * shift);
      });

      thumb.addEventListener('mousedown', evt => {
        let Y = evt.pageY;
  
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onMouseUp);
        
        function onMove(evt) {
          let shift = evt.pageY - Y;
  
          Y = evt.pageY;
  
          shiftThumb(thumb.offsetTop + shift);
          content.scrollTop = maxScroll / 100 * (thumb.offsetTop / max * 100);
          document.body.classList.add('select-none');
        }
  
        function onMouseUp() {
          document.removeEventListener('mousemove', onMove);
          document.body.classList.remove('select-none');
        }
      });
  
      function shiftThumb(val) {
        if (val < 0) val = 0;
        if (val > max) val = max;
  
        thumb.style.top = `${val}px`;
      }
    });
  }

  template(content) {
    return `<div class="scroll-bar" style="max-height:${this.options.maxHeight}px;">
              <div class="scroll-bar__content" style="height:${this.options.maxHeight}px;">${content}</div>
              <div class="scroll-bar__track">
                <div class="scroll-bar__thumb"></div>
              </div>
            </div>`;
  }
}

export default ScrollBar;