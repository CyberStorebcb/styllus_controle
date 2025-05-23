import { bf as Platform } from "./index-DTRxxbQ7.js";
function clearSelection() {
  if (window.getSelection !== void 0) {
    const selection = window.getSelection();
    if (selection.empty !== void 0) {
      selection.empty();
    } else if (selection.removeAllRanges !== void 0) {
      selection.removeAllRanges();
      Platform.is.mobile !== true && selection.addRange(document.createRange());
    }
  } else if (document.selection !== void 0) {
    document.selection.empty();
  }
}
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function between(v, min, max) {
  return max <= min ? min : Math.min(max, Math.max(min, v));
}
function normalizeToInterval(v, min, max) {
  if (max <= min) {
    return min;
  }
  const size = max - min + 1;
  let index = min + (v - min) % size;
  if (index < min) {
    index = size + index;
  }
  return index === 0 ? 0 : index;
}
function pad(v, length = 2, char = "0") {
  if (v === void 0 || v === null) {
    return v;
  }
  const val = "" + v;
  return val.length >= length ? val : new Array(length - val.length + 1).join(char) + val;
}
export {
  capitalize as a,
  between as b,
  clearSelection as c,
  normalizeToInterval as n,
  pad as p
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0LUI4LVhZTEVILmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9wcml2YXRlLnNlbGVjdGlvbi9zZWxlY3Rpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9mb3JtYXQvZm9ybWF0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQbGF0Zm9ybSBmcm9tICcuLi8uLi9wbHVnaW5zL3BsYXRmb3JtL1BsYXRmb3JtLmpzJ1xuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJTZWxlY3Rpb24gKCkge1xuICBpZiAod2luZG93LmdldFNlbGVjdGlvbiAhPT0gdm9pZCAwKSB7XG4gICAgY29uc3Qgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpXG4gICAgaWYgKHNlbGVjdGlvbi5lbXB0eSAhPT0gdm9pZCAwKSB7XG4gICAgICBzZWxlY3Rpb24uZW1wdHkoKVxuICAgIH1cbiAgICBlbHNlIGlmIChzZWxlY3Rpb24ucmVtb3ZlQWxsUmFuZ2VzICE9PSB2b2lkIDApIHtcbiAgICAgIHNlbGVjdGlvbi5yZW1vdmVBbGxSYW5nZXMoKVxuICAgICAgUGxhdGZvcm0uaXMubW9iaWxlICE9PSB0cnVlICYmIHNlbGVjdGlvbi5hZGRSYW5nZShkb2N1bWVudC5jcmVhdGVSYW5nZSgpKVxuICAgIH1cbiAgfVxuICBlbHNlIGlmIChkb2N1bWVudC5zZWxlY3Rpb24gIT09IHZvaWQgMCkge1xuICAgIGRvY3VtZW50LnNlbGVjdGlvbi5lbXB0eSgpXG4gIH1cbn1cbiIsImNvbnN0IHVuaXRzID0gWyAnQicsICdLQicsICdNQicsICdHQicsICdUQicsICdQQicgXVxuXG5leHBvcnQgZnVuY3Rpb24gaHVtYW5TdG9yYWdlU2l6ZSAoYnl0ZXMsIGRlY2ltYWxzID0gMSkge1xuICBsZXQgdSA9IDBcblxuICB3aGlsZSAocGFyc2VJbnQoYnl0ZXMsIDEwKSA+PSAxMDI0ICYmIHUgPCB1bml0cy5sZW5ndGggLSAxKSB7XG4gICAgYnl0ZXMgLz0gMTAyNFxuICAgICsrdVxuICB9XG5cbiAgcmV0dXJuIGAkeyBieXRlcy50b0ZpeGVkKGRlY2ltYWxzKSB9JHsgdW5pdHNbIHUgXSB9YFxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FwaXRhbGl6ZSAoc3RyKSB7XG4gIHJldHVybiBzdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJldHdlZW4gKHYsIG1pbiwgbWF4KSB7XG4gIHJldHVybiBtYXggPD0gbWluXG4gICAgPyBtaW5cbiAgICA6IE1hdGgubWluKG1heCwgTWF0aC5tYXgobWluLCB2KSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZVRvSW50ZXJ2YWwgKHYsIG1pbiwgbWF4KSB7XG4gIGlmIChtYXggPD0gbWluKSB7XG4gICAgcmV0dXJuIG1pblxuICB9XG5cbiAgY29uc3Qgc2l6ZSA9IChtYXggLSBtaW4gKyAxKVxuXG4gIGxldCBpbmRleCA9IG1pbiArICh2IC0gbWluKSAlIHNpemVcbiAgaWYgKGluZGV4IDwgbWluKSB7XG4gICAgaW5kZXggPSBzaXplICsgaW5kZXhcbiAgfVxuXG4gIHJldHVybiBpbmRleCA9PT0gMCA/IDAgOiBpbmRleCAvLyBmaXggZm9yICgtYSAlIGEpID0+IC0wXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYWQgKHYsIGxlbmd0aCA9IDIsIGNoYXIgPSAnMCcpIHtcbiAgaWYgKHYgPT09IHZvaWQgMCB8fCB2ID09PSBudWxsKSB7XG4gICAgcmV0dXJuIHZcbiAgfVxuXG4gIGNvbnN0IHZhbCA9ICcnICsgdlxuICByZXR1cm4gdmFsLmxlbmd0aCA+PSBsZW5ndGhcbiAgICA/IHZhbFxuICAgIDogbmV3IEFycmF5KGxlbmd0aCAtIHZhbC5sZW5ndGggKyAxKS5qb2luKGNoYXIpICsgdmFsXG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaHVtYW5TdG9yYWdlU2l6ZSxcbiAgY2FwaXRhbGl6ZSxcbiAgYmV0d2VlbixcbiAgbm9ybWFsaXplVG9JbnRlcnZhbCxcbiAgcGFkXG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVPLFNBQVMsaUJBQWtCO0FBQ2hDLE1BQUksT0FBTyxpQkFBaUIsUUFBUTtBQUNsQyxVQUFNLFlBQVksT0FBTyxhQUFZO0FBQ3JDLFFBQUksVUFBVSxVQUFVLFFBQVE7QUFDOUIsZ0JBQVUsTUFBSztBQUFBLElBQ3JCLFdBQ2EsVUFBVSxvQkFBb0IsUUFBUTtBQUM3QyxnQkFBVSxnQkFBZTtBQUN6QixlQUFTLEdBQUcsV0FBVyxRQUFRLFVBQVUsU0FBUyxTQUFTLFlBQWEsQ0FBQTtBQUFBLElBQzlFO0FBQUEsRUFDQSxXQUNXLFNBQVMsY0FBYyxRQUFRO0FBQ3RDLGFBQVMsVUFBVSxNQUFLO0FBQUEsRUFDNUI7QUFDQTtBQ0hPLFNBQVMsV0FBWSxLQUFLO0FBQy9CLFNBQU8sSUFBSSxPQUFPLENBQUMsRUFBRSxnQkFBZ0IsSUFBSSxNQUFNLENBQUM7QUFDbEQ7QUFFTyxTQUFTLFFBQVMsR0FBRyxLQUFLLEtBQUs7QUFDcEMsU0FBTyxPQUFPLE1BQ1YsTUFDQSxLQUFLLElBQUksS0FBSyxLQUFLLElBQUksS0FBSyxDQUFDLENBQUM7QUFDcEM7QUFFTyxTQUFTLG9CQUFxQixHQUFHLEtBQUssS0FBSztBQUNoRCxNQUFJLE9BQU8sS0FBSztBQUNkLFdBQU87QUFBQSxFQUNYO0FBRUUsUUFBTSxPQUFRLE1BQU0sTUFBTTtBQUUxQixNQUFJLFFBQVEsT0FBTyxJQUFJLE9BQU87QUFDOUIsTUFBSSxRQUFRLEtBQUs7QUFDZixZQUFRLE9BQU87QUFBQSxFQUNuQjtBQUVFLFNBQU8sVUFBVSxJQUFJLElBQUk7QUFDM0I7QUFFTyxTQUFTLElBQUssR0FBRyxTQUFTLEdBQUcsT0FBTyxLQUFLO0FBQzlDLE1BQUksTUFBTSxVQUFVLE1BQU0sTUFBTTtBQUM5QixXQUFPO0FBQUEsRUFDWDtBQUVFLFFBQU0sTUFBTSxLQUFLO0FBQ2pCLFNBQU8sSUFBSSxVQUFVLFNBQ2pCLE1BQ0EsSUFBSSxNQUFNLFNBQVMsSUFBSSxTQUFTLENBQUMsRUFBRSxLQUFLLElBQUksSUFBSTtBQUN0RDsiLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbMCwxXX0=
