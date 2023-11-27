<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
import { fromPrevantServiceConfigs } from '~/types/modelValues'
import type { ServiceConfigModel } from '~/types/modelValues'
import type { ServiceConfiguration } from '~/generated/types/prevant'

const serviceConfigurations = ref<ServiceConfigModel[]>([])
addServiceConfig()

function addServiceConfig() {
  serviceConfigurations.value.push({
    id: uuidv4(),
    serviceName: '',
    image: '',
    env: [],
  })
}

function removeServiceConfig(serviceConfig: ServiceConfigModel) {
  serviceConfigurations.value = serviceConfigurations.value.filter(({ id }) => id !== serviceConfig.id)
}

function handleImport(prevantServiceConfigs: ServiceConfiguration[]) {
  serviceConfigurations.value = fromPrevantServiceConfigs(prevantServiceConfigs)
}
</script>

<template>
  <NuxtLayout>
    <PrimePanel header="Service Configurations">
      <template #icons>
        <ServiceConfigButtons
          :service-configurations="serviceConfigurations"
          @add-service-config="addServiceConfig"
          @import="handleImport"
        />
      </template>

      <template #footer>
        <ServiceConfigButtons
          class="justify-content-end"
          :service-configurations="serviceConfigurations"
          @add-service-config="addServiceConfig"
          @import="handleImport"
        />
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
  </NuxtLayout>
</template>
