<script>
  import { onMount } from "svelte";

  const STORAGE_KEY = "myblog:fontSize";
  const sizes = [
    { id: "small", label: "A-", title: "小号字体", px: 14 },
    { id: "medium", label: "A", title: "中号字体", px: 16 },
    { id: "large", label: "A+", title: "大号字体", px: 18 }
  ];

  let current = "medium";

  // 把字号设置成 inline style，优先级最高，能覆盖 Tailwind 类或其他样式
  function applySize(id) {
    if (typeof document === "undefined") return;
    const s = sizes.find(x => x.id === id) || sizes[1];
    current = s.id;

    // 先设置类（保留原来的类逻辑）
    document.documentElement.classList.remove("fs-small", "fs-medium", "fs-large");
    document.documentElement.classList.add(`fs-${id}`);

    // 关键：通过内联 style 直接设置根字号（覆盖任何外部类）
    document.documentElement.style.fontSize = `${s.px}px`;

    try { localStorage.setItem(STORAGE_KEY, id); } catch (e) {}
  }

  onMount(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const idToApply = stored || "medium";
      applySize(idToApply);
    } catch (e) {
      applySize("medium");
    }
  });
</script>

<style>
  .fs-toggle {
    display: inline-flex;
    gap: 6px;
    align-items: center;
    font-family: inherit;
    background: rgba(255,255,255,0.85);
    padding: 6px;
    border-radius: 8px;
    box-shadow: 0 6px 18px rgba(0,0,0,0.06);
  }
  .fs-toggle button {
    appearance: none;
    border: 1px solid var(--fs-border, #e0e0e0);
    background: var(--fs-btn-bg, transparent);
    color: var(--fs-btn-color, inherit);
    padding: 6px 8px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9rem;
  }
  .fs-toggle button[aria-pressed="true"] {
    background: var(--fs-accent, #111);
    color: #fff;
    border-color: var(--fs-accent, #111);
  }
</style>

<div class="fs-toggle" role="radiogroup" aria-label="字体大小切换">
  {#each sizes as s}
    <button
      role="radio"
      aria-checked={current === s.id}
      aria-pressed={current === s.id}
      title={s.title}
      on:click={() => applySize(s.id)}
    >
      {s.label}
    </button>
  {/each}
</div>