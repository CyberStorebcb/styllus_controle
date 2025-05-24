import { c as createComponent, aS as useFieldEmits, aT as useFieldProps, aU as useField, aV as useFieldState, aL as useSizeProps, C as useDarkProps, g as getCurrentInstance, E as useDark, aM as useSize, k as computed, K as hDir, aW as Ripple, h, a6 as QIcon, aX as hMergeSlotSafely, A as stopAndPrevent, r as ref, x as prevent, u as addEvt, b as nextTick, ar as isKeyCode, w as watch, o as onMounted, a as onBeforeUnmount, q as cleanEvt, l as listenOpts, aY as portalProxyList, s as client, S as getScrollbarWidth, B as useModelToggleEmits, O as scrollTargetProp, aZ as useTransitionProps, D as useModelToggleProps, a_ as useTick, F as useTimeout, a$ as useTransition, G as useModelToggle, b0 as usePortal, b1 as addEscapeKey, b2 as removeEscapeKey, b3 as addFocusout, v as position, b4 as removeFocusout, P as getScrollTarget, b5 as closePortalMenus, b6 as childHasFocus, L as hSlot, ak as Transition, aI as addFocusFn, n as noop, b7 as debounce, aK as onBeforeMount, aF as onDeactivated, aG as onActivated, az as useFormProps, b8 as useFormInputNameAttr, b9 as fieldValueIsFilled, ba as useKeyComposition, bb as isDeepEqual, bc as shouldIgnoreKey, bd as onBeforeUpdate, be as onUpdated, y as stop, au as QDialog, V as hMergeSlot } from "./index-DTRxxbQ7.js";
import { c as QItemSection, a as QItemLabel, b as QItem } from "./QList-C--UWoUK.js";
import { c as clearSelection, n as normalizeToInterval } from "./format-B8-XYLEH.js";
const QField = createComponent({
  name: "QField",
  inheritAttrs: false,
  props: {
    ...useFieldProps,
    tag: {
      type: String,
      default: "label"
    }
  },
  emits: useFieldEmits,
  setup() {
    return useField(
      useFieldState({ tagProp: true })
    );
  }
});
const defaultSizes = {
  xs: 8,
  sm: 10,
  md: 14,
  lg: 20,
  xl: 24
};
const QChip = createComponent({
  name: "QChip",
  props: {
    ...useDarkProps,
    ...useSizeProps,
    dense: Boolean,
    icon: String,
    iconRight: String,
    iconRemove: String,
    iconSelected: String,
    label: [String, Number],
    color: String,
    textColor: String,
    modelValue: {
      type: Boolean,
      default: true
    },
    selected: {
      type: Boolean,
      default: null
    },
    square: Boolean,
    outline: Boolean,
    clickable: Boolean,
    removable: Boolean,
    removeAriaLabel: String,
    tabindex: [String, Number],
    disable: Boolean,
    ripple: {
      type: [Boolean, Object],
      default: true
    }
  },
  emits: ["update:modelValue", "update:selected", "remove", "click"],
  setup(props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();
    const isDark = useDark(props, $q);
    const sizeStyle = useSize(props, defaultSizes);
    const hasLeftIcon = computed(() => props.selected === true || props.icon !== void 0);
    const leftIcon = computed(() => props.selected === true ? props.iconSelected || $q.iconSet.chip.selected : props.icon);
    const removeIcon = computed(() => props.iconRemove || $q.iconSet.chip.remove);
    const isClickable = computed(
      () => props.disable === false && (props.clickable === true || props.selected !== null)
    );
    const classes = computed(() => {
      const text = props.outline === true ? props.color || props.textColor : props.textColor;
      return "q-chip row inline no-wrap items-center" + (props.outline === false && props.color !== void 0 ? ` bg-${props.color}` : "") + (text ? ` text-${text} q-chip--colored` : "") + (props.disable === true ? " disabled" : "") + (props.dense === true ? " q-chip--dense" : "") + (props.outline === true ? " q-chip--outline" : "") + (props.selected === true ? " q-chip--selected" : "") + (isClickable.value === true ? " q-chip--clickable cursor-pointer non-selectable q-hoverable" : "") + (props.square === true ? " q-chip--square" : "") + (isDark.value === true ? " q-chip--dark q-dark" : "");
    });
    const attributes = computed(() => {
      const chip = props.disable === true ? { tabindex: -1, "aria-disabled": "true" } : { tabindex: props.tabindex || 0 };
      const remove = {
        ...chip,
        role: "button",
        "aria-hidden": "false",
        "aria-label": props.removeAriaLabel || $q.lang.label.remove
      };
      return { chip, remove };
    });
    function onKeyup(e) {
      e.keyCode === 13 && onClick(e);
    }
    function onClick(e) {
      if (!props.disable) {
        emit("update:selected", !props.selected);
        emit("click", e);
      }
    }
    function onRemove(e) {
      if (e.keyCode === void 0 || e.keyCode === 13) {
        stopAndPrevent(e);
        if (props.disable === false) {
          emit("update:modelValue", false);
          emit("remove");
        }
      }
    }
    function getContent() {
      const child = [];
      isClickable.value === true && child.push(
        h("div", { class: "q-focus-helper" })
      );
      hasLeftIcon.value === true && child.push(
        h(QIcon, {
          class: "q-chip__icon q-chip__icon--left",
          name: leftIcon.value
        })
      );
      const label = props.label !== void 0 ? [h("div", { class: "ellipsis" }, [props.label])] : void 0;
      child.push(
        h("div", {
          class: "q-chip__content col row no-wrap items-center q-anchor--skip"
        }, hMergeSlotSafely(slots.default, label))
      );
      props.iconRight && child.push(
        h(QIcon, {
          class: "q-chip__icon q-chip__icon--right",
          name: props.iconRight
        })
      );
      props.removable === true && child.push(
        h(QIcon, {
          class: "q-chip__icon q-chip__icon--remove cursor-pointer",
          name: removeIcon.value,
          ...attributes.value.remove,
          onClick: onRemove,
          onKeyup: onRemove
        })
      );
      return child;
    }
    return () => {
      if (props.modelValue === false) return;
      const data = {
        class: classes.value,
        style: sizeStyle.value
      };
      isClickable.value === true && Object.assign(
        data,
        attributes.value.chip,
        { onClick, onKeyup }
      );
      return hDir(
        "div",
        data,
        getContent(),
        "ripple",
        props.ripple !== false && props.disable !== true,
        () => [[Ripple, props.ripple]]
      );
    };
  }
});
const useAnchorStaticProps = {
  /* SSR does not know about Element */
  target: {
    type: [Boolean, String, Element],
    default: true
  },
  noParentEvent: Boolean
};
const useAnchorProps = {
  ...useAnchorStaticProps,
  contextMenu: Boolean
};
function useAnchor({
  showing,
  avoidEmit,
  // required for QPopupProxy (true)
  configureAnchorEl
  // optional
}) {
  const { props, proxy, emit } = getCurrentInstance();
  const anchorEl = ref(null);
  let touchTimer = null;
  function canShow(evt) {
    return anchorEl.value === null ? false : evt === void 0 || evt.touches === void 0 || evt.touches.length <= 1;
  }
  const anchorEvents = {};
  if (configureAnchorEl === void 0) {
    Object.assign(anchorEvents, {
      hide(evt) {
        proxy.hide(evt);
      },
      toggle(evt) {
        proxy.toggle(evt);
        evt.qAnchorHandled = true;
      },
      toggleKey(evt) {
        isKeyCode(evt, 13) === true && anchorEvents.toggle(evt);
      },
      contextClick(evt) {
        proxy.hide(evt);
        prevent(evt);
        nextTick(() => {
          proxy.show(evt);
          evt.qAnchorHandled = true;
        });
      },
      prevent,
      mobileTouch(evt) {
        anchorEvents.mobileCleanup(evt);
        if (canShow(evt) !== true) return;
        proxy.hide(evt);
        anchorEl.value.classList.add("non-selectable");
        const target = evt.target;
        addEvt(anchorEvents, "anchor", [
          [target, "touchmove", "mobileCleanup", "passive"],
          [target, "touchend", "mobileCleanup", "passive"],
          [target, "touchcancel", "mobileCleanup", "passive"],
          [anchorEl.value, "contextmenu", "prevent", "notPassive"]
        ]);
        touchTimer = setTimeout(() => {
          touchTimer = null;
          proxy.show(evt);
          evt.qAnchorHandled = true;
        }, 300);
      },
      mobileCleanup(evt) {
        anchorEl.value.classList.remove("non-selectable");
        if (touchTimer !== null) {
          clearTimeout(touchTimer);
          touchTimer = null;
        }
        if (showing.value === true && evt !== void 0) {
          clearSelection();
        }
      }
    });
    configureAnchorEl = function(context = props.contextMenu) {
      if (props.noParentEvent === true || anchorEl.value === null) return;
      let evts;
      if (context === true) {
        if (proxy.$q.platform.is.mobile === true) {
          evts = [
            [anchorEl.value, "touchstart", "mobileTouch", "passive"]
          ];
        } else {
          evts = [
            [anchorEl.value, "mousedown", "hide", "passive"],
            [anchorEl.value, "contextmenu", "contextClick", "notPassive"]
          ];
        }
      } else {
        evts = [
          [anchorEl.value, "click", "toggle", "passive"],
          [anchorEl.value, "keyup", "toggleKey", "passive"]
        ];
      }
      addEvt(anchorEvents, "anchor", evts);
    };
  }
  function unconfigureAnchorEl() {
    cleanEvt(anchorEvents, "anchor");
  }
  function setAnchorEl(el) {
    anchorEl.value = el;
    while (anchorEl.value.classList.contains("q-anchor--skip")) {
      anchorEl.value = anchorEl.value.parentNode;
    }
    configureAnchorEl();
  }
  function pickAnchorEl() {
    if (props.target === false || props.target === "" || proxy.$el.parentNode === null) {
      anchorEl.value = null;
    } else if (props.target === true) {
      setAnchorEl(proxy.$el.parentNode);
    } else {
      let el = props.target;
      if (typeof props.target === "string") {
        try {
          el = document.querySelector(props.target);
        } catch (err) {
          el = void 0;
        }
      }
      if (el !== void 0 && el !== null) {
        anchorEl.value = el.$el || el;
        configureAnchorEl();
      } else {
        anchorEl.value = null;
        console.error(`Anchor: target "${props.target}" not found`);
      }
    }
  }
  watch(() => props.contextMenu, (val) => {
    if (anchorEl.value !== null) {
      unconfigureAnchorEl();
      configureAnchorEl(val);
    }
  });
  watch(() => props.target, () => {
    if (anchorEl.value !== null) {
      unconfigureAnchorEl();
    }
    pickAnchorEl();
  });
  watch(() => props.noParentEvent, (val) => {
    if (anchorEl.value !== null) {
      if (val === true) {
        unconfigureAnchorEl();
      } else {
        configureAnchorEl();
      }
    }
  });
  onMounted(() => {
    pickAnchorEl();
    if (avoidEmit !== true && props.modelValue === true && anchorEl.value === null) {
      emit("update:modelValue", false);
    }
  });
  onBeforeUnmount(() => {
    touchTimer !== null && clearTimeout(touchTimer);
    unconfigureAnchorEl();
  });
  return {
    anchorEl,
    canShow,
    anchorEvents
  };
}
function useScrollTarget(props, configureScrollTarget) {
  const localScrollTarget = ref(null);
  let scrollFn;
  function changeScrollEvent(scrollTarget, fn) {
    const fnProp = `${fn !== void 0 ? "add" : "remove"}EventListener`;
    const fnHandler = fn !== void 0 ? fn : scrollFn;
    if (scrollTarget !== window) {
      scrollTarget[fnProp]("scroll", fnHandler, listenOpts.passive);
    }
    window[fnProp]("scroll", fnHandler, listenOpts.passive);
    scrollFn = fn;
  }
  function unconfigureScrollTarget() {
    if (localScrollTarget.value !== null) {
      changeScrollEvent(localScrollTarget.value);
      localScrollTarget.value = null;
    }
  }
  const noParentEventWatcher = watch(() => props.noParentEvent, () => {
    if (localScrollTarget.value !== null) {
      unconfigureScrollTarget();
      configureScrollTarget();
    }
  });
  onBeforeUnmount(noParentEventWatcher);
  return {
    localScrollTarget,
    unconfigureScrollTarget,
    changeScrollEvent
  };
}
const { notPassiveCapture } = listenOpts, registeredList = [];
function globalHandler(evt) {
  const target = evt.target;
  if (target === void 0 || target.nodeType === 8 || target.classList.contains("no-pointer-events") === true) return;
  let portalIndex = portalProxyList.length - 1;
  while (portalIndex >= 0) {
    const proxy = portalProxyList[portalIndex].$;
    if (proxy.type.name === "QTooltip") {
      portalIndex--;
      continue;
    }
    if (proxy.type.name !== "QDialog") {
      break;
    }
    if (proxy.props.seamless !== true) return;
    portalIndex--;
  }
  for (let i = registeredList.length - 1; i >= 0; i--) {
    const state = registeredList[i];
    if ((state.anchorEl.value === null || state.anchorEl.value.contains(target) === false) && (target === document.body || state.innerRef.value !== null && state.innerRef.value.contains(target) === false)) {
      evt.qClickOutside = true;
      state.onClickOutside(evt);
    } else {
      return;
    }
  }
}
function addClickOutside(clickOutsideProps) {
  registeredList.push(clickOutsideProps);
  if (registeredList.length === 1) {
    document.addEventListener("mousedown", globalHandler, notPassiveCapture);
    document.addEventListener("touchstart", globalHandler, notPassiveCapture);
  }
}
function removeClickOutside(clickOutsideProps) {
  const index = registeredList.findIndex((h2) => h2 === clickOutsideProps);
  if (index !== -1) {
    registeredList.splice(index, 1);
    if (registeredList.length === 0) {
      document.removeEventListener("mousedown", globalHandler, notPassiveCapture);
      document.removeEventListener("touchstart", globalHandler, notPassiveCapture);
    }
  }
}
let vpLeft, vpTop;
function validatePosition(pos) {
  const parts = pos.split(" ");
  if (parts.length !== 2) {
    return false;
  }
  if (["top", "center", "bottom"].includes(parts[0]) !== true) {
    console.error("Anchor/Self position must start with one of top/center/bottom");
    return false;
  }
  if (["left", "middle", "right", "start", "end"].includes(parts[1]) !== true) {
    console.error("Anchor/Self position must end with one of left/middle/right/start/end");
    return false;
  }
  return true;
}
function validateOffset(val) {
  if (!val) {
    return true;
  }
  if (val.length !== 2) {
    return false;
  }
  if (typeof val[0] !== "number" || typeof val[1] !== "number") {
    return false;
  }
  return true;
}
const horizontalPos = {
  "start#ltr": "left",
  "start#rtl": "right",
  "end#ltr": "right",
  "end#rtl": "left"
};
["left", "middle", "right"].forEach((pos) => {
  horizontalPos[`${pos}#ltr`] = pos;
  horizontalPos[`${pos}#rtl`] = pos;
});
function parsePosition(pos, rtl) {
  const parts = pos.split(" ");
  return {
    vertical: parts[0],
    horizontal: horizontalPos[`${parts[1]}#${rtl === true ? "rtl" : "ltr"}`]
  };
}
function getAnchorProps(el, offset) {
  let { top, left, right, bottom, width, height } = el.getBoundingClientRect();
  if (offset !== void 0) {
    top -= offset[1];
    left -= offset[0];
    bottom += offset[1];
    right += offset[0];
    width += offset[0];
    height += offset[1];
  }
  return {
    top,
    bottom,
    height,
    left,
    right,
    width,
    middle: left + (right - left) / 2,
    center: top + (bottom - top) / 2
  };
}
function getAbsoluteAnchorProps(el, absoluteOffset, offset) {
  let { top, left } = el.getBoundingClientRect();
  top += absoluteOffset.top;
  left += absoluteOffset.left;
  if (offset !== void 0) {
    top += offset[1];
    left += offset[0];
  }
  return {
    top,
    bottom: top + 1,
    height: 1,
    left,
    right: left + 1,
    width: 1,
    middle: left,
    center: top
  };
}
function getTargetProps(width, height) {
  return {
    top: 0,
    center: height / 2,
    bottom: height,
    left: 0,
    middle: width / 2,
    right: width
  };
}
function getTopLeftProps(anchorProps, targetProps, anchorOrigin, selfOrigin) {
  return {
    top: anchorProps[anchorOrigin.vertical] - targetProps[selfOrigin.vertical],
    left: anchorProps[anchorOrigin.horizontal] - targetProps[selfOrigin.horizontal]
  };
}
function setPosition(cfg, retryNumber = 0) {
  if (cfg.targetEl === null || cfg.anchorEl === null || retryNumber > 5) return;
  if (cfg.targetEl.offsetHeight === 0 || cfg.targetEl.offsetWidth === 0) {
    setTimeout(() => {
      setPosition(cfg, retryNumber + 1);
    }, 10);
    return;
  }
  const {
    targetEl,
    offset,
    anchorEl,
    anchorOrigin,
    selfOrigin,
    absoluteOffset,
    fit,
    cover,
    maxHeight,
    maxWidth
  } = cfg;
  if (client.is.ios === true && window.visualViewport !== void 0) {
    const el = document.body.style;
    const { offsetLeft: left, offsetTop: top } = window.visualViewport;
    if (left !== vpLeft) {
      el.setProperty("--q-pe-left", left + "px");
      vpLeft = left;
    }
    if (top !== vpTop) {
      el.setProperty("--q-pe-top", top + "px");
      vpTop = top;
    }
  }
  const { scrollLeft, scrollTop } = targetEl;
  const anchorProps = absoluteOffset === void 0 ? getAnchorProps(anchorEl, cover === true ? [0, 0] : offset) : getAbsoluteAnchorProps(anchorEl, absoluteOffset, offset);
  Object.assign(targetEl.style, {
    top: 0,
    left: 0,
    minWidth: null,
    minHeight: null,
    maxWidth,
    maxHeight,
    visibility: "visible"
  });
  const { offsetWidth: origElWidth, offsetHeight: origElHeight } = targetEl;
  const { elWidth, elHeight } = fit === true || cover === true ? { elWidth: Math.max(anchorProps.width, origElWidth), elHeight: cover === true ? Math.max(anchorProps.height, origElHeight) : origElHeight } : { elWidth: origElWidth, elHeight: origElHeight };
  let elStyle = { maxWidth, maxHeight };
  if (fit === true || cover === true) {
    elStyle.minWidth = anchorProps.width + "px";
    if (cover === true) {
      elStyle.minHeight = anchorProps.height + "px";
    }
  }
  Object.assign(targetEl.style, elStyle);
  const targetProps = getTargetProps(elWidth, elHeight);
  let props = getTopLeftProps(anchorProps, targetProps, anchorOrigin, selfOrigin);
  if (absoluteOffset === void 0 || offset === void 0) {
    applyBoundaries(props, anchorProps, targetProps, anchorOrigin, selfOrigin);
  } else {
    const { top, left } = props;
    applyBoundaries(props, anchorProps, targetProps, anchorOrigin, selfOrigin);
    let hasChanged = false;
    if (props.top !== top) {
      hasChanged = true;
      const offsetY = 2 * offset[1];
      anchorProps.center = anchorProps.top -= offsetY;
      anchorProps.bottom -= offsetY + 2;
    }
    if (props.left !== left) {
      hasChanged = true;
      const offsetX = 2 * offset[0];
      anchorProps.middle = anchorProps.left -= offsetX;
      anchorProps.right -= offsetX + 2;
    }
    if (hasChanged === true) {
      props = getTopLeftProps(anchorProps, targetProps, anchorOrigin, selfOrigin);
      applyBoundaries(props, anchorProps, targetProps, anchorOrigin, selfOrigin);
    }
  }
  elStyle = {
    top: props.top + "px",
    left: props.left + "px"
  };
  if (props.maxHeight !== void 0) {
    elStyle.maxHeight = props.maxHeight + "px";
    if (anchorProps.height > props.maxHeight) {
      elStyle.minHeight = elStyle.maxHeight;
    }
  }
  if (props.maxWidth !== void 0) {
    elStyle.maxWidth = props.maxWidth + "px";
    if (anchorProps.width > props.maxWidth) {
      elStyle.minWidth = elStyle.maxWidth;
    }
  }
  Object.assign(targetEl.style, elStyle);
  if (targetEl.scrollTop !== scrollTop) {
    targetEl.scrollTop = scrollTop;
  }
  if (targetEl.scrollLeft !== scrollLeft) {
    targetEl.scrollLeft = scrollLeft;
  }
}
function applyBoundaries(props, anchorProps, targetProps, anchorOrigin, selfOrigin) {
  const currentHeight = targetProps.bottom, currentWidth = targetProps.right, margin = getScrollbarWidth(), innerHeight = window.innerHeight - margin, innerWidth = document.body.clientWidth;
  if (props.top < 0 || props.top + currentHeight > innerHeight) {
    if (selfOrigin.vertical === "center") {
      props.top = anchorProps[anchorOrigin.vertical] > innerHeight / 2 ? Math.max(0, innerHeight - currentHeight) : 0;
      props.maxHeight = Math.min(currentHeight, innerHeight);
    } else if (anchorProps[anchorOrigin.vertical] > innerHeight / 2) {
      const anchorY = Math.min(
        innerHeight,
        anchorOrigin.vertical === "center" ? anchorProps.center : anchorOrigin.vertical === selfOrigin.vertical ? anchorProps.bottom : anchorProps.top
      );
      props.maxHeight = Math.min(currentHeight, anchorY);
      props.top = Math.max(0, anchorY - currentHeight);
    } else {
      props.top = Math.max(
        0,
        anchorOrigin.vertical === "center" ? anchorProps.center : anchorOrigin.vertical === selfOrigin.vertical ? anchorProps.top : anchorProps.bottom
      );
      props.maxHeight = Math.min(currentHeight, innerHeight - props.top);
    }
  }
  if (props.left < 0 || props.left + currentWidth > innerWidth) {
    props.maxWidth = Math.min(currentWidth, innerWidth);
    if (selfOrigin.horizontal === "middle") {
      props.left = anchorProps[anchorOrigin.horizontal] > innerWidth / 2 ? Math.max(0, innerWidth - currentWidth) : 0;
    } else if (anchorProps[anchorOrigin.horizontal] > innerWidth / 2) {
      const anchorX = Math.min(
        innerWidth,
        anchorOrigin.horizontal === "middle" ? anchorProps.middle : anchorOrigin.horizontal === selfOrigin.horizontal ? anchorProps.right : anchorProps.left
      );
      props.maxWidth = Math.min(currentWidth, anchorX);
      props.left = Math.max(0, anchorX - props.maxWidth);
    } else {
      props.left = Math.max(
        0,
        anchorOrigin.horizontal === "middle" ? anchorProps.middle : anchorOrigin.horizontal === selfOrigin.horizontal ? anchorProps.left : anchorProps.right
      );
      props.maxWidth = Math.min(currentWidth, innerWidth - props.left);
    }
  }
}
const QMenu = createComponent({
  name: "QMenu",
  inheritAttrs: false,
  props: {
    ...useAnchorProps,
    ...useModelToggleProps,
    ...useDarkProps,
    ...useTransitionProps,
    persistent: Boolean,
    autoClose: Boolean,
    separateClosePopup: Boolean,
    noEscDismiss: Boolean,
    noRouteDismiss: Boolean,
    noRefocus: Boolean,
    noFocus: Boolean,
    fit: Boolean,
    cover: Boolean,
    square: Boolean,
    anchor: {
      type: String,
      validator: validatePosition
    },
    self: {
      type: String,
      validator: validatePosition
    },
    offset: {
      type: Array,
      validator: validateOffset
    },
    scrollTarget: scrollTargetProp,
    touchPosition: Boolean,
    maxHeight: {
      type: String,
      default: null
    },
    maxWidth: {
      type: String,
      default: null
    }
  },
  emits: [
    ...useModelToggleEmits,
    "click",
    "escapeKey"
  ],
  setup(props, { slots, emit, attrs }) {
    let refocusTarget = null, absoluteOffset, unwatchPosition, avoidAutoClose;
    const vm = getCurrentInstance();
    const { proxy } = vm;
    const { $q } = proxy;
    const innerRef = ref(null);
    const showing = ref(false);
    const hideOnRouteChange = computed(
      () => props.persistent !== true && props.noRouteDismiss !== true
    );
    const isDark = useDark(props, $q);
    const { registerTick, removeTick } = useTick();
    const { registerTimeout } = useTimeout();
    const { transitionProps, transitionStyle } = useTransition(props);
    const { localScrollTarget, changeScrollEvent, unconfigureScrollTarget } = useScrollTarget(props, configureScrollTarget);
    const { anchorEl, canShow } = useAnchor({ showing });
    const { hide } = useModelToggle({
      showing,
      canShow,
      handleShow,
      handleHide,
      hideOnRouteChange,
      processOnMount: true
    });
    const { showPortal, hidePortal, renderPortal } = usePortal(vm, innerRef, renderPortalContent, "menu");
    const clickOutsideProps = {
      anchorEl,
      innerRef,
      onClickOutside(e) {
        if (props.persistent !== true && showing.value === true) {
          hide(e);
          if (
            // always prevent touch event
            e.type === "touchstart" || e.target.classList.contains("q-dialog__backdrop")
          ) {
            stopAndPrevent(e);
          }
          return true;
        }
      }
    };
    const anchorOrigin = computed(
      () => parsePosition(
        props.anchor || (props.cover === true ? "center middle" : "bottom start"),
        $q.lang.rtl
      )
    );
    const selfOrigin = computed(() => props.cover === true ? anchorOrigin.value : parsePosition(props.self || "top start", $q.lang.rtl));
    const menuClass = computed(
      () => (props.square === true ? " q-menu--square" : "") + (isDark.value === true ? " q-menu--dark q-dark" : "")
    );
    const onEvents = computed(() => props.autoClose === true ? { onClick: onAutoClose } : {});
    const handlesFocus = computed(
      () => showing.value === true && props.persistent !== true
    );
    watch(handlesFocus, (val) => {
      if (val === true) {
        addEscapeKey(onEscapeKey);
        addClickOutside(clickOutsideProps);
      } else {
        removeEscapeKey(onEscapeKey);
        removeClickOutside(clickOutsideProps);
      }
    });
    function focus() {
      addFocusFn(() => {
        let node = innerRef.value;
        if (node && node.contains(document.activeElement) !== true) {
          node = node.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]") || node.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]") || node.querySelector("[autofocus], [data-autofocus]") || node;
          node.focus({ preventScroll: true });
        }
      });
    }
    function handleShow(evt) {
      refocusTarget = props.noRefocus === false ? document.activeElement : null;
      addFocusout(onFocusout);
      showPortal();
      configureScrollTarget();
      absoluteOffset = void 0;
      if (evt !== void 0 && (props.touchPosition || props.contextMenu)) {
        const pos = position(evt);
        if (pos.left !== void 0) {
          const { top, left } = anchorEl.value.getBoundingClientRect();
          absoluteOffset = { left: pos.left - left, top: pos.top - top };
        }
      }
      if (unwatchPosition === void 0) {
        unwatchPosition = watch(
          () => $q.screen.width + "|" + $q.screen.height + "|" + props.self + "|" + props.anchor + "|" + $q.lang.rtl,
          updatePosition
        );
      }
      if (props.noFocus !== true) {
        document.activeElement.blur();
      }
      registerTick(() => {
        updatePosition();
        props.noFocus !== true && focus();
      });
      registerTimeout(() => {
        if ($q.platform.is.ios === true) {
          avoidAutoClose = props.autoClose;
          innerRef.value.click();
        }
        updatePosition();
        showPortal(true);
        emit("show", evt);
      }, props.transitionDuration);
    }
    function handleHide(evt) {
      removeTick();
      hidePortal();
      anchorCleanup(true);
      if (refocusTarget !== null && // menu was hidden from code or ESC plugin
      (evt === void 0 || evt.qClickOutside !== true)) {
        ((evt?.type.indexOf("key") === 0 ? refocusTarget.closest('[tabindex]:not([tabindex^="-"])') : void 0) || refocusTarget).focus();
        refocusTarget = null;
      }
      registerTimeout(() => {
        hidePortal(true);
        emit("hide", evt);
      }, props.transitionDuration);
    }
    function anchorCleanup(hiding) {
      absoluteOffset = void 0;
      if (unwatchPosition !== void 0) {
        unwatchPosition();
        unwatchPosition = void 0;
      }
      if (hiding === true || showing.value === true) {
        removeFocusout(onFocusout);
        unconfigureScrollTarget();
        removeClickOutside(clickOutsideProps);
        removeEscapeKey(onEscapeKey);
      }
      if (hiding !== true) {
        refocusTarget = null;
      }
    }
    function configureScrollTarget() {
      if (anchorEl.value !== null || props.scrollTarget !== void 0) {
        localScrollTarget.value = getScrollTarget(anchorEl.value, props.scrollTarget);
        changeScrollEvent(localScrollTarget.value, updatePosition);
      }
    }
    function onAutoClose(e) {
      if (avoidAutoClose !== true) {
        closePortalMenus(proxy, e);
        emit("click", e);
      } else {
        avoidAutoClose = false;
      }
    }
    function onFocusout(evt) {
      if (handlesFocus.value === true && props.noFocus !== true && childHasFocus(innerRef.value, evt.target) !== true) {
        focus();
      }
    }
    function onEscapeKey(evt) {
      if (props.noEscDismiss !== true) {
        emit("escapeKey");
        hide(evt);
      }
    }
    function updatePosition() {
      setPosition({
        targetEl: innerRef.value,
        offset: props.offset,
        anchorEl: anchorEl.value,
        anchorOrigin: anchorOrigin.value,
        selfOrigin: selfOrigin.value,
        absoluteOffset,
        fit: props.fit,
        cover: props.cover,
        maxHeight: props.maxHeight,
        maxWidth: props.maxWidth
      });
    }
    function renderPortalContent() {
      return h(
        Transition,
        transitionProps.value,
        () => showing.value === true ? h("div", {
          role: "menu",
          ...attrs,
          ref: innerRef,
          tabindex: -1,
          class: [
            "q-menu q-position-engine scroll" + menuClass.value,
            attrs.class
          ],
          style: [
            attrs.style,
            transitionStyle.value
          ],
          ...onEvents.value
        }, hSlot(slots.default)) : null
      );
    }
    onBeforeUnmount(anchorCleanup);
    Object.assign(proxy, { focus, updatePosition });
    return renderPortal;
  }
});
let rtlHasScrollBug = false;
{
  const scroller = document.createElement("div");
  scroller.setAttribute("dir", "rtl");
  Object.assign(scroller.style, {
    width: "1px",
    height: "1px",
    overflow: "auto"
  });
  const spacer = document.createElement("div");
  Object.assign(spacer.style, {
    width: "1000px",
    height: "1px"
  });
  document.body.appendChild(scroller);
  scroller.appendChild(spacer);
  scroller.scrollLeft = -1e3;
  rtlHasScrollBug = scroller.scrollLeft >= 0;
  scroller.remove();
}
const aggBucketSize = 1e3;
const scrollToEdges = [
  "start",
  "center",
  "end",
  "start-force",
  "center-force",
  "end-force"
];
const filterProto = Array.prototype.filter;
const setOverflowAnchor = window.getComputedStyle(document.body).overflowAnchor === void 0 ? noop : function(contentEl, index) {
  if (contentEl === null) return;
  if (contentEl._qOverflowAnimationFrame !== void 0) {
    cancelAnimationFrame(contentEl._qOverflowAnimationFrame);
  }
  contentEl._qOverflowAnimationFrame = requestAnimationFrame(() => {
    if (contentEl === null) return;
    contentEl._qOverflowAnimationFrame = void 0;
    const children = contentEl.children || [];
    filterProto.call(children, (el2) => el2.dataset && el2.dataset.qVsAnchor !== void 0).forEach((el2) => {
      delete el2.dataset.qVsAnchor;
    });
    const el = children[index];
    if (el?.dataset) {
      el.dataset.qVsAnchor = "";
    }
  });
};
function sumFn(acc, h2) {
  return acc + h2;
}
function getScrollDetails(parent, child, beforeRef, afterRef, horizontal, rtl, stickyStart, stickyEnd) {
  const parentCalc = parent === window ? document.scrollingElement || document.documentElement : parent, propElSize = horizontal === true ? "offsetWidth" : "offsetHeight", details = {
    scrollStart: 0,
    scrollViewSize: -stickyStart - stickyEnd,
    scrollMaxSize: 0,
    offsetStart: -stickyStart,
    offsetEnd: -stickyEnd
  };
  if (horizontal === true) {
    if (parent === window) {
      details.scrollStart = window.pageXOffset || window.scrollX || document.body.scrollLeft || 0;
      details.scrollViewSize += document.documentElement.clientWidth;
    } else {
      details.scrollStart = parentCalc.scrollLeft;
      details.scrollViewSize += parentCalc.clientWidth;
    }
    details.scrollMaxSize = parentCalc.scrollWidth;
    if (rtl === true) {
      details.scrollStart = (rtlHasScrollBug === true ? details.scrollMaxSize - details.scrollViewSize : 0) - details.scrollStart;
    }
  } else {
    if (parent === window) {
      details.scrollStart = window.pageYOffset || window.scrollY || document.body.scrollTop || 0;
      details.scrollViewSize += document.documentElement.clientHeight;
    } else {
      details.scrollStart = parentCalc.scrollTop;
      details.scrollViewSize += parentCalc.clientHeight;
    }
    details.scrollMaxSize = parentCalc.scrollHeight;
  }
  if (beforeRef !== null) {
    for (let el = beforeRef.previousElementSibling; el !== null; el = el.previousElementSibling) {
      if (el.classList.contains("q-virtual-scroll--skip") === false) {
        details.offsetStart += el[propElSize];
      }
    }
  }
  if (afterRef !== null) {
    for (let el = afterRef.nextElementSibling; el !== null; el = el.nextElementSibling) {
      if (el.classList.contains("q-virtual-scroll--skip") === false) {
        details.offsetEnd += el[propElSize];
      }
    }
  }
  if (child !== parent) {
    const parentRect = parentCalc.getBoundingClientRect(), childRect = child.getBoundingClientRect();
    if (horizontal === true) {
      details.offsetStart += childRect.left - parentRect.left;
      details.offsetEnd -= childRect.width;
    } else {
      details.offsetStart += childRect.top - parentRect.top;
      details.offsetEnd -= childRect.height;
    }
    if (parent !== window) {
      details.offsetStart += details.scrollStart;
    }
    details.offsetEnd += details.scrollMaxSize - details.offsetStart;
  }
  return details;
}
function setScroll(parent, scroll, horizontal, rtl) {
  if (scroll === "end") {
    scroll = (parent === window ? document.body : parent)[horizontal === true ? "scrollWidth" : "scrollHeight"];
  }
  if (parent === window) {
    if (horizontal === true) {
      if (rtl === true) {
        scroll = (rtlHasScrollBug === true ? document.body.scrollWidth - document.documentElement.clientWidth : 0) - scroll;
      }
      window.scrollTo(scroll, window.pageYOffset || window.scrollY || document.body.scrollTop || 0);
    } else {
      window.scrollTo(window.pageXOffset || window.scrollX || document.body.scrollLeft || 0, scroll);
    }
  } else if (horizontal === true) {
    if (rtl === true) {
      scroll = (rtlHasScrollBug === true ? parent.scrollWidth - parent.offsetWidth : 0) - scroll;
    }
    parent.scrollLeft = scroll;
  } else {
    parent.scrollTop = scroll;
  }
}
function sumSize(sizeAgg, size, from, to) {
  if (from >= to) {
    return 0;
  }
  const lastTo = size.length, fromAgg = Math.floor(from / aggBucketSize), toAgg = Math.floor((to - 1) / aggBucketSize) + 1;
  let total = sizeAgg.slice(fromAgg, toAgg).reduce(sumFn, 0);
  if (from % aggBucketSize !== 0) {
    total -= size.slice(fromAgg * aggBucketSize, from).reduce(sumFn, 0);
  }
  if (to % aggBucketSize !== 0 && to !== lastTo) {
    total -= size.slice(to, toAgg * aggBucketSize).reduce(sumFn, 0);
  }
  return total;
}
const commonVirtScrollProps = {
  virtualScrollSliceSize: {
    type: [Number, String],
    default: 10
  },
  virtualScrollSliceRatioBefore: {
    type: [Number, String],
    default: 1
  },
  virtualScrollSliceRatioAfter: {
    type: [Number, String],
    default: 1
  },
  virtualScrollItemSize: {
    type: [Number, String],
    default: 24
  },
  virtualScrollStickySizeStart: {
    type: [Number, String],
    default: 0
  },
  virtualScrollStickySizeEnd: {
    type: [Number, String],
    default: 0
  },
  tableColspan: [Number, String]
};
const commonVirtScrollPropsList = Object.keys(commonVirtScrollProps);
const useVirtualScrollProps = {
  virtualScrollHorizontal: Boolean,
  onVirtualScroll: Function,
  ...commonVirtScrollProps
};
function useVirtualScroll({
  virtualScrollLength,
  getVirtualScrollTarget,
  getVirtualScrollEl,
  virtualScrollItemSizeComputed
  // optional
}) {
  const vm = getCurrentInstance();
  const { props, emit, proxy } = vm;
  const { $q } = proxy;
  let prevScrollStart, prevToIndex, localScrollViewSize, virtualScrollSizesAgg = [], virtualScrollSizes;
  const virtualScrollPaddingBefore = ref(0);
  const virtualScrollPaddingAfter = ref(0);
  const virtualScrollSliceSizeComputed = ref({});
  const beforeRef = ref(null);
  const afterRef = ref(null);
  const contentRef = ref(null);
  const virtualScrollSliceRange = ref({ from: 0, to: 0 });
  const colspanAttr = computed(() => props.tableColspan !== void 0 ? props.tableColspan : 100);
  if (virtualScrollItemSizeComputed === void 0) {
    virtualScrollItemSizeComputed = computed(() => props.virtualScrollItemSize);
  }
  const needsReset = computed(() => virtualScrollItemSizeComputed.value + ";" + props.virtualScrollHorizontal);
  const needsSliceRecalc = computed(
    () => needsReset.value + ";" + props.virtualScrollSliceRatioBefore + ";" + props.virtualScrollSliceRatioAfter
  );
  watch(needsSliceRecalc, () => {
    setVirtualScrollSize();
  });
  watch(needsReset, reset);
  function reset() {
    localResetVirtualScroll(prevToIndex, true);
  }
  function refresh(toIndex) {
    localResetVirtualScroll(toIndex === void 0 ? prevToIndex : toIndex);
  }
  function scrollTo(toIndex, edge) {
    const scrollEl = getVirtualScrollTarget();
    if (scrollEl === void 0 || scrollEl === null || scrollEl.nodeType === 8) return;
    const scrollDetails = getScrollDetails(
      scrollEl,
      getVirtualScrollEl(),
      beforeRef.value,
      afterRef.value,
      props.virtualScrollHorizontal,
      $q.lang.rtl,
      props.virtualScrollStickySizeStart,
      props.virtualScrollStickySizeEnd
    );
    localScrollViewSize !== scrollDetails.scrollViewSize && setVirtualScrollSize(scrollDetails.scrollViewSize);
    setVirtualScrollSliceRange(
      scrollEl,
      scrollDetails,
      Math.min(virtualScrollLength.value - 1, Math.max(0, parseInt(toIndex, 10) || 0)),
      0,
      scrollToEdges.indexOf(edge) !== -1 ? edge : prevToIndex !== -1 && toIndex > prevToIndex ? "end" : "start"
    );
  }
  function localOnVirtualScrollEvt() {
    const scrollEl = getVirtualScrollTarget();
    if (scrollEl === void 0 || scrollEl === null || scrollEl.nodeType === 8) return;
    const scrollDetails = getScrollDetails(
      scrollEl,
      getVirtualScrollEl(),
      beforeRef.value,
      afterRef.value,
      props.virtualScrollHorizontal,
      $q.lang.rtl,
      props.virtualScrollStickySizeStart,
      props.virtualScrollStickySizeEnd
    ), listLastIndex = virtualScrollLength.value - 1, listEndOffset = scrollDetails.scrollMaxSize - scrollDetails.offsetStart - scrollDetails.offsetEnd - virtualScrollPaddingAfter.value;
    if (prevScrollStart === scrollDetails.scrollStart) return;
    if (scrollDetails.scrollMaxSize <= 0) {
      setVirtualScrollSliceRange(scrollEl, scrollDetails, 0, 0);
      return;
    }
    localScrollViewSize !== scrollDetails.scrollViewSize && setVirtualScrollSize(scrollDetails.scrollViewSize);
    updateVirtualScrollSizes(virtualScrollSliceRange.value.from);
    const scrollMaxStart = Math.floor(scrollDetails.scrollMaxSize - Math.max(scrollDetails.scrollViewSize, scrollDetails.offsetEnd) - Math.min(virtualScrollSizes[listLastIndex], scrollDetails.scrollViewSize / 2));
    if (scrollMaxStart > 0 && Math.ceil(scrollDetails.scrollStart) >= scrollMaxStart) {
      setVirtualScrollSliceRange(
        scrollEl,
        scrollDetails,
        listLastIndex,
        scrollDetails.scrollMaxSize - scrollDetails.offsetEnd - virtualScrollSizesAgg.reduce(sumFn, 0)
      );
      return;
    }
    let toIndex = 0, listOffset = scrollDetails.scrollStart - scrollDetails.offsetStart, offset = listOffset;
    if (listOffset <= listEndOffset && listOffset + scrollDetails.scrollViewSize >= virtualScrollPaddingBefore.value) {
      listOffset -= virtualScrollPaddingBefore.value;
      toIndex = virtualScrollSliceRange.value.from;
      offset = listOffset;
    } else {
      for (let j = 0; listOffset >= virtualScrollSizesAgg[j] && toIndex < listLastIndex; j++) {
        listOffset -= virtualScrollSizesAgg[j];
        toIndex += aggBucketSize;
      }
    }
    while (listOffset > 0 && toIndex < listLastIndex) {
      listOffset -= virtualScrollSizes[toIndex];
      if (listOffset > -scrollDetails.scrollViewSize) {
        toIndex++;
        offset = listOffset;
      } else {
        offset = virtualScrollSizes[toIndex] + listOffset;
      }
    }
    setVirtualScrollSliceRange(
      scrollEl,
      scrollDetails,
      toIndex,
      offset
    );
  }
  function setVirtualScrollSliceRange(scrollEl, scrollDetails, toIndex, offset, align) {
    const alignForce = typeof align === "string" && align.indexOf("-force") !== -1;
    const alignEnd = alignForce === true ? align.replace("-force", "") : align;
    const alignRange = alignEnd !== void 0 ? alignEnd : "start";
    let from = Math.max(0, toIndex - virtualScrollSliceSizeComputed.value[alignRange]), to = from + virtualScrollSliceSizeComputed.value.total;
    if (to > virtualScrollLength.value) {
      to = virtualScrollLength.value;
      from = Math.max(0, to - virtualScrollSliceSizeComputed.value.total);
    }
    prevScrollStart = scrollDetails.scrollStart;
    const rangeChanged = from !== virtualScrollSliceRange.value.from || to !== virtualScrollSliceRange.value.to;
    if (rangeChanged === false && alignEnd === void 0) {
      emitScroll(toIndex);
      return;
    }
    const { activeElement } = document;
    const contentEl = contentRef.value;
    if (rangeChanged === true && contentEl !== null && contentEl !== activeElement && contentEl.contains(activeElement) === true) {
      contentEl.addEventListener("focusout", onBlurRefocusFn);
      setTimeout(() => {
        contentEl?.removeEventListener("focusout", onBlurRefocusFn);
      });
    }
    setOverflowAnchor(contentEl, toIndex - from);
    const sizeBefore = alignEnd !== void 0 ? virtualScrollSizes.slice(from, toIndex).reduce(sumFn, 0) : 0;
    if (rangeChanged === true) {
      const tempTo = to >= virtualScrollSliceRange.value.from && from <= virtualScrollSliceRange.value.to ? virtualScrollSliceRange.value.to : to;
      virtualScrollSliceRange.value = { from, to: tempTo };
      virtualScrollPaddingBefore.value = sumSize(virtualScrollSizesAgg, virtualScrollSizes, 0, from);
      virtualScrollPaddingAfter.value = sumSize(virtualScrollSizesAgg, virtualScrollSizes, to, virtualScrollLength.value);
      requestAnimationFrame(() => {
        if (virtualScrollSliceRange.value.to !== to && prevScrollStart === scrollDetails.scrollStart) {
          virtualScrollSliceRange.value = { from: virtualScrollSliceRange.value.from, to };
          virtualScrollPaddingAfter.value = sumSize(virtualScrollSizesAgg, virtualScrollSizes, to, virtualScrollLength.value);
        }
      });
    }
    requestAnimationFrame(() => {
      if (prevScrollStart !== scrollDetails.scrollStart) return;
      if (rangeChanged === true) {
        updateVirtualScrollSizes(from);
      }
      const sizeAfter = virtualScrollSizes.slice(from, toIndex).reduce(sumFn, 0), posStart = sizeAfter + scrollDetails.offsetStart + virtualScrollPaddingBefore.value, posEnd = posStart + virtualScrollSizes[toIndex];
      let scrollPosition = posStart + offset;
      if (alignEnd !== void 0) {
        const sizeDiff = sizeAfter - sizeBefore;
        const scrollStart = scrollDetails.scrollStart + sizeDiff;
        scrollPosition = alignForce !== true && scrollStart < posStart && posEnd < scrollStart + scrollDetails.scrollViewSize ? scrollStart : alignEnd === "end" ? posEnd - scrollDetails.scrollViewSize : posStart - (alignEnd === "start" ? 0 : Math.round((scrollDetails.scrollViewSize - virtualScrollSizes[toIndex]) / 2));
      }
      prevScrollStart = scrollPosition;
      setScroll(
        scrollEl,
        scrollPosition,
        props.virtualScrollHorizontal,
        $q.lang.rtl
      );
      emitScroll(toIndex);
    });
  }
  function updateVirtualScrollSizes(from) {
    const contentEl = contentRef.value;
    if (contentEl) {
      const children = filterProto.call(
        contentEl.children,
        (el) => el.classList && el.classList.contains("q-virtual-scroll--skip") === false
      ), childrenLength = children.length, sizeFn = props.virtualScrollHorizontal === true ? (el) => el.getBoundingClientRect().width : (el) => el.offsetHeight;
      let index = from, size, diff;
      for (let i = 0; i < childrenLength; ) {
        size = sizeFn(children[i]);
        i++;
        while (i < childrenLength && children[i].classList.contains("q-virtual-scroll--with-prev") === true) {
          size += sizeFn(children[i]);
          i++;
        }
        diff = size - virtualScrollSizes[index];
        if (diff !== 0) {
          virtualScrollSizes[index] += diff;
          virtualScrollSizesAgg[Math.floor(index / aggBucketSize)] += diff;
        }
        index++;
      }
    }
  }
  function onBlurRefocusFn() {
    contentRef.value?.focus();
  }
  function localResetVirtualScroll(toIndex, fullReset) {
    const defaultSize = 1 * virtualScrollItemSizeComputed.value;
    if (fullReset === true || Array.isArray(virtualScrollSizes) === false) {
      virtualScrollSizes = [];
    }
    const oldVirtualScrollSizesLength = virtualScrollSizes.length;
    virtualScrollSizes.length = virtualScrollLength.value;
    for (let i = virtualScrollLength.value - 1; i >= oldVirtualScrollSizesLength; i--) {
      virtualScrollSizes[i] = defaultSize;
    }
    const jMax = Math.floor((virtualScrollLength.value - 1) / aggBucketSize);
    virtualScrollSizesAgg = [];
    for (let j = 0; j <= jMax; j++) {
      let size = 0;
      const iMax = Math.min((j + 1) * aggBucketSize, virtualScrollLength.value);
      for (let i = j * aggBucketSize; i < iMax; i++) {
        size += virtualScrollSizes[i];
      }
      virtualScrollSizesAgg.push(size);
    }
    prevToIndex = -1;
    prevScrollStart = void 0;
    virtualScrollPaddingBefore.value = sumSize(virtualScrollSizesAgg, virtualScrollSizes, 0, virtualScrollSliceRange.value.from);
    virtualScrollPaddingAfter.value = sumSize(virtualScrollSizesAgg, virtualScrollSizes, virtualScrollSliceRange.value.to, virtualScrollLength.value);
    if (toIndex >= 0) {
      updateVirtualScrollSizes(virtualScrollSliceRange.value.from);
      nextTick(() => {
        scrollTo(toIndex);
      });
    } else {
      onVirtualScrollEvt();
    }
  }
  function setVirtualScrollSize(scrollViewSize) {
    if (scrollViewSize === void 0 && typeof window !== "undefined") {
      const scrollEl = getVirtualScrollTarget();
      if (scrollEl !== void 0 && scrollEl !== null && scrollEl.nodeType !== 8) {
        scrollViewSize = getScrollDetails(
          scrollEl,
          getVirtualScrollEl(),
          beforeRef.value,
          afterRef.value,
          props.virtualScrollHorizontal,
          $q.lang.rtl,
          props.virtualScrollStickySizeStart,
          props.virtualScrollStickySizeEnd
        ).scrollViewSize;
      }
    }
    localScrollViewSize = scrollViewSize;
    const virtualScrollSliceRatioBefore = parseFloat(props.virtualScrollSliceRatioBefore) || 0;
    const virtualScrollSliceRatioAfter = parseFloat(props.virtualScrollSliceRatioAfter) || 0;
    const multiplier = 1 + virtualScrollSliceRatioBefore + virtualScrollSliceRatioAfter;
    const view = scrollViewSize === void 0 || scrollViewSize <= 0 ? 1 : Math.ceil(scrollViewSize / virtualScrollItemSizeComputed.value);
    const baseSize = Math.max(
      1,
      view,
      Math.ceil((props.virtualScrollSliceSize > 0 ? props.virtualScrollSliceSize : 10) / multiplier)
    );
    virtualScrollSliceSizeComputed.value = {
      total: Math.ceil(baseSize * multiplier),
      start: Math.ceil(baseSize * virtualScrollSliceRatioBefore),
      center: Math.ceil(baseSize * (0.5 + virtualScrollSliceRatioBefore)),
      end: Math.ceil(baseSize * (1 + virtualScrollSliceRatioBefore)),
      view
    };
  }
  function padVirtualScroll(tag, content) {
    const paddingSize = props.virtualScrollHorizontal === true ? "width" : "height";
    const style = {
      ["--q-virtual-scroll-item-" + paddingSize]: virtualScrollItemSizeComputed.value + "px"
    };
    return [
      tag === "tbody" ? h(tag, {
        class: "q-virtual-scroll__padding",
        key: "before",
        ref: beforeRef
      }, [
        h("tr", [
          h("td", {
            style: { [paddingSize]: `${virtualScrollPaddingBefore.value}px`, ...style },
            colspan: colspanAttr.value
          })
        ])
      ]) : h(tag, {
        class: "q-virtual-scroll__padding",
        key: "before",
        ref: beforeRef,
        style: { [paddingSize]: `${virtualScrollPaddingBefore.value}px`, ...style }
      }),
      h(tag, {
        class: "q-virtual-scroll__content",
        key: "content",
        ref: contentRef,
        tabindex: -1
      }, content.flat()),
      tag === "tbody" ? h(tag, {
        class: "q-virtual-scroll__padding",
        key: "after",
        ref: afterRef
      }, [
        h("tr", [
          h("td", {
            style: { [paddingSize]: `${virtualScrollPaddingAfter.value}px`, ...style },
            colspan: colspanAttr.value
          })
        ])
      ]) : h(tag, {
        class: "q-virtual-scroll__padding",
        key: "after",
        ref: afterRef,
        style: { [paddingSize]: `${virtualScrollPaddingAfter.value}px`, ...style }
      })
    ];
  }
  function emitScroll(index) {
    if (prevToIndex !== index) {
      props.onVirtualScroll !== void 0 && emit("virtualScroll", {
        index,
        from: virtualScrollSliceRange.value.from,
        to: virtualScrollSliceRange.value.to - 1,
        direction: index < prevToIndex ? "decrease" : "increase",
        ref: proxy
      });
      prevToIndex = index;
    }
  }
  setVirtualScrollSize();
  const onVirtualScrollEvt = debounce(
    localOnVirtualScrollEvt,
    $q.platform.is.ios === true ? 120 : 35
  );
  onBeforeMount(() => {
    setVirtualScrollSize();
  });
  let shouldActivate = false;
  onDeactivated(() => {
    shouldActivate = true;
  });
  onActivated(() => {
    if (shouldActivate !== true) return;
    const scrollEl = getVirtualScrollTarget();
    if (prevScrollStart !== void 0 && scrollEl !== void 0 && scrollEl !== null && scrollEl.nodeType !== 8) {
      setScroll(
        scrollEl,
        prevScrollStart,
        props.virtualScrollHorizontal,
        $q.lang.rtl
      );
    } else {
      scrollTo(prevToIndex);
    }
  });
  onBeforeUnmount(() => {
    onVirtualScrollEvt.cancel();
  });
  Object.assign(proxy, { scrollTo, reset, refresh });
  return {
    virtualScrollSliceRange,
    virtualScrollSliceSizeComputed,
    setVirtualScrollSize,
    onVirtualScrollEvt,
    localResetVirtualScroll,
    padVirtualScroll,
    scrollTo,
    reset,
    refresh
  };
}
const validateNewValueMode = (v) => ["add", "add-unique", "toggle"].includes(v);
const reEscapeList = ".*+?^${}()|[]\\";
const fieldPropsList = Object.keys(useFieldProps);
function getPropValueFn(userPropName, defaultPropName) {
  if (typeof userPropName === "function") return userPropName;
  const propName = userPropName !== void 0 ? userPropName : defaultPropName;
  return (opt) => opt !== null && typeof opt === "object" && propName in opt ? opt[propName] : opt;
}
const QSelect = createComponent({
  name: "QSelect",
  inheritAttrs: false,
  props: {
    ...useVirtualScrollProps,
    ...useFormProps,
    ...useFieldProps,
    // override of useFieldProps > modelValue
    modelValue: {
      required: true
    },
    multiple: Boolean,
    displayValue: [String, Number],
    displayValueHtml: Boolean,
    dropdownIcon: String,
    options: {
      type: Array,
      default: () => []
    },
    optionValue: [Function, String],
    optionLabel: [Function, String],
    optionDisable: [Function, String],
    hideSelected: Boolean,
    hideDropdownIcon: Boolean,
    fillInput: Boolean,
    maxValues: [Number, String],
    optionsDense: Boolean,
    optionsDark: {
      type: Boolean,
      default: null
    },
    optionsSelectedClass: String,
    optionsHtml: Boolean,
    optionsCover: Boolean,
    menuShrink: Boolean,
    menuAnchor: String,
    menuSelf: String,
    menuOffset: Array,
    popupContentClass: String,
    popupContentStyle: [String, Array, Object],
    popupNoRouteDismiss: Boolean,
    useInput: Boolean,
    useChips: Boolean,
    newValueMode: {
      type: String,
      validator: validateNewValueMode
    },
    mapOptions: Boolean,
    emitValue: Boolean,
    disableTabSelection: Boolean,
    inputDebounce: {
      type: [Number, String],
      default: 500
    },
    inputClass: [Array, String, Object],
    inputStyle: [Array, String, Object],
    tabindex: {
      type: [String, Number],
      default: 0
    },
    autocomplete: String,
    transitionShow: {},
    transitionHide: {},
    transitionDuration: {},
    behavior: {
      type: String,
      validator: (v) => ["default", "menu", "dialog"].includes(v),
      default: "default"
    },
    // override of useVirtualScrollProps > virtualScrollItemSize (no default)
    virtualScrollItemSize: useVirtualScrollProps.virtualScrollItemSize.type,
    onNewValue: Function,
    onFilter: Function
  },
  emits: [
    ...useFieldEmits,
    "add",
    "remove",
    "inputValue",
    "keyup",
    "keypress",
    "keydown",
    "popupShow",
    "popupHide",
    "filterAbort"
  ],
  setup(props, { slots, emit }) {
    const { proxy } = getCurrentInstance();
    const { $q } = proxy;
    const menu = ref(false);
    const dialog = ref(false);
    const optionIndex = ref(-1);
    const inputValue = ref("");
    const dialogFieldFocused = ref(false);
    const innerLoadingIndicator = ref(false);
    let filterTimer = null, inputValueTimer = null, innerValueCache, hasDialog, userInputValue, filterId = null, defaultInputValue, transitionShowComputed, searchBuffer, searchBufferExp;
    const inputRef = ref(null);
    const targetRef = ref(null);
    const menuRef = ref(null);
    const dialogRef = ref(null);
    const menuContentRef = ref(null);
    const nameProp = useFormInputNameAttr(props);
    const onComposition = useKeyComposition(onInput);
    const virtualScrollLength = computed(() => Array.isArray(props.options) ? props.options.length : 0);
    const virtualScrollItemSizeComputed = computed(() => props.virtualScrollItemSize === void 0 ? props.optionsDense === true ? 24 : 48 : props.virtualScrollItemSize);
    const {
      virtualScrollSliceRange,
      virtualScrollSliceSizeComputed,
      localResetVirtualScroll,
      padVirtualScroll,
      onVirtualScrollEvt,
      scrollTo,
      setVirtualScrollSize
    } = useVirtualScroll({
      virtualScrollLength,
      getVirtualScrollTarget,
      getVirtualScrollEl,
      virtualScrollItemSizeComputed
    });
    const state = useFieldState();
    const innerValue = computed(() => {
      const mapNull = props.mapOptions === true && props.multiple !== true, val = props.modelValue !== void 0 && (props.modelValue !== null || mapNull === true) ? props.multiple === true && Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue] : [];
      if (props.mapOptions === true && Array.isArray(props.options) === true) {
        const cache = props.mapOptions === true && innerValueCache !== void 0 ? innerValueCache : [];
        const values = val.map((v) => getOption(v, cache));
        return props.modelValue === null && mapNull === true ? values.filter((v) => v !== null) : values;
      }
      return val;
    });
    const innerFieldProps = computed(() => {
      const acc = {};
      fieldPropsList.forEach((key) => {
        const val = props[key];
        if (val !== void 0) {
          acc[key] = val;
        }
      });
      return acc;
    });
    const isOptionsDark = computed(() => props.optionsDark === null ? state.isDark.value : props.optionsDark);
    const hasValue = computed(() => fieldValueIsFilled(innerValue.value));
    const computedInputClass = computed(() => {
      let cls = "q-field__input q-placeholder col";
      if (props.hideSelected === true || innerValue.value.length === 0) {
        return [cls, props.inputClass];
      }
      cls += " q-field__input--padding";
      return props.inputClass === void 0 ? cls : [cls, props.inputClass];
    });
    const menuContentClass = computed(
      () => (props.virtualScrollHorizontal === true ? "q-virtual-scroll--horizontal" : "") + (props.popupContentClass ? " " + props.popupContentClass : "")
    );
    const noOptions = computed(() => virtualScrollLength.value === 0);
    const selectedString = computed(
      () => innerValue.value.map((opt) => getOptionLabel.value(opt)).join(", ")
    );
    const ariaCurrentValue = computed(() => props.displayValue !== void 0 ? props.displayValue : selectedString.value);
    const needsHtmlFn = computed(() => props.optionsHtml === true ? () => true : (opt) => opt?.html === true);
    const valueAsHtml = computed(() => props.displayValueHtml === true || props.displayValue === void 0 && (props.optionsHtml === true || innerValue.value.some(needsHtmlFn.value)));
    const tabindex = computed(() => state.focused.value === true ? props.tabindex : -1);
    const comboboxAttrs = computed(() => {
      const attrs = {
        tabindex: props.tabindex,
        role: "combobox",
        "aria-label": props.label,
        "aria-readonly": props.readonly === true ? "true" : "false",
        "aria-autocomplete": props.useInput === true ? "list" : "none",
        "aria-expanded": menu.value === true ? "true" : "false",
        "aria-controls": `${state.targetUid.value}_lb`
      };
      if (optionIndex.value >= 0) {
        attrs["aria-activedescendant"] = `${state.targetUid.value}_${optionIndex.value}`;
      }
      return attrs;
    });
    const listboxAttrs = computed(() => ({
      id: `${state.targetUid.value}_lb`,
      role: "listbox",
      "aria-multiselectable": props.multiple === true ? "true" : "false"
    }));
    const selectedScope = computed(() => {
      return innerValue.value.map((opt, i) => ({
        index: i,
        opt,
        html: needsHtmlFn.value(opt),
        selected: true,
        removeAtIndex: removeAtIndexAndFocus,
        toggleOption,
        tabindex: tabindex.value
      }));
    });
    const optionScope = computed(() => {
      if (virtualScrollLength.value === 0) {
        return [];
      }
      const { from, to } = virtualScrollSliceRange.value;
      return props.options.slice(from, to).map((opt, i) => {
        const disable = isOptionDisabled.value(opt) === true;
        const active = isOptionSelected(opt) === true;
        const index = from + i;
        const itemProps = {
          clickable: true,
          active,
          activeClass: computedOptionsSelectedClass.value,
          manualFocus: true,
          focused: false,
          disable,
          tabindex: -1,
          dense: props.optionsDense,
          dark: isOptionsDark.value,
          role: "option",
          "aria-selected": active === true ? "true" : "false",
          id: `${state.targetUid.value}_${index}`,
          onClick: () => {
            toggleOption(opt);
          }
        };
        if (disable !== true) {
          optionIndex.value === index && (itemProps.focused = true);
          if ($q.platform.is.desktop === true) {
            itemProps.onMousemove = () => {
              menu.value === true && setOptionIndex(index);
            };
          }
        }
        return {
          index,
          opt,
          html: needsHtmlFn.value(opt),
          label: getOptionLabel.value(opt),
          selected: itemProps.active,
          focused: itemProps.focused,
          toggleOption,
          setOptionIndex,
          itemProps
        };
      });
    });
    const dropdownArrowIcon = computed(() => props.dropdownIcon !== void 0 ? props.dropdownIcon : $q.iconSet.arrow.dropdown);
    const squaredMenu = computed(
      () => props.optionsCover === false && props.outlined !== true && props.standout !== true && props.borderless !== true && props.rounded !== true
    );
    const computedOptionsSelectedClass = computed(() => props.optionsSelectedClass !== void 0 ? props.optionsSelectedClass : props.color !== void 0 ? `text-${props.color}` : "");
    const getOptionValue = computed(() => getPropValueFn(props.optionValue, "value"));
    const getOptionLabel = computed(() => getPropValueFn(props.optionLabel, "label"));
    const isOptionDisabled = computed(() => getPropValueFn(props.optionDisable, "disable"));
    const innerOptionsValue = computed(() => innerValue.value.map(getOptionValue.value));
    const inputControlEvents = computed(() => {
      const evt = {
        onInput,
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        onChange: onComposition,
        onKeydown: onTargetKeydown,
        onKeyup: onTargetAutocomplete,
        onKeypress: onTargetKeypress,
        onFocus: selectInputText,
        onClick(e) {
          hasDialog === true && stop(e);
        }
      };
      evt.onCompositionstart = evt.onCompositionupdate = evt.onCompositionend = onComposition;
      return evt;
    });
    watch(innerValue, (val) => {
      innerValueCache = val;
      if (props.useInput === true && props.fillInput === true && props.multiple !== true && state.innerLoading.value !== true && (dialog.value !== true && menu.value !== true || hasValue.value !== true)) {
        userInputValue !== true && resetInputValue();
        if (dialog.value === true || menu.value === true) {
          filter("");
        }
      }
    }, { immediate: true });
    watch(() => props.fillInput, resetInputValue);
    watch(menu, updateMenu);
    watch(virtualScrollLength, rerenderMenu);
    function getEmittingOptionValue(opt) {
      return props.emitValue === true ? getOptionValue.value(opt) : opt;
    }
    function removeAtIndex(index) {
      if (index !== -1 && index < innerValue.value.length) {
        if (props.multiple === true) {
          const model = props.modelValue.slice();
          emit("remove", { index, value: model.splice(index, 1)[0] });
          emit("update:modelValue", model);
        } else {
          emit("update:modelValue", null);
        }
      }
    }
    function removeAtIndexAndFocus(index) {
      removeAtIndex(index);
      state.focus();
    }
    function add(opt, unique) {
      const val = getEmittingOptionValue(opt);
      if (props.multiple !== true) {
        props.fillInput === true && updateInputValue(
          getOptionLabel.value(opt),
          true,
          true
        );
        emit("update:modelValue", val);
        return;
      }
      if (innerValue.value.length === 0) {
        emit("add", { index: 0, value: val });
        emit("update:modelValue", props.multiple === true ? [val] : val);
        return;
      }
      if (unique === true && isOptionSelected(opt) === true) return;
      if (props.maxValues !== void 0 && props.modelValue.length >= props.maxValues) return;
      const model = props.modelValue.slice();
      emit("add", { index: model.length, value: val });
      model.push(val);
      emit("update:modelValue", model);
    }
    function toggleOption(opt, keepOpen) {
      if (state.editable.value !== true || opt === void 0 || isOptionDisabled.value(opt) === true) return;
      const optValue = getOptionValue.value(opt);
      if (props.multiple !== true) {
        if (keepOpen !== true) {
          updateInputValue(
            props.fillInput === true ? getOptionLabel.value(opt) : "",
            true,
            true
          );
          hidePopup();
        }
        targetRef.value?.focus();
        if (innerValue.value.length === 0 || isDeepEqual(getOptionValue.value(innerValue.value[0]), optValue) !== true) {
          emit("update:modelValue", props.emitValue === true ? optValue : opt);
        }
        return;
      }
      if (hasDialog !== true || dialogFieldFocused.value === true) {
        state.focus();
      }
      selectInputText();
      if (innerValue.value.length === 0) {
        const val = props.emitValue === true ? optValue : opt;
        emit("add", { index: 0, value: val });
        emit("update:modelValue", props.multiple === true ? [val] : val);
        return;
      }
      const model = props.modelValue.slice(), index = innerOptionsValue.value.findIndex((v) => isDeepEqual(v, optValue));
      if (index !== -1) {
        emit("remove", { index, value: model.splice(index, 1)[0] });
      } else {
        if (props.maxValues !== void 0 && model.length >= props.maxValues) return;
        const val = props.emitValue === true ? optValue : opt;
        emit("add", { index: model.length, value: val });
        model.push(val);
      }
      emit("update:modelValue", model);
    }
    function setOptionIndex(index) {
      if ($q.platform.is.desktop !== true) return;
      const val = index !== -1 && index < virtualScrollLength.value ? index : -1;
      if (optionIndex.value !== val) {
        optionIndex.value = val;
      }
    }
    function moveOptionSelection(offset = 1, skipInputValue) {
      if (menu.value === true) {
        let index = optionIndex.value;
        do {
          index = normalizeToInterval(
            index + offset,
            -1,
            virtualScrollLength.value - 1
          );
        } while (index !== -1 && index !== optionIndex.value && isOptionDisabled.value(props.options[index]) === true);
        if (optionIndex.value !== index) {
          setOptionIndex(index);
          scrollTo(index);
          if (skipInputValue !== true && props.useInput === true && props.fillInput === true) {
            setInputValue(
              index >= 0 ? getOptionLabel.value(props.options[index]) : defaultInputValue,
              true
            );
          }
        }
      }
    }
    function getOption(value, valueCache) {
      const fn = (opt) => isDeepEqual(getOptionValue.value(opt), value);
      return props.options.find(fn) || valueCache.find(fn) || value;
    }
    function isOptionSelected(opt) {
      const val = getOptionValue.value(opt);
      return innerOptionsValue.value.find((v) => isDeepEqual(v, val)) !== void 0;
    }
    function selectInputText(e) {
      if (props.useInput === true && targetRef.value !== null && (e === void 0 || targetRef.value === e.target && e.target.value === selectedString.value)) {
        targetRef.value.select();
      }
    }
    function onTargetKeyup(e) {
      if (isKeyCode(e, 27) === true && menu.value === true) {
        stop(e);
        hidePopup();
        resetInputValue();
      }
      emit("keyup", e);
    }
    function onTargetAutocomplete(e) {
      const { value } = e.target;
      if (e.keyCode !== void 0) {
        onTargetKeyup(e);
        return;
      }
      e.target.value = "";
      if (filterTimer !== null) {
        clearTimeout(filterTimer);
        filterTimer = null;
      }
      if (inputValueTimer !== null) {
        clearTimeout(inputValueTimer);
        inputValueTimer = null;
      }
      resetInputValue();
      if (typeof value === "string" && value.length !== 0) {
        const needle = value.toLocaleLowerCase();
        const findFn = (extractFn) => {
          const option = props.options.find((opt) => String(extractFn.value(opt)).toLocaleLowerCase() === needle);
          if (option === void 0) return false;
          if (innerValue.value.indexOf(option) === -1) {
            toggleOption(option);
          } else {
            hidePopup();
          }
          return true;
        };
        const fillFn = (afterFilter) => {
          if (findFn(getOptionValue) !== true && afterFilter !== true && findFn(getOptionLabel) !== true) {
            filter(value, true, () => fillFn(true));
          }
        };
        fillFn();
      } else {
        state.clearValue(e);
      }
    }
    function onTargetKeypress(e) {
      emit("keypress", e);
    }
    function onTargetKeydown(e) {
      emit("keydown", e);
      if (shouldIgnoreKey(e) === true) return;
      const newValueModeValid = inputValue.value.length !== 0 && (props.newValueMode !== void 0 || props.onNewValue !== void 0);
      const tabShouldSelect = e.shiftKey !== true && props.disableTabSelection !== true && props.multiple !== true && (optionIndex.value !== -1 || newValueModeValid === true);
      if (e.keyCode === 27) {
        prevent(e);
        return;
      }
      if (e.keyCode === 9 && tabShouldSelect === false) {
        closeMenu();
        return;
      }
      if (e.target === void 0 || e.target.id !== state.targetUid.value || state.editable.value !== true) return;
      if (e.keyCode === 40 && state.innerLoading.value !== true && menu.value === false) {
        stopAndPrevent(e);
        showPopup();
        return;
      }
      if (e.keyCode === 8 && (props.useChips === true || props.clearable === true) && props.hideSelected !== true && inputValue.value.length === 0) {
        if (props.multiple === true && Array.isArray(props.modelValue) === true) {
          removeAtIndex(props.modelValue.length - 1);
        } else if (props.multiple !== true && props.modelValue !== null) {
          emit("update:modelValue", null);
        }
        return;
      }
      if ((e.keyCode === 35 || e.keyCode === 36) && (typeof inputValue.value !== "string" || inputValue.value.length === 0)) {
        stopAndPrevent(e);
        optionIndex.value = -1;
        moveOptionSelection(e.keyCode === 36 ? 1 : -1, props.multiple);
      }
      if ((e.keyCode === 33 || e.keyCode === 34) && virtualScrollSliceSizeComputed.value !== void 0) {
        stopAndPrevent(e);
        optionIndex.value = Math.max(
          -1,
          Math.min(
            virtualScrollLength.value,
            optionIndex.value + (e.keyCode === 33 ? -1 : 1) * virtualScrollSliceSizeComputed.value.view
          )
        );
        moveOptionSelection(e.keyCode === 33 ? 1 : -1, props.multiple);
      }
      if (e.keyCode === 38 || e.keyCode === 40) {
        stopAndPrevent(e);
        moveOptionSelection(e.keyCode === 38 ? -1 : 1, props.multiple);
      }
      const optionsLength = virtualScrollLength.value;
      if (searchBuffer === void 0 || searchBufferExp < Date.now()) {
        searchBuffer = "";
      }
      if (optionsLength > 0 && props.useInput !== true && e.key !== void 0 && e.key.length === 1 && e.altKey === false && e.ctrlKey === false && e.metaKey === false && (e.keyCode !== 32 || searchBuffer.length !== 0)) {
        menu.value !== true && showPopup(e);
        const char = e.key.toLocaleLowerCase(), keyRepeat = searchBuffer.length === 1 && searchBuffer[0] === char;
        searchBufferExp = Date.now() + 1500;
        if (keyRepeat === false) {
          stopAndPrevent(e);
          searchBuffer += char;
        }
        const searchRe = new RegExp("^" + searchBuffer.split("").map((l) => reEscapeList.indexOf(l) !== -1 ? "\\" + l : l).join(".*"), "i");
        let index = optionIndex.value;
        if (keyRepeat === true || index < 0 || searchRe.test(getOptionLabel.value(props.options[index])) !== true) {
          do {
            index = normalizeToInterval(index + 1, -1, optionsLength - 1);
          } while (index !== optionIndex.value && (isOptionDisabled.value(props.options[index]) === true || searchRe.test(getOptionLabel.value(props.options[index])) !== true));
        }
        if (optionIndex.value !== index) {
          nextTick(() => {
            setOptionIndex(index);
            scrollTo(index);
            if (index >= 0 && props.useInput === true && props.fillInput === true) {
              setInputValue(getOptionLabel.value(props.options[index]), true);
            }
          });
        }
        return;
      }
      if (e.keyCode !== 13 && (e.keyCode !== 32 || props.useInput === true || searchBuffer !== "") && (e.keyCode !== 9 || tabShouldSelect === false)) return;
      e.keyCode !== 9 && stopAndPrevent(e);
      if (optionIndex.value !== -1 && optionIndex.value < optionsLength) {
        toggleOption(props.options[optionIndex.value]);
        return;
      }
      if (newValueModeValid === true) {
        const done = (val, mode) => {
          if (mode) {
            if (validateNewValueMode(mode) !== true) return;
          } else {
            mode = props.newValueMode;
          }
          updateInputValue("", props.multiple !== true, true);
          if (val === void 0 || val === null) return;
          const fn = mode === "toggle" ? toggleOption : add;
          fn(val, mode === "add-unique");
          if (props.multiple !== true) {
            targetRef.value?.focus();
            hidePopup();
          }
        };
        if (props.onNewValue !== void 0) {
          emit("newValue", inputValue.value, done);
        } else {
          done(inputValue.value);
        }
        if (props.multiple !== true) return;
      }
      if (menu.value === true) {
        closeMenu();
      } else if (state.innerLoading.value !== true) {
        showPopup();
      }
    }
    function getVirtualScrollEl() {
      return hasDialog === true ? menuContentRef.value : menuRef.value !== null && menuRef.value.contentEl !== null ? menuRef.value.contentEl : void 0;
    }
    function getVirtualScrollTarget() {
      return getVirtualScrollEl();
    }
    function getSelection() {
      if (props.hideSelected === true) {
        return [];
      }
      if (slots["selected-item"] !== void 0) {
        return selectedScope.value.map((scope) => slots["selected-item"](scope)).slice();
      }
      if (slots.selected !== void 0) {
        return [].concat(slots.selected());
      }
      if (props.useChips === true) {
        return selectedScope.value.map((scope, i) => h(QChip, {
          key: "option-" + i,
          removable: state.editable.value === true && isOptionDisabled.value(scope.opt) !== true,
          dense: true,
          textColor: props.color,
          tabindex: tabindex.value,
          onRemove() {
            scope.removeAtIndex(i);
          }
        }, () => h("span", {
          class: "ellipsis",
          [scope.html === true ? "innerHTML" : "textContent"]: getOptionLabel.value(scope.opt)
        })));
      }
      return [
        h("span", {
          class: "ellipsis",
          [valueAsHtml.value === true ? "innerHTML" : "textContent"]: ariaCurrentValue.value
        })
      ];
    }
    function getAllOptions() {
      if (noOptions.value === true) {
        return slots["no-option"] !== void 0 ? slots["no-option"]({ inputValue: inputValue.value }) : void 0;
      }
      const fn = slots.option !== void 0 ? slots.option : (scope) => {
        return h(QItem, {
          key: scope.index,
          ...scope.itemProps
        }, () => {
          return h(
            QItemSection,
            () => h(
              QItemLabel,
              () => h("span", {
                [scope.html === true ? "innerHTML" : "textContent"]: scope.label
              })
            )
          );
        });
      };
      let options = padVirtualScroll("div", optionScope.value.map(fn));
      if (slots["before-options"] !== void 0) {
        options = slots["before-options"]().concat(options);
      }
      return hMergeSlot(slots["after-options"], options);
    }
    function getInput(fromDialog, isTarget) {
      const attrs = isTarget === true ? { ...comboboxAttrs.value, ...state.splitAttrs.attributes.value } : void 0;
      const data = {
        ref: isTarget === true ? targetRef : void 0,
        key: "i_t",
        class: computedInputClass.value,
        style: props.inputStyle,
        value: inputValue.value !== void 0 ? inputValue.value : "",
        // required for Android in order to show ENTER key when in form
        type: "search",
        ...attrs,
        id: isTarget === true ? state.targetUid.value : void 0,
        maxlength: props.maxlength,
        autocomplete: props.autocomplete,
        "data-autofocus": fromDialog === true || props.autofocus === true || void 0,
        disabled: props.disable === true,
        readonly: props.readonly === true,
        ...inputControlEvents.value
      };
      if (fromDialog !== true && hasDialog === true) {
        if (Array.isArray(data.class) === true) {
          data.class = [...data.class, "no-pointer-events"];
        } else {
          data.class += " no-pointer-events";
        }
      }
      return h("input", data);
    }
    function onInput(e) {
      if (filterTimer !== null) {
        clearTimeout(filterTimer);
        filterTimer = null;
      }
      if (inputValueTimer !== null) {
        clearTimeout(inputValueTimer);
        inputValueTimer = null;
      }
      if (e && e.target && e.target.qComposing === true) return;
      setInputValue(e.target.value || "");
      userInputValue = true;
      defaultInputValue = inputValue.value;
      if (state.focused.value !== true && (hasDialog !== true || dialogFieldFocused.value === true)) {
        state.focus();
      }
      if (props.onFilter !== void 0) {
        filterTimer = setTimeout(() => {
          filterTimer = null;
          filter(inputValue.value);
        }, props.inputDebounce);
      }
    }
    function setInputValue(val, emitImmediately) {
      if (inputValue.value !== val) {
        inputValue.value = val;
        if (emitImmediately === true || props.inputDebounce === 0 || props.inputDebounce === "0") {
          emit("inputValue", val);
        } else {
          inputValueTimer = setTimeout(() => {
            inputValueTimer = null;
            emit("inputValue", val);
          }, props.inputDebounce);
        }
      }
    }
    function updateInputValue(val, noFiltering, internal) {
      userInputValue = internal !== true;
      if (props.useInput === true) {
        setInputValue(val, true);
        if (noFiltering === true || internal !== true) {
          defaultInputValue = val;
        }
        noFiltering !== true && filter(val);
      }
    }
    function filter(val, keepClosed, afterUpdateFn) {
      if (props.onFilter === void 0 || keepClosed !== true && state.focused.value !== true) return;
      if (state.innerLoading.value === true) {
        emit("filterAbort");
      } else {
        state.innerLoading.value = true;
        innerLoadingIndicator.value = true;
      }
      if (val !== "" && props.multiple !== true && innerValue.value.length !== 0 && userInputValue !== true && val === getOptionLabel.value(innerValue.value[0])) {
        val = "";
      }
      const localFilterId = setTimeout(() => {
        menu.value === true && (menu.value = false);
      }, 10);
      filterId !== null && clearTimeout(filterId);
      filterId = localFilterId;
      emit(
        "filter",
        val,
        (fn, afterFn) => {
          if ((keepClosed === true || state.focused.value === true) && filterId === localFilterId) {
            clearTimeout(filterId);
            typeof fn === "function" && fn();
            innerLoadingIndicator.value = false;
            nextTick(() => {
              state.innerLoading.value = false;
              if (state.editable.value === true) {
                if (keepClosed === true) {
                  menu.value === true && hidePopup();
                } else if (menu.value === true) {
                  updateMenu(true);
                } else {
                  menu.value = true;
                }
              }
              typeof afterFn === "function" && nextTick(() => {
                afterFn(proxy);
              });
              typeof afterUpdateFn === "function" && nextTick(() => {
                afterUpdateFn(proxy);
              });
            });
          }
        },
        () => {
          if (state.focused.value === true && filterId === localFilterId) {
            clearTimeout(filterId);
            state.innerLoading.value = false;
            innerLoadingIndicator.value = false;
          }
          menu.value === true && (menu.value = false);
        }
      );
    }
    function getMenu() {
      return h(QMenu, {
        ref: menuRef,
        class: menuContentClass.value,
        style: props.popupContentStyle,
        modelValue: menu.value,
        fit: props.menuShrink !== true,
        cover: props.optionsCover === true && noOptions.value !== true && props.useInput !== true,
        anchor: props.menuAnchor,
        self: props.menuSelf,
        offset: props.menuOffset,
        dark: isOptionsDark.value,
        noParentEvent: true,
        noRefocus: true,
        noFocus: true,
        noRouteDismiss: props.popupNoRouteDismiss,
        square: squaredMenu.value,
        transitionShow: props.transitionShow,
        transitionHide: props.transitionHide,
        transitionDuration: props.transitionDuration,
        separateClosePopup: true,
        ...listboxAttrs.value,
        onScrollPassive: onVirtualScrollEvt,
        onBeforeShow: onControlPopupShow,
        onBeforeHide: onMenuBeforeHide,
        onShow: onMenuShow
      }, getAllOptions);
    }
    function onMenuBeforeHide(e) {
      onControlPopupHide(e);
      closeMenu();
    }
    function onMenuShow() {
      setVirtualScrollSize();
    }
    function onDialogFieldFocus(e) {
      stop(e);
      targetRef.value?.focus();
      dialogFieldFocused.value = true;
      window.scrollTo(window.pageXOffset || window.scrollX || document.body.scrollLeft || 0, 0);
    }
    function onDialogFieldBlur(e) {
      stop(e);
      nextTick(() => {
        dialogFieldFocused.value = false;
      });
    }
    function getDialog() {
      const content = [
        h(QField, {
          class: `col-auto ${state.fieldClass.value}`,
          ...innerFieldProps.value,
          for: state.targetUid.value,
          dark: isOptionsDark.value,
          square: true,
          loading: innerLoadingIndicator.value,
          itemAligned: false,
          filled: true,
          stackLabel: inputValue.value.length !== 0,
          ...state.splitAttrs.listeners.value,
          onFocus: onDialogFieldFocus,
          onBlur: onDialogFieldBlur
        }, {
          ...slots,
          rawControl: () => state.getControl(true),
          before: void 0,
          after: void 0
        })
      ];
      menu.value === true && content.push(
        h("div", {
          ref: menuContentRef,
          class: menuContentClass.value + " scroll",
          style: props.popupContentStyle,
          ...listboxAttrs.value,
          onClick: prevent,
          onScrollPassive: onVirtualScrollEvt
        }, getAllOptions())
      );
      return h(QDialog, {
        ref: dialogRef,
        modelValue: dialog.value,
        position: props.useInput === true ? "top" : void 0,
        transitionShow: transitionShowComputed,
        transitionHide: props.transitionHide,
        transitionDuration: props.transitionDuration,
        noRouteDismiss: props.popupNoRouteDismiss,
        onBeforeShow: onControlPopupShow,
        onBeforeHide: onDialogBeforeHide,
        onHide: onDialogHide,
        onShow: onDialogShow
      }, () => h("div", {
        class: "q-select__dialog" + (isOptionsDark.value === true ? " q-select__dialog--dark q-dark" : "") + (dialogFieldFocused.value === true ? " q-select__dialog--focused" : "")
      }, content));
    }
    function onDialogBeforeHide(e) {
      onControlPopupHide(e);
      if (dialogRef.value !== null) {
        dialogRef.value.__updateRefocusTarget(
          state.rootRef.value.querySelector(".q-field__native > [tabindex]:last-child")
        );
      }
      state.focused.value = false;
    }
    function onDialogHide(e) {
      hidePopup();
      state.focused.value === false && emit("blur", e);
      resetInputValue();
    }
    function onDialogShow() {
      const el = document.activeElement;
      if ((el === null || el.id !== state.targetUid.value) && targetRef.value !== null && targetRef.value !== el) {
        targetRef.value.focus();
      }
      setVirtualScrollSize();
    }
    function closeMenu() {
      if (dialog.value === true) return;
      optionIndex.value = -1;
      if (menu.value === true) {
        menu.value = false;
      }
      if (state.focused.value === false) {
        if (filterId !== null) {
          clearTimeout(filterId);
          filterId = null;
        }
        if (state.innerLoading.value === true) {
          emit("filterAbort");
          state.innerLoading.value = false;
          innerLoadingIndicator.value = false;
        }
      }
    }
    function showPopup(e) {
      if (state.editable.value !== true) return;
      if (hasDialog === true) {
        state.onControlFocusin(e);
        dialog.value = true;
        nextTick(() => {
          state.focus();
        });
      } else {
        state.focus();
      }
      if (props.onFilter !== void 0) {
        filter(inputValue.value);
      } else if (noOptions.value !== true || slots["no-option"] !== void 0) {
        menu.value = true;
      }
    }
    function hidePopup() {
      dialog.value = false;
      closeMenu();
    }
    function resetInputValue() {
      props.useInput === true && updateInputValue(
        props.multiple !== true && props.fillInput === true && innerValue.value.length !== 0 ? getOptionLabel.value(innerValue.value[0]) || "" : "",
        true,
        true
      );
    }
    function updateMenu(show) {
      let optionIndex2 = -1;
      if (show === true) {
        if (innerValue.value.length !== 0) {
          const val = getOptionValue.value(innerValue.value[0]);
          optionIndex2 = props.options.findIndex((v) => isDeepEqual(getOptionValue.value(v), val));
        }
        localResetVirtualScroll(optionIndex2);
      }
      setOptionIndex(optionIndex2);
    }
    function rerenderMenu(newLength, oldLength) {
      if (menu.value === true && state.innerLoading.value === false) {
        localResetVirtualScroll(-1, true);
        nextTick(() => {
          if (menu.value === true && state.innerLoading.value === false) {
            if (newLength > oldLength) {
              localResetVirtualScroll();
            } else {
              updateMenu(true);
            }
          }
        });
      }
    }
    function updateMenuPosition() {
      if (dialog.value === false && menuRef.value !== null) {
        menuRef.value.updatePosition();
      }
    }
    function onControlPopupShow(e) {
      e !== void 0 && stop(e);
      emit("popupShow", e);
      state.hasPopupOpen = true;
      state.onControlFocusin(e);
    }
    function onControlPopupHide(e) {
      e !== void 0 && stop(e);
      emit("popupHide", e);
      state.hasPopupOpen = false;
      state.onControlFocusout(e);
    }
    function updatePreState() {
      hasDialog = $q.platform.is.mobile !== true && props.behavior !== "dialog" ? false : props.behavior !== "menu" && (props.useInput === true ? slots["no-option"] !== void 0 || props.onFilter !== void 0 || noOptions.value === false : true);
      transitionShowComputed = $q.platform.is.ios === true && hasDialog === true && props.useInput === true ? "fade" : props.transitionShow;
    }
    onBeforeUpdate(updatePreState);
    onUpdated(updateMenuPosition);
    updatePreState();
    onBeforeUnmount(() => {
      filterTimer !== null && clearTimeout(filterTimer);
      inputValueTimer !== null && clearTimeout(inputValueTimer);
    });
    Object.assign(proxy, {
      showPopup,
      hidePopup,
      removeAtIndex,
      add,
      toggleOption,
      getOptionIndex: () => optionIndex.value,
      setOptionIndex,
      moveOptionSelection,
      filter,
      updateMenuPosition,
      updateInputValue,
      isOptionSelected,
      getEmittingOptionValue,
      isOptionDisabled: (...args) => isOptionDisabled.value.apply(null, args) === true,
      getOptionValue: (...args) => getOptionValue.value.apply(null, args),
      getOptionLabel: (...args) => getOptionLabel.value.apply(null, args)
    });
    Object.assign(state, {
      innerValue,
      fieldClass: computed(
        () => `q-select q-field--auto-height q-select--with${props.useInput !== true ? "out" : ""}-input q-select--with${props.useChips !== true ? "out" : ""}-chips q-select--${props.multiple === true ? "multiple" : "single"}`
      ),
      inputRef,
      targetRef,
      hasValue,
      showPopup,
      floatingLabel: computed(
        () => props.hideSelected !== true && hasValue.value === true || typeof inputValue.value === "number" || inputValue.value.length !== 0 || fieldValueIsFilled(props.displayValue)
      ),
      getControlChild: () => {
        if (state.editable.value !== false && (dialog.value === true || noOptions.value !== true || slots["no-option"] !== void 0)) {
          return hasDialog === true ? getDialog() : getMenu();
        } else if (state.hasPopupOpen === true) {
          state.hasPopupOpen = false;
        }
      },
      controlEvents: {
        onFocusin(e) {
          state.onControlFocusin(e);
        },
        onFocusout(e) {
          state.onControlFocusout(e, () => {
            resetInputValue();
            closeMenu();
          });
        },
        onClick(e) {
          prevent(e);
          if (hasDialog !== true && menu.value === true) {
            closeMenu();
            targetRef.value?.focus();
            return;
          }
          showPopup(e);
        }
      },
      getControl: (fromDialog) => {
        const child = getSelection();
        const isTarget = fromDialog === true || dialog.value !== true || hasDialog !== true;
        if (props.useInput === true) {
          child.push(getInput(fromDialog, isTarget));
        } else if (state.editable.value === true) {
          const attrs2 = isTarget === true ? comboboxAttrs.value : void 0;
          child.push(
            h("input", {
              ref: isTarget === true ? targetRef : void 0,
              key: "d_t",
              class: "q-select__focus-target",
              id: isTarget === true ? state.targetUid.value : void 0,
              value: ariaCurrentValue.value,
              readonly: true,
              "data-autofocus": fromDialog === true || props.autofocus === true || void 0,
              ...attrs2,
              onKeydown: onTargetKeydown,
              onKeyup: onTargetKeyup,
              onKeypress: onTargetKeypress
            })
          );
          if (isTarget === true && typeof props.autocomplete === "string" && props.autocomplete.length !== 0) {
            child.push(
              h("input", {
                class: "q-select__autocomplete-input",
                autocomplete: props.autocomplete,
                tabindex: -1,
                onKeyup: onTargetAutocomplete
              })
            );
          }
        }
        if (nameProp.value !== void 0 && props.disable !== true && innerOptionsValue.value.length !== 0) {
          const opts = innerOptionsValue.value.map((value) => h("option", { value, selected: true }));
          child.push(
            h("select", {
              class: "hidden",
              name: nameProp.value,
              multiple: props.multiple
            }, opts)
          );
        }
        const attrs = props.useInput === true || isTarget !== true ? void 0 : state.splitAttrs.attributes.value;
        return h("div", {
          class: "q-field__native row items-center",
          ...attrs,
          ...state.splitAttrs.listeners.value
        }, child);
      },
      getInnerAppend: () => props.loading !== true && innerLoadingIndicator.value !== true && props.hideDropdownIcon !== true ? [
        h(QIcon, {
          class: "q-select__dropdown-icon" + (menu.value === true ? " rotate-180" : ""),
          name: dropdownArrowIcon.value
        })
      ] : null
    });
    return useField(state);
  }
});
export {
  QSelect as Q,
  useAnchor as a,
  QMenu as b,
  useVirtualScrollProps as c,
  useVirtualScroll as d,
  commonVirtScrollPropsList as e,
  useAnchorProps as u
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUVNlbGVjdC1DeGRSRHVGaC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9maWVsZC9RRmllbGQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2NoaXAvUUNoaXAuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1hbmNob3IvdXNlLWFuY2hvci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLXNjcm9sbC10YXJnZXQvdXNlLXNjcm9sbC10YXJnZXQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9wcml2YXRlLmNsaWNrLW91dHNpZGUvY2xpY2stb3V0c2lkZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3ByaXZhdGUucG9zaXRpb24tZW5naW5lL3Bvc2l0aW9uLWVuZ2luZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvbWVudS9RTWVudS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3ByaXZhdGUucnRsL3J0bC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvdmlydHVhbC1zY3JvbGwvdXNlLXZpcnR1YWwtc2Nyb2xsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9zZWxlY3QvUVNlbGVjdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdXNlRmllbGQsIHsgdXNlRmllbGRTdGF0ZSwgdXNlRmllbGRQcm9wcywgdXNlRmllbGRFbWl0cyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLWZpZWxkL3VzZS1maWVsZC5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUZpZWxkJyxcblxuICBpbmhlcml0QXR0cnM6IGZhbHNlLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlRmllbGRQcm9wcyxcblxuICAgIHRhZzoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2xhYmVsJ1xuICAgIH1cbiAgfSxcblxuICBlbWl0czogdXNlRmllbGRFbWl0cyxcblxuICBzZXR1cCAoKSB7XG4gICAgcmV0dXJuIHVzZUZpZWxkKFxuICAgICAgdXNlRmllbGRTdGF0ZSh7IHRhZ1Byb3A6IHRydWUgfSlcbiAgICApXG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBoLCBjb21wdXRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgUUljb24gZnJvbSAnLi4vaWNvbi9RSWNvbi5qcydcblxuaW1wb3J0IFJpcHBsZSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3JpcHBsZS9SaXBwbGUuanMnXG5cbmltcG9ydCB1c2VEYXJrLCB7IHVzZURhcmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLWRhcmsvdXNlLWRhcmsuanMnXG5pbXBvcnQgdXNlU2l6ZSwgeyB1c2VTaXplUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1zaXplL3VzZS1zaXplLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBzdG9wQW5kUHJldmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50L2V2ZW50LmpzJ1xuaW1wb3J0IHsgaE1lcmdlU2xvdFNhZmVseSwgaERpciB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRTaXplcyA9IHtcbiAgeHM6IDgsXG4gIHNtOiAxMCxcbiAgbWQ6IDE0LFxuICBsZzogMjAsXG4gIHhsOiAyNFxufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUNoaXAnLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlRGFya1Byb3BzLFxuICAgIC4uLnVzZVNpemVQcm9wcyxcblxuICAgIGRlbnNlOiBCb29sZWFuLFxuXG4gICAgaWNvbjogU3RyaW5nLFxuICAgIGljb25SaWdodDogU3RyaW5nLFxuICAgIGljb25SZW1vdmU6IFN0cmluZyxcbiAgICBpY29uU2VsZWN0ZWQ6IFN0cmluZyxcbiAgICBsYWJlbDogWyBTdHJpbmcsIE51bWJlciBdLFxuXG4gICAgY29sb3I6IFN0cmluZyxcbiAgICB0ZXh0Q29sb3I6IFN0cmluZyxcblxuICAgIG1vZGVsVmFsdWU6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiB0cnVlXG4gICAgfSxcbiAgICBzZWxlY3RlZDoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9LFxuXG4gICAgc3F1YXJlOiBCb29sZWFuLFxuICAgIG91dGxpbmU6IEJvb2xlYW4sXG4gICAgY2xpY2thYmxlOiBCb29sZWFuLFxuICAgIHJlbW92YWJsZTogQm9vbGVhbixcblxuICAgIHJlbW92ZUFyaWFMYWJlbDogU3RyaW5nLFxuXG4gICAgdGFiaW5kZXg6IFsgU3RyaW5nLCBOdW1iZXIgXSxcbiAgICBkaXNhYmxlOiBCb29sZWFuLFxuXG4gICAgcmlwcGxlOiB7XG4gICAgICB0eXBlOiBbIEJvb2xlYW4sIE9iamVjdCBdLFxuICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgIH1cbiAgfSxcblxuICBlbWl0czogWyAndXBkYXRlOm1vZGVsVmFsdWUnLCAndXBkYXRlOnNlbGVjdGVkJywgJ3JlbW92ZScsICdjbGljaycgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQgfSkge1xuICAgIGNvbnN0IHsgcHJveHk6IHsgJHEgfSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIGNvbnN0IGlzRGFyayA9IHVzZURhcmsocHJvcHMsICRxKVxuICAgIGNvbnN0IHNpemVTdHlsZSA9IHVzZVNpemUocHJvcHMsIGRlZmF1bHRTaXplcylcblxuICAgIGNvbnN0IGhhc0xlZnRJY29uID0gY29tcHV0ZWQoKCkgPT4gcHJvcHMuc2VsZWN0ZWQgPT09IHRydWUgfHwgcHJvcHMuaWNvbiAhPT0gdm9pZCAwKVxuXG4gICAgY29uc3QgbGVmdEljb24gPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5zZWxlY3RlZCA9PT0gdHJ1ZVxuICAgICAgICA/IHByb3BzLmljb25TZWxlY3RlZCB8fCAkcS5pY29uU2V0LmNoaXAuc2VsZWN0ZWRcbiAgICAgICAgOiBwcm9wcy5pY29uXG4gICAgKSlcblxuICAgIGNvbnN0IHJlbW92ZUljb24gPSBjb21wdXRlZCgoKSA9PiBwcm9wcy5pY29uUmVtb3ZlIHx8ICRxLmljb25TZXQuY2hpcC5yZW1vdmUpXG5cbiAgICBjb25zdCBpc0NsaWNrYWJsZSA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy5kaXNhYmxlID09PSBmYWxzZVxuICAgICAgJiYgKHByb3BzLmNsaWNrYWJsZSA9PT0gdHJ1ZSB8fCBwcm9wcy5zZWxlY3RlZCAhPT0gbnVsbClcbiAgICApXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgdGV4dCA9IHByb3BzLm91dGxpbmUgPT09IHRydWVcbiAgICAgICAgPyBwcm9wcy5jb2xvciB8fCBwcm9wcy50ZXh0Q29sb3JcbiAgICAgICAgOiBwcm9wcy50ZXh0Q29sb3JcblxuICAgICAgcmV0dXJuICdxLWNoaXAgcm93IGlubGluZSBuby13cmFwIGl0ZW1zLWNlbnRlcidcbiAgICAgICAgKyAocHJvcHMub3V0bGluZSA9PT0gZmFsc2UgJiYgcHJvcHMuY29sb3IgIT09IHZvaWQgMCA/IGAgYmctJHsgcHJvcHMuY29sb3IgfWAgOiAnJylcbiAgICAgICAgKyAodGV4dCA/IGAgdGV4dC0keyB0ZXh0IH0gcS1jaGlwLS1jb2xvcmVkYCA6ICcnKVxuICAgICAgICArIChwcm9wcy5kaXNhYmxlID09PSB0cnVlID8gJyBkaXNhYmxlZCcgOiAnJylcbiAgICAgICAgKyAocHJvcHMuZGVuc2UgPT09IHRydWUgPyAnIHEtY2hpcC0tZGVuc2UnIDogJycpXG4gICAgICAgICsgKHByb3BzLm91dGxpbmUgPT09IHRydWUgPyAnIHEtY2hpcC0tb3V0bGluZScgOiAnJylcbiAgICAgICAgKyAocHJvcHMuc2VsZWN0ZWQgPT09IHRydWUgPyAnIHEtY2hpcC0tc2VsZWN0ZWQnIDogJycpXG4gICAgICAgICsgKGlzQ2xpY2thYmxlLnZhbHVlID09PSB0cnVlID8gJyBxLWNoaXAtLWNsaWNrYWJsZSBjdXJzb3ItcG9pbnRlciBub24tc2VsZWN0YWJsZSBxLWhvdmVyYWJsZScgOiAnJylcbiAgICAgICAgKyAocHJvcHMuc3F1YXJlID09PSB0cnVlID8gJyBxLWNoaXAtLXNxdWFyZScgOiAnJylcbiAgICAgICAgKyAoaXNEYXJrLnZhbHVlID09PSB0cnVlID8gJyBxLWNoaXAtLWRhcmsgcS1kYXJrJyA6ICcnKVxuICAgIH0pXG5cbiAgICBjb25zdCBhdHRyaWJ1dGVzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgY2hpcCA9IHByb3BzLmRpc2FibGUgPT09IHRydWVcbiAgICAgICAgPyB7IHRhYmluZGV4OiAtMSwgJ2FyaWEtZGlzYWJsZWQnOiAndHJ1ZScgfVxuICAgICAgICA6IHsgdGFiaW5kZXg6IHByb3BzLnRhYmluZGV4IHx8IDAgfVxuXG4gICAgICBjb25zdCByZW1vdmUgPSB7XG4gICAgICAgIC4uLmNoaXAsXG4gICAgICAgIHJvbGU6ICdidXR0b24nLFxuICAgICAgICAnYXJpYS1oaWRkZW4nOiAnZmFsc2UnLFxuICAgICAgICAnYXJpYS1sYWJlbCc6IHByb3BzLnJlbW92ZUFyaWFMYWJlbCB8fCAkcS5sYW5nLmxhYmVsLnJlbW92ZVxuICAgICAgfVxuXG4gICAgICByZXR1cm4geyBjaGlwLCByZW1vdmUgfVxuICAgIH0pXG5cbiAgICBmdW5jdGlvbiBvbktleXVwIChlKSB7XG4gICAgICBlLmtleUNvZGUgPT09IDEzIC8qIEVOVEVSICovICYmIG9uQ2xpY2soZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkNsaWNrIChlKSB7XG4gICAgICBpZiAoIXByb3BzLmRpc2FibGUpIHtcbiAgICAgICAgZW1pdCgndXBkYXRlOnNlbGVjdGVkJywgIXByb3BzLnNlbGVjdGVkKVxuICAgICAgICBlbWl0KCdjbGljaycsIGUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25SZW1vdmUgKGUpIHtcbiAgICAgIGlmIChlLmtleUNvZGUgPT09IHZvaWQgMCB8fCBlLmtleUNvZGUgPT09IDEzKSB7XG4gICAgICAgIHN0b3BBbmRQcmV2ZW50KGUpXG4gICAgICAgIGlmIChwcm9wcy5kaXNhYmxlID09PSBmYWxzZSkge1xuICAgICAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgZmFsc2UpXG4gICAgICAgICAgZW1pdCgncmVtb3ZlJylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldENvbnRlbnQgKCkge1xuICAgICAgY29uc3QgY2hpbGQgPSBbXVxuXG4gICAgICBpc0NsaWNrYWJsZS52YWx1ZSA9PT0gdHJ1ZSAmJiBjaGlsZC5wdXNoKFxuICAgICAgICBoKCdkaXYnLCB7IGNsYXNzOiAncS1mb2N1cy1oZWxwZXInIH0pXG4gICAgICApXG5cbiAgICAgIGhhc0xlZnRJY29uLnZhbHVlID09PSB0cnVlICYmIGNoaWxkLnB1c2goXG4gICAgICAgIGgoUUljb24sIHtcbiAgICAgICAgICBjbGFzczogJ3EtY2hpcF9faWNvbiBxLWNoaXBfX2ljb24tLWxlZnQnLFxuICAgICAgICAgIG5hbWU6IGxlZnRJY29uLnZhbHVlXG4gICAgICAgIH0pXG4gICAgICApXG5cbiAgICAgIGNvbnN0IGxhYmVsID0gcHJvcHMubGFiZWwgIT09IHZvaWQgMFxuICAgICAgICA/IFsgaCgnZGl2JywgeyBjbGFzczogJ2VsbGlwc2lzJyB9LCBbIHByb3BzLmxhYmVsIF0pIF1cbiAgICAgICAgOiB2b2lkIDBcblxuICAgICAgY2hpbGQucHVzaChcbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncS1jaGlwX19jb250ZW50IGNvbCByb3cgbm8td3JhcCBpdGVtcy1jZW50ZXIgcS1hbmNob3ItLXNraXAnXG4gICAgICAgIH0sIGhNZXJnZVNsb3RTYWZlbHkoc2xvdHMuZGVmYXVsdCwgbGFiZWwpKVxuICAgICAgKVxuXG4gICAgICBwcm9wcy5pY29uUmlnaHQgJiYgY2hpbGQucHVzaChcbiAgICAgICAgaChRSWNvbiwge1xuICAgICAgICAgIGNsYXNzOiAncS1jaGlwX19pY29uIHEtY2hpcF9faWNvbi0tcmlnaHQnLFxuICAgICAgICAgIG5hbWU6IHByb3BzLmljb25SaWdodFxuICAgICAgICB9KVxuICAgICAgKVxuXG4gICAgICBwcm9wcy5yZW1vdmFibGUgPT09IHRydWUgJiYgY2hpbGQucHVzaChcbiAgICAgICAgaChRSWNvbiwge1xuICAgICAgICAgIGNsYXNzOiAncS1jaGlwX19pY29uIHEtY2hpcF9faWNvbi0tcmVtb3ZlIGN1cnNvci1wb2ludGVyJyxcbiAgICAgICAgICBuYW1lOiByZW1vdmVJY29uLnZhbHVlLFxuICAgICAgICAgIC4uLmF0dHJpYnV0ZXMudmFsdWUucmVtb3ZlLFxuICAgICAgICAgIG9uQ2xpY2s6IG9uUmVtb3ZlLFxuICAgICAgICAgIG9uS2V5dXA6IG9uUmVtb3ZlXG4gICAgICAgIH0pXG4gICAgICApXG5cbiAgICAgIHJldHVybiBjaGlsZFxuICAgIH1cblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpZiAocHJvcHMubW9kZWxWYWx1ZSA9PT0gZmFsc2UpIHJldHVyblxuXG4gICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgICAgc3R5bGU6IHNpemVTdHlsZS52YWx1ZVxuICAgICAgfVxuXG4gICAgICBpc0NsaWNrYWJsZS52YWx1ZSA9PT0gdHJ1ZSAmJiBPYmplY3QuYXNzaWduKFxuICAgICAgICBkYXRhLFxuICAgICAgICBhdHRyaWJ1dGVzLnZhbHVlLmNoaXAsXG4gICAgICAgIHsgb25DbGljaywgb25LZXl1cCB9XG4gICAgICApXG5cbiAgICAgIHJldHVybiBoRGlyKFxuICAgICAgICAnZGl2JyxcbiAgICAgICAgZGF0YSxcbiAgICAgICAgZ2V0Q29udGVudCgpLFxuICAgICAgICAncmlwcGxlJyxcbiAgICAgICAgcHJvcHMucmlwcGxlICE9PSBmYWxzZSAmJiBwcm9wcy5kaXNhYmxlICE9PSB0cnVlLFxuICAgICAgICAoKSA9PiBbIFsgUmlwcGxlLCBwcm9wcy5yaXBwbGUgXSBdXG4gICAgICApXG4gICAgfVxuICB9XG59KVxuIiwiaW1wb3J0IHsgcmVmLCB3YXRjaCwgb25Nb3VudGVkLCBvbkJlZm9yZVVubW91bnQsIG5leHRUaWNrLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGNsZWFyU2VsZWN0aW9uIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5zZWxlY3Rpb24vc2VsZWN0aW9uLmpzJ1xuaW1wb3J0IHsgYWRkRXZ0LCBjbGVhbkV2dCwgcHJldmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50L2V2ZW50LmpzJ1xuaW1wb3J0IHsgaXNLZXlDb2RlIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5rZXlib2FyZC9rZXktY29tcG9zaXRpb24uanMnXG5cbmV4cG9ydCBjb25zdCB1c2VBbmNob3JTdGF0aWNQcm9wcyA9IHtcbiAgLyogU1NSIGRvZXMgbm90IGtub3cgYWJvdXQgRWxlbWVudCAqL1xuICB0YXJnZXQ6IF9fUVVBU0FSX1NTUl9TRVJWRVJfX1xuICAgID8geyBkZWZhdWx0OiB0cnVlIH1cbiAgICA6IHtcbiAgICAgICAgdHlwZTogWyBCb29sZWFuLCBTdHJpbmcsIEVsZW1lbnQgXSxcbiAgICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgICAgfSxcblxuICBub1BhcmVudEV2ZW50OiBCb29sZWFuXG59XG5cbmV4cG9ydCBjb25zdCB1c2VBbmNob3JQcm9wcyA9IHtcbiAgLi4udXNlQW5jaG9yU3RhdGljUHJvcHMsXG4gIGNvbnRleHRNZW51OiBCb29sZWFuXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh7XG4gIHNob3dpbmcsXG4gIGF2b2lkRW1pdCwgLy8gcmVxdWlyZWQgZm9yIFFQb3B1cFByb3h5ICh0cnVlKVxuICBjb25maWd1cmVBbmNob3JFbCAvLyBvcHRpb25hbFxufSkge1xuICBjb25zdCB7IHByb3BzLCBwcm94eSwgZW1pdCB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICBjb25zdCBhbmNob3JFbCA9IHJlZihudWxsKVxuXG4gIGxldCB0b3VjaFRpbWVyID0gbnVsbFxuXG4gIGZ1bmN0aW9uIGNhblNob3cgKGV2dCkge1xuICAgIC8vIGFib3J0IHdpdGggbm8gcGFyZW50IGNvbmZpZ3VyZWQgb3Igb24gbXVsdGktdG91Y2hcbiAgICByZXR1cm4gYW5jaG9yRWwudmFsdWUgPT09IG51bGxcbiAgICAgID8gZmFsc2VcbiAgICAgIDogKGV2dCA9PT0gdm9pZCAwIHx8IGV2dC50b3VjaGVzID09PSB2b2lkIDAgfHwgZXZ0LnRvdWNoZXMubGVuZ3RoIDw9IDEpXG4gIH1cblxuICBjb25zdCBhbmNob3JFdmVudHMgPSB7fVxuXG4gIGlmIChjb25maWd1cmVBbmNob3JFbCA9PT0gdm9pZCAwKSB7XG4gICAgLy8gZGVmYXVsdCBjb25maWd1cmVBbmNob3JFbCBpcyBkZXNpZ25lZCBmb3JcbiAgICAvLyBRTWVudSAmIFFQb3B1cFByb3h5ICh3aGljaCBpcyB3aHkgaXQncyBoYW5kbGVkIGhlcmUpXG5cbiAgICBPYmplY3QuYXNzaWduKGFuY2hvckV2ZW50cywge1xuICAgICAgaGlkZSAoZXZ0KSB7XG4gICAgICAgIHByb3h5LmhpZGUoZXZ0KVxuICAgICAgfSxcblxuICAgICAgdG9nZ2xlIChldnQpIHtcbiAgICAgICAgcHJveHkudG9nZ2xlKGV2dClcbiAgICAgICAgZXZ0LnFBbmNob3JIYW5kbGVkID0gdHJ1ZVxuICAgICAgfSxcblxuICAgICAgdG9nZ2xlS2V5IChldnQpIHtcbiAgICAgICAgaXNLZXlDb2RlKGV2dCwgMTMpID09PSB0cnVlICYmIGFuY2hvckV2ZW50cy50b2dnbGUoZXZ0KVxuICAgICAgfSxcblxuICAgICAgY29udGV4dENsaWNrIChldnQpIHtcbiAgICAgICAgcHJveHkuaGlkZShldnQpXG4gICAgICAgIHByZXZlbnQoZXZ0KVxuICAgICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgcHJveHkuc2hvdyhldnQpXG4gICAgICAgICAgZXZ0LnFBbmNob3JIYW5kbGVkID0gdHJ1ZVxuICAgICAgICB9KVxuICAgICAgfSxcblxuICAgICAgcHJldmVudCxcblxuICAgICAgbW9iaWxlVG91Y2ggKGV2dCkge1xuICAgICAgICBhbmNob3JFdmVudHMubW9iaWxlQ2xlYW51cChldnQpXG5cbiAgICAgICAgaWYgKGNhblNob3coZXZ0KSAhPT0gdHJ1ZSkgcmV0dXJuXG5cbiAgICAgICAgcHJveHkuaGlkZShldnQpXG4gICAgICAgIGFuY2hvckVsLnZhbHVlLmNsYXNzTGlzdC5hZGQoJ25vbi1zZWxlY3RhYmxlJylcblxuICAgICAgICBjb25zdCB0YXJnZXQgPSBldnQudGFyZ2V0XG4gICAgICAgIGFkZEV2dChhbmNob3JFdmVudHMsICdhbmNob3InLCBbXG4gICAgICAgICAgWyB0YXJnZXQsICd0b3VjaG1vdmUnLCAnbW9iaWxlQ2xlYW51cCcsICdwYXNzaXZlJyBdLFxuICAgICAgICAgIFsgdGFyZ2V0LCAndG91Y2hlbmQnLCAnbW9iaWxlQ2xlYW51cCcsICdwYXNzaXZlJyBdLFxuICAgICAgICAgIFsgdGFyZ2V0LCAndG91Y2hjYW5jZWwnLCAnbW9iaWxlQ2xlYW51cCcsICdwYXNzaXZlJyBdLFxuICAgICAgICAgIFsgYW5jaG9yRWwudmFsdWUsICdjb250ZXh0bWVudScsICdwcmV2ZW50JywgJ25vdFBhc3NpdmUnIF1cbiAgICAgICAgXSlcblxuICAgICAgICB0b3VjaFRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdG91Y2hUaW1lciA9IG51bGxcbiAgICAgICAgICBwcm94eS5zaG93KGV2dClcbiAgICAgICAgICBldnQucUFuY2hvckhhbmRsZWQgPSB0cnVlXG4gICAgICAgIH0sIDMwMClcbiAgICAgIH0sXG5cbiAgICAgIG1vYmlsZUNsZWFudXAgKGV2dCkge1xuICAgICAgICBhbmNob3JFbC52YWx1ZS5jbGFzc0xpc3QucmVtb3ZlKCdub24tc2VsZWN0YWJsZScpXG5cbiAgICAgICAgaWYgKHRvdWNoVGltZXIgIT09IG51bGwpIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodG91Y2hUaW1lcilcbiAgICAgICAgICB0b3VjaFRpbWVyID0gbnVsbFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNob3dpbmcudmFsdWUgPT09IHRydWUgJiYgZXZ0ICE9PSB2b2lkIDApIHtcbiAgICAgICAgICBjbGVhclNlbGVjdGlvbigpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uZmlndXJlQW5jaG9yRWwgPSBmdW5jdGlvbiAoY29udGV4dCA9IHByb3BzLmNvbnRleHRNZW51KSB7XG4gICAgICBpZiAocHJvcHMubm9QYXJlbnRFdmVudCA9PT0gdHJ1ZSB8fCBhbmNob3JFbC52YWx1ZSA9PT0gbnVsbCkgcmV0dXJuXG5cbiAgICAgIGxldCBldnRzXG5cbiAgICAgIGlmIChjb250ZXh0ID09PSB0cnVlKSB7XG4gICAgICAgIGlmIChwcm94eS4kcS5wbGF0Zm9ybS5pcy5tb2JpbGUgPT09IHRydWUpIHtcbiAgICAgICAgICBldnRzID0gW1xuICAgICAgICAgICAgWyBhbmNob3JFbC52YWx1ZSwgJ3RvdWNoc3RhcnQnLCAnbW9iaWxlVG91Y2gnLCAncGFzc2l2ZScgXVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBldnRzID0gW1xuICAgICAgICAgICAgWyBhbmNob3JFbC52YWx1ZSwgJ21vdXNlZG93bicsICdoaWRlJywgJ3Bhc3NpdmUnIF0sXG4gICAgICAgICAgICBbIGFuY2hvckVsLnZhbHVlLCAnY29udGV4dG1lbnUnLCAnY29udGV4dENsaWNrJywgJ25vdFBhc3NpdmUnIF1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBldnRzID0gW1xuICAgICAgICAgIFsgYW5jaG9yRWwudmFsdWUsICdjbGljaycsICd0b2dnbGUnLCAncGFzc2l2ZScgXSxcbiAgICAgICAgICBbIGFuY2hvckVsLnZhbHVlLCAna2V5dXAnLCAndG9nZ2xlS2V5JywgJ3Bhc3NpdmUnIF1cbiAgICAgICAgXVxuICAgICAgfVxuXG4gICAgICBhZGRFdnQoYW5jaG9yRXZlbnRzLCAnYW5jaG9yJywgZXZ0cylcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1bmNvbmZpZ3VyZUFuY2hvckVsICgpIHtcbiAgICBjbGVhbkV2dChhbmNob3JFdmVudHMsICdhbmNob3InKVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0QW5jaG9yRWwgKGVsKSB7XG4gICAgYW5jaG9yRWwudmFsdWUgPSBlbFxuICAgIHdoaWxlIChhbmNob3JFbC52YWx1ZS5jbGFzc0xpc3QuY29udGFpbnMoJ3EtYW5jaG9yLS1za2lwJykpIHtcbiAgICAgIGFuY2hvckVsLnZhbHVlID0gYW5jaG9yRWwudmFsdWUucGFyZW50Tm9kZVxuICAgIH1cbiAgICBjb25maWd1cmVBbmNob3JFbCgpXG4gIH1cblxuICBmdW5jdGlvbiBwaWNrQW5jaG9yRWwgKCkge1xuICAgIGlmIChwcm9wcy50YXJnZXQgPT09IGZhbHNlIHx8IHByb3BzLnRhcmdldCA9PT0gJycgfHwgcHJveHkuJGVsLnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICAgIGFuY2hvckVsLnZhbHVlID0gbnVsbFxuICAgIH1cbiAgICBlbHNlIGlmIChwcm9wcy50YXJnZXQgPT09IHRydWUpIHtcbiAgICAgIHNldEFuY2hvckVsKHByb3h5LiRlbC5wYXJlbnROb2RlKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGxldCBlbCA9IHByb3BzLnRhcmdldFxuXG4gICAgICBpZiAodHlwZW9mIHByb3BzLnRhcmdldCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocHJvcHMudGFyZ2V0KVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBlbCA9IHZvaWQgMFxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChlbCAhPT0gdm9pZCAwICYmIGVsICE9PSBudWxsKSB7XG4gICAgICAgIGFuY2hvckVsLnZhbHVlID0gZWwuJGVsIHx8IGVsXG4gICAgICAgIGNvbmZpZ3VyZUFuY2hvckVsKClcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBhbmNob3JFbC52YWx1ZSA9IG51bGxcbiAgICAgICAgY29uc29sZS5lcnJvcihgQW5jaG9yOiB0YXJnZXQgXCIkeyBwcm9wcy50YXJnZXQgfVwiIG5vdCBmb3VuZGApXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMuY29udGV4dE1lbnUsIHZhbCA9PiB7XG4gICAgaWYgKGFuY2hvckVsLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICB1bmNvbmZpZ3VyZUFuY2hvckVsKClcbiAgICAgIGNvbmZpZ3VyZUFuY2hvckVsKHZhbClcbiAgICB9XG4gIH0pXG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMudGFyZ2V0LCAoKSA9PiB7XG4gICAgaWYgKGFuY2hvckVsLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICB1bmNvbmZpZ3VyZUFuY2hvckVsKClcbiAgICB9XG5cbiAgICBwaWNrQW5jaG9yRWwoKVxuICB9KVxuXG4gIHdhdGNoKCgpID0+IHByb3BzLm5vUGFyZW50RXZlbnQsIHZhbCA9PiB7XG4gICAgaWYgKGFuY2hvckVsLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICBpZiAodmFsID09PSB0cnVlKSB7XG4gICAgICAgIHVuY29uZmlndXJlQW5jaG9yRWwoKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbmZpZ3VyZUFuY2hvckVsKClcbiAgICAgIH1cbiAgICB9XG4gIH0pXG5cbiAgb25Nb3VudGVkKCgpID0+IHtcbiAgICBwaWNrQW5jaG9yRWwoKVxuXG4gICAgaWYgKGF2b2lkRW1pdCAhPT0gdHJ1ZSAmJiBwcm9wcy5tb2RlbFZhbHVlID09PSB0cnVlICYmIGFuY2hvckVsLnZhbHVlID09PSBudWxsKSB7XG4gICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIGZhbHNlKVxuICAgIH1cbiAgfSlcblxuICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgIHRvdWNoVGltZXIgIT09IG51bGwgJiYgY2xlYXJUaW1lb3V0KHRvdWNoVGltZXIpXG4gICAgdW5jb25maWd1cmVBbmNob3JFbCgpXG4gIH0pXG5cbiAgcmV0dXJuIHtcbiAgICBhbmNob3JFbCxcbiAgICBjYW5TaG93LFxuICAgIGFuY2hvckV2ZW50c1xuICB9XG59XG4iLCJpbXBvcnQgeyByZWYsIHdhdGNoLCBvbkJlZm9yZVVubW91bnQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGxpc3Rlbk9wdHMgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC9ldmVudC5qcydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCBjb25maWd1cmVTY3JvbGxUYXJnZXQpIHtcbiAgY29uc3QgbG9jYWxTY3JvbGxUYXJnZXQgPSByZWYobnVsbClcbiAgbGV0IHNjcm9sbEZuXG5cbiAgZnVuY3Rpb24gY2hhbmdlU2Nyb2xsRXZlbnQgKHNjcm9sbFRhcmdldCwgZm4pIHtcbiAgICBjb25zdCBmblByb3AgPSBgJHsgZm4gIT09IHZvaWQgMCA/ICdhZGQnIDogJ3JlbW92ZScgfUV2ZW50TGlzdGVuZXJgXG4gICAgY29uc3QgZm5IYW5kbGVyID0gZm4gIT09IHZvaWQgMCA/IGZuIDogc2Nyb2xsRm5cblxuICAgIGlmIChzY3JvbGxUYXJnZXQgIT09IHdpbmRvdykge1xuICAgICAgc2Nyb2xsVGFyZ2V0WyBmblByb3AgXSgnc2Nyb2xsJywgZm5IYW5kbGVyLCBsaXN0ZW5PcHRzLnBhc3NpdmUpXG4gICAgfVxuXG4gICAgd2luZG93WyBmblByb3AgXSgnc2Nyb2xsJywgZm5IYW5kbGVyLCBsaXN0ZW5PcHRzLnBhc3NpdmUpXG5cbiAgICBzY3JvbGxGbiA9IGZuXG4gIH1cblxuICBmdW5jdGlvbiB1bmNvbmZpZ3VyZVNjcm9sbFRhcmdldCAoKSB7XG4gICAgaWYgKGxvY2FsU2Nyb2xsVGFyZ2V0LnZhbHVlICE9PSBudWxsKSB7XG4gICAgICBjaGFuZ2VTY3JvbGxFdmVudChsb2NhbFNjcm9sbFRhcmdldC52YWx1ZSlcbiAgICAgIGxvY2FsU2Nyb2xsVGFyZ2V0LnZhbHVlID0gbnVsbFxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IG5vUGFyZW50RXZlbnRXYXRjaGVyID0gd2F0Y2goKCkgPT4gcHJvcHMubm9QYXJlbnRFdmVudCwgKCkgPT4ge1xuICAgIGlmIChsb2NhbFNjcm9sbFRhcmdldC52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgdW5jb25maWd1cmVTY3JvbGxUYXJnZXQoKVxuICAgICAgY29uZmlndXJlU2Nyb2xsVGFyZ2V0KClcbiAgICB9XG4gIH0pXG5cbiAgb25CZWZvcmVVbm1vdW50KG5vUGFyZW50RXZlbnRXYXRjaGVyKVxuXG4gIHJldHVybiB7XG4gICAgbG9jYWxTY3JvbGxUYXJnZXQsXG4gICAgdW5jb25maWd1cmVTY3JvbGxUYXJnZXQsXG4gICAgY2hhbmdlU2Nyb2xsRXZlbnRcbiAgfVxufVxuIiwiaW1wb3J0IHsgbGlzdGVuT3B0cyB9IGZyb20gJy4uL2V2ZW50L2V2ZW50LmpzJ1xuaW1wb3J0IHsgcG9ydGFsUHJveHlMaXN0IH0gZnJvbSAnLi4vcHJpdmF0ZS5wb3J0YWwvcG9ydGFsLmpzJ1xuXG5sZXQgdGltZXIgPSBudWxsXG5cbmNvbnN0XG4gIHsgbm90UGFzc2l2ZUNhcHR1cmUgfSA9IGxpc3Rlbk9wdHMsXG4gIHJlZ2lzdGVyZWRMaXN0ID0gW11cblxuZnVuY3Rpb24gZ2xvYmFsSGFuZGxlciAoZXZ0KSB7XG4gIGlmICh0aW1lciAhPT0gbnVsbCkge1xuICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgICB0aW1lciA9IG51bGxcbiAgfVxuXG4gIGNvbnN0IHRhcmdldCA9IGV2dC50YXJnZXRcblxuICBpZiAoXG4gICAgdGFyZ2V0ID09PSB2b2lkIDBcbiAgICB8fCB0YXJnZXQubm9kZVR5cGUgPT09IDhcbiAgICB8fCB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCduby1wb2ludGVyLWV2ZW50cycpID09PSB0cnVlXG4gICkgcmV0dXJuXG5cbiAgLy8gY2hlY2sgbGFzdCBwb3J0YWwgdm0gaWYgaXQnc1xuICAvLyBhIFFEaWFsb2cgYW5kIG5vdCBpbiBzZWFtbGVzcyBtb2RlXG4gIGxldCBwb3J0YWxJbmRleCA9IHBvcnRhbFByb3h5TGlzdC5sZW5ndGggLSAxXG5cbiAgd2hpbGUgKHBvcnRhbEluZGV4ID49IDApIHtcbiAgICBjb25zdCBwcm94eSA9IHBvcnRhbFByb3h5TGlzdFsgcG9ydGFsSW5kZXggXS4kXG5cbiAgICAvLyBza2lwIFFUb29sdGlwIHBvcnRhbHNcbiAgICBpZiAocHJveHkudHlwZS5uYW1lID09PSAnUVRvb2x0aXAnKSB7XG4gICAgICBwb3J0YWxJbmRleC0tXG4gICAgICBjb250aW51ZVxuICAgIH1cblxuICAgIGlmIChwcm94eS50eXBlLm5hbWUgIT09ICdRRGlhbG9nJykge1xuICAgICAgYnJlYWtcbiAgICB9XG5cbiAgICBpZiAocHJveHkucHJvcHMuc2VhbWxlc3MgIT09IHRydWUpIHJldHVyblxuXG4gICAgcG9ydGFsSW5kZXgtLVxuICB9XG5cbiAgZm9yIChsZXQgaSA9IHJlZ2lzdGVyZWRMaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgY29uc3Qgc3RhdGUgPSByZWdpc3RlcmVkTGlzdFsgaSBdXG5cbiAgICBpZiAoXG4gICAgICAoXG4gICAgICAgIHN0YXRlLmFuY2hvckVsLnZhbHVlID09PSBudWxsXG4gICAgICAgIHx8IHN0YXRlLmFuY2hvckVsLnZhbHVlLmNvbnRhaW5zKHRhcmdldCkgPT09IGZhbHNlXG4gICAgICApXG4gICAgICAmJiAoXG4gICAgICAgIHRhcmdldCA9PT0gZG9jdW1lbnQuYm9keVxuICAgICAgICB8fCAoXG4gICAgICAgICAgc3RhdGUuaW5uZXJSZWYudmFsdWUgIT09IG51bGxcbiAgICAgICAgICAmJiBzdGF0ZS5pbm5lclJlZi52YWx1ZS5jb250YWlucyh0YXJnZXQpID09PSBmYWxzZVxuICAgICAgICApXG4gICAgICApXG4gICAgKSB7XG4gICAgICAvLyBtYXJrIHRoZSBldmVudCBhcyBiZWluZyBwcm9jZXNzZWQgYnkgY2xpY2tPdXRzaWRlXG4gICAgICAvLyB1c2VkIHRvIHByZXZlbnQgcmVmb2N1cyBhZnRlciBtZW51IGNsb3NlXG4gICAgICBldnQucUNsaWNrT3V0c2lkZSA9IHRydWVcbiAgICAgIHN0YXRlLm9uQ2xpY2tPdXRzaWRlKGV2dClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZENsaWNrT3V0c2lkZSAoY2xpY2tPdXRzaWRlUHJvcHMpIHtcbiAgcmVnaXN0ZXJlZExpc3QucHVzaChjbGlja091dHNpZGVQcm9wcylcblxuICBpZiAocmVnaXN0ZXJlZExpc3QubGVuZ3RoID09PSAxKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZ2xvYmFsSGFuZGxlciwgbm90UGFzc2l2ZUNhcHR1cmUpXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGdsb2JhbEhhbmRsZXIsIG5vdFBhc3NpdmVDYXB0dXJlKVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVDbGlja091dHNpZGUgKGNsaWNrT3V0c2lkZVByb3BzKSB7XG4gIGNvbnN0IGluZGV4ID0gcmVnaXN0ZXJlZExpc3QuZmluZEluZGV4KGggPT4gaCA9PT0gY2xpY2tPdXRzaWRlUHJvcHMpXG5cbiAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgIHJlZ2lzdGVyZWRMaXN0LnNwbGljZShpbmRleCwgMSlcblxuICAgIGlmIChyZWdpc3RlcmVkTGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgIGlmICh0aW1lciAhPT0gbnVsbCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgICAgIHRpbWVyID0gbnVsbFxuICAgICAgfVxuXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBnbG9iYWxIYW5kbGVyLCBub3RQYXNzaXZlQ2FwdHVyZSlcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBnbG9iYWxIYW5kbGVyLCBub3RQYXNzaXZlQ2FwdHVyZSlcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IGdldFNjcm9sbGJhcldpZHRoIH0gZnJvbSAnLi4vc2Nyb2xsL3Njcm9sbC5qcydcbmltcG9ydCB7IGNsaWVudCB9IGZyb20gJy4uLy4uL3BsdWdpbnMvcGxhdGZvcm0vUGxhdGZvcm0uanMnXG5cbmxldCB2cExlZnQsIHZwVG9wXG5cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZVBvc2l0aW9uIChwb3MpIHtcbiAgY29uc3QgcGFydHMgPSBwb3Muc3BsaXQoJyAnKVxuICBpZiAocGFydHMubGVuZ3RoICE9PSAyKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgaWYgKFsgJ3RvcCcsICdjZW50ZXInLCAnYm90dG9tJyBdLmluY2x1ZGVzKHBhcnRzWyAwIF0pICE9PSB0cnVlKSB7XG4gICAgY29uc29sZS5lcnJvcignQW5jaG9yL1NlbGYgcG9zaXRpb24gbXVzdCBzdGFydCB3aXRoIG9uZSBvZiB0b3AvY2VudGVyL2JvdHRvbScpXG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgaWYgKFsgJ2xlZnQnLCAnbWlkZGxlJywgJ3JpZ2h0JywgJ3N0YXJ0JywgJ2VuZCcgXS5pbmNsdWRlcyhwYXJ0c1sgMSBdKSAhPT0gdHJ1ZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0FuY2hvci9TZWxmIHBvc2l0aW9uIG11c3QgZW5kIHdpdGggb25lIG9mIGxlZnQvbWlkZGxlL3JpZ2h0L3N0YXJ0L2VuZCcpXG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgcmV0dXJuIHRydWVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlT2Zmc2V0ICh2YWwpIHtcbiAgaWYgKCF2YWwpIHsgcmV0dXJuIHRydWUgfVxuICBpZiAodmFsLmxlbmd0aCAhPT0gMikgeyByZXR1cm4gZmFsc2UgfVxuICBpZiAodHlwZW9mIHZhbFsgMCBdICE9PSAnbnVtYmVyJyB8fCB0eXBlb2YgdmFsWyAxIF0gIT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgcmV0dXJuIHRydWVcbn1cblxuY29uc3QgaG9yaXpvbnRhbFBvcyA9IHtcbiAgJ3N0YXJ0I2x0cic6ICdsZWZ0JyxcbiAgJ3N0YXJ0I3J0bCc6ICdyaWdodCcsXG4gICdlbmQjbHRyJzogJ3JpZ2h0JyxcbiAgJ2VuZCNydGwnOiAnbGVmdCdcbn1cblxuO1sgJ2xlZnQnLCAnbWlkZGxlJywgJ3JpZ2h0JyBdLmZvckVhY2gocG9zID0+IHtcbiAgaG9yaXpvbnRhbFBvc1sgYCR7IHBvcyB9I2x0cmAgXSA9IHBvc1xuICBob3Jpem9udGFsUG9zWyBgJHsgcG9zIH0jcnRsYCBdID0gcG9zXG59KVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VQb3NpdGlvbiAocG9zLCBydGwpIHtcbiAgY29uc3QgcGFydHMgPSBwb3Muc3BsaXQoJyAnKVxuICByZXR1cm4ge1xuICAgIHZlcnRpY2FsOiBwYXJ0c1sgMCBdLFxuICAgIGhvcml6b250YWw6IGhvcml6b250YWxQb3NbIGAkeyBwYXJ0c1sgMSBdIH0jJHsgcnRsID09PSB0cnVlID8gJ3J0bCcgOiAnbHRyJyB9YCBdXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEFuY2hvclByb3BzIChlbCwgb2Zmc2V0KSB7XG4gIGxldCB7IHRvcCwgbGVmdCwgcmlnaHQsIGJvdHRvbSwgd2lkdGgsIGhlaWdodCB9ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuICBpZiAob2Zmc2V0ICE9PSB2b2lkIDApIHtcbiAgICB0b3AgLT0gb2Zmc2V0WyAxIF1cbiAgICBsZWZ0IC09IG9mZnNldFsgMCBdXG4gICAgYm90dG9tICs9IG9mZnNldFsgMSBdXG4gICAgcmlnaHQgKz0gb2Zmc2V0WyAwIF1cblxuICAgIHdpZHRoICs9IG9mZnNldFsgMCBdXG4gICAgaGVpZ2h0ICs9IG9mZnNldFsgMSBdXG4gIH1cblxuICByZXR1cm4ge1xuICAgIHRvcCwgYm90dG9tLCBoZWlnaHQsXG4gICAgbGVmdCwgcmlnaHQsIHdpZHRoLFxuICAgIG1pZGRsZTogbGVmdCArIChyaWdodCAtIGxlZnQpIC8gMixcbiAgICBjZW50ZXI6IHRvcCArIChib3R0b20gLSB0b3ApIC8gMlxuICB9XG59XG5cbmZ1bmN0aW9uIGdldEFic29sdXRlQW5jaG9yUHJvcHMgKGVsLCBhYnNvbHV0ZU9mZnNldCwgb2Zmc2V0KSB7XG4gIGxldCB7IHRvcCwgbGVmdCB9ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuICB0b3AgKz0gYWJzb2x1dGVPZmZzZXQudG9wXG4gIGxlZnQgKz0gYWJzb2x1dGVPZmZzZXQubGVmdFxuXG4gIGlmIChvZmZzZXQgIT09IHZvaWQgMCkge1xuICAgIHRvcCArPSBvZmZzZXRbIDEgXVxuICAgIGxlZnQgKz0gb2Zmc2V0WyAwIF1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdG9wLCBib3R0b206IHRvcCArIDEsIGhlaWdodDogMSxcbiAgICBsZWZ0LCByaWdodDogbGVmdCArIDEsIHdpZHRoOiAxLFxuICAgIG1pZGRsZTogbGVmdCxcbiAgICBjZW50ZXI6IHRvcFxuICB9XG59XG5cbmZ1bmN0aW9uIGdldFRhcmdldFByb3BzICh3aWR0aCwgaGVpZ2h0KSB7XG4gIHJldHVybiB7XG4gICAgdG9wOiAwLFxuICAgIGNlbnRlcjogaGVpZ2h0IC8gMixcbiAgICBib3R0b206IGhlaWdodCxcbiAgICBsZWZ0OiAwLFxuICAgIG1pZGRsZTogd2lkdGggLyAyLFxuICAgIHJpZ2h0OiB3aWR0aFxuICB9XG59XG5cbmZ1bmN0aW9uIGdldFRvcExlZnRQcm9wcyAoYW5jaG9yUHJvcHMsIHRhcmdldFByb3BzLCBhbmNob3JPcmlnaW4sIHNlbGZPcmlnaW4pIHtcbiAgcmV0dXJuIHtcbiAgICB0b3A6IGFuY2hvclByb3BzWyBhbmNob3JPcmlnaW4udmVydGljYWwgXSAtIHRhcmdldFByb3BzWyBzZWxmT3JpZ2luLnZlcnRpY2FsIF0sXG4gICAgbGVmdDogYW5jaG9yUHJvcHNbIGFuY2hvck9yaWdpbi5ob3Jpem9udGFsIF0gLSB0YXJnZXRQcm9wc1sgc2VsZk9yaWdpbi5ob3Jpem9udGFsIF1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0UG9zaXRpb24gKGNmZywgcmV0cnlOdW1iZXIgPSAwKSB7XG4gIGlmIChcbiAgICBjZmcudGFyZ2V0RWwgPT09IG51bGxcbiAgICB8fCBjZmcuYW5jaG9yRWwgPT09IG51bGxcbiAgICB8fCByZXRyeU51bWJlciA+IDUgLy8gd2Ugc2hvdWxkIHRyeSBvbmx5IGEgZmV3IHRpbWVzXG4gICkgcmV0dXJuXG5cbiAgLy8gc29tZSBicm93c2VycyByZXBvcnQgemVybyBoZWlnaHQgb3Igd2lkdGggYmVjYXVzZVxuICAvLyB3ZSBhcmUgdHJ5aW5nIHRvbyBlYXJseSB0byBnZXQgdGhlc2UgZGltZW5zaW9uc1xuICBpZiAoY2ZnLnRhcmdldEVsLm9mZnNldEhlaWdodCA9PT0gMCB8fCBjZmcudGFyZ2V0RWwub2Zmc2V0V2lkdGggPT09IDApIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHNldFBvc2l0aW9uKGNmZywgcmV0cnlOdW1iZXIgKyAxKVxuICAgIH0sIDEwKVxuICAgIHJldHVyblxuICB9XG5cbiAgY29uc3Qge1xuICAgIHRhcmdldEVsLFxuICAgIG9mZnNldCxcbiAgICBhbmNob3JFbCxcbiAgICBhbmNob3JPcmlnaW4sXG4gICAgc2VsZk9yaWdpbixcbiAgICBhYnNvbHV0ZU9mZnNldCxcbiAgICBmaXQsXG4gICAgY292ZXIsXG4gICAgbWF4SGVpZ2h0LFxuICAgIG1heFdpZHRoXG4gIH0gPSBjZmdcblxuICBpZiAoY2xpZW50LmlzLmlvcyA9PT0gdHJ1ZSAmJiB3aW5kb3cudmlzdWFsVmlld3BvcnQgIT09IHZvaWQgMCkge1xuICAgIC8vIHVzZXMgdGhlIHEtcG9zaXRpb24tZW5naW5lIENTUyBjbGFzc1xuXG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5ib2R5LnN0eWxlXG4gICAgY29uc3QgeyBvZmZzZXRMZWZ0OiBsZWZ0LCBvZmZzZXRUb3A6IHRvcCB9ID0gd2luZG93LnZpc3VhbFZpZXdwb3J0XG5cbiAgICBpZiAobGVmdCAhPT0gdnBMZWZ0KSB7XG4gICAgICBlbC5zZXRQcm9wZXJ0eSgnLS1xLXBlLWxlZnQnLCBsZWZ0ICsgJ3B4JylcbiAgICAgIHZwTGVmdCA9IGxlZnRcbiAgICB9XG4gICAgaWYgKHRvcCAhPT0gdnBUb3ApIHtcbiAgICAgIGVsLnNldFByb3BlcnR5KCctLXEtcGUtdG9wJywgdG9wICsgJ3B4JylcbiAgICAgIHZwVG9wID0gdG9wXG4gICAgfVxuICB9XG5cbiAgLy8gc2Nyb2xsIHBvc2l0aW9uIG1pZ2h0IGNoYW5nZVxuICAvLyBpZiBtYXgtaGVpZ2h0Ly13aWR0aCBjaGFuZ2VzLCBzbyB3ZVxuICAvLyBuZWVkIHRvIHJlc3RvcmUgaXQgYWZ0ZXIgd2UgY2FsY3VsYXRlXG4gIC8vIHRoZSBuZXcgcG9zaXRpb25pbmdcbiAgY29uc3QgeyBzY3JvbGxMZWZ0LCBzY3JvbGxUb3AgfSA9IHRhcmdldEVsXG5cbiAgY29uc3QgYW5jaG9yUHJvcHMgPSBhYnNvbHV0ZU9mZnNldCA9PT0gdm9pZCAwXG4gICAgPyBnZXRBbmNob3JQcm9wcyhhbmNob3JFbCwgY292ZXIgPT09IHRydWUgPyBbIDAsIDAgXSA6IG9mZnNldClcbiAgICA6IGdldEFic29sdXRlQW5jaG9yUHJvcHMoYW5jaG9yRWwsIGFic29sdXRlT2Zmc2V0LCBvZmZzZXQpXG5cbiAgLyoqXG4gICAqIFdlIFwicmVzZXRcIiB0aGUgY3JpdGljYWwgQ1NTIHByb3BlcnRpZXNcbiAgICogc28gd2UgY2FuIHRha2UgYW4gYWNjdXJhdGUgbWVhc3VyZW1lbnQuXG4gICAqXG4gICAqIEVuc3VyZSB0aGF0IHRhcmdldEVsIGhhcyBhIG1heC13aWR0aCAmIG1heC1oZWlnaHRcbiAgICogc2V0IGluIENTUyBhbmQgdGhhdCB0aGUgdmFsdWUgZG9lcyBOT1QgZXhjZWVkcyAxMDB2dy92aC5cbiAgICogQWxsIHVzZXJzIG9mIHRoZSBwb3NpdGlvbi1lbmdpbmUgKGN1cnJlbnRseSBRTWVudSAmIFFUb29sdGlwKVxuICAgKiBoYXZlIENTUyBmb3IgdGhpcy5cbiAgICovXG4gIE9iamVjdC5hc3NpZ24odGFyZ2V0RWwuc3R5bGUsIHtcbiAgICB0b3A6IDAsXG4gICAgbGVmdDogMCxcbiAgICBtaW5XaWR0aDogbnVsbCxcbiAgICBtaW5IZWlnaHQ6IG51bGwsXG4gICAgbWF4V2lkdGgsXG4gICAgbWF4SGVpZ2h0LFxuICAgIHZpc2liaWxpdHk6ICd2aXNpYmxlJ1xuICB9KVxuXG4gIGNvbnN0IHsgb2Zmc2V0V2lkdGg6IG9yaWdFbFdpZHRoLCBvZmZzZXRIZWlnaHQ6IG9yaWdFbEhlaWdodCB9ID0gdGFyZ2V0RWxcbiAgY29uc3QgeyBlbFdpZHRoLCBlbEhlaWdodCB9ID0gZml0ID09PSB0cnVlIHx8IGNvdmVyID09PSB0cnVlXG4gICAgPyB7IGVsV2lkdGg6IE1hdGgubWF4KGFuY2hvclByb3BzLndpZHRoLCBvcmlnRWxXaWR0aCksIGVsSGVpZ2h0OiBjb3ZlciA9PT0gdHJ1ZSA/IE1hdGgubWF4KGFuY2hvclByb3BzLmhlaWdodCwgb3JpZ0VsSGVpZ2h0KSA6IG9yaWdFbEhlaWdodCB9XG4gICAgOiB7IGVsV2lkdGg6IG9yaWdFbFdpZHRoLCBlbEhlaWdodDogb3JpZ0VsSGVpZ2h0IH1cblxuICBsZXQgZWxTdHlsZSA9IHsgbWF4V2lkdGgsIG1heEhlaWdodCB9XG5cbiAgaWYgKGZpdCA9PT0gdHJ1ZSB8fCBjb3ZlciA9PT0gdHJ1ZSkge1xuICAgIGVsU3R5bGUubWluV2lkdGggPSBhbmNob3JQcm9wcy53aWR0aCArICdweCdcbiAgICBpZiAoY292ZXIgPT09IHRydWUpIHtcbiAgICAgIGVsU3R5bGUubWluSGVpZ2h0ID0gYW5jaG9yUHJvcHMuaGVpZ2h0ICsgJ3B4J1xuICAgIH1cbiAgfVxuXG4gIE9iamVjdC5hc3NpZ24odGFyZ2V0RWwuc3R5bGUsIGVsU3R5bGUpXG5cbiAgY29uc3QgdGFyZ2V0UHJvcHMgPSBnZXRUYXJnZXRQcm9wcyhlbFdpZHRoLCBlbEhlaWdodClcbiAgbGV0IHByb3BzID0gZ2V0VG9wTGVmdFByb3BzKGFuY2hvclByb3BzLCB0YXJnZXRQcm9wcywgYW5jaG9yT3JpZ2luLCBzZWxmT3JpZ2luKVxuXG4gIGlmIChhYnNvbHV0ZU9mZnNldCA9PT0gdm9pZCAwIHx8IG9mZnNldCA9PT0gdm9pZCAwKSB7XG4gICAgYXBwbHlCb3VuZGFyaWVzKHByb3BzLCBhbmNob3JQcm9wcywgdGFyZ2V0UHJvcHMsIGFuY2hvck9yaWdpbiwgc2VsZk9yaWdpbilcbiAgfVxuICBlbHNlIHsgLy8gd2UgaGF2ZSB0b3VjaCBwb3NpdGlvbiBvciBjb250ZXh0IG1lbnUgd2l0aCBvZmZzZXRcbiAgICBjb25zdCB7IHRvcCwgbGVmdCB9ID0gcHJvcHMgLy8gY2FjaGUgaW5pdGlhbCB2YWx1ZXNcblxuICAgIC8vIGFwcGx5IGluaXRpYWwgYm91bmRhcmllc1xuICAgIGFwcGx5Qm91bmRhcmllcyhwcm9wcywgYW5jaG9yUHJvcHMsIHRhcmdldFByb3BzLCBhbmNob3JPcmlnaW4sIHNlbGZPcmlnaW4pXG5cbiAgICBsZXQgaGFzQ2hhbmdlZCA9IGZhbHNlXG5cbiAgICAvLyBkaWQgaXQgZmxpcCB2ZXJ0aWNhbGx5P1xuICAgIGlmIChwcm9wcy50b3AgIT09IHRvcCkge1xuICAgICAgaGFzQ2hhbmdlZCA9IHRydWVcbiAgICAgIGNvbnN0IG9mZnNldFkgPSAyICogb2Zmc2V0WyAxIF1cbiAgICAgIGFuY2hvclByb3BzLmNlbnRlciA9IGFuY2hvclByb3BzLnRvcCAtPSBvZmZzZXRZXG4gICAgICBhbmNob3JQcm9wcy5ib3R0b20gLT0gb2Zmc2V0WSArIDJcbiAgICB9XG5cbiAgICAvLyBkaWQgaXQgZmxpcCBob3Jpem9udGFsbHk/XG4gICAgaWYgKHByb3BzLmxlZnQgIT09IGxlZnQpIHtcbiAgICAgIGhhc0NoYW5nZWQgPSB0cnVlXG4gICAgICBjb25zdCBvZmZzZXRYID0gMiAqIG9mZnNldFsgMCBdXG4gICAgICBhbmNob3JQcm9wcy5taWRkbGUgPSBhbmNob3JQcm9wcy5sZWZ0IC09IG9mZnNldFhcbiAgICAgIGFuY2hvclByb3BzLnJpZ2h0IC09IG9mZnNldFggKyAyXG4gICAgfVxuXG4gICAgaWYgKGhhc0NoYW5nZWQgPT09IHRydWUpIHtcbiAgICAgIC8vIHJlLWNhbGN1bGF0ZSBwcm9wcyB3aXRoIHRoZSBuZXcgYW5jaG9yXG4gICAgICBwcm9wcyA9IGdldFRvcExlZnRQcm9wcyhhbmNob3JQcm9wcywgdGFyZ2V0UHJvcHMsIGFuY2hvck9yaWdpbiwgc2VsZk9yaWdpbilcblxuICAgICAgLy8gYW5kIHJlLWFwcGx5IGJvdW5kYXJpZXNcbiAgICAgIGFwcGx5Qm91bmRhcmllcyhwcm9wcywgYW5jaG9yUHJvcHMsIHRhcmdldFByb3BzLCBhbmNob3JPcmlnaW4sIHNlbGZPcmlnaW4pXG4gICAgfVxuICB9XG5cbiAgZWxTdHlsZSA9IHtcbiAgICB0b3A6IHByb3BzLnRvcCArICdweCcsXG4gICAgbGVmdDogcHJvcHMubGVmdCArICdweCdcbiAgfVxuXG4gIGlmIChwcm9wcy5tYXhIZWlnaHQgIT09IHZvaWQgMCkge1xuICAgIGVsU3R5bGUubWF4SGVpZ2h0ID0gcHJvcHMubWF4SGVpZ2h0ICsgJ3B4J1xuXG4gICAgaWYgKGFuY2hvclByb3BzLmhlaWdodCA+IHByb3BzLm1heEhlaWdodCkge1xuICAgICAgZWxTdHlsZS5taW5IZWlnaHQgPSBlbFN0eWxlLm1heEhlaWdodFxuICAgIH1cbiAgfVxuICBpZiAocHJvcHMubWF4V2lkdGggIT09IHZvaWQgMCkge1xuICAgIGVsU3R5bGUubWF4V2lkdGggPSBwcm9wcy5tYXhXaWR0aCArICdweCdcblxuICAgIGlmIChhbmNob3JQcm9wcy53aWR0aCA+IHByb3BzLm1heFdpZHRoKSB7XG4gICAgICBlbFN0eWxlLm1pbldpZHRoID0gZWxTdHlsZS5tYXhXaWR0aFxuICAgIH1cbiAgfVxuXG4gIE9iamVjdC5hc3NpZ24odGFyZ2V0RWwuc3R5bGUsIGVsU3R5bGUpXG5cbiAgLy8gcmVzdG9yZSBzY3JvbGwgcG9zaXRpb25cbiAgaWYgKHRhcmdldEVsLnNjcm9sbFRvcCAhPT0gc2Nyb2xsVG9wKSB7XG4gICAgdGFyZ2V0RWwuc2Nyb2xsVG9wID0gc2Nyb2xsVG9wXG4gIH1cbiAgaWYgKHRhcmdldEVsLnNjcm9sbExlZnQgIT09IHNjcm9sbExlZnQpIHtcbiAgICB0YXJnZXRFbC5zY3JvbGxMZWZ0ID0gc2Nyb2xsTGVmdFxuICB9XG59XG5cbmZ1bmN0aW9uIGFwcGx5Qm91bmRhcmllcyAocHJvcHMsIGFuY2hvclByb3BzLCB0YXJnZXRQcm9wcywgYW5jaG9yT3JpZ2luLCBzZWxmT3JpZ2luKSB7XG4gIGNvbnN0XG4gICAgY3VycmVudEhlaWdodCA9IHRhcmdldFByb3BzLmJvdHRvbSxcbiAgICBjdXJyZW50V2lkdGggPSB0YXJnZXRQcm9wcy5yaWdodCxcbiAgICBtYXJnaW4gPSBnZXRTY3JvbGxiYXJXaWR0aCgpLFxuICAgIGlubmVySGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0IC0gbWFyZ2luLFxuICAgIGlubmVyV2lkdGggPSBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoXG5cbiAgaWYgKHByb3BzLnRvcCA8IDAgfHwgcHJvcHMudG9wICsgY3VycmVudEhlaWdodCA+IGlubmVySGVpZ2h0KSB7XG4gICAgaWYgKHNlbGZPcmlnaW4udmVydGljYWwgPT09ICdjZW50ZXInKSB7XG4gICAgICBwcm9wcy50b3AgPSBhbmNob3JQcm9wc1sgYW5jaG9yT3JpZ2luLnZlcnRpY2FsIF0gPiBpbm5lckhlaWdodCAvIDJcbiAgICAgICAgPyBNYXRoLm1heCgwLCBpbm5lckhlaWdodCAtIGN1cnJlbnRIZWlnaHQpXG4gICAgICAgIDogMFxuICAgICAgcHJvcHMubWF4SGVpZ2h0ID0gTWF0aC5taW4oY3VycmVudEhlaWdodCwgaW5uZXJIZWlnaHQpXG4gICAgfVxuICAgIGVsc2UgaWYgKGFuY2hvclByb3BzWyBhbmNob3JPcmlnaW4udmVydGljYWwgXSA+IGlubmVySGVpZ2h0IC8gMikge1xuICAgICAgY29uc3QgYW5jaG9yWSA9IE1hdGgubWluKFxuICAgICAgICBpbm5lckhlaWdodCxcbiAgICAgICAgYW5jaG9yT3JpZ2luLnZlcnRpY2FsID09PSAnY2VudGVyJ1xuICAgICAgICAgID8gYW5jaG9yUHJvcHMuY2VudGVyXG4gICAgICAgICAgOiAoYW5jaG9yT3JpZ2luLnZlcnRpY2FsID09PSBzZWxmT3JpZ2luLnZlcnRpY2FsID8gYW5jaG9yUHJvcHMuYm90dG9tIDogYW5jaG9yUHJvcHMudG9wKVxuICAgICAgKVxuICAgICAgcHJvcHMubWF4SGVpZ2h0ID0gTWF0aC5taW4oY3VycmVudEhlaWdodCwgYW5jaG9yWSlcbiAgICAgIHByb3BzLnRvcCA9IE1hdGgubWF4KDAsIGFuY2hvclkgLSBjdXJyZW50SGVpZ2h0KVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHByb3BzLnRvcCA9IE1hdGgubWF4KDAsIGFuY2hvck9yaWdpbi52ZXJ0aWNhbCA9PT0gJ2NlbnRlcidcbiAgICAgICAgPyBhbmNob3JQcm9wcy5jZW50ZXJcbiAgICAgICAgOiAoYW5jaG9yT3JpZ2luLnZlcnRpY2FsID09PSBzZWxmT3JpZ2luLnZlcnRpY2FsID8gYW5jaG9yUHJvcHMudG9wIDogYW5jaG9yUHJvcHMuYm90dG9tKVxuICAgICAgKVxuICAgICAgcHJvcHMubWF4SGVpZ2h0ID0gTWF0aC5taW4oY3VycmVudEhlaWdodCwgaW5uZXJIZWlnaHQgLSBwcm9wcy50b3ApXG4gICAgfVxuICB9XG5cbiAgaWYgKHByb3BzLmxlZnQgPCAwIHx8IHByb3BzLmxlZnQgKyBjdXJyZW50V2lkdGggPiBpbm5lcldpZHRoKSB7XG4gICAgcHJvcHMubWF4V2lkdGggPSBNYXRoLm1pbihjdXJyZW50V2lkdGgsIGlubmVyV2lkdGgpXG4gICAgaWYgKHNlbGZPcmlnaW4uaG9yaXpvbnRhbCA9PT0gJ21pZGRsZScpIHtcbiAgICAgIHByb3BzLmxlZnQgPSBhbmNob3JQcm9wc1sgYW5jaG9yT3JpZ2luLmhvcml6b250YWwgXSA+IGlubmVyV2lkdGggLyAyXG4gICAgICAgID8gTWF0aC5tYXgoMCwgaW5uZXJXaWR0aCAtIGN1cnJlbnRXaWR0aClcbiAgICAgICAgOiAwXG4gICAgfVxuICAgIGVsc2UgaWYgKGFuY2hvclByb3BzWyBhbmNob3JPcmlnaW4uaG9yaXpvbnRhbCBdID4gaW5uZXJXaWR0aCAvIDIpIHtcbiAgICAgIGNvbnN0IGFuY2hvclggPSBNYXRoLm1pbihcbiAgICAgICAgaW5uZXJXaWR0aCxcbiAgICAgICAgYW5jaG9yT3JpZ2luLmhvcml6b250YWwgPT09ICdtaWRkbGUnXG4gICAgICAgICAgPyBhbmNob3JQcm9wcy5taWRkbGVcbiAgICAgICAgICA6IChhbmNob3JPcmlnaW4uaG9yaXpvbnRhbCA9PT0gc2VsZk9yaWdpbi5ob3Jpem9udGFsID8gYW5jaG9yUHJvcHMucmlnaHQgOiBhbmNob3JQcm9wcy5sZWZ0KVxuICAgICAgKVxuICAgICAgcHJvcHMubWF4V2lkdGggPSBNYXRoLm1pbihjdXJyZW50V2lkdGgsIGFuY2hvclgpXG4gICAgICBwcm9wcy5sZWZ0ID0gTWF0aC5tYXgoMCwgYW5jaG9yWCAtIHByb3BzLm1heFdpZHRoKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHByb3BzLmxlZnQgPSBNYXRoLm1heCgwLCBhbmNob3JPcmlnaW4uaG9yaXpvbnRhbCA9PT0gJ21pZGRsZSdcbiAgICAgICAgPyBhbmNob3JQcm9wcy5taWRkbGVcbiAgICAgICAgOiAoYW5jaG9yT3JpZ2luLmhvcml6b250YWwgPT09IHNlbGZPcmlnaW4uaG9yaXpvbnRhbCA/IGFuY2hvclByb3BzLmxlZnQgOiBhbmNob3JQcm9wcy5yaWdodClcbiAgICAgIClcbiAgICAgIHByb3BzLm1heFdpZHRoID0gTWF0aC5taW4oY3VycmVudFdpZHRoLCBpbm5lcldpZHRoIC0gcHJvcHMubGVmdClcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIHdhdGNoLCBUcmFuc2l0aW9uLCBvbkJlZm9yZVVubW91bnQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHVzZUFuY2hvciwgeyB1c2VBbmNob3JQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLWFuY2hvci91c2UtYW5jaG9yLmpzJ1xuaW1wb3J0IHVzZVNjcm9sbFRhcmdldCBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1zY3JvbGwtdGFyZ2V0L3VzZS1zY3JvbGwtdGFyZ2V0LmpzJ1xuaW1wb3J0IHVzZU1vZGVsVG9nZ2xlLCB7IHVzZU1vZGVsVG9nZ2xlUHJvcHMsIHVzZU1vZGVsVG9nZ2xlRW1pdHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1tb2RlbC10b2dnbGUvdXNlLW1vZGVsLXRvZ2dsZS5qcydcbmltcG9ydCB1c2VEYXJrLCB7IHVzZURhcmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLWRhcmsvdXNlLWRhcmsuanMnXG5pbXBvcnQgdXNlUG9ydGFsIGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLXBvcnRhbC91c2UtcG9ydGFsLmpzJ1xuaW1wb3J0IHVzZVRyYW5zaXRpb24sIHsgdXNlVHJhbnNpdGlvblByb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtdHJhbnNpdGlvbi91c2UtdHJhbnNpdGlvbi5qcydcbmltcG9ydCB1c2VUaWNrIGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3VzZS10aWNrL3VzZS10aWNrLmpzJ1xuaW1wb3J0IHVzZVRpbWVvdXQgZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvdXNlLXRpbWVvdXQvdXNlLXRpbWVvdXQuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGNsb3NlUG9ydGFsTWVudXMgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnBvcnRhbC9wb3J0YWwuanMnXG5pbXBvcnQgeyBnZXRTY3JvbGxUYXJnZXQsIHNjcm9sbFRhcmdldFByb3AgfSBmcm9tICcuLi8uLi91dGlscy9zY3JvbGwvc2Nyb2xsLmpzJ1xuaW1wb3J0IHsgcG9zaXRpb24sIHN0b3BBbmRQcmV2ZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvZXZlbnQvZXZlbnQuanMnXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcbmltcG9ydCB7IGFkZEVzY2FwZUtleSwgcmVtb3ZlRXNjYXBlS2V5IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5rZXlib2FyZC9lc2NhcGUta2V5LmpzJ1xuaW1wb3J0IHsgYWRkRm9jdXNvdXQsIHJlbW92ZUZvY3Vzb3V0IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5mb2N1cy9mb2N1c291dC5qcydcbmltcG9ydCB7IGNoaWxkSGFzRm9jdXMgfSBmcm9tICcuLi8uLi91dGlscy9kb20vZG9tLmpzJ1xuaW1wb3J0IHsgYWRkQ2xpY2tPdXRzaWRlLCByZW1vdmVDbGlja091dHNpZGUgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNsaWNrLW91dHNpZGUvY2xpY2stb3V0c2lkZS5qcydcbmltcG9ydCB7IGFkZEZvY3VzRm4gfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmZvY3VzL2ZvY3VzLW1hbmFnZXIuanMnXG5cbmltcG9ydCB7XG4gIHZhbGlkYXRlUG9zaXRpb24sIHZhbGlkYXRlT2Zmc2V0LCBzZXRQb3NpdGlvbiwgcGFyc2VQb3NpdGlvblxufSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnBvc2l0aW9uLWVuZ2luZS9wb3NpdGlvbi1lbmdpbmUuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRTWVudScsXG5cbiAgaW5oZXJpdEF0dHJzOiBmYWxzZSxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZUFuY2hvclByb3BzLFxuICAgIC4uLnVzZU1vZGVsVG9nZ2xlUHJvcHMsXG4gICAgLi4udXNlRGFya1Byb3BzLFxuICAgIC4uLnVzZVRyYW5zaXRpb25Qcm9wcyxcblxuICAgIHBlcnNpc3RlbnQ6IEJvb2xlYW4sXG4gICAgYXV0b0Nsb3NlOiBCb29sZWFuLFxuICAgIHNlcGFyYXRlQ2xvc2VQb3B1cDogQm9vbGVhbixcbiAgICBub0VzY0Rpc21pc3M6IEJvb2xlYW4sXG4gICAgbm9Sb3V0ZURpc21pc3M6IEJvb2xlYW4sXG4gICAgbm9SZWZvY3VzOiBCb29sZWFuLFxuICAgIG5vRm9jdXM6IEJvb2xlYW4sXG5cbiAgICBmaXQ6IEJvb2xlYW4sXG4gICAgY292ZXI6IEJvb2xlYW4sXG5cbiAgICBzcXVhcmU6IEJvb2xlYW4sXG5cbiAgICBhbmNob3I6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbGlkYXRvcjogdmFsaWRhdGVQb3NpdGlvblxuICAgIH0sXG4gICAgc2VsZjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0ZVBvc2l0aW9uXG4gICAgfSxcbiAgICBvZmZzZXQ6IHtcbiAgICAgIHR5cGU6IEFycmF5LFxuICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0ZU9mZnNldFxuICAgIH0sXG5cbiAgICBzY3JvbGxUYXJnZXQ6IHNjcm9sbFRhcmdldFByb3AsXG5cbiAgICB0b3VjaFBvc2l0aW9uOiBCb29sZWFuLFxuXG4gICAgbWF4SGVpZ2h0OiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiBudWxsXG4gICAgfSxcbiAgICBtYXhXaWR0aDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogbnVsbFxuICAgIH1cbiAgfSxcblxuICBlbWl0czogW1xuICAgIC4uLnVzZU1vZGVsVG9nZ2xlRW1pdHMsXG4gICAgJ2NsaWNrJywgJ2VzY2FwZUtleSdcbiAgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQsIGF0dHJzIH0pIHtcbiAgICBsZXQgcmVmb2N1c1RhcmdldCA9IG51bGwsIGFic29sdXRlT2Zmc2V0LCB1bndhdGNoUG9zaXRpb24sIGF2b2lkQXV0b0Nsb3NlXG5cbiAgICBjb25zdCB2bSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgY29uc3QgeyBwcm94eSB9ID0gdm1cbiAgICBjb25zdCB7ICRxIH0gPSBwcm94eVxuXG4gICAgY29uc3QgaW5uZXJSZWYgPSByZWYobnVsbClcbiAgICBjb25zdCBzaG93aW5nID0gcmVmKGZhbHNlKVxuXG4gICAgY29uc3QgaGlkZU9uUm91dGVDaGFuZ2UgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMucGVyc2lzdGVudCAhPT0gdHJ1ZVxuICAgICAgJiYgcHJvcHMubm9Sb3V0ZURpc21pc3MgIT09IHRydWVcbiAgICApXG5cbiAgICBjb25zdCBpc0RhcmsgPSB1c2VEYXJrKHByb3BzLCAkcSlcbiAgICBjb25zdCB7IHJlZ2lzdGVyVGljaywgcmVtb3ZlVGljayB9ID0gdXNlVGljaygpXG4gICAgY29uc3QgeyByZWdpc3RlclRpbWVvdXQgfSA9IHVzZVRpbWVvdXQoKVxuICAgIGNvbnN0IHsgdHJhbnNpdGlvblByb3BzLCB0cmFuc2l0aW9uU3R5bGUgfSA9IHVzZVRyYW5zaXRpb24ocHJvcHMpXG4gICAgY29uc3QgeyBsb2NhbFNjcm9sbFRhcmdldCwgY2hhbmdlU2Nyb2xsRXZlbnQsIHVuY29uZmlndXJlU2Nyb2xsVGFyZ2V0IH0gPSB1c2VTY3JvbGxUYXJnZXQocHJvcHMsIGNvbmZpZ3VyZVNjcm9sbFRhcmdldClcblxuICAgIGNvbnN0IHsgYW5jaG9yRWwsIGNhblNob3cgfSA9IHVzZUFuY2hvcih7IHNob3dpbmcgfSlcblxuICAgIGNvbnN0IHsgaGlkZSB9ID0gdXNlTW9kZWxUb2dnbGUoe1xuICAgICAgc2hvd2luZywgY2FuU2hvdywgaGFuZGxlU2hvdywgaGFuZGxlSGlkZSxcbiAgICAgIGhpZGVPblJvdXRlQ2hhbmdlLFxuICAgICAgcHJvY2Vzc09uTW91bnQ6IHRydWVcbiAgICB9KVxuXG4gICAgY29uc3QgeyBzaG93UG9ydGFsLCBoaWRlUG9ydGFsLCByZW5kZXJQb3J0YWwgfSA9IHVzZVBvcnRhbCh2bSwgaW5uZXJSZWYsIHJlbmRlclBvcnRhbENvbnRlbnQsICdtZW51JylcblxuICAgIGNvbnN0IGNsaWNrT3V0c2lkZVByb3BzID0ge1xuICAgICAgYW5jaG9yRWwsXG4gICAgICBpbm5lclJlZixcbiAgICAgIG9uQ2xpY2tPdXRzaWRlIChlKSB7XG4gICAgICAgIGlmIChwcm9wcy5wZXJzaXN0ZW50ICE9PSB0cnVlICYmIHNob3dpbmcudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICBoaWRlKGUpXG5cbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAvLyBhbHdheXMgcHJldmVudCB0b3VjaCBldmVudFxuICAgICAgICAgICAgZS50eXBlID09PSAndG91Y2hzdGFydCdcbiAgICAgICAgICAgIC8vIHByZXZlbnQgY2xpY2sgaWYgaXQncyBvbiBhIGRpYWxvZyBiYWNrZHJvcFxuICAgICAgICAgICAgfHwgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdxLWRpYWxvZ19fYmFja2Ryb3AnKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgc3RvcEFuZFByZXZlbnQoZSlcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgYW5jaG9yT3JpZ2luID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHBhcnNlUG9zaXRpb24oXG4gICAgICAgIHByb3BzLmFuY2hvciB8fCAoXG4gICAgICAgICAgcHJvcHMuY292ZXIgPT09IHRydWUgPyAnY2VudGVyIG1pZGRsZScgOiAnYm90dG9tIHN0YXJ0J1xuICAgICAgICApLFxuICAgICAgICAkcS5sYW5nLnJ0bFxuICAgICAgKVxuICAgIClcblxuICAgIGNvbnN0IHNlbGZPcmlnaW4gPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5jb3ZlciA9PT0gdHJ1ZVxuICAgICAgICA/IGFuY2hvck9yaWdpbi52YWx1ZVxuICAgICAgICA6IHBhcnNlUG9zaXRpb24ocHJvcHMuc2VsZiB8fCAndG9wIHN0YXJ0JywgJHEubGFuZy5ydGwpXG4gICAgKSlcblxuICAgIGNvbnN0IG1lbnVDbGFzcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAocHJvcHMuc3F1YXJlID09PSB0cnVlID8gJyBxLW1lbnUtLXNxdWFyZScgOiAnJylcbiAgICAgICsgKGlzRGFyay52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1tZW51LS1kYXJrIHEtZGFyaycgOiAnJylcbiAgICApXG5cbiAgICBjb25zdCBvbkV2ZW50cyA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLmF1dG9DbG9zZSA9PT0gdHJ1ZVxuICAgICAgICA/IHsgb25DbGljazogb25BdXRvQ2xvc2UgfVxuICAgICAgICA6IHt9XG4gICAgKSlcblxuICAgIGNvbnN0IGhhbmRsZXNGb2N1cyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBzaG93aW5nLnZhbHVlID09PSB0cnVlICYmIHByb3BzLnBlcnNpc3RlbnQgIT09IHRydWVcbiAgICApXG5cbiAgICB3YXRjaChoYW5kbGVzRm9jdXMsIHZhbCA9PiB7XG4gICAgICBpZiAodmFsID09PSB0cnVlKSB7XG4gICAgICAgIGFkZEVzY2FwZUtleShvbkVzY2FwZUtleSlcbiAgICAgICAgYWRkQ2xpY2tPdXRzaWRlKGNsaWNrT3V0c2lkZVByb3BzKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJlbW92ZUVzY2FwZUtleShvbkVzY2FwZUtleSlcbiAgICAgICAgcmVtb3ZlQ2xpY2tPdXRzaWRlKGNsaWNrT3V0c2lkZVByb3BzKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBmdW5jdGlvbiBmb2N1cyAoKSB7XG4gICAgICBhZGRGb2N1c0ZuKCgpID0+IHtcbiAgICAgICAgbGV0IG5vZGUgPSBpbm5lclJlZi52YWx1ZVxuXG4gICAgICAgIGlmIChub2RlICYmIChub2RlLmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpICE9PSB0cnVlKSkge1xuICAgICAgICAgIG5vZGUgPSBub2RlLnF1ZXJ5U2VsZWN0b3IoJ1thdXRvZm9jdXNdW3RhYmluZGV4XSwgW2RhdGEtYXV0b2ZvY3VzXVt0YWJpbmRleF0nKVxuICAgICAgICAgICAgfHwgbm9kZS5xdWVyeVNlbGVjdG9yKCdbYXV0b2ZvY3VzXSBbdGFiaW5kZXhdLCBbZGF0YS1hdXRvZm9jdXNdIFt0YWJpbmRleF0nKVxuICAgICAgICAgICAgfHwgbm9kZS5xdWVyeVNlbGVjdG9yKCdbYXV0b2ZvY3VzXSwgW2RhdGEtYXV0b2ZvY3VzXScpXG4gICAgICAgICAgICB8fCBub2RlXG4gICAgICAgICAgbm9kZS5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVTaG93IChldnQpIHtcbiAgICAgIHJlZm9jdXNUYXJnZXQgPSBwcm9wcy5ub1JlZm9jdXMgPT09IGZhbHNlXG4gICAgICAgID8gZG9jdW1lbnQuYWN0aXZlRWxlbWVudFxuICAgICAgICA6IG51bGxcblxuICAgICAgYWRkRm9jdXNvdXQob25Gb2N1c291dClcblxuICAgICAgc2hvd1BvcnRhbCgpXG4gICAgICBjb25maWd1cmVTY3JvbGxUYXJnZXQoKVxuXG4gICAgICBhYnNvbHV0ZU9mZnNldCA9IHZvaWQgMFxuXG4gICAgICBpZiAoZXZ0ICE9PSB2b2lkIDAgJiYgKHByb3BzLnRvdWNoUG9zaXRpb24gfHwgcHJvcHMuY29udGV4dE1lbnUpKSB7XG4gICAgICAgIGNvbnN0IHBvcyA9IHBvc2l0aW9uKGV2dClcblxuICAgICAgICBpZiAocG9zLmxlZnQgIT09IHZvaWQgMCkge1xuICAgICAgICAgIGNvbnN0IHsgdG9wLCBsZWZ0IH0gPSBhbmNob3JFbC52YWx1ZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICAgIGFic29sdXRlT2Zmc2V0ID0geyBsZWZ0OiBwb3MubGVmdCAtIGxlZnQsIHRvcDogcG9zLnRvcCAtIHRvcCB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHVud2F0Y2hQb3NpdGlvbiA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHVud2F0Y2hQb3NpdGlvbiA9IHdhdGNoKFxuICAgICAgICAgICgpID0+ICRxLnNjcmVlbi53aWR0aCArICd8JyArICRxLnNjcmVlbi5oZWlnaHQgKyAnfCcgKyBwcm9wcy5zZWxmICsgJ3wnICsgcHJvcHMuYW5jaG9yICsgJ3wnICsgJHEubGFuZy5ydGwsXG4gICAgICAgICAgdXBkYXRlUG9zaXRpb25cbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHMubm9Gb2N1cyAhPT0gdHJ1ZSkge1xuICAgICAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50LmJsdXIoKVxuICAgICAgfVxuXG4gICAgICAvLyBzaG91bGQgcmVtb3ZlVGljaygpIGlmIHRoaXMgZ2V0cyByZW1vdmVkXG4gICAgICByZWdpc3RlclRpY2soKCkgPT4ge1xuICAgICAgICB1cGRhdGVQb3NpdGlvbigpXG4gICAgICAgIHByb3BzLm5vRm9jdXMgIT09IHRydWUgJiYgZm9jdXMoKVxuICAgICAgfSlcblxuICAgICAgLy8gc2hvdWxkIHJlbW92ZVRpbWVvdXQoKSBpZiB0aGlzIGdldHMgcmVtb3ZlZFxuICAgICAgcmVnaXN0ZXJUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgLy8gcmVxdWlyZWQgaW4gb3JkZXIgdG8gYXZvaWQgdGhlIFwiZG91YmxlLXRhcCBuZWVkZWRcIiBpc3N1ZVxuICAgICAgICBpZiAoJHEucGxhdGZvcm0uaXMuaW9zID09PSB0cnVlKSB7XG4gICAgICAgICAgLy8gaWYgYXV0by1jbG9zZSwgdGhlbiB0aGlzIGNsaWNrIHNob3VsZFxuICAgICAgICAgIC8vIG5vdCBjbG9zZSB0aGUgbWVudVxuICAgICAgICAgIGF2b2lkQXV0b0Nsb3NlID0gcHJvcHMuYXV0b0Nsb3NlXG4gICAgICAgICAgaW5uZXJSZWYudmFsdWUuY2xpY2soKVxuICAgICAgICB9XG5cbiAgICAgICAgdXBkYXRlUG9zaXRpb24oKVxuICAgICAgICBzaG93UG9ydGFsKHRydWUpIC8vIGRvbmUgc2hvd2luZyBwb3J0YWxcbiAgICAgICAgZW1pdCgnc2hvdycsIGV2dClcbiAgICAgIH0sIHByb3BzLnRyYW5zaXRpb25EdXJhdGlvbilcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVIaWRlIChldnQpIHtcbiAgICAgIHJlbW92ZVRpY2soKVxuICAgICAgaGlkZVBvcnRhbCgpXG5cbiAgICAgIGFuY2hvckNsZWFudXAodHJ1ZSlcblxuICAgICAgaWYgKFxuICAgICAgICByZWZvY3VzVGFyZ2V0ICE9PSBudWxsXG4gICAgICAgICYmIChcbiAgICAgICAgICAvLyBtZW51IHdhcyBoaWRkZW4gZnJvbSBjb2RlIG9yIEVTQyBwbHVnaW5cbiAgICAgICAgICBldnQgPT09IHZvaWQgMFxuICAgICAgICAgIC8vIG1lbnUgd2FzIG5vdCBjbG9zZWQgZnJvbSBhIG1vdXNlIG9yIHRvdWNoIGNsaWNrT3V0c2lkZVxuICAgICAgICAgIHx8IGV2dC5xQ2xpY2tPdXRzaWRlICE9PSB0cnVlXG4gICAgICAgIClcbiAgICAgICkge1xuICAgICAgICAoKGV2dD8udHlwZS5pbmRleE9mKCdrZXknKSA9PT0gMFxuICAgICAgICAgID8gcmVmb2N1c1RhcmdldC5jbG9zZXN0KCdbdGFiaW5kZXhdOm5vdChbdGFiaW5kZXhePVwiLVwiXSknKVxuICAgICAgICAgIDogdm9pZCAwXG4gICAgICAgICkgfHwgcmVmb2N1c1RhcmdldCkuZm9jdXMoKVxuXG4gICAgICAgIHJlZm9jdXNUYXJnZXQgPSBudWxsXG4gICAgICB9XG5cbiAgICAgIC8vIHNob3VsZCByZW1vdmVUaW1lb3V0KCkgaWYgdGhpcyBnZXRzIHJlbW92ZWRcbiAgICAgIHJlZ2lzdGVyVGltZW91dCgoKSA9PiB7XG4gICAgICAgIGhpZGVQb3J0YWwodHJ1ZSkgLy8gZG9uZSBoaWRpbmcsIG5vdyBkZXN0cm95XG4gICAgICAgIGVtaXQoJ2hpZGUnLCBldnQpXG4gICAgICB9LCBwcm9wcy50cmFuc2l0aW9uRHVyYXRpb24pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYW5jaG9yQ2xlYW51cCAoaGlkaW5nKSB7XG4gICAgICBhYnNvbHV0ZU9mZnNldCA9IHZvaWQgMFxuXG4gICAgICBpZiAodW53YXRjaFBvc2l0aW9uICE9PSB2b2lkIDApIHtcbiAgICAgICAgdW53YXRjaFBvc2l0aW9uKClcbiAgICAgICAgdW53YXRjaFBvc2l0aW9uID0gdm9pZCAwXG4gICAgICB9XG5cbiAgICAgIGlmIChoaWRpbmcgPT09IHRydWUgfHwgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICByZW1vdmVGb2N1c291dChvbkZvY3Vzb3V0KVxuICAgICAgICB1bmNvbmZpZ3VyZVNjcm9sbFRhcmdldCgpXG4gICAgICAgIHJlbW92ZUNsaWNrT3V0c2lkZShjbGlja091dHNpZGVQcm9wcylcbiAgICAgICAgcmVtb3ZlRXNjYXBlS2V5KG9uRXNjYXBlS2V5KVxuICAgICAgfVxuXG4gICAgICBpZiAoaGlkaW5nICE9PSB0cnVlKSB7XG4gICAgICAgIHJlZm9jdXNUYXJnZXQgPSBudWxsXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29uZmlndXJlU2Nyb2xsVGFyZ2V0ICgpIHtcbiAgICAgIGlmIChhbmNob3JFbC52YWx1ZSAhPT0gbnVsbCB8fCBwcm9wcy5zY3JvbGxUYXJnZXQgIT09IHZvaWQgMCkge1xuICAgICAgICBsb2NhbFNjcm9sbFRhcmdldC52YWx1ZSA9IGdldFNjcm9sbFRhcmdldChhbmNob3JFbC52YWx1ZSwgcHJvcHMuc2Nyb2xsVGFyZ2V0KVxuICAgICAgICBjaGFuZ2VTY3JvbGxFdmVudChsb2NhbFNjcm9sbFRhcmdldC52YWx1ZSwgdXBkYXRlUG9zaXRpb24pXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25BdXRvQ2xvc2UgKGUpIHtcbiAgICAgIC8vIGlmIGF1dG8tY2xvc2UsIHRoZW4gdGhlIGlvcyBkb3VibGUtdGFwIGZpeCB3aGljaFxuICAgICAgLy8gaXNzdWVzIGEgY2xpY2sgc2hvdWxkIG5vdCBjbG9zZSB0aGUgbWVudVxuICAgICAgaWYgKGF2b2lkQXV0b0Nsb3NlICE9PSB0cnVlKSB7XG4gICAgICAgIGNsb3NlUG9ydGFsTWVudXMocHJveHksIGUpXG4gICAgICAgIGVtaXQoJ2NsaWNrJywgZSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBhdm9pZEF1dG9DbG9zZSA9IGZhbHNlXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Gb2N1c291dCAoZXZ0KSB7XG4gICAgICAvLyB0aGUgZm9jdXMgaXMgbm90IGluIGEgdnVlIGNoaWxkIGNvbXBvbmVudFxuICAgICAgaWYgKFxuICAgICAgICBoYW5kbGVzRm9jdXMudmFsdWUgPT09IHRydWVcbiAgICAgICAgJiYgcHJvcHMubm9Gb2N1cyAhPT0gdHJ1ZVxuICAgICAgICAmJiBjaGlsZEhhc0ZvY3VzKGlubmVyUmVmLnZhbHVlLCBldnQudGFyZ2V0KSAhPT0gdHJ1ZVxuICAgICAgKSB7XG4gICAgICAgIGZvY3VzKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkVzY2FwZUtleSAoZXZ0KSB7XG4gICAgICBpZiAocHJvcHMubm9Fc2NEaXNtaXNzICE9PSB0cnVlKSB7XG4gICAgICAgIGVtaXQoJ2VzY2FwZUtleScpXG4gICAgICAgIGhpZGUoZXZ0KVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZVBvc2l0aW9uICgpIHtcbiAgICAgIHNldFBvc2l0aW9uKHtcbiAgICAgICAgdGFyZ2V0RWw6IGlubmVyUmVmLnZhbHVlLFxuICAgICAgICBvZmZzZXQ6IHByb3BzLm9mZnNldCxcbiAgICAgICAgYW5jaG9yRWw6IGFuY2hvckVsLnZhbHVlLFxuICAgICAgICBhbmNob3JPcmlnaW46IGFuY2hvck9yaWdpbi52YWx1ZSxcbiAgICAgICAgc2VsZk9yaWdpbjogc2VsZk9yaWdpbi52YWx1ZSxcbiAgICAgICAgYWJzb2x1dGVPZmZzZXQsXG4gICAgICAgIGZpdDogcHJvcHMuZml0LFxuICAgICAgICBjb3ZlcjogcHJvcHMuY292ZXIsXG4gICAgICAgIG1heEhlaWdodDogcHJvcHMubWF4SGVpZ2h0LFxuICAgICAgICBtYXhXaWR0aDogcHJvcHMubWF4V2lkdGhcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyUG9ydGFsQ29udGVudCAoKSB7XG4gICAgICByZXR1cm4gaChcbiAgICAgICAgVHJhbnNpdGlvbixcbiAgICAgICAgdHJhbnNpdGlvblByb3BzLnZhbHVlLFxuICAgICAgICAoKSA9PiAoXG4gICAgICAgICAgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgICAgPyBoKCdkaXYnLCB7XG4gICAgICAgICAgICAgIHJvbGU6ICdtZW51JyxcbiAgICAgICAgICAgICAgLi4uYXR0cnMsXG4gICAgICAgICAgICAgIHJlZjogaW5uZXJSZWYsXG4gICAgICAgICAgICAgIHRhYmluZGV4OiAtMSxcbiAgICAgICAgICAgICAgY2xhc3M6IFtcbiAgICAgICAgICAgICAgICAncS1tZW51IHEtcG9zaXRpb24tZW5naW5lIHNjcm9sbCcgKyBtZW51Q2xhc3MudmFsdWUsXG4gICAgICAgICAgICAgICAgYXR0cnMuY2xhc3NcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgc3R5bGU6IFtcbiAgICAgICAgICAgICAgICBhdHRycy5zdHlsZSxcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uU3R5bGUudmFsdWVcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgLi4ub25FdmVudHMudmFsdWVcbiAgICAgICAgICAgIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICAgICAgICAgICAgOiBudWxsXG4gICAgICAgIClcbiAgICAgIClcbiAgICB9XG5cbiAgICBvbkJlZm9yZVVubW91bnQoYW5jaG9yQ2xlYW51cClcblxuICAgIC8vIGV4cG9zZSBwdWJsaWMgbWV0aG9kc1xuICAgIE9iamVjdC5hc3NpZ24ocHJveHksIHsgZm9jdXMsIHVwZGF0ZVBvc2l0aW9uIH0pXG5cbiAgICByZXR1cm4gcmVuZGVyUG9ydGFsXG4gIH1cbn0pXG4iLCJsZXQgcnRsSGFzU2Nyb2xsQnVnID0gZmFsc2VcblxuLy8gbW9iaWxlIENocm9tZSB0YWtlcyB0aGUgY3Jvd24gZm9yIHRoaXNcbmlmICghX19RVUFTQVJfU1NSX18pIHtcbiAgY29uc3Qgc2Nyb2xsZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICBzY3JvbGxlci5zZXRBdHRyaWJ1dGUoJ2RpcicsICdydGwnKVxuICBPYmplY3QuYXNzaWduKHNjcm9sbGVyLnN0eWxlLCB7XG4gICAgd2lkdGg6ICcxcHgnLFxuICAgIGhlaWdodDogJzFweCcsXG4gICAgb3ZlcmZsb3c6ICdhdXRvJ1xuICB9KVxuXG4gIGNvbnN0IHNwYWNlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gIE9iamVjdC5hc3NpZ24oc3BhY2VyLnN0eWxlLCB7XG4gICAgd2lkdGg6ICcxMDAwcHgnLFxuICAgIGhlaWdodDogJzFweCdcbiAgfSlcblxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcm9sbGVyKVxuICBzY3JvbGxlci5hcHBlbmRDaGlsZChzcGFjZXIpXG4gIHNjcm9sbGVyLnNjcm9sbExlZnQgPSAtMTAwMFxuXG4gIHJ0bEhhc1Njcm9sbEJ1ZyA9IHNjcm9sbGVyLnNjcm9sbExlZnQgPj0gMFxuXG4gIHNjcm9sbGVyLnJlbW92ZSgpXG59XG5cbmV4cG9ydCB7XG4gIHJ0bEhhc1Njcm9sbEJ1Z1xufVxuIiwiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgd2F0Y2gsIG9uQWN0aXZhdGVkLCBvbkRlYWN0aXZhdGVkLCBvbkJlZm9yZU1vdW50LCBvbkJlZm9yZVVubW91bnQsIG5leHRUaWNrLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBkZWJvdW5jZSBmcm9tICcuLi8uLi91dGlscy9kZWJvdW5jZS9kZWJvdW5jZS5qcydcbmltcG9ydCB7IG5vb3AgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC9ldmVudC5qcydcbmltcG9ydCB7IHJ0bEhhc1Njcm9sbEJ1ZyB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucnRsL3J0bC5qcydcblxuY29uc3QgYWdnQnVja2V0U2l6ZSA9IDEwMDBcblxuY29uc3Qgc2Nyb2xsVG9FZGdlcyA9IFtcbiAgJ3N0YXJ0JyxcbiAgJ2NlbnRlcicsXG4gICdlbmQnLFxuICAnc3RhcnQtZm9yY2UnLFxuICAnY2VudGVyLWZvcmNlJyxcbiAgJ2VuZC1mb3JjZSdcbl1cblxuY29uc3QgZmlsdGVyUHJvdG8gPSBBcnJheS5wcm90b3R5cGUuZmlsdGVyXG5cbmNvbnN0IHNldE92ZXJmbG93QW5jaG9yID0gX19RVUFTQVJfU1NSX18gfHwgd2luZG93LmdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuYm9keSkub3ZlcmZsb3dBbmNob3IgPT09IHZvaWQgMFxuICA/IG5vb3BcbiAgOiBmdW5jdGlvbiAoY29udGVudEVsLCBpbmRleCkge1xuICAgIGlmIChjb250ZW50RWwgPT09IG51bGwpIHJldHVyblxuXG4gICAgaWYgKGNvbnRlbnRFbC5fcU92ZXJmbG93QW5pbWF0aW9uRnJhbWUgIT09IHZvaWQgMCkge1xuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUoY29udGVudEVsLl9xT3ZlcmZsb3dBbmltYXRpb25GcmFtZSlcbiAgICB9XG5cbiAgICBjb250ZW50RWwuX3FPdmVyZmxvd0FuaW1hdGlvbkZyYW1lID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIGlmIChjb250ZW50RWwgPT09IG51bGwpIHJldHVyblxuXG4gICAgICBjb250ZW50RWwuX3FPdmVyZmxvd0FuaW1hdGlvbkZyYW1lID0gdm9pZCAwXG4gICAgICBjb25zdCBjaGlsZHJlbiA9IGNvbnRlbnRFbC5jaGlsZHJlbiB8fCBbXVxuXG4gICAgICBmaWx0ZXJQcm90b1xuICAgICAgICAuY2FsbChjaGlsZHJlbiwgZWwgPT4gZWwuZGF0YXNldCAmJiBlbC5kYXRhc2V0LnFWc0FuY2hvciAhPT0gdm9pZCAwKVxuICAgICAgICAuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgICAgZGVsZXRlIGVsLmRhdGFzZXQucVZzQW5jaG9yXG4gICAgICAgIH0pXG5cbiAgICAgIGNvbnN0IGVsID0gY2hpbGRyZW5bIGluZGV4IF1cblxuICAgICAgaWYgKGVsPy5kYXRhc2V0KSB7XG4gICAgICAgIGVsLmRhdGFzZXQucVZzQW5jaG9yID0gJydcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbmZ1bmN0aW9uIHN1bUZuIChhY2MsIGgpIHtcbiAgcmV0dXJuIGFjYyArIGhcbn1cblxuZnVuY3Rpb24gZ2V0U2Nyb2xsRGV0YWlscyAoXG4gIHBhcmVudCxcbiAgY2hpbGQsXG4gIGJlZm9yZVJlZixcbiAgYWZ0ZXJSZWYsXG4gIGhvcml6b250YWwsXG4gIHJ0bCxcbiAgc3RpY2t5U3RhcnQsXG4gIHN0aWNreUVuZFxuKSB7XG4gIGNvbnN0XG4gICAgcGFyZW50Q2FsYyA9IHBhcmVudCA9PT0gd2luZG93ID8gZG9jdW1lbnQuc2Nyb2xsaW5nRWxlbWVudCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgOiBwYXJlbnQsXG4gICAgcHJvcEVsU2l6ZSA9IGhvcml6b250YWwgPT09IHRydWUgPyAnb2Zmc2V0V2lkdGgnIDogJ29mZnNldEhlaWdodCcsXG4gICAgZGV0YWlscyA9IHtcbiAgICAgIHNjcm9sbFN0YXJ0OiAwLFxuICAgICAgc2Nyb2xsVmlld1NpemU6IC1zdGlja3lTdGFydCAtIHN0aWNreUVuZCxcbiAgICAgIHNjcm9sbE1heFNpemU6IDAsXG4gICAgICBvZmZzZXRTdGFydDogLXN0aWNreVN0YXJ0LFxuICAgICAgb2Zmc2V0RW5kOiAtc3RpY2t5RW5kXG4gICAgfVxuXG4gIGlmIChob3Jpem9udGFsID09PSB0cnVlKSB7XG4gICAgaWYgKHBhcmVudCA9PT0gd2luZG93KSB7XG4gICAgICBkZXRhaWxzLnNjcm9sbFN0YXJ0ID0gd2luZG93LnBhZ2VYT2Zmc2V0IHx8IHdpbmRvdy5zY3JvbGxYIHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdCB8fCAwXG4gICAgICBkZXRhaWxzLnNjcm9sbFZpZXdTaXplICs9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aFxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGRldGFpbHMuc2Nyb2xsU3RhcnQgPSBwYXJlbnRDYWxjLnNjcm9sbExlZnRcbiAgICAgIGRldGFpbHMuc2Nyb2xsVmlld1NpemUgKz0gcGFyZW50Q2FsYy5jbGllbnRXaWR0aFxuICAgIH1cbiAgICBkZXRhaWxzLnNjcm9sbE1heFNpemUgPSBwYXJlbnRDYWxjLnNjcm9sbFdpZHRoXG5cbiAgICBpZiAocnRsID09PSB0cnVlKSB7XG4gICAgICBkZXRhaWxzLnNjcm9sbFN0YXJ0ID0gKHJ0bEhhc1Njcm9sbEJ1ZyA9PT0gdHJ1ZSA/IGRldGFpbHMuc2Nyb2xsTWF4U2l6ZSAtIGRldGFpbHMuc2Nyb2xsVmlld1NpemUgOiAwKSAtIGRldGFpbHMuc2Nyb2xsU3RhcnRcbiAgICB9XG4gIH1cbiAgZWxzZSB7XG4gICAgaWYgKHBhcmVudCA9PT0gd2luZG93KSB7XG4gICAgICBkZXRhaWxzLnNjcm9sbFN0YXJ0ID0gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IHdpbmRvdy5zY3JvbGxZIHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wIHx8IDBcbiAgICAgIGRldGFpbHMuc2Nyb2xsVmlld1NpemUgKz0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodFxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGRldGFpbHMuc2Nyb2xsU3RhcnQgPSBwYXJlbnRDYWxjLnNjcm9sbFRvcFxuICAgICAgZGV0YWlscy5zY3JvbGxWaWV3U2l6ZSArPSBwYXJlbnRDYWxjLmNsaWVudEhlaWdodFxuICAgIH1cbiAgICBkZXRhaWxzLnNjcm9sbE1heFNpemUgPSBwYXJlbnRDYWxjLnNjcm9sbEhlaWdodFxuICB9XG5cbiAgaWYgKGJlZm9yZVJlZiAhPT0gbnVsbCkge1xuICAgIGZvciAobGV0IGVsID0gYmVmb3JlUmVmLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7IGVsICE9PSBudWxsOyBlbCA9IGVsLnByZXZpb3VzRWxlbWVudFNpYmxpbmcpIHtcbiAgICAgIGlmIChlbC5jbGFzc0xpc3QuY29udGFpbnMoJ3EtdmlydHVhbC1zY3JvbGwtLXNraXAnKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgZGV0YWlscy5vZmZzZXRTdGFydCArPSBlbFsgcHJvcEVsU2l6ZSBdXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKGFmdGVyUmVmICE9PSBudWxsKSB7XG4gICAgZm9yIChsZXQgZWwgPSBhZnRlclJlZi5uZXh0RWxlbWVudFNpYmxpbmc7IGVsICE9PSBudWxsOyBlbCA9IGVsLm5leHRFbGVtZW50U2libGluZykge1xuICAgICAgaWYgKGVsLmNsYXNzTGlzdC5jb250YWlucygncS12aXJ0dWFsLXNjcm9sbC0tc2tpcCcpID09PSBmYWxzZSkge1xuICAgICAgICBkZXRhaWxzLm9mZnNldEVuZCArPSBlbFsgcHJvcEVsU2l6ZSBdXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKGNoaWxkICE9PSBwYXJlbnQpIHtcbiAgICBjb25zdFxuICAgICAgcGFyZW50UmVjdCA9IHBhcmVudENhbGMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICBjaGlsZFJlY3QgPSBjaGlsZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXG4gICAgaWYgKGhvcml6b250YWwgPT09IHRydWUpIHtcbiAgICAgIGRldGFpbHMub2Zmc2V0U3RhcnQgKz0gY2hpbGRSZWN0LmxlZnQgLSBwYXJlbnRSZWN0LmxlZnRcbiAgICAgIGRldGFpbHMub2Zmc2V0RW5kIC09IGNoaWxkUmVjdC53aWR0aFxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGRldGFpbHMub2Zmc2V0U3RhcnQgKz0gY2hpbGRSZWN0LnRvcCAtIHBhcmVudFJlY3QudG9wXG4gICAgICBkZXRhaWxzLm9mZnNldEVuZCAtPSBjaGlsZFJlY3QuaGVpZ2h0XG4gICAgfVxuXG4gICAgaWYgKHBhcmVudCAhPT0gd2luZG93KSB7XG4gICAgICBkZXRhaWxzLm9mZnNldFN0YXJ0ICs9IGRldGFpbHMuc2Nyb2xsU3RhcnRcbiAgICB9XG4gICAgZGV0YWlscy5vZmZzZXRFbmQgKz0gZGV0YWlscy5zY3JvbGxNYXhTaXplIC0gZGV0YWlscy5vZmZzZXRTdGFydFxuICB9XG5cbiAgcmV0dXJuIGRldGFpbHNcbn1cblxuZnVuY3Rpb24gc2V0U2Nyb2xsIChwYXJlbnQsIHNjcm9sbCwgaG9yaXpvbnRhbCwgcnRsKSB7XG4gIGlmIChzY3JvbGwgPT09ICdlbmQnKSB7XG4gICAgc2Nyb2xsID0gKHBhcmVudCA9PT0gd2luZG93ID8gZG9jdW1lbnQuYm9keSA6IHBhcmVudClbXG4gICAgICBob3Jpem9udGFsID09PSB0cnVlID8gJ3Njcm9sbFdpZHRoJyA6ICdzY3JvbGxIZWlnaHQnXG4gICAgXVxuICB9XG5cbiAgaWYgKHBhcmVudCA9PT0gd2luZG93KSB7XG4gICAgaWYgKGhvcml6b250YWwgPT09IHRydWUpIHtcbiAgICAgIGlmIChydGwgPT09IHRydWUpIHtcbiAgICAgICAgc2Nyb2xsID0gKHJ0bEhhc1Njcm9sbEJ1ZyA9PT0gdHJ1ZSA/IGRvY3VtZW50LmJvZHkuc2Nyb2xsV2lkdGggLSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggOiAwKSAtIHNjcm9sbFxuICAgICAgfVxuICAgICAgd2luZG93LnNjcm9sbFRvKHNjcm9sbCwgd2luZG93LnBhZ2VZT2Zmc2V0IHx8IHdpbmRvdy5zY3JvbGxZIHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wIHx8IDApXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgd2luZG93LnNjcm9sbFRvKHdpbmRvdy5wYWdlWE9mZnNldCB8fCB3aW5kb3cuc2Nyb2xsWCB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQgfHwgMCwgc2Nyb2xsKVxuICAgIH1cbiAgfVxuICBlbHNlIGlmIChob3Jpem9udGFsID09PSB0cnVlKSB7XG4gICAgaWYgKHJ0bCA9PT0gdHJ1ZSkge1xuICAgICAgc2Nyb2xsID0gKHJ0bEhhc1Njcm9sbEJ1ZyA9PT0gdHJ1ZSA/IHBhcmVudC5zY3JvbGxXaWR0aCAtIHBhcmVudC5vZmZzZXRXaWR0aCA6IDApIC0gc2Nyb2xsXG4gICAgfVxuICAgIHBhcmVudC5zY3JvbGxMZWZ0ID0gc2Nyb2xsXG4gIH1cbiAgZWxzZSB7XG4gICAgcGFyZW50LnNjcm9sbFRvcCA9IHNjcm9sbFxuICB9XG59XG5cbmZ1bmN0aW9uIHN1bVNpemUgKHNpemVBZ2csIHNpemUsIGZyb20sIHRvKSB7XG4gIGlmIChmcm9tID49IHRvKSB7IHJldHVybiAwIH1cblxuICBjb25zdFxuICAgIGxhc3RUbyA9IHNpemUubGVuZ3RoLFxuICAgIGZyb21BZ2cgPSBNYXRoLmZsb29yKGZyb20gLyBhZ2dCdWNrZXRTaXplKSxcbiAgICB0b0FnZyA9IE1hdGguZmxvb3IoKHRvIC0gMSkgLyBhZ2dCdWNrZXRTaXplKSArIDFcblxuICBsZXQgdG90YWwgPSBzaXplQWdnLnNsaWNlKGZyb21BZ2csIHRvQWdnKS5yZWR1Y2Uoc3VtRm4sIDApXG5cbiAgaWYgKGZyb20gJSBhZ2dCdWNrZXRTaXplICE9PSAwKSB7XG4gICAgdG90YWwgLT0gc2l6ZS5zbGljZShmcm9tQWdnICogYWdnQnVja2V0U2l6ZSwgZnJvbSkucmVkdWNlKHN1bUZuLCAwKVxuICB9XG4gIGlmICh0byAlIGFnZ0J1Y2tldFNpemUgIT09IDAgJiYgdG8gIT09IGxhc3RUbykge1xuICAgIHRvdGFsIC09IHNpemUuc2xpY2UodG8sIHRvQWdnICogYWdnQnVja2V0U2l6ZSkucmVkdWNlKHN1bUZuLCAwKVxuICB9XG5cbiAgcmV0dXJuIHRvdGFsXG59XG5cbmNvbnN0IGNvbW1vblZpcnRTY3JvbGxQcm9wcyA9IHtcbiAgdmlydHVhbFNjcm9sbFNsaWNlU2l6ZToge1xuICAgIHR5cGU6IFsgTnVtYmVyLCBTdHJpbmcgXSxcbiAgICBkZWZhdWx0OiAxMFxuICB9LFxuXG4gIHZpcnR1YWxTY3JvbGxTbGljZVJhdGlvQmVmb3JlOiB7XG4gICAgdHlwZTogWyBOdW1iZXIsIFN0cmluZyBdLFxuICAgIGRlZmF1bHQ6IDFcbiAgfSxcblxuICB2aXJ0dWFsU2Nyb2xsU2xpY2VSYXRpb0FmdGVyOiB7XG4gICAgdHlwZTogWyBOdW1iZXIsIFN0cmluZyBdLFxuICAgIGRlZmF1bHQ6IDFcbiAgfSxcblxuICB2aXJ0dWFsU2Nyb2xsSXRlbVNpemU6IHtcbiAgICB0eXBlOiBbIE51bWJlciwgU3RyaW5nIF0sXG4gICAgZGVmYXVsdDogMjRcbiAgfSxcblxuICB2aXJ0dWFsU2Nyb2xsU3RpY2t5U2l6ZVN0YXJ0OiB7XG4gICAgdHlwZTogWyBOdW1iZXIsIFN0cmluZyBdLFxuICAgIGRlZmF1bHQ6IDBcbiAgfSxcblxuICB2aXJ0dWFsU2Nyb2xsU3RpY2t5U2l6ZUVuZDoge1xuICAgIHR5cGU6IFsgTnVtYmVyLCBTdHJpbmcgXSxcbiAgICBkZWZhdWx0OiAwXG4gIH0sXG5cbiAgdGFibGVDb2xzcGFuOiBbIE51bWJlciwgU3RyaW5nIF1cbn1cblxuZXhwb3J0IGNvbnN0IGNvbW1vblZpcnRTY3JvbGxQcm9wc0xpc3QgPSBPYmplY3Qua2V5cyhjb21tb25WaXJ0U2Nyb2xsUHJvcHMpXG5cbmV4cG9ydCBjb25zdCB1c2VWaXJ0dWFsU2Nyb2xsUHJvcHMgPSB7XG4gIHZpcnR1YWxTY3JvbGxIb3Jpem9udGFsOiBCb29sZWFuLFxuICBvblZpcnR1YWxTY3JvbGw6IEZ1bmN0aW9uLFxuICAuLi5jb21tb25WaXJ0U2Nyb2xsUHJvcHNcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZVZpcnR1YWxTY3JvbGwgKHtcbiAgdmlydHVhbFNjcm9sbExlbmd0aCwgZ2V0VmlydHVhbFNjcm9sbFRhcmdldCwgZ2V0VmlydHVhbFNjcm9sbEVsLFxuICB2aXJ0dWFsU2Nyb2xsSXRlbVNpemVDb21wdXRlZCAvLyBvcHRpb25hbFxufSkge1xuICBjb25zdCB2bSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgY29uc3QgeyBwcm9wcywgZW1pdCwgcHJveHkgfSA9IHZtXG4gIGNvbnN0IHsgJHEgfSA9IHByb3h5XG5cbiAgbGV0IHByZXZTY3JvbGxTdGFydCwgcHJldlRvSW5kZXgsIGxvY2FsU2Nyb2xsVmlld1NpemUsIHZpcnR1YWxTY3JvbGxTaXplc0FnZyA9IFtdLCB2aXJ0dWFsU2Nyb2xsU2l6ZXNcblxuICBjb25zdCB2aXJ0dWFsU2Nyb2xsUGFkZGluZ0JlZm9yZSA9IHJlZigwKVxuICBjb25zdCB2aXJ0dWFsU2Nyb2xsUGFkZGluZ0FmdGVyID0gcmVmKDApXG4gIGNvbnN0IHZpcnR1YWxTY3JvbGxTbGljZVNpemVDb21wdXRlZCA9IHJlZih7fSlcblxuICBjb25zdCBiZWZvcmVSZWYgPSByZWYobnVsbClcbiAgY29uc3QgYWZ0ZXJSZWYgPSByZWYobnVsbClcbiAgY29uc3QgY29udGVudFJlZiA9IHJlZihudWxsKVxuXG4gIGNvbnN0IHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlID0gcmVmKHsgZnJvbTogMCwgdG86IDAgfSlcblxuICBjb25zdCBjb2xzcGFuQXR0ciA9IGNvbXB1dGVkKCgpID0+IChwcm9wcy50YWJsZUNvbHNwYW4gIT09IHZvaWQgMCA/IHByb3BzLnRhYmxlQ29sc3BhbiA6IDEwMCkpXG5cbiAgaWYgKHZpcnR1YWxTY3JvbGxJdGVtU2l6ZUNvbXB1dGVkID09PSB2b2lkIDApIHtcbiAgICB2aXJ0dWFsU2Nyb2xsSXRlbVNpemVDb21wdXRlZCA9IGNvbXB1dGVkKCgpID0+IHByb3BzLnZpcnR1YWxTY3JvbGxJdGVtU2l6ZSlcbiAgfVxuXG4gIGNvbnN0IG5lZWRzUmVzZXQgPSBjb21wdXRlZCgoKSA9PiB2aXJ0dWFsU2Nyb2xsSXRlbVNpemVDb21wdXRlZC52YWx1ZSArICc7JyArIHByb3BzLnZpcnR1YWxTY3JvbGxIb3Jpem9udGFsKVxuXG4gIGNvbnN0IG5lZWRzU2xpY2VSZWNhbGMgPSBjb21wdXRlZCgoKSA9PlxuICAgIG5lZWRzUmVzZXQudmFsdWUgKyAnOycgKyBwcm9wcy52aXJ0dWFsU2Nyb2xsU2xpY2VSYXRpb0JlZm9yZSArICc7JyArIHByb3BzLnZpcnR1YWxTY3JvbGxTbGljZVJhdGlvQWZ0ZXJcbiAgKVxuXG4gIHdhdGNoKG5lZWRzU2xpY2VSZWNhbGMsICgpID0+IHsgc2V0VmlydHVhbFNjcm9sbFNpemUoKSB9KVxuICB3YXRjaChuZWVkc1Jlc2V0LCByZXNldClcblxuICBmdW5jdGlvbiByZXNldCAoKSB7XG4gICAgbG9jYWxSZXNldFZpcnR1YWxTY3JvbGwocHJldlRvSW5kZXgsIHRydWUpXG4gIH1cblxuICBmdW5jdGlvbiByZWZyZXNoICh0b0luZGV4KSB7XG4gICAgbG9jYWxSZXNldFZpcnR1YWxTY3JvbGwodG9JbmRleCA9PT0gdm9pZCAwID8gcHJldlRvSW5kZXggOiB0b0luZGV4KVxuICB9XG5cbiAgZnVuY3Rpb24gc2Nyb2xsVG8gKHRvSW5kZXgsIGVkZ2UpIHtcbiAgICBjb25zdCBzY3JvbGxFbCA9IGdldFZpcnR1YWxTY3JvbGxUYXJnZXQoKVxuXG4gICAgaWYgKFxuICAgICAgc2Nyb2xsRWwgPT09IHZvaWQgMFxuICAgICAgfHwgc2Nyb2xsRWwgPT09IG51bGxcbiAgICAgIHx8IHNjcm9sbEVsLm5vZGVUeXBlID09PSA4XG4gICAgKSByZXR1cm5cblxuICAgIGNvbnN0IHNjcm9sbERldGFpbHMgPSBnZXRTY3JvbGxEZXRhaWxzKFxuICAgICAgc2Nyb2xsRWwsXG4gICAgICBnZXRWaXJ0dWFsU2Nyb2xsRWwoKSxcbiAgICAgIGJlZm9yZVJlZi52YWx1ZSxcbiAgICAgIGFmdGVyUmVmLnZhbHVlLFxuICAgICAgcHJvcHMudmlydHVhbFNjcm9sbEhvcml6b250YWwsXG4gICAgICAkcS5sYW5nLnJ0bCxcbiAgICAgIHByb3BzLnZpcnR1YWxTY3JvbGxTdGlja3lTaXplU3RhcnQsXG4gICAgICBwcm9wcy52aXJ0dWFsU2Nyb2xsU3RpY2t5U2l6ZUVuZFxuICAgIClcblxuICAgIGxvY2FsU2Nyb2xsVmlld1NpemUgIT09IHNjcm9sbERldGFpbHMuc2Nyb2xsVmlld1NpemUgJiYgc2V0VmlydHVhbFNjcm9sbFNpemUoc2Nyb2xsRGV0YWlscy5zY3JvbGxWaWV3U2l6ZSlcblxuICAgIHNldFZpcnR1YWxTY3JvbGxTbGljZVJhbmdlKFxuICAgICAgc2Nyb2xsRWwsXG4gICAgICBzY3JvbGxEZXRhaWxzLFxuICAgICAgTWF0aC5taW4odmlydHVhbFNjcm9sbExlbmd0aC52YWx1ZSAtIDEsIE1hdGgubWF4KDAsIHBhcnNlSW50KHRvSW5kZXgsIDEwKSB8fCAwKSksXG4gICAgICAwLFxuICAgICAgc2Nyb2xsVG9FZGdlcy5pbmRleE9mKGVkZ2UpICE9PSAtMSA/IGVkZ2UgOiAocHJldlRvSW5kZXggIT09IC0xICYmIHRvSW5kZXggPiBwcmV2VG9JbmRleCA/ICdlbmQnIDogJ3N0YXJ0JylcbiAgICApXG4gIH1cblxuICBmdW5jdGlvbiBsb2NhbE9uVmlydHVhbFNjcm9sbEV2dCAoKSB7XG4gICAgY29uc3Qgc2Nyb2xsRWwgPSBnZXRWaXJ0dWFsU2Nyb2xsVGFyZ2V0KClcblxuICAgIGlmIChcbiAgICAgIHNjcm9sbEVsID09PSB2b2lkIDBcbiAgICAgIHx8IHNjcm9sbEVsID09PSBudWxsXG4gICAgICB8fCBzY3JvbGxFbC5ub2RlVHlwZSA9PT0gOFxuICAgICkgcmV0dXJuXG5cbiAgICBjb25zdFxuICAgICAgc2Nyb2xsRGV0YWlscyA9IGdldFNjcm9sbERldGFpbHMoXG4gICAgICAgIHNjcm9sbEVsLFxuICAgICAgICBnZXRWaXJ0dWFsU2Nyb2xsRWwoKSxcbiAgICAgICAgYmVmb3JlUmVmLnZhbHVlLFxuICAgICAgICBhZnRlclJlZi52YWx1ZSxcbiAgICAgICAgcHJvcHMudmlydHVhbFNjcm9sbEhvcml6b250YWwsXG4gICAgICAgICRxLmxhbmcucnRsLFxuICAgICAgICBwcm9wcy52aXJ0dWFsU2Nyb2xsU3RpY2t5U2l6ZVN0YXJ0LFxuICAgICAgICBwcm9wcy52aXJ0dWFsU2Nyb2xsU3RpY2t5U2l6ZUVuZFxuICAgICAgKSxcbiAgICAgIGxpc3RMYXN0SW5kZXggPSB2aXJ0dWFsU2Nyb2xsTGVuZ3RoLnZhbHVlIC0gMSxcbiAgICAgIGxpc3RFbmRPZmZzZXQgPSBzY3JvbGxEZXRhaWxzLnNjcm9sbE1heFNpemUgLSBzY3JvbGxEZXRhaWxzLm9mZnNldFN0YXJ0IC0gc2Nyb2xsRGV0YWlscy5vZmZzZXRFbmQgLSB2aXJ0dWFsU2Nyb2xsUGFkZGluZ0FmdGVyLnZhbHVlXG5cbiAgICBpZiAocHJldlNjcm9sbFN0YXJ0ID09PSBzY3JvbGxEZXRhaWxzLnNjcm9sbFN0YXJ0KSByZXR1cm5cblxuICAgIGlmIChzY3JvbGxEZXRhaWxzLnNjcm9sbE1heFNpemUgPD0gMCkge1xuICAgICAgc2V0VmlydHVhbFNjcm9sbFNsaWNlUmFuZ2Uoc2Nyb2xsRWwsIHNjcm9sbERldGFpbHMsIDAsIDApXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBsb2NhbFNjcm9sbFZpZXdTaXplICE9PSBzY3JvbGxEZXRhaWxzLnNjcm9sbFZpZXdTaXplICYmIHNldFZpcnR1YWxTY3JvbGxTaXplKHNjcm9sbERldGFpbHMuc2Nyb2xsVmlld1NpemUpXG5cbiAgICB1cGRhdGVWaXJ0dWFsU2Nyb2xsU2l6ZXModmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UudmFsdWUuZnJvbSlcblxuICAgIGNvbnN0IHNjcm9sbE1heFN0YXJ0ID0gTWF0aC5mbG9vcihzY3JvbGxEZXRhaWxzLnNjcm9sbE1heFNpemVcbiAgICAgIC0gTWF0aC5tYXgoc2Nyb2xsRGV0YWlscy5zY3JvbGxWaWV3U2l6ZSwgc2Nyb2xsRGV0YWlscy5vZmZzZXRFbmQpXG4gICAgICAtIE1hdGgubWluKHZpcnR1YWxTY3JvbGxTaXplc1sgbGlzdExhc3RJbmRleCBdLCBzY3JvbGxEZXRhaWxzLnNjcm9sbFZpZXdTaXplIC8gMikpXG5cbiAgICBpZiAoc2Nyb2xsTWF4U3RhcnQgPiAwICYmIE1hdGguY2VpbChzY3JvbGxEZXRhaWxzLnNjcm9sbFN0YXJ0KSA+PSBzY3JvbGxNYXhTdGFydCkge1xuICAgICAgc2V0VmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UoXG4gICAgICAgIHNjcm9sbEVsLFxuICAgICAgICBzY3JvbGxEZXRhaWxzLFxuICAgICAgICBsaXN0TGFzdEluZGV4LFxuICAgICAgICBzY3JvbGxEZXRhaWxzLnNjcm9sbE1heFNpemUgLSBzY3JvbGxEZXRhaWxzLm9mZnNldEVuZCAtIHZpcnR1YWxTY3JvbGxTaXplc0FnZy5yZWR1Y2Uoc3VtRm4sIDApXG4gICAgICApXG5cbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGxldFxuICAgICAgdG9JbmRleCA9IDAsXG4gICAgICBsaXN0T2Zmc2V0ID0gc2Nyb2xsRGV0YWlscy5zY3JvbGxTdGFydCAtIHNjcm9sbERldGFpbHMub2Zmc2V0U3RhcnQsXG4gICAgICBvZmZzZXQgPSBsaXN0T2Zmc2V0XG5cbiAgICBpZiAobGlzdE9mZnNldCA8PSBsaXN0RW5kT2Zmc2V0ICYmIGxpc3RPZmZzZXQgKyBzY3JvbGxEZXRhaWxzLnNjcm9sbFZpZXdTaXplID49IHZpcnR1YWxTY3JvbGxQYWRkaW5nQmVmb3JlLnZhbHVlKSB7XG4gICAgICBsaXN0T2Zmc2V0IC09IHZpcnR1YWxTY3JvbGxQYWRkaW5nQmVmb3JlLnZhbHVlXG4gICAgICB0b0luZGV4ID0gdmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UudmFsdWUuZnJvbVxuICAgICAgb2Zmc2V0ID0gbGlzdE9mZnNldFxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBsaXN0T2Zmc2V0ID49IHZpcnR1YWxTY3JvbGxTaXplc0FnZ1sgaiBdICYmIHRvSW5kZXggPCBsaXN0TGFzdEluZGV4OyBqKyspIHtcbiAgICAgICAgbGlzdE9mZnNldCAtPSB2aXJ0dWFsU2Nyb2xsU2l6ZXNBZ2dbIGogXVxuICAgICAgICB0b0luZGV4ICs9IGFnZ0J1Y2tldFNpemVcbiAgICAgIH1cbiAgICB9XG5cbiAgICB3aGlsZSAobGlzdE9mZnNldCA+IDAgJiYgdG9JbmRleCA8IGxpc3RMYXN0SW5kZXgpIHtcbiAgICAgIGxpc3RPZmZzZXQgLT0gdmlydHVhbFNjcm9sbFNpemVzWyB0b0luZGV4IF1cbiAgICAgIGlmIChsaXN0T2Zmc2V0ID4gLXNjcm9sbERldGFpbHMuc2Nyb2xsVmlld1NpemUpIHtcbiAgICAgICAgdG9JbmRleCsrXG4gICAgICAgIG9mZnNldCA9IGxpc3RPZmZzZXRcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBvZmZzZXQgPSB2aXJ0dWFsU2Nyb2xsU2l6ZXNbIHRvSW5kZXggXSArIGxpc3RPZmZzZXRcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRWaXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZShcbiAgICAgIHNjcm9sbEVsLFxuICAgICAgc2Nyb2xsRGV0YWlscyxcbiAgICAgIHRvSW5kZXgsXG4gICAgICBvZmZzZXRcbiAgICApXG4gIH1cblxuICBmdW5jdGlvbiBzZXRWaXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZSAoc2Nyb2xsRWwsIHNjcm9sbERldGFpbHMsIHRvSW5kZXgsIG9mZnNldCwgYWxpZ24pIHtcbiAgICBjb25zdCBhbGlnbkZvcmNlID0gdHlwZW9mIGFsaWduID09PSAnc3RyaW5nJyAmJiBhbGlnbi5pbmRleE9mKCctZm9yY2UnKSAhPT0gLTFcbiAgICBjb25zdCBhbGlnbkVuZCA9IGFsaWduRm9yY2UgPT09IHRydWUgPyBhbGlnbi5yZXBsYWNlKCctZm9yY2UnLCAnJykgOiBhbGlnblxuICAgIGNvbnN0IGFsaWduUmFuZ2UgPSBhbGlnbkVuZCAhPT0gdm9pZCAwID8gYWxpZ25FbmQgOiAnc3RhcnQnXG5cbiAgICBsZXRcbiAgICAgIGZyb20gPSBNYXRoLm1heCgwLCB0b0luZGV4IC0gdmlydHVhbFNjcm9sbFNsaWNlU2l6ZUNvbXB1dGVkLnZhbHVlWyBhbGlnblJhbmdlIF0pLFxuICAgICAgdG8gPSBmcm9tICsgdmlydHVhbFNjcm9sbFNsaWNlU2l6ZUNvbXB1dGVkLnZhbHVlLnRvdGFsXG5cbiAgICBpZiAodG8gPiB2aXJ0dWFsU2Nyb2xsTGVuZ3RoLnZhbHVlKSB7XG4gICAgICB0byA9IHZpcnR1YWxTY3JvbGxMZW5ndGgudmFsdWVcbiAgICAgIGZyb20gPSBNYXRoLm1heCgwLCB0byAtIHZpcnR1YWxTY3JvbGxTbGljZVNpemVDb21wdXRlZC52YWx1ZS50b3RhbClcbiAgICB9XG5cbiAgICBwcmV2U2Nyb2xsU3RhcnQgPSBzY3JvbGxEZXRhaWxzLnNjcm9sbFN0YXJ0XG5cbiAgICBjb25zdCByYW5nZUNoYW5nZWQgPSBmcm9tICE9PSB2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZS52YWx1ZS5mcm9tIHx8IHRvICE9PSB2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZS52YWx1ZS50b1xuXG4gICAgaWYgKHJhbmdlQ2hhbmdlZCA9PT0gZmFsc2UgJiYgYWxpZ25FbmQgPT09IHZvaWQgMCkge1xuICAgICAgZW1pdFNjcm9sbCh0b0luZGV4KVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgeyBhY3RpdmVFbGVtZW50IH0gPSBkb2N1bWVudFxuICAgIGNvbnN0IGNvbnRlbnRFbCA9IGNvbnRlbnRSZWYudmFsdWVcbiAgICBpZiAoXG4gICAgICByYW5nZUNoYW5nZWQgPT09IHRydWVcbiAgICAgICYmIGNvbnRlbnRFbCAhPT0gbnVsbFxuICAgICAgJiYgY29udGVudEVsICE9PSBhY3RpdmVFbGVtZW50XG4gICAgICAmJiBjb250ZW50RWwuY29udGFpbnMoYWN0aXZlRWxlbWVudCkgPT09IHRydWVcbiAgICApIHtcbiAgICAgIGNvbnRlbnRFbC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIG9uQmx1clJlZm9jdXNGbilcblxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNvbnRlbnRFbD8ucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCBvbkJsdXJSZWZvY3VzRm4pXG4gICAgICB9KVxuICAgIH1cblxuICAgIHNldE92ZXJmbG93QW5jaG9yKGNvbnRlbnRFbCwgdG9JbmRleCAtIGZyb20pXG5cbiAgICBjb25zdCBzaXplQmVmb3JlID0gYWxpZ25FbmQgIT09IHZvaWQgMCA/IHZpcnR1YWxTY3JvbGxTaXplcy5zbGljZShmcm9tLCB0b0luZGV4KS5yZWR1Y2Uoc3VtRm4sIDApIDogMFxuXG4gICAgaWYgKHJhbmdlQ2hhbmdlZCA9PT0gdHJ1ZSkge1xuICAgICAgLy8gdnVlIGtleSBtYXRjaGluZyBhbGdvcml0aG0gd29ya3Mgb25seSBpZlxuICAgICAgLy8gdGhlIGFycmF5IG9mIFZOb2RlcyBjaGFuZ2VzIG9uIG9ubHkgb25lIG9mIHRoZSBlbmRzXG4gICAgICAvLyBzbyB3ZSBmaXJzdCBjaGFuZ2Ugb25lIGVuZCBhbmQgdGhlbiB0aGUgb3RoZXJcblxuICAgICAgY29uc3QgdGVtcFRvID0gdG8gPj0gdmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UudmFsdWUuZnJvbSAmJiBmcm9tIDw9IHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLnZhbHVlLnRvXG4gICAgICAgID8gdmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UudmFsdWUudG9cbiAgICAgICAgOiB0b1xuXG4gICAgICB2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZS52YWx1ZSA9IHsgZnJvbSwgdG86IHRlbXBUbyB9XG4gICAgICB2aXJ0dWFsU2Nyb2xsUGFkZGluZ0JlZm9yZS52YWx1ZSA9IHN1bVNpemUodmlydHVhbFNjcm9sbFNpemVzQWdnLCB2aXJ0dWFsU2Nyb2xsU2l6ZXMsIDAsIGZyb20pXG4gICAgICB2aXJ0dWFsU2Nyb2xsUGFkZGluZ0FmdGVyLnZhbHVlID0gc3VtU2l6ZSh2aXJ0dWFsU2Nyb2xsU2l6ZXNBZ2csIHZpcnR1YWxTY3JvbGxTaXplcywgdG8sIHZpcnR1YWxTY3JvbGxMZW5ndGgudmFsdWUpXG5cbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgIGlmICh2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZS52YWx1ZS50byAhPT0gdG8gJiYgcHJldlNjcm9sbFN0YXJ0ID09PSBzY3JvbGxEZXRhaWxzLnNjcm9sbFN0YXJ0KSB7XG4gICAgICAgICAgdmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UudmFsdWUgPSB7IGZyb206IHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLnZhbHVlLmZyb20sIHRvIH1cbiAgICAgICAgICB2aXJ0dWFsU2Nyb2xsUGFkZGluZ0FmdGVyLnZhbHVlID0gc3VtU2l6ZSh2aXJ0dWFsU2Nyb2xsU2l6ZXNBZ2csIHZpcnR1YWxTY3JvbGxTaXplcywgdG8sIHZpcnR1YWxTY3JvbGxMZW5ndGgudmFsdWUpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIC8vIGlmIHRoZSBzY3JvbGwgd2FzIGNoYW5nZWQgZ2l2ZSB1cFxuICAgICAgLy8gKGFub3RoZXIgY2FsbCB0byBzZXRWaXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZSBiZWZvcmUgYW5pbWF0aW9uIGZyYW1lKVxuICAgICAgaWYgKHByZXZTY3JvbGxTdGFydCAhPT0gc2Nyb2xsRGV0YWlscy5zY3JvbGxTdGFydCkgcmV0dXJuXG5cbiAgICAgIGlmIChyYW5nZUNoYW5nZWQgPT09IHRydWUpIHtcbiAgICAgICAgdXBkYXRlVmlydHVhbFNjcm9sbFNpemVzKGZyb20pXG4gICAgICB9XG5cbiAgICAgIGNvbnN0XG4gICAgICAgIHNpemVBZnRlciA9IHZpcnR1YWxTY3JvbGxTaXplcy5zbGljZShmcm9tLCB0b0luZGV4KS5yZWR1Y2Uoc3VtRm4sIDApLFxuICAgICAgICBwb3NTdGFydCA9IHNpemVBZnRlciArIHNjcm9sbERldGFpbHMub2Zmc2V0U3RhcnQgKyB2aXJ0dWFsU2Nyb2xsUGFkZGluZ0JlZm9yZS52YWx1ZSxcbiAgICAgICAgcG9zRW5kID0gcG9zU3RhcnQgKyB2aXJ0dWFsU2Nyb2xsU2l6ZXNbIHRvSW5kZXggXVxuXG4gICAgICBsZXQgc2Nyb2xsUG9zaXRpb24gPSBwb3NTdGFydCArIG9mZnNldFxuXG4gICAgICBpZiAoYWxpZ25FbmQgIT09IHZvaWQgMCkge1xuICAgICAgICBjb25zdCBzaXplRGlmZiA9IHNpemVBZnRlciAtIHNpemVCZWZvcmVcbiAgICAgICAgY29uc3Qgc2Nyb2xsU3RhcnQgPSBzY3JvbGxEZXRhaWxzLnNjcm9sbFN0YXJ0ICsgc2l6ZURpZmZcblxuICAgICAgICBzY3JvbGxQb3NpdGlvbiA9IGFsaWduRm9yY2UgIT09IHRydWUgJiYgc2Nyb2xsU3RhcnQgPCBwb3NTdGFydCAmJiBwb3NFbmQgPCBzY3JvbGxTdGFydCArIHNjcm9sbERldGFpbHMuc2Nyb2xsVmlld1NpemVcbiAgICAgICAgICA/IHNjcm9sbFN0YXJ0XG4gICAgICAgICAgOiAoXG4gICAgICAgICAgICAgIGFsaWduRW5kID09PSAnZW5kJ1xuICAgICAgICAgICAgICAgID8gcG9zRW5kIC0gc2Nyb2xsRGV0YWlscy5zY3JvbGxWaWV3U2l6ZVxuICAgICAgICAgICAgICAgIDogcG9zU3RhcnQgLSAoYWxpZ25FbmQgPT09ICdzdGFydCcgPyAwIDogTWF0aC5yb3VuZCgoc2Nyb2xsRGV0YWlscy5zY3JvbGxWaWV3U2l6ZSAtIHZpcnR1YWxTY3JvbGxTaXplc1sgdG9JbmRleCBdKSAvIDIpKVxuICAgICAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICBwcmV2U2Nyb2xsU3RhcnQgPSBzY3JvbGxQb3NpdGlvblxuXG4gICAgICBzZXRTY3JvbGwoXG4gICAgICAgIHNjcm9sbEVsLFxuICAgICAgICBzY3JvbGxQb3NpdGlvbixcbiAgICAgICAgcHJvcHMudmlydHVhbFNjcm9sbEhvcml6b250YWwsXG4gICAgICAgICRxLmxhbmcucnRsXG4gICAgICApXG5cbiAgICAgIGVtaXRTY3JvbGwodG9JbmRleClcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlVmlydHVhbFNjcm9sbFNpemVzIChmcm9tKSB7XG4gICAgY29uc3QgY29udGVudEVsID0gY29udGVudFJlZi52YWx1ZVxuXG4gICAgaWYgKGNvbnRlbnRFbCkge1xuICAgICAgY29uc3RcbiAgICAgICAgY2hpbGRyZW4gPSBmaWx0ZXJQcm90by5jYWxsKFxuICAgICAgICAgIGNvbnRlbnRFbC5jaGlsZHJlbixcbiAgICAgICAgICBlbCA9PiBlbC5jbGFzc0xpc3QgJiYgZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdxLXZpcnR1YWwtc2Nyb2xsLS1za2lwJykgPT09IGZhbHNlXG4gICAgICAgICksXG4gICAgICAgIGNoaWxkcmVuTGVuZ3RoID0gY2hpbGRyZW4ubGVuZ3RoLFxuICAgICAgICBzaXplRm4gPSBwcm9wcy52aXJ0dWFsU2Nyb2xsSG9yaXpvbnRhbCA9PT0gdHJ1ZVxuICAgICAgICAgID8gZWwgPT4gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGhcbiAgICAgICAgICA6IGVsID0+IGVsLm9mZnNldEhlaWdodFxuXG4gICAgICBsZXRcbiAgICAgICAgaW5kZXggPSBmcm9tLFxuICAgICAgICBzaXplLCBkaWZmXG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRyZW5MZW5ndGg7KSB7XG4gICAgICAgIHNpemUgPSBzaXplRm4oY2hpbGRyZW5bIGkgXSlcbiAgICAgICAgaSsrXG5cbiAgICAgICAgd2hpbGUgKGkgPCBjaGlsZHJlbkxlbmd0aCAmJiBjaGlsZHJlblsgaSBdLmNsYXNzTGlzdC5jb250YWlucygncS12aXJ0dWFsLXNjcm9sbC0td2l0aC1wcmV2JykgPT09IHRydWUpIHtcbiAgICAgICAgICBzaXplICs9IHNpemVGbihjaGlsZHJlblsgaSBdKVxuICAgICAgICAgIGkrK1xuICAgICAgICB9XG5cbiAgICAgICAgZGlmZiA9IHNpemUgLSB2aXJ0dWFsU2Nyb2xsU2l6ZXNbIGluZGV4IF1cblxuICAgICAgICBpZiAoZGlmZiAhPT0gMCkge1xuICAgICAgICAgIHZpcnR1YWxTY3JvbGxTaXplc1sgaW5kZXggXSArPSBkaWZmXG4gICAgICAgICAgdmlydHVhbFNjcm9sbFNpemVzQWdnWyBNYXRoLmZsb29yKGluZGV4IC8gYWdnQnVja2V0U2l6ZSkgXSArPSBkaWZmXG4gICAgICAgIH1cblxuICAgICAgICBpbmRleCsrXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb25CbHVyUmVmb2N1c0ZuICgpIHtcbiAgICBjb250ZW50UmVmLnZhbHVlPy5mb2N1cygpXG4gIH1cblxuICBmdW5jdGlvbiBsb2NhbFJlc2V0VmlydHVhbFNjcm9sbCAodG9JbmRleCwgZnVsbFJlc2V0KSB7XG4gICAgY29uc3QgZGVmYXVsdFNpemUgPSAxICogdmlydHVhbFNjcm9sbEl0ZW1TaXplQ29tcHV0ZWQudmFsdWVcblxuICAgIGlmIChmdWxsUmVzZXQgPT09IHRydWUgfHwgQXJyYXkuaXNBcnJheSh2aXJ0dWFsU2Nyb2xsU2l6ZXMpID09PSBmYWxzZSkge1xuICAgICAgdmlydHVhbFNjcm9sbFNpemVzID0gW11cbiAgICB9XG5cbiAgICBjb25zdCBvbGRWaXJ0dWFsU2Nyb2xsU2l6ZXNMZW5ndGggPSB2aXJ0dWFsU2Nyb2xsU2l6ZXMubGVuZ3RoXG5cbiAgICB2aXJ0dWFsU2Nyb2xsU2l6ZXMubGVuZ3RoID0gdmlydHVhbFNjcm9sbExlbmd0aC52YWx1ZVxuXG4gICAgZm9yIChsZXQgaSA9IHZpcnR1YWxTY3JvbGxMZW5ndGgudmFsdWUgLSAxOyBpID49IG9sZFZpcnR1YWxTY3JvbGxTaXplc0xlbmd0aDsgaS0tKSB7XG4gICAgICB2aXJ0dWFsU2Nyb2xsU2l6ZXNbIGkgXSA9IGRlZmF1bHRTaXplXG4gICAgfVxuXG4gICAgY29uc3Qgak1heCA9IE1hdGguZmxvb3IoKHZpcnR1YWxTY3JvbGxMZW5ndGgudmFsdWUgLSAxKSAvIGFnZ0J1Y2tldFNpemUpXG4gICAgdmlydHVhbFNjcm9sbFNpemVzQWdnID0gW11cbiAgICBmb3IgKGxldCBqID0gMDsgaiA8PSBqTWF4OyBqKyspIHtcbiAgICAgIGxldCBzaXplID0gMFxuICAgICAgY29uc3QgaU1heCA9IE1hdGgubWluKChqICsgMSkgKiBhZ2dCdWNrZXRTaXplLCB2aXJ0dWFsU2Nyb2xsTGVuZ3RoLnZhbHVlKVxuICAgICAgZm9yIChsZXQgaSA9IGogKiBhZ2dCdWNrZXRTaXplOyBpIDwgaU1heDsgaSsrKSB7XG4gICAgICAgIHNpemUgKz0gdmlydHVhbFNjcm9sbFNpemVzWyBpIF1cbiAgICAgIH1cbiAgICAgIHZpcnR1YWxTY3JvbGxTaXplc0FnZy5wdXNoKHNpemUpXG4gICAgfVxuXG4gICAgcHJldlRvSW5kZXggPSAtMVxuICAgIHByZXZTY3JvbGxTdGFydCA9IHZvaWQgMFxuXG4gICAgdmlydHVhbFNjcm9sbFBhZGRpbmdCZWZvcmUudmFsdWUgPSBzdW1TaXplKHZpcnR1YWxTY3JvbGxTaXplc0FnZywgdmlydHVhbFNjcm9sbFNpemVzLCAwLCB2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZS52YWx1ZS5mcm9tKVxuICAgIHZpcnR1YWxTY3JvbGxQYWRkaW5nQWZ0ZXIudmFsdWUgPSBzdW1TaXplKHZpcnR1YWxTY3JvbGxTaXplc0FnZywgdmlydHVhbFNjcm9sbFNpemVzLCB2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZS52YWx1ZS50bywgdmlydHVhbFNjcm9sbExlbmd0aC52YWx1ZSlcblxuICAgIGlmICh0b0luZGV4ID49IDApIHtcbiAgICAgIHVwZGF0ZVZpcnR1YWxTY3JvbGxTaXplcyh2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZS52YWx1ZS5mcm9tKVxuICAgICAgbmV4dFRpY2soKCkgPT4geyBzY3JvbGxUbyh0b0luZGV4KSB9KVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIG9uVmlydHVhbFNjcm9sbEV2dCgpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0VmlydHVhbFNjcm9sbFNpemUgKHNjcm9sbFZpZXdTaXplKSB7XG4gICAgaWYgKHNjcm9sbFZpZXdTaXplID09PSB2b2lkIDAgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnN0IHNjcm9sbEVsID0gZ2V0VmlydHVhbFNjcm9sbFRhcmdldCgpXG5cbiAgICAgIGlmIChzY3JvbGxFbCAhPT0gdm9pZCAwICYmIHNjcm9sbEVsICE9PSBudWxsICYmIHNjcm9sbEVsLm5vZGVUeXBlICE9PSA4KSB7XG4gICAgICAgIHNjcm9sbFZpZXdTaXplID0gZ2V0U2Nyb2xsRGV0YWlscyhcbiAgICAgICAgICBzY3JvbGxFbCxcbiAgICAgICAgICBnZXRWaXJ0dWFsU2Nyb2xsRWwoKSxcbiAgICAgICAgICBiZWZvcmVSZWYudmFsdWUsXG4gICAgICAgICAgYWZ0ZXJSZWYudmFsdWUsXG4gICAgICAgICAgcHJvcHMudmlydHVhbFNjcm9sbEhvcml6b250YWwsXG4gICAgICAgICAgJHEubGFuZy5ydGwsXG4gICAgICAgICAgcHJvcHMudmlydHVhbFNjcm9sbFN0aWNreVNpemVTdGFydCxcbiAgICAgICAgICBwcm9wcy52aXJ0dWFsU2Nyb2xsU3RpY2t5U2l6ZUVuZFxuICAgICAgICApLnNjcm9sbFZpZXdTaXplXG4gICAgICB9XG4gICAgfVxuXG4gICAgbG9jYWxTY3JvbGxWaWV3U2l6ZSA9IHNjcm9sbFZpZXdTaXplXG5cbiAgICBjb25zdCB2aXJ0dWFsU2Nyb2xsU2xpY2VSYXRpb0JlZm9yZSA9IHBhcnNlRmxvYXQocHJvcHMudmlydHVhbFNjcm9sbFNsaWNlUmF0aW9CZWZvcmUpIHx8IDBcbiAgICBjb25zdCB2aXJ0dWFsU2Nyb2xsU2xpY2VSYXRpb0FmdGVyID0gcGFyc2VGbG9hdChwcm9wcy52aXJ0dWFsU2Nyb2xsU2xpY2VSYXRpb0FmdGVyKSB8fCAwXG4gICAgY29uc3QgbXVsdGlwbGllciA9IDEgKyB2aXJ0dWFsU2Nyb2xsU2xpY2VSYXRpb0JlZm9yZSArIHZpcnR1YWxTY3JvbGxTbGljZVJhdGlvQWZ0ZXJcbiAgICBjb25zdCB2aWV3ID0gc2Nyb2xsVmlld1NpemUgPT09IHZvaWQgMCB8fCBzY3JvbGxWaWV3U2l6ZSA8PSAwXG4gICAgICA/IDFcbiAgICAgIDogTWF0aC5jZWlsKHNjcm9sbFZpZXdTaXplIC8gdmlydHVhbFNjcm9sbEl0ZW1TaXplQ29tcHV0ZWQudmFsdWUpXG5cbiAgICBjb25zdCBiYXNlU2l6ZSA9IE1hdGgubWF4KFxuICAgICAgMSxcbiAgICAgIHZpZXcsXG4gICAgICBNYXRoLmNlaWwoKHByb3BzLnZpcnR1YWxTY3JvbGxTbGljZVNpemUgPiAwID8gcHJvcHMudmlydHVhbFNjcm9sbFNsaWNlU2l6ZSA6IDEwKSAvIG11bHRpcGxpZXIpXG4gICAgKVxuXG4gICAgdmlydHVhbFNjcm9sbFNsaWNlU2l6ZUNvbXB1dGVkLnZhbHVlID0ge1xuICAgICAgdG90YWw6IE1hdGguY2VpbChiYXNlU2l6ZSAqIG11bHRpcGxpZXIpLFxuICAgICAgc3RhcnQ6IE1hdGguY2VpbChiYXNlU2l6ZSAqIHZpcnR1YWxTY3JvbGxTbGljZVJhdGlvQmVmb3JlKSxcbiAgICAgIGNlbnRlcjogTWF0aC5jZWlsKGJhc2VTaXplICogKDAuNSArIHZpcnR1YWxTY3JvbGxTbGljZVJhdGlvQmVmb3JlKSksXG4gICAgICBlbmQ6IE1hdGguY2VpbChiYXNlU2l6ZSAqICgxICsgdmlydHVhbFNjcm9sbFNsaWNlUmF0aW9CZWZvcmUpKSxcbiAgICAgIHZpZXdcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwYWRWaXJ0dWFsU2Nyb2xsICh0YWcsIGNvbnRlbnQpIHtcbiAgICBjb25zdCBwYWRkaW5nU2l6ZSA9IHByb3BzLnZpcnR1YWxTY3JvbGxIb3Jpem9udGFsID09PSB0cnVlID8gJ3dpZHRoJyA6ICdoZWlnaHQnXG4gICAgY29uc3Qgc3R5bGUgPSB7XG4gICAgICBbICctLXEtdmlydHVhbC1zY3JvbGwtaXRlbS0nICsgcGFkZGluZ1NpemUgXTogdmlydHVhbFNjcm9sbEl0ZW1TaXplQ29tcHV0ZWQudmFsdWUgKyAncHgnXG4gICAgfVxuXG4gICAgcmV0dXJuIFtcbiAgICAgIHRhZyA9PT0gJ3Rib2R5J1xuICAgICAgICA/IGgodGFnLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLXZpcnR1YWwtc2Nyb2xsX19wYWRkaW5nJyxcbiAgICAgICAgICBrZXk6ICdiZWZvcmUnLFxuICAgICAgICAgIHJlZjogYmVmb3JlUmVmXG4gICAgICAgIH0sIFtcbiAgICAgICAgICBoKCd0cicsIFtcbiAgICAgICAgICAgIGgoJ3RkJywge1xuICAgICAgICAgICAgICBzdHlsZTogeyBbIHBhZGRpbmdTaXplIF06IGAkeyB2aXJ0dWFsU2Nyb2xsUGFkZGluZ0JlZm9yZS52YWx1ZSB9cHhgLCAuLi5zdHlsZSB9LFxuICAgICAgICAgICAgICBjb2xzcGFuOiBjb2xzcGFuQXR0ci52YWx1ZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdKVxuICAgICAgICBdKVxuICAgICAgICA6IGgodGFnLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLXZpcnR1YWwtc2Nyb2xsX19wYWRkaW5nJyxcbiAgICAgICAgICBrZXk6ICdiZWZvcmUnLFxuICAgICAgICAgIHJlZjogYmVmb3JlUmVmLFxuICAgICAgICAgIHN0eWxlOiB7IFsgcGFkZGluZ1NpemUgXTogYCR7IHZpcnR1YWxTY3JvbGxQYWRkaW5nQmVmb3JlLnZhbHVlIH1weGAsIC4uLnN0eWxlIH1cbiAgICAgICAgfSksXG5cbiAgICAgIGgodGFnLCB7XG4gICAgICAgIGNsYXNzOiAncS12aXJ0dWFsLXNjcm9sbF9fY29udGVudCcsXG4gICAgICAgIGtleTogJ2NvbnRlbnQnLFxuICAgICAgICByZWY6IGNvbnRlbnRSZWYsXG4gICAgICAgIHRhYmluZGV4OiAtMVxuICAgICAgfSwgY29udGVudC5mbGF0KCkpLFxuXG4gICAgICB0YWcgPT09ICd0Ym9keSdcbiAgICAgICAgPyBoKHRhZywge1xuICAgICAgICAgIGNsYXNzOiAncS12aXJ0dWFsLXNjcm9sbF9fcGFkZGluZycsXG4gICAgICAgICAga2V5OiAnYWZ0ZXInLFxuICAgICAgICAgIHJlZjogYWZ0ZXJSZWZcbiAgICAgICAgfSwgW1xuICAgICAgICAgIGgoJ3RyJywgW1xuICAgICAgICAgICAgaCgndGQnLCB7XG4gICAgICAgICAgICAgIHN0eWxlOiB7IFsgcGFkZGluZ1NpemUgXTogYCR7IHZpcnR1YWxTY3JvbGxQYWRkaW5nQWZ0ZXIudmFsdWUgfXB4YCwgLi4uc3R5bGUgfSxcbiAgICAgICAgICAgICAgY29sc3BhbjogY29sc3BhbkF0dHIudmFsdWVcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgXSlcbiAgICAgICAgXSlcbiAgICAgICAgOiBoKHRhZywge1xuICAgICAgICAgIGNsYXNzOiAncS12aXJ0dWFsLXNjcm9sbF9fcGFkZGluZycsXG4gICAgICAgICAga2V5OiAnYWZ0ZXInLFxuICAgICAgICAgIHJlZjogYWZ0ZXJSZWYsXG4gICAgICAgICAgc3R5bGU6IHsgWyBwYWRkaW5nU2l6ZSBdOiBgJHsgdmlydHVhbFNjcm9sbFBhZGRpbmdBZnRlci52YWx1ZSB9cHhgLCAuLi5zdHlsZSB9XG4gICAgICAgIH0pXG4gICAgXVxuICB9XG5cbiAgZnVuY3Rpb24gZW1pdFNjcm9sbCAoaW5kZXgpIHtcbiAgICBpZiAocHJldlRvSW5kZXggIT09IGluZGV4KSB7XG4gICAgICBwcm9wcy5vblZpcnR1YWxTY3JvbGwgIT09IHZvaWQgMCAmJiBlbWl0KCd2aXJ0dWFsU2Nyb2xsJywge1xuICAgICAgICBpbmRleCxcbiAgICAgICAgZnJvbTogdmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UudmFsdWUuZnJvbSxcbiAgICAgICAgdG86IHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLnZhbHVlLnRvIC0gMSxcbiAgICAgICAgZGlyZWN0aW9uOiBpbmRleCA8IHByZXZUb0luZGV4ID8gJ2RlY3JlYXNlJyA6ICdpbmNyZWFzZScsXG4gICAgICAgIHJlZjogcHJveHlcbiAgICAgIH0pXG5cbiAgICAgIHByZXZUb0luZGV4ID0gaW5kZXhcbiAgICB9XG4gIH1cblxuICBzZXRWaXJ0dWFsU2Nyb2xsU2l6ZSgpXG4gIGNvbnN0IG9uVmlydHVhbFNjcm9sbEV2dCA9IGRlYm91bmNlKFxuICAgIGxvY2FsT25WaXJ0dWFsU2Nyb2xsRXZ0LFxuICAgICRxLnBsYXRmb3JtLmlzLmlvcyA9PT0gdHJ1ZSA/IDEyMCA6IDM1XG4gIClcblxuICBvbkJlZm9yZU1vdW50KCgpID0+IHtcbiAgICBzZXRWaXJ0dWFsU2Nyb2xsU2l6ZSgpXG4gIH0pXG5cbiAgbGV0IHNob3VsZEFjdGl2YXRlID0gZmFsc2VcblxuICBvbkRlYWN0aXZhdGVkKCgpID0+IHtcbiAgICBzaG91bGRBY3RpdmF0ZSA9IHRydWVcbiAgfSlcblxuICBvbkFjdGl2YXRlZCgoKSA9PiB7XG4gICAgaWYgKHNob3VsZEFjdGl2YXRlICE9PSB0cnVlKSByZXR1cm5cblxuICAgIGNvbnN0IHNjcm9sbEVsID0gZ2V0VmlydHVhbFNjcm9sbFRhcmdldCgpXG5cbiAgICBpZiAocHJldlNjcm9sbFN0YXJ0ICE9PSB2b2lkIDAgJiYgc2Nyb2xsRWwgIT09IHZvaWQgMCAmJiBzY3JvbGxFbCAhPT0gbnVsbCAmJiBzY3JvbGxFbC5ub2RlVHlwZSAhPT0gOCkge1xuICAgICAgc2V0U2Nyb2xsKFxuICAgICAgICBzY3JvbGxFbCxcbiAgICAgICAgcHJldlNjcm9sbFN0YXJ0LFxuICAgICAgICBwcm9wcy52aXJ0dWFsU2Nyb2xsSG9yaXpvbnRhbCxcbiAgICAgICAgJHEubGFuZy5ydGxcbiAgICAgIClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBzY3JvbGxUbyhwcmV2VG9JbmRleClcbiAgICB9XG4gIH0pXG5cbiAgX19RVUFTQVJfU1NSX18gfHwgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICBvblZpcnR1YWxTY3JvbGxFdnQuY2FuY2VsKClcbiAgfSlcblxuICAvLyBleHBvc2UgcHVibGljIG1ldGhvZHNcbiAgT2JqZWN0LmFzc2lnbihwcm94eSwgeyBzY3JvbGxUbywgcmVzZXQsIHJlZnJlc2ggfSlcblxuICByZXR1cm4ge1xuICAgIHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLFxuICAgIHZpcnR1YWxTY3JvbGxTbGljZVNpemVDb21wdXRlZCxcblxuICAgIHNldFZpcnR1YWxTY3JvbGxTaXplLFxuICAgIG9uVmlydHVhbFNjcm9sbEV2dCxcbiAgICBsb2NhbFJlc2V0VmlydHVhbFNjcm9sbCxcbiAgICBwYWRWaXJ0dWFsU2Nyb2xsLFxuXG4gICAgc2Nyb2xsVG8sXG4gICAgcmVzZXQsXG4gICAgcmVmcmVzaFxuICB9XG59XG4iLCJpbXBvcnQgeyBoLCByZWYsIGNvbXB1dGVkLCB3YXRjaCwgb25CZWZvcmVVcGRhdGUsIG9uVXBkYXRlZCwgb25CZWZvcmVVbm1vdW50LCBuZXh0VGljaywgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgUUZpZWxkIGZyb20gJy4uL2ZpZWxkL1FGaWVsZC5qcydcbmltcG9ydCBRSWNvbiBmcm9tICcuLi9pY29uL1FJY29uLmpzJ1xuaW1wb3J0IFFDaGlwIGZyb20gJy4uL2NoaXAvUUNoaXAuanMnXG5cbmltcG9ydCBRSXRlbSBmcm9tICcuLi9pdGVtL1FJdGVtLmpzJ1xuaW1wb3J0IFFJdGVtU2VjdGlvbiBmcm9tICcuLi9pdGVtL1FJdGVtU2VjdGlvbi5qcydcbmltcG9ydCBRSXRlbUxhYmVsIGZyb20gJy4uL2l0ZW0vUUl0ZW1MYWJlbC5qcydcblxuaW1wb3J0IFFNZW51IGZyb20gJy4uL21lbnUvUU1lbnUuanMnXG5pbXBvcnQgUURpYWxvZyBmcm9tICcuLi9kaWFsb2cvUURpYWxvZy5qcydcblxuaW1wb3J0IHVzZUZpZWxkLCB7IHVzZUZpZWxkU3RhdGUsIHVzZUZpZWxkUHJvcHMsIHVzZUZpZWxkRW1pdHMsIGZpZWxkVmFsdWVJc0ZpbGxlZCB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLWZpZWxkL3VzZS1maWVsZC5qcydcbmltcG9ydCB7IHVzZVZpcnR1YWxTY3JvbGwsIHVzZVZpcnR1YWxTY3JvbGxQcm9wcyB9IGZyb20gJy4uL3ZpcnR1YWwtc2Nyb2xsL3VzZS12aXJ0dWFsLXNjcm9sbC5qcydcbmltcG9ydCB7IHVzZUZvcm1Qcm9wcywgdXNlRm9ybUlucHV0TmFtZUF0dHIgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy91c2UtZm9ybS9wcml2YXRlLnVzZS1mb3JtLmpzJ1xuaW1wb3J0IHVzZUtleUNvbXBvc2l0aW9uIGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLWtleS1jb21wb3NpdGlvbi91c2Uta2V5LWNvbXBvc2l0aW9uLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBpc0RlZXBFcXVhbCB9IGZyb20gJy4uLy4uL3V0aWxzL2lzL2lzLmpzJ1xuaW1wb3J0IHsgc3RvcCwgcHJldmVudCwgc3RvcEFuZFByZXZlbnQgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC9ldmVudC5qcydcbmltcG9ydCB7IG5vcm1hbGl6ZVRvSW50ZXJ2YWwgfSBmcm9tICcuLi8uLi91dGlscy9mb3JtYXQvZm9ybWF0LmpzJ1xuaW1wb3J0IHsgc2hvdWxkSWdub3JlS2V5LCBpc0tleUNvZGUgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmtleWJvYXJkL2tleS1jb21wb3NpdGlvbi5qcydcbmltcG9ydCB7IGhNZXJnZVNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnJlbmRlci9yZW5kZXIuanMnXG5cbmNvbnN0IHZhbGlkYXRlTmV3VmFsdWVNb2RlID0gdiA9PiBbICdhZGQnLCAnYWRkLXVuaXF1ZScsICd0b2dnbGUnIF0uaW5jbHVkZXModilcbmNvbnN0IHJlRXNjYXBlTGlzdCA9ICcuKis/XiR7fSgpfFtdXFxcXCdcbmNvbnN0IGZpZWxkUHJvcHNMaXN0ID0gT2JqZWN0LmtleXModXNlRmllbGRQcm9wcylcblxuZnVuY3Rpb24gZ2V0UHJvcFZhbHVlRm4gKHVzZXJQcm9wTmFtZSwgZGVmYXVsdFByb3BOYW1lKSB7XG4gIGlmICh0eXBlb2YgdXNlclByb3BOYW1lID09PSAnZnVuY3Rpb24nKSByZXR1cm4gdXNlclByb3BOYW1lXG5cbiAgY29uc3QgcHJvcE5hbWUgPSB1c2VyUHJvcE5hbWUgIT09IHZvaWQgMFxuICAgID8gdXNlclByb3BOYW1lXG4gICAgOiBkZWZhdWx0UHJvcE5hbWVcblxuICByZXR1cm4gb3B0ID0+ICgob3B0ICE9PSBudWxsICYmIHR5cGVvZiBvcHQgPT09ICdvYmplY3QnICYmIHByb3BOYW1lIGluIG9wdCkgPyBvcHRbIHByb3BOYW1lIF0gOiBvcHQpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRU2VsZWN0JyxcblxuICBpbmhlcml0QXR0cnM6IGZhbHNlLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlVmlydHVhbFNjcm9sbFByb3BzLFxuICAgIC4uLnVzZUZvcm1Qcm9wcyxcbiAgICAuLi51c2VGaWVsZFByb3BzLFxuXG4gICAgLy8gb3ZlcnJpZGUgb2YgdXNlRmllbGRQcm9wcyA+IG1vZGVsVmFsdWVcbiAgICBtb2RlbFZhbHVlOiB7XG4gICAgICByZXF1aXJlZDogdHJ1ZVxuICAgIH0sXG5cbiAgICBtdWx0aXBsZTogQm9vbGVhbixcblxuICAgIGRpc3BsYXlWYWx1ZTogWyBTdHJpbmcsIE51bWJlciBdLFxuICAgIGRpc3BsYXlWYWx1ZUh0bWw6IEJvb2xlYW4sXG4gICAgZHJvcGRvd25JY29uOiBTdHJpbmcsXG5cbiAgICBvcHRpb25zOiB7XG4gICAgICB0eXBlOiBBcnJheSxcbiAgICAgIGRlZmF1bHQ6ICgpID0+IFtdXG4gICAgfSxcblxuICAgIG9wdGlvblZhbHVlOiBbIEZ1bmN0aW9uLCBTdHJpbmcgXSxcbiAgICBvcHRpb25MYWJlbDogWyBGdW5jdGlvbiwgU3RyaW5nIF0sXG4gICAgb3B0aW9uRGlzYWJsZTogWyBGdW5jdGlvbiwgU3RyaW5nIF0sXG5cbiAgICBoaWRlU2VsZWN0ZWQ6IEJvb2xlYW4sXG4gICAgaGlkZURyb3Bkb3duSWNvbjogQm9vbGVhbixcbiAgICBmaWxsSW5wdXQ6IEJvb2xlYW4sXG5cbiAgICBtYXhWYWx1ZXM6IFsgTnVtYmVyLCBTdHJpbmcgXSxcblxuICAgIG9wdGlvbnNEZW5zZTogQm9vbGVhbixcbiAgICBvcHRpb25zRGFyazoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9LFxuICAgIG9wdGlvbnNTZWxlY3RlZENsYXNzOiBTdHJpbmcsXG4gICAgb3B0aW9uc0h0bWw6IEJvb2xlYW4sXG5cbiAgICBvcHRpb25zQ292ZXI6IEJvb2xlYW4sXG5cbiAgICBtZW51U2hyaW5rOiBCb29sZWFuLFxuICAgIG1lbnVBbmNob3I6IFN0cmluZyxcbiAgICBtZW51U2VsZjogU3RyaW5nLFxuICAgIG1lbnVPZmZzZXQ6IEFycmF5LFxuXG4gICAgcG9wdXBDb250ZW50Q2xhc3M6IFN0cmluZyxcbiAgICBwb3B1cENvbnRlbnRTdHlsZTogWyBTdHJpbmcsIEFycmF5LCBPYmplY3QgXSxcbiAgICBwb3B1cE5vUm91dGVEaXNtaXNzOiBCb29sZWFuLFxuXG4gICAgdXNlSW5wdXQ6IEJvb2xlYW4sXG4gICAgdXNlQ2hpcHM6IEJvb2xlYW4sXG5cbiAgICBuZXdWYWx1ZU1vZGU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbGlkYXRvcjogdmFsaWRhdGVOZXdWYWx1ZU1vZGVcbiAgICB9LFxuXG4gICAgbWFwT3B0aW9uczogQm9vbGVhbixcbiAgICBlbWl0VmFsdWU6IEJvb2xlYW4sXG5cbiAgICBkaXNhYmxlVGFiU2VsZWN0aW9uOiBCb29sZWFuLFxuXG4gICAgaW5wdXREZWJvdW5jZToge1xuICAgICAgdHlwZTogWyBOdW1iZXIsIFN0cmluZyBdLFxuICAgICAgZGVmYXVsdDogNTAwXG4gICAgfSxcblxuICAgIGlucHV0Q2xhc3M6IFsgQXJyYXksIFN0cmluZywgT2JqZWN0IF0sXG4gICAgaW5wdXRTdHlsZTogWyBBcnJheSwgU3RyaW5nLCBPYmplY3QgXSxcblxuICAgIHRhYmluZGV4OiB7XG4gICAgICB0eXBlOiBbIFN0cmluZywgTnVtYmVyIF0sXG4gICAgICBkZWZhdWx0OiAwXG4gICAgfSxcblxuICAgIGF1dG9jb21wbGV0ZTogU3RyaW5nLFxuXG4gICAgdHJhbnNpdGlvblNob3c6IHt9LFxuICAgIHRyYW5zaXRpb25IaWRlOiB7fSxcbiAgICB0cmFuc2l0aW9uRHVyYXRpb246IHt9LFxuXG4gICAgYmVoYXZpb3I6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbGlkYXRvcjogdiA9PiBbICdkZWZhdWx0JywgJ21lbnUnLCAnZGlhbG9nJyBdLmluY2x1ZGVzKHYpLFxuICAgICAgZGVmYXVsdDogJ2RlZmF1bHQnXG4gICAgfSxcblxuICAgIC8vIG92ZXJyaWRlIG9mIHVzZVZpcnR1YWxTY3JvbGxQcm9wcyA+IHZpcnR1YWxTY3JvbGxJdGVtU2l6ZSAobm8gZGVmYXVsdClcbiAgICB2aXJ0dWFsU2Nyb2xsSXRlbVNpemU6IHVzZVZpcnR1YWxTY3JvbGxQcm9wcy52aXJ0dWFsU2Nyb2xsSXRlbVNpemUudHlwZSxcblxuICAgIG9uTmV3VmFsdWU6IEZ1bmN0aW9uLFxuICAgIG9uRmlsdGVyOiBGdW5jdGlvblxuICB9LFxuXG4gIGVtaXRzOiBbXG4gICAgLi4udXNlRmllbGRFbWl0cyxcbiAgICAnYWRkJywgJ3JlbW92ZScsICdpbnB1dFZhbHVlJyxcbiAgICAna2V5dXAnLCAna2V5cHJlc3MnLCAna2V5ZG93bicsXG4gICAgJ3BvcHVwU2hvdycsICdwb3B1cEhpZGUnLFxuICAgICdmaWx0ZXJBYm9ydCdcbiAgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQgfSkge1xuICAgIGNvbnN0IHsgcHJveHkgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgY29uc3QgeyAkcSB9ID0gcHJveHlcblxuICAgIGNvbnN0IG1lbnUgPSByZWYoZmFsc2UpXG4gICAgY29uc3QgZGlhbG9nID0gcmVmKGZhbHNlKVxuICAgIGNvbnN0IG9wdGlvbkluZGV4ID0gcmVmKC0xKVxuICAgIGNvbnN0IGlucHV0VmFsdWUgPSByZWYoJycpXG4gICAgY29uc3QgZGlhbG9nRmllbGRGb2N1c2VkID0gcmVmKGZhbHNlKVxuICAgIGNvbnN0IGlubmVyTG9hZGluZ0luZGljYXRvciA9IHJlZihmYWxzZSlcblxuICAgIGxldCBmaWx0ZXJUaW1lciA9IG51bGwsIGlucHV0VmFsdWVUaW1lciA9IG51bGwsXG4gICAgICBpbm5lclZhbHVlQ2FjaGUsXG4gICAgICBoYXNEaWFsb2csIHVzZXJJbnB1dFZhbHVlLCBmaWx0ZXJJZCA9IG51bGwsIGRlZmF1bHRJbnB1dFZhbHVlLFxuICAgICAgdHJhbnNpdGlvblNob3dDb21wdXRlZCwgc2VhcmNoQnVmZmVyLCBzZWFyY2hCdWZmZXJFeHBcblxuICAgIGNvbnN0IGlucHV0UmVmID0gcmVmKG51bGwpXG4gICAgY29uc3QgdGFyZ2V0UmVmID0gcmVmKG51bGwpXG4gICAgY29uc3QgbWVudVJlZiA9IHJlZihudWxsKVxuICAgIGNvbnN0IGRpYWxvZ1JlZiA9IHJlZihudWxsKVxuICAgIGNvbnN0IG1lbnVDb250ZW50UmVmID0gcmVmKG51bGwpXG5cbiAgICBjb25zdCBuYW1lUHJvcCA9IHVzZUZvcm1JbnB1dE5hbWVBdHRyKHByb3BzKVxuXG4gICAgY29uc3Qgb25Db21wb3NpdGlvbiA9IHVzZUtleUNvbXBvc2l0aW9uKG9uSW5wdXQpXG5cbiAgICBjb25zdCB2aXJ0dWFsU2Nyb2xsTGVuZ3RoID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgQXJyYXkuaXNBcnJheShwcm9wcy5vcHRpb25zKVxuICAgICAgICA/IHByb3BzLm9wdGlvbnMubGVuZ3RoXG4gICAgICAgIDogMFxuICAgICkpXG5cbiAgICBjb25zdCB2aXJ0dWFsU2Nyb2xsSXRlbVNpemVDb21wdXRlZCA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLnZpcnR1YWxTY3JvbGxJdGVtU2l6ZSA9PT0gdm9pZCAwXG4gICAgICAgID8gKHByb3BzLm9wdGlvbnNEZW5zZSA9PT0gdHJ1ZSA/IDI0IDogNDgpXG4gICAgICAgIDogcHJvcHMudmlydHVhbFNjcm9sbEl0ZW1TaXplXG4gICAgKSlcblxuICAgIGNvbnN0IHtcbiAgICAgIHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLFxuICAgICAgdmlydHVhbFNjcm9sbFNsaWNlU2l6ZUNvbXB1dGVkLFxuICAgICAgbG9jYWxSZXNldFZpcnR1YWxTY3JvbGwsXG4gICAgICBwYWRWaXJ0dWFsU2Nyb2xsLFxuICAgICAgb25WaXJ0dWFsU2Nyb2xsRXZ0LFxuICAgICAgc2Nyb2xsVG8sXG4gICAgICBzZXRWaXJ0dWFsU2Nyb2xsU2l6ZVxuICAgIH0gPSB1c2VWaXJ0dWFsU2Nyb2xsKHtcbiAgICAgIHZpcnR1YWxTY3JvbGxMZW5ndGgsIGdldFZpcnR1YWxTY3JvbGxUYXJnZXQsIGdldFZpcnR1YWxTY3JvbGxFbCxcbiAgICAgIHZpcnR1YWxTY3JvbGxJdGVtU2l6ZUNvbXB1dGVkXG4gICAgfSlcblxuICAgIGNvbnN0IHN0YXRlID0gdXNlRmllbGRTdGF0ZSgpXG5cbiAgICBjb25zdCBpbm5lclZhbHVlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3RcbiAgICAgICAgbWFwTnVsbCA9IHByb3BzLm1hcE9wdGlvbnMgPT09IHRydWUgJiYgcHJvcHMubXVsdGlwbGUgIT09IHRydWUsXG4gICAgICAgIHZhbCA9IHByb3BzLm1vZGVsVmFsdWUgIT09IHZvaWQgMCAmJiAocHJvcHMubW9kZWxWYWx1ZSAhPT0gbnVsbCB8fCBtYXBOdWxsID09PSB0cnVlKVxuICAgICAgICAgID8gKHByb3BzLm11bHRpcGxlID09PSB0cnVlICYmIEFycmF5LmlzQXJyYXkocHJvcHMubW9kZWxWYWx1ZSkgPyBwcm9wcy5tb2RlbFZhbHVlIDogWyBwcm9wcy5tb2RlbFZhbHVlIF0pXG4gICAgICAgICAgOiBbXVxuXG4gICAgICBpZiAocHJvcHMubWFwT3B0aW9ucyA9PT0gdHJ1ZSAmJiBBcnJheS5pc0FycmF5KHByb3BzLm9wdGlvbnMpID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IGNhY2hlID0gcHJvcHMubWFwT3B0aW9ucyA9PT0gdHJ1ZSAmJiBpbm5lclZhbHVlQ2FjaGUgIT09IHZvaWQgMFxuICAgICAgICAgID8gaW5uZXJWYWx1ZUNhY2hlXG4gICAgICAgICAgOiBbXVxuICAgICAgICBjb25zdCB2YWx1ZXMgPSB2YWwubWFwKHYgPT4gZ2V0T3B0aW9uKHYsIGNhY2hlKSlcblxuICAgICAgICByZXR1cm4gcHJvcHMubW9kZWxWYWx1ZSA9PT0gbnVsbCAmJiBtYXBOdWxsID09PSB0cnVlXG4gICAgICAgICAgPyB2YWx1ZXMuZmlsdGVyKHYgPT4gdiAhPT0gbnVsbClcbiAgICAgICAgICA6IHZhbHVlc1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdmFsXG4gICAgfSlcblxuICAgIGNvbnN0IGlubmVyRmllbGRQcm9wcyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGFjYyA9IHt9XG4gICAgICBmaWVsZFByb3BzTGlzdC5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGNvbnN0IHZhbCA9IHByb3BzWyBrZXkgXVxuICAgICAgICBpZiAodmFsICE9PSB2b2lkIDApIHtcbiAgICAgICAgICBhY2NbIGtleSBdID0gdmFsXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICByZXR1cm4gYWNjXG4gICAgfSlcblxuICAgIGNvbnN0IGlzT3B0aW9uc0RhcmsgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5vcHRpb25zRGFyayA9PT0gbnVsbFxuICAgICAgICA/IHN0YXRlLmlzRGFyay52YWx1ZVxuICAgICAgICA6IHByb3BzLm9wdGlvbnNEYXJrXG4gICAgKSlcblxuICAgIGNvbnN0IGhhc1ZhbHVlID0gY29tcHV0ZWQoKCkgPT4gZmllbGRWYWx1ZUlzRmlsbGVkKGlubmVyVmFsdWUudmFsdWUpKVxuXG4gICAgY29uc3QgY29tcHV0ZWRJbnB1dENsYXNzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgbGV0IGNscyA9ICdxLWZpZWxkX19pbnB1dCBxLXBsYWNlaG9sZGVyIGNvbCdcblxuICAgICAgaWYgKHByb3BzLmhpZGVTZWxlY3RlZCA9PT0gdHJ1ZSB8fCBpbm5lclZhbHVlLnZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gWyBjbHMsIHByb3BzLmlucHV0Q2xhc3MgXVxuICAgICAgfVxuXG4gICAgICBjbHMgKz0gJyBxLWZpZWxkX19pbnB1dC0tcGFkZGluZydcblxuICAgICAgcmV0dXJuIHByb3BzLmlucHV0Q2xhc3MgPT09IHZvaWQgMFxuICAgICAgICA/IGNsc1xuICAgICAgICA6IFsgY2xzLCBwcm9wcy5pbnB1dENsYXNzIF1cbiAgICB9KVxuXG4gICAgY29uc3QgbWVudUNvbnRlbnRDbGFzcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAocHJvcHMudmlydHVhbFNjcm9sbEhvcml6b250YWwgPT09IHRydWUgPyAncS12aXJ0dWFsLXNjcm9sbC0taG9yaXpvbnRhbCcgOiAnJylcbiAgICAgICsgKHByb3BzLnBvcHVwQ29udGVudENsYXNzID8gJyAnICsgcHJvcHMucG9wdXBDb250ZW50Q2xhc3MgOiAnJylcbiAgICApXG5cbiAgICBjb25zdCBub09wdGlvbnMgPSBjb21wdXRlZCgoKSA9PiB2aXJ0dWFsU2Nyb2xsTGVuZ3RoLnZhbHVlID09PSAwKVxuXG4gICAgY29uc3Qgc2VsZWN0ZWRTdHJpbmcgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgaW5uZXJWYWx1ZS52YWx1ZVxuICAgICAgICAubWFwKG9wdCA9PiBnZXRPcHRpb25MYWJlbC52YWx1ZShvcHQpKVxuICAgICAgICAuam9pbignLCAnKVxuICAgIClcblxuICAgIGNvbnN0IGFyaWFDdXJyZW50VmFsdWUgPSBjb21wdXRlZCgoKSA9PiAocHJvcHMuZGlzcGxheVZhbHVlICE9PSB2b2lkIDBcbiAgICAgID8gcHJvcHMuZGlzcGxheVZhbHVlXG4gICAgICA6IHNlbGVjdGVkU3RyaW5nLnZhbHVlXG4gICAgKSlcblxuICAgIGNvbnN0IG5lZWRzSHRtbEZuID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMub3B0aW9uc0h0bWwgPT09IHRydWVcbiAgICAgICAgPyAoKSA9PiB0cnVlXG4gICAgICAgIDogb3B0ID0+IG9wdD8uaHRtbCA9PT0gdHJ1ZVxuICAgICkpXG5cbiAgICBjb25zdCB2YWx1ZUFzSHRtbCA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLmRpc3BsYXlWYWx1ZUh0bWwgPT09IHRydWUgfHwgKFxuICAgICAgICBwcm9wcy5kaXNwbGF5VmFsdWUgPT09IHZvaWQgMCAmJiAoXG4gICAgICAgICAgcHJvcHMub3B0aW9uc0h0bWwgPT09IHRydWVcbiAgICAgICAgICB8fCBpbm5lclZhbHVlLnZhbHVlLnNvbWUobmVlZHNIdG1sRm4udmFsdWUpXG4gICAgICAgIClcbiAgICAgIClcbiAgICApKVxuXG4gICAgY29uc3QgdGFiaW5kZXggPSBjb21wdXRlZCgoKSA9PiAoc3RhdGUuZm9jdXNlZC52YWx1ZSA9PT0gdHJ1ZSA/IHByb3BzLnRhYmluZGV4IDogLTEpKVxuXG4gICAgY29uc3QgY29tYm9ib3hBdHRycyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGF0dHJzID0ge1xuICAgICAgICB0YWJpbmRleDogcHJvcHMudGFiaW5kZXgsXG4gICAgICAgIHJvbGU6ICdjb21ib2JveCcsXG4gICAgICAgICdhcmlhLWxhYmVsJzogcHJvcHMubGFiZWwsXG4gICAgICAgICdhcmlhLXJlYWRvbmx5JzogcHJvcHMucmVhZG9ubHkgPT09IHRydWUgPyAndHJ1ZScgOiAnZmFsc2UnLFxuICAgICAgICAnYXJpYS1hdXRvY29tcGxldGUnOiBwcm9wcy51c2VJbnB1dCA9PT0gdHJ1ZSA/ICdsaXN0JyA6ICdub25lJyxcbiAgICAgICAgJ2FyaWEtZXhwYW5kZWQnOiBtZW51LnZhbHVlID09PSB0cnVlID8gJ3RydWUnIDogJ2ZhbHNlJyxcbiAgICAgICAgJ2FyaWEtY29udHJvbHMnOiBgJHsgc3RhdGUudGFyZ2V0VWlkLnZhbHVlIH1fbGJgXG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRpb25JbmRleC52YWx1ZSA+PSAwKSB7XG4gICAgICAgIGF0dHJzWyAnYXJpYS1hY3RpdmVkZXNjZW5kYW50JyBdID0gYCR7IHN0YXRlLnRhcmdldFVpZC52YWx1ZSB9XyR7IG9wdGlvbkluZGV4LnZhbHVlIH1gXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhdHRyc1xuICAgIH0pXG5cbiAgICBjb25zdCBsaXN0Ym94QXR0cnMgPSBjb21wdXRlZCgoKSA9PiAoe1xuICAgICAgaWQ6IGAkeyBzdGF0ZS50YXJnZXRVaWQudmFsdWUgfV9sYmAsXG4gICAgICByb2xlOiAnbGlzdGJveCcsXG4gICAgICAnYXJpYS1tdWx0aXNlbGVjdGFibGUnOiBwcm9wcy5tdWx0aXBsZSA9PT0gdHJ1ZSA/ICd0cnVlJyA6ICdmYWxzZSdcbiAgICB9KSlcblxuICAgIGNvbnN0IHNlbGVjdGVkU2NvcGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICByZXR1cm4gaW5uZXJWYWx1ZS52YWx1ZS5tYXAoKG9wdCwgaSkgPT4gKHtcbiAgICAgICAgaW5kZXg6IGksXG4gICAgICAgIG9wdCxcbiAgICAgICAgaHRtbDogbmVlZHNIdG1sRm4udmFsdWUob3B0KSxcbiAgICAgICAgc2VsZWN0ZWQ6IHRydWUsXG4gICAgICAgIHJlbW92ZUF0SW5kZXg6IHJlbW92ZUF0SW5kZXhBbmRGb2N1cyxcbiAgICAgICAgdG9nZ2xlT3B0aW9uLFxuICAgICAgICB0YWJpbmRleDogdGFiaW5kZXgudmFsdWVcbiAgICAgIH0pKVxuICAgIH0pXG5cbiAgICBjb25zdCBvcHRpb25TY29wZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGlmICh2aXJ0dWFsU2Nyb2xsTGVuZ3RoLnZhbHVlID09PSAwKSB7XG4gICAgICAgIHJldHVybiBbXVxuICAgICAgfVxuXG4gICAgICBjb25zdCB7IGZyb20sIHRvIH0gPSB2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZS52YWx1ZVxuXG4gICAgICByZXR1cm4gcHJvcHMub3B0aW9ucy5zbGljZShmcm9tLCB0bykubWFwKChvcHQsIGkpID0+IHtcbiAgICAgICAgY29uc3QgZGlzYWJsZSA9IGlzT3B0aW9uRGlzYWJsZWQudmFsdWUob3B0KSA9PT0gdHJ1ZVxuICAgICAgICBjb25zdCBhY3RpdmUgPSBpc09wdGlvblNlbGVjdGVkKG9wdCkgPT09IHRydWVcbiAgICAgICAgY29uc3QgaW5kZXggPSBmcm9tICsgaVxuXG4gICAgICAgIGNvbnN0IGl0ZW1Qcm9wcyA9IHtcbiAgICAgICAgICBjbGlja2FibGU6IHRydWUsXG4gICAgICAgICAgYWN0aXZlLFxuICAgICAgICAgIGFjdGl2ZUNsYXNzOiBjb21wdXRlZE9wdGlvbnNTZWxlY3RlZENsYXNzLnZhbHVlLFxuICAgICAgICAgIG1hbnVhbEZvY3VzOiB0cnVlLFxuICAgICAgICAgIGZvY3VzZWQ6IGZhbHNlLFxuICAgICAgICAgIGRpc2FibGUsXG4gICAgICAgICAgdGFiaW5kZXg6IC0xLFxuICAgICAgICAgIGRlbnNlOiBwcm9wcy5vcHRpb25zRGVuc2UsXG4gICAgICAgICAgZGFyazogaXNPcHRpb25zRGFyay52YWx1ZSxcbiAgICAgICAgICByb2xlOiAnb3B0aW9uJyxcbiAgICAgICAgICAnYXJpYS1zZWxlY3RlZCc6IGFjdGl2ZSA9PT0gdHJ1ZSA/ICd0cnVlJyA6ICdmYWxzZScsXG4gICAgICAgICAgaWQ6IGAkeyBzdGF0ZS50YXJnZXRVaWQudmFsdWUgfV8keyBpbmRleCB9YCxcbiAgICAgICAgICBvbkNsaWNrOiAoKSA9PiB7IHRvZ2dsZU9wdGlvbihvcHQpIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkaXNhYmxlICE9PSB0cnVlKSB7XG4gICAgICAgICAgb3B0aW9uSW5kZXgudmFsdWUgPT09IGluZGV4ICYmIChpdGVtUHJvcHMuZm9jdXNlZCA9IHRydWUpXG5cbiAgICAgICAgICBpZiAoJHEucGxhdGZvcm0uaXMuZGVza3RvcCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgaXRlbVByb3BzLm9uTW91c2Vtb3ZlID0gKCkgPT4geyBtZW51LnZhbHVlID09PSB0cnVlICYmIHNldE9wdGlvbkluZGV4KGluZGV4KSB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBpbmRleCxcbiAgICAgICAgICBvcHQsXG4gICAgICAgICAgaHRtbDogbmVlZHNIdG1sRm4udmFsdWUob3B0KSxcbiAgICAgICAgICBsYWJlbDogZ2V0T3B0aW9uTGFiZWwudmFsdWUob3B0KSxcbiAgICAgICAgICBzZWxlY3RlZDogaXRlbVByb3BzLmFjdGl2ZSxcbiAgICAgICAgICBmb2N1c2VkOiBpdGVtUHJvcHMuZm9jdXNlZCxcbiAgICAgICAgICB0b2dnbGVPcHRpb24sXG4gICAgICAgICAgc2V0T3B0aW9uSW5kZXgsXG4gICAgICAgICAgaXRlbVByb3BzXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcblxuICAgIGNvbnN0IGRyb3Bkb3duQXJyb3dJY29uID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMuZHJvcGRvd25JY29uICE9PSB2b2lkIDBcbiAgICAgICAgPyBwcm9wcy5kcm9wZG93bkljb25cbiAgICAgICAgOiAkcS5pY29uU2V0LmFycm93LmRyb3Bkb3duXG4gICAgKSlcblxuICAgIGNvbnN0IHNxdWFyZWRNZW51ID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHByb3BzLm9wdGlvbnNDb3ZlciA9PT0gZmFsc2VcbiAgICAgICYmIHByb3BzLm91dGxpbmVkICE9PSB0cnVlXG4gICAgICAmJiBwcm9wcy5zdGFuZG91dCAhPT0gdHJ1ZVxuICAgICAgJiYgcHJvcHMuYm9yZGVybGVzcyAhPT0gdHJ1ZVxuICAgICAgJiYgcHJvcHMucm91bmRlZCAhPT0gdHJ1ZVxuICAgIClcblxuICAgIGNvbnN0IGNvbXB1dGVkT3B0aW9uc1NlbGVjdGVkQ2xhc3MgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5vcHRpb25zU2VsZWN0ZWRDbGFzcyAhPT0gdm9pZCAwXG4gICAgICAgID8gcHJvcHMub3B0aW9uc1NlbGVjdGVkQ2xhc3NcbiAgICAgICAgOiAocHJvcHMuY29sb3IgIT09IHZvaWQgMCA/IGB0ZXh0LSR7IHByb3BzLmNvbG9yIH1gIDogJycpXG4gICAgKSlcblxuICAgIC8vIHJldHVybnMgbWV0aG9kIHRvIGdldCB2YWx1ZSBvZiBhbiBvcHRpb247XG4gICAgLy8gdGFrZXMgaW50byBhY2NvdW50ICdvcHRpb24tdmFsdWUnIHByb3BcbiAgICBjb25zdCBnZXRPcHRpb25WYWx1ZSA9IGNvbXB1dGVkKCgpID0+IGdldFByb3BWYWx1ZUZuKHByb3BzLm9wdGlvblZhbHVlLCAndmFsdWUnKSlcblxuICAgIC8vIHJldHVybnMgbWV0aG9kIHRvIGdldCBsYWJlbCBvZiBhbiBvcHRpb247XG4gICAgLy8gdGFrZXMgaW50byBhY2NvdW50ICdvcHRpb24tbGFiZWwnIHByb3BcbiAgICBjb25zdCBnZXRPcHRpb25MYWJlbCA9IGNvbXB1dGVkKCgpID0+IGdldFByb3BWYWx1ZUZuKHByb3BzLm9wdGlvbkxhYmVsLCAnbGFiZWwnKSlcblxuICAgIC8vIHJldHVybnMgbWV0aG9kIHRvIHRlbGwgaWYgYW4gb3B0aW9uIGlzIGRpc2FibGVkO1xuICAgIC8vIHRha2VzIGludG8gYWNjb3VudCAnb3B0aW9uLWRpc2FibGUnIHByb3BcbiAgICBjb25zdCBpc09wdGlvbkRpc2FibGVkID0gY29tcHV0ZWQoKCkgPT4gZ2V0UHJvcFZhbHVlRm4ocHJvcHMub3B0aW9uRGlzYWJsZSwgJ2Rpc2FibGUnKSlcblxuICAgIGNvbnN0IGlubmVyT3B0aW9uc1ZhbHVlID0gY29tcHV0ZWQoKCkgPT4gaW5uZXJWYWx1ZS52YWx1ZS5tYXAoZ2V0T3B0aW9uVmFsdWUudmFsdWUpKVxuXG4gICAgY29uc3QgaW5wdXRDb250cm9sRXZlbnRzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgZXZ0ID0ge1xuICAgICAgICBvbklucHV0LFxuICAgICAgICAvLyBTYWZhcmkgPCAxMC4yICYgVUlXZWJWaWV3IGRvZXNuJ3QgZmlyZSBjb21wb3NpdGlvbmVuZCB3aGVuXG4gICAgICAgIC8vIHN3aXRjaGluZyBmb2N1cyBiZWZvcmUgY29uZmlybWluZyBjb21wb3NpdGlvbiBjaG9pY2VcbiAgICAgICAgLy8gdGhpcyBhbHNvIGZpeGVzIHRoZSBpc3N1ZSB3aGVyZSBzb21lIGJyb3dzZXJzIGUuZy4gaU9TIENocm9tZVxuICAgICAgICAvLyBmaXJlcyBcImNoYW5nZVwiIGluc3RlYWQgb2YgXCJpbnB1dFwiIG9uIGF1dG9jb21wbGV0ZS5cbiAgICAgICAgb25DaGFuZ2U6IG9uQ29tcG9zaXRpb24sXG4gICAgICAgIG9uS2V5ZG93bjogb25UYXJnZXRLZXlkb3duLFxuICAgICAgICBvbktleXVwOiBvblRhcmdldEF1dG9jb21wbGV0ZSxcbiAgICAgICAgb25LZXlwcmVzczogb25UYXJnZXRLZXlwcmVzcyxcbiAgICAgICAgb25Gb2N1czogc2VsZWN0SW5wdXRUZXh0LFxuICAgICAgICBvbkNsaWNrIChlKSB7IGhhc0RpYWxvZyA9PT0gdHJ1ZSAmJiBzdG9wKGUpIH1cbiAgICAgIH1cblxuICAgICAgZXZ0Lm9uQ29tcG9zaXRpb25zdGFydCA9IGV2dC5vbkNvbXBvc2l0aW9udXBkYXRlID0gZXZ0Lm9uQ29tcG9zaXRpb25lbmQgPSBvbkNvbXBvc2l0aW9uXG5cbiAgICAgIHJldHVybiBldnRcbiAgICB9KVxuXG4gICAgd2F0Y2goaW5uZXJWYWx1ZSwgdmFsID0+IHtcbiAgICAgIGlubmVyVmFsdWVDYWNoZSA9IHZhbFxuXG4gICAgICBpZiAoXG4gICAgICAgIHByb3BzLnVzZUlucHV0ID09PSB0cnVlXG4gICAgICAgICYmIHByb3BzLmZpbGxJbnB1dCA9PT0gdHJ1ZVxuICAgICAgICAmJiBwcm9wcy5tdWx0aXBsZSAhPT0gdHJ1ZVxuICAgICAgICAvLyBQcmV2ZW50IHJlLWVudGVyaW5nIGluIGZpbHRlciB3aGlsZSBmaWx0ZXJpbmdcbiAgICAgICAgLy8gQWxzbyBwcmV2ZW50IGNsZWFyaW5nIGlucHV0VmFsdWUgd2hpbGUgZmlsdGVyaW5nXG4gICAgICAgICYmIHN0YXRlLmlubmVyTG9hZGluZy52YWx1ZSAhPT0gdHJ1ZVxuICAgICAgICAmJiAoKGRpYWxvZy52YWx1ZSAhPT0gdHJ1ZSAmJiBtZW51LnZhbHVlICE9PSB0cnVlKSB8fCBoYXNWYWx1ZS52YWx1ZSAhPT0gdHJ1ZSlcbiAgICAgICkge1xuICAgICAgICB1c2VySW5wdXRWYWx1ZSAhPT0gdHJ1ZSAmJiByZXNldElucHV0VmFsdWUoKVxuICAgICAgICBpZiAoZGlhbG9nLnZhbHVlID09PSB0cnVlIHx8IG1lbnUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICBmaWx0ZXIoJycpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCB7IGltbWVkaWF0ZTogdHJ1ZSB9KVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMuZmlsbElucHV0LCByZXNldElucHV0VmFsdWUpXG5cbiAgICB3YXRjaChtZW51LCB1cGRhdGVNZW51KVxuXG4gICAgd2F0Y2godmlydHVhbFNjcm9sbExlbmd0aCwgcmVyZW5kZXJNZW51KVxuXG4gICAgZnVuY3Rpb24gZ2V0RW1pdHRpbmdPcHRpb25WYWx1ZSAob3B0KSB7XG4gICAgICByZXR1cm4gcHJvcHMuZW1pdFZhbHVlID09PSB0cnVlXG4gICAgICAgID8gZ2V0T3B0aW9uVmFsdWUudmFsdWUob3B0KVxuICAgICAgICA6IG9wdFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZUF0SW5kZXggKGluZGV4KSB7XG4gICAgICBpZiAoaW5kZXggIT09IC0xICYmIGluZGV4IDwgaW5uZXJWYWx1ZS52YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgaWYgKHByb3BzLm11bHRpcGxlID09PSB0cnVlKSB7XG4gICAgICAgICAgY29uc3QgbW9kZWwgPSBwcm9wcy5tb2RlbFZhbHVlLnNsaWNlKClcbiAgICAgICAgICBlbWl0KCdyZW1vdmUnLCB7IGluZGV4LCB2YWx1ZTogbW9kZWwuc3BsaWNlKGluZGV4LCAxKVsgMCBdIH0pXG4gICAgICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCBtb2RlbClcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIG51bGwpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVBdEluZGV4QW5kRm9jdXMgKGluZGV4KSB7XG4gICAgICByZW1vdmVBdEluZGV4KGluZGV4KVxuICAgICAgc3RhdGUuZm9jdXMoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZCAob3B0LCB1bmlxdWUpIHtcbiAgICAgIGNvbnN0IHZhbCA9IGdldEVtaXR0aW5nT3B0aW9uVmFsdWUob3B0KVxuXG4gICAgICBpZiAocHJvcHMubXVsdGlwbGUgIT09IHRydWUpIHtcbiAgICAgICAgcHJvcHMuZmlsbElucHV0ID09PSB0cnVlICYmIHVwZGF0ZUlucHV0VmFsdWUoXG4gICAgICAgICAgZ2V0T3B0aW9uTGFiZWwudmFsdWUob3B0KSxcbiAgICAgICAgICB0cnVlLFxuICAgICAgICAgIHRydWVcbiAgICAgICAgKVxuXG4gICAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgdmFsKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKGlubmVyVmFsdWUudmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGVtaXQoJ2FkZCcsIHsgaW5kZXg6IDAsIHZhbHVlOiB2YWwgfSlcbiAgICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCBwcm9wcy5tdWx0aXBsZSA9PT0gdHJ1ZSA/IFsgdmFsIF0gOiB2YWwpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIHVuaXF1ZSA9PT0gdHJ1ZVxuICAgICAgICAmJiBpc09wdGlvblNlbGVjdGVkKG9wdCkgPT09IHRydWVcbiAgICAgICkgcmV0dXJuXG5cbiAgICAgIGlmIChcbiAgICAgICAgcHJvcHMubWF4VmFsdWVzICE9PSB2b2lkIDBcbiAgICAgICAgJiYgcHJvcHMubW9kZWxWYWx1ZS5sZW5ndGggPj0gcHJvcHMubWF4VmFsdWVzXG4gICAgICApIHJldHVyblxuXG4gICAgICBjb25zdCBtb2RlbCA9IHByb3BzLm1vZGVsVmFsdWUuc2xpY2UoKVxuXG4gICAgICBlbWl0KCdhZGQnLCB7IGluZGV4OiBtb2RlbC5sZW5ndGgsIHZhbHVlOiB2YWwgfSlcbiAgICAgIG1vZGVsLnB1c2godmFsKVxuICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCBtb2RlbClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b2dnbGVPcHRpb24gKG9wdCwga2VlcE9wZW4pIHtcbiAgICAgIGlmIChcbiAgICAgICAgc3RhdGUuZWRpdGFibGUudmFsdWUgIT09IHRydWVcbiAgICAgICAgfHwgb3B0ID09PSB2b2lkIDBcbiAgICAgICAgfHwgaXNPcHRpb25EaXNhYmxlZC52YWx1ZShvcHQpID09PSB0cnVlXG4gICAgICApIHJldHVyblxuXG4gICAgICBjb25zdCBvcHRWYWx1ZSA9IGdldE9wdGlvblZhbHVlLnZhbHVlKG9wdClcblxuICAgICAgaWYgKHByb3BzLm11bHRpcGxlICE9PSB0cnVlKSB7XG4gICAgICAgIGlmIChrZWVwT3BlbiAhPT0gdHJ1ZSkge1xuICAgICAgICAgIHVwZGF0ZUlucHV0VmFsdWUoXG4gICAgICAgICAgICBwcm9wcy5maWxsSW5wdXQgPT09IHRydWUgPyBnZXRPcHRpb25MYWJlbC52YWx1ZShvcHQpIDogJycsXG4gICAgICAgICAgICB0cnVlLFxuICAgICAgICAgICAgdHJ1ZVxuICAgICAgICAgIClcblxuICAgICAgICAgIGhpZGVQb3B1cCgpXG4gICAgICAgIH1cblxuICAgICAgICB0YXJnZXRSZWYudmFsdWU/LmZvY3VzKClcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgaW5uZXJWYWx1ZS52YWx1ZS5sZW5ndGggPT09IDBcbiAgICAgICAgICB8fCBpc0RlZXBFcXVhbChnZXRPcHRpb25WYWx1ZS52YWx1ZShpbm5lclZhbHVlLnZhbHVlWyAwIF0pLCBvcHRWYWx1ZSkgIT09IHRydWVcbiAgICAgICAgKSB7XG4gICAgICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCBwcm9wcy5lbWl0VmFsdWUgPT09IHRydWUgPyBvcHRWYWx1ZSA6IG9wdClcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAoaGFzRGlhbG9nICE9PSB0cnVlIHx8IGRpYWxvZ0ZpZWxkRm9jdXNlZC52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBzdGF0ZS5mb2N1cygpXG4gICAgICB9XG5cbiAgICAgIHNlbGVjdElucHV0VGV4dCgpXG5cbiAgICAgIGlmIChpbm5lclZhbHVlLnZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBjb25zdCB2YWwgPSBwcm9wcy5lbWl0VmFsdWUgPT09IHRydWUgPyBvcHRWYWx1ZSA6IG9wdFxuICAgICAgICBlbWl0KCdhZGQnLCB7IGluZGV4OiAwLCB2YWx1ZTogdmFsIH0pXG4gICAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgcHJvcHMubXVsdGlwbGUgPT09IHRydWUgPyBbIHZhbCBdIDogdmFsKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29uc3RcbiAgICAgICAgbW9kZWwgPSBwcm9wcy5tb2RlbFZhbHVlLnNsaWNlKCksXG4gICAgICAgIGluZGV4ID0gaW5uZXJPcHRpb25zVmFsdWUudmFsdWUuZmluZEluZGV4KHYgPT4gaXNEZWVwRXF1YWwodiwgb3B0VmFsdWUpKVxuXG4gICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgIGVtaXQoJ3JlbW92ZScsIHsgaW5kZXgsIHZhbHVlOiBtb2RlbC5zcGxpY2UoaW5kZXgsIDEpWyAwIF0gfSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgcHJvcHMubWF4VmFsdWVzICE9PSB2b2lkIDBcbiAgICAgICAgICAmJiBtb2RlbC5sZW5ndGggPj0gcHJvcHMubWF4VmFsdWVzXG4gICAgICAgICkgcmV0dXJuXG5cbiAgICAgICAgY29uc3QgdmFsID0gcHJvcHMuZW1pdFZhbHVlID09PSB0cnVlID8gb3B0VmFsdWUgOiBvcHRcblxuICAgICAgICBlbWl0KCdhZGQnLCB7IGluZGV4OiBtb2RlbC5sZW5ndGgsIHZhbHVlOiB2YWwgfSlcbiAgICAgICAgbW9kZWwucHVzaCh2YWwpXG4gICAgICB9XG5cbiAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgbW9kZWwpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0T3B0aW9uSW5kZXggKGluZGV4KSB7XG4gICAgICBpZiAoJHEucGxhdGZvcm0uaXMuZGVza3RvcCAhPT0gdHJ1ZSkgcmV0dXJuXG5cbiAgICAgIGNvbnN0IHZhbCA9IGluZGV4ICE9PSAtMSAmJiBpbmRleCA8IHZpcnR1YWxTY3JvbGxMZW5ndGgudmFsdWVcbiAgICAgICAgPyBpbmRleFxuICAgICAgICA6IC0xXG5cbiAgICAgIGlmIChvcHRpb25JbmRleC52YWx1ZSAhPT0gdmFsKSB7XG4gICAgICAgIG9wdGlvbkluZGV4LnZhbHVlID0gdmFsXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW92ZU9wdGlvblNlbGVjdGlvbiAob2Zmc2V0ID0gMSwgc2tpcElucHV0VmFsdWUpIHtcbiAgICAgIGlmIChtZW51LnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGxldCBpbmRleCA9IG9wdGlvbkluZGV4LnZhbHVlXG4gICAgICAgIGRvIHtcbiAgICAgICAgICBpbmRleCA9IG5vcm1hbGl6ZVRvSW50ZXJ2YWwoXG4gICAgICAgICAgICBpbmRleCArIG9mZnNldCxcbiAgICAgICAgICAgIC0xLFxuICAgICAgICAgICAgdmlydHVhbFNjcm9sbExlbmd0aC52YWx1ZSAtIDFcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKGluZGV4ICE9PSAtMSAmJiBpbmRleCAhPT0gb3B0aW9uSW5kZXgudmFsdWUgJiYgaXNPcHRpb25EaXNhYmxlZC52YWx1ZShwcm9wcy5vcHRpb25zWyBpbmRleCBdKSA9PT0gdHJ1ZSlcblxuICAgICAgICBpZiAob3B0aW9uSW5kZXgudmFsdWUgIT09IGluZGV4KSB7XG4gICAgICAgICAgc2V0T3B0aW9uSW5kZXgoaW5kZXgpXG4gICAgICAgICAgc2Nyb2xsVG8oaW5kZXgpXG5cbiAgICAgICAgICBpZiAoc2tpcElucHV0VmFsdWUgIT09IHRydWUgJiYgcHJvcHMudXNlSW5wdXQgPT09IHRydWUgJiYgcHJvcHMuZmlsbElucHV0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICBzZXRJbnB1dFZhbHVlKFxuICAgICAgICAgICAgICBpbmRleCA+PSAwXG4gICAgICAgICAgICAgICAgPyBnZXRPcHRpb25MYWJlbC52YWx1ZShwcm9wcy5vcHRpb25zWyBpbmRleCBdKVxuICAgICAgICAgICAgICAgIDogZGVmYXVsdElucHV0VmFsdWUsXG4gICAgICAgICAgICAgIHRydWVcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRPcHRpb24gKHZhbHVlLCB2YWx1ZUNhY2hlKSB7XG4gICAgICBjb25zdCBmbiA9IG9wdCA9PiBpc0RlZXBFcXVhbChnZXRPcHRpb25WYWx1ZS52YWx1ZShvcHQpLCB2YWx1ZSlcbiAgICAgIHJldHVybiBwcm9wcy5vcHRpb25zLmZpbmQoZm4pIHx8IHZhbHVlQ2FjaGUuZmluZChmbikgfHwgdmFsdWVcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc09wdGlvblNlbGVjdGVkIChvcHQpIHtcbiAgICAgIGNvbnN0IHZhbCA9IGdldE9wdGlvblZhbHVlLnZhbHVlKG9wdClcbiAgICAgIHJldHVybiBpbm5lck9wdGlvbnNWYWx1ZS52YWx1ZS5maW5kKHYgPT4gaXNEZWVwRXF1YWwodiwgdmFsKSkgIT09IHZvaWQgMFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNlbGVjdElucHV0VGV4dCAoZSkge1xuICAgICAgaWYgKFxuICAgICAgICBwcm9wcy51c2VJbnB1dCA9PT0gdHJ1ZVxuICAgICAgICAmJiB0YXJnZXRSZWYudmFsdWUgIT09IG51bGxcbiAgICAgICAgJiYgKGUgPT09IHZvaWQgMCB8fCAodGFyZ2V0UmVmLnZhbHVlID09PSBlLnRhcmdldCAmJiBlLnRhcmdldC52YWx1ZSA9PT0gc2VsZWN0ZWRTdHJpbmcudmFsdWUpKVxuICAgICAgKSB7XG4gICAgICAgIHRhcmdldFJlZi52YWx1ZS5zZWxlY3QoKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uVGFyZ2V0S2V5dXAgKGUpIHtcbiAgICAgIC8vIGlmIEVTQyBhbmQgd2UgaGF2ZSBhbiBvcGVuZWQgbWVudVxuICAgICAgLy8gdGhlbiBzdG9wIHByb3BhZ2F0aW9uIChtaWdodCBiZSBjYXVnaHQgYnkgYSBRRGlhbG9nXG4gICAgICAvLyBhbmQgc28gaXQgd2lsbCBhbHNvIGNsb3NlIHRoZSBRRGlhbG9nLCB3aGljaCBpcyB3cm9uZylcbiAgICAgIGlmIChpc0tleUNvZGUoZSwgMjcpID09PSB0cnVlICYmIG1lbnUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgc3RvcChlKVxuICAgICAgICAvLyBvbiBFU0Mgd2UgbmVlZCB0byBjbG9zZSB0aGUgZGlhbG9nIGFsc29cbiAgICAgICAgaGlkZVBvcHVwKClcbiAgICAgICAgcmVzZXRJbnB1dFZhbHVlKClcbiAgICAgIH1cblxuICAgICAgZW1pdCgna2V5dXAnLCBlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uVGFyZ2V0QXV0b2NvbXBsZXRlIChlKSB7XG4gICAgICBjb25zdCB7IHZhbHVlIH0gPSBlLnRhcmdldFxuXG4gICAgICBpZiAoZS5rZXlDb2RlICE9PSB2b2lkIDApIHtcbiAgICAgICAgb25UYXJnZXRLZXl1cChlKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgZS50YXJnZXQudmFsdWUgPSAnJ1xuXG4gICAgICBpZiAoZmlsdGVyVGltZXIgIT09IG51bGwpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KGZpbHRlclRpbWVyKVxuICAgICAgICBmaWx0ZXJUaW1lciA9IG51bGxcbiAgICAgIH1cbiAgICAgIGlmIChpbnB1dFZhbHVlVGltZXIgIT09IG51bGwpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KGlucHV0VmFsdWVUaW1lcilcbiAgICAgICAgaW5wdXRWYWx1ZVRpbWVyID0gbnVsbFxuICAgICAgfVxuXG4gICAgICByZXNldElucHV0VmFsdWUoKVxuXG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiB2YWx1ZS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgY29uc3QgbmVlZGxlID0gdmFsdWUudG9Mb2NhbGVMb3dlckNhc2UoKVxuICAgICAgICBjb25zdCBmaW5kRm4gPSBleHRyYWN0Rm4gPT4ge1xuICAgICAgICAgIGNvbnN0IG9wdGlvbiA9IHByb3BzLm9wdGlvbnMuZmluZChvcHQgPT4gU3RyaW5nKGV4dHJhY3RGbi52YWx1ZShvcHQpKS50b0xvY2FsZUxvd2VyQ2FzZSgpID09PSBuZWVkbGUpXG5cbiAgICAgICAgICBpZiAob3B0aW9uID09PSB2b2lkIDApIHJldHVybiBmYWxzZVxuXG4gICAgICAgICAgaWYgKGlubmVyVmFsdWUudmFsdWUuaW5kZXhPZihvcHRpb24pID09PSAtMSkge1xuICAgICAgICAgICAgdG9nZ2xlT3B0aW9uKG9wdGlvbilcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBoaWRlUG9wdXAoKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZmlsbEZuID0gYWZ0ZXJGaWx0ZXIgPT4ge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGZpbmRGbihnZXRPcHRpb25WYWx1ZSkgIT09IHRydWVcbiAgICAgICAgICAgICYmIGFmdGVyRmlsdGVyICE9PSB0cnVlXG4gICAgICAgICAgICAmJiBmaW5kRm4oZ2V0T3B0aW9uTGFiZWwpICE9PSB0cnVlXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBmaWx0ZXIodmFsdWUsIHRydWUsICgpID0+IGZpbGxGbih0cnVlKSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmaWxsRm4oKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHN0YXRlLmNsZWFyVmFsdWUoZSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblRhcmdldEtleXByZXNzIChlKSB7XG4gICAgICBlbWl0KCdrZXlwcmVzcycsIGUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25UYXJnZXRLZXlkb3duIChlKSB7XG4gICAgICBlbWl0KCdrZXlkb3duJywgZSlcblxuICAgICAgaWYgKHNob3VsZElnbm9yZUtleShlKSA9PT0gdHJ1ZSkgcmV0dXJuXG5cbiAgICAgIGNvbnN0IG5ld1ZhbHVlTW9kZVZhbGlkID0gaW5wdXRWYWx1ZS52YWx1ZS5sZW5ndGggIT09IDBcbiAgICAgICAgJiYgKHByb3BzLm5ld1ZhbHVlTW9kZSAhPT0gdm9pZCAwIHx8IHByb3BzLm9uTmV3VmFsdWUgIT09IHZvaWQgMClcblxuICAgICAgY29uc3QgdGFiU2hvdWxkU2VsZWN0ID0gZS5zaGlmdEtleSAhPT0gdHJ1ZVxuICAgICAgICAmJiBwcm9wcy5kaXNhYmxlVGFiU2VsZWN0aW9uICE9PSB0cnVlXG4gICAgICAgICYmIHByb3BzLm11bHRpcGxlICE9PSB0cnVlXG4gICAgICAgICYmIChvcHRpb25JbmRleC52YWx1ZSAhPT0gLTEgfHwgbmV3VmFsdWVNb2RlVmFsaWQgPT09IHRydWUpXG5cbiAgICAgIC8vIGVzY2FwZVxuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMjcpIHtcbiAgICAgICAgcHJldmVudChlKSAvLyBwcmV2ZW50IGNsZWFyaW5nIHRoZSBpbnB1dFZhbHVlXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICAvLyB0YWJcbiAgICAgIGlmIChlLmtleUNvZGUgPT09IDkgJiYgdGFiU2hvdWxkU2VsZWN0ID09PSBmYWxzZSkge1xuICAgICAgICBjbG9zZU1lbnUoKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICBlLnRhcmdldCA9PT0gdm9pZCAwXG4gICAgICAgIHx8IGUudGFyZ2V0LmlkICE9PSBzdGF0ZS50YXJnZXRVaWQudmFsdWVcbiAgICAgICAgfHwgc3RhdGUuZWRpdGFibGUudmFsdWUgIT09IHRydWVcbiAgICAgICkgcmV0dXJuXG5cbiAgICAgIC8vIGRvd25cbiAgICAgIGlmIChcbiAgICAgICAgZS5rZXlDb2RlID09PSA0MFxuICAgICAgICAmJiBzdGF0ZS5pbm5lckxvYWRpbmcudmFsdWUgIT09IHRydWVcbiAgICAgICAgJiYgbWVudS52YWx1ZSA9PT0gZmFsc2VcbiAgICAgICkge1xuICAgICAgICBzdG9wQW5kUHJldmVudChlKVxuICAgICAgICBzaG93UG9wdXAoKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgLy8gYmFja3NwYWNlXG4gICAgICBpZiAoXG4gICAgICAgIGUua2V5Q29kZSA9PT0gOFxuICAgICAgICAmJiAoXG4gICAgICAgICAgcHJvcHMudXNlQ2hpcHMgPT09IHRydWVcbiAgICAgICAgICB8fCBwcm9wcy5jbGVhcmFibGUgPT09IHRydWVcbiAgICAgICAgKVxuICAgICAgICAmJiBwcm9wcy5oaWRlU2VsZWN0ZWQgIT09IHRydWVcbiAgICAgICAgJiYgaW5wdXRWYWx1ZS52YWx1ZS5sZW5ndGggPT09IDBcbiAgICAgICkge1xuICAgICAgICBpZiAocHJvcHMubXVsdGlwbGUgPT09IHRydWUgJiYgQXJyYXkuaXNBcnJheShwcm9wcy5tb2RlbFZhbHVlKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHJlbW92ZUF0SW5kZXgocHJvcHMubW9kZWxWYWx1ZS5sZW5ndGggLSAxKVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHByb3BzLm11bHRpcGxlICE9PSB0cnVlICYmIHByb3BzLm1vZGVsVmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIG51bGwpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgLy8gaG9tZSwgZW5kIC0gMzYsIDM1XG4gICAgICBpZiAoXG4gICAgICAgIChlLmtleUNvZGUgPT09IDM1IHx8IGUua2V5Q29kZSA9PT0gMzYpXG4gICAgICAgICYmICh0eXBlb2YgaW5wdXRWYWx1ZS52YWx1ZSAhPT0gJ3N0cmluZycgfHwgaW5wdXRWYWx1ZS52YWx1ZS5sZW5ndGggPT09IDApXG4gICAgICApIHtcbiAgICAgICAgc3RvcEFuZFByZXZlbnQoZSlcbiAgICAgICAgb3B0aW9uSW5kZXgudmFsdWUgPSAtMVxuICAgICAgICBtb3ZlT3B0aW9uU2VsZWN0aW9uKGUua2V5Q29kZSA9PT0gMzYgPyAxIDogLTEsIHByb3BzLm11bHRpcGxlKVxuICAgICAgfVxuXG4gICAgICAvLyBwZyB1cCwgcGcgZG93biAtIDMzLCAzNFxuICAgICAgaWYgKFxuICAgICAgICAoZS5rZXlDb2RlID09PSAzMyB8fCBlLmtleUNvZGUgPT09IDM0KVxuICAgICAgICAmJiB2aXJ0dWFsU2Nyb2xsU2xpY2VTaXplQ29tcHV0ZWQudmFsdWUgIT09IHZvaWQgMFxuICAgICAgKSB7XG4gICAgICAgIHN0b3BBbmRQcmV2ZW50KGUpXG4gICAgICAgIG9wdGlvbkluZGV4LnZhbHVlID0gTWF0aC5tYXgoXG4gICAgICAgICAgLTEsXG4gICAgICAgICAgTWF0aC5taW4oXG4gICAgICAgICAgICB2aXJ0dWFsU2Nyb2xsTGVuZ3RoLnZhbHVlLFxuICAgICAgICAgICAgb3B0aW9uSW5kZXgudmFsdWUgKyAoZS5rZXlDb2RlID09PSAzMyA/IC0xIDogMSkgKiB2aXJ0dWFsU2Nyb2xsU2xpY2VTaXplQ29tcHV0ZWQudmFsdWUudmlld1xuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgICBtb3ZlT3B0aW9uU2VsZWN0aW9uKGUua2V5Q29kZSA9PT0gMzMgPyAxIDogLTEsIHByb3BzLm11bHRpcGxlKVxuICAgICAgfVxuXG4gICAgICAvLyB1cCwgZG93blxuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMzggfHwgZS5rZXlDb2RlID09PSA0MCkge1xuICAgICAgICBzdG9wQW5kUHJldmVudChlKVxuICAgICAgICBtb3ZlT3B0aW9uU2VsZWN0aW9uKGUua2V5Q29kZSA9PT0gMzggPyAtMSA6IDEsIHByb3BzLm11bHRpcGxlKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBvcHRpb25zTGVuZ3RoID0gdmlydHVhbFNjcm9sbExlbmd0aC52YWx1ZVxuXG4gICAgICAvLyBjbGVhciBzZWFyY2ggYnVmZmVyIGlmIGV4cGlyZWRcbiAgICAgIGlmIChzZWFyY2hCdWZmZXIgPT09IHZvaWQgMCB8fCBzZWFyY2hCdWZmZXJFeHAgPCBEYXRlLm5vdygpKSB7XG4gICAgICAgIHNlYXJjaEJ1ZmZlciA9ICcnXG4gICAgICB9XG5cbiAgICAgIC8vIGtleWJvYXJkIHNlYXJjaCB3aGVuIG5vdCBoYXZpbmcgdXNlLWlucHV0XG4gICAgICBpZiAoXG4gICAgICAgIG9wdGlvbnNMZW5ndGggPiAwXG4gICAgICAgICYmIHByb3BzLnVzZUlucHV0ICE9PSB0cnVlXG4gICAgICAgICYmIGUua2V5ICE9PSB2b2lkIDBcbiAgICAgICAgJiYgZS5rZXkubGVuZ3RoID09PSAxIC8vIHByaW50YWJsZSBjaGFyXG4gICAgICAgICYmIGUuYWx0S2V5ID09PSBmYWxzZSAvLyBub3Qga2JkIHNob3J0Y3V0XG4gICAgICAgICYmIGUuY3RybEtleSA9PT0gZmFsc2UgLy8gbm90IGtiZCBzaG9ydGN1dFxuICAgICAgICAmJiBlLm1ldGFLZXkgPT09IGZhbHNlIC8vIG5vdCBrYmQgc2hvcnRjdXQsIGVzcGVjaWFsbHkgb24gbWFjT1Mgd2l0aCBDb21tYW5kIGtleVxuICAgICAgICAmJiAoZS5rZXlDb2RlICE9PSAzMiB8fCBzZWFyY2hCdWZmZXIubGVuZ3RoICE9PSAwKSAvLyBzcGFjZSBpbiBtaWRkbGUgb2Ygc2VhcmNoXG4gICAgICApIHtcbiAgICAgICAgbWVudS52YWx1ZSAhPT0gdHJ1ZSAmJiBzaG93UG9wdXAoZSlcblxuICAgICAgICBjb25zdFxuICAgICAgICAgIGNoYXIgPSBlLmtleS50b0xvY2FsZUxvd2VyQ2FzZSgpLFxuICAgICAgICAgIGtleVJlcGVhdCA9IHNlYXJjaEJ1ZmZlci5sZW5ndGggPT09IDEgJiYgc2VhcmNoQnVmZmVyWyAwIF0gPT09IGNoYXJcblxuICAgICAgICBzZWFyY2hCdWZmZXJFeHAgPSBEYXRlLm5vdygpICsgMTUwMFxuICAgICAgICBpZiAoa2V5UmVwZWF0ID09PSBmYWxzZSkge1xuICAgICAgICAgIHN0b3BBbmRQcmV2ZW50KGUpXG4gICAgICAgICAgc2VhcmNoQnVmZmVyICs9IGNoYXJcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNlYXJjaFJlID0gbmV3IFJlZ0V4cCgnXicgKyBzZWFyY2hCdWZmZXIuc3BsaXQoJycpLm1hcChsID0+IChyZUVzY2FwZUxpc3QuaW5kZXhPZihsKSAhPT0gLTEgPyAnXFxcXCcgKyBsIDogbCkpLmpvaW4oJy4qJyksICdpJylcblxuICAgICAgICBsZXQgaW5kZXggPSBvcHRpb25JbmRleC52YWx1ZVxuXG4gICAgICAgIGlmIChrZXlSZXBlYXQgPT09IHRydWUgfHwgaW5kZXggPCAwIHx8IHNlYXJjaFJlLnRlc3QoZ2V0T3B0aW9uTGFiZWwudmFsdWUocHJvcHMub3B0aW9uc1sgaW5kZXggXSkpICE9PSB0cnVlKSB7XG4gICAgICAgICAgZG8ge1xuICAgICAgICAgICAgaW5kZXggPSBub3JtYWxpemVUb0ludGVydmFsKGluZGV4ICsgMSwgLTEsIG9wdGlvbnNMZW5ndGggLSAxKVxuICAgICAgICAgIH1cbiAgICAgICAgICB3aGlsZSAoaW5kZXggIT09IG9wdGlvbkluZGV4LnZhbHVlICYmIChcbiAgICAgICAgICAgIGlzT3B0aW9uRGlzYWJsZWQudmFsdWUocHJvcHMub3B0aW9uc1sgaW5kZXggXSkgPT09IHRydWVcbiAgICAgICAgICAgIHx8IHNlYXJjaFJlLnRlc3QoZ2V0T3B0aW9uTGFiZWwudmFsdWUocHJvcHMub3B0aW9uc1sgaW5kZXggXSkpICE9PSB0cnVlXG4gICAgICAgICAgKSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRpb25JbmRleC52YWx1ZSAhPT0gaW5kZXgpIHtcbiAgICAgICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgICBzZXRPcHRpb25JbmRleChpbmRleClcbiAgICAgICAgICAgIHNjcm9sbFRvKGluZGV4KVxuXG4gICAgICAgICAgICBpZiAoaW5kZXggPj0gMCAmJiBwcm9wcy51c2VJbnB1dCA9PT0gdHJ1ZSAmJiBwcm9wcy5maWxsSW5wdXQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgc2V0SW5wdXRWYWx1ZShnZXRPcHRpb25MYWJlbC52YWx1ZShwcm9wcy5vcHRpb25zWyBpbmRleCBdKSwgdHJ1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIC8vIGVudGVyLCBzcGFjZSAod2hlbiBub3QgdXNpbmcgdXNlLWlucHV0IGFuZCBub3QgaW4gc2VhcmNoKSwgb3IgdGFiICh3aGVuIG5vdCB1c2luZyBtdWx0aXBsZSBhbmQgb3B0aW9uIHNlbGVjdGVkKVxuICAgICAgLy8gc2FtZSB0YXJnZXQgaXMgY2hlY2tlZCBhYm92ZVxuICAgICAgaWYgKFxuICAgICAgICBlLmtleUNvZGUgIT09IDEzXG4gICAgICAgICYmIChlLmtleUNvZGUgIT09IDMyIHx8IHByb3BzLnVzZUlucHV0ID09PSB0cnVlIHx8IHNlYXJjaEJ1ZmZlciAhPT0gJycpXG4gICAgICAgICYmIChlLmtleUNvZGUgIT09IDkgfHwgdGFiU2hvdWxkU2VsZWN0ID09PSBmYWxzZSlcbiAgICAgICkgcmV0dXJuXG5cbiAgICAgIGUua2V5Q29kZSAhPT0gOSAmJiBzdG9wQW5kUHJldmVudChlKVxuXG4gICAgICBpZiAob3B0aW9uSW5kZXgudmFsdWUgIT09IC0xICYmIG9wdGlvbkluZGV4LnZhbHVlIDwgb3B0aW9uc0xlbmd0aCkge1xuICAgICAgICB0b2dnbGVPcHRpb24ocHJvcHMub3B0aW9uc1sgb3B0aW9uSW5kZXgudmFsdWUgXSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChuZXdWYWx1ZU1vZGVWYWxpZCA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBkb25lID0gKHZhbCwgbW9kZSkgPT4ge1xuICAgICAgICAgIGlmIChtb2RlKSB7XG4gICAgICAgICAgICBpZiAodmFsaWRhdGVOZXdWYWx1ZU1vZGUobW9kZSkgIT09IHRydWUpIHJldHVyblxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG1vZGUgPSBwcm9wcy5uZXdWYWx1ZU1vZGVcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB1cGRhdGVJbnB1dFZhbHVlKCcnLCBwcm9wcy5tdWx0aXBsZSAhPT0gdHJ1ZSwgdHJ1ZSlcblxuICAgICAgICAgIGlmICh2YWwgPT09IHZvaWQgMCB8fCB2YWwgPT09IG51bGwpIHJldHVyblxuXG4gICAgICAgICAgY29uc3QgZm4gPSBtb2RlID09PSAndG9nZ2xlJyA/IHRvZ2dsZU9wdGlvbiA6IGFkZFxuICAgICAgICAgIGZuKHZhbCwgbW9kZSA9PT0gJ2FkZC11bmlxdWUnKVxuXG4gICAgICAgICAgaWYgKHByb3BzLm11bHRpcGxlICE9PSB0cnVlKSB7XG4gICAgICAgICAgICB0YXJnZXRSZWYudmFsdWU/LmZvY3VzKClcbiAgICAgICAgICAgIGhpZGVQb3B1cCgpXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb3BzLm9uTmV3VmFsdWUgIT09IHZvaWQgMCkge1xuICAgICAgICAgIGVtaXQoJ25ld1ZhbHVlJywgaW5wdXRWYWx1ZS52YWx1ZSwgZG9uZSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBkb25lKGlucHV0VmFsdWUudmFsdWUpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvcHMubXVsdGlwbGUgIT09IHRydWUpIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAobWVudS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjbG9zZU1lbnUoKVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAoc3RhdGUuaW5uZXJMb2FkaW5nLnZhbHVlICE9PSB0cnVlKSB7XG4gICAgICAgIHNob3dQb3B1cCgpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VmlydHVhbFNjcm9sbEVsICgpIHtcbiAgICAgIHJldHVybiBoYXNEaWFsb2cgPT09IHRydWVcbiAgICAgICAgPyBtZW51Q29udGVudFJlZi52YWx1ZVxuICAgICAgICA6IChcbiAgICAgICAgICAgIG1lbnVSZWYudmFsdWUgIT09IG51bGwgJiYgbWVudVJlZi52YWx1ZS5jb250ZW50RWwgIT09IG51bGxcbiAgICAgICAgICAgICAgPyBtZW51UmVmLnZhbHVlLmNvbnRlbnRFbFxuICAgICAgICAgICAgICA6IHZvaWQgMFxuICAgICAgICAgIClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRWaXJ0dWFsU2Nyb2xsVGFyZ2V0ICgpIHtcbiAgICAgIHJldHVybiBnZXRWaXJ0dWFsU2Nyb2xsRWwoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFNlbGVjdGlvbiAoKSB7XG4gICAgICBpZiAocHJvcHMuaGlkZVNlbGVjdGVkID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBbXVxuICAgICAgfVxuXG4gICAgICBpZiAoc2xvdHNbICdzZWxlY3RlZC1pdGVtJyBdICE9PSB2b2lkIDApIHtcbiAgICAgICAgcmV0dXJuIHNlbGVjdGVkU2NvcGUudmFsdWUubWFwKHNjb3BlID0+IHNsb3RzWyAnc2VsZWN0ZWQtaXRlbScgXShzY29wZSkpLnNsaWNlKClcbiAgICAgIH1cblxuICAgICAgaWYgKHNsb3RzLnNlbGVjdGVkICE9PSB2b2lkIDApIHtcbiAgICAgICAgcmV0dXJuIFtdLmNvbmNhdChzbG90cy5zZWxlY3RlZCgpKVxuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHMudXNlQ2hpcHMgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIHNlbGVjdGVkU2NvcGUudmFsdWUubWFwKChzY29wZSwgaSkgPT4gaChRQ2hpcCwge1xuICAgICAgICAgIGtleTogJ29wdGlvbi0nICsgaSxcbiAgICAgICAgICByZW1vdmFibGU6IHN0YXRlLmVkaXRhYmxlLnZhbHVlID09PSB0cnVlICYmIGlzT3B0aW9uRGlzYWJsZWQudmFsdWUoc2NvcGUub3B0KSAhPT0gdHJ1ZSxcbiAgICAgICAgICBkZW5zZTogdHJ1ZSxcbiAgICAgICAgICB0ZXh0Q29sb3I6IHByb3BzLmNvbG9yLFxuICAgICAgICAgIHRhYmluZGV4OiB0YWJpbmRleC52YWx1ZSxcbiAgICAgICAgICBvblJlbW92ZSAoKSB7IHNjb3BlLnJlbW92ZUF0SW5kZXgoaSkgfVxuICAgICAgICB9LCAoKSA9PiBoKCdzcGFuJywge1xuICAgICAgICAgIGNsYXNzOiAnZWxsaXBzaXMnLFxuICAgICAgICAgIFsgc2NvcGUuaHRtbCA9PT0gdHJ1ZSA/ICdpbm5lckhUTUwnIDogJ3RleHRDb250ZW50JyBdOiBnZXRPcHRpb25MYWJlbC52YWx1ZShzY29wZS5vcHQpXG4gICAgICAgIH0pKSlcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIFtcbiAgICAgICAgaCgnc3BhbicsIHtcbiAgICAgICAgICBjbGFzczogJ2VsbGlwc2lzJyxcbiAgICAgICAgICBbIHZhbHVlQXNIdG1sLnZhbHVlID09PSB0cnVlID8gJ2lubmVySFRNTCcgOiAndGV4dENvbnRlbnQnIF06IGFyaWFDdXJyZW50VmFsdWUudmFsdWVcbiAgICAgICAgfSlcbiAgICAgIF1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRBbGxPcHRpb25zICgpIHtcbiAgICAgIGlmIChub09wdGlvbnMudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIHNsb3RzWyAnbm8tb3B0aW9uJyBdICE9PSB2b2lkIDBcbiAgICAgICAgICA/IHNsb3RzWyAnbm8tb3B0aW9uJyBdKHsgaW5wdXRWYWx1ZTogaW5wdXRWYWx1ZS52YWx1ZSB9KVxuICAgICAgICAgIDogdm9pZCAwXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGZuID0gc2xvdHMub3B0aW9uICE9PSB2b2lkIDBcbiAgICAgICAgPyBzbG90cy5vcHRpb25cbiAgICAgICAgOiBzY29wZSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGgoUUl0ZW0sIHtcbiAgICAgICAgICAgIGtleTogc2NvcGUuaW5kZXgsXG4gICAgICAgICAgICAuLi5zY29wZS5pdGVtUHJvcHNcbiAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gaChcbiAgICAgICAgICAgICAgUUl0ZW1TZWN0aW9uLFxuICAgICAgICAgICAgICAoKSA9PiBoKFxuICAgICAgICAgICAgICAgIFFJdGVtTGFiZWwsXG4gICAgICAgICAgICAgICAgKCkgPT4gaCgnc3BhbicsIHtcbiAgICAgICAgICAgICAgICAgIFsgc2NvcGUuaHRtbCA9PT0gdHJ1ZSA/ICdpbm5lckhUTUwnIDogJ3RleHRDb250ZW50JyBdOiBzY29wZS5sYWJlbFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgIGxldCBvcHRpb25zID0gcGFkVmlydHVhbFNjcm9sbCgnZGl2Jywgb3B0aW9uU2NvcGUudmFsdWUubWFwKGZuKSlcblxuICAgICAgaWYgKHNsb3RzWyAnYmVmb3JlLW9wdGlvbnMnIF0gIT09IHZvaWQgMCkge1xuICAgICAgICBvcHRpb25zID0gc2xvdHNbICdiZWZvcmUtb3B0aW9ucycgXSgpLmNvbmNhdChvcHRpb25zKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gaE1lcmdlU2xvdChzbG90c1sgJ2FmdGVyLW9wdGlvbnMnIF0sIG9wdGlvbnMpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0SW5wdXQgKGZyb21EaWFsb2csIGlzVGFyZ2V0KSB7XG4gICAgICBjb25zdCBhdHRycyA9IGlzVGFyZ2V0ID09PSB0cnVlID8geyAuLi5jb21ib2JveEF0dHJzLnZhbHVlLCAuLi5zdGF0ZS5zcGxpdEF0dHJzLmF0dHJpYnV0ZXMudmFsdWUgfSA6IHZvaWQgMFxuXG4gICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICByZWY6IGlzVGFyZ2V0ID09PSB0cnVlID8gdGFyZ2V0UmVmIDogdm9pZCAwLFxuICAgICAgICBrZXk6ICdpX3QnLFxuICAgICAgICBjbGFzczogY29tcHV0ZWRJbnB1dENsYXNzLnZhbHVlLFxuICAgICAgICBzdHlsZTogcHJvcHMuaW5wdXRTdHlsZSxcbiAgICAgICAgdmFsdWU6IGlucHV0VmFsdWUudmFsdWUgIT09IHZvaWQgMCA/IGlucHV0VmFsdWUudmFsdWUgOiAnJyxcbiAgICAgICAgLy8gcmVxdWlyZWQgZm9yIEFuZHJvaWQgaW4gb3JkZXIgdG8gc2hvdyBFTlRFUiBrZXkgd2hlbiBpbiBmb3JtXG4gICAgICAgIHR5cGU6ICdzZWFyY2gnLFxuICAgICAgICAuLi5hdHRycyxcbiAgICAgICAgaWQ6IGlzVGFyZ2V0ID09PSB0cnVlID8gc3RhdGUudGFyZ2V0VWlkLnZhbHVlIDogdm9pZCAwLFxuICAgICAgICBtYXhsZW5ndGg6IHByb3BzLm1heGxlbmd0aCxcbiAgICAgICAgYXV0b2NvbXBsZXRlOiBwcm9wcy5hdXRvY29tcGxldGUsXG4gICAgICAgICdkYXRhLWF1dG9mb2N1cyc6IGZyb21EaWFsb2cgPT09IHRydWUgfHwgcHJvcHMuYXV0b2ZvY3VzID09PSB0cnVlIHx8IHZvaWQgMCxcbiAgICAgICAgZGlzYWJsZWQ6IHByb3BzLmRpc2FibGUgPT09IHRydWUsXG4gICAgICAgIHJlYWRvbmx5OiBwcm9wcy5yZWFkb25seSA9PT0gdHJ1ZSxcbiAgICAgICAgLi4uaW5wdXRDb250cm9sRXZlbnRzLnZhbHVlXG4gICAgICB9XG5cbiAgICAgIGlmIChmcm9tRGlhbG9nICE9PSB0cnVlICYmIGhhc0RpYWxvZyA9PT0gdHJ1ZSkge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhLmNsYXNzKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGRhdGEuY2xhc3MgPSBbIC4uLmRhdGEuY2xhc3MsICduby1wb2ludGVyLWV2ZW50cycgXVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGRhdGEuY2xhc3MgKz0gJyBuby1wb2ludGVyLWV2ZW50cydcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gaCgnaW5wdXQnLCBkYXRhKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uSW5wdXQgKGUpIHtcbiAgICAgIGlmIChmaWx0ZXJUaW1lciAhPT0gbnVsbCkge1xuICAgICAgICBjbGVhclRpbWVvdXQoZmlsdGVyVGltZXIpXG4gICAgICAgIGZpbHRlclRpbWVyID0gbnVsbFxuICAgICAgfVxuICAgICAgaWYgKGlucHV0VmFsdWVUaW1lciAhPT0gbnVsbCkge1xuICAgICAgICBjbGVhclRpbWVvdXQoaW5wdXRWYWx1ZVRpbWVyKVxuICAgICAgICBpbnB1dFZhbHVlVGltZXIgPSBudWxsXG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgZVxuICAgICAgICAmJiBlLnRhcmdldFxuICAgICAgICAmJiBlLnRhcmdldC5xQ29tcG9zaW5nID09PSB0cnVlXG4gICAgICApIHJldHVyblxuXG4gICAgICBzZXRJbnB1dFZhbHVlKGUudGFyZ2V0LnZhbHVlIHx8ICcnKVxuICAgICAgLy8gbWFyayBpdCBoZXJlIGFzIHVzZXIgaW5wdXQgc28gdGhhdCBpZiB1cGRhdGVJbnB1dFZhbHVlIGlzIGNhbGxlZFxuICAgICAgLy8gYmVmb3JlIGZpbHRlciBpcyBjYWxsZWQgdGhlIGluZGljYXRvciBpcyByZXNldFxuICAgICAgdXNlcklucHV0VmFsdWUgPSB0cnVlXG4gICAgICBkZWZhdWx0SW5wdXRWYWx1ZSA9IGlucHV0VmFsdWUudmFsdWVcblxuICAgICAgaWYgKFxuICAgICAgICBzdGF0ZS5mb2N1c2VkLnZhbHVlICE9PSB0cnVlXG4gICAgICAgICYmIChoYXNEaWFsb2cgIT09IHRydWUgfHwgZGlhbG9nRmllbGRGb2N1c2VkLnZhbHVlID09PSB0cnVlKVxuICAgICAgKSB7XG4gICAgICAgIHN0YXRlLmZvY3VzKClcbiAgICAgIH1cblxuICAgICAgaWYgKHByb3BzLm9uRmlsdGVyICE9PSB2b2lkIDApIHtcbiAgICAgICAgZmlsdGVyVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBmaWx0ZXJUaW1lciA9IG51bGxcbiAgICAgICAgICBmaWx0ZXIoaW5wdXRWYWx1ZS52YWx1ZSlcbiAgICAgICAgfSwgcHJvcHMuaW5wdXREZWJvdW5jZSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRJbnB1dFZhbHVlICh2YWwsIGVtaXRJbW1lZGlhdGVseSkge1xuICAgICAgaWYgKGlucHV0VmFsdWUudmFsdWUgIT09IHZhbCkge1xuICAgICAgICBpbnB1dFZhbHVlLnZhbHVlID0gdmFsXG5cbiAgICAgICAgaWYgKGVtaXRJbW1lZGlhdGVseSA9PT0gdHJ1ZSB8fCBwcm9wcy5pbnB1dERlYm91bmNlID09PSAwIHx8IHByb3BzLmlucHV0RGVib3VuY2UgPT09ICcwJykge1xuICAgICAgICAgIGVtaXQoJ2lucHV0VmFsdWUnLCB2YWwpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgaW5wdXRWYWx1ZVRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpbnB1dFZhbHVlVGltZXIgPSBudWxsXG4gICAgICAgICAgICBlbWl0KCdpbnB1dFZhbHVlJywgdmFsKVxuICAgICAgICAgIH0sIHByb3BzLmlucHV0RGVib3VuY2UpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVJbnB1dFZhbHVlICh2YWwsIG5vRmlsdGVyaW5nLCBpbnRlcm5hbCkge1xuICAgICAgdXNlcklucHV0VmFsdWUgPSBpbnRlcm5hbCAhPT0gdHJ1ZVxuXG4gICAgICBpZiAocHJvcHMudXNlSW5wdXQgPT09IHRydWUpIHtcbiAgICAgICAgc2V0SW5wdXRWYWx1ZSh2YWwsIHRydWUpXG5cbiAgICAgICAgaWYgKG5vRmlsdGVyaW5nID09PSB0cnVlIHx8IGludGVybmFsICE9PSB0cnVlKSB7XG4gICAgICAgICAgZGVmYXVsdElucHV0VmFsdWUgPSB2YWxcbiAgICAgICAgfVxuXG4gICAgICAgIG5vRmlsdGVyaW5nICE9PSB0cnVlICYmIGZpbHRlcih2YWwpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmlsdGVyICh2YWwsIGtlZXBDbG9zZWQsIGFmdGVyVXBkYXRlRm4pIHtcbiAgICAgIGlmIChcbiAgICAgICAgcHJvcHMub25GaWx0ZXIgPT09IHZvaWQgMFxuICAgICAgICB8fCAoa2VlcENsb3NlZCAhPT0gdHJ1ZSAmJiBzdGF0ZS5mb2N1c2VkLnZhbHVlICE9PSB0cnVlKVxuICAgICAgKSByZXR1cm5cblxuICAgICAgaWYgKHN0YXRlLmlubmVyTG9hZGluZy52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBlbWl0KCdmaWx0ZXJBYm9ydCcpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgc3RhdGUuaW5uZXJMb2FkaW5nLnZhbHVlID0gdHJ1ZVxuICAgICAgICBpbm5lckxvYWRpbmdJbmRpY2F0b3IudmFsdWUgPSB0cnVlXG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgdmFsICE9PSAnJ1xuICAgICAgICAmJiBwcm9wcy5tdWx0aXBsZSAhPT0gdHJ1ZVxuICAgICAgICAmJiBpbm5lclZhbHVlLnZhbHVlLmxlbmd0aCAhPT0gMFxuICAgICAgICAmJiB1c2VySW5wdXRWYWx1ZSAhPT0gdHJ1ZVxuICAgICAgICAmJiB2YWwgPT09IGdldE9wdGlvbkxhYmVsLnZhbHVlKGlubmVyVmFsdWUudmFsdWVbIDAgXSlcbiAgICAgICkge1xuICAgICAgICB2YWwgPSAnJ1xuICAgICAgfVxuXG4gICAgICBjb25zdCBsb2NhbEZpbHRlcklkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIG1lbnUudmFsdWUgPT09IHRydWUgJiYgKG1lbnUudmFsdWUgPSBmYWxzZSlcbiAgICAgIH0sIDEwKVxuXG4gICAgICBmaWx0ZXJJZCAhPT0gbnVsbCAmJiBjbGVhclRpbWVvdXQoZmlsdGVySWQpXG4gICAgICBmaWx0ZXJJZCA9IGxvY2FsRmlsdGVySWRcblxuICAgICAgZW1pdChcbiAgICAgICAgJ2ZpbHRlcicsXG4gICAgICAgIHZhbCxcbiAgICAgICAgKGZuLCBhZnRlckZuKSA9PiB7XG4gICAgICAgICAgaWYgKChrZWVwQ2xvc2VkID09PSB0cnVlIHx8IHN0YXRlLmZvY3VzZWQudmFsdWUgPT09IHRydWUpICYmIGZpbHRlcklkID09PSBsb2NhbEZpbHRlcklkKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoZmlsdGVySWQpXG5cbiAgICAgICAgICAgIHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJyAmJiBmbigpXG5cbiAgICAgICAgICAgIC8vIGhpZGUgaW5kaWNhdG9yIHRvIGFsbG93IGFycm93IHRvIGFuaW1hdGVcbiAgICAgICAgICAgIGlubmVyTG9hZGluZ0luZGljYXRvci52YWx1ZSA9IGZhbHNlXG5cbiAgICAgICAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICAgICAgc3RhdGUuaW5uZXJMb2FkaW5nLnZhbHVlID0gZmFsc2VcblxuICAgICAgICAgICAgICBpZiAoc3RhdGUuZWRpdGFibGUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoa2VlcENsb3NlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgbWVudS52YWx1ZSA9PT0gdHJ1ZSAmJiBoaWRlUG9wdXAoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChtZW51LnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICB1cGRhdGVNZW51KHRydWUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgbWVudS52YWx1ZSA9IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB0eXBlb2YgYWZ0ZXJGbiA9PT0gJ2Z1bmN0aW9uJyAmJiBuZXh0VGljaygoKSA9PiB7IGFmdGVyRm4ocHJveHkpIH0pXG4gICAgICAgICAgICAgIHR5cGVvZiBhZnRlclVwZGF0ZUZuID09PSAnZnVuY3Rpb24nICYmIG5leHRUaWNrKCgpID0+IHsgYWZ0ZXJVcGRhdGVGbihwcm94eSkgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgaWYgKHN0YXRlLmZvY3VzZWQudmFsdWUgPT09IHRydWUgJiYgZmlsdGVySWQgPT09IGxvY2FsRmlsdGVySWQpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChmaWx0ZXJJZClcbiAgICAgICAgICAgIHN0YXRlLmlubmVyTG9hZGluZy52YWx1ZSA9IGZhbHNlXG4gICAgICAgICAgICBpbm5lckxvYWRpbmdJbmRpY2F0b3IudmFsdWUgPSBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgICBtZW51LnZhbHVlID09PSB0cnVlICYmIChtZW51LnZhbHVlID0gZmFsc2UpXG4gICAgICAgIH1cbiAgICAgIClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRNZW51ICgpIHtcbiAgICAgIHJldHVybiBoKFFNZW51LCB7XG4gICAgICAgIHJlZjogbWVudVJlZixcbiAgICAgICAgY2xhc3M6IG1lbnVDb250ZW50Q2xhc3MudmFsdWUsXG4gICAgICAgIHN0eWxlOiBwcm9wcy5wb3B1cENvbnRlbnRTdHlsZSxcbiAgICAgICAgbW9kZWxWYWx1ZTogbWVudS52YWx1ZSxcbiAgICAgICAgZml0OiBwcm9wcy5tZW51U2hyaW5rICE9PSB0cnVlLFxuICAgICAgICBjb3ZlcjogcHJvcHMub3B0aW9uc0NvdmVyID09PSB0cnVlICYmIG5vT3B0aW9ucy52YWx1ZSAhPT0gdHJ1ZSAmJiBwcm9wcy51c2VJbnB1dCAhPT0gdHJ1ZSxcbiAgICAgICAgYW5jaG9yOiBwcm9wcy5tZW51QW5jaG9yLFxuICAgICAgICBzZWxmOiBwcm9wcy5tZW51U2VsZixcbiAgICAgICAgb2Zmc2V0OiBwcm9wcy5tZW51T2Zmc2V0LFxuICAgICAgICBkYXJrOiBpc09wdGlvbnNEYXJrLnZhbHVlLFxuICAgICAgICBub1BhcmVudEV2ZW50OiB0cnVlLFxuICAgICAgICBub1JlZm9jdXM6IHRydWUsXG4gICAgICAgIG5vRm9jdXM6IHRydWUsXG4gICAgICAgIG5vUm91dGVEaXNtaXNzOiBwcm9wcy5wb3B1cE5vUm91dGVEaXNtaXNzLFxuICAgICAgICBzcXVhcmU6IHNxdWFyZWRNZW51LnZhbHVlLFxuICAgICAgICB0cmFuc2l0aW9uU2hvdzogcHJvcHMudHJhbnNpdGlvblNob3csXG4gICAgICAgIHRyYW5zaXRpb25IaWRlOiBwcm9wcy50cmFuc2l0aW9uSGlkZSxcbiAgICAgICAgdHJhbnNpdGlvbkR1cmF0aW9uOiBwcm9wcy50cmFuc2l0aW9uRHVyYXRpb24sXG4gICAgICAgIHNlcGFyYXRlQ2xvc2VQb3B1cDogdHJ1ZSxcbiAgICAgICAgLi4ubGlzdGJveEF0dHJzLnZhbHVlLFxuICAgICAgICBvblNjcm9sbFBhc3NpdmU6IG9uVmlydHVhbFNjcm9sbEV2dCxcbiAgICAgICAgb25CZWZvcmVTaG93OiBvbkNvbnRyb2xQb3B1cFNob3csXG4gICAgICAgIG9uQmVmb3JlSGlkZTogb25NZW51QmVmb3JlSGlkZSxcbiAgICAgICAgb25TaG93OiBvbk1lbnVTaG93XG4gICAgICB9LCBnZXRBbGxPcHRpb25zKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTWVudUJlZm9yZUhpZGUgKGUpIHtcbiAgICAgIG9uQ29udHJvbFBvcHVwSGlkZShlKVxuICAgICAgY2xvc2VNZW51KClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbk1lbnVTaG93ICgpIHtcbiAgICAgIHNldFZpcnR1YWxTY3JvbGxTaXplKClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkRpYWxvZ0ZpZWxkRm9jdXMgKGUpIHtcbiAgICAgIHN0b3AoZSlcbiAgICAgIHRhcmdldFJlZi52YWx1ZT8uZm9jdXMoKVxuICAgICAgZGlhbG9nRmllbGRGb2N1c2VkLnZhbHVlID0gdHJ1ZVxuICAgICAgd2luZG93LnNjcm9sbFRvKHdpbmRvdy5wYWdlWE9mZnNldCB8fCB3aW5kb3cuc2Nyb2xsWCB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQgfHwgMCwgMClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkRpYWxvZ0ZpZWxkQmx1ciAoZSkge1xuICAgICAgc3RvcChlKVxuICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICBkaWFsb2dGaWVsZEZvY3VzZWQudmFsdWUgPSBmYWxzZVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXREaWFsb2cgKCkge1xuICAgICAgY29uc3QgY29udGVudCA9IFtcbiAgICAgICAgaChRRmllbGQsIHtcbiAgICAgICAgICBjbGFzczogYGNvbC1hdXRvICR7IHN0YXRlLmZpZWxkQ2xhc3MudmFsdWUgfWAsXG4gICAgICAgICAgLi4uaW5uZXJGaWVsZFByb3BzLnZhbHVlLFxuICAgICAgICAgIGZvcjogc3RhdGUudGFyZ2V0VWlkLnZhbHVlLFxuICAgICAgICAgIGRhcms6IGlzT3B0aW9uc0RhcmsudmFsdWUsXG4gICAgICAgICAgc3F1YXJlOiB0cnVlLFxuICAgICAgICAgIGxvYWRpbmc6IGlubmVyTG9hZGluZ0luZGljYXRvci52YWx1ZSxcbiAgICAgICAgICBpdGVtQWxpZ25lZDogZmFsc2UsXG4gICAgICAgICAgZmlsbGVkOiB0cnVlLFxuICAgICAgICAgIHN0YWNrTGFiZWw6IGlucHV0VmFsdWUudmFsdWUubGVuZ3RoICE9PSAwLFxuICAgICAgICAgIC4uLnN0YXRlLnNwbGl0QXR0cnMubGlzdGVuZXJzLnZhbHVlLFxuICAgICAgICAgIG9uRm9jdXM6IG9uRGlhbG9nRmllbGRGb2N1cyxcbiAgICAgICAgICBvbkJsdXI6IG9uRGlhbG9nRmllbGRCbHVyXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAuLi5zbG90cyxcbiAgICAgICAgICByYXdDb250cm9sOiAoKSA9PiBzdGF0ZS5nZXRDb250cm9sKHRydWUpLFxuICAgICAgICAgIGJlZm9yZTogdm9pZCAwLFxuICAgICAgICAgIGFmdGVyOiB2b2lkIDBcbiAgICAgICAgfSlcbiAgICAgIF1cblxuICAgICAgbWVudS52YWx1ZSA9PT0gdHJ1ZSAmJiBjb250ZW50LnB1c2goXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICByZWY6IG1lbnVDb250ZW50UmVmLFxuICAgICAgICAgIGNsYXNzOiBtZW51Q29udGVudENsYXNzLnZhbHVlICsgJyBzY3JvbGwnLFxuICAgICAgICAgIHN0eWxlOiBwcm9wcy5wb3B1cENvbnRlbnRTdHlsZSxcbiAgICAgICAgICAuLi5saXN0Ym94QXR0cnMudmFsdWUsXG4gICAgICAgICAgb25DbGljazogcHJldmVudCxcbiAgICAgICAgICBvblNjcm9sbFBhc3NpdmU6IG9uVmlydHVhbFNjcm9sbEV2dFxuICAgICAgICB9LCBnZXRBbGxPcHRpb25zKCkpXG4gICAgICApXG5cbiAgICAgIHJldHVybiBoKFFEaWFsb2csIHtcbiAgICAgICAgcmVmOiBkaWFsb2dSZWYsXG4gICAgICAgIG1vZGVsVmFsdWU6IGRpYWxvZy52YWx1ZSxcbiAgICAgICAgcG9zaXRpb246IHByb3BzLnVzZUlucHV0ID09PSB0cnVlID8gJ3RvcCcgOiB2b2lkIDAsXG4gICAgICAgIHRyYW5zaXRpb25TaG93OiB0cmFuc2l0aW9uU2hvd0NvbXB1dGVkLFxuICAgICAgICB0cmFuc2l0aW9uSGlkZTogcHJvcHMudHJhbnNpdGlvbkhpZGUsXG4gICAgICAgIHRyYW5zaXRpb25EdXJhdGlvbjogcHJvcHMudHJhbnNpdGlvbkR1cmF0aW9uLFxuICAgICAgICBub1JvdXRlRGlzbWlzczogcHJvcHMucG9wdXBOb1JvdXRlRGlzbWlzcyxcbiAgICAgICAgb25CZWZvcmVTaG93OiBvbkNvbnRyb2xQb3B1cFNob3csXG4gICAgICAgIG9uQmVmb3JlSGlkZTogb25EaWFsb2dCZWZvcmVIaWRlLFxuICAgICAgICBvbkhpZGU6IG9uRGlhbG9nSGlkZSxcbiAgICAgICAgb25TaG93OiBvbkRpYWxvZ1Nob3dcbiAgICAgIH0sICgpID0+IGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6ICdxLXNlbGVjdF9fZGlhbG9nJ1xuICAgICAgICAgICsgKGlzT3B0aW9uc0RhcmsudmFsdWUgPT09IHRydWUgPyAnIHEtc2VsZWN0X19kaWFsb2ctLWRhcmsgcS1kYXJrJyA6ICcnKVxuICAgICAgICAgICsgKGRpYWxvZ0ZpZWxkRm9jdXNlZC52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1zZWxlY3RfX2RpYWxvZy0tZm9jdXNlZCcgOiAnJylcbiAgICAgIH0sIGNvbnRlbnQpKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRGlhbG9nQmVmb3JlSGlkZSAoZSkge1xuICAgICAgb25Db250cm9sUG9wdXBIaWRlKGUpXG5cbiAgICAgIGlmIChkaWFsb2dSZWYudmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgZGlhbG9nUmVmLnZhbHVlLl9fdXBkYXRlUmVmb2N1c1RhcmdldChcbiAgICAgICAgICBzdGF0ZS5yb290UmVmLnZhbHVlLnF1ZXJ5U2VsZWN0b3IoJy5xLWZpZWxkX19uYXRpdmUgPiBbdGFiaW5kZXhdOmxhc3QtY2hpbGQnKVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIHN0YXRlLmZvY3VzZWQudmFsdWUgPSBmYWxzZVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRGlhbG9nSGlkZSAoZSkge1xuICAgICAgaGlkZVBvcHVwKClcbiAgICAgIHN0YXRlLmZvY3VzZWQudmFsdWUgPT09IGZhbHNlICYmIGVtaXQoJ2JsdXInLCBlKVxuICAgICAgcmVzZXRJbnB1dFZhbHVlKClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkRpYWxvZ1Nob3cgKCkge1xuICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50XG4gICAgICBpZiAoXG4gICAgICAgIChlbCA9PT0gbnVsbCB8fCBlbC5pZCAhPT0gc3RhdGUudGFyZ2V0VWlkLnZhbHVlKVxuICAgICAgICAmJiB0YXJnZXRSZWYudmFsdWUgIT09IG51bGxcbiAgICAgICAgJiYgdGFyZ2V0UmVmLnZhbHVlICE9PSBlbFxuICAgICAgKSB7XG4gICAgICAgIHRhcmdldFJlZi52YWx1ZS5mb2N1cygpXG4gICAgICB9XG5cbiAgICAgIHNldFZpcnR1YWxTY3JvbGxTaXplKClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbG9zZU1lbnUgKCkge1xuICAgICAgaWYgKGRpYWxvZy52YWx1ZSA9PT0gdHJ1ZSkgcmV0dXJuXG5cbiAgICAgIG9wdGlvbkluZGV4LnZhbHVlID0gLTFcblxuICAgICAgaWYgKG1lbnUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgbWVudS52YWx1ZSA9IGZhbHNlXG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZS5mb2N1c2VkLnZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICBpZiAoZmlsdGVySWQgIT09IG51bGwpIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQoZmlsdGVySWQpXG4gICAgICAgICAgZmlsdGVySWQgPSBudWxsXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdGUuaW5uZXJMb2FkaW5nLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgZW1pdCgnZmlsdGVyQWJvcnQnKVxuICAgICAgICAgIHN0YXRlLmlubmVyTG9hZGluZy52YWx1ZSA9IGZhbHNlXG4gICAgICAgICAgaW5uZXJMb2FkaW5nSW5kaWNhdG9yLnZhbHVlID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNob3dQb3B1cCAoZSkge1xuICAgICAgaWYgKHN0YXRlLmVkaXRhYmxlLnZhbHVlICE9PSB0cnVlKSByZXR1cm5cblxuICAgICAgaWYgKGhhc0RpYWxvZyA9PT0gdHJ1ZSkge1xuICAgICAgICBzdGF0ZS5vbkNvbnRyb2xGb2N1c2luKGUpXG4gICAgICAgIGRpYWxvZy52YWx1ZSA9IHRydWVcbiAgICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgIHN0YXRlLmZvY3VzKClcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBzdGF0ZS5mb2N1cygpXG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9wcy5vbkZpbHRlciAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGZpbHRlcihpbnB1dFZhbHVlLnZhbHVlKVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAobm9PcHRpb25zLnZhbHVlICE9PSB0cnVlIHx8IHNsb3RzWyAnbm8tb3B0aW9uJyBdICE9PSB2b2lkIDApIHtcbiAgICAgICAgbWVudS52YWx1ZSA9IHRydWVcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoaWRlUG9wdXAgKCkge1xuICAgICAgZGlhbG9nLnZhbHVlID0gZmFsc2VcbiAgICAgIGNsb3NlTWVudSgpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVzZXRJbnB1dFZhbHVlICgpIHtcbiAgICAgIHByb3BzLnVzZUlucHV0ID09PSB0cnVlICYmIHVwZGF0ZUlucHV0VmFsdWUoXG4gICAgICAgIHByb3BzLm11bHRpcGxlICE9PSB0cnVlICYmIHByb3BzLmZpbGxJbnB1dCA9PT0gdHJ1ZSAmJiBpbm5lclZhbHVlLnZhbHVlLmxlbmd0aCAhPT0gMFxuICAgICAgICAgID8gZ2V0T3B0aW9uTGFiZWwudmFsdWUoaW5uZXJWYWx1ZS52YWx1ZVsgMCBdKSB8fCAnJ1xuICAgICAgICAgIDogJycsXG4gICAgICAgIHRydWUsXG4gICAgICAgIHRydWVcbiAgICAgIClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVNZW51IChzaG93KSB7XG4gICAgICBsZXQgb3B0aW9uSW5kZXggPSAtMVxuXG4gICAgICBpZiAoc2hvdyA9PT0gdHJ1ZSkge1xuICAgICAgICBpZiAoaW5uZXJWYWx1ZS52YWx1ZS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICBjb25zdCB2YWwgPSBnZXRPcHRpb25WYWx1ZS52YWx1ZShpbm5lclZhbHVlLnZhbHVlWyAwIF0pXG4gICAgICAgICAgb3B0aW9uSW5kZXggPSBwcm9wcy5vcHRpb25zLmZpbmRJbmRleCh2ID0+IGlzRGVlcEVxdWFsKGdldE9wdGlvblZhbHVlLnZhbHVlKHYpLCB2YWwpKVxuICAgICAgICB9XG5cbiAgICAgICAgbG9jYWxSZXNldFZpcnR1YWxTY3JvbGwob3B0aW9uSW5kZXgpXG4gICAgICB9XG5cbiAgICAgIHNldE9wdGlvbkluZGV4KG9wdGlvbkluZGV4KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlcmVuZGVyTWVudSAobmV3TGVuZ3RoLCBvbGRMZW5ndGgpIHtcbiAgICAgIGlmIChtZW51LnZhbHVlID09PSB0cnVlICYmIHN0YXRlLmlubmVyTG9hZGluZy52YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgbG9jYWxSZXNldFZpcnR1YWxTY3JvbGwoLTEsIHRydWUpXG5cbiAgICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgIGlmIChtZW51LnZhbHVlID09PSB0cnVlICYmIHN0YXRlLmlubmVyTG9hZGluZy52YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGlmIChuZXdMZW5ndGggPiBvbGRMZW5ndGgpIHtcbiAgICAgICAgICAgICAgbG9jYWxSZXNldFZpcnR1YWxTY3JvbGwoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIHVwZGF0ZU1lbnUodHJ1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlTWVudVBvc2l0aW9uICgpIHtcbiAgICAgIGlmIChkaWFsb2cudmFsdWUgPT09IGZhbHNlICYmIG1lbnVSZWYudmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgbWVudVJlZi52YWx1ZS51cGRhdGVQb3NpdGlvbigpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Db250cm9sUG9wdXBTaG93IChlKSB7XG4gICAgICBlICE9PSB2b2lkIDAgJiYgc3RvcChlKVxuICAgICAgZW1pdCgncG9wdXBTaG93JywgZSlcbiAgICAgIHN0YXRlLmhhc1BvcHVwT3BlbiA9IHRydWVcbiAgICAgIHN0YXRlLm9uQ29udHJvbEZvY3VzaW4oZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkNvbnRyb2xQb3B1cEhpZGUgKGUpIHtcbiAgICAgIGUgIT09IHZvaWQgMCAmJiBzdG9wKGUpXG4gICAgICBlbWl0KCdwb3B1cEhpZGUnLCBlKVxuICAgICAgc3RhdGUuaGFzUG9wdXBPcGVuID0gZmFsc2VcbiAgICAgIHN0YXRlLm9uQ29udHJvbEZvY3Vzb3V0KGUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlUHJlU3RhdGUgKCkge1xuICAgICAgaGFzRGlhbG9nID0gJHEucGxhdGZvcm0uaXMubW9iaWxlICE9PSB0cnVlICYmIHByb3BzLmJlaGF2aW9yICE9PSAnZGlhbG9nJ1xuICAgICAgICA/IGZhbHNlXG4gICAgICAgIDogcHJvcHMuYmVoYXZpb3IgIT09ICdtZW51JyAmJiAoXG4gICAgICAgICAgcHJvcHMudXNlSW5wdXQgPT09IHRydWVcbiAgICAgICAgICAgID8gc2xvdHNbICduby1vcHRpb24nIF0gIT09IHZvaWQgMCB8fCBwcm9wcy5vbkZpbHRlciAhPT0gdm9pZCAwIHx8IG5vT3B0aW9ucy52YWx1ZSA9PT0gZmFsc2VcbiAgICAgICAgICAgIDogdHJ1ZVxuICAgICAgICApXG5cbiAgICAgIHRyYW5zaXRpb25TaG93Q29tcHV0ZWQgPSAkcS5wbGF0Zm9ybS5pcy5pb3MgPT09IHRydWUgJiYgaGFzRGlhbG9nID09PSB0cnVlICYmIHByb3BzLnVzZUlucHV0ID09PSB0cnVlXG4gICAgICAgID8gJ2ZhZGUnXG4gICAgICAgIDogcHJvcHMudHJhbnNpdGlvblNob3dcbiAgICB9XG5cbiAgICBvbkJlZm9yZVVwZGF0ZSh1cGRhdGVQcmVTdGF0ZSlcbiAgICBvblVwZGF0ZWQodXBkYXRlTWVudVBvc2l0aW9uKVxuXG4gICAgdXBkYXRlUHJlU3RhdGUoKVxuXG4gICAgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICAgIGZpbHRlclRpbWVyICE9PSBudWxsICYmIGNsZWFyVGltZW91dChmaWx0ZXJUaW1lcilcbiAgICAgIGlucHV0VmFsdWVUaW1lciAhPT0gbnVsbCAmJiBjbGVhclRpbWVvdXQoaW5wdXRWYWx1ZVRpbWVyKVxuICAgIH0pXG5cbiAgICAvLyBleHBvc2UgcHVibGljIG1ldGhvZHNcbiAgICBPYmplY3QuYXNzaWduKHByb3h5LCB7XG4gICAgICBzaG93UG9wdXAsIGhpZGVQb3B1cCxcbiAgICAgIHJlbW92ZUF0SW5kZXgsIGFkZCwgdG9nZ2xlT3B0aW9uLFxuICAgICAgZ2V0T3B0aW9uSW5kZXg6ICgpID0+IG9wdGlvbkluZGV4LnZhbHVlLFxuICAgICAgc2V0T3B0aW9uSW5kZXgsIG1vdmVPcHRpb25TZWxlY3Rpb24sXG4gICAgICBmaWx0ZXIsIHVwZGF0ZU1lbnVQb3NpdGlvbiwgdXBkYXRlSW5wdXRWYWx1ZSxcbiAgICAgIGlzT3B0aW9uU2VsZWN0ZWQsXG4gICAgICBnZXRFbWl0dGluZ09wdGlvblZhbHVlLFxuICAgICAgaXNPcHRpb25EaXNhYmxlZDogKC4uLmFyZ3MpID0+IGlzT3B0aW9uRGlzYWJsZWQudmFsdWUuYXBwbHkobnVsbCwgYXJncykgPT09IHRydWUsXG4gICAgICBnZXRPcHRpb25WYWx1ZTogKC4uLmFyZ3MpID0+IGdldE9wdGlvblZhbHVlLnZhbHVlLmFwcGx5KG51bGwsIGFyZ3MpLFxuICAgICAgZ2V0T3B0aW9uTGFiZWw6ICguLi5hcmdzKSA9PiBnZXRPcHRpb25MYWJlbC52YWx1ZS5hcHBseShudWxsLCBhcmdzKVxuICAgIH0pXG5cbiAgICBPYmplY3QuYXNzaWduKHN0YXRlLCB7XG4gICAgICBpbm5lclZhbHVlLFxuXG4gICAgICBmaWVsZENsYXNzOiBjb21wdXRlZCgoKSA9PlxuICAgICAgICBgcS1zZWxlY3QgcS1maWVsZC0tYXV0by1oZWlnaHQgcS1zZWxlY3QtLXdpdGgkeyBwcm9wcy51c2VJbnB1dCAhPT0gdHJ1ZSA/ICdvdXQnIDogJycgfS1pbnB1dGBcbiAgICAgICAgKyBgIHEtc2VsZWN0LS13aXRoJHsgcHJvcHMudXNlQ2hpcHMgIT09IHRydWUgPyAnb3V0JyA6ICcnIH0tY2hpcHNgXG4gICAgICAgICsgYCBxLXNlbGVjdC0tJHsgcHJvcHMubXVsdGlwbGUgPT09IHRydWUgPyAnbXVsdGlwbGUnIDogJ3NpbmdsZScgfWBcbiAgICAgICksXG5cbiAgICAgIGlucHV0UmVmLFxuICAgICAgdGFyZ2V0UmVmLFxuICAgICAgaGFzVmFsdWUsXG4gICAgICBzaG93UG9wdXAsXG5cbiAgICAgIGZsb2F0aW5nTGFiZWw6IGNvbXB1dGVkKCgpID0+XG4gICAgICAgIChwcm9wcy5oaWRlU2VsZWN0ZWQgIT09IHRydWUgJiYgaGFzVmFsdWUudmFsdWUgPT09IHRydWUpXG4gICAgICAgIHx8IHR5cGVvZiBpbnB1dFZhbHVlLnZhbHVlID09PSAnbnVtYmVyJ1xuICAgICAgICB8fCBpbnB1dFZhbHVlLnZhbHVlLmxlbmd0aCAhPT0gMFxuICAgICAgICB8fCBmaWVsZFZhbHVlSXNGaWxsZWQocHJvcHMuZGlzcGxheVZhbHVlKVxuICAgICAgKSxcblxuICAgICAgZ2V0Q29udHJvbENoaWxkOiAoKSA9PiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBzdGF0ZS5lZGl0YWJsZS52YWx1ZSAhPT0gZmFsc2UgJiYgKFxuICAgICAgICAgICAgZGlhbG9nLnZhbHVlID09PSB0cnVlIC8vIGRpYWxvZyBhbHdheXMgaGFzIG1lbnUgZGlzcGxheWVkLCBzbyBuZWVkIHRvIHJlbmRlciBpdFxuICAgICAgICAgICAgfHwgbm9PcHRpb25zLnZhbHVlICE9PSB0cnVlXG4gICAgICAgICAgICB8fCBzbG90c1sgJ25vLW9wdGlvbicgXSAhPT0gdm9pZCAwXG4gICAgICAgICAgKVxuICAgICAgICApIHtcbiAgICAgICAgICByZXR1cm4gaGFzRGlhbG9nID09PSB0cnVlID8gZ2V0RGlhbG9nKCkgOiBnZXRNZW51KClcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzdGF0ZS5oYXNQb3B1cE9wZW4gPT09IHRydWUpIHtcbiAgICAgICAgICAvLyBleHBsaWNpdGx5IHNldCBpdCBvdGhlcndpc2UgVEFCIHdpbGwgbm90IGJsdXIgY29tcG9uZW50XG4gICAgICAgICAgc3RhdGUuaGFzUG9wdXBPcGVuID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgY29udHJvbEV2ZW50czoge1xuICAgICAgICBvbkZvY3VzaW4gKGUpIHsgc3RhdGUub25Db250cm9sRm9jdXNpbihlKSB9LFxuICAgICAgICBvbkZvY3Vzb3V0IChlKSB7XG4gICAgICAgICAgc3RhdGUub25Db250cm9sRm9jdXNvdXQoZSwgKCkgPT4ge1xuICAgICAgICAgICAgcmVzZXRJbnB1dFZhbHVlKClcbiAgICAgICAgICAgIGNsb3NlTWVudSgpXG4gICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgb25DbGljayAoZSkge1xuICAgICAgICAgIC8vIGxhYmVsIGZyb20gUUZpZWxkIHdpbGwgcHJvcGFnYXRlIGNsaWNrIG9uIHRoZSBpbnB1dFxuICAgICAgICAgIHByZXZlbnQoZSlcblxuICAgICAgICAgIGlmIChoYXNEaWFsb2cgIT09IHRydWUgJiYgbWVudS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgY2xvc2VNZW51KClcbiAgICAgICAgICAgIHRhcmdldFJlZi52YWx1ZT8uZm9jdXMoKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc2hvd1BvcHVwKGUpXG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIGdldENvbnRyb2w6IGZyb21EaWFsb2cgPT4ge1xuICAgICAgICBjb25zdCBjaGlsZCA9IGdldFNlbGVjdGlvbigpXG4gICAgICAgIGNvbnN0IGlzVGFyZ2V0ID0gZnJvbURpYWxvZyA9PT0gdHJ1ZSB8fCBkaWFsb2cudmFsdWUgIT09IHRydWUgfHwgaGFzRGlhbG9nICE9PSB0cnVlXG5cbiAgICAgICAgaWYgKHByb3BzLnVzZUlucHV0ID09PSB0cnVlKSB7XG4gICAgICAgICAgY2hpbGQucHVzaChnZXRJbnB1dChmcm9tRGlhbG9nLCBpc1RhcmdldCkpXG4gICAgICAgIH1cbiAgICAgICAgLy8gdGhlcmUgY2FuIGJlIG9ubHkgb25lICh3aGVuIGRpYWxvZyBpcyBvcGVuZWQgdGhlIGNvbnRyb2wgaW4gZGlhbG9nIHNob3VsZCBiZSB0YXJnZXQpXG4gICAgICAgIGVsc2UgaWYgKHN0YXRlLmVkaXRhYmxlLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgY29uc3QgYXR0cnMgPSBpc1RhcmdldCA9PT0gdHJ1ZSA/IGNvbWJvYm94QXR0cnMudmFsdWUgOiB2b2lkIDBcblxuICAgICAgICAgIGNoaWxkLnB1c2goXG4gICAgICAgICAgICBoKCdpbnB1dCcsIHtcbiAgICAgICAgICAgICAgcmVmOiBpc1RhcmdldCA9PT0gdHJ1ZSA/IHRhcmdldFJlZiA6IHZvaWQgMCxcbiAgICAgICAgICAgICAga2V5OiAnZF90JyxcbiAgICAgICAgICAgICAgY2xhc3M6ICdxLXNlbGVjdF9fZm9jdXMtdGFyZ2V0JyxcbiAgICAgICAgICAgICAgaWQ6IGlzVGFyZ2V0ID09PSB0cnVlID8gc3RhdGUudGFyZ2V0VWlkLnZhbHVlIDogdm9pZCAwLFxuICAgICAgICAgICAgICB2YWx1ZTogYXJpYUN1cnJlbnRWYWx1ZS52YWx1ZSxcbiAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWUsXG4gICAgICAgICAgICAgICdkYXRhLWF1dG9mb2N1cyc6IGZyb21EaWFsb2cgPT09IHRydWUgfHwgcHJvcHMuYXV0b2ZvY3VzID09PSB0cnVlIHx8IHZvaWQgMCxcbiAgICAgICAgICAgICAgLi4uYXR0cnMsXG4gICAgICAgICAgICAgIG9uS2V5ZG93bjogb25UYXJnZXRLZXlkb3duLFxuICAgICAgICAgICAgICBvbktleXVwOiBvblRhcmdldEtleXVwLFxuICAgICAgICAgICAgICBvbktleXByZXNzOiBvblRhcmdldEtleXByZXNzXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIClcblxuICAgICAgICAgIGlmIChpc1RhcmdldCA9PT0gdHJ1ZSAmJiB0eXBlb2YgcHJvcHMuYXV0b2NvbXBsZXRlID09PSAnc3RyaW5nJyAmJiBwcm9wcy5hdXRvY29tcGxldGUubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICBjaGlsZC5wdXNoKFxuICAgICAgICAgICAgICBoKCdpbnB1dCcsIHtcbiAgICAgICAgICAgICAgICBjbGFzczogJ3Etc2VsZWN0X19hdXRvY29tcGxldGUtaW5wdXQnLFxuICAgICAgICAgICAgICAgIGF1dG9jb21wbGV0ZTogcHJvcHMuYXV0b2NvbXBsZXRlLFxuICAgICAgICAgICAgICAgIHRhYmluZGV4OiAtMSxcbiAgICAgICAgICAgICAgICBvbktleXVwOiBvblRhcmdldEF1dG9jb21wbGV0ZVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuYW1lUHJvcC52YWx1ZSAhPT0gdm9pZCAwICYmIHByb3BzLmRpc2FibGUgIT09IHRydWUgJiYgaW5uZXJPcHRpb25zVmFsdWUudmFsdWUubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgY29uc3Qgb3B0cyA9IGlubmVyT3B0aW9uc1ZhbHVlLnZhbHVlLm1hcCh2YWx1ZSA9PiBoKCdvcHRpb24nLCB7IHZhbHVlLCBzZWxlY3RlZDogdHJ1ZSB9KSlcblxuICAgICAgICAgIGNoaWxkLnB1c2goXG4gICAgICAgICAgICBoKCdzZWxlY3QnLCB7XG4gICAgICAgICAgICAgIGNsYXNzOiAnaGlkZGVuJyxcbiAgICAgICAgICAgICAgbmFtZTogbmFtZVByb3AudmFsdWUsXG4gICAgICAgICAgICAgIG11bHRpcGxlOiBwcm9wcy5tdWx0aXBsZVxuICAgICAgICAgICAgfSwgb3B0cylcbiAgICAgICAgICApXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBhdHRycyA9IHByb3BzLnVzZUlucHV0ID09PSB0cnVlIHx8IGlzVGFyZ2V0ICE9PSB0cnVlID8gdm9pZCAwIDogc3RhdGUuc3BsaXRBdHRycy5hdHRyaWJ1dGVzLnZhbHVlXG5cbiAgICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogJ3EtZmllbGRfX25hdGl2ZSByb3cgaXRlbXMtY2VudGVyJyxcbiAgICAgICAgICAuLi5hdHRycyxcbiAgICAgICAgICAuLi5zdGF0ZS5zcGxpdEF0dHJzLmxpc3RlbmVycy52YWx1ZVxuICAgICAgICB9LCBjaGlsZClcbiAgICAgIH0sXG5cbiAgICAgIGdldElubmVyQXBwZW5kOiAoKSA9PiAoXG4gICAgICAgIHByb3BzLmxvYWRpbmcgIT09IHRydWUgJiYgaW5uZXJMb2FkaW5nSW5kaWNhdG9yLnZhbHVlICE9PSB0cnVlICYmIHByb3BzLmhpZGVEcm9wZG93bkljb24gIT09IHRydWVcbiAgICAgICAgICA/IFtcbiAgICAgICAgICAgICAgaChRSWNvbiwge1xuICAgICAgICAgICAgICAgIGNsYXNzOiAncS1zZWxlY3RfX2Ryb3Bkb3duLWljb24nICsgKG1lbnUudmFsdWUgPT09IHRydWUgPyAnIHJvdGF0ZS0xODAnIDogJycpLFxuICAgICAgICAgICAgICAgIG5hbWU6IGRyb3Bkb3duQXJyb3dJY29uLnZhbHVlXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdXG4gICAgICAgICAgOiBudWxsXG4gICAgICApXG4gICAgfSlcblxuICAgIHJldHVybiB1c2VGaWVsZChzdGF0ZSlcbiAgfVxufSlcbiJdLCJuYW1lcyI6WyJoIiwiZWwiLCJvcHRpb25JbmRleCIsImF0dHJzIl0sIm1hcHBpbmdzIjoiOzs7QUFJQSxNQUFBLFNBQWUsZ0JBQWdCO0FBQUEsRUFDN0IsTUFBTTtBQUFBLEVBRU4sY0FBYztBQUFBLEVBRWQsT0FBTztBQUFBLElBQ0wsR0FBRztBQUFBLElBRUgsS0FBSztBQUFBLE1BQ0gsTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLElBQ2Y7QUFBQSxFQUNHO0FBQUEsRUFFRCxPQUFPO0FBQUEsRUFFUCxRQUFTO0FBQ1AsV0FBTztBQUFBLE1BQ0wsY0FBYyxFQUFFLFNBQVMsS0FBTSxDQUFBO0FBQUEsSUFDckM7QUFBQSxFQUNBO0FBQ0EsQ0FBQztBQ1pNLE1BQU0sZUFBZTtBQUFBLEVBQzFCLElBQUk7QUFBQSxFQUNKLElBQUk7QUFBQSxFQUNKLElBQUk7QUFBQSxFQUNKLElBQUk7QUFBQSxFQUNKLElBQUk7QUFDTjtBQUVBLE1BQUEsUUFBZSxnQkFBZ0I7QUFBQSxFQUM3QixNQUFNO0FBQUEsRUFFTixPQUFPO0FBQUEsSUFDTCxHQUFHO0FBQUEsSUFDSCxHQUFHO0FBQUEsSUFFSCxPQUFPO0FBQUEsSUFFUCxNQUFNO0FBQUEsSUFDTixXQUFXO0FBQUEsSUFDWCxZQUFZO0FBQUEsSUFDWixjQUFjO0FB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
