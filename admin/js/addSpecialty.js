var app = new Vue({
  el: '#addSpecialty',
  data: {
    info: null,

    counter: 0,

    faculty: {
      name_kaz: '',
      name_rus: '',
      name_eng: '',
      specialty: []
    }
  },

  mounted: function() {},

  methods: {
    addSpecialty: function() {
      this.faculty.specialty.push({
        name_kaz: '',
        name_rus: '',
        name_eng: '',
        code: null
      });
    },
    save: function() {
      console.log('OK');
      var specialty_kaz = [];
      var specialty_rus = [];
      var specialty_eng = [];
      var specialty_code = [];
      for (var i = 0; i < this.faculty.specialty.length; i++) {
        specialty_kaz.push(this.faculty.specialty[i].name_kaz);
        specialty_rus.push(this.faculty.specialty[i].name_rus);
        specialty_eng.push(this.faculty.specialty[i].name_eng);
        specialty_code.push(this.faculty.specialty[i].code);
      }
      if (
        this.faculty.name_kaz &&
        this.faculty.name_rus &&
        this.faculty.name_eng
      ) {
        var newfaculty = {
          name_kaz: this.faculty.name_kaz,
          name_rus: this.faculty.name_rus,
          name_eng: this.faculty.name_eng,
          specialty_kaz: specialty_kaz,
          specialty_rus: specialty_rus,
          specialty_eng: specialty_eng,
          specialty_code: specialty_code
        };
        console.log('Data:', newfaculty);
        var formData = this.toFromData(newfaculty);
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
