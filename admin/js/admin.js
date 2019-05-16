var app = new Vue({
  el: '#admin',
  data: {
    type: 'user',
    info: null,
    admin: true,
    specialty: [],
    cities: []
  },

  mounted: function() {
    console.log('mounted');
    this.getAllTeam();
  },

  created: function() {
    this.getAllTeam();
  },

  methods: {
    getAllTeam: function() {
      console.log('Read Ok');
      axios.get('/api.php?action=read').then(
        response => {
          this.info = response.data;
          console.log(response.data);
          this.specialty = response.data.specialty;
          this.cities = response.data.cities;
        },
        error => {
          console.log(error);
          alert('Сервис временно недоступен. Попробуйте позднее.');
        }
      );
    },
    deleteSpecialty: function(index, id) {
      console.log('id:', id);
      console.log('index:', index);
      console.log('data:', this.specialty);
      axios
        .post('/api.php?action=deleteSpecialty', {
          id: id
        })
        .then(function(response) {
          // Remove index from users
          app.specialty.splice(index, 1);
          alert(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    deleteCity: function(index, id) {
      console.log('id:', id);
      console.log('index:', index);
      console.log('data:', this.cities);
      axios
        .post('/api.php?action=deleteCity', {
          id: id
        })
        .then(function(response) {
          // Remove index from users
          app.cities.splice(index, 1);
          alert(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
});
