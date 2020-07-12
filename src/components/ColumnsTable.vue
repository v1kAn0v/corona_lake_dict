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
    Child User Defined Component (UDC) "ColumnTables" contains all search results
    according to requested keyword found in "Columns" index of elastic search. 
    Results are passed from parent UDC "Free" as list of objects - each object 
    is a search result. All results have v-data-table representation. The UDC is 
    nested in v-card and have expanded or collapsed view according to perspective
    selected in search results check box.
  -->
  <div class="columnstable"> 
    <v-card 
      title="רשימת השדות הכוללים מילת חיפוש מבוקשת"
      text="רשימת השדות הכוללים מילת חיפוש מבוקשת"
    >
      <!-- 
        Results are passed from parent component as list of objects "parentFields".
        The table is filled out by iteration over "items" in "parentFields".
        Each attribute of the item is a different field value in table according to
        its row and column. 
        The headers of the table are predefined in list "headers" and applied as 
        header.text
       -->
      <v-data-table class="elevation-12" dir="rtl"
        :headers="headers"
        :items="parentFields"
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
          Filling v-table fields with values according to v-table column names. Each
          "item" is a "Columns" search result, it has its own attributes that 
          correspond to table header name, for example item.Fieldname. Some fields 
          of table has router link to "shemaview" that contains child UDC "SchemaTable",
          there table schema will be represented according to chosen table field.
          -->
        <template slot="items" slot-scope="{ item }">
          <td  dir="auto" class="text-xs-center">{{ item.Fieldid }}</td>
          <td dir="auto">{{ item.Tableid }}</td>
          <!-- 
            While linkig to "schemaview", "tableName" string parameter is passed to child UDC "SchemaTable"
           -->
          <td dir="auto" class="text-xs-center"><router-link :to="{ name: 'schemaview', params: {tableName: item.Tablename }}">{{ item.Tablename }}</router-link></td>
          <td dir="auto" class="text-xs-center">{{ item.Key }}</td>
          <td dir="auto" class="text-xs-center">{{ item.Fieldname }}</td>
          <td dir="auto">{{ item.Hebfieldname }}</td>
          <td dir="auto" class="text-xs-center">{{ item.Isnullable }}</td>
          <td dir="auto" class="text-xs-center">{{ item.Type }}</td>
           <td dir="auto">{{ item.Fielddesc }}</td>
          <td dir="auto" class="text-xs-center">{{ item.Fieldstatus }}</td>
        </template>
      </v-data-table>
    </v-card>

</div>
</template>

<script>

export default{

  name: 'ColumnsTable',
  
  props: {
    parentFields: {
      type: Array,
      required: true
    }
  },
  
  data() {
    return {
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
          text: 'מזהה טבלה',
          value: 'Tableid',
          align: 'center'
        },
        {
          sortable: true,
          text: 'שם טבלה',
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
          text: 'מידע נוסף',
          value: 'Isnullable',
          align: 'center'
        },
        {
          sortable: true,
          text: 'סוג נתונים בשדה',
          value: 'Type',
          align: 'center'
        },
        {
          sortable: true,
          text: 'תאור שדה',
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
      // Table content is built from list "items", which passed as 
      // list "parentFields" from parent component "Free".
      items: []
    }
  }
}
</script>