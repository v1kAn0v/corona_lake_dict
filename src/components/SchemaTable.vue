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
      Child User Defined Component (UDC) "SchemaTables" contains all table fields
      according to selected TableName in UDCs "TablesTable" or "ColumnsTable". 
      Results are passed from parent UDCs "TablesTable" or "ColumnsTable" as list
      of objects - each object is different name in schema and has all field attributes.
      All results have v-data-table representation. The UDC is nested under
      "schemaview". Above the schema table division of headers is allocated. The headers
      list full table discription based on requested table's attributes found in 
      "Tables" index of elastic search.
      
     -->
    <div class="schematable"> 
      <v-card 
        color="grey lighten-1"
        title="רשימת השדות של הטבלה המבוקשת"
        text="רשימת השדות של הטבלה המבוקשת"
      > 
        <!-- 
          Headers section
         -->
        <v-container>
          <!-- 
            If parameters were passed from parent UDC "TablesTable" or "ColumnsTable"
            headers filled out from "tableHeaders" JSON otherwise, parent component 
            is "AllTablesView" and parameters are filled out from "parentHeaders[0]"
          -->
          <v-layout>
            <v-flex xs12>
              <div dir="rtl">
                <v-container fluid ma-0 pa-0>
                  <v-layout mb-3>
                    <v-flex lg4>
                      <h3><span class="font-weight-bold">שם טבלה: {{this.tableHeaders !== undefined ? this.tableHeaders.Tablename : this.parentHeaders[0].Tablename}}</span></h3>
                    </v-flex>
                    <v-flex lg2>
                      <h3><span class="font-weight-bold">שם טבלה עברי: {{ this.tableHeaders !== undefined ? this.tableHeaders.Hebtablename : this.parentHeaders[0].Hebtablename}}</span></h3>
                    </v-flex>
                    <v-flex lg2>
                      <h3><span class="font-weight-bold">מזהה טבלה: {{this.tableHeaders !== undefined ? this.tableHeaders.Tableid : this.parentHeaders[0].Tableid}}</span></h3>
                    </v-flex>
                    <v-flex lg2>
                    <h3><span class="font-weight-bold">נושא: {{this.tableHeaders !== undefined ? this.tableHeaders.Subject : this.parentHeaders[0].Subject}}</span></h3>
                    </v-flex>
                  </v-layout>

                  <v-layout mt-3>
                    <v-flex lg6>
                      <v-layout column>
                          <v-layout row>  
                            <v-flex lg3>
                              <span class="font-weight-bold">תכולת הטבלה: </span>
                            </v-flex>
                            <v-flex lg3>
                              <span>{{this.tableHeaders !== undefined ? this.tableHeaders.Tablecontent : this.parentHeaders[0].Tablecontent}}</span>
                            </v-flex>
                          </v-layout>
                          <v-layout row>
                            <v-flex lg3>
                              <span class="font-weight-bold">נתונים מתייחסים לשנים: </span>
                            </v-flex>
                            <v-flex lg3>
                              <span>{{this.tableHeaders !== undefined ? this.tableHeaders.Datayears : this.parentHeaders[0].Datayears}}</span>
                            </v-flex>
                          </v-layout>
                          <v-layout row>
                            <v-flex lg3>
                              <span class="font-weight-bold">סטטוס טבלה: </span>
                            </v-flex>
                            <v-flex lg3>
                              <span>{{this.tableHeaders !== undefined ? this.tableHeaders.Tablestatus : this.parentHeaders[0].Tablestatus}}</span>
                            </v-flex>
                          </v-layout>
                      </v-layout>
                    </v-flex>

                    <v-flex lg6>
                      <v-layout column>
                          <v-layout row>  
                            <v-flex lg3>
                              <span class="font-weight-bold">מאפיין 1: </span>
                            </v-flex>
                            <v-flex lg3>
                              <span>{{this.tableHeaders !== undefined ? this.tableHeaders.Itowner : this.parentHeaders[0].Itowner}}</span>
                            </v-flex>
                          </v-layout>
                          <v-layout row>
                            <v-flex lg3>
                              <span class="font-weight-bold">מאפיין 2: </span>
                            </v-flex>
                            <v-flex lg3>
                              <span>{{this.tableHeaders !== undefined ? this.tableHeaders.Businessowner : this.parentHeaders[0].Businessowner}}</span>
                            </v-flex>
                          </v-layout>
                          <v-layout row>
                            <v-flex lg3>
                              <span class="font-weight-bold">תדירות עדכון: </span>
                            </v-flex>
                            <v-flex lg3>
                              <span>{{this.tableHeaders !== undefined ? this.tableHeaders.Dataupdfreq : this.parentHeaders[0].Dataupdfreq}}</span>
                            </v-flex>
                          </v-layout>
                      </v-layout>
                    </v-flex>
                    <v-flex lg6>
                      <span class="font-weight-bold">הסבר עסקי של טבלה: </span><span>{{this.tableHeaders !== undefined ? this.tableHeaders.Tabledesc : this.parentHeaders[0].Tabledesc}}</span>
                    </v-flex>
                  </v-layout>
                </v-container>
              </div>
            </v-flex>
          </v-layout>
        </v-container>

        <!-- 
          Filling v-table fields with values according to v-table column names. Each
          "item" is eather "parentSchema" list and fields are passed from parent UDC
          "AllTablesView", or "schemaFields" list and fields are passed from parent UDCs
          "TablesTable" or "ColumnsTable".
          The headers of the table are predefined in list "headers" and applied as 
          header.text
          -->
        <v-data-table class="elevation-12" dir="rtl"
          :headers="headers"
          :items="this.tableName === undefined ? parentSchema : this.schemaFields"
          hide-actions
        >
          <template
            slot="headerCell"
            slot-scope="{ header }"
          >
            <span
              class="subheading font-weight-bold text-success text--darken-3"
              v-text="header.text"
            />
          </template>
          <!-- 
            The table is filled out by iteration over "items" in "parentschema"
            or "schemaFields".
           -->
          <template
            slot="items"
            slot-scope="{ item }"
          >
            <td  dir="auto" class="text-xs-center">{{ item.Fieldid }}</td>
            <td dir="auto" >{{ item.Tablename }}</td>
            <td dir="auto" class="text-xs-center">{{ item.Key }}</td>
            <td dir="auto">{{ item.Fieldname }}</td>
            <td dir="auto">{{ item.Hebfieldname }}</td>
            <td dir="auto" class="text-xs-center">{{ item.Isnullable }}</td>
            <td dir="auto">{{ item.Type }}</td>
            <td dir="auto" class="text-xs-center">{{ item.Length }}</td>
            <td dir="auto">{{ item.Fielddesc }}</td>
            <td dir="auto" class="text-xs-center">{{ item.Fieldstatus }}</td>
          </template>
        </v-data-table>
      </v-card>

</div>
</template>

<script>

export default{

  name: 'schematable',

  props: {
    parentSchema: {
      type: Array,
      required: true
    },
    parentHeaders: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      schemaFields: [],
      tableName: '',
      tableHeaders:[],
      
      // Predefined list of headers of the table
      headers: [
      {
        sortable: true,
        text: 'מזהה שדה',
        value: 'Fieldid',
        align: 'center'
      },
      {
        sortable: true,
        text: 'שם טבלה ',
        value: 'Tablename',
        align: 'center'
      },
      {
        sortable: true,
        text: 'מפתח',
        value: 'Key',
        align: 'center'
      },
      {
        sortable: true,
        text: 'שם שדה',
        value: 'Fieldname',
        align: 'center'
      },
      {
        sortable: true,
        text: 'שם שדה בעברית',
        value: 'Hebfieldname',
        align: 'center'
      },
      {
        sortable: true,
        text: 'יכול לקבל ערך NULL',
        value: 'Isnullable',
        align: 'center'
      },
      {
        sortable: true,
        text: 'סוג השדה',
        value: 'Type',
        align: 'center'
      },
      {
        sortable: true,
        text: 'אורך השדה',
        value: 'Length',
        align: 'center'
      },
            {
        sortable: true,
        text: 'תיאור שדה',
        value: 'Fielddesc',
        align: 'center'
      },
      {
        sortable: true,
        text: 'סטטוס שדה',
        value: 'Fieldstatus',
        align: 'center'
      }
      ],
      items: []
    }
  },
  
      computed: {
      layoutAttributes () {
        return {
          [this.alignment]: true,
          [this.justify]: true,
          [this.flexDirection]: true,
          reverse: this.reverse,
          'fill-height': this.fillHeight
        }
      }
    },
  // Trigger function before mounting the DOM of the page
  beforeMount(){
    this.loadSchema()
  },    
  // Retrieving tableName from URI of the page on loading
  created() {
    this.tableName = this.$route.params.tableName

  },
  
  methods: {
    loadSchema() {
      // Initiates GET request to Spring API to access full list of fields.
      // Saves the results in "schemaFields" list.
      // Initiates GET request to Spring API using tableName to get json with
      // table attributes to fill out headers above the table when parent UDC
      // is one of "TablesTable" or "ColumnsTable" UDCs.
      // Saves the results in "tableHeaders" json.

      this.$http.get('http://localhost:8080/getTableFields?tableName=' + this.tableName).then(function(data) {
          this.schemaFields = data.body
          
      })
       // 
       this.$http.get('http://localhost:8080/search/Tablename?query=' + this.tableName + '&inclTables=true' + '&inclFields=false' + '&activeOnly=false').then(function(data) {
          this.tableHeaders = data.body[0]

      })

    },


    
  }
}
</script>