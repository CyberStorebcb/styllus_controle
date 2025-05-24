import { Q as QList, b as QItem, c as QItemSection, a as QItemLabel } from "./QList-C--UWoUK.js";
import { _ as _export_sfc, X as createBlock, Y as openBlock, Z as withCtx, a0 as createBaseVNode, $ as createVNode, aa as QCard, ab as QCardSection, a3 as createElementBlock, a4 as Fragment, a5 as renderList, a2 as createTextVNode, a7 as toDisplayString, a1 as QBtn, a6 as QIcon, r as ref, o as onMounted, aj as Notify, ai as Dialog } from "./index-DTRxxbQ7.js";
import { Q as QPage } from "./QPage-pt9NM7Fr.js";
import { a as axios } from "./index-BSBq6A-N.js";
const _sfc_main = {
  __name: "SalesPage",
  setup(__props, { expose: __expose }) {
    __expose();
    const products = ref([]);
    async function fetchProducts() {
      try {
        const response = await axios.get("http://localhost:3001/api/products");
        products.value = response.data;
      } catch {
        Notify.create({
          type: "negative",
          message: "Erro ao buscar produtos do servidor."
        });
      }
    }
    onMounted(fetchProducts);
    function sell(productId) {
      const product = products.value.find((p) => p.id === productId);
      if (!product) {
        Notify.create({
          type: "negative",
          message: "Produto não encontrado."
        });
        return;
      }
      Dialog.create({
        title: "Vender Produto",
        message: `Informe a quantidade para vender o produto "${product.name}":`,
        prompt: {
          model: "",
          type: "number",
          isValid: (val) => val > 0 && val <= product.quantity,
          label: "Quantidade",
          placeholder: `Máximo: ${product.quantity}`
        },
        cancel: true,
        persistent: true
      }).onOk((quantity) => {
        const parsedQuantity = parseInt(quantity, 10);
        if (!productId || isNaN(parsedQuantity) || parsedQuantity <= 0 || parsedQuantity > product.quantity) {
          Notify.create({
            type: "negative",
            message: "Preencha todos os campos corretamente."
          });
          return;
        }
        Dialog.create({
          title: "Preço Unitário",
          message: `Informe o preço unitário do produto "${product.name}":`,
          prompt: {
            model: "",
            type: "number",
            isValid: (val) => val > 0,
            label: "Preço Unitário",
            placeholder: "Digite o preço unitário"
          },
          cancel: true,
          persistent: true
        }).onOk((price) => {
          const parsedPrice = parseFloat(price);
          if (!productId || isNaN(parsedPrice) || parsedPrice <= 0) {
            Notify.create({
              type: "negative",
              message: "Preencha todos os campos corretamente."
            });
            return;
          }
          Dialog.create({
            title: "Método de Pagamento",
            message: "Selecione o método de pagamento:",
            options: {
              type: "radio",
              model: "",
              items: [
                { label: "Dinheiro", value: "Dinheiro" },
                { label: "Cartão de Crédito", value: "Cartão de Crédito" },
                { label: "Cartão de Débito", value: "Cartão de Débito" },
                { label: "Pix", value: "Pix" },
                { label: "Boleto", value: "Boleto" }
              ]
            },
            cancel: true,
            persistent: true
          }).onOk((method) => {
            if (!productId || !parsedPrice || !parsedQuantity || parsedQuantity <= 0 || parsedPrice <= 0) {
              Notify.create({
                type: "negative",
                message: "Preencha todos os campos corretamente."
              });
              return;
            }
            axios.post("http://localhost:3001/api/sales", {
              productId,
              quantity: parsedQuantity,
              price: parsedPrice,
              paymentMethod: method
            }).then(() => {
              Notify.create({
                type: "positive",
                message: `Venda registrada com sucesso!`
              });
              fetchProducts();
            }).catch(() => {
              Notify.create({
                type: "negative",
                message: "Erro ao registrar a venda."
              });
            });
          }).onCancel(() => {
            Notify.create({
              type: "info",
              message: "Venda cancelada."
            });
          });
        }).onCancel(() => {
          Notify.create({
            type: "info",
            message: "Venda cancelada."
          });
        });
      }).onCancel(() => {
        Notify.create({
          type: "info",
          message: "Venda cancelada."
        });
      });
    }
    const __returned__ = { products, fetchProducts, sell, ref, onMounted, get Notify() {
      return Notify;
    }, get Dialog() {
      return Dialog;
    }, get axios() {
      return axios;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1 = { class: "sales-container" };
const _hoisted_2 = {
  key: 1,
  class: "text-center q-mt-md"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QPage, null, {
    default: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        _cache[2] || (_cache[2] = createBaseVNode("div", { class: "sales-title q-mb-lg" }, "Nova Venda", -1)),
        createVNode(QCard, {
          flat: "",
          bordered: "",
          class: "sales-card shadow-2"
        }, {
          default: withCtx(() => [
            createVNode(QCardSection, null, {
              default: withCtx(() => [
                _cache[1] || (_cache[1] = createBaseVNode("div", { class: "sales-section-title q-mb-md" }, "Produtos Disponíveis", -1)),
                Array.isArray($setup.products) && $setup.products.length > 0 ? (openBlock(), createBlock(QList, {
                  key: 0,
                  class: "q-pa-none"
                }, {
                  default: withCtx(() => [
                    (openBlock(true), createElementBlock(Fragment, null, renderList($setup.products, (product) => {
                      return openBlock(), createBlock(QItem, {
                        key: product.id,
                        class: "sales-item",
                        disable: product.quantity === 0
                      }, {
                        default: withCtx(() => [
                          createVNode(QItemSection, null, {
                            default: withCtx(() => [
                              createVNode(QItemLabel, { class: "custom-font-bold sales-product-name" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(product.name), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(QItemLabel, {
                                caption: "",
                                class: "custom-font-light sales-qty"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Quantidade: " + toDisplayString(product.quantity), 1)
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(QItemSection, { side: "" }, {
                            default: withCtx(() => [
                              createVNode(QBtn, {
                                icon: "shopping_cart",
                                label: "VENDER",
                                color: "primary",
                                unelevated: "",
                                class: "sales-btn",
                                onClick: ($event) => $setup.sell(product.id),
                                disable: product.quantity === 0,
                                "no-caps": ""
                              }, null, 8, ["onClick", "disable"])
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1032, ["disable"]);
                    }), 128))
                  ]),
                  _: 1
                })) : (openBlock(), createElementBlock("div", _hoisted_2, [
                  createVNode(QIcon, {
                    name: "info",
                    size: "lg",
                    color: "grey-6"
                  }),
                  _cache[0] || (_cache[0] = createBaseVNode("p", { class: "custom-font-light text-grey" }, "Nenhum produto disponível para venda.", -1))
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
const SalesPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8b38273d"], ["__file", "SalesPage.vue"]]);
export {
  SalesPage as default
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2FsZXNQYWdlLS1obU1UNjJyLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGFnZXMvU2FsZXNQYWdlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gIDxxLXBhZ2U+XG4gICAgPGRpdiBjbGFzcz1cInNhbGVzLWNvbnRhaW5lclwiPlxuICAgICAgPGRpdiBjbGFzcz1cInNhbGVzLXRpdGxlIHEtbWItbGdcIj5Ob3ZhIFZlbmRhPC9kaXY+XG4gICAgICA8cS1jYXJkIGZsYXQgYm9yZGVyZWQgY2xhc3M9XCJzYWxlcy1jYXJkIHNoYWRvdy0yXCI+XG4gICAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic2FsZXMtc2VjdGlvbi10aXRsZSBxLW1iLW1kXCI+UHJvZHV0b3MgRGlzcG9uw612ZWlzPC9kaXY+XG4gICAgICAgICAgPHEtbGlzdCB2LWlmPVwiQXJyYXkuaXNBcnJheShwcm9kdWN0cykgJiYgcHJvZHVjdHMubGVuZ3RoID4gMFwiIGNsYXNzPVwicS1wYS1ub25lXCI+XG4gICAgICAgICAgICA8cS1pdGVtXG4gICAgICAgICAgICAgIHYtZm9yPVwicHJvZHVjdCBpbiBwcm9kdWN0c1wiXG4gICAgICAgICAgICAgIDprZXk9XCJwcm9kdWN0LmlkXCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJzYWxlcy1pdGVtXCJcbiAgICAgICAgICAgICAgOmRpc2FibGU9XCJwcm9kdWN0LnF1YW50aXR5ID09PSAwXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWwgY2xhc3M9XCJjdXN0b20tZm9udC1ib2xkIHNhbGVzLXByb2R1Y3QtbmFtZVwiPlxuICAgICAgICAgICAgICAgICAge3sgcHJvZHVjdC5uYW1lIH19XG4gICAgICAgICAgICAgICAgPC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbCBjYXB0aW9uIGNsYXNzPVwiY3VzdG9tLWZvbnQtbGlnaHQgc2FsZXMtcXR5XCI+XG4gICAgICAgICAgICAgICAgICBRdWFudGlkYWRlOiB7eyBwcm9kdWN0LnF1YW50aXR5IH19XG4gICAgICAgICAgICAgICAgPC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBzaWRlPlxuICAgICAgICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgICAgICAgaWNvbj1cInNob3BwaW5nX2NhcnRcIlxuICAgICAgICAgICAgICAgICAgbGFiZWw9XCJWRU5ERVJcIlxuICAgICAgICAgICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgICAgICAgIHVuZWxldmF0ZWRcbiAgICAgICAgICAgICAgICAgIGNsYXNzPVwic2FsZXMtYnRuXCJcbiAgICAgICAgICAgICAgICAgIEBjbGljaz1cInNlbGwocHJvZHVjdC5pZClcIlxuICAgICAgICAgICAgICAgICAgOmRpc2FibGU9XCJwcm9kdWN0LnF1YW50aXR5ID09PSAwXCJcbiAgICAgICAgICAgICAgICAgIG5vLWNhcHNcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgICAgPC9xLWxpc3Q+XG4gICAgICAgICAgPGRpdiB2LWVsc2UgY2xhc3M9XCJ0ZXh0LWNlbnRlciBxLW10LW1kXCI+XG4gICAgICAgICAgICA8cS1pY29uIG5hbWU9XCJpbmZvXCIgc2l6ZT1cImxnXCIgY29sb3I9XCJncmV5LTZcIiAvPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJjdXN0b20tZm9udC1saWdodCB0ZXh0LWdyZXlcIj5OZW5odW0gcHJvZHV0byBkaXNwb27DrXZlbCBwYXJhIHZlbmRhLjwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgIDwvcS1jYXJkPlxuICAgIDwvZGl2PlxuICA8L3EtcGFnZT5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyByZWYsIG9uTW91bnRlZCB9IGZyb20gJ3Z1ZSdcbmltcG9ydCB7IE5vdGlmeSwgRGlhbG9nIH0gZnJvbSAncXVhc2FyJ1xuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJ1xuXG5jb25zdCBwcm9kdWN0cyA9IHJlZihbXSlcblxuYXN5bmMgZnVuY3Rpb24gZmV0Y2hQcm9kdWN0cygpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGF4aW9zLmdldCgnaHR0cDovL2xvY2FsaG9zdDozMDAxL2FwaS9wcm9kdWN0cycpXG4gICAgcHJvZHVjdHMudmFsdWUgPSByZXNwb25zZS5kYXRhXG4gIH0gY2F0Y2gge1xuICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgdHlwZTogJ25lZ2F0aXZlJyxcbiAgICAgIG1lc3NhZ2U6ICdFcnJvIGFvIGJ1c2NhciBwcm9kdXRvcyBkbyBzZXJ2aWRvci4nLFxuICAgIH0pXG4gIH1cbn1cblxub25Nb3VudGVkKGZldGNoUHJvZHVjdHMpXG5cbmZ1bmN0aW9uIHNlbGwocHJvZHVjdElkKSB7XG4gIGNvbnN0IHByb2R1Y3QgPSBwcm9kdWN0cy52YWx1ZS5maW5kKChwKSA9PiBwLmlkID09PSBwcm9kdWN0SWQpXG4gIGlmICghcHJvZHVjdCkge1xuICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgdHlwZTogJ25lZ2F0aXZlJyxcbiAgICAgIG1lc3NhZ2U6ICdQcm9kdXRvIG7Do28gZW5jb250cmFkby4nLFxuICAgIH0pXG4gICAgcmV0dXJuXG4gIH1cblxuICBEaWFsb2cuY3JlYXRlKHtcbiAgICB0aXRsZTogJ1ZlbmRlciBQcm9kdXRvJyxcbiAgICBtZXNzYWdlOiBgSW5mb3JtZSBhIHF1YW50aWRhZGUgcGFyYSB2ZW5kZXIgbyBwcm9kdXRvIFwiJHtwcm9kdWN0Lm5hbWV9XCI6YCxcbiAgICBwcm9tcHQ6IHtcbiAgICAgIG1vZGVsOiAnJyxcbiAgICAgIHR5cGU6ICdudW1iZXInLFxuICAgICAgaXNWYWxpZDogKHZhbCkgPT4gdmFsID4gMCAmJiB2YWwgPD0gcHJvZHVjdC5xdWFudGl0eSxcbiAgICAgIGxhYmVsOiAnUXVhbnRpZGFkZScsXG4gICAgICBwbGFjZWhvbGRlcjogYE3DoXhpbW86ICR7cHJvZHVjdC5xdWFudGl0eX1gLFxuICAgIH0sXG4gICAgY2FuY2VsOiB0cnVlLFxuICAgIHBlcnNpc3RlbnQ6IHRydWUsXG4gIH0pXG4gICAgLm9uT2soKHF1YW50aXR5KSA9PiB7XG4gICAgICBjb25zdCBwYXJzZWRRdWFudGl0eSA9IHBhcnNlSW50KHF1YW50aXR5LCAxMClcbiAgICAgIGlmIChcbiAgICAgICAgIXByb2R1Y3RJZCB8fFxuICAgICAgICBpc05hTihwYXJzZWRRdWFudGl0eSkgfHxcbiAgICAgICAgcGFyc2VkUXVhbnRpdHkgPD0gMCB8fFxuICAgICAgICBwYXJzZWRRdWFudGl0eSA+IHByb2R1Y3QucXVhbnRpdHlcbiAgICAgICkge1xuICAgICAgICBOb3RpZnkuY3JlYXRlKHtcbiAgICAgICAgICB0eXBlOiAnbmVnYXRpdmUnLFxuICAgICAgICAgIG1lc3NhZ2U6ICdQcmVlbmNoYSB0b2RvcyBvcyBjYW1wb3MgY29ycmV0YW1lbnRlLicsXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBEaWFsb2cuY3JlYXRlKHtcbiAgICAgICAgdGl0bGU6ICdQcmXDp28gVW5pdMOhcmlvJyxcbiAgICAgICAgbWVzc2FnZTogYEluZm9ybWUgbyBwcmXDp28gdW5pdMOhcmlvIGRvIHByb2R1dG8gXCIke3Byb2R1Y3QubmFtZX1cIjpgLFxuICAgICAgICBwcm9tcHQ6IHtcbiAgICAgICAgICBtb2RlbDogJycsXG4gICAgICAgICAgdHlwZTogJ251bWJlcicsXG4gICAgICAgICAgaXNWYWxpZDogKHZhbCkgPT4gdmFsID4gMCxcbiAgICAgICAgICBsYWJlbDogJ1ByZcOnbyBVbml0w6FyaW8nLFxuICAgICAgICAgIHBsYWNlaG9sZGVyOiAnRGlnaXRlIG8gcHJlw6dvIHVuaXTDoXJpbycsXG4gICAgICAgIH0sXG4gICAgICAgIGNhbmNlbDogdHJ1ZSxcbiAgICAgICAgcGVyc2lzdGVudDogdHJ1ZSxcbiAgICAgIH0pXG4gICAgICAgIC5vbk9rKChwcmljZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHBhcnNlZFByaWNlID0gcGFyc2VGbG9hdChwcmljZSlcbiAgICAgICAgICBpZiAoIXByb2R1Y3RJZCB8fCBpc05hTihwYXJzZWRQcmljZSkgfHwgcGFyc2VkUHJpY2UgPD0gMCkge1xuICAgICAgICAgICAgTm90aWZ5LmNyZWF0ZSh7XG4gICAgICAgICAgICAgIHR5cGU6ICduZWdhdGl2ZScsXG4gICAgICAgICAgICAgIG1lc3NhZ2U6ICdQcmVlbmNoYSB0b2RvcyBvcyBjYW1wb3MgY29ycmV0YW1lbnRlLicsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgRGlhbG9nLmNyZWF0ZSh7XG4gICAgICAgICAgICB0aXRsZTogJ03DqXRvZG8gZGUgUGFnYW1lbnRvJyxcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdTZWxlY2lvbmUgbyBtw6l0b2RvIGRlIHBhZ2FtZW50bzonLFxuICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICB0eXBlOiAncmFkaW8nLFxuICAgICAgICAgICAgICBtb2RlbDogJycsXG4gICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgeyBsYWJlbDogJ0RpbmhlaXJvJywgdmFsdWU6ICdEaW5oZWlybycgfSxcbiAgICAgICAgICAgICAgICB7IGxhYmVsOiAnQ2FydMOjbyBkZSBDcsOpZGl0bycsIHZhbHVlOiAnQ2FydMOjbyBkZSBDcsOpZGl0bycgfSxcbiAgICAgICAgICAgICAgICB7IGxhYmVsOiAnQ2FydMOjbyBkZSBEw6liaXRvJywgdmFsdWU6ICdDYXJ0w6NvIGRlIETDqWJpdG8nIH0sXG4gICAgICAgICAgICAgICAgeyBsYWJlbDogJ1BpeCcsIHZhbHVlOiAnUGl4JyB9LFxuICAgICAgICAgICAgICAgIHsgbGFiZWw6ICdCb2xldG8nLCB2YWx1ZTogJ0JvbGV0bycgfSxcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjYW5jZWw6IHRydWUsXG4gICAgICAgICAgICBwZXJzaXN0ZW50OiB0cnVlLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgICAub25PaygobWV0aG9kKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAhcHJvZHVjdElkIHx8XG4gICAgICAgICAgICAgICAgIXBhcnNlZFByaWNlIHx8XG4gICAgICAgICAgICAgICAgIXBhcnNlZFF1YW50aXR5IHx8XG4gICAgICAgICAgICAgICAgcGFyc2VkUXVhbnRpdHkgPD0gMCB8fFxuICAgICAgICAgICAgICAgIHBhcnNlZFByaWNlIDw9IDBcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgTm90aWZ5LmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgICB0eXBlOiAnbmVnYXRpdmUnLFxuICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ1ByZWVuY2hhIHRvZG9zIG9zIGNhbXBvcyBjb3JyZXRhbWVudGUuJyxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8vIFJlYWxpemEgYSB2ZW5kYSB2aWEgQVBJXG4gICAgICAgICAgICAgIGF4aW9zXG4gICAgICAgICAgICAgICAgLnBvc3QoJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMS9hcGkvc2FsZXMnLCB7XG4gICAgICAgICAgICAgICAgICBwcm9kdWN0SWQsXG4gICAgICAgICAgICAgICAgICBxdWFudGl0eTogcGFyc2VkUXVhbnRpdHksXG4gICAgICAgICAgICAgICAgICBwcmljZTogcGFyc2VkUHJpY2UsXG4gICAgICAgICAgICAgICAgICBwYXltZW50TWV0aG9kOiBtZXRob2QsXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBOb3RpZnkuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3Bvc2l0aXZlJyxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogYFZlbmRhIHJlZ2lzdHJhZGEgY29tIHN1Y2Vzc28hYCxcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICBmZXRjaFByb2R1Y3RzKCkgLy8gQXR1YWxpemEgYSBsaXN0YVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnbmVnYXRpdmUnLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnRXJybyBhbyByZWdpc3RyYXIgYSB2ZW5kYS4nLFxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbkNhbmNlbCgoKSA9PiB7XG4gICAgICAgICAgICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdpbmZvJyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnVmVuZGEgY2FuY2VsYWRhLicsXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgICAub25DYW5jZWwoKCkgPT4ge1xuICAgICAgICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgICAgICAgdHlwZTogJ2luZm8nLFxuICAgICAgICAgICAgbWVzc2FnZTogJ1ZlbmRhIGNhbmNlbGFkYS4nLFxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfSlcbiAgICAub25DYW5jZWwoKCkgPT4ge1xuICAgICAgTm90aWZ5LmNyZWF0ZSh7XG4gICAgICAgIHR5cGU6ICdpbmZvJyxcbiAgICAgICAgbWVzc2FnZTogJ1ZlbmRhIGNhbmNlbGFkYS4nLFxuICAgICAgfSlcbiAgICB9KVxufVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG4uc2FsZXMtYmcge1xuICBiYWNrZ3JvdW5kOiAjZjhmYWZjO1xuICBtaW4taGVpZ2h0OiAxMDB2aDtcbiAgcGFkZGluZzogMDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuXG4uc2FsZXMtY29udGFpbmVyIHtcbiAgd2lkdGg6IDEwMCU7XG4gIG1heC13aWR0aDogNzAwcHg7XG4gIG1hcmdpbjogMCBhdXRvO1xuICBwYWRkaW5nOiA0MHB4IDAgMCAwO1xufVxuXG4uc2FsZXMtdGl0bGUge1xuICBjb2xvcjogIzExNDA0YztcbiAgZm9udC1mYW1pbHk6ICdQb3BwaW5zJywgJ0ludGVyJywgJ1JvYm90bycsIHNhbnMtc2VyaWY7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGxldHRlci1zcGFjaW5nOiAxcHg7XG4gIGZvbnQtc2l6ZTogMi4zcmVtO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIG1hcmdpbi1ib3R0b206IDMycHg7XG4gIHRleHQtc2hhZG93OiAwIDJweCA4cHggIzAwMDE7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG59XG5cbi5zYWxlcy1zZWN0aW9uLXRpdGxlIHtcbiAgZm9udC1zaXplOiAxLjM1cmVtO1xuICBmb250LWZhbWlseTogJ1BvcHBpbnMnLCAnSW50ZXInLCAnUm9ib3RvJywgc2Fucy1zZXJpZjtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6ICMyMjI7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgbWFyZ2luLWJvdHRvbTogMThweDtcbn1cblxuLnNhbGVzLWNhcmQge1xuICBib3JkZXItcmFkaXVzOiAxOHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBib3gtc2hhZG93OiAwIDRweCAyNHB4IDAgcmdiYSgwLCAwLCAwLCAwLjA4KTtcbiAgcGFkZGluZzogMDtcbiAgYm9yZGVyOiAxLjVweCBzb2xpZCAjZjBmNGY4O1xufVxuXG4uc2FsZXMtaXRlbSB7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBib3JkZXItcmFkaXVzOiAxNHB4O1xuICBtYXJnaW4tYm90dG9tOiAwO1xuICBwYWRkaW5nOiAwIDAuNXJlbTtcbiAgbWluLWhlaWdodDogODRweDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAwLjE4cztcbn1cbi5zYWxlcy1pdGVtOmhvdmVyIHtcbiAgYmFja2dyb3VuZDogI2YwZjRmYTtcbn1cblxuLnNhbGVzLWF2YXRhciB7XG4gIGJhY2tncm91bmQ6ICMxOTc2ZDI7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gIHdpZHRoOiA1NnB4O1xuICBoZWlnaHQ6IDU2cHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuLnNhbGVzLWF2YXRhci1oaXN0b3J5IHtcbiAgYmFja2dyb3VuZDogIzQzYTA0Nztcbn1cblxuLnNhbGVzLXByb2R1Y3QtbmFtZSB7XG4gIGZvbnQtc2l6ZTogMS4xOHJlbTtcbiAgY29sb3I6ICMyMjI7XG4gIGZvbnQtZmFtaWx5OiAnUG9wcGlucycsICdJbnRlcicsICdSb2JvdG8nLCBzYW5zLXNlcmlmO1xuICBmb250LXdlaWdodDogNjAwO1xufVxuXG4uc2FsZXMtcXR5IHtcbiAgY29sb3I6ICM2YzdhODk7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbiAgZm9udC1mYW1pbHk6ICdQb3BwaW5zJywgJ0ludGVyJywgJ1JvYm90bycsIHNhbnMtc2VyaWY7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG59XG5cbi5zYWxlcy1idG4ge1xuICBiYWNrZ3JvdW5kOiAjMTk3NmQyO1xuICBjb2xvcjogI2ZmZjtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgZm9udC1zaXplOiAxcmVtO1xuICBwYWRkaW5nOiAwIDIycHg7XG4gIG1pbi13aWR0aDogMTIwcHg7XG4gIHRyYW5zaXRpb246XG4gICAgYmFja2dyb3VuZCAwLjJzLFxuICAgIGJveC1zaGFkb3cgMC4ycztcbiAgYm94LXNoYWRvdzogMCAycHggOHB4IDAgIzE5NzZkMjIyO1xuICBsZXR0ZXItc3BhY2luZzogMXB4O1xufVxuLnNhbGVzLWJ0bjpob3Zlcjpub3QoOmRpc2FibGVkKSB7XG4gIGJhY2tncm91bmQ6ICMxMjU2YTM7XG4gIGJveC1zaGFkb3c6IDAgNHB4IDE2cHggMCAjMTk3NmQyNDQ7XG59XG5cbi5nby1oaXN0b3J5LWJ0biB7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbiAgcGFkZGluZzogMCAxOHB4O1xuICBtaW4td2lkdGg6IDIwMHB4O1xuICBtYXJnaW4tdG9wOiA4cHg7XG4gIGJhY2tncm91bmQ6ICNmNWY3ZmE7XG4gIGNvbG9yOiAjMTk3NmQyO1xuICB0cmFuc2l0aW9uOlxuICAgIGJhY2tncm91bmQgMC4ycyxcbiAgICBjb2xvciAwLjJzO1xufVxuLmdvLWhpc3RvcnktYnRuOmhvdmVyIHtcbiAgYmFja2dyb3VuZDogIzE5NzZkMjtcbiAgY29sb3I6ICNmZmY7XG59XG5cbi5uZXctc2FsZS1pdGVtIHtcbiAgbWFyZ2luLXRvcDogMTZweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIDAuMnM7XG59XG4ubmV3LXNhbGUtaXRlbTpob3ZlciB7XG4gIGJhY2tncm91bmQ6ICNmMGY0ZmE7XG59XG5cbkBtZWRpYSAobWF4LXdpZHRoOiA2MDBweCkge1xuICAuc2FsZXMtY29udGFpbmVyIHtcbiAgICBwYWRkaW5nOiAxMnB4IDAgMCAwO1xuICAgIG1heC13aWR0aDogOTh2dztcbiAgfVxuICAuc2FsZXMtY2FyZCB7XG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xuICB9XG4gIC5zYWxlcy1pdGVtIHtcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgbWluLWhlaWdodDogNzBweDtcbiAgICBwYWRkaW5nOiAwIDAuMnJlbTtcbiAgfVxuICAuc2FsZXMtYXZhdGFyLFxuICAuc2FsZXMtYXZhdGFyLWhpc3Rvcnkge1xuICAgIHdpZHRoOiA0MHB4O1xuICAgIGhlaWdodDogNDBweDtcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIH1cbiAgLnNhbGVzLWJ0bixcbiAgLmdvLWhpc3RvcnktYnRuIHtcbiAgICBtaW4td2lkdGg6IDgwcHg7XG4gICAgZm9udC1zaXplOiAwLjk1cmVtO1xuICAgIHBhZGRpbmc6IDAgOHB4O1xuICB9XG59XG48L3N0eWxlPlxuIl0sIm5hbWVzIjpbIl9jcmVhdGVCbG9jayIsIl93aXRoQ3R4IiwiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIl9jcmVhdGVWTm9kZSIsIl9vcGVuQmxvY2siLCJfY3JlYXRlRWxlbWVudEJsb2NrIiwiX0ZyYWdtZW50IiwiX3JlbmRlckxpc3QiLCJfY3JlYXRlVGV4dFZOb2RlIiwiX3RvRGlzcGxheVN0cmluZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFtREEsVUFBTSxXQUFXLElBQUksQ0FBRSxDQUFBO0FBRXZCLG1CQUFlLGdCQUFnQjtBQUM3QixVQUFJO0FBQ0YsY0FBTSxXQUFXLE1BQU0sTUFBTSxJQUFJLG9DQUFvQztBQUNyRSxpQkFBUyxRQUFRLFNBQVM7QUFBQSxNQUM5QixRQUFVO0FBQ04sZUFBTyxPQUFPO0FBQUEsVUFDWixNQUFNO0FBQUEsVUFDTixTQUFTO0FBQUEsUUFDVixDQUFBO0FBQUEsTUFDTDtBQUFBLElBQ0E7QUFFQSxjQUFVLGFBQWE7QUFFdkIsYUFBUyxLQUFLLFdBQVc7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
