(() => {
  const form = document.getElementById("post-filters");
  if (!form) return;

  const input = document.getElementById("post-search");
  const cards = [...document.querySelectorAll("[data-post]")].map((element) => ({
    element,
    text: element.dataset.search,
    tags: JSON.parse(element.dataset.tags),
  }));
  const buttons = [...form.querySelectorAll("[data-tag]")];
  const count = document.getElementById("results-count");
  const empty = document.getElementById("no-results");
  const parameters = new URLSearchParams(window.location.search);
  let selectedTag = parameters.get("tag") || "";
  input.value = parameters.get("q") || "";

  function filterPosts() {
    const terms = input.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    let visible = 0;

    for (const card of cards) {
      const matches = terms.every((term) => card.text.includes(term))
        && (!selectedTag || card.tags.includes(selectedTag));
      card.element.hidden = !matches;
      if (matches) visible += 1;
    }

    for (const button of buttons) {
      button.setAttribute("aria-pressed", String(button.dataset.tag === selectedTag));
    }
    count.textContent = `${visible} ${visible === 1 ? "post" : "posts"}`;
    empty.hidden = visible !== 0;

    const url = new URL(window.location.href);
    if (input.value.trim()) url.searchParams.set("q", input.value.trim());
    else url.searchParams.delete("q");
    if (selectedTag) url.searchParams.set("tag", selectedTag);
    else url.searchParams.delete("tag");
    window.history.replaceState(null, "", url);
  }

  form.addEventListener("submit", (event) => event.preventDefault());
  input.addEventListener("input", filterPosts);
  for (const button of buttons) {
    button.addEventListener("click", () => {
      selectedTag = button.dataset.tag;
      filterPosts();
    });
  }
  document.getElementById("reset-filters").addEventListener("click", () => {
    input.value = "";
    selectedTag = "";
    filterPosts();
    input.focus();
  });

  filterPosts();
  form.hidden = false;
})();
