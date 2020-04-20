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
    Welcome screen of application.
  -->
  <v-img :gradient="gradient" light :src="images.bckg">
    <v-container  fill-height>
      <v-layout align-center wrap>
        <v-flex xs12 text-xs-center>
          <!-- Title and greetings -->
          <v-layout column align-center dark>
            <v-flex xs12>
              <h1 dir="rtl" align="center" style="font-size:3em">
                ברוכים הבאים לקטלוג נתונים מאגר קורונה 
              </h1>
            </v-flex>
            <!-- Subtitle and breef introduction -->
            <v-flex xs12 class="grey--text text--lighten-1 pt-3 pb-4">
              <h2  dir="rtl" align="center">
                
              </h2>
            </v-flex>

            <v-flex xs12 sm8 offset-sm2 md6 offset-md3>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs6 md8 offset-sm2 text-lg-center>
          <!--
          <v-card light>
            
            <p style="font-size:22px">
              
            </p>
            
            <v-divider class="my-3"></v-divider>
             Contact us for questions 
            <div dir="rtl" align="center" class="title mb-3">
           
            </div>  
          </v-card>-->
        </v-flex>
      </v-layout>
    </v-container>
  </v-img>
</template>

<script>
export default {
     data: () => ({
      gradient: 'to top right, rgba(63,81,181, .7), rgba(25,32,72, .7)',
      images: {
                bckg: require('@/assets/background/shutterstock_51955312.jpg')
            }
    })

}
</script>
<style scoped>

</style>

