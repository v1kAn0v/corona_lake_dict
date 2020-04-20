<!--
////////////////////////////////////////////////
// Schema Dictionary                          //
// Version 1.0.5                              //
// Release Date: 2020-04-20                   //
// Modified Date: 2020-04-20                  //
// Developed by Sergey Vikanov, MatrixBi ltd  //
// For Israel Ministry of Health.             //
// All rigths reserved © 2020.                //
////////////////////////////////////////////////
-->

<template>
  <!-- 
    The view contains User Defined Component (UDC) "Free". Can be accessed by navigation from 
    navigation bar on the right of UI or by typing in browser http://{{app-host}}:8080/freeview  
  -->
  <div id="scrolling-up" class="freeview">
    <!-- 
      Actuation of User Defined Component (UDC) "Free" 
    -->
    <Free></Free>
    <!-- 
      Red float with arrow up moving to the top of the page.
    -->
    <v-layout>
        <v-btn class="v-btn--bottom v-btn--floating v-btn--fixed v-btn--right theme--dark red" @click="$vuetify.goTo('#scrolling-up', 1, 200)">
          <v-icon>arrow_upward</v-icon>
        </v-btn>
      </v-layout>
  </div>
</template>

<script>
import Free from '@/components/Free'

export default{
  components: { Free } ,
  data: () => ({

    
  }),
  methods: {

  }
}
</script>
