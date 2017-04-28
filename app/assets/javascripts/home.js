document.addEventListener("DOMContentLoaded", function(event) { 
var app = new Vue({
  el: '#app',
  data: {
    people: [],
    newName: '',
    newBio: '',
    errors: []
  },
  mounted: function() {
    // Grab the data from the API we built
    // Fill in the people array with that data

    $.get('http://localhost:3000/api/v1/people.json', function(result) {
      this.people = result;
    }.bind(this))

  },
  methods: {
    toggleBio: function(person) {
      // if (person.bioVisible == true) {
      //   person.bioVisible = false;
      // } else {
      //   person.bioVisible = true;
      // }
      person.bioVisible = !person.bioVisible;
    },
    createPerson: function() {
      // var newPerson = {
      //   name: this.newName,
      //   bio: this.newBio,
      //   bioVisible: false
      // }

      // this.people.push(newPerson);

      var params = {
        name: this.newName,
        bio: this.newBio
      }

      $.post('http://localhost:3000/api/v1/people.json', params, function(result) {
        this.people.push(result);
        this.newName = '';
        this.newBio = '';
        this.errors = [];
      }.bind(this)).fail( function (result) {
        this.errors = result.responseJSON.errors;
      }.bind(this));

    },
    deletePerson: function(person) {
      var index = this.people.indexOf(person);
      this.people.splice(index, 1);
    }
  }
});

});