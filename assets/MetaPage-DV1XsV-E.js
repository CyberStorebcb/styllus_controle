import { p as createDirective, ar as isKeyCode, as as getPortalProxy, at as closePortals, _ as _export_sfc, X as createBlock, Y as openBlock, Z as withCtx, a0 as createBaseVNode, $ as createVNode, aa as QCard, af as normalizeClass, ab as QCardSection, a2 as createTextVNode, a6 as QIcon, a3 as createElementBlock, a4 as Fragment, a5 as renderList, a1 as QBtn, ak as Transition, a7 as toDisplayString, ag as QSeparator, au as QDialog, ad as QInput, ah as QCardActions, J as withDirectives, T as reactive, r as ref } from "./index-DTRxxbQ7.js";
import { Q as QList, b as QItem, c as QItemSection, a as QItemLabel } from "./QList-C--UWoUK.js";
import { Q as QPage } from "./QPage-pt9NM7Fr.js";
import { u as useQuasar } from "./use-quasar-BBnQ_X0R.js";
function getDepth(value) {
  if (value === false) {
    return 0;
  }
  if (value === true || value === void 0) {
    return 1;
  }
  const depth = parseInt(value, 10);
  return isNaN(depth) ? 0 : depth;
}
const ClosePopup = createDirective(
  {
    name: "close-popup",
    beforeMount(el, { value }) {
      const ctx = {
        depth: getDepth(value),
        handler(evt) {
          ctx.depth !== 0 && setTimeout(() => {
            const proxy = getPortalProxy(el);
            if (proxy !== void 0) {
              closePortals(proxy, evt, ctx.depth);
            }
          });
        },
        handlerKey(evt) {
          isKeyCode(evt, 13) === true && ctx.handler(evt);
        }
      };
      el.__qclosepopup = ctx;
      el.addEventListener("click", ctx.handler);
      el.addEventListener("keyup", ctx.handlerKey);
    },
    updated(el, { value, oldValue }) {
      if (value !== oldValue) {
        el.__qclosepopup.depth = getDepth(value);
      }
    },
    beforeUnmount(el) {
      const ctx = el.__qclosepopup;
      el.removeEventListener("click", ctx.handler);
      el.removeEventListener("keyup", ctx.handlerKey);
      delete el.__qclosepopup;
    }
  }
);
const _sfc_main = {
  __name: "MetaPage",
  setup(__props, { expose: __expose }) {
    __expose();
    const $q = useQuasar();
    const metasPorMes = reactive({
      Janeiro: { diaria: 500, semanal: 3e3, mensal: 12e3 },
      Fevereiro: { diaria: 550, semanal: 3300, mensal: 11e3 },
      Março: { diaria: 600, semanal: 3500, mensal: 13e3 },
      Abril: { diaria: 650, semanal: 3700, mensal: 14e3 },
      Maio: { diaria: 700, semanal: 4e3, mensal: 15e3 },
      Junho: { diaria: 750, semanal: 4200, mensal: 16e3 },
      Julho: { diaria: 800, semanal: 4500, mensal: 17e3 },
      Agosto: { diaria: 850, semanal: 4700, mensal: 18e3 },
      Setembro: { diaria: 900, semanal: 5e3, mensal: 19e3 },
      Outubro: { diaria: 950, semanal: 5200, mensal: 2e4 },
      Novembro: { diaria: 1e3, semanal: 5500, mensal: 21e3 },
      Dezembro: { diaria: 1200, semanal: 6e3, mensal: 25e3 }
    });
    const mesSelecionado = ref(null);
    const dialogEditarMeta = ref(false);
    const metaEdicao = reactive({ diaria: 0, semanal: 0, mensal: 0 });
    function selecionarMes(mes) {
      mesSelecionado.value = mes;
    }
    function abrirEdicaoMeta() {
      if (mesSelecionado.value) {
        Object.assign(metaEdicao, metasPorMes[mesSelecionado.value]);
        dialogEditarMeta.value = true;
      }
    }
    function salvarMeta() {
      if (mesSelecionado.value) {
        metasPorMes[mesSelecionado.value] = { ...metaEdicao };
        dialogEditarMeta.value = false;
      }
    }
    function formatCurrency(value) {
      return Number(value).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    }
    const __returned__ = { $q, metasPorMes, mesSelecionado, dialogEditarMeta, metaEdicao, selecionarMes, abrirEdicaoMeta, salvarMeta, formatCurrency, ref, reactive, get useQuasar() {
      return useQuasar;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1 = { class: "q-pa-md flex flex-center" };
const _hoisted_2 = { class: "text-h5 text-primary text-center custom-font-bold q-mb-md" };
const _hoisted_3 = { class: "row q-gutter-sm q-mb-md justify-center" };
const _hoisted_4 = { class: "text-h6 text-center q-mb-md row items-center justify-center" };
const _hoisted_5 = {
  key: "empty",
  class: "text-grey q-mt-md text-center animate__animated animate__fadeIn"
};
const _hoisted_6 = { class: "text-h6 text-primary" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QPage, null, {
    default: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        createVNode(QCard, {
          flat: "",
          bordered: "",
          class: normalizeClass(["meta-card q-pa-lg animate__animated animate__fadeInUp", [$setup.$q.dark.isActive ? "bg-dark text-white" : "bg-white text-dark"]])
        }, {
          default: withCtx(() => [
            createVNode(QCardSection, null, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_2, [
                  createVNode(QIcon, {
                    name: "flag",
                    color: "primary",
                    size: "md",
                    class: "q-mr-sm animate__animated animate__bounceIn"
                  }),
                  _cache[4] || (_cache[4] = createTextVNode(" Metas de Vendas por Mês "))
                ])
              ]),
              _: 1
            }),
            createVNode(QCardSection, null, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_3, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList($setup.metasPorMes, (meta, mes) => {
                    return openBlock(), createBlock(QBtn, {
                      key: mes,
                      label: mes,
                      color: "primary",
                      outline: "",
                      rounded: "",
                      size: "md",
                      onClick: ($event) => $setup.selecionarMes(mes),
                      class: normalizeClass([
                        "meta-mes-btn animate__animated",
                        mes === $setup.mesSelecionado ? "bg-blue-2 text-dark dark:bg-blue-10 dark:text-white animate__pulse animate__repeat-2" : "animate__fadeIn"
                      ])
                    }, null, 8, ["label", "onClick", "class"]);
                  }), 128))
                ]),
                createVNode(Transition, {
                  name: "fade-slide",
                  mode: "out-in"
                }, {
                  default: withCtx(() => [
                    $setup.mesSelecionado ? (openBlock(), createElementBlock("div", {
                      key: $setup.mesSelecionado,
                      class: "animate__animated animate__fadeIn"
                    }, [
                      createBaseVNode("div", _hoisted_4, [
                        createVNode(QIcon, {
                          name: "event",
                          color: "primary",
                          size: "sm",
                          class: "q-mr-xs"
                        }),
                        createTextVNode(" Metas para " + toDisplayString($setup.mesSelecionado) + " ", 1),
                        createVNode(QBtn, {
                          dense: "",
                          flat: "",
                          icon: "edit",
                          color: "primary",
                          class: "q-ml-sm",
                          onClick: $setup.abrirEdicaoMeta,
                          size: "sm",
                          title: "Editar metas",
                          "aria-label": "Editar metas"
                        })
                      ]),
                      createVNode(QList, {
                        bordered: "",
                        class: normalizeClass(["rounded-borders shadow-1", $setup.$q.dark.isActive ? "bg-grey-10 text-white" : "bg-grey-2 text-dark"])
                      }, {
                        default: withCtx(() => [
                          createVNode(QItem, { class: "animate__animated animate__fadeInLeft" }, {
                            default: withCtx(() => [
                              createVNode(QItemSection, { avatar: "" }, {
                                default: withCtx(() => [
                                  createVNode(QIcon, {
                                    name: "today",
                                    color: "blue-6"
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(QItemSection, null, {
                                default: withCtx(() => [
                                  createVNode(QItemLabel, { class: "text-subtitle2" }, {
                                    default: withCtx(() => _cache[5] || (_cache[5] = [
                                      createTextVNode("Meta Diária")
                                    ])),
                                    _: 1
                                  }),
                                  createVNode(QItemLabel, { caption: "" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString($setup.formatCurrency($setup.metasPorMes[$setup.mesSelecionado].diaria)), 1)
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(QSeparator),
                          createVNode(QItem, { class: "animate__animated animate__fadeInLeft animate__delay-1s" }, {
                            default: withCtx(() => [
                              createVNode(QItemSection, { avatar: "" }, {
                                default: withCtx(() => [
                                  createVNode(QIcon, {
                                    name: "date_range",
                                    color: "green-6"
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(QItemSection, null, {
                                default: withCtx(() => [
                                  createVNode(QItemLabel, { class: "text-subtitle2" }, {
                                    default: withCtx(() => _cache[6] || (_cache[6] = [
                                      createTextVNode("Meta Semanal")
                                    ])),
                                    _: 1
                                  }),
                                  createVNode(QItemLabel, { caption: "" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString($setup.formatCurrency($setup.metasPorMes[$setup.mesSelecionado].semanal)), 1)
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(QSeparator),
                          createVNode(QItem, { class: "animate__animated animate__fadeInLeft animate__delay-2s" }, {
                            default: withCtx(() => [
                              createVNode(QItemSection, { avatar: "" }, {
                                default: withCtx(() => [
                                  createVNode(QIcon, {
                                    name: "calendar_month",
                                    color: "deep-orange-6"
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(QItemSection, null, {
                                default: withCtx(() => [
                                  createVNode(QItemLabel, { class: "text-subtitle2" }, {
                                    default: withCtx(() => _cache[7] || (_cache[7] = [
                                      createTextVNode("Meta Mensal")
                                    ])),
                                    _: 1
                                  }),
                                  createVNode(QItemLabel, { caption: "" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString($setup.formatCurrency($setup.metasPorMes[$setup.mesSelecionado].mensal)), 1)
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["class"])
                    ])) : (openBlock(), createElementBlock("div", _hoisted_5, [
                      createVNode(QIcon, {
                        name: "info",
                        color: "grey-5",
                        size: "md",
                        class: "q-mb-sm"
                      }),
                      _cache[8] || (_cache[8] = createBaseVNode("div", null, "Selecione um mês para ver as metas.", -1))
                    ]))
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["class"]),
        createVNode(QDialog, {
          modelValue: $setup.dialogEditarMeta,
          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.dialogEditarMeta = $event)
        }, {
          default: withCtx(() => [
            createVNode(QCard, {
              style: { "min-width": "350px" },
              class: normalizeClass(["animate__animated animate__zoomIn", [$setup.$q.dark.isActive ? "bg-grey-9 text-white" : "bg-white text-dark"]])
            }, {
              default: withCtx(() => [
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_6, "Editar Metas de " + toDisplayString($setup.mesSelecionado), 1)
                  ]),
                  _: 1
                }),
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    createVNode(QInput, {
                      modelValue: $setup.metaEdicao.diaria,
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.metaEdicao.diaria = $event),
                      modelModifiers: { number: true },
                      label: "Meta Diária",
                      type: "number",
                      min: "0",
                      outlined: "",
                      dense: "",
                      prefix: "R$",
                      class: "q-mb-sm",
                      rules: [(val) => val >= 0 || "Valor inválido"],
                      color: $setup.$q.dark.isActive ? "white" : "primary",
                      "input-class": $setup.$q.dark.isActive ? "text-white" : "text-dark"
                    }, null, 8, ["modelValue", "rules", "color", "input-class"]),
                    createVNode(QInput, {
                      modelValue: $setup.metaEdicao.semanal,
                      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.metaEdicao.semanal = $event),
                      modelModifiers: { number: true },
                      label: "Meta Semanal",
                      type: "number",
                      min: "0",
                      outlined: "",
                      dense: "",
                      prefix: "R$",
                      class: "q-mb-sm",
                      rules: [(val) => val >= 0 || "Valor inválido"],
                      color: $setup.$q.dark.isActive ? "white" : "primary",
                      "input-class": $setup.$q.dark.isActive ? "text-white" : "text-dark"
                    }, null, 8, ["modelValue", "rules", "color", "input-class"]),
                    createVNode(QInput, {
                      modelValue: $setup.metaEdicao.mensal,
                      "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.metaEdicao.mensal = $event),
                      modelModifiers: { number: true },
                      label: "Meta Mensal",
                      type: "number",
                      min: "0",
                      outlined: "",
                      dense: "",
                      prefix: "R$",
                      rules: [(val) => val >= 0 || "Valor inválido"],
                      color: $setup.$q.dark.isActive ? "white" : "primary",
                      "input-class": $setup.$q.dark.isActive ? "text-white" : "text-dark"
                    }, null, 8, ["modelValue", "rules", "color", "input-class"])
                  ]),
                  _: 1
                }),
                createVNode(QCardActions, { align: "right" }, {
                  default: withCtx(() => [
                    withDirectives(createVNode(QBtn, {
                      flat: "",
                      label: "Cancelar",
                      color: "primary"
                    }, null, 512), [
                      [ClosePopup]
                    ]),
                    createVNode(QBtn, {
                      flat: "",
                      label: "Salvar",
                      color: "primary",
                      onClick: $setup.salvarMeta
                    })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["class"])
          ]),
          _: 1
        }, 8, ["modelValue"])
      ])
    ]),
    _: 1
  });
}
const MetaPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-3476ac41"], ["__file", "MetaPage.vue"]]);
export {
  MetaPage as default
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWV0YVBhZ2UtRFYxWHNWLUUuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2RpcmVjdGl2ZXMvY2xvc2UtcG9wdXAvQ2xvc2VQb3B1cC5qcyIsIi4uLy4uLy4uL3NyYy9wYWdlcy9NZXRhUGFnZS52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlRGlyZWN0aXZlIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgY2xvc2VQb3J0YWxzLCBnZXRQb3J0YWxQcm94eSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucG9ydGFsL3BvcnRhbC5qcydcbmltcG9ydCB7IGlzS2V5Q29kZSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUua2V5Ym9hcmQva2V5LWNvbXBvc2l0aW9uLmpzJ1xuaW1wb3J0IGdldFNTUlByb3BzIGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUubm9vcC1zc3ItZGlyZWN0aXZlLXRyYW5zZm9ybS9ub29wLXNzci1kaXJlY3RpdmUtdHJhbnNmb3JtLmpzJ1xuXG4vKlxuICogZGVwdGhcbiAqICAgPCAwICAtLT4gY2xvc2UgYWxsIGNoYWluXG4gKiAgIDAgICAgLS0+IGRpc2FibGVkXG4gKiAgID4gMCAgLS0+IGNsb3NlIGNoYWluIHVwIHRvIE4gcGFyZW50XG4gKi9cblxuZnVuY3Rpb24gZ2V0RGVwdGggKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm4gMFxuICB9XG4gIGlmICh2YWx1ZSA9PT0gdHJ1ZSB8fCB2YWx1ZSA9PT0gdm9pZCAwKSB7XG4gICAgcmV0dXJuIDFcbiAgfVxuXG4gIGNvbnN0IGRlcHRoID0gcGFyc2VJbnQodmFsdWUsIDEwKVxuICByZXR1cm4gaXNOYU4oZGVwdGgpID8gMCA6IGRlcHRoXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZURpcmVjdGl2ZShfX1FVQVNBUl9TU1JfU0VSVkVSX19cbiAgPyB7IG5hbWU6ICdjbG9zZS1wb3B1cCcsIGdldFNTUlByb3BzIH1cbiAgOiB7XG4gICAgICBuYW1lOiAnY2xvc2UtcG9wdXAnLFxuXG4gICAgICBiZWZvcmVNb3VudCAoZWwsIHsgdmFsdWUgfSkge1xuICAgICAgICBjb25zdCBjdHggPSB7XG4gICAgICAgICAgZGVwdGg6IGdldERlcHRoKHZhbHVlKSxcblxuICAgICAgICAgIGhhbmRsZXIgKGV2dCkge1xuICAgICAgICAgICAgLy8gYWxsb3cgQGNsaWNrIHRvIGJlIGVtaXR0ZWRcbiAgICAgICAgICAgIGN0eC5kZXB0aCAhPT0gMCAmJiBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgcHJveHkgPSBnZXRQb3J0YWxQcm94eShlbClcbiAgICAgICAgICAgICAgaWYgKHByb3h5ICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICBjbG9zZVBvcnRhbHMocHJveHksIGV2dCwgY3R4LmRlcHRoKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBoYW5kbGVyS2V5IChldnQpIHtcbiAgICAgICAgICAgIGlzS2V5Q29kZShldnQsIDEzKSA9PT0gdHJ1ZSAmJiBjdHguaGFuZGxlcihldnQpXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZWwuX19xY2xvc2Vwb3B1cCA9IGN0eFxuXG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY3R4LmhhbmRsZXIpXG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgY3R4LmhhbmRsZXJLZXkpXG4gICAgICB9LFxuXG4gICAgICB1cGRhdGVkIChlbCwgeyB2YWx1ZSwgb2xkVmFsdWUgfSkge1xuICAgICAgICBpZiAodmFsdWUgIT09IG9sZFZhbHVlKSB7XG4gICAgICAgICAgZWwuX19xY2xvc2Vwb3B1cC5kZXB0aCA9IGdldERlcHRoKHZhbHVlKVxuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICBiZWZvcmVVbm1vdW50IChlbCkge1xuICAgICAgICBjb25zdCBjdHggPSBlbC5fX3FjbG9zZXBvcHVwXG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY3R4LmhhbmRsZXIpXG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgY3R4LmhhbmRsZXJLZXkpXG4gICAgICAgIGRlbGV0ZSBlbC5fX3FjbG9zZXBvcHVwXG4gICAgICB9XG4gICAgfVxuKVxuIiwiPHRlbXBsYXRlPlxuICA8cS1wYWdlPlxuICAgIDxkaXYgY2xhc3M9XCJxLXBhLW1kIGZsZXggZmxleC1jZW50ZXJcIj5cbiAgICAgIDxxLWNhcmRcbiAgICAgICAgZmxhdFxuICAgICAgICBib3JkZXJlZFxuICAgICAgICBjbGFzcz1cIm1ldGEtY2FyZCBxLXBhLWxnIGFuaW1hdGVfX2FuaW1hdGVkIGFuaW1hdGVfX2ZhZGVJblVwXCJcbiAgICAgICAgOmNsYXNzPVwiWyRxLmRhcmsuaXNBY3RpdmUgPyAnYmctZGFyayB0ZXh0LXdoaXRlJyA6ICdiZy13aGl0ZSB0ZXh0LWRhcmsnXVwiXG4gICAgICA+XG4gICAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNSB0ZXh0LXByaW1hcnkgdGV4dC1jZW50ZXIgY3VzdG9tLWZvbnQtYm9sZCBxLW1iLW1kXCI+XG4gICAgICAgICAgICA8cS1pY29uXG4gICAgICAgICAgICAgIG5hbWU9XCJmbGFnXCJcbiAgICAgICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgICAgc2l6ZT1cIm1kXCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJxLW1yLXNtIGFuaW1hdGVfX2FuaW1hdGVkIGFuaW1hdGVfX2JvdW5jZUluXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICBNZXRhcyBkZSBWZW5kYXMgcG9yIE3DqnNcbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgcS1ndXR0ZXItc20gcS1tYi1tZCBqdXN0aWZ5LWNlbnRlclwiPlxuICAgICAgICAgICAgPHEtYnRuXG4gICAgICAgICAgICAgIHYtZm9yPVwiKG1ldGEsIG1lcykgaW4gbWV0YXNQb3JNZXNcIlxuICAgICAgICAgICAgICA6a2V5PVwibWVzXCJcbiAgICAgICAgICAgICAgOmxhYmVsPVwibWVzXCJcbiAgICAgICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgICAgb3V0bGluZVxuICAgICAgICAgICAgICByb3VuZGVkXG4gICAgICAgICAgICAgIHNpemU9XCJtZFwiXG4gICAgICAgICAgICAgIEBjbGljaz1cInNlbGVjaW9uYXJNZXMobWVzKVwiXG4gICAgICAgICAgICAgIDpjbGFzcz1cIltcbiAgICAgICAgICAgICAgICAnbWV0YS1tZXMtYnRuIGFuaW1hdGVfX2FuaW1hdGVkJyxcbiAgICAgICAgICAgICAgICBtZXMgPT09IG1lc1NlbGVjaW9uYWRvXG4gICAgICAgICAgICAgICAgICA/ICdiZy1ibHVlLTIgdGV4dC1kYXJrIGRhcms6YmctYmx1ZS0xMCBkYXJrOnRleHQtd2hpdGUgYW5pbWF0ZV9fcHVsc2UgYW5pbWF0ZV9fcmVwZWF0LTInXG4gICAgICAgICAgICAgICAgICA6ICdhbmltYXRlX19mYWRlSW4nLFxuICAgICAgICAgICAgICBdXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPHRyYW5zaXRpb24gbmFtZT1cImZhZGUtc2xpZGVcIiBtb2RlPVwib3V0LWluXCI+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIHYtaWY9XCJtZXNTZWxlY2lvbmFkb1wiXG4gICAgICAgICAgICAgIDprZXk9XCJtZXNTZWxlY2lvbmFkb1wiXG4gICAgICAgICAgICAgIGNsYXNzPVwiYW5pbWF0ZV9fYW5pbWF0ZWQgYW5pbWF0ZV9fZmFkZUluXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDYgdGV4dC1jZW50ZXIgcS1tYi1tZCByb3cgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgPHEtaWNvbiBuYW1lPVwiZXZlbnRcIiBjb2xvcj1cInByaW1hcnlcIiBzaXplPVwic21cIiBjbGFzcz1cInEtbXIteHNcIiAvPlxuICAgICAgICAgICAgICAgIE1ldGFzIHBhcmEge3sgbWVzU2VsZWNpb25hZG8gfX1cbiAgICAgICAgICAgICAgICA8cS1idG5cbiAgICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgICBmbGF0XG4gICAgICAgICAgICAgICAgICBpY29uPVwiZWRpdFwiXG4gICAgICAgICAgICAgICAgICBjb2xvcj1cInByaW1hcnlcIlxuICAgICAgICAgICAgICAgICAgY2xhc3M9XCJxLW1sLXNtXCJcbiAgICAgICAgICAgICAgICAgIEBjbGljaz1cImFicmlyRWRpY2FvTWV0YVwiXG4gICAgICAgICAgICAgICAgICBzaXplPVwic21cIlxuICAgICAgICAgICAgICAgICAgdGl0bGU9XCJFZGl0YXIgbWV0YXNcIlxuICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cIkVkaXRhciBtZXRhc1wiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxxLWxpc3RcbiAgICAgICAgICAgICAgICBib3JkZXJlZFxuICAgICAgICAgICAgICAgIGNsYXNzPVwicm91bmRlZC1ib3JkZXJzIHNoYWRvdy0xXCJcbiAgICAgICAgICAgICAgICA6Y2xhc3M9XCIkcS5kYXJrLmlzQWN0aXZlID8gJ2JnLWdyZXktMTAgdGV4dC13aGl0ZScgOiAnYmctZ3JleS0yIHRleHQtZGFyaydcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHEtaXRlbSBjbGFzcz1cImFuaW1hdGVfX2FuaW1hdGVkIGFuaW1hdGVfX2ZhZGVJbkxlZnRcIj5cbiAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBhdmF0YXI+XG4gICAgICAgICAgICAgICAgICAgIDxxLWljb24gbmFtZT1cInRvZGF5XCIgY29sb3I9XCJibHVlLTZcIiAvPlxuICAgICAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbCBjbGFzcz1cInRleHQtc3VidGl0bGUyXCI+TWV0YSBEacOhcmlhPC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWwgY2FwdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICB7eyBmb3JtYXRDdXJyZW5jeShtZXRhc1Bvck1lc1ttZXNTZWxlY2lvbmFkb10uZGlhcmlhKSB9fVxuICAgICAgICAgICAgICAgICAgICA8L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgICAgICAgICAgPHEtc2VwYXJhdG9yIC8+XG4gICAgICAgICAgICAgICAgPHEtaXRlbSBjbGFzcz1cImFuaW1hdGVfX2FuaW1hdGVkIGFuaW1hdGVfX2ZhZGVJbkxlZnQgYW5pbWF0ZV9fZGVsYXktMXNcIj5cbiAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBhdmF0YXI+XG4gICAgICAgICAgICAgICAgICAgIDxxLWljb24gbmFtZT1cImRhdGVfcmFuZ2VcIiBjb2xvcj1cImdyZWVuLTZcIiAvPlxuICAgICAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbCBjbGFzcz1cInRleHQtc3VidGl0bGUyXCI+TWV0YSBTZW1hbmFsPC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWwgY2FwdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICB7eyBmb3JtYXRDdXJyZW5jeShtZXRhc1Bvck1lc1ttZXNTZWxlY2lvbmFkb10uc2VtYW5hbCkgfX1cbiAgICAgICAgICAgICAgICAgICAgPC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgIDwvcS1pdGVtPlxuICAgICAgICAgICAgICAgIDxxLXNlcGFyYXRvciAvPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0gY2xhc3M9XCJhbmltYXRlX19hbmltYXRlZCBhbmltYXRlX19mYWRlSW5MZWZ0IGFuaW1hdGVfX2RlbGF5LTJzXCI+XG4gICAgICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gYXZhdGFyPlxuICAgICAgICAgICAgICAgICAgICA8cS1pY29uIG5hbWU9XCJjYWxlbmRhcl9tb250aFwiIGNvbG9yPVwiZGVlcC1vcmFuZ2UtNlwiIC8+XG4gICAgICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsIGNsYXNzPVwidGV4dC1zdWJ0aXRsZTJcIj5NZXRhIE1lbnNhbDwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsIGNhcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAge3sgZm9ybWF0Q3VycmVuY3kobWV0YXNQb3JNZXNbbWVzU2VsZWNpb25hZG9dLm1lbnNhbCkgfX1cbiAgICAgICAgICAgICAgICAgICAgPC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgIDwvcS1pdGVtPlxuICAgICAgICAgICAgICA8L3EtbGlzdD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICB2LWVsc2VcbiAgICAgICAgICAgICAga2V5PVwiZW1wdHlcIlxuICAgICAgICAgICAgICBjbGFzcz1cInRleHQtZ3JleSBxLW10LW1kIHRleHQtY2VudGVyIGFuaW1hdGVfX2FuaW1hdGVkIGFuaW1hdGVfX2ZhZGVJblwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxxLWljb24gbmFtZT1cImluZm9cIiBjb2xvcj1cImdyZXktNVwiIHNpemU9XCJtZFwiIGNsYXNzPVwicS1tYi1zbVwiIC8+XG4gICAgICAgICAgICAgIDxkaXY+U2VsZWNpb25lIHVtIG3DqnMgcGFyYSB2ZXIgYXMgbWV0YXMuPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L3RyYW5zaXRpb24+XG4gICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICA8L3EtY2FyZD5cbiAgICAgIDwhLS0gRGlhbG9nIGRlIGVkacOnw6NvIC0tPlxuICAgICAgPHEtZGlhbG9nIHYtbW9kZWw9XCJkaWFsb2dFZGl0YXJNZXRhXCI+XG4gICAgICAgIDxxLWNhcmRcbiAgICAgICAgICBzdHlsZT1cIm1pbi13aWR0aDogMzUwcHhcIlxuICAgICAgICAgIGNsYXNzPVwiYW5pbWF0ZV9fYW5pbWF0ZWQgYW5pbWF0ZV9fem9vbUluXCJcbiAgICAgICAgICA6Y2xhc3M9XCJbJHEuZGFyay5pc0FjdGl2ZSA/ICdiZy1ncmV5LTkgdGV4dC13aGl0ZScgOiAnYmctd2hpdGUgdGV4dC1kYXJrJ11cIlxuICAgICAgICA+XG4gICAgICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDYgdGV4dC1wcmltYXJ5XCI+RWRpdGFyIE1ldGFzIGRlIHt7IG1lc1NlbGVjaW9uYWRvIH19PC9kaXY+XG4gICAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICA8cS1jYXJkLXNlY3Rpb24+XG4gICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICB2LW1vZGVsLm51bWJlcj1cIm1ldGFFZGljYW8uZGlhcmlhXCJcbiAgICAgICAgICAgICAgbGFiZWw9XCJNZXRhIERpw6FyaWFcIlxuICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgICAgbWluPVwiMFwiXG4gICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgIHByZWZpeD1cIlIkXCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJxLW1iLXNtXCJcbiAgICAgICAgICAgICAgOnJ1bGVzPVwiWyh2YWwpID0+IHZhbCA+PSAwIHx8ICdWYWxvciBpbnbDoWxpZG8nXVwiXG4gICAgICAgICAgICAgIDpjb2xvcj1cIiRxLmRhcmsuaXNBY3RpdmUgPyAnd2hpdGUnIDogJ3ByaW1hcnknXCJcbiAgICAgICAgICAgICAgOmlucHV0LWNsYXNzPVwiJHEuZGFyay5pc0FjdGl2ZSA/ICd0ZXh0LXdoaXRlJyA6ICd0ZXh0LWRhcmsnXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICB2LW1vZGVsLm51bWJlcj1cIm1ldGFFZGljYW8uc2VtYW5hbFwiXG4gICAgICAgICAgICAgIGxhYmVsPVwiTWV0YSBTZW1hbmFsXCJcbiAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgIG1pbj1cIjBcIlxuICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICBwcmVmaXg9XCJSJFwiXG4gICAgICAgICAgICAgIGNsYXNzPVwicS1tYi1zbVwiXG4gICAgICAgICAgICAgIDpydWxlcz1cIlsodmFsKSA9PiB2YWwgPj0gMCB8fCAnVmFsb3IgaW52w6FsaWRvJ11cIlxuICAgICAgICAgICAgICA6Y29sb3I9XCIkcS5kYXJrLmlzQWN0aXZlID8gJ3doaXRlJyA6ICdwcmltYXJ5J1wiXG4gICAgICAgICAgICAgIDppbnB1dC1jbGFzcz1cIiRxLmRhcmsuaXNBY3RpdmUgPyAndGV4dC13aGl0ZScgOiAndGV4dC1kYXJrJ1wiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgdi1tb2RlbC5udW1iZXI9XCJtZXRhRWRpY2FvLm1lbnNhbFwiXG4gICAgICAgICAgICAgIGxhYmVsPVwiTWV0YSBNZW5zYWxcIlxuICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgICAgbWluPVwiMFwiXG4gICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgIHByZWZpeD1cIlIkXCJcbiAgICAgICAgICAgICAgOnJ1bGVzPVwiWyh2YWwpID0+IHZhbCA+PSAwIHx8ICdWYWxvciBpbnbDoWxpZG8nXVwiXG4gICAgICAgICAgICAgIDpjb2xvcj1cIiRxLmRhcmsuaXNBY3RpdmUgPyAnd2hpdGUnIDogJ3ByaW1hcnknXCJcbiAgICAgICAgICAgICAgOmlucHV0LWNsYXNzPVwiJHEuZGFyay5pc0FjdGl2ZSA/ICd0ZXh0LXdoaXRlJyA6ICd0ZXh0LWRhcmsnXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICA8cS1jYXJkLWFjdGlvbnMgYWxpZ249XCJyaWdodFwiPlxuICAgICAgICAgICAgPHEtYnRuIGZsYXQgbGFiZWw9XCJDYW5jZWxhclwiIGNvbG9yPVwicHJpbWFyeVwiIHYtY2xvc2UtcG9wdXAgLz5cbiAgICAgICAgICAgIDxxLWJ0biBmbGF0IGxhYmVsPVwiU2FsdmFyXCIgY29sb3I9XCJwcmltYXJ5XCIgQGNsaWNrPVwic2FsdmFyTWV0YVwiIC8+XG4gICAgICAgICAgPC9xLWNhcmQtYWN0aW9ucz5cbiAgICAgICAgPC9xLWNhcmQ+XG4gICAgICA8L3EtZGlhbG9nPlxuICAgIDwvZGl2PlxuICA8L3EtcGFnZT5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyByZWYsIHJlYWN0aXZlIH0gZnJvbSAndnVlJ1xuaW1wb3J0IHsgdXNlUXVhc2FyIH0gZnJvbSAncXVhc2FyJ1xuXG5jb25zdCAkcSA9IHVzZVF1YXNhcigpXG5cbmNvbnN0IG1ldGFzUG9yTWVzID0gcmVhY3RpdmUoe1xuICBKYW5laXJvOiB7IGRpYXJpYTogNTAwLCBzZW1hbmFsOiAzMDAwLCBtZW5zYWw6IDEyMDAwIH0sXG4gIEZldmVyZWlybzogeyBkaWFyaWE6IDU1MCwgc2VtYW5hbDogMzMwMCwgbWVuc2FsOiAxMTAwMCB9LFxuICBNYXLDp286IHsgZGlhcmlhOiA2MDAsIHNlbWFuYWw6IDM1MDAsIG1lbnNhbDogMTMwMDAgfSxcbiAgQWJyaWw6IHsgZGlhcmlhOiA2NTAsIHNlbWFuYWw6IDM3MDAsIG1lbnNhbDogMTQwMDAgfSxcbiAgTWFpbzogeyBkaWFyaWE6IDcwMCwgc2VtYW5hbDogNDAwMCwgbWVuc2FsOiAxNTAwMCB9LFxuICBKdW5obzogeyBkaWFyaWE6IDc1MCwgc2VtYW5hbDogNDIwMCwgbWVuc2FsOiAxNjAwMCB9LFxuICBKdWxobzogeyBkaWFyaWE6IDgwMCwgc2VtYW5hbDogNDUwMCwgbWVuc2FsOiAxNzAwMCB9LFxuICBBZ29zdG86IHsgZGlhcmlhOiA4NTAsIHNlbWFuYWw6IDQ3MDAsIG1lbnNhbDogMTgwMDAgfSxcbiAgU2V0ZW1icm86IHsgZGlhcmlhOiA5MDAsIHNlbWFuYWw6IDUwMDAsIG1lbnNhbDogMTkwMDAgfSxcbiAgT3V0dWJybzogeyBkaWFyaWE6IDk1MCwgc2VtYW5hbDogNTIwMCwgbWVuc2FsOiAyMDAwMCB9LFxuICBOb3ZlbWJybzogeyBkaWFyaWE6IDEwMDAsIHNlbWFuYWw6IDU1MDAsIG1lbnNhbDogMjEwMDAgfSxcbiAgRGV6ZW1icm86IHsgZGlhcmlhOiAxMjAwLCBzZW1hbmFsOiA2MDAwLCBtZW5zYWw6IDI1MDAwIH0sXG59KVxuXG5jb25zdCBtZXNTZWxlY2lvbmFkbyA9IHJlZihudWxsKVxuY29uc3QgZGlhbG9nRWRpdGFyTWV0YSA9IHJlZihmYWxzZSlcbmNvbnN0IG1ldGFFZGljYW8gPSByZWFjdGl2ZSh7IGRpYXJpYTogMCwgc2VtYW5hbDogMCwgbWVuc2FsOiAwIH0pXG5cbmZ1bmN0aW9uIHNlbGVjaW9uYXJNZXMobWVzKSB7XG4gIG1lc1NlbGVjaW9uYWRvLnZhbHVlID0gbWVzXG59XG5cbmZ1bmN0aW9uIGFicmlyRWRpY2FvTWV0YSgpIHtcbiAgaWYgKG1lc1NlbGVjaW9uYWRvLnZhbHVlKSB7XG4gICAgT2JqZWN0LmFzc2lnbihtZXRhRWRpY2FvLCBtZXRhc1Bvck1lc1ttZXNTZWxlY2lvbmFkby52YWx1ZV0pXG4gICAgZGlhbG9nRWRpdGFyTWV0YS52YWx1ZSA9IHRydWVcbiAgfVxufVxuXG5mdW5jdGlvbiBzYWx2YXJNZXRhKCkge1xuICBpZiAobWVzU2VsZWNpb25hZG8udmFsdWUpIHtcbiAgICBtZXRhc1Bvck1lc1ttZXNTZWxlY2lvbmFkby52YWx1ZV0gPSB7IC4uLm1ldGFFZGljYW8gfVxuICAgIGRpYWxvZ0VkaXRhck1ldGEudmFsdWUgPSBmYWxzZVxuICB9XG59XG5cbmZ1bmN0aW9uIGZvcm1hdEN1cnJlbmN5KHZhbHVlKSB7XG4gIHJldHVybiBOdW1iZXIodmFsdWUpLnRvTG9jYWxlU3RyaW5nKCdwdC1CUicsIHsgc3R5bGU6ICdjdXJyZW5jeScsIGN1cnJlbmN5OiAnQlJMJyB9KVxufVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG4ubWV0YS1jYXJkIHtcbiAgbWF4LXdpZHRoOiA1MDBweDtcbiAgd2lkdGg6IDEwMCU7XG4gIGJvcmRlci1yYWRpdXM6IDE4cHg7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICNlM2YyZmQgMCUsICNmZmYgMTAwJSk7XG4gIGJveC1zaGFkb3c6IDAgNHB4IDI0cHggMCByZ2JhKDMzLCAxNTAsIDI0MywgMC4wOCk7XG59XG4ubWV0YS1tZXMtYnRuIHtcbiAgbWluLXdpZHRoOiA5MHB4O1xuICBmb250LXdlaWdodDogNjAwO1xuICBsZXR0ZXItc3BhY2luZzogMXB4O1xuICB0cmFuc2l0aW9uOiBib3gtc2hhZG93IDAuMnM7XG59XG4ubWV0YS1tZXMtYnRuLmJnLWJsdWUtMixcbi5tZXRhLW1lcy1idG4uZGFya1xcOmJnLWJsdWUtMTAge1xuICBib3gtc2hhZG93OiAwIDJweCA4cHggMCByZ2JhKDMzLCAxNTAsIDI0MywgMC4xOCk7XG59XG4ucm91bmRlZC1ib3JkZXJzIHtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbn1cbi5mYWRlLXNsaWRlLWVudGVyLWFjdGl2ZSxcbi5mYWRlLXNsaWRlLWxlYXZlLWFjdGl2ZSB7XG4gIHRyYW5zaXRpb246IGFsbCAwLjVzIGN1YmljLWJlemllcigwLjU1LCAwLCAwLjEsIDEpO1xufVxuLmZhZGUtc2xpZGUtZW50ZXItZnJvbSB7XG4gIG9wYWNpdHk6IDA7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgzMHB4KTtcbn1cbi5mYWRlLXNsaWRlLWxlYXZlLXRvIHtcbiAgb3BhY2l0eTogMDtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zMHB4KTtcbn1cbi5iZy1kYXJrIHtcbiAgYmFja2dyb3VuZDogIzE4MTgxOCAhaW1wb3J0YW50O1xufVxuLnRleHQtd2hpdGUge1xuICBjb2xvcjogI2ZmZiAhaW1wb3J0YW50O1xufVxuLnRleHQtZGFyayB7XG4gIGNvbG9yOiAjMjIyICFpbXBvcnRhbnQ7XG59XG4uYmctZ3JleS0xMCB7XG4gIGJhY2tncm91bmQ6ICMyMjIgIWltcG9ydGFudDtcbn1cbi5iZy1ncmV5LTIge1xuICBiYWNrZ3JvdW5kOiAjZjVmNWY1ICFpbXBvcnRhbnQ7XG59XG48L3N0eWxlPlxuXG48IS0tXG5QYXJhIGFuaW1hw6fDtWVzLCB1dGlsaXplIGFuaW1hdGUuY3NzOlxubnBtIGluc3RhbGwgYW5pbWF0ZS5jc3NcbmUgaW1wb3J0ZSBlbSBzZXUgbWFpbi5qczogaW1wb3J0ICdhbmltYXRlLmNzcyc7XG4tLT5cbiJdLCJuYW1lcyI6WyJfY3JlYXRlQmxvY2siLCJfd2l0aEN0eCIsIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfY3JlYXRlVk5vZGUiLCJfbm9ybWFsaXplQ2xhc3MiLCJfY3JlYXRlVGV4dFZOb2RlIiwiX29wZW5CbG9jayIsIl9jcmVhdGVFbGVtZW50QmxvY2siLCJfRnJhZ21lbnQiLCJfcmVuZGVyTGlzdCIsIl9UcmFuc2l0aW9uIiwiX3RvRGlzcGxheVN0cmluZyJdLCJtYXBwaW5ncyI6Ijs7OztBQVlBLFNBQVMsU0FBVSxPQUFPO0FBQ3hCLE1BQUksVUFBVSxPQUFPO0FBQ1osV0FBQTtBQUFBLEVBQUE7QUFFTCxNQUFBLFVBQVUsUUFBUSxVQUFVLFFBQVE7QUFDL0IsV0FBQTtBQUFBLEVBQUE7QUFHSCxRQUFBLFFBQVEsU0FBUyxPQUFPLEVBQUU7QUFDekIsU0FBQSxNQUFNLEtBQUssSUFBSSxJQUFJO0FBQzVCO0FBRUEsTUFBQSxhQUFlO0FBQUEsRUFFWDtBQUFBLElBQ0UsTUFBTTtBQUFBLElBRU4sWUFBYSxJQUFJLEVBQUUsU0FBUztBQUMxQixZQUFNLE1BQU07QUFBQSxRQUNWLE9BQU8sU0FBUyxLQUFLO0FBQUEsUUFFckIsUUFBUyxLQUFLO0FBRVIsY0FBQSxVQUFVLEtBQUssV0FBVyxNQUFNO0FBQzVCLGtCQUFBLFFBQVEsZUFBZSxFQUFFO0FBQy9CLGdCQUFJLFVBQVUsUUFBUTtBQUNQLDJCQUFBLE9BQU8sS0FBSyxJQUFJLEtBQUs7QUFBQSxZQUFBO0FBQUEsVUFDcEMsQ0FDRDtBQUFBLFFBQ0g7QUFBQSxRQUVBLFdBQVksS0FBSztBQUNmLG9CQUFVLEtBQUssRUFBRSxNQUFNLFFBQVEsSUFBSSxRQUFRLEdBQUc7QUFBQSxRQUFBO0FBQUEsTUFFbEQ7QUFFQSxTQUFHLGdCQUFnQjtBQUVoQixTQUFBLGlCQUFpQixTQUFTLElBQUksT0FBTztBQUNyQyxTQUFBLGlCQUFpQixTQUFTLElBQUksVUFBVTtBQUFBLElBQzdDO0FBQUEsSUFFQSxRQUFTLElBQUksRUFBRSxP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LFlBMEk4QixPQUFBLFdBQVc7QUFBQSxzQkExSXpDLHVCQTBJOEIsT0FBQSxDQUFBLE1BQUEsT0FBQSxDQUFBLElBQUEsWUFBQSxPQUFBLFdBQVcsVUFBTztBQUFBLHNCQTFJaEQsZ0JBMEljLEVBQW1DLFFBQUEsS0FBQTtBQUFBLHNCQUNuQyxPQUFNO0FBQUEsc0JBQ04sTUFBSztBQUFBLHNCQUNMLEtBQUk7QUFBQSxzQkFDSixVQUFBO0FBQUEsc0JBQ0EsT0FBQTtBQUFBLHNCQUNBLFFBQU87QUFBQSxzQkFDUCxPQUFNO0FBQUEsc0JBQ0wsT0FBSyxDQUFBLENBQUksUUFBUSxPQUFHLEtBQUEsZ0JBQUE7QUFBQSxzQkFDcEIsT0FBTyxPQUFBLEdBQUcsS0FBSyxXQUFRLFVBQUE7QUFBQSxzQkFDdkIsZUFBYSxPQUFBLEdBQUcsS0FBSyxXQUFRLGVBQUE7QUFBQTtvQkFFaENBLFlBV0UsUUFBQTtBQUFBLHNCQWpLZCxZQXVKOEIsT0FBQSxXQUFXO0FBQUEsc0JBdkp6Qyx1QkF1SjhCLE9BQUEsQ0FBQSxNQUFBLE9BQUEsQ0FBQSxJQUFBLFlBQUEsT0FBQSxXQUFXLFNBQU07QUFBQSxzQkF2Si9DLGdCQXVKYyxFQUFrQyxRQUFBLEtBQUE7QUFBQSxzQkFDbEMsT0FBTTtBQUFBLHNCQUNOLE1BQUs7QUFBQSxzQkFDTCxLQUFJO0FBQUEsc0JBQ0osVUFBQTtBQUFBLHNCQUNBLE9BQUE7QUFBQSxzQkFDQSxRQUFPO0FBQUEsc0JBQ04sT0FBSyxDQUFBLENBQUksUUFBUSxPQUFHLEtBQUEsZ0JBQUE7QUFBQSxzQkFDcEIsT0FBTyxPQUFBLEdBQUcsS0FBSyxXQUFRLFVBQUE7QUFBQSxzQkFDdkIsZUFBYSxPQUFBLEdBQUcsS0FBSyxXQUFRLGVBQUE7QUFBQTs7a0JBaEs1QyxHQUFBO0FBQUE7Z0JBbUtVQSxZQUdpQixjQUFBLEVBQUEsT0FBQSxRQUhJLEdBQUE7QUFBQSxrQkFuSy9CLFNBQUFGLFFBb0tZLE1BQTZEO0FBQUEsbUNBQTdERSxZQUE2RCxNQUFBO0FBQUEsc0JBQXRELE1BQUE7QUFBQSxzQkFBSyxPQUFNO0FBQUEsc0JBQVcsT0FBTTtBQUFBOzs7b0JBQ25DQSxZQUFpRSxNQUFBO0FBQUEsc0JBQTFELE1BQUE7QUFBQSxzQkFBSyxPQUFNO0FBQUEsc0JBQVMsT0FBTTtBQUFBLHNCQUFXLFNBQU8sT0FBVTtBQUFBOztrQkFyS3pFLEdBQUE7QUFBQTs7Y0FBQSxHQUFBO0FBQUE7O1VBQUEsR0FBQTtBQUFBOzs7SUFBQSxHQUFBO0FBQUE7OzsiLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbMF19
