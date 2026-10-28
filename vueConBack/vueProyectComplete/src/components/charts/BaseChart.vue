<script setup>
    //chart
    import { use } from 'echarts/core'
    import { CanvasRenderer } from 'echarts/renderers'
    import { BarChart, PieChart } from 'echarts/charts'
    import { TitleComponent, TooltipComponent, GridComponent, DatasetComponent, MarkLineComponent, LegendComponent,GraphicComponent } from 'echarts/components'
    import VChart from 'vue-echarts'

    use([
        CanvasRenderer,
        BarChart,
        TitleComponent,
        TooltipComponent,
        GridComponent,
        DatasetComponent,
        MarkLineComponent,
        PieChart,
        LegendComponent,
        GraphicComponent
        ])

        defineProps({
            option:{
                type:Object,
                required: true
            }
            })
        const emit = defineEmits(['legendselectchanged'])


</script>
<template>
    <v-chart class="chart" :option="option" auto-resize @legendselectchanged="emit('legendselectchanged', $event)"/>
</template>
<style scoped>
    .chart {
        width: 100%;
        height: 100%;
        min-height: 270px;
        max-height: 350px;
    }

</style>