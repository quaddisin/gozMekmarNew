<template>
  <div class="columns">
    <div class="column">
      <sidebar-menu :menu="menu" @update:collapsed="onToggleCollapse" @item-click="onItemClick" />
    </div>
    <div class="toggleCollapsedFalse" :class="{ toggleCollapsedTrue:toggleCollapsed }">
      <div class="toggleCollapsedSubFalse" :class="{ toggleCollapsedSubTrue: toggleCollapsed }">
        <router-view></router-view>
      </div>

    </div>
  </div>





</template>

<script>
import { SidebarMenu } from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
export default {
  props: {
    // Sidebar menu (required)

    // Sidebar Collapse state (v-model:collapsed to enable two-way data binding)
    collapsed: {
      type: Boolean,
      default: false
    },

    // Sidebar width (expanded)
    width: {
      type: String,
      default: '290px'
    },

    // Sidebar width (collapsed)
    widthCollapsed: {
      type: String,
      default: '65px'
    },

    // Keep only one child opened at a time (first level only)
    showOneChild: {
      type: Boolean,
      default: false
    },

    // Keep all child open
    showChild: {
      type: Boolean,
      default: false
    },

    // Sidebar right to left
    rtl: {
      type: Boolean,
      default: false
    },

    // Make sidebar relative to the parent (by default the sidebar is relative to the viewport)
    relative: {
      type: Boolean,
      default: false
    },

    // Hide toggle collapse btn
    hideToggle: {
      type: Boolean,
      default: false
    },

    // Sidebar theme (available themes: 'white-theme')
    theme: {
      type: String,
      default: ''
    },

    // Disable hover on collapse mode
    disableHover: {
      type: Boolean,
      default: false
    },

    // The name of the custom link component (must be registered globally and define item as a prop)
    linkComponentName: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      menu: [
        {
          header: 'Main Navigation',
          hiddenOnCollapse: true
        },
        {
          href: '/',
          title: 'Ana Sayfa',
          icon: 'fa fa-user'
        },
        {
          href: '/login',
          title: 'Login',
          icon: 'fa fa-user'
        },
        {
          title: 'Siparişler',
          icon: 'fa fa-chart-area',
          child: [
            {
              href: '/siparisler/uretim',
              title: 'Üretim'
            },
            {
              href: '/siparisler/sevk',
              title: 'Sevk'
            },
            {
              href: '/siparisler/bekleyen',
              title: 'Bekleyen'
            }
          ]
        },
        {
          title: 'Seleksiyon',
          icon: 'fa fa-chart-area',
          child: [
            {
              href: '/seleksiyon/uretim',
              title: 'Seleksiyon Giriş'
            },
            {
              href: '/seleksiyon/kasaOlculeri',
              title: 'Kasa Ölçüleri'
            },
            
          ]
        }
      ],
      toggleCollapsed:false,
    }
  },
  watch: {
   
  },
  methods: {
    onToggleCollapse(collapsed) { 
      this.toggleCollapsed = collapsed
    },
    onItemClick(event, item) {
      console.log(event,item)
     }
    



  },
  computed: {
    


  },
  beforeUpdate() {
    
  },
  components: {
    SidebarMenu
  },
  created() {

  },
  mounted() {
    
  }
}
</script>

<style scoped>
  .toggleCollapsedFalse{
    width:80%;
    height:auto;
    margin-left:29%;
  }
    .toggleCollapsedTrue {
      width: 100%;
      height: auto;
      margin-left: 9%;
    }
    .toggleCollapsedSubTrue{
      width:calc(100% - 1%);

    }
        .toggleCollapsedSubFalse {
          width: calc(90% - 1%);
    
        }
</style>
