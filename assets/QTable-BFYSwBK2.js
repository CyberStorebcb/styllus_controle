import { c as createComponent, g as getCurrentInstance, h, L as hSlot, m as hUniqueSlot, a6 as QIcon, C as useDarkProps, E as useDark, k as computed, O as scrollTargetProp, r as ref, w as watch, P as getScrollTarget, l as listenOpts, aK as onBeforeMount, o as onMounted, aG as onActivated, aF as onDeactivated, a as onBeforeUnmount, V as hMergeSlot, aL as useSizeProps, aM as useSize, aN as vmHasRouter, aO as History, aP as isNumber, ax as isDate, aB as isObject, b as nextTick, aQ as injectMultipleProps, aR as QCheckbox, aD as injectProp, a1 as QBtn, ag as QSeparator } from "./index-DTRxxbQ7.js";
import { Q as QList } from "./QList-C--UWoUK.js";
import { c as useVirtualScrollProps, d as useVirtualScroll, e as commonVirtScrollPropsList, Q as QSelect } from "./QSelect-CxdRDuFh.js";
const QTh = createComponent({
  name: "QTh",
  props: {
    props: Object,
    autoWidth: Boolean
  },
  emits: ["click"],
  setup(props, { slots, emit }) {
    const vm = getCurrentInstance();
    const { proxy: { $q } } = vm;
    const onClick = (evt) => {
      emit("click", evt);
    };
    return () => {
      if (props.props === void 0) {
        return h("th", {
          class: props.autoWidth === true ? "q-table--col-auto-width" : "",
          onClick
        }, hSlot(slots.default));
      }
      let col, child;
      const name = vm.vnode.key;
      if (name) {
        col = props.props.colsMap[name];
        if (col === void 0) return;
      } else {
        col = props.props.col;
      }
      if (col.sortable === true) {
        const action = col.align === "right" ? "unshift" : "push";
        child = hUniqueSlot(slots.default, []);
        child[action](
          h(QIcon, {
            class: col.__iconClass,
            name: $q.iconSet.table.arrowUp
          })
        );
      } else {
        child = hSlot(slots.default);
      }
      const data = {
        class: col.__thClass + (props.autoWidth === true ? " q-table--col-auto-width" : ""),
        style: col.headerStyle,
        onClick: (evt) => {
          col.sortable === true && props.props.sort(col);
          onClick(evt);
        }
      };
      return h("th", data, child);
    };
  }
});
const separatorValues = ["horizontal", "vertical", "cell", "none"];
const QMarkupTable = createComponent({
  name: "QMarkupTable",
  props: {
    ...useDarkProps,
    dense: Boolean,
    flat: Boolean,
    bordered: Boolean,
    square: Boolean,
    wrapCells: Boolean,
    separator: {
      type: String,
      default: "horizontal",
      validator: (v) => separatorValues.includes(v)
    }
  },
  setup(props, { slots }) {
    const vm = getCurrentInstance();
    const isDark = useDark(props, vm.proxy.$q);
    const classes = computed(
      () => `q-markup-table q-table__container q-table__card q-table--${props.separator}-separator` + (isDark.value === true ? " q-table--dark q-table__card--dark q-dark" : "") + (props.dense === true ? " q-table--dense" : "") + (props.flat === true ? " q-table--flat" : "") + (props.bordered === true ? " q-table--bordered" : "") + (props.square === true ? " q-table--square" : "") + (props.wrapCells === false ? " q-table--no-wrap" : "")
    );
    return () => h("div", {
      class: classes.value
    }, [
      h("table", { class: "q-table" }, hSlot(slots.default))
    ]);
  }
});
function getTableMiddle(props, content) {
  return h("div", props, [
    h("table", { class: "q-table" }, content)
  ]);
}
const comps = {
  list: QList,
  table: QMarkupTable
};
const typeOptions = ["list", "table", "__qtable"];
const QVirtualScroll = createComponent({
  name: "QVirtualScroll",
  props: {
    ...useVirtualScrollProps,
    type: {
      type: String,
      default: "list",
      validator: (v) => typeOptions.includes(v)
    },
    items: {
      type: Array,
      default: () => []
    },
    itemsFn: Function,
    itemsSize: Number,
    scrollTarget: scrollTargetProp
  },
  setup(props, { slots, attrs }) {
    let localScrollTarget;
    const rootRef = ref(null);
    const virtualScrollLength = computed(() => props.itemsSize >= 0 && props.itemsFn !== void 0 ? parseInt(props.itemsSize, 10) : Array.isArray(props.items) ? props.items.length : 0);
    const {
      virtualScrollSliceRange,
      localResetVirtualScroll,
      padVirtualScroll,
      onVirtualScrollEvt
    } = useVirtualScroll({
      virtualScrollLength,
      getVirtualScrollTarget,
      getVirtualScrollEl
    });
    const virtualScrollScope = computed(() => {
      if (virtualScrollLength.value === 0) {
        return [];
      }
      const mapFn = (item, i) => ({
        index: virtualScrollSliceRange.value.from + i,
        item
      });
      return props.itemsFn === void 0 ? props.items.slice(virtualScrollSliceRange.value.from, virtualScrollSliceRange.value.to).map(mapFn) : props.itemsFn(virtualScrollSliceRange.value.from, virtualScrollSliceRange.value.to - virtualScrollSliceRange.value.from).map(mapFn);
    });
    const classes = computed(
      () => "q-virtual-scroll q-virtual-scroll" + (props.virtualScrollHorizontal === true ? "--horizontal" : "--vertical") + (props.scrollTarget !== void 0 ? "" : " scroll")
    );
    const attributes = computed(() => props.scrollTarget !== void 0 ? {} : { tabindex: 0 });
    watch(virtualScrollLength, () => {
      localResetVirtualScroll();
    });
    watch(() => props.scrollTarget, () => {
      unconfigureScrollTarget();
      configureScrollTarget();
    });
    function getVirtualScrollEl() {
      return rootRef.value.$el || rootRef.value;
    }
    function getVirtualScrollTarget() {
      return localScrollTarget;
    }
    function configureScrollTarget() {
      localScrollTarget = getScrollTarget(getVirtualScrollEl(), props.scrollTarget);
      localScrollTarget.addEventListener("scroll", onVirtualScrollEvt, listenOpts.passive);
    }
    function unconfigureScrollTarget() {
      if (localScrollTarget !== void 0) {
        localScrollTarget.removeEventListener("scroll", onVirtualScrollEvt, listenOpts.passive);
        localScrollTarget = void 0;
      }
    }
    function __getVirtualChildren() {
      let child = padVirtualScroll(
        props.type === "list" ? "div" : "tbody",
        virtualScrollScope.value.map(slots.default)
      );
      if (slots.before !== void 0) {
        child = slots.before().concat(child);
      }
      return hMergeSlot(slots.after, child);
    }
    onBeforeMount(() => {
      localResetVirtualScroll();
    });
    onMounted(() => {
      configureScrollTarget();
    });
    onActivated(() => {
      configureScrollTarget();
    });
    onDeactivated(() => {
      unconfigureScrollTarget();
    });
    onBeforeUnmount(() => {
      unconfigureScrollTarget();
    });
    return () => {
      if (slots.default === void 0) {
        console.error("QVirtualScroll: default scoped slot is required for rendering");
        return;
      }
      return props.type === "__qtable" ? getTableMiddle(
        { ref: rootRef, class: "q-table__middle " + classes.value },
        __getVirtualChildren()
      ) : h(comps[props.type], {
        ...attrs,
        ref: rootRef,
        class: [attrs.class, classes.value],
        ...attributes.value
      }, __getVirtualChildren);
    };
  }
});
const defaultSizes = {
  xs: 2,
  sm: 4,
  md: 6,
  lg: 10,
  xl: 14
};
function width(val, reverse, $q) {
  return {
    transform: reverse === true ? `translateX(${$q.lang.rtl === true ? "-" : ""}100%) scale3d(${-val},1,1)` : `scale3d(${val},1,1)`
  };
}
const QLinearProgress = createComponent({
  name: "QLinearProgress",
  props: {
    ...useDarkProps,
    ...useSizeProps,
    value: {
      type: Number,
      default: 0
    },
    buffer: Number,
    color: String,
    trackColor: String,
    reverse: Boolean,
    stripe: Boolean,
    indeterminate: Boolean,
    query: Boolean,
    rounded: Boolean,
    animationSpeed: {
      type: [String, Number],
      default: 2100
    },
    instantFeedback: Boolean
  },
  setup(props, { slots }) {
    const { proxy } = getCurrentInstance();
    const isDark = useDark(props, proxy.$q);
    const sizeStyle = useSize(props, defaultSizes);
    const motion = computed(() => props.indeterminate === true || props.query === true);
    const widthReverse = computed(() => props.reverse !== props.query);
    const style = computed(() => ({
      ...sizeStyle.value !== null ? sizeStyle.value : {},
      "--q-linear-progress-speed": `${props.animationSpeed}ms`
    }));
    const classes = computed(
      () => "q-linear-progress" + (props.color !== void 0 ? ` text-${props.color}` : "") + (props.reverse === true || props.query === true ? " q-linear-progress--reverse" : "") + (props.rounded === true ? " rounded-borders" : "")
    );
    const trackStyle = computed(() => width(props.buffer !== void 0 ? props.buffer : 1, widthReverse.value, proxy.$q));
    const transitionSuffix = computed(() => `with${props.instantFeedback === true ? "out" : ""}-transition`);
    const trackClass = computed(
      () => `q-linear-progress__track absolute-full q-linear-progress__track--${transitionSuffix.value} q-linear-progress__track--${isDark.value === true ? "dark" : "light"}` + (props.trackColor !== void 0 ? ` bg-${props.trackColor}` : "")
    );
    const modelStyle = computed(() => width(motion.value === true ? 1 : props.value, widthReverse.value, proxy.$q));
    const modelClass = computed(
      () => `q-linear-progress__model absolute-full q-linear-progress__model--${transitionSuffix.value} q-linear-progress__model--${motion.value === true ? "in" : ""}determinate`
    );
    const stripeStyle = computed(() => ({ width: `${props.value * 100}%` }));
    const stripeClass = computed(
      () => `q-linear-progress__stripe absolute-${props.reverse === true ? "right" : "left"} q-linear-progress__stripe--${transitionSuffix.value}`
    );
    return () => {
      const child = [
        h("div", {
          class: trackClass.value,
          style: trackStyle.value
        }),
        h("div", {
          class: modelClass.value,
          style: modelStyle.value
        })
      ];
      props.stripe === true && motion.value === false && child.push(
        h("div", {
          class: stripeClass.value,
          style: stripeStyle.value
        })
      );
      return h("div", {
        class: classes.value,
        style: style.value,
        role: "progressbar",
        "aria-valuemin": 0,
        "aria-valuemax": 1,
        "aria-valuenow": props.indeterminate === true ? void 0 : props.value
      }, hMergeSlot(slots.default, child));
    };
  }
});
let counter = 0;
const useFullscreenProps = {
  fullscreen: Boolean,
  noRouteFullscreenExit: Boolean
};
const useFullscreenEmits = ["update:fullscreen", "fullscreen"];
function useFullscreen() {
  const vm = getCurrentInstance();
  const { props, emit, proxy } = vm;
  let historyEntry, fullscreenFillerNode, container;
  const inFullscreen = ref(false);
  vmHasRouter(vm) === true && watch(() => proxy.$route.fullPath, () => {
    props.noRouteFullscreenExit !== true && exitFullscreen();
  });
  watch(() => props.fullscreen, (v) => {
    if (inFullscreen.value !== v) {
      toggleFullscreen();
    }
  });
  watch(inFullscreen, (v) => {
    emit("update:fullscreen", v);
    emit("fullscreen", v);
  });
  function toggleFullscreen() {
    if (inFullscreen.value === true) {
      exitFullscreen();
    } else {
      setFullscreen();
    }
  }
  function setFullscreen() {
    if (inFullscreen.value === true) return;
    inFullscreen.value = true;
    container = proxy.$el.parentNode;
    container.replaceChild(fullscreenFillerNode, proxy.$el);
    document.body.appendChild(proxy.$el);
    counter++;
    if (counter === 1) {
      document.body.classList.add("q-body--fullscreen-mixin");
    }
    historyEntry = {
      handler: exitFullscreen
    };
    History.add(historyEntry);
  }
  function exitFullscreen() {
    if (inFullscreen.value !== true) return;
    if (historyEntry !== void 0) {
      History.remove(historyEntry);
      historyEntry = void 0;
    }
    container.replaceChild(proxy.$el, fullscreenFillerNode);
    inFullscreen.value = false;
    counter = Math.max(0, counter - 1);
    if (counter === 0) {
      document.body.classList.remove("q-body--fullscreen-mixin");
      if (proxy.$el.scrollIntoView !== void 0) {
        setTimeout(() => {
          proxy.$el.scrollIntoView();
        });
      }
    }
  }
  onBeforeMount(() => {
    fullscreenFillerNode = document.createElement("span");
  });
  onMounted(() => {
    props.fullscreen === true && setFullscreen();
  });
  onBeforeUnmount(exitFullscreen);
  Object.assign(proxy, {
    toggleFullscreen,
    setFullscreen,
    exitFullscreen
  });
  return {
    inFullscreen,
    toggleFullscreen
  };
}
function sortDate(a, b) {
  return new Date(a) - new Date(b);
}
const useTableSortProps = {
  sortMethod: Function,
  binaryStateSort: Boolean,
  columnSortOrder: {
    type: String,
    validator: (v) => v === "ad" || v === "da",
    default: "ad"
  }
};
function useTableSort(props, computedPagination, colList, setPagination) {
  const columnToSort = computed(() => {
    const { sortBy } = computedPagination.value;
    return sortBy ? colList.value.find((def) => def.name === sortBy) || null : null;
  });
  const computedSortMethod = computed(() => props.sortMethod !== void 0 ? props.sortMethod : (data, sortBy, descending) => {
    const col = colList.value.find((def) => def.name === sortBy);
    if (col === void 0 || col.field === void 0) {
      return data;
    }
    const dir = descending === true ? -1 : 1, val = typeof col.field === "function" ? (v) => col.field(v) : (v) => v[col.field];
    return data.sort((a, b) => {
      let A = val(a), B = val(b);
      if (col.rawSort !== void 0) {
        return col.rawSort(A, B, a, b) * dir;
      }
      if (A === null || A === void 0) {
        return -1 * dir;
      }
      if (B === null || B === void 0) {
        return 1 * dir;
      }
      if (col.sort !== void 0) {
        return col.sort(A, B, a, b) * dir;
      }
      if (isNumber(A) === true && isNumber(B) === true) {
        return (A - B) * dir;
      }
      if (isDate(A) === true && isDate(B) === true) {
        return sortDate(A, B) * dir;
      }
      if (typeof A === "boolean" && typeof B === "boolean") {
        return (A - B) * dir;
      }
      [A, B] = [A, B].map((s) => (s + "").toLocaleString().toLowerCase());
      return A < B ? -1 * dir : A === B ? 0 : dir;
    });
  });
  function sort(col) {
    let sortOrder = props.columnSortOrder;
    if (isObject(col) === true) {
      if (col.sortOrder) {
        sortOrder = col.sortOrder;
      }
      col = col.name;
    } else {
      const def = colList.value.find((def2) => def2.name === col);
      if (def?.sortOrder) {
        sortOrder = def.sortOrder;
      }
    }
    let { sortBy, descending } = computedPagination.value;
    if (sortBy !== col) {
      sortBy = col;
      descending = sortOrder === "da";
    } else if (props.binaryStateSort === true) {
      descending = !descending;
    } else if (descending === true) {
      if (sortOrder === "ad") {
        sortBy = null;
      } else {
        descending = false;
      }
    } else {
      if (sortOrder === "ad") {
        descending = true;
      } else {
        sortBy = null;
      }
    }
    setPagination({ sortBy, descending, page: 1 });
  }
  return {
    columnToSort,
    computedSortMethod,
    sort
  };
}
const useTableFilterProps = {
  filter: [String, Object],
  filterMethod: Function
};
function useTableFilter(props, setPagination) {
  const computedFilterMethod = computed(() => props.filterMethod !== void 0 ? props.filterMethod : (rows, terms, cols, cellValue) => {
    const lowerTerms = terms ? terms.toLowerCase() : "";
    return rows.filter(
      (row) => cols.some((col) => {
        const val = cellValue(col, row) + "";
        const haystack = val === "undefined" || val === "null" ? "" : val.toLowerCase();
        return haystack.indexOf(lowerTerms) !== -1;
      })
    );
  });
  watch(
    () => props.filter,
    () => {
      nextTick(() => {
        setPagination({ page: 1 }, true);
      });
    },
    { deep: true }
  );
  return { computedFilterMethod };
}
function samePagination(oldPag, newPag) {
  for (const prop in newPag) {
    if (newPag[prop] !== oldPag[prop]) {
      return false;
    }
  }
  return true;
}
function fixPagination(p) {
  if (p.page < 1) {
    p.page = 1;
  }
  if (p.rowsPerPage !== void 0 && p.rowsPerPage < 1) {
    p.rowsPerPage = 0;
  }
  return p;
}
const useTablePaginationProps = {
  pagination: Object,
  rowsPerPageOptions: {
    type: Array,
    default: () => [5, 7, 10, 15, 20, 25, 50, 0]
  },
  "onUpdate:pagination": [Function, Array]
};
function useTablePaginationState(vm, getCellValue) {
  const { props, emit } = vm;
  const innerPagination = ref(
    Object.assign({
      sortBy: null,
      descending: false,
      page: 1,
      rowsPerPage: props.rowsPerPageOptions.length !== 0 ? props.rowsPerPageOptions[0] : 5
    }, props.pagination)
  );
  const computedPagination = computed(() => {
    const pag = props["onUpdate:pagination"] !== void 0 ? { ...innerPagination.value, ...props.pagination } : innerPagination.value;
    return fixPagination(pag);
  });
  const isServerSide = computed(() => computedPagination.value.rowsNumber !== void 0);
  function sendServerRequest(pagination) {
    requestServerInteraction({
      pagination,
      filter: props.filter
    });
  }
  function requestServerInteraction(prop = {}) {
    nextTick(() => {
      emit("request", {
        pagination: prop.pagination || computedPagination.value,
        filter: prop.filter || props.filter,
        getCellValue
      });
    });
  }
  function setPagination(val, forceServerRequest) {
    const newPagination = fixPagination({
      ...computedPagination.value,
      ...val
    });
    if (samePagination(computedPagination.value, newPagination) === true) {
      if (isServerSide.value === true && forceServerRequest === true) {
        sendServerRequest(newPagination);
      }
      return;
    }
    if (isServerSide.value === true) {
      sendServerRequest(newPagination);
      return;
    }
    if (props.pagination !== void 0 && props["onUpdate:pagination"] !== void 0) {
      emit("update:pagination", newPagination);
    } else {
      innerPagination.value = newPagination;
    }
  }
  return {
    innerPagination,
    computedPagination,
    isServerSide,
    requestServerInteraction,
    setPagination
  };
}
function useTablePagination(vm, innerPagination, computedPagination, isServerSide, setPagination, filteredSortedRowsNumber) {
  const { props, emit, proxy: { $q } } = vm;
  const computedRowsNumber = computed(() => isServerSide.value === true ? computedPagination.value.rowsNumber || 0 : filteredSortedRowsNumber.value);
  const firstRowIndex = computed(() => {
    const { page, rowsPerPage } = computedPagination.value;
    return (page - 1) * rowsPerPage;
  });
  const lastRowIndex = computed(() => {
    const { page, rowsPerPage } = computedPagination.value;
    return page * rowsPerPage;
  });
  const isFirstPage = computed(() => computedPagination.value.page === 1);
  const pagesNumber = computed(() => computedPagination.value.rowsPerPage === 0 ? 1 : Math.max(
    1,
    Math.ceil(computedRowsNumber.value / computedPagination.value.rowsPerPage)
  ));
  const isLastPage = computed(() => lastRowIndex.value === 0 ? true : computedPagination.value.page >= pagesNumber.value);
  const computedRowsPerPageOptions = computed(() => {
    const opts = props.rowsPerPageOptions.includes(innerPagination.value.rowsPerPage) ? props.rowsPerPageOptions : [innerPagination.value.rowsPerPage].concat(props.rowsPerPageOptions);
    return opts.map((count) => ({
      label: count === 0 ? $q.lang.table.allRows : "" + count,
      value: count
    }));
  });
  watch(pagesNumber, (lastPage2, oldLastPage) => {
    if (lastPage2 === oldLastPage) return;
    const currentPage = computedPagination.value.page;
    if (lastPage2 && !currentPage) {
      setPagination({ page: 1 });
    } else if (lastPage2 < currentPage) {
      setPagination({ page: lastPage2 });
    }
  });
  function firstPage() {
    setPagination({ page: 1 });
  }
  function prevPage() {
    const { page } = computedPagination.value;
    if (page > 1) {
      setPagination({ page: page - 1 });
    }
  }
  function nextPage() {
    const { page, rowsPerPage } = computedPagination.value;
    if (lastRowIndex.value > 0 && page * rowsPerPage < computedRowsNumber.value) {
      setPagination({ page: page + 1 });
    }
  }
  function lastPage() {
    setPagination({ page: pagesNumber.value });
  }
  if (props["onUpdate:pagination"] !== void 0) {
    emit("update:pagination", { ...computedPagination.value });
  }
  return {
    firstRowIndex,
    lastRowIndex,
    isFirstPage,
    isLastPage,
    pagesNumber,
    computedRowsPerPageOptions,
    computedRowsNumber,
    firstPage,
    prevPage,
    nextPage,
    lastPage
  };
}
const useTableRowSelectionProps = {
  selection: {
    type: String,
    default: "none",
    validator: (v) => ["single", "multiple", "none"].includes(v)
  },
  selected: {
    type: Array,
    default: () => []
  }
};
const useTableRowSelectionEmits = ["update:selected", "selection"];
function useTableRowSelection(props, emit, computedRows, getRowKey) {
  const selectedKeys = computed(() => {
    const keys = {};
    props.selected.map(getRowKey.value).forEach((key) => {
      keys[key] = true;
    });
    return keys;
  });
  const hasSelectionMode = computed(() => {
    return props.selection !== "none";
  });
  const singleSelection = computed(() => {
    return props.selection === "single";
  });
  const multipleSelection = computed(() => {
    return props.selection === "multiple";
  });
  const allRowsSelected = computed(
    () => computedRows.value.length !== 0 && computedRows.value.every(
      (row) => selectedKeys.value[getRowKey.value(row)] === true
    )
  );
  const someRowsSelected = computed(
    () => allRowsSelected.value !== true && computedRows.value.some((row) => selectedKeys.value[getRowKey.value(row)] === true)
  );
  const rowsSelectedNumber = computed(() => props.selected.length);
  function isRowSelected(key) {
    return selectedKeys.value[key] === true;
  }
  function clearSelection() {
    emit("update:selected", []);
  }
  function updateSelection(keys, rows, added, evt) {
    emit("selection", { rows, added, keys, evt });
    const payload = singleSelection.value === true ? added === true ? rows : [] : added === true ? props.selected.concat(rows) : props.selected.filter(
      (row) => keys.includes(getRowKey.value(row)) === false
    );
    emit("update:selected", payload);
  }
  return {
    hasSelectionMode,
    singleSelection,
    multipleSelection,
    allRowsSelected,
    someRowsSelected,
    rowsSelectedNumber,
    isRowSelected,
    clearSelection,
    updateSelection
  };
}
function getVal(val) {
  return Array.isArray(val) ? val.slice() : [];
}
const useTableRowExpandProps = {
  expanded: Array
  // v-model:expanded
};
const useTableRowExpandEmits = ["update:expanded"];
function useTableRowExpand(props, emit) {
  const innerExpanded = ref(getVal(props.expanded));
  watch(() => props.expanded, (val) => {
    innerExpanded.value = getVal(val);
  });
  function isRowExpanded(key) {
    return innerExpanded.value.includes(key);
  }
  function setExpanded(val) {
    if (props.expanded !== void 0) {
      emit("update:expanded", val);
    } else {
      innerExpanded.value = val;
    }
  }
  function updateExpanded(key, add) {
    const target = innerExpanded.value.slice();
    const index = target.indexOf(key);
    if (add === true) {
      if (index === -1) {
        target.push(key);
        setExpanded(target);
      }
    } else if (index !== -1) {
      target.splice(index, 1);
      setExpanded(target);
    }
  }
  return {
    isRowExpanded,
    setExpanded,
    updateExpanded
  };
}
const useTableColumnSelectionProps = {
  visibleColumns: Array
};
function useTableColumnSelection(props, computedPagination, hasSelectionMode) {
  const colList = computed(() => {
    if (props.columns !== void 0) {
      return props.columns;
    }
    const row = props.rows[0];
    return row !== void 0 ? Object.keys(row).map((name) => ({
      name,
      label: name.toUpperCase(),
      field: name,
      align: isNumber(row[name]) ? "right" : "left",
      sortable: true
    })) : [];
  });
  const computedCols = computed(() => {
    const { sortBy, descending } = computedPagination.value;
    const cols = props.visibleColumns !== void 0 ? colList.value.filter((col) => col.required === true || props.visibleColumns.includes(col.name) === true) : colList.value;
    return cols.map((col) => {
      const align = col.align || "right";
      const alignClass = `text-${align}`;
      return {
        ...col,
        align,
        __iconClass: `q-table__sort-icon q-table__sort-icon--${align}`,
        __thClass: alignClass + (col.headerClasses !== void 0 ? " " + col.headerClasses : "") + (col.sortable === true ? " sortable" : "") + (col.name === sortBy ? ` sorted ${descending === true ? "sort-desc" : ""}` : ""),
        __tdStyle: col.style !== void 0 ? typeof col.style !== "function" ? () => col.style : col.style : () => null,
        __tdClass: col.classes !== void 0 ? typeof col.classes !== "function" ? () => alignClass + " " + col.classes : (row) => alignClass + " " + col.classes(row) : () => alignClass
      };
    });
  });
  const computedColsMap = computed(() => {
    const names = {};
    computedCols.value.forEach((col) => {
      names[col.name] = col;
    });
    return names;
  });
  const computedColspan = computed(() => {
    return props.tableColspan !== void 0 ? props.tableColspan : computedCols.value.length + (hasSelectionMode.value === true ? 1 : 0);
  });
  return {
    colList,
    computedCols,
    computedColsMap,
    computedColspan
  };
}
const bottomClass = "q-table__bottom row items-center";
const virtScrollPassthroughProps = {};
commonVirtScrollPropsList.forEach((p) => {
  virtScrollPassthroughProps[p] = {};
});
const QTable = createComponent({
  name: "QTable",
  props: {
    rows: {
      type: Array,
      required: true
    },
    rowKey: {
      type: [String, Function],
      default: "id"
    },
    columns: Array,
    loading: Boolean,
    iconFirstPage: String,
    iconPrevPage: String,
    iconNextPage: String,
    iconLastPage: String,
    title: String,
    hideHeader: Boolean,
    grid: Boolean,
    gridHeader: Boolean,
    dense: Boolean,
    flat: Boolean,
    bordered: Boolean,
    square: Boolean,
    separator: {
      type: String,
      default: "horizontal",
      validator: (v) => ["horizontal", "vertical", "cell", "none"].includes(v)
    },
    wrapCells: Boolean,
    virtualScroll: Boolean,
    virtualScrollTarget: {},
    ...virtScrollPassthroughProps,
    noDataLabel: String,
    noResultsLabel: String,
    loadingLabel: String,
    selectedRowsLabel: Function,
    rowsPerPageLabel: String,
    paginationLabel: Function,
    color: {
      type: String,
      default: "grey-8"
    },
    titleClass: [String, Array, Object],
    tableStyle: [String, Array, Object],
    tableClass: [String, Array, Object],
    tableHeaderStyle: [String, Array, Object],
    tableHeaderClass: [String, Array, Object],
    tableRowStyleFn: Function,
    tableRowClassFn: Function,
    cardContainerClass: [String, Array, Object],
    cardContainerStyle: [String, Array, Object],
    cardStyle: [String, Array, Object],
    cardClass: [String, Array, Object],
    cardStyleFn: Function,
    cardClassFn: Function,
    hideBottom: Boolean,
    hideSelectedBanner: Boolean,
    hideNoData: Boolean,
    hidePagination: Boolean,
    onRowClick: Function,
    onRowDblclick: Function,
    onRowContextmenu: Function,
    ...useDarkProps,
    ...useFullscreenProps,
    ...useTableColumnSelectionProps,
    ...useTableFilterProps,
    ...useTablePaginationProps,
    ...useTableRowExpandProps,
    ...useTableRowSelectionProps,
    ...useTableSortProps
  },
  emits: [
    "request",
    "virtualScroll",
    ...useFullscreenEmits,
    ...useTableRowExpandEmits,
    ...useTableRowSelectionEmits
  ],
  setup(props, { slots, emit }) {
    const vm = getCurrentInstance();
    const { proxy: { $q } } = vm;
    const isDark = useDark(props, $q);
    const { inFullscreen, toggleFullscreen } = useFullscreen();
    const getRowKey = computed(() => typeof props.rowKey === "function" ? props.rowKey : (row) => row[props.rowKey]);
    const rootRef = ref(null);
    const virtScrollRef = ref(null);
    const hasVirtScroll = computed(() => props.grid !== true && props.virtualScroll === true);
    const cardDefaultClass = computed(
      () => " q-table__card" + (isDark.value === true ? " q-table__card--dark q-dark" : "") + (props.square === true ? " q-table--square" : "") + (props.flat === true ? " q-table--flat" : "") + (props.bordered === true ? " q-table--bordered" : "")
    );
    const containerClass = computed(
      () => `q-table__container q-table--${props.separator}-separator column no-wrap` + (props.grid === true ? " q-table--grid" : cardDefaultClass.value) + (isDark.value === true ? " q-table--dark" : "") + (props.dense === true ? " q-table--dense" : "") + (props.wrapCells === false ? " q-table--no-wrap" : "") + (inFullscreen.value === true ? " fullscreen scroll" : "")
    );
    const rootContainerClass = computed(
      () => containerClass.value + (props.loading === true ? " q-table--loading" : "")
    );
    watch(
      () => props.tableStyle + props.tableClass + props.tableHeaderStyle + props.tableHeaderClass + containerClass.value,
      () => {
        hasVirtScroll.value === true && virtScrollRef.value?.reset();
      }
    );
    const {
      innerPagination,
      computedPagination,
      isServerSide,
      requestServerInteraction,
      setPagination
    } = useTablePaginationState(vm, getCellValue);
    const { computedFilterMethod } = useTableFilter(props, setPagination);
    const { isRowExpanded, setExpanded, updateExpanded } = useTableRowExpand(props, emit);
    const filteredSortedRows = computed(() => {
      let rows = props.rows;
      if (isServerSide.value === true || rows.length === 0) {
        return rows;
      }
      const { sortBy, descending } = computedPagination.value;
      if (props.filter) {
        rows = computedFilterMethod.value(rows, props.filter, computedCols.value, getCellValue);
      }
      if (columnToSort.value !== null) {
        rows = computedSortMethod.value(
          props.rows === rows ? rows.slice() : rows,
          sortBy,
          descending
        );
      }
      return rows;
    });
    const filteredSortedRowsNumber = computed(() => filteredSortedRows.value.length);
    const computedRows = computed(() => {
      let rows = filteredSortedRows.value;
      if (isServerSide.value === true) {
        return rows;
      }
      const { rowsPerPage } = computedPagination.value;
      if (rowsPerPage !== 0) {
        if (firstRowIndex.value === 0 && props.rows !== rows) {
          if (rows.length > lastRowIndex.value) {
            rows = rows.slice(0, lastRowIndex.value);
          }
        } else {
          rows = rows.slice(firstRowIndex.value, lastRowIndex.value);
        }
      }
      return rows;
    });
    const {
      hasSelectionMode,
      singleSelection,
      multipleSelection,
      allRowsSelected,
      someRowsSelected,
      rowsSelectedNumber,
      isRowSelected,
      clearSelection,
      updateSelection
    } = useTableRowSelection(props, emit, computedRows, getRowKey);
    const { colList, computedCols, computedColsMap, computedColspan } = useTableColumnSelection(props, computedPagination, hasSelectionMode);
    const { columnToSort, computedSortMethod, sort } = useTableSort(props, computedPagination, colList, setPagination);
    const {
      firstRowIndex,
      lastRowIndex,
      isFirstPage,
      isLastPage,
      pagesNumber,
      computedRowsPerPageOptions,
      computedRowsNumber,
      firstPage,
      prevPage,
      nextPage,
      lastPage
    } = useTablePagination(vm, innerPagination, computedPagination, isServerSide, setPagination, filteredSortedRowsNumber);
    const nothingToDisplay = computed(() => computedRows.value.length === 0);
    const virtProps = computed(() => {
      const acc = {};
      commonVirtScrollPropsList.forEach((p) => {
        acc[p] = props[p];
      });
      if (acc.virtualScrollItemSize === void 0) {
        acc.virtualScrollItemSize = props.dense === true ? 28 : 48;
      }
      return acc;
    });
    function resetVirtualScroll() {
      hasVirtScroll.value === true && virtScrollRef.value.reset();
    }
    function getBody() {
      if (props.grid === true) {
        return getGridBody();
      }
      const header = props.hideHeader !== true ? getTHead : null;
      if (hasVirtScroll.value === true) {
        const topRow = slots["top-row"];
        const bottomRow = slots["bottom-row"];
        const virtSlots = {
          default: (props2) => getTBodyTR(props2.item, slots.body, props2.index)
        };
        if (topRow !== void 0) {
          const topContent = h("tbody", topRow({ cols: computedCols.value }));
          virtSlots.before = header === null ? () => topContent : () => [header()].concat(topContent);
        } else if (header !== null) {
          virtSlots.before = header;
        }
        if (bottomRow !== void 0) {
          virtSlots.after = () => h("tbody", bottomRow({ cols: computedCols.value }));
        }
        return h(QVirtualScroll, {
          ref: virtScrollRef,
          class: props.tableClass,
          style: props.tableStyle,
          ...virtProps.value,
          scrollTarget: props.virtualScrollTarget,
          items: computedRows.value,
          type: "__qtable",
          tableColspan: computedColspan.value,
          onVirtualScroll: onVScroll
        }, virtSlots);
      }
      const child = [
        getTBody()
      ];
      if (header !== null) {
        child.unshift(header());
      }
      return getTableMiddle({
        class: ["q-table__middle scroll", props.tableClass],
        style: props.tableStyle
      }, child);
    }
    function scrollTo(toIndex, edge) {
      if (virtScrollRef.value !== null) {
        virtScrollRef.value.scrollTo(toIndex, edge);
        return;
      }
      toIndex = parseInt(toIndex, 10);
      const rowEl = rootRef.value.querySelector(`tbody tr:nth-of-type(${toIndex + 1})`);
      if (rowEl !== null) {
        const scrollTarget = rootRef.value.querySelector(".q-table__middle.scroll");
        const offsetTop = rowEl.offsetTop - props.virtualScrollStickySizeStart;
        const direction = offsetTop < scrollTarget.scrollTop ? "decrease" : "increase";
        scrollTarget.scrollTop = offsetTop;
        emit("virtualScroll", {
          index: toIndex,
          from: 0,
          to: innerPagination.value.rowsPerPage - 1,
          direction
        });
      }
    }
    function onVScroll(info) {
      emit("virtualScroll", info);
    }
    function getProgress() {
      return [
        h(QLinearProgress, {
          class: "q-table__linear-progress",
          color: props.color,
          dark: isDark.value,
          indeterminate: true,
          trackColor: "transparent"
        })
      ];
    }
    function getTBodyTR(row, bodySlot, pageIndex) {
      const key = getRowKey.value(row), selected = isRowSelected(key);
      if (bodySlot !== void 0) {
        const cfg = {
          key,
          row,
          pageIndex,
          __trClass: selected ? "selected" : ""
        };
        if (props.tableRowStyleFn !== void 0) {
          cfg.__trStyle = props.tableRowStyleFn(row);
        }
        if (props.tableRowClassFn !== void 0) {
          const cls = props.tableRowClassFn(row);
          if (cls) {
            cfg.__trClass = `${cls} ${cfg.__trClass}`;
          }
        }
        return bodySlot(
          getBodyScope(cfg)
        );
      }
      const bodyCell = slots["body-cell"], child = computedCols.value.map((col) => {
        const bodyCellCol = slots[`body-cell-${col.name}`], slot = bodyCellCol !== void 0 ? bodyCellCol : bodyCell;
        return slot !== void 0 ? slot(getBodyCellScope({ key, row, pageIndex, col })) : h("td", {
          class: col.__tdClass(row),
          style: col.__tdStyle(row)
        }, getCellValue(col, row));
      });
      if (hasSelectionMode.value === true) {
        const slot = slots["body-selection"];
        const content = slot !== void 0 ? slot(getBodySelectionScope({ key, row, pageIndex })) : [
          h(QCheckbox, {
            modelValue: selected,
            color: props.color,
            dark: isDark.value,
            dense: props.dense,
            "onUpdate:modelValue": (adding, evt) => {
              updateSelection([key], [row], adding, evt);
            }
          })
        ];
        child.unshift(
          h("td", { class: "q-table--col-auto-width" }, content)
        );
      }
      const data = { key, class: { selected } };
      if (props.onRowClick !== void 0) {
        data.class["cursor-pointer"] = true;
        data.onClick = (evt) => {
          emit("rowClick", evt, row, pageIndex);
        };
      }
      if (props.onRowDblclick !== void 0) {
        data.class["cursor-pointer"] = true;
        data.onDblclick = (evt) => {
          emit("rowDblclick", evt, row, pageIndex);
        };
      }
      if (props.onRowContextmenu !== void 0) {
        data.class["cursor-pointer"] = true;
        data.onContextmenu = (evt) => {
          emit("rowContextmenu", evt, row, pageIndex);
        };
      }
      if (props.tableRowStyleFn !== void 0) {
        data.style = props.tableRowStyleFn(row);
      }
      if (props.tableRowClassFn !== void 0) {
        const cls = props.tableRowClassFn(row);
        if (cls) {
          data.class[cls] = true;
        }
      }
      return h("tr", data, child);
    }
    function getTBody() {
      const body = slots.body, topRow = slots["top-row"], bottomRow = slots["bottom-row"];
      let child = computedRows.value.map(
        (row, pageIndex) => getTBodyTR(row, body, pageIndex)
      );
      if (topRow !== void 0) {
        child = topRow({ cols: computedCols.value }).concat(child);
      }
      if (bottomRow !== void 0) {
        child = child.concat(bottomRow({ cols: computedCols.value }));
      }
      return h("tbody", child);
    }
    function getBodyScope(data) {
      injectBodyCommonScope(data);
      data.cols = data.cols.map(
        (col) => injectProp({ ...col }, "value", () => getCellValue(col, data.row))
      );
      return data;
    }
    function getBodyCellScope(data) {
      injectBodyCommonScope(data);
      injectProp(data, "value", () => getCellValue(data.col, data.row));
      return data;
    }
    function getBodySelectionScope(data) {
      injectBodyCommonScope(data);
      return data;
    }
    function injectBodyCommonScope(data) {
      Object.assign(data, {
        cols: computedCols.value,
        colsMap: computedColsMap.value,
        sort,
        rowIndex: firstRowIndex.value + data.pageIndex,
        color: props.color,
        dark: isDark.value,
        dense: props.dense
      });
      hasSelectionMode.value === true && injectProp(
        data,
        "selected",
        () => isRowSelected(data.key),
        (adding, evt) => {
          updateSelection([data.key], [data.row], adding, evt);
        }
      );
      injectProp(
        data,
        "expand",
        () => isRowExpanded(data.key),
        (adding) => {
          updateExpanded(data.key, adding);
        }
      );
    }
    function getCellValue(col, row) {
      const val = typeof col.field === "function" ? col.field(row) : row[col.field];
      return col.format !== void 0 ? col.format(val, row) : val;
    }
    const marginalsScope = computed(() => ({
      pagination: computedPagination.value,
      pagesNumber: pagesNumber.value,
      isFirstPage: isFirstPage.value,
      isLastPage: isLastPage.value,
      firstPage,
      prevPage,
      nextPage,
      lastPage,
      inFullscreen: inFullscreen.value,
      toggleFullscreen
    }));
    function getTopDiv() {
      const top = slots.top, topLeft = slots["top-left"], topRight = slots["top-right"], topSelection = slots["top-selection"], hasSelection = hasSelectionMode.value === true && topSelection !== void 0 && rowsSelectedNumber.value > 0, topClass = "q-table__top relative-position row items-center";
      if (top !== void 0) {
        return h("div", { class: topClass }, [top(marginalsScope.value)]);
      }
      let child;
      if (hasSelection === true) {
        child = topSelection(marginalsScope.value).slice();
      } else {
        child = [];
        if (topLeft !== void 0) {
          child.push(
            h("div", { class: "q-table__control" }, [
              topLeft(marginalsScope.value)
            ])
          );
        } else if (props.title) {
          child.push(
            h("div", { class: "q-table__control" }, [
              h("div", {
                class: ["q-table__title", props.titleClass]
              }, props.title)
            ])
          );
        }
      }
      if (topRight !== void 0) {
        child.push(
          h("div", { class: "q-table__separator col" })
        );
        child.push(
          h("div", { class: "q-table__control" }, [
            topRight(marginalsScope.value)
          ])
        );
      }
      if (child.length === 0) return;
      return h("div", { class: topClass }, child);
    }
    const headerSelectedValue = computed(() => someRowsSelected.value === true ? null : allRowsSelected.value);
    function getTHead() {
      const child = getTHeadTR();
      if (props.loading === true && slots.loading === void 0) {
        child.push(
          h("tr", { class: "q-table__progress" }, [
            h("th", {
              class: "relative-position",
              colspan: computedColspan.value
            }, getProgress())
          ])
        );
      }
      return h("thead", child);
    }
    function getTHeadTR() {
      const header = slots.header, headerCell = slots["header-cell"];
      if (header !== void 0) {
        return header(
          getHeaderScope({ header: true })
        ).slice();
      }
      const child = computedCols.value.map((col) => {
        const headerCellCol = slots[`header-cell-${col.name}`], slot = headerCellCol !== void 0 ? headerCellCol : headerCell, props2 = getHeaderScope({ col });
        return slot !== void 0 ? slot(props2) : h(QTh, {
          key: col.name,
          props: props2
        }, () => col.label);
      });
      if (singleSelection.value === true && props.grid !== true) {
        child.unshift(
          h("th", { class: "q-table--col-auto-width" }, " ")
        );
      } else if (multipleSelection.value === true) {
        const slot = slots["header-selection"];
        const content = slot !== void 0 ? slot(getHeaderScope({})) : [
          h(QCheckbox, {
            color: props.color,
            modelValue: headerSelectedValue.value,
            dark: isDark.value,
            dense: props.dense,
            "onUpdate:modelValue": onMultipleSelectionSet
          })
        ];
        child.unshift(
          h("th", { class: "q-table--col-auto-width" }, content)
        );
      }
      return [
        h("tr", {
          class: props.tableHeaderClass,
          style: props.tableHeaderStyle
        }, child)
      ];
    }
    function getHeaderScope(data) {
      Object.assign(data, {
        cols: computedCols.value,
        sort,
        colsMap: computedColsMap.value,
        color: props.color,
        dark: isDark.value,
        dense: props.dense
      });
      if (multipleSelection.value === true) {
        injectProp(
          data,
          "selected",
          () => headerSelectedValue.value,
          onMultipleSelectionSet
        );
      }
      return data;
    }
    function onMultipleSelectionSet(val) {
      if (someRowsSelected.value === true) {
        val = false;
      }
      updateSelection(
        computedRows.value.map(getRowKey.value),
        computedRows.value,
        val
      );
    }
    const navIcon = computed(() => {
      const ico = [
        props.iconFirstPage || $q.iconSet.table.firstPage,
        props.iconPrevPage || $q.iconSet.table.prevPage,
        props.iconNextPage || $q.iconSet.table.nextPage,
        props.iconLastPage || $q.iconSet.table.lastPage
      ];
      return $q.lang.rtl === true ? ico.reverse() : ico;
    });
    function getBottomDiv() {
      if (props.hideBottom === true) return;
      if (nothingToDisplay.value === true) {
        if (props.hideNoData === true) return;
        const message = props.loading === true ? props.loadingLabel || $q.lang.table.loading : props.filter ? props.noResultsLabel || $q.lang.table.noResults : props.noDataLabel || $q.lang.table.noData;
        const noData = slots["no-data"];
        const children = noData !== void 0 ? [noData({ message, icon: $q.iconSet.table.warning, filter: props.filter })] : [
          h(QIcon, {
            class: "q-table__bottom-nodata-icon",
            name: $q.iconSet.table.warning
          }),
          message
        ];
        return h("div", { class: bottomClass + " q-table__bottom--nodata" }, children);
      }
      const bottom = slots.bottom;
      if (bottom !== void 0) {
        return h("div", { class: bottomClass }, [bottom(marginalsScope.value)]);
      }
      const child = props.hideSelectedBanner !== true && hasSelectionMode.value === true && rowsSelectedNumber.value > 0 ? [
        h("div", { class: "q-table__control" }, [
          h("div", [
            (props.selectedRowsLabel || $q.lang.table.selectedRecords)(rowsSelectedNumber.value)
          ])
        ])
      ] : [];
      if (props.hidePagination !== true) {
        return h("div", {
          class: bottomClass + " justify-end"
        }, getPaginationDiv(child));
      }
      if (child.length !== 0) {
        return h("div", { class: bottomClass }, child);
      }
    }
    function onPagSelection(pag) {
      setPagination({
        page: 1,
        rowsPerPage: pag.value
      });
    }
    function getPaginationDiv(child) {
      let control;
      const { rowsPerPage } = computedPagination.value, paginationLabel = props.paginationLabel || $q.lang.table.pagination, paginationSlot = slots.pagination, hasOpts = props.rowsPerPageOptions.length > 1;
      child.push(
        h("div", { class: "q-table__separator col" })
      );
      hasOpts === true && child.push(
        h("div", { class: "q-table__control" }, [
          h("span", { class: "q-table__bottom-item" }, [
            props.rowsPerPageLabel || $q.lang.table.recordsPerPage
          ]),
          h(QSelect, {
            class: "q-table__select inline q-table__bottom-item",
            color: props.color,
            modelValue: rowsPerPage,
            options: computedRowsPerPageOptions.value,
            displayValue: rowsPerPage === 0 ? $q.lang.table.allRows : rowsPerPage,
            dark: isDark.value,
            borderless: true,
            dense: true,
            optionsDense: true,
            optionsCover: true,
            "onUpdate:modelValue": onPagSelection
          })
        ])
      );
      if (paginationSlot !== void 0) {
        control = paginationSlot(marginalsScope.value);
      } else {
        control = [
          h("span", rowsPerPage !== 0 ? { class: "q-table__bottom-item" } : {}, [
            rowsPerPage ? paginationLabel(firstRowIndex.value + 1, Math.min(lastRowIndex.value, computedRowsNumber.value), computedRowsNumber.value) : paginationLabel(1, filteredSortedRowsNumber.value, computedRowsNumber.value)
          ])
        ];
        if (rowsPerPage !== 0 && pagesNumber.value > 1) {
          const btnProps = {
            color: props.color,
            round: true,
            dense: true,
            flat: true
          };
          if (props.dense === true) {
            btnProps.size = "sm";
          }
          pagesNumber.value > 2 && control.push(
            h(QBtn, {
              key: "pgFirst",
              ...btnProps,
              icon: navIcon.value[0],
              disable: isFirstPage.value,
              ariaLabel: $q.lang.pagination.first,
              onClick: firstPage
            })
          );
          control.push(
            h(QBtn, {
              key: "pgPrev",
              ...btnProps,
              icon: navIcon.value[1],
              disable: isFirstPage.value,
              ariaLabel: $q.lang.pagination.prev,
              onClick: prevPage
            }),
            h(QBtn, {
              key: "pgNext",
              ...btnProps,
              icon: navIcon.value[2],
              disable: isLastPage.value,
              ariaLabel: $q.lang.pagination.next,
              onClick: nextPage
            })
          );
          pagesNumber.value > 2 && control.push(
            h(QBtn, {
              key: "pgLast",
              ...btnProps,
              icon: navIcon.value[3],
              disable: isLastPage.value,
              ariaLabel: $q.lang.pagination.last,
              onClick: lastPage
            })
          );
        }
      }
      child.push(
        h("div", { class: "q-table__control" }, control)
      );
      return child;
    }
    function getGridHeader() {
      const child = props.gridHeader === true ? [
        h("table", { class: "q-table" }, [
          getTHead()
        ])
      ] : props.loading === true && slots.loading === void 0 ? getProgress() : void 0;
      return h("div", { class: "q-table__middle" }, child);
    }
    function getGridBody() {
      const item = slots.item !== void 0 ? slots.item : (scope) => {
        const child = scope.cols.map(
          (col) => h("div", { class: "q-table__grid-item-row" }, [
            h("div", { class: "q-table__grid-item-title" }, [col.label]),
            h("div", { class: "q-table__grid-item-value" }, [col.value])
          ])
        );
        if (hasSelectionMode.value === true) {
          const slot = slots["body-selection"];
          const content = slot !== void 0 ? slot(scope) : [
            h(QCheckbox, {
              modelValue: scope.selected,
              color: props.color,
              dark: isDark.value,
              dense: props.dense,
              "onUpdate:modelValue": (adding, evt) => {
                updateSelection([scope.key], [scope.row], adding, evt);
              }
            })
          ];
          child.unshift(
            h("div", { class: "q-table__grid-item-row" }, content),
            h(QSeparator, { dark: isDark.value })
          );
        }
        const data = {
          class: [
            "q-table__grid-item-card" + cardDefaultClass.value,
            props.cardClass
          ],
          style: props.cardStyle
        };
        if (props.cardStyleFn !== void 0) {
          data.style = [data.style, props.cardStyleFn(scope.row)];
        }
        if (props.cardClassFn !== void 0) {
          const cls = props.cardClassFn(scope.row);
          if (cls) {
            data.class[0] += ` ${cls}`;
          }
        }
        if (props.onRowClick !== void 0 || props.onRowDblclick !== void 0 || props.onRowContextmenu !== void 0) {
          data.class[0] += " cursor-pointer";
          if (props.onRowClick !== void 0) {
            data.onClick = (evt) => {
              emit("RowClick", evt, scope.row, scope.pageIndex);
            };
          }
          if (props.onRowDblclick !== void 0) {
            data.onDblclick = (evt) => {
              emit("RowDblclick", evt, scope.row, scope.pageIndex);
            };
          }
          if (props.onRowContextmenu !== void 0) {
            data.onContextmenu = (evt) => {
              emit("rowContextmenu", evt, scope.row, scope.pageIndex);
            };
          }
        }
        return h("div", {
          class: "q-table__grid-item col-xs-12 col-sm-6 col-md-4 col-lg-3" + (scope.selected === true ? " q-table__grid-item--selected" : "")
        }, [
          h("div", data, child)
        ]);
      };
      return h("div", {
        class: [
          "q-table__grid-content row",
          props.cardContainerClass
        ],
        style: props.cardContainerStyle
      }, computedRows.value.map((row, pageIndex) => {
        return item(getBodyScope({
          key: getRowKey.value(row),
          row,
          pageIndex
        }));
      }));
    }
    Object.assign(vm.proxy, {
      requestServerInteraction,
      setPagination,
      firstPage,
      prevPage,
      nextPage,
      lastPage,
      isRowSelected,
      clearSelection,
      isRowExpanded,
      setExpanded,
      sort,
      resetVirtualScroll,
      scrollTo,
      getCellValue
    });
    injectMultipleProps(vm.proxy, {
      filteredSortedRows: () => filteredSortedRows.value,
      computedRows: () => computedRows.value,
      computedRowsNumber: () => computedRowsNumber.value
    });
    return () => {
      const child = [getTopDiv()];
      const data = { ref: rootRef, class: rootContainerClass.value };
      if (props.grid === true) {
        child.push(getGridHeader());
      } else {
        Object.assign(data, {
          class: [data.class, props.cardClass],
          style: props.cardStyle
        });
      }
      child.push(
        getBody(),
        getBottomDiv()
      );
      if (props.loading === true && slots.loading !== void 0) {
        child.push(
          slots.loading()
        );
      }
      return h("div", data, child);
    };
  }
});
export {
  QTable as Q
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUVRhYmxlLUJGWVN3QksyLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3RhYmxlL1FUaC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvbWFya3VwLXRhYmxlL1FNYXJrdXBUYWJsZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvdGFibGUvZ2V0LXRhYmxlLW1pZGRsZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvdmlydHVhbC1zY3JvbGwvUVZpcnR1YWxTY3JvbGwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2xpbmVhci1wcm9ncmVzcy9RTGluZWFyUHJvZ3Jlc3MuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1mdWxsc2NyZWVuL3VzZS1mdWxsc2NyZWVuLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvcHJpdmF0ZS5zb3J0L3NvcnQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3RhYmxlL3RhYmxlLXNvcnQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3RhYmxlL3RhYmxlLWZpbHRlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvdGFibGUvdGFibGUtcGFnaW5hdGlvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvdGFibGUvdGFibGUtcm93LXNlbGVjdGlvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvdGFibGUvdGFibGUtcm93LWV4cGFuZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvdGFibGUvdGFibGUtY29sdW1uLXNlbGVjdGlvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvdGFibGUvUVRhYmxlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGgsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFFJY29uIGZyb20gJy4uL2ljb24vUUljb24uanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhTbG90LCBoVW5pcXVlU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FUaCcsXG5cbiAgcHJvcHM6IHtcbiAgICBwcm9wczogT2JqZWN0LFxuICAgIGF1dG9XaWR0aDogQm9vbGVhblxuICB9LFxuXG4gIGVtaXRzOiBbICdjbGljaycgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQgfSkge1xuICAgIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCB7IHByb3h5OiB7ICRxIH0gfSA9IHZtXG5cbiAgICBjb25zdCBvbkNsaWNrID0gZXZ0ID0+IHsgZW1pdCgnY2xpY2snLCBldnQpIH1cblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpZiAocHJvcHMucHJvcHMgPT09IHZvaWQgMCkge1xuICAgICAgICByZXR1cm4gaCgndGgnLCB7XG4gICAgICAgICAgY2xhc3M6IHByb3BzLmF1dG9XaWR0aCA9PT0gdHJ1ZSA/ICdxLXRhYmxlLS1jb2wtYXV0by13aWR0aCcgOiAnJyxcbiAgICAgICAgICBvbkNsaWNrXG4gICAgICAgIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICAgICAgfVxuXG4gICAgICBsZXQgY29sLCBjaGlsZFxuICAgICAgY29uc3QgbmFtZSA9IHZtLnZub2RlLmtleVxuXG4gICAgICBpZiAobmFtZSkge1xuICAgICAgICBjb2wgPSBwcm9wcy5wcm9wcy5jb2xzTWFwWyBuYW1lIF1cbiAgICAgICAgaWYgKGNvbCA9PT0gdm9pZCAwKSByZXR1cm5cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb2wgPSBwcm9wcy5wcm9wcy5jb2xcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbC5zb3J0YWJsZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBhY3Rpb24gPSBjb2wuYWxpZ24gPT09ICdyaWdodCdcbiAgICAgICAgICA/ICd1bnNoaWZ0J1xuICAgICAgICAgIDogJ3B1c2gnXG5cbiAgICAgICAgY2hpbGQgPSBoVW5pcXVlU2xvdChzbG90cy5kZWZhdWx0LCBbXSlcbiAgICAgICAgY2hpbGRbIGFjdGlvbiBdKFxuICAgICAgICAgIGgoUUljb24sIHtcbiAgICAgICAgICAgIGNsYXNzOiBjb2wuX19pY29uQ2xhc3MsXG4gICAgICAgICAgICBuYW1lOiAkcS5pY29uU2V0LnRhYmxlLmFycm93VXBcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY2hpbGQgPSBoU2xvdChzbG90cy5kZWZhdWx0KVxuICAgICAgfVxuXG4gICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICBjbGFzczogY29sLl9fdGhDbGFzc1xuICAgICAgICAgICsgKHByb3BzLmF1dG9XaWR0aCA9PT0gdHJ1ZSA/ICcgcS10YWJsZS0tY29sLWF1dG8td2lkdGgnIDogJycpLFxuICAgICAgICBzdHlsZTogY29sLmhlYWRlclN0eWxlLFxuICAgICAgICBvbkNsaWNrOiBldnQgPT4ge1xuICAgICAgICAgIGNvbC5zb3J0YWJsZSA9PT0gdHJ1ZSAmJiBwcm9wcy5wcm9wcy5zb3J0KGNvbClcbiAgICAgICAgICBvbkNsaWNrKGV2dClcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gaCgndGgnLCBkYXRhLCBjaGlsZClcbiAgICB9XG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBoLCBjb21wdXRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlRGFyaywgeyB1c2VEYXJrUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1kYXJrL3VzZS1kYXJrLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcblxuY29uc3Qgc2VwYXJhdG9yVmFsdWVzID0gWyAnaG9yaXpvbnRhbCcsICd2ZXJ0aWNhbCcsICdjZWxsJywgJ25vbmUnIF1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FNYXJrdXBUYWJsZScsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VEYXJrUHJvcHMsXG5cbiAgICBkZW5zZTogQm9vbGVhbixcbiAgICBmbGF0OiBCb29sZWFuLFxuICAgIGJvcmRlcmVkOiBCb29sZWFuLFxuICAgIHNxdWFyZTogQm9vbGVhbixcbiAgICB3cmFwQ2VsbHM6IEJvb2xlYW4sXG5cbiAgICBzZXBhcmF0b3I6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdob3Jpem9udGFsJyxcbiAgICAgIHZhbGlkYXRvcjogdiA9PiBzZXBhcmF0b3JWYWx1ZXMuaW5jbHVkZXModilcbiAgICB9XG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCB2bSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgY29uc3QgaXNEYXJrID0gdXNlRGFyayhwcm9wcywgdm0ucHJveHkuJHEpXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLW1hcmt1cC10YWJsZSBxLXRhYmxlX19jb250YWluZXIgcS10YWJsZV9fY2FyZCdcbiAgICAgICsgYCBxLXRhYmxlLS0keyBwcm9wcy5zZXBhcmF0b3IgfS1zZXBhcmF0b3JgXG4gICAgICArIChpc0RhcmsudmFsdWUgPT09IHRydWUgPyAnIHEtdGFibGUtLWRhcmsgcS10YWJsZV9fY2FyZC0tZGFyayBxLWRhcmsnIDogJycpXG4gICAgICArIChwcm9wcy5kZW5zZSA9PT0gdHJ1ZSA/ICcgcS10YWJsZS0tZGVuc2UnIDogJycpXG4gICAgICArIChwcm9wcy5mbGF0ID09PSB0cnVlID8gJyBxLXRhYmxlLS1mbGF0JyA6ICcnKVxuICAgICAgKyAocHJvcHMuYm9yZGVyZWQgPT09IHRydWUgPyAnIHEtdGFibGUtLWJvcmRlcmVkJyA6ICcnKVxuICAgICAgKyAocHJvcHMuc3F1YXJlID09PSB0cnVlID8gJyBxLXRhYmxlLS1zcXVhcmUnIDogJycpXG4gICAgICArIChwcm9wcy53cmFwQ2VsbHMgPT09IGZhbHNlID8gJyBxLXRhYmxlLS1uby13cmFwJyA6ICcnKVxuICAgIClcblxuICAgIHJldHVybiAoKSA9PiBoKCdkaXYnLCB7XG4gICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZVxuICAgIH0sIFtcbiAgICAgIGgoJ3RhYmxlJywgeyBjbGFzczogJ3EtdGFibGUnIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICAgIF0pXG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBoIH0gZnJvbSAndnVlJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIGNvbnRlbnQpIHtcbiAgcmV0dXJuIGgoJ2RpdicsIHByb3BzLCBbXG4gICAgaCgndGFibGUnLCB7IGNsYXNzOiAncS10YWJsZScgfSwgY29udGVudClcbiAgXSlcbn1cbiIsImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIHdhdGNoLCBvbkJlZm9yZU1vdW50LCBvbk1vdW50ZWQsIG9uQmVmb3JlVW5tb3VudCwgb25BY3RpdmF0ZWQsIG9uRGVhY3RpdmF0ZWQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBRTGlzdCBmcm9tICcuLi9pdGVtL1FMaXN0LmpzJ1xuaW1wb3J0IFFNYXJrdXBUYWJsZSBmcm9tICcuLi9tYXJrdXAtdGFibGUvUU1hcmt1cFRhYmxlLmpzJ1xuaW1wb3J0IGdldFRhYmxlTWlkZGxlIGZyb20gJy4uL3RhYmxlL2dldC10YWJsZS1taWRkbGUuanMnXG5cbmltcG9ydCB7IHVzZVZpcnR1YWxTY3JvbGwsIHVzZVZpcnR1YWxTY3JvbGxQcm9wcyB9IGZyb20gJy4vdXNlLXZpcnR1YWwtc2Nyb2xsLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBnZXRTY3JvbGxUYXJnZXQsIHNjcm9sbFRhcmdldFByb3AgfSBmcm9tICcuLi8uLi91dGlscy9zY3JvbGwvc2Nyb2xsLmpzJ1xuaW1wb3J0IHsgbGlzdGVuT3B0cyB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50L2V2ZW50LmpzJ1xuaW1wb3J0IHsgaE1lcmdlU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcblxuY29uc3QgY29tcHMgPSB7XG4gIGxpc3Q6IFFMaXN0LFxuICB0YWJsZTogUU1hcmt1cFRhYmxlXG59XG5cbmNvbnN0IHR5cGVPcHRpb25zID0gWyAnbGlzdCcsICd0YWJsZScsICdfX3F0YWJsZScgXVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVZpcnR1YWxTY3JvbGwnLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlVmlydHVhbFNjcm9sbFByb3BzLFxuXG4gICAgdHlwZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2xpc3QnLFxuICAgICAgdmFsaWRhdG9yOiB2ID0+IHR5cGVPcHRpb25zLmluY2x1ZGVzKHYpXG4gICAgfSxcblxuICAgIGl0ZW1zOiB7XG4gICAgICB0eXBlOiBBcnJheSxcbiAgICAgIGRlZmF1bHQ6ICgpID0+IFtdXG4gICAgfSxcblxuICAgIGl0ZW1zRm46IEZ1bmN0aW9uLFxuICAgIGl0ZW1zU2l6ZTogTnVtYmVyLFxuXG4gICAgc2Nyb2xsVGFyZ2V0OiBzY3JvbGxUYXJnZXRQcm9wXG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBhdHRycyB9KSB7XG4gICAgbGV0IGxvY2FsU2Nyb2xsVGFyZ2V0XG4gICAgY29uc3Qgcm9vdFJlZiA9IHJlZihudWxsKVxuXG4gICAgY29uc3QgdmlydHVhbFNjcm9sbExlbmd0aCA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLml0ZW1zU2l6ZSA+PSAwICYmIHByb3BzLml0ZW1zRm4gIT09IHZvaWQgMFxuICAgICAgICA/IHBhcnNlSW50KHByb3BzLml0ZW1zU2l6ZSwgMTApXG4gICAgICAgIDogKEFycmF5LmlzQXJyYXkocHJvcHMuaXRlbXMpID8gcHJvcHMuaXRlbXMubGVuZ3RoIDogMClcbiAgICApKVxuXG4gICAgY29uc3Qge1xuICAgICAgdmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UsXG4gICAgICBsb2NhbFJlc2V0VmlydHVhbFNjcm9sbCxcbiAgICAgIHBhZFZpcnR1YWxTY3JvbGwsXG4gICAgICBvblZpcnR1YWxTY3JvbGxFdnRcbiAgICB9ID0gdXNlVmlydHVhbFNjcm9sbCh7XG4gICAgICB2aXJ0dWFsU2Nyb2xsTGVuZ3RoLCBnZXRWaXJ0dWFsU2Nyb2xsVGFyZ2V0LCBnZXRWaXJ0dWFsU2Nyb2xsRWxcbiAgICB9KVxuXG4gICAgY29uc3QgdmlydHVhbFNjcm9sbFNjb3BlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgaWYgKHZpcnR1YWxTY3JvbGxMZW5ndGgudmFsdWUgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIFtdXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1hcEZuID0gKGl0ZW0sIGkpID0+ICh7XG4gICAgICAgIGluZGV4OiB2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZS52YWx1ZS5mcm9tICsgaSxcbiAgICAgICAgaXRlbVxuICAgICAgfSlcblxuICAgICAgcmV0dXJuIHByb3BzLml0ZW1zRm4gPT09IHZvaWQgMFxuICAgICAgICA/IHByb3BzLml0ZW1zLnNsaWNlKHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLnZhbHVlLmZyb20sIHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLnZhbHVlLnRvKS5tYXAobWFwRm4pXG4gICAgICAgIDogcHJvcHMuaXRlbXNGbih2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZS52YWx1ZS5mcm9tLCB2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZS52YWx1ZS50byAtIHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLnZhbHVlLmZyb20pLm1hcChtYXBGbilcbiAgICB9KVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS12aXJ0dWFsLXNjcm9sbCBxLXZpcnR1YWwtc2Nyb2xsJyArIChwcm9wcy52aXJ0dWFsU2Nyb2xsSG9yaXpvbnRhbCA9PT0gdHJ1ZSA/ICctLWhvcml6b250YWwnIDogJy0tdmVydGljYWwnKVxuICAgICAgKyAocHJvcHMuc2Nyb2xsVGFyZ2V0ICE9PSB2b2lkIDAgPyAnJyA6ICcgc2Nyb2xsJylcbiAgICApXG5cbiAgICBjb25zdCBhdHRyaWJ1dGVzID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMuc2Nyb2xsVGFyZ2V0ICE9PSB2b2lkIDAgPyB7fSA6IHsgdGFiaW5kZXg6IDAgfVxuICAgICkpXG5cbiAgICB3YXRjaCh2aXJ0dWFsU2Nyb2xsTGVuZ3RoLCAoKSA9PiB7XG4gICAgICBsb2NhbFJlc2V0VmlydHVhbFNjcm9sbCgpXG4gICAgfSlcblxuICAgIHdhdGNoKCgpID0+IHByb3BzLnNjcm9sbFRhcmdldCwgKCkgPT4ge1xuICAgICAgdW5jb25maWd1cmVTY3JvbGxUYXJnZXQoKVxuICAgICAgY29uZmlndXJlU2Nyb2xsVGFyZ2V0KClcbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gZ2V0VmlydHVhbFNjcm9sbEVsICgpIHtcbiAgICAgIHJldHVybiByb290UmVmLnZhbHVlLiRlbCB8fCByb290UmVmLnZhbHVlXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VmlydHVhbFNjcm9sbFRhcmdldCAoKSB7XG4gICAgICByZXR1cm4gbG9jYWxTY3JvbGxUYXJnZXRcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb25maWd1cmVTY3JvbGxUYXJnZXQgKCkge1xuICAgICAgbG9jYWxTY3JvbGxUYXJnZXQgPSBnZXRTY3JvbGxUYXJnZXQoZ2V0VmlydHVhbFNjcm9sbEVsKCksIHByb3BzLnNjcm9sbFRhcmdldClcbiAgICAgIGxvY2FsU2Nyb2xsVGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIG9uVmlydHVhbFNjcm9sbEV2dCwgbGlzdGVuT3B0cy5wYXNzaXZlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVuY29uZmlndXJlU2Nyb2xsVGFyZ2V0ICgpIHtcbiAgICAgIGlmIChsb2NhbFNjcm9sbFRhcmdldCAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGxvY2FsU2Nyb2xsVGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIG9uVmlydHVhbFNjcm9sbEV2dCwgbGlzdGVuT3B0cy5wYXNzaXZlKVxuICAgICAgICBsb2NhbFNjcm9sbFRhcmdldCA9IHZvaWQgMFxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9fZ2V0VmlydHVhbENoaWxkcmVuICgpIHtcbiAgICAgIGxldCBjaGlsZCA9IHBhZFZpcnR1YWxTY3JvbGwoXG4gICAgICAgIHByb3BzLnR5cGUgPT09ICdsaXN0JyA/ICdkaXYnIDogJ3Rib2R5JyxcbiAgICAgICAgdmlydHVhbFNjcm9sbFNjb3BlLnZhbHVlLm1hcChzbG90cy5kZWZhdWx0KVxuICAgICAgKVxuXG4gICAgICBpZiAoc2xvdHMuYmVmb3JlICE9PSB2b2lkIDApIHtcbiAgICAgICAgY2hpbGQgPSBzbG90cy5iZWZvcmUoKS5jb25jYXQoY2hpbGQpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoTWVyZ2VTbG90KHNsb3RzLmFmdGVyLCBjaGlsZClcbiAgICB9XG5cbiAgICBvbkJlZm9yZU1vdW50KCgpID0+IHtcbiAgICAgIGxvY2FsUmVzZXRWaXJ0dWFsU2Nyb2xsKClcbiAgICB9KVxuXG4gICAgb25Nb3VudGVkKCgpID0+IHtcbiAgICAgIGNvbmZpZ3VyZVNjcm9sbFRhcmdldCgpXG4gICAgfSlcblxuICAgIG9uQWN0aXZhdGVkKCgpID0+IHtcbiAgICAgIGNvbmZpZ3VyZVNjcm9sbFRhcmdldCgpXG4gICAgfSlcblxuICAgIG9uRGVhY3RpdmF0ZWQoKCkgPT4ge1xuICAgICAgdW5jb25maWd1cmVTY3JvbGxUYXJnZXQoKVxuICAgIH0pXG5cbiAgICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgICAgdW5jb25maWd1cmVTY3JvbGxUYXJnZXQoKVxuICAgIH0pXG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaWYgKHNsb3RzLmRlZmF1bHQgPT09IHZvaWQgMCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdRVmlydHVhbFNjcm9sbDogZGVmYXVsdCBzY29wZWQgc2xvdCBpcyByZXF1aXJlZCBmb3IgcmVuZGVyaW5nJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcm9wcy50eXBlID09PSAnX19xdGFibGUnXG4gICAgICAgID8gZ2V0VGFibGVNaWRkbGUoXG4gICAgICAgICAgeyByZWY6IHJvb3RSZWYsIGNsYXNzOiAncS10YWJsZV9fbWlkZGxlICcgKyBjbGFzc2VzLnZhbHVlIH0sXG4gICAgICAgICAgX19nZXRWaXJ0dWFsQ2hpbGRyZW4oKVxuICAgICAgICApXG4gICAgICAgIDogaChjb21wc1sgcHJvcHMudHlwZSBdLCB7XG4gICAgICAgICAgLi4uYXR0cnMsXG4gICAgICAgICAgcmVmOiByb290UmVmLFxuICAgICAgICAgIGNsYXNzOiBbIGF0dHJzLmNsYXNzLCBjbGFzc2VzLnZhbHVlIF0sXG4gICAgICAgICAgLi4uYXR0cmlidXRlcy52YWx1ZVxuICAgICAgICB9LCBfX2dldFZpcnR1YWxDaGlsZHJlbilcbiAgICB9XG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBoLCBjb21wdXRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlRGFyaywgeyB1c2VEYXJrUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1kYXJrL3VzZS1kYXJrLmpzJ1xuaW1wb3J0IHVzZVNpemUsIHsgdXNlU2l6ZVByb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2Utc2l6ZS91c2Utc2l6ZS5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaE1lcmdlU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcblxuY29uc3QgZGVmYXVsdFNpemVzID0ge1xuICB4czogMixcbiAgc206IDQsXG4gIG1kOiA2LFxuICBsZzogMTAsXG4gIHhsOiAxNFxufVxuXG5mdW5jdGlvbiB3aWR0aCAodmFsLCByZXZlcnNlLCAkcSkge1xuICByZXR1cm4ge1xuICAgIHRyYW5zZm9ybTogcmV2ZXJzZSA9PT0gdHJ1ZVxuICAgICAgPyBgdHJhbnNsYXRlWCgkeyAkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/ICctJyA6ICcnIH0xMDAlKSBzY2FsZTNkKCR7IC12YWwgfSwxLDEpYFxuICAgICAgOiBgc2NhbGUzZCgkeyB2YWwgfSwxLDEpYFxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRTGluZWFyUHJvZ3Jlc3MnLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlRGFya1Byb3BzLFxuICAgIC4uLnVzZVNpemVQcm9wcyxcblxuICAgIHZhbHVlOiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICBkZWZhdWx0OiAwXG4gICAgfSxcbiAgICBidWZmZXI6IE51bWJlcixcblxuICAgIGNvbG9yOiBTdHJpbmcsXG4gICAgdHJhY2tDb2xvcjogU3RyaW5nLFxuXG4gICAgcmV2ZXJzZTogQm9vbGVhbixcbiAgICBzdHJpcGU6IEJvb2xlYW4sXG4gICAgaW5kZXRlcm1pbmF0ZTogQm9vbGVhbixcbiAgICBxdWVyeTogQm9vbGVhbixcbiAgICByb3VuZGVkOiBCb29sZWFuLFxuXG4gICAgYW5pbWF0aW9uU3BlZWQ6IHtcbiAgICAgIHR5cGU6IFsgU3RyaW5nLCBOdW1iZXIgXSxcbiAgICAgIGRlZmF1bHQ6IDIxMDBcbiAgICB9LFxuXG4gICAgaW5zdGFudEZlZWRiYWNrOiBCb29sZWFuXG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCB7IHByb3h5IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICAgIGNvbnN0IGlzRGFyayA9IHVzZURhcmsocHJvcHMsIHByb3h5LiRxKVxuICAgIGNvbnN0IHNpemVTdHlsZSA9IHVzZVNpemUocHJvcHMsIGRlZmF1bHRTaXplcylcblxuICAgIGNvbnN0IG1vdGlvbiA9IGNvbXB1dGVkKCgpID0+IHByb3BzLmluZGV0ZXJtaW5hdGUgPT09IHRydWUgfHwgcHJvcHMucXVlcnkgPT09IHRydWUpXG4gICAgY29uc3Qgd2lkdGhSZXZlcnNlID0gY29tcHV0ZWQoKCkgPT4gcHJvcHMucmV2ZXJzZSAhPT0gcHJvcHMucXVlcnkpXG4gICAgY29uc3Qgc3R5bGUgPSBjb21wdXRlZCgoKSA9PiAoe1xuICAgICAgLi4uKHNpemVTdHlsZS52YWx1ZSAhPT0gbnVsbCA/IHNpemVTdHlsZS52YWx1ZSA6IHt9KSxcbiAgICAgICctLXEtbGluZWFyLXByb2dyZXNzLXNwZWVkJzogYCR7IHByb3BzLmFuaW1hdGlvblNwZWVkIH1tc2BcbiAgICB9KSlcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtbGluZWFyLXByb2dyZXNzJ1xuICAgICAgKyAocHJvcHMuY29sb3IgIT09IHZvaWQgMCA/IGAgdGV4dC0keyBwcm9wcy5jb2xvciB9YCA6ICcnKVxuICAgICAgKyAocHJvcHMucmV2ZXJzZSA9PT0gdHJ1ZSB8fCBwcm9wcy5xdWVyeSA9PT0gdHJ1ZSA/ICcgcS1saW5lYXItcHJvZ3Jlc3MtLXJldmVyc2UnIDogJycpXG4gICAgICArIChwcm9wcy5yb3VuZGVkID09PSB0cnVlID8gJyByb3VuZGVkLWJvcmRlcnMnIDogJycpXG4gICAgKVxuXG4gICAgY29uc3QgdHJhY2tTdHlsZSA9IGNvbXB1dGVkKCgpID0+IHdpZHRoKHByb3BzLmJ1ZmZlciAhPT0gdm9pZCAwID8gcHJvcHMuYnVmZmVyIDogMSwgd2lkdGhSZXZlcnNlLnZhbHVlLCBwcm94eS4kcSkpXG4gICAgY29uc3QgdHJhbnNpdGlvblN1ZmZpeCA9IGNvbXB1dGVkKCgpID0+IGB3aXRoJHsgcHJvcHMuaW5zdGFudEZlZWRiYWNrID09PSB0cnVlID8gJ291dCcgOiAnJyB9LXRyYW5zaXRpb25gKVxuXG4gICAgY29uc3QgdHJhY2tDbGFzcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1saW5lYXItcHJvZ3Jlc3NfX3RyYWNrIGFic29sdXRlLWZ1bGwnXG4gICAgICArIGAgcS1saW5lYXItcHJvZ3Jlc3NfX3RyYWNrLS0keyB0cmFuc2l0aW9uU3VmZml4LnZhbHVlIH1gXG4gICAgICArIGAgcS1saW5lYXItcHJvZ3Jlc3NfX3RyYWNrLS0keyBpc0RhcmsudmFsdWUgPT09IHRydWUgPyAnZGFyaycgOiAnbGlnaHQnIH1gXG4gICAgICArIChwcm9wcy50cmFja0NvbG9yICE9PSB2b2lkIDAgPyBgIGJnLSR7IHByb3BzLnRyYWNrQ29sb3IgfWAgOiAnJylcbiAgICApXG5cbiAgICBjb25zdCBtb2RlbFN0eWxlID0gY29tcHV0ZWQoKCkgPT4gd2lkdGgobW90aW9uLnZhbHVlID09PSB0cnVlID8gMSA6IHByb3BzLnZhbHVlLCB3aWR0aFJldmVyc2UudmFsdWUsIHByb3h5LiRxKSlcbiAgICBjb25zdCBtb2RlbENsYXNzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLWxpbmVhci1wcm9ncmVzc19fbW9kZWwgYWJzb2x1dGUtZnVsbCdcbiAgICAgICsgYCBxLWxpbmVhci1wcm9ncmVzc19fbW9kZWwtLSR7IHRyYW5zaXRpb25TdWZmaXgudmFsdWUgfWBcbiAgICAgICsgYCBxLWxpbmVhci1wcm9ncmVzc19fbW9kZWwtLSR7IG1vdGlvbi52YWx1ZSA9PT0gdHJ1ZSA/ICdpbicgOiAnJyB9ZGV0ZXJtaW5hdGVgXG4gICAgKVxuXG4gICAgY29uc3Qgc3RyaXBlU3R5bGUgPSBjb21wdXRlZCgoKSA9PiAoeyB3aWR0aDogYCR7IHByb3BzLnZhbHVlICogMTAwIH0lYCB9KSlcbiAgICBjb25zdCBzdHJpcGVDbGFzcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBgcS1saW5lYXItcHJvZ3Jlc3NfX3N0cmlwZSBhYnNvbHV0ZS0keyBwcm9wcy5yZXZlcnNlID09PSB0cnVlID8gJ3JpZ2h0JyA6ICdsZWZ0JyB9YFxuICAgICAgKyBgIHEtbGluZWFyLXByb2dyZXNzX19zdHJpcGUtLSR7IHRyYW5zaXRpb25TdWZmaXgudmFsdWUgfWBcbiAgICApXG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY29uc3QgY2hpbGQgPSBbXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogdHJhY2tDbGFzcy52YWx1ZSxcbiAgICAgICAgICBzdHlsZTogdHJhY2tTdHlsZS52YWx1ZVxuICAgICAgICB9KSxcblxuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6IG1vZGVsQ2xhc3MudmFsdWUsXG4gICAgICAgICAgc3R5bGU6IG1vZGVsU3R5bGUudmFsdWVcbiAgICAgICAgfSlcbiAgICAgIF1cblxuICAgICAgcHJvcHMuc3RyaXBlID09PSB0cnVlICYmIG1vdGlvbi52YWx1ZSA9PT0gZmFsc2UgJiYgY2hpbGQucHVzaChcbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiBzdHJpcGVDbGFzcy52YWx1ZSxcbiAgICAgICAgICBzdHlsZTogc3RyaXBlU3R5bGUudmFsdWVcbiAgICAgICAgfSlcbiAgICAgIClcblxuICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWUsXG4gICAgICAgIHN0eWxlOiBzdHlsZS52YWx1ZSxcbiAgICAgICAgcm9sZTogJ3Byb2dyZXNzYmFyJyxcbiAgICAgICAgJ2FyaWEtdmFsdWVtaW4nOiAwLFxuICAgICAgICAnYXJpYS12YWx1ZW1heCc6IDEsXG4gICAgICAgICdhcmlhLXZhbHVlbm93JzogcHJvcHMuaW5kZXRlcm1pbmF0ZSA9PT0gdHJ1ZVxuICAgICAgICAgID8gdm9pZCAwXG4gICAgICAgICAgOiBwcm9wcy52YWx1ZVxuICAgICAgfSwgaE1lcmdlU2xvdChzbG90cy5kZWZhdWx0LCBjaGlsZCkpXG4gICAgfVxuICB9XG59KVxuIiwiaW1wb3J0IHsgcmVmLCB3YXRjaCwgb25CZWZvcmVNb3VudCwgb25Nb3VudGVkLCBvbkJlZm9yZVVubW91bnQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IEhpc3RvcnkgZnJvbSAnLi4vLi4vcGx1Z2lucy9wcml2YXRlLmhpc3RvcnkvSGlzdG9yeS5qcydcbmltcG9ydCB7IHZtSGFzUm91dGVyIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS52bS92bS5qcydcblxubGV0IGNvdW50ZXIgPSAwXG5cbmV4cG9ydCBjb25zdCB1c2VGdWxsc2NyZWVuUHJvcHMgPSB7XG4gIGZ1bGxzY3JlZW46IEJvb2xlYW4sXG4gIG5vUm91dGVGdWxsc2NyZWVuRXhpdDogQm9vbGVhblxufVxuXG5leHBvcnQgY29uc3QgdXNlRnVsbHNjcmVlbkVtaXRzID0gWyAndXBkYXRlOmZ1bGxzY3JlZW4nLCAnZnVsbHNjcmVlbicgXVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgY29uc3QgeyBwcm9wcywgZW1pdCwgcHJveHkgfSA9IHZtXG5cbiAgbGV0IGhpc3RvcnlFbnRyeSwgZnVsbHNjcmVlbkZpbGxlck5vZGUsIGNvbnRhaW5lclxuICBjb25zdCBpbkZ1bGxzY3JlZW4gPSByZWYoZmFsc2UpXG5cbiAgdm1IYXNSb3V0ZXIodm0pID09PSB0cnVlICYmIHdhdGNoKCgpID0+IHByb3h5LiRyb3V0ZS5mdWxsUGF0aCwgKCkgPT4ge1xuICAgIHByb3BzLm5vUm91dGVGdWxsc2NyZWVuRXhpdCAhPT0gdHJ1ZSAmJiBleGl0RnVsbHNjcmVlbigpXG4gIH0pXG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMuZnVsbHNjcmVlbiwgdiA9PiB7XG4gICAgaWYgKGluRnVsbHNjcmVlbi52YWx1ZSAhPT0gdikge1xuICAgICAgdG9nZ2xlRnVsbHNjcmVlbigpXG4gICAgfVxuICB9KVxuXG4gIHdhdGNoKGluRnVsbHNjcmVlbiwgdiA9PiB7XG4gICAgZW1pdCgndXBkYXRlOmZ1bGxzY3JlZW4nLCB2KVxuICAgIGVtaXQoJ2Z1bGxzY3JlZW4nLCB2KVxuICB9KVxuXG4gIGZ1bmN0aW9uIHRvZ2dsZUZ1bGxzY3JlZW4gKCkge1xuICAgIGlmIChpbkZ1bGxzY3JlZW4udmFsdWUgPT09IHRydWUpIHtcbiAgICAgIGV4aXRGdWxsc2NyZWVuKClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBzZXRGdWxsc2NyZWVuKClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzZXRGdWxsc2NyZWVuICgpIHtcbiAgICBpZiAoaW5GdWxsc2NyZWVuLnZhbHVlID09PSB0cnVlKSByZXR1cm5cblxuICAgIGluRnVsbHNjcmVlbi52YWx1ZSA9IHRydWVcbiAgICBjb250YWluZXIgPSBwcm94eS4kZWwucGFyZW50Tm9kZVxuICAgIGNvbnRhaW5lci5yZXBsYWNlQ2hpbGQoZnVsbHNjcmVlbkZpbGxlck5vZGUsIHByb3h5LiRlbClcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHByb3h5LiRlbClcblxuICAgIGNvdW50ZXIrK1xuICAgIGlmIChjb3VudGVyID09PSAxKSB7XG4gICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ3EtYm9keS0tZnVsbHNjcmVlbi1taXhpbicpXG4gICAgfVxuXG4gICAgaGlzdG9yeUVudHJ5ID0ge1xuICAgICAgaGFuZGxlcjogZXhpdEZ1bGxzY3JlZW5cbiAgICB9XG4gICAgSGlzdG9yeS5hZGQoaGlzdG9yeUVudHJ5KVxuICB9XG5cbiAgZnVuY3Rpb24gZXhpdEZ1bGxzY3JlZW4gKCkge1xuICAgIGlmIChpbkZ1bGxzY3JlZW4udmFsdWUgIT09IHRydWUpIHJldHVyblxuXG4gICAgaWYgKGhpc3RvcnlFbnRyeSAhPT0gdm9pZCAwKSB7XG4gICAgICBIaXN0b3J5LnJlbW92ZShoaXN0b3J5RW50cnkpXG4gICAgICBoaXN0b3J5RW50cnkgPSB2b2lkIDBcbiAgICB9XG5cbiAgICBjb250YWluZXIucmVwbGFjZUNoaWxkKHByb3h5LiRlbCwgZnVsbHNjcmVlbkZpbGxlck5vZGUpXG4gICAgaW5GdWxsc2NyZWVuLnZhbHVlID0gZmFsc2VcblxuICAgIGNvdW50ZXIgPSBNYXRoLm1heCgwLCBjb3VudGVyIC0gMSlcblxuICAgIGlmIChjb3VudGVyID09PSAwKSB7XG4gICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3EtYm9keS0tZnVsbHNjcmVlbi1taXhpbicpXG5cbiAgICAgIGlmIChwcm94eS4kZWwuc2Nyb2xsSW50b1ZpZXcgIT09IHZvaWQgMCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgcHJveHkuJGVsLnNjcm9sbEludG9WaWV3KCkgfSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvbkJlZm9yZU1vdW50KCgpID0+IHtcbiAgICBmdWxsc2NyZWVuRmlsbGVyTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICB9KVxuXG4gIG9uTW91bnRlZCgoKSA9PiB7XG4gICAgcHJvcHMuZnVsbHNjcmVlbiA9PT0gdHJ1ZSAmJiBzZXRGdWxsc2NyZWVuKClcbiAgfSlcblxuICBvbkJlZm9yZVVubW91bnQoZXhpdEZ1bGxzY3JlZW4pXG5cbiAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzXG4gIE9iamVjdC5hc3NpZ24ocHJveHksIHtcbiAgICB0b2dnbGVGdWxsc2NyZWVuLFxuICAgIHNldEZ1bGxzY3JlZW4sXG4gICAgZXhpdEZ1bGxzY3JlZW5cbiAgfSlcblxuICByZXR1cm4ge1xuICAgIGluRnVsbHNjcmVlbixcbiAgICB0b2dnbGVGdWxsc2NyZWVuXG4gIH1cbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBzb3J0RGF0ZSAoYSwgYikge1xuICByZXR1cm4gKG5ldyBEYXRlKGEpKSAtIChuZXcgRGF0ZShiKSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNvcnRCb29sZWFuIChhLCBiKSB7XG4gIHJldHVybiBhICYmICFiXG4gICAgPyAtMVxuICAgIDogKCFhICYmIGIgPyAxIDogMClcbn1cbiIsImltcG9ydCB7IGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBzb3J0RGF0ZSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuc29ydC9zb3J0LmpzJ1xuaW1wb3J0IHsgaXNOdW1iZXIsIGlzRGF0ZSwgaXNPYmplY3QgfSBmcm9tICcuLi8uLi91dGlscy9pcy9pcy5qcydcblxuZXhwb3J0IGNvbnN0IHVzZVRhYmxlU29ydFByb3BzID0ge1xuICBzb3J0TWV0aG9kOiBGdW5jdGlvbixcbiAgYmluYXJ5U3RhdGVTb3J0OiBCb29sZWFuLFxuICBjb2x1bW5Tb3J0T3JkZXI6IHtcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgdmFsaWRhdG9yOiB2ID0+IHYgPT09ICdhZCcgfHwgdiA9PT0gJ2RhJyxcbiAgICBkZWZhdWx0OiAnYWQnXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZVRhYmxlU29ydCAocHJvcHMsIGNvbXB1dGVkUGFnaW5hdGlvbiwgY29sTGlzdCwgc2V0UGFnaW5hdGlvbikge1xuICBjb25zdCBjb2x1bW5Ub1NvcnQgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgY29uc3QgeyBzb3J0QnkgfSA9IGNvbXB1dGVkUGFnaW5hdGlvbi52YWx1ZVxuXG4gICAgcmV0dXJuIHNvcnRCeVxuICAgICAgPyBjb2xMaXN0LnZhbHVlLmZpbmQoZGVmID0+IGRlZi5uYW1lID09PSBzb3J0QnkpIHx8IG51bGxcbiAgICAgIDogbnVsbFxuICB9KVxuXG4gIGNvbnN0IGNvbXB1dGVkU29ydE1ldGhvZCA9IGNvbXB1dGVkKCgpID0+IChcbiAgICBwcm9wcy5zb3J0TWV0aG9kICE9PSB2b2lkIDBcbiAgICAgID8gcHJvcHMuc29ydE1ldGhvZFxuICAgICAgOiAoZGF0YSwgc29ydEJ5LCBkZXNjZW5kaW5nKSA9PiB7XG4gICAgICAgICAgY29uc3QgY29sID0gY29sTGlzdC52YWx1ZS5maW5kKGRlZiA9PiBkZWYubmFtZSA9PT0gc29ydEJ5KVxuICAgICAgICAgIGlmIChjb2wgPT09IHZvaWQgMCB8fCBjb2wuZmllbGQgPT09IHZvaWQgMCkge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGFcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdFxuICAgICAgICAgICAgZGlyID0gZGVzY2VuZGluZyA9PT0gdHJ1ZSA/IC0xIDogMSxcbiAgICAgICAgICAgIHZhbCA9IHR5cGVvZiBjb2wuZmllbGQgPT09ICdmdW5jdGlvbidcbiAgICAgICAgICAgICAgPyB2ID0+IGNvbC5maWVsZCh2KVxuICAgICAgICAgICAgICA6IHYgPT4gdlsgY29sLmZpZWxkIF1cblxuICAgICAgICAgIHJldHVybiBkYXRhLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgIGxldFxuICAgICAgICAgICAgICBBID0gdmFsKGEpLFxuICAgICAgICAgICAgICBCID0gdmFsKGIpXG5cbiAgICAgICAgICAgIGlmIChjb2wucmF3U29ydCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgIHJldHVybiBjb2wucmF3U29ydChBLCBCLCBhLCBiKSAqIGRpclxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKEEgPT09IG51bGwgfHwgQSA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgIHJldHVybiAtMSAqIGRpclxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKEIgPT09IG51bGwgfHwgQiA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgIHJldHVybiAxICogZGlyXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY29sLnNvcnQgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAvLyBnZXRzIGNhbGxlZCB3aXRob3V0IHJvd3MgdGhhdCBoYXZlIG51bGwvdW5kZWZpbmVkIGFzIHZhbHVlXG4gICAgICAgICAgICAgIC8vIGR1ZSB0byB0aGUgYWJvdmUgdHdvIHN0YXRlbWVudHNcbiAgICAgICAgICAgICAgcmV0dXJuIGNvbC5zb3J0KEEsIEIsIGEsIGIpICogZGlyXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNOdW1iZXIoQSkgPT09IHRydWUgJiYgaXNOdW1iZXIoQikgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIChBIC0gQikgKiBkaXJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc0RhdGUoQSkgPT09IHRydWUgJiYgaXNEYXRlKEIpID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgIHJldHVybiBzb3J0RGF0ZShBLCBCKSAqIGRpclxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBBID09PSAnYm9vbGVhbicgJiYgdHlwZW9mIEIgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgICByZXR1cm4gKEEgLSBCKSAqIGRpclxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBbIEEsIEIgXSA9IFsgQSwgQiBdLm1hcChzID0+IChzICsgJycpLnRvTG9jYWxlU3RyaW5nKCkudG9Mb3dlckNhc2UoKSlcblxuICAgICAgICAgICAgcmV0dXJuIEEgPCBCXG4gICAgICAgICAgICAgID8gLTEgKiBkaXJcbiAgICAgICAgICAgICAgOiAoQSA9PT0gQiA/IDAgOiBkaXIpXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICApKVxuXG4gIGZ1bmN0aW9uIHNvcnQgKGNvbCAvKiBTdHJpbmcoY29sIG5hbWUpIG9yIE9iamVjdChjb2wgZGVmaW5pdGlvbikgKi8pIHtcbiAgICBsZXQgc29ydE9yZGVyID0gcHJvcHMuY29sdW1uU29ydE9yZGVyXG5cbiAgICBpZiAoaXNPYmplY3QoY29sKSA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKGNvbC5zb3J0T3JkZXIpIHtcbiAgICAgICAgc29ydE9yZGVyID0gY29sLnNvcnRPcmRlclxuICAgICAgfVxuXG4gICAgICBjb2wgPSBjb2wubmFtZVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGNvbnN0IGRlZiA9IGNvbExpc3QudmFsdWUuZmluZChkZWYgPT4gZGVmLm5hbWUgPT09IGNvbClcbiAgICAgIGlmIChkZWY/LnNvcnRPcmRlcikge1xuICAgICAgICBzb3J0T3JkZXIgPSBkZWYuc29ydE9yZGVyXG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IHsgc29ydEJ5LCBkZXNjZW5kaW5nIH0gPSBjb21wdXRlZFBhZ2luYXRpb24udmFsdWVcblxuICAgIGlmIChzb3J0QnkgIT09IGNvbCkge1xuICAgICAgc29ydEJ5ID0gY29sXG4gICAgICBkZXNjZW5kaW5nID0gc29ydE9yZGVyID09PSAnZGEnXG4gICAgfVxuICAgIGVsc2UgaWYgKHByb3BzLmJpbmFyeVN0YXRlU29ydCA9PT0gdHJ1ZSkge1xuICAgICAgZGVzY2VuZGluZyA9ICFkZXNjZW5kaW5nXG4gICAgfVxuICAgIGVsc2UgaWYgKGRlc2NlbmRpbmcgPT09IHRydWUpIHtcbiAgICAgIGlmIChzb3J0T3JkZXIgPT09ICdhZCcpIHtcbiAgICAgICAgc29ydEJ5ID0gbnVsbFxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGRlc2NlbmRpbmcgPSBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHsgLy8gYXNjZW5kaW5nXG4gICAgICBpZiAoc29ydE9yZGVyID09PSAnYWQnKSB7XG4gICAgICAgIGRlc2NlbmRpbmcgPSB0cnVlXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgc29ydEJ5ID0gbnVsbFxuICAgICAgfVxuICAgIH1cblxuICAgIHNldFBhZ2luYXRpb24oeyBzb3J0QnksIGRlc2NlbmRpbmcsIHBhZ2U6IDEgfSlcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgY29sdW1uVG9Tb3J0LFxuICAgIGNvbXB1dGVkU29ydE1ldGhvZCxcbiAgICBzb3J0XG4gIH1cbn1cbiIsImltcG9ydCB7IGNvbXB1dGVkLCB3YXRjaCwgbmV4dFRpY2sgfSBmcm9tICd2dWUnXG5cbmV4cG9ydCBjb25zdCB1c2VUYWJsZUZpbHRlclByb3BzID0ge1xuICBmaWx0ZXI6IFsgU3RyaW5nLCBPYmplY3QgXSxcbiAgZmlsdGVyTWV0aG9kOiBGdW5jdGlvblxufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlVGFibGVGaWx0ZXIgKHByb3BzLCBzZXRQYWdpbmF0aW9uKSB7XG4gIGNvbnN0IGNvbXB1dGVkRmlsdGVyTWV0aG9kID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgIHByb3BzLmZpbHRlck1ldGhvZCAhPT0gdm9pZCAwXG4gICAgICA/IHByb3BzLmZpbHRlck1ldGhvZFxuICAgICAgOiAocm93cywgdGVybXMsIGNvbHMsIGNlbGxWYWx1ZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGxvd2VyVGVybXMgPSB0ZXJtcyA/IHRlcm1zLnRvTG93ZXJDYXNlKCkgOiAnJ1xuICAgICAgICAgIHJldHVybiByb3dzLmZpbHRlcihcbiAgICAgICAgICAgIHJvdyA9PiBjb2xzLnNvbWUoY29sID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgdmFsID0gY2VsbFZhbHVlKGNvbCwgcm93KSArICcnXG4gICAgICAgICAgICAgIGNvbnN0IGhheXN0YWNrID0gKHZhbCA9PT0gJ3VuZGVmaW5lZCcgfHwgdmFsID09PSAnbnVsbCcpID8gJycgOiB2YWwudG9Mb3dlckNhc2UoKVxuICAgICAgICAgICAgICByZXR1cm4gaGF5c3RhY2suaW5kZXhPZihsb3dlclRlcm1zKSAhPT0gLTFcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICkpXG5cbiAgd2F0Y2goXG4gICAgKCkgPT4gcHJvcHMuZmlsdGVyLFxuICAgICgpID0+IHtcbiAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgc2V0UGFnaW5hdGlvbih7IHBhZ2U6IDEgfSwgdHJ1ZSlcbiAgICAgIH0pXG4gICAgfSxcbiAgICB7IGRlZXA6IHRydWUgfVxuICApXG5cbiAgcmV0dXJuIHsgY29tcHV0ZWRGaWx0ZXJNZXRob2QgfVxufVxuIiwiaW1wb3J0IHsgcmVmLCBjb21wdXRlZCwgd2F0Y2gsIG5leHRUaWNrIH0gZnJvbSAndnVlJ1xuXG5mdW5jdGlvbiBzYW1lUGFnaW5hdGlvbiAob2xkUGFnLCBuZXdQYWcpIHtcbiAgZm9yIChjb25zdCBwcm9wIGluIG5ld1BhZykge1xuICAgIGlmIChuZXdQYWdbIHByb3AgXSAhPT0gb2xkUGFnWyBwcm9wIF0pIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZVxufVxuXG5mdW5jdGlvbiBmaXhQYWdpbmF0aW9uIChwKSB7XG4gIGlmIChwLnBhZ2UgPCAxKSB7XG4gICAgcC5wYWdlID0gMVxuICB9XG4gIGlmIChwLnJvd3NQZXJQYWdlICE9PSB2b2lkIDAgJiYgcC5yb3dzUGVyUGFnZSA8IDEpIHtcbiAgICBwLnJvd3NQZXJQYWdlID0gMFxuICB9XG4gIHJldHVybiBwXG59XG5cbmV4cG9ydCBjb25zdCB1c2VUYWJsZVBhZ2luYXRpb25Qcm9wcyA9IHtcbiAgcGFnaW5hdGlvbjogT2JqZWN0LFxuICByb3dzUGVyUGFnZU9wdGlvbnM6IHtcbiAgICB0eXBlOiBBcnJheSxcbiAgICBkZWZhdWx0OiAoKSA9PiBbIDUsIDcsIDEwLCAxNSwgMjAsIDI1LCA1MCwgMCBdXG4gIH0sXG5cbiAgJ29uVXBkYXRlOnBhZ2luYXRpb24nOiBbIEZ1bmN0aW9uLCBBcnJheSBdXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VUYWJsZVBhZ2luYXRpb25TdGF0ZSAodm0sIGdldENlbGxWYWx1ZSkge1xuICBjb25zdCB7IHByb3BzLCBlbWl0IH0gPSB2bVxuXG4gIGNvbnN0IGlubmVyUGFnaW5hdGlvbiA9IHJlZihcbiAgICBPYmplY3QuYXNzaWduKHtcbiAgICAgIHNvcnRCeTogbnVsbCxcbiAgICAgIGRlc2NlbmRpbmc6IGZhbHNlLFxuICAgICAgcGFnZTogMSxcbiAgICAgIHJvd3NQZXJQYWdlOiBwcm9wcy5yb3dzUGVyUGFnZU9wdGlvbnMubGVuZ3RoICE9PSAwXG4gICAgICAgID8gcHJvcHMucm93c1BlclBhZ2VPcHRpb25zWyAwIF1cbiAgICAgICAgOiA1XG4gICAgfSwgcHJvcHMucGFnaW5hdGlvbilcbiAgKVxuXG4gIGNvbnN0IGNvbXB1dGVkUGFnaW5hdGlvbiA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBjb25zdCBwYWcgPSBwcm9wc1sgJ29uVXBkYXRlOnBhZ2luYXRpb24nIF0gIT09IHZvaWQgMFxuICAgICAgPyB7IC4uLmlubmVyUGFnaW5hdGlvbi52YWx1ZSwgLi4ucHJvcHMucGFnaW5hdGlvbiB9XG4gICAgICA6IGlubmVyUGFnaW5hdGlvbi52YWx1ZVxuXG4gICAgcmV0dXJuIGZpeFBhZ2luYXRpb24ocGFnKVxuICB9KVxuXG4gIGNvbnN0IGlzU2VydmVyU2lkZSA9IGNvbXB1dGVkKCgpID0+IGNvbXB1dGVkUGFnaW5hdGlvbi52YWx1ZS5yb3dzTnVtYmVyICE9PSB2b2lkIDApXG5cbiAgZnVuY3Rpb24gc2VuZFNlcnZlclJlcXVlc3QgKHBhZ2luYXRpb24pIHtcbiAgICByZXF1ZXN0U2VydmVySW50ZXJhY3Rpb24oe1xuICAgICAgcGFnaW5hdGlvbixcbiAgICAgIGZpbHRlcjogcHJvcHMuZmlsdGVyXG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlcXVlc3RTZXJ2ZXJJbnRlcmFjdGlvbiAocHJvcCA9IHt9KSB7XG4gICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgZW1pdCgncmVxdWVzdCcsIHtcbiAgICAgICAgcGFnaW5hdGlvbjogcHJvcC5wYWdpbmF0aW9uIHx8IGNvbXB1dGVkUGFnaW5hdGlvbi52YWx1ZSxcbiAgICAgICAgZmlsdGVyOiBwcm9wLmZpbHRlciB8fCBwcm9wcy5maWx0ZXIsXG4gICAgICAgIGdldENlbGxWYWx1ZVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0UGFnaW5hdGlvbiAodmFsLCBmb3JjZVNlcnZlclJlcXVlc3QpIHtcbiAgICBjb25zdCBuZXdQYWdpbmF0aW9uID0gZml4UGFnaW5hdGlvbih7XG4gICAgICAuLi5jb21wdXRlZFBhZ2luYXRpb24udmFsdWUsXG4gICAgICAuLi52YWxcbiAgICB9KVxuXG4gICAgaWYgKHNhbWVQYWdpbmF0aW9uKGNvbXB1dGVkUGFnaW5hdGlvbi52YWx1ZSwgbmV3UGFnaW5hdGlvbikgPT09IHRydWUpIHtcbiAgICAgIGlmIChpc1NlcnZlclNpZGUudmFsdWUgPT09IHRydWUgJiYgZm9yY2VTZXJ2ZXJSZXF1ZXN0ID09PSB0cnVlKSB7XG4gICAgICAgIHNlbmRTZXJ2ZXJSZXF1ZXN0KG5ld1BhZ2luYXRpb24pXG4gICAgICB9XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAoaXNTZXJ2ZXJTaWRlLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICBzZW5kU2VydmVyUmVxdWVzdChuZXdQYWdpbmF0aW9uKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgcHJvcHMucGFnaW5hdGlvbiAhPT0gdm9pZCAwXG4gICAgICAmJiBwcm9wc1sgJ29uVXBkYXRlOnBhZ2luYXRpb24nIF0gIT09IHZvaWQgMFxuICAgICkge1xuICAgICAgZW1pdCgndXBkYXRlOnBhZ2luYXRpb24nLCBuZXdQYWdpbmF0aW9uKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGlubmVyUGFnaW5hdGlvbi52YWx1ZSA9IG5ld1BhZ2luYXRpb25cbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGlubmVyUGFnaW5hdGlvbixcbiAgICBjb21wdXRlZFBhZ2luYXRpb24sXG4gICAgaXNTZXJ2ZXJTaWRlLFxuXG4gICAgcmVxdWVzdFNlcnZlckludGVyYWN0aW9uLFxuICAgIHNldFBhZ2luYXRpb25cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlVGFibGVQYWdpbmF0aW9uICh2bSwgaW5uZXJQYWdpbmF0aW9uLCBjb21wdXRlZFBhZ2luYXRpb24sIGlzU2VydmVyU2lkZSwgc2V0UGFnaW5hdGlvbiwgZmlsdGVyZWRTb3J0ZWRSb3dzTnVtYmVyKSB7XG4gIGNvbnN0IHsgcHJvcHMsIGVtaXQsIHByb3h5OiB7ICRxIH0gfSA9IHZtXG5cbiAgY29uc3QgY29tcHV0ZWRSb3dzTnVtYmVyID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgIGlzU2VydmVyU2lkZS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgPyBjb21wdXRlZFBhZ2luYXRpb24udmFsdWUucm93c051bWJlciB8fCAwXG4gICAgICA6IGZpbHRlcmVkU29ydGVkUm93c051bWJlci52YWx1ZVxuICApKVxuXG4gIGNvbnN0IGZpcnN0Um93SW5kZXggPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgY29uc3QgeyBwYWdlLCByb3dzUGVyUGFnZSB9ID0gY29tcHV0ZWRQYWdpbmF0aW9uLnZhbHVlXG4gICAgcmV0dXJuIChwYWdlIC0gMSkgKiByb3dzUGVyUGFnZVxuICB9KVxuXG4gIGNvbnN0IGxhc3RSb3dJbmRleCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBjb25zdCB7IHBhZ2UsIHJvd3NQZXJQYWdlIH0gPSBjb21wdXRlZFBhZ2luYXRpb24udmFsdWVcbiAgICByZXR1cm4gcGFnZSAqIHJvd3NQZXJQYWdlXG4gIH0pXG5cbiAgY29uc3QgaXNGaXJzdFBhZ2UgPSBjb21wdXRlZCgoKSA9PiBjb21wdXRlZFBhZ2luYXRpb24udmFsdWUucGFnZSA9PT0gMSlcblxuICBjb25zdCBwYWdlc051bWJlciA9IGNvbXB1dGVkKCgpID0+IChcbiAgICBjb21wdXRlZFBhZ2luYXRpb24udmFsdWUucm93c1BlclBhZ2UgPT09IDBcbiAgICAgID8gMVxuICAgICAgOiBNYXRoLm1heChcbiAgICAgICAgMSxcbiAgICAgICAgTWF0aC5jZWlsKGNvbXB1dGVkUm93c051bWJlci52YWx1ZSAvIGNvbXB1dGVkUGFnaW5hdGlvbi52YWx1ZS5yb3dzUGVyUGFnZSlcbiAgICAgIClcbiAgKSlcblxuICBjb25zdCBpc0xhc3RQYWdlID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgIGxhc3RSb3dJbmRleC52YWx1ZSA9PT0gMFxuICAgICAgPyB0cnVlXG4gICAgICA6IGNvbXB1dGVkUGFnaW5hdGlvbi52YWx1ZS5wYWdlID49IHBhZ2VzTnVtYmVyLnZhbHVlXG4gICkpXG5cbiAgY29uc3QgY29tcHV0ZWRSb3dzUGVyUGFnZU9wdGlvbnMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgY29uc3Qgb3B0cyA9IHByb3BzLnJvd3NQZXJQYWdlT3B0aW9ucy5pbmNsdWRlcyhpbm5lclBhZ2luYXRpb24udmFsdWUucm93c1BlclBhZ2UpXG4gICAgICA/IHByb3BzLnJvd3NQZXJQYWdlT3B0aW9uc1xuICAgICAgOiBbIGlubmVyUGFnaW5hdGlvbi52YWx1ZS5yb3dzUGVyUGFnZSBdLmNvbmNhdChwcm9wcy5yb3dzUGVyUGFnZU9wdGlvbnMpXG5cbiAgICByZXR1cm4gb3B0cy5tYXAoY291bnQgPT4gKHtcbiAgICAgIGxhYmVsOiBjb3VudCA9PT0gMCA/ICRxLmxhbmcudGFibGUuYWxsUm93cyA6ICcnICsgY291bnQsXG4gICAgICB2YWx1ZTogY291bnRcbiAgICB9KSlcbiAgfSlcblxuICB3YXRjaChwYWdlc051bWJlciwgKGxhc3RQYWdlLCBvbGRMYXN0UGFnZSkgPT4ge1xuICAgIGlmIChsYXN0UGFnZSA9PT0gb2xkTGFzdFBhZ2UpIHJldHVyblxuXG4gICAgY29uc3QgY3VycmVudFBhZ2UgPSBjb21wdXRlZFBhZ2luYXRpb24udmFsdWUucGFnZVxuICAgIGlmIChsYXN0UGFnZSAmJiAhY3VycmVudFBhZ2UpIHtcbiAgICAgIHNldFBhZ2luYXRpb24oeyBwYWdlOiAxIH0pXG4gICAgfVxuICAgIGVsc2UgaWYgKGxhc3RQYWdlIDwgY3VycmVudFBhZ2UpIHtcbiAgICAgIHNldFBhZ2luYXRpb24oeyBwYWdlOiBsYXN0UGFnZSB9KVxuICAgIH1cbiAgfSlcblxuICBmdW5jdGlvbiBmaXJzdFBhZ2UgKCkge1xuICAgIHNldFBhZ2luYXRpb24oeyBwYWdlOiAxIH0pXG4gIH1cblxuICBmdW5jdGlvbiBwcmV2UGFnZSAoKSB7XG4gICAgY29uc3QgeyBwYWdlIH0gPSBjb21wdXRlZFBhZ2luYXRpb24udmFsdWVcbiAgICBpZiAocGFnZSA+IDEpIHtcbiAgICAgIHNldFBhZ2luYXRpb24oeyBwYWdlOiBwYWdlIC0gMSB9KVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG5leHRQYWdlICgpIHtcbiAgICBjb25zdCB7IHBhZ2UsIHJvd3NQZXJQYWdlIH0gPSBjb21wdXRlZFBhZ2luYXRpb24udmFsdWVcbiAgICBpZiAobGFzdFJvd0luZGV4LnZhbHVlID4gMCAmJiBwYWdlICogcm93c1BlclBhZ2UgPCBjb21wdXRlZFJvd3NOdW1iZXIudmFsdWUpIHtcbiAgICAgIHNldFBhZ2luYXRpb24oeyBwYWdlOiBwYWdlICsgMSB9KVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGxhc3RQYWdlICgpIHtcbiAgICBzZXRQYWdpbmF0aW9uKHsgcGFnZTogcGFnZXNOdW1iZXIudmFsdWUgfSlcbiAgfVxuXG4gIGlmIChwcm9wc1sgJ29uVXBkYXRlOnBhZ2luYXRpb24nIF0gIT09IHZvaWQgMCkge1xuICAgIGVtaXQoJ3VwZGF0ZTpwYWdpbmF0aW9uJywgeyAuLi5jb21wdXRlZFBhZ2luYXRpb24udmFsdWUgfSlcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZmlyc3RSb3dJbmRleCxcbiAgICBsYXN0Um93SW5kZXgsXG4gICAgaXNGaXJzdFBhZ2UsXG4gICAgaXNMYXN0UGFnZSxcbiAgICBwYWdlc051bWJlcixcbiAgICBjb21wdXRlZFJvd3NQZXJQYWdlT3B0aW9ucyxcbiAgICBjb21wdXRlZFJvd3NOdW1iZXIsXG5cbiAgICBmaXJzdFBhZ2UsXG4gICAgcHJldlBhZ2UsXG4gICAgbmV4dFBhZ2UsXG4gICAgbGFzdFBhZ2VcbiAgfVxufVxuIiwiaW1wb3J0IHsgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmV4cG9ydCBjb25zdCB1c2VUYWJsZVJvd1NlbGVjdGlvblByb3BzID0ge1xuICBzZWxlY3Rpb246IHtcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgZGVmYXVsdDogJ25vbmUnLFxuICAgIHZhbGlkYXRvcjogdiA9PiBbICdzaW5nbGUnLCAnbXVsdGlwbGUnLCAnbm9uZScgXS5pbmNsdWRlcyh2KVxuICB9LFxuICBzZWxlY3RlZDoge1xuICAgIHR5cGU6IEFycmF5LFxuICAgIGRlZmF1bHQ6ICgpID0+IFtdXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHVzZVRhYmxlUm93U2VsZWN0aW9uRW1pdHMgPSBbICd1cGRhdGU6c2VsZWN0ZWQnLCAnc2VsZWN0aW9uJyBdXG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VUYWJsZVJvd1NlbGVjdGlvbiAocHJvcHMsIGVtaXQsIGNvbXB1dGVkUm93cywgZ2V0Um93S2V5KSB7XG4gIGNvbnN0IHNlbGVjdGVkS2V5cyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBjb25zdCBrZXlzID0ge31cbiAgICBwcm9wcy5zZWxlY3RlZC5tYXAoZ2V0Um93S2V5LnZhbHVlKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBrZXlzWyBrZXkgXSA9IHRydWVcbiAgICB9KVxuICAgIHJldHVybiBrZXlzXG4gIH0pXG5cbiAgY29uc3QgaGFzU2VsZWN0aW9uTW9kZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICByZXR1cm4gcHJvcHMuc2VsZWN0aW9uICE9PSAnbm9uZSdcbiAgfSlcblxuICBjb25zdCBzaW5nbGVTZWxlY3Rpb24gPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgcmV0dXJuIHByb3BzLnNlbGVjdGlvbiA9PT0gJ3NpbmdsZSdcbiAgfSlcblxuICBjb25zdCBtdWx0aXBsZVNlbGVjdGlvbiA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICByZXR1cm4gcHJvcHMuc2VsZWN0aW9uID09PSAnbXVsdGlwbGUnXG4gIH0pXG5cbiAgY29uc3QgYWxsUm93c1NlbGVjdGVkID0gY29tcHV0ZWQoKCkgPT5cbiAgICBjb21wdXRlZFJvd3MudmFsdWUubGVuZ3RoICE9PSAwICYmIGNvbXB1dGVkUm93cy52YWx1ZS5ldmVyeShcbiAgICAgIHJvdyA9PiBzZWxlY3RlZEtleXMudmFsdWVbIGdldFJvd0tleS52YWx1ZShyb3cpIF0gPT09IHRydWVcbiAgICApXG4gIClcblxuICBjb25zdCBzb21lUm93c1NlbGVjdGVkID0gY29tcHV0ZWQoKCkgPT5cbiAgICBhbGxSb3dzU2VsZWN0ZWQudmFsdWUgIT09IHRydWVcbiAgICAmJiBjb21wdXRlZFJvd3MudmFsdWUuc29tZShyb3cgPT4gc2VsZWN0ZWRLZXlzLnZhbHVlWyBnZXRSb3dLZXkudmFsdWUocm93KSBdID09PSB0cnVlKVxuICApXG5cbiAgY29uc3Qgcm93c1NlbGVjdGVkTnVtYmVyID0gY29tcHV0ZWQoKCkgPT4gcHJvcHMuc2VsZWN0ZWQubGVuZ3RoKVxuXG4gIGZ1bmN0aW9uIGlzUm93U2VsZWN0ZWQgKGtleSkge1xuICAgIHJldHVybiBzZWxlY3RlZEtleXMudmFsdWVbIGtleSBdID09PSB0cnVlXG4gIH1cblxuICBmdW5jdGlvbiBjbGVhclNlbGVjdGlvbiAoKSB7XG4gICAgZW1pdCgndXBkYXRlOnNlbGVjdGVkJywgW10pXG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVTZWxlY3Rpb24gKGtleXMsIHJvd3MsIGFkZGVkLCBldnQpIHtcbiAgICBlbWl0KCdzZWxlY3Rpb24nLCB7IHJvd3MsIGFkZGVkLCBrZXlzLCBldnQgfSlcblxuICAgIGNvbnN0IHBheWxvYWQgPSBzaW5nbGVTZWxlY3Rpb24udmFsdWUgPT09IHRydWVcbiAgICAgID8gKGFkZGVkID09PSB0cnVlID8gcm93cyA6IFtdKVxuICAgICAgOiAoXG4gICAgICAgICAgYWRkZWQgPT09IHRydWVcbiAgICAgICAgICAgID8gcHJvcHMuc2VsZWN0ZWQuY29uY2F0KHJvd3MpXG4gICAgICAgICAgICA6IHByb3BzLnNlbGVjdGVkLmZpbHRlcihcbiAgICAgICAgICAgICAgcm93ID0+IGtleXMuaW5jbHVkZXMoZ2V0Um93S2V5LnZhbHVlKHJvdykpID09PSBmYWxzZVxuICAgICAgICAgICAgKVxuICAgICAgICApXG5cbiAgICBlbWl0KCd1cGRhdGU6c2VsZWN0ZWQnLCBwYXlsb2FkKVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBoYXNTZWxlY3Rpb25Nb2RlLFxuICAgIHNpbmdsZVNlbGVjdGlvbixcbiAgICBtdWx0aXBsZVNlbGVjdGlvbixcbiAgICBhbGxSb3dzU2VsZWN0ZWQsXG4gICAgc29tZVJvd3NTZWxlY3RlZCxcbiAgICByb3dzU2VsZWN0ZWROdW1iZXIsXG5cbiAgICBpc1Jvd1NlbGVjdGVkLFxuICAgIGNsZWFyU2VsZWN0aW9uLFxuICAgIHVwZGF0ZVNlbGVjdGlvblxuICB9XG59XG4iLCJpbXBvcnQgeyByZWYsIHdhdGNoIH0gZnJvbSAndnVlJ1xuXG5mdW5jdGlvbiBnZXRWYWwgKHZhbCkge1xuICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWwpXG4gICAgPyB2YWwuc2xpY2UoKVxuICAgIDogW11cbn1cblxuZXhwb3J0IGNvbnN0IHVzZVRhYmxlUm93RXhwYW5kUHJvcHMgPSB7XG4gIGV4cGFuZGVkOiBBcnJheSAvLyB2LW1vZGVsOmV4cGFuZGVkXG59XG5cbmV4cG9ydCBjb25zdCB1c2VUYWJsZVJvd0V4cGFuZEVtaXRzID0gWyAndXBkYXRlOmV4cGFuZGVkJyBdXG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VUYWJsZVJvd0V4cGFuZCAocHJvcHMsIGVtaXQpIHtcbiAgY29uc3QgaW5uZXJFeHBhbmRlZCA9IHJlZihnZXRWYWwocHJvcHMuZXhwYW5kZWQpKVxuXG4gIHdhdGNoKCgpID0+IHByb3BzLmV4cGFuZGVkLCB2YWwgPT4ge1xuICAgIGlubmVyRXhwYW5kZWQudmFsdWUgPSBnZXRWYWwodmFsKVxuICB9KVxuXG4gIGZ1bmN0aW9uIGlzUm93RXhwYW5kZWQgKGtleSkge1xuICAgIHJldHVybiBpbm5lckV4cGFuZGVkLnZhbHVlLmluY2x1ZGVzKGtleSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldEV4cGFuZGVkICh2YWwpIHtcbiAgICBpZiAocHJvcHMuZXhwYW5kZWQgIT09IHZvaWQgMCkge1xuICAgICAgZW1pdCgndXBkYXRlOmV4cGFuZGVkJywgdmFsKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGlubmVyRXhwYW5kZWQudmFsdWUgPSB2YWxcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVFeHBhbmRlZCAoa2V5LCBhZGQpIHtcbiAgICBjb25zdCB0YXJnZXQgPSBpbm5lckV4cGFuZGVkLnZhbHVlLnNsaWNlKClcbiAgICBjb25zdCBpbmRleCA9IHRhcmdldC5pbmRleE9mKGtleSlcblxuICAgIGlmIChhZGQgPT09IHRydWUpIHtcbiAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgdGFyZ2V0LnB1c2goa2V5KVxuICAgICAgICBzZXRFeHBhbmRlZCh0YXJnZXQpXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgdGFyZ2V0LnNwbGljZShpbmRleCwgMSlcbiAgICAgIHNldEV4cGFuZGVkKHRhcmdldClcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGlzUm93RXhwYW5kZWQsXG4gICAgc2V0RXhwYW5kZWQsXG4gICAgdXBkYXRlRXhwYW5kZWRcbiAgfVxufVxuIiwiaW1wb3J0IHsgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGlzTnVtYmVyIH0gZnJvbSAnLi4vLi4vdXRpbHMvaXMvaXMuanMnXG5cbmV4cG9ydCBjb25zdCB1c2VUYWJsZUNvbHVtblNlbGVjdGlvblByb3BzID0ge1xuICB2aXNpYmxlQ29sdW1uczogQXJyYXlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZVRhYmxlQ29sdW1uU2VsZWN0aW9uIChwcm9wcywgY29tcHV0ZWRQYWdpbmF0aW9uLCBoYXNTZWxlY3Rpb25Nb2RlKSB7XG4gIGNvbnN0IGNvbExpc3QgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgaWYgKHByb3BzLmNvbHVtbnMgIT09IHZvaWQgMCkge1xuICAgICAgcmV0dXJuIHByb3BzLmNvbHVtbnNcbiAgICB9XG5cbiAgICAvLyB3ZSBpbmZlciBjb2x1bW5zIGZyb20gZmlyc3Qgcm93XG4gICAgY29uc3Qgcm93ID0gcHJvcHMucm93c1sgMCBdXG5cbiAgICByZXR1cm4gcm93ICE9PSB2b2lkIDBcbiAgICAgID8gT2JqZWN0LmtleXMocm93KS5tYXAobmFtZSA9PiAoe1xuICAgICAgICBuYW1lLFxuICAgICAgICBsYWJlbDogbmFtZS50b1VwcGVyQ2FzZSgpLFxuICAgICAgICBmaWVsZDogbmFtZSxcbiAgICAgICAgYWxpZ246IGlzTnVtYmVyKHJvd1sgbmFtZSBdKSA/ICdyaWdodCcgOiAnbGVmdCcsXG4gICAgICAgIHNvcnRhYmxlOiB0cnVlXG4gICAgICB9KSlcbiAgICAgIDogW11cbiAgfSlcblxuICBjb25zdCBjb21wdXRlZENvbHMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgY29uc3QgeyBzb3J0QnksIGRlc2NlbmRpbmcgfSA9IGNvbXB1dGVkUGFnaW5hdGlvbi52YWx1ZVxuXG4gICAgY29uc3QgY29scyA9IHByb3BzLnZpc2libGVDb2x1bW5zICE9PSB2b2lkIDBcbiAgICAgID8gY29sTGlzdC52YWx1ZS5maWx0ZXIoY29sID0+IGNvbC5yZXF1aXJlZCA9PT0gdHJ1ZSB8fCBwcm9wcy52aXNpYmxlQ29sdW1ucy5pbmNsdWRlcyhjb2wubmFtZSkgPT09IHRydWUpXG4gICAgICA6IGNvbExpc3QudmFsdWVcblxuICAgIHJldHVybiBjb2xzLm1hcChjb2wgPT4ge1xuICAgICAgY29uc3QgYWxpZ24gPSBjb2wuYWxpZ24gfHwgJ3JpZ2h0J1xuICAgICAgY29uc3QgYWxpZ25DbGFzcyA9IGB0ZXh0LSR7IGFsaWduIH1gXG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmNvbCxcbiAgICAgICAgYWxpZ24sXG4gICAgICAgIF9faWNvbkNsYXNzOiBgcS10YWJsZV9fc29ydC1pY29uIHEtdGFibGVfX3NvcnQtaWNvbi0tJHsgYWxpZ24gfWAsXG4gICAgICAgIF9fdGhDbGFzczogYWxpZ25DbGFzc1xuICAgICAgICAgICsgKGNvbC5oZWFkZXJDbGFzc2VzICE9PSB2b2lkIDAgPyAnICcgKyBjb2wuaGVhZGVyQ2xhc3NlcyA6ICcnKVxuICAgICAgICAgICsgKGNvbC5zb3J0YWJsZSA9PT0gdHJ1ZSA/ICcgc29ydGFibGUnIDogJycpXG4gICAgICAgICAgKyAoY29sLm5hbWUgPT09IHNvcnRCeSA/IGAgc29ydGVkICR7IGRlc2NlbmRpbmcgPT09IHRydWUgPyAnc29ydC1kZXNjJyA6ICcnIH1gIDogJycpLFxuXG4gICAgICAgIF9fdGRTdHlsZTogY29sLnN0eWxlICE9PSB2b2lkIDBcbiAgICAgICAgICA/IChcbiAgICAgICAgICAgICAgdHlwZW9mIGNvbC5zdHlsZSAhPT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgICAgID8gKCkgPT4gY29sLnN0eWxlXG4gICAgICAgICAgICAgICAgOiBjb2wuc3R5bGVcbiAgICAgICAgICAgIClcbiAgICAgICAgICA6ICgpID0+IG51bGwsXG5cbiAgICAgICAgX190ZENsYXNzOiBjb2wuY2xhc3NlcyAhPT0gdm9pZCAwXG4gICAgICAgICAgPyAoXG4gICAgICAgICAgICAgIHR5cGVvZiBjb2wuY2xhc3NlcyAhPT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgICAgID8gKCkgPT4gYWxpZ25DbGFzcyArICcgJyArIGNvbC5jbGFzc2VzXG4gICAgICAgICAgICAgICAgOiByb3cgPT4gYWxpZ25DbGFzcyArICcgJyArIGNvbC5jbGFzc2VzKHJvdylcbiAgICAgICAgICAgIClcbiAgICAgICAgICA6ICgpID0+IGFsaWduQ2xhc3NcbiAgICAgIH1cbiAgICB9KVxuICB9KVxuXG4gIGNvbnN0IGNvbXB1dGVkQ29sc01hcCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBjb25zdCBuYW1lcyA9IHt9XG4gICAgY29tcHV0ZWRDb2xzLnZhbHVlLmZvckVhY2goY29sID0+IHtcbiAgICAgIG5hbWVzWyBjb2wubmFtZSBdID0gY29sXG4gICAgfSlcbiAgICByZXR1cm4gbmFtZXNcbiAgfSlcblxuICBjb25zdCBjb21wdXRlZENvbHNwYW4gPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgcmV0dXJuIHByb3BzLnRhYmxlQ29sc3BhbiAhPT0gdm9pZCAwXG4gICAgICA/IHByb3BzLnRhYmxlQ29sc3BhblxuICAgICAgOiBjb21wdXRlZENvbHMudmFsdWUubGVuZ3RoICsgKGhhc1NlbGVjdGlvbk1vZGUudmFsdWUgPT09IHRydWUgPyAxIDogMClcbiAgfSlcblxuICByZXR1cm4ge1xuICAgIGNvbExpc3QsXG4gICAgY29tcHV0ZWRDb2xzLFxuICAgIGNvbXB1dGVkQ29sc01hcCxcbiAgICBjb21wdXRlZENvbHNwYW5cbiAgfVxufVxuIiwiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgd2F0Y2gsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFFUaCBmcm9tICcuL1FUaC5qcydcblxuaW1wb3J0IFFTZXBhcmF0b3IgZnJvbSAnLi4vc2VwYXJhdG9yL1FTZXBhcmF0b3IuanMnXG5pbXBvcnQgUUljb24gZnJvbSAnLi4vaWNvbi9RSWNvbi5qcydcbmltcG9ydCBRVmlydHVhbFNjcm9sbCBmcm9tICcuLi92aXJ0dWFsLXNjcm9sbC9RVmlydHVhbFNjcm9sbC5qcydcbmltcG9ydCBRU2VsZWN0IGZyb20gJy4uL3NlbGVjdC9RU2VsZWN0LmpzJ1xuaW1wb3J0IFFMaW5lYXJQcm9ncmVzcyBmcm9tICcuLi9saW5lYXItcHJvZ3Jlc3MvUUxpbmVhclByb2dyZXNzLmpzJ1xuaW1wb3J0IFFDaGVja2JveCBmcm9tICcuLi9jaGVja2JveC9RQ2hlY2tib3guanMnXG5pbXBvcnQgUUJ0biBmcm9tICcuLi9idG4vUUJ0bi5qcydcblxuaW1wb3J0IGdldFRhYmxlTWlkZGxlIGZyb20gJy4vZ2V0LXRhYmxlLW1pZGRsZS5qcydcblxuaW1wb3J0IHVzZURhcmssIHsgdXNlRGFya1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtZGFyay91c2UtZGFyay5qcydcbmltcG9ydCB7IGNvbW1vblZpcnRTY3JvbGxQcm9wc0xpc3QgfSBmcm9tICcuLi92aXJ0dWFsLXNjcm9sbC91c2UtdmlydHVhbC1zY3JvbGwuanMnXG5pbXBvcnQgdXNlRnVsbHNjcmVlbiwgeyB1c2VGdWxsc2NyZWVuUHJvcHMsIHVzZUZ1bGxzY3JlZW5FbWl0cyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLWZ1bGxzY3JlZW4vdXNlLWZ1bGxzY3JlZW4uanMnXG5cbmltcG9ydCB7IHVzZVRhYmxlU29ydCwgdXNlVGFibGVTb3J0UHJvcHMgfSBmcm9tICcuL3RhYmxlLXNvcnQuanMnXG5pbXBvcnQgeyB1c2VUYWJsZUZpbHRlciwgdXNlVGFibGVGaWx0ZXJQcm9wcyB9IGZyb20gJy4vdGFibGUtZmlsdGVyLmpzJ1xuaW1wb3J0IHsgdXNlVGFibGVQYWdpbmF0aW9uU3RhdGUsIHVzZVRhYmxlUGFnaW5hdGlvbiwgdXNlVGFibGVQYWdpbmF0aW9uUHJvcHMgfSBmcm9tICcuL3RhYmxlLXBhZ2luYXRpb24uanMnXG5pbXBvcnQgeyB1c2VUYWJsZVJvd1NlbGVjdGlvbiwgdXNlVGFibGVSb3dTZWxlY3Rpb25Qcm9wcywgdXNlVGFibGVSb3dTZWxlY3Rpb25FbWl0cyB9IGZyb20gJy4vdGFibGUtcm93LXNlbGVjdGlvbi5qcydcbmltcG9ydCB7IHVzZVRhYmxlUm93RXhwYW5kLCB1c2VUYWJsZVJvd0V4cGFuZFByb3BzLCB1c2VUYWJsZVJvd0V4cGFuZEVtaXRzIH0gZnJvbSAnLi90YWJsZS1yb3ctZXhwYW5kLmpzJ1xuaW1wb3J0IHsgdXNlVGFibGVDb2x1bW5TZWxlY3Rpb24sIHVzZVRhYmxlQ29sdW1uU2VsZWN0aW9uUHJvcHMgfSBmcm9tICcuL3RhYmxlLWNvbHVtbi1zZWxlY3Rpb24uanMnXG5cbmltcG9ydCB7IGluamVjdFByb3AsIGluamVjdE11bHRpcGxlUHJvcHMgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmluamVjdC1vYmotcHJvcC9pbmplY3Qtb2JqLXByb3AuanMnXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5cbmNvbnN0IGJvdHRvbUNsYXNzID0gJ3EtdGFibGVfX2JvdHRvbSByb3cgaXRlbXMtY2VudGVyJ1xuXG5jb25zdCB2aXJ0U2Nyb2xsUGFzc3Rocm91Z2hQcm9wcyA9IHt9XG5jb21tb25WaXJ0U2Nyb2xsUHJvcHNMaXN0LmZvckVhY2gocCA9PiB7IHZpcnRTY3JvbGxQYXNzdGhyb3VnaFByb3BzWyBwIF0gPSB7fSB9KVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVRhYmxlJyxcblxuICBwcm9wczoge1xuICAgIHJvd3M6IHtcbiAgICAgIHR5cGU6IEFycmF5LFxuICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICB9LFxuICAgIHJvd0tleToge1xuICAgICAgdHlwZTogWyBTdHJpbmcsIEZ1bmN0aW9uIF0sXG4gICAgICBkZWZhdWx0OiAnaWQnXG4gICAgfSxcblxuICAgIGNvbHVtbnM6IEFycmF5LFxuICAgIGxvYWRpbmc6IEJvb2xlYW4sXG5cbiAgICBpY29uRmlyc3RQYWdlOiBTdHJpbmcsXG4gICAgaWNvblByZXZQYWdlOiBTdHJpbmcsXG4gICAgaWNvbk5leHRQYWdlOiBTdHJpbmcsXG4gICAgaWNvbkxhc3RQYWdlOiBTdHJpbmcsXG5cbiAgICB0aXRsZTogU3RyaW5nLFxuXG4gICAgaGlkZUhlYWRlcjogQm9vbGVhbixcblxuICAgIGdyaWQ6IEJvb2xlYW4sXG4gICAgZ3JpZEhlYWRlcjogQm9vbGVhbixcblxuICAgIGRlbnNlOiBCb29sZWFuLFxuICAgIGZsYXQ6IEJvb2xlYW4sXG4gICAgYm9yZGVyZWQ6IEJvb2xlYW4sXG4gICAgc3F1YXJlOiBCb29sZWFuLFxuICAgIHNlcGFyYXRvcjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2hvcml6b250YWwnLFxuICAgICAgdmFsaWRhdG9yOiB2ID0+IFsgJ2hvcml6b250YWwnLCAndmVydGljYWwnLCAnY2VsbCcsICdub25lJyBdLmluY2x1ZGVzKHYpXG4gICAgfSxcbiAgICB3cmFwQ2VsbHM6IEJvb2xlYW4sXG5cbiAgICB2aXJ0dWFsU2Nyb2xsOiBCb29sZWFuLFxuICAgIHZpcnR1YWxTY3JvbGxUYXJnZXQ6IHt9LFxuICAgIC4uLnZpcnRTY3JvbGxQYXNzdGhyb3VnaFByb3BzLFxuXG4gICAgbm9EYXRhTGFiZWw6IFN0cmluZyxcbiAgICBub1Jlc3VsdHNMYWJlbDogU3RyaW5nLFxuICAgIGxvYWRpbmdMYWJlbDogU3RyaW5nLFxuICAgIHNlbGVjdGVkUm93c0xhYmVsOiBGdW5jdGlvbixcbiAgICByb3dzUGVyUGFnZUxhYmVsOiBTdHJpbmcsXG4gICAgcGFnaW5hdGlvbkxhYmVsOiBGdW5jdGlvbixcblxuICAgIGNvbG9yOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnZ3JleS04J1xuICAgIH0sXG5cbiAgICB0aXRsZUNsYXNzOiBbIFN0cmluZywgQXJyYXksIE9iamVjdCBdLFxuICAgIHRhYmxlU3R5bGU6IFsgU3RyaW5nLCBBcnJheSwgT2JqZWN0IF0sXG4gICAgdGFibGVDbGFzczogWyBTdHJpbmcsIEFycmF5LCBPYmplY3QgXSxcbiAgICB0YWJsZUhlYWRlclN0eWxlOiBbIFN0cmluZywgQXJyYXksIE9iamVjdCBdLFxuICAgIHRhYmxlSGVhZGVyQ2xhc3M6IFsgU3RyaW5nLCBBcnJheSwgT2JqZWN0IF0sXG4gICAgdGFibGVSb3dTdHlsZUZuOiBGdW5jdGlvbixcbiAgICB0YWJsZVJvd0NsYXNzRm46IEZ1bmN0aW9uLFxuICAgIGNhcmRDb250YWluZXJDbGFzczogWyBTdHJpbmcsIEFycmF5LCBPYmplY3QgXSxcbiAgICBjYXJkQ29udGFpbmVyU3R5bGU6IFsgU3RyaW5nLCBBcnJheSwgT2JqZWN0IF0sXG4gICAgY2FyZFN0eWxlOiBbIFN0cmluZywgQXJyYXksIE9iamVjdCBdLFxuICAgIGNhcmRDbGFzczogWyBTdHJpbmcsIEFycmF5LCBPYmplY3QgXSxcbiAgICBjYXJkU3R5bGVGbjogRnVuY3Rpb24sXG4gICAgY2FyZENsYXNzRm46IEZ1bmN0aW9uLFxuXG4gICAgaGlkZUJvdHRvbTogQm9vbGVhbixcbiAgICBoaWRlU2VsZWN0ZWRCYW5uZXI6IEJvb2xlYW4sXG4gICAgaGlkZU5vRGF0YTogQm9vbGVhbixcbiAgICBoaWRlUGFnaW5hdGlvbjogQm9vbGVhbixcblxuICAgIG9uUm93Q2xpY2s6IEZ1bmN0aW9uLFxuICAgIG9uUm93RGJsY2xpY2s6IEZ1bmN0aW9uLFxuICAgIG9uUm93Q29udGV4dG1lbnU6IEZ1bmN0aW9uLFxuXG4gICAgLi4udXNlRGFya1Byb3BzLFxuICAgIC4uLnVzZUZ1bGxzY3JlZW5Qcm9wcyxcblxuICAgIC4uLnVzZVRhYmxlQ29sdW1uU2VsZWN0aW9uUHJvcHMsXG4gICAgLi4udXNlVGFibGVGaWx0ZXJQcm9wcyxcbiAgICAuLi51c2VUYWJsZVBhZ2luYXRpb25Qcm9wcyxcbiAgICAuLi51c2VUYWJsZVJvd0V4cGFuZFByb3BzLFxuICAgIC4uLnVzZVRhYmxlUm93U2VsZWN0aW9uUHJvcHMsXG4gICAgLi4udXNlVGFibGVTb3J0UHJvcHNcbiAgfSxcblxuICBlbWl0czogW1xuICAgICdyZXF1ZXN0JywgJ3ZpcnR1YWxTY3JvbGwnLFxuICAgIC4uLnVzZUZ1bGxzY3JlZW5FbWl0cyxcbiAgICAuLi51c2VUYWJsZVJvd0V4cGFuZEVtaXRzLFxuICAgIC4uLnVzZVRhYmxlUm93U2VsZWN0aW9uRW1pdHNcbiAgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQgfSkge1xuICAgIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCB7IHByb3h5OiB7ICRxIH0gfSA9IHZtXG5cbiAgICBjb25zdCBpc0RhcmsgPSB1c2VEYXJrKHByb3BzLCAkcSlcbiAgICBjb25zdCB7IGluRnVsbHNjcmVlbiwgdG9nZ2xlRnVsbHNjcmVlbiB9ID0gdXNlRnVsbHNjcmVlbigpXG5cbiAgICBjb25zdCBnZXRSb3dLZXkgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICB0eXBlb2YgcHJvcHMucm93S2V5ID09PSAnZnVuY3Rpb24nXG4gICAgICAgID8gcHJvcHMucm93S2V5XG4gICAgICAgIDogcm93ID0+IHJvd1sgcHJvcHMucm93S2V5IF1cbiAgICApKVxuXG4gICAgY29uc3Qgcm9vdFJlZiA9IHJlZihudWxsKVxuICAgIGNvbnN0IHZpcnRTY3JvbGxSZWYgPSByZWYobnVsbClcbiAgICBjb25zdCBoYXNWaXJ0U2Nyb2xsID0gY29tcHV0ZWQoKCkgPT4gcHJvcHMuZ3JpZCAhPT0gdHJ1ZSAmJiBwcm9wcy52aXJ0dWFsU2Nyb2xsID09PSB0cnVlKVxuXG4gICAgY29uc3QgY2FyZERlZmF1bHRDbGFzcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAnIHEtdGFibGVfX2NhcmQnXG4gICAgICArIChpc0RhcmsudmFsdWUgPT09IHRydWUgPyAnIHEtdGFibGVfX2NhcmQtLWRhcmsgcS1kYXJrJyA6ICcnKVxuICAgICAgKyAocHJvcHMuc3F1YXJlID09PSB0cnVlID8gJyBxLXRhYmxlLS1zcXVhcmUnIDogJycpXG4gICAgICArIChwcm9wcy5mbGF0ID09PSB0cnVlID8gJyBxLXRhYmxlLS1mbGF0JyA6ICcnKVxuICAgICAgKyAocHJvcHMuYm9yZGVyZWQgPT09IHRydWUgPyAnIHEtdGFibGUtLWJvcmRlcmVkJyA6ICcnKVxuICAgIClcblxuICAgIGNvbnN0IGNvbnRhaW5lckNsYXNzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIGBxLXRhYmxlX19jb250YWluZXIgcS10YWJsZS0tJHsgcHJvcHMuc2VwYXJhdG9yIH0tc2VwYXJhdG9yIGNvbHVtbiBuby13cmFwYFxuICAgICAgKyAocHJvcHMuZ3JpZCA9PT0gdHJ1ZSA/ICcgcS10YWJsZS0tZ3JpZCcgOiBjYXJkRGVmYXVsdENsYXNzLnZhbHVlKVxuICAgICAgKyAoaXNEYXJrLnZhbHVlID09PSB0cnVlID8gJyBxLXRhYmxlLS1kYXJrJyA6ICcnKVxuICAgICAgKyAocHJvcHMuZGVuc2UgPT09IHRydWUgPyAnIHEtdGFibGUtLWRlbnNlJyA6ICcnKVxuICAgICAgKyAocHJvcHMud3JhcENlbGxzID09PSBmYWxzZSA/ICcgcS10YWJsZS0tbm8td3JhcCcgOiAnJylcbiAgICAgICsgKGluRnVsbHNjcmVlbi52YWx1ZSA9PT0gdHJ1ZSA/ICcgZnVsbHNjcmVlbiBzY3JvbGwnIDogJycpXG4gICAgKVxuXG4gICAgY29uc3Qgcm9vdENvbnRhaW5lckNsYXNzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIGNvbnRhaW5lckNsYXNzLnZhbHVlICsgKHByb3BzLmxvYWRpbmcgPT09IHRydWUgPyAnIHEtdGFibGUtLWxvYWRpbmcnIDogJycpXG4gICAgKVxuXG4gICAgd2F0Y2goXG4gICAgICAoKSA9PiBwcm9wcy50YWJsZVN0eWxlICsgcHJvcHMudGFibGVDbGFzcyArIHByb3BzLnRhYmxlSGVhZGVyU3R5bGUgKyBwcm9wcy50YWJsZUhlYWRlckNsYXNzICsgY29udGFpbmVyQ2xhc3MudmFsdWUsXG4gICAgICAoKSA9PiB7IGhhc1ZpcnRTY3JvbGwudmFsdWUgPT09IHRydWUgJiYgdmlydFNjcm9sbFJlZi52YWx1ZT8ucmVzZXQoKSB9XG4gICAgKVxuXG4gICAgY29uc3Qge1xuICAgICAgaW5uZXJQYWdpbmF0aW9uLFxuICAgICAgY29tcHV0ZWRQYWdpbmF0aW9uLFxuICAgICAgaXNTZXJ2ZXJTaWRlLFxuXG4gICAgICByZXF1ZXN0U2VydmVySW50ZXJhY3Rpb24sXG4gICAgICBzZXRQYWdpbmF0aW9uXG4gICAgfSA9IHVzZVRhYmxlUGFnaW5hdGlvblN0YXRlKHZtLCBnZXRDZWxsVmFsdWUpXG5cbiAgICBjb25zdCB7IGNvbXB1dGVkRmlsdGVyTWV0aG9kIH0gPSB1c2VUYWJsZUZpbHRlcihwcm9wcywgc2V0UGFnaW5hdGlvbilcbiAgICBjb25zdCB7IGlzUm93RXhwYW5kZWQsIHNldEV4cGFuZGVkLCB1cGRhdGVFeHBhbmRlZCB9ID0gdXNlVGFibGVSb3dFeHBhbmQocHJvcHMsIGVtaXQpXG5cbiAgICBjb25zdCBmaWx0ZXJlZFNvcnRlZFJvd3MgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBsZXQgcm93cyA9IHByb3BzLnJvd3NcblxuICAgICAgaWYgKGlzU2VydmVyU2lkZS52YWx1ZSA9PT0gdHJ1ZSB8fCByb3dzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gcm93c1xuICAgICAgfVxuXG4gICAgICBjb25zdCB7IHNvcnRCeSwgZGVzY2VuZGluZyB9ID0gY29tcHV0ZWRQYWdpbmF0aW9uLnZhbHVlXG5cbiAgICAgIGlmIChwcm9wcy5maWx0ZXIpIHtcbiAgICAgICAgcm93cyA9IGNvbXB1dGVkRmlsdGVyTWV0aG9kLnZhbHVlKHJvd3MsIHByb3BzLmZpbHRlciwgY29tcHV0ZWRDb2xzLnZhbHVlLCBnZXRDZWxsVmFsdWUpXG4gICAgICB9XG5cbiAgICAgIGlmIChjb2x1bW5Ub1NvcnQudmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgcm93cyA9IGNvbXB1dGVkU29ydE1ldGhvZC52YWx1ZShcbiAgICAgICAgICBwcm9wcy5yb3dzID09PSByb3dzID8gcm93cy5zbGljZSgpIDogcm93cyxcbiAgICAgICAgICBzb3J0QnksXG4gICAgICAgICAgZGVzY2VuZGluZ1xuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIHJldHVybiByb3dzXG4gICAgfSlcblxuICAgIGNvbnN0IGZpbHRlcmVkU29ydGVkUm93c051bWJlciA9IGNvbXB1dGVkKCgpID0+IGZpbHRlcmVkU29ydGVkUm93cy52YWx1ZS5sZW5ndGgpXG5cbiAgICBjb25zdCBjb21wdXRlZFJvd3MgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBsZXQgcm93cyA9IGZpbHRlcmVkU29ydGVkUm93cy52YWx1ZVxuXG4gICAgICBpZiAoaXNTZXJ2ZXJTaWRlLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiByb3dzXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHsgcm93c1BlclBhZ2UgfSA9IGNvbXB1dGVkUGFnaW5hdGlvbi52YWx1ZVxuXG4gICAgICBpZiAocm93c1BlclBhZ2UgIT09IDApIHtcbiAgICAgICAgaWYgKGZpcnN0Um93SW5kZXgudmFsdWUgPT09IDAgJiYgcHJvcHMucm93cyAhPT0gcm93cykge1xuICAgICAgICAgIGlmIChyb3dzLmxlbmd0aCA+IGxhc3RSb3dJbmRleC52YWx1ZSkge1xuICAgICAgICAgICAgcm93cyA9IHJvd3Muc2xpY2UoMCwgbGFzdFJvd0luZGV4LnZhbHVlKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICByb3dzID0gcm93cy5zbGljZShmaXJzdFJvd0luZGV4LnZhbHVlLCBsYXN0Um93SW5kZXgudmFsdWUpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJvd3NcbiAgICB9KVxuXG4gICAgY29uc3Qge1xuICAgICAgaGFzU2VsZWN0aW9uTW9kZSxcbiAgICAgIHNpbmdsZVNlbGVjdGlvbixcbiAgICAgIG11bHRpcGxlU2VsZWN0aW9uLFxuICAgICAgYWxsUm93c1NlbGVjdGVkLFxuICAgICAgc29tZVJvd3NTZWxlY3RlZCxcbiAgICAgIHJvd3NTZWxlY3RlZE51bWJlcixcblxuICAgICAgaXNSb3dTZWxlY3RlZCxcbiAgICAgIGNsZWFyU2VsZWN0aW9uLFxuICAgICAgdXBkYXRlU2VsZWN0aW9uXG4gICAgfSA9IHVzZVRhYmxlUm93U2VsZWN0aW9uKHByb3BzLCBlbWl0LCBjb21wdXRlZFJvd3MsIGdldFJvd0tleSlcblxuICAgIGNvbnN0IHsgY29sTGlzdCwgY29tcHV0ZWRDb2xzLCBjb21wdXRlZENvbHNNYXAsIGNvbXB1dGVkQ29sc3BhbiB9ID0gdXNlVGFibGVDb2x1bW5TZWxlY3Rpb24ocHJvcHMsIGNvbXB1dGVkUGFnaW5hdGlvbiwgaGFzU2VsZWN0aW9uTW9kZSlcblxuICAgIGNvbnN0IHsgY29sdW1uVG9Tb3J0LCBjb21wdXRlZFNvcnRNZXRob2QsIHNvcnQgfSA9IHVzZVRhYmxlU29ydChwcm9wcywgY29tcHV0ZWRQYWdpbmF0aW9uLCBjb2xMaXN0LCBzZXRQYWdpbmF0aW9uKVxuXG4gICAgY29uc3Qge1xuICAgICAgZmlyc3RSb3dJbmRleCxcbiAgICAgIGxhc3RSb3dJbmRleCxcbiAgICAgIGlzRmlyc3RQYWdlLFxuICAgICAgaXNMYXN0UGFnZSxcbiAgICAgIHBhZ2VzTnVtYmVyLFxuICAgICAgY29tcHV0ZWRSb3dzUGVyUGFnZU9wdGlvbnMsXG4gICAgICBjb21wdXRlZFJvd3NOdW1iZXIsXG5cbiAgICAgIGZpcnN0UGFnZSxcbiAgICAgIHByZXZQYWdlLFxuICAgICAgbmV4dFBhZ2UsXG4gICAgICBsYXN0UGFnZVxuICAgIH0gPSB1c2VUYWJsZVBhZ2luYXRpb24odm0sIGlubmVyUGFnaW5hdGlvbiwgY29tcHV0ZWRQYWdpbmF0aW9uLCBpc1NlcnZlclNpZGUsIHNldFBhZ2luYXRpb24sIGZpbHRlcmVkU29ydGVkUm93c051bWJlcilcblxuICAgIGNvbnN0IG5vdGhpbmdUb0Rpc3BsYXkgPSBjb21wdXRlZCgoKSA9PiBjb21wdXRlZFJvd3MudmFsdWUubGVuZ3RoID09PSAwKVxuXG4gICAgY29uc3QgdmlydFByb3BzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgYWNjID0ge31cblxuICAgICAgY29tbW9uVmlydFNjcm9sbFByb3BzTGlzdFxuICAgICAgICAuZm9yRWFjaChwID0+IHsgYWNjWyBwIF0gPSBwcm9wc1sgcCBdIH0pXG5cbiAgICAgIGlmIChhY2MudmlydHVhbFNjcm9sbEl0ZW1TaXplID09PSB2b2lkIDApIHtcbiAgICAgICAgYWNjLnZpcnR1YWxTY3JvbGxJdGVtU2l6ZSA9IHByb3BzLmRlbnNlID09PSB0cnVlID8gMjggOiA0OFxuICAgICAgfVxuXG4gICAgICByZXR1cm4gYWNjXG4gICAgfSlcblxuICAgIGZ1bmN0aW9uIHJlc2V0VmlydHVhbFNjcm9sbCAoKSB7XG4gICAgICBoYXNWaXJ0U2Nyb2xsLnZhbHVlID09PSB0cnVlICYmIHZpcnRTY3JvbGxSZWYudmFsdWUucmVzZXQoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEJvZHkgKCkge1xuICAgICAgaWYgKHByb3BzLmdyaWQgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIGdldEdyaWRCb2R5KClcbiAgICAgIH1cblxuICAgICAgY29uc3QgaGVhZGVyID0gcHJvcHMuaGlkZUhlYWRlciAhPT0gdHJ1ZSA/IGdldFRIZWFkIDogbnVsbFxuXG4gICAgICBpZiAoaGFzVmlydFNjcm9sbC52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCB0b3BSb3cgPSBzbG90c1sgJ3RvcC1yb3cnIF1cbiAgICAgICAgY29uc3QgYm90dG9tUm93ID0gc2xvdHNbICdib3R0b20tcm93JyBdXG5cbiAgICAgICAgY29uc3QgdmlydFNsb3RzID0ge1xuICAgICAgICAgIGRlZmF1bHQ6IHByb3BzID0+IGdldFRCb2R5VFIocHJvcHMuaXRlbSwgc2xvdHMuYm9keSwgcHJvcHMuaW5kZXgpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodG9wUm93ICE9PSB2b2lkIDApIHtcbiAgICAgICAgICBjb25zdCB0b3BDb250ZW50ID0gaCgndGJvZHknLCB0b3BSb3coeyBjb2xzOiBjb21wdXRlZENvbHMudmFsdWUgfSkpXG5cbiAgICAgICAgICB2aXJ0U2xvdHMuYmVmb3JlID0gaGVhZGVyID09PSBudWxsXG4gICAgICAgICAgICA/ICgpID0+IHRvcENvbnRlbnRcbiAgICAgICAgICAgIDogKCkgPT4gWyBoZWFkZXIoKSBdLmNvbmNhdCh0b3BDb250ZW50KVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGhlYWRlciAhPT0gbnVsbCkge1xuICAgICAgICAgIHZpcnRTbG90cy5iZWZvcmUgPSBoZWFkZXJcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChib3R0b21Sb3cgIT09IHZvaWQgMCkge1xuICAgICAgICAgIHZpcnRTbG90cy5hZnRlciA9ICgpID0+IGgoJ3Rib2R5JywgYm90dG9tUm93KHsgY29sczogY29tcHV0ZWRDb2xzLnZhbHVlIH0pKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGgoUVZpcnR1YWxTY3JvbGwsIHtcbiAgICAgICAgICByZWY6IHZpcnRTY3JvbGxSZWYsXG4gICAgICAgICAgY2xhc3M6IHByb3BzLnRhYmxlQ2xhc3MsXG4gICAgICAgICAgc3R5bGU6IHByb3BzLnRhYmxlU3R5bGUsXG4gICAgICAgICAgLi4udmlydFByb3BzLnZhbHVlLFxuICAgICAgICAgIHNjcm9sbFRhcmdldDogcHJvcHMudmlydHVhbFNjcm9sbFRhcmdldCxcbiAgICAgICAgICBpdGVtczogY29tcHV0ZWRSb3dzLnZhbHVlLFxuICAgICAgICAgIHR5cGU6ICdfX3F0YWJsZScsXG4gICAgICAgICAgdGFibGVDb2xzcGFuOiBjb21wdXRlZENvbHNwYW4udmFsdWUsXG4gICAgICAgICAgb25WaXJ0dWFsU2Nyb2xsOiBvblZTY3JvbGxcbiAgICAgICAgfSwgdmlydFNsb3RzKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBjaGlsZCA9IFtcbiAgICAgICAgZ2V0VEJvZHkoKVxuICAgICAgXVxuXG4gICAgICBpZiAoaGVhZGVyICE9PSBudWxsKSB7XG4gICAgICAgIGNoaWxkLnVuc2hpZnQoaGVhZGVyKCkpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBnZXRUYWJsZU1pZGRsZSh7XG4gICAgICAgIGNsYXNzOiBbICdxLXRhYmxlX19taWRkbGUgc2Nyb2xsJywgcHJvcHMudGFibGVDbGFzcyBdLFxuICAgICAgICBzdHlsZTogcHJvcHMudGFibGVTdHlsZVxuICAgICAgfSwgY2hpbGQpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2Nyb2xsVG8gKHRvSW5kZXgsIGVkZ2UpIHtcbiAgICAgIGlmICh2aXJ0U2Nyb2xsUmVmLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgIHZpcnRTY3JvbGxSZWYudmFsdWUuc2Nyb2xsVG8odG9JbmRleCwgZWRnZSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIHRvSW5kZXggPSBwYXJzZUludCh0b0luZGV4LCAxMClcbiAgICAgIGNvbnN0IHJvd0VsID0gcm9vdFJlZi52YWx1ZS5xdWVyeVNlbGVjdG9yKGB0Ym9keSB0cjpudGgtb2YtdHlwZSgkeyB0b0luZGV4ICsgMSB9KWApXG5cbiAgICAgIGlmIChyb3dFbCAhPT0gbnVsbCkge1xuICAgICAgICBjb25zdCBzY3JvbGxUYXJnZXQgPSByb290UmVmLnZhbHVlLnF1ZXJ5U2VsZWN0b3IoJy5xLXRhYmxlX19taWRkbGUuc2Nyb2xsJylcbiAgICAgICAgY29uc3Qgb2Zmc2V0VG9wID0gcm93RWwub2Zmc2V0VG9wIC0gcHJvcHMudmlydHVhbFNjcm9sbFN0aWNreVNpemVTdGFydFxuICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSBvZmZzZXRUb3AgPCBzY3JvbGxUYXJnZXQuc2Nyb2xsVG9wID8gJ2RlY3JlYXNlJyA6ICdpbmNyZWFzZSdcblxuICAgICAgICBzY3JvbGxUYXJnZXQuc2Nyb2xsVG9wID0gb2Zmc2V0VG9wXG5cbiAgICAgICAgZW1pdCgndmlydHVhbFNjcm9sbCcsIHtcbiAgICAgICAgICBpbmRleDogdG9JbmRleCxcbiAgICAgICAgICBmcm9tOiAwLFxuICAgICAgICAgIHRvOiBpbm5lclBhZ2luYXRpb24udmFsdWUucm93c1BlclBhZ2UgLSAxLFxuICAgICAgICAgIGRpcmVjdGlvblxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uVlNjcm9sbCAoaW5mbykge1xuICAgICAgZW1pdCgndmlydHVhbFNjcm9sbCcsIGluZm8pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0UHJvZ3Jlc3MgKCkge1xuICAgICAgcmV0dXJuIFtcbiAgICAgICAgaChRTGluZWFyUHJvZ3Jlc3MsIHtcbiAgICAgICAgICBjbGFzczogJ3EtdGFibGVfX2xpbmVhci1wcm9ncmVzcycsXG4gICAgICAgICAgY29sb3I6IHByb3BzLmNvbG9yLFxuICAgICAgICAgIGRhcms6IGlzRGFyay52YWx1ZSxcbiAgICAgICAgICBpbmRldGVybWluYXRlOiB0cnVlLFxuICAgICAgICAgIHRyYWNrQ29sb3I6ICd0cmFuc3BhcmVudCdcbiAgICAgICAgfSlcbiAgICAgIF1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRUQm9keVRSIChyb3csIGJvZHlTbG90LCBwYWdlSW5kZXgpIHtcbiAgICAgIGNvbnN0XG4gICAgICAgIGtleSA9IGdldFJvd0tleS52YWx1ZShyb3cpLFxuICAgICAgICBzZWxlY3RlZCA9IGlzUm93U2VsZWN0ZWQoa2V5KVxuXG4gICAgICBpZiAoYm9keVNsb3QgIT09IHZvaWQgMCkge1xuICAgICAgICBjb25zdCBjZmcgPSB7XG4gICAgICAgICAga2V5LFxuICAgICAgICAgIHJvdyxcbiAgICAgICAgICBwYWdlSW5kZXgsXG4gICAgICAgICAgX190ckNsYXNzOiBzZWxlY3RlZCA/ICdzZWxlY3RlZCcgOiAnJ1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb3BzLnRhYmxlUm93U3R5bGVGbiAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgY2ZnLl9fdHJTdHlsZSA9IHByb3BzLnRhYmxlUm93U3R5bGVGbihyb3cpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvcHMudGFibGVSb3dDbGFzc0ZuICE9PSB2b2lkIDApIHtcbiAgICAgICAgICBjb25zdCBjbHMgPSBwcm9wcy50YWJsZVJvd0NsYXNzRm4ocm93KVxuICAgICAgICAgIGlmIChjbHMpIHtcbiAgICAgICAgICAgIGNmZy5fX3RyQ2xhc3MgPSBgJHsgY2xzIH0gJHsgY2ZnLl9fdHJDbGFzcyB9YFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBib2R5U2xvdChcbiAgICAgICAgICBnZXRCb2R5U2NvcGUoY2ZnKVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIGNvbnN0XG4gICAgICAgIGJvZHlDZWxsID0gc2xvdHNbICdib2R5LWNlbGwnIF0sXG4gICAgICAgIGNoaWxkID0gY29tcHV0ZWRDb2xzLnZhbHVlLm1hcChjb2wgPT4ge1xuICAgICAgICAgIGNvbnN0XG4gICAgICAgICAgICBib2R5Q2VsbENvbCA9IHNsb3RzWyBgYm9keS1jZWxsLSR7IGNvbC5uYW1lIH1gIF0sXG4gICAgICAgICAgICBzbG90ID0gYm9keUNlbGxDb2wgIT09IHZvaWQgMCA/IGJvZHlDZWxsQ29sIDogYm9keUNlbGxcblxuICAgICAgICAgIHJldHVybiBzbG90ICE9PSB2b2lkIDBcbiAgICAgICAgICAgID8gc2xvdChnZXRCb2R5Q2VsbFNjb3BlKHsga2V5LCByb3csIHBhZ2VJbmRleCwgY29sIH0pKVxuICAgICAgICAgICAgOiBoKCd0ZCcsIHtcbiAgICAgICAgICAgICAgY2xhc3M6IGNvbC5fX3RkQ2xhc3Mocm93KSxcbiAgICAgICAgICAgICAgc3R5bGU6IGNvbC5fX3RkU3R5bGUocm93KVxuICAgICAgICAgICAgfSwgZ2V0Q2VsbFZhbHVlKGNvbCwgcm93KSlcbiAgICAgICAgfSlcblxuICAgICAgaWYgKGhhc1NlbGVjdGlvbk1vZGUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3Qgc2xvdCA9IHNsb3RzWyAnYm9keS1zZWxlY3Rpb24nIF1cbiAgICAgICAgY29uc3QgY29udGVudCA9IHNsb3QgIT09IHZvaWQgMFxuICAgICAgICAgID8gc2xvdChnZXRCb2R5U2VsZWN0aW9uU2NvcGUoeyBrZXksIHJvdywgcGFnZUluZGV4IH0pKVxuICAgICAgICAgIDogW1xuICAgICAgICAgICAgICBoKFFDaGVja2JveCwge1xuICAgICAgICAgICAgICAgIG1vZGVsVmFsdWU6IHNlbGVjdGVkLFxuICAgICAgICAgICAgICAgIGNvbG9yOiBwcm9wcy5jb2xvcixcbiAgICAgICAgICAgICAgICBkYXJrOiBpc0RhcmsudmFsdWUsXG4gICAgICAgICAgICAgICAgZGVuc2U6IHByb3BzLmRlbnNlLFxuICAgICAgICAgICAgICAgICdvblVwZGF0ZTptb2RlbFZhbHVlJzogKGFkZGluZywgZXZ0KSA9PiB7XG4gICAgICAgICAgICAgICAgICB1cGRhdGVTZWxlY3Rpb24oWyBrZXkgXSwgWyByb3cgXSwgYWRkaW5nLCBldnQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXVxuXG4gICAgICAgIGNoaWxkLnVuc2hpZnQoXG4gICAgICAgICAgaCgndGQnLCB7IGNsYXNzOiAncS10YWJsZS0tY29sLWF1dG8td2lkdGgnIH0sIGNvbnRlbnQpXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGF0YSA9IHsga2V5LCBjbGFzczogeyBzZWxlY3RlZCB9IH1cblxuICAgICAgaWYgKHByb3BzLm9uUm93Q2xpY2sgIT09IHZvaWQgMCkge1xuICAgICAgICBkYXRhLmNsYXNzWyAnY3Vyc29yLXBvaW50ZXInIF0gPSB0cnVlXG4gICAgICAgIGRhdGEub25DbGljayA9IGV2dCA9PiB7XG4gICAgICAgICAgZW1pdCgncm93Q2xpY2snLCBldnQsIHJvdywgcGFnZUluZGV4KVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9wcy5vblJvd0RibGNsaWNrICE9PSB2b2lkIDApIHtcbiAgICAgICAgZGF0YS5jbGFzc1sgJ2N1cnNvci1wb2ludGVyJyBdID0gdHJ1ZVxuICAgICAgICBkYXRhLm9uRGJsY2xpY2sgPSBldnQgPT4ge1xuICAgICAgICAgIGVtaXQoJ3Jvd0RibGNsaWNrJywgZXZ0LCByb3csIHBhZ2VJbmRleClcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHMub25Sb3dDb250ZXh0bWVudSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGRhdGEuY2xhc3NbICdjdXJzb3ItcG9pbnRlcicgXSA9IHRydWVcbiAgICAgICAgZGF0YS5vbkNvbnRleHRtZW51ID0gZXZ0ID0+IHtcbiAgICAgICAgICBlbWl0KCdyb3dDb250ZXh0bWVudScsIGV2dCwgcm93LCBwYWdlSW5kZXgpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHByb3BzLnRhYmxlUm93U3R5bGVGbiAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGRhdGEuc3R5bGUgPSBwcm9wcy50YWJsZVJvd1N0eWxlRm4ocm93KVxuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHMudGFibGVSb3dDbGFzc0ZuICE9PSB2b2lkIDApIHtcbiAgICAgICAgY29uc3QgY2xzID0gcHJvcHMudGFibGVSb3dDbGFzc0ZuKHJvdylcbiAgICAgICAgaWYgKGNscykge1xuICAgICAgICAgIGRhdGEuY2xhc3NbIGNscyBdID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoKCd0cicsIGRhdGEsIGNoaWxkKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFRCb2R5ICgpIHtcbiAgICAgIGNvbnN0XG4gICAgICAgIGJvZHkgPSBzbG90cy5ib2R5LFxuICAgICAgICB0b3BSb3cgPSBzbG90c1sgJ3RvcC1yb3cnIF0sXG4gICAgICAgIGJvdHRvbVJvdyA9IHNsb3RzWyAnYm90dG9tLXJvdycgXVxuXG4gICAgICBsZXQgY2hpbGQgPSBjb21wdXRlZFJvd3MudmFsdWUubWFwKFxuICAgICAgICAocm93LCBwYWdlSW5kZXgpID0+IGdldFRCb2R5VFIocm93LCBib2R5LCBwYWdlSW5kZXgpXG4gICAgICApXG5cbiAgICAgIGlmICh0b3BSb3cgIT09IHZvaWQgMCkge1xuICAgICAgICBjaGlsZCA9IHRvcFJvdyh7IGNvbHM6IGNvbXB1dGVkQ29scy52YWx1ZSB9KS5jb25jYXQoY2hpbGQpXG4gICAgICB9XG4gICAgICBpZiAoYm90dG9tUm93ICE9PSB2b2lkIDApIHtcbiAgICAgICAgY2hpbGQgPSBjaGlsZC5jb25jYXQoYm90dG9tUm93KHsgY29sczogY29tcHV0ZWRDb2xzLnZhbHVlIH0pKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gaCgndGJvZHknLCBjaGlsZClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRCb2R5U2NvcGUgKGRhdGEpIHtcbiAgICAgIGluamVjdEJvZHlDb21tb25TY29wZShkYXRhKVxuXG4gICAgICBkYXRhLmNvbHMgPSBkYXRhLmNvbHMubWFwKFxuICAgICAgICBjb2wgPT4gaW5qZWN0UHJvcCh7IC4uLmNvbCB9LCAndmFsdWUnLCAoKSA9PiBnZXRDZWxsVmFsdWUoY29sLCBkYXRhLnJvdykpXG4gICAgICApXG5cbiAgICAgIHJldHVybiBkYXRhXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Qm9keUNlbGxTY29wZSAoZGF0YSkge1xuICAgICAgaW5qZWN0Qm9keUNvbW1vblNjb3BlKGRhdGEpXG4gICAgICBpbmplY3RQcm9wKGRhdGEsICd2YWx1ZScsICgpID0+IGdldENlbGxWYWx1ZShkYXRhLmNvbCwgZGF0YS5yb3cpKVxuICAgICAgcmV0dXJuIGRhdGFcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRCb2R5U2VsZWN0aW9uU2NvcGUgKGRhdGEpIHtcbiAgICAgIGluamVjdEJvZHlDb21tb25TY29wZShkYXRhKVxuICAgICAgcmV0dXJuIGRhdGFcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbmplY3RCb2R5Q29tbW9uU2NvcGUgKGRhdGEpIHtcbiAgICAgIE9iamVjdC5hc3NpZ24oZGF0YSwge1xuICAgICAgICBjb2xzOiBjb21wdXRlZENvbHMudmFsdWUsXG4gICAgICAgIGNvbHNNYXA6IGNvbXB1dGVkQ29sc01hcC52YWx1ZSxcbiAgICAgICAgc29ydCxcbiAgICAgICAgcm93SW5kZXg6IGZpcnN0Um93SW5kZXgudmFsdWUgKyBkYXRhLnBhZ2VJbmRleCxcbiAgICAgICAgY29sb3I6IHByb3BzLmNvbG9yLFxuICAgICAgICBkYXJrOiBpc0RhcmsudmFsdWUsXG4gICAgICAgIGRlbnNlOiBwcm9wcy5kZW5zZVxuICAgICAgfSlcblxuICAgICAgaGFzU2VsZWN0aW9uTW9kZS52YWx1ZSA9PT0gdHJ1ZSAmJiBpbmplY3RQcm9wKFxuICAgICAgICBkYXRhLFxuICAgICAgICAnc2VsZWN0ZWQnLFxuICAgICAgICAoKSA9PiBpc1Jvd1NlbGVjdGVkKGRhdGEua2V5KSxcbiAgICAgICAgKGFkZGluZywgZXZ0KSA9PiB7XG4gICAgICAgICAgdXBkYXRlU2VsZWN0aW9uKFsgZGF0YS5rZXkgXSwgWyBkYXRhLnJvdyBdLCBhZGRpbmcsIGV2dClcbiAgICAgICAgfVxuICAgICAgKVxuXG4gICAgICBpbmplY3RQcm9wKFxuICAgICAgICBkYXRhLFxuICAgICAgICAnZXhwYW5kJyxcbiAgICAgICAgKCkgPT4gaXNSb3dFeHBhbmRlZChkYXRhLmtleSksXG4gICAgICAgIGFkZGluZyA9PiB7IHVwZGF0ZUV4cGFuZGVkKGRhdGEua2V5LCBhZGRpbmcpIH1cbiAgICAgIClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRDZWxsVmFsdWUgKGNvbCwgcm93KSB7XG4gICAgICBjb25zdCB2YWwgPSB0eXBlb2YgY29sLmZpZWxkID09PSAnZnVuY3Rpb24nID8gY29sLmZpZWxkKHJvdykgOiByb3dbIGNvbC5maWVsZCBdXG4gICAgICByZXR1cm4gY29sLmZvcm1hdCAhPT0gdm9pZCAwID8gY29sLmZvcm1hdCh2YWwsIHJvdykgOiB2YWxcbiAgICB9XG5cbiAgICBjb25zdCBtYXJnaW5hbHNTY29wZSA9IGNvbXB1dGVkKCgpID0+ICh7XG4gICAgICBwYWdpbmF0aW9uOiBjb21wdXRlZFBhZ2luYXRpb24udmFsdWUsXG4gICAgICBwYWdlc051bWJlcjogcGFnZXNOdW1iZXIudmFsdWUsXG4gICAgICBpc0ZpcnN0UGFnZTogaXNGaXJzdFBhZ2UudmFsdWUsXG4gICAgICBpc0xhc3RQYWdlOiBpc0xhc3RQYWdlLnZhbHVlLFxuICAgICAgZmlyc3RQYWdlLFxuICAgICAgcHJldlBhZ2UsXG4gICAgICBuZXh0UGFnZSxcbiAgICAgIGxhc3RQYWdlLFxuXG4gICAgICBpbkZ1bGxzY3JlZW46IGluRnVsbHNjcmVlbi52YWx1ZSxcbiAgICAgIHRvZ2dsZUZ1bGxzY3JlZW5cbiAgICB9KSlcblxuICAgIGZ1bmN0aW9uIGdldFRvcERpdiAoKSB7XG4gICAgICBjb25zdFxuICAgICAgICB0b3AgPSBzbG90cy50b3AsXG4gICAgICAgIHRvcExlZnQgPSBzbG90c1sgJ3RvcC1sZWZ0JyBdLFxuICAgICAgICB0b3BSaWdodCA9IHNsb3RzWyAndG9wLXJpZ2h0JyBdLFxuICAgICAgICB0b3BTZWxlY3Rpb24gPSBzbG90c1sgJ3RvcC1zZWxlY3Rpb24nIF0sXG4gICAgICAgIGhhc1NlbGVjdGlvbiA9IGhhc1NlbGVjdGlvbk1vZGUudmFsdWUgPT09IHRydWVcbiAgICAgICAgICAmJiB0b3BTZWxlY3Rpb24gIT09IHZvaWQgMFxuICAgICAgICAgICYmIHJvd3NTZWxlY3RlZE51bWJlci52YWx1ZSA+IDAsXG4gICAgICAgIHRvcENsYXNzID0gJ3EtdGFibGVfX3RvcCByZWxhdGl2ZS1wb3NpdGlvbiByb3cgaXRlbXMtY2VudGVyJ1xuXG4gICAgICBpZiAodG9wICE9PSB2b2lkIDApIHtcbiAgICAgICAgcmV0dXJuIGgoJ2RpdicsIHsgY2xhc3M6IHRvcENsYXNzIH0sIFsgdG9wKG1hcmdpbmFsc1Njb3BlLnZhbHVlKSBdKVxuICAgICAgfVxuXG4gICAgICBsZXQgY2hpbGRcblxuICAgICAgaWYgKGhhc1NlbGVjdGlvbiA9PT0gdHJ1ZSkge1xuICAgICAgICBjaGlsZCA9IHRvcFNlbGVjdGlvbihtYXJnaW5hbHNTY29wZS52YWx1ZSkuc2xpY2UoKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNoaWxkID0gW11cblxuICAgICAgICBpZiAodG9wTGVmdCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgY2hpbGQucHVzaChcbiAgICAgICAgICAgIGgoJ2RpdicsIHsgY2xhc3M6ICdxLXRhYmxlX19jb250cm9sJyB9LCBbXG4gICAgICAgICAgICAgIHRvcExlZnQobWFyZ2luYWxzU2NvcGUudmFsdWUpXG4gICAgICAgICAgICBdKVxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChwcm9wcy50aXRsZSkge1xuICAgICAgICAgIGNoaWxkLnB1c2goXG4gICAgICAgICAgICBoKCdkaXYnLCB7IGNsYXNzOiAncS10YWJsZV9fY29udHJvbCcgfSwgW1xuICAgICAgICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgICAgICAgY2xhc3M6IFsgJ3EtdGFibGVfX3RpdGxlJywgcHJvcHMudGl0bGVDbGFzcyBdXG4gICAgICAgICAgICAgIH0sIHByb3BzLnRpdGxlKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHRvcFJpZ2h0ICE9PSB2b2lkIDApIHtcbiAgICAgICAgY2hpbGQucHVzaChcbiAgICAgICAgICBoKCdkaXYnLCB7IGNsYXNzOiAncS10YWJsZV9fc2VwYXJhdG9yIGNvbCcgfSlcbiAgICAgICAgKVxuICAgICAgICBjaGlsZC5wdXNoKFxuICAgICAgICAgIGgoJ2RpdicsIHsgY2xhc3M6ICdxLXRhYmxlX19jb250cm9sJyB9LCBbXG4gICAgICAgICAgICB0b3BSaWdodChtYXJnaW5hbHNTY29wZS52YWx1ZSlcbiAgICAgICAgICBdKVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIGlmIChjaGlsZC5sZW5ndGggPT09IDApIHJldHVyblxuICAgICAgcmV0dXJuIGgoJ2RpdicsIHsgY2xhc3M6IHRvcENsYXNzIH0sIGNoaWxkKVxuICAgIH1cblxuICAgIGNvbnN0IGhlYWRlclNlbGVjdGVkVmFsdWUgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBzb21lUm93c1NlbGVjdGVkLnZhbHVlID09PSB0cnVlXG4gICAgICAgID8gbnVsbFxuICAgICAgICA6IGFsbFJvd3NTZWxlY3RlZC52YWx1ZVxuICAgICkpXG5cbiAgICBmdW5jdGlvbiBnZXRUSGVhZCAoKSB7XG4gICAgICBjb25zdCBjaGlsZCA9IGdldFRIZWFkVFIoKVxuXG4gICAgICBpZiAocHJvcHMubG9hZGluZyA9PT0gdHJ1ZSAmJiBzbG90cy5sb2FkaW5nID09PSB2b2lkIDApIHtcbiAgICAgICAgY2hpbGQucHVzaChcbiAgICAgICAgICBoKCd0cicsIHsgY2xhc3M6ICdxLXRhYmxlX19wcm9ncmVzcycgfSwgW1xuICAgICAgICAgICAgaCgndGgnLCB7XG4gICAgICAgICAgICAgIGNsYXNzOiAncmVsYXRpdmUtcG9zaXRpb24nLFxuICAgICAgICAgICAgICBjb2xzcGFuOiBjb21wdXRlZENvbHNwYW4udmFsdWVcbiAgICAgICAgICAgIH0sIGdldFByb2dyZXNzKCkpXG4gICAgICAgICAgXSlcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gaCgndGhlYWQnLCBjaGlsZClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRUSGVhZFRSICgpIHtcbiAgICAgIGNvbnN0XG4gICAgICAgIGhlYWRlciA9IHNsb3RzLmhlYWRlcixcbiAgICAgICAgaGVhZGVyQ2VsbCA9IHNsb3RzWyAnaGVhZGVyLWNlbGwnIF1cblxuICAgICAgaWYgKGhlYWRlciAhPT0gdm9pZCAwKSB7XG4gICAgICAgIHJldHVybiBoZWFkZXIoXG4gICAgICAgICAgZ2V0SGVhZGVyU2NvcGUoeyBoZWFkZXI6IHRydWUgfSlcbiAgICAgICAgKS5zbGljZSgpXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNoaWxkID0gY29tcHV0ZWRDb2xzLnZhbHVlLm1hcChjb2wgPT4ge1xuICAgICAgICBjb25zdFxuICAgICAgICAgIGhlYWRlckNlbGxDb2wgPSBzbG90c1sgYGhlYWRlci1jZWxsLSR7IGNvbC5uYW1lIH1gIF0sXG4gICAgICAgICAgc2xvdCA9IGhlYWRlckNlbGxDb2wgIT09IHZvaWQgMCA/IGhlYWRlckNlbGxDb2wgOiBoZWFkZXJDZWxsLFxuICAgICAgICAgIHByb3BzID0gZ2V0SGVhZGVyU2NvcGUoeyBjb2wgfSlcblxuICAgICAgICByZXR1cm4gc2xvdCAhPT0gdm9pZCAwXG4gICAgICAgICAgPyBzbG90KHByb3BzKVxuICAgICAgICAgIDogaChRVGgsIHtcbiAgICAgICAgICAgIGtleTogY29sLm5hbWUsXG4gICAgICAgICAgICBwcm9wc1xuICAgICAgICAgIH0sICgpID0+IGNvbC5sYWJlbClcbiAgICAgIH0pXG5cbiAgICAgIGlmIChzaW5nbGVTZWxlY3Rpb24udmFsdWUgPT09IHRydWUgJiYgcHJvcHMuZ3JpZCAhPT0gdHJ1ZSkge1xuICAgICAgICBjaGlsZC51bnNoaWZ0KFxuICAgICAgICAgIGgoJ3RoJywgeyBjbGFzczogJ3EtdGFibGUtLWNvbC1hdXRvLXdpZHRoJyB9LCAnICcpXG4gICAgICAgIClcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKG11bHRpcGxlU2VsZWN0aW9uLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IHNsb3QgPSBzbG90c1sgJ2hlYWRlci1zZWxlY3Rpb24nIF1cbiAgICAgICAgY29uc3QgY29udGVudCA9IHNsb3QgIT09IHZvaWQgMFxuICAgICAgICAgID8gc2xvdChnZXRIZWFkZXJTY29wZSh7fSkpXG4gICAgICAgICAgOiBbXG4gICAgICAgICAgICAgIGgoUUNoZWNrYm94LCB7XG4gICAgICAgICAgICAgICAgY29sb3I6IHByb3BzLmNvbG9yLFxuICAgICAgICAgICAgICAgIG1vZGVsVmFsdWU6IGhlYWRlclNlbGVjdGVkVmFsdWUudmFsdWUsXG4gICAgICAgICAgICAgICAgZGFyazogaXNEYXJrLnZhbHVlLFxuICAgICAgICAgICAgICAgIGRlbnNlOiBwcm9wcy5kZW5zZSxcbiAgICAgICAgICAgICAgICAnb25VcGRhdGU6bW9kZWxWYWx1ZSc6IG9uTXVsdGlwbGVTZWxlY3Rpb25TZXRcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF1cblxuICAgICAgICBjaGlsZC51bnNoaWZ0KFxuICAgICAgICAgIGgoJ3RoJywgeyBjbGFzczogJ3EtdGFibGUtLWNvbC1hdXRvLXdpZHRoJyB9LCBjb250ZW50KVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBbXG4gICAgICAgIGgoJ3RyJywge1xuICAgICAgICAgIGNsYXNzOiBwcm9wcy50YWJsZUhlYWRlckNsYXNzLFxuICAgICAgICAgIHN0eWxlOiBwcm9wcy50YWJsZUhlYWRlclN0eWxlXG4gICAgICAgIH0sIGNoaWxkKVxuICAgICAgXVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEhlYWRlclNjb3BlIChkYXRhKSB7XG4gICAgICBPYmplY3QuYXNzaWduKGRhdGEsIHtcbiAgICAgICAgY29sczogY29tcHV0ZWRDb2xzLnZhbHVlLFxuICAgICAgICBzb3J0LFxuICAgICAgICBjb2xzTWFwOiBjb21wdXRlZENvbHNNYXAudmFsdWUsXG4gICAgICAgIGNvbG9yOiBwcm9wcy5jb2xvcixcbiAgICAgICAgZGFyazogaXNEYXJrLnZhbHVlLFxuICAgICAgICBkZW5zZTogcHJvcHMuZGVuc2VcbiAgICAgIH0pXG5cbiAgICAgIGlmIChtdWx0aXBsZVNlbGVjdGlvbi52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBpbmplY3RQcm9wKFxuICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgJ3NlbGVjdGVkJyxcbiAgICAgICAgICAoKSA9PiBoZWFkZXJTZWxlY3RlZFZhbHVlLnZhbHVlLFxuICAgICAgICAgIG9uTXVsdGlwbGVTZWxlY3Rpb25TZXRcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZGF0YVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTXVsdGlwbGVTZWxlY3Rpb25TZXQgKHZhbCkge1xuICAgICAgaWYgKHNvbWVSb3dzU2VsZWN0ZWQudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgdmFsID0gZmFsc2VcbiAgICAgIH1cblxuICAgICAgdXBkYXRlU2VsZWN0aW9uKFxuICAgICAgICBjb21wdXRlZFJvd3MudmFsdWUubWFwKGdldFJvd0tleS52YWx1ZSksXG4gICAgICAgIGNvbXB1dGVkUm93cy52YWx1ZSxcbiAgICAgICAgdmFsXG4gICAgICApXG4gICAgfVxuXG4gICAgY29uc3QgbmF2SWNvbiA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGljbyA9IFtcbiAgICAgICAgcHJvcHMuaWNvbkZpcnN0UGFnZSB8fCAkcS5pY29uU2V0LnRhYmxlLmZpcnN0UGFnZSxcbiAgICAgICAgcHJvcHMuaWNvblByZXZQYWdlIHx8ICRxLmljb25TZXQudGFibGUucHJldlBhZ2UsXG4gICAgICAgIHByb3BzLmljb25OZXh0UGFnZSB8fCAkcS5pY29uU2V0LnRhYmxlLm5leHRQYWdlLFxuICAgICAgICBwcm9wcy5pY29uTGFzdFBhZ2UgfHwgJHEuaWNvblNldC50YWJsZS5sYXN0UGFnZVxuICAgICAgXVxuICAgICAgcmV0dXJuICRxLmxhbmcucnRsID09PSB0cnVlID8gaWNvLnJldmVyc2UoKSA6IGljb1xuICAgIH0pXG5cbiAgICBmdW5jdGlvbiBnZXRCb3R0b21EaXYgKCkge1xuICAgICAgaWYgKHByb3BzLmhpZGVCb3R0b20gPT09IHRydWUpIHJldHVyblxuXG4gICAgICBpZiAobm90aGluZ1RvRGlzcGxheS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBpZiAocHJvcHMuaGlkZU5vRGF0YSA9PT0gdHJ1ZSkgcmV0dXJuXG5cbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IHByb3BzLmxvYWRpbmcgPT09IHRydWVcbiAgICAgICAgICA/IHByb3BzLmxvYWRpbmdMYWJlbCB8fCAkcS5sYW5nLnRhYmxlLmxvYWRpbmdcbiAgICAgICAgICA6IChwcm9wcy5maWx0ZXIgPyBwcm9wcy5ub1Jlc3VsdHNMYWJlbCB8fCAkcS5sYW5nLnRhYmxlLm5vUmVzdWx0cyA6IHByb3BzLm5vRGF0YUxhYmVsIHx8ICRxLmxhbmcudGFibGUubm9EYXRhKVxuXG4gICAgICAgIGNvbnN0IG5vRGF0YSA9IHNsb3RzWyAnbm8tZGF0YScgXVxuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IG5vRGF0YSAhPT0gdm9pZCAwXG4gICAgICAgICAgPyBbIG5vRGF0YSh7IG1lc3NhZ2UsIGljb246ICRxLmljb25TZXQudGFibGUud2FybmluZywgZmlsdGVyOiBwcm9wcy5maWx0ZXIgfSkgXVxuICAgICAgICAgIDogW1xuICAgICAgICAgICAgICBoKFFJY29uLCB7XG4gICAgICAgICAgICAgICAgY2xhc3M6ICdxLXRhYmxlX19ib3R0b20tbm9kYXRhLWljb24nLFxuICAgICAgICAgICAgICAgIG5hbWU6ICRxLmljb25TZXQudGFibGUud2FybmluZ1xuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgbWVzc2FnZVxuICAgICAgICAgICAgXVxuXG4gICAgICAgIHJldHVybiBoKCdkaXYnLCB7IGNsYXNzOiBib3R0b21DbGFzcyArICcgcS10YWJsZV9fYm90dG9tLS1ub2RhdGEnIH0sIGNoaWxkcmVuKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBib3R0b20gPSBzbG90cy5ib3R0b21cblxuICAgICAgaWYgKGJvdHRvbSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIHJldHVybiBoKCdkaXYnLCB7IGNsYXNzOiBib3R0b21DbGFzcyB9LCBbIGJvdHRvbShtYXJnaW5hbHNTY29wZS52YWx1ZSkgXSlcbiAgICAgIH1cblxuICAgICAgY29uc3QgY2hpbGQgPSBwcm9wcy5oaWRlU2VsZWN0ZWRCYW5uZXIgIT09IHRydWUgJiYgaGFzU2VsZWN0aW9uTW9kZS52YWx1ZSA9PT0gdHJ1ZSAmJiByb3dzU2VsZWN0ZWROdW1iZXIudmFsdWUgPiAwXG4gICAgICAgID8gW1xuICAgICAgICAgICAgaCgnZGl2JywgeyBjbGFzczogJ3EtdGFibGVfX2NvbnRyb2wnIH0sIFtcbiAgICAgICAgICAgICAgaCgnZGl2JywgW1xuICAgICAgICAgICAgICAgIChwcm9wcy5zZWxlY3RlZFJvd3NMYWJlbCB8fCAkcS5sYW5nLnRhYmxlLnNlbGVjdGVkUmVjb3Jkcykocm93c1NlbGVjdGVkTnVtYmVyLnZhbHVlKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICBdXG4gICAgICAgIDogW11cblxuICAgICAgaWYgKHByb3BzLmhpZGVQYWdpbmF0aW9uICE9PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6IGJvdHRvbUNsYXNzICsgJyBqdXN0aWZ5LWVuZCdcbiAgICAgICAgfSwgZ2V0UGFnaW5hdGlvbkRpdihjaGlsZCkpXG4gICAgICB9XG5cbiAgICAgIGlmIChjaGlsZC5sZW5ndGggIT09IDApIHtcbiAgICAgICAgcmV0dXJuIGgoJ2RpdicsIHsgY2xhc3M6IGJvdHRvbUNsYXNzIH0sIGNoaWxkKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uUGFnU2VsZWN0aW9uIChwYWcpIHtcbiAgICAgIHNldFBhZ2luYXRpb24oe1xuICAgICAgICBwYWdlOiAxLFxuICAgICAgICByb3dzUGVyUGFnZTogcGFnLnZhbHVlXG4gICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFBhZ2luYXRpb25EaXYgKGNoaWxkKSB7XG4gICAgICBsZXQgY29udHJvbFxuICAgICAgY29uc3RcbiAgICAgICAgeyByb3dzUGVyUGFnZSB9ID0gY29tcHV0ZWRQYWdpbmF0aW9uLnZhbHVlLFxuICAgICAgICBwYWdpbmF0aW9uTGFiZWwgPSBwcm9wcy5wYWdpbmF0aW9uTGFiZWwgfHwgJHEubGFuZy50YWJsZS5wYWdpbmF0aW9uLFxuICAgICAgICBwYWdpbmF0aW9uU2xvdCA9IHNsb3RzLnBhZ2luYXRpb24sXG4gICAgICAgIGhhc09wdHMgPSBwcm9wcy5yb3dzUGVyUGFnZU9wdGlvbnMubGVuZ3RoID4gMVxuXG4gICAgICBjaGlsZC5wdXNoKFxuICAgICAgICBoKCdkaXYnLCB7IGNsYXNzOiAncS10YWJsZV9fc2VwYXJhdG9yIGNvbCcgfSlcbiAgICAgIClcblxuICAgICAgaGFzT3B0cyA9PT0gdHJ1ZSAmJiBjaGlsZC5wdXNoKFxuICAgICAgICBoKCdkaXYnLCB7IGNsYXNzOiAncS10YWJsZV9fY29udHJvbCcgfSwgW1xuICAgICAgICAgIGgoJ3NwYW4nLCB7IGNsYXNzOiAncS10YWJsZV9fYm90dG9tLWl0ZW0nIH0sIFtcbiAgICAgICAgICAgIHByb3BzLnJvd3NQZXJQYWdlTGFiZWwgfHwgJHEubGFuZy50YWJsZS5yZWNvcmRzUGVyUGFnZVxuICAgICAgICAgIF0pLFxuICAgICAgICAgIGgoUVNlbGVjdCwge1xuICAgICAgICAgICAgY2xhc3M6ICdxLXRhYmxlX19zZWxlY3QgaW5saW5lIHEtdGFibGVfX2JvdHRvbS1pdGVtJyxcbiAgICAgICAgICAgIGNvbG9yOiBwcm9wcy5jb2xvcixcbiAgICAgICAgICAgIG1vZGVsVmFsdWU6IHJvd3NQZXJQYWdlLFxuICAgICAgICAgICAgb3B0aW9uczogY29tcHV0ZWRSb3dzUGVyUGFnZU9wdGlvbnMudmFsdWUsXG4gICAgICAgICAgICBkaXNwbGF5VmFsdWU6IHJvd3NQZXJQYWdlID09PSAwXG4gICAgICAgICAgICAgID8gJHEubGFuZy50YWJsZS5hbGxSb3dzXG4gICAgICAgICAgICAgIDogcm93c1BlclBhZ2UsXG4gICAgICAgICAgICBkYXJrOiBpc0RhcmsudmFsdWUsXG4gICAgICAgICAgICBib3JkZXJsZXNzOiB0cnVlLFxuICAgICAgICAgICAgZGVuc2U6IHRydWUsXG4gICAgICAgICAgICBvcHRpb25zRGVuc2U6IHRydWUsXG4gICAgICAgICAgICBvcHRpb25zQ292ZXI6IHRydWUsXG4gICAgICAgICAgICAnb25VcGRhdGU6bW9kZWxWYWx1ZSc6IG9uUGFnU2VsZWN0aW9uXG4gICAgICAgICAgfSlcbiAgICAgICAgXSlcbiAgICAgIClcblxuICAgICAgaWYgKHBhZ2luYXRpb25TbG90ICE9PSB2b2lkIDApIHtcbiAgICAgICAgY29udHJvbCA9IHBhZ2luYXRpb25TbG90KG1hcmdpbmFsc1Njb3BlLnZhbHVlKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbnRyb2wgPSBbXG4gICAgICAgICAgaCgnc3BhbicsIHJvd3NQZXJQYWdlICE9PSAwID8geyBjbGFzczogJ3EtdGFibGVfX2JvdHRvbS1pdGVtJyB9IDoge30sIFtcbiAgICAgICAgICAgIHJvd3NQZXJQYWdlXG4gICAgICAgICAgICAgID8gcGFnaW5hdGlvbkxhYmVsKGZpcnN0Um93SW5kZXgudmFsdWUgKyAxLCBNYXRoLm1pbihsYXN0Um93SW5kZXgudmFsdWUsIGNvbXB1dGVkUm93c051bWJlci52YWx1ZSksIGNvbXB1dGVkUm93c051bWJlci52YWx1ZSlcbiAgICAgICAgICAgICAgOiBwYWdpbmF0aW9uTGFiZWwoMSwgZmlsdGVyZWRTb3J0ZWRSb3dzTnVtYmVyLnZhbHVlLCBjb21wdXRlZFJvd3NOdW1iZXIudmFsdWUpXG4gICAgICAgICAgXSlcbiAgICAgICAgXVxuXG4gICAgICAgIGlmIChyb3dzUGVyUGFnZSAhPT0gMCAmJiBwYWdlc051bWJlci52YWx1ZSA+IDEpIHtcbiAgICAgICAgICBjb25zdCBidG5Qcm9wcyA9IHtcbiAgICAgICAgICAgIGNvbG9yOiBwcm9wcy5jb2xvcixcbiAgICAgICAgICAgIHJvdW5kOiB0cnVlLFxuICAgICAgICAgICAgZGVuc2U6IHRydWUsXG4gICAgICAgICAgICBmbGF0OiB0cnVlXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHByb3BzLmRlbnNlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBidG5Qcm9wcy5zaXplID0gJ3NtJ1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHBhZ2VzTnVtYmVyLnZhbHVlID4gMiAmJiBjb250cm9sLnB1c2goXG4gICAgICAgICAgICBoKFFCdG4sIHtcbiAgICAgICAgICAgICAga2V5OiAncGdGaXJzdCcsXG4gICAgICAgICAgICAgIC4uLmJ0blByb3BzLFxuICAgICAgICAgICAgICBpY29uOiBuYXZJY29uLnZhbHVlWyAwIF0sXG4gICAgICAgICAgICAgIGRpc2FibGU6IGlzRmlyc3RQYWdlLnZhbHVlLFxuICAgICAgICAgICAgICBhcmlhTGFiZWw6ICRxLmxhbmcucGFnaW5hdGlvbi5maXJzdCxcbiAgICAgICAgICAgICAgb25DbGljazogZmlyc3RQYWdlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIClcblxuICAgICAgICAgIGNvbnRyb2wucHVzaChcbiAgICAgICAgICAgIGgoUUJ0biwge1xuICAgICAgICAgICAgICBrZXk6ICdwZ1ByZXYnLFxuICAgICAgICAgICAgICAuLi5idG5Qcm9wcyxcbiAgICAgICAgICAgICAgaWNvbjogbmF2SWNvbi52YWx1ZVsgMSBdLFxuICAgICAgICAgICAgICBkaXNhYmxlOiBpc0ZpcnN0UGFnZS52YWx1ZSxcbiAgICAgICAgICAgICAgYXJpYUxhYmVsOiAkcS5sYW5nLnBhZ2luYXRpb24ucHJldixcbiAgICAgICAgICAgICAgb25DbGljazogcHJldlBhZ2VcbiAgICAgICAgICAgIH0pLFxuXG4gICAgICAgICAgICBoKFFCdG4sIHtcbiAgICAgICAgICAgICAga2V5OiAncGdOZXh0JyxcbiAgICAgICAgICAgICAgLi4uYnRuUHJvcHMsXG4gICAgICAgICAgICAgIGljb246IG5hdkljb24udmFsdWVbIDIgXSxcbiAgICAgICAgICAgICAgZGlzYWJsZTogaXNMYXN0UGFnZS52YWx1ZSxcbiAgICAgICAgICAgICAgYXJpYUxhYmVsOiAkcS5sYW5nLnBhZ2luYXRpb24ubmV4dCxcbiAgICAgICAgICAgICAgb25DbGljazogbmV4dFBhZ2VcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKVxuXG4gICAgICAgICAgcGFnZXNOdW1iZXIudmFsdWUgPiAyICYmIGNvbnRyb2wucHVzaChcbiAgICAgICAgICAgIGgoUUJ0biwge1xuICAgICAgICAgICAgICBrZXk6ICdwZ0xhc3QnLFxuICAgICAgICAgICAgICAuLi5idG5Qcm9wcyxcbiAgICAgICAgICAgICAgaWNvbjogbmF2SWNvbi52YWx1ZVsgMyBdLFxuICAgICAgICAgICAgICBkaXNhYmxlOiBpc0xhc3RQYWdlLnZhbHVlLFxuICAgICAgICAgICAgICBhcmlhTGFiZWw6ICRxLmxhbmcucGFnaW5hdGlvbi5sYXN0LFxuICAgICAgICAgICAgICBvbkNsaWNrOiBsYXN0UGFnZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY2hpbGQucHVzaChcbiAgICAgICAgaCgnZGl2JywgeyBjbGFzczogJ3EtdGFibGVfX2NvbnRyb2wnIH0sIGNvbnRyb2wpXG4gICAgICApXG5cbiAgICAgIHJldHVybiBjaGlsZFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEdyaWRIZWFkZXIgKCkge1xuICAgICAgY29uc3QgY2hpbGQgPSBwcm9wcy5ncmlkSGVhZGVyID09PSB0cnVlXG4gICAgICAgID8gW1xuICAgICAgICAgICAgaCgndGFibGUnLCB7IGNsYXNzOiAncS10YWJsZScgfSwgW1xuICAgICAgICAgICAgICBnZXRUSGVhZChoKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICBdXG4gICAgICAgIDogKFxuICAgICAgICAgICAgcHJvcHMubG9hZGluZyA9PT0gdHJ1ZSAmJiBzbG90cy5sb2FkaW5nID09PSB2b2lkIDBcbiAgICAgICAgICAgICAgPyBnZXRQcm9ncmVzcyhoKVxuICAgICAgICAgICAgICA6IHZvaWQgMFxuICAgICAgICAgIClcblxuICAgICAgcmV0dXJuIGgoJ2RpdicsIHsgY2xhc3M6ICdxLXRhYmxlX19taWRkbGUnIH0sIGNoaWxkKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEdyaWRCb2R5ICgpIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBzbG90cy5pdGVtICE9PSB2b2lkIDBcbiAgICAgICAgPyBzbG90cy5pdGVtXG4gICAgICAgIDogc2NvcGUgPT4ge1xuICAgICAgICAgIGNvbnN0IGNoaWxkID0gc2NvcGUuY29scy5tYXAoXG4gICAgICAgICAgICBjb2wgPT4gaCgnZGl2JywgeyBjbGFzczogJ3EtdGFibGVfX2dyaWQtaXRlbS1yb3cnIH0sIFtcbiAgICAgICAgICAgICAgaCgnZGl2JywgeyBjbGFzczogJ3EtdGFibGVfX2dyaWQtaXRlbS10aXRsZScgfSwgWyBjb2wubGFiZWwgXSksXG4gICAgICAgICAgICAgIGgoJ2RpdicsIHsgY2xhc3M6ICdxLXRhYmxlX19ncmlkLWl0ZW0tdmFsdWUnIH0sIFsgY29sLnZhbHVlIF0pXG4gICAgICAgICAgICBdKVxuICAgICAgICAgIClcblxuICAgICAgICAgIGlmIChoYXNTZWxlY3Rpb25Nb2RlLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjb25zdCBzbG90ID0gc2xvdHNbICdib2R5LXNlbGVjdGlvbicgXVxuICAgICAgICAgICAgY29uc3QgY29udGVudCA9IHNsb3QgIT09IHZvaWQgMFxuICAgICAgICAgICAgICA/IHNsb3Qoc2NvcGUpXG4gICAgICAgICAgICAgIDogW1xuICAgICAgICAgICAgICAgICAgaChRQ2hlY2tib3gsIHtcbiAgICAgICAgICAgICAgICAgICAgbW9kZWxWYWx1ZTogc2NvcGUuc2VsZWN0ZWQsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiBwcm9wcy5jb2xvcixcbiAgICAgICAgICAgICAgICAgICAgZGFyazogaXNEYXJrLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICBkZW5zZTogcHJvcHMuZGVuc2UsXG4gICAgICAgICAgICAgICAgICAgICdvblVwZGF0ZTptb2RlbFZhbHVlJzogKGFkZGluZywgZXZ0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgdXBkYXRlU2VsZWN0aW9uKFsgc2NvcGUua2V5IF0sIFsgc2NvcGUucm93IF0sIGFkZGluZywgZXZ0KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIF1cblxuICAgICAgICAgICAgY2hpbGQudW5zaGlmdChcbiAgICAgICAgICAgICAgaCgnZGl2JywgeyBjbGFzczogJ3EtdGFibGVfX2dyaWQtaXRlbS1yb3cnIH0sIGNvbnRlbnQpLFxuICAgICAgICAgICAgICBoKFFTZXBhcmF0b3IsIHsgZGFyazogaXNEYXJrLnZhbHVlIH0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgIGNsYXNzOiBbXG4gICAgICAgICAgICAgICdxLXRhYmxlX19ncmlkLWl0ZW0tY2FyZCcgKyBjYXJkRGVmYXVsdENsYXNzLnZhbHVlLFxuICAgICAgICAgICAgICBwcm9wcy5jYXJkQ2xhc3NcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBzdHlsZTogcHJvcHMuY2FyZFN0eWxlXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHByb3BzLmNhcmRTdHlsZUZuICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgIGRhdGEuc3R5bGUgPSBbIGRhdGEuc3R5bGUsIHByb3BzLmNhcmRTdHlsZUZuKHNjb3BlLnJvdykgXVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChwcm9wcy5jYXJkQ2xhc3NGbiAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICBjb25zdCBjbHMgPSBwcm9wcy5jYXJkQ2xhc3NGbihzY29wZS5yb3cpXG4gICAgICAgICAgICBpZiAoY2xzKSB7XG4gICAgICAgICAgICAgIGRhdGEuY2xhc3NbIDAgXSArPSBgICR7IGNscyB9YFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHByb3BzLm9uUm93Q2xpY2sgIT09IHZvaWQgMFxuICAgICAgICAgICAgfHwgcHJvcHMub25Sb3dEYmxjbGljayAhPT0gdm9pZCAwXG4gICAgICAgICAgICB8fCBwcm9wcy5vblJvd0NvbnRleHRtZW51ICE9PSB2b2lkIDBcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGRhdGEuY2xhc3NbIDAgXSArPSAnIGN1cnNvci1wb2ludGVyJ1xuXG4gICAgICAgICAgICBpZiAocHJvcHMub25Sb3dDbGljayAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgIGRhdGEub25DbGljayA9IGV2dCA9PiB7XG4gICAgICAgICAgICAgICAgZW1pdCgnUm93Q2xpY2snLCBldnQsIHNjb3BlLnJvdywgc2NvcGUucGFnZUluZGV4KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwcm9wcy5vblJvd0RibGNsaWNrICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgZGF0YS5vbkRibGNsaWNrID0gZXZ0ID0+IHtcbiAgICAgICAgICAgICAgICBlbWl0KCdSb3dEYmxjbGljaycsIGV2dCwgc2NvcGUucm93LCBzY29wZS5wYWdlSW5kZXgpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHByb3BzLm9uUm93Q29udGV4dG1lbnUgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICBkYXRhLm9uQ29udGV4dG1lbnUgPSBldnQgPT4ge1xuICAgICAgICAgICAgICAgIGVtaXQoJ3Jvd0NvbnRleHRtZW51JywgZXZ0LCBzY29wZS5yb3csIHNjb3BlLnBhZ2VJbmRleClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICAgICAgICBjbGFzczogJ3EtdGFibGVfX2dyaWQtaXRlbSBjb2wteHMtMTIgY29sLXNtLTYgY29sLW1kLTQgY29sLWxnLTMnXG4gICAgICAgICAgICAgICsgKHNjb3BlLnNlbGVjdGVkID09PSB0cnVlID8gJyBxLXRhYmxlX19ncmlkLWl0ZW0tLXNlbGVjdGVkJyA6ICcnKVxuICAgICAgICAgIH0sIFtcbiAgICAgICAgICAgIGgoJ2RpdicsIGRhdGEsIGNoaWxkKVxuICAgICAgICAgIF0pXG4gICAgICAgIH1cblxuICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6IFtcbiAgICAgICAgICAncS10YWJsZV9fZ3JpZC1jb250ZW50IHJvdycsXG4gICAgICAgICAgcHJvcHMuY2FyZENvbnRhaW5lckNsYXNzXG4gICAgICAgIF0sXG4gICAgICAgIHN0eWxlOiBwcm9wcy5jYXJkQ29udGFpbmVyU3R5bGVcbiAgICAgIH0sIGNvbXB1dGVkUm93cy52YWx1ZS5tYXAoKHJvdywgcGFnZUluZGV4KSA9PiB7XG4gICAgICAgIHJldHVybiBpdGVtKGdldEJvZHlTY29wZSh7XG4gICAgICAgICAga2V5OiBnZXRSb3dLZXkudmFsdWUocm93KSxcbiAgICAgICAgICByb3csXG4gICAgICAgICAgcGFnZUluZGV4XG4gICAgICAgIH0pKVxuICAgICAgfSkpXG4gICAgfVxuXG4gICAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzIGFuZCBuZWVkZWQgY29tcHV0ZWQgcHJvcHNcbiAgICBPYmplY3QuYXNzaWduKHZtLnByb3h5LCB7XG4gICAgICByZXF1ZXN0U2VydmVySW50ZXJhY3Rpb24sXG4gICAgICBzZXRQYWdpbmF0aW9uLFxuICAgICAgZmlyc3RQYWdlLFxuICAgICAgcHJldlBhZ2UsXG4gICAgICBuZXh0UGFnZSxcbiAgICAgIGxhc3RQYWdlLFxuICAgICAgaXNSb3dTZWxlY3RlZCxcbiAgICAgIGNsZWFyU2VsZWN0aW9uLFxuICAgICAgaXNSb3dFeHBhbmRlZCxcbiAgICAgIHNldEV4cGFuZGVkLFxuICAgICAgc29ydCxcbiAgICAgIHJlc2V0VmlydHVhbFNjcm9sbCxcbiAgICAgIHNjcm9sbFRvLFxuICAgICAgZ2V0Q2VsbFZhbHVlXG4gICAgfSlcblxuICAgIGluamVjdE11bHRpcGxlUHJvcHModm0ucHJveHksIHtcbiAgICAgIGZpbHRlcmVkU29ydGVkUm93czogKCkgPT4gZmlsdGVyZWRTb3J0ZWRSb3dzLnZhbHVlLFxuICAgICAgY29tcHV0ZWRSb3dzOiAoKSA9PiBjb21wdXRlZFJvd3MudmFsdWUsXG4gICAgICBjb21wdXRlZFJvd3NOdW1iZXI6ICgpID0+IGNvbXB1dGVkUm93c051bWJlci52YWx1ZVxuICAgIH0pXG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY29uc3QgY2hpbGQgPSBbIGdldFRvcERpdigpIF1cbiAgICAgIGNvbnN0IGRhdGEgPSB7IHJlZjogcm9vdFJlZiwgY2xhc3M6IHJvb3RDb250YWluZXJDbGFzcy52YWx1ZSB9XG5cbiAgICAgIGlmIChwcm9wcy5ncmlkID09PSB0cnVlKSB7XG4gICAgICAgIGNoaWxkLnB1c2goZ2V0R3JpZEhlYWRlcigpKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24oZGF0YSwge1xuICAgICAgICAgIGNsYXNzOiBbIGRhdGEuY2xhc3MsIHByb3BzLmNhcmRDbGFzcyBdLFxuICAgICAgICAgIHN0eWxlOiBwcm9wcy5jYXJkU3R5bGVcbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgY2hpbGQucHVzaChcbiAgICAgICAgZ2V0Qm9keSgpLFxuICAgICAgICBnZXRCb3R0b21EaXYoKVxuICAgICAgKVxuXG4gICAgICBpZiAocHJvcHMubG9hZGluZyA9PT0gdHJ1ZSAmJiBzbG90cy5sb2FkaW5nICE9PSB2b2lkIDApIHtcbiAgICAgICAgY2hpbGQucHVzaChcbiAgICAgICAgICBzbG90cy5sb2FkaW5nKClcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gaCgnZGl2JywgZGF0YSwgY2hpbGQpXG4gICAgfVxuICB9XG59KVxuIl0sIm5hbWVzIjpbImRlZiIsImxhc3RQYWdlIiwicHJvcHMiXSwibWFwcGluZ3MiOiI7OztBQU9BLE1B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VyxDQUFBO0FBQzNCLFlBQU0sT0FBTyxFQUFFLEtBQUssU0FBUyxPQUFPLG1CQUFtQixNQUFLO0FBRTVELFVBQUksTUFBTSxTQUFTLE1BQU07QUFDdkIsY0FBTSxLQUFLLGNBQWUsQ0FBQTtBQUFBLE1BQ2xDLE9BQ1c7QUFDSCxlQUFPLE9BQU8sTUFBTTtBQUFBLFVBQ2xCLE9BQU8sQ0FBRSxLQUFLLE9BQU8sTUFBTSxTQUFXO0FBQUEsVUFDdEMsT0FBTyxNQUFNO0FBQUEsUUFDZCxDQUFBO0FBQUEsTUFDVDtBQUVNLFlBQU07QUFBQSxRQUNKLFFBQVM7QUFBQSxRQUNULGFBQVk7QUFBQSxNQUNwQjtBQUVNLFVBQUksTUFBTSxZQUFZLFFBQVEsTUFBTSxZQUFZLFFBQVE7QUFDdEQsY0FBTTtBQUFBLFVBQ0osTUFBTSxRQUFPO0FBQUEsUUFDdkI7QUFBQSxNQUNBO0FBRU0sYUFBTyxFQUFFLE9BQU8sTUFBTSxLQUFLO0FBQUEsSUFDakM7QUFBQSxFQUNBO0FBQ0EsQ0FBQzsiLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbMCwxLDIsMyw0LDUsNiw3LDgsOSwxMCwxMSwxMiwxM119
