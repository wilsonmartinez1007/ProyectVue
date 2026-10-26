<script setup>

    import {ref, computed} from 'vue'
    
    const props = defineProps({
        data: {type: Array, default:()=>[]},
        columns :{type: Array, default:()=>[]},
        filterKey: {type: String, default: ''}
    })
    
    const emit = defineEmits(['seleccionar'])
    const sortKey = ref('')
    const sortOrders = ref(
        props.columns.reduce((o,key) =>((o[key]=1),o),{})
    )
    const filterdData = computed(()=>{
        let {data,filterKey} = props
        if (filterKey){
            filterKey = filterKey.toLocaleLowerCase()
            data = data.filter((row)=>{
                return Object.keys(row).some((key)=>{
                    return String(row[key]).toLowerCase().indexOf(filterKey) > -1
                })
            })
        }
    
    const key = sortKey.value
    if(key){
        const order = sortOrders.value[key]
        data = data.slice().sort((a,b)=>{
            a = a[key]
            b = b[key]
            return (a===b?0:a>b?1:-1)* order
        })
    }return data
    })
    function sortBy(key){
        sortKey.value = key
        sortOrders.value[key] *= -1
    }
    function capitalize(str){
        return str.charAt(0).toUpperCase()+ str.slice(1)
    }
    

</script>
<template>
   <table v-if="filterdData.length">
    <thead>
        <tr>
            <th v-for="key in columns"
                @click="sortBy(key)"
                :class="{active: sortKey==key}">
                {{ capitalize(key) }}
                <span class="arrow" :class="sortOrders[key]>0?'asc':'dsc'">

                </span>

            </th>
        </tr>

    </thead>
    <tbody>
        
      
      <tr
        v-for="(entry, index) in filterdData"
        :key="entry.id || index"
        class="fila-click"
        @click="emit('seleccionar', entry)"
      >
        <td v-for="key in columns" :key="key">
          {{ entry[key] }}
        </td>
      </tr>
   
    </tbody>
   </table>
   <p v-else> Nai NAI</p>

</template>

<style scoped>
table {
  border: none;
  border-radius: 30px;
  background-color: transparent;
}

th {
  background-color: #ff6347ac;
  color: rgba(255, 252, 252, 0.768);
  font-size: 1.5rem;
  cursor: pointer;
  user-select: none;
}

td {
  background-color: #888484;
  color: rgb(18, 17, 17);
  font-size: 1.2rem;
}

th,
td {
  min-width: 120px;
  padding: 10px 20px;
}

th.active {
  color: #e8e5e5d3;
}


th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #000000;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #000000;
}
</style>