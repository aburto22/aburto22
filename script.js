'use strict';

function general() {
  document.addEventListener('keydown', function (e) {
    if (e.key == ' ' && e.target == document.body) {
      e.preventDefault();
    }
  });

  if (window.innerWidth > 1100) {
    if (document.querySelector('a.noOutline')) {
      let a = Array.from(document.querySelectorAll('a.noOutline'));
      a.forEach((link) => {
        link.classList.remove('noOutline');
        link.classList.add('outline');
      })
    }
  }
}

function nav() {
  let nav = document.querySelector('nav');
  let menu = nav.querySelector('.menu');
  let toggle = nav.querySelector('.toggle');
  toggle.img = toggle.querySelectorAll('img');
  let items = nav.querySelectorAll('.item');
  let subMenusHead = nav.querySelectorAll('.hasSubMenu');
  let subMenus = nav.querySelectorAll('.subMenu');

  function closeAllSubMenus() {
    subMenus.forEach((item) => {
      if (item.classList.contains('active')) item.classList.remove('active');
    });
    subMenusHead.forEach((item) => {
      if (item.classList.contains('subMenuSelected')) {
        item.classList.remove('subMenuSelected');
        item.querySelector('.contentArrow').innerHTML = '&#9662';
      }
    });
  }

  function closeMenu() {
    if (toggle.classList.contains('toggleActive')) {
      toggle.classList.remove('toggleActive')
      items.forEach((item) => item.classList.remove('active'));
      toggle.img[0].style.display = 'inline-block';
      toggle.img[1].style.display = 'none';
    }
    closeAllSubMenus();
  }

  function showMenu() {
    if (toggle.classList.contains('toggleActive')) {
      toggle.classList.remove('toggleActive')
      items.forEach((item) => item.classList.remove('active'));
      toggle.img[0].style.display = 'inline-block';
      toggle.img[1].style.display = 'none';
    } else {
      toggle.classList.add('toggleActive');
      items.forEach((item) => item.classList.add('active'));
      toggle.img[0].style.display = 'none';
      toggle.img[1].style.display = 'inline-block';
    }
    closeAllSubMenus();
  }

  function showSubMenu(item) {
    if (item.querySelector('.subMenu').classList.contains('active')) {
      item.querySelector('.subMenu').classList.remove('active');
      item.classList.remove('subMenuSelected');
      item.querySelector('.contentArrow').innerHTML = '&#9662';
    } else {
      closeAllSubMenus();
      item.querySelector('.subMenu').classList.add('active');
      item.classList.add('subMenuSelected');
      item.querySelector('.contentArrow').innerHTML = '&#9652';
    }
  }

  function showSubMenuHover(e) {
    let item = e.target.parentNode;
    while (!item.classList.contains('hasSubMenu')) item = item.parentNode;
    item.querySelector('.subMenu').classList.add('active');
    item.classList.add('subMenuSelected');
    item.querySelector('.contentArrow').innerHTML = '&#9652';
  }

  function hideSubMenuHover(e) {
    let item = e.target.parentNode;
    while (!item.classList.contains('hasSubMenu')) item = item.parentNode;
    item.querySelector('.subMenu').classList.remove('active');
    item.classList.remove('subMenuSelected');
    item.querySelector('.contentArrow').innerHTML = '&#9662';
  }

  subMenusHead.forEach((item) => {
    item.addEventListener('click', () => showSubMenu(item));
    item.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape' && e.key !== 'Tab') showSubMenu(item);
    });
    if (window.innerWidth > 1100) item.addEventListener('mouseover', showSubMenuHover);
    if (window.innerWidth > 1100) item.addEventListener('mouseout', hideSubMenuHover);
  });

  toggle.addEventListener('click', showMenu);
  toggle.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape' && e.key !== 'Tab') showMenu();
  });

  nav.addEventListener('keydown', (e) => {
    if (e.key === ' ') e.preventDefault();
  })

  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target)) closeMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  })
}

let fullScreen = {
  disp: document.querySelector('#forFullScreen'),
  right: document.querySelector('#fullScreenRight'),
  left: document.querySelector('#fullScreenLeft'),
  close: document.querySelector('#fullScreenClose'),
  imgDisp: document.querySelector('#fullScreenImg'),
  imgList: [],
  index: 0,

  removeImg: function () {
    while (fullScreen.imgDisp.firstChild) fullScreen.imgDisp.removeChild(fullScreen.imgDisp.lastChild);
  },

  showImg: function () {
    fullScreen.removeImg();
    fullScreen.imgDisp.appendChild(fullScreen.imgList[fullScreen.index].cloneNode());
  },

  goRight: function () {
    fullScreen.index++;
    if (fullScreen.index >= fullScreen.imgList.length) fullScreen.index = 0;
    fullScreen.showImg();
  },

  goLeft: function () {
    fullScreen.index--;
    if (fullScreen.index < 0) fullScreen.index = fullScreen.imgList.length - 1;
    fullScreen.showImg();
  },

  start: function () {
    fullScreen.close.addEventListener('click', () => {
      fullScreen.removeImg();
      if (fullScreen.disp.classList.contains('fullScreenActive')) fullScreen.disp.classList.remove('fullScreenActive');
    });
    document.addEventListener('keydown', (e) => {
      if (fullScreen.disp.classList.contains('fullScreenActive')) {
        if (e.key === 'Escape') {
          fullScreen.removeImg();
          fullScreen.disp.classList.remove('fullScreenActive');
        }
      }
    });
    fullScreen.right.addEventListener('click', fullScreen.goRight);
    fullScreen.left.addEventListener('click', fullScreen.goLeft);
  },

  showFullScreen: function (img) {
    fullScreen.disp.classList.add('fullScreenActive');
    let imgContainer = img.parentNode;
    let counter = 0;
    while (!imgContainer.classList.contains('imgContainer')) {
      imgContainer = imgContainer.parentNode;
      counter++;
      if (counter == 5) {
        console.log(`imgContainer for image not found.`);
        break;
      }
    }

    fullScreen.imgList = Array.from(imgContainer.querySelectorAll('img'));

    fullScreen.index = fullScreen.imgList.indexOf(img);

    if (this.imgList.length > 1) {
      this.right.style.display = 'flex';
      this.left.style.display = 'flex';
    } else {
      this.right.style.display = 'none';
      this.left.style.display = 'none';
    }

    fullScreen.showImg();
  }
}

function section() {
  let section = document.querySelector('section');
  let imgFullScreen = section.querySelectorAll('.fullScreen');
  console.log(imgFullScreen);
  if (imgFullScreen.length) imgFullScreen.forEach((img) => img.addEventListener('click', () => {
    fullScreen.showFullScreen(img.firstElementChild);
  }));

  function start() {
    fullScreen.start();
  }

  start();
}

nav();

section();

general();