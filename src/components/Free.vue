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
  User Defined Component (UDC) "Free" that 
 -->
  <div class="free">
  <h3  class="black--text display-2" dir="rtl">חיפוש לפי מילת מפתח</h3><br>
  <v-form method="get" id="searchForm" v-model="valid">
    <v-container>
      <v-layout row wrap>
          <v-flex xs3 md1>
            <v-checkbox dir="rtl"
              v-model="active"
              label="פעילים"
              value="active"
            ></v-checkbox>
          </v-flex>

          <v-flex xs3 md1>
            <v-checkbox dir="rtl"
              v-model="fields"
              label="שדות"
              value="fields"
            ></v-checkbox>
          </v-flex>

          <v-flex xs3 md1>
            <v-checkbox dir="rtl"
              v-model="tables"
              label="טבלאות"
              value="tables"
            ></v-checkbox>
          </v-flex>
              <v-spacer></v-spacer>
        <v-flex xs12 md8>
          <v-text-field reverse dir="auto" required v-model="searchField" id="searchField"
            @keyup.enter.native="freeSearch"
            outline
            clearable
            label="הזן ערך לחיפוש"
            type="text"
            :rules="inputRules"
          >
            <template v-slot:append>
              <v-fade-transition leave-absolute>
                <v-progress-circular
                  v-if="loading"
                  size="24"
                  color="info"
                  indeterminate
                ></v-progress-circular>
                <img v-else width="24" height="24" src="https://cdn.vuetifyjs.com/images/logos/v-alt.svg" alt="">
              </v-fade-transition>
            </template>
            <template v-slot:prepend>
              <v-menu 
                style="top: -12px"
                offset-y
              >
                <template v-slot:activator="{ on }">
                  <v-btn bottom large v-on="on" @click="freeSearch" :disabled="!valid">
                    <v-icon left>search</v-icon><b>
                    חיפוש
                  </b></v-btn>
                </template>
              </v-menu>
            </template>
          </v-text-field>
        </v-flex>



        

      </v-layout>
    </v-container>
    <v-layout>
      <v-flex mr-2>
          <v-card v-if="searchFields" v-show="showCR" color="grey lighten-2">
            <v-card-actions dir="rtl" primary-title>
              <div>
                <div class="headline">שדות ({{ results.fieldQty }})</div>
                <span class="grey--text">חיפוש בכל הקטגוריות של השדות</span>
              </div>
            </v-card-actions>
            <v-card-actions dir="rtl">
              <v-btn class="mx-2 font-weight-bold" @click="fieldNameFilter" :disabled="noFieldNameResults" color="light-blue darken-2" dir="rtl">שם שדה בלועזית ({{ results.fieldNameQty }})
                <v-icon left>filter_list</v-icon>
              </v-btn>
              <v-btn class="mx-2 font-weight-bold" @click="hebFieldNameFilter" :disabled="noFieldHebNameResults" dir="rtl" color="light-blue darken-2">שם שדה בעברית ({{ results.hebFieldNameQty }})
                <v-icon left>filter_list</v-icon>
              </v-btn>
              <v-btn class="mx-2 font-weight-bold" @click="fieldDescFilter" :disabled="noFieldDescResults" dir="rtl" color="light-blue darken-2">הסבר עסקי של שדה ({{ results.fieldDescQty }})
                <v-icon left>filter_list</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn :disabled="fieldsSaveEnabled" icon @click="saveFieldsToExcel">
                <export-excel
                  class   = "btn btn-default"
                  :data   = "json_fields_data"
                  :fields = "json_fields_header"
                  worksheet = "Fields"
                  name    = "fields.xls">
                </export-excel>
              </v-btn>
              <v-btn :disabled="fieldsPrintEnabled" icon @click="printPage">
                <v-icon>print</v-icon>
              </v-btn>
              <v-btn :disabled="noFieldsResults" icon @click="toggleFieldsTable">
                <v-icon>{{ showC ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
              </v-btn>
            </v-card-actions>
            <!-- <v-slide-y-transition> -->
              <v-card-text v-show="showC">
                <ColumnsTable :parentFields="passedFields"></ColumnsTable>
              </v-card-text>
            <!-- </v-slide-y-transition> -->
          </v-card>
        </v-flex>

          <v-flex ml-2>
          <v-card dir="rtl" v-if="searchTables" v-show="showTR" color="grey lighten-2">
            <v-card-actions dir="rtl" primary-title>
              <div>
                <div class="headline">טבלאות ({{ results.tableQty }})</div>
                <span class="grey--text">חיפוש בכל הקטגוריות של הטבלאות</span>
              </div>
            </v-card-actions>
            <v-card-actions dir="rtl">
              <v-btn light class="mx-2 font-weight-bold" @click="tableNameFilter" :disabled="noTableNameResults" dir="rtl" color="light-blue darken-2">שם טבלה בלועזית ({{ results.tableNameQty }})
                <v-icon left>filter_list</v-icon>
              </v-btn>
              <v-btn light class="mx-2 font-weight-bold" @click="hebTableNameFilter" :disabled="noTableHebNameResults"  dir="rtl" color="light-blue darken-2">שם טבלה בעברית ({{ results.hebTableNameQty }})
                <v-icon left>filter_list</v-icon>
              </v-btn>
              <v-btn light class="mx-2 font-weight-bold" @click="tableDescFilter" :disabled="noTableDescResults"  dir="rtl" color="light-blue darken-2">הסבר עסקי של הטבלה ({{ results.tableDescQty }})
                <v-icon left>filter_list</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn :disabled="tablesSaveEnabled" icon @click="saveTablesToExcel">
                <export-excel
                  class   = "btn btn-default"
                  :data   = "json_tables_data"
                  :fields = "json_tables_header"
                  worksheet = "Tables"
                  name    = "tables.xls">
                </export-excel>
              </v-btn>
              <v-btn :disabled="tablesPrintEnabled" icon @click="printPage">
                <v-icon>print</v-icon>
              </v-btn>
              <v-btn :disabled="noTablesResults" icon @click="toggleTablesTable">
                <v-icon>{{ showT ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
              </v-btn>
            </v-card-actions>
            <!-- <v-slide-y-transition> -->
              <v-card-text v-show="showT">
                <TablesTable :parentTables="passedTables"></TablesTable>
              </v-card-text>
            <!-- </v-slide-y-transition> -->
          </v-card>
        </v-flex>
    </v-layout>
    
  </v-form>
  
  </div>
</template>

<script>
  import TablesTable from '@/components/TablesTable'
  import ColumnsTable from '@/components/ColumnsTable'

  export default {
    components: { TablesTable, ColumnsTable },

    data() {
      return {
        
        searchField: '',
        results: [],
        passedTables:[],
        passedFields:[],
        inputRules: [
          (v) => !!v || 'הזן ערך כל שהו לחיפוש',
          (v) => v && v.length >= 1 || 'הזן לפחות תו אחד לחיפוש'
        ],

        // Print and save interactions
        tablesSaveEnabled: true,
        tablesPrintEnabled: true,
        fieldsSaveEnabled: true,
        fieldsPrintEnabled: true,

        // Checkbox interactions
        searchFields: true,
        searchTables: true,

        // Resultative search indicatives
        noFieldsResults: true,
        noFieldNameResults: true,
        noFieldHebNameResults: true,
        noFieldDescResults: true,
        noTablesResults: true,
        noTableNameResults: true,
        noTableHebNameResults: true,
        noTableDescResults: true,

        // Input validation
        valid: false,
        // Search progress bar
        loading: false,
        // Changing appearance on selecting between results mods
        showTR: true,
        showCR: true,
        showT: false,
        showC: false,
        fields: 'fields',
        tables: 'tables',
        active: '',
      
        json_tables_header: {

            'Tableid': 'Tableid',
            'Tablename': 'Tablename',
            'Hebtablename': 'Hebtablename',
            'Tabledesc': 'Tabledesc',
            'Subject': 'Subject',
            'Tablecontent': 'Tablecontent',
            'Businessowner': 'Businessowner',
            'Itowner': 'Itowner',
            'Dataupdfreq': 'Dataupdfreq',
            'Datayears': 'Datayears',
            'Tablestatus': 'Tablestatus'

        },

        json_tables_data: [],
        json_tables_meta: [
            [
                {
                    'key': 'charset',
                    'value': 'utf-8'
                }
            ]
        ],

        json_fields_header: {

            'Fieldid': 'Fieldid',
            'Fieldname': 'Fieldname',
            'Hebfieldname': 'Hebfieldname',
            'Fielddesc': 'Fielddesc',
            'Key': 'Key',
            'Isnullable': 'Isnullable',
            'Type': 'Type',
            'Length': 'Length',
            'Fieldstatus': 'Fieldstatus',
            'Tablename': 'Tablename'

        },

        json_fields_data: [],
        json_fields_meta: [
            [
                {
                    'key': 'charset',
                    'value': 'utf-8'
                }
            ]
        ],

      }

    },
    
  

    created() {
// does the browser support the Navigation Timing API?
if (window.performance) {
  console.info("window.performance is supported");
}

// do something based on the navigation type...
switch(performance.navigation.type) {
  case 0:
    console.info("TYPE_NAVIGATE");
    break;
  case 1:
    console.info("TYPE_RELOAD");
    break;
  case 2:
    console.info("TYPE_BACK_FORWARD");
    break;
  case 255:
    console.info("255");
    break;
}

      
      this.searchField = (this.$cookie.get('backToSearch') != undefined) ? this.$cookie.get('backToSearch') : ''
      this.freeSearch()
      
      },

    methods: {

      printPage() {
        window.print();
      },

      saveTablesToExcel() {

        this.json_tables_data = this.passedTables
      },

      saveFieldsToExcel() {

        this.json_fields_data = this.passedFields
      },


      freeSearch () {
        // Function that initiates search in elastic search indexes according to
        // chosen options: "Tables", "Columns" or "Tables&Columns". Minimum chars
        // for search is 1. Search is activated by pressing on search button.
        // In addition search keyword is saved in koockies of "freeview" page.
        // v-card with results is expandable by clicking on arrow down inside.
        // By navigation from "schemaview" back to "freeview", "freeSearch" function
        // is activated using keyword saved previously in coockies.

        this.$cookie.set('backToSearch', this.searchField, 1);
        // Selecting Tables or Fields results to be shown on checkbox select
        this.searchFields = (this.fields == 'fields' ? true : false)
        this.searchTables = (this.tables == 'tables' ? true : false)
        this.searchActiveOnly = (this.active == 'active' ? true : false)

        // Reading user input and sending GET request
        this.searchParam = this.searchField
        this.inclFields = (this.searchFields ? '&inclFields=true' : '&inclFields=false')
        this.inclTables = (this.searchTables ? '&inclTables=true' : '&inclTables=false')
        this.activeOnly = (this.searchActiveOnly ? '&activeOnly=true' : '&activeOnly=false')
        this.loading = true
        this.$http.get('http://localhost:8080/search?query=' + this.searchParam + this.inclFields + this.inclTables + this.activeOnly).then(function(data) {

          // Displaying Search statistics
          this.results = data.body
          // Discreting Tables data
          this.passedTables = data.body.tables
          // Discreting Fields data
          this.passedFields = data.body.fields

          // Enabling or disabling advanced filtering in results depending on number results
          this.noFieldsResults = (this.results.fieldQty > 0 ? false : true)
          this.noFieldNameResults = (this.results.fieldNameQty > 0 ? false : true)
          this.noFieldHebNameResults = (this.results.hebFieldNameQty > 0 ? false : true)
          this.noFieldDescResults = (this.results.fieldDescQty > 0 ? false : true)
          this.noTablesResults = (this.results.tableQty > 0 ? false : true)
          this.noTableNameResults = (this.results.tableNameQty > 0 ? false : true)
          this.noTableHebNameResults = (this.results.hebTableNameQty > 0 ? false : true)
          this.noTableDescResults = (this.results.tableDescQty > 0 ? false : true)
          
          
        })

        // Roll up all open search result windows
        this.showT=(this.tables == 'tables' && this.fields == null ? true : false)
        this.showC=(this.fields == 'fields' && this.tables == null ? true : false)

        this.showTR=true
        this.showCR=true

        //Enable or disable Tables print and save buttons
        this.tablesPrintEnabled = (this.tables == 'tables' && this.fields == null ? false : true)
        this.tablesSaveEnabled = (this.tables == 'tables' && this.fields == null ? false : true)
        //Enable or disable Fields print and save buttons
        this.fieldsPrintEnabled = (this.fields == 'fields' && this.tables == null ? false : true)
        this.fieldsSaveEnabled = (this.fields == 'fields' && this.tables == null ? false : true)        

        //this.message = 'מבצע חיפוש..........'
      setTimeout(() => {
          this.loading = false
          //this.message = 'החיפוש הסתיים!'
        }, 2000)
      },

      toggleFieldsTable() {

        this.showC = !this.showC, this.showTR=!this.showTR
        this.toolMenu()

      },

      toggleTablesTable() {

        this.showT = !this.showT, this.showCR=!this.showCR
        this.toolMenu()
      },


      toggleFieldsFilter() {

        //Enable or disable Fields print and save buttons when toggling different Fields filter buttons 
        this.fieldsPrintEnabled = (this.results.fieldQty  ? false : true)
        this.fieldsSaveEnabled = (this.results.fieldQty  ? false : true)

      },
      
      toggleTablesFilter() {
        
        // Enable or disable Tables print and save buttons when toggling different Tables filter buttons 
        this.tablesPrintEnabled = (this.results.tableQty ? false : true)
        this.tablesSaveEnabled = (this.results.tableQty  ? false : true)

      },

      toolMenu() {

          // Enable or disable Tables print and save buttons
          this.tablesPrintEnabled = (this.results.tableQty && this.showT ? false : true)
          this.tablesSaveEnabled = (this.results.tableQty && this.showT ? false : true)
          //Enable or disable Fields print and save buttons
          this.fieldsPrintEnabled = (this.results.fieldQty && this.showC ? false : true)
          this.fieldsSaveEnabled = (this.results.fieldQty && this.showC ? false : true)

      },

      hebFieldNameFilter(){
        // Takes user input from input search form on filter button pressed down.
        // Initiates GET request to Spring API server to retrieve data by
        // searching keyword in "Hebfieldname" of "Columns" index of elastic search.
        // support active/inactive status filtering checkbox.

        this.searchParam = this.searchField
        this.activeOnly = (this.searchActiveOnly ? '&activeOnly=true' : '&activeOnly=false')
        this.$http.get('http://localhost:8080/search/Hebfieldname?query=' + this.searchParam + '&inclTables=false' + '&inclFields=true' + this.activeOnly).then(function(data) {

          // Discreting results with hebFieldName filtered occurence
          this.passedFields = data.body
          this.showC = true 
          this.showTR = false
        })

        this.toggleFieldsFilter()
      },

      fieldDescFilter(){
        // Takes user input from input search form on filter button pressed down.
        // Initiates GET request to Spring API server to retrieve data by
        // searching keyword in "Fielddesc" of "Columns" index of elastic search.
        // support active/inactive status filtering checkbox.

        this.searchParam = this.searchField
        this.activeOnly = (this.searchActiveOnly ? '&activeOnly=true' : '&activeOnly=false')
        this.$http.get('http://localhost:8080/search/Fielddesc?query=' + this.searchParam + '&inclTables=false' + '&inclFields=true' + this.activeOnly).then(function(data) {

          // Discreting results with fieldDesc filtered occurence
          this.passedFields = data.body
          this.showC = true 
          this.showTR = false
        })

        this.toggleFieldsFilter()
      },

      fieldNameFilter(){
        // Takes user input from input search form on filter button pressed down.
        // Initiates GET request to Spring API server to retrieve data by
        // searching keyword in "Fieldname" of "Columns" index of elastic search.
        // support active/inactive status filtering checkbox.

        this.searchParam = this.searchField
        this.activeOnly = (this.searchActiveOnly ? '&activeOnly=true' : '&activeOnly=false')
        this.$http.get('http://localhost:8080/search/Fieldname?query=' + this.searchParam + '&inclTables=false' + '&inclFields=true' + this.activeOnly).then(function(data) {

          // Discreting results with fieldName filtered occurence
          this.passedFields = data.body
          this.showC = true 
          this.showTR = false
        })

        this.toggleFieldsFilter()
      },

      tableNameFilter(){
        // Takes user input from input search form on filter button pressed down.
        // Initiates GET request to Spring API server to retrieve data by
        // searching keyword in "Tablename" of "Tables" index of elastic search.
        // support active/inactive status filtering checkbox.

        this.searchParam = this.searchField
        this.activeOnly = (this.searchActiveOnly ? '&activeOnly=true' : '&activeOnly=false')
        this.$http.get('http://localhost:8080/search/Tablename?query=' + this.searchParam + '&inclTables=true' + '&inclFields=false' + this.activeOnly).then(function(data) {

          // Discreting results with tableName filtered occurence
          this.passedTables = data.body
          this.showT = true
          this.showCR = false
        })

        this.toggleTablesFilter()
      },

      hebTableNameFilter(){
        // Takes user input from input search form on filter button pressed down.
        // Initiates GET request to Spring API server to retrieve data by
        // searching keyword in "Hebtablename" of "Tables" index of elastic search.
        // support active/inactive status filtering checkbox.

        this.searchParam = this.searchField
        this.activeOnly = (this.searchActiveOnly ? '&activeOnly=true' : '&activeOnly=false')
        this.$http.get('http://localhost:8080/search/Hebtablename?query=' + this.searchParam + '&inclTables=true' + '&inclFields=false' + this.activeOnly).then(function(data) {

          // Discreting results with hebTableName filtered occurence
          this.passedTables = data.body
          this.showT = true
          this.showCR = false
        })

        this.toggleTablesFilter()
      },

      tableDescFilter(){
        // Takes user input from input search form on filter button pressed down.
        // Initiates GET request to Spring API server to retrieve data by
        // searching keyword in "Tabledesc" of "Tables" index of elastic search.
        // support active/inactive status filtering checkbox.

        this.searchParam = this.searchField
        this.activeOnly = (this.searchActiveOnly ? '&activeOnly=true' : '&activeOnly=false')
        this.$http.get('http://localhost:8080/search/Tabledesc?query=' + this.searchParam + '&inclTables=true' + '&inclFields=false' + this.activeOnly).then(function(data) {

          // Discreting results with tableDesc filtered occurence
          this.passedTables = data.body
          this.showT = true
          this.showCR = false
        })

        this.toggleTablesFilter()
      }

    }
  }
</script>