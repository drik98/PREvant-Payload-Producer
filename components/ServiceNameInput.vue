<script setup lang="ts">
const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const serviceName = ref(props.modelValue)

watch(() => props.modelValue, (newModelValue) => {
  serviceName.value = newModelValue
})
</script>

<template>
  <div class="flex flex-column gap-2">
    <label for="serviceName">Service Name</label>
    <PrimeInputGroup>
      <PrimeInputGroupAddon>
        <i class="pi pi-id-card" />
      </PrimeInputGroupAddon>
      <PrimeInputText
        id="serviceName"
        v-model.trim="serviceName"
        v-tooltip="'Name of the service to start. Make sure the spelling is correct as some configurations or other services may depend on it.'"
        placeholder="kafka"
        @input="emit('update:modelValue', serviceName)"
      />
    </PrimeInputGroup>
  </div>
</template>
