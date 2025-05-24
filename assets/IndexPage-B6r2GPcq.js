import { c as createComponent, C as useDarkProps, E as useDark, g as getCurrentInstance, k as computed, h, L as hSlot, a9 as defineStore, r as ref, _ as _export_sfc, X as createBlock, Y as openBlock, Z as withCtx, a0 as createBaseVNode, $ as createVNode, a2 as createTextVNode, a6 as QIcon, a1 as QBtn, aa as QCard, ab as QCardSection, a3 as createElementBlock, a4 as Fragment, a7 as toDisplayString, ac as createCommentVNode, U as onUnmounted, o as onMounted, b as nextTick } from "./index-DTRxxbQ7.js";
import { Q as QPage } from "./QPage-pt9NM7Fr.js";
import { u as useProductStore } from "./product-store-C3IlpoxU.js";
import { u as useSalesStore } from "./sales-store-BduwSnzu.js";
import { C as Chart, B as BarController, a as BarElement, b as CategoryScale, L as LinearScale, p as plugin_tooltip, c as plugin_legend, P as PieController, A as ArcElement } from "./chart-CvTfpdrd.js";
import "./index-BSBq6A-N.js";
const skeletonTypes = [
  "text",
  "rect",
  "circle",
  "QBtn",
  "QBadge",
  "QChip",
  "QToolbar",
  "QCheckbox",
  "QRadio",
  "QToggle",
  "QSlider",
  "QRange",
  "QInput",
  "QAvatar"
];
const skeletonAnimations = [
  "wave",
  "pulse",
  "pulse-x",
  "pulse-y",
  "fade",
  "blink",
  "none"
];
const QSkeleton = createComponent({
  name: "QSkeleton",
  props: {
    ...useDarkProps,
    tag: {
      type: String,
      default: "div"
    },
    type: {
      type: String,
      validator: (v) => skeletonTypes.includes(v),
      default: "rect"
    },
    animation: {
      type: String,
      validator: (v) => skeletonAnimations.includes(v),
      default: "wave"
    },
    animationSpeed: {
      type: [String, Number],
      default: 1500
    },
    square: Boolean,
    bordered: Boolean,
    size: String,
    width: String,
    height: String
  },
  setup(props, { slots }) {
    const vm = getCurrentInstance();
    const isDark = useDark(props, vm.proxy.$q);
    const style = computed(() => {
      const size = props.size !== void 0 ? [props.size, props.size] : [props.width, props.height];
      return {
        "--q-skeleton-speed": `${props.animationSpeed}ms`,
        width: size[0],
        height: size[1]
      };
    });
    const classes = computed(
      () => `q-skeleton q-skeleton--${isDark.value === true ? "dark" : "light"} q-skeleton--type-${props.type}` + (props.animation !== "none" ? ` q-skeleton--anim q-skeleton--anim-${props.animation}` : "") + (props.square === true ? " q-skeleton--square" : "") + (props.bordered === true ? " q-skeleton--bordered" : "")
    );
    return () => h(props.tag, {
      class: classes.value,
      style: style.value
    }, hSlot(slots.default));
  }
});
const useReportStore = defineStore("report", () => {
  const reports = ref([
    { id: 1, name: "Relatório Mensal" },
    { id: 2, name: "Relatório de Estoque" }
  ]);
  return { reports };
});
const useInvestmentStore = defineStore("investment", () => {
  const totalInvested = ref(5e3);
  return { totalInvested };
});
const _sfc_main = {
  __name: "IndexPage",
  setup(__props, { expose: __expose }) {
    __expose();
    Chart.register(
      BarController,
      BarElement,
      CategoryScale,
      LinearScale,
      plugin_tooltip,
      plugin_legend,
      PieController,
      ArcElement
    );
    const productStore = useProductStore();
    const reportStore = useReportStore();
    const investmentStore = useInvestmentStore();
    const salesStore = useSalesStore();
    const productsCount = ref(0);
    const reportsCount = ref(0);
    const totalInvestments = ref(0);
    const totalSales = ref(0);
    const loading = ref(true);
    const salesChart = ref(null);
    let salesChartInstance = null;
    const productsChart = ref(null);
    let productsChartInstance = null;
    const prodData = ref([]);
    async function refreshDashboard() {
      loading.value = true;
      if (productStore.loadProducts) await productStore.loadProducts();
      if (reportStore.loadReports) await reportStore.loadReports();
      if (investmentStore.loadInvestments) await investmentStore.loadInvestments();
      if (salesStore.loadSales) await salesStore.loadSales();
      productsCount.value = productStore.products?.length || 0;
      reportsCount.value = reportStore.reports?.length || 0;
      totalInvestments.value = investmentStore.totalInvested || 0;
      totalSales.value = salesStore.totalSalesValue || 0;
      prodData.value = productStore.products?.slice(0, 5) || [];
      await renderCharts();
      loading.value = false;
    }
    async function renderCharts() {
      await nextTick();
      if (salesChartInstance) salesChartInstance.destroy();
      if (productsChartInstance) productsChartInstance.destroy();
      try {
        const salesData = salesStore.getSalesLast7Days?.() || [
          { date: "Seg", value: 10 },
          { date: "Ter", value: 20 },
          { date: "Qua", value: 15 },
          { date: "Qui", value: 30 },
          { date: "Sex", value: 25 },
          { date: "Sáb", value: 18 },
          { date: "Dom", value: 12 }
        ];
        if (salesChart.value) {
          salesChartInstance = new Chart(salesChart.value, {
            type: "bar",
            data: {
              labels: salesData.map((d) => d.date),
              datasets: [
                {
                  label: "Vendas",
                  data: salesData.map((d) => d.value),
                  backgroundColor: "#1976d2",
                  borderRadius: 8
                }
              ]
            },
            options: {
              responsive: true,
              plugins: { legend: { display: false } },
              scales: { y: { beginAtZero: true } }
            }
          });
        }
        if (productsChart.value && prodData.value.length) {
          productsChartInstance = new Chart(productsChart.value, {
            type: "pie",
            data: {
              labels: prodData.value.map((p) => p.name),
              datasets: [
                {
                  data: prodData.value.map((p) => p.quantity),
                  backgroundColor: ["#1976d2", "#43a047", "#fb8c00", "#8e24aa", "#e53935"]
                }
              ]
            },
            options: {
              responsive: true,
              plugins: { legend: { position: "bottom" } }
            }
          });
        }
      } catch (err) {
        console.error("Erro ao renderizar gráficos:", err);
      }
    }
    onUnmounted(() => {
      if (salesChartInstance) salesChartInstance.destroy();
      if (productsChartInstance) productsChartInstance.destroy();
    });
    onMounted(async () => {
      await refreshDashboard();
    });
    const __returned__ = { productStore, reportStore, investmentStore, salesStore, productsCount, reportsCount, totalInvestments, totalSales, loading, salesChart, get salesChartInstance() {
      return salesChartInstance;
    }, set salesChartInstance(v) {
      salesChartInstance = v;
    }, productsChart, get productsChartInstance() {
      return productsChartInstance;
    }, set productsChartInstance(v) {
      productsChartInstance = v;
    }, prodData, refreshDashboard, renderCharts, ref, onMounted, onUnmounted, nextTick, get useProductStore() {
      return useProductStore;
    }, get useReportStore() {
      return useReportStore;
    }, get useInvestmentStore() {
      return useInvestmentStore;
    }, get useSalesStore() {
      return useSalesStore;
    }, get Chart() {
      return Chart;
    }, get BarController() {
      return BarController;
    }, get BarElement() {
      return BarElement;
    }, get CategoryScale() {
      return CategoryScale;
    }, get LinearScale() {
      return LinearScale;
    }, get Tooltip() {
      return plugin_tooltip;
    }, get Legend() {
      return plugin_legend;
    }, get PieController() {
      return PieController;
    }, get ArcElement() {
      return ArcElement;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1 = { class: "dashboard-container" };
const _hoisted_2 = { class: "dashboard-title text-h4 text-center q-mb-lg" };
const _hoisted_3 = { class: "row justify-end q-mb-md" };
const _hoisted_4 = { class: "dashboard-cards q-gutter-md row wrap justify-center" };
const _hoisted_5 = { class: "dashboard-card-title" };
const _hoisted_6 = { class: "dashboard-card-value" };
const _hoisted_7 = { class: "dashboard-card-desc" };
const _hoisted_8 = { class: "dashboard-card-title" };
const _hoisted_9 = { class: "dashboard-card-value" };
const _hoisted_10 = { class: "dashboard-card-title" };
const _hoisted_11 = { class: "dashboard-card-value" };
const _hoisted_12 = { class: "dashboard-card-title" };
const _hoisted_13 = { class: "dashboard-card-value" };
const _hoisted_14 = { class: "dashboard-charts row q-mt-xl q-gutter-md" };
const _hoisted_15 = { class: "dashboard-chart-title" };
const _hoisted_16 = { ref: "salesChart" };
const _hoisted_17 = { class: "dashboard-chart-title" };
const _hoisted_18 = {
  key: 0,
  class: "text-grey text-center q-mt-md"
};
const _hoisted_19 = {
  key: 1,
  ref: "productsChart"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QPage, null, {
    default: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createVNode(QIcon, {
            name: "dashboard",
            color: "primary",
            size: "36px",
            class: "q-mr-sm"
          }),
          _cache[0] || (_cache[0] = createTextVNode(" Dashboard Geral "))
        ]),
        createBaseVNode("div", _hoisted_3, [
          createVNode(QBtn, {
            color: "primary",
            icon: "refresh",
            label: "Atualizar",
            onClick: $setup.refreshDashboard,
            loading: $setup.loading,
            unelevated: ""
          }, null, 8, ["loading"])
        ]),
        createBaseVNode("div", _hoisted_4, [
          createVNode(QCard, { class: "dashboard-card col-12 col-sm-6 col-md-3" }, {
            default: withCtx(() => [
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_5, [
                    createVNode(QIcon, {
                      name: "shopping_cart",
                      color: "primary",
                      size: "28px",
                      class: "q-mr-sm"
                    }),
                    _cache[1] || (_cache[1] = createTextVNode(" Produtos "))
                  ]),
                  createBaseVNode("div", _hoisted_6, [
                    $setup.loading ? (openBlock(), createBlock(QSkeleton, {
                      key: 0,
                      type: "text",
                      width: "60px"
                    })) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                      createTextVNode(toDisplayString($setup.productsCount), 1)
                    ], 64))
                  ]),
                  createBaseVNode("div", _hoisted_7, toDisplayString($setup.productsCount === 1 ? "Cadastrado" : "Cadastrados"), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(QCard, { class: "dashboard-card col-xs-12 col-sm-6 col-md-3" }, {
            default: withCtx(() => [
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_8, [
                    createVNode(QIcon, {
                      name: "attach_money",
                      color: "green",
                      size: "28px",
                      class: "q-mr-sm"
                    }),
                    _cache[2] || (_cache[2] = createTextVNode(" Vendas "))
                  ]),
                  createBaseVNode("div", _hoisted_9, " R$ " + toDisplayString($setup.totalSales.toLocaleString("pt-BR", { minimumFractionDigits: 2 })), 1),
                  _cache[3] || (_cache[3] = createBaseVNode("div", { class: "dashboard-card-desc" }, "Total Vendido", -1))
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(QCard, { class: "dashboard-card col-xs-12 col-sm-6 col-md-3" }, {
            default: withCtx(() => [
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_10, [
                    createVNode(QIcon, {
                      name: "bar_chart",
                      color: "deep-orange",
                      size: "28px",
                      class: "q-mr-sm"
                    }),
                    _cache[4] || (_cache[4] = createTextVNode(" Relatórios "))
                  ]),
                  createBaseVNode("div", _hoisted_11, toDisplayString($setup.reportsCount), 1),
                  _cache[5] || (_cache[5] = createBaseVNode("div", { class: "dashboard-card-desc" }, "Gerados", -1))
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(QCard, { class: "dashboard-card col-xs-12 col-sm-6 col-md-3" }, {
            default: withCtx(() => [
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_12, [
                    createVNode(QIcon, {
                      name: "account_balance_wallet",
                      color: "purple",
                      size: "28px",
                      class: "q-mr-sm"
                    }),
                    _cache[6] || (_cache[6] = createTextVNode(" Investimentos "))
                  ]),
                  createBaseVNode("div", _hoisted_13, " R$ " + toDisplayString($setup.totalInvestments.toLocaleString("pt-BR", { minimumFractionDigits: 2 })), 1),
                  _cache[7] || (_cache[7] = createBaseVNode("div", { class: "dashboard-card-desc" }, "Total Investido", -1))
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        createBaseVNode("div", _hoisted_14, [
          createVNode(QCard, { class: "dashboard-chart-card col-xs-12 col-md-6" }, {
            default: withCtx(() => [
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_15, [
                    createVNode(QIcon, {
                      name: "show_chart",
                      color: "primary",
                      size: "24px",
                      class: "q-mr-sm"
                    }),
                    _cache[8] || (_cache[8] = createTextVNode(" Vendas dos Últimos 7 Dias "))
                  ]),
                  createBaseVNode("canvas", _hoisted_16, null, 512)
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(QCard, { class: "dashboard-chart-card col-xs-12 col-md-6" }, {
            default: withCtx(() => [
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_17, [
                    createVNode(QIcon, {
                      name: "pie_chart",
                      color: "deep-orange",
                      size: "24px",
                      class: "q-mr-sm"
                    }),
                    _cache[9] || (_cache[9] = createTextVNode(" Distribuição de Produtos "))
                  ]),
                  !$setup.prodData.length ? (openBlock(), createElementBlock("div", _hoisted_18, " Nenhum produto cadastrado. ")) : createCommentVNode("", true),
                  $setup.prodData.length ? (openBlock(), createElementBlock("canvas", _hoisted_19, null, 512)) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ])
      ])
    ]),
    _: 1
  });
}
const IndexPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-af979aa3"], ["__file", "IndexPage.vue"]]);
export {
  IndexPage as default
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5kZXhQYWdlLUI2cjJHUGNxLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3NrZWxldG9uL1FTa2VsZXRvbi5qcyIsIi4uLy4uLy4uL3NyYy9zdG9yZXMvcmVwb3J0LXN0b3JlLmpzIiwiLi4vLi4vLi4vc3JjL3N0b3Jlcy9pbnZlc3RtZW50LXN0b3JlLmpzIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL0luZGV4UGFnZS52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaCwgY29tcHV0ZWQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHVzZURhcmssIHsgdXNlRGFya1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtZGFyay91c2UtZGFyay5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnJlbmRlci9yZW5kZXIuanMnXG5cbmV4cG9ydCBjb25zdCBza2VsZXRvblR5cGVzID0gW1xuICAndGV4dCcsICdyZWN0JywgJ2NpcmNsZScsXG4gICdRQnRuJywgJ1FCYWRnZScsICdRQ2hpcCcsICdRVG9vbGJhcicsXG4gICdRQ2hlY2tib3gnLCAnUVJhZGlvJywgJ1FUb2dnbGUnLFxuICAnUVNsaWRlcicsICdRUmFuZ2UnLCAnUUlucHV0JyxcbiAgJ1FBdmF0YXInXG5dXG5cbmV4cG9ydCBjb25zdCBza2VsZXRvbkFuaW1hdGlvbnMgPSBbXG4gICd3YXZlJywgJ3B1bHNlJywgJ3B1bHNlLXgnLCAncHVsc2UteScsICdmYWRlJywgJ2JsaW5rJywgJ25vbmUnXG5dXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRU2tlbGV0b24nLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlRGFya1Byb3BzLFxuXG4gICAgdGFnOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnZGl2J1xuICAgIH0sXG5cbiAgICB0eXBlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWxpZGF0b3I6IHYgPT4gc2tlbGV0b25UeXBlcy5pbmNsdWRlcyh2KSxcbiAgICAgIGRlZmF1bHQ6ICdyZWN0J1xuICAgIH0sXG5cbiAgICBhbmltYXRpb246IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbGlkYXRvcjogdiA9PiBza2VsZXRvbkFuaW1hdGlvbnMuaW5jbHVkZXModiksXG4gICAgICBkZWZhdWx0OiAnd2F2ZSdcbiAgICB9LFxuICAgIGFuaW1hdGlvblNwZWVkOiB7XG4gICAgICB0eXBlOiBbIFN0cmluZywgTnVtYmVyIF0sXG4gICAgICBkZWZhdWx0OiAxNTAwXG4gICAgfSxcblxuICAgIHNxdWFyZTogQm9vbGVhbixcbiAgICBib3JkZXJlZDogQm9vbGVhbixcblxuICAgIHNpemU6IFN0cmluZyxcbiAgICB3aWR0aDogU3RyaW5nLFxuICAgIGhlaWdodDogU3RyaW5nXG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCB2bSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgY29uc3QgaXNEYXJrID0gdXNlRGFyayhwcm9wcywgdm0ucHJveHkuJHEpXG5cbiAgICBjb25zdCBzdHlsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IHNpemUgPSBwcm9wcy5zaXplICE9PSB2b2lkIDBcbiAgICAgICAgPyBbIHByb3BzLnNpemUsIHByb3BzLnNpemUgXVxuICAgICAgICA6IFsgcHJvcHMud2lkdGgsIHByb3BzLmhlaWdodCBdXG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgICctLXEtc2tlbGV0b24tc3BlZWQnOiBgJHsgcHJvcHMuYW5pbWF0aW9uU3BlZWQgfW1zYCxcbiAgICAgICAgd2lkdGg6IHNpemVbIDAgXSxcbiAgICAgICAgaGVpZ2h0OiBzaXplWyAxIF1cbiAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBgcS1za2VsZXRvbiBxLXNrZWxldG9uLS0keyBpc0RhcmsudmFsdWUgPT09IHRydWUgPyAnZGFyaycgOiAnbGlnaHQnIH0gcS1za2VsZXRvbi0tdHlwZS0keyBwcm9wcy50eXBlIH1gXG4gICAgICArIChwcm9wcy5hbmltYXRpb24gIT09ICdub25lJyA/IGAgcS1za2VsZXRvbi0tYW5pbSBxLXNrZWxldG9uLS1hbmltLSR7IHByb3BzLmFuaW1hdGlvbiB9YCA6ICcnKVxuICAgICAgKyAocHJvcHMuc3F1YXJlID09PSB0cnVlID8gJyBxLXNrZWxldG9uLS1zcXVhcmUnIDogJycpXG4gICAgICArIChwcm9wcy5ib3JkZXJlZCA9PT0gdHJ1ZSA/ICcgcS1za2VsZXRvbi0tYm9yZGVyZWQnIDogJycpXG4gICAgKVxuXG4gICAgcmV0dXJuICgpID0+IGgocHJvcHMudGFnLCB7XG4gICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgIHN0eWxlOiBzdHlsZS52YWx1ZVxuICAgIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICB9XG59KVxuIiwiaW1wb3J0IHsgZGVmaW5lU3RvcmUgfSBmcm9tICdwaW5pYSdcclxuaW1wb3J0IHsgcmVmIH0gZnJvbSAndnVlJ1xyXG5cclxuZXhwb3J0IGNvbnN0IHVzZVJlcG9ydFN0b3JlID0gZGVmaW5lU3RvcmUoJ3JlcG9ydCcsICgpID0+IHtcclxuICBjb25zdCByZXBvcnRzID0gcmVmKFtcclxuICAgIHsgaWQ6IDEsIG5hbWU6ICdSZWxhdMOzcmlvIE1lbnNhbCcgfSxcclxuICAgIHsgaWQ6IDIsIG5hbWU6ICdSZWxhdMOzcmlvIGRlIEVzdG9xdWUnIH0sXHJcbiAgXSlcclxuICByZXR1cm4geyByZXBvcnRzIH1cclxufSlcclxuIiwiaW1wb3J0IHsgZGVmaW5lU3RvcmUgfSBmcm9tICdwaW5pYSdcclxuaW1wb3J0IHsgcmVmIH0gZnJvbSAndnVlJ1xyXG5cclxuZXhwb3J0IGNvbnN0IHVzZUludmVzdG1lbnRTdG9yZSA9IGRlZmluZVN0b3JlKCdpbnZlc3RtZW50JywgKCkgPT4ge1xyXG4gIGNvbnN0IHRvdGFsSW52ZXN0ZWQgPSByZWYoNTAwMCkgLy8gdmFsb3IgaW5pY2lhbCBmaWN0w61jaW9cclxuICAvLyBWb2PDqiBwb2RlIGFkaWNpb25hciBtYWlzIGRhZG9zIGNvbmZvcm1lIG5lY2Vzc8OhcmlvXHJcbiAgcmV0dXJuIHsgdG90YWxJbnZlc3RlZCB9XHJcbn0pXHJcbiIsIjx0ZW1wbGF0ZT5cbiAgPHEtcGFnZT5cbiAgICA8ZGl2IGNsYXNzPVwiZGFzaGJvYXJkLWNvbnRhaW5lclwiPlxuICAgICAgPGRpdiBjbGFzcz1cImRhc2hib2FyZC10aXRsZSB0ZXh0LWg0IHRleHQtY2VudGVyIHEtbWItbGdcIj5cbiAgICAgICAgPHEtaWNvbiBuYW1lPVwiZGFzaGJvYXJkXCIgY29sb3I9XCJwcmltYXJ5XCIgc2l6ZT1cIjM2cHhcIiBjbGFzcz1cInEtbXItc21cIiAvPlxuICAgICAgICBEYXNoYm9hcmQgR2VyYWxcbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInJvdyBqdXN0aWZ5LWVuZCBxLW1iLW1kXCI+XG4gICAgICAgIDxxLWJ0blxuICAgICAgICAgIGNvbG9yPVwicHJpbWFyeVwiXG4gICAgICAgICAgaWNvbj1cInJlZnJlc2hcIlxuICAgICAgICAgIGxhYmVsPVwiQXR1YWxpemFyXCJcbiAgICAgICAgICBAY2xpY2s9XCJyZWZyZXNoRGFzaGJvYXJkXCJcbiAgICAgICAgICA6bG9hZGluZz1cImxvYWRpbmdcIlxuICAgICAgICAgIHVuZWxldmF0ZWRcbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImRhc2hib2FyZC1jYXJkcyBxLWd1dHRlci1tZCByb3cgd3JhcCBqdXN0aWZ5LWNlbnRlclwiPlxuICAgICAgICA8IS0tIENhcmRzIGRlIHJlc3VtbyAtLT5cbiAgICAgICAgPHEtY2FyZCBjbGFzcz1cImRhc2hib2FyZC1jYXJkIGNvbC0xMiBjb2wtc20tNiBjb2wtbWQtM1wiPlxuICAgICAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkYXNoYm9hcmQtY2FyZC10aXRsZVwiPlxuICAgICAgICAgICAgICA8cS1pY29uIG5hbWU9XCJzaG9wcGluZ19jYXJ0XCIgY29sb3I9XCJwcmltYXJ5XCIgc2l6ZT1cIjI4cHhcIiBjbGFzcz1cInEtbXItc21cIiAvPlxuICAgICAgICAgICAgICBQcm9kdXRvc1xuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGFzaGJvYXJkLWNhcmQtdmFsdWVcIj5cbiAgICAgICAgICAgICAgPHEtc2tlbGV0b24gdi1pZj1cImxvYWRpbmdcIiB0eXBlPVwidGV4dFwiIHdpZHRoPVwiNjBweFwiIC8+XG4gICAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LWVsc2U+e3sgcHJvZHVjdHNDb3VudCB9fTwvdGVtcGxhdGU+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkYXNoYm9hcmQtY2FyZC1kZXNjXCI+XG4gICAgICAgICAgICAgIHt7IHByb2R1Y3RzQ291bnQgPT09IDEgPyAnQ2FkYXN0cmFkbycgOiAnQ2FkYXN0cmFkb3MnIH19XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgICAgICA8L3EtY2FyZD5cbiAgICAgICAgPHEtY2FyZCBjbGFzcz1cImRhc2hib2FyZC1jYXJkIGNvbC14cy0xMiBjb2wtc20tNiBjb2wtbWQtM1wiPlxuICAgICAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkYXNoYm9hcmQtY2FyZC10aXRsZVwiPlxuICAgICAgICAgICAgICA8cS1pY29uIG5hbWU9XCJhdHRhY2hfbW9uZXlcIiBjb2xvcj1cImdyZWVuXCIgc2l6ZT1cIjI4cHhcIiBjbGFzcz1cInEtbXItc21cIiAvPlxuICAgICAgICAgICAgICBWZW5kYXNcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRhc2hib2FyZC1jYXJkLXZhbHVlXCI+XG4gICAgICAgICAgICAgIFIkIHt7IHRvdGFsU2FsZXMudG9Mb2NhbGVTdHJpbmcoJ3B0LUJSJywgeyBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIgfSkgfX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRhc2hib2FyZC1jYXJkLWRlc2NcIj5Ub3RhbCBWZW5kaWRvPC9kaXY+XG4gICAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgPC9xLWNhcmQ+XG4gICAgICAgIDxxLWNhcmQgY2xhc3M9XCJkYXNoYm9hcmQtY2FyZCBjb2wteHMtMTIgY29sLXNtLTYgY29sLW1kLTNcIj5cbiAgICAgICAgICA8cS1jYXJkLXNlY3Rpb24+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGFzaGJvYXJkLWNhcmQtdGl0bGVcIj5cbiAgICAgICAgICAgICAgPHEtaWNvbiBuYW1lPVwiYmFyX2NoYXJ0XCIgY29sb3I9XCJkZWVwLW9yYW5nZVwiIHNpemU9XCIyOHB4XCIgY2xhc3M9XCJxLW1yLXNtXCIgLz5cbiAgICAgICAgICAgICAgUmVsYXTDs3Jpb3NcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRhc2hib2FyZC1jYXJkLXZhbHVlXCI+e3sgcmVwb3J0c0NvdW50IH19PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGFzaGJvYXJkLWNhcmQtZGVzY1wiPkdlcmFkb3M8L2Rpdj5cbiAgICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgICAgICA8L3EtY2FyZD5cbiAgICAgICAgPHEtY2FyZCBjbGFzcz1cImRhc2hib2FyZC1jYXJkIGNvbC14cy0xMiBjb2wtc20tNiBjb2wtbWQtM1wiPlxuICAgICAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkYXNoYm9hcmQtY2FyZC10aXRsZVwiPlxuICAgICAgICAgICAgICA8cS1pY29uIG5hbWU9XCJhY2NvdW50X2JhbGFuY2Vfd2FsbGV0XCIgY29sb3I9XCJwdXJwbGVcIiBzaXplPVwiMjhweFwiIGNsYXNzPVwicS1tci1zbVwiIC8+XG4gICAgICAgICAgICAgIEludmVzdGltZW50b3NcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRhc2hib2FyZC1jYXJkLXZhbHVlXCI+XG4gICAgICAgICAgICAgIFIkIHt7IHRvdGFsSW52ZXN0bWVudHMudG9Mb2NhbGVTdHJpbmcoJ3B0LUJSJywgeyBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIgfSkgfX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRhc2hib2FyZC1jYXJkLWRlc2NcIj5Ub3RhbCBJbnZlc3RpZG88L2Rpdj5cbiAgICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgICAgICA8L3EtY2FyZD5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzPVwiZGFzaGJvYXJkLWNoYXJ0cyByb3cgcS1tdC14bCBxLWd1dHRlci1tZFwiPlxuICAgICAgICA8cS1jYXJkIGNsYXNzPVwiZGFzaGJvYXJkLWNoYXJ0LWNhcmQgY29sLXhzLTEyIGNvbC1tZC02XCI+XG4gICAgICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRhc2hib2FyZC1jaGFydC10aXRsZVwiPlxuICAgICAgICAgICAgICA8cS1pY29uIG5hbWU9XCJzaG93X2NoYXJ0XCIgY29sb3I9XCJwcmltYXJ5XCIgc2l6ZT1cIjI0cHhcIiBjbGFzcz1cInEtbXItc21cIiAvPlxuICAgICAgICAgICAgICBWZW5kYXMgZG9zIMOabHRpbW9zIDcgRGlhc1xuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8Y2FudmFzIHJlZj1cInNhbGVzQ2hhcnRcIj48L2NhbnZhcz5cbiAgICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgICAgICA8L3EtY2FyZD5cbiAgICAgICAgPHEtY2FyZCBjbGFzcz1cImRhc2hib2FyZC1jaGFydC1jYXJkIGNvbC14cy0xMiBjb2wtbWQtNlwiPlxuICAgICAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkYXNoYm9hcmQtY2hhcnQtdGl0bGVcIj5cbiAgICAgICAgICAgICAgPHEtaWNvbiBuYW1lPVwicGllX2NoYXJ0XCIgY29sb3I9XCJkZWVwLW9yYW5nZVwiIHNpemU9XCIyNHB4XCIgY2xhc3M9XCJxLW1yLXNtXCIgLz5cbiAgICAgICAgICAgICAgRGlzdHJpYnVpw6fDo28gZGUgUHJvZHV0b3NcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiB2LWlmPVwiIXByb2REYXRhLmxlbmd0aFwiIGNsYXNzPVwidGV4dC1ncmV5IHRleHQtY2VudGVyIHEtbXQtbWRcIj5cbiAgICAgICAgICAgICAgTmVuaHVtIHByb2R1dG8gY2FkYXN0cmFkby5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGNhbnZhcyB2LWlmPVwicHJvZERhdGEubGVuZ3RoXCIgcmVmPVwicHJvZHVjdHNDaGFydFwiPjwvY2FudmFzPlxuICAgICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICAgIDwvcS1jYXJkPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvcS1wYWdlPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiwgb25Nb3VudGVkLCBvblVubW91bnRlZCwgbmV4dFRpY2sgfSBmcm9tICd2dWUnXG5pbXBvcnQgeyB1c2VQcm9kdWN0U3RvcmUgfSBmcm9tICdzcmMvc3RvcmVzL3Byb2R1Y3Qtc3RvcmUnXG5pbXBvcnQgeyB1c2VSZXBvcnRTdG9yZSB9IGZyb20gJ3NyYy9zdG9yZXMvcmVwb3J0LXN0b3JlJ1xuaW1wb3J0IHsgdXNlSW52ZXN0bWVudFN0b3JlIH0gZnJvbSAnc3JjL3N0b3Jlcy9pbnZlc3RtZW50LXN0b3JlJ1xuaW1wb3J0IHsgdXNlU2FsZXNTdG9yZSB9IGZyb20gJ3NyYy9zdG9yZXMvc2FsZXMtc3RvcmUnXG5pbXBvcnQge1xuICBDaGFydCxcbiAgQmFyQ29udHJvbGxlcixcbiAgQmFyRWxlbWVudCxcbiAgQ2F0ZWdvcnlTY2FsZSxcbiAgTGluZWFyU2NhbGUsXG4gIFRvb2x0aXAsXG4gIExlZ2VuZCxcbiAgUGllQ29udHJvbGxlcixcbiAgQXJjRWxlbWVudCxcbn0gZnJvbSAnY2hhcnQuanMnXG5cbkNoYXJ0LnJlZ2lzdGVyKFxuICBCYXJDb250cm9sbGVyLFxuICBCYXJFbGVtZW50LFxuICBDYXRlZ29yeVNjYWxlLFxuICBMaW5lYXJTY2FsZSxcbiAgVG9vbHRpcCxcbiAgTGVnZW5kLFxuICBQaWVDb250cm9sbGVyLFxuICBBcmNFbGVtZW50LFxuKVxuXG5jb25zdCBwcm9kdWN0U3RvcmUgPSB1c2VQcm9kdWN0U3RvcmUoKVxuY29uc3QgcmVwb3J0U3RvcmUgPSB1c2VSZXBvcnRTdG9yZSgpXG5jb25zdCBpbnZlc3RtZW50U3RvcmUgPSB1c2VJbnZlc3RtZW50U3RvcmUoKVxuY29uc3Qgc2FsZXNTdG9yZSA9IHVzZVNhbGVzU3RvcmUoKVxuXG5jb25zdCBwcm9kdWN0c0NvdW50ID0gcmVmKDApXG5jb25zdCByZXBvcnRzQ291bnQgPSByZWYoMClcbmNvbnN0IHRvdGFsSW52ZXN0bWVudHMgPSByZWYoMClcbmNvbnN0IHRvdGFsU2FsZXMgPSByZWYoMClcbmNvbnN0IGxvYWRpbmcgPSByZWYodHJ1ZSlcblxuY29uc3Qgc2FsZXNDaGFydCA9IHJlZihudWxsKVxubGV0IHNhbGVzQ2hhcnRJbnN0YW5jZSA9IG51bGxcbmNvbnN0IHByb2R1Y3RzQ2hhcnQgPSByZWYobnVsbClcbmxldCBwcm9kdWN0c0NoYXJ0SW5zdGFuY2UgPSBudWxsXG5cbmNvbnN0IHByb2REYXRhID0gcmVmKFtdKVxuXG4vLyBBdHVhbGl6YSBvcyBkYWRvcyBkbyBkYXNoYm9hcmQgZSBncsOhZmljb3NcbmFzeW5jIGZ1bmN0aW9uIHJlZnJlc2hEYXNoYm9hcmQoKSB7XG4gIGxvYWRpbmcudmFsdWUgPSB0cnVlXG4gIC8vIEFndWFyZGEgY2FycmVnYW1lbnRvIGRvcyBkYWRvcyBkYXMgc3RvcmVzLCBzZSBuZWNlc3PDoXJpb1xuICBpZiAocHJvZHVjdFN0b3JlLmxvYWRQcm9kdWN0cykgYXdhaXQgcHJvZHVjdFN0b3JlLmxvYWRQcm9kdWN0cygpXG4gIGlmIChyZXBvcnRTdG9yZS5sb2FkUmVwb3J0cykgYXdhaXQgcmVwb3J0U3RvcmUubG9hZFJlcG9ydHMoKVxuICBpZiAoaW52ZXN0bWVudFN0b3JlLmxvYWRJbnZlc3RtZW50cykgYXdhaXQgaW52ZXN0bWVudFN0b3JlLmxvYWRJbnZlc3RtZW50cygpXG4gIGlmIChzYWxlc1N0b3JlLmxvYWRTYWxlcykgYXdhaXQgc2FsZXNTdG9yZS5sb2FkU2FsZXMoKVxuXG4gIHByb2R1Y3RzQ291bnQudmFsdWUgPSBwcm9kdWN0U3RvcmUucHJvZHVjdHM/Lmxlbmd0aCB8fCAwXG4gIHJlcG9ydHNDb3VudC52YWx1ZSA9IHJlcG9ydFN0b3JlLnJlcG9ydHM/Lmxlbmd0aCB8fCAwXG4gIHRvdGFsSW52ZXN0bWVudHMudmFsdWUgPSBpbnZlc3RtZW50U3RvcmUudG90YWxJbnZlc3RlZCB8fCAwXG4gIHRvdGFsU2FsZXMudmFsdWUgPSBzYWxlc1N0b3JlLnRvdGFsU2FsZXNWYWx1ZSB8fCAwXG4gIHByb2REYXRhLnZhbHVlID0gcHJvZHVjdFN0b3JlLnByb2R1Y3RzPy5zbGljZSgwLCA1KSB8fCBbXVxuICBhd2FpdCByZW5kZXJDaGFydHMoKVxuICBsb2FkaW5nLnZhbHVlID0gZmFsc2Vcbn1cblxuLy8gUmVuZGVyaXphIG9zIGdyw6FmaWNvc1xuYXN5bmMgZnVuY3Rpb24gcmVuZGVyQ2hhcnRzKCkge1xuICBhd2FpdCBuZXh0VGljaygpXG4gIGlmIChzYWxlc0NoYXJ0SW5zdGFuY2UpIHNhbGVzQ2hhcnRJbnN0YW5jZS5kZXN0cm95KClcbiAgaWYgKHByb2R1Y3RzQ2hhcnRJbnN0YW5jZSkgcHJvZHVjdHNDaGFydEluc3RhbmNlLmRlc3Ryb3koKVxuXG4gIHRyeSB7XG4gICAgLy8gR3LDoWZpY28gZGUgdmVuZGFzIGRvcyDDumx0aW1vcyA3IGRpYXNcbiAgICBjb25zdCBzYWxlc0RhdGEgPSBzYWxlc1N0b3JlLmdldFNhbGVzTGFzdDdEYXlzPy4oKSB8fCBbXG4gICAgICB7IGRhdGU6ICdTZWcnLCB2YWx1ZTogMTAgfSxcbiAgICAgIHsgZGF0ZTogJ1RlcicsIHZhbHVlOiAyMCB9LFxuICAgICAgeyBkYXRlOiAnUXVhJywgdmFsdWU6IDE1IH0sXG4gICAgICB7IGRhdGU6ICdRdWknLCB2YWx1ZTogMzAgfSxcbiAgICAgIHsgZGF0ZTogJ1NleCcsIHZhbHVlOiAyNSB9LFxuICAgICAgeyBkYXRlOiAnU8OhYicsIHZhbHVlOiAxOCB9LFxuICAgICAgeyBkYXRlOiAnRG9tJywgdmFsdWU6IDEyIH0sXG4gICAgXVxuICAgIGlmIChzYWxlc0NoYXJ0LnZhbHVlKSB7XG4gICAgICBzYWxlc0NoYXJ0SW5zdGFuY2UgPSBuZXcgQ2hhcnQoc2FsZXNDaGFydC52YWx1ZSwge1xuICAgICAgICB0eXBlOiAnYmFyJyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGxhYmVsczogc2FsZXNEYXRhLm1hcCgoZCkgPT4gZC5kYXRlKSxcbiAgICAgICAgICBkYXRhc2V0czogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBsYWJlbDogJ1ZlbmRhcycsXG4gICAgICAgICAgICAgIGRhdGE6IHNhbGVzRGF0YS5tYXAoKGQpID0+IGQudmFsdWUpLFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjMTk3NmQyJyxcbiAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiA4LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcbiAgICAgICAgICBwbHVnaW5zOiB7IGxlZ2VuZDogeyBkaXNwbGF5OiBmYWxzZSB9IH0sXG4gICAgICAgICAgc2NhbGVzOiB7IHk6IHsgYmVnaW5BdFplcm86IHRydWUgfSB9LFxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICB9XG5cbiAgICAvLyBHcsOhZmljbyBkZSBkaXN0cmlidWnDp8OjbyBkZSBwcm9kdXRvc1xuICAgIGlmIChwcm9kdWN0c0NoYXJ0LnZhbHVlICYmIHByb2REYXRhLnZhbHVlLmxlbmd0aCkge1xuICAgICAgcHJvZHVjdHNDaGFydEluc3RhbmNlID0gbmV3IENoYXJ0KHByb2R1Y3RzQ2hhcnQudmFsdWUsIHtcbiAgICAgICAgdHlwZTogJ3BpZScsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBsYWJlbHM6IHByb2REYXRhLnZhbHVlLm1hcCgocCkgPT4gcC5uYW1lKSxcbiAgICAgICAgICBkYXRhc2V0czogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBkYXRhOiBwcm9kRGF0YS52YWx1ZS5tYXAoKHApID0+IHAucXVhbnRpdHkpLFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFsnIzE5NzZkMicsICcjNDNhMDQ3JywgJyNmYjhjMDAnLCAnIzhlMjRhYScsICcjZTUzOTM1J10sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICByZXNwb25zaXZlOiB0cnVlLFxuICAgICAgICAgIHBsdWdpbnM6IHsgbGVnZW5kOiB7IHBvc2l0aW9uOiAnYm90dG9tJyB9IH0sXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcignRXJybyBhbyByZW5kZXJpemFyIGdyw6FmaWNvczonLCBlcnIpXG4gIH1cbn1cblxuLy8gRGVzdHJvaSBvcyBncsOhZmljb3MgYW8gc2FpciBkYSBww6FnaW5hXG5vblVubW91bnRlZCgoKSA9PiB7XG4gIGlmIChzYWxlc0NoYXJ0SW5zdGFuY2UpIHNhbGVzQ2hhcnRJbnN0YW5jZS5kZXN0cm95KClcbiAgaWYgKHByb2R1Y3RzQ2hhcnRJbnN0YW5jZSkgcHJvZHVjdHNDaGFydEluc3RhbmNlLmRlc3Ryb3koKVxufSlcblxuLy8gSW5pY2lhbGl6YSBvIGRhc2hib2FyZCBhbyBtb250YXJcbm9uTW91bnRlZChhc3luYyAoKSA9PiB7XG4gIGF3YWl0IHJlZnJlc2hEYXNoYm9hcmQoKVxufSlcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuLmRhc2hib2FyZC1iZyB7XG4gIGJhY2tncm91bmQ6ICNmOGZhZmM7XG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xuICBwYWRkaW5nOiAwO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG5cbi5kYXNoYm9hcmQtY29udGFpbmVyIHtcbiAgd2lkdGg6IDEwMCU7XG4gIG1heC13aWR0aDogMTIwMHB4O1xuICBtYXJnaW46IDAgYXV0bztcbiAgcGFkZGluZzogNDBweCAwIDAgMDtcbn1cblxuLmRhc2hib2FyZC10aXRsZSB7XG4gIGNvbG9yOiAjMTE0MDRjO1xuICBmb250LWZhbWlseTogJ1BvcHBpbnMnLCAnSW50ZXInLCAnUm9ib3RvJywgc2Fucy1zZXJpZjtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgbGV0dGVyLXNwYWNpbmc6IDFweDtcbiAgZm9udC1zaXplOiAyLjNyZW07XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgbWFyZ2luLWJvdHRvbTogMzJweDtcbiAgdGV4dC1zaGFkb3c6IDAgMnB4IDhweCAjMDAwMTtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG5cbi5kYXNoYm9hcmQtY2FyZHMge1xuICBtYXJnaW4tYm90dG9tOiAzMnB4O1xufVxuXG4uZGFzaGJvYXJkLWNhcmQge1xuICBib3JkZXItcmFkaXVzOiAxOHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBib3gtc2hhZG93OiAwIDRweCAyNHB4IDAgcmdiYSgwLCAwLCAwLCAwLjA4KTtcbiAgbWluLXdpZHRoOiAyMjBweDtcbiAgbWluLWhlaWdodDogMTQwcHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgcGFkZGluZzogMThweCAyNHB4O1xufVxuXG4uZGFzaGJvYXJkLWNhcmQtdGl0bGUge1xuICBmb250LXNpemU6IDEuMXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6ICMxOTc2ZDI7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIG1hcmdpbi1ib3R0b206IDhweDtcbn1cblxuLmRhc2hib2FyZC1jYXJkLXZhbHVlIHtcbiAgZm9udC1zaXplOiAyLjFyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGNvbG9yOiAjMjIyO1xuICBtYXJnaW4tYm90dG9tOiAycHg7XG59XG5cbi5kYXNoYm9hcmQtY2FyZC1kZXNjIHtcbiAgZm9udC1zaXplOiAxcmVtO1xuICBjb2xvcjogIzZjN2E4OTtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbn1cblxuLmRhc2hib2FyZC1jaGFydHMge1xuICBtYXJnaW4tdG9wOiAyNHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyOyAvKiBDZW50cmFsaXphIG9zIGdyw6FmaWNvcyBob3Jpem9udGFsbWVudGUgKi9cbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gIGdhcDogMjRweDtcbn1cblxuLmRhc2hib2FyZC1jaGFydC1jYXJkIHtcbiAgYm9yZGVyLXJhZGl1czogMThweDtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgYm94LXNoYWRvdzogMCA0cHggMjRweCAwIHJnYmEoMCwgMCwgMCwgMC4wOCk7XG4gIHBhZGRpbmc6IDE4cHggMjRweDtcbiAgbWluLWhlaWdodDogMzQwcHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7IC8qIENlbnRyYWxpemEgbyBjb250ZcO6ZG8gZGVudHJvIGRvIGNhcmQgKi9cbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xuICBtYXJnaW4tbGVmdDogYXV0bztcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xufVxuXG4uZGFzaGJvYXJkLWNoYXJ0LXRpdGxlIHtcbiAgZm9udC1zaXplOiAxLjFyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGNvbG9yOiAjMTk3NmQyO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBtYXJnaW4tYm90dG9tOiAxMnB4O1xufVxuXG5AbWVkaWEgKG1heC13aWR0aDogOTAwcHgpIHtcbiAgLmRhc2hib2FyZC1jb250YWluZXIge1xuICAgIG1heC13aWR0aDogOTh2dztcbiAgICBwYWRkaW5nOiAxMnB4IDAgMCAwO1xuICB9XG4gIC5kYXNoYm9hcmQtY2FyZHMge1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XG4gIH1cbiAgLmRhc2hib2FyZC1jYXJkIHtcbiAgICBtaW4td2lkdGg6IHVuc2V0O1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG1hcmdpbi1ib3R0b206IDEycHg7XG4gIH1cbiAgLmRhc2hib2FyZC1jaGFydHMge1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XG4gIH1cbiAgLmRhc2hib2FyZC1jaGFydC1jYXJkIHtcbiAgICBtaW4taGVpZ2h0OiAyNjBweDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBtYXJnaW4tYm90dG9tOiAxMnB4O1xuICB9XG59XG48L3N0eWxlPlxuIl0sIm5hbWVzIjpbIlRvb2x0aXAiLCJMZWdlbmQiLCJfY3JlYXRlQmxvY2siLCJfd2l0aEN0eCIsIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfY3JlYXRlVk5vZGUiLCJfY3JlYXRlVGV4dFZOb2RlIiwiX29wZW5CbG9jayIsIl9jcmVhdGVFbGVtZW50QmxvY2siLCJfRnJhZ21lbnQiLCJfdG9EaXNwbGF5U3RyaW5nIiwiX2NyZWF0ZUNvbW1lbnRWTm9kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBT08sTUFBTSxnQkFBZ0I7QUFBQSxFQUMzQjtBQUFBLEVBQVE7QUFBQSxFQUFRO0FBQUEsRUFDaEI7QUFBQSxFQUFRO0FBQUEsRUFBVTtBQUFBLEVBQVM7QUFBQSxFQUMzQjtBQUFBLEVBQWE7QUFBQSxFQUFVO0FBQUEsRUFDdkI7QUFBQSxFQUFXO0FBQUEsRUFBVTtBQUFBLEVBQ3JCO0FBQ0Y7QUFFTyxNQUFNLHFCQUFxQjtBQUFBLEVBQ2hDO0FBQUEsRUFBUTtBQUFBLEVBQVM7QUFBQSxFQUFXO0FBQUEsRUFBVztBQUFBLEVBQVE7QUFBQSxFQUFTO0FBQzFEO0FBRUEsTUFBQSxZQUFlLGdCQUFnQjtBQUFBLEVBQzdCLE1BQU07QUFBQSxFQUVOLE9BQU87QUFBQSxJQUNMLEdBQUc7QUFBQSxJQUVILEtBQUs7QUFBQSxNQUNILE1BQU07QUFBQSxNQUNOLFNBQVM7QUFBQSxJQUNWO0FBQUEsSUFFRCxNQUFNO0FBQUEsTUFDSixNQUFNO0FBQUEsTUFDTixXQUFXLE9BQUssY0FBYyxTQUFTLENBQUM7QUFBQSxNQUN4QyxTQUFTO0FBQUEsSUFDVjtBQUFBLElBRUQsV0FBVztBQUFBLE1BQ1QsTUFBTTtBQUFBLE1BQ04sV0FBVyxPQUFLLG1CQUFtQixT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
