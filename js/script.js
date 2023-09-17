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

  //+animation
  const theAnimation = document.querySelectorAll('._animation')
  if (theAnimation.length > 0) {
    history.scrollRestoration = "manual";
    let observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('_animation-show')
        }
        /* else {
          entry.target.classList.remove('_animation-show')
        } */
      })
    },
      {
        threshold: 0.2
      });
    for (let i = 0; i < theAnimation.length; i++) {
      const elements = theAnimation[i];
      observer.observe(elements);
    }
  }
  if (document.querySelector('.hero__shark')) {
    let shark1 = document.querySelector('.hero__shark');
    shark1.classList.add('_anim1');
    let scrollTop = window.scrollY;
    window.addEventListener('scroll', function () {
      scrollTop = window.scrollY;
      if (scrollTop > 250) {
        shark1.classList.remove('_anim1');
        shark1.classList.remove('_anim3');
        shark1.classList.add('_anim2');
      } else if (!shark1.classList.contains('_anim1')) {
        shark1.classList.remove('_anim2');
        shark1.classList.add('_anim3');
      }
    })
  }
  //-animation

  //+horizontal scroll
  const horizontalScroll = document.querySelector('.offer-horizontal-scroll');
  if (horizontalScroll) {
    const scrollList = document.querySelector('.offer-list__outer');
    function calcDimension() {
      let contentHeight = document.querySelector('.offer-horizontal-scroll__inner').offsetHeight;
      let contentWidth = document.querySelector('.we-offer2__outer').offsetWidth;
      let listWidth = document.querySelector('.offer-list__inner').offsetWidth;
      document.querySelector('.offer-horizontal-scroll').style.height = (contentHeight + listWidth - contentWidth) + 'px';
      scrollList.scrollLeft = -document.querySelector('.offer-horizontal-scroll').getBoundingClientRect().top;
    };
    calcDimension();
    scrollList.addEventListener('wheel', function (e) {
      if (e.shiftKey) {
        e.stopPropagation();
        e.preventDefault();
        e.cancelBubble = false;
      }
      return false;
    }, false);
    window.addEventListener('scroll', function () {
      scrollList.scrollLeft = -document.querySelector('.offer-horizontal-scroll').getBoundingClientRect().top;
    });
    document.fonts.ready.then(calcDimension);
    window.addEventListener('load', calcDimension);
    window.addEventListener('resize', calcDimension);
  }
  //-horizontal scroll

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