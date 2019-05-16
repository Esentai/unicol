var app = new Vue({
  el: '#addSpecialty',
  data: {
    info: null,

    counter: 0,
    specialty: {
      name_kaz: '',
      name_rus: '',
      name_eng: ''
    }
  },

  mounted: function() {},

  methods: {
    save: function() {
      console.log('OK');
      console.log(this.specialty);
      if (
        this.specialty.name_kaz &&
        this.specialty.name_rus &&
        this.specialty.name_eng
      ) {
        var newSpecialty = {
          name_kaz: this.specialty.name_kaz,
          name_rus: this.specialty.name_rus,
          name_eng: this.specialty.name_eng
        };
        var formData = this.toFromData(newSpecialty);
        axios
          .post('/api.php?action=newSpecialty', formData)
          .then(function(response) {
            console.log(response.data);
            if (response.data.message == 'User added successfully') {
              window.location.href = '/admin/';
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
