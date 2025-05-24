import { Q as QTable } from "./QTable-BFYSwBK2.js";
import { _ as _export_sfc, X as createBlock, Y as openBlock, Z as withCtx, a0 as createBaseVNode, $ as createVNode, aa as QCard, ab as QCardSection, k as computed } from "./index-DTRxxbQ7.js";
import { Q as QPage } from "./QPage-pt9NM7Fr.js";
import { u as useSalesStore } from "./sales-store-BduwSnzu.js";
import "./QList-C--UWoUK.js";
import "./QSelect-CxdRDuFh.js";
import "./format-B8-XYLEH.js";
const _sfc_main = {
  __name: "PaymentPage",
  setup(__props, { expose: __expose }) {
    __expose();
    const salesStore = useSalesStore();
    const sales = computed(() => salesStore.sales || []);
    const salesFormatted = computed(
      () => sales.value.map((row, idx) => ({
        ...row,
        id: row.id ?? idx,
        // Garante id único mesmo se não existir
        value: Number(row.value) || 0
      }))
    );
    const columns = [
      { name: "item", label: "Item", field: "item", align: "left" },
      { name: "quantity", label: "Quantidade", field: "quantity", align: "center" },
      {
        name: "value",
        label: "Valor (R$)",
        field: (row) => row.value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
        align: "center"
      },
      { name: "method", label: "Método de Pagamento", field: "method", align: "center" }
    ];
    const __returned__ = { salesStore, sales, salesFormatted, columns, computed, get useSalesStore() {
      return useSalesStore;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1 = { class: "q-pa-md" };
const _hoisted_2 = { class: "q-table-responsive" };
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
                _cache[0] || (_cache[0] = createBaseVNode("div", { class: "text-h6" }, "Vendas Registradas", -1)),
                createBaseVNode("div", _hoisted_2, [
                  createVNode(QTable, {
                    rows: $setup.salesFormatted,
                    columns: $setup.columns,
                    "row-key": "id",
                    "no-data-label": "Nenhuma venda registrada.",
                    dense: "",
                    flat: "",
                    bordered: "",
                    "rows-per-page-options": [5, 10, 20]
                  }, null, 8, ["rows"])
                ])
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
const PaymentPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-212c07cd"], ["__file", "PaymentPage.vue"]]);
export {
  PaymentPage as default
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGF5bWVudFBhZ2UtQnVSaEhtNkwuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYWdlcy9QYXltZW50UGFnZS52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICA8cS1wYWdlPlxuICAgIDxkaXYgY2xhc3M9XCJxLXBhLW1kXCI+XG4gICAgICA8cS1jYXJkIGZsYXQgYm9yZGVyZWQ+XG4gICAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNlwiPlZlbmRhcyBSZWdpc3RyYWRhczwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJxLXRhYmxlLXJlc3BvbnNpdmVcIj5cbiAgICAgICAgICAgIDxxLXRhYmxlXG4gICAgICAgICAgICAgIDpyb3dzPVwic2FsZXNGb3JtYXR0ZWRcIlxuICAgICAgICAgICAgICA6Y29sdW1ucz1cImNvbHVtbnNcIlxuICAgICAgICAgICAgICByb3cta2V5PVwiaWRcIlxuICAgICAgICAgICAgICA6bm8tZGF0YS1sYWJlbD1cIidOZW5odW1hIHZlbmRhIHJlZ2lzdHJhZGEuJ1wiXG4gICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgIGZsYXRcbiAgICAgICAgICAgICAgYm9yZGVyZWRcbiAgICAgICAgICAgICAgOnJvd3MtcGVyLXBhZ2Utb3B0aW9ucz1cIls1LCAxMCwgMjBdXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICA8L3EtY2FyZD5cbiAgICA8L2Rpdj5cbiAgPC9xLXBhZ2U+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5pbXBvcnQgeyB1c2VTYWxlc1N0b3JlIH0gZnJvbSAnc3JjL3N0b3Jlcy9zYWxlcy1zdG9yZSdcblxuY29uc3Qgc2FsZXNTdG9yZSA9IHVzZVNhbGVzU3RvcmUoKVxuY29uc3Qgc2FsZXMgPSBjb21wdXRlZCgoKSA9PiBzYWxlc1N0b3JlLnNhbGVzIHx8IFtdKVxuXG4vLyBHYXJhbnRlIGZvcm1hdGHDp8OjbyBjb3JyZXRhIGRvIHZhbG9yIGUgaWQgw7puaWNvXG5jb25zdCBzYWxlc0Zvcm1hdHRlZCA9IGNvbXB1dGVkKCgpID0+XG4gIHNhbGVzLnZhbHVlLm1hcCgocm93LCBpZHgpID0+ICh7XG4gICAgLi4ucm93LFxuICAgIGlkOiByb3cuaWQgPz8gaWR4LCAvLyBHYXJhbnRlIGlkIMO6bmljbyBtZXNtbyBzZSBuw6NvIGV4aXN0aXJcbiAgICB2YWx1ZTogTnVtYmVyKHJvdy52YWx1ZSkgfHwgMCxcbiAgfSkpLFxuKVxuXG5jb25zdCBjb2x1bW5zID0gW1xuICB7IG5hbWU6ICdpdGVtJywgbGFiZWw6ICdJdGVtJywgZmllbGQ6ICdpdGVtJywgYWxpZ246ICdsZWZ0JyB9LFxuICB7IG5hbWU6ICdxdWFudGl0eScsIGxhYmVsOiAnUXVhbnRpZGFkZScsIGZpZWxkOiAncXVhbnRpdHknLCBhbGlnbjogJ2NlbnRlcicgfSxcbiAge1xuICAgIG5hbWU6ICd2YWx1ZScsXG4gICAgbGFiZWw6ICdWYWxvciAoUiQpJyxcbiAgICBmaWVsZDogKHJvdykgPT4gcm93LnZhbHVlLnRvTG9jYWxlU3RyaW5nKCdwdC1CUicsIHsgc3R5bGU6ICdjdXJyZW5jeScsIGN1cnJlbmN5OiAnQlJMJyB9KSxcbiAgICBhbGlnbjogJ2NlbnRlcicsXG4gIH0sXG4gIHsgbmFtZTogJ21ldGhvZCcsIGxhYmVsOiAnTcOpdG9kbyBkZSBQYWdhbWVudG8nLCBmaWVsZDogJ21ldGhvZCcsIGFsaWduOiAnY2VudGVyJyB9LFxuXVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG4ucS10YWJsZS1yZXNwb25zaXZlIHtcbiAgb3ZlcmZsb3cteDogYXV0bztcbn1cbjwvc3R5bGU+XG4iXSwibmFtZXMiOlsiX2NyZWF0ZUJsb2NrIiwiX3dpdGhDdHgiLCJfY3JlYXRlRWxlbWVudFZOb2RlIiwiX2NyZWF0ZVZOb2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQTRCQSxVQUFNLGFBQWEsY0FBYTtBQUNoQyxVQUFNLFFBQVEsU0FBUyxNQUFNLFdBQVcsU0FBUyxDQUFFLENBQUE7QUFHbkQsVUFBTSxpQkFBaUI7QUFBQSxNQUFTLE1BQzlCLE1BQU0sTUFBTSxJQUFJLENBQUMsS0FBSyxTQUFTO0FBQUEsUUFDN0IsR0FBRztBQUFBLFFBQ0gsSUFBSSxJQUFJLE1BQU07QUFBQTtBQUFBLFFBQ2QsT0FBTyxPQUFPLElBQUksS0FBSyxLQUFLO0FBQUEsTUFDaEMsRUFBSTtBQUFBLElBQ0o7QUFFQSxVQUFNLFVBQVU7QUFBQSxNQUNkLEVBQUUsTUFBTSxRQUFRLE9BQU8sUUFBUSxPQUFPLFFBQVEsT0FBTyxPQUFRO0FBQUEsTUFDN0QsRUFBRSxNQUFNLFlBQVksT0FBTyxjQUFjLE9BQU8sWUFBWSxPQUFPLFNBQVU7QUFBQSxNQUM3RTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLFFBQ1AsT0FBTyxDQUFDLFFBQVEsSUFBSSxNQUFNLGVBQWUsU0FBUyxFQUFFLE9BQU8sWUFBWSxVQUFVLE1BQUssQ0FBRTtBQUFBLFFBQ3hGLE9BQU87QUFBQSxNQUNSO0FBQUEsTUFDRCxFQUFFLE1BQU0sVUFBVSxPQUFPLHVCQUF1QixPQUFPLFVBQVUsT0FBTyxTQUFVO0FBQUEsSUFDcEY7Ozs7Ozs7O0FBaERTLE1BQUEsYUFBQSxFQUFBLE9BQU0sVUFBUztBQUlULE1BQUEsYUFBQSxFQUFBLE9BQU0scUJBQW9COztzQkFMdkNBLFlBb0JTLE9BQUEsTUFBQTtBQUFBLElBckJYLFNBQUFDLFFBRUksTUFrQk07QUFBQSxNQWxCTkMsZ0JBa0JNLE9BbEJOLFlBa0JNO0FBQUEsUUFqQkpDLFlBZ0JTLE9BQUE7QUFBQSxVQWhCRCxNQUFBO0FBQUEsVUFBSyxVQUFBO0FBQUE7VUFIbkIsU0FBQUYsUUFJUSxNQWNpQjtBQUFBLFlBZGpCRSxZQWNpQixjQUFBLE1BQUE7QUFBQSxjQWxCekIsU0FBQUYsUUFLVSxNQUE2QztBQUFBLGdCQUE3QyxPQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsSUFBQUMsZ0JBQTZDLE9BQXhDLEVBQUEsT0FBTSxVQUFTLEdBQUMsc0JBQWtCLEVBQUE7QUFBQSxnQkFDdkNBLGdCQVdNLE9BWE4sWUFXTTtBQUFBLGtCQVZKQyxZQVNFLFFBQUE7QUFBQSxvQkFSQyxNQUFNLE9BQWM7QUFBQSxvQkFDcEIsU0FBUyxPQUFPO0FBQUEsb0JBQ2pCLFdBQVE7QUFBQSxvQkFDUCxpQkFBZTtBQUFBLG9CQUNoQixPQUFBO0FBQUEsb0JBQ0EsTUFBQTtBQUFBLG9CQUNBLFVBQUE7QUFBQSxvQkFDQyx5QkFBdUIsQ0FBVyxHQUFBLElBQUEsRUFBQTtBQUFBOzs7Y0FmakQsR0FBQTtBQUFBOztVQUFBLEdBQUE7QUFBQTs7O0lBQUEsR0FBQTtBQUFBOzs7In0=
