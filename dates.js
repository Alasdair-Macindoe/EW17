function changeBarColours(colour){
  //Set the horizontal and vertical bar to this colour
  topText = document.getElementById('titleText').style;
  topText.setProperty('color', colour);
  topText.setProperty('opacity', '1');
  vertBar = document.getElementById('textSection').style;
  vertBar.setProperty('border-color', colour);
  vertBar.setProperty('opacity', '1');
}

Vue.component('date-box', {
  props: ['date', 'day'],
  template: '<div class=\"dates\" v-on:mouseleave=\"dateMouseleave\" \
        v-on:mouseover=\"dateMouseover\" :id="day">{{ date }}</div>',
  methods: {
    dateMouseover: function(event){
      //Find whatever was just moused over
      divCSS = event.currentTarget;
      //Find the colour it is in the CSS
      style = window.getComputedStyle(divCSS);
      divColour = style.getPropertyValue('background-color');
      changeBarColours(divColour);
      divCSS = divCSS.style.setProperty('width', '100%');
    },
    dateMouseleave: function(event){
      changeBarColours('rgba(0, 0, 0, 1)');
      divCSS = event.currentTarget.style;
      divCSS.setProperty('width', '50%');
    }
  }
})

var vm = new Vue({
  el: '#app',
});
