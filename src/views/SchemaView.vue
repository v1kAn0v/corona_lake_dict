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
    The view contains User Defined Conponent (UDC) "SchemaTable" with full 
    schema of requested table and all of its requisits represented as table.
    Can be accessed by clicking on one of the tablenames in fields/tables 
    results or by typing in browser http://{{app-host}}:8080/schemaview/{{TableName}}
   -->
  <div class="schemaview" id="scrolling-up">
    <!-- 
      Calls saveSchemaToExcel function
     -->
    <v-btn  icon @click="saveSchemaToExcel">
      <export-excel
        class     = "btn btn-default"
        :data     = "json_data"
        :fields   = "json_fields"
        worksheet = "Schema"
        name      = "schema.xls">
      </export-excel>
    </v-btn>
    <!-- 
      Calls to printPage function
     -->
    <v-btn  icon @click="printPage">
      <v-icon>print</v-icon>
    </v-btn>
    <!-- 
      Calls navigation fuction
     -->
    <v-btn  icon @click="navigate">
      <v-icon>reply</v-icon>
    </v-btn>
    <!-- 
      Initiating child UDC "SchemaTable". Passing to child list "passedSchema" 
     that contains all fields of requested table and all field requisits, 
     Passing to child list "passedHeaders" that contains all table attributes
     to represent as headers on top of the table representation of the fields.
     -->
    <SchemaTable :parentSchema="passedSchema" :parentHeaders="passedHeaders"></SchemaTable>
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
import SchemaTable from '@/components/SchemaTable'
import router from '../router'

export default {

  name: 'schemaview',

  components: { SchemaTable } ,
  data() {
    return {
      passedHeaders:[],
      passedSchema: [],
      schemaFields:[],
        // Table headers declaration
        json_fields: {
            'Fieldid': 'Fieldid',
            'Tablename': 'Tablename',
            'Key': 'Key',
            'Fieldname': 'Fieldname',
            'Hebfieldname': 'Hebfieldname',
            'Isnullable': 'Isnullable',
            'Type': 'Type',
            'Length': 'Length',
            'Fielddesc': 'Fielddesc',
            'Fieldstatus': 'Fieldstatus'

        },
        json_data: [],
        json_meta: [
            [
                {
                    'key': 'charset',
                    'value': 'utf-8'
                }
            ]
        ],
    }
  },

  methods: {

    // Navigates to the search results, search keyword is saved by coockies,
    // Initiates search by triggering search button.tables and fields 
    // panels with search results are colapsed. Expandable on click.  
    navigate() {
        router.go(-1);
    },

    // Send the page view to the print preview to print. 
    //   - Use "portrait perspective" for tall tables.
    //   - Use "landscape perspective" for wide tables.
    //   - Use "send to Pdf" to save in pdf format.
    printPage() {
      window.print();
    },
    
  // Initiates GET request to Spring API to access json with full list of fields.
  // Export results to excel file and download it on the client's side by the browser.
  saveSchemaToExcel() {

    this.tableName = this.$route.params.tableName
    this.$http.get('http://localhost:8080/getTableFields?tableName=' + this.tableName).then(function(data) {
      this.json_data = data.body
      })

    }
    
  },

}
</script>