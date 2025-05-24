import { _ as _export_sfc, X as createBlock, Y as openBlock, Z as withCtx, a0 as createBaseVNode, $ as createVNode, aa as QCard, af as normalizeClass, ab as QCardSection, a6 as QIcon, a7 as toDisplayString, a2 as createTextVNode, a3 as createElementBlock, ac as createCommentVNode, a4 as Fragment, a5 as renderList, ae as withModifiers, ad as QInput, a1 as QBtn, r as ref, k as computed, aE as Plugin, w as watch, o as onMounted, U as onUnmounted, b as nextTick, aj as Notify } from "./index-DTRxxbQ7.js";
import { Q as QList, b as QItem, c as QItemSection, a as QItemLabel } from "./QList-C--UWoUK.js";
import { Q as QBadge } from "./QBadge-BygkNXTq.js";
import { Q as QForm } from "./QForm-BbcVE1MZ.js";
import { Q as QPage } from "./QPage-pt9NM7Fr.js";
import { C as Chart, B as BarController, a as BarElement, b as CategoryScale, L as LinearScale, p as plugin_tooltip, c as plugin_legend } from "./chart-CvTfpdrd.js";
const _sfc_main = {
  __name: "InvestmentsPage",
  setup(__props, { expose: __expose }) {
    __expose();
    const inputFocus = ref(false);
    const loading = ref(false);
    const valueOnBarPlugin = {
      id: "valueOnBar",
      afterDatasetsDraw(chart) {
        const { ctx } = chart;
        chart.data.datasets.forEach((dataset, i) => {
          const meta = chart.getDatasetMeta(i);
          meta.data.forEach((bar, index) => {
            const value = dataset.data[index];
            ctx.save();
            ctx.font = "bold 15px sans-serif";
            ctx.fillStyle = chart.options.scales.y.ticks.color;
            ctx.textAlign = "center";
            ctx.shadowColor = chart.options.scales.y.ticks.color === "#222" ? "#fff" : "#222";
            ctx.shadowBlur = 4;
            ctx.fillText(
              `R$ ${Number(value).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
              bar.x,
              bar.y - 12
            );
            ctx.restore();
          });
        });
      }
    };
    Chart.register(BarController, BarElement, CategoryScale, LinearScale, plugin_tooltip, plugin_legend);
    const investments = ref([]);
    const newInvestment = ref({
      amount: 0,
      date: ""
    });
    const isDark = computed(() => Plugin.isActive);
    const darkClass = computed(() => isDark.value ? "bg-dark" : "bg-light");
    const textClass = computed(() => isDark.value ? "text-white" : "text-dark");
    const canSubmit = computed(
      () => newInvestment.value.amount > 0 && !!newInvestment.value.date && !loading.value
    );
    function notify(type, message) {
      Notify.create({ type, message });
    }
    async function investNow() {
      if (!canSubmit.value) return;
      loading.value = true;
      setTimeout(() => {
        investments.value.push({
          amount: Number(newInvestment.value.amount),
          date: newInvestment.value.date
        });
        notify("positive", "Investimento registrado!");
        newInvestment.value = { amount: 0, date: "" };
        loading.value = false;
      }, 800);
    }
    const investedByMonth = computed(() => {
      const result = {};
      investments.value.forEach((inv) => {
        const date = new Date(inv.date);
        if (isNaN(date)) return;
        const mes = date.toLocaleString("pt-BR", { month: "long", year: "numeric" });
        if (!result[mes]) result[mes] = 0;
        result[mes] += inv.amount;
      });
      return result;
    });
    const totalInvested = computed(
      () => investments.value.reduce((sum, inv) => sum + Number(inv.amount), 0)
    );
    const barChart = ref(null);
    let barChartInstance = null;
    function getChartColors() {
      if (isDark.value) {
        return {
          gradientStart: "#43e97b",
          gradientEnd: "#1976d2",
          tickColor: "#fff",
          gridColor: "rgba(255,255,255,0.15)",
          borderColor: "#fff",
          hoverColor: "#43e97b"
        };
      } else {
        return {
          gradientStart: "#1976d2",
          gradientEnd: "#43e97b",
          tickColor: "#222",
          gridColor: "rgba(0,0,0,0.08)",
          borderColor: "#1976d2",
          hoverColor: "#1565c0"
        };
      }
    }
    async function updateBarChart() {
      await nextTick();
      if (!barChart.value) return;
      if (barChartInstance) barChartInstance.destroy();
      if (Object.keys(investedByMonth.value).length === 0) return;
      const ctx = barChart.value.getContext("2d");
      const { gradientStart, gradientEnd, tickColor, gridColor, borderColor, hoverColor } = getChartColors();
      const gradient = ctx.createLinearGradient(0, 0, 0, 340);
      gradient.addColorStop(0, gradientStart);
      gradient.addColorStop(1, gradientEnd);
      barChartInstance = new Chart(barChart.value, {
        type: "bar",
        data: {
          labels: Object.keys(investedByMonth.value),
          datasets: [
            {
              label: "Valor Investido",
              data: Object.values(investedByMonth.value),
              backgroundColor: gradient,
              borderRadius: 14,
              borderWidth: 2,
              borderColor,
              hoverBackgroundColor: hoverColor,
              barPercentage: 0.55,
              categoryPercentage: 0.55
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: { duration: 900, easing: "easeOutBounce" },
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: isDark.value ? "#23272f" : "#fff",
              titleColor: isDark.value ? "#fff" : "#222",
              bodyColor: isDark.value ? "#fff" : "#222",
              borderColor,
              borderWidth: 1,
              callbacks: {
                label: (ctx2) => `R$ ${Number(ctx2.parsed.y).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`
              }
            },
            valueOnBar: valueOnBarPlugin
          },
          scales: {
            x: {
              ticks: {
                color: tickColor,
                font: { size: 16, weight: "bold" }
              },
              grid: {
                color: gridColor
              }
            },
            y: {
              beginAtZero: true,
              ticks: {
                color: tickColor,
                font: { size: 16, weight: "bold" },
                callback: (value) => `R$ ${Number(value).toLocaleString("pt-BR", { minimumFractionDigits: 0 })}`
              },
              grid: {
                color: gridColor
              }
            }
          }
        },
        plugins: [valueOnBarPlugin]
      });
    }
    watch([investments, isDark], updateBarChart, { deep: true });
    onMounted(updateBarChart);
    onUnmounted(() => {
      if (barChartInstance) barChartInstance.destroy();
    });
    const __returned__ = { inputFocus, loading, valueOnBarPlugin, investments, newInvestment, isDark, darkClass, textClass, canSubmit, notify, investNow, investedByMonth, totalInvested, barChart, get barChartInstance() {
      return barChartInstance;
    }, set barChartInstance(v) {
      barChartInstance = v;
    }, getChartColors, updateBarChart, ref, computed, watch, onMounted, onUnmounted, nextTick, get Notify() {
      return Notify;
    }, get Dark() {
      return Plugin;
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
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1 = { class: "investments-wrapper" };
const _hoisted_2 = { class: "text-h4 text-green-3 q-mt-xs" };
const _hoisted_3 = {
  key: 0,
  class: "text-center text-grey-4 q-mt-md"
};
const _hoisted_4 = { class: "row q-col-gutter-md" };
const _hoisted_5 = { class: "col-12 col-md-4 flex flex-center" };
const _hoisted_6 = { class: "chart-container" };
const _hoisted_7 = { ref: "barChart" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QPage, { class: "investments-bg" }, {
    default: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        createVNode(QCard, {
          flat: "",
          bordered: "",
          class: normalizeClass(["investments-card q-mb-lg", $setup.darkClass])
        }, {
          default: withCtx(() => [
            createVNode(QCardSection, { class: "row items-center" }, {
              default: withCtx(() => [
                createVNode(QIcon, {
                  name: "account_balance_wallet",
                  color: "green",
                  size: "40px",
                  class: "q-mr-md"
                }),
                createBaseVNode("div", null, [
                  createBaseVNode("div", {
                    class: normalizeClass(["text-h6 text-weight-bold", $setup.textClass])
                  }, "Total Investido", 2),
                  createBaseVNode("div", _hoisted_2, " R$ " + toDisplayString($setup.totalInvested.toLocaleString("pt-BR", { minimumFractionDigits: 2 })), 1)
                ])
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["class"]),
        createVNode(QCard, {
          flat: "",
          bordered: "",
          class: normalizeClass(["investments-card q-mb-lg", $setup.darkClass])
        }, {
          default: withCtx(() => [
            createVNode(QCardSection, null, {
              default: withCtx(() => [
                createBaseVNode("div", {
                  class: normalizeClass(["text-h6 text-weight-bold q-mb-md", $setup.textClass])
                }, [
                  createVNode(QIcon, {
                    name: "event",
                    color: "primary",
                    class: "q-mr-sm"
                  }),
                  _cache[6] || (_cache[6] = createTextVNode(" Detalhes por Mês "))
                ], 2),
                createVNode(QList, null, {
                  default: withCtx(() => [
                    (openBlock(true), createElementBlock(Fragment, null, renderList($setup.investedByMonth, (valor, mes) => {
                      return openBlock(), createBlock(QItem, {
                        key: mes,
                        class: "investments-list-item"
                      }, {
                        default: withCtx(() => [
                          createVNode(QItemSection, null, {
                            default: withCtx(() => [
                              createVNode(QItemLabel, {
                                class: normalizeClass(["text-subtitle1 text-weight-bold", $setup.textClass])
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(mes), 1)
                                ]),
                                _: 2
                              }, 1032, ["class"])
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(QItemSection, { side: "" }, {
                            default: withCtx(() => [
                              createVNode(QBadge, {
                                color: "green-4",
                                align: "top",
                                class: "q-pa-sm text-subtitle2 text-white"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" R$ " + toDisplayString(valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })), 1)
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024);
                    }), 128)),
                    Object.keys($setup.investedByMonth).length === 0 ? (openBlock(), createElementBlock("div", _hoisted_3, " Nenhum investimento registrado ainda. ")) : createCommentVNode("", true)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["class"]),
        createVNode(QCard, {
          flat: "",
          bordered: "",
          class: normalizeClass(["investments-card q-mb-lg", $setup.darkClass])
        }, {
          default: withCtx(() => [
            createVNode(QCardSection, null, {
              default: withCtx(() => [
                createBaseVNode("div", {
                  class: normalizeClass(["text-h6 text-weight-bold q-mb-md", $setup.textClass])
                }, [
                  createVNode(QIcon, {
                    name: "add_circle",
                    color: "primary",
                    class: "q-mr-sm"
                  }),
                  _cache[7] || (_cache[7] = createTextVNode(" Novo Investimento "))
                ], 2),
                createVNode(QForm, {
                  onSubmit: withModifiers($setup.investNow, ["prevent"]),
                  class: "q-gutter-md"
                }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_4, [
                      createVNode(QInput, {
                        modelValue: $setup.newInvestment.amount,
                        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.newInvestment.amount = $event),
                        label: "Valor (R$)",
                        type: "number",
                        outlined: "",
                        dense: "",
                        class: "col-12 col-md-4",
                        rules: [(val) => val > 0 || "Valor deve ser maior que zero"],
                        color: "green-4",
                        prefix: "R$",
                        dark: $setup.isDark,
                        "label-color": "grey-3",
                        "input-class": $setup.textClass,
                        onFocus: _cache[1] || (_cache[1] = ($event) => $setup.inputFocus = true),
                        onBlur: _cache[2] || (_cache[2] = ($event) => $setup.inputFocus = false)
                      }, null, 8, ["modelValue", "rules", "dark", "input-class"]),
                      createVNode(QInput, {
                        modelValue: $setup.newInvestment.date,
                        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.newInvestment.date = $event),
                        label: "Data do Investimento",
                        type: "date",
                        outlined: "",
                        dense: "",
                        class: "col-12 col-md-4",
                        rules: [(val) => !!val || "Campo obrigatório"],
                        color: "primary",
                        dark: $setup.isDark,
                        "label-color": "grey-3",
                        "input-class": $setup.textClass,
                        onFocus: _cache[4] || (_cache[4] = ($event) => $setup.inputFocus = true),
                        onBlur: _cache[5] || (_cache[5] = ($event) => $setup.inputFocus = false)
                      }, null, 8, ["modelValue", "rules", "dark", "input-class"]),
                      createBaseVNode("div", _hoisted_5, [
                        createVNode(QBtn, {
                          label: "Investir Agora",
                          color: "primary",
                          type: "submit",
                          unelevated: "",
                          icon: "trending_up",
                          class: "q-mt-sm investments-btn",
                          size: "lg",
                          "text-color": "white",
                          loading: $setup.loading,
                          disable: !$setup.canSubmit
                        }, null, 8, ["loading", "disable"])
                      ])
                    ])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["class"]),
        createVNode(QCard, {
          flat: "",
          bordered: "",
          class: normalizeClass(["investments-card q-mb-lg", $setup.darkClass])
        }, {
          default: withCtx(() => [
            createVNode(QCardSection, null, {
              default: withCtx(() => [
                createBaseVNode("div", {
                  class: normalizeClass(["text-h6 text-weight-bold q-mb-md", $setup.textClass])
                }, [
                  createVNode(QIcon, {
                    name: "bar_chart",
                    color: "primary",
                    class: "q-mr-sm"
                  }),
                  _cache[8] || (_cache[8] = createTextVNode(" Gráfico de Investimentos "))
                ], 2),
                createBaseVNode("div", _hoisted_6, [
                  createBaseVNode("canvas", _hoisted_7, null, 512)
                ])
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["class"])
      ])
    ]),
    _: 1
  });
}
const InvestmentsPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-df4fb237"], ["__file", "InvestmentsPage.vue"]]);
export {
  InvestmentsPage as default
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW52ZXN0bWVudHNQYWdlLUJEb1Nha2ZOLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGFnZXMvSW52ZXN0bWVudHNQYWdlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gIDxxLXBhZ2UgY2xhc3M9XCJpbnZlc3RtZW50cy1iZ1wiPlxuICAgIDxkaXYgY2xhc3M9XCJpbnZlc3RtZW50cy13cmFwcGVyXCI+XG4gICAgICA8IS0tIFRvdGFsIEludmVzdGlkbyAtLT5cbiAgICAgIDxxLWNhcmQgZmxhdCBib3JkZXJlZCBjbGFzcz1cImludmVzdG1lbnRzLWNhcmQgcS1tYi1sZ1wiIDpjbGFzcz1cImRhcmtDbGFzc1wiPlxuICAgICAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJyb3cgaXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAgPHEtaWNvbiBuYW1lPVwiYWNjb3VudF9iYWxhbmNlX3dhbGxldFwiIGNvbG9yPVwiZ3JlZW5cIiBzaXplPVwiNDBweFwiIGNsYXNzPVwicS1tci1tZFwiIC8+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg2IHRleHQtd2VpZ2h0LWJvbGRcIiA6Y2xhc3M9XCJ0ZXh0Q2xhc3NcIj5Ub3RhbCBJbnZlc3RpZG88L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg0IHRleHQtZ3JlZW4tMyBxLW10LXhzXCI+XG4gICAgICAgICAgICAgIFIkIHt7IHRvdGFsSW52ZXN0ZWQudG9Mb2NhbGVTdHJpbmcoJ3B0LUJSJywgeyBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIgfSkgfX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgICAgPC9xLWNhcmQ+XG5cbiAgICAgIDwhLS0gTGlzdGEgZGUgSW52ZXN0aW1lbnRvcyBwb3IgTcOqcyAtLT5cbiAgICAgIDxxLWNhcmQgZmxhdCBib3JkZXJlZCBjbGFzcz1cImludmVzdG1lbnRzLWNhcmQgcS1tYi1sZ1wiIDpjbGFzcz1cImRhcmtDbGFzc1wiPlxuICAgICAgICA8cS1jYXJkLXNlY3Rpb24+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDYgdGV4dC13ZWlnaHQtYm9sZCBxLW1iLW1kXCIgOmNsYXNzPVwidGV4dENsYXNzXCI+XG4gICAgICAgICAgICA8cS1pY29uIG5hbWU9XCJldmVudFwiIGNvbG9yPVwicHJpbWFyeVwiIGNsYXNzPVwicS1tci1zbVwiIC8+XG4gICAgICAgICAgICBEZXRhbGhlcyBwb3IgTcOqc1xuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxxLWxpc3Q+XG4gICAgICAgICAgICA8cS1pdGVtXG4gICAgICAgICAgICAgIHYtZm9yPVwiKHZhbG9yLCBtZXMpIGluIGludmVzdGVkQnlNb250aFwiXG4gICAgICAgICAgICAgIDprZXk9XCJtZXNcIlxuICAgICAgICAgICAgICBjbGFzcz1cImludmVzdG1lbnRzLWxpc3QtaXRlbVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsIGNsYXNzPVwidGV4dC1zdWJ0aXRsZTEgdGV4dC13ZWlnaHQtYm9sZFwiIDpjbGFzcz1cInRleHRDbGFzc1wiPlxuICAgICAgICAgICAgICAgICAge3sgbWVzIH19XG4gICAgICAgICAgICAgICAgPC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBzaWRlPlxuICAgICAgICAgICAgICAgIDxxLWJhZGdlIGNvbG9yPVwiZ3JlZW4tNFwiIGFsaWduPVwidG9wXCIgY2xhc3M9XCJxLXBhLXNtIHRleHQtc3VidGl0bGUyIHRleHQtd2hpdGVcIj5cbiAgICAgICAgICAgICAgICAgIFIkIHt7IHZhbG9yLnRvTG9jYWxlU3RyaW5nKCdwdC1CUicsIHsgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyIH0pIH19XG4gICAgICAgICAgICAgICAgPC9xLWJhZGdlPlxuICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIHYtaWY9XCJPYmplY3Qua2V5cyhpbnZlc3RlZEJ5TW9udGgpLmxlbmd0aCA9PT0gMFwiXG4gICAgICAgICAgICAgIGNsYXNzPVwidGV4dC1jZW50ZXIgdGV4dC1ncmV5LTQgcS1tdC1tZFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIE5lbmh1bSBpbnZlc3RpbWVudG8gcmVnaXN0cmFkbyBhaW5kYS5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvcS1saXN0PlxuICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgICAgPC9xLWNhcmQ+XG5cbiAgICAgIDwhLS0gQm90w6NvIEludmVzdGlyIEFnb3JhIC0tPlxuICAgICAgPHEtY2FyZCBmbGF0IGJvcmRlcmVkIGNsYXNzPVwiaW52ZXN0bWVudHMtY2FyZCBxLW1iLWxnXCIgOmNsYXNzPVwiZGFya0NsYXNzXCI+XG4gICAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNiB0ZXh0LXdlaWdodC1ib2xkIHEtbWItbWRcIiA6Y2xhc3M9XCJ0ZXh0Q2xhc3NcIj5cbiAgICAgICAgICAgIDxxLWljb24gbmFtZT1cImFkZF9jaXJjbGVcIiBjb2xvcj1cInByaW1hcnlcIiBjbGFzcz1cInEtbXItc21cIiAvPlxuICAgICAgICAgICAgTm92byBJbnZlc3RpbWVudG9cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8cS1mb3JtIEBzdWJtaXQucHJldmVudD1cImludmVzdE5vd1wiIGNsYXNzPVwicS1ndXR0ZXItbWRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgcS1jb2wtZ3V0dGVyLW1kXCI+XG4gICAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgICAgdi1tb2RlbD1cIm5ld0ludmVzdG1lbnQuYW1vdW50XCJcbiAgICAgICAgICAgICAgICBsYWJlbD1cIlZhbG9yIChSJClcIlxuICAgICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgICBjbGFzcz1cImNvbC0xMiBjb2wtbWQtNFwiXG4gICAgICAgICAgICAgICAgOnJ1bGVzPVwiWyh2YWwpID0+IHZhbCA+IDAgfHwgJ1ZhbG9yIGRldmUgc2VyIG1haW9yIHF1ZSB6ZXJvJ11cIlxuICAgICAgICAgICAgICAgIGNvbG9yPVwiZ3JlZW4tNFwiXG4gICAgICAgICAgICAgICAgcHJlZml4PVwiUiRcIlxuICAgICAgICAgICAgICAgIDpkYXJrPVwiaXNEYXJrXCJcbiAgICAgICAgICAgICAgICBsYWJlbC1jb2xvcj1cImdyZXktM1wiXG4gICAgICAgICAgICAgICAgOmlucHV0LWNsYXNzPVwidGV4dENsYXNzXCJcbiAgICAgICAgICAgICAgICBAZm9jdXM9XCJpbnB1dEZvY3VzID0gdHJ1ZVwiXG4gICAgICAgICAgICAgICAgQGJsdXI9XCJpbnB1dEZvY3VzID0gZmFsc2VcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJuZXdJbnZlc3RtZW50LmRhdGVcIlxuICAgICAgICAgICAgICAgIGxhYmVsPVwiRGF0YSBkbyBJbnZlc3RpbWVudG9cIlxuICAgICAgICAgICAgICAgIHR5cGU9XCJkYXRlXCJcbiAgICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJjb2wtMTIgY29sLW1kLTRcIlxuICAgICAgICAgICAgICAgIDpydWxlcz1cIlsodmFsKSA9PiAhIXZhbCB8fCAnQ2FtcG8gb2JyaWdhdMOzcmlvJ11cIlxuICAgICAgICAgICAgICAgIGNvbG9yPVwicHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgOmRhcms9XCJpc0RhcmtcIlxuICAgICAgICAgICAgICAgIGxhYmVsLWNvbG9yPVwiZ3JleS0zXCJcbiAgICAgICAgICAgICAgICA6aW5wdXQtY2xhc3M9XCJ0ZXh0Q2xhc3NcIlxuICAgICAgICAgICAgICAgIEBmb2N1cz1cImlucHV0Rm9jdXMgPSB0cnVlXCJcbiAgICAgICAgICAgICAgICBAYmx1cj1cImlucHV0Rm9jdXMgPSBmYWxzZVwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtMTIgY29sLW1kLTQgZmxleCBmbGV4LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgICAgICAgbGFiZWw9XCJJbnZlc3RpciBBZ29yYVwiXG4gICAgICAgICAgICAgICAgICBjb2xvcj1cInByaW1hcnlcIlxuICAgICAgICAgICAgICAgICAgdHlwZT1cInN1Ym1pdFwiXG4gICAgICAgICAgICAgICAgICB1bmVsZXZhdGVkXG4gICAgICAgICAgICAgICAgICBpY29uPVwidHJlbmRpbmdfdXBcIlxuICAgICAgICAgICAgICAgICAgY2xhc3M9XCJxLW10LXNtIGludmVzdG1lbnRzLWJ0blwiXG4gICAgICAgICAgICAgICAgICBzaXplPVwibGdcIlxuICAgICAgICAgICAgICAgICAgdGV4dC1jb2xvcj1cIndoaXRlXCJcbiAgICAgICAgICAgICAgICAgIDpsb2FkaW5nPVwibG9hZGluZ1wiXG4gICAgICAgICAgICAgICAgICA6ZGlzYWJsZT1cIiFjYW5TdWJtaXRcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9xLWZvcm0+XG4gICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICA8L3EtY2FyZD5cblxuICAgICAgPCEtLSBHcsOhZmljbyBkZSBCYXJyYXMgLS0+XG4gICAgICA8cS1jYXJkIGZsYXQgYm9yZGVyZWQgY2xhc3M9XCJpbnZlc3RtZW50cy1jYXJkIHEtbWItbGdcIiA6Y2xhc3M9XCJkYXJrQ2xhc3NcIj5cbiAgICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg2IHRleHQtd2VpZ2h0LWJvbGQgcS1tYi1tZFwiIDpjbGFzcz1cInRleHRDbGFzc1wiPlxuICAgICAgICAgICAgPHEtaWNvbiBuYW1lPVwiYmFyX2NoYXJ0XCIgY29sb3I9XCJwcmltYXJ5XCIgY2xhc3M9XCJxLW1yLXNtXCIgLz5cbiAgICAgICAgICAgIEdyw6FmaWNvIGRlIEludmVzdGltZW50b3NcbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2hhcnQtY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8Y2FudmFzIHJlZj1cImJhckNoYXJ0XCI+PC9jYW52YXM+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICA8L3EtY2FyZD5cbiAgICA8L2Rpdj5cbiAgPC9xLXBhZ2U+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgcmVmLCBjb21wdXRlZCwgd2F0Y2gsIG9uTW91bnRlZCwgb25Vbm1vdW50ZWQsIG5leHRUaWNrIH0gZnJvbSAndnVlJ1xuaW1wb3J0IHsgTm90aWZ5LCBEYXJrIH0gZnJvbSAncXVhc2FyJ1xuaW1wb3J0IHtcbiAgQ2hhcnQsXG4gIEJhckNvbnRyb2xsZXIsXG4gIEJhckVsZW1lbnQsXG4gIENhdGVnb3J5U2NhbGUsXG4gIExpbmVhclNjYWxlLFxuICBUb29sdGlwLFxuICBMZWdlbmQsXG59IGZyb20gJ2NoYXJ0LmpzJ1xuXG5jb25zdCBpbnB1dEZvY3VzID0gcmVmKGZhbHNlKVxuY29uc3QgbG9hZGluZyA9IHJlZihmYWxzZSlcblxuY29uc3QgdmFsdWVPbkJhclBsdWdpbiA9IHtcbiAgaWQ6ICd2YWx1ZU9uQmFyJyxcbiAgYWZ0ZXJEYXRhc2V0c0RyYXcoY2hhcnQpIHtcbiAgICBjb25zdCB7IGN0eCB9ID0gY2hhcnRcbiAgICBjaGFydC5kYXRhLmRhdGFzZXRzLmZvckVhY2goKGRhdGFzZXQsIGkpID0+IHtcbiAgICAgIGNvbnN0IG1ldGEgPSBjaGFydC5nZXREYXRhc2V0TWV0YShpKVxuICAgICAgbWV0YS5kYXRhLmZvckVhY2goKGJhciwgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBkYXRhc2V0LmRhdGFbaW5kZXhdXG4gICAgICAgIGN0eC5zYXZlKClcbiAgICAgICAgY3R4LmZvbnQgPSAnYm9sZCAxNXB4IHNhbnMtc2VyaWYnXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBjaGFydC5vcHRpb25zLnNjYWxlcy55LnRpY2tzLmNvbG9yXG4gICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnY2VudGVyJ1xuICAgICAgICBjdHguc2hhZG93Q29sb3IgPSBjaGFydC5vcHRpb25zLnNjYWxlcy55LnRpY2tzLmNvbG9yID09PSAnIzIyMicgPyAnI2ZmZicgOiAnIzIyMidcbiAgICAgICAgY3R4LnNoYWRvd0JsdXIgPSA0XG4gICAgICAgIGN0eC5maWxsVGV4dChcbiAgICAgICAgICBgUiQgJHtOdW1iZXIodmFsdWUpLnRvTG9jYWxlU3RyaW5nKCdwdC1CUicsIHsgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyIH0pfWAsXG4gICAgICAgICAgYmFyLngsXG4gICAgICAgICAgYmFyLnkgLSAxMixcbiAgICAgICAgKVxuICAgICAgICBjdHgucmVzdG9yZSgpXG4gICAgICB9KVxuICAgIH0pXG4gIH0sXG59XG5cbkNoYXJ0LnJlZ2lzdGVyKEJhckNvbnRyb2xsZXIsIEJhckVsZW1lbnQsIENhdGVnb3J5U2NhbGUsIExpbmVhclNjYWxlLCBUb29sdGlwLCBMZWdlbmQpXG5cbmNvbnN0IGludmVzdG1lbnRzID0gcmVmKFtdKVxuXG5jb25zdCBuZXdJbnZlc3RtZW50ID0gcmVmKHtcbiAgYW1vdW50OiAwLFxuICBkYXRlOiAnJyxcbn0pXG5cbmNvbnN0IGlzRGFyayA9IGNvbXB1dGVkKCgpID0+IERhcmsuaXNBY3RpdmUpXG5jb25zdCBkYXJrQ2xhc3MgPSBjb21wdXRlZCgoKSA9PiAoaXNEYXJrLnZhbHVlID8gJ2JnLWRhcmsnIDogJ2JnLWxpZ2h0JykpXG5jb25zdCB0ZXh0Q2xhc3MgPSBjb21wdXRlZCgoKSA9PiAoaXNEYXJrLnZhbHVlID8gJ3RleHQtd2hpdGUnIDogJ3RleHQtZGFyaycpKVxuXG5jb25zdCBjYW5TdWJtaXQgPSBjb21wdXRlZChcbiAgKCkgPT4gbmV3SW52ZXN0bWVudC52YWx1ZS5hbW91bnQgPiAwICYmICEhbmV3SW52ZXN0bWVudC52YWx1ZS5kYXRlICYmICFsb2FkaW5nLnZhbHVlLFxuKVxuXG5mdW5jdGlvbiBub3RpZnkodHlwZSwgbWVzc2FnZSkge1xuICBOb3RpZnkuY3JlYXRlKHsgdHlwZSwgbWVzc2FnZSB9KVxufVxuXG5hc3luYyBmdW5jdGlvbiBpbnZlc3ROb3coKSB7XG4gIGlmICghY2FuU3VibWl0LnZhbHVlKSByZXR1cm5cbiAgbG9hZGluZy52YWx1ZSA9IHRydWVcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgaW52ZXN0bWVudHMudmFsdWUucHVzaCh7XG4gICAgICBhbW91bnQ6IE51bWJlcihuZXdJbnZlc3RtZW50LnZhbHVlLmFtb3VudCksXG4gICAgICBkYXRlOiBuZXdJbnZlc3RtZW50LnZhbHVlLmRhdGUsXG4gICAgfSlcbiAgICBub3RpZnkoJ3Bvc2l0aXZlJywgJ0ludmVzdGltZW50byByZWdpc3RyYWRvIScpXG4gICAgbmV3SW52ZXN0bWVudC52YWx1ZSA9IHsgYW1vdW50OiAwLCBkYXRlOiAnJyB9XG4gICAgbG9hZGluZy52YWx1ZSA9IGZhbHNlXG4gIH0sIDgwMClcbn1cblxuY29uc3QgaW52ZXN0ZWRCeU1vbnRoID0gY29tcHV0ZWQoKCkgPT4ge1xuICBjb25zdCByZXN1bHQgPSB7fVxuICBpbnZlc3RtZW50cy52YWx1ZS5mb3JFYWNoKChpbnYpID0+IHtcbiAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoaW52LmRhdGUpXG4gICAgaWYgKGlzTmFOKGRhdGUpKSByZXR1cm5cbiAgICBjb25zdCBtZXMgPSBkYXRlLnRvTG9jYWxlU3RyaW5nKCdwdC1CUicsIHsgbW9udGg6ICdsb25nJywgeWVhcjogJ251bWVyaWMnIH0pXG4gICAgaWYgKCFyZXN1bHRbbWVzXSkgcmVzdWx0W21lc10gPSAwXG4gICAgcmVzdWx0W21lc10gKz0gaW52LmFtb3VudFxuICB9KVxuICByZXR1cm4gcmVzdWx0XG59KVxuXG5jb25zdCB0b3RhbEludmVzdGVkID0gY29tcHV0ZWQoKCkgPT5cbiAgaW52ZXN0bWVudHMudmFsdWUucmVkdWNlKChzdW0sIGludikgPT4gc3VtICsgTnVtYmVyKGludi5hbW91bnQpLCAwKSxcbilcblxuY29uc3QgYmFyQ2hhcnQgPSByZWYobnVsbClcbmxldCBiYXJDaGFydEluc3RhbmNlID0gbnVsbFxuXG5mdW5jdGlvbiBnZXRDaGFydENvbG9ycygpIHtcbiAgaWYgKGlzRGFyay52YWx1ZSkge1xuICAgIHJldHVybiB7XG4gICAgICBncmFkaWVudFN0YXJ0OiAnIzQzZTk3YicsXG4gICAgICBncmFkaWVudEVuZDogJyMxOTc2ZDInLFxuICAgICAgdGlja0NvbG9yOiAnI2ZmZicsXG4gICAgICBncmlkQ29sb3I6ICdyZ2JhKDI1NSwyNTUsMjU1LDAuMTUpJyxcbiAgICAgIGJvcmRlckNvbG9yOiAnI2ZmZicsXG4gICAgICBob3ZlckNvbG9yOiAnIzQzZTk3YicsXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiB7XG4gICAgICBncmFkaWVudFN0YXJ0OiAnIzE5NzZkMicsXG4gICAgICBncmFkaWVudEVuZDogJyM0M2U5N2InLFxuICAgICAgdGlja0NvbG9yOiAnIzIyMicsXG4gICAgICBncmlkQ29sb3I6ICdyZ2JhKDAsMCwwLDAuMDgpJyxcbiAgICAgIGJvcmRlckNvbG9yOiAnIzE5NzZkMicsXG4gICAgICBob3ZlckNvbG9yOiAnIzE1NjVjMCcsXG4gICAgfVxuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUJhckNoYXJ0KCkge1xuICBhd2FpdCBuZXh0VGljaygpXG4gIGlmICghYmFyQ2hhcnQudmFsdWUpIHJldHVyblxuICBpZiAoYmFyQ2hhcnRJbnN0YW5jZSkgYmFyQ2hhcnRJbnN0YW5jZS5kZXN0cm95KClcbiAgaWYgKE9iamVjdC5rZXlzKGludmVzdGVkQnlNb250aC52YWx1ZSkubGVuZ3RoID09PSAwKSByZXR1cm5cblxuICBjb25zdCBjdHggPSBiYXJDaGFydC52YWx1ZS5nZXRDb250ZXh0KCcyZCcpXG4gIGNvbnN0IHsgZ3JhZGllbnRTdGFydCwgZ3JhZGllbnRFbmQsIHRpY2tDb2xvciwgZ3JpZENvbG9yLCBib3JkZXJDb2xvciwgaG92ZXJDb2xvciB9ID1cbiAgICBnZXRDaGFydENvbG9ycygpXG4gIGNvbnN0IGdyYWRpZW50ID0gY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KDAsIDAsIDAsIDM0MClcbiAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAsIGdyYWRpZW50U3RhcnQpXG4gIGdyYWRpZW50LmFkZENvbG9yU3RvcCgxLCBncmFkaWVudEVuZClcblxuICBiYXJDaGFydEluc3RhbmNlID0gbmV3IENoYXJ0KGJhckNoYXJ0LnZhbHVlLCB7XG4gICAgdHlwZTogJ2JhcicsXG4gICAgZGF0YToge1xuICAgICAgbGFiZWxzOiBPYmplY3Qua2V5cyhpbnZlc3RlZEJ5TW9udGgudmFsdWUpLFxuICAgICAgZGF0YXNldHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGxhYmVsOiAnVmFsb3IgSW52ZXN0aWRvJyxcbiAgICAgICAgICBkYXRhOiBPYmplY3QudmFsdWVzKGludmVzdGVkQnlNb250aC52YWx1ZSksXG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBncmFkaWVudCxcbiAgICAgICAgICBib3JkZXJSYWRpdXM6IDE0LFxuICAgICAgICAgIGJvcmRlcldpZHRoOiAyLFxuICAgICAgICAgIGJvcmRlckNvbG9yLFxuICAgICAgICAgIGhvdmVyQmFja2dyb3VuZENvbG9yOiBob3ZlckNvbG9yLFxuICAgICAgICAgIGJhclBlcmNlbnRhZ2U6IDAuNTUsXG4gICAgICAgICAgY2F0ZWdvcnlQZXJjZW50YWdlOiAwLjU1LFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIHJlc3BvbnNpdmU6IHRydWUsXG4gICAgICBtYWludGFpbkFzcGVjdFJhdGlvOiBmYWxzZSxcbiAgICAgIGFuaW1hdGlvbjogeyBkdXJhdGlvbjogOTAwLCBlYXNpbmc6ICdlYXNlT3V0Qm91bmNlJyB9LFxuICAgICAgcGx1Z2luczoge1xuICAgICAgICBsZWdlbmQ6IHsgZGlzcGxheTogZmFsc2UgfSxcbiAgICAgICAgdG9vbHRpcDoge1xuICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogaXNEYXJrLnZhbHVlID8gJyMyMzI3MmYnIDogJyNmZmYnLFxuICAgICAgICAgIHRpdGxlQ29sb3I6IGlzRGFyay52YWx1ZSA/ICcjZmZmJyA6ICcjMjIyJyxcbiAgICAgICAgICBib2R5Q29sb3I6IGlzRGFyay52YWx1ZSA/ICcjZmZmJyA6ICcjMjIyJyxcbiAgICAgICAgICBib3JkZXJDb2xvcixcbiAgICAgICAgICBib3JkZXJXaWR0aDogMSxcbiAgICAgICAgICBjYWxsYmFja3M6IHtcbiAgICAgICAgICAgIGxhYmVsOiAoY3R4KSA9PlxuICAgICAgICAgICAgICBgUiQgJHtOdW1iZXIoY3R4LnBhcnNlZC55KS50b0xvY2FsZVN0cmluZygncHQtQlInLCB7IG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMiB9KX1gLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHZhbHVlT25CYXI6IHZhbHVlT25CYXJQbHVnaW4sXG4gICAgICB9LFxuICAgICAgc2NhbGVzOiB7XG4gICAgICAgIHg6IHtcbiAgICAgICAgICB0aWNrczoge1xuICAgICAgICAgICAgY29sb3I6IHRpY2tDb2xvcixcbiAgICAgICAgICAgIGZvbnQ6IHsgc2l6ZTogMTYsIHdlaWdodDogJ2JvbGQnIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBncmlkOiB7XG4gICAgICAgICAgICBjb2xvcjogZ3JpZENvbG9yLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHk6IHtcbiAgICAgICAgICBiZWdpbkF0WmVybzogdHJ1ZSxcbiAgICAgICAgICB0aWNrczoge1xuICAgICAgICAgICAgY29sb3I6IHRpY2tDb2xvcixcbiAgICAgICAgICAgIGZvbnQ6IHsgc2l6ZTogMTYsIHdlaWdodDogJ2JvbGQnIH0sXG4gICAgICAgICAgICBjYWxsYmFjazogKHZhbHVlKSA9PlxuICAgICAgICAgICAgICBgUiQgJHtOdW1iZXIodmFsdWUpLnRvTG9jYWxlU3RyaW5nKCdwdC1CUicsIHsgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAwIH0pfWAsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBncmlkOiB7XG4gICAgICAgICAgICBjb2xvcjogZ3JpZENvbG9yLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgcGx1Z2luczogW3ZhbHVlT25CYXJQbHVnaW5dLFxuICB9KVxufVxud2F0Y2goW2ludmVzdG1lbnRzLCBpc0RhcmtdLCB1cGRhdGVCYXJDaGFydCwgeyBkZWVwOiB0cnVlIH0pXG5vbk1vdW50ZWQodXBkYXRlQmFyQ2hhcnQpXG5vblVubW91bnRlZCgoKSA9PiB7XG4gIGlmIChiYXJDaGFydEluc3RhbmNlKSBiYXJDaGFydEluc3RhbmNlLmRlc3Ryb3koKVxufSlcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuLmludmVzdG1lbnRzLWJnIHtcbiAgbWluLWhlaWdodDogMTAwdmg7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMjBkZWcsICNlMGVhZmMgMCUsICNjZmRlZjMgMTAwJSk7XG4gIHBhZGRpbmc6IDMycHggMDtcbn1cbi5iZy1kYXJrIHtcbiAgYmFja2dyb3VuZDogIzIzMjcyZiAhaW1wb3J0YW50O1xufVxuLmJnLWxpZ2h0IHtcbiAgYmFja2dyb3VuZDogI2ZmZiAhaW1wb3J0YW50O1xufVxuLnRleHQtZGFyayB7XG4gIGNvbG9yOiAjMjMyNzJmICFpbXBvcnRhbnQ7XG59XG4uaW52ZXN0bWVudHMtd3JhcHBlciB7XG4gIG1heC13aWR0aDogOTAwcHg7XG4gIG1hcmdpbjogYXV0bztcbiAgcGFkZGluZzogMCAxMnB4O1xufVxuLmludmVzdG1lbnRzLWNhcmQge1xuICBib3JkZXItcmFkaXVzOiAxOHB4O1xuICBib3gtc2hhZG93OiAwIDJweCAxMnB4IDAgcmdiYSgwLCAwLCAwLCAwLjEpO1xuICB0cmFuc2l0aW9uOlxuICAgIGJhY2tncm91bmQgMC4zcyxcbiAgICBib3gtc2hhZG93IDAuM3M7XG4gIG1hcmdpbi1ib3R0b206IDI0cHg7XG59XG4uaW52ZXN0bWVudHMtbGlzdC1pdGVtIHtcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAwLjJzO1xufVxuLmludmVzdG1lbnRzLWxpc3QtaXRlbTpob3ZlciB7XG4gIGJhY2tncm91bmQ6IHJnYmEoMzMsIDE1MCwgMjQzLCAwLjA2KTtcbn1cbi5pbnZlc3RtZW50cy1idG4ge1xuICBtaW4td2lkdGg6IDE4MHB4O1xuICBmb250LXNpemU6IDEuMXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuNXB4O1xuICB0cmFuc2l0aW9uOiBib3gtc2hhZG93IDAuMnM7XG59XG4uaW52ZXN0bWVudHMtYnRuOmFjdGl2ZSB7XG4gIGJveC1zaGFkb3c6IDAgMnB4IDEycHggMCAjNDNlOTdiNTU7XG59XG4uY2hhcnQtY29udGFpbmVyIHtcbiAgd2lkdGg6IDEwMCU7XG4gIG1pbi1oZWlnaHQ6IDM0MHB4O1xuICBtYXgtd2lkdGg6IDcwMHB4O1xuICBtYXJnaW46IGF1dG87XG4gIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC4wMik7XG4gIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gIGJveC1zaGFkb3c6IDAgMnB4IDEycHggMCByZ2JhKDMzLCAxNTAsIDI0MywgMC4wOCk7XG4gIHBhZGRpbmc6IDEycHggMCAwIDA7XG59XG4ucS1pbnB1dDpmb2N1cy13aXRoaW4ge1xuICBib3JkZXItY29sb3I6ICMxOTc2ZDIgIWltcG9ydGFudDtcbiAgYm94LXNoYWRvdzogMCAwIDAgMnB4ICMxOTc2ZDIzMztcbn1cbjwvc3R5bGU+XG4iXSwibmFtZXMiOlsiVG9vbHRpcCIsIkxlZ2VuZCIsIkRhcmsiLCJjdHgiLCJfY3JlYXRlQmxvY2siLCJfd2l0aEN0eCIsIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfY3JlYXRlVk5vZGUiLCJfbm9ybWFsaXplQ2xhc3MiLCJfdG9EaXNwbGF5U3RyaW5nIiwiX2NyZWF0ZVRleHRWTm9kZSIsIl9vcGVuQmxvY2siLCJfY3JlYXRlRWxlbWVudEJsb2NrIiwiX0ZyYWdtZW50IiwiX3JlbmRlckxpc3QiLCJfY3JlYXRlQ29tbWVudFZOb2RlIiwiX3dpdGhNb2RpZmllcnMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUEwSUEsVUFBTSxhQUFhLElBQUksS0FBSztBQUM1QixVQUFNLFVBQVUsSUFBSSxLQUFLO0FBRXpCLFVBQU0sbUJBQW1CO0FBQUEsTUFDdkIsSUFBSTtBQUFBLE1BQ0osa0JBQWtCLE9BQU87QUFDdkIsY0FBTSxFQUFFLElBQUcsSUFBSztBQUNoQixjQUFNLEtBQUssU0FBUyxRQUFRLENBQUMsU0FBUyxNQUFNO0FBQzFDLGdCQUFNLE9BQU8sTUFBTSxlQUFlLENBQUM7QUFDbkMsZUFBSyxLQUFLLFFBQVEsQ0FBQyxLQUFLLFVBQVU7QUFDaEMsa0JBQU0sUUFBUSxRQUFRLEtBQUssS0FBSztBQUNoQyxnQkFBSSxLQUFJO0FBQ1IsZ0JBQUksT0FBTztBQUNYLGdCQUFJLFlBQVksTUFBTSxRQUFRLE9BQU8sRUFBRSxNQUFNO0FBQzdDLGdCQUFJLFlBQVk7QUFDaEIsZ0JBQUksY0FBYyxNQUFNLFFBQVEsT0FBTyxFQUFFLE1BQU0sVUFBVSxT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
