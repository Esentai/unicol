var app = new Vue({
  el: '#addUniversity',
  data: {
    info: null,
    cities: [],
    test: 'Test'
  },
  created: function() {
    this.getAllTeam();
  },
  methods: {
    getAllTeam: function() {
      axios.get('/api.php?action=read').then(
        response => {
          this.info = response.data;
          this.cities = response.data.cities;
          console.log(this.cities);
        },
        error => {
          console.log(error);
          alert('Сервис временно недоступен. Попробуйте позднее.');
        }
      );
    }
  }
});
