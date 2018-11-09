<template>
  <on-click-outside :do="close">
    <div class="combobox m-auto">
      <input
        :value="selected"
        @input="searching"
        @focus="open"
        @keydown.esc="close"
        @keydown.up.prevent="highlightPrev"
        @keydown.down.prevent="highlightNext"
        @keydown.enter.prevent="selectHighlighted"
        @keydown.tab.prevent
        class="combobox__field"
        type="text"
        placeholder="Type or choose from list below"
        ref="search"
      >
      <span class="combobox__icon"></span>
      <ul
        v-show="isDropdownOpen"
        class="dropdown"
        ref="options"
      >
        <li
          v-show="filteredOptions.length > 0"
          v-for="(option, i) in filteredOptions"
          :key="i"
          :class="['dropdown__item', { 'dropdown__item--highlighted': i === highlightedIndex }]"
          @mouseover="highlight(i)"
          @click="select(option)"
          ref="dropdownItem"
        >
          {{ option }}
        </li>
        <li
          v-show="filteredOptions.length === 0"
          class="dropdown__item"
        >
          No results found for "{{ search }}"
        </li>
      </ul>
    </div>
  </on-click-outside>
</template>

<script>
import OnClickOutside from "@/components/OnClickOutside";

export default {
  name: "Combobox",
  components: {
    OnClickOutside
  },
  props: {
    value: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    filterFunction: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      isDropdownOpen: false,
      selected: "",
      search: "",
      highlightedIndex: 0
    };
  },
  computed: {
    filteredOptions() {
      return this.filterFunction(this.search, this.options);
    }
  },
  methods: {
    open() {
      if (this.isDropdownOpen) return;
      this.isDropdownOpen = true;

      if (this.selected.length > 0) {
        this.search = "";
        this.$refs.search.select();
        this.highlightedIndex = this.filteredOptions.findIndex(
          obj => obj === this.selected
        );
      }
    },
    close() {
      this.isDropdownOpen = false;

      this.search = "";
      this.$refs.search.blur();
    },
    searching(event) {
      this.search = event.target.value;
      this.selected = event.target.value;
      this.highlightedIndex = 0;
    },
    select(option) {
      this.selected = option;
      this.$emit("input", option);
      this.highlightedIndex = this.filteredOptions.findIndex(
        obj => obj === option
      );
      this.close();
    },
    selectHighlighted() {
      this.select(this.filteredOptions[this.highlightedIndex]);
    },
    highlight(index) {
      this.highlightedIndex = index;

      if (this.highlightedIndex < 0)
        this.highlightedIndex = this.filteredOptions.length - 1;

      if (this.highlightedIndex === this.filteredOptions.length)
        this.highlightedIndex = 0;

      this.scrollToHighlighted();
    },
    highlightPrev() {
      this.highlight(this.highlightedIndex - 1);
    },
    highlightNext() {
      this.highlight(this.highlightedIndex + 1);
    },
    scrollToHighlighted() {
      this.$refs.options.children[this.highlightedIndex].scrollIntoView({
        block: "nearest"
      });
    }
  }
};
</script>
