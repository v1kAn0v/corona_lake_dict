<template>  
  
    <nav>            
  
    <v-toolbar flat height="90" app>
        <v-layout column ml-0>
            
            <v-layout >
                <v-btn flat color="gray" href="/" target="_parent">
                    <span>יציאה</span>
                    <v-icon right>exit_to_app</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <div dir="rtl">
            <img class="down" height="80" width="524" src="@/assets/shaamLogo/moh-logo.png"></div>

                
                <v-layout row align-center reverse>
                    <v-toolbar-side-icon class="grey--text" @click="drawer = !drawer"></v-toolbar-side-icon>
                    <v-toolbar-title class="text-uppercase grey--text fontSize">
                        <span class="font-weight-light">מילון</span>
                        <span> נתונים</span>
                    </v-toolbar-title>
                </v-layout>

            </v-layout>
        </v-layout>
        </v-toolbar>

        <v-navigation-drawer app v-model="drawer" class="indigo" right>
            <v-list>
                <v-list-tile v-for="link in links" :key="link.text" router :to="link.route" @click="loadPerspective">
                    <v-list-tile-action>
                        <v-icon class="white--text">{{link.icon}}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title class="white--text">{{link.text}}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                </v-list>
        </v-navigation-drawer>
   
    </nav>
</template>

             
<script>
export default {
    data() {
        return {
        drawer: true,
        links: [
            {icon: 'home', text: 'מסך ראשי', route: '/', tree_visibility: 'false'},
            {icon: 'search', text: 'חיפוש לפי מילת מפתח', route: '/freeview'},
            {icon: 'format_list_bulleted', text: 'חיפוש בעץ נושאים', route: '/treeview'},
            {icon: 'description', text: 'רשימת כל הטבלאות', route: '/alltablesview'}
            //{icon: 'network', text: 'קשרים', route: '/d3networkview'}
        ]
        }
    },
    
    methods: {

        loadPerspective() {
            
            this.drawer=!this.drawer
            this.$cookie.delete('backToSearch')

        }

    }
}
</script>
<style scoped>
.fontSize{
    font-size: 16px;
};
/* .down{
    margin-top: -64px;
} */
</style>

