////////////////////////////////////////////////
// Schema Dictionary                          //
// Version 1.0.5                              //
// Release Date: 2020-04-20                   //
// Modified Date: 2020-04-20                  //
// Developed by Sergey Vikanov, MatrixBi ltd  //
// For Israel Ministry of Health.             //
// All rigths reserved © 2020.                //
////////////////////////////////////////////////

import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import FreeView from './views/FreeView.vue'
import TreeView from './views/TreeView.vue'
import SchemaView from './views/SchemaView.vue'
import AllTablesView from './views/AllTablesView.vue'
import D3NetworkView from './views/D3NetworkView.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/freeview',
      name: 'freeview',
      component: FreeView
    },
    {
      path: '/treeview',
      name: 'treeview',
      component: TreeView
    },
    {
      path: '/schemaview/:tableName',
      name: 'schemaview',
      component: SchemaView
    },
    {
      path: '/alltablesview',
      name: 'alltablesview',
      component: AllTablesView
    },
    {
      path: '/d3networkview',
      name: 'd3-net-example',
      component: D3NetworkView
    }
    

  ]
})
