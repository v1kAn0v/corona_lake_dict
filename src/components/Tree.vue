<!--
////////////////////////////////////////////////
// Schema Dictionary                          //
// Version 2.0.0                              //
// Release Date:  2019-09-21                  //
// Modified Date: 2019-09-25                  //
// Developed by Sergey Vikanov, MatrixBi ltd  //
// For Israel Ministry of Health.             //
// All rigths reserved © 2020.                //
// Version features: Tree Hebrew search added //
////////////////////////////////////////////////
-->

<template>
<!-- 
  User Defined Component (UDC) "Tree" that retrieves the list of subjects and 
  table names, eather English or Hebrew, and allows to navigate through it
  as tree structure, subjects are branches and table names are leafs.
  Checkboxes aloow to switch between two languages, Hebrew and English in
  table names, and display names of active/inactive tables.
  Input field support interactive filter on subjects and table names in
  Hebrew or English. Schema table is displayed under the tree structure.
  ***Hebrew language is curently not siupported in this version.
 -->
  <div class="tree">
    <h3 class="black--text display-2"  dir="rtl">חיפוש בעזרת עץ נושאים</h3><br>
    <v-card :disabled="true"
      class="mx-auto my-3"
      max-width="550"
    > 
      <!-- Filter on tree of categories and tablenames -->
      <v-sheet dir="rtl" class="pa-3 indigo darken-2">
        <v-text-field reverse dir="rtl"
          v-model="search"
          label="סינון תוצאות החיפוש"
          dark
          flat
          solo-inverted
          hide-details
          clearable
          clear-icon="mdi-close-circle-outline"
        ></v-text-field>
        <v-layout row>
          <v-flex>
            <!-- Trigers loading active/inactive tables according to checkbox -->
            <v-checkbox @change="loadTree()"
              v-model="active"
              value="active"
              dark
              hide-details
              label="פעילים"
            ></v-checkbox>
          </v-flex>
          <v-flex>
          <!-- Trigers loading tree in different language according to checkbox -->
            <v-checkbox @change="loadTree()"
              v-model="language"
              value="hebrew"
              dark
              hide-details
              label="עברית"
            ></v-checkbox>
          </v-flex>
        </v-layout>
      </v-sheet>
        
      <v-card-text>
        <v-treeview dir="rtl" reverse open-on-click
          :items="treeResults"
          :search="search"
          :filter="filter"
          :open.sync="open"
        >
        
          <template v-slot:prepend="{ item }">
            <!-- 
              Triggering function that represents requested table at the bottom of the tree.
              Navigating user by moving scrollbar of the page to the begining of the loaded table. 
             -->
            <v-icon class="pl-1 pr-5" @click="getTableFields(item.name),$vuetify.goTo('#schema-table', 1, 300)"
              v-if="!item.children"
              v-text="`${item.id > 999 ? 'grid_on' : 'subject'}`"
            ></v-icon>
            <!-- 
              If id No. is lower then 999, the item is subject, gets subject icon next to it,
              else the item is table, gets grid_on icon next to it.
             -->
            <v-icon class="pl-1"
              v-if="item.children"
              v-text="`${item.id <= 999 ? 'subject' : 'grid_on'}`"
            ></v-icon>
          </template>
        </v-treeview>
      </v-card-text>
    </v-card>
    <div id="schema-table">
      <!-- 
        Initiating child UDC "SchemaTable" and passing to it list of
        table fields "passedSchema" to load and json of table attributes
        "passedHeaders" to show as headers.
       -->
    <SchemaTable  v-show="showFields" :parentSchema="passedSchema" :parentHeaders="passedHeaders"></SchemaTable>
    </div>
    
  </div>
</template>


<script>
  import SchemaTable from '@/components/SchemaTable'
  
  export default {
    components: { SchemaTable },
    data: () => ({
      passedHeaders:[],
      tableName: '',
      varTableName: '',
      showFields: false,
      passedSchema:[],
      treeResults: [],
      open: [1],
      search: null,
      active: '',
      language: ''
    }),
    // Trigger function before mounting the DOM of the page
    beforeMount(){
      this.loadTree()
  },    

    methods: {

      loadTree() {
      // Prepares search URI params according to request, including 
      // or excluding inactive tables.
      // Triggers "treeSearchHeb()" or "treeSearchEng()" according to
      // language selection.

      this.searchActiveOnly = (this.active == 'active' ? true : false)
      this.activeOnly = (this.searchActiveOnly ? '&activeOnly=true' : '&activeOnly=false')
      this.language === 'hebrew' ? this.treeSearchHeb() : this.treeSearchEng()

      },

      treeSearchEng() {
        // Initiates GET request to Spring API to access full list 
        // of subjects and its nested tableNames in English and saves
        // the results as json, applies active/inactive rule on results.

        this.$http.get('http://localhost:8080/fullSubjectTree?lang=en' + this.activeOnly).then(function(data) {  
          
          this.treeResults = data.body
        
        })

      },

      treeSearchHeb() {
        // Initiates GET request to Spring API to access full list 
        // of subjects and its nested tableNames in Hebrew and saves
        // the results as json, applies active/inactive rule on results.

        this.$http.get('http://localhost:8080/fullSubjectTree?lang=he' + this.activeOnly).then(function(data) {  
          
          this.treeResults = data.body

        })

      },

      getTableFields(varTableName) {
        // Initiates GET request to Spring API to access field list
        // of requested table by its tableName.
        // Loading UDC "TablesTable" at the bottom of the Tree element.
        // Active/inactive filter is not currently applied in this request.
        
        this.searchActiveOnly = (this.active == 'active' ? true : false)
        this.activeOnly = (this.searchActiveOnly ? '&activeOnly=true' : '&activeOnly=false')
        this.tableName = varTableName
        this.language === 'hebrew' ? this.getSchemaByHebTableName() : this.getSchemaByEngTableName()
        this.showFields = true
      
        

        // Initiates GET request to Spring API to access full list of table 
        // attributes using "tableName" as keyword to search in "Tablename" 
        // of "Tables" index of elastic search. Result is passed as json
        // to "passedHeaders" and used to represent header of the table.

        this.language === 'hebrew' ? this.getHeaderByHebTableName() : this.getHeaderByEngTableName()

        this.$http.get('http://localhost:8080/search/Tablename?query=' + this.tableName + '&inclTables=true' + '&inclFields=false' + '&activeOnly=false').then(function(data) {
          this.passedHeaders = data.body

        })

      },

      getSchemaByHebTableName() {

        this.$http.get('http://localhost:8080/getTableFieldsByHebtablename?tableName=' + this.tableName + this.activeOnly).then(function(data) {
        
          this.passedSchema = data.body

        })

      },

      getSchemaByEngTableName(){

        this.$http.get('http://localhost:8080/getTableFields?tableName=' + this.tableName + this.activeOnly).then(function(data) {
          
          this.passedSchema = data.body

        })
        
      },


      getHeaderByHebTableName() {

        this.$http.get('http://localhost:8080/search/Hebtablename?query=' + this.tableName + '&inclTables=true' + '&inclFields=false' + '&activeOnly=false').then(function(data) {
          
          this.passedHeaders = data.body

        })

      },


      getHeaderByEngTableName() {

        this.$http.get('http://localhost:8080/search/Tablename?query=' + this.tableName + '&inclTables=true' + '&inclFields=false' + '&activeOnly=false').then(function(data) {
          
          this.passedHeaders = data.body

        })

      },

    },
    
    // Applicating interactive filter on tree structure
    computed: {
      filter () {
        return this.activeOnly
          ? (item, search, textKey) => item[textKey].indexOf(search) > -1
          : undefined
      },

    }
    
  }
</script>