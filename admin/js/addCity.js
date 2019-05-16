var app = new Vue({
  el: '#addCity',
  data: {
    info: null,

    counter: 0,
    city: {
      name: ''
    }
  },

  mounted: function() {},

  methods: {
    save: function() {
      console.log('OK');
      if (this.city.name) {
        var newCity = {
          Name: this.city.name
        };
        var formData = this.toFromData(newCity);
        axios
          .post('/api.php?action=newCity', formData)
          .then(function(response) {
            console.log(response.data);
            if (response.data.message == 'User added successfully') {
              window.location.href = './blank.html';
            }
          });
        console.log('send');
      }
    },

    toFromData: function(obj) {
      var form_data = new FormData();
      for (var key in obj) {
        form_data.append(key, obj[key]);
      }
      return form_data;
    }
  }
});
