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
    View AllTablesView contains User Defined Component (UDC) "TablesTable".
    The view contains list of all tablenames and its properties in representation
    as one big table. By click on tablename user is linked to the ShemaView
    witch contains user UDC "SchemaTable" with full schema of requested table
    and all of its requisits represented as table.
  -->
  <div class="alltablesview" id="scrolling-up">
      <h3  class="black--text display-2" dir="rtl">רשימת כל הטבלאות</h3><br>
      <!-- 
          Passing json that contains full list of tables to child UDC "TableTable"
      -->
      <TablesTable :parentTables="passedTables"></TablesTable>
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
import TablesTable from '@/components/TablesTable'

export default{
  components: { TablesTable },
  data() {
    return {

        passedTables:[]

    }
  },

  // On page loaded triget finction 
  beforeMount(){
    this.getAllTables()
  },    
  
  methods: {

    // GET request to Spring API to access json with full list  of tables.
    getAllTables()  {
      this.$http.get('http://localhost:8080/search/all' +'?activeOnly=false').then(function(data) {

          // Discreting Tables data
          this.passedTables = data.body
      })
    }
  }
}
</script>