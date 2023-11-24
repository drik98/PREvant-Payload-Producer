<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  serviceName: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const imageName = ref('')
const imageTag = ref('')

watch(
  () => props.modelValue,
  (fullImagePath) => {
    [imageName.value, imageTag.value = ''] = fullImagePath.split(':').map(imagePart => imagePart.trim())
  },
  { immediate: true },
)

const fullImagePath = computed(() => {
  if (!imageTag.value.length)
    return imageName.value

  return `${imageName.value}:${imageTag.value}`
})

// todo move to env variables
const dockerImageByServiceName: Record<string, string> = {
  'kafka': 'docker.io/confluentinc/cp-kafka'
}

watch(
  () => props.serviceName,
  (serviceName) => {
    if (!imageName.value.trim().length && serviceName in dockerImageByServiceName)
      imageName.value = dockerImageByServiceName[serviceName]
  },
)

const availableImageNameSuggestions = computed(() => {
  return [...Object.entries(dockerImageByServiceName)]
    // sort selected serviceName always to the top
    .sort(([serviceName, imageName], [serviceName2, imageName2]) => {
      if (serviceName === props.serviceName)
        return -1

      if (serviceName2 === props.serviceName)
        return 1

      return imageName.localeCompare(imageName2)
    })
    .map(([, imageName]) => imageName)
})

const filter = ref('')
const filteredImageNameSuggestions = computed(() => {
  return availableImageNameSuggestions.value
    .filter(imageName => imageName.toLocaleLowerCase().includes(filter.value.toLocaleLowerCase()))
})

function filterImageNameSuggestions({ query }: { query: string }) {
  filter.value = query
}
</script>

<template>
  <div class="flex flex-column md:flex-row gap-3">
    <div class="flex flex-column gap-2 flex-grow-1">
      <label for="imageName">Docker Image Name</label>
      <PrimeInputGroup>
        <PrimeInputGroupAddon>
          <i class="pi pi-image" />
        </PrimeInputGroupAddon>
        <PrimeAutoComplete
          v-model.trim="imageName"
          v-tooltip="'The docker image with &lt;repo-name&gt;/&lt;hub-user&gt;/&lt;repo-name&gt;'"
          placeholder="docker.io/confluentinc/cp-kafka"
          :suggestions="filteredImageNameSuggestions"
          @complete="filterImageNameSuggestions"
        />
      </PrimeInputGroup>
    </div>
    <div class="flex flex-column gap-2">
      <label for="imageTag">Docker Image Tag</label>
      <PrimeInputGroup>
        <PrimeInputGroupAddon>
          <i class="pi pi-tag" />
        </PrimeInputGroupAddon>
        <PrimeInputText
          id="imageTag"
          v-model.trim="imageTag"
          v-tooltip="'(Optional) tag for the selected docker image.'"
          placeholder="7.4.1"
          @update:model-value="emit('update:modelValue', fullImagePath)"
        />
      </PrimeInputGroup>
    </div>
  </div>
</template>
