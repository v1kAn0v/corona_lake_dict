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
      Child User Defined Component (UDC) "TableTables" contains all search results
      according to requested keyword found in "Tables" index of elastic search. 
      Results are passed from parent UDC "Free" as list of objects - each object 
      is a search result. All results have v-data-table representation. The UDC is 
      nested in v-card and have expanded or collapsed view according to perspective
      selected in search results check box.
     -->
    <div class="tablestable"> 
      <v-card max-width=2500
        title="רשימת הטבלאות הכוללות מילת חיפוש"
        text="רשימת הטבלאות הכוללות מילת חיפוש"
      >
        <!-- 
        Results are passed from parent component as list of objects "parentTables".
        The table is filled out by iteration over "items" in "parentTables".
        Each attribute of the item is a different field value in table according to
        its row and column. 
        The headers of the table are predefined in list "headers" and applied as 
        header.text
       -->
        <v-data-table class="elevation-12" dir="rtl"
          :headers="headers"
          :items="parentTables"
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
          "item" is a "Tables" search result, it has its own attributes that 
          correspond to table header name, for example item.Tablename. Some fields 
          of table has router link to "shemaview" that contains child UDC "SchemaTable",
          there table schema will be represented according to chosen table field.
          -->
          <template
            slot="items"
            slot-scope="{ item }"
          >
            <td  dir="auto" class="text-xs-center">{{ item.Tableid }}</td>
            <!-- 
              While linkig to "schemaview", "tableName" string parameter is passed to child UDC "SchemaTable"
            -->
            <td dir="auto" ><router-link :to="{ name: 'schemaview', params: {tableName: item.Tablename }}">{{ item.Tablename }}</router-link></td>
            <td dir="auto">{{ item.Hebtablename }}</td>
            <td style="width:40%" dir="auto">{{ item.Tabledesc }}</td>
            <td dir="auto">{{ item.Subject }}</td>
            <td dir="auto">{{ item.Tablecontent }}</td>
            <td dir="auto">{{ item.Businessowner }}</td>
            <td dir="auto">{{ item.Itowner }}</td>
            <td dir="auto">{{ item.Dataupdfreq }}</td>
            <td dir="auto">{{ item.Datayears }}</td>
            <td dir="auto" class="text-xs-center">{{ item.Tablestatus }}</td>
          </template>
        </v-data-table>
      </v-card>

</div>
</template>

<script>

export default{

  name: 'TablesTable',
  props: {
    parentTables: { 
      required: true,
      type: Array, 
    }
  },

  data() {
    return {
      // Predefined list of headers of the table
      headers: [
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
              text: 'שם טבלה בעברית',
              value: 'Hebtablename',
              align: 'center'
            },
            {
              sortable: true,
              text: 'תיאור טבלה',
              value: 'Tabledesc',
              align: 'center'
            },
            {
              sortable: true,
              text: 'מקור נתונים',
              value: 'Subject',
              align: 'center'
            },
            {
              sortable: true,
              text: 'רמת רשומה',
              value: 'Tablecontent',
              align: 'center'
            },
            {
              sortable: true,
              text: 'תדירות עדכון',
              value: 'Businessowner',
              align: 'center'
            },
            {
              sortable: true,
              text: 'סוג נתונים',
              value: 'Itowner',
              align: 'center'
            },
                  {
              sortable: true,
              text: 'אוכלוסיה',
              value: 'Dataupdfreq',
              align: 'center'
            },
            {
              sortable: true,
              text: 'חלון זמן',
              value: 'Datayears',
              align: 'center'
            },
                        {
              sortable: true,
              text: 'מפתח',
              value: 'Dataessence',
              align: 'center'
            },
            {
              sortable: true,
              text: 'הערות',
              value: 'Tablestatus',
              align: 'center'
            }

          ],
          // Table content is built from list "items", which passed as 
          // list "parentTables" from parent component "Free".
          items: [],
      }
  }
}
</script>