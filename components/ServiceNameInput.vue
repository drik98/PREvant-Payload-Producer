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

// todo move to env variables
const dockerImageByServiceName: Record<string, string> = {
  'kafka': 'docker.io/confluentinc/cp-kafka',
}

const availableServiceNameSuggestions = computed<string[]>(() => Object.keys(dockerImageByServiceName))

const { setFilter, filteredSuggestions } = useAutoCompletionSuggestions(availableServiceNameSuggestions)
</script>

<template>
  <div class="flex flex-column gap-2">
    <label for="serviceName">Service Name</label>
    <PrimeInputGroup>
      <PrimeInputGroupAddon>
        <i class="pi pi-id-card" />
      </PrimeInputGroupAddon>
      <PrimeAutoComplete
        v-model.trim="serviceName"
        v-tooltip="'Name of the service to start. Make sure the spelling is correct as some configurations or other services may depend on it.'"
        input-id="serviceName"
        placeholder="kafka"
        :suggestions="filteredSuggestions"
        @change="emit('update:modelValue', serviceName)"
        @complete="({ query }) => setFilter(query)"
      />
    </PrimeInputGroup>
  </div>
</template>
