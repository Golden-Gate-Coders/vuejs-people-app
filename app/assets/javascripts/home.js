document.addEventListener("DOMContentLoaded", function(event) { 
  var app = new Vue({
    el: '#app',
    data: {
      people: [],
      newName: '',
      newBio: ''
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
        var newPerson = {
          name: this.newName,
          bio: this.newBio,
          bioVisible: false
        }

        this.people.push(newPerson);
        this.newName = '';
        this.newBio = '';
      },
      deletePerson: function(person) {
        var index = this.people.indexOf(person);
        this.people.splice(index, 1);
      }
    }
  });
});