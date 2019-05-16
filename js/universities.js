const vm = new Vue({
  el: '#root',

  data: () => {
    return {
      myMap: {},
      mainMap: null,
      info: null,
      cities: [],
      specialty: [],
      msg: 'Some msg',
      counter: 0,
      lang: 'Рус',
      lang_img: 'images/lang/rus.png',
      words: {
        universities: 'Университеты',
        colleges: 'Колледжи'
      }
    };
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
      this.mainMap = ymaps.ready(() => {
        const map = new window.ymaps.Map(
          'map',
          {
            center: [48.136207, 60.15355], //50,15
            zoom: 5,
            controls: [],
            strokeColor: '#FF0000'
          },
          {
            restrictMapArea: [[61.937904, 5.559414], [30.397626, 101.184414]],
            strokeColor: '#FF0000'
          }
        );
        map.controls.add(
          new ymaps.control.ZoomControl({
            options: { position: { right: 10, top: 90 } }
          })
        );

        this.myMap = map;
        this.getAllTeam();

        map.behaviors.disable('scrollZoom');
        ymaps.borders
          .load('KZ', {
            lang: 'ru',
            quality: 3,
            strokeColor: '#FF0000'
          })
          .then(function(geojson) {
            var regions = ymaps.geoQuery(geojson);
            regions.addToMap(map);
          });
      });
    },
    getAllTeam: function() {
      axios.get('./api.php?action=read').then(
        response => {
          this.info = response.data;
          this.cities = response.data.cities;
          this.specialty = response.data.specialty;
          console.log(this.cities);
          if (this.cities) {
            this.addPlacemark(this.cities);
          }
        },
        error => {
          console.log(error);
          alert('Сервис временно недоступен. Попробуйте позднее.');
        }
      );
    },
    changeCenter: function() {
      this.myMap.setCenter([51.20398, 51.370375], 13);
    },
    addPlacemark: function(cities) {
      for (let i = 0; i < cities.length; i++) {
        myPlacemark = new ymaps.Placemark(
          [cities[i].latitude, cities[i].longitude],
          {
            hintContent: cities[i].Name,
            iconContent: cities[i].universities
          },
          {
            preset: 'islands#darkBlueIcon',
            fillColor: '#FFF',
            strokeColor: '#000',
            size: 25,
            iconImageSize: [88, 106],
            iconImageOffset: [-25, -58],
            draggable: false
          }
        );

        this.myMap.geoObjects.add(myPlacemark);
      }
    }
  }
});
