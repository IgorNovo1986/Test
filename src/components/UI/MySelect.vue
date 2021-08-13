<template>
    <select 
        :value="value" 
        @change="changeOptions"
    >
        <option disabled value="">Выбирети из списка</option>
        <option 
            v-for="option in options" 
            :key="option.value" 
            :value="option.value"
        >
            {{option.name}}
        </option>
    </select>
</template>

<script>
export default {
    name: 'MySelect',
    props: {
        value: {
            type: String,  
        },
        options: {
            type: Array,
            default: () => [] 
        }
    },
    methods: {
        changeOptions (event){
            this.$emit('value', event.target.value)
        }
    }
    
}
</script>

<style>

</style>