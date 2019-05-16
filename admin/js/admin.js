var app = new Vue({
  el: '#admin',
  data: {
    type: 'user',
    info: null,
    admin: true,
    specialty: []
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
          //   this.replaceFun();
        },
        error => {
          console.log(error);
          alert('Сервис временно недоступен. Попробуйте позднее.');
        }
      );
    },
    replaceFun: function() {
      console.log('replaceFun Run');
      for (var i = 0; i < this.info.team.length; i++) {
        this.info.team[i].name = this.info.team[i].name.split(',');
        this.info.team[i].stage = this.info.team[i].stage.split(',');
        this.info.team[i].distance = this.info.team[i].distance.split(',');
        this.info.team[i].achievement = this.info.team[i].achievement.split(
          ','
        );
        this.info.team[i].searchName = this.info.team[i].searchName.split(',');
        this.info.team[i].searchDistance = this.info.team[
          i
        ].searchDistance.split(',');
      }
    },

    deleteTeam: function(index, id) {
      console.log('id:', id);
      console.log('index:', index);
      console.log('data:', this.info.team);
      axios
        .post('./api.php?action=deleteTeam', {
          id: id
        })
        .then(function(response) {
          // Remove index from users
          app.info.team.splice(index, 1);
          alert(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    deleteUser: function(index, id) {
      console.log('id:', id);
      console.log('index:', index);
      console.log('data:', this.info.user);
      axios
        .post('./api.php?action=deleteUser', {
          id: id
        })
        .then(function(response) {
          // Remove index from users
          app.info.user.splice(index, 1);
          alert(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
});
