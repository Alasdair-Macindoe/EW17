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
        v-on:click=\"onclick\" :class="day">{{ date }}</div>',
  methods: {
    dateMouseover: function(event){
      divColour = getColour(event);
      divCSS = event.currentTarget;
      changeBarColours(divColour);
      divCSS.style.setProperty('width', '100%');
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

Vue.component('event-box', {
  props: ['day', 'name', 'title', 'desc', 'img', 'loc'],
  template: '<div class="entry" :class="day"> \
    <div class="name boxText font"> {{name}} </div>\
    <div class="title boxText font"> {{title}} </div>\
    <div class="mainBoxArea">\
      <div class="boxTextArea boxText">\
        {{desc}}\
      </div>\
      <div class="boxPhotoArea">\
        <img class="boxPhotograph" :src="img"></img>\
      </div>\
    </div>\
    <div class="address boxText font">\
      <span class="addressText"> {{loc}} </span>\
    </div>\
  </div>'
});

var vm = new Vue({
  el: '#app',
});
