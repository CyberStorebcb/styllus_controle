import { c as createComponent, a as onBeforeUnmount, h, ak as Transition, al as shallowReactive, B as useModelToggleEmits, C as useDarkProps, D as useModelToggleProps, am as useRouterLinkProps, g as getCurrentInstance, E as useDark, r as ref, an as useId, G as useModelToggle, k as computed, w as watch, ao as uid, ag as QSeparator, J as withDirectives, ap as vShow, L as hSlot, a6 as QIcon, A as stopAndPrevent } from "./index-DTRxxbQ7.js";
import { b as QItem, a as QItemLabel, c as QItemSection } from "./QList-C--UWoUK.js";
const QSlideTransition = createComponent({
  name: "QSlideTransition",
  props: {
    appear: Boolean,
    duration: {
      type: Number,
      default: 300
    }
  },
  emits: ["show", "hide"],
  setup(props, { slots, emit }) {
    let animating = false, doneFn, element;
    let timer = null, timerFallback = null, animListener, lastEvent;
    function cleanup() {
      doneFn?.();
      doneFn = null;
      animating = false;
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
      if (timerFallback !== null) {
        clearTimeout(timerFallback);
        timerFallback = null;
      }
      element?.removeEventListener("transitionend", animListener);
      animListener = null;
    }
    function begin(el, height, done) {
      if (height !== void 0) {
        el.style.height = `${height}px`;
      }
      el.style.transition = `height ${props.duration}ms cubic-bezier(.25, .8, .50, 1)`;
      animating = true;
      doneFn = done;
    }
    function end(el, event) {
      el.style.overflowY = null;
      el.style.height = null;
      el.style.transition = null;
      cleanup();
      event !== lastEvent && emit(event);
    }
    function onEnter(el, done) {
      let pos = 0;
      element = el;
      if (animating === true) {
        cleanup();
        pos = el.offsetHeight === el.scrollHeight ? 0 : void 0;
      } else {
        lastEvent = "hide";
        el.style.overflowY = "hidden";
      }
      begin(el, pos, done);
      timer = setTimeout(() => {
        timer = null;
        el.style.height = `${el.scrollHeight}px`;
        animListener = (evt) => {
          timerFallback = null;
          if (Object(evt) !== evt || evt.target === el) {
            end(el, "show");
          }
        };
        el.addEventListener("transitionend", animListener);
        timerFallback = setTimeout(animListener, props.duration * 1.1);
      }, 100);
    }
    function onLeave(el, done) {
      let pos;
      element = el;
      if (animating === true) {
        cleanup();
      } else {
        lastEvent = "show";
        el.style.overflowY = "hidden";
        pos = el.scrollHeight;
      }
      begin(el, pos, done);
      timer = setTimeout(() => {
        timer = null;
        el.style.height = 0;
        animListener = (evt) => {
          timerFallback = null;
          if (Object(evt) !== evt || evt.target === el) {
            end(el, "hide");
          }
        };
        el.addEventListener("transitionend", animListener);
        timerFallback = setTimeout(animListener, props.duration * 1.1);
      }, 100);
    }
    onBeforeUnmount(() => {
      animating === true && cleanup();
    });
    return () => h(Transition, {
      css: false,
      appear: props.appear,
      onEnter,
      onLeave
    }, slots.default);
  }
});
const itemGroups = shallowReactive({});
const LINK_PROPS = Object.keys(useRouterLinkProps);
const QExpansionItem = createComponent({
  name: "QExpansionItem",
  props: {
    ...useRouterLinkProps,
    ...useModelToggleProps,
    ...useDarkProps,
    icon: String,
    label: String,
    labelLines: [Number, String],
    caption: String,
    captionLines: [Number, String],
    dense: Boolean,
    toggleAriaLabel: String,
    expandIcon: String,
    expandedIcon: String,
    expandIconClass: [Array, String, Object],
    duration: {},
    headerInsetLevel: Number,
    contentInsetLevel: Number,
    expandSeparator: Boolean,
    defaultOpened: Boolean,
    hideExpandIcon: Boolean,
    expandIconToggle: Boolean,
    switchToggleSide: Boolean,
    denseToggle: Boolean,
    group: String,
    popup: Boolean,
    headerStyle: [Array, String, Object],
    headerClass: [Array, String, Object]
  },
  emits: [
    ...useModelToggleEmits,
    "click",
    "afterShow",
    "afterHide"
  ],
  setup(props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();
    const isDark = useDark(props, $q);
    const showing = ref(
      props.modelValue !== null ? props.modelValue : props.defaultOpened
    );
    const blurTargetRef = ref(null);
    const targetUid = useId();
    const { show, hide, toggle } = useModelToggle({ showing });
    let uniqueId, exitGroup;
    const classes = computed(
      () => `q-expansion-item q-item-type q-expansion-item--${showing.value === true ? "expanded" : "collapsed"} q-expansion-item--${props.popup === true ? "popup" : "standard"}`
    );
    const contentStyle = computed(() => {
      if (props.contentInsetLevel === void 0) {
        return null;
      }
      const dir = $q.lang.rtl === true ? "Right" : "Left";
      return {
        ["padding" + dir]: props.contentInsetLevel * 56 + "px"
      };
    });
    const hasLink = computed(
      () => props.disable !== true && (props.href !== void 0 || props.to !== void 0 && props.to !== null && props.to !== "")
    );
    const linkProps = computed(() => {
      const acc = {};
      LINK_PROPS.forEach((key) => {
        acc[key] = props[key];
      });
      return acc;
    });
    const isClickable = computed(
      () => hasLink.value === true || props.expandIconToggle !== true
    );
    const expansionIcon = computed(() => props.expandedIcon !== void 0 && showing.value === true ? props.expandedIcon : props.expandIcon || $q.iconSet.expansionItem[props.denseToggle === true ? "denseIcon" : "icon"]);
    const activeToggleIcon = computed(
      () => props.disable !== true && (hasLink.value === true || props.expandIconToggle === true)
    );
    const headerSlotScope = computed(() => ({
      expanded: showing.value === true,
      detailsId: targetUid.value,
      toggle,
      show,
      hide
    }));
    const toggleAriaAttrs = computed(() => {
      const toggleAriaLabel = props.toggleAriaLabel !== void 0 ? props.toggleAriaLabel : $q.lang.label[showing.value === true ? "collapse" : "expand"](props.label);
      return {
        role: "button",
        "aria-expanded": showing.value === true ? "true" : "false",
        "aria-controls": targetUid.value,
        "aria-label": toggleAriaLabel
      };
    });
    watch(() => props.group, (name) => {
      exitGroup?.();
      name !== void 0 && enterGroup();
    });
    function onHeaderClick(e) {
      hasLink.value !== true && toggle(e);
      emit("click", e);
    }
    function toggleIconKeyboard(e) {
      e.keyCode === 13 && toggleIcon(e, true);
    }
    function toggleIcon(e, keyboard) {
      if (keyboard !== true && e.qAvoidFocus !== true) {
        blurTargetRef.value?.focus();
      }
      toggle(e);
      stopAndPrevent(e);
    }
    function onShow() {
      emit("afterShow");
    }
    function onHide() {
      emit("afterHide");
    }
    function enterGroup() {
      if (uniqueId === void 0) {
        uniqueId = uid();
      }
      if (showing.value === true) {
        itemGroups[props.group] = uniqueId;
      }
      const show2 = watch(showing, (val) => {
        if (val === true) {
          itemGroups[props.group] = uniqueId;
        } else if (itemGroups[props.group] === uniqueId) {
          delete itemGroups[props.group];
        }
      });
      const group = watch(
        () => itemGroups[props.group],
        (val, oldVal) => {
          if (oldVal === uniqueId && val !== void 0 && val !== uniqueId) {
            hide();
          }
        }
      );
      exitGroup = () => {
        show2();
        group();
        if (itemGroups[props.group] === uniqueId) {
          delete itemGroups[props.group];
        }
        exitGroup = void 0;
      };
    }
    function getToggleIcon() {
      const data = {
        class: [
          `q-focusable relative-position cursor-pointer${props.denseToggle === true && props.switchToggleSide === true ? " items-end" : ""}`,
          props.expandIconClass
        ],
        side: props.switchToggleSide !== true,
        avatar: props.switchToggleSide
      };
      const child = [
        h(QIcon, {
          class: "q-expansion-item__toggle-icon" + (props.expandedIcon === void 0 && showing.value === true ? " q-expansion-item__toggle-icon--rotated" : ""),
          name: expansionIcon.value
        })
      ];
      if (activeToggleIcon.value === true) {
        Object.assign(data, {
          tabindex: 0,
          ...toggleAriaAttrs.value,
          onClick: toggleIcon,
          onKeyup: toggleIconKeyboard
        });
        child.unshift(
          h("div", {
            ref: blurTargetRef,
            class: "q-expansion-item__toggle-focus q-icon q-focus-helper q-focus-helper--rounded",
            tabindex: -1
          })
        );
      }
      return h(QItemSection, data, () => child);
    }
    function getHeaderChild() {
      let child;
      if (slots.header !== void 0) {
        child = [].concat(slots.header(headerSlotScope.value));
      } else {
        child = [
          h(QItemSection, () => [
            h(QItemLabel, { lines: props.labelLines }, () => props.label || ""),
            props.caption ? h(QItemLabel, { lines: props.captionLines, caption: true }, () => props.caption) : null
          ])
        ];
        props.icon && child[props.switchToggleSide === true ? "push" : "unshift"](
          h(QItemSection, {
            side: props.switchToggleSide === true,
            avatar: props.switchToggleSide !== true
          }, () => h(QIcon, { name: props.icon }))
        );
      }
      if (props.disable !== true && props.hideExpandIcon !== true) {
        child[props.switchToggleSide === true ? "unshift" : "push"](
          getToggleIcon()
        );
      }
      return child;
    }
    function getHeader() {
      const data = {
        ref: "item",
        style: props.headerStyle,
        class: props.headerClass,
        dark: isDark.value,
        disable: props.disable,
        dense: props.dense,
        insetLevel: props.headerInsetLevel
      };
      if (isClickable.value === true) {
        data.clickable = true;
        data.onClick = onHeaderClick;
        Object.assign(
          data,
          hasLink.value === true ? linkProps.value : toggleAriaAttrs.value
        );
      }
      return h(QItem, data, getHeaderChild);
    }
    function getTransitionChild() {
      return withDirectives(
        h("div", {
          key: "e-content",
          class: "q-expansion-item__content relative-position",
          style: contentStyle.value,
          id: targetUid.value
        }, hSlot(slots.default)),
        [[
          vShow,
          showing.value
        ]]
      );
    }
    function getContent() {
      const node = [
        getHeader(),
        h(QSlideTransition, {
          duration: props.duration,
          onShow,
          onHide
        }, getTransitionChild)
      ];
      if (props.expandSeparator === true) {
        node.push(
          h(QSeparator, {
            class: "q-expansion-item__border q-expansion-item__border--top absolute-top",
            dark: isDark.value
          }),
          h(QSeparator, {
            class: "q-expansion-item__border q-expansion-item__border--bottom absolute-bottom",
            dark: isDark.value
          })
        );
      }
      return node;
    }
    props.group !== void 0 && enterGroup();
    onBeforeUnmount(() => {
      exitGroup?.();
    });
    return () => h("div", { class: classes.value }, [
      h("div", { class: "q-expansion-item__container relative-position" }, getContent())
    ]);
  }
});
export {
  QExpansionItem as Q
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUUV4cGFuc2lvbkl0ZW0tRFdtQnVEVWouanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvc2xpZGUtdHJhbnNpdGlvbi9RU2xpZGVUcmFuc2l0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9leHBhbnNpb24taXRlbS9RRXhwYW5zaW9uSXRlbS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBoLCBvbkJlZm9yZVVubW91bnQsIFRyYW5zaXRpb24gfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FTbGlkZVRyYW5zaXRpb24nLFxuXG4gIHByb3BzOiB7XG4gICAgYXBwZWFyOiBCb29sZWFuLFxuICAgIGR1cmF0aW9uOiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICBkZWZhdWx0OiAzMDBcbiAgICB9XG4gIH0sXG5cbiAgZW1pdHM6IFsgJ3Nob3cnLCAnaGlkZScgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQgfSkge1xuICAgIGxldCBhbmltYXRpbmcgPSBmYWxzZSwgZG9uZUZuLCBlbGVtZW50XG4gICAgbGV0IHRpbWVyID0gbnVsbCwgdGltZXJGYWxsYmFjayA9IG51bGwsIGFuaW1MaXN0ZW5lciwgbGFzdEV2ZW50XG5cbiAgICBmdW5jdGlvbiBjbGVhbnVwICgpIHtcbiAgICAgIGRvbmVGbj8uKClcbiAgICAgIGRvbmVGbiA9IG51bGxcbiAgICAgIGFuaW1hdGluZyA9IGZhbHNlXG5cbiAgICAgIGlmICh0aW1lciAhPT0gbnVsbCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgICAgIHRpbWVyID0gbnVsbFxuICAgICAgfVxuXG4gICAgICBpZiAodGltZXJGYWxsYmFjayAhPT0gbnVsbCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZXJGYWxsYmFjaylcbiAgICAgICAgdGltZXJGYWxsYmFjayA9IG51bGxcbiAgICAgIH1cblxuICAgICAgZWxlbWVudD8ucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGFuaW1MaXN0ZW5lcilcbiAgICAgIGFuaW1MaXN0ZW5lciA9IG51bGxcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBiZWdpbiAoZWwsIGhlaWdodCwgZG9uZSkge1xuICAgICAgLy8gaGVyZSBvdmVyZmxvd1kgaXMgJ2hpZGRlbidcbiAgICAgIGlmIChoZWlnaHQgIT09IHZvaWQgMCkge1xuICAgICAgICBlbC5zdHlsZS5oZWlnaHQgPSBgJHsgaGVpZ2h0IH1weGBcbiAgICAgIH1cbiAgICAgIGVsLnN0eWxlLnRyYW5zaXRpb24gPSBgaGVpZ2h0ICR7IHByb3BzLmR1cmF0aW9uIH1tcyBjdWJpYy1iZXppZXIoLjI1LCAuOCwgLjUwLCAxKWBcblxuICAgICAgYW5pbWF0aW5nID0gdHJ1ZVxuICAgICAgZG9uZUZuID0gZG9uZVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVuZCAoZWwsIGV2ZW50KSB7XG4gICAgICBlbC5zdHlsZS5vdmVyZmxvd1kgPSBudWxsXG4gICAgICBlbC5zdHlsZS5oZWlnaHQgPSBudWxsXG4gICAgICBlbC5zdHlsZS50cmFuc2l0aW9uID0gbnVsbFxuICAgICAgY2xlYW51cCgpXG4gICAgICBldmVudCAhPT0gbGFzdEV2ZW50ICYmIGVtaXQoZXZlbnQpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25FbnRlciAoZWwsIGRvbmUpIHtcbiAgICAgIGxldCBwb3MgPSAwXG4gICAgICBlbGVtZW50ID0gZWxcblxuICAgICAgLy8gaWYgYW5pbWF0aW9uZyBvdmVyZmxvd1kgaXMgYWxyZWFkeSAnaGlkZGVuJ1xuICAgICAgaWYgKGFuaW1hdGluZyA9PT0gdHJ1ZSkge1xuICAgICAgICBjbGVhbnVwKClcbiAgICAgICAgcG9zID0gZWwub2Zmc2V0SGVpZ2h0ID09PSBlbC5zY3JvbGxIZWlnaHQgPyAwIDogdm9pZCAwXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgbGFzdEV2ZW50ID0gJ2hpZGUnXG4gICAgICAgIGVsLnN0eWxlLm92ZXJmbG93WSA9ICdoaWRkZW4nXG4gICAgICB9XG5cbiAgICAgIGJlZ2luKGVsLCBwb3MsIGRvbmUpXG5cbiAgICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRpbWVyID0gbnVsbFxuICAgICAgICBlbC5zdHlsZS5oZWlnaHQgPSBgJHsgZWwuc2Nyb2xsSGVpZ2h0IH1weGBcbiAgICAgICAgYW5pbUxpc3RlbmVyID0gZXZ0ID0+IHtcbiAgICAgICAgICB0aW1lckZhbGxiYWNrID0gbnVsbFxuXG4gICAgICAgICAgaWYgKE9iamVjdChldnQpICE9PSBldnQgfHwgZXZ0LnRhcmdldCA9PT0gZWwpIHtcbiAgICAgICAgICAgIGVuZChlbCwgJ3Nob3cnKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgYW5pbUxpc3RlbmVyKVxuICAgICAgICB0aW1lckZhbGxiYWNrID0gc2V0VGltZW91dChhbmltTGlzdGVuZXIsIHByb3BzLmR1cmF0aW9uICogMS4xKVxuICAgICAgfSwgMTAwKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTGVhdmUgKGVsLCBkb25lKSB7XG4gICAgICBsZXQgcG9zXG4gICAgICBlbGVtZW50ID0gZWxcblxuICAgICAgaWYgKGFuaW1hdGluZyA9PT0gdHJ1ZSkge1xuICAgICAgICBjbGVhbnVwKClcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBsYXN0RXZlbnQgPSAnc2hvdydcbiAgICAgICAgLy8gd2UgbmVlZCB0byBzZXQgb3ZlcmZsb3dZICdoaWRkZW4nIGJlZm9yZSBjYWxjdWxhdGluZyB0aGUgaGVpZ2h0XG4gICAgICAgIC8vIG9yIGVsc2Ugd2UgZ2V0IHNtYWxsIGRpZmZlcmVuY2VzXG4gICAgICAgIGVsLnN0eWxlLm92ZXJmbG93WSA9ICdoaWRkZW4nXG4gICAgICAgIHBvcyA9IGVsLnNjcm9sbEhlaWdodFxuICAgICAgfVxuXG4gICAgICBiZWdpbihlbCwgcG9zLCBkb25lKVxuXG4gICAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aW1lciA9IG51bGxcbiAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gMFxuICAgICAgICBhbmltTGlzdGVuZXIgPSBldnQgPT4ge1xuICAgICAgICAgIHRpbWVyRmFsbGJhY2sgPSBudWxsXG5cbiAgICAgICAgICBpZiAoT2JqZWN0KGV2dCkgIT09IGV2dCB8fCBldnQudGFyZ2V0ID09PSBlbCkge1xuICAgICAgICAgICAgZW5kKGVsLCAnaGlkZScpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBhbmltTGlzdGVuZXIpXG4gICAgICAgIHRpbWVyRmFsbGJhY2sgPSBzZXRUaW1lb3V0KGFuaW1MaXN0ZW5lciwgcHJvcHMuZHVyYXRpb24gKiAxLjEpXG4gICAgICB9LCAxMDApXG4gICAgfVxuXG4gICAgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICAgIGFuaW1hdGluZyA9PT0gdHJ1ZSAmJiBjbGVhbnVwKClcbiAgICB9KVxuXG4gICAgcmV0dXJuICgpID0+IGgoVHJhbnNpdGlvbiwge1xuICAgICAgY3NzOiBmYWxzZSxcbiAgICAgIGFwcGVhcjogcHJvcHMuYXBwZWFyLFxuICAgICAgb25FbnRlcixcbiAgICAgIG9uTGVhdmVcbiAgICB9LCBzbG90cy5kZWZhdWx0KVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgc2hhbGxvd1JlYWN0aXZlLCByZWYsIGNvbXB1dGVkLCB3YXRjaCwgd2l0aERpcmVjdGl2ZXMsIGdldEN1cnJlbnRJbnN0YW5jZSwgdlNob3csIG9uQmVmb3JlVW5tb3VudCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFFJdGVtIGZyb20gJy4uL2l0ZW0vUUl0ZW0uanMnXG5pbXBvcnQgUUl0ZW1TZWN0aW9uIGZyb20gJy4uL2l0ZW0vUUl0ZW1TZWN0aW9uLmpzJ1xuaW1wb3J0IFFJdGVtTGFiZWwgZnJvbSAnLi4vaXRlbS9RSXRlbUxhYmVsLmpzJ1xuaW1wb3J0IFFJY29uIGZyb20gJy4uL2ljb24vUUljb24uanMnXG5pbXBvcnQgUVNsaWRlVHJhbnNpdGlvbiBmcm9tICcuLi9zbGlkZS10cmFuc2l0aW9uL1FTbGlkZVRyYW5zaXRpb24uanMnXG5pbXBvcnQgUVNlcGFyYXRvciBmcm9tICcuLi9zZXBhcmF0b3IvUVNlcGFyYXRvci5qcydcblxuaW1wb3J0IHVzZURhcmssIHsgdXNlRGFya1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtZGFyay91c2UtZGFyay5qcydcbmltcG9ydCB1c2VJZCBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy91c2UtaWQvdXNlLWlkLmpzJ1xuaW1wb3J0IHsgdXNlUm91dGVyTGlua1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2Utcm91dGVyLWxpbmsvdXNlLXJvdXRlci1saW5rLmpzJ1xuaW1wb3J0IHVzZU1vZGVsVG9nZ2xlLCB7IHVzZU1vZGVsVG9nZ2xlUHJvcHMsIHVzZU1vZGVsVG9nZ2xlRW1pdHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1tb2RlbC10b2dnbGUvdXNlLW1vZGVsLXRvZ2dsZS5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgc3RvcEFuZFByZXZlbnQgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC9ldmVudC5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5yZW5kZXIvcmVuZGVyLmpzJ1xuaW1wb3J0IHVpZCBmcm9tICcuLi8uLi91dGlscy91aWQvdWlkLmpzJ1xuXG5jb25zdCBpdGVtR3JvdXBzID0gc2hhbGxvd1JlYWN0aXZlKHt9KVxuY29uc3QgTElOS19QUk9QUyA9IE9iamVjdC5rZXlzKHVzZVJvdXRlckxpbmtQcm9wcylcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FFeHBhbnNpb25JdGVtJyxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZVJvdXRlckxpbmtQcm9wcyxcbiAgICAuLi51c2VNb2RlbFRvZ2dsZVByb3BzLFxuICAgIC4uLnVzZURhcmtQcm9wcyxcblxuICAgIGljb246IFN0cmluZyxcblxuICAgIGxhYmVsOiBTdHJpbmcsXG4gICAgbGFiZWxMaW5lczogWyBOdW1iZXIsIFN0cmluZyBdLFxuXG4gICAgY2FwdGlvbjogU3RyaW5nLFxuICAgIGNhcHRpb25MaW5lczogWyBOdW1iZXIsIFN0cmluZyBdLFxuXG4gICAgZGVuc2U6IEJvb2xlYW4sXG5cbiAgICB0b2dnbGVBcmlhTGFiZWw6IFN0cmluZyxcbiAgICBleHBhbmRJY29uOiBTdHJpbmcsXG4gICAgZXhwYW5kZWRJY29uOiBTdHJpbmcsXG4gICAgZXhwYW5kSWNvbkNsYXNzOiBbIEFycmF5LCBTdHJpbmcsIE9iamVjdCBdLFxuICAgIGR1cmF0aW9uOiB7fSxcblxuICAgIGhlYWRlckluc2V0TGV2ZWw6IE51bWJlcixcbiAgICBjb250ZW50SW5zZXRMZXZlbDogTnVtYmVyLFxuXG4gICAgZXhwYW5kU2VwYXJhdG9yOiBCb29sZWFuLFxuICAgIGRlZmF1bHRPcGVuZWQ6IEJvb2xlYW4sXG4gICAgaGlkZUV4cGFuZEljb246IEJvb2xlYW4sXG4gICAgZXhwYW5kSWNvblRvZ2dsZTogQm9vbGVhbixcbiAgICBzd2l0Y2hUb2dnbGVTaWRlOiBCb29sZWFuLFxuICAgIGRlbnNlVG9nZ2xlOiBCb29sZWFuLFxuICAgIGdyb3VwOiBTdHJpbmcsXG4gICAgcG9wdXA6IEJvb2xlYW4sXG5cbiAgICBoZWFkZXJTdHlsZTogWyBBcnJheSwgU3RyaW5nLCBPYmplY3QgXSxcbiAgICBoZWFkZXJDbGFzczogWyBBcnJheSwgU3RyaW5nLCBPYmplY3QgXVxuICB9LFxuXG4gIGVtaXRzOiBbXG4gICAgLi4udXNlTW9kZWxUb2dnbGVFbWl0cyxcbiAgICAnY2xpY2snLCAnYWZ0ZXJTaG93JywgJ2FmdGVySGlkZSdcbiAgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQgfSkge1xuICAgIGNvbnN0IHsgcHJveHk6IHsgJHEgfSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCBpc0RhcmsgPSB1c2VEYXJrKHByb3BzLCAkcSlcblxuICAgIGNvbnN0IHNob3dpbmcgPSByZWYoXG4gICAgICBwcm9wcy5tb2RlbFZhbHVlICE9PSBudWxsXG4gICAgICAgID8gcHJvcHMubW9kZWxWYWx1ZVxuICAgICAgICA6IHByb3BzLmRlZmF1bHRPcGVuZWRcbiAgICApXG5cbiAgICBjb25zdCBibHVyVGFyZ2V0UmVmID0gcmVmKG51bGwpXG4gICAgY29uc3QgdGFyZ2V0VWlkID0gdXNlSWQoKVxuXG4gICAgY29uc3QgeyBzaG93LCBoaWRlLCB0b2dnbGUgfSA9IHVzZU1vZGVsVG9nZ2xlKHsgc2hvd2luZyB9KVxuXG4gICAgbGV0IHVuaXF1ZUlkLCBleGl0R3JvdXBcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtZXhwYW5zaW9uLWl0ZW0gcS1pdGVtLXR5cGUnXG4gICAgICArIGAgcS1leHBhbnNpb24taXRlbS0tJHsgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSA/ICdleHBhbmRlZCcgOiAnY29sbGFwc2VkJyB9YFxuICAgICAgKyBgIHEtZXhwYW5zaW9uLWl0ZW0tLSR7IHByb3BzLnBvcHVwID09PSB0cnVlID8gJ3BvcHVwJyA6ICdzdGFuZGFyZCcgfWBcbiAgICApXG5cbiAgICBjb25zdCBjb250ZW50U3R5bGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBpZiAocHJvcHMuY29udGVudEluc2V0TGV2ZWwgPT09IHZvaWQgMCkge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgfVxuXG4gICAgICBjb25zdCBkaXIgPSAkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/ICdSaWdodCcgOiAnTGVmdCdcbiAgICAgIHJldHVybiB7XG4gICAgICAgIFsgJ3BhZGRpbmcnICsgZGlyIF06IChwcm9wcy5jb250ZW50SW5zZXRMZXZlbCAqIDU2KSArICdweCdcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uc3QgaGFzTGluayA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy5kaXNhYmxlICE9PSB0cnVlICYmIChcbiAgICAgICAgcHJvcHMuaHJlZiAhPT0gdm9pZCAwXG4gICAgICAgIHx8IChwcm9wcy50byAhPT0gdm9pZCAwICYmIHByb3BzLnRvICE9PSBudWxsICYmIHByb3BzLnRvICE9PSAnJylcbiAgICAgIClcbiAgICApXG5cbiAgICBjb25zdCBsaW5rUHJvcHMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBhY2MgPSB7fVxuICAgICAgTElOS19QUk9QUy5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGFjY1sga2V5IF0gPSBwcm9wc1sga2V5IF1cbiAgICAgIH0pXG4gICAgICByZXR1cm4gYWNjXG4gICAgfSlcblxuICAgIGNvbnN0IGlzQ2xpY2thYmxlID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIGhhc0xpbmsudmFsdWUgPT09IHRydWUgfHwgcHJvcHMuZXhwYW5kSWNvblRvZ2dsZSAhPT0gdHJ1ZVxuICAgIClcblxuICAgIGNvbnN0IGV4cGFuc2lvbkljb24gPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5leHBhbmRlZEljb24gIT09IHZvaWQgMCAmJiBzaG93aW5nLnZhbHVlID09PSB0cnVlXG4gICAgICAgID8gcHJvcHMuZXhwYW5kZWRJY29uXG4gICAgICAgIDogcHJvcHMuZXhwYW5kSWNvbiB8fCAkcS5pY29uU2V0LmV4cGFuc2lvbkl0ZW1bIHByb3BzLmRlbnNlVG9nZ2xlID09PSB0cnVlID8gJ2RlbnNlSWNvbicgOiAnaWNvbicgXVxuICAgICkpXG5cbiAgICBjb25zdCBhY3RpdmVUb2dnbGVJY29uID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHByb3BzLmRpc2FibGUgIT09IHRydWUgJiYgKGhhc0xpbmsudmFsdWUgPT09IHRydWUgfHwgcHJvcHMuZXhwYW5kSWNvblRvZ2dsZSA9PT0gdHJ1ZSlcbiAgICApXG5cbiAgICBjb25zdCBoZWFkZXJTbG90U2NvcGUgPSBjb21wdXRlZCgoKSA9PiAoe1xuICAgICAgZXhwYW5kZWQ6IHNob3dpbmcudmFsdWUgPT09IHRydWUsXG4gICAgICBkZXRhaWxzSWQ6IHRhcmdldFVpZC52YWx1ZSxcbiAgICAgIHRvZ2dsZSxcbiAgICAgIHNob3csXG4gICAgICBoaWRlXG4gICAgfSkpXG5cbiAgICBjb25zdCB0b2dnbGVBcmlhQXR0cnMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCB0b2dnbGVBcmlhTGFiZWwgPSBwcm9wcy50b2dnbGVBcmlhTGFiZWwgIT09IHZvaWQgMFxuICAgICAgICA/IHByb3BzLnRvZ2dsZUFyaWFMYWJlbFxuICAgICAgICA6ICRxLmxhbmcubGFiZWxbIHNob3dpbmcudmFsdWUgPT09IHRydWUgPyAnY29sbGFwc2UnIDogJ2V4cGFuZCcgXShwcm9wcy5sYWJlbClcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcm9sZTogJ2J1dHRvbicsXG4gICAgICAgICdhcmlhLWV4cGFuZGVkJzogc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSA/ICd0cnVlJyA6ICdmYWxzZScsXG4gICAgICAgICdhcmlhLWNvbnRyb2xzJzogdGFyZ2V0VWlkLnZhbHVlLFxuICAgICAgICAnYXJpYS1sYWJlbCc6IHRvZ2dsZUFyaWFMYWJlbFxuICAgICAgfVxuICAgIH0pXG5cbiAgICB3YXRjaCgoKSA9PiBwcm9wcy5ncm91cCwgbmFtZSA9PiB7XG4gICAgICBleGl0R3JvdXA/LigpXG4gICAgICBuYW1lICE9PSB2b2lkIDAgJiYgZW50ZXJHcm91cCgpXG4gICAgfSlcblxuICAgIGZ1bmN0aW9uIG9uSGVhZGVyQ2xpY2sgKGUpIHtcbiAgICAgIGhhc0xpbmsudmFsdWUgIT09IHRydWUgJiYgdG9nZ2xlKGUpXG4gICAgICBlbWl0KCdjbGljaycsIGUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9nZ2xlSWNvbktleWJvYXJkIChlKSB7XG4gICAgICBlLmtleUNvZGUgPT09IDEzICYmIHRvZ2dsZUljb24oZSwgdHJ1ZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b2dnbGVJY29uIChlLCBrZXlib2FyZCkge1xuICAgICAgaWYgKGtleWJvYXJkICE9PSB0cnVlICYmIGUucUF2b2lkRm9jdXMgIT09IHRydWUpIHtcbiAgICAgICAgYmx1clRhcmdldFJlZi52YWx1ZT8uZm9jdXMoKVxuICAgICAgfVxuXG4gICAgICB0b2dnbGUoZSlcbiAgICAgIHN0b3BBbmRQcmV2ZW50KGUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25TaG93ICgpIHtcbiAgICAgIGVtaXQoJ2FmdGVyU2hvdycpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25IaWRlICgpIHtcbiAgICAgIGVtaXQoJ2FmdGVySGlkZScpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZW50ZXJHcm91cCAoKSB7XG4gICAgICBpZiAodW5pcXVlSWQgPT09IHZvaWQgMCkge1xuICAgICAgICB1bmlxdWVJZCA9IHVpZCgpXG4gICAgICB9XG5cbiAgICAgIGlmIChzaG93aW5nLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGl0ZW1Hcm91cHNbIHByb3BzLmdyb3VwIF0gPSB1bmlxdWVJZFxuICAgICAgfVxuXG4gICAgICBjb25zdCBzaG93ID0gd2F0Y2goc2hvd2luZywgdmFsID0+IHtcbiAgICAgICAgaWYgKHZhbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGl0ZW1Hcm91cHNbIHByb3BzLmdyb3VwIF0gPSB1bmlxdWVJZFxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGl0ZW1Hcm91cHNbIHByb3BzLmdyb3VwIF0gPT09IHVuaXF1ZUlkKSB7XG4gICAgICAgICAgZGVsZXRlIGl0ZW1Hcm91cHNbIHByb3BzLmdyb3VwIF1cbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgY29uc3QgZ3JvdXAgPSB3YXRjaChcbiAgICAgICAgKCkgPT4gaXRlbUdyb3Vwc1sgcHJvcHMuZ3JvdXAgXSxcbiAgICAgICAgKHZhbCwgb2xkVmFsKSA9PiB7XG4gICAgICAgICAgaWYgKG9sZFZhbCA9PT0gdW5pcXVlSWQgJiYgdmFsICE9PSB2b2lkIDAgJiYgdmFsICE9PSB1bmlxdWVJZCkge1xuICAgICAgICAgICAgaGlkZSgpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApXG5cbiAgICAgIGV4aXRHcm91cCA9ICgpID0+IHtcbiAgICAgICAgc2hvdygpXG4gICAgICAgIGdyb3VwKClcblxuICAgICAgICBpZiAoaXRlbUdyb3Vwc1sgcHJvcHMuZ3JvdXAgXSA9PT0gdW5pcXVlSWQpIHtcbiAgICAgICAgICBkZWxldGUgaXRlbUdyb3Vwc1sgcHJvcHMuZ3JvdXAgXVxuICAgICAgICB9XG5cbiAgICAgICAgZXhpdEdyb3VwID0gdm9pZCAwXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VG9nZ2xlSWNvbiAoKSB7XG4gICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICBjbGFzczogW1xuICAgICAgICAgICdxLWZvY3VzYWJsZSByZWxhdGl2ZS1wb3NpdGlvbiBjdXJzb3ItcG9pbnRlcidcbiAgICAgICAgICAgICsgYCR7IHByb3BzLmRlbnNlVG9nZ2xlID09PSB0cnVlICYmIHByb3BzLnN3aXRjaFRvZ2dsZVNpZGUgPT09IHRydWUgPyAnIGl0ZW1zLWVuZCcgOiAnJyB9YCxcbiAgICAgICAgICBwcm9wcy5leHBhbmRJY29uQ2xhc3NcbiAgICAgICAgXSxcbiAgICAgICAgc2lkZTogcHJvcHMuc3dpdGNoVG9nZ2xlU2lkZSAhPT0gdHJ1ZSxcbiAgICAgICAgYXZhdGFyOiBwcm9wcy5zd2l0Y2hUb2dnbGVTaWRlXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNoaWxkID0gW1xuICAgICAgICBoKFFJY29uLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLWV4cGFuc2lvbi1pdGVtX190b2dnbGUtaWNvbidcbiAgICAgICAgICAgICsgKHByb3BzLmV4cGFuZGVkSWNvbiA9PT0gdm9pZCAwICYmIHNob3dpbmcudmFsdWUgPT09IHRydWVcbiAgICAgICAgICAgICAgPyAnIHEtZXhwYW5zaW9uLWl0ZW1fX3RvZ2dsZS1pY29uLS1yb3RhdGVkJ1xuICAgICAgICAgICAgICA6ICcnKSxcbiAgICAgICAgICBuYW1lOiBleHBhbnNpb25JY29uLnZhbHVlXG4gICAgICAgIH0pXG4gICAgICBdXG5cbiAgICAgIGlmIChhY3RpdmVUb2dnbGVJY29uLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24oZGF0YSwge1xuICAgICAgICAgIHRhYmluZGV4OiAwLFxuICAgICAgICAgIC4uLnRvZ2dsZUFyaWFBdHRycy52YWx1ZSxcbiAgICAgICAgICBvbkNsaWNrOiB0b2dnbGVJY29uLFxuICAgICAgICAgIG9uS2V5dXA6IHRvZ2dsZUljb25LZXlib2FyZFxuICAgICAgICB9KVxuXG4gICAgICAgIGNoaWxkLnVuc2hpZnQoXG4gICAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgICAgcmVmOiBibHVyVGFyZ2V0UmVmLFxuICAgICAgICAgICAgY2xhc3M6ICdxLWV4cGFuc2lvbi1pdGVtX190b2dnbGUtZm9jdXMgcS1pY29uIHEtZm9jdXMtaGVscGVyIHEtZm9jdXMtaGVscGVyLS1yb3VuZGVkJyxcbiAgICAgICAgICAgIHRhYmluZGV4OiAtMVxuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGgoUUl0ZW1TZWN0aW9uLCBkYXRhLCAoKSA9PiBjaGlsZClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRIZWFkZXJDaGlsZCAoKSB7XG4gICAgICBsZXQgY2hpbGRcblxuICAgICAgaWYgKHNsb3RzLmhlYWRlciAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGNoaWxkID0gW10uY29uY2F0KHNsb3RzLmhlYWRlcihoZWFkZXJTbG90U2NvcGUudmFsdWUpKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNoaWxkID0gW1xuICAgICAgICAgIGgoUUl0ZW1TZWN0aW9uLCAoKSA9PiBbXG4gICAgICAgICAgICBoKFFJdGVtTGFiZWwsIHsgbGluZXM6IHByb3BzLmxhYmVsTGluZXMgfSwgKCkgPT4gcHJvcHMubGFiZWwgfHwgJycpLFxuXG4gICAgICAgICAgICBwcm9wcy5jYXB0aW9uXG4gICAgICAgICAgICAgID8gaChRSXRlbUxhYmVsLCB7IGxpbmVzOiBwcm9wcy5jYXB0aW9uTGluZXMsIGNhcHRpb246IHRydWUgfSwgKCkgPT4gcHJvcHMuY2FwdGlvbilcbiAgICAgICAgICAgICAgOiBudWxsXG4gICAgICAgICAgXSlcbiAgICAgICAgXVxuXG4gICAgICAgIHByb3BzLmljb24gJiYgY2hpbGRbIHByb3BzLnN3aXRjaFRvZ2dsZVNpZGUgPT09IHRydWUgPyAncHVzaCcgOiAndW5zaGlmdCcgXShcbiAgICAgICAgICBoKFFJdGVtU2VjdGlvbiwge1xuICAgICAgICAgICAgc2lkZTogcHJvcHMuc3dpdGNoVG9nZ2xlU2lkZSA9PT0gdHJ1ZSxcbiAgICAgICAgICAgIGF2YXRhcjogcHJvcHMuc3dpdGNoVG9nZ2xlU2lkZSAhPT0gdHJ1ZVxuICAgICAgICAgIH0sICgpID0+IGgoUUljb24sIHsgbmFtZTogcHJvcHMuaWNvbiB9KSlcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZSAmJiBwcm9wcy5oaWRlRXhwYW5kSWNvbiAhPT0gdHJ1ZSkge1xuICAgICAgICBjaGlsZFsgcHJvcHMuc3dpdGNoVG9nZ2xlU2lkZSA9PT0gdHJ1ZSA/ICd1bnNoaWZ0JyA6ICdwdXNoJyBdKFxuICAgICAgICAgIGdldFRvZ2dsZUljb24oKVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjaGlsZFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEhlYWRlciAoKSB7XG4gICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICByZWY6ICdpdGVtJyxcbiAgICAgICAgc3R5bGU6IHByb3BzLmhlYWRlclN0eWxlLFxuICAgICAgICBjbGFzczogcHJvcHMuaGVhZGVyQ2xhc3MsXG4gICAgICAgIGRhcms6IGlzRGFyay52YWx1ZSxcbiAgICAgICAgZGlzYWJsZTogcHJvcHMuZGlzYWJsZSxcbiAgICAgICAgZGVuc2U6IHByb3BzLmRlbnNlLFxuICAgICAgICBpbnNldExldmVsOiBwcm9wcy5oZWFkZXJJbnNldExldmVsXG4gICAgICB9XG5cbiAgICAgIGlmIChpc0NsaWNrYWJsZS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBkYXRhLmNsaWNrYWJsZSA9IHRydWVcbiAgICAgICAgZGF0YS5vbkNsaWNrID0gb25IZWFkZXJDbGlja1xuXG4gICAgICAgIE9iamVjdC5hc3NpZ24oXG4gICAgICAgICAgZGF0YSxcbiAgICAgICAgICBoYXNMaW5rLnZhbHVlID09PSB0cnVlID8gbGlua1Byb3BzLnZhbHVlIDogdG9nZ2xlQXJpYUF0dHJzLnZhbHVlXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGgoUUl0ZW0sIGRhdGEsIGdldEhlYWRlckNoaWxkKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFRyYW5zaXRpb25DaGlsZCAoKSB7XG4gICAgICByZXR1cm4gd2l0aERpcmVjdGl2ZXMoXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICBrZXk6ICdlLWNvbnRlbnQnLFxuICAgICAgICAgIGNsYXNzOiAncS1leHBhbnNpb24taXRlbV9fY29udGVudCByZWxhdGl2ZS1wb3NpdGlvbicsXG4gICAgICAgICAgc3R5bGU6IGNvbnRlbnRTdHlsZS52YWx1ZSxcbiAgICAgICAgICBpZDogdGFyZ2V0VWlkLnZhbHVlXG4gICAgICAgIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKSxcbiAgICAgICAgWyBbXG4gICAgICAgICAgdlNob3csXG4gICAgICAgICAgc2hvd2luZy52YWx1ZVxuICAgICAgICBdIF1cbiAgICAgIClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRDb250ZW50ICgpIHtcbiAgICAgIGNvbnN0IG5vZGUgPSBbXG4gICAgICAgIGdldEhlYWRlcigpLFxuXG4gICAgICAgIGgoUVNsaWRlVHJhbnNpdGlvbiwge1xuICAgICAgICAgIGR1cmF0aW9uOiBwcm9wcy5kdXJhdGlvbixcbiAgICAgICAgICBvblNob3csXG4gICAgICAgICAgb25IaWRlXG4gICAgICAgIH0sIGdldFRyYW5zaXRpb25DaGlsZClcbiAgICAgIF1cblxuICAgICAgaWYgKHByb3BzLmV4cGFuZFNlcGFyYXRvciA9PT0gdHJ1ZSkge1xuICAgICAgICBub2RlLnB1c2goXG4gICAgICAgICAgaChRU2VwYXJhdG9yLCB7XG4gICAgICAgICAgICBjbGFzczogJ3EtZXhwYW5zaW9uLWl0ZW1fX2JvcmRlciBxLWV4cGFuc2lvbi1pdGVtX19ib3JkZXItLXRvcCBhYnNvbHV0ZS10b3AnLFxuICAgICAgICAgICAgZGFyazogaXNEYXJrLnZhbHVlXG4gICAgICAgICAgfSksXG4gICAgICAgICAgaChRU2VwYXJhdG9yLCB7XG4gICAgICAgICAgICBjbGFzczogJ3EtZXhwYW5zaW9uLWl0ZW1fX2JvcmRlciBxLWV4cGFuc2lvbi1pdGVtX19ib3JkZXItLWJvdHRvbSBhYnNvbHV0ZS1ib3R0b20nLFxuICAgICAgICAgICAgZGFyazogaXNEYXJrLnZhbHVlXG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbm9kZVxuICAgIH1cblxuICAgIHByb3BzLmdyb3VwICE9PSB2b2lkIDAgJiYgZW50ZXJHcm91cCgpXG5cbiAgICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgICAgZXhpdEdyb3VwPy4oKVxuICAgIH0pXG5cbiAgICByZXR1cm4gKCkgPT4gaCgnZGl2JywgeyBjbGFzczogY2xhc3Nlcy52YWx1ZSB9LCBbXG4gICAgICBoKCdkaXYnLCB7IGNsYXNzOiAncS1leHBhbnNpb24taXRlbV9fY29udGFpbmVyIHJlbGF0aXZlLXBvc2l0aW9uJyB9LCBnZXRDb250ZW50KCkpXG4gICAgXSlcbiAgfVxufSlcbiJdLCJuYW1lcyI6WyJzaG93Il0sIm1hcHBpbmdzIjoiOztBQUlBLE1BQUEsbUJBQWUsZ0JBQWdCO0FBQUEsRUFDN0IsTUFBTTtBQUFBLEVBRU4sT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsVUFBVTtBQUFBLE1BQ1IsTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLElBQ2Y7QUFBQSxFQUNHO0FBQUEsRUFFRCxPQUFPLENBQUUsUUFBUSxNQUFRO0FBQUEsRUFFekIsTUFBTyxPQUFPLEVBQUUsT0FBTyxLQUFJLEdBQUk7QUFDN0IsUUFBSSxZQUFZLE9BQU8sUUFBUTtBQUMvQixRQUFJLFFBQVEsTUFBTSxnQkFBZ0IsTUFBTSxjQUFjO0FBRXRELGFBQVMsVUFBVztBQUNsQixlQUFNO0FBQ04sZUFBUztBQUNULGtCQUFZO0FBRVosVUFBSSxVQUFVLE1BQU07QUFDbEIscUJBQWEsS0FBSztBQUNsQixnQkFBUTtBQUFBLE1BQ2hCO0FBRU0sVUFBSSxrQkFBa0IsTUFBTTtBQUMxQixxQkFBYSxhQUFhO0FBQzFCLHdCQUFnQjtBQUFBLE1BQ3hCO0FBRU0sZUFBUyxvQkFBb0IsaUJBQWlCLFlBQVk7QUFDMUQscUJBQWU7QUFBQSxJQUNyQjtBQUVJLGFBQVMsTUFBTyxJQUFJLFFBQVEsTUFBTTtBQUVoQyxVQUFJLFdBQVcsUUFBUTtBQUNyQixXQUFHLE1BQU0sU0FBUyxHQUFJLE1BQU07QUFBQSxNQUNwQztBQUNNLFNBQUcsTUFBTSxhQUFhLFVBQVcsTUFBTTtBQUV2QyxrQkFBWTtBQUNaLGVBQVM7QUFBQSxJQUNmO0FBRUks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
