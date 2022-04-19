<template>
    <div className="__scene-paper"
    :style="paperStyle">
        {{ props.label }}
    </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { StandardColor, StandardSize, ThemeColorMap } from '../../core/constants/constants';
export interface SPaperProps {
    theme ?: StandardColor,
    size ?: StandardSize,
    label ?: string,
    needRadius ?: boolean
};
const props = withDefaults( defineProps<SPaperProps>(), {
    size: "default",
    theme: "main",
    label: "",
    needRadius: true
} );
const paperStyle = computed(() => {
    const fontSizeMap = {
        "small": "0.8rem",
        "default": "1.2rem",
        "large": "1.4rem"
    };
    return {
        fontSize: fontSizeMap[ props.size ],
        background: ThemeColorMap.get( props.theme ),
        color: "white",
        borderRadius: props.needRadius ?  "1em" : "0"
    }
})

</script>
<script lang="ts">
export default {
    name: "s-paper"
};
</script>
<style scoped>
.__scene-paper {
    padding: 1em 2.5em;
    min-width: 1em;
    min-height: 1em;
    display: inline-block;

    transition: .7s;
}

.__scene-paper:hover {
    opacity: 0.7;
}
</style>