function changeBarColours(colour){
  //Set the horizontal and vertical bar to this colour
  topText = document.getElementById('titleText').style;
  topText.setProperty('color', colour);
  topText.setProperty('opacity', '1');
  vertBar = document.getElementById('textSection').style;
  vertBar.setProperty('border-color', colour);
  vertBar.setProperty('opacity', '1');
}

function getColour(event){
  //Find whatever was just moused over
  divCSS = event.currentTarget;
  //Find the colour it is in the CSS
  style = window.getComputedStyle(divCSS);
  divColour = style.getPropertyValue('background-color');
  return divColour;
}

Vue.component('date-box', {
  props: ['date', 'day'],
  template: '<div class=\"dates\" v-on:mouseleave=\"dateMouseleave\" \
        v-on:mouseover=\"dateMouseover\" \
        v-on:click=\"onclick\" :id="day">{{ date }}</div>',
  methods: {
    dateMouseover: function(event){
      divColour = getColour(event);
      changeBarColours(divColour);
      divCSS = divCSS.style.setProperty('width', '100%');
    },
    dateMouseleave: function(event){
      changeBarColours('rgba(0, 0, 0, 1)');
      divCSS = event.currentTarget.style;
      divCSS.setProperty('width', '50%');
    },
    onclick: function(event){
      updateLines(getColour(event));
      //adjust opacity from default
      document.getElementById('navbarCanvas').style.setProperty('opacity', '0.6');
    }
  }
})

var vm = new Vue({
  el: '#app',
});
