<script setup lang="ts">
import type { Env } from './EnvInput.vue'

export interface ModelValueType {
  id: string
  serviceName: string
  image: string
  env: Env[]
}

const props = defineProps<ModelValueType>()

const emit = defineEmits<{
  (e: 'remove'): void
  (e: 'update:serviceName', serviceName: string): void
  (e: 'update:image', image: string): void
  (e: 'update:env', env: Env[]): void
}>()
</script>

<template>
  <PrimePanel :header="props.serviceName || 'New Service'">
    <template #icons>
      <button
        class="p-panel-header-icon p-link mr-2"
        @click="() => emit('remove')"
      >
        <span class="pi pi-trash" />
      </button>
    </template>
    <div class="flex flex-column gap-3">
      <ServiceNameInput
        :model-value="props.serviceName"
        @update:model-value="serviceName => emit('update:serviceName', serviceName)"
      />
      <DockerImageInput
        :model-value="props.image"
        :service-name="props.serviceName"
        @update:model-value="image => emit('update:image', image)"
      />
      <EnvInput
        :model-value="props.env"
        @update:model-value="env => emit('update:env', env)"
      />
    </div>
  </PrimePanel>
</template>
