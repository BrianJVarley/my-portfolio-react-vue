<template>
  <section class="mfe-page about">
    <span class="mfe-badge">Vue MFE</span>

    <div class="about__intro">
      <h2 class="section-title">About Me</h2>
      <p class="about__lead">
        Senior Frontend Engineer with {{ yearsExp }}+ years building
        production interfaces — fintech, accessibility, design systems.
      </p>
    </div>

    <div class="about__grid">
      <div class="about__col">
        <h3 class="col-heading">Stack</h3>
        <ul class="skill-list" role="list">
          <li
            v-for="skill in skills"
            :key="skill.name"
            class="skill-item"
          >
            <span class="skill-item__name">{{ skill.name }}</span>
            <span class="skill-item__bar" :style="{ '--w': skill.level + '%' }" aria-hidden="true" />
            <span class="sr-only">{{ skill.level }}%</span>
          </li>
        </ul>
      </div>

      <div class="about__col">
        <h3 class="col-heading">Experience</h3>
        <ul class="timeline" role="list">
          <li v-for="role in roles" :key="role.company" class="timeline__item">
            <span class="timeline__period">{{ role.period }}</span>
            <span class="timeline__role">{{ role.title }}</span>
            <span class="timeline__company">{{ role.company }}</span>
          </li>
        </ul>
      </div>

      <div class="about__col about__col--full">
        <h3 class="col-heading">Values</h3>
        <ul class="values-list" role="list">
          <li v-for="v in values" :key="v.label" class="value-card">
            <span class="value-card__icon" aria-hidden="true">{{ v.icon }}</span>
            <div>
              <strong class="value-card__label">{{ v.label }}</strong>
              <p class="value-card__desc">{{ v.desc }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const yearsExp = computed(() => new Date().getFullYear() - 2015)

const skills = [
  { name: 'TypeScript', level: 95 },
  { name: 'Angular / NgRx', level: 92 },
  { name: 'React', level: 80 },
  { name: 'Accessibility (WCAG)', level: 90 },
  { name: 'Vue 3', level: 70 },
  { name: 'RxJS', level: 88 },
]

const roles = [
  { period: '2020–now', title: 'Senior Frontend Engineer', company: 'Backbase' },
  { period: '2017–20',  title: 'Frontend Engineer',        company: 'Avaya' },
  { period: '2015–17',  title: 'UI Developer',             company: 'HPE' },
  { period: '2013–15',  title: 'Junior Developer',         company: 'Codec-dss' },
]

const values = [
  {
    icon: '♿',
    label: 'Accessibility-first',
    desc: 'WCAG 2.1 AA as a baseline, not an afterthought. NVDA-tested, keyboard-navigable.',
  },
  {
    icon: '⚡',
    label: 'Performance-aware',
    desc: 'Bundle budgets, lazy loading, and Core Web Vitals baked into every build.',
  },
  {
    icon: '🧩',
    label: 'Systems thinking',
    desc: 'Design tokens, shared component libraries, and consistent patterns across teams.',
  },
]
</script>

<style scoped>
.about { font-family: 'DM Mono', monospace; }

.mfe-badge {
  display: inline-block;
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  border: 1px solid #42b883;
  color: #42b883;
  margin-bottom: 1.25rem;
}

.about__intro { margin-bottom: 3rem; }

.section-title {
  font-family: 'DM Serif Display', Georgia, serif;
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  letter-spacing: -0.03em;
  color: #e8e6e1;
  margin-bottom: 0.75rem;
}

.about__lead {
  font-size: 0.875rem;
  line-height: 1.7;
  color: #9a9898;
  max-width: 520px;
}

.about__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem 4rem;
}

.about__col--full {
  grid-column: 1 / -1;
}

.col-heading {
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #6b6970;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #222228;
}

/* ── Skills ── */
.skill-list { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 0.85rem; }

.skill-item {
  display: grid;
  grid-template-columns: 130px 1fr;
  align-items: center;
  gap: 1rem;
  font-size: 0.75rem;
  color: #9a9898;
}

.skill-item__bar {
  display: block;
  height: 2px;
  background: #222228;
  border-radius: 999px;
  position: relative;
  overflow: hidden;
}

.skill-item__bar::after {
  content: '';
  position: absolute;
  inset: 0;
  width: var(--w, 0%);
  background: #42b883;
  border-radius: 999px;
  animation: barGrow 0.8s cubic-bezier(0.4, 0, 0.2, 1) both;
}

@keyframes barGrow {
  from { width: 0; }
  to   { width: var(--w); }
}

/* ── Timeline ── */
.timeline { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 0; }

.timeline__item {
  display: grid;
  grid-template-columns: 72px 1fr;
  grid-template-rows: auto auto;
  column-gap: 1rem;
  padding: 0.9rem 0;
  border-bottom: 1px solid #1a1a1f;
  font-size: 0.75rem;
}

.timeline__period {
  grid-row: 1 / 3;
  color: #6b6970;
  font-size: 0.65rem;
  padding-top: 2px;
  letter-spacing: 0.05em;
}

.timeline__role    { color: #e8e6e1; }
.timeline__company { color: #6b6970; font-size: 0.7rem; margin-top: 2px; }

/* ── Values ── */
.values-list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1px;
  background: #222228;
  border: 1px solid #222228;
}

.value-card {
  background: #131316;
  padding: 1.5rem;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  transition: background 200ms ease;
}

.value-card:hover { background: #1a1a1f; }

.value-card__icon  { font-size: 1.2rem; flex-shrink: 0; margin-top: 2px; }
.value-card__label { display: block; font-size: 0.8rem; color: #e8e6e1; margin-bottom: 0.4rem; font-weight: 500; }
.value-card__desc  { font-size: 0.75rem; line-height: 1.6; color: #6b6970; }

.sr-only {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 600px) {
  .about__grid { grid-template-columns: 1fr; }
  .about__col--full { grid-column: 1; }
}
</style>
