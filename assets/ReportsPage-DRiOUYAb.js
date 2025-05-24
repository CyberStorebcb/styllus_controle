import { k as computed, aw as Plugin, ax as isDate, ay as defaultLang, c as createComponent, C as useDarkProps, az as useFormProps, g as getCurrentInstance, E as useDark, aA as useFormAttrs, r as ref, aB as isObject, w as watch, b as nextTick, h, ak as Transition, L as hSlot, aC as useFormInject, a1 as QBtn, aD as injectProp, au as QDialog, _ as _export_sfc, X as createBlock, Y as openBlock, Z as withCtx, a0 as createBaseVNode, $ as createVNode, a6 as QIcon, ad as QInput, a2 as createTextVNode } from "./index-DTRxxbQ7.js";
import { p as pad, a as capitalize } from "./format-B8-XYLEH.js";
import { u as useAnchorProps, a as useAnchor, b as QMenu } from "./QSelect-CxdRDuFh.js";
import { Q as QTable } from "./QTable-BFYSwBK2.js";
import { Q as QPage } from "./QPage-pt9NM7Fr.js";
import { u as useSalesStore } from "./sales-store-BduwSnzu.js";
import "./QList-C--UWoUK.js";
function useRenderCache() {
  let cache = /* @__PURE__ */ Object.create(null);
  return {
    getCache: (key, defaultValue) => cache[key] === void 0 ? cache[key] = typeof defaultValue === "function" ? defaultValue() : defaultValue : cache[key],
    setCache(key, obj) {
      cache[key] = obj;
    },
    hasCache(key) {
      return Object.hasOwnProperty.call(cache, key);
    },
    clearCache(key) {
      if (key !== void 0) {
        delete cache[key];
      } else {
        cache = /* @__PURE__ */ Object.create(null);
      }
    }
  };
}
const breaks = [
  -61,
  9,
  38,
  199,
  426,
  686,
  756,
  818,
  1111,
  1181,
  1210,
  1635,
  2060,
  2097,
  2192,
  2262,
  2324,
  2394,
  2456,
  3178
];
function toJalaali(gy, gm, gd) {
  if (Object.prototype.toString.call(gy) === "[object Date]") {
    gd = gy.getDate();
    gm = gy.getMonth() + 1;
    gy = gy.getFullYear();
  }
  return d2j(g2d(gy, gm, gd));
}
function toGregorian(jy, jm, jd) {
  return d2g(j2d(jy, jm, jd));
}
function isLeapJalaaliYear(jy) {
  return jalCalLeap(jy) === 0;
}
function jalaaliMonthLength(jy, jm) {
  if (jm <= 6) return 31;
  if (jm <= 11) return 30;
  if (isLeapJalaaliYear(jy)) return 30;
  return 29;
}
function jalCalLeap(jy) {
  const bl = breaks.length;
  let jp = breaks[0], jm, jump, leap, n, i;
  if (jy < jp || jy >= breaks[bl - 1]) {
    throw new Error("Invalid Jalaali year " + jy);
  }
  for (i = 1; i < bl; i += 1) {
    jm = breaks[i];
    jump = jm - jp;
    if (jy < jm) {
      break;
    }
    jp = jm;
  }
  n = jy - jp;
  if (jump - n < 6) {
    n = n - jump + div(jump + 4, 33) * 33;
  }
  leap = mod(mod(n + 1, 33) - 1, 4);
  if (leap === -1) {
    leap = 4;
  }
  return leap;
}
function jalCal(jy, withoutLeap) {
  const bl = breaks.length, gy = jy + 621;
  let leapJ = -14, jp = breaks[0], jm, jump, leap, n, i;
  if (jy < jp || jy >= breaks[bl - 1]) {
    throw new Error("Invalid Jalaali year " + jy);
  }
  for (i = 1; i < bl; i += 1) {
    jm = breaks[i];
    jump = jm - jp;
    if (jy < jm) {
      break;
    }
    leapJ = leapJ + div(jump, 33) * 8 + div(mod(jump, 33), 4);
    jp = jm;
  }
  n = jy - jp;
  leapJ = leapJ + div(n, 33) * 8 + div(mod(n, 33) + 3, 4);
  if (mod(jump, 33) === 4 && jump - n === 4) {
    leapJ += 1;
  }
  const leapG = div(gy, 4) - div((div(gy, 100) + 1) * 3, 4) - 150;
  const march = 20 + leapJ - leapG;
  if (!withoutLeap) {
    if (jump - n < 6) {
      n = n - jump + div(jump + 4, 33) * 33;
    }
    leap = mod(mod(n + 1, 33) - 1, 4);
    if (leap === -1) {
      leap = 4;
    }
  }
  return {
    leap,
    gy,
    march
  };
}
function j2d(jy, jm, jd) {
  const r = jalCal(jy, true);
  return g2d(r.gy, 3, r.march) + (jm - 1) * 31 - div(jm, 7) * (jm - 7) + jd - 1;
}
function d2j(jdn) {
  const gy = d2g(jdn).gy;
  let jy = gy - 621, jd, jm, k;
  const r = jalCal(jy, false), jdn1f = g2d(gy, 3, r.march);
  k = jdn - jdn1f;
  if (k >= 0) {
    if (k <= 185) {
      jm = 1 + div(k, 31);
      jd = mod(k, 31) + 1;
      return {
        jy,
        jm,
        jd
      };
    } else {
      k -= 186;
    }
  } else {
    jy -= 1;
    k += 179;
    if (r.leap === 1) {
      k += 1;
    }
  }
  jm = 7 + div(k, 30);
  jd = mod(k, 30) + 1;
  return {
    jy,
    jm,
    jd
  };
}
function g2d(gy, gm, gd) {
  let d = div((gy + div(gm - 8, 6) + 100100) * 1461, 4) + div(153 * mod(gm + 9, 12) + 2, 5) + gd - 34840408;
  d = d - div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) + 752;
  return d;
}
function d2g(jdn) {
  let j = 4 * jdn + 139361631;
  j = j + div(div(4 * jdn + 183187720, 146097) * 3, 4) * 4 - 3908;
  const i = div(mod(j, 1461), 4) * 5 + 308, gd = div(mod(i, 153), 5) + 1, gm = mod(div(i, 153), 12) + 1, gy = div(j, 1461) - 100100 + div(8 - gm, 6);
  return {
    gy,
    gm,
    gd
  };
}
function div(a, b) {
  return ~~(a / b);
}
function mod(a, b) {
  return a - ~~(a / b) * b;
}
const calendars = ["gregorian", "persian"];
const useDatetimeProps = {
  // should define modelValue in the target component
  mask: {
    type: String
  },
  locale: Object,
  calendar: {
    type: String,
    validator: (v) => calendars.includes(v),
    default: "gregorian"
  },
  landscape: Boolean,
  color: String,
  textColor: String,
  square: Boolean,
  flat: Boolean,
  bordered: Boolean,
  readonly: Boolean,
  disable: Boolean
};
const useDatetimeEmits = ["update:modelValue"];
function getDayHash(date2) {
  return date2.year + "/" + pad(date2.month) + "/" + pad(date2.day);
}
function useDatetime(props, $q) {
  const editable = computed(() => {
    return props.disable !== true && props.readonly !== true;
  });
  const tabindex = computed(() => {
    return editable.value === true ? 0 : -1;
  });
  const headerClass = computed(() => {
    const cls = [];
    props.color !== void 0 && cls.push(`bg-${props.color}`);
    props.textColor !== void 0 && cls.push(`text-${props.textColor}`);
    return cls.join(" ");
  });
  function getLocale() {
    return props.locale !== void 0 ? { ...$q.lang.date, ...props.locale } : $q.lang.date;
  }
  function getCurrentDate(dateOnly) {
    const d = /* @__PURE__ */ new Date();
    const timeFill = dateOnly === true ? null : 0;
    if (props.calendar === "persian") {
      const jDate = toJalaali(d);
      return {
        year: jDate.jy,
        month: jDate.jm,
        day: jDate.jd
      };
    }
    return {
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      day: d.getDate(),
      hour: timeFill,
      minute: timeFill,
      second: timeFill,
      millisecond: timeFill
    };
  }
  return {
    editable,
    tabindex,
    headerClass,
    getLocale,
    getCurrentDate
  };
}
const MILLISECONDS_IN_DAY = 864e5, MILLISECONDS_IN_HOUR = 36e5, MILLISECONDS_IN_MINUTE = 6e4, defaultMask = "YYYY-MM-DDTHH:mm:ss.SSSZ", token = /\[((?:[^\]\\]|\\]|\\)*)\]|do|d{1,4}|Mo|M{1,4}|m{1,2}|wo|w{1,2}|Qo|Do|DDDo|D{1,4}|YY(?:YY)?|H{1,2}|h{1,2}|s{1,2}|S{1,3}|Z{1,2}|a{1,2}|[AQExX]/g, reverseToken = /(\[[^\]]*\])|do|d{1,4}|Mo|M{1,4}|m{1,2}|wo|w{1,2}|Qo|Do|DDDo|D{1,4}|YY(?:YY)?|H{1,2}|h{1,2}|s{1,2}|S{1,3}|Z{1,2}|a{1,2}|[AQExX]|([.*+:?^,\s${}()|\\]+)/g, regexStore = {};
function getRegexData(mask, dateLocale) {
  const days = "(" + dateLocale.days.join("|") + ")", key = mask + days;
  if (regexStore[key] !== void 0) {
    return regexStore[key];
  }
  const daysShort = "(" + dateLocale.daysShort.join("|") + ")", months = "(" + dateLocale.months.join("|") + ")", monthsShort = "(" + dateLocale.monthsShort.join("|") + ")";
  const map = {};
  let index = 0;
  const regexText = mask.replace(reverseToken, (match) => {
    index++;
    switch (match) {
      case "YY":
        map.YY = index;
        return "(-?\\d{1,2})";
      case "YYYY":
        map.YYYY = index;
        return "(-?\\d{1,4})";
      case "M":
        map.M = index;
        return "(\\d{1,2})";
      case "Mo":
        map.M = index++;
        return "(\\d{1,2}(st|nd|rd|th))";
      case "MM":
        map.M = index;
        return "(\\d{2})";
      case "MMM":
        map.MMM = index;
        return monthsShort;
      case "MMMM":
        map.MMMM = index;
        return months;
      case "D":
        map.D = index;
        return "(\\d{1,2})";
      case "Do":
        map.D = index++;
        return "(\\d{1,2}(st|nd|rd|th))";
      case "DD":
        map.D = index;
        return "(\\d{2})";
      case "H":
        map.H = index;
        return "(\\d{1,2})";
      case "HH":
        map.H = index;
        return "(\\d{2})";
      case "h":
        map.h = index;
        return "(\\d{1,2})";
      case "hh":
        map.h = index;
        return "(\\d{2})";
      case "m":
        map.m = index;
        return "(\\d{1,2})";
      case "mm":
        map.m = index;
        return "(\\d{2})";
      case "s":
        map.s = index;
        return "(\\d{1,2})";
      case "ss":
        map.s = index;
        return "(\\d{2})";
      case "S":
        map.S = index;
        return "(\\d{1})";
      case "SS":
        map.S = index;
        return "(\\d{2})";
      case "SSS":
        map.S = index;
        return "(\\d{3})";
      case "A":
        map.A = index;
        return "(AM|PM)";
      case "a":
        map.a = index;
        return "(am|pm)";
      case "aa":
        map.aa = index;
        return "(a\\.m\\.|p\\.m\\.)";
      case "ddd":
        return daysShort;
      case "dddd":
        return days;
      case "Q":
      case "d":
      case "E":
        return "(\\d{1})";
      case "do":
        index++;
        return "(\\d{1}(st|nd|rd|th))";
      case "Qo":
        return "(1st|2nd|3rd|4th)";
      case "DDD":
      case "DDDD":
        return "(\\d{1,3})";
      case "DDDo":
        index++;
        return "(\\d{1,3}(st|nd|rd|th))";
      case "w":
        return "(\\d{1,2})";
      case "wo":
        index++;
        return "(\\d{1,2}(st|nd|rd|th))";
      case "ww":
        return "(\\d{2})";
      case "Z":
        map.Z = index;
        return "(Z|[+-]\\d{2}:\\d{2})";
      case "ZZ":
        map.ZZ = index;
        return "(Z|[+-]\\d{2}\\d{2})";
      case "X":
        map.X = index;
        return "(-?\\d+)";
      case "x":
        map.x = index;
        return "(-?\\d{4,})";
      default:
        index--;
        if (match[0] === "[") {
          match = match.substring(1, match.length - 1);
        }
        return match.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
  });
  const res = { map, regex: new RegExp("^" + regexText) };
  regexStore[key] = res;
  return res;
}
function getDateLocale(paramDateLocale, langProps) {
  return paramDateLocale !== void 0 ? paramDateLocale : langProps !== void 0 ? langProps.date : defaultLang.date;
}
function formatTimezone(offset, delimeter = "") {
  const sign = offset > 0 ? "-" : "+", absOffset = Math.abs(offset), hours = Math.floor(absOffset / 60), minutes = absOffset % 60;
  return sign + pad(hours) + delimeter + pad(minutes);
}
function applyYearMonthDayChange(date2, mod2, sign) {
  let year = date2.getFullYear(), month = date2.getMonth();
  const day = date2.getDate();
  if (mod2.year !== void 0) {
    year += sign * mod2.year;
    delete mod2.year;
  }
  if (mod2.month !== void 0) {
    month += sign * mod2.month;
    delete mod2.month;
  }
  date2.setDate(1);
  date2.setMonth(2);
  date2.setFullYear(year);
  date2.setMonth(month);
  date2.setDate(Math.min(day, daysInMonth(date2)));
  if (mod2.date !== void 0) {
    date2.setDate(date2.getDate() + sign * mod2.date);
    delete mod2.date;
  }
  return date2;
}
function applyYearMonthDay(date2, mod2, middle) {
  const year = mod2.year !== void 0 ? mod2.year : date2[`get${middle}FullYear`](), month = mod2.month !== void 0 ? mod2.month - 1 : date2[`get${middle}Month`](), maxDay = new Date(year, month + 1, 0).getDate(), day = Math.min(maxDay, mod2.date !== void 0 ? mod2.date : date2[`get${middle}Date`]());
  date2[`set${middle}Date`](1);
  date2[`set${middle}Month`](2);
  date2[`set${middle}FullYear`](year);
  date2[`set${middle}Month`](month);
  date2[`set${middle}Date`](day);
  delete mod2.year;
  delete mod2.month;
  delete mod2.date;
  return date2;
}
function getChange(date2, rawMod, sign) {
  const mod2 = normalizeMod(rawMod), d = new Date(date2), t = mod2.year !== void 0 || mod2.month !== void 0 || mod2.date !== void 0 ? applyYearMonthDayChange(d, mod2, sign) : d;
  for (const key in mod2) {
    const op = capitalize(key);
    t[`set${op}`](t[`get${op}`]() + sign * mod2[key]);
  }
  return t;
}
function normalizeMod(mod2) {
  const acc = { ...mod2 };
  if (mod2.years !== void 0) {
    acc.year = mod2.years;
    delete acc.years;
  }
  if (mod2.months !== void 0) {
    acc.month = mod2.months;
    delete acc.months;
  }
  if (mod2.days !== void 0) {
    acc.date = mod2.days;
    delete acc.days;
  }
  if (mod2.day !== void 0) {
    acc.date = mod2.day;
    delete acc.day;
  }
  if (mod2.hour !== void 0) {
    acc.hours = mod2.hour;
    delete acc.hour;
  }
  if (mod2.minute !== void 0) {
    acc.minutes = mod2.minute;
    delete acc.minute;
  }
  if (mod2.second !== void 0) {
    acc.seconds = mod2.second;
    delete acc.second;
  }
  if (mod2.millisecond !== void 0) {
    acc.milliseconds = mod2.millisecond;
    delete acc.millisecond;
  }
  return acc;
}
function adjustDate(date2, rawMod, utc) {
  const mod2 = normalizeMod(rawMod), middle = utc === true ? "UTC" : "", d = new Date(date2), t = mod2.year !== void 0 || mod2.month !== void 0 || mod2.date !== void 0 ? applyYearMonthDay(d, mod2, middle) : d;
  for (const key in mod2) {
    const op = key.charAt(0).toUpperCase() + key.slice(1);
    t[`set${middle}${op}`](mod2[key]);
  }
  return t;
}
function extractDate(str, mask, dateLocale) {
  const d = __splitDate(str, mask, dateLocale);
  const date2 = new Date(
    d.year,
    d.month === null ? null : d.month - 1,
    d.day === null ? 1 : d.day,
    d.hour,
    d.minute,
    d.second,
    d.millisecond
  );
  const tzOffset = date2.getTimezoneOffset();
  return d.timezoneOffset === null || d.timezoneOffset === tzOffset ? date2 : getChange(date2, { minutes: d.timezoneOffset - tzOffset }, 1);
}
function __splitDate(str, mask, dateLocale, calendar, defaultModel) {
  const date2 = {
    year: null,
    month: null,
    day: null,
    hour: null,
    minute: null,
    second: null,
    millisecond: null,
    timezoneOffset: null,
    dateHash: null,
    timeHash: null
  };
  defaultModel !== void 0 && Object.assign(date2, defaultModel);
  if (str === void 0 || str === null || str === "" || typeof str !== "string") {
    return date2;
  }
  if (mask === void 0) {
    mask = defaultMask;
  }
  const langOpts = getDateLocale(dateLocale, Plugin.props), months = langOpts.months, monthsShort = langOpts.monthsShort;
  const { regex, map } = getRegexData(mask, langOpts);
  const match = str.match(regex);
  if (match === null) {
    return date2;
  }
  let tzString = "";
  if (map.X !== void 0 || map.x !== void 0) {
    const stamp = parseInt(match[map.X !== void 0 ? map.X : map.x], 10);
    if (isNaN(stamp) === true || stamp < 0) {
      return date2;
    }
    const d = new Date(stamp * (map.X !== void 0 ? 1e3 : 1));
    date2.year = d.getFullYear();
    date2.month = d.getMonth() + 1;
    date2.day = d.getDate();
    date2.hour = d.getHours();
    date2.minute = d.getMinutes();
    date2.second = d.getSeconds();
    date2.millisecond = d.getMilliseconds();
  } else {
    if (map.YYYY !== void 0) {
      date2.year = parseInt(match[map.YYYY], 10);
    } else if (map.YY !== void 0) {
      const y = parseInt(match[map.YY], 10);
      date2.year = y < 0 ? y : 2e3 + y;
    }
    if (map.M !== void 0) {
      date2.month = parseInt(match[map.M], 10);
      if (date2.month < 1 || date2.month > 12) {
        return date2;
      }
    } else if (map.MMM !== void 0) {
      date2.month = monthsShort.indexOf(match[map.MMM]) + 1;
    } else if (map.MMMM !== void 0) {
      date2.month = months.indexOf(match[map.MMMM]) + 1;
    }
    if (map.D !== void 0) {
      date2.day = parseInt(match[map.D], 10);
      if (date2.year === null || date2.month === null || date2.day < 1) {
        return date2;
      }
      const maxDay = calendar !== "persian" ? new Date(date2.year, date2.month, 0).getDate() : jalaaliMonthLength(date2.year, date2.month);
      if (date2.day > maxDay) {
        return date2;
      }
    }
    if (map.H !== void 0) {
      date2.hour = parseInt(match[map.H], 10) % 24;
    } else if (map.h !== void 0) {
      date2.hour = parseInt(match[map.h], 10) % 12;
      if (map.A && match[map.A] === "PM" || map.a && match[map.a] === "pm" || map.aa && match[map.aa] === "p.m.") {
        date2.hour += 12;
      }
      date2.hour = date2.hour % 24;
    }
    if (map.m !== void 0) {
      date2.minute = parseInt(match[map.m], 10) % 60;
    }
    if (map.s !== void 0) {
      date2.second = parseInt(match[map.s], 10) % 60;
    }
    if (map.S !== void 0) {
      date2.millisecond = parseInt(match[map.S], 10) * 10 ** (3 - match[map.S].length);
    }
    if (map.Z !== void 0 || map.ZZ !== void 0) {
      tzString = map.Z !== void 0 ? match[map.Z].replace(":", "") : match[map.ZZ];
      date2.timezoneOffset = (tzString[0] === "+" ? -1 : 1) * (60 * tzString.slice(1, 3) + 1 * tzString.slice(3, 5));
    }
  }
  date2.dateHash = pad(date2.year, 6) + "/" + pad(date2.month) + "/" + pad(date2.day);
  date2.timeHash = pad(date2.hour) + ":" + pad(date2.minute) + ":" + pad(date2.second) + tzString;
  return date2;
}
function isValid(date2) {
  return typeof date2 === "number" ? true : isNaN(Date.parse(date2)) === false;
}
function buildDate(mod2, utc) {
  return adjustDate(/* @__PURE__ */ new Date(), mod2, utc);
}
function getDayOfWeek(date2) {
  const dow = new Date(date2).getDay();
  return dow === 0 ? 7 : dow;
}
function getWeekOfYear(date2) {
  const thursday = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
  thursday.setDate(thursday.getDate() - (thursday.getDay() + 6) % 7 + 3);
  const firstThursday = new Date(thursday.getFullYear(), 0, 4);
  firstThursday.setDate(firstThursday.getDate() - (firstThursday.getDay() + 6) % 7 + 3);
  const ds = thursday.getTimezoneOffset() - firstThursday.getTimezoneOffset();
  thursday.setHours(thursday.getHours() - ds);
  const weekDiff = (thursday - firstThursday) / (MILLISECONDS_IN_DAY * 7);
  return 1 + Math.floor(weekDiff);
}
function getDayIdentifier(date2) {
  return date2.getFullYear() * 1e4 + date2.getMonth() * 100 + date2.getDate();
}
function getDateIdentifier(date2, onlyDate) {
  const d = new Date(date2);
  return onlyDate === true ? getDayIdentifier(d) : d.getTime();
}
function isBetweenDates(date2, from, to, opts = {}) {
  const d1 = getDateIdentifier(from, opts.onlyDate), d2 = getDateIdentifier(to, opts.onlyDate), cur = getDateIdentifier(date2, opts.onlyDate);
  return (cur > d1 || opts.inclusiveFrom === true && cur === d1) && (cur < d2 || opts.inclusiveTo === true && cur === d2);
}
function addToDate(date2, mod2) {
  return getChange(date2, mod2, 1);
}
function subtractFromDate(date2, mod2) {
  return getChange(date2, mod2, -1);
}
function startOfDate(date2, unit, utc) {
  const t = new Date(date2), prefix = `set${utc === true ? "UTC" : ""}`;
  switch (unit) {
    case "year":
    case "years":
      t[`${prefix}Month`](0);
    case "month":
    case "months":
      t[`${prefix}Date`](1);
    case "day":
    case "days":
    case "date":
      t[`${prefix}Hours`](0);
    case "hour":
    case "hours":
      t[`${prefix}Minutes`](0);
    case "minute":
    case "minutes":
      t[`${prefix}Seconds`](0);
    case "second":
    case "seconds":
      t[`${prefix}Milliseconds`](0);
  }
  return t;
}
function endOfDate(date2, unit, utc) {
  const t = new Date(date2), prefix = `set${utc === true ? "UTC" : ""}`;
  switch (unit) {
    case "year":
    case "years":
      t[`${prefix}Month`](11);
    case "month":
    case "months":
      t[`${prefix}Date`](daysInMonth(t));
    case "day":
    case "days":
    case "date":
      t[`${prefix}Hours`](23);
    case "hour":
    case "hours":
      t[`${prefix}Minutes`](59);
    case "minute":
    case "minutes":
      t[`${prefix}Seconds`](59);
    case "second":
    case "seconds":
      t[`${prefix}Milliseconds`](999);
  }
  return t;
}
function getMaxDate(date2) {
  let t = new Date(date2);
  Array.prototype.slice.call(arguments, 1).forEach((d) => {
    t = Math.max(t, new Date(d));
  });
  return t;
}
function getMinDate(date2) {
  let t = new Date(date2);
  Array.prototype.slice.call(arguments, 1).forEach((d) => {
    t = Math.min(t, new Date(d));
  });
  return t;
}
function getDiff(t, sub, interval) {
  return (t.getTime() - t.getTimezoneOffset() * MILLISECONDS_IN_MINUTE - (sub.getTime() - sub.getTimezoneOffset() * MILLISECONDS_IN_MINUTE)) / interval;
}
function getDateDiff(date2, subtract, unit = "days") {
  const t = new Date(date2), sub = new Date(subtract);
  switch (unit) {
    case "years":
    case "year":
      return t.getFullYear() - sub.getFullYear();
    case "months":
    case "month":
      return (t.getFullYear() - sub.getFullYear()) * 12 + t.getMonth() - sub.getMonth();
    case "days":
    case "day":
    case "date":
      return getDiff(startOfDate(t, "day"), startOfDate(sub, "day"), MILLISECONDS_IN_DAY);
    case "hours":
    case "hour":
      return getDiff(startOfDate(t, "hour"), startOfDate(sub, "hour"), MILLISECONDS_IN_HOUR);
    case "minutes":
    case "minute":
      return getDiff(startOfDate(t, "minute"), startOfDate(sub, "minute"), MILLISECONDS_IN_MINUTE);
    case "seconds":
    case "second":
      return getDiff(startOfDate(t, "second"), startOfDate(sub, "second"), 1e3);
  }
}
function getDayOfYear(date2) {
  return getDateDiff(date2, startOfDate(date2, "year"), "days") + 1;
}
function inferDateFormat(date2) {
  return isDate(date2) === true ? "date" : typeof date2 === "number" ? "number" : "string";
}
function getDateBetween(date2, min, max) {
  const t = new Date(date2);
  if (min) {
    const low = new Date(min);
    if (t < low) {
      return low;
    }
  }
  if (max) {
    const high = new Date(max);
    if (t > high) {
      return high;
    }
  }
  return t;
}
function isSameDate(date2, date22, unit) {
  const t = new Date(date2), d = new Date(date22);
  if (unit === void 0) {
    return t.getTime() === d.getTime();
  }
  switch (unit) {
    case "second":
    case "seconds":
      if (t.getSeconds() !== d.getSeconds()) {
        return false;
      }
    case "minute":
    // intentional fall-through
    case "minutes":
      if (t.getMinutes() !== d.getMinutes()) {
        return false;
      }
    case "hour":
    // intentional fall-through
    case "hours":
      if (t.getHours() !== d.getHours()) {
        return false;
      }
    case "day":
    // intentional fall-through
    case "days":
    case "date":
      if (t.getDate() !== d.getDate()) {
        return false;
      }
    case "month":
    // intentional fall-through
    case "months":
      if (t.getMonth() !== d.getMonth()) {
        return false;
      }
    case "year":
    // intentional fall-through
    case "years":
      if (t.getFullYear() !== d.getFullYear()) {
        return false;
      }
      break;
    default:
      throw new Error(`date isSameDate unknown unit ${unit}`);
  }
  return true;
}
function daysInMonth(date2) {
  return new Date(date2.getFullYear(), date2.getMonth() + 1, 0).getDate();
}
function getOrdinal(n) {
  if (n >= 11 && n <= 13) {
    return `${n}th`;
  }
  switch (n % 10) {
    case 1:
      return `${n}st`;
    case 2:
      return `${n}nd`;
    case 3:
      return `${n}rd`;
  }
  return `${n}th`;
}
const formatter = {
  // Year: 00, 01, ..., 99
  YY(date2, dateLocale, forcedYear) {
    const y = this.YYYY(date2, dateLocale, forcedYear) % 100;
    return y >= 0 ? pad(y) : "-" + pad(Math.abs(y));
  },
  // Year: 1900, 1901, ..., 2099
  YYYY(date2, _dateLocale, forcedYear) {
    return forcedYear !== void 0 && forcedYear !== null ? forcedYear : date2.getFullYear();
  },
  // Month: 1, 2, ..., 12
  M(date2) {
    return date2.getMonth() + 1;
  },
  // Month: 1st, 2nd, ..., 12th
  Mo(date2) {
    return getOrdinal(date2.getMonth() + 1);
  },
  // Month: 01, 02, ..., 12
  MM(date2) {
    return pad(date2.getMonth() + 1);
  },
  // Month Short Name: Jan, Feb, ...
  MMM(date2, dateLocale) {
    return dateLocale.monthsShort[date2.getMonth()];
  },
  // Month Name: January, February, ...
  MMMM(date2, dateLocale) {
    return dateLocale.months[date2.getMonth()];
  },
  // Quarter: 1, 2, 3, 4
  Q(date2) {
    return Math.ceil((date2.getMonth() + 1) / 3);
  },
  // Quarter: 1st, 2nd, 3rd, 4th
  Qo(date2) {
    return getOrdinal(this.Q(date2));
  },
  // Day of month: 1, 2, ..., 31
  D(date2) {
    return date2.getDate();
  },
  // Day of month: 1st, 2nd, ..., 31st
  Do(date2) {
    return getOrdinal(date2.getDate());
  },
  // Day of month: 01, 02, ..., 31
  DD(date2) {
    return pad(date2.getDate());
  },
  // Day of year: 1, 2, ..., 366
  DDD(date2) {
    return getDayOfYear(date2);
  },
  // Day of year: 1st, 2nd, ..., 366th
  DDDo(date2) {
    return getOrdinal(getDayOfYear(date2));
  },
  // Day of year: 001, 002, ..., 366
  DDDD(date2) {
    return pad(getDayOfYear(date2), 3);
  },
  // Day of week: 0, 1, ..., 6
  d(date2) {
    return date2.getDay();
  },
  // Day of week: 0th, 1st, ..., 6th
  do(date2) {
    return getOrdinal(date2.getDay());
  },
  // Day of week: Su, Mo, ...
  dd(date2, dateLocale) {
    return dateLocale.days[date2.getDay()].slice(0, 2);
  },
  // Day of week: Sun, Mon, ...
  ddd(date2, dateLocale) {
    return dateLocale.daysShort[date2.getDay()];
  },
  // Day of week: Sunday, Monday, ...
  dddd(date2, dateLocale) {
    return dateLocale.days[date2.getDay()];
  },
  // Day of ISO week: 1, 2, ..., 7
  E(date2) {
    return date2.getDay() || 7;
  },
  // Week of Year: 1 2 ... 52 53
  w(date2) {
    return getWeekOfYear(date2);
  },
  // Week of Year: 1st 2nd ... 52nd 53rd
  wo(date2) {
    return getOrdinal(getWeekOfYear(date2));
  },
  // Week of Year: 01 02 ... 52 53
  ww(date2) {
    return pad(getWeekOfYear(date2));
  },
  // Hour: 0, 1, ... 23
  H(date2) {
    return date2.getHours();
  },
  // Hour: 00, 01, ..., 23
  HH(date2) {
    return pad(date2.getHours());
  },
  // Hour: 1, 2, ..., 12
  h(date2) {
    const hours = date2.getHours();
    return hours === 0 ? 12 : hours > 12 ? hours % 12 : hours;
  },
  // Hour: 01, 02, ..., 12
  hh(date2) {
    return pad(this.h(date2));
  },
  // Minute: 0, 1, ..., 59
  m(date2) {
    return date2.getMinutes();
  },
  // Minute: 00, 01, ..., 59
  mm(date2) {
    return pad(date2.getMinutes());
  },
  // Second: 0, 1, ..., 59
  s(date2) {
    return date2.getSeconds();
  },
  // Second: 00, 01, ..., 59
  ss(date2) {
    return pad(date2.getSeconds());
  },
  // 1/10 of second: 0, 1, ..., 9
  S(date2) {
    return Math.floor(date2.getMilliseconds() / 100);
  },
  // 1/100 of second: 00, 01, ..., 99
  SS(date2) {
    return pad(Math.floor(date2.getMilliseconds() / 10));
  },
  // Millisecond: 000, 001, ..., 999
  SSS(date2) {
    return pad(date2.getMilliseconds(), 3);
  },
  // Meridiem: AM, PM
  A(date2) {
    return date2.getHours() < 12 ? "AM" : "PM";
  },
  // Meridiem: am, pm
  a(date2) {
    return date2.getHours() < 12 ? "am" : "pm";
  },
  // Meridiem: a.m., p.m.
  aa(date2) {
    return date2.getHours() < 12 ? "a.m." : "p.m.";
  },
  // Timezone: -01:00, +00:00, ... +12:00
  Z(date2, _dateLocale, _forcedYear, forcedTimezoneOffset) {
    const tzOffset = forcedTimezoneOffset === void 0 || forcedTimezoneOffset === null ? date2.getTimezoneOffset() : forcedTimezoneOffset;
    return formatTimezone(tzOffset, ":");
  },
  // Timezone: -0100, +0000, ... +1200
  ZZ(date2, _dateLocale, _forcedYear, forcedTimezoneOffset) {
    const tzOffset = forcedTimezoneOffset === void 0 || forcedTimezoneOffset === null ? date2.getTimezoneOffset() : forcedTimezoneOffset;
    return formatTimezone(tzOffset);
  },
  // Seconds timestamp: 512969520
  X(date2) {
    return Math.floor(date2.getTime() / 1e3);
  },
  // Milliseconds timestamp: 512969520900
  x(date2) {
    return date2.getTime();
  }
};
function formatDate(val, mask, dateLocale, __forcedYear, __forcedTimezoneOffset) {
  if (val !== 0 && !val || val === Infinity || val === -Infinity) return;
  const date2 = new Date(val);
  if (isNaN(date2)) return;
  if (mask === void 0) {
    mask = defaultMask;
  }
  const locale = getDateLocale(dateLocale, Plugin.props);
  return mask.replace(
    token,
    (match, text) => match in formatter ? formatter[match](date2, locale, __forcedYear, __forcedTimezoneOffset) : text === void 0 ? match : text.split("\\]").join("]")
  );
}
function clone(date2) {
  return isDate(date2) === true ? new Date(date2.getTime()) : date2;
}
const date = {
  isValid,
  extractDate,
  buildDate,
  getDayOfWeek,
  getWeekOfYear,
  isBetweenDates,
  addToDate,
  subtractFromDate,
  adjustDate,
  startOfDate,
  endOfDate,
  getMaxDate,
  getMinDate,
  getDateDiff,
  getDayOfYear,
  inferDateFormat,
  getDateBetween,
  isSameDate,
  daysInMonth,
  formatDate,
  clone
};
const yearsInterval = 20;
const views = ["Calendar", "Years", "Months"];
const viewIsValid = (v) => views.includes(v);
const yearMonthValidator = (v) => /^-?[\d]+\/[0-1]\d$/.test(v);
const lineStr = " — ";
function getMonthHash(date2) {
  return date2.year + "/" + pad(date2.month);
}
const QDate = createComponent({
  name: "QDate",
  props: {
    ...useDatetimeProps,
    ...useFormProps,
    ...useDarkProps,
    modelValue: {
      required: true,
      validator: (val) => typeof val === "string" || Array.isArray(val) === true || Object(val) === val || val === null
    },
    multiple: Boolean,
    range: Boolean,
    title: String,
    subtitle: String,
    mask: {
      ...useDatetimeProps.mask,
      // this mask is forced
      // when using persian calendar
      default: "YYYY/MM/DD"
    },
    defaultYearMonth: {
      type: String,
      validator: yearMonthValidator
    },
    yearsInMonthView: Boolean,
    events: [Array, Function],
    eventColor: [String, Function],
    emitImmediately: Boolean,
    options: [Array, Function],
    navigationMinYearMonth: {
      type: String,
      validator: yearMonthValidator
    },
    navigationMaxYearMonth: {
      type: String,
      validator: yearMonthValidator
    },
    noUnset: Boolean,
    firstDayOfWeek: [String, Number],
    todayBtn: Boolean,
    minimal: Boolean,
    defaultView: {
      type: String,
      default: "Calendar",
      validator: viewIsValid
    }
  },
  emits: [
    ...useDatetimeEmits,
    "rangeStart",
    "rangeEnd",
    "navigation"
  ],
  setup(props, { slots, emit }) {
    const { proxy } = getCurrentInstance();
    const { $q } = proxy;
    const isDark = useDark(props, $q);
    const { getCache } = useRenderCache();
    const { tabindex, headerClass, getLocale, getCurrentDate } = useDatetime(props, $q);
    let lastEmitValue;
    const formAttrs = useFormAttrs(props);
    const injectFormInput = useFormInject(formAttrs);
    const blurTargetRef = ref(null);
    const innerMask = ref(getMask());
    const innerLocale = ref(getLocale());
    const mask = computed(() => getMask());
    const locale = computed(() => getLocale());
    const today = computed(() => getCurrentDate());
    const viewModel = ref(getViewModel(innerMask.value, innerLocale.value));
    const view = ref(props.defaultView);
    const direction = computed(() => $q.lang.rtl === true ? "right" : "left");
    const monthDirection = ref(direction.value);
    const yearDirection = ref(direction.value);
    const year = viewModel.value.year;
    const startYear = ref(year - year % yearsInterval - (year < 0 ? yearsInterval : 0));
    const editRange = ref(null);
    const classes = computed(() => {
      const type = props.landscape === true ? "landscape" : "portrait";
      return `q-date q-date--${type} q-date--${type}-${props.minimal === true ? "minimal" : "standard"}` + (isDark.value === true ? " q-date--dark q-dark" : "") + (props.bordered === true ? " q-date--bordered" : "") + (props.square === true ? " q-date--square no-border-radius" : "") + (props.flat === true ? " q-date--flat no-shadow" : "") + (props.disable === true ? " disabled" : props.readonly === true ? " q-date--readonly" : "");
    });
    const computedColor = computed(() => {
      return props.color || "primary";
    });
    const computedTextColor = computed(() => {
      return props.textColor || "white";
    });
    const isImmediate = computed(
      () => props.emitImmediately === true && props.multiple !== true && props.range !== true
    );
    const normalizedModel = computed(() => Array.isArray(props.modelValue) === true ? props.modelValue : props.modelValue !== null && props.modelValue !== void 0 ? [props.modelValue] : []);
    const daysModel = computed(
      () => normalizedModel.value.filter((date2) => typeof date2 === "string").map((date2) => decodeString(date2, innerMask.value, innerLocale.value)).filter(
        (date2) => date2.dateHash !== null && date2.day !== null && date2.month !== null && date2.year !== null
      )
    );
    const rangeModel = computed(() => {
      const fn = (date2) => decodeString(date2, innerMask.value, innerLocale.value);
      return normalizedModel.value.filter((date2) => isObject(date2) === true && date2.from !== void 0 && date2.to !== void 0).map((range) => ({ from: fn(range.from), to: fn(range.to) })).filter((range) => range.from.dateHash !== null && range.to.dateHash !== null && range.from.dateHash < range.to.dateHash);
    });
    const getNativeDateFn = computed(() => props.calendar !== "persian" ? (model) => new Date(model.year, model.month - 1, model.day) : (model) => {
      const gDate = toGregorian(model.year, model.month, model.day);
      return new Date(gDate.gy, gDate.gm - 1, gDate.gd);
    });
    const encodeObjectFn = computed(() => props.calendar === "persian" ? getDayHash : (date2, mask2, locale2) => formatDate(
      new Date(
        date2.year,
        date2.month - 1,
        date2.day,
        date2.hour,
        date2.minute,
        date2.second,
        date2.millisecond
      ),
      mask2 === void 0 ? innerMask.value : mask2,
      locale2 === void 0 ? innerLocale.value : locale2,
      date2.year,
      date2.timezoneOffset
    ));
    const daysInModel = computed(
      () => daysModel.value.length + rangeModel.value.reduce(
        (acc, range) => acc + 1 + getDateDiff(
          getNativeDateFn.value(range.to),
          getNativeDateFn.value(range.from)
        ),
        0
      )
    );
    const headerTitle = computed(() => {
      if (props.title !== void 0 && props.title !== null && props.title.length !== 0) {
        return props.title;
      }
      if (editRange.value !== null) {
        const model2 = editRange.value.init;
        const date3 = getNativeDateFn.value(model2);
        return innerLocale.value.daysShort[date3.getDay()] + ", " + innerLocale.value.monthsShort[model2.month - 1] + " " + model2.day + lineStr + "?";
      }
      if (daysInModel.value === 0) {
        return lineStr;
      }
      if (daysInModel.value > 1) {
        return `${daysInModel.value} ${innerLocale.value.pluralDay}`;
      }
      const model = daysModel.value[0];
      const date2 = getNativeDateFn.value(model);
      if (isNaN(date2.valueOf()) === true) {
        return lineStr;
      }
      if (innerLocale.value.headerTitle !== void 0) {
        return innerLocale.value.headerTitle(date2, model);
      }
      return innerLocale.value.daysShort[date2.getDay()] + ", " + innerLocale.value.monthsShort[model.month - 1] + " " + model.day;
    });
    const minSelectedModel = computed(() => {
      const model = daysModel.value.concat(rangeModel.value.map((range) => range.from)).sort((a, b) => a.year - b.year || a.month - b.month);
      return model[0];
    });
    const maxSelectedModel = computed(() => {
      const model = daysModel.value.concat(rangeModel.value.map((range) => range.to)).sort((a, b) => b.year - a.year || b.month - a.month);
      return model[0];
    });
    const headerSubtitle = computed(() => {
      if (props.subtitle !== void 0 && props.subtitle !== null && props.subtitle.length !== 0) {
        return props.subtitle;
      }
      if (daysInModel.value === 0) {
        return lineStr;
      }
      if (daysInModel.value > 1) {
        const from = minSelectedModel.value;
        const to = maxSelectedModel.value;
        const month = innerLocale.value.monthsShort;
        return month[from.month - 1] + (from.year !== to.year ? " " + from.year + lineStr + month[to.month - 1] + " " : from.month !== to.month ? lineStr + month[to.month - 1] : "") + " " + to.year;
      }
      return daysModel.value[0].year;
    });
    const dateArrow = computed(() => {
      const val = [$q.iconSet.datetime.arrowLeft, $q.iconSet.datetime.arrowRight];
      return $q.lang.rtl === true ? val.reverse() : val;
    });
    const computedFirstDayOfWeek = computed(() => props.firstDayOfWeek !== void 0 ? Number(props.firstDayOfWeek) : innerLocale.value.firstDayOfWeek);
    const daysOfWeek = computed(() => {
      const days2 = innerLocale.value.daysShort, first = computedFirstDayOfWeek.value;
      return first > 0 ? days2.slice(first, 7).concat(days2.slice(0, first)) : days2;
    });
    const daysInMonth2 = computed(() => {
      const date2 = viewModel.value;
      return props.calendar !== "persian" ? new Date(date2.year, date2.month, 0).getDate() : jalaaliMonthLength(date2.year, date2.month);
    });
    const evtColor = computed(() => typeof props.eventColor === "function" ? props.eventColor : () => props.eventColor);
    const minNav = computed(() => {
      if (props.navigationMinYearMonth === void 0) {
        return null;
      }
      const data = props.navigationMinYearMonth.split("/");
      return { year: parseInt(data[0], 10), month: parseInt(data[1], 10) };
    });
    const maxNav = computed(() => {
      if (props.navigationMaxYearMonth === void 0) {
        return null;
      }
      const data = props.navigationMaxYearMonth.split("/");
      return { year: parseInt(data[0], 10), month: parseInt(data[1], 10) };
    });
    const navBoundaries = computed(() => {
      const data = {
        month: { prev: true, next: true },
        year: { prev: true, next: true }
      };
      if (minNav.value !== null && minNav.value.year >= viewModel.value.year) {
        data.year.prev = false;
        if (minNav.value.year === viewModel.value.year && minNav.value.month >= viewModel.value.month) {
          data.month.prev = false;
        }
      }
      if (maxNav.value !== null && maxNav.value.year <= viewModel.value.year) {
        data.year.next = false;
        if (maxNav.value.year === viewModel.value.year && maxNav.value.month <= viewModel.value.month) {
          data.month.next = false;
        }
      }
      return data;
    });
    const daysMap = computed(() => {
      const map = {};
      daysModel.value.forEach((entry) => {
        const hash = getMonthHash(entry);
        if (map[hash] === void 0) {
          map[hash] = [];
        }
        map[hash].push(entry.day);
      });
      return map;
    });
    const rangeMap = computed(() => {
      const map = {};
      rangeModel.value.forEach((entry) => {
        const hashFrom = getMonthHash(entry.from);
        const hashTo = getMonthHash(entry.to);
        if (map[hashFrom] === void 0) {
          map[hashFrom] = [];
        }
        map[hashFrom].push({
          from: entry.from.day,
          to: hashFrom === hashTo ? entry.to.day : void 0,
          range: entry
        });
        if (hashFrom < hashTo) {
          let hash;
          const { year: year2, month } = entry.from;
          const cur = month < 12 ? { year: year2, month: month + 1 } : { year: year2 + 1, month: 1 };
          while ((hash = getMonthHash(cur)) <= hashTo) {
            if (map[hash] === void 0) {
              map[hash] = [];
            }
            map[hash].push({
              from: void 0,
              to: hash === hashTo ? entry.to.day : void 0,
              range: entry
            });
            cur.month++;
            if (cur.month > 12) {
              cur.year++;
              cur.month = 1;
            }
          }
        }
      });
      return map;
    });
    const rangeView = computed(() => {
      if (editRange.value === null) return;
      const { init, initHash, final, finalHash } = editRange.value;
      const [from, to] = initHash <= finalHash ? [init, final] : [final, init];
      const fromHash = getMonthHash(from);
      const toHash = getMonthHash(to);
      if (fromHash !== viewMonthHash.value && toHash !== viewMonthHash.value) return;
      const view2 = {};
      if (fromHash === viewMonthHash.value) {
        view2.from = from.day;
        view2.includeFrom = true;
      } else {
        view2.from = 1;
      }
      if (toHash === viewMonthHash.value) {
        view2.to = to.day;
        view2.includeTo = true;
      } else {
        view2.to = daysInMonth2.value;
      }
      return view2;
    });
    const viewMonthHash = computed(() => getMonthHash(viewModel.value));
    const selectionDaysMap = computed(() => {
      const map = {};
      if (props.options === void 0) {
        for (let i = 1; i <= daysInMonth2.value; i++) {
          map[i] = true;
        }
        return map;
      }
      const fn = typeof props.options === "function" ? props.options : (date2) => props.options.includes(date2);
      for (let i = 1; i <= daysInMonth2.value; i++) {
        const dayHash = viewMonthHash.value + "/" + pad(i);
        map[i] = fn(dayHash);
      }
      return map;
    });
    const eventDaysMap = computed(() => {
      const map = {};
      if (props.events === void 0) {
        for (let i = 1; i <= daysInMonth2.value; i++) {
          map[i] = false;
        }
      } else {
        const fn = typeof props.events === "function" ? props.events : (date2) => props.events.includes(date2);
        for (let i = 1; i <= daysInMonth2.value; i++) {
          const dayHash = viewMonthHash.value + "/" + pad(i);
          map[i] = fn(dayHash) === true && evtColor.value(dayHash);
        }
      }
      return map;
    });
    const viewDays = computed(() => {
      let date2, endDay;
      const { year: year2, month } = viewModel.value;
      if (props.calendar !== "persian") {
        date2 = new Date(year2, month - 1, 1);
        endDay = new Date(year2, month - 1, 0).getDate();
      } else {
        const gDate = toGregorian(year2, month, 1);
        date2 = new Date(gDate.gy, gDate.gm - 1, gDate.gd);
        let prevJM = month - 1;
        let prevJY = year2;
        if (prevJM === 0) {
          prevJM = 12;
          prevJY--;
        }
        endDay = jalaaliMonthLength(prevJY, prevJM);
      }
      return {
        days: date2.getDay() - computedFirstDayOfWeek.value - 1,
        endDay
      };
    });
    const days = computed(() => {
      const res = [];
      const { days: days2, endDay } = viewDays.value;
      const len = days2 < 0 ? days2 + 7 : days2;
      if (len < 6) {
        for (let i = endDay - len; i <= endDay; i++) {
          res.push({ i, fill: true });
        }
      }
      const index = res.length;
      for (let i = 1; i <= daysInMonth2.value; i++) {
        const day = { i, event: eventDaysMap.value[i], classes: [] };
        if (selectionDaysMap.value[i] === true) {
          day.in = true;
          day.flat = true;
        }
        res.push(day);
      }
      if (daysMap.value[viewMonthHash.value] !== void 0) {
        daysMap.value[viewMonthHash.value].forEach((day) => {
          const i = index + day - 1;
          Object.assign(res[i], {
            selected: true,
            unelevated: true,
            flat: false,
            color: computedColor.value,
            textColor: computedTextColor.value
          });
        });
      }
      if (rangeMap.value[viewMonthHash.value] !== void 0) {
        rangeMap.value[viewMonthHash.value].forEach((entry) => {
          if (entry.from !== void 0) {
            const from = index + entry.from - 1;
            const to = index + (entry.to || daysInMonth2.value) - 1;
            for (let day = from; day <= to; day++) {
              Object.assign(res[day], {
                range: entry.range,
                unelevated: true,
                color: computedColor.value,
                textColor: computedTextColor.value
              });
            }
            Object.assign(res[from], {
              rangeFrom: true,
              flat: false
            });
            entry.to !== void 0 && Object.assign(res[to], {
              rangeTo: true,
              flat: false
            });
          } else if (entry.to !== void 0) {
            const to = index + entry.to - 1;
            for (let day = index; day <= to; day++) {
              Object.assign(res[day], {
                range: entry.range,
                unelevated: true,
                color: computedColor.value,
                textColor: computedTextColor.value
              });
            }
            Object.assign(res[to], {
              flat: false,
              rangeTo: true
            });
          } else {
            const to = index + daysInMonth2.value - 1;
            for (let day = index; day <= to; day++) {
              Object.assign(res[day], {
                range: entry.range,
                unelevated: true,
                color: computedColor.value,
                textColor: computedTextColor.value
              });
            }
          }
        });
      }
      if (rangeView.value !== void 0) {
        const from = index + rangeView.value.from - 1;
        const to = index + rangeView.value.to - 1;
        for (let day = from; day <= to; day++) {
          res[day].color = computedColor.value;
          res[day].editRange = true;
        }
        if (rangeView.value.includeFrom === true) {
          res[from].editRangeFrom = true;
        }
        if (rangeView.value.includeTo === true) {
          res[to].editRangeTo = true;
        }
      }
      if (viewModel.value.year === today.value.year && viewModel.value.month === today.value.month) {
        res[index + today.value.day - 1].today = true;
      }
      const left = res.length % 7;
      if (left > 0) {
        const afterDays = 7 - left;
        for (let i = 1; i <= afterDays; i++) {
          res.push({ i, fill: true });
        }
      }
      res.forEach((day) => {
        let cls = "q-date__calendar-item ";
        if (day.fill === true) {
          cls += "q-date__calendar-item--fill";
        } else {
          cls += `q-date__calendar-item--${day.in === true ? "in" : "out"}`;
          if (day.range !== void 0) {
            cls += ` q-date__range${day.rangeTo === true ? "-to" : day.rangeFrom === true ? "-from" : ""}`;
          }
          if (day.editRange === true) {
            cls += ` q-date__edit-range${day.editRangeFrom === true ? "-from" : ""}${day.editRangeTo === true ? "-to" : ""}`;
          }
          if (day.range !== void 0 || day.editRange === true) {
            cls += ` text-${day.color}`;
          }
        }
        day.classes = cls;
      });
      return res;
    });
    const attributes = computed(() => props.disable === true ? { "aria-disabled": "true" } : {});
    watch(() => props.modelValue, (v) => {
      if (lastEmitValue === JSON.stringify(v)) {
        lastEmitValue = 0;
      } else {
        const model = getViewModel(innerMask.value, innerLocale.value);
        updateViewModel(model.year, model.month, model);
      }
    });
    watch(view, () => {
      if (blurTargetRef.value !== null && proxy.$el.contains(document.activeElement) === true) {
        blurTargetRef.value.focus();
      }
    });
    watch(() => viewModel.value.year + "|" + viewModel.value.month, () => {
      emit("navigation", { year: viewModel.value.year, month: viewModel.value.month });
    });
    watch(mask, (val) => {
      updateValue(val, innerLocale.value, "mask");
      innerMask.value = val;
    });
    watch(locale, (val) => {
      updateValue(innerMask.value, val, "locale");
      innerLocale.value = val;
    });
    function setLastValue(v) {
      lastEmitValue = JSON.stringify(v);
    }
    function setToday() {
      const { year: year2, month, day } = today.value;
      const date2 = {
        // contains more props than needed (hour, minute, second, millisecond)
        // but those aren't used in the processing of this "date" variable
        ...viewModel.value,
        // overwriting with today's date
        year: year2,
        month,
        day
      };
      const monthMap = daysMap.value[getMonthHash(date2)];
      if (monthMap === void 0 || monthMap.includes(date2.day) === false) {
        addToModel(date2);
      }
      setCalendarTo(date2.year, date2.month);
    }
    function setView(viewMode) {
      if (viewIsValid(viewMode) === true) {
        view.value = viewMode;
      }
    }
    function offsetCalendar(type, descending) {
      if (["month", "year"].includes(type)) {
        const fn = type === "month" ? goToMonth : goToYear;
        fn(descending === true ? -1 : 1);
      }
    }
    function setCalendarTo(year2, month) {
      view.value = "Calendar";
      updateViewModel(year2, month);
    }
    function setEditingRange(from, to) {
      if (props.range === false || !from) {
        editRange.value = null;
        return;
      }
      const init = Object.assign({ ...viewModel.value }, from);
      const final = to !== void 0 ? Object.assign({ ...viewModel.value }, to) : init;
      editRange.value = {
        init,
        initHash: getDayHash(init),
        final,
        finalHash: getDayHash(final)
      };
      setCalendarTo(init.year, init.month);
    }
    function getMask() {
      return props.calendar === "persian" ? "YYYY/MM/DD" : props.mask;
    }
    function decodeString(date2, mask2, locale2) {
      return __splitDate(
        date2,
        mask2,
        locale2,
        props.calendar,
        {
          hour: 0,
          minute: 0,
          second: 0,
          millisecond: 0
        }
      );
    }
    function getViewModel(mask2, locale2) {
      const model = Array.isArray(props.modelValue) === true ? props.modelValue : props.modelValue ? [props.modelValue] : [];
      if (model.length === 0) {
        return getDefaultViewModel();
      }
      const target = model[model.length - 1];
      const decoded = decodeString(
        target.from !== void 0 ? target.from : target,
        mask2,
        locale2
      );
      return decoded.dateHash === null ? getDefaultViewModel() : decoded;
    }
    function getDefaultViewModel() {
      let year2, month;
      if (props.defaultYearMonth !== void 0) {
        const d = props.defaultYearMonth.split("/");
        year2 = parseInt(d[0], 10);
        month = parseInt(d[1], 10);
      } else {
        const d = today.value !== void 0 ? today.value : getCurrentDate();
        year2 = d.year;
        month = d.month;
      }
      return {
        year: year2,
        month,
        day: 1,
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
        dateHash: year2 + "/" + pad(month) + "/01"
      };
    }
    function goToMonth(offset) {
      let year2 = viewModel.value.year;
      let month = Number(viewModel.value.month) + offset;
      if (month === 13) {
        month = 1;
        year2++;
      } else if (month === 0) {
        month = 12;
        year2--;
      }
      updateViewModel(year2, month);
      isImmediate.value === true && emitImmediately("month");
    }
    function goToYear(offset) {
      const year2 = Number(viewModel.value.year) + offset;
      updateViewModel(year2, viewModel.value.month);
      isImmediate.value === true && emitImmediately("year");
    }
    function setYear(year2) {
      updateViewModel(year2, viewModel.value.month);
      view.value = props.defaultView === "Years" ? "Months" : "Calendar";
      isImmediate.value === true && emitImmediately("year");
    }
    function setMonth(month) {
      updateViewModel(viewModel.value.year, month);
      view.value = "Calendar";
      isImmediate.value === true && emitImmediately("month");
    }
    function toggleDate(date2, monthHash) {
      const month = daysMap.value[monthHash];
      const fn = month?.includes(date2.day) === true ? removeFromModel : addToModel;
      fn(date2);
    }
    function getShortDate(date2) {
      return { year: date2.year, month: date2.month, day: date2.day };
    }
    function updateViewModel(year2, month, time) {
      if (minNav.value !== null && year2 <= minNav.value.year) {
        if (month < minNav.value.month || year2 < minNav.value.year) {
          month = minNav.value.month;
        }
        year2 = minNav.value.year;
      }
      if (maxNav.value !== null && year2 >= maxNav.value.year) {
        if (month > maxNav.value.month || year2 > maxNav.value.year) {
          month = maxNav.value.month;
        }
        year2 = maxNav.value.year;
      }
      if (time !== void 0) {
        const { hour, minute, second, millisecond, timezoneOffset, timeHash } = time;
        Object.assign(viewModel.value, { hour, minute, second, millisecond, timezoneOffset, timeHash });
      }
      const newHash = year2 + "/" + pad(month) + "/01";
      if (newHash !== viewModel.value.dateHash) {
        monthDirection.value = viewModel.value.dateHash < newHash === ($q.lang.rtl !== true) ? "left" : "right";
        if (year2 !== viewModel.value.year) {
          yearDirection.value = monthDirection.value;
        }
        nextTick(() => {
          startYear.value = year2 - year2 % yearsInterval - (year2 < 0 ? yearsInterval : 0);
          Object.assign(viewModel.value, {
            year: year2,
            month,
            day: 1,
            dateHash: newHash
          });
        });
      }
    }
    function emitValue(val, action, date2) {
      const value = val !== null && val.length === 1 && props.multiple === false ? val[0] : val;
      const { reason, details } = getEmitParams(action, date2);
      setLastValue(value);
      emit("update:modelValue", value, reason, details);
    }
    function emitImmediately(reason) {
      const date2 = daysModel.value[0] !== void 0 && daysModel.value[0].dateHash !== null ? { ...daysModel.value[0] } : { ...viewModel.value };
      nextTick(() => {
        date2.year = viewModel.value.year;
        date2.month = viewModel.value.month;
        const maxDay = props.calendar !== "persian" ? new Date(date2.year, date2.month, 0).getDate() : jalaaliMonthLength(date2.year, date2.month);
        date2.day = Math.min(Math.max(1, date2.day), maxDay);
        const value = encodeEntry(date2);
        const { details } = getEmitParams("", date2);
        setLastValue(value);
        emit("update:modelValue", value, reason, details);
      });
    }
    function getEmitParams(action, date2) {
      return date2.from !== void 0 ? {
        reason: `${action}-range`,
        details: {
          ...getShortDate(date2.target),
          from: getShortDate(date2.from),
          to: getShortDate(date2.to)
        }
      } : {
        reason: `${action}-day`,
        details: getShortDate(date2)
      };
    }
    function encodeEntry(date2, mask2, locale2) {
      return date2.from !== void 0 ? { from: encodeObjectFn.value(date2.from, mask2, locale2), to: encodeObjectFn.value(date2.to, mask2, locale2) } : encodeObjectFn.value(date2, mask2, locale2);
    }
    function addToModel(date2) {
      let value;
      if (props.multiple === true) {
        if (date2.from !== void 0) {
          const fromHash = getDayHash(date2.from);
          const toHash = getDayHash(date2.to);
          const days2 = daysModel.value.filter((day) => day.dateHash < fromHash || day.dateHash > toHash);
          const ranges = rangeModel.value.filter(({ from, to }) => to.dateHash < fromHash || from.dateHash > toHash);
          value = days2.concat(ranges).concat(date2).map((entry) => encodeEntry(entry));
        } else {
          const model = normalizedModel.value.slice();
          model.push(encodeEntry(date2));
          value = model;
        }
      } else {
        value = encodeEntry(date2);
      }
      emitValue(value, "add", date2);
    }
    function removeFromModel(date2) {
      if (props.noUnset === true) return;
      let model = null;
      if (props.multiple === true && Array.isArray(props.modelValue) === true) {
        const val = encodeEntry(date2);
        if (date2.from !== void 0) {
          model = props.modelValue.filter(
            (date3) => date3.from !== void 0 ? date3.from !== val.from && date3.to !== val.to : true
          );
        } else {
          model = props.modelValue.filter((date3) => date3 !== val);
        }
        if (model.length === 0) {
          model = null;
        }
      }
      emitValue(model, "remove", date2);
    }
    function updateValue(mask2, locale2, reason) {
      const model = daysModel.value.concat(rangeModel.value).map((entry) => encodeEntry(entry, mask2, locale2)).filter((entry) => {
        return entry.from !== void 0 ? entry.from.dateHash !== null && entry.to.dateHash !== null : entry.dateHash !== null;
      });
      const value = (props.multiple === true ? model : model[0]) || null;
      setLastValue(value);
      emit("update:modelValue", value, reason);
    }
    function getHeader() {
      if (props.minimal === true) return;
      return h("div", {
        class: "q-date__header " + headerClass.value
      }, [
        h("div", {
          class: "relative-position"
        }, [
          h(Transition, {
            name: "q-transition--fade"
          }, () => h("div", {
            key: "h-yr-" + headerSubtitle.value,
            class: "q-date__header-subtitle q-date__header-link " + (view.value === "Years" ? "q-date__header-link--active" : "cursor-pointer"),
            tabindex: tabindex.value,
            ...getCache("vY", {
              onClick() {
                view.value = "Years";
              },
              onKeyup(e) {
                e.keyCode === 13 && (view.value = "Years");
              }
            })
          }, [headerSubtitle.value]))
        ]),
        h("div", {
          class: "q-date__header-title relative-position flex no-wrap"
        }, [
          h("div", {
            class: "relative-position col"
          }, [
            h(Transition, {
              name: "q-transition--fade"
            }, () => h("div", {
              key: "h-sub" + headerTitle.value,
              class: "q-date__header-title-label q-date__header-link " + (view.value === "Calendar" ? "q-date__header-link--active" : "cursor-pointer"),
              tabindex: tabindex.value,
              ...getCache("vC", {
                onClick() {
                  view.value = "Calendar";
                },
                onKeyup(e) {
                  e.keyCode === 13 && (view.value = "Calendar");
                }
              })
            }, [headerTitle.value]))
          ]),
          props.todayBtn === true ? h(QBtn, {
            class: "q-date__header-today self-start",
            icon: $q.iconSet.datetime.today,
            ariaLabel: $q.lang.date.today,
            flat: true,
            size: "sm",
            round: true,
            tabindex: tabindex.value,
            onClick: setToday
          }) : null
        ])
      ]);
    }
    function getNavigation({ label, type, key, dir, goTo, boundaries, cls }) {
      return [
        h("div", {
          class: "row items-center q-date__arrow"
        }, [
          h(QBtn, {
            round: true,
            dense: true,
            size: "sm",
            flat: true,
            icon: dateArrow.value[0],
            ariaLabel: type === "Years" ? $q.lang.date.prevYear : $q.lang.date.prevMonth,
            tabindex: tabindex.value,
            disable: boundaries.prev === false,
            ...getCache("go-#" + type, { onClick() {
              goTo(-1);
            } })
          })
        ]),
        h("div", {
          class: "relative-position overflow-hidden flex flex-center" + cls
        }, [
          h(Transition, {
            name: "q-transition--jump-" + dir
          }, () => h("div", { key }, [
            h(QBtn, {
              flat: true,
              dense: true,
              noCaps: true,
              label,
              tabindex: tabindex.value,
              ...getCache("view#" + type, { onClick: () => {
                view.value = type;
              } })
            })
          ]))
        ]),
        h("div", {
          class: "row items-center q-date__arrow"
        }, [
          h(QBtn, {
            round: true,
            dense: true,
            size: "sm",
            flat: true,
            icon: dateArrow.value[1],
            ariaLabel: type === "Years" ? $q.lang.date.nextYear : $q.lang.date.nextMonth,
            tabindex: tabindex.value,
            disable: boundaries.next === false,
            ...getCache("go+#" + type, { onClick() {
              goTo(1);
            } })
          })
        ])
      ];
    }
    const renderViews = {
      Calendar: () => [
        h("div", {
          key: "calendar-view",
          class: "q-date__view q-date__calendar"
        }, [
          h("div", {
            class: "q-date__navigation row items-center no-wrap"
          }, getNavigation({
            label: innerLocale.value.months[viewModel.value.month - 1],
            type: "Months",
            key: viewModel.value.month,
            dir: monthDirection.value,
            goTo: goToMonth,
            boundaries: navBoundaries.value.month,
            cls: " col"
          }).concat(getNavigation({
            label: viewModel.value.year,
            type: "Years",
            key: viewModel.value.year,
            dir: yearDirection.value,
            goTo: goToYear,
            boundaries: navBoundaries.value.year,
            cls: ""
          }))),
          h("div", {
            class: "q-date__calendar-weekdays row items-center no-wrap"
          }, daysOfWeek.value.map((day) => h("div", { class: "q-date__calendar-item" }, [h("div", day)]))),
          h("div", {
            class: "q-date__calendar-days-container relative-position overflow-hidden"
          }, [
            h(Transition, {
              name: "q-transition--slide-" + monthDirection.value
            }, () => h("div", {
              key: viewMonthHash.value,
              class: "q-date__calendar-days fit"
            }, days.value.map((day) => h("div", { class: day.classes }, [
              day.in === true ? h(
                QBtn,
                {
                  class: day.today === true ? "q-date__today" : "",
                  dense: true,
                  flat: day.flat,
                  unelevated: day.unelevated,
                  color: day.color,
                  textColor: day.textColor,
                  label: day.i,
                  tabindex: tabindex.value,
                  ...getCache("day#" + day.i, {
                    onClick: () => {
                      onDayClick(day.i);
                    },
                    onMouseover: () => {
                      onDayMouseover(day.i);
                    }
                  })
                },
                day.event !== false ? () => h("div", { class: "q-date__event bg-" + day.event }) : null
              ) : h("div", "" + day.i)
            ]))))
          ])
        ])
      ],
      Months() {
        const currentYear = viewModel.value.year === today.value.year;
        const isDisabled = (month) => {
          return minNav.value !== null && viewModel.value.year === minNav.value.year && minNav.value.month > month || maxNav.value !== null && viewModel.value.year === maxNav.value.year && maxNav.value.month < month;
        };
        const content = innerLocale.value.monthsShort.map((month, i) => {
          const active = viewModel.value.month === i + 1;
          return h("div", {
            class: "q-date__months-item flex flex-center"
          }, [
            h(QBtn, {
              class: currentYear === true && today.value.month === i + 1 ? "q-date__today" : null,
              flat: active !== true,
              label: month,
              unelevated: active,
              color: active === true ? computedColor.value : null,
              textColor: active === true ? computedTextColor.value : null,
              tabindex: tabindex.value,
              disable: isDisabled(i + 1),
              ...getCache("month#" + i, { onClick: () => {
                setMonth(i + 1);
              } })
            })
          ]);
        });
        props.yearsInMonthView === true && content.unshift(
          h("div", { class: "row no-wrap full-width" }, [
            getNavigation({
              label: viewModel.value.year,
              type: "Years",
              key: viewModel.value.year,
              dir: yearDirection.value,
              goTo: goToYear,
              boundaries: navBoundaries.value.year,
              cls: " col"
            })
          ])
        );
        return h("div", {
          key: "months-view",
          class: "q-date__view q-date__months flex flex-center"
        }, content);
      },
      Years() {
        const start = startYear.value, stop = start + yearsInterval, years = [];
        const isDisabled = (year2) => {
          return minNav.value !== null && minNav.value.year > year2 || maxNav.value !== null && maxNav.value.year < year2;
        };
        for (let i = start; i <= stop; i++) {
          const active = viewModel.value.year === i;
          years.push(
            h("div", {
              class: "q-date__years-item flex flex-center"
            }, [
              h(QBtn, {
                key: "yr" + i,
                class: today.value.year === i ? "q-date__today" : null,
                flat: !active,
                label: i,
                dense: true,
                unelevated: active,
                color: active === true ? computedColor.value : null,
                textColor: active === true ? computedTextColor.value : null,
                tabindex: tabindex.value,
                disable: isDisabled(i),
                ...getCache("yr#" + i, { onClick: () => {
                  setYear(i);
                } })
              })
            ])
          );
        }
        return h("div", {
          class: "q-date__view q-date__years flex flex-center"
        }, [
          h("div", {
            class: "col-auto"
          }, [
            h(QBtn, {
              round: true,
              dense: true,
              flat: true,
              icon: dateArrow.value[0],
              ariaLabel: $q.lang.date.prevRangeYears(yearsInterval),
              tabindex: tabindex.value,
              disable: isDisabled(start),
              ...getCache("y-", { onClick: () => {
                startYear.value -= yearsInterval;
              } })
            })
          ]),
          h("div", {
            class: "q-date__years-content col self-stretch row items-center"
          }, years),
          h("div", {
            class: "col-auto"
          }, [
            h(QBtn, {
              round: true,
              dense: true,
              flat: true,
              icon: dateArrow.value[1],
              ariaLabel: $q.lang.date.nextRangeYears(yearsInterval),
              tabindex: tabindex.value,
              disable: isDisabled(stop),
              ...getCache("y+", { onClick: () => {
                startYear.value += yearsInterval;
              } })
            })
          ])
        ]);
      }
    };
    function onDayClick(dayIndex) {
      const day = { ...viewModel.value, day: dayIndex };
      if (props.range === false) {
        toggleDate(day, viewMonthHash.value);
        return;
      }
      if (editRange.value === null) {
        const dayProps = days.value.find((day2) => day2.fill !== true && day2.i === dayIndex);
        if (props.noUnset !== true && dayProps.range !== void 0) {
          removeFromModel({ target: day, from: dayProps.range.from, to: dayProps.range.to });
          return;
        }
        if (dayProps.selected === true) {
          removeFromModel(day);
          return;
        }
        const initHash = getDayHash(day);
        editRange.value = {
          init: day,
          initHash,
          final: day,
          finalHash: initHash
        };
        emit("rangeStart", getShortDate(day));
      } else {
        const initHash = editRange.value.initHash, finalHash = getDayHash(day), payload = initHash <= finalHash ? { from: editRange.value.init, to: day } : { from: day, to: editRange.value.init };
        editRange.value = null;
        addToModel(initHash === finalHash ? day : { target: day, ...payload });
        emit("rangeEnd", {
          from: getShortDate(payload.from),
          to: getShortDate(payload.to)
        });
      }
    }
    function onDayMouseover(dayIndex) {
      if (editRange.value !== null) {
        const final = { ...viewModel.value, day: dayIndex };
        Object.assign(editRange.value, {
          final,
          finalHash: getDayHash(final)
        });
      }
    }
    Object.assign(proxy, {
      setToday,
      setView,
      offsetCalendar,
      setCalendarTo,
      setEditingRange
    });
    return () => {
      const content = [
        h("div", {
          class: "q-date__content col relative-position"
        }, [
          h(Transition, {
            name: "q-transition--fade"
          }, renderViews[view.value])
        ])
      ];
      const def = hSlot(slots.default);
      def !== void 0 && content.push(
        h("div", { class: "q-date__actions" }, def)
      );
      if (props.name !== void 0 && props.disable !== true) {
        injectFormInput(content, "push");
      }
      return h("div", {
        class: classes.value,
        ...attributes.value
      }, [
        getHeader(),
        h("div", {
          ref: blurTargetRef,
          class: "q-date__main col column",
          tabindex: -1
        }, content)
      ]);
    };
  }
});
const QPopupProxy = createComponent({
  name: "QPopupProxy",
  props: {
    ...useAnchorProps,
    breakpoint: {
      type: [String, Number],
      default: 450
    }
  },
  emits: ["show", "hide"],
  setup(props, { slots, emit, attrs }) {
    const { proxy } = getCurrentInstance();
    const { $q } = proxy;
    const showing = ref(false);
    const popupRef = ref(null);
    const breakpoint = computed(() => parseInt(props.breakpoint, 10));
    const { canShow } = useAnchor({ showing });
    function getType() {
      return $q.screen.width < breakpoint.value || $q.screen.height < breakpoint.value ? "dialog" : "menu";
    }
    const type = ref(getType());
    const popupProps = computed(
      () => type.value === "menu" ? { maxHeight: "99vh" } : {}
    );
    watch(() => getType(), (val) => {
      if (showing.value !== true) {
        type.value = val;
      }
    });
    function onShow(evt) {
      showing.value = true;
      emit("show", evt);
    }
    function onHide(evt) {
      showing.value = false;
      type.value = getType();
      emit("hide", evt);
    }
    Object.assign(proxy, {
      show(evt) {
        canShow(evt) === true && popupRef.value.show(evt);
      },
      hide(evt) {
        popupRef.value.hide(evt);
      },
      toggle(evt) {
        popupRef.value.toggle(evt);
      }
    });
    injectProp(proxy, "currentComponent", () => ({
      type: type.value,
      ref: popupRef.value
    }));
    return () => {
      const data = {
        ref: popupRef,
        ...popupProps.value,
        ...attrs,
        onShow,
        onHide
      };
      let component;
      if (type.value === "dialog") {
        component = QDialog;
      } else {
        component = QMenu;
        Object.assign(data, {
          target: props.target,
          contextMenu: props.contextMenu,
          noParentEvent: true,
          separateClosePopup: true
        });
      }
      return h(component, data, slots.default);
    };
  }
});
const _sfc_main = {
  __name: "ReportsPage",
  setup(__props, { expose: __expose }) {
    __expose();
    const salesStore = useSalesStore();
    const today = date.formatDate(/* @__PURE__ */ new Date(), "DD/MM/YYYY");
    const selectedDate = ref(today);
    const showDate = ref(false);
    const sales = computed(() => salesStore.sales || []);
    const filteredSales = computed(() => sales.value.filter((sale) => sale.date === selectedDate.value));
    const columns = [
      { name: "item", label: "Produto", field: "item", align: "left" },
      { name: "date", label: "Data", field: "date", align: "center" },
      { name: "quantity", label: "Quantidade", field: "quantity", align: "center" },
      {
        name: "value",
        label: "Valor (R$)",
        field: (row) => Number(row.value).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
        align: "center"
      },
      { name: "method", label: "Método de Pagamento", field: "method", align: "center" }
    ];
    const __returned__ = { salesStore, today, selectedDate, showDate, sales, filteredSales, columns, ref, computed, get date() {
      return date;
    }, get useSalesStore() {
      return useSalesStore;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1 = { class: "report-card q-pa-lg" };
const _hoisted_2 = { class: "row items-center justify-between q-mb-md report-header" };
const _hoisted_3 = { class: "col-auto flex items-center" };
const _hoisted_4 = { class: "col-auto" };
const _hoisted_5 = { class: "no-data flex flex-center column q-pa-xl" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QPage, null, {
    default: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createVNode(QIcon, {
              name: "bar_chart",
              size: "36px",
              color: "primary",
              class: "q-mr-sm animate-icon"
            }),
            _cache[4] || (_cache[4] = createBaseVNode("span", { class: "report-title gradient-title" }, "Relatório de Vendas", -1))
          ]),
          createBaseVNode("div", _hoisted_4, [
            createVNode(QInput, {
              modelValue: $setup.selectedDate,
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.selectedDate = $event),
              filled: "",
              dense: "",
              class: "date-input",
              label: "Filtrar por data",
              mask: "##/##/####",
              "input-style": { color: "#cfd8dc", fontWeight: 500 },
              readonly: ""
            }, {
              prepend: withCtx(() => [
                createVNode(QIcon, {
                  name: "event",
                  color: "primary"
                })
              ]),
              append: withCtx(() => [
                createVNode(QBtn, {
                  flat: "",
                  dense: "",
                  round: "",
                  icon: "arrow_drop_down",
                  onClick: _cache[0] || (_cache[0] = ($event) => $setup.showDate = true)
                })
              ]),
              _: 1
            }, 8, ["modelValue"]),
            createVNode(QPopupProxy, {
              modelValue: $setup.showDate,
              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.showDate = $event),
              "transition-show": "scale",
              "transition-hide": "scale"
            }, {
              default: withCtx(() => [
                createVNode(QDate, {
                  modelValue: $setup.selectedDate,
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.selectedDate = $event),
                  mask: "DD/MM/YYYY",
                  color: "primary"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }, 8, ["modelValue"])
          ])
        ]),
        createVNode(QTable, {
          rows: $setup.filteredSales,
          columns: $setup.columns,
          flat: "",
          square: "",
          "hide-bottom": "",
          class: "report-table animate-fade-in",
          "rows-per-page-options": [0],
          pagination: { rowsPerPage: 0 }
        }, {
          "no-data": withCtx(() => [
            createBaseVNode("div", _hoisted_5, [
              createVNode(QIcon, {
                name: "inventory_2",
                size: "72px",
                color: "grey-7",
                class: "animate-icon"
              }),
              _cache[5] || (_cache[5] = createBaseVNode("div", { class: "no-data-text q-mt-md" }, [
                createTextVNode(" Nenhuma venda registrada"),
                createBaseVNode("br"),
                createTextVNode("no período selecionado ")
              ], -1))
            ])
          ]),
          _: 1
        }, 8, ["rows"])
      ])
    ]),
    _: 1
  });
}
const ReportsPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-87bfbba1"], ["__file", "ReportsPage.vue"]]);
export {
  ReportsPage as default
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVwb3J0c1BhZ2UtRFJpT1VZQWIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3VzZS1yZW5kZXItY2FjaGUvdXNlLXJlbmRlci1jYWNoZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL2RhdGUvcHJpdmF0ZS5wZXJzaWFuLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9kYXRlL3VzZS1kYXRldGltZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL2RhdGUvZGF0ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvZGF0ZS9RRGF0ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvcG9wdXAtcHJveHkvUVBvcHVwUHJveHkuanMiLCIuLi8uLi8uLi9zcmMvcGFnZXMvUmVwb3J0c1BhZ2UudnVlIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgbGV0IGNhY2hlID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuXG4gIHJldHVybiB7XG4gICAgZ2V0Q2FjaGU6IF9fUVVBU0FSX1NTUl9TRVJWRVJfX1xuICAgICAgPyAoXywgZGVmYXVsdFZhbHVlKSA9PiAoXG4gICAgICAgICAgdHlwZW9mIGRlZmF1bHRWYWx1ZSA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgPyBkZWZhdWx0VmFsdWUoKVxuICAgICAgICAgICAgOiBkZWZhdWx0VmFsdWVcbiAgICAgICAgKVxuICAgICAgOiAoa2V5LCBkZWZhdWx0VmFsdWUpID0+IChcbiAgICAgICAgICBjYWNoZVsga2V5IF0gPT09IHZvaWQgMFxuICAgICAgICAgICAgPyAoXG4gICAgICAgICAgICAgICAgY2FjaGVbIGtleSBdID0gKFxuICAgICAgICAgICAgICAgICAgdHlwZW9mIGRlZmF1bHRWYWx1ZSA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgICAgICAgICA/IGRlZmF1bHRWYWx1ZSgpXG4gICAgICAgICAgICAgICAgICAgIDogZGVmYXVsdFZhbHVlXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICA6IGNhY2hlWyBrZXkgXVxuICAgICAgICApLFxuXG4gICAgc2V0Q2FjaGUgKGtleSwgb2JqKSB7XG4gICAgICBjYWNoZVsga2V5IF0gPSBvYmpcbiAgICB9LFxuXG4gICAgaGFzQ2FjaGUgKGtleSkge1xuICAgICAgcmV0dXJuIE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKGNhY2hlLCBrZXkpXG4gICAgfSxcblxuICAgIGNsZWFyQ2FjaGUgKGtleSkge1xuICAgICAgaWYgKGtleSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGRlbGV0ZSBjYWNoZVsga2V5IF1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjYWNoZSA9IE9iamVjdC5jcmVhdGUobnVsbClcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsIi8vIHRha2VuIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2phbGFhbGkvamFsYWFsaS1qc1xuXG4vKlxuICBKYWxhYWxpIHllYXJzIHN0YXJ0aW5nIHRoZSAzMy15ZWFyIHJ1bGUuXG4qL1xuY29uc3QgYnJlYWtzID0gW1xuICAtNjEsIDksIDM4LCAxOTksIDQyNiwgNjg2LCA3NTYsIDgxOCwgMTExMSwgMTE4MSwgMTIxMCxcbiAgMTYzNSwgMjA2MCwgMjA5NywgMjE5MiwgMjI2MiwgMjMyNCwgMjM5NCwgMjQ1NiwgMzE3OFxuXVxuXG4vKlxuICBDb252ZXJ0cyBhIEdyZWdvcmlhbiBkYXRlIHRvIEphbGFhbGkuXG4qL1xuZXhwb3J0IGZ1bmN0aW9uIHRvSmFsYWFsaSAoZ3ksIGdtLCBnZCkge1xuICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGd5KSA9PT0gJ1tvYmplY3QgRGF0ZV0nKSB7XG4gICAgZ2QgPSBneS5nZXREYXRlKClcbiAgICBnbSA9IGd5LmdldE1vbnRoKCkgKyAxXG4gICAgZ3kgPSBneS5nZXRGdWxsWWVhcigpXG4gIH1cbiAgcmV0dXJuIGQyaihnMmQoZ3ksIGdtLCBnZCkpXG59XG5cbi8qXG4gIENvbnZlcnRzIGEgSmFsYWFsaSBkYXRlIHRvIEdyZWdvcmlhbi5cbiovXG5leHBvcnQgZnVuY3Rpb24gdG9HcmVnb3JpYW4gKGp5LCBqbSwgamQpIHtcbiAgcmV0dXJuIGQyZyhqMmQoanksIGptLCBqZCkpXG59XG5cbi8qXG4gIElzIHRoaXMgYSBsZWFwIHllYXIgb3Igbm90P1xuKi9cbmZ1bmN0aW9uIGlzTGVhcEphbGFhbGlZZWFyIChqeSkge1xuICByZXR1cm4gamFsQ2FsTGVhcChqeSkgPT09IDBcbn1cblxuLypcbiAgTnVtYmVyIG9mIGRheXMgaW4gYSBnaXZlbiBtb250aCBpbiBhIEphbGFhbGkgeWVhci5cbiovXG5leHBvcnQgZnVuY3Rpb24gamFsYWFsaU1vbnRoTGVuZ3RoIChqeSwgam0pIHtcbiAgaWYgKGptIDw9IDYpIHJldHVybiAzMVxuICBpZiAoam0gPD0gMTEpIHJldHVybiAzMFxuICBpZiAoaXNMZWFwSmFsYWFsaVllYXIoankpKSByZXR1cm4gMzBcbiAgcmV0dXJuIDI5XG59XG5cbi8qXG4gICAgVGhpcyBmdW5jdGlvbiBkZXRlcm1pbmVzIGlmIHRoZSBKYWxhYWxpIChQZXJzaWFuKSB5ZWFyIGlzXG4gICAgbGVhcCAoMzY2LWRheSBsb25nKSBvciBpcyB0aGUgY29tbW9uIHllYXIgKDM2NSBkYXlzKVxuXG4gICAgQHBhcmFtIGp5IEphbGFhbGkgY2FsZW5kYXIgeWVhciAoLTYxIHRvIDMxNzcpXG4gICAgQHJldHVybnMgbnVtYmVyIG9mIHllYXJzIHNpbmNlIHRoZSBsYXN0IGxlYXAgeWVhciAoMCB0byA0KVxuICovXG5mdW5jdGlvbiBqYWxDYWxMZWFwIChqeSkge1xuICBjb25zdCBibCA9IGJyZWFrcy5sZW5ndGhcbiAgbGV0XG4gICAganAgPSBicmVha3NbIDAgXSxcbiAgICBqbSxcbiAgICBqdW1wLFxuICAgIGxlYXAsXG4gICAgbixcbiAgICBpXG5cbiAgaWYgKGp5IDwganAgfHwgankgPj0gYnJlYWtzWyBibCAtIDEgXSkgeyB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgSmFsYWFsaSB5ZWFyICcgKyBqeSkgfVxuXG4gIGZvciAoaSA9IDE7IGkgPCBibDsgaSArPSAxKSB7XG4gICAgam0gPSBicmVha3NbIGkgXVxuICAgIGp1bXAgPSBqbSAtIGpwXG4gICAgaWYgKGp5IDwgam0pIHsgYnJlYWsgfVxuICAgIGpwID0gam1cbiAgfVxuICBuID0gankgLSBqcFxuXG4gIGlmIChqdW1wIC0gbiA8IDYpIHsgbiA9IG4gLSBqdW1wICsgZGl2KGp1bXAgKyA0LCAzMykgKiAzMyB9XG4gIGxlYXAgPSBtb2QobW9kKG4gKyAxLCAzMykgLSAxLCA0KVxuICBpZiAobGVhcCA9PT0gLTEpIHtcbiAgICBsZWFwID0gNFxuICB9XG5cbiAgcmV0dXJuIGxlYXBcbn1cblxuLypcbiAgVGhpcyBmdW5jdGlvbiBkZXRlcm1pbmVzIGlmIHRoZSBKYWxhYWxpIChQZXJzaWFuKSB5ZWFyIGlzXG4gIGxlYXAgKDM2Ni1kYXkgbG9uZykgb3IgaXMgdGhlIGNvbW1vbiB5ZWFyICgzNjUgZGF5cyksIGFuZFxuICBmaW5kcyB0aGUgZGF5IGluIE1hcmNoIChHcmVnb3JpYW4gY2FsZW5kYXIpIG9mIHRoZSBmaXJzdFxuICBkYXkgb2YgdGhlIEphbGFhbGkgeWVhciAoankpLlxuXG4gIEBwYXJhbSBqeSBKYWxhYWxpIGNhbGVuZGFyIHllYXIgKC02MSB0byAzMTc3KVxuICBAcGFyYW0gd2l0aG91dExlYXAgd2hlbiBkb24ndCBuZWVkIGxlYXAgKHRydWUgb3IgZmFsc2UpIGRlZmF1bHQgaXMgZmFsc2VcbiAgQHJldHVyblxuICAgIGxlYXA6IG51bWJlciBvZiB5ZWFycyBzaW5jZSB0aGUgbGFzdCBsZWFwIHllYXIgKDAgdG8gNClcbiAgICBneTogR3JlZ29yaWFuIHllYXIgb2YgdGhlIGJlZ2lubmluZyBvZiBKYWxhYWxpIHllYXJcbiAgICBtYXJjaDogdGhlIE1hcmNoIGRheSBvZiBGYXJ2YXJkaW4gdGhlIDFzdCAoMXN0IGRheSBvZiBqeSlcbiAgQHNlZTogaHR0cDovL3d3dy5hc3Ryby51bmkudG9ydW4ucGwvfmtiL1BhcGVycy9FTVAvUGVyc2lhbkMtRU1QLmh0bVxuICBAc2VlOiBodHRwOi8vd3d3LmZvdXJtaWxhYi5jaC9kb2N1bWVudHMvY2FsZW5kYXIvXG4qL1xuZnVuY3Rpb24gamFsQ2FsIChqeSwgd2l0aG91dExlYXApIHtcbiAgY29uc3RcbiAgICBibCA9IGJyZWFrcy5sZW5ndGgsXG4gICAgZ3kgPSBqeSArIDYyMVxuICBsZXRcbiAgICBsZWFwSiA9IC0xNCxcbiAgICBqcCA9IGJyZWFrc1sgMCBdLFxuICAgIGptLFxuICAgIGp1bXAsXG4gICAgbGVhcCxcbiAgICBuLFxuICAgIGlcblxuICBpZiAoankgPCBqcCB8fCBqeSA+PSBicmVha3NbIGJsIC0gMSBdKSB7IHRocm93IG5ldyBFcnJvcignSW52YWxpZCBKYWxhYWxpIHllYXIgJyArIGp5KSB9XG5cbiAgLy8gRmluZCB0aGUgbGltaXRpbmcgeWVhcnMgZm9yIHRoZSBKYWxhYWxpIHllYXIgankuXG4gIGZvciAoaSA9IDE7IGkgPCBibDsgaSArPSAxKSB7XG4gICAgam0gPSBicmVha3NbIGkgXVxuICAgIGp1bXAgPSBqbSAtIGpwXG4gICAgaWYgKGp5IDwgam0pIHsgYnJlYWsgfVxuICAgIGxlYXBKID0gbGVhcEogKyBkaXYoanVtcCwgMzMpICogOCArIGRpdihtb2QoanVtcCwgMzMpLCA0KVxuICAgIGpwID0gam1cbiAgfVxuICBuID0gankgLSBqcFxuXG4gIC8vIEZpbmQgdGhlIG51bWJlciBvZiBsZWFwIHllYXJzIGZyb20gQUQgNjIxIHRvIHRoZSBiZWdpbm5pbmdcbiAgLy8gb2YgdGhlIGN1cnJlbnQgSmFsYWFsaSB5ZWFyIGluIHRoZSBQZXJzaWFuIGNhbGVuZGFyLlxuICBsZWFwSiA9IGxlYXBKICsgZGl2KG4sIDMzKSAqIDggKyBkaXYobW9kKG4sIDMzKSArIDMsIDQpXG4gIGlmIChtb2QoanVtcCwgMzMpID09PSA0ICYmIGp1bXAgLSBuID09PSA0KSB7IGxlYXBKICs9IDEgfVxuXG4gIC8vIEFuZCB0aGUgc2FtZSBpbiB0aGUgR3JlZ29yaWFuIGNhbGVuZGFyICh1bnRpbCB0aGUgeWVhciBneSkuXG4gIGNvbnN0IGxlYXBHID0gZGl2KGd5LCA0KSAtIGRpdigoZGl2KGd5LCAxMDApICsgMSkgKiAzLCA0KSAtIDE1MFxuXG4gIC8vIERldGVybWluZSB0aGUgR3JlZ29yaWFuIGRhdGUgb2YgRmFydmFyZGluIHRoZSAxc3QuXG4gIGNvbnN0IG1hcmNoID0gMjAgKyBsZWFwSiAtIGxlYXBHXG5cbiAgLy8gRmluZCBob3cgbWFueSB5ZWFycyBoYXZlIHBhc3NlZCBzaW5jZSB0aGUgbGFzdCBsZWFwIHllYXIuXG4gIGlmICghd2l0aG91dExlYXApIHtcbiAgICBpZiAoanVtcCAtIG4gPCA2KSB7IG4gPSBuIC0ganVtcCArIGRpdihqdW1wICsgNCwgMzMpICogMzMgfVxuICAgIGxlYXAgPSBtb2QobW9kKG4gKyAxLCAzMykgLSAxLCA0KVxuICAgIGlmIChsZWFwID09PSAtMSkge1xuICAgICAgbGVhcCA9IDRcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGxlYXAsXG4gICAgZ3ksXG4gICAgbWFyY2hcbiAgfVxufVxuXG4vKlxuICBDb252ZXJ0cyBhIGRhdGUgb2YgdGhlIEphbGFhbGkgY2FsZW5kYXIgdG8gdGhlIEp1bGlhbiBEYXkgbnVtYmVyLlxuXG4gIEBwYXJhbSBqeSBKYWxhYWxpIHllYXIgKDEgdG8gMzEwMClcbiAgQHBhcmFtIGptIEphbGFhbGkgbW9udGggKDEgdG8gMTIpXG4gIEBwYXJhbSBqZCBKYWxhYWxpIGRheSAoMSB0byAyOS8zMSlcbiAgQHJldHVybiBKdWxpYW4gRGF5IG51bWJlclxuKi9cbmZ1bmN0aW9uIGoyZCAoanksIGptLCBqZCkge1xuICBjb25zdCByID0gamFsQ2FsKGp5LCB0cnVlKVxuICByZXR1cm4gZzJkKHIuZ3ksIDMsIHIubWFyY2gpICsgKGptIC0gMSkgKiAzMSAtIGRpdihqbSwgNykgKiAoam0gLSA3KSArIGpkIC0gMVxufVxuXG4vKlxuICBDb252ZXJ0cyB0aGUgSnVsaWFuIERheSBudW1iZXIgdG8gYSBkYXRlIGluIHRoZSBKYWxhYWxpIGNhbGVuZGFyLlxuXG4gIEBwYXJhbSBqZG4gSnVsaWFuIERheSBudW1iZXJcbiAgQHJldHVyblxuICAgIGp5OiBKYWxhYWxpIHllYXIgKDEgdG8gMzEwMClcbiAgICBqbTogSmFsYWFsaSBtb250aCAoMSB0byAxMilcbiAgICBqZDogSmFsYWFsaSBkYXkgKDEgdG8gMjkvMzEpXG4qL1xuZnVuY3Rpb24gZDJqIChqZG4pIHtcbiAgY29uc3QgZ3kgPSBkMmcoamRuKS5neSAvLyBDYWxjdWxhdGUgR3JlZ29yaWFuIHllYXIgKGd5KS5cbiAgbGV0XG4gICAgankgPSBneSAtIDYyMSxcbiAgICBqZCxcbiAgICBqbSxcbiAgICBrXG4gIGNvbnN0XG4gICAgciA9IGphbENhbChqeSwgZmFsc2UpLFxuICAgIGpkbjFmID0gZzJkKGd5LCAzLCByLm1hcmNoKVxuXG4gIC8vIEZpbmQgbnVtYmVyIG9mIGRheXMgdGhhdCBwYXNzZWQgc2luY2UgMSBGYXJ2YXJkaW4uXG4gIGsgPSBqZG4gLSBqZG4xZlxuICBpZiAoayA+PSAwKSB7XG4gICAgaWYgKGsgPD0gMTg1KSB7XG4gICAgICAvLyBUaGUgZmlyc3QgNiBtb250aHMuXG4gICAgICBqbSA9IDEgKyBkaXYoaywgMzEpXG4gICAgICBqZCA9IG1vZChrLCAzMSkgKyAxXG4gICAgICByZXR1cm4ge1xuICAgICAgICBqeSxcbiAgICAgICAgam0sXG4gICAgICAgIGpkXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgLy8gVGhlIHJlbWFpbmluZyBtb250aHMuXG4gICAgICBrIC09IDE4NlxuICAgIH1cbiAgfVxuICBlbHNlIHtcbiAgICAvLyBQcmV2aW91cyBKYWxhYWxpIHllYXIuXG4gICAgankgLT0gMVxuICAgIGsgKz0gMTc5XG4gICAgaWYgKHIubGVhcCA9PT0gMSkgeyBrICs9IDEgfVxuICB9XG4gIGptID0gNyArIGRpdihrLCAzMClcbiAgamQgPSBtb2QoaywgMzApICsgMVxuICByZXR1cm4ge1xuICAgIGp5LFxuICAgIGptLFxuICAgIGpkXG4gIH1cbn1cblxuLypcbiAgQ2FsY3VsYXRlcyB0aGUgSnVsaWFuIERheSBudW1iZXIgZnJvbSBHcmVnb3JpYW4gb3IgSnVsaWFuXG4gIGNhbGVuZGFyIGRhdGVzLiBUaGlzIGludGVnZXIgbnVtYmVyIGNvcnJlc3BvbmRzIHRvIHRoZSBub29uIG9mXG4gIHRoZSBkYXRlIChpLmUuIDEyIGhvdXJzIG9mIFVuaXZlcnNhbCBUaW1lKS5cbiAgVGhlIHByb2NlZHVyZSB3YXMgdGVzdGVkIHRvIGJlIGdvb2Qgc2luY2UgMSBNYXJjaCwgLTEwMDEwMCAob2YgYm90aFxuICBjYWxlbmRhcnMpIHVwIHRvIGEgZmV3IG1pbGxpb24geWVhcnMgaW50byB0aGUgZnV0dXJlLlxuXG4gIEBwYXJhbSBneSBDYWxlbmRhciB5ZWFyICh5ZWFycyBCQyBudW1iZXJlZCAwLCAtMSwgLTIsIC4uLilcbiAgQHBhcmFtIGdtIENhbGVuZGFyIG1vbnRoICgxIHRvIDEyKVxuICBAcGFyYW0gZ2QgQ2FsZW5kYXIgZGF5IG9mIHRoZSBtb250aCAoMSB0byAyOC8yOS8zMC8zMSlcbiAgQHJldHVybiBKdWxpYW4gRGF5IG51bWJlclxuKi9cbmZ1bmN0aW9uIGcyZCAoZ3ksIGdtLCBnZCkge1xuICBsZXQgZCA9IGRpdigoZ3kgKyBkaXYoZ20gLSA4LCA2KSArIDEwMDEwMCkgKiAxNDYxLCA0KVxuICAgICAgKyBkaXYoMTUzICogbW9kKGdtICsgOSwgMTIpICsgMiwgNSlcbiAgICAgICsgZ2QgLSAzNDg0MDQwOFxuICBkID0gZCAtIGRpdihkaXYoZ3kgKyAxMDAxMDAgKyBkaXYoZ20gLSA4LCA2KSwgMTAwKSAqIDMsIDQpICsgNzUyXG4gIHJldHVybiBkXG59XG5cbi8qXG4gIENhbGN1bGF0ZXMgR3JlZ29yaWFuIGFuZCBKdWxpYW4gY2FsZW5kYXIgZGF0ZXMgZnJvbSB0aGUgSnVsaWFuIERheSBudW1iZXJcbiAgKGpkbikgZm9yIHRoZSBwZXJpb2Qgc2luY2UgamRuPS0zNDgzOTY1NSAoaS5lLiB0aGUgeWVhciAtMTAwMTAwIG9mIGJvdGhcbiAgY2FsZW5kYXJzKSB0byBzb21lIG1pbGxpb25zIHllYXJzIGFoZWFkIG9mIHRoZSBwcmVzZW50LlxuXG4gIEBwYXJhbSBqZG4gSnVsaWFuIERheSBudW1iZXJcbiAgQHJldHVyblxuICAgIGd5OiBDYWxlbmRhciB5ZWFyICh5ZWFycyBCQyBudW1iZXJlZCAwLCAtMSwgLTIsIC4uLilcbiAgICBnbTogQ2FsZW5kYXIgbW9udGggKDEgdG8gMTIpXG4gICAgZ2Q6IENhbGVuZGFyIGRheSBvZiB0aGUgbW9udGggTSAoMSB0byAyOC8yOS8zMC8zMSlcbiovXG5mdW5jdGlvbiBkMmcgKGpkbikge1xuICBsZXQgaiA9IDQgKiBqZG4gKyAxMzkzNjE2MzFcbiAgaiA9IGogKyBkaXYoZGl2KDQgKiBqZG4gKyAxODMxODc3MjAsIDE0NjA5NykgKiAzLCA0KSAqIDQgLSAzOTA4XG4gIGNvbnN0XG4gICAgaSA9IGRpdihtb2QoaiwgMTQ2MSksIDQpICogNSArIDMwOCxcbiAgICBnZCA9IGRpdihtb2QoaSwgMTUzKSwgNSkgKyAxLFxuICAgIGdtID0gbW9kKGRpdihpLCAxNTMpLCAxMikgKyAxLFxuICAgIGd5ID0gZGl2KGosIDE0NjEpIC0gMTAwMTAwICsgZGl2KDggLSBnbSwgNilcbiAgcmV0dXJuIHtcbiAgICBneSxcbiAgICBnbSxcbiAgICBnZFxuICB9XG59XG5cbi8qXG4gIFV0aWxpdHkgaGVscGVyIGZ1bmN0aW9ucy5cbiovXG5cbmZ1bmN0aW9uIGRpdiAoYSwgYikge1xuICByZXR1cm4gfn4oYSAvIGIpXG59XG5cbmZ1bmN0aW9uIG1vZCAoYSwgYikge1xuICByZXR1cm4gYSAtIH5+KGEgLyBiKSAqIGJcbn1cbiIsImltcG9ydCB7IGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyB0b0phbGFhbGkgfSBmcm9tICcuLi8uLi91dGlscy9kYXRlL3ByaXZhdGUucGVyc2lhbi5qcydcbmltcG9ydCB7IHBhZCB9IGZyb20gJy4uLy4uL3V0aWxzL2Zvcm1hdC9mb3JtYXQuanMnXG5cbmNvbnN0IGNhbGVuZGFycyA9IFsgJ2dyZWdvcmlhbicsICdwZXJzaWFuJyBdXG5cbmV4cG9ydCBjb25zdCB1c2VEYXRldGltZVByb3BzID0ge1xuICAvLyBzaG91bGQgZGVmaW5lIG1vZGVsVmFsdWUgaW4gdGhlIHRhcmdldCBjb21wb25lbnRcblxuICBtYXNrOiB7XG4gICAgdHlwZTogU3RyaW5nXG4gIH0sXG4gIGxvY2FsZTogT2JqZWN0LFxuXG4gIGNhbGVuZGFyOiB7XG4gICAgdHlwZTogU3RyaW5nLFxuICAgIHZhbGlkYXRvcjogdiA9PiBjYWxlbmRhcnMuaW5jbHVkZXModiksXG4gICAgZGVmYXVsdDogJ2dyZWdvcmlhbidcbiAgfSxcblxuICBsYW5kc2NhcGU6IEJvb2xlYW4sXG5cbiAgY29sb3I6IFN0cmluZyxcbiAgdGV4dENvbG9yOiBTdHJpbmcsXG5cbiAgc3F1YXJlOiBCb29sZWFuLFxuICBmbGF0OiBCb29sZWFuLFxuICBib3JkZXJlZDogQm9vbGVhbixcblxuICByZWFkb25seTogQm9vbGVhbixcbiAgZGlzYWJsZTogQm9vbGVhblxufVxuXG5leHBvcnQgY29uc3QgdXNlRGF0ZXRpbWVFbWl0cyA9IFsgJ3VwZGF0ZTptb2RlbFZhbHVlJyBdXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREYXlIYXNoIChkYXRlKSB7XG4gIHJldHVybiBkYXRlLnllYXIgKyAnLycgKyBwYWQoZGF0ZS5tb250aCkgKyAnLycgKyBwYWQoZGF0ZS5kYXkpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgJHEpIHtcbiAgY29uc3QgZWRpdGFibGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgcmV0dXJuIHByb3BzLmRpc2FibGUgIT09IHRydWUgJiYgcHJvcHMucmVhZG9ubHkgIT09IHRydWVcbiAgfSlcblxuICBjb25zdCB0YWJpbmRleCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICByZXR1cm4gZWRpdGFibGUudmFsdWUgPT09IHRydWUgPyAwIDogLTFcbiAgfSlcblxuICBjb25zdCBoZWFkZXJDbGFzcyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBjb25zdCBjbHMgPSBbXVxuICAgIHByb3BzLmNvbG9yICE9PSB2b2lkIDAgJiYgY2xzLnB1c2goYGJnLSR7IHByb3BzLmNvbG9yIH1gKVxuICAgIHByb3BzLnRleHRDb2xvciAhPT0gdm9pZCAwICYmIGNscy5wdXNoKGB0ZXh0LSR7IHByb3BzLnRleHRDb2xvciB9YClcbiAgICByZXR1cm4gY2xzLmpvaW4oJyAnKVxuICB9KVxuXG4gIGZ1bmN0aW9uIGdldExvY2FsZSAoKSB7XG4gICAgcmV0dXJuIHByb3BzLmxvY2FsZSAhPT0gdm9pZCAwXG4gICAgICA/IHsgLi4uJHEubGFuZy5kYXRlLCAuLi5wcm9wcy5sb2NhbGUgfVxuICAgICAgOiAkcS5sYW5nLmRhdGVcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEN1cnJlbnREYXRlIChkYXRlT25seSkge1xuICAgIGNvbnN0IGQgPSBuZXcgRGF0ZSgpXG4gICAgY29uc3QgdGltZUZpbGwgPSBkYXRlT25seSA9PT0gdHJ1ZSA/IG51bGwgOiAwXG5cbiAgICBpZiAocHJvcHMuY2FsZW5kYXIgPT09ICdwZXJzaWFuJykge1xuICAgICAgY29uc3QgakRhdGUgPSB0b0phbGFhbGkoZClcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHllYXI6IGpEYXRlLmp5LFxuICAgICAgICBtb250aDogakRhdGUuam0sXG4gICAgICAgIGRheTogakRhdGUuamRcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgeWVhcjogZC5nZXRGdWxsWWVhcigpLFxuICAgICAgbW9udGg6IGQuZ2V0TW9udGgoKSArIDEsXG4gICAgICBkYXk6IGQuZ2V0RGF0ZSgpLFxuICAgICAgaG91cjogdGltZUZpbGwsXG4gICAgICBtaW51dGU6IHRpbWVGaWxsLFxuICAgICAgc2Vjb25kOiB0aW1lRmlsbCxcbiAgICAgIG1pbGxpc2Vjb25kOiB0aW1lRmlsbFxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZWRpdGFibGUsXG4gICAgdGFiaW5kZXgsXG4gICAgaGVhZGVyQ2xhc3MsXG5cbiAgICBnZXRMb2NhbGUsXG4gICAgZ2V0Q3VycmVudERhdGVcbiAgfVxufVxuIiwiLyogZXNsaW50IG5vLWZhbGx0aHJvdWdoOiAwICovXG5cbmltcG9ydCB7IGlzRGF0ZSB9IGZyb20gJy4uL2lzL2lzLmpzJ1xuaW1wb3J0IHsgcGFkLCBjYXBpdGFsaXplIH0gZnJvbSAnLi4vZm9ybWF0L2Zvcm1hdC5qcydcbmltcG9ydCB7IGphbGFhbGlNb250aExlbmd0aCB9IGZyb20gJy4vcHJpdmF0ZS5wZXJzaWFuLmpzJ1xuaW1wb3J0IExhbmcsIHsgZGVmYXVsdExhbmcgfSBmcm9tICcuLi8uLi9wbHVnaW5zL2xhbmcvTGFuZy5qcydcblxuY29uc3RcbiAgTUlMTElTRUNPTkRTX0lOX0RBWSA9IDg2NDAwMDAwLFxuICBNSUxMSVNFQ09ORFNfSU5fSE9VUiA9IDM2MDAwMDAsXG4gIE1JTExJU0VDT05EU19JTl9NSU5VVEUgPSA2MDAwMCxcbiAgZGVmYXVsdE1hc2sgPSAnWVlZWS1NTS1ERFRISDptbTpzcy5TU1NaJyxcbiAgdG9rZW4gPSAvXFxbKCg/OlteXFxdXFxcXF18XFxcXF18XFxcXCkqKVxcXXxkb3xkezEsNH18TW98TXsxLDR9fG17MSwyfXx3b3x3ezEsMn18UW98RG98REREb3xEezEsNH18WVkoPzpZWSk/fEh7MSwyfXxoezEsMn18c3sxLDJ9fFN7MSwzfXxaezEsMn18YXsxLDJ9fFtBUUV4WF0vZyxcbiAgcmV2ZXJzZVRva2VuID0gLyhcXFtbXlxcXV0qXFxdKXxkb3xkezEsNH18TW98TXsxLDR9fG17MSwyfXx3b3x3ezEsMn18UW98RG98REREb3xEezEsNH18WVkoPzpZWSk/fEh7MSwyfXxoezEsMn18c3sxLDJ9fFN7MSwzfXxaezEsMn18YXsxLDJ9fFtBUUV4WF18KFsuKis6P14sXFxzJHt9KCl8XFxcXF0rKS9nLFxuICByZWdleFN0b3JlID0ge31cblxuZnVuY3Rpb24gZ2V0UmVnZXhEYXRhIChtYXNrLCBkYXRlTG9jYWxlKSB7XG4gIGNvbnN0XG4gICAgZGF5cyA9ICcoJyArIGRhdGVMb2NhbGUuZGF5cy5qb2luKCd8JykgKyAnKScsXG4gICAga2V5ID0gbWFzayArIGRheXNcblxuICBpZiAocmVnZXhTdG9yZVsga2V5IF0gIT09IHZvaWQgMCkge1xuICAgIHJldHVybiByZWdleFN0b3JlWyBrZXkgXVxuICB9XG5cbiAgY29uc3RcbiAgICBkYXlzU2hvcnQgPSAnKCcgKyBkYXRlTG9jYWxlLmRheXNTaG9ydC5qb2luKCd8JykgKyAnKScsXG4gICAgbW9udGhzID0gJygnICsgZGF0ZUxvY2FsZS5tb250aHMuam9pbignfCcpICsgJyknLFxuICAgIG1vbnRoc1Nob3J0ID0gJygnICsgZGF0ZUxvY2FsZS5tb250aHNTaG9ydC5qb2luKCd8JykgKyAnKSdcblxuICBjb25zdCBtYXAgPSB7fVxuICBsZXQgaW5kZXggPSAwXG5cbiAgY29uc3QgcmVnZXhUZXh0ID0gbWFzay5yZXBsYWNlKHJldmVyc2VUb2tlbiwgbWF0Y2ggPT4ge1xuICAgIGluZGV4KytcbiAgICBzd2l0Y2ggKG1hdGNoKSB7XG4gICAgICBjYXNlICdZWSc6XG4gICAgICAgIG1hcC5ZWSA9IGluZGV4XG4gICAgICAgIHJldHVybiAnKC0/XFxcXGR7MSwyfSknXG4gICAgICBjYXNlICdZWVlZJzpcbiAgICAgICAgbWFwLllZWVkgPSBpbmRleFxuICAgICAgICByZXR1cm4gJygtP1xcXFxkezEsNH0pJ1xuICAgICAgY2FzZSAnTSc6XG4gICAgICAgIG1hcC5NID0gaW5kZXhcbiAgICAgICAgcmV0dXJuICcoXFxcXGR7MSwyfSknXG4gICAgICBjYXNlICdNbyc6XG4gICAgICAgIG1hcC5NID0gaW5kZXgrKyAvLyBidW1waW5nIHRvIE1cbiAgICAgICAgcmV0dXJuICcoXFxcXGR7MSwyfShzdHxuZHxyZHx0aCkpJ1xuICAgICAgY2FzZSAnTU0nOlxuICAgICAgICBtYXAuTSA9IGluZGV4IC8vIGJ1bXBpbmcgdG8gTVxuICAgICAgICByZXR1cm4gJyhcXFxcZHsyfSknXG4gICAgICBjYXNlICdNTU0nOlxuICAgICAgICBtYXAuTU1NID0gaW5kZXhcbiAgICAgICAgcmV0dXJuIG1vbnRoc1Nob3J0XG4gICAgICBjYXNlICdNTU1NJzpcbiAgICAgICAgbWFwLk1NTU0gPSBpbmRleFxuICAgICAgICByZXR1cm4gbW9udGhzXG4gICAgICBjYXNlICdEJzpcbiAgICAgICAgbWFwLkQgPSBpbmRleFxuICAgICAgICByZXR1cm4gJyhcXFxcZHsxLDJ9KSdcbiAgICAgIGNhc2UgJ0RvJzpcbiAgICAgICAgbWFwLkQgPSBpbmRleCsrIC8vIGJ1bXBpbmcgdG8gRFxuICAgICAgICByZXR1cm4gJyhcXFxcZHsxLDJ9KHN0fG5kfHJkfHRoKSknXG4gICAgICBjYXNlICdERCc6XG4gICAgICAgIG1hcC5EID0gaW5kZXggLy8gYnVtcGluZyB0byBEXG4gICAgICAgIHJldHVybiAnKFxcXFxkezJ9KSdcbiAgICAgIGNhc2UgJ0gnOlxuICAgICAgICBtYXAuSCA9IGluZGV4XG4gICAgICAgIHJldHVybiAnKFxcXFxkezEsMn0pJ1xuICAgICAgY2FzZSAnSEgnOlxuICAgICAgICBtYXAuSCA9IGluZGV4IC8vIGJ1bXBpbmcgdG8gSFxuICAgICAgICByZXR1cm4gJyhcXFxcZHsyfSknXG4gICAgICBjYXNlICdoJzpcbiAgICAgICAgbWFwLmggPSBpbmRleFxuICAgICAgICByZXR1cm4gJyhcXFxcZHsxLDJ9KSdcbiAgICAgIGNhc2UgJ2hoJzpcbiAgICAgICAgbWFwLmggPSBpbmRleCAvLyBidW1waW5nIHRvIGhcbiAgICAgICAgcmV0dXJuICcoXFxcXGR7Mn0pJ1xuICAgICAgY2FzZSAnbSc6XG4gICAgICAgIG1hcC5tID0gaW5kZXhcbiAgICAgICAgcmV0dXJuICcoXFxcXGR7MSwyfSknXG4gICAgICBjYXNlICdtbSc6XG4gICAgICAgIG1hcC5tID0gaW5kZXggLy8gYnVtcGluZyB0byBtXG4gICAgICAgIHJldHVybiAnKFxcXFxkezJ9KSdcbiAgICAgIGNhc2UgJ3MnOlxuICAgICAgICBtYXAucyA9IGluZGV4XG4gICAgICAgIHJldHVybiAnKFxcXFxkezEsMn0pJ1xuICAgICAgY2FzZSAnc3MnOlxuICAgICAgICBtYXAucyA9IGluZGV4IC8vIGJ1bXBpbmcgdG8gc1xuICAgICAgICByZXR1cm4gJyhcXFxcZHsyfSknXG4gICAgICBjYXNlICdTJzpcbiAgICAgICAgbWFwLlMgPSBpbmRleFxuICAgICAgICByZXR1cm4gJyhcXFxcZHsxfSknXG4gICAgICBjYXNlICdTUyc6XG4gICAgICAgIG1hcC5TID0gaW5kZXggLy8gYnVtcCB0byBTXG4gICAgICAgIHJldHVybiAnKFxcXFxkezJ9KSdcbiAgICAgIGNhc2UgJ1NTUyc6XG4gICAgICAgIG1hcC5TID0gaW5kZXggLy8gYnVtcCB0byBTXG4gICAgICAgIHJldHVybiAnKFxcXFxkezN9KSdcbiAgICAgIGNhc2UgJ0EnOlxuICAgICAgICBtYXAuQSA9IGluZGV4XG4gICAgICAgIHJldHVybiAnKEFNfFBNKSdcbiAgICAgIGNhc2UgJ2EnOlxuICAgICAgICBtYXAuYSA9IGluZGV4XG4gICAgICAgIHJldHVybiAnKGFtfHBtKSdcbiAgICAgIGNhc2UgJ2FhJzpcbiAgICAgICAgbWFwLmFhID0gaW5kZXhcbiAgICAgICAgcmV0dXJuICcoYVxcXFwubVxcXFwufHBcXFxcLm1cXFxcLiknXG5cbiAgICAgIGNhc2UgJ2RkZCc6XG4gICAgICAgIHJldHVybiBkYXlzU2hvcnRcbiAgICAgIGNhc2UgJ2RkZGQnOlxuICAgICAgICByZXR1cm4gZGF5c1xuICAgICAgY2FzZSAnUSc6XG4gICAgICBjYXNlICdkJzpcbiAgICAgIGNhc2UgJ0UnOlxuICAgICAgICByZXR1cm4gJyhcXFxcZHsxfSknXG4gICAgICBjYXNlICdkbyc6XG4gICAgICAgIGluZGV4KytcbiAgICAgICAgcmV0dXJuICcoXFxcXGR7MX0oc3R8bmR8cmR8dGgpKSdcbiAgICAgIGNhc2UgJ1FvJzpcbiAgICAgICAgcmV0dXJuICcoMXN0fDJuZHwzcmR8NHRoKSdcbiAgICAgIGNhc2UgJ0RERCc6XG4gICAgICBjYXNlICdEREREJzpcbiAgICAgICAgcmV0dXJuICcoXFxcXGR7MSwzfSknXG4gICAgICBjYXNlICdERERvJzpcbiAgICAgICAgaW5kZXgrK1xuICAgICAgICByZXR1cm4gJyhcXFxcZHsxLDN9KHN0fG5kfHJkfHRoKSknXG4gICAgICBjYXNlICd3JzpcbiAgICAgICAgcmV0dXJuICcoXFxcXGR7MSwyfSknXG4gICAgICBjYXNlICd3byc6XG4gICAgICAgIGluZGV4KytcbiAgICAgICAgcmV0dXJuICcoXFxcXGR7MSwyfShzdHxuZHxyZHx0aCkpJ1xuICAgICAgY2FzZSAnd3cnOlxuICAgICAgICByZXR1cm4gJyhcXFxcZHsyfSknXG5cbiAgICAgIGNhc2UgJ1onOiAvLyB0byBzcGxpdDogKD86KFopKCkoKXwoWystXSk/KFxcXFxkezJ9KTo/KFxcXFxkezJ9KSlcbiAgICAgICAgbWFwLlogPSBpbmRleFxuICAgICAgICByZXR1cm4gJyhafFsrLV1cXFxcZHsyfTpcXFxcZHsyfSknXG4gICAgICBjYXNlICdaWic6XG4gICAgICAgIG1hcC5aWiA9IGluZGV4XG4gICAgICAgIHJldHVybiAnKFp8WystXVxcXFxkezJ9XFxcXGR7Mn0pJ1xuXG4gICAgICBjYXNlICdYJzpcbiAgICAgICAgbWFwLlggPSBpbmRleFxuICAgICAgICByZXR1cm4gJygtP1xcXFxkKyknXG4gICAgICBjYXNlICd4JzpcbiAgICAgICAgbWFwLnggPSBpbmRleFxuICAgICAgICByZXR1cm4gJygtP1xcXFxkezQsfSknXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGluZGV4LS1cbiAgICAgICAgaWYgKG1hdGNoWyAwIF0gPT09ICdbJykge1xuICAgICAgICAgIG1hdGNoID0gbWF0Y2guc3Vic3RyaW5nKDEsIG1hdGNoLmxlbmd0aCAtIDEpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1hdGNoLnJlcGxhY2UoL1suKis/XiR7fSgpfFtcXF1cXFxcXS9nLCAnXFxcXCQmJylcbiAgICB9XG4gIH0pXG5cbiAgY29uc3QgcmVzID0geyBtYXAsIHJlZ2V4OiBuZXcgUmVnRXhwKCdeJyArIHJlZ2V4VGV4dCkgfVxuICByZWdleFN0b3JlWyBrZXkgXSA9IHJlc1xuXG4gIHJldHVybiByZXNcbn1cblxuZnVuY3Rpb24gZ2V0RGF0ZUxvY2FsZSAocGFyYW1EYXRlTG9jYWxlLCBsYW5nUHJvcHMpIHtcbiAgcmV0dXJuIHBhcmFtRGF0ZUxvY2FsZSAhPT0gdm9pZCAwXG4gICAgPyBwYXJhbURhdGVMb2NhbGVcbiAgICA6IChcbiAgICAgICAgbGFuZ1Byb3BzICE9PSB2b2lkIDBcbiAgICAgICAgICA/IGxhbmdQcm9wcy5kYXRlXG4gICAgICAgICAgOiBkZWZhdWx0TGFuZy5kYXRlXG4gICAgICApXG59XG5cbmZ1bmN0aW9uIGZvcm1hdFRpbWV6b25lIChvZmZzZXQsIGRlbGltZXRlciA9ICcnKSB7XG4gIGNvbnN0XG4gICAgc2lnbiA9IG9mZnNldCA+IDAgPyAnLScgOiAnKycsXG4gICAgYWJzT2Zmc2V0ID0gTWF0aC5hYnMob2Zmc2V0KSxcbiAgICBob3VycyA9IE1hdGguZmxvb3IoYWJzT2Zmc2V0IC8gNjApLFxuICAgIG1pbnV0ZXMgPSBhYnNPZmZzZXQgJSA2MFxuXG4gIHJldHVybiBzaWduICsgcGFkKGhvdXJzKSArIGRlbGltZXRlciArIHBhZChtaW51dGVzKVxufVxuXG5mdW5jdGlvbiBhcHBseVllYXJNb250aERheUNoYW5nZSAoZGF0ZSwgbW9kLCBzaWduKSB7XG4gIGxldFxuICAgIHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCksXG4gICAgbW9udGggPSBkYXRlLmdldE1vbnRoKClcblxuICBjb25zdCBkYXkgPSBkYXRlLmdldERhdGUoKVxuXG4gIGlmIChtb2QueWVhciAhPT0gdm9pZCAwKSB7XG4gICAgeWVhciArPSBzaWduICogbW9kLnllYXJcbiAgICBkZWxldGUgbW9kLnllYXJcbiAgfVxuXG4gIGlmIChtb2QubW9udGggIT09IHZvaWQgMCkge1xuICAgIG1vbnRoICs9IHNpZ24gKiBtb2QubW9udGhcbiAgICBkZWxldGUgbW9kLm1vbnRoXG4gIH1cblxuICBkYXRlLnNldERhdGUoMSlcbiAgZGF0ZS5zZXRNb250aCgyKVxuXG4gIGRhdGUuc2V0RnVsbFllYXIoeWVhcilcbiAgZGF0ZS5zZXRNb250aChtb250aClcbiAgZGF0ZS5zZXREYXRlKE1hdGgubWluKGRheSwgZGF5c0luTW9udGgoZGF0ZSkpKVxuXG4gIGlmIChtb2QuZGF0ZSAhPT0gdm9pZCAwKSB7XG4gICAgZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpICsgc2lnbiAqIG1vZC5kYXRlKVxuICAgIGRlbGV0ZSBtb2QuZGF0ZVxuICB9XG5cbiAgcmV0dXJuIGRhdGVcbn1cblxuZnVuY3Rpb24gYXBwbHlZZWFyTW9udGhEYXkgKGRhdGUsIG1vZCwgbWlkZGxlKSB7XG4gIGNvbnN0XG4gICAgeWVhciA9IG1vZC55ZWFyICE9PSB2b2lkIDAgPyBtb2QueWVhciA6IGRhdGVbIGBnZXQkeyBtaWRkbGUgfUZ1bGxZZWFyYCBdKCksXG4gICAgbW9udGggPSBtb2QubW9udGggIT09IHZvaWQgMCA/IG1vZC5tb250aCAtIDEgOiBkYXRlWyBgZ2V0JHsgbWlkZGxlIH1Nb250aGAgXSgpLFxuICAgIG1heERheSA9IChuZXcgRGF0ZSh5ZWFyLCBtb250aCArIDEsIDApKS5nZXREYXRlKCksXG4gICAgZGF5ID0gTWF0aC5taW4obWF4RGF5LCBtb2QuZGF0ZSAhPT0gdm9pZCAwID8gbW9kLmRhdGUgOiBkYXRlWyBgZ2V0JHsgbWlkZGxlIH1EYXRlYCBdKCkpXG5cbiAgZGF0ZVsgYHNldCR7IG1pZGRsZSB9RGF0ZWAgXSgxKVxuICBkYXRlWyBgc2V0JHsgbWlkZGxlIH1Nb250aGAgXSgyKVxuXG4gIGRhdGVbIGBzZXQkeyBtaWRkbGUgfUZ1bGxZZWFyYCBdKHllYXIpXG4gIGRhdGVbIGBzZXQkeyBtaWRkbGUgfU1vbnRoYCBdKG1vbnRoKVxuICBkYXRlWyBgc2V0JHsgbWlkZGxlIH1EYXRlYCBdKGRheSlcblxuICBkZWxldGUgbW9kLnllYXJcbiAgZGVsZXRlIG1vZC5tb250aFxuICBkZWxldGUgbW9kLmRhdGVcblxuICByZXR1cm4gZGF0ZVxufVxuXG5mdW5jdGlvbiBnZXRDaGFuZ2UgKGRhdGUsIHJhd01vZCwgc2lnbikge1xuICBjb25zdFxuICAgIG1vZCA9IG5vcm1hbGl6ZU1vZChyYXdNb2QpLFxuICAgIGQgPSBuZXcgRGF0ZShkYXRlKSxcbiAgICB0ID0gbW9kLnllYXIgIT09IHZvaWQgMCB8fCBtb2QubW9udGggIT09IHZvaWQgMCB8fCBtb2QuZGF0ZSAhPT0gdm9pZCAwXG4gICAgICA/IGFwcGx5WWVhck1vbnRoRGF5Q2hhbmdlKGQsIG1vZCwgc2lnbikgLy8gcmVtb3ZlcyB5ZWFyL21vbnRoL2RheVxuICAgICAgOiBkXG5cbiAgZm9yIChjb25zdCBrZXkgaW4gbW9kKSB7XG4gICAgY29uc3Qgb3AgPSBjYXBpdGFsaXplKGtleSlcbiAgICB0WyBgc2V0JHsgb3AgfWAgXSh0WyBgZ2V0JHsgb3AgfWAgXSgpICsgc2lnbiAqIG1vZFsga2V5IF0pXG4gIH1cblxuICByZXR1cm4gdFxufVxuXG5mdW5jdGlvbiBub3JtYWxpemVNb2QgKG1vZCkge1xuICBjb25zdCBhY2MgPSB7IC4uLm1vZCB9XG5cbiAgaWYgKG1vZC55ZWFycyAhPT0gdm9pZCAwKSB7XG4gICAgYWNjLnllYXIgPSBtb2QueWVhcnNcbiAgICBkZWxldGUgYWNjLnllYXJzXG4gIH1cblxuICBpZiAobW9kLm1vbnRocyAhPT0gdm9pZCAwKSB7XG4gICAgYWNjLm1vbnRoID0gbW9kLm1vbnRoc1xuICAgIGRlbGV0ZSBhY2MubW9udGhzXG4gIH1cblxuICBpZiAobW9kLmRheXMgIT09IHZvaWQgMCkge1xuICAgIGFjYy5kYXRlID0gbW9kLmRheXNcbiAgICBkZWxldGUgYWNjLmRheXNcbiAgfVxuICBpZiAobW9kLmRheSAhPT0gdm9pZCAwKSB7XG4gICAgYWNjLmRhdGUgPSBtb2QuZGF5XG4gICAgZGVsZXRlIGFjYy5kYXlcbiAgfVxuXG4gIGlmIChtb2QuaG91ciAhPT0gdm9pZCAwKSB7XG4gICAgYWNjLmhvdXJzID0gbW9kLmhvdXJcbiAgICBkZWxldGUgYWNjLmhvdXJcbiAgfVxuXG4gIGlmIChtb2QubWludXRlICE9PSB2b2lkIDApIHtcbiAgICBhY2MubWludXRlcyA9IG1vZC5taW51dGVcbiAgICBkZWxldGUgYWNjLm1pbnV0ZVxuICB9XG5cbiAgaWYgKG1vZC5zZWNvbmQgIT09IHZvaWQgMCkge1xuICAgIGFjYy5zZWNvbmRzID0gbW9kLnNlY29uZFxuICAgIGRlbGV0ZSBhY2Muc2Vjb25kXG4gIH1cblxuICBpZiAobW9kLm1pbGxpc2Vjb25kICE9PSB2b2lkIDApIHtcbiAgICBhY2MubWlsbGlzZWNvbmRzID0gbW9kLm1pbGxpc2Vjb25kXG4gICAgZGVsZXRlIGFjYy5taWxsaXNlY29uZFxuICB9XG5cbiAgcmV0dXJuIGFjY1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRqdXN0RGF0ZSAoZGF0ZSwgcmF3TW9kLCB1dGMpIHtcbiAgY29uc3RcbiAgICBtb2QgPSBub3JtYWxpemVNb2QocmF3TW9kKSxcbiAgICBtaWRkbGUgPSB1dGMgPT09IHRydWUgPyAnVVRDJyA6ICcnLFxuICAgIGQgPSBuZXcgRGF0ZShkYXRlKSxcbiAgICB0ID0gbW9kLnllYXIgIT09IHZvaWQgMCB8fCBtb2QubW9udGggIT09IHZvaWQgMCB8fCBtb2QuZGF0ZSAhPT0gdm9pZCAwXG4gICAgICA/IGFwcGx5WWVhck1vbnRoRGF5KGQsIG1vZCwgbWlkZGxlKSAvLyByZW1vdmVzIHllYXIvbW9udGgvZGF5XG4gICAgICA6IGRcblxuICBmb3IgKGNvbnN0IGtleSBpbiBtb2QpIHtcbiAgICBjb25zdCBvcCA9IGtleS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGtleS5zbGljZSgxKVxuICAgIHRbIGBzZXQkeyBtaWRkbGUgfSR7IG9wIH1gIF0obW9kWyBrZXkgXSlcbiAgfVxuXG4gIHJldHVybiB0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0RGF0ZSAoc3RyLCBtYXNrLCBkYXRlTG9jYWxlKSB7XG4gIGNvbnN0IGQgPSBfX3NwbGl0RGF0ZShzdHIsIG1hc2ssIGRhdGVMb2NhbGUpXG5cbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKFxuICAgIGQueWVhcixcbiAgICBkLm1vbnRoID09PSBudWxsID8gbnVsbCA6IGQubW9udGggLSAxLFxuICAgIGQuZGF5ID09PSBudWxsID8gMSA6IGQuZGF5LFxuICAgIGQuaG91cixcbiAgICBkLm1pbnV0ZSxcbiAgICBkLnNlY29uZCxcbiAgICBkLm1pbGxpc2Vjb25kXG4gIClcblxuICBjb25zdCB0ek9mZnNldCA9IGRhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKVxuXG4gIHJldHVybiBkLnRpbWV6b25lT2Zmc2V0ID09PSBudWxsIHx8IGQudGltZXpvbmVPZmZzZXQgPT09IHR6T2Zmc2V0XG4gICAgPyBkYXRlXG4gICAgOiBnZXRDaGFuZ2UoZGF0ZSwgeyBtaW51dGVzOiBkLnRpbWV6b25lT2Zmc2V0IC0gdHpPZmZzZXQgfSwgMSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fc3BsaXREYXRlIChzdHIsIG1hc2ssIGRhdGVMb2NhbGUsIGNhbGVuZGFyLCBkZWZhdWx0TW9kZWwpIHtcbiAgY29uc3QgZGF0ZSA9IHtcbiAgICB5ZWFyOiBudWxsLFxuICAgIG1vbnRoOiBudWxsLFxuICAgIGRheTogbnVsbCxcbiAgICBob3VyOiBudWxsLFxuICAgIG1pbnV0ZTogbnVsbCxcbiAgICBzZWNvbmQ6IG51bGwsXG4gICAgbWlsbGlzZWNvbmQ6IG51bGwsXG4gICAgdGltZXpvbmVPZmZzZXQ6IG51bGwsXG4gICAgZGF0ZUhhc2g6IG51bGwsXG4gICAgdGltZUhhc2g6IG51bGxcbiAgfVxuXG4gIGRlZmF1bHRNb2RlbCAhPT0gdm9pZCAwICYmIE9iamVjdC5hc3NpZ24oZGF0ZSwgZGVmYXVsdE1vZGVsKVxuXG4gIGlmIChcbiAgICBzdHIgPT09IHZvaWQgMFxuICAgIHx8IHN0ciA9PT0gbnVsbFxuICAgIHx8IHN0ciA9PT0gJydcbiAgICB8fCB0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJ1xuICApIHtcbiAgICByZXR1cm4gZGF0ZVxuICB9XG5cbiAgaWYgKG1hc2sgPT09IHZvaWQgMCkge1xuICAgIG1hc2sgPSBkZWZhdWx0TWFza1xuICB9XG5cbiAgY29uc3RcbiAgICBsYW5nT3B0cyA9IGdldERhdGVMb2NhbGUoZGF0ZUxvY2FsZSwgTGFuZy5wcm9wcyksXG4gICAgbW9udGhzID0gbGFuZ09wdHMubW9udGhzLFxuICAgIG1vbnRoc1Nob3J0ID0gbGFuZ09wdHMubW9udGhzU2hvcnRcblxuICBjb25zdCB7IHJlZ2V4LCBtYXAgfSA9IGdldFJlZ2V4RGF0YShtYXNrLCBsYW5nT3B0cylcblxuICBjb25zdCBtYXRjaCA9IHN0ci5tYXRjaChyZWdleClcblxuICBpZiAobWF0Y2ggPT09IG51bGwpIHtcbiAgICByZXR1cm4gZGF0ZVxuICB9XG5cbiAgbGV0IHR6U3RyaW5nID0gJydcblxuICBpZiAobWFwLlggIT09IHZvaWQgMCB8fCBtYXAueCAhPT0gdm9pZCAwKSB7XG4gICAgY29uc3Qgc3RhbXAgPSBwYXJzZUludChtYXRjaFsgbWFwLlggIT09IHZvaWQgMCA/IG1hcC5YIDogbWFwLnggXSwgMTApXG5cbiAgICBpZiAoaXNOYU4oc3RhbXApID09PSB0cnVlIHx8IHN0YW1wIDwgMCkge1xuICAgICAgcmV0dXJuIGRhdGVcbiAgICB9XG5cbiAgICBjb25zdCBkID0gbmV3IERhdGUoc3RhbXAgKiAobWFwLlggIT09IHZvaWQgMCA/IDEwMDAgOiAxKSlcblxuICAgIGRhdGUueWVhciA9IGQuZ2V0RnVsbFllYXIoKVxuICAgIGRhdGUubW9udGggPSBkLmdldE1vbnRoKCkgKyAxXG4gICAgZGF0ZS5kYXkgPSBkLmdldERhdGUoKVxuICAgIGRhdGUuaG91ciA9IGQuZ2V0SG91cnMoKVxuICAgIGRhdGUubWludXRlID0gZC5nZXRNaW51dGVzKClcbiAgICBkYXRlLnNlY29uZCA9IGQuZ2V0U2Vjb25kcygpXG4gICAgZGF0ZS5taWxsaXNlY29uZCA9IGQuZ2V0TWlsbGlzZWNvbmRzKClcbiAgfVxuICBlbHNlIHtcbiAgICBpZiAobWFwLllZWVkgIT09IHZvaWQgMCkge1xuICAgICAgZGF0ZS55ZWFyID0gcGFyc2VJbnQobWF0Y2hbIG1hcC5ZWVlZIF0sIDEwKVxuICAgIH1cbiAgICBlbHNlIGlmIChtYXAuWVkgIT09IHZvaWQgMCkge1xuICAgICAgY29uc3QgeSA9IHBhcnNlSW50KG1hdGNoWyBtYXAuWVkgXSwgMTApXG4gICAgICBkYXRlLnllYXIgPSB5IDwgMCA/IHkgOiAyMDAwICsgeVxuICAgIH1cblxuICAgIGlmIChtYXAuTSAhPT0gdm9pZCAwKSB7XG4gICAgICBkYXRlLm1vbnRoID0gcGFyc2VJbnQobWF0Y2hbIG1hcC5NIF0sIDEwKVxuICAgICAgaWYgKGRhdGUubW9udGggPCAxIHx8IGRhdGUubW9udGggPiAxMikge1xuICAgICAgICByZXR1cm4gZGF0ZVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChtYXAuTU1NICE9PSB2b2lkIDApIHtcbiAgICAgIGRhdGUubW9udGggPSBtb250aHNTaG9ydC5pbmRleE9mKG1hdGNoWyBtYXAuTU1NIF0pICsgMVxuICAgIH1cbiAgICBlbHNlIGlmIChtYXAuTU1NTSAhPT0gdm9pZCAwKSB7XG4gICAgICBkYXRlLm1vbnRoID0gbW9udGhzLmluZGV4T2YobWF0Y2hbIG1hcC5NTU1NIF0pICsgMVxuICAgIH1cblxuICAgIGlmIChtYXAuRCAhPT0gdm9pZCAwKSB7XG4gICAgICBkYXRlLmRheSA9IHBhcnNlSW50KG1hdGNoWyBtYXAuRCBdLCAxMClcblxuICAgICAgaWYgKGRhdGUueWVhciA9PT0gbnVsbCB8fCBkYXRlLm1vbnRoID09PSBudWxsIHx8IGRhdGUuZGF5IDwgMSkge1xuICAgICAgICByZXR1cm4gZGF0ZVxuICAgICAgfVxuXG4gICAgICBjb25zdCBtYXhEYXkgPSBjYWxlbmRhciAhPT0gJ3BlcnNpYW4nXG4gICAgICAgID8gKG5ldyBEYXRlKGRhdGUueWVhciwgZGF0ZS5tb250aCwgMCkpLmdldERhdGUoKVxuICAgICAgICA6IGphbGFhbGlNb250aExlbmd0aChkYXRlLnllYXIsIGRhdGUubW9udGgpXG5cbiAgICAgIGlmIChkYXRlLmRheSA+IG1heERheSkge1xuICAgICAgICByZXR1cm4gZGF0ZVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChtYXAuSCAhPT0gdm9pZCAwKSB7XG4gICAgICBkYXRlLmhvdXIgPSBwYXJzZUludChtYXRjaFsgbWFwLkggXSwgMTApICUgMjRcbiAgICB9XG4gICAgZWxzZSBpZiAobWFwLmggIT09IHZvaWQgMCkge1xuICAgICAgZGF0ZS5ob3VyID0gcGFyc2VJbnQobWF0Y2hbIG1hcC5oIF0sIDEwKSAlIDEyXG4gICAgICBpZiAoXG4gICAgICAgIChtYXAuQSAmJiBtYXRjaFsgbWFwLkEgXSA9PT0gJ1BNJylcbiAgICAgICAgfHwgKG1hcC5hICYmIG1hdGNoWyBtYXAuYSBdID09PSAncG0nKVxuICAgICAgICB8fCAobWFwLmFhICYmIG1hdGNoWyBtYXAuYWEgXSA9PT0gJ3AubS4nKVxuICAgICAgKSB7XG4gICAgICAgIGRhdGUuaG91ciArPSAxMlxuICAgICAgfVxuICAgICAgZGF0ZS5ob3VyID0gZGF0ZS5ob3VyICUgMjRcbiAgICB9XG5cbiAgICBpZiAobWFwLm0gIT09IHZvaWQgMCkge1xuICAgICAgZGF0ZS5taW51dGUgPSBwYXJzZUludChtYXRjaFsgbWFwLm0gXSwgMTApICUgNjBcbiAgICB9XG5cbiAgICBpZiAobWFwLnMgIT09IHZvaWQgMCkge1xuICAgICAgZGF0ZS5zZWNvbmQgPSBwYXJzZUludChtYXRjaFsgbWFwLnMgXSwgMTApICUgNjBcbiAgICB9XG5cbiAgICBpZiAobWFwLlMgIT09IHZvaWQgMCkge1xuICAgICAgZGF0ZS5taWxsaXNlY29uZCA9IHBhcnNlSW50KG1hdGNoWyBtYXAuUyBdLCAxMCkgKiAxMCAqKiAoMyAtIG1hdGNoWyBtYXAuUyBdLmxlbmd0aClcbiAgICB9XG5cbiAgICBpZiAobWFwLlogIT09IHZvaWQgMCB8fCBtYXAuWlogIT09IHZvaWQgMCkge1xuICAgICAgdHpTdHJpbmcgPSAobWFwLlogIT09IHZvaWQgMCA/IG1hdGNoWyBtYXAuWiBdLnJlcGxhY2UoJzonLCAnJykgOiBtYXRjaFsgbWFwLlpaIF0pXG4gICAgICBkYXRlLnRpbWV6b25lT2Zmc2V0ID0gKHR6U3RyaW5nWyAwIF0gPT09ICcrJyA/IC0xIDogMSkgKiAoNjAgKiB0elN0cmluZy5zbGljZSgxLCAzKSArIDEgKiB0elN0cmluZy5zbGljZSgzLCA1KSlcbiAgICB9XG4gIH1cblxuICBkYXRlLmRhdGVIYXNoID0gcGFkKGRhdGUueWVhciwgNikgKyAnLycgKyBwYWQoZGF0ZS5tb250aCkgKyAnLycgKyBwYWQoZGF0ZS5kYXkpXG4gIGRhdGUudGltZUhhc2ggPSBwYWQoZGF0ZS5ob3VyKSArICc6JyArIHBhZChkYXRlLm1pbnV0ZSkgKyAnOicgKyBwYWQoZGF0ZS5zZWNvbmQpICsgdHpTdHJpbmdcblxuICByZXR1cm4gZGF0ZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNWYWxpZCAoZGF0ZSkge1xuICByZXR1cm4gdHlwZW9mIGRhdGUgPT09ICdudW1iZXInXG4gICAgPyB0cnVlXG4gICAgOiBpc05hTihEYXRlLnBhcnNlKGRhdGUpKSA9PT0gZmFsc2Vcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkRGF0ZSAobW9kLCB1dGMpIHtcbiAgcmV0dXJuIGFkanVzdERhdGUobmV3IERhdGUoKSwgbW9kLCB1dGMpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREYXlPZldlZWsgKGRhdGUpIHtcbiAgY29uc3QgZG93ID0gbmV3IERhdGUoZGF0ZSkuZ2V0RGF5KClcbiAgcmV0dXJuIGRvdyA9PT0gMCA/IDcgOiBkb3dcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFdlZWtPZlllYXIgKGRhdGUpIHtcbiAgLy8gUmVtb3ZlIHRpbWUgY29tcG9uZW50cyBvZiBkYXRlXG4gIGNvbnN0IHRodXJzZGF5ID0gbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksIGRhdGUuZ2V0RGF0ZSgpKVxuXG4gIC8vIENoYW5nZSBkYXRlIHRvIFRodXJzZGF5IHNhbWUgd2Vla1xuICB0aHVyc2RheS5zZXREYXRlKHRodXJzZGF5LmdldERhdGUoKSAtICgodGh1cnNkYXkuZ2V0RGF5KCkgKyA2KSAlIDcpICsgMylcblxuICAvLyBUYWtlIEphbnVhcnkgNHRoIGFzIGl0IGlzIGFsd2F5cyBpbiB3ZWVrIDEgKHNlZSBJU08gODYwMSlcbiAgY29uc3QgZmlyc3RUaHVyc2RheSA9IG5ldyBEYXRlKHRodXJzZGF5LmdldEZ1bGxZZWFyKCksIDAsIDQpXG5cbiAgLy8gQ2hhbmdlIGRhdGUgdG8gVGh1cnNkYXkgc2FtZSB3ZWVrXG4gIGZpcnN0VGh1cnNkYXkuc2V0RGF0ZShmaXJzdFRodXJzZGF5LmdldERhdGUoKSAtICgoZmlyc3RUaHVyc2RheS5nZXREYXkoKSArIDYpICUgNykgKyAzKVxuXG4gIC8vIENoZWNrIGlmIGRheWxpZ2h0LXNhdmluZy10aW1lLXN3aXRjaCBvY2N1cnJlZCBhbmQgY29ycmVjdCBmb3IgaXRcbiAgY29uc3QgZHMgPSB0aHVyc2RheS5nZXRUaW1lem9uZU9mZnNldCgpIC0gZmlyc3RUaHVyc2RheS5nZXRUaW1lem9uZU9mZnNldCgpXG4gIHRodXJzZGF5LnNldEhvdXJzKHRodXJzZGF5LmdldEhvdXJzKCkgLSBkcylcblxuICAvLyBOdW1iZXIgb2Ygd2Vla3MgYmV0d2VlbiB0YXJnZXQgVGh1cnNkYXkgYW5kIGZpcnN0IFRodXJzZGF5XG4gIGNvbnN0IHdlZWtEaWZmID0gKHRodXJzZGF5IC0gZmlyc3RUaHVyc2RheSkgLyAoTUlMTElTRUNPTkRTX0lOX0RBWSAqIDcpXG4gIHJldHVybiAxICsgTWF0aC5mbG9vcih3ZWVrRGlmZilcbn1cblxuZnVuY3Rpb24gZ2V0RGF5SWRlbnRpZmllciAoZGF0ZSkge1xuICByZXR1cm4gZGF0ZS5nZXRGdWxsWWVhcigpICogMTAwMDAgKyBkYXRlLmdldE1vbnRoKCkgKiAxMDAgKyBkYXRlLmdldERhdGUoKVxufVxuXG5mdW5jdGlvbiBnZXREYXRlSWRlbnRpZmllciAoZGF0ZSwgb25seURhdGUgLyogPSBmYWxzZSAqLykge1xuICBjb25zdCBkID0gbmV3IERhdGUoZGF0ZSlcbiAgcmV0dXJuIG9ubHlEYXRlID09PSB0cnVlID8gZ2V0RGF5SWRlbnRpZmllcihkKSA6IGQuZ2V0VGltZSgpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0JldHdlZW5EYXRlcyAoZGF0ZSwgZnJvbSwgdG8sIG9wdHMgPSB7fSkge1xuICBjb25zdFxuICAgIGQxID0gZ2V0RGF0ZUlkZW50aWZpZXIoZnJvbSwgb3B0cy5vbmx5RGF0ZSksXG4gICAgZDIgPSBnZXREYXRlSWRlbnRpZmllcih0bywgb3B0cy5vbmx5RGF0ZSksXG4gICAgY3VyID0gZ2V0RGF0ZUlkZW50aWZpZXIoZGF0ZSwgb3B0cy5vbmx5RGF0ZSlcblxuICByZXR1cm4gKGN1ciA+IGQxIHx8IChvcHRzLmluY2x1c2l2ZUZyb20gPT09IHRydWUgJiYgY3VyID09PSBkMSkpXG4gICAgJiYgKGN1ciA8IGQyIHx8IChvcHRzLmluY2x1c2l2ZVRvID09PSB0cnVlICYmIGN1ciA9PT0gZDIpKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkVG9EYXRlIChkYXRlLCBtb2QpIHtcbiAgcmV0dXJuIGdldENoYW5nZShkYXRlLCBtb2QsIDEpXG59XG5leHBvcnQgZnVuY3Rpb24gc3VidHJhY3RGcm9tRGF0ZSAoZGF0ZSwgbW9kKSB7XG4gIHJldHVybiBnZXRDaGFuZ2UoZGF0ZSwgbW9kLCAtMSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0T2ZEYXRlIChkYXRlLCB1bml0LCB1dGMpIHtcbiAgY29uc3RcbiAgICB0ID0gbmV3IERhdGUoZGF0ZSksXG4gICAgcHJlZml4ID0gYHNldCR7IHV0YyA9PT0gdHJ1ZSA/ICdVVEMnIDogJycgfWBcblxuICBzd2l0Y2ggKHVuaXQpIHtcbiAgICBjYXNlICd5ZWFyJzpcbiAgICBjYXNlICd5ZWFycyc6XG4gICAgICB0WyBgJHsgcHJlZml4IH1Nb250aGAgXSgwKVxuICAgIGNhc2UgJ21vbnRoJzpcbiAgICBjYXNlICdtb250aHMnOlxuICAgICAgdFsgYCR7IHByZWZpeCB9RGF0ZWAgXSgxKVxuICAgIGNhc2UgJ2RheSc6XG4gICAgY2FzZSAnZGF5cyc6XG4gICAgY2FzZSAnZGF0ZSc6XG4gICAgICB0WyBgJHsgcHJlZml4IH1Ib3Vyc2AgXSgwKVxuICAgIGNhc2UgJ2hvdXInOlxuICAgIGNhc2UgJ2hvdXJzJzpcbiAgICAgIHRbIGAkeyBwcmVmaXggfU1pbnV0ZXNgIF0oMClcbiAgICBjYXNlICdtaW51dGUnOlxuICAgIGNhc2UgJ21pbnV0ZXMnOlxuICAgICAgdFsgYCR7IHByZWZpeCB9U2Vjb25kc2AgXSgwKVxuICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgY2FzZSAnc2Vjb25kcyc6XG4gICAgICB0WyBgJHsgcHJlZml4IH1NaWxsaXNlY29uZHNgIF0oMClcbiAgfVxuICByZXR1cm4gdFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZW5kT2ZEYXRlIChkYXRlLCB1bml0LCB1dGMpIHtcbiAgY29uc3RcbiAgICB0ID0gbmV3IERhdGUoZGF0ZSksXG4gICAgcHJlZml4ID0gYHNldCR7IHV0YyA9PT0gdHJ1ZSA/ICdVVEMnIDogJycgfWBcblxuICBzd2l0Y2ggKHVuaXQpIHtcbiAgICBjYXNlICd5ZWFyJzpcbiAgICBjYXNlICd5ZWFycyc6XG4gICAgICB0WyBgJHsgcHJlZml4IH1Nb250aGAgXSgxMSlcbiAgICBjYXNlICdtb250aCc6XG4gICAgY2FzZSAnbW9udGhzJzpcbiAgICAgIHRbIGAkeyBwcmVmaXggfURhdGVgIF0oZGF5c0luTW9udGgodCkpXG4gICAgY2FzZSAnZGF5JzpcbiAgICBjYXNlICdkYXlzJzpcbiAgICBjYXNlICdkYXRlJzpcbiAgICAgIHRbIGAkeyBwcmVmaXggfUhvdXJzYCBdKDIzKVxuICAgIGNhc2UgJ2hvdXInOlxuICAgIGNhc2UgJ2hvdXJzJzpcbiAgICAgIHRbIGAkeyBwcmVmaXggfU1pbnV0ZXNgIF0oNTkpXG4gICAgY2FzZSAnbWludXRlJzpcbiAgICBjYXNlICdtaW51dGVzJzpcbiAgICAgIHRbIGAkeyBwcmVmaXggfVNlY29uZHNgIF0oNTkpXG4gICAgY2FzZSAnc2Vjb25kJzpcbiAgICBjYXNlICdzZWNvbmRzJzpcbiAgICAgIHRbIGAkeyBwcmVmaXggfU1pbGxpc2Vjb25kc2AgXSg5OTkpXG4gIH1cbiAgcmV0dXJuIHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE1heERhdGUgKGRhdGUgLyogLCAuLi5hcmdzICovKSB7XG4gIGxldCB0ID0gbmV3IERhdGUoZGF0ZSlcbiAgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKS5mb3JFYWNoKGQgPT4ge1xuICAgIHQgPSBNYXRoLm1heCh0LCBuZXcgRGF0ZShkKSlcbiAgfSlcbiAgcmV0dXJuIHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE1pbkRhdGUgKGRhdGUgLyosIC4uLmFyZ3MgKi8pIHtcbiAgbGV0IHQgPSBuZXcgRGF0ZShkYXRlKVxuICBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpLmZvckVhY2goZCA9PiB7XG4gICAgdCA9IE1hdGgubWluKHQsIG5ldyBEYXRlKGQpKVxuICB9KVxuICByZXR1cm4gdFxufVxuXG5mdW5jdGlvbiBnZXREaWZmICh0LCBzdWIsIGludGVydmFsKSB7XG4gIHJldHVybiAoXG4gICAgKHQuZ2V0VGltZSgpIC0gdC5nZXRUaW1lem9uZU9mZnNldCgpICogTUlMTElTRUNPTkRTX0lOX01JTlVURSlcbiAgICAtIChzdWIuZ2V0VGltZSgpIC0gc3ViLmdldFRpbWV6b25lT2Zmc2V0KCkgKiBNSUxMSVNFQ09ORFNfSU5fTUlOVVRFKVxuICApIC8gaW50ZXJ2YWxcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERhdGVEaWZmIChkYXRlLCBzdWJ0cmFjdCwgdW5pdCA9ICdkYXlzJykge1xuICBjb25zdFxuICAgIHQgPSBuZXcgRGF0ZShkYXRlKSxcbiAgICBzdWIgPSBuZXcgRGF0ZShzdWJ0cmFjdClcblxuICBzd2l0Y2ggKHVuaXQpIHtcbiAgICBjYXNlICd5ZWFycyc6XG4gICAgY2FzZSAneWVhcic6XG4gICAgICByZXR1cm4gKHQuZ2V0RnVsbFllYXIoKSAtIHN1Yi5nZXRGdWxsWWVhcigpKVxuXG4gICAgY2FzZSAnbW9udGhzJzpcbiAgICBjYXNlICdtb250aCc6XG4gICAgICByZXR1cm4gKHQuZ2V0RnVsbFllYXIoKSAtIHN1Yi5nZXRGdWxsWWVhcigpKSAqIDEyICsgdC5nZXRNb250aCgpIC0gc3ViLmdldE1vbnRoKClcblxuICAgIGNhc2UgJ2RheXMnOlxuICAgIGNhc2UgJ2RheSc6XG4gICAgY2FzZSAnZGF0ZSc6XG4gICAgICByZXR1cm4gZ2V0RGlmZihzdGFydE9mRGF0ZSh0LCAnZGF5JyksIHN0YXJ0T2ZEYXRlKHN1YiwgJ2RheScpLCBNSUxMSVNFQ09ORFNfSU5fREFZKVxuXG4gICAgY2FzZSAnaG91cnMnOlxuICAgIGNhc2UgJ2hvdXInOlxuICAgICAgcmV0dXJuIGdldERpZmYoc3RhcnRPZkRhdGUodCwgJ2hvdXInKSwgc3RhcnRPZkRhdGUoc3ViLCAnaG91cicpLCBNSUxMSVNFQ09ORFNfSU5fSE9VUilcblxuICAgIGNhc2UgJ21pbnV0ZXMnOlxuICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgICByZXR1cm4gZ2V0RGlmZihzdGFydE9mRGF0ZSh0LCAnbWludXRlJyksIHN0YXJ0T2ZEYXRlKHN1YiwgJ21pbnV0ZScpLCBNSUxMSVNFQ09ORFNfSU5fTUlOVVRFKVxuXG4gICAgY2FzZSAnc2Vjb25kcyc6XG4gICAgY2FzZSAnc2Vjb25kJzpcbiAgICAgIHJldHVybiBnZXREaWZmKHN0YXJ0T2ZEYXRlKHQsICdzZWNvbmQnKSwgc3RhcnRPZkRhdGUoc3ViLCAnc2Vjb25kJyksIDEwMDApXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERheU9mWWVhciAoZGF0ZSkge1xuICByZXR1cm4gZ2V0RGF0ZURpZmYoZGF0ZSwgc3RhcnRPZkRhdGUoZGF0ZSwgJ3llYXInKSwgJ2RheXMnKSArIDFcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluZmVyRGF0ZUZvcm1hdCAoZGF0ZSkge1xuICByZXR1cm4gaXNEYXRlKGRhdGUpID09PSB0cnVlXG4gICAgPyAnZGF0ZSdcbiAgICA6ICh0eXBlb2YgZGF0ZSA9PT0gJ251bWJlcicgPyAnbnVtYmVyJyA6ICdzdHJpbmcnKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGF0ZUJldHdlZW4gKGRhdGUsIG1pbiwgbWF4KSB7XG4gIGNvbnN0IHQgPSBuZXcgRGF0ZShkYXRlKVxuXG4gIGlmIChtaW4pIHtcbiAgICBjb25zdCBsb3cgPSBuZXcgRGF0ZShtaW4pXG4gICAgaWYgKHQgPCBsb3cpIHtcbiAgICAgIHJldHVybiBsb3dcbiAgICB9XG4gIH1cblxuICBpZiAobWF4KSB7XG4gICAgY29uc3QgaGlnaCA9IG5ldyBEYXRlKG1heClcbiAgICBpZiAodCA+IGhpZ2gpIHtcbiAgICAgIHJldHVybiBoaWdoXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU2FtZURhdGUgKGRhdGUsIGRhdGUyLCB1bml0KSB7XG4gIGNvbnN0XG4gICAgdCA9IG5ldyBEYXRlKGRhdGUpLFxuICAgIGQgPSBuZXcgRGF0ZShkYXRlMilcblxuICBpZiAodW5pdCA9PT0gdm9pZCAwKSB7XG4gICAgcmV0dXJuIHQuZ2V0VGltZSgpID09PSBkLmdldFRpbWUoKVxuICB9XG5cbiAgc3dpdGNoICh1bml0KSB7XG4gICAgY2FzZSAnc2Vjb25kJzpcbiAgICBjYXNlICdzZWNvbmRzJzpcbiAgICAgIGlmICh0LmdldFNlY29uZHMoKSAhPT0gZC5nZXRTZWNvbmRzKCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgY2FzZSAnbWludXRlJzogLy8gaW50ZW50aW9uYWwgZmFsbC10aHJvdWdoXG4gICAgY2FzZSAnbWludXRlcyc6XG4gICAgICBpZiAodC5nZXRNaW51dGVzKCkgIT09IGQuZ2V0TWludXRlcygpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIGNhc2UgJ2hvdXInOiAvLyBpbnRlbnRpb25hbCBmYWxsLXRocm91Z2hcbiAgICBjYXNlICdob3Vycyc6XG4gICAgICBpZiAodC5nZXRIb3VycygpICE9PSBkLmdldEhvdXJzKCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgY2FzZSAnZGF5JzogLy8gaW50ZW50aW9uYWwgZmFsbC10aHJvdWdoXG4gICAgY2FzZSAnZGF5cyc6XG4gICAgY2FzZSAnZGF0ZSc6XG4gICAgICBpZiAodC5nZXREYXRlKCkgIT09IGQuZ2V0RGF0ZSgpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIGNhc2UgJ21vbnRoJzogLy8gaW50ZW50aW9uYWwgZmFsbC10aHJvdWdoXG4gICAgY2FzZSAnbW9udGhzJzpcbiAgICAgIGlmICh0LmdldE1vbnRoKCkgIT09IGQuZ2V0TW9udGgoKSkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICBjYXNlICd5ZWFyJzogLy8gaW50ZW50aW9uYWwgZmFsbC10aHJvdWdoXG4gICAgY2FzZSAneWVhcnMnOlxuICAgICAgaWYgKHQuZ2V0RnVsbFllYXIoKSAhPT0gZC5nZXRGdWxsWWVhcigpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgICAgYnJlYWtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBkYXRlIGlzU2FtZURhdGUgdW5rbm93biB1bml0ICR7IHVuaXQgfWApXG4gIH1cblxuICByZXR1cm4gdHJ1ZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGF5c0luTW9udGggKGRhdGUpIHtcbiAgcmV0dXJuIChuZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSArIDEsIDApKS5nZXREYXRlKClcbn1cblxuZnVuY3Rpb24gZ2V0T3JkaW5hbCAobikge1xuICBpZiAobiA+PSAxMSAmJiBuIDw9IDEzKSB7XG4gICAgcmV0dXJuIGAkeyBuIH10aGBcbiAgfVxuICBzd2l0Y2ggKG4gJSAxMCkge1xuICAgIGNhc2UgMTogcmV0dXJuIGAkeyBuIH1zdGBcbiAgICBjYXNlIDI6IHJldHVybiBgJHsgbiB9bmRgXG4gICAgY2FzZSAzOiByZXR1cm4gYCR7IG4gfXJkYFxuICB9XG4gIHJldHVybiBgJHsgbiB9dGhgXG59XG5cbmNvbnN0IGZvcm1hdHRlciA9IHtcbiAgLy8gWWVhcjogMDAsIDAxLCAuLi4sIDk5XG4gIFlZIChkYXRlLCBkYXRlTG9jYWxlLCBmb3JjZWRZZWFyKSB7XG4gICAgLy8gd29ya2Fyb3VuZCBmb3IgPCAxOTAwIHdpdGggbmV3IERhdGUoKVxuICAgIGNvbnN0IHkgPSB0aGlzLllZWVkoZGF0ZSwgZGF0ZUxvY2FsZSwgZm9yY2VkWWVhcikgJSAxMDBcbiAgICByZXR1cm4geSA+PSAwXG4gICAgICA/IHBhZCh5KVxuICAgICAgOiAnLScgKyBwYWQoTWF0aC5hYnMoeSkpXG4gIH0sXG5cbiAgLy8gWWVhcjogMTkwMCwgMTkwMSwgLi4uLCAyMDk5XG4gIFlZWVkgKGRhdGUsIF9kYXRlTG9jYWxlLCBmb3JjZWRZZWFyKSB7XG4gICAgLy8gd29ya2Fyb3VuZCBmb3IgPCAxOTAwIHdpdGggbmV3IERhdGUoKVxuICAgIHJldHVybiBmb3JjZWRZZWFyICE9PSB2b2lkIDAgJiYgZm9yY2VkWWVhciAhPT0gbnVsbFxuICAgICAgPyBmb3JjZWRZZWFyXG4gICAgICA6IGRhdGUuZ2V0RnVsbFllYXIoKVxuICB9LFxuXG4gIC8vIE1vbnRoOiAxLCAyLCAuLi4sIDEyXG4gIE0gKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRNb250aCgpICsgMVxuICB9LFxuXG4gIC8vIE1vbnRoOiAxc3QsIDJuZCwgLi4uLCAxMnRoXG4gIE1vIChkYXRlKSB7XG4gICAgcmV0dXJuIGdldE9yZGluYWwoZGF0ZS5nZXRNb250aCgpICsgMSlcbiAgfSxcblxuICAvLyBNb250aDogMDEsIDAyLCAuLi4sIDEyXG4gIE1NIChkYXRlKSB7XG4gICAgcmV0dXJuIHBhZChkYXRlLmdldE1vbnRoKCkgKyAxKVxuICB9LFxuXG4gIC8vIE1vbnRoIFNob3J0IE5hbWU6IEphbiwgRmViLCAuLi5cbiAgTU1NIChkYXRlLCBkYXRlTG9jYWxlKSB7XG4gICAgcmV0dXJuIGRhdGVMb2NhbGUubW9udGhzU2hvcnRbIGRhdGUuZ2V0TW9udGgoKSBdXG4gIH0sXG5cbiAgLy8gTW9udGggTmFtZTogSmFudWFyeSwgRmVicnVhcnksIC4uLlxuICBNTU1NIChkYXRlLCBkYXRlTG9jYWxlKSB7XG4gICAgcmV0dXJuIGRhdGVMb2NhbGUubW9udGhzWyBkYXRlLmdldE1vbnRoKCkgXVxuICB9LFxuXG4gIC8vIFF1YXJ0ZXI6IDEsIDIsIDMsIDRcbiAgUSAoZGF0ZSkge1xuICAgIHJldHVybiBNYXRoLmNlaWwoKGRhdGUuZ2V0TW9udGgoKSArIDEpIC8gMylcbiAgfSxcblxuICAvLyBRdWFydGVyOiAxc3QsIDJuZCwgM3JkLCA0dGhcbiAgUW8gKGRhdGUpIHtcbiAgICByZXR1cm4gZ2V0T3JkaW5hbCh0aGlzLlEoZGF0ZSkpXG4gIH0sXG5cbiAgLy8gRGF5IG9mIG1vbnRoOiAxLCAyLCAuLi4sIDMxXG4gIEQgKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXREYXRlKClcbiAgfSxcblxuICAvLyBEYXkgb2YgbW9udGg6IDFzdCwgMm5kLCAuLi4sIDMxc3RcbiAgRG8gKGRhdGUpIHtcbiAgICByZXR1cm4gZ2V0T3JkaW5hbChkYXRlLmdldERhdGUoKSlcbiAgfSxcblxuICAvLyBEYXkgb2YgbW9udGg6IDAxLCAwMiwgLi4uLCAzMVxuICBERCAoZGF0ZSkge1xuICAgIHJldHVybiBwYWQoZGF0ZS5nZXREYXRlKCkpXG4gIH0sXG5cbiAgLy8gRGF5IG9mIHllYXI6IDEsIDIsIC4uLiwgMzY2XG4gIERERCAoZGF0ZSkge1xuICAgIHJldHVybiBnZXREYXlPZlllYXIoZGF0ZSlcbiAgfSxcblxuICAvLyBEYXkgb2YgeWVhcjogMXN0LCAybmQsIC4uLiwgMzY2dGhcbiAgREREbyAoZGF0ZSkge1xuICAgIHJldHVybiBnZXRPcmRpbmFsKGdldERheU9mWWVhcihkYXRlKSlcbiAgfSxcblxuICAvLyBEYXkgb2YgeWVhcjogMDAxLCAwMDIsIC4uLiwgMzY2XG4gIEREREQgKGRhdGUpIHtcbiAgICByZXR1cm4gcGFkKGdldERheU9mWWVhcihkYXRlKSwgMylcbiAgfSxcblxuICAvLyBEYXkgb2Ygd2VlazogMCwgMSwgLi4uLCA2XG4gIGQgKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXREYXkoKVxuICB9LFxuXG4gIC8vIERheSBvZiB3ZWVrOiAwdGgsIDFzdCwgLi4uLCA2dGhcbiAgZG8gKGRhdGUpIHtcbiAgICByZXR1cm4gZ2V0T3JkaW5hbChkYXRlLmdldERheSgpKVxuICB9LFxuXG4gIC8vIERheSBvZiB3ZWVrOiBTdSwgTW8sIC4uLlxuICBkZCAoZGF0ZSwgZGF0ZUxvY2FsZSkge1xuICAgIHJldHVybiAoZGF0ZUxvY2FsZS5kYXlzWyBkYXRlLmdldERheSgpIF0pLnNsaWNlKDAsIDIpXG4gIH0sXG5cbiAgLy8gRGF5IG9mIHdlZWs6IFN1biwgTW9uLCAuLi5cbiAgZGRkIChkYXRlLCBkYXRlTG9jYWxlKSB7XG4gICAgcmV0dXJuIGRhdGVMb2NhbGUuZGF5c1Nob3J0WyBkYXRlLmdldERheSgpIF1cbiAgfSxcblxuICAvLyBEYXkgb2Ygd2VlazogU3VuZGF5LCBNb25kYXksIC4uLlxuICBkZGRkIChkYXRlLCBkYXRlTG9jYWxlKSB7XG4gICAgcmV0dXJuIGRhdGVMb2NhbGUuZGF5c1sgZGF0ZS5nZXREYXkoKSBdXG4gIH0sXG5cbiAgLy8gRGF5IG9mIElTTyB3ZWVrOiAxLCAyLCAuLi4sIDdcbiAgRSAoZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldERheSgpIHx8IDdcbiAgfSxcblxuICAvLyBXZWVrIG9mIFllYXI6IDEgMiAuLi4gNTIgNTNcbiAgdyAoZGF0ZSkge1xuICAgIHJldHVybiBnZXRXZWVrT2ZZZWFyKGRhdGUpXG4gIH0sXG5cbiAgLy8gV2VlayBvZiBZZWFyOiAxc3QgMm5kIC4uLiA1Mm5kIDUzcmRcbiAgd28gKGRhdGUpIHtcbiAgICByZXR1cm4gZ2V0T3JkaW5hbChnZXRXZWVrT2ZZZWFyKGRhdGUpKVxuICB9LFxuXG4gIC8vIFdlZWsgb2YgWWVhcjogMDEgMDIgLi4uIDUyIDUzXG4gIHd3IChkYXRlKSB7XG4gICAgcmV0dXJuIHBhZChnZXRXZWVrT2ZZZWFyKGRhdGUpKVxuICB9LFxuXG4gIC8vIEhvdXI6IDAsIDEsIC4uLiAyM1xuICBIIChkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0SG91cnMoKVxuICB9LFxuXG4gIC8vIEhvdXI6IDAwLCAwMSwgLi4uLCAyM1xuICBISCAoZGF0ZSkge1xuICAgIHJldHVybiBwYWQoZGF0ZS5nZXRIb3VycygpKVxuICB9LFxuXG4gIC8vIEhvdXI6IDEsIDIsIC4uLiwgMTJcbiAgaCAoZGF0ZSkge1xuICAgIGNvbnN0IGhvdXJzID0gZGF0ZS5nZXRIb3VycygpXG4gICAgcmV0dXJuIGhvdXJzID09PSAwXG4gICAgICA/IDEyXG4gICAgICA6IChob3VycyA+IDEyID8gaG91cnMgJSAxMiA6IGhvdXJzKVxuICB9LFxuXG4gIC8vIEhvdXI6IDAxLCAwMiwgLi4uLCAxMlxuICBoaCAoZGF0ZSkge1xuICAgIHJldHVybiBwYWQodGhpcy5oKGRhdGUpKVxuICB9LFxuXG4gIC8vIE1pbnV0ZTogMCwgMSwgLi4uLCA1OVxuICBtIChkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0TWludXRlcygpXG4gIH0sXG5cbiAgLy8gTWludXRlOiAwMCwgMDEsIC4uLiwgNTlcbiAgbW0gKGRhdGUpIHtcbiAgICByZXR1cm4gcGFkKGRhdGUuZ2V0TWludXRlcygpKVxuICB9LFxuXG4gIC8vIFNlY29uZDogMCwgMSwgLi4uLCA1OVxuICBzIChkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0U2Vjb25kcygpXG4gIH0sXG5cbiAgLy8gU2Vjb25kOiAwMCwgMDEsIC4uLiwgNTlcbiAgc3MgKGRhdGUpIHtcbiAgICByZXR1cm4gcGFkKGRhdGUuZ2V0U2Vjb25kcygpKVxuICB9LFxuXG4gIC8vIDEvMTAgb2Ygc2Vjb25kOiAwLCAxLCAuLi4sIDlcbiAgUyAoZGF0ZSkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCkgLyAxMDApXG4gIH0sXG5cbiAgLy8gMS8xMDAgb2Ygc2Vjb25kOiAwMCwgMDEsIC4uLiwgOTlcbiAgU1MgKGRhdGUpIHtcbiAgICByZXR1cm4gcGFkKE1hdGguZmxvb3IoZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSAvIDEwKSlcbiAgfSxcblxuICAvLyBNaWxsaXNlY29uZDogMDAwLCAwMDEsIC4uLiwgOTk5XG4gIFNTUyAoZGF0ZSkge1xuICAgIHJldHVybiBwYWQoZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSwgMylcbiAgfSxcblxuICAvLyBNZXJpZGllbTogQU0sIFBNXG4gIEEgKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRIb3VycygpIDwgMTIgPyAnQU0nIDogJ1BNJ1xuICB9LFxuXG4gIC8vIE1lcmlkaWVtOiBhbSwgcG1cbiAgYSAoZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldEhvdXJzKCkgPCAxMiA/ICdhbScgOiAncG0nXG4gIH0sXG5cbiAgLy8gTWVyaWRpZW06IGEubS4sIHAubS5cbiAgYWEgKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRIb3VycygpIDwgMTIgPyAnYS5tLicgOiAncC5tLidcbiAgfSxcblxuICAvLyBUaW1lem9uZTogLTAxOjAwLCArMDA6MDAsIC4uLiArMTI6MDBcbiAgWiAoZGF0ZSwgX2RhdGVMb2NhbGUsIF9mb3JjZWRZZWFyLCBmb3JjZWRUaW1lem9uZU9mZnNldCkge1xuICAgIGNvbnN0IHR6T2Zmc2V0ID0gZm9yY2VkVGltZXpvbmVPZmZzZXQgPT09IHZvaWQgMCB8fCBmb3JjZWRUaW1lem9uZU9mZnNldCA9PT0gbnVsbFxuICAgICAgPyBkYXRlLmdldFRpbWV6b25lT2Zmc2V0KClcbiAgICAgIDogZm9yY2VkVGltZXpvbmVPZmZzZXRcblxuICAgIHJldHVybiBmb3JtYXRUaW1lem9uZSh0ek9mZnNldCwgJzonKVxuICB9LFxuXG4gIC8vIFRpbWV6b25lOiAtMDEwMCwgKzAwMDAsIC4uLiArMTIwMFxuICBaWiAoZGF0ZSwgX2RhdGVMb2NhbGUsIF9mb3JjZWRZZWFyLCBmb3JjZWRUaW1lem9uZU9mZnNldCkge1xuICAgIGNvbnN0IHR6T2Zmc2V0ID0gZm9yY2VkVGltZXpvbmVPZmZzZXQgPT09IHZvaWQgMCB8fCBmb3JjZWRUaW1lem9uZU9mZnNldCA9PT0gbnVsbFxuICAgICAgPyBkYXRlLmdldFRpbWV6b25lT2Zmc2V0KClcbiAgICAgIDogZm9yY2VkVGltZXpvbmVPZmZzZXRcblxuICAgIHJldHVybiBmb3JtYXRUaW1lem9uZSh0ek9mZnNldClcbiAgfSxcblxuICAvLyBTZWNvbmRzIHRpbWVzdGFtcDogNTEyOTY5NTIwXG4gIFggKGRhdGUpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihkYXRlLmdldFRpbWUoKSAvIDEwMDApXG4gIH0sXG5cbiAgLy8gTWlsbGlzZWNvbmRzIHRpbWVzdGFtcDogNTEyOTY5NTIwOTAwXG4gIHggKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRUaW1lKClcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0RGF0ZSAodmFsLCBtYXNrLCBkYXRlTG9jYWxlLCBfX2ZvcmNlZFllYXIsIF9fZm9yY2VkVGltZXpvbmVPZmZzZXQpIHtcbiAgaWYgKFxuICAgICh2YWwgIT09IDAgJiYgIXZhbClcbiAgICB8fCB2YWwgPT09IEluZmluaXR5XG4gICAgfHwgdmFsID09PSAtSW5maW5pdHlcbiAgKSByZXR1cm5cblxuICBjb25zdCBkYXRlID0gbmV3IERhdGUodmFsKVxuXG4gIGlmIChpc05hTihkYXRlKSkgcmV0dXJuXG5cbiAgaWYgKG1hc2sgPT09IHZvaWQgMCkge1xuICAgIG1hc2sgPSBkZWZhdWx0TWFza1xuICB9XG5cbiAgY29uc3QgbG9jYWxlID0gZ2V0RGF0ZUxvY2FsZShkYXRlTG9jYWxlLCBMYW5nLnByb3BzKVxuXG4gIHJldHVybiBtYXNrLnJlcGxhY2UoXG4gICAgdG9rZW4sXG4gICAgKG1hdGNoLCB0ZXh0KSA9PiAoXG4gICAgICBtYXRjaCBpbiBmb3JtYXR0ZXJcbiAgICAgICAgPyBmb3JtYXR0ZXJbIG1hdGNoIF0oZGF0ZSwgbG9jYWxlLCBfX2ZvcmNlZFllYXIsIF9fZm9yY2VkVGltZXpvbmVPZmZzZXQpXG4gICAgICAgIDogKHRleHQgPT09IHZvaWQgMCA/IG1hdGNoIDogdGV4dC5zcGxpdCgnXFxcXF0nKS5qb2luKCddJykpXG4gICAgKVxuICApXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbG9uZSAoZGF0ZSkge1xuICByZXR1cm4gaXNEYXRlKGRhdGUpID09PSB0cnVlXG4gICAgPyBuZXcgRGF0ZShkYXRlLmdldFRpbWUoKSlcbiAgICA6IGRhdGVcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBpc1ZhbGlkLFxuICBleHRyYWN0RGF0ZSxcbiAgYnVpbGREYXRlLFxuICBnZXREYXlPZldlZWssXG4gIGdldFdlZWtPZlllYXIsXG4gIGlzQmV0d2VlbkRhdGVzLFxuICBhZGRUb0RhdGUsXG4gIHN1YnRyYWN0RnJvbURhdGUsXG4gIGFkanVzdERhdGUsXG4gIHN0YXJ0T2ZEYXRlLFxuICBlbmRPZkRhdGUsXG4gIGdldE1heERhdGUsXG4gIGdldE1pbkRhdGUsXG4gIGdldERhdGVEaWZmLFxuICBnZXREYXlPZlllYXIsXG4gIGluZmVyRGF0ZUZvcm1hdCxcbiAgZ2V0RGF0ZUJldHdlZW4sXG4gIGlzU2FtZURhdGUsXG4gIGRheXNJbk1vbnRoLFxuICBmb3JtYXREYXRlLFxuICBjbG9uZVxufVxuIiwiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgd2F0Y2gsIFRyYW5zaXRpb24sIG5leHRUaWNrLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBRQnRuIGZyb20gJy4uL2J0bi9RQnRuLmpzJ1xuXG5pbXBvcnQgdXNlRGFyaywgeyB1c2VEYXJrUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1kYXJrL3VzZS1kYXJrLmpzJ1xuaW1wb3J0IHVzZVJlbmRlckNhY2hlIGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3VzZS1yZW5kZXItY2FjaGUvdXNlLXJlbmRlci1jYWNoZS5qcydcbmltcG9ydCB7IHVzZUZvcm1Qcm9wcywgdXNlRm9ybUF0dHJzLCB1c2VGb3JtSW5qZWN0IH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvdXNlLWZvcm0vcHJpdmF0ZS51c2UtZm9ybS5qcydcbmltcG9ydCB1c2VEYXRldGltZSwgeyB1c2VEYXRldGltZVByb3BzLCB1c2VEYXRldGltZUVtaXRzLCBnZXREYXlIYXNoIH0gZnJvbSAnLi91c2UtZGF0ZXRpbWUuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5yZW5kZXIvcmVuZGVyLmpzJ1xuaW1wb3J0IHsgZm9ybWF0RGF0ZSwgX19zcGxpdERhdGUsIGdldERhdGVEaWZmIH0gZnJvbSAnLi4vLi4vdXRpbHMvZGF0ZS9kYXRlLmpzJ1xuaW1wb3J0IHsgcGFkIH0gZnJvbSAnLi4vLi4vdXRpbHMvZm9ybWF0L2Zvcm1hdC5qcydcbmltcG9ydCB7IGphbGFhbGlNb250aExlbmd0aCwgdG9HcmVnb3JpYW4gfSBmcm9tICcuLi8uLi91dGlscy9kYXRlL3ByaXZhdGUucGVyc2lhbi5qcydcbmltcG9ydCB7IGlzT2JqZWN0IH0gZnJvbSAnLi4vLi4vdXRpbHMvaXMvaXMuanMnXG5cbmNvbnN0IHllYXJzSW50ZXJ2YWwgPSAyMFxuY29uc3Qgdmlld3MgPSBbICdDYWxlbmRhcicsICdZZWFycycsICdNb250aHMnIF1cbmNvbnN0IHZpZXdJc1ZhbGlkID0gdiA9PiB2aWV3cy5pbmNsdWRlcyh2KVxuY29uc3QgeWVhck1vbnRoVmFsaWRhdG9yID0gdiA9PiAvXi0/W1xcZF0rXFwvWzAtMV1cXGQkLy50ZXN0KHYpXG5jb25zdCBsaW5lU3RyID0gJyBcXHUyMDE0ICdcblxuZnVuY3Rpb24gZ2V0TW9udGhIYXNoIChkYXRlKSB7XG4gIHJldHVybiBkYXRlLnllYXIgKyAnLycgKyBwYWQoZGF0ZS5tb250aClcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FEYXRlJyxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZURhdGV0aW1lUHJvcHMsXG4gICAgLi4udXNlRm9ybVByb3BzLFxuICAgIC4uLnVzZURhcmtQcm9wcyxcblxuICAgIG1vZGVsVmFsdWU6IHtcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgdmFsaWRhdG9yOiB2YWwgPT4gKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnIHx8IEFycmF5LmlzQXJyYXkodmFsKSA9PT0gdHJ1ZSB8fCBPYmplY3QodmFsKSA9PT0gdmFsIHx8IHZhbCA9PT0gbnVsbClcbiAgICB9LFxuXG4gICAgbXVsdGlwbGU6IEJvb2xlYW4sXG4gICAgcmFuZ2U6IEJvb2xlYW4sXG5cbiAgICB0aXRsZTogU3RyaW5nLFxuICAgIHN1YnRpdGxlOiBTdHJpbmcsXG5cbiAgICBtYXNrOiB7XG4gICAgICAuLi51c2VEYXRldGltZVByb3BzLm1hc2ssXG4gICAgICAvLyB0aGlzIG1hc2sgaXMgZm9yY2VkXG4gICAgICAvLyB3aGVuIHVzaW5nIHBlcnNpYW4gY2FsZW5kYXJcbiAgICAgIGRlZmF1bHQ6ICdZWVlZL01NL0REJ1xuICAgIH0sXG5cbiAgICBkZWZhdWx0WWVhck1vbnRoOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWxpZGF0b3I6IHllYXJNb250aFZhbGlkYXRvclxuICAgIH0sXG5cbiAgICB5ZWFyc0luTW9udGhWaWV3OiBCb29sZWFuLFxuXG4gICAgZXZlbnRzOiBbIEFycmF5LCBGdW5jdGlvbiBdLFxuICAgIGV2ZW50Q29sb3I6IFsgU3RyaW5nLCBGdW5jdGlvbiBdLFxuXG4gICAgZW1pdEltbWVkaWF0ZWx5OiBCb29sZWFuLFxuXG4gICAgb3B0aW9uczogWyBBcnJheSwgRnVuY3Rpb24gXSxcblxuICAgIG5hdmlnYXRpb25NaW5ZZWFyTW9udGg6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbGlkYXRvcjogeWVhck1vbnRoVmFsaWRhdG9yXG4gICAgfSxcblxuICAgIG5hdmlnYXRpb25NYXhZZWFyTW9udGg6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbGlkYXRvcjogeWVhck1vbnRoVmFsaWRhdG9yXG4gICAgfSxcblxuICAgIG5vVW5zZXQ6IEJvb2xlYW4sXG5cbiAgICBmaXJzdERheU9mV2VlazogWyBTdHJpbmcsIE51bWJlciBdLFxuICAgIHRvZGF5QnRuOiBCb29sZWFuLFxuICAgIG1pbmltYWw6IEJvb2xlYW4sXG4gICAgZGVmYXVsdFZpZXc6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdDYWxlbmRhcicsXG4gICAgICB2YWxpZGF0b3I6IHZpZXdJc1ZhbGlkXG4gICAgfVxuICB9LFxuXG4gIGVtaXRzOiBbXG4gICAgLi4udXNlRGF0ZXRpbWVFbWl0cyxcbiAgICAncmFuZ2VTdGFydCcsICdyYW5nZUVuZCcsICduYXZpZ2F0aW9uJ1xuICBdLFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cywgZW1pdCB9KSB7XG4gICAgY29uc3QgeyBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCB7ICRxIH0gPSBwcm94eVxuXG4gICAgY29uc3QgaXNEYXJrID0gdXNlRGFyayhwcm9wcywgJHEpXG4gICAgY29uc3QgeyBnZXRDYWNoZSB9ID0gdXNlUmVuZGVyQ2FjaGUoKVxuICAgIGNvbnN0IHsgdGFiaW5kZXgsIGhlYWRlckNsYXNzLCBnZXRMb2NhbGUsIGdldEN1cnJlbnREYXRlIH0gPSB1c2VEYXRldGltZShwcm9wcywgJHEpXG5cbiAgICBsZXQgbGFzdEVtaXRWYWx1ZVxuXG4gICAgY29uc3QgZm9ybUF0dHJzID0gdXNlRm9ybUF0dHJzKHByb3BzKVxuICAgIGNvbnN0IGluamVjdEZvcm1JbnB1dCA9IHVzZUZvcm1JbmplY3QoZm9ybUF0dHJzKVxuXG4gICAgY29uc3QgYmx1clRhcmdldFJlZiA9IHJlZihudWxsKVxuICAgIGNvbnN0IGlubmVyTWFzayA9IHJlZihnZXRNYXNrKCkpXG4gICAgY29uc3QgaW5uZXJMb2NhbGUgPSByZWYoZ2V0TG9jYWxlKCkpXG5cbiAgICBjb25zdCBtYXNrID0gY29tcHV0ZWQoKCkgPT4gZ2V0TWFzaygpKVxuICAgIGNvbnN0IGxvY2FsZSA9IGNvbXB1dGVkKCgpID0+IGdldExvY2FsZSgpKVxuXG4gICAgY29uc3QgdG9kYXkgPSBjb21wdXRlZCgoKSA9PiBnZXRDdXJyZW50RGF0ZSgpKVxuXG4gICAgLy8gbW9kZWwgb2YgY3VycmVudCBjYWxlbmRhciB2aWV3OlxuICAgIGNvbnN0IHZpZXdNb2RlbCA9IHJlZihnZXRWaWV3TW9kZWwoaW5uZXJNYXNrLnZhbHVlLCBpbm5lckxvY2FsZS52YWx1ZSkpXG5cbiAgICBjb25zdCB2aWV3ID0gcmVmKHByb3BzLmRlZmF1bHRWaWV3KVxuXG4gICAgY29uc3QgZGlyZWN0aW9uID0gY29tcHV0ZWQoKCkgPT4gKCRxLmxhbmcucnRsID09PSB0cnVlID8gJ3JpZ2h0JyA6ICdsZWZ0JykpXG4gICAgY29uc3QgbW9udGhEaXJlY3Rpb24gPSByZWYoZGlyZWN0aW9uLnZhbHVlKVxuICAgIGNvbnN0IHllYXJEaXJlY3Rpb24gPSByZWYoZGlyZWN0aW9uLnZhbHVlKVxuXG4gICAgY29uc3QgeWVhciA9IHZpZXdNb2RlbC52YWx1ZS55ZWFyXG4gICAgY29uc3Qgc3RhcnRZZWFyID0gcmVmKHllYXIgLSAoeWVhciAlIHllYXJzSW50ZXJ2YWwpIC0gKHllYXIgPCAwID8geWVhcnNJbnRlcnZhbCA6IDApKVxuICAgIGNvbnN0IGVkaXRSYW5nZSA9IHJlZihudWxsKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IHR5cGUgPSBwcm9wcy5sYW5kc2NhcGUgPT09IHRydWUgPyAnbGFuZHNjYXBlJyA6ICdwb3J0cmFpdCdcbiAgICAgIHJldHVybiBgcS1kYXRlIHEtZGF0ZS0tJHsgdHlwZSB9IHEtZGF0ZS0tJHsgdHlwZSB9LSR7IHByb3BzLm1pbmltYWwgPT09IHRydWUgPyAnbWluaW1hbCcgOiAnc3RhbmRhcmQnIH1gXG4gICAgICAgICsgKGlzRGFyay52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1kYXRlLS1kYXJrIHEtZGFyaycgOiAnJylcbiAgICAgICAgKyAocHJvcHMuYm9yZGVyZWQgPT09IHRydWUgPyAnIHEtZGF0ZS0tYm9yZGVyZWQnIDogJycpXG4gICAgICAgICsgKHByb3BzLnNxdWFyZSA9PT0gdHJ1ZSA/ICcgcS1kYXRlLS1zcXVhcmUgbm8tYm9yZGVyLXJhZGl1cycgOiAnJylcbiAgICAgICAgKyAocHJvcHMuZmxhdCA9PT0gdHJ1ZSA/ICcgcS1kYXRlLS1mbGF0IG5vLXNoYWRvdycgOiAnJylcbiAgICAgICAgKyAocHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSA/ICcgZGlzYWJsZWQnIDogKHByb3BzLnJlYWRvbmx5ID09PSB0cnVlID8gJyBxLWRhdGUtLXJlYWRvbmx5JyA6ICcnKSlcbiAgICB9KVxuXG4gICAgY29uc3QgY29tcHV0ZWRDb2xvciA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIHJldHVybiBwcm9wcy5jb2xvciB8fCAncHJpbWFyeSdcbiAgICB9KVxuXG4gICAgY29uc3QgY29tcHV0ZWRUZXh0Q29sb3IgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICByZXR1cm4gcHJvcHMudGV4dENvbG9yIHx8ICd3aGl0ZSdcbiAgICB9KVxuXG4gICAgY29uc3QgaXNJbW1lZGlhdGUgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMuZW1pdEltbWVkaWF0ZWx5ID09PSB0cnVlXG4gICAgICAmJiBwcm9wcy5tdWx0aXBsZSAhPT0gdHJ1ZVxuICAgICAgJiYgcHJvcHMucmFuZ2UgIT09IHRydWVcbiAgICApXG5cbiAgICBjb25zdCBub3JtYWxpemVkTW9kZWwgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBBcnJheS5pc0FycmF5KHByb3BzLm1vZGVsVmFsdWUpID09PSB0cnVlXG4gICAgICAgID8gcHJvcHMubW9kZWxWYWx1ZVxuICAgICAgICA6IChwcm9wcy5tb2RlbFZhbHVlICE9PSBudWxsICYmIHByb3BzLm1vZGVsVmFsdWUgIT09IHZvaWQgMCA/IFsgcHJvcHMubW9kZWxWYWx1ZSBdIDogW10pXG4gICAgKSlcblxuICAgIGNvbnN0IGRheXNNb2RlbCA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBub3JtYWxpemVkTW9kZWwudmFsdWVcbiAgICAgICAgLmZpbHRlcihkYXRlID0+IHR5cGVvZiBkYXRlID09PSAnc3RyaW5nJylcbiAgICAgICAgLm1hcChkYXRlID0+IGRlY29kZVN0cmluZyhkYXRlLCBpbm5lck1hc2sudmFsdWUsIGlubmVyTG9jYWxlLnZhbHVlKSlcbiAgICAgICAgLmZpbHRlcihkYXRlID0+XG4gICAgICAgICAgZGF0ZS5kYXRlSGFzaCAhPT0gbnVsbFxuICAgICAgICAgICYmIGRhdGUuZGF5ICE9PSBudWxsXG4gICAgICAgICAgJiYgZGF0ZS5tb250aCAhPT0gbnVsbFxuICAgICAgICAgICYmIGRhdGUueWVhciAhPT0gbnVsbFxuICAgICAgICApXG4gICAgKVxuXG4gICAgY29uc3QgcmFuZ2VNb2RlbCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGZuID0gZGF0ZSA9PiBkZWNvZGVTdHJpbmcoZGF0ZSwgaW5uZXJNYXNrLnZhbHVlLCBpbm5lckxvY2FsZS52YWx1ZSlcbiAgICAgIHJldHVybiBub3JtYWxpemVkTW9kZWwudmFsdWVcbiAgICAgICAgLmZpbHRlcihkYXRlID0+IGlzT2JqZWN0KGRhdGUpID09PSB0cnVlICYmIGRhdGUuZnJvbSAhPT0gdm9pZCAwICYmIGRhdGUudG8gIT09IHZvaWQgMClcbiAgICAgICAgLm1hcChyYW5nZSA9PiAoeyBmcm9tOiBmbihyYW5nZS5mcm9tKSwgdG86IGZuKHJhbmdlLnRvKSB9KSlcbiAgICAgICAgLmZpbHRlcihyYW5nZSA9PiByYW5nZS5mcm9tLmRhdGVIYXNoICE9PSBudWxsICYmIHJhbmdlLnRvLmRhdGVIYXNoICE9PSBudWxsICYmIHJhbmdlLmZyb20uZGF0ZUhhc2ggPCByYW5nZS50by5kYXRlSGFzaClcbiAgICB9KVxuXG4gICAgY29uc3QgZ2V0TmF0aXZlRGF0ZUZuID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMuY2FsZW5kYXIgIT09ICdwZXJzaWFuJ1xuICAgICAgICA/IG1vZGVsID0+IG5ldyBEYXRlKG1vZGVsLnllYXIsIG1vZGVsLm1vbnRoIC0gMSwgbW9kZWwuZGF5KVxuICAgICAgICA6IG1vZGVsID0+IHtcbiAgICAgICAgICBjb25zdCBnRGF0ZSA9IHRvR3JlZ29yaWFuKG1vZGVsLnllYXIsIG1vZGVsLm1vbnRoLCBtb2RlbC5kYXkpXG4gICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKGdEYXRlLmd5LCBnRGF0ZS5nbSAtIDEsIGdEYXRlLmdkKVxuICAgICAgICB9XG4gICAgKSlcblxuICAgIGNvbnN0IGVuY29kZU9iamVjdEZuID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMuY2FsZW5kYXIgPT09ICdwZXJzaWFuJ1xuICAgICAgICA/IGdldERheUhhc2hcbiAgICAgICAgOiAoZGF0ZSwgbWFzaywgbG9jYWxlKSA9PiBmb3JtYXREYXRlKFxuICAgICAgICAgICAgbmV3IERhdGUoXG4gICAgICAgICAgICAgIGRhdGUueWVhcixcbiAgICAgICAgICAgICAgZGF0ZS5tb250aCAtIDEsXG4gICAgICAgICAgICAgIGRhdGUuZGF5LFxuICAgICAgICAgICAgICBkYXRlLmhvdXIsXG4gICAgICAgICAgICAgIGRhdGUubWludXRlLFxuICAgICAgICAgICAgICBkYXRlLnNlY29uZCxcbiAgICAgICAgICAgICAgZGF0ZS5taWxsaXNlY29uZFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIG1hc2sgPT09IHZvaWQgMCA/IGlubmVyTWFzay52YWx1ZSA6IG1hc2ssXG4gICAgICAgICAgICBsb2NhbGUgPT09IHZvaWQgMCA/IGlubmVyTG9jYWxlLnZhbHVlIDogbG9jYWxlLFxuICAgICAgICAgICAgZGF0ZS55ZWFyLFxuICAgICAgICAgICAgZGF0ZS50aW1lem9uZU9mZnNldFxuICAgICAgICAgIClcbiAgICApKVxuXG4gICAgY29uc3QgZGF5c0luTW9kZWwgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgZGF5c01vZGVsLnZhbHVlLmxlbmd0aCArIHJhbmdlTW9kZWwudmFsdWUucmVkdWNlKFxuICAgICAgICAoYWNjLCByYW5nZSkgPT4gYWNjICsgMSArIGdldERhdGVEaWZmKFxuICAgICAgICAgIGdldE5hdGl2ZURhdGVGbi52YWx1ZShyYW5nZS50byksXG4gICAgICAgICAgZ2V0TmF0aXZlRGF0ZUZuLnZhbHVlKHJhbmdlLmZyb20pXG4gICAgICAgICksXG4gICAgICAgIDBcbiAgICAgIClcbiAgICApXG5cbiAgICBjb25zdCBoZWFkZXJUaXRsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGlmIChwcm9wcy50aXRsZSAhPT0gdm9pZCAwICYmIHByb3BzLnRpdGxlICE9PSBudWxsICYmIHByb3BzLnRpdGxlLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICByZXR1cm4gcHJvcHMudGl0bGVcbiAgICAgIH1cblxuICAgICAgaWYgKGVkaXRSYW5nZS52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICBjb25zdCBtb2RlbCA9IGVkaXRSYW5nZS52YWx1ZS5pbml0XG4gICAgICAgIGNvbnN0IGRhdGUgPSBnZXROYXRpdmVEYXRlRm4udmFsdWUobW9kZWwpXG5cbiAgICAgICAgcmV0dXJuIGlubmVyTG9jYWxlLnZhbHVlLmRheXNTaG9ydFsgZGF0ZS5nZXREYXkoKSBdICsgJywgJ1xuICAgICAgICAgICsgaW5uZXJMb2NhbGUudmFsdWUubW9udGhzU2hvcnRbIG1vZGVsLm1vbnRoIC0gMSBdICsgJyAnXG4gICAgICAgICAgKyBtb2RlbC5kYXkgKyBsaW5lU3RyICsgJz8nXG4gICAgICB9XG5cbiAgICAgIGlmIChkYXlzSW5Nb2RlbC52YWx1ZSA9PT0gMCkge1xuICAgICAgICByZXR1cm4gbGluZVN0clxuICAgICAgfVxuXG4gICAgICBpZiAoZGF5c0luTW9kZWwudmFsdWUgPiAxKSB7XG4gICAgICAgIHJldHVybiBgJHsgZGF5c0luTW9kZWwudmFsdWUgfSAkeyBpbm5lckxvY2FsZS52YWx1ZS5wbHVyYWxEYXkgfWBcbiAgICAgIH1cblxuICAgICAgY29uc3QgbW9kZWwgPSBkYXlzTW9kZWwudmFsdWVbIDAgXVxuICAgICAgY29uc3QgZGF0ZSA9IGdldE5hdGl2ZURhdGVGbi52YWx1ZShtb2RlbClcblxuICAgICAgaWYgKGlzTmFOKGRhdGUudmFsdWVPZigpKSA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gbGluZVN0clxuICAgICAgfVxuXG4gICAgICBpZiAoaW5uZXJMb2NhbGUudmFsdWUuaGVhZGVyVGl0bGUgIT09IHZvaWQgMCkge1xuICAgICAgICByZXR1cm4gaW5uZXJMb2NhbGUudmFsdWUuaGVhZGVyVGl0bGUoZGF0ZSwgbW9kZWwpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBpbm5lckxvY2FsZS52YWx1ZS5kYXlzU2hvcnRbIGRhdGUuZ2V0RGF5KCkgXSArICcsICdcbiAgICAgICAgKyBpbm5lckxvY2FsZS52YWx1ZS5tb250aHNTaG9ydFsgbW9kZWwubW9udGggLSAxIF0gKyAnICdcbiAgICAgICAgKyBtb2RlbC5kYXlcbiAgICB9KVxuXG4gICAgY29uc3QgbWluU2VsZWN0ZWRNb2RlbCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IG1vZGVsID0gZGF5c01vZGVsLnZhbHVlLmNvbmNhdChyYW5nZU1vZGVsLnZhbHVlLm1hcChyYW5nZSA9PiByYW5nZS5mcm9tKSlcbiAgICAgICAgLnNvcnQoKGEsIGIpID0+IGEueWVhciAtIGIueWVhciB8fCBhLm1vbnRoIC0gYi5tb250aClcblxuICAgICAgcmV0dXJuIG1vZGVsWyAwIF1cbiAgICB9KVxuXG4gICAgY29uc3QgbWF4U2VsZWN0ZWRNb2RlbCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IG1vZGVsID0gZGF5c01vZGVsLnZhbHVlLmNvbmNhdChyYW5nZU1vZGVsLnZhbHVlLm1hcChyYW5nZSA9PiByYW5nZS50bykpXG4gICAgICAgIC5zb3J0KChhLCBiKSA9PiBiLnllYXIgLSBhLnllYXIgfHwgYi5tb250aCAtIGEubW9udGgpXG5cbiAgICAgIHJldHVybiBtb2RlbFsgMCBdXG4gICAgfSlcblxuICAgIGNvbnN0IGhlYWRlclN1YnRpdGxlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgaWYgKHByb3BzLnN1YnRpdGxlICE9PSB2b2lkIDAgJiYgcHJvcHMuc3VidGl0bGUgIT09IG51bGwgJiYgcHJvcHMuc3VidGl0bGUubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIHJldHVybiBwcm9wcy5zdWJ0aXRsZVxuICAgICAgfVxuXG4gICAgICBpZiAoZGF5c0luTW9kZWwudmFsdWUgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGxpbmVTdHJcbiAgICAgIH1cblxuICAgICAgaWYgKGRheXNJbk1vZGVsLnZhbHVlID4gMSkge1xuICAgICAgICBjb25zdCBmcm9tID0gbWluU2VsZWN0ZWRNb2RlbC52YWx1ZVxuICAgICAgICBjb25zdCB0byA9IG1heFNlbGVjdGVkTW9kZWwudmFsdWVcbiAgICAgICAgY29uc3QgbW9udGggPSBpbm5lckxvY2FsZS52YWx1ZS5tb250aHNTaG9ydFxuXG4gICAgICAgIHJldHVybiBtb250aFsgZnJvbS5tb250aCAtIDEgXSArIChcbiAgICAgICAgICBmcm9tLnllYXIgIT09IHRvLnllYXJcbiAgICAgICAgICAgID8gJyAnICsgZnJvbS55ZWFyICsgbGluZVN0ciArIG1vbnRoWyB0by5tb250aCAtIDEgXSArICcgJ1xuICAgICAgICAgICAgOiAoXG4gICAgICAgICAgICAgICAgZnJvbS5tb250aCAhPT0gdG8ubW9udGhcbiAgICAgICAgICAgICAgICAgID8gbGluZVN0ciArIG1vbnRoWyB0by5tb250aCAtIDEgXVxuICAgICAgICAgICAgICAgICAgOiAnJ1xuICAgICAgICAgICAgICApXG4gICAgICAgICkgKyAnICcgKyB0by55ZWFyXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkYXlzTW9kZWwudmFsdWVbIDAgXS55ZWFyXG4gICAgfSlcblxuICAgIGNvbnN0IGRhdGVBcnJvdyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IHZhbCA9IFsgJHEuaWNvblNldC5kYXRldGltZS5hcnJvd0xlZnQsICRxLmljb25TZXQuZGF0ZXRpbWUuYXJyb3dSaWdodCBdXG4gICAgICByZXR1cm4gJHEubGFuZy5ydGwgPT09IHRydWUgPyB2YWwucmV2ZXJzZSgpIDogdmFsXG4gICAgfSlcblxuICAgIGNvbnN0IGNvbXB1dGVkRmlyc3REYXlPZldlZWsgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5maXJzdERheU9mV2VlayAhPT0gdm9pZCAwXG4gICAgICAgID8gTnVtYmVyKHByb3BzLmZpcnN0RGF5T2ZXZWVrKVxuICAgICAgICA6IGlubmVyTG9jYWxlLnZhbHVlLmZpcnN0RGF5T2ZXZWVrXG4gICAgKSlcblxuICAgIGNvbnN0IGRheXNPZldlZWsgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdFxuICAgICAgICBkYXlzID0gaW5uZXJMb2NhbGUudmFsdWUuZGF5c1Nob3J0LFxuICAgICAgICBmaXJzdCA9IGNvbXB1dGVkRmlyc3REYXlPZldlZWsudmFsdWVcblxuICAgICAgcmV0dXJuIGZpcnN0ID4gMFxuICAgICAgICA/IGRheXMuc2xpY2UoZmlyc3QsIDcpLmNvbmNhdChkYXlzLnNsaWNlKDAsIGZpcnN0KSlcbiAgICAgICAgOiBkYXlzXG4gICAgfSlcblxuICAgIGNvbnN0IGRheXNJbk1vbnRoID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgZGF0ZSA9IHZpZXdNb2RlbC52YWx1ZVxuICAgICAgcmV0dXJuIHByb3BzLmNhbGVuZGFyICE9PSAncGVyc2lhbidcbiAgICAgICAgPyAobmV3IERhdGUoZGF0ZS55ZWFyLCBkYXRlLm1vbnRoLCAwKSkuZ2V0RGF0ZSgpXG4gICAgICAgIDogamFsYWFsaU1vbnRoTGVuZ3RoKGRhdGUueWVhciwgZGF0ZS5tb250aClcbiAgICB9KVxuXG4gICAgY29uc3QgZXZ0Q29sb3IgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICB0eXBlb2YgcHJvcHMuZXZlbnRDb2xvciA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICA/IHByb3BzLmV2ZW50Q29sb3JcbiAgICAgICAgOiAoKSA9PiBwcm9wcy5ldmVudENvbG9yXG4gICAgKSlcblxuICAgIGNvbnN0IG1pbk5hdiA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGlmIChwcm9wcy5uYXZpZ2F0aW9uTWluWWVhck1vbnRoID09PSB2b2lkIDApIHtcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGF0YSA9IHByb3BzLm5hdmlnYXRpb25NaW5ZZWFyTW9udGguc3BsaXQoJy8nKVxuICAgICAgcmV0dXJuIHsgeWVhcjogcGFyc2VJbnQoZGF0YVsgMCBdLCAxMCksIG1vbnRoOiBwYXJzZUludChkYXRhWyAxIF0sIDEwKSB9XG4gICAgfSlcblxuICAgIGNvbnN0IG1heE5hdiA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGlmIChwcm9wcy5uYXZpZ2F0aW9uTWF4WWVhck1vbnRoID09PSB2b2lkIDApIHtcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGF0YSA9IHByb3BzLm5hdmlnYXRpb25NYXhZZWFyTW9udGguc3BsaXQoJy8nKVxuICAgICAgcmV0dXJuIHsgeWVhcjogcGFyc2VJbnQoZGF0YVsgMCBdLCAxMCksIG1vbnRoOiBwYXJzZUludChkYXRhWyAxIF0sIDEwKSB9XG4gICAgfSlcblxuICAgIGNvbnN0IG5hdkJvdW5kYXJpZXMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICBtb250aDogeyBwcmV2OiB0cnVlLCBuZXh0OiB0cnVlIH0sXG4gICAgICAgIHllYXI6IHsgcHJldjogdHJ1ZSwgbmV4dDogdHJ1ZSB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtaW5OYXYudmFsdWUgIT09IG51bGwgJiYgbWluTmF2LnZhbHVlLnllYXIgPj0gdmlld01vZGVsLnZhbHVlLnllYXIpIHtcbiAgICAgICAgZGF0YS55ZWFyLnByZXYgPSBmYWxzZVxuICAgICAgICBpZiAobWluTmF2LnZhbHVlLnllYXIgPT09IHZpZXdNb2RlbC52YWx1ZS55ZWFyICYmIG1pbk5hdi52YWx1ZS5tb250aCA+PSB2aWV3TW9kZWwudmFsdWUubW9udGgpIHtcbiAgICAgICAgICBkYXRhLm1vbnRoLnByZXYgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtYXhOYXYudmFsdWUgIT09IG51bGwgJiYgbWF4TmF2LnZhbHVlLnllYXIgPD0gdmlld01vZGVsLnZhbHVlLnllYXIpIHtcbiAgICAgICAgZGF0YS55ZWFyLm5leHQgPSBmYWxzZVxuICAgICAgICBpZiAobWF4TmF2LnZhbHVlLnllYXIgPT09IHZpZXdNb2RlbC52YWx1ZS55ZWFyICYmIG1heE5hdi52YWx1ZS5tb250aCA8PSB2aWV3TW9kZWwudmFsdWUubW9udGgpIHtcbiAgICAgICAgICBkYXRhLm1vbnRoLm5leHQgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkYXRhXG4gICAgfSlcblxuICAgIGNvbnN0IGRheXNNYXAgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBtYXAgPSB7fVxuXG4gICAgICBkYXlzTW9kZWwudmFsdWUuZm9yRWFjaChlbnRyeSA9PiB7XG4gICAgICAgIGNvbnN0IGhhc2ggPSBnZXRNb250aEhhc2goZW50cnkpXG5cbiAgICAgICAgaWYgKG1hcFsgaGFzaCBdID09PSB2b2lkIDApIHtcbiAgICAgICAgICBtYXBbIGhhc2ggXSA9IFtdXG4gICAgICAgIH1cblxuICAgICAgICBtYXBbIGhhc2ggXS5wdXNoKGVudHJ5LmRheSlcbiAgICAgIH0pXG5cbiAgICAgIHJldHVybiBtYXBcbiAgICB9KVxuXG4gICAgY29uc3QgcmFuZ2VNYXAgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBtYXAgPSB7fVxuXG4gICAgICByYW5nZU1vZGVsLnZhbHVlLmZvckVhY2goZW50cnkgPT4ge1xuICAgICAgICBjb25zdCBoYXNoRnJvbSA9IGdldE1vbnRoSGFzaChlbnRyeS5mcm9tKVxuICAgICAgICBjb25zdCBoYXNoVG8gPSBnZXRNb250aEhhc2goZW50cnkudG8pXG5cbiAgICAgICAgaWYgKG1hcFsgaGFzaEZyb20gXSA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgbWFwWyBoYXNoRnJvbSBdID0gW11cbiAgICAgICAgfVxuXG4gICAgICAgIG1hcFsgaGFzaEZyb20gXS5wdXNoKHtcbiAgICAgICAgICBmcm9tOiBlbnRyeS5mcm9tLmRheSxcbiAgICAgICAgICB0bzogaGFzaEZyb20gPT09IGhhc2hUbyA/IGVudHJ5LnRvLmRheSA6IHZvaWQgMCxcbiAgICAgICAgICByYW5nZTogZW50cnlcbiAgICAgICAgfSlcblxuICAgICAgICBpZiAoaGFzaEZyb20gPCBoYXNoVG8pIHtcbiAgICAgICAgICBsZXQgaGFzaFxuICAgICAgICAgIGNvbnN0IHsgeWVhciwgbW9udGggfSA9IGVudHJ5LmZyb21cbiAgICAgICAgICBjb25zdCBjdXIgPSBtb250aCA8IDEyXG4gICAgICAgICAgICA/IHsgeWVhciwgbW9udGg6IG1vbnRoICsgMSB9XG4gICAgICAgICAgICA6IHsgeWVhcjogeWVhciArIDEsIG1vbnRoOiAxIH1cblxuICAgICAgICAgIHdoaWxlICgoaGFzaCA9IGdldE1vbnRoSGFzaChjdXIpKSA8PSBoYXNoVG8pIHtcbiAgICAgICAgICAgIGlmIChtYXBbIGhhc2ggXSA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgIG1hcFsgaGFzaCBdID0gW11cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbWFwWyBoYXNoIF0ucHVzaCh7XG4gICAgICAgICAgICAgIGZyb206IHZvaWQgMCxcbiAgICAgICAgICAgICAgdG86IGhhc2ggPT09IGhhc2hUbyA/IGVudHJ5LnRvLmRheSA6IHZvaWQgMCxcbiAgICAgICAgICAgICAgcmFuZ2U6IGVudHJ5XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBjdXIubW9udGgrK1xuICAgICAgICAgICAgaWYgKGN1ci5tb250aCA+IDEyKSB7XG4gICAgICAgICAgICAgIGN1ci55ZWFyKytcbiAgICAgICAgICAgICAgY3VyLm1vbnRoID0gMVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgcmV0dXJuIG1hcFxuICAgIH0pXG5cbiAgICBjb25zdCByYW5nZVZpZXcgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBpZiAoZWRpdFJhbmdlLnZhbHVlID09PSBudWxsKSByZXR1cm5cblxuICAgICAgY29uc3QgeyBpbml0LCBpbml0SGFzaCwgZmluYWwsIGZpbmFsSGFzaCB9ID0gZWRpdFJhbmdlLnZhbHVlXG5cbiAgICAgIGNvbnN0IFsgZnJvbSwgdG8gXSA9IGluaXRIYXNoIDw9IGZpbmFsSGFzaFxuICAgICAgICA/IFsgaW5pdCwgZmluYWwgXVxuICAgICAgICA6IFsgZmluYWwsIGluaXQgXVxuXG4gICAgICBjb25zdCBmcm9tSGFzaCA9IGdldE1vbnRoSGFzaChmcm9tKVxuICAgICAgY29uc3QgdG9IYXNoID0gZ2V0TW9udGhIYXNoKHRvKVxuXG4gICAgICBpZiAoXG4gICAgICAgIGZyb21IYXNoICE9PSB2aWV3TW9udGhIYXNoLnZhbHVlXG4gICAgICAgICYmIHRvSGFzaCAhPT0gdmlld01vbnRoSGFzaC52YWx1ZVxuICAgICAgKSByZXR1cm5cblxuICAgICAgY29uc3QgdmlldyA9IHt9XG5cbiAgICAgIGlmIChmcm9tSGFzaCA9PT0gdmlld01vbnRoSGFzaC52YWx1ZSkge1xuICAgICAgICB2aWV3LmZyb20gPSBmcm9tLmRheVxuICAgICAgICB2aWV3LmluY2x1ZGVGcm9tID0gdHJ1ZVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHZpZXcuZnJvbSA9IDFcbiAgICAgIH1cblxuICAgICAgaWYgKHRvSGFzaCA9PT0gdmlld01vbnRoSGFzaC52YWx1ZSkge1xuICAgICAgICB2aWV3LnRvID0gdG8uZGF5XG4gICAgICAgIHZpZXcuaW5jbHVkZVRvID0gdHJ1ZVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHZpZXcudG8gPSBkYXlzSW5Nb250aC52YWx1ZVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdmlld1xuICAgIH0pXG5cbiAgICBjb25zdCB2aWV3TW9udGhIYXNoID0gY29tcHV0ZWQoKCkgPT4gZ2V0TW9udGhIYXNoKHZpZXdNb2RlbC52YWx1ZSkpXG5cbiAgICBjb25zdCBzZWxlY3Rpb25EYXlzTWFwID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgbWFwID0ge31cblxuICAgICAgaWYgKHByb3BzLm9wdGlvbnMgPT09IHZvaWQgMCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBkYXlzSW5Nb250aC52YWx1ZTsgaSsrKSB7XG4gICAgICAgICAgbWFwWyBpIF0gPSB0cnVlXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbWFwXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGZuID0gdHlwZW9mIHByb3BzLm9wdGlvbnMgPT09ICdmdW5jdGlvbidcbiAgICAgICAgPyBwcm9wcy5vcHRpb25zXG4gICAgICAgIDogZGF0ZSA9PiBwcm9wcy5vcHRpb25zLmluY2x1ZGVzKGRhdGUpXG5cbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IGRheXNJbk1vbnRoLnZhbHVlOyBpKyspIHtcbiAgICAgICAgY29uc3QgZGF5SGFzaCA9IHZpZXdNb250aEhhc2gudmFsdWUgKyAnLycgKyBwYWQoaSlcbiAgICAgICAgbWFwWyBpIF0gPSBmbihkYXlIYXNoKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbWFwXG4gICAgfSlcblxuICAgIGNvbnN0IGV2ZW50RGF5c01hcCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IG1hcCA9IHt9XG5cbiAgICAgIGlmIChwcm9wcy5ldmVudHMgPT09IHZvaWQgMCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBkYXlzSW5Nb250aC52YWx1ZTsgaSsrKSB7XG4gICAgICAgICAgbWFwWyBpIF0gPSBmYWxzZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY29uc3QgZm4gPSB0eXBlb2YgcHJvcHMuZXZlbnRzID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgPyBwcm9wcy5ldmVudHNcbiAgICAgICAgICA6IGRhdGUgPT4gcHJvcHMuZXZlbnRzLmluY2x1ZGVzKGRhdGUpXG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gZGF5c0luTW9udGgudmFsdWU7IGkrKykge1xuICAgICAgICAgIGNvbnN0IGRheUhhc2ggPSB2aWV3TW9udGhIYXNoLnZhbHVlICsgJy8nICsgcGFkKGkpXG4gICAgICAgICAgbWFwWyBpIF0gPSBmbihkYXlIYXNoKSA9PT0gdHJ1ZSAmJiBldnRDb2xvci52YWx1ZShkYXlIYXNoKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBtYXBcbiAgICB9KVxuXG4gICAgY29uc3Qgdmlld0RheXMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBsZXQgZGF0ZSwgZW5kRGF5XG4gICAgICBjb25zdCB7IHllYXIsIG1vbnRoIH0gPSB2aWV3TW9kZWwudmFsdWVcblxuICAgICAgaWYgKHByb3BzLmNhbGVuZGFyICE9PSAncGVyc2lhbicpIHtcbiAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKHllYXIsIG1vbnRoIC0gMSwgMSlcbiAgICAgICAgZW5kRGF5ID0gKG5ldyBEYXRlKHllYXIsIG1vbnRoIC0gMSwgMCkpLmdldERhdGUoKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbnN0IGdEYXRlID0gdG9HcmVnb3JpYW4oeWVhciwgbW9udGgsIDEpXG4gICAgICAgIGRhdGUgPSBuZXcgRGF0ZShnRGF0ZS5neSwgZ0RhdGUuZ20gLSAxLCBnRGF0ZS5nZClcbiAgICAgICAgbGV0IHByZXZKTSA9IG1vbnRoIC0gMVxuICAgICAgICBsZXQgcHJldkpZID0geWVhclxuICAgICAgICBpZiAocHJldkpNID09PSAwKSB7XG4gICAgICAgICAgcHJldkpNID0gMTJcbiAgICAgICAgICBwcmV2SlktLVxuICAgICAgICB9XG4gICAgICAgIGVuZERheSA9IGphbGFhbGlNb250aExlbmd0aChwcmV2SlksIHByZXZKTSlcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZGF5czogZGF0ZS5nZXREYXkoKSAtIGNvbXB1dGVkRmlyc3REYXlPZldlZWsudmFsdWUgLSAxLFxuICAgICAgICBlbmREYXlcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uc3QgZGF5cyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IHJlcyA9IFtdXG4gICAgICBjb25zdCB7IGRheXMsIGVuZERheSB9ID0gdmlld0RheXMudmFsdWVcblxuICAgICAgY29uc3QgbGVuID0gZGF5cyA8IDAgPyBkYXlzICsgNyA6IGRheXNcbiAgICAgIGlmIChsZW4gPCA2KSB7XG4gICAgICAgIGZvciAobGV0IGkgPSBlbmREYXkgLSBsZW47IGkgPD0gZW5kRGF5OyBpKyspIHtcbiAgICAgICAgICByZXMucHVzaCh7IGksIGZpbGw6IHRydWUgfSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBpbmRleCA9IHJlcy5sZW5ndGhcblxuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gZGF5c0luTW9udGgudmFsdWU7IGkrKykge1xuICAgICAgICBjb25zdCBkYXkgPSB7IGksIGV2ZW50OiBldmVudERheXNNYXAudmFsdWVbIGkgXSwgY2xhc3NlczogW10gfVxuXG4gICAgICAgIGlmIChzZWxlY3Rpb25EYXlzTWFwLnZhbHVlWyBpIF0gPT09IHRydWUpIHtcbiAgICAgICAgICBkYXkuaW4gPSB0cnVlXG4gICAgICAgICAgZGF5LmZsYXQgPSB0cnVlXG4gICAgICAgIH1cblxuICAgICAgICByZXMucHVzaChkYXkpXG4gICAgICB9XG5cbiAgICAgIC8vIGlmIGN1cnJlbnQgdmlldyBoYXMgZGF5cyBpbiBtb2RlbFxuICAgICAgaWYgKGRheXNNYXAudmFsdWVbIHZpZXdNb250aEhhc2gudmFsdWUgXSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGRheXNNYXAudmFsdWVbIHZpZXdNb250aEhhc2gudmFsdWUgXS5mb3JFYWNoKGRheSA9PiB7XG4gICAgICAgICAgY29uc3QgaSA9IGluZGV4ICsgZGF5IC0gMVxuICAgICAgICAgIE9iamVjdC5hc3NpZ24ocmVzWyBpIF0sIHtcbiAgICAgICAgICAgIHNlbGVjdGVkOiB0cnVlLFxuICAgICAgICAgICAgdW5lbGV2YXRlZDogdHJ1ZSxcbiAgICAgICAgICAgIGZsYXQ6IGZhbHNlLFxuICAgICAgICAgICAgY29sb3I6IGNvbXB1dGVkQ29sb3IudmFsdWUsXG4gICAgICAgICAgICB0ZXh0Q29sb3I6IGNvbXB1dGVkVGV4dENvbG9yLnZhbHVlXG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgLy8gaWYgY3VycmVudCB2aWV3IGhhcyByYW5nZXMgaW4gbW9kZWxcbiAgICAgIGlmIChyYW5nZU1hcC52YWx1ZVsgdmlld01vbnRoSGFzaC52YWx1ZSBdICE9PSB2b2lkIDApIHtcbiAgICAgICAgcmFuZ2VNYXAudmFsdWVbIHZpZXdNb250aEhhc2gudmFsdWUgXS5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICAgICAgICBpZiAoZW50cnkuZnJvbSAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICBjb25zdCBmcm9tID0gaW5kZXggKyBlbnRyeS5mcm9tIC0gMVxuICAgICAgICAgICAgY29uc3QgdG8gPSBpbmRleCArIChlbnRyeS50byB8fCBkYXlzSW5Nb250aC52YWx1ZSkgLSAxXG5cbiAgICAgICAgICAgIGZvciAobGV0IGRheSA9IGZyb207IGRheSA8PSB0bzsgZGF5KyspIHtcbiAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihyZXNbIGRheSBdLCB7XG4gICAgICAgICAgICAgICAgcmFuZ2U6IGVudHJ5LnJhbmdlLFxuICAgICAgICAgICAgICAgIHVuZWxldmF0ZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgY29sb3I6IGNvbXB1dGVkQ29sb3IudmFsdWUsXG4gICAgICAgICAgICAgICAgdGV4dENvbG9yOiBjb21wdXRlZFRleHRDb2xvci52YWx1ZVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHJlc1sgZnJvbSBdLCB7XG4gICAgICAgICAgICAgIHJhbmdlRnJvbTogdHJ1ZSxcbiAgICAgICAgICAgICAgZmxhdDogZmFsc2VcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGVudHJ5LnRvICE9PSB2b2lkIDAgJiYgT2JqZWN0LmFzc2lnbihyZXNbIHRvIF0sIHtcbiAgICAgICAgICAgICAgcmFuZ2VUbzogdHJ1ZSxcbiAgICAgICAgICAgICAgZmxhdDogZmFsc2VcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKGVudHJ5LnRvICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgIGNvbnN0IHRvID0gaW5kZXggKyBlbnRyeS50byAtIDFcblxuICAgICAgICAgICAgZm9yIChsZXQgZGF5ID0gaW5kZXg7IGRheSA8PSB0bzsgZGF5KyspIHtcbiAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihyZXNbIGRheSBdLCB7XG4gICAgICAgICAgICAgICAgcmFuZ2U6IGVudHJ5LnJhbmdlLFxuICAgICAgICAgICAgICAgIHVuZWxldmF0ZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgY29sb3I6IGNvbXB1dGVkQ29sb3IudmFsdWUsXG4gICAgICAgICAgICAgICAgdGV4dENvbG9yOiBjb21wdXRlZFRleHRDb2xvci52YWx1ZVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHJlc1sgdG8gXSwge1xuICAgICAgICAgICAgICBmbGF0OiBmYWxzZSxcbiAgICAgICAgICAgICAgcmFuZ2VUbzogdHJ1ZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCB0byA9IGluZGV4ICsgZGF5c0luTW9udGgudmFsdWUgLSAxXG4gICAgICAgICAgICBmb3IgKGxldCBkYXkgPSBpbmRleDsgZGF5IDw9IHRvOyBkYXkrKykge1xuICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHJlc1sgZGF5IF0sIHtcbiAgICAgICAgICAgICAgICByYW5nZTogZW50cnkucmFuZ2UsXG4gICAgICAgICAgICAgICAgdW5lbGV2YXRlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjb2xvcjogY29tcHV0ZWRDb2xvci52YWx1ZSxcbiAgICAgICAgICAgICAgICB0ZXh0Q29sb3I6IGNvbXB1dGVkVGV4dENvbG9yLnZhbHVlXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICBpZiAocmFuZ2VWaWV3LnZhbHVlICE9PSB2b2lkIDApIHtcbiAgICAgICAgY29uc3QgZnJvbSA9IGluZGV4ICsgcmFuZ2VWaWV3LnZhbHVlLmZyb20gLSAxXG4gICAgICAgIGNvbnN0IHRvID0gaW5kZXggKyByYW5nZVZpZXcudmFsdWUudG8gLSAxXG5cbiAgICAgICAgZm9yIChsZXQgZGF5ID0gZnJvbTsgZGF5IDw9IHRvOyBkYXkrKykge1xuICAgICAgICAgIHJlc1sgZGF5IF0uY29sb3IgPSBjb21wdXRlZENvbG9yLnZhbHVlXG4gICAgICAgICAgcmVzWyBkYXkgXS5lZGl0UmFuZ2UgPSB0cnVlXG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmFuZ2VWaWV3LnZhbHVlLmluY2x1ZGVGcm9tID09PSB0cnVlKSB7XG4gICAgICAgICAgcmVzWyBmcm9tIF0uZWRpdFJhbmdlRnJvbSA9IHRydWVcbiAgICAgICAgfVxuICAgICAgICBpZiAocmFuZ2VWaWV3LnZhbHVlLmluY2x1ZGVUbyA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHJlc1sgdG8gXS5lZGl0UmFuZ2VUbyA9IHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodmlld01vZGVsLnZhbHVlLnllYXIgPT09IHRvZGF5LnZhbHVlLnllYXIgJiYgdmlld01vZGVsLnZhbHVlLm1vbnRoID09PSB0b2RheS52YWx1ZS5tb250aCkge1xuICAgICAgICByZXNbIGluZGV4ICsgdG9kYXkudmFsdWUuZGF5IC0gMSBdLnRvZGF5ID0gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBjb25zdCBsZWZ0ID0gcmVzLmxlbmd0aCAlIDdcbiAgICAgIGlmIChsZWZ0ID4gMCkge1xuICAgICAgICBjb25zdCBhZnRlckRheXMgPSA3IC0gbGVmdFxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBhZnRlckRheXM7IGkrKykge1xuICAgICAgICAgIHJlcy5wdXNoKHsgaSwgZmlsbDogdHJ1ZSB9KVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJlcy5mb3JFYWNoKGRheSA9PiB7XG4gICAgICAgIGxldCBjbHMgPSAncS1kYXRlX19jYWxlbmRhci1pdGVtICdcblxuICAgICAgICBpZiAoZGF5LmZpbGwgPT09IHRydWUpIHtcbiAgICAgICAgICBjbHMgKz0gJ3EtZGF0ZV9fY2FsZW5kYXItaXRlbS0tZmlsbCdcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBjbHMgKz0gYHEtZGF0ZV9fY2FsZW5kYXItaXRlbS0tJHsgZGF5LmluID09PSB0cnVlID8gJ2luJyA6ICdvdXQnIH1gXG5cbiAgICAgICAgICBpZiAoZGF5LnJhbmdlICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgIGNscyArPSBgIHEtZGF0ZV9fcmFuZ2UkeyBkYXkucmFuZ2VUbyA9PT0gdHJ1ZSA/ICctdG8nIDogKGRheS5yYW5nZUZyb20gPT09IHRydWUgPyAnLWZyb20nIDogJycpIH1gXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGRheS5lZGl0UmFuZ2UgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNscyArPSBgIHEtZGF0ZV9fZWRpdC1yYW5nZSR7IGRheS5lZGl0UmFuZ2VGcm9tID09PSB0cnVlID8gJy1mcm9tJyA6ICcnIH0keyBkYXkuZWRpdFJhbmdlVG8gPT09IHRydWUgPyAnLXRvJyA6ICcnIH1gXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGRheS5yYW5nZSAhPT0gdm9pZCAwIHx8IGRheS5lZGl0UmFuZ2UgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNscyArPSBgIHRleHQtJHsgZGF5LmNvbG9yIH1gXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZGF5LmNsYXNzZXMgPSBjbHNcbiAgICAgIH0pXG5cbiAgICAgIHJldHVybiByZXNcbiAgICB9KVxuXG4gICAgY29uc3QgYXR0cmlidXRlcyA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLmRpc2FibGUgPT09IHRydWVcbiAgICAgICAgPyB7ICdhcmlhLWRpc2FibGVkJzogJ3RydWUnIH1cbiAgICAgICAgOiB7fVxuICAgICkpXG5cbiAgICB3YXRjaCgoKSA9PiBwcm9wcy5tb2RlbFZhbHVlLCB2ID0+IHtcbiAgICAgIGlmIChsYXN0RW1pdFZhbHVlID09PSBKU09OLnN0cmluZ2lmeSh2KSkge1xuICAgICAgICBsYXN0RW1pdFZhbHVlID0gMFxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbnN0IG1vZGVsID0gZ2V0Vmlld01vZGVsKGlubmVyTWFzay52YWx1ZSwgaW5uZXJMb2NhbGUudmFsdWUpXG4gICAgICAgIHVwZGF0ZVZpZXdNb2RlbChtb2RlbC55ZWFyLCBtb2RlbC5tb250aCwgbW9kZWwpXG4gICAgICB9XG4gICAgfSlcblxuICAgIHdhdGNoKHZpZXcsICgpID0+IHtcbiAgICAgIGlmIChibHVyVGFyZ2V0UmVmLnZhbHVlICE9PSBudWxsICYmIHByb3h5LiRlbC5jb250YWlucyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSA9PT0gdHJ1ZSkge1xuICAgICAgICBibHVyVGFyZ2V0UmVmLnZhbHVlLmZvY3VzKClcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgd2F0Y2goKCkgPT4gdmlld01vZGVsLnZhbHVlLnllYXIgKyAnfCcgKyB2aWV3TW9kZWwudmFsdWUubW9udGgsICgpID0+IHtcbiAgICAgIGVtaXQoJ25hdmlnYXRpb24nLCB7IHllYXI6IHZpZXdNb2RlbC52YWx1ZS55ZWFyLCBtb250aDogdmlld01vZGVsLnZhbHVlLm1vbnRoIH0pXG4gICAgfSlcblxuICAgIHdhdGNoKG1hc2ssIHZhbCA9PiB7XG4gICAgICB1cGRhdGVWYWx1ZSh2YWwsIGlubmVyTG9jYWxlLnZhbHVlLCAnbWFzaycpXG4gICAgICBpbm5lck1hc2sudmFsdWUgPSB2YWxcbiAgICB9KVxuXG4gICAgd2F0Y2gobG9jYWxlLCB2YWwgPT4ge1xuICAgICAgdXBkYXRlVmFsdWUoaW5uZXJNYXNrLnZhbHVlLCB2YWwsICdsb2NhbGUnKVxuICAgICAgaW5uZXJMb2NhbGUudmFsdWUgPSB2YWxcbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gc2V0TGFzdFZhbHVlICh2KSB7XG4gICAgICBsYXN0RW1pdFZhbHVlID0gSlNPTi5zdHJpbmdpZnkodilcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRUb2RheSAoKSB7XG4gICAgICBjb25zdCB7IHllYXIsIG1vbnRoLCBkYXkgfSA9IHRvZGF5LnZhbHVlXG5cbiAgICAgIGNvbnN0IGRhdGUgPSB7XG4gICAgICAgIC8vIGNvbnRhaW5zIG1vcmUgcHJvcHMgdGhhbiBuZWVkZWQgKGhvdXIsIG1pbnV0ZSwgc2Vjb25kLCBtaWxsaXNlY29uZClcbiAgICAgICAgLy8gYnV0IHRob3NlIGFyZW4ndCB1c2VkIGluIHRoZSBwcm9jZXNzaW5nIG9mIHRoaXMgXCJkYXRlXCIgdmFyaWFibGVcbiAgICAgICAgLi4udmlld01vZGVsLnZhbHVlLFxuXG4gICAgICAgIC8vIG92ZXJ3cml0aW5nIHdpdGggdG9kYXkncyBkYXRlXG4gICAgICAgIHllYXIsXG4gICAgICAgIG1vbnRoLFxuICAgICAgICBkYXlcbiAgICAgIH1cblxuICAgICAgY29uc3QgbW9udGhNYXAgPSBkYXlzTWFwLnZhbHVlWyBnZXRNb250aEhhc2goZGF0ZSkgXVxuXG4gICAgICBpZiAobW9udGhNYXAgPT09IHZvaWQgMCB8fCBtb250aE1hcC5pbmNsdWRlcyhkYXRlLmRheSkgPT09IGZhbHNlKSB7XG4gICAgICAgIGFkZFRvTW9kZWwoZGF0ZSlcbiAgICAgIH1cblxuICAgICAgc2V0Q2FsZW5kYXJUbyhkYXRlLnllYXIsIGRhdGUubW9udGgpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0VmlldyAodmlld01vZGUpIHtcbiAgICAgIGlmICh2aWV3SXNWYWxpZCh2aWV3TW9kZSkgPT09IHRydWUpIHtcbiAgICAgICAgdmlldy52YWx1ZSA9IHZpZXdNb2RlXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb2Zmc2V0Q2FsZW5kYXIgKHR5cGUsIGRlc2NlbmRpbmcpIHtcbiAgICAgIGlmIChbICdtb250aCcsICd5ZWFyJyBdLmluY2x1ZGVzKHR5cGUpKSB7XG4gICAgICAgIGNvbnN0IGZuID0gdHlwZSA9PT0gJ21vbnRoJyA/IGdvVG9Nb250aCA6IGdvVG9ZZWFyXG4gICAgICAgIGZuKGRlc2NlbmRpbmcgPT09IHRydWUgPyAtMSA6IDEpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0Q2FsZW5kYXJUbyAoeWVhciwgbW9udGgpIHtcbiAgICAgIHZpZXcudmFsdWUgPSAnQ2FsZW5kYXInXG4gICAgICB1cGRhdGVWaWV3TW9kZWwoeWVhciwgbW9udGgpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0RWRpdGluZ1JhbmdlIChmcm9tLCB0bykge1xuICAgICAgaWYgKHByb3BzLnJhbmdlID09PSBmYWxzZSB8fCAhZnJvbSkge1xuICAgICAgICBlZGl0UmFuZ2UudmFsdWUgPSBudWxsXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBjb25zdCBpbml0ID0gT2JqZWN0LmFzc2lnbih7IC4uLnZpZXdNb2RlbC52YWx1ZSB9LCBmcm9tKVxuICAgICAgY29uc3QgZmluYWwgPSB0byAhPT0gdm9pZCAwXG4gICAgICAgID8gT2JqZWN0LmFzc2lnbih7IC4uLnZpZXdNb2RlbC52YWx1ZSB9LCB0bylcbiAgICAgICAgOiBpbml0XG5cbiAgICAgIGVkaXRSYW5nZS52YWx1ZSA9IHtcbiAgICAgICAgaW5pdCxcbiAgICAgICAgaW5pdEhhc2g6IGdldERheUhhc2goaW5pdCksXG4gICAgICAgIGZpbmFsLFxuICAgICAgICBmaW5hbEhhc2g6IGdldERheUhhc2goZmluYWwpXG4gICAgICB9XG5cbiAgICAgIHNldENhbGVuZGFyVG8oaW5pdC55ZWFyLCBpbml0Lm1vbnRoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldE1hc2sgKCkge1xuICAgICAgcmV0dXJuIHByb3BzLmNhbGVuZGFyID09PSAncGVyc2lhbicgPyAnWVlZWS9NTS9ERCcgOiBwcm9wcy5tYXNrXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGVjb2RlU3RyaW5nIChkYXRlLCBtYXNrLCBsb2NhbGUpIHtcbiAgICAgIHJldHVybiBfX3NwbGl0RGF0ZShcbiAgICAgICAgZGF0ZSxcbiAgICAgICAgbWFzayxcbiAgICAgICAgbG9jYWxlLFxuICAgICAgICBwcm9wcy5jYWxlbmRhcixcbiAgICAgICAge1xuICAgICAgICAgIGhvdXI6IDAsXG4gICAgICAgICAgbWludXRlOiAwLFxuICAgICAgICAgIHNlY29uZDogMCxcbiAgICAgICAgICBtaWxsaXNlY29uZDogMFxuICAgICAgICB9XG4gICAgICApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Vmlld01vZGVsIChtYXNrLCBsb2NhbGUpIHtcbiAgICAgIGNvbnN0IG1vZGVsID0gQXJyYXkuaXNBcnJheShwcm9wcy5tb2RlbFZhbHVlKSA9PT0gdHJ1ZVxuICAgICAgICA/IHByb3BzLm1vZGVsVmFsdWVcbiAgICAgICAgOiAocHJvcHMubW9kZWxWYWx1ZSA/IFsgcHJvcHMubW9kZWxWYWx1ZSBdIDogW10pXG5cbiAgICAgIGlmIChtb2RlbC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGdldERlZmF1bHRWaWV3TW9kZWwoKVxuICAgICAgfVxuXG4gICAgICBjb25zdCB0YXJnZXQgPSBtb2RlbFsgbW9kZWwubGVuZ3RoIC0gMSBdXG4gICAgICBjb25zdCBkZWNvZGVkID0gZGVjb2RlU3RyaW5nKFxuICAgICAgICB0YXJnZXQuZnJvbSAhPT0gdm9pZCAwID8gdGFyZ2V0LmZyb20gOiB0YXJnZXQsXG4gICAgICAgIG1hc2ssXG4gICAgICAgIGxvY2FsZVxuICAgICAgKVxuXG4gICAgICByZXR1cm4gZGVjb2RlZC5kYXRlSGFzaCA9PT0gbnVsbFxuICAgICAgICA/IGdldERlZmF1bHRWaWV3TW9kZWwoKVxuICAgICAgICA6IGRlY29kZWRcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXREZWZhdWx0Vmlld01vZGVsICgpIHtcbiAgICAgIGxldCB5ZWFyLCBtb250aFxuXG4gICAgICBpZiAocHJvcHMuZGVmYXVsdFllYXJNb250aCAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGNvbnN0IGQgPSBwcm9wcy5kZWZhdWx0WWVhck1vbnRoLnNwbGl0KCcvJylcbiAgICAgICAgeWVhciA9IHBhcnNlSW50KGRbIDAgXSwgMTApXG4gICAgICAgIG1vbnRoID0gcGFyc2VJbnQoZFsgMSBdLCAxMClcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICAvLyBtYXkgY29tZSBmcm9tIGRhdGEoKSB3aGVyZSBjb21wdXRlZFxuICAgICAgICAvLyBwcm9wcyBhcmUgbm90IHlldCBhdmFpbGFibGVcbiAgICAgICAgY29uc3QgZCA9IHRvZGF5LnZhbHVlICE9PSB2b2lkIDBcbiAgICAgICAgICA/IHRvZGF5LnZhbHVlXG4gICAgICAgICAgOiBnZXRDdXJyZW50RGF0ZSgpXG5cbiAgICAgICAgeWVhciA9IGQueWVhclxuICAgICAgICBtb250aCA9IGQubW9udGhcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgeWVhcixcbiAgICAgICAgbW9udGgsXG4gICAgICAgIGRheTogMSxcbiAgICAgICAgaG91cjogMCxcbiAgICAgICAgbWludXRlOiAwLFxuICAgICAgICBzZWNvbmQ6IDAsXG4gICAgICAgIG1pbGxpc2Vjb25kOiAwLFxuICAgICAgICBkYXRlSGFzaDogeWVhciArICcvJyArIHBhZChtb250aCkgKyAnLzAxJ1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdvVG9Nb250aCAob2Zmc2V0KSB7XG4gICAgICBsZXQgeWVhciA9IHZpZXdNb2RlbC52YWx1ZS55ZWFyXG4gICAgICBsZXQgbW9udGggPSBOdW1iZXIodmlld01vZGVsLnZhbHVlLm1vbnRoKSArIG9mZnNldFxuXG4gICAgICBpZiAobW9udGggPT09IDEzKSB7XG4gICAgICAgIG1vbnRoID0gMVxuICAgICAgICB5ZWFyKytcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKG1vbnRoID09PSAwKSB7XG4gICAgICAgIG1vbnRoID0gMTJcbiAgICAgICAgeWVhci0tXG4gICAgICB9XG5cbiAgICAgIHVwZGF0ZVZpZXdNb2RlbCh5ZWFyLCBtb250aClcbiAgICAgIGlzSW1tZWRpYXRlLnZhbHVlID09PSB0cnVlICYmIGVtaXRJbW1lZGlhdGVseSgnbW9udGgnKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdvVG9ZZWFyIChvZmZzZXQpIHtcbiAgICAgIGNvbnN0IHllYXIgPSBOdW1iZXIodmlld01vZGVsLnZhbHVlLnllYXIpICsgb2Zmc2V0XG4gICAgICB1cGRhdGVWaWV3TW9kZWwoeWVhciwgdmlld01vZGVsLnZhbHVlLm1vbnRoKVxuICAgICAgaXNJbW1lZGlhdGUudmFsdWUgPT09IHRydWUgJiYgZW1pdEltbWVkaWF0ZWx5KCd5ZWFyJylcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRZZWFyICh5ZWFyKSB7XG4gICAgICB1cGRhdGVWaWV3TW9kZWwoeWVhciwgdmlld01vZGVsLnZhbHVlLm1vbnRoKVxuICAgICAgdmlldy52YWx1ZSA9IHByb3BzLmRlZmF1bHRWaWV3ID09PSAnWWVhcnMnID8gJ01vbnRocycgOiAnQ2FsZW5kYXInXG4gICAgICBpc0ltbWVkaWF0ZS52YWx1ZSA9PT0gdHJ1ZSAmJiBlbWl0SW1tZWRpYXRlbHkoJ3llYXInKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldE1vbnRoIChtb250aCkge1xuICAgICAgdXBkYXRlVmlld01vZGVsKHZpZXdNb2RlbC52YWx1ZS55ZWFyLCBtb250aClcbiAgICAgIHZpZXcudmFsdWUgPSAnQ2FsZW5kYXInXG4gICAgICBpc0ltbWVkaWF0ZS52YWx1ZSA9PT0gdHJ1ZSAmJiBlbWl0SW1tZWRpYXRlbHkoJ21vbnRoJylcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b2dnbGVEYXRlIChkYXRlLCBtb250aEhhc2gpIHtcbiAgICAgIGNvbnN0IG1vbnRoID0gZGF5c01hcC52YWx1ZVsgbW9udGhIYXNoIF1cbiAgICAgIGNvbnN0IGZuID0gbW9udGg/LmluY2x1ZGVzKGRhdGUuZGF5KSA9PT0gdHJ1ZVxuICAgICAgICA/IHJlbW92ZUZyb21Nb2RlbFxuICAgICAgICA6IGFkZFRvTW9kZWxcblxuICAgICAgZm4oZGF0ZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRTaG9ydERhdGUgKGRhdGUpIHtcbiAgICAgIHJldHVybiB7IHllYXI6IGRhdGUueWVhciwgbW9udGg6IGRhdGUubW9udGgsIGRheTogZGF0ZS5kYXkgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZVZpZXdNb2RlbCAoeWVhciwgbW9udGgsIHRpbWUpIHtcbiAgICAgIGlmIChtaW5OYXYudmFsdWUgIT09IG51bGwgJiYgeWVhciA8PSBtaW5OYXYudmFsdWUueWVhcikge1xuICAgICAgICBpZiAobW9udGggPCBtaW5OYXYudmFsdWUubW9udGggfHwgeWVhciA8IG1pbk5hdi52YWx1ZS55ZWFyKSB7XG4gICAgICAgICAgbW9udGggPSBtaW5OYXYudmFsdWUubW9udGhcbiAgICAgICAgfVxuICAgICAgICB5ZWFyID0gbWluTmF2LnZhbHVlLnllYXJcbiAgICAgIH1cblxuICAgICAgaWYgKG1heE5hdi52YWx1ZSAhPT0gbnVsbCAmJiB5ZWFyID49IG1heE5hdi52YWx1ZS55ZWFyKSB7XG4gICAgICAgIGlmIChtb250aCA+IG1heE5hdi52YWx1ZS5tb250aCB8fCB5ZWFyID4gbWF4TmF2LnZhbHVlLnllYXIpIHtcbiAgICAgICAgICBtb250aCA9IG1heE5hdi52YWx1ZS5tb250aFxuICAgICAgICB9XG4gICAgICAgIHllYXIgPSBtYXhOYXYudmFsdWUueWVhclxuICAgICAgfVxuXG4gICAgICBpZiAodGltZSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGNvbnN0IHsgaG91ciwgbWludXRlLCBzZWNvbmQsIG1pbGxpc2Vjb25kLCB0aW1lem9uZU9mZnNldCwgdGltZUhhc2ggfSA9IHRpbWVcbiAgICAgICAgT2JqZWN0LmFzc2lnbih2aWV3TW9kZWwudmFsdWUsIHsgaG91ciwgbWludXRlLCBzZWNvbmQsIG1pbGxpc2Vjb25kLCB0aW1lem9uZU9mZnNldCwgdGltZUhhc2ggfSlcbiAgICAgIH1cblxuICAgICAgY29uc3QgbmV3SGFzaCA9IHllYXIgKyAnLycgKyBwYWQobW9udGgpICsgJy8wMSdcblxuICAgICAgaWYgKG5ld0hhc2ggIT09IHZpZXdNb2RlbC52YWx1ZS5kYXRlSGFzaCkge1xuICAgICAgICBtb250aERpcmVjdGlvbi52YWx1ZSA9ICh2aWV3TW9kZWwudmFsdWUuZGF0ZUhhc2ggPCBuZXdIYXNoKSA9PT0gKCRxLmxhbmcucnRsICE9PSB0cnVlKSA/ICdsZWZ0JyA6ICdyaWdodCdcbiAgICAgICAgaWYgKHllYXIgIT09IHZpZXdNb2RlbC52YWx1ZS55ZWFyKSB7XG4gICAgICAgICAgeWVhckRpcmVjdGlvbi52YWx1ZSA9IG1vbnRoRGlyZWN0aW9uLnZhbHVlXG4gICAgICAgIH1cblxuICAgICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgc3RhcnRZZWFyLnZhbHVlID0geWVhciAtIHllYXIgJSB5ZWFyc0ludGVydmFsIC0gKHllYXIgPCAwID8geWVhcnNJbnRlcnZhbCA6IDApXG4gICAgICAgICAgT2JqZWN0LmFzc2lnbih2aWV3TW9kZWwudmFsdWUsIHtcbiAgICAgICAgICAgIHllYXIsXG4gICAgICAgICAgICBtb250aCxcbiAgICAgICAgICAgIGRheTogMSxcbiAgICAgICAgICAgIGRhdGVIYXNoOiBuZXdIYXNoXG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlbWl0VmFsdWUgKHZhbCwgYWN0aW9uLCBkYXRlKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHZhbCAhPT0gbnVsbCAmJiB2YWwubGVuZ3RoID09PSAxICYmIHByb3BzLm11bHRpcGxlID09PSBmYWxzZVxuICAgICAgICA/IHZhbFsgMCBdXG4gICAgICAgIDogdmFsXG5cbiAgICAgIGNvbnN0IHsgcmVhc29uLCBkZXRhaWxzIH0gPSBnZXRFbWl0UGFyYW1zKGFjdGlvbiwgZGF0ZSlcblxuICAgICAgc2V0TGFzdFZhbHVlKHZhbHVlKVxuICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCB2YWx1ZSwgcmVhc29uLCBkZXRhaWxzKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVtaXRJbW1lZGlhdGVseSAocmVhc29uKSB7XG4gICAgICBjb25zdCBkYXRlID0gZGF5c01vZGVsLnZhbHVlWyAwIF0gIT09IHZvaWQgMCAmJiBkYXlzTW9kZWwudmFsdWVbIDAgXS5kYXRlSGFzaCAhPT0gbnVsbFxuICAgICAgICA/IHsgLi4uZGF5c01vZGVsLnZhbHVlWyAwIF0gfVxuICAgICAgICA6IHsgLi4udmlld01vZGVsLnZhbHVlIH0gLy8gaW5oZXJpdCBkYXksIGhvdXJzLCBtaW51dGVzLCBtaWxsaXNlY29uZHMuLi5cblxuICAgICAgLy8gbmV4dFRpY2sgcmVxdWlyZWQgYmVjYXVzZSBvZiBhbmltYXRpb24gZGVsYXkgaW4gdmlld01vZGVsXG4gICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgIGRhdGUueWVhciA9IHZpZXdNb2RlbC52YWx1ZS55ZWFyXG4gICAgICAgIGRhdGUubW9udGggPSB2aWV3TW9kZWwudmFsdWUubW9udGhcblxuICAgICAgICBjb25zdCBtYXhEYXkgPSBwcm9wcy5jYWxlbmRhciAhPT0gJ3BlcnNpYW4nXG4gICAgICAgICAgPyAobmV3IERhdGUoZGF0ZS55ZWFyLCBkYXRlLm1vbnRoLCAwKSkuZ2V0RGF0ZSgpXG4gICAgICAgICAgOiBqYWxhYWxpTW9udGhMZW5ndGgoZGF0ZS55ZWFyLCBkYXRlLm1vbnRoKVxuXG4gICAgICAgIGRhdGUuZGF5ID0gTWF0aC5taW4oTWF0aC5tYXgoMSwgZGF0ZS5kYXkpLCBtYXhEYXkpXG5cbiAgICAgICAgY29uc3QgdmFsdWUgPSBlbmNvZGVFbnRyeShkYXRlKVxuICAgICAgICBjb25zdCB7IGRldGFpbHMgfSA9IGdldEVtaXRQYXJhbXMoJycsIGRhdGUpXG5cbiAgICAgICAgc2V0TGFzdFZhbHVlKHZhbHVlKVxuICAgICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIHZhbHVlLCByZWFzb24sIGRldGFpbHMpXG4gICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEVtaXRQYXJhbXMgKGFjdGlvbiwgZGF0ZSkge1xuICAgICAgcmV0dXJuIGRhdGUuZnJvbSAhPT0gdm9pZCAwXG4gICAgICAgID8ge1xuICAgICAgICAgICAgcmVhc29uOiBgJHsgYWN0aW9uIH0tcmFuZ2VgLFxuICAgICAgICAgICAgZGV0YWlsczoge1xuICAgICAgICAgICAgICAuLi5nZXRTaG9ydERhdGUoZGF0ZS50YXJnZXQpLFxuICAgICAgICAgICAgICBmcm9tOiBnZXRTaG9ydERhdGUoZGF0ZS5mcm9tKSxcbiAgICAgICAgICAgICAgdG86IGdldFNob3J0RGF0ZShkYXRlLnRvKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgOiB7XG4gICAgICAgICAgICByZWFzb246IGAkeyBhY3Rpb24gfS1kYXlgLFxuICAgICAgICAgICAgZGV0YWlsczogZ2V0U2hvcnREYXRlKGRhdGUpXG4gICAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVuY29kZUVudHJ5IChkYXRlLCBtYXNrLCBsb2NhbGUpIHtcbiAgICAgIHJldHVybiBkYXRlLmZyb20gIT09IHZvaWQgMFxuICAgICAgICA/IHsgZnJvbTogZW5jb2RlT2JqZWN0Rm4udmFsdWUoZGF0ZS5mcm9tLCBtYXNrLCBsb2NhbGUpLCB0bzogZW5jb2RlT2JqZWN0Rm4udmFsdWUoZGF0ZS50bywgbWFzaywgbG9jYWxlKSB9XG4gICAgICAgIDogZW5jb2RlT2JqZWN0Rm4udmFsdWUoZGF0ZSwgbWFzaywgbG9jYWxlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZFRvTW9kZWwgKGRhdGUpIHtcbiAgICAgIGxldCB2YWx1ZVxuXG4gICAgICBpZiAocHJvcHMubXVsdGlwbGUgPT09IHRydWUpIHtcbiAgICAgICAgaWYgKGRhdGUuZnJvbSAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgLy8gd2UgYWxzbyBuZWVkIHRvIGZpbHRlciBvdXQgaW50ZXJzZWN0aW9uc1xuXG4gICAgICAgICAgY29uc3QgZnJvbUhhc2ggPSBnZXREYXlIYXNoKGRhdGUuZnJvbSlcbiAgICAgICAgICBjb25zdCB0b0hhc2ggPSBnZXREYXlIYXNoKGRhdGUudG8pXG5cbiAgICAgICAgICBjb25zdCBkYXlzID0gZGF5c01vZGVsLnZhbHVlXG4gICAgICAgICAgICAuZmlsdGVyKGRheSA9PiBkYXkuZGF0ZUhhc2ggPCBmcm9tSGFzaCB8fCBkYXkuZGF0ZUhhc2ggPiB0b0hhc2gpXG5cbiAgICAgICAgICBjb25zdCByYW5nZXMgPSByYW5nZU1vZGVsLnZhbHVlXG4gICAgICAgICAgICAuZmlsdGVyKCh7IGZyb20sIHRvIH0pID0+IHRvLmRhdGVIYXNoIDwgZnJvbUhhc2ggfHwgZnJvbS5kYXRlSGFzaCA+IHRvSGFzaClcblxuICAgICAgICAgIHZhbHVlID0gZGF5cy5jb25jYXQocmFuZ2VzKS5jb25jYXQoZGF0ZSkubWFwKGVudHJ5ID0+IGVuY29kZUVudHJ5KGVudHJ5KSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBjb25zdCBtb2RlbCA9IG5vcm1hbGl6ZWRNb2RlbC52YWx1ZS5zbGljZSgpXG4gICAgICAgICAgbW9kZWwucHVzaChlbmNvZGVFbnRyeShkYXRlKSlcbiAgICAgICAgICB2YWx1ZSA9IG1vZGVsXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB2YWx1ZSA9IGVuY29kZUVudHJ5KGRhdGUpXG4gICAgICB9XG5cbiAgICAgIGVtaXRWYWx1ZSh2YWx1ZSwgJ2FkZCcsIGRhdGUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlRnJvbU1vZGVsIChkYXRlKSB7XG4gICAgICBpZiAocHJvcHMubm9VbnNldCA9PT0gdHJ1ZSkgcmV0dXJuXG5cbiAgICAgIGxldCBtb2RlbCA9IG51bGxcblxuICAgICAgaWYgKHByb3BzLm11bHRpcGxlID09PSB0cnVlICYmIEFycmF5LmlzQXJyYXkocHJvcHMubW9kZWxWYWx1ZSkgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3QgdmFsID0gZW5jb2RlRW50cnkoZGF0ZSlcblxuICAgICAgICBpZiAoZGF0ZS5mcm9tICE9PSB2b2lkIDApIHtcbiAgICAgICAgICBtb2RlbCA9IHByb3BzLm1vZGVsVmFsdWUuZmlsdGVyKFxuICAgICAgICAgICAgZGF0ZSA9PiAoXG4gICAgICAgICAgICAgIGRhdGUuZnJvbSAhPT0gdm9pZCAwXG4gICAgICAgICAgICAgICAgPyAoZGF0ZS5mcm9tICE9PSB2YWwuZnJvbSAmJiBkYXRlLnRvICE9PSB2YWwudG8pXG4gICAgICAgICAgICAgICAgOiB0cnVlXG4gICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIG1vZGVsID0gcHJvcHMubW9kZWxWYWx1ZS5maWx0ZXIoZGF0ZSA9PiBkYXRlICE9PSB2YWwpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAobW9kZWwubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgbW9kZWwgPSBudWxsXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZW1pdFZhbHVlKG1vZGVsLCAncmVtb3ZlJywgZGF0ZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVWYWx1ZSAobWFzaywgbG9jYWxlLCByZWFzb24pIHtcbiAgICAgIGNvbnN0IG1vZGVsID0gZGF5c01vZGVsLnZhbHVlXG4gICAgICAgIC5jb25jYXQocmFuZ2VNb2RlbC52YWx1ZSlcbiAgICAgICAgLm1hcChlbnRyeSA9PiBlbmNvZGVFbnRyeShlbnRyeSwgbWFzaywgbG9jYWxlKSlcbiAgICAgICAgLmZpbHRlcihlbnRyeSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGVudHJ5LmZyb20gIT09IHZvaWQgMFxuICAgICAgICAgICAgPyBlbnRyeS5mcm9tLmRhdGVIYXNoICE9PSBudWxsICYmIGVudHJ5LnRvLmRhdGVIYXNoICE9PSBudWxsXG4gICAgICAgICAgICA6IGVudHJ5LmRhdGVIYXNoICE9PSBudWxsXG4gICAgICAgIH0pXG5cbiAgICAgIGNvbnN0IHZhbHVlID0gKHByb3BzLm11bHRpcGxlID09PSB0cnVlID8gbW9kZWwgOiBtb2RlbFsgMCBdKSB8fCBudWxsXG5cbiAgICAgIHNldExhc3RWYWx1ZSh2YWx1ZSlcbiAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgdmFsdWUsIHJlYXNvbilcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRIZWFkZXIgKCkge1xuICAgICAgaWYgKHByb3BzLm1pbmltYWwgPT09IHRydWUpIHJldHVyblxuXG4gICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogJ3EtZGF0ZV9faGVhZGVyICcgKyBoZWFkZXJDbGFzcy52YWx1ZVxuICAgICAgfSwgW1xuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6ICdyZWxhdGl2ZS1wb3NpdGlvbidcbiAgICAgICAgfSwgW1xuICAgICAgICAgIGgoVHJhbnNpdGlvbiwge1xuICAgICAgICAgICAgbmFtZTogJ3EtdHJhbnNpdGlvbi0tZmFkZSdcbiAgICAgICAgICB9LCAoKSA9PiBoKCdkaXYnLCB7XG4gICAgICAgICAgICBrZXk6ICdoLXlyLScgKyBoZWFkZXJTdWJ0aXRsZS52YWx1ZSxcbiAgICAgICAgICAgIGNsYXNzOiAncS1kYXRlX19oZWFkZXItc3VidGl0bGUgcS1kYXRlX19oZWFkZXItbGluayAnXG4gICAgICAgICAgICAgICsgKHZpZXcudmFsdWUgPT09ICdZZWFycycgPyAncS1kYXRlX19oZWFkZXItbGluay0tYWN0aXZlJyA6ICdjdXJzb3ItcG9pbnRlcicpLFxuICAgICAgICAgICAgdGFiaW5kZXg6IHRhYmluZGV4LnZhbHVlLFxuICAgICAgICAgICAgLi4uZ2V0Q2FjaGUoJ3ZZJywge1xuICAgICAgICAgICAgICBvbkNsaWNrICgpIHsgdmlldy52YWx1ZSA9ICdZZWFycycgfSxcbiAgICAgICAgICAgICAgb25LZXl1cCAoZSkgeyBlLmtleUNvZGUgPT09IDEzICYmICh2aWV3LnZhbHVlID0gJ1llYXJzJykgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9LCBbIGhlYWRlclN1YnRpdGxlLnZhbHVlIF0pKVxuICAgICAgICBdKSxcblxuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLWRhdGVfX2hlYWRlci10aXRsZSByZWxhdGl2ZS1wb3NpdGlvbiBmbGV4IG5vLXdyYXAnXG4gICAgICAgIH0sIFtcbiAgICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgICBjbGFzczogJ3JlbGF0aXZlLXBvc2l0aW9uIGNvbCdcbiAgICAgICAgICB9LCBbXG4gICAgICAgICAgICBoKFRyYW5zaXRpb24sIHtcbiAgICAgICAgICAgICAgbmFtZTogJ3EtdHJhbnNpdGlvbi0tZmFkZSdcbiAgICAgICAgICAgIH0sICgpID0+IGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAga2V5OiAnaC1zdWInICsgaGVhZGVyVGl0bGUudmFsdWUsXG4gICAgICAgICAgICAgIGNsYXNzOiAncS1kYXRlX19oZWFkZXItdGl0bGUtbGFiZWwgcS1kYXRlX19oZWFkZXItbGluayAnXG4gICAgICAgICAgICAgICAgKyAodmlldy52YWx1ZSA9PT0gJ0NhbGVuZGFyJyA/ICdxLWRhdGVfX2hlYWRlci1saW5rLS1hY3RpdmUnIDogJ2N1cnNvci1wb2ludGVyJyksXG4gICAgICAgICAgICAgIHRhYmluZGV4OiB0YWJpbmRleC52YWx1ZSxcbiAgICAgICAgICAgICAgLi4uZ2V0Q2FjaGUoJ3ZDJywge1xuICAgICAgICAgICAgICAgIG9uQ2xpY2sgKCkgeyB2aWV3LnZhbHVlID0gJ0NhbGVuZGFyJyB9LFxuICAgICAgICAgICAgICAgIG9uS2V5dXAgKGUpIHsgZS5rZXlDb2RlID09PSAxMyAmJiAodmlldy52YWx1ZSA9ICdDYWxlbmRhcicpIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0sIFsgaGVhZGVyVGl0bGUudmFsdWUgXSkpXG4gICAgICAgICAgXSksXG5cbiAgICAgICAgICBwcm9wcy50b2RheUJ0biA9PT0gdHJ1ZSA/IGgoUUJ0biwge1xuICAgICAgICAgICAgY2xhc3M6ICdxLWRhdGVfX2hlYWRlci10b2RheSBzZWxmLXN0YXJ0JyxcbiAgICAgICAgICAgIGljb246ICRxLmljb25TZXQuZGF0ZXRpbWUudG9kYXksXG4gICAgICAgICAgICBhcmlhTGFiZWw6ICRxLmxhbmcuZGF0ZS50b2RheSxcbiAgICAgICAgICAgIGZsYXQ6IHRydWUsXG4gICAgICAgICAgICBzaXplOiAnc20nLFxuICAgICAgICAgICAgcm91bmQ6IHRydWUsXG4gICAgICAgICAgICB0YWJpbmRleDogdGFiaW5kZXgudmFsdWUsXG4gICAgICAgICAgICBvbkNsaWNrOiBzZXRUb2RheVxuICAgICAgICAgIH0pIDogbnVsbFxuICAgICAgICBdKVxuICAgICAgXSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXROYXZpZ2F0aW9uICh7IGxhYmVsLCB0eXBlLCBrZXksIGRpciwgZ29UbywgYm91bmRhcmllcywgY2xzIH0pIHtcbiAgICAgIHJldHVybiBbXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogJ3JvdyBpdGVtcy1jZW50ZXIgcS1kYXRlX19hcnJvdydcbiAgICAgICAgfSwgW1xuICAgICAgICAgIGgoUUJ0biwge1xuICAgICAgICAgICAgcm91bmQ6IHRydWUsXG4gICAgICAgICAgICBkZW5zZTogdHJ1ZSxcbiAgICAgICAgICAgIHNpemU6ICdzbScsXG4gICAgICAgICAgICBmbGF0OiB0cnVlLFxuICAgICAgICAgICAgaWNvbjogZGF0ZUFycm93LnZhbHVlWyAwIF0sXG4gICAgICAgICAgICBhcmlhTGFiZWw6IHR5cGUgPT09ICdZZWFycycgPyAkcS5sYW5nLmRhdGUucHJldlllYXIgOiAkcS5sYW5nLmRhdGUucHJldk1vbnRoLFxuICAgICAgICAgICAgdGFiaW5kZXg6IHRhYmluZGV4LnZhbHVlLFxuICAgICAgICAgICAgZGlzYWJsZTogYm91bmRhcmllcy5wcmV2ID09PSBmYWxzZSxcbiAgICAgICAgICAgIC4uLmdldENhY2hlKCdnby0jJyArIHR5cGUsIHsgb25DbGljayAoKSB7IGdvVG8oLTEpIH0gfSlcbiAgICAgICAgICB9KVxuICAgICAgICBdKSxcblxuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6ICdyZWxhdGl2ZS1wb3NpdGlvbiBvdmVyZmxvdy1oaWRkZW4gZmxleCBmbGV4LWNlbnRlcicgKyBjbHNcbiAgICAgICAgfSwgW1xuICAgICAgICAgIGgoVHJhbnNpdGlvbiwge1xuICAgICAgICAgICAgbmFtZTogJ3EtdHJhbnNpdGlvbi0tanVtcC0nICsgZGlyXG4gICAgICAgICAgfSwgKCkgPT4gaCgnZGl2JywgeyBrZXkgfSwgW1xuICAgICAgICAgICAgaChRQnRuLCB7XG4gICAgICAgICAgICAgIGZsYXQ6IHRydWUsXG4gICAgICAgICAgICAgIGRlbnNlOiB0cnVlLFxuICAgICAgICAgICAgICBub0NhcHM6IHRydWUsXG4gICAgICAgICAgICAgIGxhYmVsLFxuICAgICAgICAgICAgICB0YWJpbmRleDogdGFiaW5kZXgudmFsdWUsXG4gICAgICAgICAgICAgIC4uLmdldENhY2hlKCd2aWV3IycgKyB0eXBlLCB7IG9uQ2xpY2s6ICgpID0+IHsgdmlldy52YWx1ZSA9IHR5cGUgfSB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdKSlcbiAgICAgICAgXSksXG5cbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncm93IGl0ZW1zLWNlbnRlciBxLWRhdGVfX2Fycm93J1xuICAgICAgICB9LCBbXG4gICAgICAgICAgaChRQnRuLCB7XG4gICAgICAgICAgICByb3VuZDogdHJ1ZSxcbiAgICAgICAgICAgIGRlbnNlOiB0cnVlLFxuICAgICAgICAgICAgc2l6ZTogJ3NtJyxcbiAgICAgICAgICAgIGZsYXQ6IHRydWUsXG4gICAgICAgICAgICBpY29uOiBkYXRlQXJyb3cudmFsdWVbIDEgXSxcbiAgICAgICAgICAgIGFyaWFMYWJlbDogdHlwZSA9PT0gJ1llYXJzJyA/ICRxLmxhbmcuZGF0ZS5uZXh0WWVhciA6ICRxLmxhbmcuZGF0ZS5uZXh0TW9udGgsXG4gICAgICAgICAgICB0YWJpbmRleDogdGFiaW5kZXgudmFsdWUsXG4gICAgICAgICAgICBkaXNhYmxlOiBib3VuZGFyaWVzLm5leHQgPT09IGZhbHNlLFxuICAgICAgICAgICAgLi4uZ2V0Q2FjaGUoJ2dvKyMnICsgdHlwZSwgeyBvbkNsaWNrICgpIHsgZ29UbygxKSB9IH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgXSlcbiAgICAgIF1cbiAgICB9XG5cbiAgICBjb25zdCByZW5kZXJWaWV3cyA9IHtcbiAgICAgIENhbGVuZGFyOiAoKSA9PiAoW1xuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAga2V5OiAnY2FsZW5kYXItdmlldycsXG4gICAgICAgICAgY2xhc3M6ICdxLWRhdGVfX3ZpZXcgcS1kYXRlX19jYWxlbmRhcidcbiAgICAgICAgfSwgW1xuICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgIGNsYXNzOiAncS1kYXRlX19uYXZpZ2F0aW9uIHJvdyBpdGVtcy1jZW50ZXIgbm8td3JhcCdcbiAgICAgICAgICB9LCBnZXROYXZpZ2F0aW9uKHtcbiAgICAgICAgICAgIGxhYmVsOiBpbm5lckxvY2FsZS52YWx1ZS5tb250aHNbIHZpZXdNb2RlbC52YWx1ZS5tb250aCAtIDEgXSxcbiAgICAgICAgICAgIHR5cGU6ICdNb250aHMnLFxuICAgICAgICAgICAga2V5OiB2aWV3TW9kZWwudmFsdWUubW9udGgsXG4gICAgICAgICAgICBkaXI6IG1vbnRoRGlyZWN0aW9uLnZhbHVlLFxuICAgICAgICAgICAgZ29UbzogZ29Ub01vbnRoLFxuICAgICAgICAgICAgYm91bmRhcmllczogbmF2Qm91bmRhcmllcy52YWx1ZS5tb250aCxcbiAgICAgICAgICAgIGNsczogJyBjb2wnXG4gICAgICAgICAgfSkuY29uY2F0KGdldE5hdmlnYXRpb24oe1xuICAgICAgICAgICAgbGFiZWw6IHZpZXdNb2RlbC52YWx1ZS55ZWFyLFxuICAgICAgICAgICAgdHlwZTogJ1llYXJzJyxcbiAgICAgICAgICAgIGtleTogdmlld01vZGVsLnZhbHVlLnllYXIsXG4gICAgICAgICAgICBkaXI6IHllYXJEaXJlY3Rpb24udmFsdWUsXG4gICAgICAgICAgICBnb1RvOiBnb1RvWWVhcixcbiAgICAgICAgICAgIGJvdW5kYXJpZXM6IG5hdkJvdW5kYXJpZXMudmFsdWUueWVhcixcbiAgICAgICAgICAgIGNsczogJydcbiAgICAgICAgICB9KSkpLFxuXG4gICAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgICAgY2xhc3M6ICdxLWRhdGVfX2NhbGVuZGFyLXdlZWtkYXlzIHJvdyBpdGVtcy1jZW50ZXIgbm8td3JhcCdcbiAgICAgICAgICB9LCBkYXlzT2ZXZWVrLnZhbHVlLm1hcChkYXkgPT4gaCgnZGl2JywgeyBjbGFzczogJ3EtZGF0ZV9fY2FsZW5kYXItaXRlbScgfSwgWyBoKCdkaXYnLCBkYXkpIF0pKSksXG5cbiAgICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgICBjbGFzczogJ3EtZGF0ZV9fY2FsZW5kYXItZGF5cy1jb250YWluZXIgcmVsYXRpdmUtcG9zaXRpb24gb3ZlcmZsb3ctaGlkZGVuJ1xuICAgICAgICAgIH0sIFtcbiAgICAgICAgICAgIGgoVHJhbnNpdGlvbiwge1xuICAgICAgICAgICAgICBuYW1lOiAncS10cmFuc2l0aW9uLS1zbGlkZS0nICsgbW9udGhEaXJlY3Rpb24udmFsdWVcbiAgICAgICAgICAgIH0sICgpID0+IGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAga2V5OiB2aWV3TW9udGhIYXNoLnZhbHVlLFxuICAgICAgICAgICAgICBjbGFzczogJ3EtZGF0ZV9fY2FsZW5kYXItZGF5cyBmaXQnXG4gICAgICAgICAgICB9LCBkYXlzLnZhbHVlLm1hcChkYXkgPT4gaCgnZGl2JywgeyBjbGFzczogZGF5LmNsYXNzZXMgfSwgW1xuICAgICAgICAgICAgICBkYXkuaW4gPT09IHRydWVcbiAgICAgICAgICAgICAgICA/IGgoXG4gICAgICAgICAgICAgICAgICBRQnRuLCB7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzOiBkYXkudG9kYXkgPT09IHRydWUgPyAncS1kYXRlX190b2RheScgOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgZGVuc2U6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGZsYXQ6IGRheS5mbGF0LFxuICAgICAgICAgICAgICAgICAgICB1bmVsZXZhdGVkOiBkYXkudW5lbGV2YXRlZCxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IGRheS5jb2xvcixcbiAgICAgICAgICAgICAgICAgICAgdGV4dENvbG9yOiBkYXkudGV4dENvbG9yLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogZGF5LmksXG4gICAgICAgICAgICAgICAgICAgIHRhYmluZGV4OiB0YWJpbmRleC52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgLi4uZ2V0Q2FjaGUoJ2RheSMnICsgZGF5LmksIHtcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiAoKSA9PiB7IG9uRGF5Q2xpY2soZGF5LmkpIH0sXG4gICAgICAgICAgICAgICAgICAgICAgb25Nb3VzZW92ZXI6ICgpID0+IHsgb25EYXlNb3VzZW92ZXIoZGF5LmkpIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBkYXkuZXZlbnQgIT09IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgID8gKCkgPT4gaCgnZGl2JywgeyBjbGFzczogJ3EtZGF0ZV9fZXZlbnQgYmctJyArIGRheS5ldmVudCB9KVxuICAgICAgICAgICAgICAgICAgICA6IG51bGxcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgOiBoKCdkaXYnLCAnJyArIGRheS5pKVxuICAgICAgICAgICAgXSkpKSlcbiAgICAgICAgICBdKVxuICAgICAgICBdKVxuICAgICAgXSksXG5cbiAgICAgIE1vbnRocyAoKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRZZWFyID0gdmlld01vZGVsLnZhbHVlLnllYXIgPT09IHRvZGF5LnZhbHVlLnllYXJcbiAgICAgICAgY29uc3QgaXNEaXNhYmxlZCA9IG1vbnRoID0+IHtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgKG1pbk5hdi52YWx1ZSAhPT0gbnVsbCAmJiB2aWV3TW9kZWwudmFsdWUueWVhciA9PT0gbWluTmF2LnZhbHVlLnllYXIgJiYgbWluTmF2LnZhbHVlLm1vbnRoID4gbW9udGgpXG4gICAgICAgICAgICB8fCAobWF4TmF2LnZhbHVlICE9PSBudWxsICYmIHZpZXdNb2RlbC52YWx1ZS55ZWFyID09PSBtYXhOYXYudmFsdWUueWVhciAmJiBtYXhOYXYudmFsdWUubW9udGggPCBtb250aClcbiAgICAgICAgICApXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb250ZW50ID0gaW5uZXJMb2NhbGUudmFsdWUubW9udGhzU2hvcnQubWFwKChtb250aCwgaSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGFjdGl2ZSA9IHZpZXdNb2RlbC52YWx1ZS5tb250aCA9PT0gaSArIDFcblxuICAgICAgICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICAgICAgICBjbGFzczogJ3EtZGF0ZV9fbW9udGhzLWl0ZW0gZmxleCBmbGV4LWNlbnRlcidcbiAgICAgICAgICB9LCBbXG4gICAgICAgICAgICBoKFFCdG4sIHtcbiAgICAgICAgICAgICAgY2xhc3M6IGN1cnJlbnRZZWFyID09PSB0cnVlICYmIHRvZGF5LnZhbHVlLm1vbnRoID09PSBpICsgMSA/ICdxLWRhdGVfX3RvZGF5JyA6IG51bGwsXG4gICAgICAgICAgICAgIGZsYXQ6IGFjdGl2ZSAhPT0gdHJ1ZSxcbiAgICAgICAgICAgICAgbGFiZWw6IG1vbnRoLFxuICAgICAgICAgICAgICB1bmVsZXZhdGVkOiBhY3RpdmUsXG4gICAgICAgICAgICAgIGNvbG9yOiBhY3RpdmUgPT09IHRydWUgPyBjb21wdXRlZENvbG9yLnZhbHVlIDogbnVsbCxcbiAgICAgICAgICAgICAgdGV4dENvbG9yOiBhY3RpdmUgPT09IHRydWUgPyBjb21wdXRlZFRleHRDb2xvci52YWx1ZSA6IG51bGwsXG4gICAgICAgICAgICAgIHRhYmluZGV4OiB0YWJpbmRleC52YWx1ZSxcbiAgICAgICAgICAgICAgZGlzYWJsZTogaXNEaXNhYmxlZChpICsgMSksXG4gICAgICAgICAgICAgIC4uLmdldENhY2hlKCdtb250aCMnICsgaSwgeyBvbkNsaWNrOiAoKSA9PiB7IHNldE1vbnRoKGkgKyAxKSB9IH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIF0pXG4gICAgICAgIH0pXG5cbiAgICAgICAgcHJvcHMueWVhcnNJbk1vbnRoVmlldyA9PT0gdHJ1ZSAmJiBjb250ZW50LnVuc2hpZnQoXG4gICAgICAgICAgaCgnZGl2JywgeyBjbGFzczogJ3JvdyBuby13cmFwIGZ1bGwtd2lkdGgnIH0sIFtcbiAgICAgICAgICAgIGdldE5hdmlnYXRpb24oe1xuICAgICAgICAgICAgICBsYWJlbDogdmlld01vZGVsLnZhbHVlLnllYXIsXG4gICAgICAgICAgICAgIHR5cGU6ICdZZWFycycsXG4gICAgICAgICAgICAgIGtleTogdmlld01vZGVsLnZhbHVlLnllYXIsXG4gICAgICAgICAgICAgIGRpcjogeWVhckRpcmVjdGlvbi52YWx1ZSxcbiAgICAgICAgICAgICAgZ29UbzogZ29Ub1llYXIsXG4gICAgICAgICAgICAgIGJvdW5kYXJpZXM6IG5hdkJvdW5kYXJpZXMudmFsdWUueWVhcixcbiAgICAgICAgICAgICAgY2xzOiAnIGNvbCdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgXSlcbiAgICAgICAgKVxuXG4gICAgICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICAgICAga2V5OiAnbW9udGhzLXZpZXcnLFxuICAgICAgICAgIGNsYXNzOiAncS1kYXRlX192aWV3IHEtZGF0ZV9fbW9udGhzIGZsZXggZmxleC1jZW50ZXInXG4gICAgICAgIH0sIGNvbnRlbnQpXG4gICAgICB9LFxuXG4gICAgICBZZWFycyAoKSB7XG4gICAgICAgIGNvbnN0XG4gICAgICAgICAgc3RhcnQgPSBzdGFydFllYXIudmFsdWUsXG4gICAgICAgICAgc3RvcCA9IHN0YXJ0ICsgeWVhcnNJbnRlcnZhbCxcbiAgICAgICAgICB5ZWFycyA9IFtdXG5cbiAgICAgICAgY29uc3QgaXNEaXNhYmxlZCA9IHllYXIgPT4ge1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAobWluTmF2LnZhbHVlICE9PSBudWxsICYmIG1pbk5hdi52YWx1ZS55ZWFyID4geWVhcilcbiAgICAgICAgICAgIHx8IChtYXhOYXYudmFsdWUgIT09IG51bGwgJiYgbWF4TmF2LnZhbHVlLnllYXIgPCB5ZWFyKVxuICAgICAgICAgIClcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSBzdGFydDsgaSA8PSBzdG9wOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBhY3RpdmUgPSB2aWV3TW9kZWwudmFsdWUueWVhciA9PT0gaVxuXG4gICAgICAgICAgeWVhcnMucHVzaChcbiAgICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAgY2xhc3M6ICdxLWRhdGVfX3llYXJzLWl0ZW0gZmxleCBmbGV4LWNlbnRlcidcbiAgICAgICAgICAgIH0sIFtcbiAgICAgICAgICAgICAgaChRQnRuLCB7XG4gICAgICAgICAgICAgICAga2V5OiAneXInICsgaSxcbiAgICAgICAgICAgICAgICBjbGFzczogdG9kYXkudmFsdWUueWVhciA9PT0gaSA/ICdxLWRhdGVfX3RvZGF5JyA6IG51bGwsXG4gICAgICAgICAgICAgICAgZmxhdDogIWFjdGl2ZSxcbiAgICAgICAgICAgICAgICBsYWJlbDogaSxcbiAgICAgICAgICAgICAgICBkZW5zZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB1bmVsZXZhdGVkOiBhY3RpdmUsXG4gICAgICAgICAgICAgICAgY29sb3I6IGFjdGl2ZSA9PT0gdHJ1ZSA/IGNvbXB1dGVkQ29sb3IudmFsdWUgOiBudWxsLFxuICAgICAgICAgICAgICAgIHRleHRDb2xvcjogYWN0aXZlID09PSB0cnVlID8gY29tcHV0ZWRUZXh0Q29sb3IudmFsdWUgOiBudWxsLFxuICAgICAgICAgICAgICAgIHRhYmluZGV4OiB0YWJpbmRleC52YWx1ZSxcbiAgICAgICAgICAgICAgICBkaXNhYmxlOiBpc0Rpc2FibGVkKGkpLFxuICAgICAgICAgICAgICAgIC4uLmdldENhY2hlKCd5ciMnICsgaSwgeyBvbkNsaWNrOiAoKSA9PiB7IHNldFllYXIoaSkgfSB9KVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICApXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncS1kYXRlX192aWV3IHEtZGF0ZV9feWVhcnMgZmxleCBmbGV4LWNlbnRlcidcbiAgICAgICAgfSwgW1xuICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgIGNsYXNzOiAnY29sLWF1dG8nXG4gICAgICAgICAgfSwgW1xuICAgICAgICAgICAgaChRQnRuLCB7XG4gICAgICAgICAgICAgIHJvdW5kOiB0cnVlLFxuICAgICAgICAgICAgICBkZW5zZTogdHJ1ZSxcbiAgICAgICAgICAgICAgZmxhdDogdHJ1ZSxcbiAgICAgICAgICAgICAgaWNvbjogZGF0ZUFycm93LnZhbHVlWyAwIF0sXG4gICAgICAgICAgICAgIGFyaWFMYWJlbDogJHEubGFuZy5kYXRlLnByZXZSYW5nZVllYXJzKHllYXJzSW50ZXJ2YWwpLFxuICAgICAgICAgICAgICB0YWJpbmRleDogdGFiaW5kZXgudmFsdWUsXG4gICAgICAgICAgICAgIGRpc2FibGU6IGlzRGlzYWJsZWQoc3RhcnQpLFxuICAgICAgICAgICAgICAuLi5nZXRDYWNoZSgneS0nLCB7IG9uQ2xpY2s6ICgpID0+IHsgc3RhcnRZZWFyLnZhbHVlIC09IHllYXJzSW50ZXJ2YWwgfSB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdKSxcblxuICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgIGNsYXNzOiAncS1kYXRlX195ZWFycy1jb250ZW50IGNvbCBzZWxmLXN0cmV0Y2ggcm93IGl0ZW1zLWNlbnRlcidcbiAgICAgICAgICB9LCB5ZWFycyksXG5cbiAgICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgICBjbGFzczogJ2NvbC1hdXRvJ1xuICAgICAgICAgIH0sIFtcbiAgICAgICAgICAgIGgoUUJ0biwge1xuICAgICAgICAgICAgICByb3VuZDogdHJ1ZSxcbiAgICAgICAgICAgICAgZGVuc2U6IHRydWUsXG4gICAgICAgICAgICAgIGZsYXQ6IHRydWUsXG4gICAgICAgICAgICAgIGljb246IGRhdGVBcnJvdy52YWx1ZVsgMSBdLFxuICAgICAgICAgICAgICBhcmlhTGFiZWw6ICRxLmxhbmcuZGF0ZS5uZXh0UmFuZ2VZZWFycyh5ZWFyc0ludGVydmFsKSxcbiAgICAgICAgICAgICAgdGFiaW5kZXg6IHRhYmluZGV4LnZhbHVlLFxuICAgICAgICAgICAgICBkaXNhYmxlOiBpc0Rpc2FibGVkKHN0b3ApLFxuICAgICAgICAgICAgICAuLi5nZXRDYWNoZSgneSsnLCB7IG9uQ2xpY2s6ICgpID0+IHsgc3RhcnRZZWFyLnZhbHVlICs9IHllYXJzSW50ZXJ2YWwgfSB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdKVxuICAgICAgICBdKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRGF5Q2xpY2sgKGRheUluZGV4KSB7XG4gICAgICBjb25zdCBkYXkgPSB7IC4uLnZpZXdNb2RlbC52YWx1ZSwgZGF5OiBkYXlJbmRleCB9XG5cbiAgICAgIGlmIChwcm9wcy5yYW5nZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgdG9nZ2xlRGF0ZShkYXksIHZpZXdNb250aEhhc2gudmFsdWUpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAoZWRpdFJhbmdlLnZhbHVlID09PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IGRheVByb3BzID0gZGF5cy52YWx1ZS5maW5kKGRheSA9PiBkYXkuZmlsbCAhPT0gdHJ1ZSAmJiBkYXkuaSA9PT0gZGF5SW5kZXgpXG5cbiAgICAgICAgaWYgKHByb3BzLm5vVW5zZXQgIT09IHRydWUgJiYgZGF5UHJvcHMucmFuZ2UgIT09IHZvaWQgMCkge1xuICAgICAgICAgIHJlbW92ZUZyb21Nb2RlbCh7IHRhcmdldDogZGF5LCBmcm9tOiBkYXlQcm9wcy5yYW5nZS5mcm9tLCB0bzogZGF5UHJvcHMucmFuZ2UudG8gfSlcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkYXlQcm9wcy5zZWxlY3RlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHJlbW92ZUZyb21Nb2RlbChkYXkpXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBpbml0SGFzaCA9IGdldERheUhhc2goZGF5KVxuXG4gICAgICAgIGVkaXRSYW5nZS52YWx1ZSA9IHtcbiAgICAgICAgICBpbml0OiBkYXksXG4gICAgICAgICAgaW5pdEhhc2gsXG4gICAgICAgICAgZmluYWw6IGRheSxcbiAgICAgICAgICBmaW5hbEhhc2g6IGluaXRIYXNoXG4gICAgICAgIH1cblxuICAgICAgICBlbWl0KCdyYW5nZVN0YXJ0JywgZ2V0U2hvcnREYXRlKGRheSkpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY29uc3RcbiAgICAgICAgICBpbml0SGFzaCA9IGVkaXRSYW5nZS52YWx1ZS5pbml0SGFzaCxcbiAgICAgICAgICBmaW5hbEhhc2ggPSBnZXREYXlIYXNoKGRheSksXG4gICAgICAgICAgcGF5bG9hZCA9IGluaXRIYXNoIDw9IGZpbmFsSGFzaFxuICAgICAgICAgICAgPyB7IGZyb206IGVkaXRSYW5nZS52YWx1ZS5pbml0LCB0bzogZGF5IH1cbiAgICAgICAgICAgIDogeyBmcm9tOiBkYXksIHRvOiBlZGl0UmFuZ2UudmFsdWUuaW5pdCB9XG5cbiAgICAgICAgZWRpdFJhbmdlLnZhbHVlID0gbnVsbFxuICAgICAgICBhZGRUb01vZGVsKGluaXRIYXNoID09PSBmaW5hbEhhc2ggPyBkYXkgOiB7IHRhcmdldDogZGF5LCAuLi5wYXlsb2FkIH0pXG5cbiAgICAgICAgZW1pdCgncmFuZ2VFbmQnLCB7XG4gICAgICAgICAgZnJvbTogZ2V0U2hvcnREYXRlKHBheWxvYWQuZnJvbSksXG4gICAgICAgICAgdG86IGdldFNob3J0RGF0ZShwYXlsb2FkLnRvKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRGF5TW91c2VvdmVyIChkYXlJbmRleCkge1xuICAgICAgaWYgKGVkaXRSYW5nZS52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICBjb25zdCBmaW5hbCA9IHsgLi4udmlld01vZGVsLnZhbHVlLCBkYXk6IGRheUluZGV4IH1cblxuICAgICAgICBPYmplY3QuYXNzaWduKGVkaXRSYW5nZS52YWx1ZSwge1xuICAgICAgICAgIGZpbmFsLFxuICAgICAgICAgIGZpbmFsSGFzaDogZ2V0RGF5SGFzaChmaW5hbClcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBleHBvc2UgcHVibGljIG1ldGhvZHNcbiAgICBPYmplY3QuYXNzaWduKHByb3h5LCB7XG4gICAgICBzZXRUb2RheSwgc2V0Vmlldywgb2Zmc2V0Q2FsZW5kYXIsIHNldENhbGVuZGFyVG8sIHNldEVkaXRpbmdSYW5nZVxuICAgIH0pXG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY29uc3QgY29udGVudCA9IFtcbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncS1kYXRlX19jb250ZW50IGNvbCByZWxhdGl2ZS1wb3NpdGlvbidcbiAgICAgICAgfSwgW1xuICAgICAgICAgIGgoVHJhbnNpdGlvbiwge1xuICAgICAgICAgICAgbmFtZTogJ3EtdHJhbnNpdGlvbi0tZmFkZSdcbiAgICAgICAgICB9LCByZW5kZXJWaWV3c1sgdmlldy52YWx1ZSBdKVxuICAgICAgICBdKVxuICAgICAgXVxuXG4gICAgICBjb25zdCBkZWYgPSBoU2xvdChzbG90cy5kZWZhdWx0KVxuICAgICAgZGVmICE9PSB2b2lkIDAgJiYgY29udGVudC5wdXNoKFxuICAgICAgICBoKCdkaXYnLCB7IGNsYXNzOiAncS1kYXRlX19hY3Rpb25zJyB9LCBkZWYpXG4gICAgICApXG5cbiAgICAgIGlmIChwcm9wcy5uYW1lICE9PSB2b2lkIDAgJiYgcHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZSkge1xuICAgICAgICBpbmplY3RGb3JtSW5wdXQoY29udGVudCwgJ3B1c2gnKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgICAgLi4uYXR0cmlidXRlcy52YWx1ZVxuICAgICAgfSwgW1xuICAgICAgICBnZXRIZWFkZXIoKSxcblxuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgcmVmOiBibHVyVGFyZ2V0UmVmLFxuICAgICAgICAgIGNsYXNzOiAncS1kYXRlX19tYWluIGNvbCBjb2x1bW4nLFxuICAgICAgICAgIHRhYmluZGV4OiAtMVxuICAgICAgICB9LCBjb250ZW50KVxuICAgICAgXSlcbiAgICB9XG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBoLCByZWYsIGNvbXB1dGVkLCB3YXRjaCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgUURpYWxvZyBmcm9tICcuLi9kaWFsb2cvUURpYWxvZy5qcydcbmltcG9ydCBRTWVudSBmcm9tICcuLi9tZW51L1FNZW51LmpzJ1xuXG5pbXBvcnQgdXNlQW5jaG9yLCB7IHVzZUFuY2hvclByb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtYW5jaG9yL3VzZS1hbmNob3IuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGluamVjdFByb3AgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmluamVjdC1vYmotcHJvcC9pbmplY3Qtb2JqLXByb3AuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRUG9wdXBQcm94eScsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VBbmNob3JQcm9wcyxcblxuICAgIGJyZWFrcG9pbnQ6IHtcbiAgICAgIHR5cGU6IFsgU3RyaW5nLCBOdW1iZXIgXSxcbiAgICAgIGRlZmF1bHQ6IDQ1MFxuICAgIH1cbiAgfSxcblxuICBlbWl0czogWyAnc2hvdycsICdoaWRlJyBdLFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cywgZW1pdCwgYXR0cnMgfSkge1xuICAgIGNvbnN0IHsgcHJveHkgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgY29uc3QgeyAkcSB9ID0gcHJveHlcblxuICAgIGNvbnN0IHNob3dpbmcgPSByZWYoZmFsc2UpXG4gICAgY29uc3QgcG9wdXBSZWYgPSByZWYobnVsbClcbiAgICBjb25zdCBicmVha3BvaW50ID0gY29tcHV0ZWQoKCkgPT4gcGFyc2VJbnQocHJvcHMuYnJlYWtwb2ludCwgMTApKVxuXG4gICAgY29uc3QgeyBjYW5TaG93IH0gPSB1c2VBbmNob3IoeyBzaG93aW5nIH0pXG5cbiAgICBmdW5jdGlvbiBnZXRUeXBlICgpIHtcbiAgICAgIHJldHVybiAkcS5zY3JlZW4ud2lkdGggPCBicmVha3BvaW50LnZhbHVlIHx8ICRxLnNjcmVlbi5oZWlnaHQgPCBicmVha3BvaW50LnZhbHVlXG4gICAgICAgID8gJ2RpYWxvZydcbiAgICAgICAgOiAnbWVudSdcbiAgICB9XG5cbiAgICBjb25zdCB0eXBlID0gcmVmKGdldFR5cGUoKSlcblxuICAgIGNvbnN0IHBvcHVwUHJvcHMgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICB0eXBlLnZhbHVlID09PSAnbWVudScgPyB7IG1heEhlaWdodDogJzk5dmgnIH0gOiB7fSlcbiAgICApXG5cbiAgICB3YXRjaCgoKSA9PiBnZXRUeXBlKCksIHZhbCA9PiB7XG4gICAgICBpZiAoc2hvd2luZy52YWx1ZSAhPT0gdHJ1ZSkge1xuICAgICAgICB0eXBlLnZhbHVlID0gdmFsXG4gICAgICB9XG4gICAgfSlcblxuICAgIGZ1bmN0aW9uIG9uU2hvdyAoZXZ0KSB7XG4gICAgICBzaG93aW5nLnZhbHVlID0gdHJ1ZVxuICAgICAgZW1pdCgnc2hvdycsIGV2dClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkhpZGUgKGV2dCkge1xuICAgICAgc2hvd2luZy52YWx1ZSA9IGZhbHNlXG4gICAgICB0eXBlLnZhbHVlID0gZ2V0VHlwZSgpXG4gICAgICBlbWl0KCdoaWRlJywgZXZ0KVxuICAgIH1cblxuICAgIC8vIGV4cG9zZSBwdWJsaWMgbWV0aG9kc1xuICAgIE9iamVjdC5hc3NpZ24ocHJveHksIHtcbiAgICAgIHNob3cgKGV2dCkgeyBjYW5TaG93KGV2dCkgPT09IHRydWUgJiYgcG9wdXBSZWYudmFsdWUuc2hvdyhldnQpIH0sXG4gICAgICBoaWRlIChldnQpIHsgcG9wdXBSZWYudmFsdWUuaGlkZShldnQpIH0sXG4gICAgICB0b2dnbGUgKGV2dCkgeyBwb3B1cFJlZi52YWx1ZS50b2dnbGUoZXZ0KSB9XG4gICAgfSlcblxuICAgIGluamVjdFByb3AocHJveHksICdjdXJyZW50Q29tcG9uZW50JywgKCkgPT4gKHtcbiAgICAgIHR5cGU6IHR5cGUudmFsdWUsXG4gICAgICByZWY6IHBvcHVwUmVmLnZhbHVlXG4gICAgfSkpXG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgcmVmOiBwb3B1cFJlZixcbiAgICAgICAgLi4ucG9wdXBQcm9wcy52YWx1ZSxcbiAgICAgICAgLi4uYXR0cnMsXG4gICAgICAgIG9uU2hvdyxcbiAgICAgICAgb25IaWRlXG4gICAgICB9XG5cbiAgICAgIGxldCBjb21wb25lbnRcblxuICAgICAgaWYgKHR5cGUudmFsdWUgPT09ICdkaWFsb2cnKSB7XG4gICAgICAgIGNvbXBvbmVudCA9IFFEaWFsb2dcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb21wb25lbnQgPSBRTWVudVxuICAgICAgICBPYmplY3QuYXNzaWduKGRhdGEsIHtcbiAgICAgICAgICB0YXJnZXQ6IHByb3BzLnRhcmdldCxcbiAgICAgICAgICBjb250ZXh0TWVudTogcHJvcHMuY29udGV4dE1lbnUsXG4gICAgICAgICAgbm9QYXJlbnRFdmVudDogdHJ1ZSxcbiAgICAgICAgICBzZXBhcmF0ZUNsb3NlUG9wdXA6IHRydWVcbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGgoY29tcG9uZW50LCBkYXRhLCBzbG90cy5kZWZhdWx0KVxuICAgIH1cbiAgfVxufSlcbiIsIjx0ZW1wbGF0ZT5cbiAgPHEtcGFnZT5cbiAgICA8ZGl2IGNsYXNzPVwicmVwb3J0LWNhcmQgcS1wYS1sZ1wiPlxuICAgICAgPGRpdiBjbGFzcz1cInJvdyBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHEtbWItbWQgcmVwb3J0LWhlYWRlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLWF1dG8gZmxleCBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICA8cS1pY29uIG5hbWU9XCJiYXJfY2hhcnRcIiBzaXplPVwiMzZweFwiIGNvbG9yPVwicHJpbWFyeVwiIGNsYXNzPVwicS1tci1zbSBhbmltYXRlLWljb25cIiAvPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwicmVwb3J0LXRpdGxlIGdyYWRpZW50LXRpdGxlXCI+UmVsYXTDs3JpbyBkZSBWZW5kYXM8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLWF1dG9cIj5cbiAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgdi1tb2RlbD1cInNlbGVjdGVkRGF0ZVwiXG4gICAgICAgICAgICBmaWxsZWRcbiAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICBjbGFzcz1cImRhdGUtaW5wdXRcIlxuICAgICAgICAgICAgbGFiZWw9XCJGaWx0cmFyIHBvciBkYXRhXCJcbiAgICAgICAgICAgIG1hc2s9XCIjIy8jIy8jIyMjXCJcbiAgICAgICAgICAgIDppbnB1dC1zdHlsZT1cInsgY29sb3I6ICcjY2ZkOGRjJywgZm9udFdlaWdodDogNTAwIH1cIlxuICAgICAgICAgICAgcmVhZG9ubHlcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8dGVtcGxhdGUgI3ByZXBlbmQ+XG4gICAgICAgICAgICAgIDxxLWljb24gbmFtZT1cImV2ZW50XCIgY29sb3I9XCJwcmltYXJ5XCIgLz5cbiAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICA8dGVtcGxhdGUgI2FwcGVuZD5cbiAgICAgICAgICAgICAgPHEtYnRuIGZsYXQgZGVuc2Ugcm91bmQgaWNvbj1cImFycm93X2Ryb3BfZG93blwiIEBjbGljaz1cInNob3dEYXRlID0gdHJ1ZVwiIC8+XG4gICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgIDwvcS1pbnB1dD5cbiAgICAgICAgICA8cS1wb3B1cC1wcm94eSB2LW1vZGVsPVwic2hvd0RhdGVcIiB0cmFuc2l0aW9uLXNob3c9XCJzY2FsZVwiIHRyYW5zaXRpb24taGlkZT1cInNjYWxlXCI+XG4gICAgICAgICAgICA8cS1kYXRlIHYtbW9kZWw9XCJzZWxlY3RlZERhdGVcIiBtYXNrPVwiREQvTU0vWVlZWVwiIGNvbG9yPVwicHJpbWFyeVwiIC8+XG4gICAgICAgICAgPC9xLXBvcHVwLXByb3h5PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPHEtdGFibGVcbiAgICAgICAgOnJvd3M9XCJmaWx0ZXJlZFNhbGVzXCJcbiAgICAgICAgOmNvbHVtbnM9XCJjb2x1bW5zXCJcbiAgICAgICAgZmxhdFxuICAgICAgICBzcXVhcmVcbiAgICAgICAgaGlkZS1ib3R0b21cbiAgICAgICAgY2xhc3M9XCJyZXBvcnQtdGFibGUgYW5pbWF0ZS1mYWRlLWluXCJcbiAgICAgICAgOnJvd3MtcGVyLXBhZ2Utb3B0aW9ucz1cIlswXVwiXG4gICAgICAgIDpwYWdpbmF0aW9uPVwieyByb3dzUGVyUGFnZTogMCB9XCJcbiAgICAgID5cbiAgICAgICAgPHRlbXBsYXRlICNuby1kYXRhPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJuby1kYXRhIGZsZXggZmxleC1jZW50ZXIgY29sdW1uIHEtcGEteGxcIj5cbiAgICAgICAgICAgIDxxLWljb24gbmFtZT1cImludmVudG9yeV8yXCIgc2l6ZT1cIjcycHhcIiBjb2xvcj1cImdyZXktN1wiIGNsYXNzPVwiYW5pbWF0ZS1pY29uXCIgLz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuby1kYXRhLXRleHQgcS1tdC1tZFwiPlxuICAgICAgICAgICAgICBOZW5odW1hIHZlbmRhIHJlZ2lzdHJhZGE8YnIgLz5ubyBwZXLDrW9kbyBzZWxlY2lvbmFkb1xuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICA8L3EtdGFibGU+XG4gICAgPC9kaXY+XG4gIDwvcS1wYWdlPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiwgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5pbXBvcnQgeyBkYXRlIH0gZnJvbSAncXVhc2FyJ1xuaW1wb3J0IHsgdXNlU2FsZXNTdG9yZSB9IGZyb20gJ3NyYy9zdG9yZXMvc2FsZXMtc3RvcmUnXG5cbmNvbnN0IHNhbGVzU3RvcmUgPSB1c2VTYWxlc1N0b3JlKClcbmNvbnN0IHRvZGF5ID0gZGF0ZS5mb3JtYXREYXRlKG5ldyBEYXRlKCksICdERC9NTS9ZWVlZJylcbmNvbnN0IHNlbGVjdGVkRGF0ZSA9IHJlZih0b2RheSlcbmNvbnN0IHNob3dEYXRlID0gcmVmKGZhbHNlKVxuXG5jb25zdCBzYWxlcyA9IGNvbXB1dGVkKCgpID0+IHNhbGVzU3RvcmUuc2FsZXMgfHwgW10pXG5cbi8vIEZpbHRyYSB2ZW5kYXMgcGVsYSBkYXRhIHNlbGVjaW9uYWRhIChwb2RlIGFkYXB0YXIgcGFyYSBtw6pzL2FubyBzZSBxdWlzZXIpXG5jb25zdCBmaWx0ZXJlZFNhbGVzID0gY29tcHV0ZWQoKCkgPT4gc2FsZXMudmFsdWUuZmlsdGVyKChzYWxlKSA9PiBzYWxlLmRhdGUgPT09IHNlbGVjdGVkRGF0ZS52YWx1ZSkpXG5cbmNvbnN0IGNvbHVtbnMgPSBbXG4gIHsgbmFtZTogJ2l0ZW0nLCBsYWJlbDogJ1Byb2R1dG8nLCBmaWVsZDogJ2l0ZW0nLCBhbGlnbjogJ2xlZnQnIH0sXG4gIHsgbmFtZTogJ2RhdGUnLCBsYWJlbDogJ0RhdGEnLCBmaWVsZDogJ2RhdGUnLCBhbGlnbjogJ2NlbnRlcicgfSxcbiAgeyBuYW1lOiAncXVhbnRpdHknLCBsYWJlbDogJ1F1YW50aWRhZGUnLCBmaWVsZDogJ3F1YW50aXR5JywgYWxpZ246ICdjZW50ZXInIH0sXG4gIHtcbiAgICBuYW1lOiAndmFsdWUnLFxuICAgIGxhYmVsOiAnVmFsb3IgKFIkKScsXG4gICAgZmllbGQ6IChyb3cpID0+XG4gICAgICBOdW1iZXIocm93LnZhbHVlKS50b0xvY2FsZVN0cmluZygncHQtQlInLCB7IHN0eWxlOiAnY3VycmVuY3knLCBjdXJyZW5jeTogJ0JSTCcgfSksXG4gICAgYWxpZ246ICdjZW50ZXInLFxuICB9LFxuICB7IG5hbWU6ICdtZXRob2QnLCBsYWJlbDogJ03DqXRvZG8gZGUgUGFnYW1lbnRvJywgZmllbGQ6ICdtZXRob2QnLCBhbGlnbjogJ2NlbnRlcicgfSxcbl1cbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuLnJlcG9ydHMtYmcge1xuICBtaW4taGVpZ2h0OiAxMDB2aDtcbiAgYmFja2dyb3VuZDogcmFkaWFsLWdyYWRpZW50KGVsbGlwc2UgYXQgdG9wIGxlZnQsICMyMzI0M2EgNjAlLCAjMTgxOTI2IDEwMCUpO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYW5pbWF0aW9uOiBmYWRlSW5CZyAxLjJzO1xufVxuXG5Aa2V5ZnJhbWVzIGZhZGVJbkJnIHtcbiAgZnJvbSB7XG4gICAgb3BhY2l0eTogMDtcbiAgfVxuICB0byB7XG4gICAgb3BhY2l0eTogMTtcbiAgfVxufVxuXG4ucmVwb3J0LWNhcmQge1xuICBiYWNrZ3JvdW5kOiByZ2JhKDI4LCAzMCwgNDQsIDAuOTgpO1xuICBib3JkZXItcmFkaXVzOiAyMHB4O1xuICBib3gtc2hhZG93OiAwIDZweCAzNnB4IDAgIzAwMGE7XG4gIG1heC13aWR0aDogOTUwcHg7XG4gIHdpZHRoOiAxMDAlO1xuICBtYXJnaW46IDMycHggMDtcbiAgYm9yZGVyOiAxLjVweCBzb2xpZCAjMjMyNDNhO1xuICBhbmltYXRpb246IGZhZGVJblVwIDAuOHM7XG59XG5cbkBrZXlmcmFtZXMgZmFkZUluVXAge1xuICBmcm9tIHtcbiAgICBvcGFjaXR5OiAwO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSg0MHB4KTtcbiAgfVxuICB0byB7XG4gICAgb3BhY2l0eTogMTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XG4gIH1cbn1cblxuLnJlcG9ydC1oZWFkZXIge1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzIzMjQzYTtcbiAgcGFkZGluZy1ib3R0b206IDE4cHg7XG4gIG1hcmdpbi1ib3R0b206IDA7XG59XG5cbi5yZXBvcnQtdGl0bGUge1xuICBmb250LXNpemU6IDIuMnJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgZm9udC1mYW1pbHk6ICdQb3BwaW5zJywgc2Fucy1zZXJpZjtcbiAgbGV0dGVyLXNwYWNpbmc6IDFweDtcbiAgbWFyZ2luLWxlZnQ6IDJweDtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xufVxuXG4uZ3JhZGllbnQtdGl0bGUge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICM0Y2FmNTAsICMyMTk2ZjMsICNmZjk4MDApO1xuICAtd2Via2l0LWJhY2tncm91bmQtY2xpcDogdGV4dDtcbiAgYmFja2dyb3VuZC1jbGlwOiB0ZXh0O1xuICAtd2Via2l0LXRleHQtZmlsbC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIGFuaW1hdGlvbjogZ3JhZGllbnRNb3ZlIDNzIGluZmluaXRlIGxpbmVhcjtcbiAgYmFja2dyb3VuZC1zaXplOiAyMDAlIDIwMCU7XG59XG5cbkBrZXlmcmFtZXMgZ3JhZGllbnRNb3ZlIHtcbiAgMCUge1xuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAlIDUwJTtcbiAgfVxuICAxMDAlIHtcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAxMDAlIDUwJTtcbiAgfVxufVxuXG4uZGF0ZS1pbnB1dCB7XG4gIG1pbi13aWR0aDogMTkwcHg7XG4gIGJhY2tncm91bmQ6IHJnYmEoMzYsIDQwLCA1NiwgMC45NSk7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gIGNvbG9yOiAjY2ZkOGRjO1xuICBmb250LXdlaWdodDogNTAwO1xuICBib3gtc2hhZG93OiAwIDJweCA4cHggMCAjMjMyNDNhMzM7XG4gIHRyYW5zaXRpb246IGJveC1zaGFkb3cgMC4ycztcbn1cbi5kYXRlLWlucHV0OmZvY3VzLXdpdGhpbiB7XG4gIGJveC1zaGFkb3c6IDAgNHB4IDE2cHggMCAjMjE5NmYzNTU7XG59XG5cbi5yZXBvcnQtdGFibGUge1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgY29sb3I6ICNjZmQ4ZGM7XG4gIGJvcmRlci1yYWRpdXM6IDE0cHg7XG4gIGZvbnQtc2l6ZTogMS4wOHJlbTtcbiAgbWFyZ2luLXRvcDogMDtcbn1cblxuLnJlcG9ydC10YWJsZSAucS10YWJsZV9fdG9wLFxuLnJlcG9ydC10YWJsZSAucS10YWJsZV9fYm90dG9tLFxuLnJlcG9ydC10YWJsZSAucS10YWJsZV9fc2VwYXJhdG9yIHtcbiAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xufVxuXG4ucmVwb3J0LXRhYmxlIHRoZWFkIHRyIHtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAjYjBiOGM5O1xuICBmb250LXdlaWdodDogNjAwO1xuICBmb250LXNpemU6IDEuMDhyZW07XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjMjMyNDNhO1xufVxuXG4ucmVwb3J0LXRhYmxlIHRib2R5IHRyIHtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjMjMyNDNhO1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIDAuMnM7XG59XG4ucmVwb3J0LXRhYmxlIHRib2R5IHRyOmhvdmVyIHtcbiAgYmFja2dyb3VuZDogcmdiYSgzMywgMTUwLCAyNDMsIDAuMDYpO1xufVxuXG4ubm8tZGF0YSB7XG4gIG1pbi1oZWlnaHQ6IDIyMHB4O1xuICBjb2xvcjogIzdjODU5NjtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBvcGFjaXR5OiAwLjg1O1xuICBhbmltYXRpb246IGZhZGVJbiAxcztcbn1cblxuLm5vLWRhdGEtdGV4dCB7XG4gIGZvbnQtc2l6ZTogMS4yNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgY29sb3I6ICM3Yzg1OTY7XG4gIG1hcmdpbi10b3A6IDhweDtcbiAgbGluZS1oZWlnaHQ6IDEuNDtcbn1cblxuLmFuaW1hdGUtZmFkZS1pbiB7XG4gIGFuaW1hdGlvbjogZmFkZUluIDEuMXM7XG59XG5cbi5hbmltYXRlLWljb24ge1xuICBhbmltYXRpb246IHBvcEluIDAuN3MgY3ViaWMtYmV6aWVyKDAuNjgsIC0wLjU1LCAwLjI3LCAxLjU1KTtcbn1cblxuQGtleWZyYW1lcyBmYWRlSW4ge1xuICBmcm9tIHtcbiAgICBvcGFjaXR5OiAwO1xuICB9XG4gIHRvIHtcbiAgICBvcGFjaXR5OiAxO1xuICB9XG59XG5cbkBrZXlmcmFtZXMgcG9wSW4ge1xuICAwJSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjcpIHJvdGF0ZSgtMTBkZWcpO1xuICAgIG9wYWNpdHk6IDA7XG4gIH1cbiAgNzAlIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMSkgcm90YXRlKDJkZWcpO1xuICAgIG9wYWNpdHk6IDE7XG4gIH1cbiAgMTAwJSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxKSByb3RhdGUoMCk7XG4gICAgb3BhY2l0eTogMTtcbiAgfVxufVxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6WyJkYXRlIiwibW9kIiwiTGFuZyIsImRhdGUyIiwibWFzayIsImxvY2FsZSIsIm1vZGVsIiwiZGF5cyIsImRheXNJbk1vbnRoIiwieWVhciIsInZpZXciLCJkYXkiLCJfY3JlYXRlQmxvY2siLCJfd2l0aEN0eCIsIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfY3JlYXRlVk5vZGUiLCJfY3JlYXRlVGV4dFZOb2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQTJCLFNBQUEsaUJBQUE7QUFDckIsTUFBQSxRQUFlLHVCQUFBLE9BQU8sSUFBSTtBQUV2QixTQUFBO0FBQUEsSUFDTCxVQU1JLENBQUMsS0FBSyxpQkFDSixNQUFPLEdBQUksTUFBTSxTQUVYLE1BQU8sR0FBSSxJQUNULE9BQU8saUJBQWlCLGFBQ3BCLGFBQWEsSUFDYixlQUdSLE1BQU8sR0FBSTtBQUFBLElBR3JCLFNBQVUsS0FBSyxLQUFLO0FBQ2xCLFlBQU8sR0FBSSxJQUFJO0FBQUEsSUFDakI7QUFBQSxJQUVBLFNBQVUsS0FBSztBQUNiLGFBQU8sT0FBTyxlQUFlLEtBQUssT0FBTyxHQUFHO0FBQUEsSUFDOUM7QUFBQSxJQUVBLFdBQVksS0FBSztBQUNmLFVBQUksUUFBUSxRQUFRO0FBQ2xCLGVBQU8sTUFBTyxHQUFJO0FBQUEsTUFBQSxPQUVmO0FBQ0ssZ0JBQUEsdUJBQU8sT0FBTyxJQUFJO0FBQUEsTUFBQTtBQUFBLElBQzVCO0FBQUEsRUFFSjtBQUNGO0FDbENBLE1BQU0sU0FB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QUFFWixRQUFNLFlBQVksS0FBSyxRQUFRLGNBQWMsV0FBUztBQUNwRDtBQUNBLFlBQVEsT0FBSztBQUFBLE1BQ1gsS0FBSztBQUNILFlBQUksS0FBSztBQUNULGVBQU87QUFBQSxNQUNULEtBQUs7QUFDSCxZQUFJLE9BQU87QUFDWCxlQUFPO0FBQUEsTUFDVCxLQUFLO0FBQ0gsWUFBSSxJQUFJO0FBQ1IsZUFBTztBQUFBLE1BQ1QsS0FBSztBQUNILFlBQUksSUFBSTtBQUNSLGVBQU87QUFBQSxNQUNULEtBQUs7QUFDSCxZQUFJLElBQUk7QUFDUixlQUFPO0FBQUEsTUFDVCxLQUFLO0FBQ0gsWUFBSSxNQUFNO0FBQ1YsZUFBTztBQUFBLE1BQ1QsS0FBSztBQUNILFlBQUksT0FBTztBQUNYLGVBQU87QUFBQSxNQUNULEtBQUs7QUFDSCxZQUFJLElBQUk7QUFDUixlQUFPO0FBQUEsTUFDVCxLQUFLO0FBQ0gsWUFBSSxJQUFJO0FBQ1IsZUFBTztBQUFBLE1BQ1QsS0FBSztBQUNILFlBQUksSUFBSTtBQUNSLGVBQU87QUFBQSxNQUNULEtBQUs7QUFDSCxZQUFJLElBQUk7QUFDUixlQUFPO0FBQUEsTUFDVCxLQUFLO0FBQ0gsWUFBSSxJQUFJO0FBQ1IsZUFBTztBQUFBLE1BQ1QsS0FBSztBQUNILFlBQUksSUFBSTtBQUNSLGVBQU87QUFBQSxNQUNULEtBQUs7QUFDSCxZQUFJLElBQUk7QUFDUixlQUFPO0FBQUEsTUFDVCxLQUFLO0FBQ0gsWUFBSSxJQUFJO0FBQ1IsZUFBTztBQUFBLE1BQ1QsS0FBSztBQUNILFlBQUksSUFBSTtBQUNSLGVBQU87QUFBQSxNQUNULEtBQUs7QUFDSCxZQUFJLElBQUk7QUFDUixlQUFPO0FBQUEsTUFDVCxLQUFLO0FBQ0gsWUFBSSxJQUFJO0FBQ1IsZUFBTztBQUFBLE1BQ1QsS0FBSztBQUNILFlBQUksSUFBSTtBQUNSLGVBQU87QUFBQSxNQUNULEtBQUs7QUFDSCxZQUFJLElBQUk7QUFDUixlQUFPO0FBQUEsTUFDVCxLQUFLO0FBQ0gsWUFBSSxJQUFJO0FBQ1IsZUFBTztBQUFB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QUEsV0FBQSxZQUFBLElBQUE7QUFBQSxjQUNuRCxVQUFBO0FBQUE7Y0FFVyxpQkFDVCxNQUF1QztBQUFBLGdCQUF2Q0EsWUFBdUMsT0FBQTtBQUFBLGtCQUEvQixNQUFLO0FBQUEsa0JBQVEsT0FBTTtBQUFBOztjQUVsQixnQkFDVCxNQUEwRTtBQUFBLGdCQUExRUEsWUFBMEUsTUFBQTtBQUFBLGtCQUFuRSxNQUFBO0FBQUEsa0JBQUssT0FBQTtBQUFBLGtCQUFNLE9BQUE7QUFBQSxrQkFBTSxNQUFLO0FBQUEsa0JBQW1CLCtDQUFPLE9BQVEsV0FBQTtBQUFBOztjQXZCN0UsR0FBQTtBQUFBO1lBMEJVQSxZQUVnQixhQUFBO0FBQUEsY0E1QjFCLFlBMEJrQyxPQUFRO0FBQUEsY0ExQjFDLHVCQUFBLE9BQUEsQ0FBQSxNQUFBLE9BQUEsQ0FBQSxJQUFBLFlBMEJrQyxPQUFRLFdBQUE7QUFBQSxjQUFFLG1CQUFnQjtBQUFBLGNBQVEsbUJBQWdCO0FBQUE7Y0ExQnBGLFNBQUFGLFFBMkJZLE1BQW1FO0FBQUEsZ0JBQW5FRSxZQUFtRSxPQUFBO0FBQUEsa0JBM0IvRSxZQTJCNkIsT0FBWTtBQUFBLGtCQTNCekMsdUJBQUEsT0FBQSxDQUFBLE1BQUEsT0FBQSxDQUFBLElBQUEsWUEyQjZCLE9BQVksZUFBQTtBQUFBLGtCQUFFLE1BQUs7QUFBQSxrQkFBYSxPQUFNO0FBQUE7O2NBM0JuRSxHQUFBO0FBQUE7OztRQStCTUEsWUFrQlUsUUFBQTtBQUFBLFVBakJQLE1BQU0sT0FBYTtBQUFBLFVBQ25CLFNBQVMsT0FBTztBQUFBLFVBQ2pCLE1BQUE7QUFBQSxVQUNBLFFBQUE7QUFBQSxVQUNBLGVBQUE7QUFBQSxVQUNBLE9BQU07QUFBQSxVQUNMLHlCQUF1QixDQUFHLENBQUE7QUFBQSxVQUMxQixZQUFZLEVBQWtCLGFBQUEsRUFBQTtBQUFBO1VBRXBCLG1CQUNULE1BS007QUFBQSxZQUxORCxnQkFLTSxPQUxOLFlBS007QUFBQSxjQUpKQyxZQUE2RSxPQUFBO0FBQUEsZ0JBQXJFLE1BQUs7QUFBQSxnQkFBYyxNQUFLO0FBQUEsZ0JBQU8sT0FBTTtBQUFBLGdCQUFTLE9BQU07QUFBQTt3Q0FDNURELGdCQUVNLE9BQUEsRUFGRCxPQUFNLDBCQUFzQjtBQUFBLGdCQTVDN0NFLGdCQTRDOEMsMkJBQ1I7QUFBQSxnQkFBQUYsZ0JBQU0sSUFBQTtBQUFBLGdCQTdDNUNFLGdCQTZDNEMseUJBQ2hDO0FBQUE7OztVQTlDWixHQUFBO0FBQUE7OztJQUFBLEdBQUE7QUFBQTs7OyIsInhfZ29vZ2xlX2lnbm9yZUxpc3QiOlswLDEsMiwzLDQsNV19
