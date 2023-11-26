<template>
  <PrimeMenubar>
    <template #start>
      <div class="flex align-items-center gap-3">
        <img
          alt="Logo of the PREvant Payload Producer"
          src="/android-chrome-512x512.png"
          :style="{ height: '40px' }"
        >
        PREvant Payload Producer
      </div>
    </template>
    <template #end>
      <div class="flex align-items-center gap-4">
        <a
          v-ripple
          class="flex align-items-center"
          href="https://github.com/aixigo/PREvant"
          target="_blank"
        >
          <span class="pi pi-external-link" />
          <span class="ml-2">About PREvant</span>
        </a>
        <NuxtLink
          v-ripple
          class="flex align-items-center"
          href="https://github.com/drik98/PREvant-Payload-Producer"
          target="_blank"
        >
          <span class="pi pi-github" />
          <span class="ml-2">Source</span>
         </NuxtLink>
      </div>
    </template>
  </PrimeMenubar>
</template>

<style scoped>
a {
   text-decoration: none;
}
</style>