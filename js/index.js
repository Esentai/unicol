var app = new Vue({
  el: '#app',
  data: {
    lang: 'Рус',
    lang_img: 'images/lang/rus.png',
    words: {
      universities: 'Университеты',
      colleges: 'Колледжи'
    }
  },

  methods: {
    changeLanguage: function(lang) {
      if (lang === 'rus') {
        this.lang = 'Рус';
        this.lang_img = 'images/lang/rus.png';
        this.words = {
          universities: 'Университеты',
          colleges: 'Колледжи'
        };
      } else if (lang === 'qaz') {
        this.lang = 'Qaz';
        this.lang_img = 'images/lang/qaz.png';
        this.words = {
          universities: 'Университеттер',
          colleges: 'Колледждер'
        };
      } else {
        this.lang = 'Eng';
        this.lang_img = 'images/lang/eng.png';
        this.words = {
          universities: 'Universities',
          colleges: 'Colleges'
        };
      }
    }
  }
});
