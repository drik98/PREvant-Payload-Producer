<script setup lang="ts">
import type { EnvModel, ServiceConfigModel } from '~/types/modelValues'

const props = defineProps<ServiceConfigModel>()

const emit = defineEmits<{
  (e: 'remove'): void
  (e: 'update:serviceName', serviceName: string): void
  (e: 'update:image', image: string): void
  (e: 'update:env', env: EnvModel[]): void
}>()
</script>

<template>
  <PrimePanel :header="props.serviceName || 'New Service'">
    <template #icons>
      <PrimeButton
        v-tooltip="'Click to remove this service configuration.'"
        raised
        rounded
        icon="pi pi-trash"
        label="Remove"
        @click="() => emit('remove')"
      />
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
