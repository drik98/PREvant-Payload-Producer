export default function (allAvailableSuggestions: Ref<string[]>) {
  const filter = ref('')

  function setFilter(newFilter: string) {
    filter.value = newFilter
  }

  const filteredSuggestions = computed(() => {
    return allAvailableSuggestions.value
      .filter(suggestions => suggestions.toLocaleLowerCase().includes(filter.value.toLocaleLowerCase()))
  })

  return { filteredSuggestions, setFilter }
}
