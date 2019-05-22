var app = new Vue({
  el: '#addCity',
  data: {
    info: null,

    counter: 0,
    city: {
      name_kaz: '',
      name_rus: '',
      name_eng: ''
    }
  },

  mounted: function() {},

  methods: {
    save: function() {
      console.log('OK');
      console.log(
        this.city.name_kaz,
        ' ',
        this.city.name_eng,
        ' ',
        this.city.name_rus,
        ' '
      );
      if (this.city.name_rus) {
        var newCity = {
          name_kaz: this.city.name_kaz,
          name_eng: this.city.name_eng,
          name_rus: this.city.name_rus
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
