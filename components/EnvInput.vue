<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
import type { EnvValue } from '../types/PREvant'
import configurationTransfomer from '~/utils/configurationTransfomer'

export type Env = EnvValue & { id: string, envKey: string, configKey?: string | null }

const props = defineProps<{
  modelValue: Env[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Env[]): void
}>()

function addEnv() {
  emit('update:modelValue', [
    ...props.modelValue,
    { id: uuidv4(), envKey: '', value: '', templated: false, replicate: true },
  ])
}

const selectedEnvs = ref<Env[]>([])

function deleteSelectedEnvs() {
  emit(
    'update:modelValue',
    props.modelValue.filter(({ id }) => !selectedEnvs.value.some(selectedEnv => selectedEnv.id === id)),
  )
  selectedEnvs.value = []
}

function updateEnv(currentValue: Env, payload: Partial<Omit<Env, 'id'>>) {
  emit(
    'update:modelValue',
    props.modelValue.map((env) => {
      if (env.id !== currentValue.id)
        return env

      return { ...env, ...payload }
    }),
  )
}

function updateConfigKeyOfEnv(currentValue: Env, configKey: string) {
  updateEnv(currentValue, { configKey, envKey: configurationTransfomer(configKey) })
}

function toggleConfigKeyDisabled(env: Env, enabled: boolean) {
  updateEnv(env, { configKey: enabled ? '' : null })
}

const { enableConfigToEnv } = useAppConfiguration()
</script>

<template>
  <PrimeDataTable
    v-model:selection="selectedEnvs"
    data-key="id"
    resizable-columns
    :value="modelValue"
  >
    <template #header>
      <div class="flex flex-wrap justify-content-between gap-2">
        <span class="text-xl text-900 font-bold flex-grow-1">Environment Variables</span>
        <PrimeButton
          v-tooltip="'Click to add an environment variable.'"
          raised
          rounded
          icon="pi pi-plus"
          label="Add"
          @click="addEnv"
        />
        <PrimeButton
          v-tooltip="'Click to remove all selected environment variables.'"
          raised
          rounded
          icon="pi pi-trash"
          label="Remove"
          :disabled="selectedEnvs.length <= 0"
          @click="deleteSelectedEnvs"
        />
      </div>
    </template>

    <template #empty>
      There is currently no environment variable present. Click on the "Add"-Button to add one.
    </template>

    <PrimeColumn
      header-style="width: 3rem"
      selection-mode="multiple"
    />

    <PrimeColumn header="Environment Variable Key">
      <template #body="slotProps">
        <PrimeInputGroup>
          <PrimeInputGroupAddon>
            <i class="pi pi-key" />
          </PrimeInputGroupAddon>
          <PrimeInputText
            v-tooltip.bottom="'Enter the key of the environment variable'"
            placeholder="MYSQL_USER"
            :disabled="slotProps.data.configKey != null"
            :model-value="slotProps.data.envKey"
            @update:model-value="envKey => updateEnv(slotProps.data, { envKey })"
          />
        </PrimeInputGroup>
      </template>
    </PrimeColumn>

    <PrimeColumn
      v-if="enableConfigToEnv"
      header="Configuration Key"
    >
      <template #body="slotProps">
        <PrimeInputGroup>
          <PrimeInputGroupAddon>
            <PrimeCheckbox
              v-tooltip.bottom="'Some services offer the possibility to use enviroment variables to overwrite the configurations. You can use this field to enter the key of the respective configuration value and it will be used to determine the environment variable key.'"
              binary
              :model-value="slotProps.data.configKey != null"
              @input="enabled => toggleConfigKeyDisabled(slotProps.data, enabled)"
            />
          </PrimeInputGroupAddon>
          <PrimeInputText
            v-tooltip="'Enter the key of the configuration file'"
            placeholder="javax.persistence.jdbc.user"
            :disabled="slotProps.data.configKey == null"
            :model-value="slotProps.data.configKey"
            @update:model-value="configKey => updateConfigKeyOfEnv(slotProps.data, configKey)"
          />
        </PrimeInputGroup>
      </template>
    </PrimeColumn>

    <PrimeColumn header="Environment Variable Value">
      <template #body="slotProps">
        <PrimeInputGroup>
          <PrimeInputGroupAddon>
            <i class="pi pi-database" />
          </PrimeInputGroupAddon>
          <PrimeInputText
            v-model="slotProps.data.value"
            v-tooltip.bottom="'Enter the value of the environment variable'"
            placeholder="admin"
            @update:model-value="value => updateEnv(slotProps.data, { value })"
          />
        </PrimeInputGroup>
      </template>
    </PrimeColumn>

    <PrimeColumn header="Templated">
      <template #body="slotProps">
        <PrimeCheckbox
          v-model="slotProps.data.templated"
          v-tooltip.left="'This should be checked when the value of the environment variable contains placeholders.'"
          binary
          @input="templated => updateEnv(slotProps.data, { templated })"
        />
      </template>
    </PrimeColumn>

    <PrimeColumn header="Replicate">
      <template #body="slotProps">
        <PrimeCheckbox
          v-model="slotProps.data.replicate"
          v-tooltip.left="'This should be checked when the environment variable should also be applied when a new preview is created and is replicated from the preview that your are currently creating.'"
          binary
          @input="replicate => updateEnv(slotProps.data, { replicate })"
        />
      </template>
    </PrimeColumn>
  </PrimeDataTable>
</template>
