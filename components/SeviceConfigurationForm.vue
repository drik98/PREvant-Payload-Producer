<script setup lang="ts">
import type { EnvValue } from '../types/PREvant'

export interface ModelValueType {
  serviceName: string
  image: string
  env: Array<EnvValue & { id: string, envKey: string }>
}

const emit = defineEmits<{
  (e: 'remove'): void
}>()

const serviceConfig = ref<ModelValueType>({
  serviceName: '',
  image: '',
  env: [],
})
</script>

<template>
  <PrimePanel :header="serviceConfig.serviceName || 'New Service'">
    <template #icons>
      <button
        class="p-panel-header-icon p-link mr-2"
        @click="() => $emit('remove')"
      >
        <span class="pi pi-trash" />
      </button>
    </template>
    <div class="flex flex-column gap-3">
      <ServiceNameInput v-model="serviceConfig.serviceName" />
      <DockerImageInput
        v-model="serviceConfig.image"
        :service-name="serviceConfig.serviceName"
      />
      <EnvInput v-model="serviceConfig.env" />
    </div>
  </PrimePanel>
</template>
