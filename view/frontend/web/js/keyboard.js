/*!
 *
 *   simple-keyboard v3.0.27
 *   https://github.com/hodgef/simple-keyboard
 *
 *   Copyright (c) Francisco Hodge (https://github.com/hodgef) and project contributors.
 *
 *   This source code is licensed under the MIT license found in the
 *   LICENSE file in the root directory of this source tree.
 *
 */
!(function (t, e) {
	'object' == typeof exports && 'object' == typeof module
		? (module.exports = e())
		: 'function' == typeof define && define.amd
		? define([], e)
		: 'object' == typeof exports
		? (exports.SimpleKeyboard = e())
		: (t.SimpleKeyboard = e());
})(this, function () {
	return (function () {
		var t = {
				3099: function (t) {
					t.exports = function (t) {
						if ('function' != typeof t)
							throw TypeError(String(t) + ' is not a function');
						return t;
					};
				},
				6077: function (t, e, n) {
					var o = n(111);
					t.exports = function (t) {
						if (!o(t) && null !== t)
							throw TypeError("Can't set " + String(t) + ' as a prototype');
						return t;
					};
				},
				1223: function (t, e, n) {
					var o = n(5112),
						r = n(30),
						i = n(3070),
						a = o('unscopables'),
						s = Array.prototype;
					null == s[a] && i.f(s, a, { configurable: !0, value: r(null) }),
						(t.exports = function (t) {
							s[a][t] = !0;
						});
				},
				1530: function (t, e, n) {
					'use strict';
					var o = n(8710).charAt;
					t.exports = function (t, e, n) {
						return e + (n ? o(t, e).length : 1);
					};
				},
				9670: function (t, e, n) {
					var o = n(111);
					t.exports = function (t) {
						if (!o(t)) throw TypeError(String(t) + ' is not an object');
						return t;
					};
				},
				8533: function (t, e, n) {
					'use strict';
					var o = n(2092).forEach,
						r = n(9341)('forEach');
					t.exports = r
						? [].forEach
						: function (t) {
								return o(this, t, arguments.length > 1 ? arguments[1] : void 0);
						  };
				},
				8457: function (t, e, n) {
					'use strict';
					var o = n(9974),
						r = n(7908),
						i = n(3411),
						a = n(7659),
						s = n(7466),
						u = n(6135),
						c = n(1246);
					t.exports = function (t) {
						var e,
							n,
							l,
							f,
							d,
							p,
							h = r(t),
							v = 'function' == typeof this ? this : Array,
							g = arguments.length,
							y = g > 1 ? arguments[1] : void 0,
							m = void 0 !== y,
							b = c(h),
							x = 0;
						if (
							(m && (y = o(y, g > 2 ? arguments[2] : void 0, 2)),
							null == b || (v == Array && a(b)))
						)
							for (n = new v((e = s(h.length))); e > x; x++)
								(p = m ? y(h[x], x) : h[x]), u(n, x, p);
						else
							for (
								d = (f = b.call(h)).next, n = new v();
								!(l = d.call(f)).done;
								x++
							)
								(p = m ? i(f, y, [l.value, x], !0) : l.value), u(n, x, p);
						return (n.length = x), n;
					};
				},
				1318: function (t, e, n) {
					var o = n(5656),
						r = n(7466),
						i = n(1400),
						a = function (t) {
							return function (e, n, a) {
								var s,
									u = o(e),
									c = r(u.length),
									l = i(a, c);
								if (t && n != n) {
									for (; c > l; ) if ((s = u[l++]) != s) return !0;
								} else
									for (; c > l; l++)
										if ((t || l in u) && u[l] === n) return t || l || 0;
								return !t && -1;
							};
						};
					t.exports = { includes: a(!0), indexOf: a(!1) };
				},
				2092: function (t, e, n) {
					var o = n(9974),
						r = n(8361),
						i = n(7908),
						a = n(7466),
						s = n(5417),
						u = [].push,
						c = function (t) {
							var e = 1 == t,
								n = 2 == t,
								c = 3 == t,
								l = 4 == t,
								f = 6 == t,
								d = 7 == t,
								p = 5 == t || f;
							return function (h, v, g, y) {
								for (
									var m,
										b,
										x = i(h),
										w = r(x),
										E = o(v, g, 3),
										O = a(w.length),
										S = 0,
										k = y || s,
										I = e ? k(h, O) : n || d ? k(h, 0) : void 0;
									O > S;
									S++
								)
									if ((p || S in w) && ((b = E((m = w[S]), S, x)), t))
										if (e) I[S] = b;
										else if (b)
											switch (t) {
												case 3:
													return !0;
												case 5:
													return m;
												case 6:
													return S;
												case 2:
													u.call(I, m);
											}
										else
											switch (t) {
												case 4:
													return !1;
												case 7:
													u.call(I, m);
											}
								return f ? -1 : c || l ? l : I;
							};
						};
					t.exports = {
						forEach: c(0),
						map: c(1),
						filter: c(2),
						some: c(3),
						every: c(4),
						find: c(5),
						findIndex: c(6),
						filterOut: c(7),
					};
				},
				1194: function (t, e, n) {
					var o = n(7293),
						r = n(5112),
						i = n(7392),
						a = r('species');
					t.exports = function (t) {
						return (
							i >= 51 ||
							!o(function () {
								var e = [];
								return (
									((e.constructor = {})[a] = function () {
										return { foo: 1 };
									}),
									1 !== e[t](Boolean).foo
								);
							})
						);
					};
				},
				9341: function (t, e, n) {
					'use strict';
					var o = n(7293);
					t.exports = function (t, e) {
						var n = [][t];
						return (
							!!n &&
							o(function () {
								n.call(
									null,
									e ||
										function () {
											throw 1;
										},
									1,
								);
							})
						);
					};
				},
				3671: function (t, e, n) {
					var o = n(3099),
						r = n(7908),
						i = n(8361),
						a = n(7466),
						s = function (t) {
							return function (e, n, s, u) {
								o(n);
								var c = r(e),
									l = i(c),
									f = a(c.length),
									d = t ? f - 1 : 0,
									p = t ? -1 : 1;
								if (s < 2)
									for (;;) {
										if (d in l) {
											(u = l[d]), (d += p);
											break;
										}
										if (((d += p), t ? d < 0 : f <= d))
											throw TypeError(
												'Reduce of empty array with no initial value',
											);
									}
								for (; t ? d >= 0 : f > d; d += p)
									d in l && (u = n(u, l[d], d, c));
								return u;
							};
						};
					t.exports = { left: s(!1), right: s(!0) };
				},
				5417: function (t, e, n) {
					var o = n(111),
						r = n(3157),
						i = n(5112)('species');
					t.exports = function (t, e) {
						var n;
						return (
							r(t) &&
								('function' != typeof (n = t.constructor) ||
								(n !== Array && !r(n.prototype))
									? o(n) && null === (n = n[i]) && (n = void 0)
									: (n = void 0)),
							new (void 0 === n ? Array : n)(0 === e ? 0 : e)
						);
					};
				},
				3411: function (t, e, n) {
					var o = n(9670),
						r = n(9212);
					t.exports = function (t, e, n, i) {
						try {
							return i ? e(o(n)[0], n[1]) : e(n);
						} catch (e) {
							throw (r(t), e);
						}
					};
				},
				7072: function (t, e, n) {
					var o = n(5112)('iterator'),
						r = !1;
					try {
						var i = 0,
							a = {
								next: function () {
									return { done: !!i++ };
								},
								return: function () {
									r = !0;
								},
							};
						(a[o] = function () {
							return this;
						}),
							Array.from(a, function () {
								throw 2;
							});
					} catch (t) {}
					t.exports = function (t, e) {
						if (!e && !r) return !1;
						var n = !1;
						try {
							var i = {};
							(i[o] = function () {
								return {
									next: function () {
										return { done: (n = !0) };
									},
								};
							}),
								t(i);
						} catch (t) {}
						return n;
					};
				},
				4326: function (t) {
					var e = {}.toString;
					t.exports = function (t) {
						return e.call(t).slice(8, -1);
					};
				},
				648: function (t, e, n) {
					var o = n(1694),
						r = n(4326),
						i = n(5112)('toStringTag'),
						a =
							'Arguments' ==
							r(
								(function () {
									return arguments;
								})(),
							);
					t.exports = o
						? r
						: function (t) {
								var e, n, o;
								return void 0 === t
									? 'Undefined'
									: null === t
									? 'Null'
									: 'string' ==
									  typeof (n = (function (t, e) {
											try {
												return t[e];
											} catch (t) {}
									  })((e = Object(t)), i))
									? n
									: a
									? r(e)
									: 'Object' == (o = r(e)) && 'function' == typeof e.callee
									? 'Arguments'
									: o;
						  };
				},
				9920: function (t, e, n) {
					var o = n(6656),
						r = n(3887),
						i = n(1236),
						a = n(3070);
					t.exports = function (t, e) {
						for (var n = r(e), s = a.f, u = i.f, c = 0; c < n.length; c++) {
							var l = n[c];
							o(t, l) || s(t, l, u(e, l));
						}
					};
				},
				4964: function (t, e, n) {
					var o = n(5112)('match');
					t.exports = function (t) {
						var e = /./;
						try {
							'/./'[t](e);
						} catch (n) {
							try {
								return (e[o] = !1), '/./'[t](e);
							} catch (t) {}
						}
						return !1;
					};
				},
				8544: function (t, e, n) {
					var o = n(7293);
					t.exports = !o(function () {
						function t() {}
						return (
							(t.prototype.constructor = null),
							Object.getPrototypeOf(new t()) !== t.prototype
						);
					});
				},
				4994: function (t, e, n) {
					'use strict';
					var o = n(3383).IteratorPrototype,
						r = n(30),
						i = n(9114),
						a = n(8003),
						s = n(7497),
						u = function () {
							return this;
						};
					t.exports = function (t, e, n) {
						var c = e + ' Iterator';
						return (
							(t.prototype = r(o, { next: i(1, n) })),
							a(t, c, !1, !0),
							(s[c] = u),
							t
						);
					};
				},
				8880: function (t, e, n) {
					var o = n(9781),
						r = n(3070),
						i = n(9114);
					t.exports = o
						? function (t, e, n) {
								return r.f(t, e, i(1, n));
						  }
						: function (t, e, n) {
								return (t[e] = n), t;
						  };
				},
				9114: function (t) {
					t.exports = function (t, e) {
						return {
							enumerable: !(1 & t),
							configurable: !(2 & t),
							writable: !(4 & t),
							value: e,
						};
					};
				},
				6135: function (t, e, n) {
					'use strict';
					var o = n(7593),
						r = n(3070),
						i = n(9114);
					t.exports = function (t, e, n) {
						var a = o(e);
						a in t ? r.f(t, a, i(0, n)) : (t[a] = n);
					};
				},
				654: function (t, e, n) {
					'use strict';
					var o = n(2109),
						r = n(4994),
						i = n(9518),
						a = n(7674),
						s = n(8003),
						u = n(8880),
						c = n(1320),
						l = n(5112),
						f = n(1913),
						d = n(7497),
						p = n(3383),
						h = p.IteratorPrototype,
						v = p.BUGGY_SAFARI_ITERATORS,
						g = l('iterator'),
						y = 'keys',
						m = 'values',
						b = 'entries',
						x = function () {
							return this;
						};
					t.exports = function (t, e, n, l, p, w, E) {
						r(n, e, l);
						var O,
							S,
							k,
							I = function (t) {
								if (t === p && T) return T;
								if (!v && t in A) return A[t];
								switch (t) {
									case y:
									case m:
									case b:
										return function () {
											return new n(this, t);
										};
								}
								return function () {
									return new n(this);
								};
							},
							P = e + ' Iterator',
							C = !1,
							A = t.prototype,
							M = A[g] || A['@@iterator'] || (p && A[p]),
							T = (!v && M) || I(p),
							D = ('Array' == e && A.entries) || M;
						if (
							(D &&
								((O = i(D.call(new t()))),
								h !== Object.prototype &&
									O.next &&
									(f ||
										i(O) === h ||
										(a ? a(O, h) : 'function' != typeof O[g] && u(O, g, x)),
									s(O, P, !0, !0),
									f && (d[P] = x))),
							p == m &&
								M &&
								M.name !== m &&
								((C = !0),
								(T = function () {
									return M.call(this);
								})),
							(f && !E) || A[g] === T || u(A, g, T),
							(d[e] = T),
							p)
						)
							if (
								((S = { values: I(m), keys: w ? T : I(y), entries: I(b) }), E)
							)
								for (k in S) (v || C || !(k in A)) && c(A, k, S[k]);
							else o({ target: e, proto: !0, forced: v || C }, S);
						return S;
					};
				},
				7235: function (t, e, n) {
					var o = n(857),
						r = n(6656),
						i = n(6061),
						a = n(3070).f;
					t.exports = function (t) {
						var e = o.Symbol || (o.Symbol = {});
						r(e, t) || a(e, t, { value: i.f(t) });
					};
				},
				9781: function (t, e, n) {
					var o = n(7293);
					t.exports = !o(function () {
						return (
							7 !=
							Object.defineProperty({}, 1, {
								get: function () {
									return 7;
								},
							})[1]
						);
					});
				},
				317: function (t, e, n) {
					var o = n(7854),
						r = n(111),
						i = o.document,
						a = r(i) && r(i.createElement);
					t.exports = function (t) {
						return a ? i.createElement(t) : {};
					};
				},
				8324: function (t) {
					t.exports = {
						CSSRuleList: 0,
						CSSStyleDeclaration: 0,
						CSSValueList: 0,
						ClientRectList: 0,
						DOMRectList: 0,
						DOMStringList: 0,
						DOMTokenList: 1,
						DataTransferItemList: 0,
						FileList: 0,
						HTMLAllCollection: 0,
						HTMLCollection: 0,
						HTMLFormElement: 0,
						HTMLSelectElement: 0,
						MediaList: 0,
						MimeTypeArray: 0,
						NamedNodeMap: 0,
						NodeList: 1,
						PaintRequestList: 0,
						Plugin: 0,
						PluginArray: 0,
						SVGLengthList: 0,
						SVGNumberList: 0,
						SVGPathSegList: 0,
						SVGPointList: 0,
						SVGStringList: 0,
						SVGTransformList: 0,
						SourceBufferList: 0,
						StyleSheetList: 0,
						TextTrackCueList: 0,
						TextTrackList: 0,
						TouchList: 0,
					};
				},
				5268: function (t, e, n) {
					var o = n(4326),
						r = n(7854);
					t.exports = 'process' == o(r.process);
				},
				8113: function (t, e, n) {
					var o = n(5005);
					t.exports = o('navigator', 'userAgent') || '';
				},
				7392: function (t, e, n) {
					var o,
						r,
						i = n(7854),
						a = n(8113),
						s = i.process,
						u = s && s.versions,
						c = u && u.v8;
					c
						? (r = (o = c.split('.'))[0] + o[1])
						: a &&
						  (!(o = a.match(/Edge\/(\d+)/)) || o[1] >= 74) &&
						  (o = a.match(/Chrome\/(\d+)/)) &&
						  (r = o[1]),
						(t.exports = r && +r);
				},
				748: function (t) {
					t.exports = [
						'constructor',
						'hasOwnProperty',
						'isPrototypeOf',
						'propertyIsEnumerable',
						'toLocaleString',
						'toString',
						'valueOf',
					];
				},
				2109: function (t, e, n) {
					var o = n(7854),
						r = n(1236).f,
						i = n(8880),
						a = n(1320),
						s = n(3505),
						u = n(9920),
						c = n(4705);
					t.exports = function (t, e) {
						var n,
							l,
							f,
							d,
							p,
							h = t.target,
							v = t.global,
							g = t.stat;
						if ((n = v ? o : g ? o[h] || s(h, {}) : (o[h] || {}).prototype))
							for (l in e) {
								if (
									((d = e[l]),
									(f = t.noTargetGet ? (p = r(n, l)) && p.value : n[l]),
									!c(v ? l : h + (g ? '.' : '#') + l, t.forced) && void 0 !== f)
								) {
									if (typeof d == typeof f) continue;
									u(d, f);
								}
								(t.sham || (f && f.sham)) && i(d, 'sham', !0), a(n, l, d, t);
							}
					};
				},
				7293: function (t) {
					t.exports = function (t) {
						try {
							return !!t();
						} catch (t) {
							return !0;
						}
					};
				},
				7007: function (t, e, n) {
					'use strict';
					n(4916);
					var o = n(1320),
						r = n(7293),
						i = n(5112),
						a = n(2261),
						s = n(8880),
						u = i('species'),
						c = !r(function () {
							var t = /./;
							return (
								(t.exec = function () {
									var t = [];
									return (t.groups = { a: '7' }), t;
								}),
								'7' !== ''.replace(t, '$<a>')
							);
						}),
						l = '$0' === 'a'.replace(/./, '$0'),
						f = i('replace'),
						d = !!/./[f] && '' === /./[f]('a', '$0'),
						p = !r(function () {
							var t = /(?:)/,
								e = t.exec;
							t.exec = function () {
								return e.apply(this, arguments);
							};
							var n = 'ab'.split(t);
							return 2 !== n.length || 'a' !== n[0] || 'b' !== n[1];
						});
					t.exports = function (t, e, n, f) {
						var h = i(t),
							v = !r(function () {
								var e = {};
								return (
									(e[h] = function () {
										return 7;
									}),
									7 != ''[t](e)
								);
							}),
							g =
								v &&
								!r(function () {
									var e = !1,
										n = /a/;
									return (
										'split' === t &&
											(((n = {}).constructor = {}),
											(n.constructor[u] = function () {
												return n;
											}),
											(n.flags = ''),
											(n[h] = /./[h])),
										(n.exec = function () {
											return (e = !0), null;
										}),
										n[h](''),
										!e
									);
								});
						if (
							!v ||
							!g ||
							('replace' === t && (!c || !l || d)) ||
							('split' === t && !p)
						) {
							var y = /./[h],
								m = n(
									h,
									''[t],
									function (t, e, n, o, r) {
										return e.exec === a
											? v && !r
												? { done: !0, value: y.call(e, n, o) }
												: { done: !0, value: t.call(n, e, o) }
											: { done: !1 };
									},
									{
										REPLACE_KEEPS_$0: l,
										REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: d,
									},
								),
								b = m[0],
								x = m[1];
							o(String.prototype, t, b),
								o(
									RegExp.prototype,
									h,
									2 == e
										? function (t, e) {
												return x.call(t, this, e);
										  }
										: function (t) {
												return x.call(t, this);
										  },
								);
						}
						f && s(RegExp.prototype[h], 'sham', !0);
					};
				},
				9974: function (t, e, n) {
					var o = n(3099);
					t.exports = function (t, e, n) {
						if ((o(t), void 0 === e)) return t;
						switch (n) {
							case 0:
								return function () {
									return t.call(e);
								};
							case 1:
								return function (n) {
									return t.call(e, n);
								};
							case 2:
								return function (n, o) {
									return t.call(e, n, o);
								};
							case 3:
								return function (n, o, r) {
									return t.call(e, n, o, r);
								};
						}
						return function () {
							return t.apply(e, arguments);
						};
					};
				},
				5005: function (t, e, n) {
					var o = n(857),
						r = n(7854),
						i = function (t) {
							return 'function' == typeof t ? t : void 0;
						};
					t.exports = function (t, e) {
						return arguments.length < 2
							? i(o[t]) || i(r[t])
							: (o[t] && o[t][e]) || (r[t] && r[t][e]);
					};
				},
				1246: function (t, e, n) {
					var o = n(648),
						r = n(7497),
						i = n(5112)('iterator');
					t.exports = function (t) {
						if (null != t) return t[i] || t['@@iterator'] || r[o(t)];
					};
				},
				647: function (t, e, n) {
					var o = n(7908),
						r = Math.floor,
						i = ''.replace,
						a = /\$([$&'`]|\d{1,2}|<[^>]*>)/g,
						s = /\$([$&'`]|\d{1,2})/g;
					t.exports = function (t, e, n, u, c, l) {
						var f = n + t.length,
							d = u.length,
							p = s;
						return (
							void 0 !== c && ((c = o(c)), (p = a)),
							i.call(l, p, function (o, i) {
								var a;
								switch (i.charAt(0)) {
									case '$':
										return '$';
									case '&':
										return t;
									case '`':
										return e.slice(0, n);
									case "'":
										return e.slice(f);
									case '<':
										a = c[i.slice(1, -1)];
										break;
									default:
										var s = +i;
										if (0 === s) return o;
										if (s > d) {
											var l = r(s / 10);
											return 0 === l
												? o
												: l <= d
												? void 0 === u[l - 1]
													? i.charAt(1)
													: u[l - 1] + i.charAt(1)
												: o;
										}
										a = u[s - 1];
								}
								return void 0 === a ? '' : a;
							})
						);
					};
				},
				7854: function (t, e, n) {
					var o = function (t) {
						return t && t.Math == Math && t;
					};
					t.exports =
						o('object' == typeof globalThis && globalThis) ||
						o('object' == typeof window && window) ||
						o('object' == typeof self && self) ||
						o('object' == typeof n.g && n.g) ||
						(function () {
							return this;
						})() ||
						Function('return this')();
				},
				6656: function (t) {
					var e = {}.hasOwnProperty;
					t.exports = function (t, n) {
						return e.call(t, n);
					};
				},
				3501: function (t) {
					t.exports = {};
				},
				490: function (t, e, n) {
					var o = n(5005);
					t.exports = o('document', 'documentElement');
				},
				4664: function (t, e, n) {
					var o = n(9781),
						r = n(7293),
						i = n(317);
					t.exports =
						!o &&
						!r(function () {
							return (
								7 !=
								Object.defineProperty(i('div'), 'a', {
									get: function () {
										return 7;
									},
								}).a
							);
						});
				},
				8361: function (t, e, n) {
					var o = n(7293),
						r = n(4326),
						i = ''.split;
					t.exports = o(function () {
						return !Object('z').propertyIsEnumerable(0);
					})
						? function (t) {
								return 'String' == r(t) ? i.call(t, '') : Object(t);
						  }
						: Object;
				},
				9587: function (t, e, n) {
					var o = n(111),
						r = n(7674);
					t.exports = function (t, e, n) {
						var i, a;
						return (
							r &&
								'function' == typeof (i = e.constructor) &&
								i !== n &&
								o((a = i.prototype)) &&
								a !== n.prototype &&
								r(t, a),
							t
						);
					};
				},
				2788: function (t, e, n) {
					var o = n(5465),
						r = Function.toString;
					'function' != typeof o.inspectSource &&
						(o.inspectSource = function (t) {
							return r.call(t);
						}),
						(t.exports = o.inspectSource);
				},
				9909: function (t, e, n) {
					var o,
						r,
						i,
						a = n(8536),
						s = n(7854),
						u = n(111),
						c = n(8880),
						l = n(6656),
						f = n(5465),
						d = n(6200),
						p = n(3501),
						h = s.WeakMap;
					if (a) {
						var v = f.state || (f.state = new h()),
							g = v.get,
							y = v.has,
							m = v.set;
						(o = function (t, e) {
							return (e.facade = t), m.call(v, t, e), e;
						}),
							(r = function (t) {
								return g.call(v, t) || {};
							}),
							(i = function (t) {
								return y.call(v, t);
							});
					} else {
						var b = d('state');
						(p[b] = !0),
							(o = function (t, e) {
								return (e.facade = t), c(t, b, e), e;
							}),
							(r = function (t) {
								return l(t, b) ? t[b] : {};
							}),
							(i = function (t) {
								return l(t, b);
							});
					}
					t.exports = {
						set: o,
						get: r,
						has: i,
						enforce: function (t) {
							return i(t) ? r(t) : o(t, {});
						},
						getterFor: function (t) {
							return function (e) {
								var n;
								if (!u(e) || (n = r(e)).type !== t)
									throw TypeError('Incompatible receiver, ' + t + ' required');
								return n;
							};
						},
					};
				},
				7659: function (t, e, n) {
					var o = n(5112),
						r = n(7497),
						i = o('iterator'),
						a = Array.prototype;
					t.exports = function (t) {
						return void 0 !== t && (r.Array === t || a[i] === t);
					};
				},
				3157: function (t, e, n) {
					var o = n(4326);
					t.exports =
						Array.isArray ||
						function (t) {
							return 'Array' == o(t);
						};
				},
				4705: function (t, e, n) {
					var o = n(7293),
						r = /#|\.prototype\./,
						i = function (t, e) {
							var n = s[a(t)];
							return (
								n == c || (n != u && ('function' == typeof e ? o(e) : !!e))
							);
						},
						a = (i.normalize = function (t) {
							return String(t).replace(r, '.').toLowerCase();
						}),
						s = (i.data = {}),
						u = (i.NATIVE = 'N'),
						c = (i.POLYFILL = 'P');
					t.exports = i;
				},
				8730: function (t, e, n) {
					var o = n(111),
						r = Math.floor;
					t.exports = function (t) {
						return !o(t) && isFinite(t) && r(t) === t;
					};
				},
				111: function (t) {
					t.exports = function (t) {
						return 'object' == typeof t ? null !== t : 'function' == typeof t;
					};
				},
				1913: function (t) {
					t.exports = !1;
				},
				7850: function (t, e, n) {
					var o = n(111),
						r = n(4326),
						i = n(5112)('match');
					t.exports = function (t) {
						var e;
						return o(t) && (void 0 !== (e = t[i]) ? !!e : 'RegExp' == r(t));
					};
				},
				9212: function (t, e, n) {
					var o = n(9670);
					t.exports = function (t) {
						var e = t.return;
						if (void 0 !== e) return o(e.call(t)).value;
					};
				},
				3383: function (t, e, n) {
					'use strict';
					var o,
						r,
						i,
						a = n(7293),
						s = n(9518),
						u = n(8880),
						c = n(6656),
						l = n(5112),
						f = n(1913),
						d = l('iterator'),
						p = !1;
					[].keys &&
						('next' in (i = [].keys())
							? (r = s(s(i))) !== Object.prototype && (o = r)
							: (p = !0));
					var h =
						null == o ||
						a(function () {
							var t = {};
							return o[d].call(t) !== t;
						});
					h && (o = {}),
						(f && !h) ||
							c(o, d) ||
							u(o, d, function () {
								return this;
							}),
						(t.exports = { IteratorPrototype: o, BUGGY_SAFARI_ITERATORS: p });
				},
				7497: function (t) {
					t.exports = {};
				},
				133: function (t, e, n) {
					var o = n(5268),
						r = n(7392),
						i = n(7293);
					t.exports =
						!!Object.getOwnPropertySymbols &&
						!i(function () {
							return !Symbol.sham && (o ? 38 === r : r > 37 && r < 41);
						});
				},
				8536: function (t, e, n) {
					var o = n(7854),
						r = n(2788),
						i = o.WeakMap;
					t.exports = 'function' == typeof i && /native code/.test(r(i));
				},
				3929: function (t, e, n) {
					var o = n(7850);
					t.exports = function (t) {
						if (o(t))
							throw TypeError("The method doesn't accept regular expressions");
						return t;
					};
				},
				1574: function (t, e, n) {
					'use strict';
					var o = n(9781),
						r = n(7293),
						i = n(1956),
						a = n(5181),
						s = n(5296),
						u = n(7908),
						c = n(8361),
						l = Object.assign,
						f = Object.defineProperty;
					t.exports =
						!l ||
						r(function () {
							if (
								o &&
								1 !==
									l(
										{ b: 1 },
										l(
											f({}, 'a', {
												enumerable: !0,
												get: function () {
													f(this, 'b', { value: 3, enumerable: !1 });
												},
											}),
											{ b: 2 },
										),
									).b
							)
								return !0;
							var t = {},
								e = {},
								n = Symbol(),
								r = 'abcdefghijklmnopqrst';
							return (
								(t[n] = 7),
								r.split('').forEach(function (t) {
									e[t] = t;
								}),
								7 != l({}, t)[n] || i(l({}, e)).join('') != r
							);
						})
							? function (t, e) {
									for (
										var n = u(t), r = arguments.length, l = 1, f = a.f, d = s.f;
										r > l;

									)
										for (
											var p,
												h = c(arguments[l++]),
												v = f ? i(h).concat(f(h)) : i(h),
												g = v.length,
												y = 0;
											g > y;

										)
											(p = v[y++]), (o && !d.call(h, p)) || (n[p] = h[p]);
									return n;
							  }
							: l;
				},
				30: function (t, e, n) {
					var o,
						r = n(9670),
						i = n(6048),
						a = n(748),
						s = n(3501),
						u = n(490),
						c = n(317),
						l = n(6200),
						f = l('IE_PROTO'),
						d = function () {},
						p = function (t) {
							return '<script>' + t + '</' + 'script>';
						},
						h = function () {
							try {
								o = document.domain && new ActiveXObject('htmlfile');
							} catch (t) {}
							var t, e;
							h = o
								? (function (t) {
										t.write(p('')), t.close();
										var e = t.parentWindow.Object;
										return (t = null), e;
								  })(o)
								: (((e = c('iframe')).style.display = 'none'),
								  u.appendChild(e),
								  (e.src = String('javascript:')),
								  (t = e.contentWindow.document).open(),
								  t.write(p('document.F=Object')),
								  t.close(),
								  t.F);
							for (var n = a.length; n--; ) delete h.prototype[a[n]];
							return h();
						};
					(s[f] = !0),
						(t.exports =
							Object.create ||
							function (t, e) {
								var n;
								return (
									null !== t
										? ((d.prototype = r(t)),
										  (n = new d()),
										  (d.prototype = null),
										  (n[f] = t))
										: (n = h()),
									void 0 === e ? n : i(n, e)
								);
							});
				},
				6048: function (t, e, n) {
					var o = n(9781),
						r = n(3070),
						i = n(9670),
						a = n(1956);
					t.exports = o
						? Object.defineProperties
						: function (t, e) {
								i(t);
								for (var n, o = a(e), s = o.length, u = 0; s > u; )
									r.f(t, (n = o[u++]), e[n]);
								return t;
						  };
				},
				3070: function (t, e, n) {
					var o = n(9781),
						r = n(4664),
						i = n(9670),
						a = n(7593),
						s = Object.defineProperty;
					e.f = o
						? s
						: function (t, e, n) {
								if ((i(t), (e = a(e, !0)), i(n), r))
									try {
										return s(t, e, n);
									} catch (t) {}
								if ('get' in n || 'set' in n)
									throw TypeError('Accessors not supported');
								return 'value' in n && (t[e] = n.value), t;
						  };
				},
				1236: function (t, e, n) {
					var o = n(9781),
						r = n(5296),
						i = n(9114),
						a = n(5656),
						s = n(7593),
						u = n(6656),
						c = n(4664),
						l = Object.getOwnPropertyDescriptor;
					e.f = o
						? l
						: function (t, e) {
								if (((t = a(t)), (e = s(e, !0)), c))
									try {
										return l(t, e);
									} catch (t) {}
								if (u(t, e)) return i(!r.f.call(t, e), t[e]);
						  };
				},
				1156: function (t, e, n) {
					var o = n(5656),
						r = n(8006).f,
						i = {}.toString,
						a =
							'object' == typeof window && window && Object.getOwnPropertyNames
								? Object.getOwnPropertyNames(window)
								: [];
					t.exports.f = function (t) {
						return a && '[object Window]' == i.call(t)
							? (function (t) {
									try {
										return r(t);
									} catch (t) {
										return a.slice();
									}
							  })(t)
							: r(o(t));
					};
				},
				8006: function (t, e, n) {
					var o = n(6324),
						r = n(748).concat('length', 'prototype');
					e.f =
						Object.getOwnPropertyNames ||
						function (t) {
							return o(t, r);
						};
				},
				5181: function (t, e) {
					e.f = Object.getOwnPropertySymbols;
				},
				9518: function (t, e, n) {
					var o = n(6656),
						r = n(7908),
						i = n(6200),
						a = n(8544),
						s = i('IE_PROTO'),
						u = Object.prototype;
					t.exports = a
						? Object.getPrototypeOf
						: function (t) {
								return (
									(t = r(t)),
									o(t, s)
										? t[s]
										: 'function' == typeof t.constructor &&
										  t instanceof t.constructor
										? t.constructor.prototype
										: t instanceof Object
										? u
										: null
								);
						  };
				},
				6324: function (t, e, n) {
					var o = n(6656),
						r = n(5656),
						i = n(1318).indexOf,
						a = n(3501);
					t.exports = function (t, e) {
						var n,
							s = r(t),
							u = 0,
							c = [];
						for (n in s) !o(a, n) && o(s, n) && c.push(n);
						for (; e.length > u; )
							o(s, (n = e[u++])) && (~i(c, n) || c.push(n));
						return c;
					};
				},
				1956: function (t, e, n) {
					var o = n(6324),
						r = n(748);
					t.exports =
						Object.keys ||
						function (t) {
							return o(t, r);
						};
				},
				5296: function (t, e) {
					'use strict';
					var n = {}.propertyIsEnumerable,
						o = Object.getOwnPropertyDescriptor,
						r = o && !n.call({ 1: 2 }, 1);
					e.f = r
						? function (t) {
								var e = o(this, t);
								return !!e && e.enumerable;
						  }
						: n;
				},
				9026: function (t, e, n) {
					'use strict';
					var o = n(1913),
						r = n(7854),
						i = n(7293);
					t.exports =
						o ||
						!i(function () {
							var t = Math.random();
							__defineSetter__.call(null, t, function () {}), delete r[t];
						});
				},
				7674: function (t, e, n) {
					var o = n(9670),
						r = n(6077);
					t.exports =
						Object.setPrototypeOf ||
						('__proto__' in {}
							? (function () {
									var t,
										e = !1,
										n = {};
									try {
										(t = Object.getOwnPropertyDescriptor(
											Object.prototype,
											'__proto__',
										).set).call(n, []),
											(e = n instanceof Array);
									} catch (t) {}
									return function (n, i) {
										return o(n), r(i), e ? t.call(n, i) : (n.__proto__ = i), n;
									};
							  })()
							: void 0);
				},
				288: function (t, e, n) {
					'use strict';
					var o = n(1694),
						r = n(648);
					t.exports = o
						? {}.toString
						: function () {
								return '[object ' + r(this) + ']';
						  };
				},
				3887: function (t, e, n) {
					var o = n(5005),
						r = n(8006),
						i = n(5181),
						a = n(9670);
					t.exports =
						o('Reflect', 'ownKeys') ||
						function (t) {
							var e = r.f(a(t)),
								n = i.f;
							return n ? e.concat(n(t)) : e;
						};
				},
				857: function (t, e, n) {
					var o = n(7854);
					t.exports = o;
				},
				1320: function (t, e, n) {
					var o = n(7854),
						r = n(8880),
						i = n(6656),
						a = n(3505),
						s = n(2788),
						u = n(9909),
						c = u.get,
						l = u.enforce,
						f = String(String).split('String');
					(t.exports = function (t, e, n, s) {
						var u,
							c = !!s && !!s.unsafe,
							d = !!s && !!s.enumerable,
							p = !!s && !!s.noTargetGet;
						'function' == typeof n &&
							('string' != typeof e || i(n, 'name') || r(n, 'name', e),
							(u = l(n)).source ||
								(u.source = f.join('string' == typeof e ? e : ''))),
							t !== o
								? (c ? !p && t[e] && (d = !0) : delete t[e],
								  d ? (t[e] = n) : r(t, e, n))
								: d
								? (t[e] = n)
								: a(e, n);
					})(Function.prototype, 'toString', function () {
						return ('function' == typeof this && c(this).source) || s(this);
					});
				},
				7651: function (t, e, n) {
					var o = n(4326),
						r = n(2261);
					t.exports = function (t, e) {
						var n = t.exec;
						if ('function' == typeof n) {
							var i = n.call(t, e);
							if ('object' != typeof i)
								throw TypeError(
									'RegExp exec method returned something other than an Object or null',
								);
							return i;
						}
						if ('RegExp' !== o(t))
							throw TypeError('RegExp#exec called on incompatible receiver');
						return r.call(t, e);
					};
				},
				2261: function (t, e, n) {
					'use strict';
					var o,
						r,
						i = n(7066),
						a = n(2999),
						s = n(2309),
						u = RegExp.prototype.exec,
						c = s('native-string-replace', String.prototype.replace),
						l = u,
						f =
							((o = /a/),
							(r = /b*/g),
							u.call(o, 'a'),
							u.call(r, 'a'),
							0 !== o.lastIndex || 0 !== r.lastIndex),
						d = a.UNSUPPORTED_Y || a.BROKEN_CARET,
						p = void 0 !== /()??/.exec('')[1];
					(f || p || d) &&
						(l = function (t) {
							var e,
								n,
								o,
								r,
								a = this,
								s = d && a.sticky,
								l = i.call(a),
								h = a.source,
								v = 0,
								g = t;
							return (
								s &&
									(-1 === (l = l.replace('y', '')).indexOf('g') && (l += 'g'),
									(g = String(t).slice(a.lastIndex)),
									a.lastIndex > 0 &&
										(!a.multiline ||
											(a.multiline && '\n' !== t[a.lastIndex - 1])) &&
										((h = '(?: ' + h + ')'), (g = ' ' + g), v++),
									(n = new RegExp('^(?:' + h + ')', l))),
								p && (n = new RegExp('^' + h + '$(?!\\s)', l)),
								f && (e = a.lastIndex),
								(o = u.call(s ? n : a, g)),
								s
									? o
										? ((o.input = o.input.slice(v)),
										  (o[0] = o[0].slice(v)),
										  (o.index = a.lastIndex),
										  (a.lastIndex += o[0].length))
										: (a.lastIndex = 0)
									: f &&
									  o &&
									  (a.lastIndex = a.global ? o.index + o[0].length : e),
								p &&
									o &&
									o.length > 1 &&
									c.call(o[0], n, function () {
										for (r = 1; r < arguments.length - 2; r++)
											void 0 === arguments[r] && (o[r] = void 0);
									}),
								o
							);
						}),
						(t.exports = l);
				},
				7066: function (t, e, n) {
					'use strict';
					var o = n(9670);
					t.exports = function () {
						var t = o(this),
							e = '';
						return (
							t.global && (e += 'g'),
							t.ignoreCase && (e += 'i'),
							t.multiline && (e += 'm'),
							t.dotAll && (e += 's'),
							t.unicode && (e += 'u'),
							t.sticky && (e += 'y'),
							e
						);
					};
				},
				2999: function (t, e, n) {
					'use strict';
					var o = n(7293);
					function r(t, e) {
						return RegExp(t, e);
					}
					(e.UNSUPPORTED_Y = o(function () {
						var t = r('a', 'y');
						return (t.lastIndex = 2), null != t.exec('abcd');
					})),
						(e.BROKEN_CARET = o(function () {
							var t = r('^r', 'gy');
							return (t.lastIndex = 2), null != t.exec('str');
						}));
				},
				4488: function (t) {
					t.exports = function (t) {
						if (null == t) throw TypeError("Can't call method on " + t);
						return t;
					};
				},
				3505: function (t, e, n) {
					var o = n(7854),
						r = n(8880);
					t.exports = function (t, e) {
						try {
							r(o, t, e);
						} catch (n) {
							o[t] = e;
						}
						return e;
					};
				},
				6340: function (t, e, n) {
					'use strict';
					var o = n(5005),
						r = n(3070),
						i = n(5112),
						a = n(9781),
						s = i('species');
					t.exports = function (t) {
						var e = o(t),
							n = r.f;
						a &&
							e &&
							!e[s] &&
							n(e, s, {
								configurable: !0,
								get: function () {
									return this;
								},
							});
					};
				},
				8003: function (t, e, n) {
					var o = n(3070).f,
						r = n(6656),
						i = n(5112)('toStringTag');
					t.exports = function (t, e, n) {
						t &&
							!r((t = n ? t : t.prototype), i) &&
							o(t, i, { configurable: !0, value: e });
					};
				},
				6200: function (t, e, n) {
					var o = n(2309),
						r = n(9711),
						i = o('keys');
					t.exports = function (t) {
						return i[t] || (i[t] = r(t));
					};
				},
				5465: function (t, e, n) {
					var o = n(7854),
						r = n(3505),
						i = '__core-js_shared__',
						a = o[i] || r(i, {});
					t.exports = a;
				},
				2309: function (t, e, n) {
					var o = n(1913),
						r = n(5465);
					(t.exports = function (t, e) {
						return r[t] || (r[t] = void 0 !== e ? e : {});
					})('versions', []).push({
						version: '3.10.0',
						mode: o ? 'pure' : 'global',
						copyright: '© 2021 Denis Pushkarev (zloirock.ru)',
					});
				},
				6707: function (t, e, n) {
					var o = n(9670),
						r = n(3099),
						i = n(5112)('species');
					t.exports = function (t, e) {
						var n,
							a = o(t).constructor;
						return void 0 === a || null == (n = o(a)[i]) ? e : r(n);
					};
				},
				8710: function (t, e, n) {
					var o = n(9958),
						r = n(4488),
						i = function (t) {
							return function (e, n) {
								var i,
									a,
									s = String(r(e)),
									u = o(n),
									c = s.length;
								return u < 0 || u >= c
									? t
										? ''
										: void 0
									: (i = s.charCodeAt(u)) < 55296 ||
									  i > 56319 ||
									  u + 1 === c ||
									  (a = s.charCodeAt(u + 1)) < 56320 ||
									  a > 57343
									? t
										? s.charAt(u)
										: i
									: t
									? s.slice(u, u + 2)
									: a - 56320 + ((i - 55296) << 10) + 65536;
							};
						};
					t.exports = { codeAt: i(!1), charAt: i(!0) };
				},
				6091: function (t, e, n) {
					var o = n(7293),
						r = n(1361);
					t.exports = function (t) {
						return o(function () {
							return !!r[t]() || '​᠎' != '​᠎'[t]() || r[t].name !== t;
						});
					};
				},
				3111: function (t, e, n) {
					var o = n(4488),
						r = '[' + n(1361) + ']',
						i = RegExp('^' + r + r + '*'),
						a = RegExp(r + r + '*$'),
						s = function (t) {
							return function (e) {
								var n = String(o(e));
								return (
									1 & t && (n = n.replace(i, '')),
									2 & t && (n = n.replace(a, '')),
									n
								);
							};
						};
					t.exports = { start: s(1), end: s(2), trim: s(3) };
				},
				1400: function (t, e, n) {
					var o = n(9958),
						r = Math.max,
						i = Math.min;
					t.exports = function (t, e) {
						var n = o(t);
						return n < 0 ? r(n + e, 0) : i(n, e);
					};
				},
				5656: function (t, e, n) {
					var o = n(8361),
						r = n(4488);
					t.exports = function (t) {
						return o(r(t));
					};
				},
				9958: function (t) {
					var e = Math.ceil,
						n = Math.floor;
					t.exports = function (t) {
						return isNaN((t = +t)) ? 0 : (t > 0 ? n : e)(t);
					};
				},
				7466: function (t, e, n) {
					var o = n(9958),
						r = Math.min;
					t.exports = function (t) {
						return t > 0 ? r(o(t), 9007199254740991) : 0;
					};
				},
				7908: function (t, e, n) {
					var o = n(4488);
					t.exports = function (t) {
						return Object(o(t));
					};
				},
				7593: function (t, e, n) {
					var o = n(111);
					t.exports = function (t, e) {
						if (!o(t)) return t;
						var n, r;
						if (
							e &&
							'function' == typeof (n = t.toString) &&
							!o((r = n.call(t)))
						)
							return r;
						if ('function' == typeof (n = t.valueOf) && !o((r = n.call(t))))
							return r;
						if (
							!e &&
							'function' == typeof (n = t.toString) &&
							!o((r = n.call(t)))
						)
							return r;
						throw TypeError("Can't convert object to primitive value");
					};
				},
				1694: function (t, e, n) {
					var o = {};
					(o[n(5112)('toStringTag')] = 'z'),
						(t.exports = '[object z]' === String(o));
				},
				9711: function (t) {
					var e = 0,
						n = Math.random();
					t.exports = function (t) {
						return (
							'Symbol(' +
							String(void 0 === t ? '' : t) +
							')_' +
							(++e + n).toString(36)
						);
					};
				},
				3307: function (t, e, n) {
					var o = n(133);
					t.exports = o && !Symbol.sham && 'symbol' == typeof Symbol.iterator;
				},
				6061: function (t, e, n) {
					var o = n(5112);
					e.f = o;
				},
				5112: function (t, e, n) {
					var o = n(7854),
						r = n(2309),
						i = n(6656),
						a = n(9711),
						s = n(133),
						u = n(3307),
						c = r('wks'),
						l = o.Symbol,
						f = u ? l : (l && l.withoutSetter) || a;
					t.exports = function (t) {
						return (
							(i(c, t) && (s || 'string' == typeof c[t])) ||
								(s && i(l, t) ? (c[t] = l[t]) : (c[t] = f('Symbol.' + t))),
							c[t]
						);
					};
				},
				1361: function (t) {
					t.exports = '\t\n\v\f\r                　\u2028\u2029\ufeff';
				},
				2222: function (t, e, n) {
					'use strict';
					var o = n(2109),
						r = n(7293),
						i = n(3157),
						a = n(111),
						s = n(7908),
						u = n(7466),
						c = n(6135),
						l = n(5417),
						f = n(1194),
						d = n(5112),
						p = n(7392),
						h = d('isConcatSpreadable'),
						v = 9007199254740991,
						g = 'Maximum allowed index exceeded',
						y =
							p >= 51 ||
							!r(function () {
								var t = [];
								return (t[h] = !1), t.concat()[0] !== t;
							}),
						m = f('concat'),
						b = function (t) {
							if (!a(t)) return !1;
							var e = t[h];
							return void 0 !== e ? !!e : i(t);
						};
					o(
						{ target: 'Array', proto: !0, forced: !y || !m },
						{
							concat: function (t) {
								var e,
									n,
									o,
									r,
									i,
									a = s(this),
									f = l(a, 0),
									d = 0;
								for (e = -1, o = arguments.length; e < o; e++)
									if (b((i = -1 === e ? a : arguments[e]))) {
										if (d + (r = u(i.length)) > v) throw TypeError(g);
										for (n = 0; n < r; n++, d++) n in i && c(f, d, i[n]);
									} else {
										if (d >= v) throw TypeError(g);
										c(f, d++, i);
									}
								return (f.length = d), f;
							},
						},
					);
				},
				7327: function (t, e, n) {
					'use strict';
					var o = n(2109),
						r = n(2092).filter;
					o(
						{ target: 'Array', proto: !0, forced: !n(1194)('filter') },
						{
							filter: function (t) {
								return r(this, t, arguments.length > 1 ? arguments[1] : void 0);
							},
						},
					);
				},
				1038: function (t, e, n) {
					var o = n(2109),
						r = n(8457);
					o(
						{
							target: 'Array',
							stat: !0,
							forced: !n(7072)(function (t) {
								Array.from(t);
							}),
						},
						{ from: r },
					);
				},
				6699: function (t, e, n) {
					'use strict';
					var o = n(2109),
						r = n(1318).includes,
						i = n(1223);
					o(
						{ target: 'Array', proto: !0 },
						{
							includes: function (t) {
								return r(this, t, arguments.length > 1 ? arguments[1] : void 0);
							},
						},
					),
						i('includes');
				},
				2772: function (t, e, n) {
					'use strict';
					var o = n(2109),
						r = n(1318).indexOf,
						i = n(9341),
						a = [].indexOf,
						s = !!a && 1 / [1].indexOf(1, -0) < 0,
						u = i('indexOf');
					o(
						{ target: 'Array', proto: !0, forced: s || !u },
						{
							indexOf: function (t) {
								return s
									? a.apply(this, arguments) || 0
									: r(this, t, arguments.length > 1 ? arguments[1] : void 0);
							},
						},
					);
				},
				6992: function (t, e, n) {
					'use strict';
					var o = n(5656),
						r = n(1223),
						i = n(7497),
						a = n(9909),
						s = n(654),
						u = 'Array Iterator',
						c = a.set,
						l = a.getterFor(u);
					(t.exports = s(
						Array,
						'Array',
						function (t, e) {
							c(this, { type: u, target: o(t), index: 0, kind: e });
						},
						function () {
							var t = l(this),
								e = t.target,
								n = t.kind,
								o = t.index++;
							return !e || o >= e.length
								? ((t.target = void 0), { value: void 0, done: !0 })
								: 'keys' == n
								? { value: o, done: !1 }
								: 'values' == n
								? { value: e[o], done: !1 }
								: { value: [o, e[o]], done: !1 };
						},
						'values',
					)),
						(i.Arguments = i.Array),
						r('keys'),
						r('values'),
						r('entries');
				},
				9600: function (t, e, n) {
					'use strict';
					var o = n(2109),
						r = n(8361),
						i = n(5656),
						a = n(9341),
						s = [].join,
						u = r != Object,
						c = a('join', ',');
					o(
						{ target: 'Array', proto: !0, forced: u || !c },
						{
							join: function (t) {
								return s.call(i(this), void 0 === t ? ',' : t);
							},
						},
					);
				},
				1249: function (t, e, n) {
					'use strict';
					var o = n(2109),
						r = n(2092).map;
					o(
						{ target: 'Array', proto: !0, forced: !n(1194)('map') },
						{
							map: function (t) {
								return r(this, t, arguments.length > 1 ? arguments[1] : void 0);
							},
						},
					);
				},
				5827: function (t, e, n) {
					'use strict';
					var o = n(2109),
						r = n(3671).left,
						i = n(9341),
						a = n(7392),
						s = n(5268);
					o(
						{
							target: 'Array',
							proto: !0,
							forced: !i('reduce') || (!s && a > 79 && a < 83),
						},
						{
							reduce: function (t) {
								return r(
									this,
									t,
									arguments.length,
									arguments.length > 1 ? arguments[1] : void 0,
								);
							},
						},
					);
				},
				7042: function (t, e, n) {
					'use strict';
					var o = n(2109),
						r = n(111),
						i = n(3157),
						a = n(1400),
						s = n(7466),
						u = n(5656),
						c = n(6135),
						l = n(5112),
						f = n(1194)('slice'),
						d = l('species'),
						p = [].slice,
						h = Math.max;
					o(
						{ target: 'Array', proto: !0, forced: !f },
						{
							slice: function (t, e) {
								var n,
									o,
									l,
									f = u(this),
									v = s(f.length),
									g = a(t, v),
									y = a(void 0 === e ? v : e, v);
								if (
									i(f) &&
									('function' != typeof (n = f.constructor) ||
									(n !== Array && !i(n.prototype))
										? r(n) && null === (n = n[d]) && (n = void 0)
										: (n = void 0),
									n === Array || void 0 === n)
								)
									return p.call(f, g, y);
								for (
									o = new (void 0 === n ? Array : n)(h(y - g, 0)), l = 0;
									g < y;
									g++, l++
								)
									g in f && c(o, l, f[g]);
								return (o.length = l), o;
							},
						},
					);
				},
				2707: function (t, e, n) {
					'use strict';
					var o = n(2109),
						r = n(3099),
						i = n(7908),
						a = n(7293),
						s = n(9341),
						u = [],
						c = u.sort,
						l = a(function () {
							u.sort(void 0);
						}),
						f = a(function () {
							u.sort(null);
						}),
						d = s('sort');
					o(
						{ target: 'Array', proto: !0, forced: l || !f || !d },
						{
							sort: function (t) {
								return void 0 === t ? c.call(i(this)) : c.call(i(this), r(t));
							},
						},
					);
				},
				561: function (t, e, n) {
					'use strict';
					var o = n(2109),
						r = n(1400),
						i = n(9958),
						a = n(7466),
						s = n(7908),
						u = n(5417),
						c = n(6135),
						l = n(1194)('splice'),
						f = Math.max,
						d = Math.min,
						p = 9007199254740991,
						h = 'Maximum allowed length exceeded';
					o(
						{ target: 'Array', proto: !0, forced: !l },
						{
							splice: function (t, e) {
								var n,
									o,
									l,
									v,
									g,
									y,
									m = s(this),
									b = a(m.length),
									x = r(t, b),
									w = arguments.length;
								if (
									(0 === w
										? (n = o = 0)
										: 1 === w
										? ((n = 0), (o = b - x))
										: ((n = w - 2), (o = d(f(i(e), 0), b - x))),
									b + n - o > p)
								)
									throw TypeError(h);
								for (l = u(m, o), v = 0; v < o; v++)
									(g = x + v) in m && c(l, v, m[g]);
								if (((l.length = o), n < o)) {
									for (v = x; v < b - o; v++)
										(y = v + n), (g = v + o) in m ? (m[y] = m[g]) : delete m[y];
									for (v = b; v > b - o + n; v--) delete m[v - 1];
								} else if (n > o)
									for (v = b - o; v > x; v--)
										(y = v + n - 1),
											(g = v + o - 1) in m ? (m[y] = m[g]) : delete m[y];
								for (v = 0; v < n; v++) m[v + x] = arguments[v + 2];
								return (m.length = b - o + n), l;
							},
						},
					);
				},
				8309: function (t, e, n) {
					var o = n(9781),
						r = n(3070).f,
						i = Function.prototype,
						a = i.toString,
						s = /^\s*function ([^ (]*)/,
						u = 'name';
					o &&
						!(u in i) &&
						r(i, u, {
							configurable: !0,
							get: function () {
								try {
									return a.call(this).match(s)[1];
								} catch (t) {
									return '';
								}
							},
						});
				},
				9653: function (t, e, n) {
					'use strict';
					var o = n(9781),
						r = n(7854),
						i = n(4705),
						a = n(1320),
						s = n(6656),
						u = n(4326),
						c = n(9587),
						l = n(7593),
						f = n(7293),
						d = n(30),
						p = n(8006).f,
						h = n(1236).f,
						v = n(3070).f,
						g = n(3111).trim,
						y = 'Number',
						m = r.Number,
						b = m.prototype,
						x = u(d(b)) == y,
						w = function (t) {
							var e,
								n,
								o,
								r,
								i,
								a,
								s,
								u,
								c = l(t, !1);
							if ('string' == typeof c && c.length > 2)
								if (43 === (e = (c = g(c)).charCodeAt(0)) || 45 === e) {
									if (88 === (n = c.charCodeAt(2)) || 120 === n) return NaN;
								} else if (48 === e) {
									switch (c.charCodeAt(1)) {
										case 66:
										case 98:
											(o = 2), (r = 49);
											break;
										case 79:
										case 111:
											(o = 8), (r = 55);
											break;
										default:
											return +c;
									}
									for (a = (i = c.slice(2)).length, s = 0; s < a; s++)
										if ((u = i.charCodeAt(s)) < 48 || u > r) return NaN;
									return parseInt(i, o);
								}
							return +c;
						};
					if (i(y, !m(' 0o1') || !m('0b1') || m('+0x1'))) {
						for (
							var E,
								O = function (t) {
									var e = arguments.length < 1 ? 0 : t,
										n = this;
									return n instanceof O &&
										(x
											? f(function () {
													b.valueOf.call(n);
											  })
											: u(n) != y)
										? c(new m(w(e)), n, O)
										: w(e);
								},
								S = o
									? p(m)
									: 'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger,fromString,range'.split(
											',',
									  ),
								k = 0;
							S.length > k;
							k++
						)
							s(m, (E = S[k])) && !s(O, E) && v(O, E, h(m, E));
						(O.prototype = b), (b.constructor = O), a(r, y, O);
					}
				},
				3161: function (t, e, n) {
					n(2109)({ target: 'Number', stat: !0 }, { isInteger: n(8730) });
				},
				9601: function (t, e, n) {
					var o = n(2109),
						r = n(1574);
					o(
						{ target: 'Object', stat: !0, forced: Object.assign !== r },
						{ assign: r },
					);
				},
				9595: function (t, e, n) {
					'use strict';
					var o = n(2109),
						r = n(9781),
						i = n(9026),
						a = n(7908),
						s = n(3099),
						u = n(3070);
					r &&
						o(
							{ target: 'Object', proto: !0, forced: i },
							{
								__defineGetter__: function (t, e) {
									u.f(a(this), t, {
										get: s(e),
										enumerable: !0,
										configurable: !0,
									});
								},
							},
						);
				},
				5003: function (t, e, n) {
					var o = n(2109),
						r = n(7293),
						i = n(5656),
						a = n(1236).f,
						s = n(9781),
						u = r(function () {
							a(1);
						});
					o(
						{ target: 'Object', stat: !0, forced: !s || u, sham: !s },
						{
							getOwnPropertyDescriptor: function (t, e) {
								return a(i(t), e);
							},
						},
					);
				},
				9337: function (t, e, n) {
					var o = n(2109),
						r = n(9781),
						i = n(3887),
						a = n(5656),
						s = n(1236),
						u = n(6135);
					o(
						{ target: 'Object', stat: !0, sham: !r },
						{
							getOwnPropertyDescriptors: function (t) {
								for (
									var e, n, o = a(t), r = s.f, c = i(o), l = {}, f = 0;
									c.length > f;

								)
									void 0 !== (n = r(o, (e = c[f++]))) && u(l, e, n);
								return l;
							},
						},
					);
				},
				6210: function (t, e, n) {
					var o = n(2109),
						r = n(7293),
						i = n(1156).f;
					o(
						{
							target: 'Object',
							stat: !0,
							forced: r(function () {
								return !Object.getOwnPropertyNames(1);
							}),
						},
						{ getOwnPropertyNames: i },
					);
				},
				7941: function (t, e, n) {
					var o = n(2109),
						r = n(7908),
						i = n(1956);
					o(
						{
							target: 'Object',
							stat: !0,
							forced: n(7293)(function () {
								i(1);
							}),
						},
						{
							keys: function (t) {
								return i(r(t));
							},
						},
					);
				},
				1539: function (t, e, n) {
					var o = n(1694),
						r = n(1320),
						i = n(288);
					o || r(Object.prototype, 'toString', i, { unsafe: !0 });
				},
				4603: function (t, e, n) {
					var o = n(9781),
						r = n(7854),
						i = n(4705),
						a = n(9587),
						s = n(3070).f,
						u = n(8006).f,
						c = n(7850),
						l = n(7066),
						f = n(2999),
						d = n(1320),
						p = n(7293),
						h = n(9909).set,
						v = n(6340),
						g = n(5112)('match'),
						y = r.RegExp,
						m = y.prototype,
						b = /a/g,
						x = /a/g,
						w = new y(b) !== b,
						E = f.UNSUPPORTED_Y;
					if (
						o &&
						i(
							'RegExp',
							!w ||
								E ||
								p(function () {
									return (
										(x[g] = !1), y(b) != b || y(x) == x || '/a/i' != y(b, 'i')
									);
								}),
						)
					) {
						for (
							var O = function (t, e) {
									var n,
										o = this instanceof O,
										r = c(t),
										i = void 0 === e;
									if (!o && r && t.constructor === O && i) return t;
									w
										? r && !i && (t = t.source)
										: t instanceof O && (i && (e = l.call(t)), (t = t.source)),
										E &&
											(n = !!e && e.indexOf('y') > -1) &&
											(e = e.replace(/y/g, ''));
									var s = a(w ? new y(t, e) : y(t, e), o ? this : m, O);
									return E && n && h(s, { sticky: n }), s;
								},
								S = function (t) {
									(t in O) ||
										s(O, t, {
											configurable: !0,
											get: function () {
												return y[t];
											},
											set: function (e) {
												y[t] = e;
											},
										});
								},
								k = u(y),
								I = 0;
							k.length > I;

						)
							S(k[I++]);
						(m.constructor = O), (O.prototype = m), d(r, 'RegExp', O);
					}
					v('RegExp');
				},
				4916: function (t, e, n) {
					'use strict';
					var o = n(2109),
						r = n(2261);
					o(
						{ target: 'RegExp', proto: !0, forced: /./.exec !== r },
						{ exec: r },
					);
				},
				9714: function (t, e, n) {
					'use strict';
					var o = n(1320),
						r = n(9670),
						i = n(7293),
						a = n(7066),
						s = 'toString',
						u = RegExp.prototype,
						c = u.toString,
						l = i(function () {
							return '/a/b' != c.call({ source: 'a', flags: 'b' });
						}),
						f = c.name != s;
					(l || f) &&
						o(
							RegExp.prototype,
							s,
							function () {
								var t = r(this),
									e = String(t.source),
									n = t.flags;
								return (
									'/' +
									e +
									'/' +
									String(
										void 0 === n && t instanceof RegExp && !('flags' in u)
											? a.call(t)
											: n,
									)
								);
							},
							{ unsafe: !0 },
						);
				},
				2023: function (t, e, n) {
					'use strict';
					var o = n(2109),
						r = n(3929),
						i = n(4488);
					o(
						{ target: 'String', proto: !0, forced: !n(4964)('includes') },
						{
							includes: function (t) {
								return !!~String(i(this)).indexOf(
									r(t),
									arguments.length > 1 ? arguments[1] : void 0,
								);
							},
						},
					);
				},
				8783: function (t, e, n) {
					'use strict';
					var o = n(8710).charAt,
						r = n(9909),
						i = n(654),
						a = 'String Iterator',
						s = r.set,
						u = r.getterFor(a);
					i(
						String,
						'String',
						function (t) {
							s(this, { type: a, string: String(t), index: 0 });
						},
						function () {
							var t,
								e = u(this),
								n = e.string,
								r = e.index;
							return r >= n.length
								? { value: void 0, done: !0 }
								: ((t = o(n, r)),
								  (e.index += t.length),
								  { value: t, done: !1 });
						},
					);
				},
				4723: function (t, e, n) {
					'use strict';
					var o = n(7007),
						r = n(9670),
						i = n(7466),
						a = n(4488),
						s = n(1530),
						u = n(7651);
					o('match', 1, function (t, e, n) {
						return [
							function (e) {
								var n = a(this),
									o = null == e ? void 0 : e[t];
								return void 0 !== o
									? o.call(e, n)
									: new RegExp(e)[t](String(n));
							},
							function (t) {
								var o = n(e, t, this);
								if (o.done) return o.value;
								var a = r(t),
									c = String(this);
								if (!a.global) return u(a, c);
								var l = a.unicode;
								a.lastIndex = 0;
								for (var f, d = [], p = 0; null !== (f = u(a, c)); ) {
									var h = String(f[0]);
									(d[p] = h),
										'' === h && (a.lastIndex = s(c, i(a.lastIndex), l)),
										p++;
								}
								return 0 === p ? null : d;
							},
						];
					});
				},
				5306: function (t, e, n) {
					'use strict';
					var o = n(7007),
						r = n(9670),
						i = n(7466),
						a = n(9958),
						s = n(4488),
						u = n(1530),
						c = n(647),
						l = n(7651),
						f = Math.max,
						d = Math.min;
					o('replace', 2, function (t, e, n, o) {
						var p = o.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,
							h = o.REPLACE_KEEPS_$0,
							v = p ? '$' : '$0';
						return [
							function (n, o) {
								var r = s(this),
									i = null == n ? void 0 : n[t];
								return void 0 !== i ? i.call(n, r, o) : e.call(String(r), n, o);
							},
							function (t, o) {
								if (
									(!p && h) ||
									('string' == typeof o && -1 === o.indexOf(v))
								) {
									var s = n(e, t, this, o);
									if (s.done) return s.value;
								}
								var g = r(t),
									y = String(this),
									m = 'function' == typeof o;
								m || (o = String(o));
								var b = g.global;
								if (b) {
									var x = g.unicode;
									g.lastIndex = 0;
								}
								for (var w = []; ; ) {
									var E = l(g, y);
									if (null === E) break;
									if ((w.push(E), !b)) break;
									'' === String(E[0]) &&
										(g.lastIndex = u(y, i(g.lastIndex), x));
								}
								for (var O, S = '', k = 0, I = 0; I < w.length; I++) {
									E = w[I];
									for (
										var P = String(E[0]),
											C = f(d(a(E.index), y.length), 0),
											A = [],
											M = 1;
										M < E.length;
										M++
									)
										A.push(void 0 === (O = E[M]) ? O : String(O));
									var T = E.groups;
									if (m) {
										var D = [P].concat(A, C, y);
										void 0 !== T && D.push(T);
										var j = String(o.apply(void 0, D));
									} else j = c(P, y, C, A, T, o);
									C >= k && ((S += y.slice(k, C) + j), (k = C + P.length));
								}
								return S + y.slice(k);
							},
						];
					});
				},
				3123: function (t, e, n) {
					'use strict';
					var o = n(7007),
						r = n(7850),
						i = n(9670),
						a = n(4488),
						s = n(6707),
						u = n(1530),
						c = n(7466),
						l = n(7651),
						f = n(2261),
						d = n(7293),
						p = [].push,
						h = Math.min,
						v = 4294967295,
						g = !d(function () {
							return !RegExp(v, 'y');
						});
					o(
						'split',
						2,
						function (t, e, n) {
							var o;
							return (
								(o =
									'c' == 'abbc'.split(/(b)*/)[1] ||
									4 != 'test'.split(/(?:)/, -1).length ||
									2 != 'ab'.split(/(?:ab)*/).length ||
									4 != '.'.split(/(.?)(.?)/).length ||
									'.'.split(/()()/).length > 1 ||
									''.split(/.?/).length
										? function (t, n) {
												var o = String(a(this)),
													i = void 0 === n ? v : n >>> 0;
												if (0 === i) return [];
												if (void 0 === t) return [o];
												if (!r(t)) return e.call(o, t, i);
												for (
													var s,
														u,
														c,
														l = [],
														d =
															(t.ignoreCase ? 'i' : '') +
															(t.multiline ? 'm' : '') +
															(t.unicode ? 'u' : '') +
															(t.sticky ? 'y' : ''),
														h = 0,
														g = new RegExp(t.source, d + 'g');
													(s = f.call(g, o)) &&
													!(
														(u = g.lastIndex) > h &&
														(l.push(o.slice(h, s.index)),
														s.length > 1 &&
															s.index < o.length &&
															p.apply(l, s.slice(1)),
														(c = s[0].length),
														(h = u),
														l.length >= i)
													);

												)
													g.lastIndex === s.index && g.lastIndex++;
												return (
													h === o.length
														? (!c && g.test('')) || l.push('')
														: l.push(o.slice(h)),
													l.length > i ? l.slice(0, i) : l
												);
										  }
										: '0'.split(void 0, 0).length
										? function (t, n) {
												return void 0 === t && 0 === n
													? []
													: e.call(this, t, n);
										  }
										: e),
								[
									function (e, n) {
										var r = a(this),
											i = null == e ? void 0 : e[t];
										return void 0 !== i
											? i.call(e, r, n)
											: o.call(String(r), e, n);
									},
									function (t, r) {
										var a = n(o, t, this, r, o !== e);
										if (a.done) return a.value;
										var f = i(t),
											d = String(this),
											p = s(f, RegExp),
											y = f.unicode,
											m =
												(f.ignoreCase ? 'i' : '') +
												(f.multiline ? 'm' : '') +
												(f.unicode ? 'u' : '') +
												(g ? 'y' : 'g'),
											b = new p(g ? f : '^(?:' + f.source + ')', m),
											x = void 0 === r ? v : r >>> 0;
										if (0 === x) return [];
										if (0 === d.length) return null === l(b, d) ? [d] : [];
										for (var w = 0, E = 0, O = []; E < d.length; ) {
											b.lastIndex = g ? E : 0;
											var S,
												k = l(b, g ? d : d.slice(E));
											if (
												null === k ||
												(S = h(c(b.lastIndex + (g ? 0 : E)), d.length)) === w
											)
												E = u(d, E, y);
											else {
												if ((O.push(d.slice(w, E)), O.length === x)) return O;
												for (var I = 1; I <= k.length - 1; I++)
													if ((O.push(k[I]), O.length === x)) return O;
												E = w = S;
											}
										}
										return O.push(d.slice(w)), O;
									},
								]
							);
						},
						!g,
					);
				},
				3210: function (t, e, n) {
					'use strict';
					var o = n(2109),
						r = n(3111).trim;
					o(
						{ target: 'String', proto: !0, forced: n(6091)('trim') },
						{
							trim: function () {
								return r(this);
							},
						},
					);
				},
				1817: function (t, e, n) {
					'use strict';
					var o = n(2109),
						r = n(9781),
						i = n(7854),
						a = n(6656),
						s = n(111),
						u = n(3070).f,
						c = n(9920),
						l = i.Symbol;
					if (
						r &&
						'function' == typeof l &&
						(!('description' in l.prototype) || void 0 !== l().description)
					) {
						var f = {},
							d = function () {
								var t =
										arguments.length < 1 || void 0 === arguments[0]
											? void 0
											: String(arguments[0]),
									e = this instanceof d ? new l(t) : void 0 === t ? l() : l(t);
								return '' === t && (f[e] = !0), e;
							};
						c(d, l);
						var p = (d.prototype = l.prototype);
						p.constructor = d;
						var h = p.toString,
							v = 'Symbol(test)' == String(l('test')),
							g = /^Symbol\((.*)\)[^)]+$/;
						u(p, 'description', {
							configurable: !0,
							get: function () {
								var t = s(this) ? this.valueOf() : this,
									e = h.call(t);
								if (a(f, t)) return '';
								var n = v ? e.slice(7, -1) : e.replace(g, '$1');
								return '' === n ? void 0 : n;
							},
						}),
							o({ global: !0, forced: !0 }, { Symbol: d });
					}
				},
				2165: function (t, e, n) {
					n(7235)('iterator');
				},
				2526: function (t, e, n) {
					'use strict';
					var o = n(2109),
						r = n(7854),
						i = n(5005),
						a = n(1913),
						s = n(9781),
						u = n(133),
						c = n(3307),
						l = n(7293),
						f = n(6656),
						d = n(3157),
						p = n(111),
						h = n(9670),
						v = n(7908),
						g = n(5656),
						y = n(7593),
						m = n(9114),
						b = n(30),
						x = n(1956),
						w = n(8006),
						E = n(1156),
						O = n(5181),
						S = n(1236),
						k = n(3070),
						I = n(5296),
						P = n(8880),
						C = n(1320),
						A = n(2309),
						M = n(6200),
						T = n(3501),
						D = n(9711),
						j = n(5112),
						N = n(6061),
						L = n(7235),
						R = n(8003),
						B = n(9909),
						_ = n(2092).forEach,
						K = M('hidden'),
						U = 'Symbol',
						F = j('toPrimitive'),
						H = B.set,
						$ = B.getterFor(U),
						V = Object.prototype,
						G = r.Symbol,
						z = i('JSON', 'stringify'),
						Y = S.f,
						W = k.f,
						X = E.f,
						q = I.f,
						J = A('symbols'),
						Q = A('op-symbols'),
						Z = A('string-to-symbol-registry'),
						tt = A('symbol-to-string-registry'),
						et = A('wks'),
						nt = r.QObject,
						ot = !nt || !nt.prototype || !nt.prototype.findChild,
						rt =
							s &&
							l(function () {
								return (
									7 !=
									b(
										W({}, 'a', {
											get: function () {
												return W(this, 'a', { value: 7 }).a;
											},
										}),
									).a
								);
							})
								? function (t, e, n) {
										var o = Y(V, e);
										o && delete V[e], W(t, e, n), o && t !== V && W(V, e, o);
								  }
								: W,
						it = function (t, e) {
							var n = (J[t] = b(G.prototype));
							return (
								H(n, { type: U, tag: t, description: e }),
								s || (n.description = e),
								n
							);
						},
						at = c
							? function (t) {
									return 'symbol' == typeof t;
							  }
							: function (t) {
									return Object(t) instanceof G;
							  },
						st = function (t, e, n) {
							t === V && st(Q, e, n), h(t);
							var o = y(e, !0);
							return (
								h(n),
								f(J, o)
									? (n.enumerable
											? (f(t, K) && t[K][o] && (t[K][o] = !1),
											  (n = b(n, { enumerable: m(0, !1) })))
											: (f(t, K) || W(t, K, m(1, {})), (t[K][o] = !0)),
									  rt(t, o, n))
									: W(t, o, n)
							);
						},
						ut = function (t, e) {
							h(t);
							var n = g(e),
								o = x(n).concat(dt(n));
							return (
								_(o, function (e) {
									(s && !ct.call(n, e)) || st(t, e, n[e]);
								}),
								t
							);
						},
						ct = function (t) {
							var e = y(t, !0),
								n = q.call(this, e);
							return (
								!(this === V && f(J, e) && !f(Q, e)) &&
								(!(
									n ||
									!f(this, e) ||
									!f(J, e) ||
									(f(this, K) && this[K][e])
								) ||
									n)
							);
						},
						lt = function (t, e) {
							var n = g(t),
								o = y(e, !0);
							if (n !== V || !f(J, o) || f(Q, o)) {
								var r = Y(n, o);
								return (
									!r || !f(J, o) || (f(n, K) && n[K][o]) || (r.enumerable = !0),
									r
								);
							}
						},
						ft = function (t) {
							var e = X(g(t)),
								n = [];
							return (
								_(e, function (t) {
									f(J, t) || f(T, t) || n.push(t);
								}),
								n
							);
						},
						dt = function (t) {
							var e = t === V,
								n = X(e ? Q : g(t)),
								o = [];
							return (
								_(n, function (t) {
									!f(J, t) || (e && !f(V, t)) || o.push(J[t]);
								}),
								o
							);
						};
					(u ||
						(C(
							(G = function () {
								if (this instanceof G)
									throw TypeError('Symbol is not a constructor');
								var t =
										arguments.length && void 0 !== arguments[0]
											? String(arguments[0])
											: void 0,
									e = D(t),
									n = function (t) {
										this === V && n.call(Q, t),
											f(this, K) && f(this[K], e) && (this[K][e] = !1),
											rt(this, e, m(1, t));
									};
								return (
									s && ot && rt(V, e, { configurable: !0, set: n }), it(e, t)
								);
							}).prototype,
							'toString',
							function () {
								return $(this).tag;
							},
						),
						C(G, 'withoutSetter', function (t) {
							return it(D(t), t);
						}),
						(I.f = ct),
						(k.f = st),
						(S.f = lt),
						(w.f = E.f = ft),
						(O.f = dt),
						(N.f = function (t) {
							return it(j(t), t);
						}),
						s &&
							(W(G.prototype, 'description', {
								configurable: !0,
								get: function () {
									return $(this).description;
								},
							}),
							a || C(V, 'propertyIsEnumerable', ct, { unsafe: !0 }))),
					o({ global: !0, wrap: !0, forced: !u, sham: !u }, { Symbol: G }),
					_(x(et), function (t) {
						L(t);
					}),
					o(
						{ target: U, stat: !0, forced: !u },
						{
							for: function (t) {
								var e = String(t);
								if (f(Z, e)) return Z[e];
								var n = G(e);
								return (Z[e] = n), (tt[n] = e), n;
							},
							keyFor: function (t) {
								if (!at(t)) throw TypeError(t + ' is not a symbol');
								if (f(tt, t)) return tt[t];
							},
							useSetter: function () {
								ot = !0;
							},
							useSimple: function () {
								ot = !1;
							},
						},
					),
					o(
						{ target: 'Object', stat: !0, forced: !u, sham: !s },
						{
							create: function (t, e) {
								return void 0 === e ? b(t) : ut(b(t), e);
							},
							defineProperty: st,
							defineProperties: ut,
							getOwnPropertyDescriptor: lt,
						},
					),
					o(
						{ target: 'Object', stat: !0, forced: !u },
						{ getOwnPropertyNames: ft, getOwnPropertySymbols: dt },
					),
					o(
						{
							target: 'Object',
							stat: !0,
							forced: l(function () {
								O.f(1);
							}),
						},
						{
							getOwnPropertySymbols: function (t) {
								return O.f(v(t));
							},
						},
					),
					z) &&
						o(
							{
								target: 'JSON',
								stat: !0,
								forced:
									!u ||
									l(function () {
										var t = G();
										return (
											'[null]' != z([t]) ||
											'{}' != z({ a: t }) ||
											'{}' != z(Object(t))
										);
									}),
							},
							{
								stringify: function (t, e, n) {
									for (var o, r = [t], i = 1; arguments.length > i; )
										r.push(arguments[i++]);
									if (((o = e), (p(e) || void 0 !== t) && !at(t)))
										return (
											d(e) ||
												(e = function (t, e) {
													if (
														('function' == typeof o && (e = o.call(this, t, e)),
														!at(e))
													)
														return e;
												}),
											(r[1] = e),
											z.apply(null, r)
										);
								},
							},
						);
					G.prototype[F] || P(G.prototype, F, G.prototype.valueOf),
						R(G, U),
						(T[K] = !0);
				},
				4747: function (t, e, n) {
					var o = n(7854),
						r = n(8324),
						i = n(8533),
						a = n(8880);
					for (var s in r) {
						var u = o[s],
							c = u && u.prototype;
						if (c && c.forEach !== i)
							try {
								a(c, 'forEach', i);
							} catch (t) {
								c.forEach = i;
							}
					}
				},
				3948: function (t, e, n) {
					var o = n(7854),
						r = n(8324),
						i = n(6992),
						a = n(8880),
						s = n(5112),
						u = s('iterator'),
						c = s('toStringTag'),
						l = i.values;
					for (var f in r) {
						var d = o[f],
							p = d && d.prototype;
						if (p) {
							if (p[u] !== l)
								try {
									a(p, u, l);
								} catch (t) {
									p[u] = l;
								}
							if ((p[c] || a(p, c, f), r[f]))
								for (var h in i)
									if (p[h] !== i[h])
										try {
											a(p, h, i[h]);
										} catch (t) {
											p[h] = i[h];
										}
						}
					}
				},
			},
			e = {};
		function n(o) {
			var r = e[o];
			if (void 0 !== r) return r.exports;
			var i = (e[o] = { exports: {} });
			return t[o](i, i.exports, n), i.exports;
		}
		(n.d = function (t, e) {
			for (var o in e)
				n.o(e, o) &&
					!n.o(t, o) &&
					Object.defineProperty(t, o, { enumerable: !0, get: e[o] });
		}),
			(n.g = (function () {
				if ('object' == typeof globalThis) return globalThis;
				try {
					return this || new Function('return this')();
				} catch (t) {
					if ('object' == typeof window) return window;
				}
			})()),
			(n.o = function (t, e) {
				return Object.prototype.hasOwnProperty.call(t, e);
			}),
			(n.r = function (t) {
				'undefined' != typeof Symbol &&
					Symbol.toStringTag &&
					Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
					Object.defineProperty(t, '__esModule', { value: !0 });
			});
		var o = {};
		return (
			(function () {
				'use strict';
				n.r(o),
					n.d(o, {
						default: function () {
							return S;
						},
					});
				n(3210),
					n(5306),
					n(4916),
					n(2772),
					n(8309),
					n(3123),
					n(1539),
					n(9714),
					n(561),
					n(9600),
					n(9595),
					n(7042);
				'undefined' == typeof Element ||
					'remove' in Element.prototype ||
					(Element.prototype.remove = function () {
						this.parentNode && this.parentNode.removeChild(this);
					}),
					'undefined' != typeof self &&
						'document' in self &&
						((!('classList' in document.createElement('_')) ||
							(document.createElementNS &&
								!(
									'classList' in
									document.createElementNS('http://www.w3.org/2000/svg', 'g')
								))) &&
							(function (t) {
								if ('Element' in t) {
									var e = 'classList',
										n = t.Element.prototype,
										o = Object,
										r =
											String.prototype.trim ||
											function () {
												return this.replace(/^\s+|\s+$/g, '');
											},
										i =
											Array.prototype.indexOf ||
											function (t) {
												for (var e = 0, n = this.length; e < n; e++)
													if (e in this && this[e] === t) return e;
												return -1;
											},
										a = function (t, e) {
											(this.name = t),
												(this.code = DOMException[t]),
												(this.message = e);
										},
										s = function (t, e) {
											if ('' === e)
												throw new a(
													'SYNTAX_ERR',
													'The token must not be empty.',
												);
											if (/\s/.test(e))
												throw new a(
													'INVALID_CHARACTER_ERR',
													'The token must not contain space characters.',
												);
											return i.call(t, e);
										},
										u = function (t) {
											for (
												var e = r.call(t.getAttribute('class') || ''),
													n = e ? e.split(/\s+/) : [],
													o = 0,
													i = n.length;
												o < i;
												o++
											)
												this.push(n[o]);
											this._updateClassName = function () {
												t.setAttribute('class', this.toString());
											};
										},
										c = (u.prototype = []),
										l = function () {
											return new u(this);
										};
									if (
										((a.prototype = Error.prototype),
										(c.item = function (t) {
											return this[t] || null;
										}),
										(c.contains = function (t) {
											return ~s(this, t + '');
										}),
										(c.add = function () {
											var t,
												e = arguments,
												n = 0,
												o = e.length,
												r = !1;
											do {
												(t = e[n] + ''),
													~s(this, t) || (this.push(t), (r = !0));
											} while (++n < o);
											r && this._updateClassName();
										}),
										(c.remove = function () {
											var t,
												e,
												n = arguments,
												o = 0,
												r = n.length,
												i = !1;
											do {
												for (t = n[o] + '', e = s(this, t); ~e; )
													this.splice(e, 1), (i = !0), (e = s(this, t));
											} while (++o < r);
											i && this._updateClassName();
										}),
										(c.toggle = function (t, e) {
											var n = this.contains(t),
												o = n ? !0 !== e && 'remove' : !1 !== e && 'add';
											return o && this[o](t), !0 === e || !1 === e ? e : !n;
										}),
										(c.replace = function (t, e) {
											var n = s(t + '');
											~n && (this.splice(n, 1, e), this._updateClassName());
										}),
										(c.toString = function () {
											return this.join(' ');
										}),
										o.defineProperty)
									) {
										var f = { get: l, enumerable: !0, configurable: !0 };
										try {
											o.defineProperty(n, e, f);
										} catch (t) {
											(void 0 !== t.number && -2146823252 !== t.number) ||
												((f.enumerable = !1), o.defineProperty(n, e, f));
										}
									} else
										o.prototype.__defineGetter__ && n.__defineGetter__(e, l);
								}
							})(self),
						(function () {
							var t = document.createElement('_');
							if ((t.classList.add('c1', 'c2'), !t.classList.contains('c2'))) {
								var e = function (t) {
									var e = DOMTokenList.prototype[t];
									DOMTokenList.prototype[t] = function (t) {
										var n,
											o = arguments.length;
										for (n = 0; n < o; n++) (t = arguments[n]), e.call(this, t);
									};
								};
								e('add'), e('remove');
							}
							if ((t.classList.toggle('c3', !1), t.classList.contains('c3'))) {
								var n = DOMTokenList.prototype.toggle;
								DOMTokenList.prototype.toggle = function (t, e) {
									return 1 in arguments && !this.contains(t) == !e
										? e
										: n.call(this, t);
								};
							}
							'replace' in document.createElement('_').classList ||
								(DOMTokenList.prototype.replace = function (t, e) {
									var n = this.toString().split(' '),
										o = n.indexOf(t + '');
									~o &&
										((n = n.slice(o)),
										this.remove.apply(this, n),
										this.add(e),
										this.add.apply(this, n.slice(1)));
								}),
								(t = null);
						})());
				n(7327),
					n(2222),
					n(7941),
					n(4603),
					n(2707),
					n(6699),
					n(2023),
					n(4747),
					n(9601),
					n(1249),
					n(1038),
					n(8783),
					n(2526),
					n(5003),
					n(9337),
					n(1817),
					n(2165),
					n(6992),
					n(3948),
					n(3161),
					n(9653),
					n(4723),
					n(5827),
					n(6210);
				function t(t) {
					return (
						(function (t) {
							if (Array.isArray(t)) return r(t);
						})(t) ||
						(function (t) {
							if ('undefined' != typeof Symbol && Symbol.iterator in Object(t))
								return Array.from(t);
						})(t) ||
						e(t) ||
						(function () {
							throw new TypeError(
								'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
							);
						})()
					);
				}
				function e(t, e) {
					if (t) {
						if ('string' == typeof t) return r(t, e);
						var n = Object.prototype.toString.call(t).slice(8, -1);
						return (
							'Object' === n && t.constructor && (n = t.constructor.name),
							'Map' === n || 'Set' === n
								? Array.from(t)
								: 'Arguments' === n ||
								  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
								? r(t, e)
								: void 0
						);
					}
				}
				function r(t, e) {
					(null == e || e > t.length) && (e = t.length);
					for (var n = 0, o = new Array(e); n < e; n++) o[n] = t[n];
					return o;
				}
				function i(t) {
					return (i =
						'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
							? function (t) {
									return typeof t;
							  }
							: function (t) {
									return t &&
										'function' == typeof Symbol &&
										t.constructor === Symbol &&
										t !== Symbol.prototype
										? 'symbol'
										: typeof t;
							  })(t);
				}
				function a(t, e) {
					for (var n = 0; n < e.length; n++) {
						var o = e[n];
						(o.enumerable = o.enumerable || !1),
							(o.configurable = !0),
							'value' in o && (o.writable = !0),
							Object.defineProperty(t, o.key, o);
					}
				}
				function s(t, e, n) {
					return (
						e in t
							? Object.defineProperty(t, e, {
									value: n,
									enumerable: !0,
									configurable: !0,
									writable: !0,
							  })
							: (t[e] = n),
						t
					);
				}
				var u = (function () {
					function n(t) {
						var e = t.getOptions,
							o = t.getCaretPosition,
							r = t.getCaretPositionEnd,
							i = t.dispatch;
						!(function (t, e) {
							if (!(t instanceof e))
								throw new TypeError('Cannot call a class as a function');
						})(this, n),
							s(this, 'getOptions', void 0),
							s(this, 'getCaretPosition', void 0),
							s(this, 'getCaretPositionEnd', void 0),
							s(this, 'dispatch', void 0),
							s(this, 'maxLengthReached', void 0),
							(this.getOptions = e),
							(this.getCaretPosition = o),
							(this.getCaretPositionEnd = r),
							(this.dispatch = i),
							n.bindMethods(n, this);
					}
					var o, r, u;
					return (
						(o = n),
						(u = [
							{
								key: 'bindMethods',
								value: function (t, n) {
									var o,
										r = (function (t, n) {
											var o;
											if (
												'undefined' == typeof Symbol ||
												null == t[Symbol.iterator]
											) {
												if (
													Array.isArray(t) ||
													(o = e(t)) ||
													(n && t && 'number' == typeof t.length)
												) {
													o && (t = o);
													var r = 0,
														i = function () {};
													return {
														s: i,
														n: function () {
															return r >= t.length
																? { done: !0 }
																: { done: !1, value: t[r++] };
														},
														e: function (t) {
															throw t;
														},
														f: i,
													};
												}
												throw new TypeError(
													'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
												);
											}
											var a,
												s = !0,
												u = !1;
											return {
												s: function () {
													o = t[Symbol.iterator]();
												},
												n: function () {
													var t = o.next();
													return (s = t.done), t;
												},
												e: function (t) {
													(u = !0), (a = t);
												},
												f: function () {
													try {
														s || null == o.return || o.return();
													} finally {
														if (u) throw a;
													}
												},
											};
										})(Object.getOwnPropertyNames(t.prototype));
									try {
										for (r.s(); !(o = r.n()).done; ) {
											var i = o.value;
											'constructor' === i ||
												'bindMethods' === i ||
												(n[i] = n[i].bind(n));
										}
									} catch (t) {
										r.e(t);
									} finally {
										r.f();
									}
								},
							},
						]),
						(r = [
							{
								key: 'getButtonType',
								value: function (t) {
									return t.includes('{') && t.includes('}') && '{//}' !== t
										? 'functionBtn'
										: 'standardBtn';
								},
							},
							{
								key: 'getButtonClass',
								value: function (t) {
									var e = this.getButtonType(t),
										n = t.replace('{', '').replace('}', ''),
										o = '';
									return (
										'standardBtn' !== e && (o = ' hg-button-'.concat(n)),
										'hg-'.concat(e).concat(o)
									);
								},
							},
							{
								key: 'getDefaultDiplay',
								value: function () {
									return {
										'{bksp}': 'backspace',
										'{backspace}': 'backspace',
										'{enter}': '< enter',
										'{shift}': 'shift',
										'{shiftleft}': 'shift',
										'{shiftright}': 'shift',
										'{alt}': 'alt',
										'{s}': 'shift',
										'{tab}': 'tab',
										'{lock}': 'caps',
										'{capslock}': 'caps',
										'{accept}': 'Submit',
										'{space}': ' ',
										'{//}': ' ',
										'{esc}': 'esc',
										'{escape}': 'esc',
										'{f1}': 'f1',
										'{f2}': 'f2',
										'{f3}': 'f3',
										'{f4}': 'f4',
										'{f5}': 'f5',
										'{f6}': 'f6',
										'{f7}': 'f7',
										'{f8}': 'f8',
										'{f9}': 'f9',
										'{f10}': 'f10',
										'{f11}': 'f11',
										'{f12}': 'f12',
										'{numpaddivide}': '/',
										'{numlock}': 'lock',
										'{arrowup}': '↑',
										'{arrowleft}': '←',
										'{arrowdown}': '↓',
										'{arrowright}': '→',
										'{prtscr}': 'print',
										'{scrolllock}': 'scroll',
										'{pause}': 'pause',
										'{insert}': 'ins',
										'{home}': 'home',
										'{pageup}': 'up',
										'{delete}': 'del',
										'{end}': 'end',
										'{pagedown}': 'down',
										'{numpadmultiply}': '*',
										'{numpadsubtract}': '-',
										'{numpadadd}': '+',
										'{numpadenter}': 'enter',
										'{period}': '.',
										'{numpaddecimal}': '.',
										'{numpad0}': '0',
										'{numpad1}': '1',
										'{numpad2}': '2',
										'{numpad3}': '3',
										'{numpad4}': '4',
										'{numpad5}': '5',
										'{numpad6}': '6',
										'{numpad7}': '7',
										'{numpad8}': '8',
										'{numpad9}': '9',
									};
								},
							},
							{
								key: 'getButtonDisplayName',
								value: function (t, e, n) {
									return (
										(e = n
											? Object.assign({}, this.getDefaultDiplay(), e)
											: e || this.getDefaultDiplay())[t] || t
									);
								},
							},
							{
								key: 'getUpdatedInput',
								value: function (t, e, n) {
									var o =
											arguments.length > 3 && void 0 !== arguments[3]
												? arguments[3]
												: n,
										r =
											arguments.length > 4 &&
											void 0 !== arguments[4] &&
											arguments[4],
										i = this.getOptions(),
										a = [n, o, r],
										s = e;
									return (
										('{bksp}' === t || '{backspace}' === t) && s.length > 0
											? (s = this.removeAt.apply(this, [s].concat(a)))
											: '{space}' === t
											? (s = this.addStringAt.apply(this, [s, ' '].concat(a)))
											: '{tab}' !== t ||
											  ('boolean' == typeof i.tabCharOnTab &&
													!1 === i.tabCharOnTab)
											? ('{enter}' !== t && '{numpadenter}' !== t) ||
											  !i.newLineOnEnter
												? t.includes('numpad') &&
												  Number.isInteger(Number(t[t.length - 2]))
													? (s = this.addStringAt.apply(
															this,
															[s, t[t.length - 2]].concat(a),
													  ))
													: '{numpaddivide}' === t
													? (s = this.addStringAt.apply(
															this,
															[s, '/'].concat(a),
													  ))
													: '{numpadmultiply}' === t
													? (s = this.addStringAt.apply(
															this,
															[s, '*'].concat(a),
													  ))
													: '{numpadsubtract}' === t
													? (s = this.addStringAt.apply(
															this,
															[s, '-'].concat(a),
													  ))
													: '{numpadadd}' === t
													? (s = this.addStringAt.apply(
															this,
															[s, '+'].concat(a),
													  ))
													: '{numpaddecimal}' === t
													? (s = this.addStringAt.apply(
															this,
															[s, '.'].concat(a),
													  ))
													: '{' === t || '}' === t
													? (s = this.addStringAt.apply(this, [s, t].concat(a)))
													: t.includes('{') ||
													  t.includes('}') ||
													  (s = this.addStringAt.apply(this, [s, t].concat(a)))
												: (s = this.addStringAt.apply(
														this,
														[s, '\n'].concat(a),
												  ))
											: (s = this.addStringAt.apply(this, [s, '\t'].concat(a))),
										s
									);
								},
							},
							{
								key: 'updateCaretPos',
								value: function (t) {
									var e =
											arguments.length > 1 &&
											void 0 !== arguments[1] &&
											arguments[1],
										n = this.updateCaretPosAction(t, e);
									this.dispatch(function (t) {
										t.setCaretPosition(n);
									});
								},
							},
							{
								key: 'updateCaretPosAction',
								value: function (t) {
									var e =
											arguments.length > 1 &&
											void 0 !== arguments[1] &&
											arguments[1],
										n = this.getOptions(),
										o = this.getCaretPosition();
									return (
										null != o && (e ? o > 0 && (o -= t) : (o += t)),
										n.debug && console.log('Caret at:', o),
										o
									);
								},
							},
							{
								key: 'addStringAt',
								value: function (t, e) {
									var n,
										o =
											arguments.length > 2 && void 0 !== arguments[2]
												? arguments[2]
												: t.length,
										r =
											arguments.length > 3 && void 0 !== arguments[3]
												? arguments[3]
												: t.length,
										i =
											arguments.length > 4 &&
											void 0 !== arguments[4] &&
											arguments[4];
									return (
										o || 0 === o
											? ((n = [t.slice(0, o), e, t.slice(r)].join('')),
											  this.isMaxLengthReached() ||
													(i && this.updateCaretPos(e.length)))
											: (n = t + e),
										n
									);
								},
							},
							{
								key: 'removeAt',
								value: function (t) {
									var e,
										n =
											arguments.length > 1 && void 0 !== arguments[1]
												? arguments[1]
												: t.length,
										o =
											arguments.length > 2 && void 0 !== arguments[2]
												? arguments[2]
												: t.length,
										r =
											arguments.length > 3 &&
											void 0 !== arguments[3] &&
											arguments[3];
									if (0 === n && 0 === o) return t;
									if (n === o) {
										var i = /([\uD800-\uDBFF][\uDC00-\uDFFF])/g;
										n && n >= 0
											? t.substring(n - 2, n).match(i)
												? ((e = t.substr(0, n - 2) + t.substr(n)),
												  r && this.updateCaretPos(2, !0))
												: ((e = t.substr(0, n - 1) + t.substr(n)),
												  r && this.updateCaretPos(1, !0))
											: t.slice(-2).match(i)
											? ((e = t.slice(0, -2)), r && this.updateCaretPos(2, !0))
											: ((e = t.slice(0, -1)), r && this.updateCaretPos(1, !0));
									} else
										(e = t.slice(0, n) + t.slice(o)),
											r &&
												this.dispatch(function (t) {
													t.setCaretPosition(n);
												});
									return e;
								},
							},
							{
								key: 'handleMaxLength',
								value: function (t, e) {
									var n = this.getOptions(),
										o = n.maxLength,
										r = t[n.inputName || 'default'],
										a = e.length - 1 >= o;
									if (e.length <= r.length) return !1;
									if (Number.isInteger(o))
										return (
											n.debug && console.log('maxLength (num) reached:', a),
											a
												? ((this.maxLengthReached = !0), !0)
												: ((this.maxLengthReached = !1), !1)
										);
									if ('object' === i(o)) {
										var s = e.length - 1 >= o[n.inputName || 'default'];
										return (
											n.debug && console.log('maxLength (obj) reached:', s),
											s
												? ((this.maxLengthReached = !0), !0)
												: ((this.maxLengthReached = !1), !1)
										);
									}
								},
							},
							{
								key: 'isMaxLengthReached',
								value: function () {
									return Boolean(this.maxLengthReached);
								},
							},
							{
								key: 'isTouchDevice',
								value: function () {
									return 'ontouchstart' in window || navigator.maxTouchPoints;
								},
							},
							{
								key: 'pointerEventsSupported',
								value: function () {
									return !!window.PointerEvent;
								},
							},
							{
								key: 'camelCase',
								value: function (t) {
									return t
										? t
												.toLowerCase()
												.trim()
												.split(/[.\-_\s]/g)
												.reduce(function (t, e) {
													return e.length
														? t + e[0].toUpperCase() + e.slice(1)
														: t;
												})
										: '';
								},
							},
							{
								key: 'chunkArray',
								value: function (e, n) {
									return t(Array(Math.ceil(e.length / n))).map(function (t, o) {
										return e.slice(n * o, n + n * o);
									});
								},
							},
						]) && a(o.prototype, r),
						u && a(o, u),
						n
					);
				})();
				s(u, 'noop', function () {});
				var c = u;
				function l(t, e) {
					for (var n = 0; n < e.length; n++) {
						var o = e[n];
						(o.enumerable = o.enumerable || !1),
							(o.configurable = !0),
							'value' in o && (o.writable = !0),
							Object.defineProperty(t, o.key, o);
					}
				}
				function f(t, e, n) {
					return (
						e in t
							? Object.defineProperty(t, e, {
									value: n,
									enumerable: !0,
									configurable: !0,
									writable: !0,
							  })
							: (t[e] = n),
						t
					);
				}
				var d = (function () {
					function t(e) {
						var n = e.dispatch,
							o = e.getOptions;
						!(function (t, e) {
							if (!(t instanceof e))
								throw new TypeError('Cannot call a class as a function');
						})(this, t),
							f(this, 'getOptions', void 0),
							f(this, 'dispatch', void 0),
							(this.dispatch = n),
							(this.getOptions = o),
							c.bindMethods(t, this);
					}
					var e, n, o;
					return (
						(e = t),
						(n = [
							{
								key: 'handleHighlightKeyDown',
								value: function (t) {
									var e = this.getOptions(),
										n = this.getSimpleKeyboardLayoutKey(t);
									this.dispatch(function (t) {
										var o =
											t.getButtonElement(n) ||
											t.getButtonElement('{'.concat(n, '}'));
										o &&
											((o.style.backgroundColor =
												e.physicalKeyboardHighlightBgColor || '#dadce4'),
											(o.style.color =
												e.physicalKeyboardHighlightTextColor || 'black'),
											e.physicalKeyboardHighlightPress &&
												(
													o.onpointerdown ||
													o.onmousedown ||
													o.ontouchstart ||
													c.noop
												)());
									});
								},
							},
							{
								key: 'handleHighlightKeyUp',
								value: function (t) {
									var e = this.getOptions(),
										n = this.getSimpleKeyboardLayoutKey(t);
									this.dispatch(function (t) {
										var o =
											t.getButtonElement(n) ||
											t.getButtonElement('{'.concat(n, '}'));
										o &&
											o.removeAttribute &&
											(o.removeAttribute('style'),
											e.physicalKeyboardHighlightPress &&
												(
													o.onpointerup ||
													o.onmouseup ||
													o.ontouchend ||
													c.noop
												)());
									});
								},
							},
							{
								key: 'getSimpleKeyboardLayoutKey',
								value: function (t) {
									var e;
									return (
										(((e =
											t.code.includes('Numpad') ||
											t.code.includes('Shift') ||
											t.code.includes('Space') ||
											t.code.includes('Backspace') ||
											t.code.includes('Control') ||
											t.code.includes('Alt') ||
											t.code.includes('Meta')
												? t.code
												: t.key) &&
											e !== e.toUpperCase()) ||
											('F' === t.code[0] &&
												Number.isInteger(Number(t.code[1])) &&
												t.code.length <= 3)) &&
											(e = e ? e.toLowerCase() : e),
										e
									);
								},
							},
						]) && l(e.prototype, n),
						o && l(e, o),
						t
					);
				})();
				function p(t, e) {
					for (var n = 0; n < e.length; n++) {
						var o = e[n];
						(o.enumerable = o.enumerable || !1),
							(o.configurable = !0),
							'value' in o && (o.writable = !0),
							Object.defineProperty(t, o.key, o);
					}
				}
				function h(t, e, n) {
					return (
						e in t
							? Object.defineProperty(t, e, {
									value: n,
									enumerable: !0,
									configurable: !0,
									writable: !0,
							  })
							: (t[e] = n),
						t
					);
				}
				var v = (function () {
					function t(e) {
						var n = e.utilities;
						!(function (t, e) {
							if (!(t instanceof e))
								throw new TypeError('Cannot call a class as a function');
						})(this, t),
							h(this, 'utilities', void 0),
							h(this, 'candidateBoxElement', void 0),
							h(this, 'pageIndex', 0),
							h(this, 'pageSize', void 0),
							(this.utilities = n),
							c.bindMethods(t, this),
							(this.pageSize =
								this.utilities.getOptions().layoutCandidatesPageSize || 5);
					}
					var e, n, o;
					return (
						(e = t),
						(n = [
							{
								key: 'destroy',
								value: function () {
									this.candidateBoxElement &&
										(this.candidateBoxElement.remove(), (this.pageIndex = 0));
								},
							},
							{
								key: 'show',
								value: function (t) {
									var e = this,
										n = t.candidateValue,
										o = t.targetElement,
										r = t.onSelect;
									if (n && n.length) {
										var i = this.utilities.chunkArray(
											n.split(' '),
											this.pageSize,
										);
										this.renderPage({
											candidateListPages: i,
											targetElement: o,
											pageIndex: this.pageIndex,
											nbPages: i.length,
											onItemSelected: function (t) {
												r(t), e.destroy();
											},
										});
									}
								},
							},
							{
								key: 'renderPage',
								value: function (t) {
									var e,
										n = this,
										o = t.candidateListPages,
										r = t.targetElement,
										i = t.pageIndex,
										a = t.nbPages,
										s = t.onItemSelected;
									null === (e = this.candidateBoxElement) ||
										void 0 === e ||
										e.remove(),
										(this.candidateBoxElement = document.createElement('div')),
										(this.candidateBoxElement.className = 'hg-candidate-box');
									var u = document.createElement('ul');
									(u.className = 'hg-candidate-box-list'),
										o[i].forEach(function (t) {
											var e = document.createElement('li');
											(e.className = 'hg-candidate-box-list-item'),
												(e.textContent = t),
												(e.onclick = function () {
													return s(t);
												}),
												u.appendChild(e);
										});
									var c = i > 0,
										l = document.createElement('div');
									l.classList.add('hg-candidate-box-prev'),
										c && l.classList.add('hg-candidate-box-btn-active'),
										(l.onclick = function () {
											c &&
												n.renderPage({
													candidateListPages: o,
													targetElement: r,
													pageIndex: i - 1,
													nbPages: a,
													onItemSelected: s,
												});
										}),
										this.candidateBoxElement.appendChild(l),
										this.candidateBoxElement.appendChild(u);
									var f = i < a - 1,
										d = document.createElement('div');
									d.classList.add('hg-candidate-box-next'),
										f && d.classList.add('hg-candidate-box-btn-active'),
										(d.onclick = function () {
											f &&
												n.renderPage({
													candidateListPages: o,
													targetElement: r,
													pageIndex: i + 1,
													nbPages: a,
													onItemSelected: s,
												});
										}),
										this.candidateBoxElement.appendChild(d),
										r.prepend(this.candidateBoxElement);
								},
							},
						]) && p(e.prototype, n),
						o && p(e, o),
						t
					);
				})();
				function g(t) {
					return (
						(function (t) {
							if (Array.isArray(t)) return y(t);
						})(t) ||
						(function (t) {
							if ('undefined' != typeof Symbol && Symbol.iterator in Object(t))
								return Array.from(t);
						})(t) ||
						(function (t, e) {
							if (!t) return;
							if ('string' == typeof t) return y(t, e);
							var n = Object.prototype.toString.call(t).slice(8, -1);
							'Object' === n && t.constructor && (n = t.constructor.name);
							if ('Map' === n || 'Set' === n) return Array.from(t);
							if (
								'Arguments' === n ||
								/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
							)
								return y(t, e);
						})(t) ||
						(function () {
							throw new TypeError(
								'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
							);
						})()
					);
				}
				function y(t, e) {
					(null == e || e > t.length) && (e = t.length);
					for (var n = 0, o = new Array(e); n < e; n++) o[n] = t[n];
					return o;
				}
				function m(t) {
					return (m =
						'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
							? function (t) {
									return typeof t;
							  }
							: function (t) {
									return t &&
										'function' == typeof Symbol &&
										t.constructor === Symbol &&
										t !== Symbol.prototype
										? 'symbol'
										: typeof t;
							  })(t);
				}
				function b(t, e) {
					var n = Object.keys(t);
					if (Object.getOwnPropertySymbols) {
						var o = Object.getOwnPropertySymbols(t);
						e &&
							(o = o.filter(function (e) {
								return Object.getOwnPropertyDescriptor(t, e).enumerable;
							})),
							n.push.apply(n, o);
					}
					return n;
				}
				function x(t) {
					for (var e = 1; e < arguments.length; e++) {
						var n = null != arguments[e] ? arguments[e] : {};
						e % 2
							? b(Object(n), !0).forEach(function (e) {
									O(t, e, n[e]);
							  })
							: Object.getOwnPropertyDescriptors
							? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
							: b(Object(n)).forEach(function (e) {
									Object.defineProperty(
										t,
										e,
										Object.getOwnPropertyDescriptor(n, e),
									);
							  });
					}
					return t;
				}
				function w(t, e) {
					if (!(t instanceof e))
						throw new TypeError('Cannot call a class as a function');
				}
				function E(t, e) {
					for (var n = 0; n < e.length; n++) {
						var o = e[n];
						(o.enumerable = o.enumerable || !1),
							(o.configurable = !0),
							'value' in o && (o.writable = !0),
							Object.defineProperty(t, o.key, o);
					}
				}
				function O(t, e, n) {
					return (
						e in t
							? Object.defineProperty(t, e, {
									value: n,
									enumerable: !0,
									configurable: !0,
									writable: !0,
							  })
							: (t[e] = n),
						t
					);
				}
				var S = (function () {
					function t() {
						var e = this;
						if (
							(w(this, t),
							O(this, 'input', void 0),
							O(this, 'options', void 0),
							O(this, 'utilities', void 0),
							O(this, 'caretPosition', void 0),
							O(this, 'caretPositionEnd', void 0),
							O(this, 'keyboardDOM', void 0),
							O(this, 'keyboardPluginClasses', void 0),
							O(this, 'keyboardDOMClass', void 0),
							O(this, 'buttonElements', void 0),
							O(this, 'currentInstanceName', void 0),
							O(this, 'allKeyboardInstances', void 0),
							O(this, 'keyboardInstanceNames', void 0),
							O(this, 'isFirstKeyboardInstance', void 0),
							O(this, 'physicalKeyboard', void 0),
							O(this, 'modules', void 0),
							O(this, 'activeButtonClass', void 0),
							O(this, 'holdInteractionTimeout', void 0),
							O(this, 'holdTimeout', void 0),
							O(this, 'isMouseHold', void 0),
							O(this, 'initialized', void 0),
							O(this, 'candidateBox', void 0),
							O(this, 'keyboardRowsDOM', void 0),
							O(this, 'defaultName', 'default'),
							O(this, 'handleParams', function (t) {
								var e, n, o;
								if ('string' == typeof t[0])
									(e = t[0].split('.').join('')),
										(n = document.querySelector('.'.concat(e))),
										(o = t[1]);
								else if (t[0] instanceof HTMLDivElement) {
									if (!t[0].className)
										throw (
											(console.warn(
												'Any DOM element passed as parameter must have a class.',
											),
											new Error('KEYBOARD_DOM_CLASS_ERROR'))
										);
									(e = t[0].className.split(' ')[0]), (n = t[0]), (o = t[1]);
								} else
									(e = 'simple-keyboard'),
										(n = document.querySelector('.'.concat(e))),
										(o = t[0]);
								return { keyboardDOMClass: e, keyboardDOM: n, options: o };
							}),
							O(this, 'getOptions', function () {
								return e.options;
							}),
							O(this, 'getCaretPosition', function () {
								return e.caretPosition;
							}),
							O(this, 'getCaretPositionEnd', function () {
								return e.caretPositionEnd;
							}),
							O(this, 'registerModule', function (t, n) {
								e.modules[t] || (e.modules[t] = {}), n(e.modules[t]);
							}),
							O(this, 'getKeyboardClassString', function () {
								for (
									var t = arguments.length, n = new Array(t), o = 0;
									o < t;
									o++
								)
									n[o] = arguments[o];
								var r = [e.keyboardDOMClass].concat(n).filter(function (t) {
									return !!t;
								});
								return r.join(' ');
							}),
							'undefined' != typeof window)
						) {
							for (
								var n = arguments.length, o = new Array(n), r = 0;
								r < n;
								r++
							)
								o[r] = arguments[r];
							var i = this.handleParams(o),
								a = i.keyboardDOMClass,
								s = i.keyboardDOM,
								u = i.options,
								l = void 0 === u ? {} : u;
							(this.utilities = new c({
								getOptions: this.getOptions,
								getCaretPosition: this.getCaretPosition,
								getCaretPositionEnd: this.getCaretPositionEnd,
								dispatch: this.dispatch,
							})),
								(this.caretPosition = null),
								(this.caretPositionEnd = null),
								(this.keyboardDOM = s),
								(this.options = x(
									{
										layoutName: 'default',
										theme: 'hg-theme-default',
										inputName: 'default',
										preventMouseDownDefault: !1,
										enableLayoutCandidates: !0,
										excludeFromLayout: {},
									},
									l,
								)),
								(this.keyboardPluginClasses = ''),
								c.bindMethods(t, this);
							var f = this.options.inputName,
								p = void 0 === f ? this.defaultName : f;
							if (
								((this.input = {}),
								(this.input[p] = ''),
								(this.keyboardDOMClass = a),
								(this.buttonElements = {}),
								window.SimpleKeyboardInstances ||
									(window.SimpleKeyboardInstances = {}),
								(this.currentInstanceName = this.utilities.camelCase(
									this.keyboardDOMClass,
								)),
								(window.SimpleKeyboardInstances[
									this.currentInstanceName
								] = this),
								(this.allKeyboardInstances = window.SimpleKeyboardInstances),
								(this.keyboardInstanceNames = Object.keys(
									window.SimpleKeyboardInstances,
								)),
								(this.isFirstKeyboardInstance =
									this.keyboardInstanceNames[0] === this.currentInstanceName),
								(this.physicalKeyboard = new d({
									dispatch: this.dispatch,
									getOptions: this.getOptions,
								})),
								(this.candidateBox = this.options.enableLayoutCandidates
									? new v({ utilities: this.utilities })
									: null),
								!this.keyboardDOM)
							)
								throw (
									(console.warn('".'.concat(a, '" was not found in the DOM.')),
									new Error('KEYBOARD_DOM_ERROR'))
								);
							this.render(), (this.modules = {}), this.loadModules();
						}
					}
					var e, n, o;
					return (
						(e = t),
						(n = [
							{
								key: 'setCaretPosition',
								value: function (t) {
									var e =
										arguments.length > 1 && void 0 !== arguments[1]
											? arguments[1]
											: t;
									(this.caretPosition = t), (this.caretPositionEnd = e);
								},
							},
							{
								key: 'getInputCandidates',
								value: function (t) {
									var e = this.options.layoutCandidates;
									if (!e || 'object' !== m(e)) return {};
									var n = Object.keys(e).filter(function (e) {
										var n = new RegExp(''.concat(e, '$'), 'g');
										return !!g(t.matchAll(n)).length;
									});
									if (n.length > 1) {
										var o = n.sort(function (t, e) {
											return e.length - t.length;
										})[0];
										return { candidateKey: o, candidateValue: e[o] };
									}
									if (n.length) {
										var r = n[0];
										return { candidateKey: r, candidateValue: e[r] };
									}
									return {};
								},
							},
							{
								key: 'showCandidatesBox',
								value: function (t, e, n) {
									var o = this;
									this.candidateBox &&
										this.candidateBox.show({
											candidateValue: e,
											targetElement: n,
											onSelect: function (e) {
												var n = o.getInput(o.options.inputName, !0),
													r = new RegExp(''.concat(t, '$'), 'g'),
													i = n.replace(r, e);
												o.setInput(i, o.options.inputName, !0),
													'function' == typeof o.options.onChange &&
														o.options.onChange(
															o.getInput(o.options.inputName, !0),
														),
													'function' == typeof o.options.onChangeAll &&
														o.options.onChangeAll(o.getAllInputs());
											},
										});
								},
							},
							{
								key: 'handleButtonClicked',
								value: function (t, e) {
									var n = this.options,
										o = n.inputName,
										r = void 0 === o ? this.defaultName : o,
										i = n.debug;
									if ('{//}' !== t) {
										this.input[r] || (this.input[r] = '');
										var a = this.utilities.getUpdatedInput(
											t,
											this.input[r],
											this.caretPosition,
											this.caretPositionEnd,
										);
										if (
											('function' == typeof this.options.onKeyPress &&
												this.options.onKeyPress(t),
											this.input[r] !== a &&
												(!this.options.inputPattern ||
													(this.options.inputPattern &&
														this.inputPatternIsValid(a))))
										) {
											if (
												this.options.maxLength &&
												this.utilities.handleMaxLength(this.input, a)
											)
												return;
											var s = this.utilities.getUpdatedInput(
												t,
												this.input[r],
												this.caretPosition,
												this.caretPositionEnd,
												!0,
											);
											if (
												(this.setInput(s, this.options.inputName, !0),
												i && console.log('Input changed:', this.getAllInputs()),
												this.options.debug &&
													console.log(
														'Caret at: ',
														this.getCaretPosition(),
														this.getCaretPositionEnd(),
														'('.concat(this.keyboardDOMClass, ')'),
													),
												this.options.syncInstanceInputs &&
													this.syncInstanceInputs(),
												'function' == typeof this.options.onChange &&
													this.options.onChange(
														this.getInput(this.options.inputName, !0),
													),
												'function' == typeof this.options.onChangeAll &&
													this.options.onChangeAll(this.getAllInputs()),
												null != e &&
													e.target &&
													this.options.enableLayoutCandidates)
											) {
												var u,
													c = this.getInputCandidates(a),
													l = c.candidateKey,
													f = c.candidateValue;
												l && f
													? this.showCandidatesBox(l, f, this.keyboardDOM)
													: null === (u = this.candidateBox) ||
													  void 0 === u ||
													  u.destroy();
											}
										}
										i && console.log('Key pressed:', t);
									}
								},
							},
							{
								key: 'handleButtonMouseDown',
								value: function (t, e) {
									var n = this;
									e &&
										(this.options.preventMouseDownDefault && e.preventDefault(),
										this.options.stopMouseDownPropagation &&
											e.stopPropagation(),
										e.target.classList.add(this.activeButtonClass)),
										this.holdInteractionTimeout &&
											clearTimeout(this.holdInteractionTimeout),
										this.holdTimeout && clearTimeout(this.holdTimeout),
										(this.isMouseHold = !0),
										this.options.disableButtonHold ||
											(this.holdTimeout = window.setTimeout(function () {
												((n.isMouseHold &&
													((!t.includes('{') && !t.includes('}')) ||
														'{delete}' === t ||
														'{backspace}' === t ||
														'{bksp}' === t ||
														'{space}' === t ||
														'{tab}' === t)) ||
													'{arrowright}' === t ||
													'{arrowleft}' === t ||
													'{arrowup}' === t ||
													'{arrowdown}' === t) &&
													(n.options.debug && console.log('Button held:', t),
													n.handleButtonHold(t)),
													clearTimeout(n.holdTimeout);
											}, 500));
								},
							},
							{
								key: 'handleButtonMouseUp',
								value: function (t, e) {
									var n = this;
									e &&
										(this.options.preventMouseUpDefault &&
											e.preventDefault &&
											e.preventDefault(),
										this.options.stopMouseUpPropagation &&
											e.stopPropagation &&
											e.stopPropagation(),
										!(
											e.target === this.keyboardDOM ||
											(e.target && this.keyboardDOM.contains(e.target)) ||
											(this.candidateBox &&
												this.candidateBox.candidateBoxElement &&
												(e.target === this.candidateBox.candidateBoxElement ||
													(e.target &&
														this.candidateBox.candidateBoxElement.contains(
															e.target,
														))))
										) &&
											this.candidateBox &&
											this.candidateBox.destroy()),
										this.recurseButtons(function (t) {
											t.classList.remove(n.activeButtonClass);
										}),
										(this.isMouseHold = !1),
										this.holdInteractionTimeout &&
											clearTimeout(this.holdInteractionTimeout),
										t &&
											'function' == typeof this.options.onKeyReleased &&
											this.options.onKeyReleased(t);
								},
							},
							{
								key: 'handleKeyboardContainerMouseDown',
								value: function (t) {
									this.options.preventMouseDownDefault && t.preventDefault();
								},
							},
							{
								key: 'handleButtonHold',
								value: function (t) {
									var e = this;
									this.holdInteractionTimeout &&
										clearTimeout(this.holdInteractionTimeout),
										(this.holdInteractionTimeout = window.setTimeout(
											function () {
												e.isMouseHold
													? (e.handleButtonClicked(t), e.handleButtonHold(t))
													: clearTimeout(e.holdInteractionTimeout);
											},
											100,
										));
								},
							},
							{
								key: 'syncInstanceInputs',
								value: function () {
									var t = this;
									this.dispatch(function (e) {
										e.replaceInput(t.input),
											e.setCaretPosition(t.caretPosition, t.caretPositionEnd);
									});
								},
							},
							{
								key: 'clearInput',
								value: function () {
									var t =
										arguments.length > 0 && void 0 !== arguments[0]
											? arguments[0]
											: this.options.inputName || this.defaultName;
									(this.input[t] = ''),
										this.setCaretPosition(0),
										this.options.syncInstanceInputs &&
											this.syncInstanceInputs();
								},
							},
							{
								key: 'getInput',
								value: function () {
									var t =
											arguments.length > 0 && void 0 !== arguments[0]
												? arguments[0]
												: this.options.inputName || this.defaultName,
										e =
											arguments.length > 1 &&
											void 0 !== arguments[1] &&
											arguments[1];
									if (
										(this.options.syncInstanceInputs &&
											!e &&
											this.syncInstanceInputs(),
										this.options.rtl)
									) {
										var n = this.input[t].replace('‫', '').replace('‬', '');
										return '‫' + n + '‬';
									}
									return this.input[t];
								},
							},
							{
								key: 'getAllInputs',
								value: function () {
									var t = this,
										e = {};
									return (
										Object.keys(this.input).forEach(function (n) {
											e[n] = t.getInput(n, !0);
										}),
										e
									);
								},
							},
							{
								key: 'setInput',
								value: function (t) {
									var e =
											arguments.length > 1 && void 0 !== arguments[1]
												? arguments[1]
												: this.options.inputName || this.defaultName,
										n = arguments.length > 2 ? arguments[2] : void 0;
									(this.input[e] = t),
										!n &&
											this.options.syncInstanceInputs &&
											this.syncInstanceInputs();
								},
							},
							{
								key: 'replaceInput',
								value: function (t) {
									this.input = t;
								},
							},
							{
								key: 'setOptions',
								value: function () {
									var t =
											arguments.length > 0 && void 0 !== arguments[0]
												? arguments[0]
												: {},
										e = this.changedOptions(t);
									(this.options = Object.assign(this.options, t)),
										e.length &&
											(this.options.debug && console.log('changedOptions', e),
											this.onSetOptions(e),
											this.render());
								},
							},
							{
								key: 'changedOptions',
								value: function (t) {
									var e = this;
									return Object.keys(t).filter(function (n) {
										return (
											JSON.stringify(t[n]) !== JSON.stringify(e.options[n])
										);
									});
								},
							},
							{
								key: 'onSetOptions',
								value: function () {
									var t =
										arguments.length > 0 && void 0 !== arguments[0]
											? arguments[0]
											: [];
									t.includes('inputName') &&
										(this.options.debug &&
											console.log('inputName changed. caretPosition reset.'),
										this.setCaretPosition(null)),
										t.includes('layoutName') &&
											this.candidateBox &&
											this.candidateBox.destroy(),
										(t.includes('layoutCandidatesPageSize') ||
											t.includes('layoutCandidates')) &&
											this.candidateBox &&
											(this.candidateBox.destroy(),
											(this.candidateBox = new v({
												utilities: this.utilities,
											})));
								},
							},
							{
								key: 'resetRows',
								value: function () {
									this.keyboardRowsDOM && this.keyboardRowsDOM.remove(),
										(this.keyboardDOM.className = this.keyboardDOMClass),
										(this.buttonElements = {});
								},
							},
							{
								key: 'dispatch',
								value: function (t) {
									if (!window.SimpleKeyboardInstances)
										throw (
											(console.warn(
												'SimpleKeyboardInstances is not defined. Dispatch cannot be called.',
											),
											new Error('INSTANCES_VAR_ERROR'))
										);
									return Object.keys(window.SimpleKeyboardInstances).forEach(
										function (e) {
											t(window.SimpleKeyboardInstances[e], e);
										},
									);
								},
							},
							{
								key: 'addButtonTheme',
								value: function (t, e) {
									var n = this;
									e &&
										t &&
										(t.split(' ').forEach(function (o) {
											e.split(' ').forEach(function (e) {
												n.options.buttonTheme || (n.options.buttonTheme = []);
												var r = !1;
												n.options.buttonTheme.map(function (t) {
													if (null != t && t.class.split(' ').includes(e)) {
														r = !0;
														var n = t.buttons.split(' ');
														n.includes(o) ||
															((r = !0), n.push(o), (t.buttons = n.join(' ')));
													}
													return t;
												}),
													r ||
														n.options.buttonTheme.push({
															class: e,
															buttons: t,
														});
											});
										}),
										this.render());
								},
							},
							{
								key: 'removeButtonTheme',
								value: function (t, e) {
									var n = this;
									if (!t && !e)
										return (this.options.buttonTheme = []), void this.render();
									t &&
										Array.isArray(this.options.buttonTheme) &&
										this.options.buttonTheme.length &&
										(t.split(' ').forEach(function (t) {
											var o, r;
											null === (o = n.options) ||
												void 0 === o ||
												null === (r = o.buttonTheme) ||
												void 0 === r ||
												r.map(function (o, r) {
													if ((o && e && e.includes(o.class)) || !e) {
														var i,
															a,
															s =
																null === (i = o) || void 0 === i
																	? void 0
																	: i.buttons.split(' ').filter(function (e) {
																			return e !== t;
																	  });
														o && null != s && s.length
															? (o.buttons = s.join(' '))
															: (null === (a = n.options.buttonTheme) ||
																	void 0 === a ||
																	a.splice(r, 1),
															  (o = null));
													}
													return o;
												});
										}),
										this.render());
								},
							},
							{
								key: 'getButtonElement',
								value: function (t) {
									var e,
										n = this.buttonElements[t];
									return n && (e = n.length > 1 ? n : n[0]), e;
								},
							},
							{
								key: 'inputPatternIsValid',
								value: function (t) {
									var e,
										n = this.options.inputPattern;
									if (
										(e =
											n instanceof RegExp
												? n
												: n[this.options.inputName || this.defaultName]) &&
										t
									) {
										var o = e.test(t);
										return (
											this.options.debug &&
												console.log(
													'inputPattern ("'
														.concat(e, '"): ')
														.concat(o ? 'passed' : 'did not pass!'),
												),
											o
										);
									}
									return !0;
								},
							},
							{
								key: 'setEventListeners',
								value: function () {
									(!this.isFirstKeyboardInstance &&
										this.allKeyboardInstances) ||
										(this.options.debug &&
											console.log(
												'Caret handling started ('.concat(
													this.keyboardDOMClass,
													')',
												),
											),
										document.addEventListener('keyup', this.handleKeyUp),
										document.addEventListener('keydown', this.handleKeyDown),
										document.addEventListener('mouseup', this.handleMouseUp),
										document.addEventListener('touchend', this.handleTouchEnd),
										document.addEventListener('select', this.handleSelect));
								},
							},
							{
								key: 'handleKeyUp',
								value: function (t) {
									this.caretEventHandler(t),
										this.options.physicalKeyboardHighlight &&
											this.physicalKeyboard.handleHighlightKeyUp(t);
								},
							},
							{
								key: 'handleKeyDown',
								value: function (t) {
									this.options.physicalKeyboardHighlight &&
										this.physicalKeyboard.handleHighlightKeyDown(t);
								},
							},
							{
								key: 'handleMouseUp',
								value: function (t) {
									this.caretEventHandler(t);
								},
							},
							{
								key: 'handleTouchEnd',
								value: function (t) {
									this.caretEventHandler(t);
								},
							},
							{
								key: 'handleSelect',
								value: function (t) {
									this.caretEventHandler(t);
								},
							},
							{
								key: 'caretEventHandler',
								value: function (t) {
									var e;
									t.target.tagName && (e = t.target.tagName.toLowerCase()),
										this.dispatch(function (n) {
											var o =
												t.target === n.keyboardDOM ||
												(t.target && n.keyboardDOM.contains(t.target));
											n.isMouseHold && (n.isMouseHold = !1),
												('textarea' === e ||
													('input' === e &&
														[
															'text',
															'search',
															'url',
															'tel',
															'password',
														].includes(t.target.type))) &&
												!n.options.disableCaretPositioning
													? (n.setCaretPosition(
															t.target.selectionStart,
															t.target.selectionEnd,
													  ),
													  n.options.debug &&
															console.log(
																'Caret at: ',
																n.getCaretPosition(),
																n.getCaretPositionEnd(),
																t && t.target.tagName.toLowerCase(),
																'('.concat(n.keyboardDOMClass, ')'),
															))
													: (!n.options.disableCaretPositioning && o) ||
													  n.setCaretPosition(null);
										});
								},
							},
							{
								key: 'recurseButtons',
								value: function (t) {
									var e = this;
									t &&
										Object.keys(this.buttonElements).forEach(function (n) {
											return e.buttonElements[n].forEach(t);
										});
								},
							},
							{
								key: 'destroy',
								value: function () {
									this.options.debug &&
										console.log(
											'Destroying simple-keyboard instance: '.concat(
												this.currentInstanceName,
											),
										),
										document.removeEventListener('keyup', this.handleKeyUp),
										document.removeEventListener('keydown', this.handleKeyDown),
										document.removeEventListener('mouseup', this.handleMouseUp),
										document.removeEventListener(
											'touchend',
											this.handleTouchEnd,
										),
										document.removeEventListener('select', this.handleSelect),
										(document.onpointerup = null),
										(document.ontouchend = null),
										(document.ontouchcancel = null),
										(document.onmouseup = null),
										this.recurseButtons(function (t) {
											t &&
												((t.onpointerdown = null),
												(t.onpointerup = null),
												(t.onpointercancel = null),
												(t.ontouchstart = null),
												(t.ontouchend = null),
												(t.ontouchcancel = null),
												(t.onclick = null),
												(t.onmousedown = null),
												(t.onmouseup = null),
												t.remove(),
												(t = null));
										}),
										(this.keyboardDOM.onpointerdown = null),
										(this.keyboardDOM.ontouchstart = null),
										(this.keyboardDOM.onmousedown = null),
										this.resetRows(),
										this.candidateBox &&
											(this.candidateBox.destroy(), (this.candidateBox = null)),
										(this.keyboardDOM.innerHTML = ''),
										(window.SimpleKeyboardInstances[
											this.currentInstanceName
										] = null),
										delete window.SimpleKeyboardInstances[
											this.currentInstanceName
										],
										(this.initialized = !1);
								},
							},
							{
								key: 'getButtonThemeClasses',
								value: function (t) {
									var e = this.options.buttonTheme,
										n = [];
									return (
										Array.isArray(e) &&
											e.forEach(function (e) {
												if (
													e &&
													e.class &&
													'string' == typeof e.class &&
													e.buttons &&
													'string' == typeof e.buttons
												) {
													var o = e.class.split(' ');
													e.buttons.split(' ').includes(t) &&
														(n = [].concat(g(n), g(o)));
												} else console.warn('Incorrect "buttonTheme". Please check the documentation.', e);
											}),
										n
									);
								},
							},
							{
								key: 'setDOMButtonAttributes',
								value: function (t, e) {
									var n = this.options.buttonAttributes;
									Array.isArray(n) &&
										n.forEach(function (n) {
											n.attribute &&
											'string' == typeof n.attribute &&
											n.value &&
											'string' == typeof n.value &&
											n.buttons &&
											'string' == typeof n.buttons
												? n.buttons.split(' ').includes(t) &&
												  e(n.attribute, n.value)
												: console.warn(
														'Incorrect "buttonAttributes". Please check the documentation.',
														n,
												  );
										});
								},
							},
							{
								key: 'onTouchDeviceDetected',
								value: function () {
									this.processAutoTouchEvents(), this.disableContextualWindow();
								},
							},
							{
								key: 'disableContextualWindow',
								value: function () {
									window.oncontextmenu = function (t) {
										if (t.target.classList.contains('hg-button'))
											return t.preventDefault(), t.stopPropagation(), !1;
									};
								},
							},
							{
								key: 'processAutoTouchEvents',
								value: function () {
									this.options.autoUseTouchEvents &&
										((this.options.useTouchEvents = !0),
										this.options.debug &&
											console.log(
												'autoUseTouchEvents: Touch device detected, useTouchEvents enabled.',
											));
								},
							},
							{
								key: 'onInit',
								value: function () {
									this.options.debug &&
										console.log(
											''.concat(this.keyboardDOMClass, ' Initialized'),
										),
										this.setEventListeners(),
										'function' == typeof this.options.onInit &&
											this.options.onInit(this);
								},
							},
							{
								key: 'beforeFirstRender',
								value: function () {
									this.utilities.isTouchDevice() &&
										this.onTouchDeviceDetected(),
										'function' == typeof this.options.beforeFirstRender &&
											this.options.beforeFirstRender(this),
										this.isFirstKeyboardInstance &&
											this.utilities.pointerEventsSupported() &&
											!this.options.useTouchEvents &&
											!this.options.useMouseEvents &&
											this.options.debug &&
											console.log(
												'Using PointerEvents as it is supported by this browser',
											),
										this.options.useTouchEvents &&
											this.options.debug &&
											console.log(
												'useTouchEvents has been enabled. Only touch events will be used.',
											);
								},
							},
							{
								key: 'beforeRender',
								value: function () {
									'function' == typeof this.options.beforeRender &&
										this.options.beforeRender(this);
								},
							},
							{
								key: 'onRender',
								value: function () {
									'function' == typeof this.options.onRender &&
										this.options.onRender(this);
								},
							},
							{
								key: 'onModulesLoaded',
								value: function () {
									'function' == typeof this.options.onModulesLoaded &&
										this.options.onModulesLoaded(this);
								},
							},
							{
								key: 'loadModules',
								value: function () {
									var t = this;
									Array.isArray(this.options.modules) &&
										(this.options.modules.forEach(function (e) {
											var n = new e(t);
											n.init && n.init(t);
										}),
										(this.keyboardPluginClasses = 'modules-loaded'),
										this.render(),
										this.onModulesLoaded());
								},
							},
							{
								key: 'getModuleProp',
								value: function (t, e) {
									return !!this.modules[t] && this.modules[t][e];
								},
							},
							{
								key: 'getModulesList',
								value: function () {
									return Object.keys(this.modules);
								},
							},
							{
								key: 'parseRowDOMContainers',
								value: function (t, e, n, o) {
									var r = this,
										i = Array.from(t.children),
										a = 0;
									return (
										i.length &&
											n.forEach(function (n, s) {
												var u = o[s];
												if (!(u && u > n)) return !1;
												var c = n - a,
													l = u - a,
													f = document.createElement('div');
												f.className += 'hg-button-container';
												var d = ''
													.concat(r.options.layoutName, '-r')
													.concat(e, 'c')
													.concat(s);
												f.setAttribute('data-skUID', d);
												var p = i.splice(c, l - c + 1);
												(a = l - c),
													p.forEach(function (t) {
														return f.appendChild(t);
													}),
													i.splice(c, 0, f),
													(t.innerHTML = ''),
													i.forEach(function (e) {
														return t.appendChild(e);
													}),
													r.options.debug &&
														console.log('rowDOMContainer', p, c, l, a + 1);
											}),
										t
									);
								},
							},
							{
								key: 'render',
								value: function () {
									var t = this;
									this.resetRows(),
										this.initialized || this.beforeFirstRender(),
										this.beforeRender();
									var e = 'hg-layout-'.concat(this.options.layoutName),
										n = this.options.layout || {
											default: [
												'` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
												'{tab} q w e r t y u i o p [ ] \\',
												"{lock} a s d f g h j k l ; ' {enter}",
												'{shift} z x c v b n m , . / {shift}',
												'.com @ {space}',
											],
											shift: [
												'~ ! @ # $ % ^ & * ( ) _ + {bksp}',
												'{tab} Q W E R T Y U I O P { } |',
												'{lock} A S D F G H J K L : " {enter}',
												'{shift} Z X C V B N M < > ? {shift}',
												'.com @ {space}',
											],
										},
										o = this.options.useTouchEvents || !1,
										r = o ? 'hg-touch-events' : '',
										i = this.options.useMouseEvents || !1,
										a = this.options.disableRowButtonContainers;
									(this.keyboardDOM.className = this.getKeyboardClassString(
										this.options.theme,
										e,
										this.keyboardPluginClasses,
										r,
									)),
										(this.keyboardRowsDOM = document.createElement('div')),
										(this.keyboardRowsDOM.className = 'hg-rows'),
										n[this.options.layoutName || this.defaultName].forEach(
											function (e, n) {
												var r = e.split(' ');
												t.options.excludeFromLayout &&
													t.options.excludeFromLayout[
														t.options.layoutName || t.defaultName
													] &&
													(r = r.filter(function (e) {
														return (
															t.options.excludeFromLayout &&
															!t.options.excludeFromLayout[
																t.options.layoutName || t.defaultName
															].includes(e)
														);
													}));
												var s = document.createElement('div');
												s.className += 'hg-row';
												var u = [],
													c = [];
												r.forEach(function (e, r) {
													var l,
														f =
															!a &&
															'string' == typeof e &&
															e.length > 1 &&
															0 === e.indexOf('['),
														d =
															!a &&
															'string' == typeof e &&
															e.length > 1 &&
															e.indexOf(']') === e.length - 1;
													f && (u.push(r), (e = e.replace(/\[/g, ''))),
														d && (c.push(r), (e = e.replace(/\]/g, '')));
													var p = t.utilities.getButtonClass(e),
														h = t.utilities.getButtonDisplayName(
															e,
															t.options.display,
															t.options.mergeDisplay,
														),
														v = t.options.useButtonTag ? 'button' : 'div',
														y = document.createElement(v);
													(y.className += 'hg-button '.concat(p)),
														(l = y.classList).add.apply(
															l,
															g(t.getButtonThemeClasses(e)),
														),
														t.setDOMButtonAttributes(e, function (t, e) {
															y.setAttribute(t, e);
														}),
														(t.activeButtonClass = 'hg-activeButton'),
														!t.utilities.pointerEventsSupported() || o || i
															? o
																? ((y.ontouchstart = function (n) {
																		t.handleButtonClicked(e, n),
																			t.handleButtonMouseDown(e, n);
																  }),
																  (y.ontouchend = function (n) {
																		t.handleButtonMouseUp(e, n);
																  }),
																  (y.ontouchcancel = function (n) {
																		t.handleButtonMouseUp(e, n);
																  }))
																: ((y.onclick = function (n) {
																		(t.isMouseHold = !1),
																			t.handleButtonClicked(e, n);
																  }),
																  (y.onmousedown = function (n) {
																		t.handleButtonMouseDown(e, n);
																  }),
																  (y.onmouseup = function (n) {
																		t.handleButtonMouseUp(e, n);
																  }))
															: ((y.onpointerdown = function (n) {
																	t.handleButtonClicked(e, n),
																		t.handleButtonMouseDown(e, n);
															  }),
															  (y.onpointerup = function (n) {
																	t.handleButtonMouseUp(e, n);
															  }),
															  (y.onpointercancel = function (n) {
																	t.handleButtonMouseUp(e, n);
															  })),
														y.setAttribute('data-skBtn', e);
													var m = ''
														.concat(t.options.layoutName, '-r')
														.concat(n, 'b')
														.concat(r);
													y.setAttribute('data-skBtnUID', m);
													var b = document.createElement('span');
													(b.innerHTML = h),
														y.appendChild(b),
														t.buttonElements[e] || (t.buttonElements[e] = []),
														t.buttonElements[e].push(y),
														s.appendChild(y);
												}),
													(s = t.parseRowDOMContainers(s, n, u, c)),
													t.keyboardRowsDOM.appendChild(s);
											},
										),
										this.keyboardDOM.appendChild(this.keyboardRowsDOM),
										this.onRender(),
										this.initialized ||
											((this.initialized = !0),
											!this.utilities.pointerEventsSupported() || o || i
												? o
													? ((document.ontouchend = function (e) {
															return t.handleButtonMouseUp(void 0, e);
													  }),
													  (document.ontouchcancel = function (e) {
															return t.handleButtonMouseUp(void 0, e);
													  }),
													  (this.keyboardDOM.ontouchstart = function (e) {
															return t.handleKeyboardContainerMouseDown(e);
													  }))
													: o ||
													  ((document.onmouseup = function (e) {
															return t.handleButtonMouseUp(void 0, e);
													  }),
													  (this.keyboardDOM.onmousedown = function (e) {
															return t.handleKeyboardContainerMouseDown(e);
													  }))
												: ((document.onpointerup = function (e) {
														return t.handleButtonMouseUp(void 0, e);
												  }),
												  (this.keyboardDOM.onpointerdown = function (e) {
														return t.handleKeyboardContainerMouseDown(e);
												  })),
											this.onInit());
								},
							},
						]) && E(e.prototype, n),
						o && E(e, o),
						t
					);
				})();
			})(),
			o
		);
	})();
});
