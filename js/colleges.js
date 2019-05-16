const vm = new Vue({
  el: '#root',

  data: () => {
    return {
      myMap: {},
      mainMap: null,
      info: null,
      cities: [],
      msg: 'Some msg',
      counter: 0
    };
  },

  created: function() {
    this.createMap();
  },
  methods: {
    createMap: function() {
      this.mainMap = ymaps.ready(() => {
        const map = new window.ymaps.Map('map', {
          center: [48.061622, 69.328317],
          zoom: 5,
          controls: []
        });
        map.controls.add(
          new ymaps.control.ZoomControl({
            options: { position: { left: 10, top: 90 } }
          })
        );
        this.myMap = map;
        this.getAllTeam();
        map.behaviors.disable('scrollZoom');
      });
    },
    getAllTeam: function() {
      axios.get('./api.php?action=read').then(
        response => {
          this.info = response.data;
          this.cities = response.data.cities;
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
            iconContent: cities[i].colleges
          },
          {
            preset: 'islands#redIcon',
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
