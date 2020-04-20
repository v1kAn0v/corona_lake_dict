<template>
<v-container class="align-center">
  <v-layout>
    <v-flex offset-3>
      <v-card v-show="showTR">
        <v-card-title dir="rtl" primary-title>
          <div>
            <div class="headline">טבלאות</div>
            <span class="grey--text">חיפוש בכל הקטגוריות של הטבלאות</span>
          </div>
        </v-card-title>

        <v-card-actions dir="rtl">
          <v-btn flat dir="rtl">שם טבלה בלועזית</v-btn>
          <v-btn flat dir="rtl" color="purple">שם טבלה בעברית</v-btn>
          <v-btn flat dir="rtl" color="indigo">הסבר עסקי של הטבלה</v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click="showT = !showT, showCR=!showCR">
            <v-icon>{{ showT ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-slide-y-transition>
          <v-card-text v-show="showT">
            <TablesTable></TablesTable>
          </v-card-text>
        </v-slide-y-transition>
      </v-card>
    </v-flex>
    <v-flex offset-sm3>
      <v-card v-show="showCR">
        <v-card-title dir="rtl" primary-title>
          <div>
            <div class="headline">שדות</div>
            <span class="grey--text">חיפוש בכל הקטגוריות של השדות</span>
          </div>
        </v-card-title>

        <v-card-actions dir="rtl">
          <v-btn flat dir="rtl">שם שדה בלועזית</v-btn>
          <v-btn flat dir="rtl" color="purple">שם שדה בעברית</v-btn>
          <v-btn flat dir="rtl" color="indigo">הסבר עסקי של שדה</v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click="showC = !showC, showTR=!showTR">
            <v-icon>{{ showC ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-slide-y-transition>
          <v-card-text v-show="showC">
            <ColumnsTable></ColumnsTable>
          </v-card-text>
        </v-slide-y-transition>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import TablesTable from '@/components/TablesTable'
import ColumnsTable from '@/components/ColumnsTable'

  export default {
  components: { TablesTable, ColumnsTable},
    data: () => ({
      showTR: true,
      showCR: true,
      showT: false,
      showC: false
    })
  }
</script>