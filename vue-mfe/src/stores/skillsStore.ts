/**
 * skillsStore.ts
 *
 * Pinia "Setup Store" — the Composition API flavour of defineStore.
 *
 * Core Vue / Pinia concepts demonstrated here:
 *  - defineStore  : creates the store and registers it with the active Pinia instance
 *  - ref          : reactive primitive — drives selectedCategory state
 *  - computed     : derived state — filteredSkills recalculates whenever
 *                   selectedCategory changes, just like a Vue computed property
 *  - action       : plain function mutating state; no "commit" boilerplate
 *
 * Consumers call useSkillsStore() inside any <script setup> block.
 * Use storeToRefs() to destructure reactive refs without losing reactivity.
 */
import { ref, computed } from "vue";
import { defineStore } from "pinia";

// ── Types ──────────────────────────────────────────────────────────────────
export type SkillCategory = "All" | "Frontend" | "Testing" | "CSS";

interface Skill {
  name: string;
  level: number;
  category: Exclude<SkillCategory, "All">;
}

// ── Static data (co-located with the store that owns it) ───────────────────
const ALL_SKILLS: Skill[] = [
  { name: "TypeScript", level: 95, category: "Frontend" },
  { name: "Angular", level: 92, category: "Frontend" },
  { name: "NgRx", level: 92, category: "Frontend" },
  { name: "Angular Signals", level: 92, category: "Frontend" },
  { name: "Flexbox / Grid Layout", level: 92, category: "CSS" },
  { name: "Bootstrap", level: 85, category: "CSS" },

  {
    name: "Design Systems (Reuseable Components)",
    level: 92,
    category: "Frontend",
  },
  { name: "React", level: 80, category: "Frontend" },
  { name: "Vue 3", level: 40, category: "Frontend" },
  { name: "WCAG 2.0 Compliance", level: 80, category: "Frontend" },
  {
    name: "Accessibility (WCAG),Axe Dev tools",
    level: 90,
    category: "Testing",
  },
  {
    name: "Accessibility (WCAG),Screen readers (VoiceOver)",
    level: 90,
    category: "Testing",
  },
  { name: "Playwright", level: 90, category: "Testing" },
  { name: "Jest", level: 90, category: "Testing" },
  { name: "RxJS", level: 88, category: "Frontend" },
];

export const CATEGORIES: SkillCategory[] = [
  "All",
  "Frontend",
  "Testing",
  "CSS",
];

// ── Store ──────────────────────────────────────────────────────────────────
// Setup-store syntax: the factory function looks like a composable.
// Everything returned is exposed to consumers.
export const useSkillsStore = defineStore("skills", () => {
  // STATE — a single ref drives the whole filter
  const selectedCategory = ref<SkillCategory>("All");

  // GETTER — computed re-runs only when selectedCategory changes (lazy + cached)
  const filteredSkills = computed(() =>
    selectedCategory.value === "All"
      ? ALL_SKILLS
      : ALL_SKILLS.filter((s) => s.category === selectedCategory.value),
  );

  // ACTION — direct mutation; Pinia makes every store function an "action"
  function setCategory(cat: SkillCategory) {
    selectedCategory.value = cat;
  }

  return { selectedCategory, filteredSkills, setCategory };
});
