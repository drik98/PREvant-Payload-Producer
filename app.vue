<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
import type { ModelValueType as ServiceConfigModelValue } from './components/SeviceConfigurationForm.vue'

const serviceConfigurations = ref<ServiceConfigModelValue[]>([])
addServiceConfig()

function addServiceConfig() {
  serviceConfigurations.value.push({
    id: uuidv4(),
    serviceName: '',
    image: '',
    env: [],
  })
}

function removeServiceConfig(serviceConfig: ServiceConfigModelValue) {
  serviceConfigurations.value = serviceConfigurations.value.filter(({ id }) => id !== serviceConfig.id)
}
</script>

<template>
  <PrimePanel header="Service Configurations">
    <template #icons>
      <PrimeButton
        v-tooltip="'Click to add a service to configure.'"
        raised
        rounded
        icon="pi pi-plus"
        label="Add"
        @click="addServiceConfig"
      />
    </template>

    <template #footer>
      <div class="flex align-items-center justify-content-end">
        <PrimeButton
          v-tooltip="'Click to add a service to configure.'"
          raised
          rounded
          icon="pi pi-plus"
          label="Add"
          @click="addServiceConfig"
        />
      </div>
    </template>

    <div class="flex flex-column gap-3">
      <template v-if="!serviceConfigurations.length">
        There is currently no service to configure present. Click on one of the "Add"-Buttons to add one.
      </template>
      <SeviceConfigurationForm
        v-for="serviceConfig in serviceConfigurations"
        v-else
        :key="serviceConfig.id"
        v-bind="serviceConfig"
        v-model:env="serviceConfig.env"
        v-model:image="serviceConfig.image"
        v-model:serviceName="serviceConfig.serviceName"
        @remove="() => removeServiceConfig(serviceConfig)"
      />
    </div>
  </PrimePanel>
</template>

<style>
.p-tooltip {
  width: 100em;
  max-width: fit-content;
}
</style>