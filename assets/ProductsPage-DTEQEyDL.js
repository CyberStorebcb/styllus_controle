import { _ as _export_sfc, X as createBlock, Y as openBlock, Z as withCtx, a0 as createBaseVNode, $ as createVNode, a2 as createTextVNode, a6 as QIcon, a7 as toDisplayString, ad as QInput, ae as withModifiers, a1 as QBtn, a3 as createElementBlock, a4 as Fragment, a5 as renderList, ac as createCommentVNode, aa as QCard, ab as QCardSection, af as normalizeClass, ag as QSeparator, ah as QCardActions, r as ref, o as onMounted, k as computed, b as nextTick, ai as Dialog, aj as Notify } from "./index-DTRxxbQ7.js";
import { Q as QBadge } from "./QBadge-BygkNXTq.js";
import { Q as QSelect } from "./QSelect-CxdRDuFh.js";
import { Q as QForm } from "./QForm-BbcVE1MZ.js";
import { Q as QExpansionItem } from "./QExpansionItem-DWmBuDUj.js";
import { Q as QList, b as QItem, c as QItemSection, a as QItemLabel } from "./QList-C--UWoUK.js";
import { Q as QPage } from "./QPage-pt9NM7Fr.js";
import { u as useProductStore } from "./product-store-C3IlpoxU.js";
import "./format-B8-XYLEH.js";
import "./index-BSBq6A-N.js";
const _sfc_main = {
  __name: "ProductsPage",
  setup(__props, { expose: __expose }) {
    __expose();
    const productStore = useProductStore();
    const search = ref("");
    const filter = ref("Todos");
    const newProduct = ref({ name: "", quantity: 0 });
    const productForm = ref(null);
    const nameInput = ref(null);
    onMounted(async () => {
      await productStore.loadProducts();
    });
    const filteredProducts = computed(() => {
      const searchTerm = search.value.toLowerCase();
      return productStore.products.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm);
        const matchesFilter = filter.value === "Todos" || filter.value === "Disponíveis" && product.quantity > 0 || filter.value === "Esgotados" && product.quantity === 0;
        return matchesSearch && matchesFilter;
      });
    });
    const outOfStockProducts = computed(
      () => productStore.products.filter((product) => product.quantity === 0)
    );
    function notify(type, message) {
      Notify.create({ type, message });
    }
    async function addProduct() {
      if (productForm.value.validate()) {
        await productStore.addProduct({ ...newProduct.value });
        newProduct.value = { name: "", quantity: 0 };
        productForm.value.resetValidation();
        await nextTick();
        if (nameInput.value?.focus) nameInput.value.focus();
        notify("positive", "Produto adicionado com sucesso!");
      }
    }
    function getProductById(productId) {
      return productStore.products.find((p) => p.id === productId);
    }
    async function deleteProduct(productId) {
      const product = getProductById(productId);
      if (!product) return notify("negative", "Produto não encontrado.");
      await productStore.deleteProduct(productId);
      notify("positive", "Produto removido com sucesso!");
    }
    function restock(productId) {
      const product = getProductById(productId);
      if (!product) return notify("negative", "Produto não encontrado.");
      Dialog.create({
        title: "Reabastecer Produto",
        message: `Informe a quantidade para reabastecer o produto "${product.name}":`,
        prompt: {
          model: "",
          type: "number",
          isValid: (val) => val > 0,
          label: "Quantidade",
          placeholder: "Digite a quantidade"
        },
        cancel: true,
        persistent: true
      }).onOk(async (quantity) => {
        const parsedQuantity = parseInt(quantity, 10);
        if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
          notify("negative", "Quantidade inválida.");
          return;
        }
        await productStore.restockProduct(productId, parsedQuantity);
        notify("positive", "Produto reabastecido!");
      }).onCancel(() => {
        notify("info", "Reabastecimento cancelado.");
      });
    }
    function confirmDelete(productId) {
      const product = getProductById(productId);
      if (!product) return notify("negative", "Produto não encontrado.");
      Dialog.create({
        title: "Confirmar Exclusão",
        message: `Tem certeza de que deseja excluir o produto "${product.name}"?`,
        cancel: true,
        persistent: true,
        icon: "warning",
        color: "red"
      }).onOk(() => deleteProduct(productId)).onCancel(() => notify("info", "A exclusão foi cancelada."));
    }
    const __returned__ = { productStore, search, filter, newProduct, productForm, nameInput, filteredProducts, outOfStockProducts, notify, addProduct, getProductById, deleteProduct, restock, confirmDelete, ref, computed, onMounted, nextTick, get useProductStore() {
      return useProductStore;
    }, get Notify() {
      return Notify;
    }, get Dialog() {
      return Dialog;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1 = { class: "products-content" };
const _hoisted_2 = { class: "row items-center q-mb-md q-mt-lg" };
const _hoisted_3 = { class: "col" };
const _hoisted_4 = { class: "custom-font-bold gradient-title animate-title text-h4 flex items-center" };
const _hoisted_5 = { class: "col-auto flex items-center" };
const _hoisted_6 = { class: "row q-col-gutter-md q-mb-md" };
const _hoisted_7 = { class: "col-12 col-md-8" };
const _hoisted_8 = { class: "col-12 col-md-4" };
const _hoisted_9 = { class: "row q-col-gutter-md" };
const _hoisted_10 = { class: "col-12 col-md-6" };
const _hoisted_11 = { class: "col-12 col-md-4" };
const _hoisted_12 = { class: "col-12 col-md-2 flex flex-center" };
const _hoisted_13 = { class: "row q-col-gutter-md" };
const _hoisted_14 = { class: "custom-font-bold text-h6" };
const _hoisted_15 = { class: "custom-font-light text-grey-7" };
const _hoisted_16 = {
  key: 0,
  class: "col-12 text-center q-mt-md"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QPage, null, {
    default: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("div", _hoisted_4, [
              createVNode(QIcon, {
                name: "inventory_2",
                size: "28px",
                class: "q-mr-sm"
              }),
              _cache[4] || (_cache[4] = createTextVNode(" Produtos "))
            ])
          ]),
          createBaseVNode("div", _hoisted_5, [
            createVNode(QBadge, {
              color: "green",
              class: "q-mr-sm badge-pill animate-badge"
            }, {
              default: withCtx(() => [
                createTextVNode(" Disponíveis: " + toDisplayString($setup.filteredProducts.length), 1)
              ]),
              _: 1
            }),
            createVNode(QBadge, {
              color: "red",
              class: "badge-pill animate-badge"
            }, {
              default: withCtx(() => [
                createTextVNode(" Esgotados: " + toDisplayString($setup.outOfStockProducts.length), 1)
              ]),
              _: 1
            })
          ])
        ]),
        createBaseVNode("div", _hoisted_6, [
          createBaseVNode("div", _hoisted_7, [
            createVNode(QInput, {
              modelValue: $setup.search,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.search = $event),
              label: "Buscar Produto",
              outlined: "",
              dense: "",
              class: "q-mb-none",
              placeholder: "Digite o nome do produto",
              clearable: "",
              prefix: "🔍",
              color: "primary",
              "input-style": { fontFamily: "Inter, Poppins, Roboto, sans-serif", fontWeight: 500 }
            }, null, 8, ["modelValue"])
          ]),
          createBaseVNode("div", _hoisted_8, [
            createVNode(QSelect, {
              modelValue: $setup.filter,
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.filter = $event),
              options: ["Todos", "Disponíveis", "Esgotados"],
              label: "Filtrar",
              outlined: "",
              dense: "",
              class: "q-mb-none",
              color: "primary",
              "input-style": { fontFamily: "Inter, Poppins, Roboto, sans-serif", fontWeight: 500 }
            }, null, 8, ["modelValue"])
          ])
        ]),
        createVNode(QExpansionItem, {
          label: "Adicionar Produto",
          "expand-separator": "",
          class: "add-expansion animate-fade-in",
          icon: "add_box",
          "header-class": "expansion-header"
        }, {
          default: withCtx(() => [
            createVNode(QForm, {
              onSubmit: withModifiers($setup.addProduct, ["prevent"]),
              ref: "productForm"
            }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_9, [
                  createBaseVNode("div", _hoisted_10, [
                    createVNode(QInput, {
                      ref: "nameInput",
                      modelValue: $setup.newProduct.name,
                      "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.newProduct.name = $event),
                      label: "Nome do Produto",
                      placeholder: "Digite o nome do produto",
                      outlined: "",
                      dense: "",
                      rules: [(val) => !!val || "O nome do produto é obrigatório"],
                      color: "primary",
                      "input-style": { fontFamily: "Inter, Poppins, Roboto, sans-serif", fontWeight: 500 }
                    }, null, 8, ["modelValue", "rules"])
                  ]),
                  createBaseVNode("div", _hoisted_11, [
                    createVNode(QInput, {
                      modelValue: $setup.newProduct.quantity,
                      "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.newProduct.quantity = $event),
                      modelModifiers: { number: true },
                      label: "Quantidade",
                      placeholder: "Digite a quantidade",
                      type: "number",
                      outlined: "",
                      dense: "",
                      rules: [(val) => val > 0 || "A quantidade deve ser maior que zero"],
                      color: "primary",
                      "input-style": { fontFamily: "Inter, Poppins, Roboto, sans-serif", fontWeight: 500 }
                    }, null, 8, ["modelValue", "rules"])
                  ]),
                  createBaseVNode("div", _hoisted_12, [
                    createVNode(QBtn, {
                      label: "+ Adicionar",
                      type: "submit",
                      color: "primary",
                      class: "full-width",
                      icon: "add_box",
                      unelevated: "",
                      "no-caps": ""
                    })
                  ])
                ])
              ]),
              _: 1
            }, 512)
          ]),
          _: 1
        }),
        createVNode(QExpansionItem, {
          label: "Produtos Esgotados",
          "expand-separator": "",
          class: "out-expansion animate-fade-in",
          icon: "warning",
          "header-class": "expansion-header"
        }, {
          default: withCtx(() => [
            createVNode(QList, null, {
              default: withCtx(() => [
                (openBlock(true), createElementBlock(Fragment, null, renderList($setup.outOfStockProducts, (product) => {
                  return openBlock(), createBlock(QItem, {
                    key: product.id
                  }, {
                    default: withCtx(() => [
                      createVNode(QItemSection, { avatar: "" }, {
                        default: withCtx(() => [
                          createVNode(QIcon, {
                            name: "warning",
                            color: "red"
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(QItemSection, null, {
                        default: withCtx(() => [
                          createVNode(QItemLabel, { class: "custom-font-bold" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(product.name), 1)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1024);
                }), 128))
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        createBaseVNode("div", _hoisted_13, [
          (openBlock(true), createElementBlock(Fragment, null, renderList($setup.filteredProducts, (product) => {
            return openBlock(), createElementBlock("div", {
              key: product.id,
              class: "col-12 col-sm-6 col-md-4 col-lg-3"
            }, [
              createVNode(QCard, { class: "product-card animate-fade-in" }, {
                default: withCtx(() => [
                  createVNode(QCardSection, { class: "row items-center" }, {
                    default: withCtx(() => [
                      createVNode(QIcon, {
                        name: "inventory_2",
                        color: "primary",
                        size: "32px",
                        class: "q-mr-sm"
                      }),
                      createBaseVNode("div", null, [
                        createBaseVNode("div", _hoisted_14, toDisplayString(product.name), 1),
                        createBaseVNode("div", _hoisted_15, [
                          _cache[5] || (_cache[5] = createTextVNode(" Quantidade: ")),
                          createBaseVNode("span", {
                            class: normalizeClass(product.quantity === 0 ? "text-red" : "text-green")
                          }, toDisplayString(product.quantity), 3)
                        ])
                      ])
                    ]),
                    _: 2
                  }, 1024),
                  createVNode(QSeparator),
                  createVNode(QCardActions, {
                    align: "right",
                    class: "action-group"
                  }, {
                    default: withCtx(() => [
                      createVNode(QBtn, {
                        icon: "add",
                        label: "Adicionar Estoque",
                        color: "green",
                        flat: "",
                        onClick: ($event) => $setup.restock(product.id),
                        class: "q-mr-xs",
                        "no-caps": ""
                      }, null, 8, ["onClick"]),
                      createVNode(QBtn, {
                        icon: "delete",
                        label: "Remover",
                        color: "red",
                        flat: "",
                        onClick: ($event) => $setup.confirmDelete(product.id),
                        "no-caps": ""
                      }, null, 8, ["onClick"])
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1024)
            ]);
          }), 128)),
          $setup.filteredProducts.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_16, [
            createVNode(QIcon, {
              name: "info",
              size: "lg",
              color: "grey-6"
            }),
            _cache[6] || (_cache[6] = createBaseVNode("p", { class: "custom-font-light" }, "Nenhum produto encontrado.", -1))
          ])) : createCommentVNode("", true)
        ])
      ])
    ]),
    _: 1
  });
}
const ProductsPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d9d787a2"], ["__file", "ProductsPage.vue"]]);
export {
  ProductsPage as default
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZHVjdHNQYWdlLURURVFFeURMLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGFnZXMvUHJvZHVjdHNQYWdlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gIDxxLXBhZ2U+XG4gICAgPGRpdiBjbGFzcz1cInByb2R1Y3RzLWNvbnRlbnRcIj5cbiAgICAgIDwhLS0gVMOtdHVsbyBlIGJhZGdlcyAtLT5cbiAgICAgIDxkaXYgY2xhc3M9XCJyb3cgaXRlbXMtY2VudGVyIHEtbWItbWQgcS1tdC1sZ1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImN1c3RvbS1mb250LWJvbGQgZ3JhZGllbnQtdGl0bGUgYW5pbWF0ZS10aXRsZSB0ZXh0LWg0IGZsZXggaXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAgICA8cS1pY29uIG5hbWU9XCJpbnZlbnRvcnlfMlwiIHNpemU9XCIyOHB4XCIgY2xhc3M9XCJxLW1yLXNtXCIgLz4gUHJvZHV0b3NcbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtYXV0byBmbGV4IGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgIDxxLWJhZGdlIGNvbG9yPVwiZ3JlZW5cIiBjbGFzcz1cInEtbXItc20gYmFkZ2UtcGlsbCBhbmltYXRlLWJhZGdlXCI+XG4gICAgICAgICAgICBEaXNwb27DrXZlaXM6IHt7IGZpbHRlcmVkUHJvZHVjdHMubGVuZ3RoIH19XG4gICAgICAgICAgPC9xLWJhZGdlPlxuICAgICAgICAgIDxxLWJhZGdlIGNvbG9yPVwicmVkXCIgY2xhc3M9XCJiYWRnZS1waWxsIGFuaW1hdGUtYmFkZ2VcIj5cbiAgICAgICAgICAgIEVzZ290YWRvczoge3sgb3V0T2ZTdG9ja1Byb2R1Y3RzLmxlbmd0aCB9fVxuICAgICAgICAgIDwvcS1iYWRnZT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPCEtLSBCdXNjYSBlIEZpbHRybyAtLT5cbiAgICAgIDxkaXYgY2xhc3M9XCJyb3cgcS1jb2wtZ3V0dGVyLW1kIHEtbWItbWRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC0xMiBjb2wtbWQtOFwiPlxuICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICB2LW1vZGVsPVwic2VhcmNoXCJcbiAgICAgICAgICAgIGxhYmVsPVwiQnVzY2FyIFByb2R1dG9cIlxuICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICBjbGFzcz1cInEtbWItbm9uZVwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkRpZ2l0ZSBvIG5vbWUgZG8gcHJvZHV0b1wiXG4gICAgICAgICAgICBjbGVhcmFibGVcbiAgICAgICAgICAgIHByZWZpeD1cIvCflI1cIlxuICAgICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgIDppbnB1dC1zdHlsZT1cInsgZm9udEZhbWlseTogJ0ludGVyLCBQb3BwaW5zLCBSb2JvdG8sIHNhbnMtc2VyaWYnLCBmb250V2VpZ2h0OiA1MDAgfVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtMTIgY29sLW1kLTRcIj5cbiAgICAgICAgICA8cS1zZWxlY3RcbiAgICAgICAgICAgIHYtbW9kZWw9XCJmaWx0ZXJcIlxuICAgICAgICAgICAgOm9wdGlvbnM9XCJbJ1RvZG9zJywgJ0Rpc3BvbsOtdmVpcycsICdFc2dvdGFkb3MnXVwiXG4gICAgICAgICAgICBsYWJlbD1cIkZpbHRyYXJcIlxuICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICBjbGFzcz1cInEtbWItbm9uZVwiXG4gICAgICAgICAgICBjb2xvcj1cInByaW1hcnlcIlxuICAgICAgICAgICAgOmlucHV0LXN0eWxlPVwieyBmb250RmFtaWx5OiAnSW50ZXIsIFBvcHBpbnMsIFJvYm90bywgc2Fucy1zZXJpZicsIGZvbnRXZWlnaHQ6IDUwMCB9XCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8IS0tIEFkaWNpb25hciBQcm9kdXRvIC0tPlxuICAgICAgPHEtZXhwYW5zaW9uLWl0ZW1cbiAgICAgICAgbGFiZWw9XCJBZGljaW9uYXIgUHJvZHV0b1wiXG4gICAgICAgIGV4cGFuZC1zZXBhcmF0b3JcbiAgICAgICAgY2xhc3M9XCJhZGQtZXhwYW5zaW9uIGFuaW1hdGUtZmFkZS1pblwiXG4gICAgICAgIGljb249XCJhZGRfYm94XCJcbiAgICAgICAgaGVhZGVyLWNsYXNzPVwiZXhwYW5zaW9uLWhlYWRlclwiXG4gICAgICA+XG4gICAgICAgIDxxLWZvcm0gQHN1Ym1pdC5wcmV2ZW50PVwiYWRkUHJvZHVjdFwiIHJlZj1cInByb2R1Y3RGb3JtXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBxLWNvbC1ndXR0ZXItbWRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtMTIgY29sLW1kLTZcIj5cbiAgICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgICByZWY9XCJuYW1lSW5wdXRcIlxuICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJuZXdQcm9kdWN0Lm5hbWVcIlxuICAgICAgICAgICAgICAgIGxhYmVsPVwiTm9tZSBkbyBQcm9kdXRvXCJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkRpZ2l0ZSBvIG5vbWUgZG8gcHJvZHV0b1wiXG4gICAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgIDpydWxlcz1cIlsodmFsKSA9PiAhIXZhbCB8fCAnTyBub21lIGRvIHByb2R1dG8gw6kgb2JyaWdhdMOzcmlvJ11cIlxuICAgICAgICAgICAgICAgIGNvbG9yPVwicHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgOmlucHV0LXN0eWxlPVwieyBmb250RmFtaWx5OiAnSW50ZXIsIFBvcHBpbnMsIFJvYm90bywgc2Fucy1zZXJpZicsIGZvbnRXZWlnaHQ6IDUwMCB9XCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC0xMiBjb2wtbWQtNFwiPlxuICAgICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICAgIHYtbW9kZWwubnVtYmVyPVwibmV3UHJvZHVjdC5xdWFudGl0eVwiXG4gICAgICAgICAgICAgICAgbGFiZWw9XCJRdWFudGlkYWRlXCJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkRpZ2l0ZSBhIHF1YW50aWRhZGVcIlxuICAgICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgICA6cnVsZXM9XCJbKHZhbCkgPT4gdmFsID4gMCB8fCAnQSBxdWFudGlkYWRlIGRldmUgc2VyIG1haW9yIHF1ZSB6ZXJvJ11cIlxuICAgICAgICAgICAgICAgIGNvbG9yPVwicHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgOmlucHV0LXN0eWxlPVwieyBmb250RmFtaWx5OiAnSW50ZXIsIFBvcHBpbnMsIFJvYm90bywgc2Fucy1zZXJpZicsIGZvbnRXZWlnaHQ6IDUwMCB9XCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC0xMiBjb2wtbWQtMiBmbGV4IGZsZXgtY2VudGVyXCI+XG4gICAgICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgICAgIGxhYmVsPVwiKyBBZGljaW9uYXJcIlxuICAgICAgICAgICAgICAgIHR5cGU9XCJzdWJtaXRcIlxuICAgICAgICAgICAgICAgIGNvbG9yPVwicHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJmdWxsLXdpZHRoXCJcbiAgICAgICAgICAgICAgICBpY29uPVwiYWRkX2JveFwiXG4gICAgICAgICAgICAgICAgdW5lbGV2YXRlZFxuICAgICAgICAgICAgICAgIG5vLWNhcHNcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3EtZm9ybT5cbiAgICAgIDwvcS1leHBhbnNpb24taXRlbT5cblxuICAgICAgPCEtLSBQcm9kdXRvcyBFc2dvdGFkb3MgLS0+XG4gICAgICA8cS1leHBhbnNpb24taXRlbVxuICAgICAgICBsYWJlbD1cIlByb2R1dG9zIEVzZ290YWRvc1wiXG4gICAgICAgIGV4cGFuZC1zZXBhcmF0b3JcbiAgICAgICAgY2xhc3M9XCJvdXQtZXhwYW5zaW9uIGFuaW1hdGUtZmFkZS1pblwiXG4gICAgICAgIGljb249XCJ3YXJuaW5nXCJcbiAgICAgICAgaGVhZGVyLWNsYXNzPVwiZXhwYW5zaW9uLWhlYWRlclwiXG4gICAgICA+XG4gICAgICAgIDxxLWxpc3Q+XG4gICAgICAgICAgPHEtaXRlbSB2LWZvcj1cInByb2R1Y3QgaW4gb3V0T2ZTdG9ja1Byb2R1Y3RzXCIgOmtleT1cInByb2R1Y3QuaWRcIj5cbiAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBhdmF0YXI+XG4gICAgICAgICAgICAgIDxxLWljb24gbmFtZT1cIndhcm5pbmdcIiBjb2xvcj1cInJlZFwiIC8+XG4gICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsIGNsYXNzPVwiY3VzdG9tLWZvbnQtYm9sZFwiPnt7IHByb2R1Y3QubmFtZSB9fTwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICA8L3EtaXRlbT5cbiAgICAgICAgPC9xLWxpc3Q+XG4gICAgICA8L3EtZXhwYW5zaW9uLWl0ZW0+XG5cbiAgICAgIDwhLS0gTGlzdGEgZGUgUHJvZHV0b3MgLS0+XG4gICAgICA8ZGl2IGNsYXNzPVwicm93IHEtY29sLWd1dHRlci1tZFwiPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgdi1mb3I9XCJwcm9kdWN0IGluIGZpbHRlcmVkUHJvZHVjdHNcIlxuICAgICAgICAgIDprZXk9XCJwcm9kdWN0LmlkXCJcbiAgICAgICAgICBjbGFzcz1cImNvbC0xMiBjb2wtc20tNiBjb2wtbWQtNCBjb2wtbGctM1wiXG4gICAgICAgID5cbiAgICAgICAgICA8cS1jYXJkIGNsYXNzPVwicHJvZHVjdC1jYXJkIGFuaW1hdGUtZmFkZS1pblwiPlxuICAgICAgICAgICAgPHEtY2FyZC1zZWN0aW9uIGNsYXNzPVwicm93IGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgICAgICA8cS1pY29uIG5hbWU9XCJpbnZlbnRvcnlfMlwiIGNvbG9yPVwicHJpbWFyeVwiIHNpemU9XCIzMnB4XCIgY2xhc3M9XCJxLW1yLXNtXCIgLz5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY3VzdG9tLWZvbnQtYm9sZCB0ZXh0LWg2XCI+e3sgcHJvZHVjdC5uYW1lIH19PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImN1c3RvbS1mb250LWxpZ2h0IHRleHQtZ3JleS03XCI+XG4gICAgICAgICAgICAgICAgICBRdWFudGlkYWRlOlxuICAgICAgICAgICAgICAgICAgPHNwYW4gOmNsYXNzPVwicHJvZHVjdC5xdWFudGl0eSA9PT0gMCA/ICd0ZXh0LXJlZCcgOiAndGV4dC1ncmVlbidcIj5cbiAgICAgICAgICAgICAgICAgICAge3sgcHJvZHVjdC5xdWFudGl0eSB9fVxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICAgICAgICA8cS1zZXBhcmF0b3IgLz5cbiAgICAgICAgICAgIDxxLWNhcmQtYWN0aW9ucyBhbGlnbj1cInJpZ2h0XCIgY2xhc3M9XCJhY3Rpb24tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgPHEtYnRuXG4gICAgICAgICAgICAgICAgaWNvbj1cImFkZFwiXG4gICAgICAgICAgICAgICAgbGFiZWw9XCJBZGljaW9uYXIgRXN0b3F1ZVwiXG4gICAgICAgICAgICAgICAgY29sb3I9XCJncmVlblwiXG4gICAgICAgICAgICAgICAgZmxhdFxuICAgICAgICAgICAgICAgIEBjbGljaz1cInJlc3RvY2socHJvZHVjdC5pZClcIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwicS1tci14c1wiXG4gICAgICAgICAgICAgICAgbm8tY2Fwc1xuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8cS1idG5cbiAgICAgICAgICAgICAgICBpY29uPVwiZGVsZXRlXCJcbiAgICAgICAgICAgICAgICBsYWJlbD1cIlJlbW92ZXJcIlxuICAgICAgICAgICAgICAgIGNvbG9yPVwicmVkXCJcbiAgICAgICAgICAgICAgICBmbGF0XG4gICAgICAgICAgICAgICAgQGNsaWNrPVwiY29uZmlybURlbGV0ZShwcm9kdWN0LmlkKVwiXG4gICAgICAgICAgICAgICAgbm8tY2Fwc1xuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9xLWNhcmQtYWN0aW9ucz5cbiAgICAgICAgICA8L3EtY2FyZD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgdi1pZj1cImZpbHRlcmVkUHJvZHVjdHMubGVuZ3RoID09PSAwXCIgY2xhc3M9XCJjb2wtMTIgdGV4dC1jZW50ZXIgcS1tdC1tZFwiPlxuICAgICAgICAgIDxxLWljb24gbmFtZT1cImluZm9cIiBzaXplPVwibGdcIiBjb2xvcj1cImdyZXktNlwiIC8+XG4gICAgICAgICAgPHAgY2xhc3M9XCJjdXN0b20tZm9udC1saWdodFwiPk5lbmh1bSBwcm9kdXRvIGVuY29udHJhZG8uPC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L3EtcGFnZT5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyByZWYsIGNvbXB1dGVkLCBvbk1vdW50ZWQsIG5leHRUaWNrIH0gZnJvbSAndnVlJ1xuaW1wb3J0IHsgdXNlUHJvZHVjdFN0b3JlIH0gZnJvbSAnc3JjL3N0b3Jlcy9wcm9kdWN0LXN0b3JlJ1xuaW1wb3J0IHsgTm90aWZ5LCBEaWFsb2cgfSBmcm9tICdxdWFzYXInXG5cbmNvbnN0IHByb2R1Y3RTdG9yZSA9IHVzZVByb2R1Y3RTdG9yZSgpXG5jb25zdCBzZWFyY2ggPSByZWYoJycpXG5jb25zdCBmaWx0ZXIgPSByZWYoJ1RvZG9zJylcbmNvbnN0IG5ld1Byb2R1Y3QgPSByZWYoeyBuYW1lOiAnJywgcXVhbnRpdHk6IDAgfSlcbmNvbnN0IHByb2R1Y3RGb3JtID0gcmVmKG51bGwpXG5jb25zdCBuYW1lSW5wdXQgPSByZWYobnVsbClcblxub25Nb3VudGVkKGFzeW5jICgpID0+IHtcbiAgYXdhaXQgcHJvZHVjdFN0b3JlLmxvYWRQcm9kdWN0cygpXG59KVxuXG5jb25zdCBmaWx0ZXJlZFByb2R1Y3RzID0gY29tcHV0ZWQoKCkgPT4ge1xuICBjb25zdCBzZWFyY2hUZXJtID0gc2VhcmNoLnZhbHVlLnRvTG93ZXJDYXNlKClcbiAgcmV0dXJuIHByb2R1Y3RTdG9yZS5wcm9kdWN0cy5maWx0ZXIoKHByb2R1Y3QpID0+IHtcbiAgICBjb25zdCBtYXRjaGVzU2VhcmNoID0gcHJvZHVjdC5uYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoVGVybSlcbiAgICBjb25zdCBtYXRjaGVzRmlsdGVyID1cbiAgICAgIGZpbHRlci52YWx1ZSA9PT0gJ1RvZG9zJyB8fFxuICAgICAgKGZpbHRlci52YWx1ZSA9PT0gJ0Rpc3BvbsOtdmVpcycgJiYgcHJvZHVjdC5xdWFudGl0eSA+IDApIHx8XG4gICAgICAoZmlsdGVyLnZhbHVlID09PSAnRXNnb3RhZG9zJyAmJiBwcm9kdWN0LnF1YW50aXR5ID09PSAwKVxuICAgIHJldHVybiBtYXRjaGVzU2VhcmNoICYmIG1hdGNoZXNGaWx0ZXJcbiAgfSlcbn0pXG5cbmNvbnN0IG91dE9mU3RvY2tQcm9kdWN0cyA9IGNvbXB1dGVkKCgpID0+XG4gIHByb2R1Y3RTdG9yZS5wcm9kdWN0cy5maWx0ZXIoKHByb2R1Y3QpID0+IHByb2R1Y3QucXVhbnRpdHkgPT09IDApLFxuKVxuXG5mdW5jdGlvbiBub3RpZnkodHlwZSwgbWVzc2FnZSkge1xuICBOb3RpZnkuY3JlYXRlKHsgdHlwZSwgbWVzc2FnZSB9KVxufVxuXG5hc3luYyBmdW5jdGlvbiBhZGRQcm9kdWN0KCkge1xuICBpZiAocHJvZHVjdEZvcm0udmFsdWUudmFsaWRhdGUoKSkge1xuICAgIGF3YWl0IHByb2R1Y3RTdG9yZS5hZGRQcm9kdWN0KHsgLi4ubmV3UHJvZHVjdC52YWx1ZSB9KVxuICAgIG5ld1Byb2R1Y3QudmFsdWUgPSB7IG5hbWU6ICcnLCBxdWFudGl0eTogMCB9XG4gICAgcHJvZHVjdEZvcm0udmFsdWUucmVzZXRWYWxpZGF0aW9uKClcbiAgICBhd2FpdCBuZXh0VGljaygpXG4gICAgaWYgKG5hbWVJbnB1dC52YWx1ZT8uZm9jdXMpIG5hbWVJbnB1dC52YWx1ZS5mb2N1cygpXG4gICAgbm90aWZ5KCdwb3NpdGl2ZScsICdQcm9kdXRvIGFkaWNpb25hZG8gY29tIHN1Y2Vzc28hJylcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRQcm9kdWN0QnlJZChwcm9kdWN0SWQpIHtcbiAgcmV0dXJuIHByb2R1Y3RTdG9yZS5wcm9kdWN0cy5maW5kKChwKSA9PiBwLmlkID09PSBwcm9kdWN0SWQpXG59XG5cbmFzeW5jIGZ1bmN0aW9uIGRlbGV0ZVByb2R1Y3QocHJvZHVjdElkKSB7XG4gIGNvbnN0IHByb2R1Y3QgPSBnZXRQcm9kdWN0QnlJZChwcm9kdWN0SWQpXG4gIGlmICghcHJvZHVjdCkgcmV0dXJuIG5vdGlmeSgnbmVnYXRpdmUnLCAnUHJvZHV0byBuw6NvIGVuY29udHJhZG8uJylcbiAgYXdhaXQgcHJvZHVjdFN0b3JlLmRlbGV0ZVByb2R1Y3QocHJvZHVjdElkKVxuICBub3RpZnkoJ3Bvc2l0aXZlJywgJ1Byb2R1dG8gcmVtb3ZpZG8gY29tIHN1Y2Vzc28hJylcbn1cblxuZnVuY3Rpb24gcmVzdG9jayhwcm9kdWN0SWQpIHtcbiAgY29uc3QgcHJvZHVjdCA9IGdldFByb2R1Y3RCeUlkKHByb2R1Y3RJZClcbiAgaWYgKCFwcm9kdWN0KSByZXR1cm4gbm90aWZ5KCduZWdhdGl2ZScsICdQcm9kdXRvIG7Do28gZW5jb250cmFkby4nKVxuXG4gIERpYWxvZy5jcmVhdGUoe1xuICAgIHRpdGxlOiAnUmVhYmFzdGVjZXIgUHJvZHV0bycsXG4gICAgbWVzc2FnZTogYEluZm9ybWUgYSBxdWFudGlkYWRlIHBhcmEgcmVhYmFzdGVjZXIgbyBwcm9kdXRvIFwiJHtwcm9kdWN0Lm5hbWV9XCI6YCxcbiAgICBwcm9tcHQ6IHtcbiAgICAgIG1vZGVsOiAnJyxcbiAgICAgIHR5cGU6ICdudW1iZXInLFxuICAgICAgaXNWYWxpZDogKHZhbCkgPT4gdmFsID4gMCxcbiAgICAgIGxhYmVsOiAnUXVhbnRpZGFkZScsXG4gICAgICBwbGFjZWhvbGRlcjogJ0RpZ2l0ZSBhIHF1YW50aWRhZGUnLFxuICAgIH0sXG4gICAgY2FuY2VsOiB0cnVlLFxuICAgIHBlcnNpc3RlbnQ6IHRydWUsXG4gIH0pXG4gICAgLm9uT2soYXN5bmMgKHF1YW50aXR5KSA9PiB7XG4gICAgICBjb25zdCBwYXJzZWRRdWFudGl0eSA9IHBhcnNlSW50KHF1YW50aXR5LCAxMClcbiAgICAgIGlmIChpc05hTihwYXJzZWRRdWFudGl0eSkgfHwgcGFyc2VkUXVhbnRpdHkgPD0gMCkge1xuICAgICAgICBub3RpZnkoJ25lZ2F0aXZlJywgJ1F1YW50aWRhZGUgaW52w6FsaWRhLicpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgYXdhaXQgcHJvZHVjdFN0b3JlLnJlc3RvY2tQcm9kdWN0KHByb2R1Y3RJZCwgcGFyc2VkUXVhbnRpdHkpXG4gICAgICBub3RpZnkoJ3Bvc2l0aXZlJywgJ1Byb2R1dG8gcmVhYmFzdGVjaWRvIScpXG4gICAgfSlcbiAgICAub25DYW5jZWwoKCkgPT4ge1xuICAgICAgbm90aWZ5KCdpbmZvJywgJ1JlYWJhc3RlY2ltZW50byBjYW5jZWxhZG8uJylcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBjb25maXJtRGVsZXRlKHByb2R1Y3RJZCkge1xuICBjb25zdCBwcm9kdWN0ID0gZ2V0UHJvZHVjdEJ5SWQocHJvZHVjdElkKVxuICBpZiAoIXByb2R1Y3QpIHJldHVybiBub3RpZnkoJ25lZ2F0aXZlJywgJ1Byb2R1dG8gbsOjbyBlbmNvbnRyYWRvLicpXG4gIERpYWxvZy5jcmVhdGUoe1xuICAgIHRpdGxlOiAnQ29uZmlybWFyIEV4Y2x1c8OjbycsXG4gICAgbWVzc2FnZTogYFRlbSBjZXJ0ZXphIGRlIHF1ZSBkZXNlamEgZXhjbHVpciBvIHByb2R1dG8gXCIke3Byb2R1Y3QubmFtZX1cIj9gLFxuICAgIGNhbmNlbDogdHJ1ZSxcbiAgICBwZXJzaXN0ZW50OiB0cnVlLFxuICAgIGljb246ICd3YXJuaW5nJyxcbiAgICBjb2xvcjogJ3JlZCcsXG4gIH0pXG4gICAgLm9uT2soKCkgPT4gZGVsZXRlUHJvZHVjdChwcm9kdWN0SWQpKVxuICAgIC5vbkNhbmNlbCgoKSA9PiBub3RpZnkoJ2luZm8nLCAnQSBleGNsdXPDo28gZm9pIGNhbmNlbGFkYS4nKSlcbn1cbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuLnByb2R1Y3RzLWJnIHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzIzMjQzYSA2MCUsICMxODE5MjYgMTAwJSk7XG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xufVxuXG4ucHJvZHVjdHMtY29udGVudCB7XG4gIHBhZGRpbmc6IDAgMC41dncgMC41dncgMC41dnc7XG4gIG1heC13aWR0aDogMTAwdnc7XG59XG5cbi5ncmFkaWVudC10aXRsZSB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg5MGRlZywgIzRjYWY1MCwgIzIxOTZmMywgI2ZmOTgwMCk7XG4gIC13ZWJraXQtYmFja2dyb3VuZC1jbGlwOiB0ZXh0O1xuICBiYWNrZ3JvdW5kLWNsaXA6IHRleHQ7XG4gIC13ZWJraXQtdGV4dC1maWxsLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgYW5pbWF0aW9uOiBncmFkaWVudE1vdmUgM3MgaW5maW5pdGUgbGluZWFyO1xuICBiYWNrZ3JvdW5kLXNpemU6IDIwMCUgMjAwJTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgbGV0dGVyLXNwYWNpbmc6IDFweDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuQGtleWZyYW1lcyBncmFkaWVudE1vdmUge1xuICAwJSB7XG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCUgNTAlO1xuICB9XG4gIDEwMCUge1xuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDEwMCUgNTAlO1xuICB9XG59XG5cbi5iYWRnZS1waWxsIHtcbiAgYm9yZGVyLXJhZGl1czogOTk5cHg7XG4gIGZvbnQtc2l6ZTogMTVweDtcbiAgcGFkZGluZzogMCAxMnB4O1xuICBmb250LXdlaWdodDogNTAwO1xuICBsZXR0ZXItc3BhY2luZzogMC41cHg7XG4gIGJveC1zaGFkb3c6IDAgMnB4IDhweCAwIHJnYmEoNzYsIDE3NSwgODAsIDAuMSk7XG4gIGFuaW1hdGlvbjogcG9wSW4gMC42cztcbiAgYmFja2dyb3VuZDogcmdiYSgzMCwgNDAsIDYwLCAwLjg1KTtcbiAgY29sb3I6ICNmZmY7XG59XG5cbkBrZXlmcmFtZXMgcG9wSW4ge1xuICAwJSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjcpO1xuICAgIG9wYWNpdHk6IDA7XG4gIH1cbiAgNzAlIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMSk7XG4gICAgb3BhY2l0eTogMTtcbiAgfVxuICAxMDAlIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgIG9wYWNpdHk6IDE7XG4gIH1cbn1cblxuLmN1c3RvbS1mb250IHtcbiAgZm9udC1mYW1pbHk6ICdQb3BwaW5zJywgJ0ludGVyJywgJ1JvYm90bycsIHNhbnMtc2VyaWY7XG59XG5cbi5jdXN0b20tZm9udC1ib2xkIHtcbiAgZm9udC1mYW1pbHk6ICdQb3BwaW5zJywgJ0ludGVyJywgJ1JvYm90bycsIHNhbnMtc2VyaWY7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG5cbi5jdXN0b20tZm9udC1saWdodCB7XG4gIGZvbnQtZmFtaWx5OiAnUG9wcGlucycsICdJbnRlcicsICdSb2JvdG8nLCBzYW5zLXNlcmlmO1xuICBmb250LXdlaWdodDogMzAwO1xufVxuXG4uYWRkLWV4cGFuc2lvbiB7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gIGJhY2tncm91bmQ6ICMyMzI0M2E7XG4gIGJveC1zaGFkb3c6IDAgMnB4IDEycHggMCByZ2JhKDMzLCAxNTAsIDI0MywgMC4xKTtcbiAgbWFyZ2luLWJvdHRvbTogMThweDtcbiAgY29sb3I6ICNlM2VhZjc7XG59XG5cbi5vdXQtZXhwYW5zaW9uIHtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgYmFja2dyb3VuZDogIzJkMjIzMztcbiAgYm94LXNoYWRvdzogMCAycHggMTJweCAwIHJnYmEoMjU1LCAwLCAwLCAwLjEpO1xuICBtYXJnaW4tYm90dG9tOiAxOHB4O1xuICBjb2xvcjogI2UzZWFmNztcbn1cblxuLmV4cGFuc2lvbi1oZWFkZXIge1xuICBmb250LWZhbWlseTogJ1BvcHBpbnMnLCAnSW50ZXInLCAnUm9ib3RvJywgc2Fucy1zZXJpZjtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgZm9udC1zaXplOiAxLjFyZW07XG4gIGxldHRlci1zcGFjaW5nOiAwLjVweDtcbiAgY29sb3I6ICNlM2VhZjc7XG59XG5cbi5wcm9kdWN0LWNhcmQge1xuICBib3JkZXItcmFkaXVzOiAxOHB4O1xuICBiYWNrZ3JvdW5kOiAjMjMyNDNhO1xuICBib3gtc2hhZG93OiAwIDRweCAyNHB4IDAgcmdiYSgwLCAwLCAwLCAwLjE4KTtcbiAgdHJhbnNpdGlvbjpcbiAgICB0cmFuc2Zvcm0gMC4ycyxcbiAgICBib3gtc2hhZG93IDAuMnM7XG4gIG1pbi1oZWlnaHQ6IDE0MHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGJvcmRlcjogMS41cHggc29saWQgIzIzMjQzYTtcbiAgY29sb3I6ICNlM2VhZjc7XG59XG4ucHJvZHVjdC1jYXJkOmhvdmVyIHtcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjA0KSB0cmFuc2xhdGVZKC0ycHgpO1xuICBib3gtc2hhZG93OiAwIDhweCAzMnB4IDAgcmdiYSgzMywgMTUwLCAyNDMsIDAuMTgpO1xuICBiYWNrZ3JvdW5kOiAjMjgzMDRhO1xuICBib3JkZXItY29sb3I6ICMyMTk2ZjM7XG59XG5cbi5hY3Rpb24tZ3JvdXAge1xuICBnYXA6IDhweDtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbn1cblxuLmFuaW1hdGUtdGl0bGUge1xuICBhbmltYXRpb246IGZhZGVJbiAwLjVzIGVhc2Utb3V0O1xufVxuXG5Aa2V5ZnJhbWVzIGZhZGVJbiB7XG4gIGZyb20ge1xuICAgIG9wYWNpdHk6IDA7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xMHB4KTtcbiAgfVxuICB0byB7XG4gICAgb3BhY2l0eTogMTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XG4gIH1cbn1cblxuLmFuaW1hdGUtZmFkZS1pbiB7XG4gIGFuaW1hdGlvbjogZmFkZUluIDAuNXMgZWFzZS1vdXQ7XG59XG48L3N0eWxlPlxuIl0sIm5hbWVzIjpbIl9jcmVhdGVCbG9jayIsIl93aXRoQ3R4IiwiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIl9jcmVhdGVWTm9kZSIsIl9jcmVhdGVUZXh0Vk5vZGUiLCJfdG9EaXNwbGF5U3RyaW5nIiwiX3dpdGhNb2RpZmllcnMiLCJfb3BlbkJsb2NrIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9GcmFnbWVudCIsIl9yZW5kZXJMaXN0IiwiX25vcm1hbGl6ZUNsYXNzIiwiX2NyZWF0ZUNvbW1lbnRWTm9kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFpTEEsVUFBTSxlQUFlLGdCQUFlO0FBQ3BDLFVBQU0sU0FBUyxJQUFJLEVBQUU7QUFDckIsVUFBTSxTQUFTLElBQUksT0FBTztBQUMxQixVQUFNLGFBQWEsSUFBSSxFQUFFLE1BQU0sSUFBSSxVQUFVLEVBQUcsQ0FBQTtBQUNoRCxVQUFNLGNBQWMsSUFBSSxJQUFJO0FBQzVCLFVBQU0sWUFBWSxJQUFJLElBQUk7QUFFMUIsY0FBVSxZQUFZO0FBQ3BCLFlBQU0sYUFBYSxhQUFZO0FBQUEsSUFDakMsQ0FBQztBQUVELFVBQU0sbUJBQW1CLFNBQVMsTUFBTTtBQUN0QyxZQUFNLGFBQWEsT0FBTyxNQUFNLFlBQVc7QUFDM0MsYUFBTyxhQUFhLFNBQVMsT0FBTyxDQUFDLFlBQVk7QUFDL0MsY0FBTSxnQkFBZ0IsUUFBUSxLQUFLLFlBQWEsRUFBQyxTQUFTLFVBQVU7QUFDcEUsY0FBTSxnQkFDSixPQUFPLFVBQVUsV0FDaEIsT0FBTyxVQUFVLGlCQUFpQixRQUFRLFdBQVcsS0FDckQsT0FBTyxVQUFVLGVBQWUsUUFBUSxhQUFhO0FBQ3hELGVBQU8saUJBQWlCO0FBQUEsTUFDekIsQ0FBQTtBQUFBLElBQ0gsQ0FBQztBQUVELFVBQU0scUJBQXFCO0FBQUEsTUFBUyxNQUNsQyxhQUFhLFNBQVMsT0FBTyxDQUFDLFlBQVksUUFBUSxhQUFhLENBQUM7QUFBQSxJQUNsRTtBQUVBLGFBQVMsT0FBTyxNQUFNLFNBQVM7QUFDN0IsYUFBTyxPQUFPLEVBQUUsTUFBTSxRQUFTLENBQUE7QUFBQSxJQUNqQztBQUVBLG1CQUFlLGFBQWE7QUFDMUIsVUFBSSxZQUFZLE1BQU0sWUFBWTtBQUNoQyxjQUFNLGFBQWEsV0FBVyxFQUFFLEdBQUcsV0FBVyxNQUFP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
