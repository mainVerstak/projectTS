"use strict";
document.addEventListener("DOMContentLoaded", function () {
  //+form validator
  //config
  const validatorDictLocale = [
    {
      key: 'required',
      dict: {
        Ukrainian: 'Поле обов\'язкове для заповнення',
      },
    },
    {
      key: 'Email is incorrect',
      dict: {
        Ukrainian: 'Електронна адреса некоректна',
      },
    },
    {
      key: 'Passwords should be the same',
      dict: {
        Ukrainian: 'Паролі повинні співпадати',
      },
    },
    {
      key: 'password',
      dict: {
        Ukrainian: 'Пароль має містити не менше восьми символів, принаймні одну літеру та одну цифру',
      },
    },
  ];
  const validatorConfig = {
    validateBeforeSubmitting: false,
    lockForm: true,
    errorFieldStyle: '',
    errorFieldCssClass: '_error',
    errorLabelStyle: '',
    errorLabelCssClass: 'input-row__msg _error _show',
    successFieldCssClass: "_validate-success",
    successLabelCssClass: "_validate-success"
  }
  //sign up
  let signUpForm = document.querySelector('#signup_form');
  if (signUpForm) {
    const validatorSignUp = new JustValidate(signUpForm, validatorConfig, validatorDictLocale);
    validatorSignUp.setCurrentLocale('Ukrainian');
    validatorSignUp.onSuccess(function (e) {
      if (e.submitter.classList.contains('js-modal-hide-after-validation')) {
        let modal = e.srcElement.closest('.modal');
        if (modal) {
          closeModal(modal);
        }
      }
      let form = e.srcElement.closest('form');
      form.querySelectorAll('.input-row__input').forEach(function (inputField) {
        inputField.value = '';
      })
    })

    validatorSignUp.addField(signUpForm.querySelector('.validator-email'), [
      {
        rule: 'required',
      },
      {
        rule: 'email',
        errorMessage: 'Email is incorrect',
      },
    ])
      .addField(signUpForm.querySelector('.validator-tg'), [
        {
          rule: 'required',
        },
      ])
      .addField(signUpForm.querySelector('.validator-password'), [
        {
          rule: 'required',
        },
        {
          rule: 'password',
        },
      ])
      .addField(signUpForm.querySelector('.validator-repeat-password'), [
        {
          rule: 'required',
        },
        {
          validator: (value, fields) => {
            var result = true;
            Object.keys(fields).forEach(function (key) {
              if (fields[key].elem.classList.contains('validator-password')) {
                let field = fields[key].elem;
                const repeatPasswordValue = field.value;
                result = (value === repeatPasswordValue) ? true : false;
                return;
              }
            });
            return result;
          },
          errorMessage: 'Passwords should be the same',
        },
      ])
  }
  //sign in
  let signInForm = document.querySelector('#signin-form');
  if (signInForm) {
    const validatorSignIn = new JustValidate(signInForm, validatorConfig, validatorDictLocale);
    validatorSignIn.setCurrentLocale('Ukrainian');
    validatorSignIn.onSuccess(function (e) {
      if (e.submitter.classList.contains('js-modal-hide-after-validation')) {
        let modal = e.srcElement.closest('.modal');
        if (modal) {
          closeModal(modal);
        }
      }
      let form = e.srcElement.closest('form');
      form.querySelectorAll('.input-row__input').forEach(function (inputField) {
        inputField.value = '';
      })
    })

    validatorSignIn.addField(signInForm.querySelector('.validator-email'), [
      {
        rule: 'required',
      },
      {
        rule: 'email',
        errorMessage: 'Email is incorrect',
      },
    ])
      .addField(signInForm.querySelector('.validator-password'), [
        {
          rule: 'required',
        },
      ])
  }
  //-form validator

  //+menu
  const menuBtn = document.querySelector('.header-menu__btn');
  const menu = document.querySelector('.header-menu');
  menuBtn.addEventListener('click', function () {
    if (menu.classList.contains('_active')) {
      hideMenu();
    } else {
      showMenu();
    }
  })
  function showMenu() {
    menuBtn.classList.add('_active');
    menu.classList.add('_active');
    document.body.classList.add('_menu-open');
    if (document.body.scrollHeight > window.innerHeight) {
      document.body.classList.add('_add-scroll');
    }
  }
  function hideMenu() {
    menuBtn.classList.remove('_active');
    menu.classList.remove('_active');
    document.body.classList.remove('_menu-open');
    document.body.classList.remove('_add-scroll');
  }
  //-menu

  //+tabs
  document.querySelectorAll('.js-tab').forEach(function (item) {
    item.addEventListener('click', function () {
      if (this.classList.contains('_active')) return;

      let tabsBtn = this.closest('.js-tabs');
      tabsBtn.querySelectorAll('.js-tab._active').forEach(function (btn) {
        btn.classList.remove('_active');
      });
      this.classList.add('_active');

      let tabsContent = tabsBtn.nextElementSibling;
      if (tabsContent.classList.contains('js-tabs-content')) {
        let index = elIndex(this);
        let tabContentList = tabsContent.children;
        for (let i = 0; i < tabContentList.length; i++) {
          if (i == index) {
            tabContentList[i].classList.add('_active');
          } else {
            tabContentList[i].classList.remove('_active');
          }
        }
      }
    })
  })
  //-tabs
  //+modal
  document.querySelectorAll('[data-modal]').forEach(function (item) {
    item.addEventListener('click', function () {
      let modalId = this.getAttribute('href') || '#' + this.getAttribute('data-modal');
      if (!modalId) return;
      openModal(modalId)
    })
  })
  function openModal(modalId) {
    closeModal();
    document.querySelector(modalId).classList.add('_active')
    document.body.classList.add('_modal-open');
    if (document.body.scrollHeight > window.innerHeight) {
      document.body.classList.add('_add-scroll');
    }
  }
  document.querySelectorAll('.js-modal-hide').forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.stopPropagation();
      if (e.target.classList.contains('js-modal-hide')) {
        let modal = this.closest('.modal');
        closeModal(modal);
      }
    })
  })
  function closeModal(modal) {
    if (modal) {
      modal.classList.remove('_active');
    } else {
      document.querySelectorAll('.modal._active').forEach(function (item) {
        item.classList.remove('_active')
      })
    }
    document.body.classList.remove('_modal-open');
    document.body.classList.remove('_add-scroll');
  }
  //-modal

  //+copy
  document.querySelectorAll('[data-copy]').forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      let currentButton = this;
      let value = this.getAttribute('data-copy');
      if (!value) {
        value = this.parentNode.querySelector('input').value;
      }
      navigator.clipboard.writeText(value);
      currentButton.classList.add('_show-tooltip');
      setTimeout(function () {
        currentButton.classList.remove('_show-tooltip');
      }, 1500);
    });
  });
  //-copy

  //+scroll-slider
  const slider = document.querySelector('.offer-list');

  if (slider) {
    //drag scrolling
    slider.scrollLeft = 0;
    let isDown = false;
    let startX;
    let scrollLeft;
    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      slider.classList.add('_active');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('_active');
    });
    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('_active');
    });
    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX);
      slider.scrollLeft = scrollLeft - walk;
    });
    //mouse wheel scrolling
    let canScroll = true;
    slider.addEventListener("wheel", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (canScroll) {
        let direction = (e.deltaY > 0) ? 1 : -1;
        canScroll = false;
        doScroll(direction)
      }
    });
    function doScroll(direction) {
      let offset = (direction > 0) ? 410 : -410;
      let startingX = slider.scrollLeft;
      if ((direction <= 0 && startingX == 0) || ((startingX + slider.clientWidth) >= slider.scrollWidth && direction > 0)) {
        canScroll = true;
        return
      }
      let start;
      let duration = Math.abs(offset);
      window.requestAnimationFrame(function step(timestamp) {
        if (!start) start = timestamp;
        let time = timestamp - start;
        let percent = Math.min(time / duration, 1);
        slider.scrollLeft = startingX + offset * percent;
        if (time < duration && !isDown) {
          window.requestAnimationFrame(step);
        } else {
          canScroll = true;
        }
      })
    };
  }
  //-scroll-slider

  //+select
  document.querySelectorAll(".select").forEach(function (item) {
    NiceSelect.bind(item);
    if (item.classList.contains('select_placeholder')) {
      let nSelect = item.nextElementSibling;
      let options = nSelect.querySelectorAll('.option');
      options.forEach(function (option) {
        option.addEventListener('click', function (e) {
          nSelect.classList.add('select_selected');
        });
      });
    }
  })
  //-select
});

function elIndex(el) {
  if (!el) return -1;
  let i = 0;
  while (el = el.previousElementSibling) {
    i++;
  }
  return i;
}