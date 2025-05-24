import { c as createComponent, e as inject, f as emptyRenderFn, aq as timelineKey, k as computed, m as hUniqueSlot, h, a6 as QIcon, L as hSlot, C as useDarkProps, E as useDark, g as getCurrentInstance, M as provide, _ as _export_sfc, X as createBlock, Y as openBlock, Z as withCtx, a0 as createBaseVNode, $ as createVNode, aa as QCard, ab as QCardSection, a1 as QBtn, a3 as createElementBlock, a4 as Fragment, a5 as renderList, ac as createCommentVNode, a2 as createTextVNode, a7 as toDisplayString, r as ref, o as onMounted, aj as Notify } from "./index-DTRxxbQ7.js";
import { Q as QBadge } from "./QBadge-BygkNXTq.js";
import { Q as QPage } from "./QPage-pt9NM7Fr.js";
import { a as axios } from "./index-BSBq6A-N.js";
const QTimelineEntry = createComponent({
  name: "QTimelineEntry",
  props: {
    heading: Boolean,
    tag: {
      type: String,
      default: "h3"
    },
    side: {
      type: String,
      default: "right",
      validator: (v) => ["left", "right"].includes(v)
    },
    icon: String,
    avatar: String,
    color: String,
    title: String,
    subtitle: String,
    body: String
  },
  setup(props, { slots }) {
    const $timeline = inject(timelineKey, emptyRenderFn);
    if ($timeline === emptyRenderFn) {
      console.error("QTimelineEntry needs to be child of QTimeline");
      return emptyRenderFn;
    }
    const classes = computed(
      () => `q-timeline__entry q-timeline__entry--${props.side}` + (props.icon !== void 0 || props.avatar !== void 0 ? " q-timeline__entry--icon" : "")
    );
    const dotClass = computed(
      () => `q-timeline__dot text-${props.color || $timeline.color}`
    );
    const reverse = computed(
      () => $timeline.layout === "comfortable" && $timeline.side === "left"
    );
    return () => {
      const child = hUniqueSlot(slots.default, []);
      if (props.body !== void 0) {
        child.unshift(props.body);
      }
      if (props.heading === true) {
        const content2 = [
          h("div"),
          h("div"),
          h(
            props.tag,
            { class: "q-timeline__heading-title" },
            child
          )
        ];
        return h("div", {
          class: "q-timeline__heading"
        }, reverse.value === true ? content2.reverse() : content2);
      }
      let dot;
      if (props.icon !== void 0) {
        dot = [
          h(QIcon, {
            class: "row items-center justify-center",
            name: props.icon
          })
        ];
      } else if (props.avatar !== void 0) {
        dot = [
          h("img", {
            class: "q-timeline__dot-img",
            src: props.avatar
          })
        ];
      }
      const content = [
        h("div", { class: "q-timeline__subtitle" }, [
          h("span", {}, hSlot(slots.subtitle, [props.subtitle]))
        ]),
        h("div", { class: dotClass.value }, dot),
        h("div", { class: "q-timeline__content" }, [
          h("h6", { class: "q-timeline__title" }, hSlot(slots.title, [props.title]))
        ].concat(child))
      ];
      return h("li", {
        class: classes.value
      }, reverse.value === true ? content.reverse() : content);
    };
  }
});
const QTimeline = createComponent({
  name: "QTimeline",
  props: {
    ...useDarkProps,
    color: {
      type: String,
      default: "primary"
    },
    side: {
      type: String,
      default: "right",
      validator: (v) => ["left", "right"].includes(v)
    },
    layout: {
      type: String,
      default: "dense",
      validator: (v) => ["dense", "comfortable", "loose"].includes(v)
    }
  },
  setup(props, { slots }) {
    const vm = getCurrentInstance();
    const isDark = useDark(props, vm.proxy.$q);
    provide(timelineKey, props);
    const classes = computed(
      () => `q-timeline q-timeline--${props.layout} q-timeline--${props.layout}--${props.side}` + (isDark.value === true ? " q-timeline--dark" : "")
    );
    return () => h("ul", { class: classes.value }, hSlot(slots.default));
  }
});
const _sfc_main = {
  __name: "SalesHistoryPage",
  setup(__props, { expose: __expose }) {
    __expose();
    const salesHistory = ref([]);
    const loading = ref(true);
    async function fetchSales() {
      loading.value = true;
      try {
        const response = await axios.get("http://localhost:3001/api/sales");
        salesHistory.value = response.data;
      } catch {
        salesHistory.value = [];
      }
      loading.value = false;
    }
    onMounted(fetchSales);
    async function limparHistorico(periodo) {
      try {
        await axios.delete(`http://localhost:3001/api/sales/clear/${periodo}`);
        Notify.create({
          type: "positive",
          message: `Vendas do ${periodo === "day" ? "dia" : periodo === "week" ? "semana" : "mês"} removidas!`
        });
        fetchSales();
      } catch {
        Notify.create({ type: "negative", message: "Erro ao limpar histórico." });
      }
    }
    function formatCurrency(value) {
      return Number(value).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    }
    const __returned__ = { salesHistory, loading, fetchSales, limparHistorico, formatCurrency, ref, onMounted, get axios() {
      return axios;
    }, get Notify() {
      return Notify;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1 = { class: "q-pa-md" };
const _hoisted_2 = { class: "row items-center justify-between" };
const _hoisted_3 = {
  key: 0,
  class: "text-center q-mt-md text-grey"
};
const _hoisted_4 = {
  key: 1,
  class: "text-center q-mt-md text-grey"
};
const _hoisted_5 = { key: 2 };
const _hoisted_6 = { class: "row items-center q-gutter-md" };
const _hoisted_7 = { class: "q-ml-xs" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QPage, null, {
    default: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        createVNode(QCard, {
          flat: "",
          bordered: ""
        }, {
          default: withCtx(() => [
            createVNode(QCardSection, null, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_2, [
                  _cache[3] || (_cache[3] = createBaseVNode("div", { class: "text-h6 custom-font-bold" }, "Vendas Registradas", -1)),
                  createBaseVNode("div", null, [
                    createVNode(QBtn, {
                      dense: "",
                      flat: "",
                      color: "negative",
                      label: "Limpar Dia",
                      onClick: _cache[0] || (_cache[0] = ($event) => $setup.limparHistorico("day"))
                    }),
                    createVNode(QBtn, {
                      dense: "",
                      flat: "",
                      color: "warning",
                      label: "Limpar Semana",
                      onClick: _cache[1] || (_cache[1] = ($event) => $setup.limparHistorico("week")),
                      class: "q-ml-xs"
                    }),
                    createVNode(QBtn, {
                      dense: "",
                      flat: "",
                      color: "primary",
                      label: "Limpar Mês",
                      onClick: _cache[2] || (_cache[2] = ($event) => $setup.limparHistorico("month")),
                      class: "q-ml-xs"
                    })
                  ])
                ])
              ]),
              _: 1
            }),
            createVNode(QCardSection, null, {
              default: withCtx(() => [
                $setup.loading ? (openBlock(), createElementBlock("div", _hoisted_3, "Carregando vendas...")) : !$setup.salesHistory.length ? (openBlock(), createElementBlock("div", _hoisted_4, "Nenhuma venda registrada até o momento.")) : (openBlock(), createElementBlock("div", _hoisted_5, [
                  createVNode(QTimeline, { color: "primary" }, {
                    default: withCtx(() => [
                      (openBlock(true), createElementBlock(Fragment, null, renderList($setup.salesHistory, (sale) => {
                        return openBlock(), createBlock(QTimelineEntry, {
                          key: sale.id,
                          title: sale.name,
                          subtitle: sale.date,
                          icon: "shopping_cart",
                          class: "q-mb-md"
                        }, {
                          default: withCtx(() => [
                            createBaseVNode("div", _hoisted_6, [
                              createVNode(QBadge, {
                                color: "blue",
                                align: "top"
                              }, {
                                default: withCtx(() => [
                                  _cache[4] || (_cache[4] = createTextVNode(" Quantidade: ")),
                                  createBaseVNode("span", _hoisted_7, toDisplayString(sale.quantity), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(QBadge, {
                                color: "green",
                                align: "top"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Unitário: " + toDisplayString($setup.formatCurrency(sale.price)), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(QBadge, {
                                color: "deep-orange",
                                align: "top"
                              }, {
                                default: withCtx(() => [
                                  _cache[5] || (_cache[5] = createTextVNode(" Total: ")),
                                  createBaseVNode("b", null, toDisplayString($setup.formatCurrency(sale.total ?? sale.price * sale.quantity)), 1)
                                ]),
                                _: 2
                              }, 1024),
                              sale.method ? (openBlock(), createBlock(QBadge, {
                                key: 0,
                                color: "grey-8",
                                align: "top"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(sale.method), 1)
                                ]),
                                _: 2
                              }, 1024)) : createCommentVNode("", true)
                            ])
                          ]),
                          _: 2
                        }, 1032, ["title", "subtitle"]);
                      }), 128))
                    ]),
                    _: 1
                  })
                ]))
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ])
    ]),
    _: 1
  });
}
const SalesHistoryPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-3c01505e"], ["__file", "SalesHistoryPage.vue"]]);
export {
  SalesHistoryPage as default
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2FsZXNIaXN0b3J5UGFnZS1DWEhqTXMtTi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy90aW1lbGluZS9RVGltZWxpbmVFbnRyeS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvdGltZWxpbmUvUVRpbWVsaW5lLmpzIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL1NhbGVzSGlzdG9yeVBhZ2UudnVlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGgsIGNvbXB1dGVkLCBpbmplY3QgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBRSWNvbiBmcm9tICcuLi9pY29uL1FJY29uLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoU2xvdCwgaFVuaXF1ZVNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnJlbmRlci9yZW5kZXIuanMnXG5pbXBvcnQgeyB0aW1lbGluZUtleSwgZW1wdHlSZW5kZXJGbiB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuc3ltYm9scy9zeW1ib2xzLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVRpbWVsaW5lRW50cnknLFxuXG4gIHByb3BzOiB7XG4gICAgaGVhZGluZzogQm9vbGVhbixcbiAgICB0YWc6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdoMydcbiAgICB9LFxuICAgIHNpZGU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdyaWdodCcsXG4gICAgICB2YWxpZGF0b3I6IHYgPT4gWyAnbGVmdCcsICdyaWdodCcgXS5pbmNsdWRlcyh2KVxuICAgIH0sXG5cbiAgICBpY29uOiBTdHJpbmcsXG4gICAgYXZhdGFyOiBTdHJpbmcsXG5cbiAgICBjb2xvcjogU3RyaW5nLFxuXG4gICAgdGl0bGU6IFN0cmluZyxcbiAgICBzdWJ0aXRsZTogU3RyaW5nLFxuICAgIGJvZHk6IFN0cmluZ1xuICB9LFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cyB9KSB7XG4gICAgY29uc3QgJHRpbWVsaW5lID0gaW5qZWN0KHRpbWVsaW5lS2V5LCBlbXB0eVJlbmRlckZuKVxuICAgIGlmICgkdGltZWxpbmUgPT09IGVtcHR5UmVuZGVyRm4pIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1FUaW1lbGluZUVudHJ5IG5lZWRzIHRvIGJlIGNoaWxkIG9mIFFUaW1lbGluZScpXG4gICAgICByZXR1cm4gZW1wdHlSZW5kZXJGblxuICAgIH1cblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgYHEtdGltZWxpbmVfX2VudHJ5IHEtdGltZWxpbmVfX2VudHJ5LS0keyBwcm9wcy5zaWRlIH1gXG4gICAgICArIChwcm9wcy5pY29uICE9PSB2b2lkIDAgfHwgcHJvcHMuYXZhdGFyICE9PSB2b2lkIDAgPyAnIHEtdGltZWxpbmVfX2VudHJ5LS1pY29uJyA6ICcnKVxuICAgIClcblxuICAgIGNvbnN0IGRvdENsYXNzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIGBxLXRpbWVsaW5lX19kb3QgdGV4dC0keyBwcm9wcy5jb2xvciB8fCAkdGltZWxpbmUuY29sb3IgfWBcbiAgICApXG5cbiAgICBjb25zdCByZXZlcnNlID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICR0aW1lbGluZS5sYXlvdXQgPT09ICdjb21mb3J0YWJsZScgJiYgJHRpbWVsaW5lLnNpZGUgPT09ICdsZWZ0J1xuICAgIClcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjb25zdCBjaGlsZCA9IGhVbmlxdWVTbG90KHNsb3RzLmRlZmF1bHQsIFtdKVxuXG4gICAgICBpZiAocHJvcHMuYm9keSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGNoaWxkLnVuc2hpZnQocHJvcHMuYm9keSlcbiAgICAgIH1cblxuICAgICAgaWYgKHByb3BzLmhlYWRpbmcgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3QgY29udGVudCA9IFtcbiAgICAgICAgICBoKCdkaXYnKSxcbiAgICAgICAgICBoKCdkaXYnKSxcbiAgICAgICAgICBoKFxuICAgICAgICAgICAgcHJvcHMudGFnLFxuICAgICAgICAgICAgeyBjbGFzczogJ3EtdGltZWxpbmVfX2hlYWRpbmctdGl0bGUnIH0sXG4gICAgICAgICAgICBjaGlsZFxuICAgICAgICAgIClcbiAgICAgICAgXVxuXG4gICAgICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLXRpbWVsaW5lX19oZWFkaW5nJ1xuICAgICAgICB9LCByZXZlcnNlLnZhbHVlID09PSB0cnVlID8gY29udGVudC5yZXZlcnNlKCkgOiBjb250ZW50KVxuICAgICAgfVxuXG4gICAgICBsZXQgZG90XG5cbiAgICAgIGlmIChwcm9wcy5pY29uICE9PSB2b2lkIDApIHtcbiAgICAgICAgZG90ID0gW1xuICAgICAgICAgIGgoUUljb24sIHtcbiAgICAgICAgICAgIGNsYXNzOiAncm93IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlcicsXG4gICAgICAgICAgICBuYW1lOiBwcm9wcy5pY29uXG4gICAgICAgICAgfSlcbiAgICAgICAgXVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAocHJvcHMuYXZhdGFyICE9PSB2b2lkIDApIHtcbiAgICAgICAgZG90ID0gW1xuICAgICAgICAgIGgoJ2ltZycsIHtcbiAgICAgICAgICAgIGNsYXNzOiAncS10aW1lbGluZV9fZG90LWltZycsXG4gICAgICAgICAgICBzcmM6IHByb3BzLmF2YXRhclxuICAgICAgICAgIH0pXG4gICAgICAgIF1cbiAgICAgIH1cblxuICAgICAgY29uc3QgY29udGVudCA9IFtcbiAgICAgICAgaCgnZGl2JywgeyBjbGFzczogJ3EtdGltZWxpbmVfX3N1YnRpdGxlJyB9LCBbXG4gICAgICAgICAgaCgnc3BhbicsIHt9LCBoU2xvdChzbG90cy5zdWJ0aXRsZSwgWyBwcm9wcy5zdWJ0aXRsZSBdKSlcbiAgICAgICAgXSksXG5cbiAgICAgICAgaCgnZGl2JywgeyBjbGFzczogZG90Q2xhc3MudmFsdWUgfSwgZG90KSxcblxuICAgICAgICBoKCdkaXYnLCB7IGNsYXNzOiAncS10aW1lbGluZV9fY29udGVudCcgfSwgW1xuICAgICAgICAgIGgoJ2g2JywgeyBjbGFzczogJ3EtdGltZWxpbmVfX3RpdGxlJyB9LCBoU2xvdChzbG90cy50aXRsZSwgWyBwcm9wcy50aXRsZSBdKSlcbiAgICAgICAgXS5jb25jYXQoY2hpbGQpKVxuICAgICAgXVxuXG4gICAgICByZXR1cm4gaCgnbGknLCB7XG4gICAgICAgIGNsYXNzOiBjbGFzc2VzLnZhbHVlXG4gICAgICB9LCByZXZlcnNlLnZhbHVlID09PSB0cnVlID8gY29udGVudC5yZXZlcnNlKCkgOiBjb250ZW50KVxuICAgIH1cbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIGNvbXB1dGVkLCBwcm92aWRlLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VEYXJrLCB7IHVzZURhcmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLWRhcmsvdXNlLWRhcmsuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5yZW5kZXIvcmVuZGVyLmpzJ1xuaW1wb3J0IHsgdGltZWxpbmVLZXkgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnN5bWJvbHMvc3ltYm9scy5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FUaW1lbGluZScsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VEYXJrUHJvcHMsXG5cbiAgICBjb2xvcjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ3ByaW1hcnknXG4gICAgfSxcbiAgICBzaWRlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAncmlnaHQnLFxuICAgICAgdmFsaWRhdG9yOiB2ID0+IFsgJ2xlZnQnLCAncmlnaHQnIF0uaW5jbHVkZXModilcbiAgICB9LFxuICAgIGxheW91dDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2RlbnNlJyxcbiAgICAgIHZhbGlkYXRvcjogdiA9PiBbICdkZW5zZScsICdjb21mb3J0YWJsZScsICdsb29zZScgXS5pbmNsdWRlcyh2KVxuICAgIH1cbiAgfSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCBpc0RhcmsgPSB1c2VEYXJrKHByb3BzLCB2bS5wcm94eS4kcSlcblxuICAgIHByb3ZpZGUodGltZWxpbmVLZXksIHByb3BzKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBgcS10aW1lbGluZSBxLXRpbWVsaW5lLS0keyBwcm9wcy5sYXlvdXQgfSBxLXRpbWVsaW5lLS0keyBwcm9wcy5sYXlvdXQgfS0tJHsgcHJvcHMuc2lkZSB9YFxuICAgICAgKyAoaXNEYXJrLnZhbHVlID09PSB0cnVlID8gJyBxLXRpbWVsaW5lLS1kYXJrJyA6ICcnKVxuICAgIClcblxuICAgIHJldHVybiAoKSA9PiBoKCd1bCcsIHsgY2xhc3M6IGNsYXNzZXMudmFsdWUgfSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpXG4gIH1cbn0pXG4iLCI8dGVtcGxhdGU+XG4gIDxxLXBhZ2U+XG4gICAgPGRpdiBjbGFzcz1cInEtcGEtbWRcIj5cbiAgICAgIDxxLWNhcmQgZmxhdCBib3JkZXJlZD5cbiAgICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDYgY3VzdG9tLWZvbnQtYm9sZFwiPlZlbmRhcyBSZWdpc3RyYWRhczwvZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPHEtYnRuXG4gICAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgICBmbGF0XG4gICAgICAgICAgICAgICAgY29sb3I9XCJuZWdhdGl2ZVwiXG4gICAgICAgICAgICAgICAgbGFiZWw9XCJMaW1wYXIgRGlhXCJcbiAgICAgICAgICAgICAgICBAY2xpY2s9XCJsaW1wYXJIaXN0b3JpY28oJ2RheScpXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPHEtYnRuXG4gICAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgICBmbGF0XG4gICAgICAgICAgICAgICAgY29sb3I9XCJ3YXJuaW5nXCJcbiAgICAgICAgICAgICAgICBsYWJlbD1cIkxpbXBhciBTZW1hbmFcIlxuICAgICAgICAgICAgICAgIEBjbGljaz1cImxpbXBhckhpc3Rvcmljbygnd2VlaycpXCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cInEtbWwteHNcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8cS1idG5cbiAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgIGZsYXRcbiAgICAgICAgICAgICAgICBjb2xvcj1cInByaW1hcnlcIlxuICAgICAgICAgICAgICAgIGxhYmVsPVwiTGltcGFyIE3DqnNcIlxuICAgICAgICAgICAgICAgIEBjbGljaz1cImxpbXBhckhpc3RvcmljbygnbW9udGgnKVwiXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJxLW1sLXhzXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgICAgICA8cS1jYXJkLXNlY3Rpb24+XG4gICAgICAgICAgPHRlbXBsYXRlIHYtaWY9XCJsb2FkaW5nXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1jZW50ZXIgcS1tdC1tZCB0ZXh0LWdyZXlcIj5DYXJyZWdhbmRvIHZlbmRhcy4uLjwvZGl2PlxuICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgPHRlbXBsYXRlIHYtZWxzZS1pZj1cIiFzYWxlc0hpc3RvcnkubGVuZ3RoXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1jZW50ZXIgcS1tdC1tZCB0ZXh0LWdyZXlcIj5OZW5odW1hIHZlbmRhIHJlZ2lzdHJhZGEgYXTDqSBvIG1vbWVudG8uPC9kaXY+XG4gICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICA8ZGl2IHYtZWxzZT5cbiAgICAgICAgICAgIDxxLXRpbWVsaW5lIGNvbG9yPVwicHJpbWFyeVwiPlxuICAgICAgICAgICAgICA8cS10aW1lbGluZS1lbnRyeVxuICAgICAgICAgICAgICAgIHYtZm9yPVwic2FsZSBpbiBzYWxlc0hpc3RvcnlcIlxuICAgICAgICAgICAgICAgIDprZXk9XCJzYWxlLmlkXCJcbiAgICAgICAgICAgICAgICA6dGl0bGU9XCJzYWxlLm5hbWVcIlxuICAgICAgICAgICAgICAgIDpzdWJ0aXRsZT1cInNhbGUuZGF0ZVwiXG4gICAgICAgICAgICAgICAgaWNvbj1cInNob3BwaW5nX2NhcnRcIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwicS1tYi1tZFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IGl0ZW1zLWNlbnRlciBxLWd1dHRlci1tZFwiPlxuICAgICAgICAgICAgICAgICAgPHEtYmFkZ2UgY29sb3I9XCJibHVlXCIgYWxpZ249XCJ0b3BcIj5cbiAgICAgICAgICAgICAgICAgICAgUXVhbnRpZGFkZTogPHNwYW4gY2xhc3M9XCJxLW1sLXhzXCI+e3sgc2FsZS5xdWFudGl0eSB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvcS1iYWRnZT5cbiAgICAgICAgICAgICAgICAgIDxxLWJhZGdlIGNvbG9yPVwiZ3JlZW5cIiBhbGlnbj1cInRvcFwiPlxuICAgICAgICAgICAgICAgICAgICBVbml0w6FyaW86IHt7IGZvcm1hdEN1cnJlbmN5KHNhbGUucHJpY2UpIH19XG4gICAgICAgICAgICAgICAgICA8L3EtYmFkZ2U+XG4gICAgICAgICAgICAgICAgICA8cS1iYWRnZSBjb2xvcj1cImRlZXAtb3JhbmdlXCIgYWxpZ249XCJ0b3BcIj5cbiAgICAgICAgICAgICAgICAgICAgVG90YWw6IDxiPnt7IGZvcm1hdEN1cnJlbmN5KHNhbGUudG90YWwgPz8gc2FsZS5wcmljZSAqIHNhbGUucXVhbnRpdHkpIH19PC9iPlxuICAgICAgICAgICAgICAgICAgPC9xLWJhZGdlPlxuICAgICAgICAgICAgICAgICAgPHEtYmFkZ2Ugdi1pZj1cInNhbGUubWV0aG9kXCIgY29sb3I9XCJncmV5LThcIiBhbGlnbj1cInRvcFwiPlxuICAgICAgICAgICAgICAgICAgICB7eyBzYWxlLm1ldGhvZCB9fVxuICAgICAgICAgICAgICAgICAgPC9xLWJhZGdlPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L3EtdGltZWxpbmUtZW50cnk+XG4gICAgICAgICAgICA8L3EtdGltZWxpbmU+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICA8L3EtY2FyZD5cbiAgICA8L2Rpdj5cbiAgPC9xLXBhZ2U+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgcmVmLCBvbk1vdW50ZWQgfSBmcm9tICd2dWUnXG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnXG5pbXBvcnQgeyBOb3RpZnkgfSBmcm9tICdxdWFzYXInXG5cbmNvbnN0IHNhbGVzSGlzdG9yeSA9IHJlZihbXSlcbmNvbnN0IGxvYWRpbmcgPSByZWYodHJ1ZSlcblxuYXN5bmMgZnVuY3Rpb24gZmV0Y2hTYWxlcygpIHtcbiAgbG9hZGluZy52YWx1ZSA9IHRydWVcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGF4aW9zLmdldCgnaHR0cDovL2xvY2FsaG9zdDozMDAxL2FwaS9zYWxlcycpXG4gICAgc2FsZXNIaXN0b3J5LnZhbHVlID0gcmVzcG9uc2UuZGF0YVxuICB9IGNhdGNoIHtcbiAgICBzYWxlc0hpc3RvcnkudmFsdWUgPSBbXVxuICB9XG4gIGxvYWRpbmcudmFsdWUgPSBmYWxzZVxufVxuXG5vbk1vdW50ZWQoZmV0Y2hTYWxlcylcblxuYXN5bmMgZnVuY3Rpb24gbGltcGFySGlzdG9yaWNvKHBlcmlvZG8pIHtcbiAgdHJ5IHtcbiAgICBhd2FpdCBheGlvcy5kZWxldGUoYGh0dHA6Ly9sb2NhbGhvc3Q6MzAwMS9hcGkvc2FsZXMvY2xlYXIvJHtwZXJpb2RvfWApXG4gICAgTm90aWZ5LmNyZWF0ZSh7XG4gICAgICB0eXBlOiAncG9zaXRpdmUnLFxuICAgICAgbWVzc2FnZTogYFZlbmRhcyBkbyAke3BlcmlvZG8gPT09ICdkYXknID8gJ2RpYScgOiBwZXJpb2RvID09PSAnd2VlaycgPyAnc2VtYW5hJyA6ICdtw6pzJ30gcmVtb3ZpZGFzIWAsXG4gICAgfSlcbiAgICBmZXRjaFNhbGVzKClcbiAgfSBjYXRjaCB7XG4gICAgTm90aWZ5LmNyZWF0ZSh7IHR5cGU6ICduZWdhdGl2ZScsIG1lc3NhZ2U6ICdFcnJvIGFvIGxpbXBhciBoaXN0w7NyaWNvLicgfSlcbiAgfVxufVxuXG5mdW5jdGlvbiBmb3JtYXRDdXJyZW5jeSh2YWx1ZSkge1xuICByZXR1cm4gTnVtYmVyKHZhbHVlKS50b0xvY2FsZVN0cmluZygncHQtQlInLCB7IHN0eWxlOiAnY3VycmVuY3knLCBjdXJyZW5jeTogJ0JSTCcgfSlcbn1cbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuLmN1c3RvbS1mb250LWJvbGQge1xuICBmb250LWZhbWlseTogJ1JvYm90bycsIHNhbnMtc2VyaWY7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG4ucS1iYWRnZSB7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbn1cbjwvc3R5bGU+XG4iXSwibmFtZXMiOlsiY29udGVudCIsIl9jcmVhdGVCbG9jayIsIl93aXRoQ3R4IiwiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIl9jcmVhdGVWTm9kZSIsIl9jcmVhdGVFbGVtZW50QmxvY2siLCJfb3BlbkJsb2NrIiwiX0ZyYWdtZW50IiwiX3JlbmRlckxpc3QiLCJfY3JlYXRlVGV4dFZOb2RlIiwiX3RvRGlzcGxheVN0cmluZyIsIl9jcmVhdGVDb21tZW50Vk5vZGUiXSwibWFwcGluZ3MiOiI7Ozs7QUFRQSxNQUFBLGlCQUFlLGdCQUFnQjtBQUFBLEVBQzdCLE1BQU07QUFBQSxFQUVOLE9BQU87QUFBQSxJQUNMLFNBQVM7QUFBQSxJQUNULEtBQUs7QUFBQSxNQUNILE1BQU07QUFBQSxNQUNOLFNBQVM7QUFBQSxJQUNWO0FBQUEsSUFDRCxNQUFNO0FBQUEsTUFDSixNQUFNO0FBQUEsTUFDTixTQUFTO0FBQUEsTUFDVCxXQUFXLE9BQUssQ0FBRSxRQUFRLE9BQVMsRUFBQyxTQUFTLENBQUM7QUFBQSxJQUMvQztBQUFBLElBRUQsTUFBTTtBQUFBLElBQ04sUUFBUTtBQUFBLElBRVIsT0FBTztBQUFBLElBRVAsT0FBTztBQUFBLElBQ1AsVUFBVTtBQUFBLElBQ1YsTUFBTTtBQUFBLEVBQ1A7QUFBQSxFQUVELE1BQU8sT0FBTyxFQUFFLFNBQVM7QUFDdkIsVUFBTSxZQUFZLE9BQU8sYUFBYSxhQUFhO0FBQ25ELFFBQUksY0FBYyxlQUFlO0FBQy9CLGNBQVEsTUFBTSwrQ0FBK0M7QUFDN0QsYUFBTztBQUFBLElBQ2I7QUFFSSxVQUFNLFVBQVU7QUFBQSxNQUFTLE1BQ3ZCLHdDQUF5QyxNQUFNLElBQU0sTUFDbEQsTUFBTSxTQUFTLFVBQVUsTUFBTSxXQUFXLFNBQVMsNkJBQTZCO0FBQUEsSUFDekY7QUFFSSxVQUFNLFdBQVc7QUFBQSxNQUFTLE1B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
