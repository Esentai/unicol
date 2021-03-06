const vm = new Vue({
  el: '#root',

  data: () => {
    return {
      myMap: null,
      mainMap: null,
      info: null,
      cities: [],
      specialty: [],
      universities: [],
      msg: 'Some msg',
      counter: 0,
      lang: 'Рус',
      lang_img: 'images/lang/rus.png',
      words: {
        universities: 'Университеты',
        colleges: 'Колледжи'
      },
      citySelect: 'all',
      mapDisplay: 'flex',
      select: {
        city: false
      },
      backbtn: 'none',
      filter: true,
      this_universities: [],
      index: null,
      militaryDepartment: 'none',
      moreInfo: {
        grants: false,
        hostel: false
      }
    };
  },
  computed: {
    filteredCity: function() {
      var category = this.citySelect;
      // if (this.mapDisplay === 'none') {
      //   this.selectCity(category);
      // }
      if (category === 'all') {
        return this.cities;
      } else {
        return this.cities.filter(function(city) {
          if (city.name_eng === category) {
            return city.name_eng;
          }
        });
      }
    }
  },
  created: function() {
    this.createMap();
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
    },
    createMap: function() {
      this.getAllTeam();
      // this.mainMap = ymaps.ready(() => {
      //   const map = new window.ymaps.Map(
      //     '',
      //     {
      //       center: [48.136207, 60.15355], //50,15
      //       zoom: 5,
      //       controls: [],
      //       strokeColor: '#FF0000'
      //     },
      //     {
      //       restrictMapArea: [[61.937904, 5.559414], [30.397626, 101.184414]],
      //       strokeColor: '#FF0000'
      //     }
      //   );
      //   map.controls.add(
      //     new ymaps.control.ZoomControl({
      //       options: { position: { right: 10, top: 90 } }
      //     })
      //   );

      //   this.myMap = map;
      //   this.getAllTeam();

      //   map.behaviors.disable('scrollZoom');
      //   ymaps.borders
      //     .load('KZ', {
      //       lang: 'ru',
      //       quality: 3,
      //       strokeColor: '#FF0000'
      //     })
      //     .then(function(geojson) {
      //       var regions = ymaps.geoQuery(geojson);
      //       regions.addToMap(map);
      //     });
      // });
    },
    getAllTeam: function() {
      axios.get('./api.php?action=read').then(
        response => {
          this.info = response.data;
          this.cities = response.data.cities;
          this.specialty = response.data.specialty;
          this.universities = response.data.universities;
          console.log(this.cities);
          // if (this.cities) {
          //   this.addPlacemark(this.cities);
          // }
        },
        error => {
          console.log(error);
          alert('Сервис временно недоступен. Попробуйте позднее.');
        }
      );
    },
    // changeCenter: function() {
    //   this.myMap.setCenter([51.20398, 51.370375], 13);
    // },
    // addPlacemark: function(cities) {
    //   for (let i = 0; i < cities.length; i++) {
    //     myPlacemark = new ymaps.Placemark(
    //       [cities[i].latitude, cities[i].longitude],
    //       {
    //         hintContent: cities[i].Name,
    //         iconContent: cities[i].universities
    //       },
    //       {
    //         preset: 'islands#darkBlueIcon',
    //         fillColor: '#FFF',
    //         strokeColor: '#000',
    //         size: 25,
    //         iconImageSize: [88, 106],
    //         iconImageOffset: [-25, -58],
    //         draggable: false
    //       }
    //     );

    //     this.myMap.geoObjects.add(myPlacemark);
    //   }
    // },
    selectCity: function(city) {
      console.log('Click', city);
      this.mapDisplay = 'none';
      this.backbtn = 'flex';
      this.citySelect = city.name_eng;
      this.mainMap = ymaps.ready(() => {
        const map = new window.ymaps.Map('main_content', {
          center: [city.latitude, city.longitude], //50,15
          zoom: 12,
          controls: [],
          strokeColor: '#FF0000'
        });
        map.controls.add(
          new ymaps.control.ZoomControl({
            options: { position: { right: 10, top: 90 } }
          })
        );
        for (let i = 0; i < this.universities.length; i++) {
          if (this.universities[i].city === city.name_rus) {
            console.log('If Check');
            myPlacemark = new ymaps.Placemark(
              [this.universities[i].latitude, this.universities[i].longitude],
              {
                iconCaption: 'поиск...'
              },
              {
                iconLayout: 'default#image',
                iconImageHref: '../images/placemark.png',
                iconImageSize: [50, 50],
                iconImageOffset: [-20, -50],
                draggable: false
              }
            );
            this.this_universities = this.universities[i];
            this.index = i;
            myPlacemark.events.add('click', this.up, this);
            map.geoObjects.add(myPlacemark);
          }
        }
        this.myMap = map;
        map.behaviors.disable('scrollZoom');
        this.select.city = true;
      });
    },

    up: function() {
      console.log('Ok!');
      console.log('Index:', this.index);
      console.log(this.this_universities);
      this.filter = false;
    },

    backBtn: function() {
      this.backbtn = 'none';
      this.mapDisplay = 'flex';
      this.select.city = false;
      this.citySelect = 'all';
      this.myMap.destroy();
    },
    infoBodyBackBtn: function() {
      this.filter = true;
    },
    moreInfo: function() {
      console.log('select');
    },
    greet: function(event, number) {
      // // `this` внутри методов указывает на экземпляр Vue
      // alert('Привет, ' + this.name + '!');
      // // `event` — нативное событие DOM
      // if (event) {
      //   alert(event.target.tagName);
      // }
      console.log('select', number);
    },
    warn: function(message, event) {
      if (message == '1') {
        console.log('Ok!');
        this.militaryDepartment = 'block';
      }
      console.log(message);
    }
  }
});
