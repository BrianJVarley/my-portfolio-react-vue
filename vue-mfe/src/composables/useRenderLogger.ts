import {
  onMounted,
  onUpdated,
  onUnmounted,
  onBeforeMount,
  onBeforeUpdate,
  ref,
  computed,
  watch,
} from "vue";

export function useRenderLogger(componentName: string) {
  const renderCount = ref(0);

  const renderCountTracker = computed(() => {
    return renderCount.value > 10
      ? `Re-rendered more than ${renderCount.value} times`
      : "";
  });

  watch(renderCount, async (newCount, oldCount) => {
    if (newCount % oldCount > 0) {
      console.log("render count modulus:", newCount % oldCount);
    }
  });

  const viewUpdated = () => {
    renderCount.value++;
    console.log(
      `[${componentName}] 🔁 re-rendered (${renderCount.value} updates)`,
    );
  };

  onBeforeMount(() => console.log(`[${componentName}] ⏳ before mount`));
  onMounted(() => console.log(`[${componentName}] ✅ mounted`));
  onBeforeUpdate(() => console.log(`[${componentName}] 🔄 before update`));
  onUpdated(viewUpdated);
  onUnmounted(() => console.log(`[${componentName}] ❌ unmounted`));
}
