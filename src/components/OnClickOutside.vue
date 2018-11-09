<script>
export default {
  name: "OnClickOutside",
  props: {
    do: {
      type: Function,
      required: true
    }
  },
  mounted() {
    document.addEventListener("click", this.listener);
    this.$once("hook:beforeDestroy", () => {
      document.removeEventListener("click", this.listener);
    });
  },
  render() {
    return this.$slots.default[0];
  },
  methods: {
    listener(e) {
      if (e.target === this.$el || this.$el.contains(e.target)) return;

      this.do();
    }
  }
};
</script>
