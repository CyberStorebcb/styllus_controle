import { c as createComponent, k as computed, h, V as hMergeSlot } from "./index-DTRxxbQ7.js";
const alignValues = ["top", "middle", "bottom"];
const QBadge = createComponent({
  name: "QBadge",
  props: {
    color: String,
    textColor: String,
    floating: Boolean,
    transparent: Boolean,
    multiLine: Boolean,
    outline: Boolean,
    rounded: Boolean,
    label: [Number, String],
    align: {
      type: String,
      validator: (v) => alignValues.includes(v)
    }
  },
  setup(props, { slots }) {
    const style = computed(() => {
      return props.align !== void 0 ? { verticalAlign: props.align } : null;
    });
    const classes = computed(() => {
      const text = props.outline === true ? props.color || props.textColor : props.textColor;
      return `q-badge flex inline items-center no-wrap q-badge--${props.multiLine === true ? "multi" : "single"}-line` + (props.outline === true ? " q-badge--outline" : props.color !== void 0 ? ` bg-${props.color}` : "") + (text !== void 0 ? ` text-${text}` : "") + (props.floating === true ? " q-badge--floating" : "") + (props.rounded === true ? " q-badge--rounded" : "") + (props.transparent === true ? " q-badge--transparent" : "");
    });
    return () => h("div", {
      class: classes.value,
      style: style.value,
      role: "status",
      "aria-label": props.label
    }, hMergeSlot(slots.default, props.label !== void 0 ? [props.label] : []));
  }
});
export {
  QBadge as Q
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUUJhZGdlLUJ5Z2tOWFRxLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2JhZGdlL1FCYWRnZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBoLCBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaE1lcmdlU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcblxuY29uc3QgYWxpZ25WYWx1ZXMgPSBbICd0b3AnLCAnbWlkZGxlJywgJ2JvdHRvbScgXVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUJhZGdlJyxcblxuICBwcm9wczoge1xuICAgIGNvbG9yOiBTdHJpbmcsXG4gICAgdGV4dENvbG9yOiBTdHJpbmcsXG5cbiAgICBmbG9hdGluZzogQm9vbGVhbixcbiAgICB0cmFuc3BhcmVudDogQm9vbGVhbixcbiAgICBtdWx0aUxpbmU6IEJvb2xlYW4sXG4gICAgb3V0bGluZTogQm9vbGVhbixcbiAgICByb3VuZGVkOiBCb29sZWFuLFxuXG4gICAgbGFiZWw6IFsgTnVtYmVyLCBTdHJpbmcgXSxcblxuICAgIGFsaWduOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWxpZGF0b3I6IHYgPT4gYWxpZ25WYWx1ZXMuaW5jbHVkZXModilcbiAgICB9XG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCBzdHlsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIHJldHVybiBwcm9wcy5hbGlnbiAhPT0gdm9pZCAwXG4gICAgICAgID8geyB2ZXJ0aWNhbEFsaWduOiBwcm9wcy5hbGlnbiB9XG4gICAgICAgIDogbnVsbFxuICAgIH0pXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgdGV4dCA9IHByb3BzLm91dGxpbmUgPT09IHRydWVcbiAgICAgICAgPyBwcm9wcy5jb2xvciB8fCBwcm9wcy50ZXh0Q29sb3JcbiAgICAgICAgOiBwcm9wcy50ZXh0Q29sb3JcblxuICAgICAgcmV0dXJuICdxLWJhZGdlIGZsZXggaW5saW5lIGl0ZW1zLWNlbnRlciBuby13cmFwJ1xuICAgICAgICArIGAgcS1iYWRnZS0tJHsgcHJvcHMubXVsdGlMaW5lID09PSB0cnVlID8gJ211bHRpJyA6ICdzaW5nbGUnIH0tbGluZWBcbiAgICAgICAgKyAocHJvcHMub3V0bGluZSA9PT0gdHJ1ZVxuICAgICAgICAgID8gJyBxLWJhZGdlLS1vdXRsaW5lJ1xuICAgICAgICAgIDogKHByb3BzLmNvbG9yICE9PSB2b2lkIDAgPyBgIGJnLSR7IHByb3BzLmNvbG9yIH1gIDogJycpXG4gICAgICAgIClcbiAgICAgICAgKyAodGV4dCAhPT0gdm9pZCAwID8gYCB0ZXh0LSR7IHRleHQgfWAgOiAnJylcbiAgICAgICAgKyAocHJvcHMuZmxvYXRpbmcgPT09IHRydWUgPyAnIHEtYmFkZ2UtLWZsb2F0aW5nJyA6ICcnKVxuICAgICAgICArIChwcm9wcy5yb3VuZGVkID09PSB0cnVlID8gJyBxLWJhZGdlLS1yb3VuZGVkJyA6ICcnKVxuICAgICAgICArIChwcm9wcy50cmFuc3BhcmVudCA9PT0gdHJ1ZSA/ICcgcS1iYWRnZS0tdHJhbnNwYXJlbnQnIDogJycpXG4gICAgfSlcblxuICAgIHJldHVybiAoKSA9PiBoKCdkaXYnLCB7XG4gICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgIHN0eWxlOiBzdHlsZS52YWx1ZSxcbiAgICAgIHJvbGU6ICdzdGF0dXMnLFxuICAgICAgJ2FyaWEtbGFiZWwnOiBwcm9wcy5sYWJlbFxuICAgIH0sIGhNZXJnZVNsb3Qoc2xvdHMuZGVmYXVsdCwgcHJvcHMubGFiZWwgIT09IHZvaWQgMCA/IFsgcHJvcHMubGFiZWwgXSA6IFtdKSlcbiAgfVxufSlcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBS0EsTUFBTSxjQUFjLENBQUUsT0FBTyxVQUFVLFFBQVE7QUFFL0MsTUFBQSxTQUFlLGdCQUFnQjtBQUFBLEVBQzdCLE1BQU07QUFBQSxFQUVOLE9BQU87QUFBQSxJQUNMLE9BQU87QUFBQSxJQUNQLFdBQVc7QUFBQSxJQUVYLFVBQVU7QUFBQSxJQUNWLGFBQWE7QUFBQSxJQUNiLFdBQVc7QUFBQSxJQUNYLFNBQVM7QUFBQSxJQUNULFNBQVM7QUFBQSxJQUVULE9BQU8sQ0FBRSxRQUFRLE1BQVE7QUFBQSxJQUV6QixPQUFPO0FBQUEsTUFDTCxNQUFNO0FBQUEsTUFDTixXQUFXLE9BQUssWUFBWSxTQUFTLENBQUM7QUFBQSxJQUM1QztBQUFBLEVBQ0c7QUFBQSxFQUVELE1BQU8sT0FBTyxFQUFFLFNBQVM7QUFDdkIsVUFBTSxRQUFRLFNBQVMsTUFBTTtBQUMzQixhQUFPLE1BQU0sVUFBVSxTQUNuQixFQUFFLGVBQWUsTUFBTSxNQUFLLElBQzVCO0FBQUEsSUFDTCxDQUFBO0FBRUQsVUFBTSxVQUFVLFNBQVMsTUFBTTtBQUM3QixZQUFNLE9BQU8sTUFBTSxZQUFZLE9BQzNCLE1BQU0sU0FBUyxNQUFNLFlBQ3JCLE1BQU07QUFFVixhQUFPLHFEQUNXLE1BQU0sY0FBYyxPQUFPLFVBQVUsbUJBQ2xELE1BQU0sWUFBWSxPQUNqQixzQkFDQyxNQUFNLFVBQVUsU0FBUyxPQUFRLE1BQU0sS0FBTyxLQUFJLE9BRXBELFNBQVMsU0FBUyxTQUFVLElBQUksS0FBTSxPQUN0QyxNQUFNLGFBQWEsT0FBTyx1QkFBdUIsT0FDakQsTUFBTSxZQUFZLE9BQU8sc0JBQXNCLE9BQy9DLE1BQU0sZ0JBQWdCLE9BQU8sMEJBQTBCO0FBQUEsSUFDN0QsQ0FBQTtBQUVELFdBQU8sTUFBTSxFQUFFLE9BQU87QUFBQSxNQUNwQixPQUFPLFFBQVE7QUFBQSxNQUNmLE9BQU8sTUFBTTtBQUFBLE1BQ2IsTUFBTTtBQUFBLE1BQ04sY0FBYyxNQUFNO0FBQUEsSUFDckIsR0FBRSxXQUFXLE1BQU0sU0FBUyxNQUFNLFVBQVUsU0FBUyxDQUFFLE1BQU0sS0FBTyxJQUFHLEVBQUUsQ0FBQztBQUFBLEVBQy9FO0FBQ0EsQ0FBQzsiLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbMF19
