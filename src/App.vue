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
  <v-app class="grey lighten-4">
    <!--User defined component "Navigation bar"and side menu - placed on top of
        application and containes links to all views of the application.
    -->
    <Navbar></Navbar> 
    <v-content class="mx-4">
      <!-- Actuation of links to different views   -->
      <router-view></router-view>
    </v-content>    
  </v-app>
</template>


<script>

import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  components: { Navbar },
  data () {
    return {

    }
  },
  
}
</script>
