<script lang="ts">
import { defineComponent, nextTick } from 'vue'

export default defineComponent({
    setup( props, { emit, expose, attrs, slots } ) {
        emit( "hello", "good job", "aha" );
        nextTick( () => {
        emit( "duck", "good job", "aha" );
        } );
        console.log( attrs );
    },
})
</script>
