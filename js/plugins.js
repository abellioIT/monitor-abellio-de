!(function (e) {
    return (
        (e.clock = { version: "2.0.2", locale: {} }),
        (t = []),
        (e.fn.clock = function (i) {
            var s = {
                it: {
                    weekdays: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"],
                    months: [
                        "Gennaio",
                        "Febbraio",
                        "Marzo",
                        "Aprile",
                        "Maggio",
                        "Giugno",
                        "Luglio",
                        "Agosto",
                        "Settembre",
                        "Ottobre",
                        "Novembre",
                        "Dicembre",
                    ],
                },
                en: {
                    weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    months: [
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December",
                    ],
                },
                es: {
                    weekdays: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
                    months: [
                        "Enero",
                        "Febrero",
                        "Marzo",
                        "Abril",
                        "May",
                        "junio",
                        "Julio",
                        "Agosto",
                        "Septiembre",
                        "Octubre",
                        "Noviembre",
                        "Diciembre",
                    ],
                },
                de: {
                    weekdays: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
                    months: [
                        "Januar",
                        "Februar",
                        "März",
                        "April",
                        "Mai",
                        "Juni",
                        "Juli",
                        "August",
                        "September",
                        "Oktober",
                        "November",
                        "Dezember",
                    ],
                },
                fr: {
                    weekdays: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
                    months: [
                        "Janvier",
                        "Février",
                        "Mars",
                        "Avril",
                        "May",
                        "Juin",
                        "Juillet",
                        "Août",
                        "Septembre",
                        "Octobre",
                        "Novembre",
                        "Décembre",
                    ],
                },
                ru: {
                    weekdays: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
                    months: [
                        "Январь",
                        "Февраль",
                        "Март",
                        "Апрель",
                        "Май",
                        "Июнь",
                        "Июль",
                        "Август",
                        "Сентябрь",
                        "Октябрь",
                        "Ноябрь",
                        "Декабрь",
                    ],
                },
            };
            return this.each(function () {
                e.extend(s, e.clock.locale),
                    (i = i || {}),
                    (i.timestamp = i.timestamp || "z"),
                    (y = new Date().getTime()),
                    (i.sysdiff = 0),
                    "z" != i.timestamp && (i.sysdiff = i.timestamp - y),
                    (i.langSet = i.langSet || "en"),
                    (i.format = i.format || ("en" != i.langSet ? "24" : "12")),
                    (i.calendar = i.calendar || "true"),
                    (i.seconds = i.seconds || "true"),
                    e(this).hasClass("jqclock") || e(this).addClass("jqclock");
                var r = function (t) {
                        return 10 > t && (t = "0" + t), t;
                    },
                    n = function (i, o) {
                        var a = e(i).attr("id");
                        if ("destroy" == o) clearTimeout(t[a]);
                        else {
                            m = new Date(new Date().getTime() + o.sysdiff);
                            var l = m.getHours(),
                                h = m.getMinutes(),
                                c = m.getSeconds(),
                                d = m.getDay(),
                                p = m.getDate(),
                                u = m.getMonth(),
                                f = m.getFullYear(),
                                _ = "",
                                g = "",
                                v = o.langSet;
                            "12" == o.format &&
                                ((_ = " AM"), l > 11 && (_ = " PM"), l > 12 && (l -= 12), 0 == l && (l = 12)),
                                (l = r(l)),
                                (h = r(h)),
                                (c = r(c)),
                                "false" != o.calendar &&
                                    (g =
                                        "en" == v
                                            ? "<span class='clockdate'>" +
                                              s[v].weekdays[d] +
                                              ", " +
                                              s[v].months[u] +
                                              " " +
                                              p +
                                              ", " +
                                              f +
                                              "</span>"
                                            : "<span class='clockdate'>" +
                                              s[v].weekdays[d] +
                                              ", " +
                                              p +
                                              ". " +
                                              s[v].months[u] +
                                              " " +
                                              f +
                                              "</span>"),
                                e(i).html(
                                    g +
                                        "<span class='clocktime'>" +
                                        l +
                                        ":" +
                                        h +
                                        ("true" == o.seconds ? ":" + c : "") +
                                        _ +
                                        "</span>"
                                ),
                                (t[a] = setTimeout(function () {
                                    n(e(i), o);
                                }, 1e3));
                        }
                    };
                n(e(this), i);
            });
        }),
        this
    );
})(jQuery),
    (function (t) {
        function e(t) {
            this.init(t);
        }
        (e.prototype = {
            value: 0,
            size: 100,
            startAngle: -Math.PI,
            thickness: "auto",
            fill: { gradient: ["#3aeabb", "#fdd250"] },
            emptyFill: "rgba(0, 0, 0, .1)",
            animation: { duration: 1200, easing: "circleProgressEasing" },
            animationStartValue: 0,
            reverse: !1,
            lineCap: "butt",
            constructor: e,
            el: null,
            canvas: null,
            ctx: null,
            radius: 0,
            arcFill: null,
            lastFrameValue: 0,
            init: function (e) {
                t.extend(this, e), (this.radius = this.size / 2), this.initWidget(), this.initFill(), this.draw();
            },
            initWidget: function () {
                var e = (this.canvas = this.canvas || t("<canvas>").prependTo(this.el)[0]);
                (e.width = this.size), (e.height = this.size), (this.ctx = e.getContext("2d"));
            },
            initFill: function () {
                function e() {
                    var e = t("<canvas>")[0];
                    (e.width = i.size),
                        (e.height = i.size),
                        e.getContext("2d").drawImage(u, 0, 0, n, n),
                        (i.arcFill = i.ctx.createPattern(e, "no-repeat")),
                        i.drawFrame(i.lastFrameValue);
                }
                var i = this,
                    s = this.fill,
                    r = this.ctx,
                    n = this.size;
                if (!s) throw Error("The fill is not specified!");
                if ((s.color && (this.arcFill = s.color), s.gradient)) {
                    var o = s.gradient;
                    if (1 == o.length) this.arcFill = o[0];
                    else if (o.length > 1) {
                        for (
                            var a = s.gradientAngle || 0,
                                l = s.gradientDirection || [
                                    (n / 2) * (1 - Math.cos(a)),
                                    (n / 2) * (1 + Math.sin(a)),
                                    (n / 2) * (1 + Math.cos(a)),
                                    (n / 2) * (1 - Math.sin(a)),
                                ],
                                h = r.createLinearGradient.apply(r, l),
                                c = 0;
                            c < o.length;
                            c++
                        ) {
                            var d = o[c],
                                p = c / (o.length - 1);
                            t.isArray(d) && ((p = d[1]), (d = d[0])), h.addColorStop(p, d);
                        }
                        this.arcFill = h;
                    }
                }
                if (s.image) {
                    var u;
                    s.image instanceof Image ? (u = s.image) : ((u = new Image()), (u.src = s.image)),
                        u.complete ? e() : (u.onload = e);
                }
            },
            draw: function () {
                this.animation ? this.drawAnimated(this.value) : this.drawFrame(this.value);
            },
            drawFrame: function (t) {
                (this.lastFrameValue = t),
                    this.ctx.clearRect(0, 0, this.size, this.size),
                    this.drawEmptyArc(t),
                    this.drawArc(t);
            },
            drawArc: function (t) {
                var e = this.ctx,
                    i = this.radius,
                    s = this.getThickness(),
                    r = this.startAngle;
                e.save(),
                    e.beginPath(),
                    this.reverse
                        ? e.arc(i, i, i - s / 2, r - 2 * Math.PI * t, r)
                        : e.arc(i, i, i - s / 2, r, r + 2 * Math.PI * t),
                    (e.lineWidth = s),
                    (e.lineCap = this.lineCap),
                    (e.strokeStyle = this.arcFill),
                    e.stroke(),
                    e.restore();
            },
            drawEmptyArc: function (t) {
                var e = this.ctx,
                    i = this.radius,
                    s = this.getThickness(),
                    r = this.startAngle;
                1 > t &&
                    (e.save(),
                    e.beginPath(),
                    0 >= t
                        ? e.arc(i, i, i - s / 2, 0, 2 * Math.PI)
                        : this.reverse
                          ? e.arc(i, i, i - s / 2, r, r - 2 * Math.PI * t)
                          : e.arc(i, i, i - s / 2, r + 2 * Math.PI * t, r),
                    (e.lineWidth = s),
                    (e.strokeStyle = this.emptyFill),
                    e.stroke(),
                    e.restore());
            },
            drawAnimated: function (e) {
                var i = this,
                    s = this.el,
                    r = t(this.canvas);
                r.stop(!0, !1),
                    s.trigger("circle-animation-start"),
                    r
                        .css({ animationProgress: 0 })
                        .animate(
                            { animationProgress: 1 },
                            t.extend({}, this.animation, {
                                step: function (t) {
                                    var r = i.animationStartValue * (1 - t) + e * t;
                                    i.drawFrame(r), s.trigger("circle-animation-progress", [t, r]);
                                },
                            })
                        )
                        .promise()
                        .always(function () {
                            s.trigger("circle-animation-end");
                        });
            },
            getThickness: function () {
                return t.isNumeric(this.thickness) ? this.thickness : this.size / 14;
            },
            getValue: function () {
                return this.value;
            },
            setValue: function (t) {
                this.animation && (this.animationStartValue = this.lastFrameValue), (this.value = t), this.draw();
            },
        }),
            (t.circleProgress = { defaults: e.prototype }),
            (t.easing.circleProgressEasing = function (t, e, i, s, r) {
                return (e /= r / 2) < 1 ? (s / 2) * e * e * e + i : (s / 2) * ((e -= 2) * e * e + 2) + i;
            }),
            (t.fn.circleProgress = function (i, s) {
                var r = "circle-progress",
                    n = this.data(r);
                if ("widget" == i) {
                    if (!n) throw Error('Calling "widget" method on not initialized instance is forbidden');
                    return n.canvas;
                }
                if ("value" == i) {
                    if (!n) throw Error('Calling "value" method on not initialized instance is forbidden');
                    if ("undefined" == typeof s) return n.getValue();
                    var o = arguments[1];
                    return this.each(function () {
                        t(this).data(r).setValue(o);
                    });
                }
                return this.each(function () {
                    var s = t(this),
                        n = s.data(r),
                        o = t.isPlainObject(i) ? i : {};
                    if (n) n.init(o);
                    else {
                        var a = t.extend({}, s.data());
                        "string" == typeof a.fill && (a.fill = JSON.parse(a.fill)),
                            "string" == typeof a.animation && (a.animation = JSON.parse(a.animation)),
                            (o = t.extend(a, o)),
                            (o.el = s),
                            (n = new e(o)),
                            s.data(r, n);
                    }
                });
            });
    })(jQuery); /*!
 * VERSION: 1.18.0
 * DATE: 2015-09-05
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * Includes all of the following: TweenLite, TweenMax, TimelineLite, TimelineMax, EasePack, CSSPlugin, RoundPropsPlugin, BezierPlugin, AttrPlugin, DirectionalRotationPlugin
 *
 * @license Copyright (c) 2008-2015, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
    "use strict";
    _gsScope._gsDefine(
        "TweenMax",
        ["core.Animation", "core.SimpleTimeline", "TweenLite"],
        function (t, e, i) {
            var s = function (t) {
                    var e,
                        i = [],
                        s = t.length;
                    for (e = 0; e !== s; i.push(t[e++]));
                    return i;
                },
                r = function (t, e, i) {
                    var s,
                        r,
                        n = t.cycle;
                    for (s in n) (r = n[s]), (t[s] = "function" == typeof r ? r.call(e[i], i) : r[i % r.length]);
                    delete t.cycle;
                },
                n = function (t, e, s) {
                    i.call(this, t, e, s),
                        (this._cycle = 0),
                        (this._yoyo = this.vars.yoyo === !0),
                        (this._repeat = this.vars.repeat || 0),
                        (this._repeatDelay = this.vars.repeatDelay || 0),
                        (this._dirty = !0),
                        (this.render = n.prototype.render);
                },
                o = 1e-10,
                a = i._internals,
                l = a.isSelector,
                h = a.isArray,
                c = (n.prototype = i.to({}, 0.1, {})),
                d = [];
            (n.version = "1.18.0"),
                (c.constructor = n),
                (c.kill()._gc = !1),
                (n.killTweensOf = n.killDelayedCallsTo = i.killTweensOf),
                (n.getTweensOf = i.getTweensOf),
                (n.lagSmoothing = i.lagSmoothing),
                (n.ticker = i.ticker),
                (n.render = i.render),
                (c.invalidate = function () {
                    return (
                        (this._yoyo = this.vars.yoyo === !0),
                        (this._repeat = this.vars.repeat || 0),
                        (this._repeatDelay = this.vars.repeatDelay || 0),
                        this._uncache(!0),
                        i.prototype.invalidate.call(this)
                    );
                }),
                (c.updateTo = function (t, e) {
                    var s,
                        r = this.ratio,
                        n = this.vars.immediateRender || t.immediateRender;
                    e &&
                        this._startTime < this._timeline._time &&
                        ((this._startTime = this._timeline._time),
                        this._uncache(!1),
                        this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay));
                    for (s in t) this.vars[s] = t[s];
                    if (this._initted || n)
                        if (e) (this._initted = !1), n && this.render(0, !0, !0);
                        else if (
                            (this._gc && this._enabled(!0, !1),
                            this._notifyPluginsOfEnabled && this._firstPT && i._onPluginEvent("_onDisable", this),
                            this._time / this._duration > 0.998)
                        ) {
                            var o = this._time;
                            this.render(0, !0, !1), (this._initted = !1), this.render(o, !0, !1);
                        } else if (this._time > 0 || n) {
                            (this._initted = !1), this._init();
                            for (var a, l = 1 / (1 - r), h = this._firstPT; h; )
                                (a = h.s + h.c), (h.c *= l), (h.s = a - h.c), (h = h._next);
                        }
                    return this;
                }),
                (c.render = function (t, e, i) {
                    this._initted || (0 === this._duration && this.vars.repeat && this.invalidate());
                    var s,
                        r,
                        n,
                        l,
                        h,
                        c,
                        d,
                        p,
                        u = this._dirty ? this.totalDuration() : this._totalDuration,
                        f = this._time,
                        _ = this._totalTime,
                        m = this._cycle,
                        g = this._duration,
                        v = this._rawPrevTime;
                    if (
                        (t >= u
                            ? ((this._totalTime = u),
                              (this._cycle = this._repeat),
                              this._yoyo && 0 !== (1 & this._cycle)
                                  ? ((this._time = 0), (this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0))
                                  : ((this._time = g), (this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1)),
                              this._reversed ||
                                  ((s = !0), (r = "onComplete"), (i = i || this._timeline.autoRemoveChildren)),
                              0 === g &&
                                  (this._initted || !this.vars.lazy || i) &&
                                  (this._startTime === this._timeline._duration && (t = 0),
                                  (0 === t || 0 > v || v === o) &&
                                      v !== t &&
                                      ((i = !0), v > o && (r = "onReverseComplete")),
                                  (this._rawPrevTime = p = !e || t || v === t ? t : o)))
                            : 1e-7 > t
                              ? ((this._totalTime = this._time = this._cycle = 0),
                                (this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0),
                                (0 !== _ || (0 === g && v > 0)) && ((r = "onReverseComplete"), (s = this._reversed)),
                                0 > t &&
                                    ((this._active = !1),
                                    0 === g &&
                                        (this._initted || !this.vars.lazy || i) &&
                                        (v >= 0 && (i = !0), (this._rawPrevTime = p = !e || t || v === t ? t : o))),
                                this._initted || (i = !0))
                              : ((this._totalTime = this._time = t),
                                0 !== this._repeat &&
                                    ((l = g + this._repeatDelay),
                                    (this._cycle = (this._totalTime / l) >> 0),
                                    0 !== this._cycle && this._cycle === this._totalTime / l && this._cycle--,
                                    (this._time = this._totalTime - this._cycle * l),
                                    this._yoyo && 0 !== (1 & this._cycle) && (this._time = g - this._time),
                                    this._time > g ? (this._time = g) : 0 > this._time && (this._time = 0)),
                                this._easeType
                                    ? ((h = this._time / g),
                                      (c = this._easeType),
                                      (d = this._easePower),
                                      (1 === c || (3 === c && h >= 0.5)) && (h = 1 - h),
                                      3 === c && (h *= 2),
                                      1 === d
                                          ? (h *= h)
                                          : 2 === d
                                            ? (h *= h * h)
                                            : 3 === d
                                              ? (h *= h * h * h)
                                              : 4 === d && (h *= h * h * h * h),
                                      (this.ratio =
                                          1 === c ? 1 - h : 2 === c ? h : 0.5 > this._time / g ? h / 2 : 1 - h / 2))
                                    : (this.ratio = this._ease.getRatio(this._time / g))),
                        f === this._time && !i && m === this._cycle)
                    )
                        return void (_ !== this._totalTime && this._onUpdate && (e || this._callback("onUpdate")));
                    if (!this._initted) {
                        if ((this._init(), !this._initted || this._gc)) return;
                        if (
                            !i &&
                            this._firstPT &&
                            ((this.vars.lazy !== !1 && this._duration) || (this.vars.lazy && !this._duration))
                        )
                            return (
                                (this._time = f),
                                (this._totalTime = _),
                                (this._rawPrevTime = v),
                                (this._cycle = m),
                                a.lazyTweens.push(this),
                                void (this._lazy = [t, e])
                            );
                        this._time && !s
                            ? (this.ratio = this._ease.getRatio(this._time / g))
                            : s && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1));
                    }
                    for (
                        this._lazy !== !1 && (this._lazy = !1),
                            this._active || (!this._paused && this._time !== f && t >= 0 && (this._active = !0)),
                            0 === _ &&
                                (2 === this._initted && t > 0 && this._init(),
                                this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : r || (r = "_dummyGS")),
                                this.vars.onStart &&
                                    (0 !== this._totalTime || 0 === g) &&
                                    (e || this._callback("onStart"))),
                            n = this._firstPT;
                        n;

                    )
                        n.f ? n.t[n.p](n.c * this.ratio + n.s) : (n.t[n.p] = n.c * this.ratio + n.s), (n = n._next);
                    this._onUpdate &&
                        (0 > t && this._startAt && this._startTime && this._startAt.render(t, e, i),
                        e || ((this._totalTime !== _ || s) && this._callback("onUpdate"))),
                        this._cycle !== m && (e || this._gc || (this.vars.onRepeat && this._callback("onRepeat"))),
                        r &&
                            (!this._gc || i) &&
                            (0 > t &&
                                this._startAt &&
                                !this._onUpdate &&
                                this._startTime &&
                                this._startAt.render(t, e, i),
                            s && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), (this._active = !1)),
                            !e && this.vars[r] && this._callback(r),
                            0 === g && this._rawPrevTime === o && p !== o && (this._rawPrevTime = 0));
                }),
                (n.to = function (t, e, i) {
                    return new n(t, e, i);
                }),
                (n.from = function (t, e, i) {
                    return (i.runBackwards = !0), (i.immediateRender = 0 != i.immediateRender), new n(t, e, i);
                }),
                (n.fromTo = function (t, e, i, s) {
                    return (
                        (s.startAt = i),
                        (s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender),
                        new n(t, e, s)
                    );
                }),
                (n.staggerTo = n.allTo =
                    function (t, e, o, a, c, p, u) {
                        a = a || 0;
                        var f,
                            _,
                            m,
                            g,
                            v = o.delay || 0,
                            y = [],
                            T = function () {
                                o.onComplete && o.onComplete.apply(o.onCompleteScope || this, arguments),
                                    c.apply(u || o.callbackScope || this, p || d);
                            },
                            w = o.cycle,
                            x = o.startAt && o.startAt.cycle;
                        for (
                            h(t) || ("string" == typeof t && (t = i.selector(t) || t), l(t) && (t = s(t))),
                                t = t || [],
                                0 > a && ((t = s(t)), t.reverse(), (a *= -1)),
                                f = t.length - 1,
                                m = 0;
                            f >= m;
                            m++
                        ) {
                            _ = {};
                            for (g in o) _[g] = o[g];
                            if ((w && r(_, t, m), x)) {
                                x = _.startAt = {};
                                for (g in o.startAt) x[g] = o.startAt[g];
                                r(_.startAt, t, m);
                            }
                            (_.delay = v), m === f && c && (_.onComplete = T), (y[m] = new n(t[m], e, _)), (v += a);
                        }
                        return y;
                    }),
                (n.staggerFrom = n.allFrom =
                    function (t, e, i, s, r, o, a) {
                        return (
                            (i.runBackwards = !0),
                            (i.immediateRender = 0 != i.immediateRender),
                            n.staggerTo(t, e, i, s, r, o, a)
                        );
                    }),
                (n.staggerFromTo = n.allFromTo =
                    function (t, e, i, s, r, o, a, l) {
                        return (
                            (s.startAt = i),
                            (s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender),
                            n.staggerTo(t, e, s, r, o, a, l)
                        );
                    }),
                (n.delayedCall = function (t, e, i, s, r) {
                    return new n(e, 0, {
                        delay: t,
                        onComplete: e,
                        onCompleteParams: i,
                        callbackScope: s,
                        onReverseComplete: e,
                        onReverseCompleteParams: i,
                        immediateRender: !1,
                        useFrames: r,
                        overwrite: 0,
                    });
                }),
                (n.set = function (t, e) {
                    return new n(t, 0, e);
                }),
                (n.isTweening = function (t) {
                    return i.getTweensOf(t, !0).length > 0;
                });
            var p = function (t, e) {
                    for (var s = [], r = 0, n = t._first; n; )
                        n instanceof i ? (s[r++] = n) : (e && (s[r++] = n), (s = s.concat(p(n, e))), (r = s.length)),
                            (n = n._next);
                    return s;
                },
                u = (n.getAllTweens = function (e) {
                    return p(t._rootTimeline, e).concat(p(t._rootFramesTimeline, e));
                });
            (n.killAll = function (t, i, s, r) {
                null == i && (i = !0), null == s && (s = !0);
                var n,
                    o,
                    a,
                    l = u(0 != r),
                    h = l.length,
                    c = i && s && r;
                for (a = 0; h > a; a++)
                    (o = l[a]),
                        (c || o instanceof e || ((n = o.target === o.vars.onComplete) && s) || (i && !n)) &&
                            (t ? o.totalTime(o._reversed ? 0 : o.totalDuration()) : o._enabled(!1, !1));
            }),
                (n.killChildTweensOf = function (t, e) {
                    if (null != t) {
                        var r,
                            o,
                            c,
                            d,
                            p,
                            u = a.tweenLookup;
                        if (("string" == typeof t && (t = i.selector(t) || t), l(t) && (t = s(t)), h(t)))
                            for (d = t.length; --d > -1; ) n.killChildTweensOf(t[d], e);
                        else {
                            r = [];
                            for (c in u)
                                for (o = u[c].target.parentNode; o; )
                                    o === t && (r = r.concat(u[c].tweens)), (o = o.parentNode);
                            for (p = r.length, d = 0; p > d; d++)
                                e && r[d].totalTime(r[d].totalDuration()), r[d]._enabled(!1, !1);
                        }
                    }
                });
            var f = function (t, i, s, r) {
                (i = i !== !1), (s = s !== !1), (r = r !== !1);
                for (var n, o, a = u(r), l = i && s && r, h = a.length; --h > -1; )
                    (o = a[h]),
                        (l || o instanceof e || ((n = o.target === o.vars.onComplete) && s) || (i && !n)) &&
                            o.paused(t);
            };
            return (
                (n.pauseAll = function (t, e, i) {
                    f(!0, t, e, i);
                }),
                (n.resumeAll = function (t, e, i) {
                    f(!1, t, e, i);
                }),
                (n.globalTimeScale = function (e) {
                    var s = t._rootTimeline,
                        r = i.ticker.time;
                    return arguments.length
                        ? ((e = e || o),
                          (s._startTime = r - ((r - s._startTime) * s._timeScale) / e),
                          (s = t._rootFramesTimeline),
                          (r = i.ticker.frame),
                          (s._startTime = r - ((r - s._startTime) * s._timeScale) / e),
                          (s._timeScale = t._rootTimeline._timeScale = e),
                          e)
                        : s._timeScale;
                }),
                (c.progress = function (t) {
                    return arguments.length
                        ? this.totalTime(
                              this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - t : t) +
                                  this._cycle * (this._duration + this._repeatDelay),
                              !1
                          )
                        : this._time / this.duration();
                }),
                (c.totalProgress = function (t) {
                    return arguments.length
                        ? this.totalTime(this.totalDuration() * t, !1)
                        : this._totalTime / this.totalDuration();
                }),
                (c.time = function (t, e) {
                    return arguments.length
                        ? (this._dirty && this.totalDuration(),
                          t > this._duration && (t = this._duration),
                          this._yoyo && 0 !== (1 & this._cycle)
                              ? (t = this._duration - t + this._cycle * (this._duration + this._repeatDelay))
                              : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)),
                          this.totalTime(t, e))
                        : this._time;
                }),
                (c.duration = function (e) {
                    return arguments.length ? t.prototype.duration.call(this, e) : this._duration;
                }),
                (c.totalDuration = function (t) {
                    return arguments.length
                        ? -1 === this._repeat
                            ? this
                            : this.duration((t - this._repeat * this._repeatDelay) / (this._repeat + 1))
                        : (this._dirty &&
                              ((this._totalDuration =
                                  -1 === this._repeat
                                      ? 999999999999
                                      : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat),
                              (this._dirty = !1)),
                          this._totalDuration);
                }),
                (c.repeat = function (t) {
                    return arguments.length ? ((this._repeat = t), this._uncache(!0)) : this._repeat;
                }),
                (c.repeatDelay = function (t) {
                    return arguments.length ? ((this._repeatDelay = t), this._uncache(!0)) : this._repeatDelay;
                }),
                (c.yoyo = function (t) {
                    return arguments.length ? ((this._yoyo = t), this) : this._yoyo;
                }),
                n
            );
        },
        !0
    ),
        _gsScope._gsDefine(
            "TimelineLite",
            ["core.Animation", "core.SimpleTimeline", "TweenLite"],
            function (t, e, i) {
                var s = function (t) {
                        e.call(this, t),
                            (this._labels = {}),
                            (this.autoRemoveChildren = this.vars.autoRemoveChildren === !0),
                            (this.smoothChildTiming = this.vars.smoothChildTiming === !0),
                            (this._sortChildren = !0),
                            (this._onUpdate = this.vars.onUpdate);
                        var i,
                            s,
                            r = this.vars;
                        for (s in r)
                            (i = r[s]),
                                l(i) && -1 !== i.join("").indexOf("{self}") && (r[s] = this._swapSelfInParams(i));
                        l(r.tweens) && this.add(r.tweens, 0, r.align, r.stagger);
                    },
                    r = 1e-10,
                    n = i._internals,
                    o = (s._internals = {}),
                    a = n.isSelector,
                    l = n.isArray,
                    h = n.lazyTweens,
                    c = n.lazyRender,
                    d = _gsScope._gsDefine.globals,
                    p = function (t) {
                        var e,
                            i = {};
                        for (e in t) i[e] = t[e];
                        return i;
                    },
                    u = function (t, e, i) {
                        var s,
                            r,
                            n = t.cycle;
                        for (s in n) (r = n[s]), (t[s] = "function" == typeof r ? r.call(e[i], i) : r[i % r.length]);
                        delete t.cycle;
                    },
                    f = (o.pauseCallback = function () {}),
                    _ = function (t) {
                        var e,
                            i = [],
                            s = t.length;
                        for (e = 0; e !== s; i.push(t[e++]));
                        return i;
                    },
                    m = (s.prototype = new e());
                return (
                    (s.version = "1.18.0"),
                    (m.constructor = s),
                    (m.kill()._gc = m._forcingPlayhead = m._hasPause = !1),
                    (m.to = function (t, e, s, r) {
                        var n = (s.repeat && d.TweenMax) || i;
                        return e ? this.add(new n(t, e, s), r) : this.set(t, s, r);
                    }),
                    (m.from = function (t, e, s, r) {
                        return this.add(((s.repeat && d.TweenMax) || i).from(t, e, s), r);
                    }),
                    (m.fromTo = function (t, e, s, r, n) {
                        var o = (r.repeat && d.TweenMax) || i;
                        return e ? this.add(o.fromTo(t, e, s, r), n) : this.set(t, r, n);
                    }),
                    (m.staggerTo = function (t, e, r, n, o, l, h, c) {
                        var d,
                            f,
                            m = new s({
                                onComplete: l,
                                onCompleteParams: h,
                                callbackScope: c,
                                smoothChildTiming: this.smoothChildTiming,
                            }),
                            g = r.cycle;
                        for (
                            "string" == typeof t && (t = i.selector(t) || t),
                                t = t || [],
                                a(t) && (t = _(t)),
                                n = n || 0,
                                0 > n && ((t = _(t)), t.reverse(), (n *= -1)),
                                f = 0;
                            t.length > f;
                            f++
                        )
                            (d = p(r)),
                                d.startAt && ((d.startAt = p(d.startAt)), d.startAt.cycle && u(d.startAt, t, f)),
                                g && u(d, t, f),
                                m.to(t[f], e, d, f * n);
                        return this.add(m, o);
                    }),
                    (m.staggerFrom = function (t, e, i, s, r, n, o, a) {
                        return (
                            (i.immediateRender = 0 != i.immediateRender),
                            (i.runBackwards = !0),
                            this.staggerTo(t, e, i, s, r, n, o, a)
                        );
                    }),
                    (m.staggerFromTo = function (t, e, i, s, r, n, o, a, l) {
                        return (
                            (s.startAt = i),
                            (s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender),
                            this.staggerTo(t, e, s, r, n, o, a, l)
                        );
                    }),
                    (m.call = function (t, e, s, r) {
                        return this.add(i.delayedCall(0, t, e, s), r);
                    }),
                    (m.set = function (t, e, s) {
                        return (
                            (s = this._parseTimeOrLabel(s, 0, !0)),
                            null == e.immediateRender && (e.immediateRender = s === this._time && !this._paused),
                            this.add(new i(t, 0, e), s)
                        );
                    }),
                    (s.exportRoot = function (t, e) {
                        (t = t || {}), null == t.smoothChildTiming && (t.smoothChildTiming = !0);
                        var r,
                            n,
                            o = new s(t),
                            a = o._timeline;
                        for (
                            null == e && (e = !0),
                                a._remove(o, !0),
                                o._startTime = 0,
                                o._rawPrevTime = o._time = o._totalTime = a._time,
                                r = a._first;
                            r;

                        )
                            (n = r._next),
                                (e && r instanceof i && r.target === r.vars.onComplete) ||
                                    o.add(r, r._startTime - r._delay),
                                (r = n);
                        return a.add(o, 0), o;
                    }),
                    (m.add = function (r, n, o, a) {
                        var h, c, d, p, u, f;
                        if (("number" != typeof n && (n = this._parseTimeOrLabel(n, 0, !0, r)), !(r instanceof t))) {
                            if (r instanceof Array || (r && r.push && l(r))) {
                                for (o = o || "normal", a = a || 0, h = n, c = r.length, d = 0; c > d; d++)
                                    l((p = r[d])) && (p = new s({ tweens: p })),
                                        this.add(p, h),
                                        "string" != typeof p &&
                                            "function" != typeof p &&
                                            ("sequence" === o
                                                ? (h = p._startTime + p.totalDuration() / p._timeScale)
                                                : "start" === o && (p._startTime -= p.delay())),
                                        (h += a);
                                return this._uncache(!0);
                            }
                            if ("string" == typeof r) return this.addLabel(r, n);
                            if ("function" != typeof r)
                                throw (
                                    "Cannot add " +
                                    r +
                                    " into the timeline; it is not a tween, timeline, function, or string."
                                );
                            r = i.delayedCall(0, r);
                        }
                        if (
                            (e.prototype.add.call(this, r, n),
                            (this._gc || this._time === this._duration) &&
                                !this._paused &&
                                this._duration < this.duration())
                        )
                            for (u = this, f = u.rawTime() > r._startTime; u._timeline; )
                                f && u._timeline.smoothChildTiming
                                    ? u.totalTime(u._totalTime, !0)
                                    : u._gc && u._enabled(!0, !1),
                                    (u = u._timeline);
                        return this;
                    }),
                    (m.remove = function (e) {
                        if (e instanceof t) {
                            this._remove(e, !1);
                            var i = (e._timeline = e.vars.useFrames ? t._rootFramesTimeline : t._rootTimeline);
                            return (
                                (e._startTime =
                                    (e._paused ? e._pauseTime : i._time) -
                                    (e._reversed ? e.totalDuration() - e._totalTime : e._totalTime) / e._timeScale),
                                this
                            );
                        }
                        if (e instanceof Array || (e && e.push && l(e))) {
                            for (var s = e.length; --s > -1; ) this.remove(e[s]);
                            return this;
                        }
                        return "string" == typeof e ? this.removeLabel(e) : this.kill(null, e);
                    }),
                    (m._remove = function (t, i) {
                        e.prototype._remove.call(this, t, i);
                        var s = this._last;
                        return (
                            s
                                ? this._time > s._startTime + s._totalDuration / s._timeScale &&
                                  ((this._time = this.duration()), (this._totalTime = this._totalDuration))
                                : (this._time = this._totalTime = this._duration = this._totalDuration = 0),
                            this
                        );
                    }),
                    (m.append = function (t, e) {
                        return this.add(t, this._parseTimeOrLabel(null, e, !0, t));
                    }),
                    (m.insert = m.insertMultiple =
                        function (t, e, i, s) {
                            return this.add(t, e || 0, i, s);
                        }),
                    (m.appendMultiple = function (t, e, i, s) {
                        return this.add(t, this._parseTimeOrLabel(null, e, !0, t), i, s);
                    }),
                    (m.addLabel = function (t, e) {
                        return (this._labels[t] = this._parseTimeOrLabel(e)), this;
                    }),
                    (m.addPause = function (t, e, s, r) {
                        var n = i.delayedCall(0, f, s, r || this);
                        return (
                            (n.vars.onComplete = n.vars.onReverseComplete = e),
                            (n.data = "isPause"),
                            (this._hasPause = !0),
                            this.add(n, t)
                        );
                    }),
                    (m.removeLabel = function (t) {
                        return delete this._labels[t], this;
                    }),
                    (m.getLabelTime = function (t) {
                        return null != this._labels[t] ? this._labels[t] : -1;
                    }),
                    (m._parseTimeOrLabel = function (e, i, s, r) {
                        var n;
                        if (r instanceof t && r.timeline === this) this.remove(r);
                        else if (r && (r instanceof Array || (r.push && l(r))))
                            for (n = r.length; --n > -1; )
                                r[n] instanceof t && r[n].timeline === this && this.remove(r[n]);
                        if ("string" == typeof i)
                            return this._parseTimeOrLabel(
                                i,
                                s && "number" == typeof e && null == this._labels[i] ? e - this.duration() : 0,
                                s
                            );
                        if (((i = i || 0), "string" != typeof e || (!isNaN(e) && null == this._labels[e])))
                            null == e && (e = this.duration());
                        else {
                            if (((n = e.indexOf("=")), -1 === n))
                                return null == this._labels[e]
                                    ? s
                                        ? (this._labels[e] = this.duration() + i)
                                        : i
                                    : this._labels[e] + i;
                            (i = parseInt(e.charAt(n - 1) + "1", 10) * Number(e.substr(n + 1))),
                                (e = n > 1 ? this._parseTimeOrLabel(e.substr(0, n - 1), 0, s) : this.duration());
                        }
                        return Number(e) + i;
                    }),
                    (m.seek = function (t, e) {
                        return this.totalTime("number" == typeof t ? t : this._parseTimeOrLabel(t), e !== !1);
                    }),
                    (m.stop = function () {
                        return this.paused(!0);
                    }),
                    (m.gotoAndPlay = function (t, e) {
                        return this.play(t, e);
                    }),
                    (m.gotoAndStop = function (t, e) {
                        return this.pause(t, e);
                    }),
                    (m.render = function (t, e, i) {
                        this._gc && this._enabled(!0, !1);
                        var s,
                            n,
                            o,
                            a,
                            l,
                            d,
                            p = this._dirty ? this.totalDuration() : this._totalDuration,
                            u = this._time,
                            f = this._startTime,
                            _ = this._timeScale,
                            m = this._paused;
                        if (t >= p)
                            (this._totalTime = this._time = p),
                                this._reversed ||
                                    this._hasPausedChild() ||
                                    ((n = !0),
                                    (a = "onComplete"),
                                    (l = !!this._timeline.autoRemoveChildren),
                                    0 === this._duration &&
                                        (0 === t || 0 > this._rawPrevTime || this._rawPrevTime === r) &&
                                        this._rawPrevTime !== t &&
                                        this._first &&
                                        ((l = !0), this._rawPrevTime > r && (a = "onReverseComplete"))),
                                (this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r),
                                (t = p + 1e-4);
                        else if (1e-7 > t)
                            if (
                                ((this._totalTime = this._time = 0),
                                (0 !== u ||
                                    (0 === this._duration &&
                                        this._rawPrevTime !== r &&
                                        (this._rawPrevTime > 0 || (0 > t && this._rawPrevTime >= 0)))) &&
                                    ((a = "onReverseComplete"), (n = this._reversed)),
                                0 > t)
                            )
                                (this._active = !1),
                                    this._timeline.autoRemoveChildren && this._reversed
                                        ? ((l = n = !0), (a = "onReverseComplete"))
                                        : this._rawPrevTime >= 0 && this._first && (l = !0),
                                    (this._rawPrevTime = t);
                            else {
                                if (
                                    ((this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r),
                                    0 === t && n)
                                )
                                    for (s = this._first; s && 0 === s._startTime; )
                                        s._duration || (n = !1), (s = s._next);
                                (t = 0), this._initted || (l = !0);
                            }
                        else {
                            if (this._hasPause && !this._forcingPlayhead && !e) {
                                if (t >= u)
                                    for (s = this._first; s && t >= s._startTime && !d; )
                                        s._duration ||
                                            "isPause" !== s.data ||
                                            s.ratio ||
                                            (0 === s._startTime && 0 === this._rawPrevTime) ||
                                            (d = s),
                                            (s = s._next);
                                else
                                    for (s = this._last; s && s._startTime >= t && !d; )
                                        s._duration || ("isPause" === s.data && s._rawPrevTime > 0 && (d = s)),
                                            (s = s._prev);
                                d &&
                                    ((this._time = t = d._startTime),
                                    (this._totalTime = t + this._cycle * (this._totalDuration + this._repeatDelay)));
                            }
                            this._totalTime = this._time = this._rawPrevTime = t;
                        }
                        if ((this._time !== u && this._first) || i || l || d) {
                            if (
                                (this._initted || (this._initted = !0),
                                this._active || (!this._paused && this._time !== u && t > 0 && (this._active = !0)),
                                0 === u && this.vars.onStart && 0 !== this._time && (e || this._callback("onStart")),
                                this._time >= u)
                            )
                                for (s = this._first; s && ((o = s._next), !this._paused || m); )
                                    (s._active || (s._startTime <= this._time && !s._paused && !s._gc)) &&
                                        (d === s && this.pause(),
                                        s._reversed
                                            ? s.render(
                                                  (s._dirty ? s.totalDuration() : s._totalDuration) -
                                                      (t - s._startTime) * s._timeScale,
                                                  e,
                                                  i
                                              )
                                            : s.render((t - s._startTime) * s._timeScale, e, i)),
                                        (s = o);
                            else
                                for (s = this._last; s && ((o = s._prev), !this._paused || m); ) {
                                    if (s._active || (u >= s._startTime && !s._paused && !s._gc)) {
                                        if (d === s) {
                                            for (d = s._prev; d && d.endTime() > this._time; )
                                                d.render(
                                                    d._reversed
                                                        ? d.totalDuration() - (t - d._startTime) * d._timeScale
                                                        : (t - d._startTime) * d._timeScale,
                                                    e,
                                                    i
                                                ),
                                                    (d = d._prev);
                                            (d = null), this.pause();
                                        }
                                        s._reversed
                                            ? s.render(
                                                  (s._dirty ? s.totalDuration() : s._totalDuration) -
                                                      (t - s._startTime) * s._timeScale,
                                                  e,
                                                  i
                                              )
                                            : s.render((t - s._startTime) * s._timeScale, e, i);
                                    }
                                    s = o;
                                }
                            this._onUpdate && (e || (h.length && c(), this._callback("onUpdate"))),
                                a &&
                                    (this._gc ||
                                        ((f === this._startTime || _ !== this._timeScale) &&
                                            (0 === this._time || p >= this.totalDuration()) &&
                                            (n &&
                                                (h.length && c(),
                                                this._timeline.autoRemoveChildren && this._enabled(!1, !1),
                                                (this._active = !1)),
                                            !e && this.vars[a] && this._callback(a))));
                        }
                    }),
                    (m._hasPausedChild = function () {
                        for (var t = this._first; t; ) {
                            if (t._paused || (t instanceof s && t._hasPausedChild())) return !0;
                            t = t._next;
                        }
                        return !1;
                    }),
                    (m.getChildren = function (t, e, s, r) {
                        r = r || -9999999999;
                        for (var n = [], o = this._first, a = 0; o; )
                            r > o._startTime ||
                                (o instanceof i
                                    ? e !== !1 && (n[a++] = o)
                                    : (s !== !1 && (n[a++] = o),
                                      t !== !1 && ((n = n.concat(o.getChildren(!0, e, s))), (a = n.length)))),
                                (o = o._next);
                        return n;
                    }),
                    (m.getTweensOf = function (t, e) {
                        var s,
                            r,
                            n = this._gc,
                            o = [],
                            a = 0;
                        for (n && this._enabled(!0, !0), s = i.getTweensOf(t), r = s.length; --r > -1; )
                            (s[r].timeline === this || (e && this._contains(s[r]))) && (o[a++] = s[r]);
                        return n && this._enabled(!1, !0), o;
                    }),
                    (m.recent = function () {
                        return this._recent;
                    }),
                    (m._contains = function (t) {
                        for (var e = t.timeline; e; ) {
                            if (e === this) return !0;
                            e = e.timeline;
                        }
                        return !1;
                    }),
                    (m.shiftChildren = function (t, e, i) {
                        i = i || 0;
                        for (var s, r = this._first, n = this._labels; r; )
                            r._startTime >= i && (r._startTime += t), (r = r._next);
                        if (e) for (s in n) n[s] >= i && (n[s] += t);
                        return this._uncache(!0);
                    }),
                    (m._kill = function (t, e) {
                        if (!t && !e) return this._enabled(!1, !1);
                        for (
                            var i = e ? this.getTweensOf(e) : this.getChildren(!0, !0, !1), s = i.length, r = !1;
                            --s > -1;

                        )
                            i[s]._kill(t, e) && (r = !0);
                        return r;
                    }),
                    (m.clear = function (t) {
                        var e = this.getChildren(!1, !0, !0),
                            i = e.length;
                        for (this._time = this._totalTime = 0; --i > -1; ) e[i]._enabled(!1, !1);
                        return t !== !1 && (this._labels = {}), this._uncache(!0);
                    }),
                    (m.invalidate = function () {
                        for (var e = this._first; e; ) e.invalidate(), (e = e._next);
                        return t.prototype.invalidate.call(this);
                    }),
                    (m._enabled = function (t, i) {
                        if (t === this._gc) for (var s = this._first; s; ) s._enabled(t, !0), (s = s._next);
                        return e.prototype._enabled.call(this, t, i);
                    }),
                    (m.totalTime = function () {
                        this._forcingPlayhead = !0;
                        var e = t.prototype.totalTime.apply(this, arguments);
                        return (this._forcingPlayhead = !1), e;
                    }),
                    (m.duration = function (t) {
                        return arguments.length
                            ? (0 !== this.duration() && 0 !== t && this.timeScale(this._duration / t), this)
                            : (this._dirty && this.totalDuration(), this._duration);
                    }),
                    (m.totalDuration = function (t) {
                        if (!arguments.length) {
                            if (this._dirty) {
                                for (var e, i, s = 0, r = this._last, n = 999999999999; r; )
                                    (e = r._prev),
                                        r._dirty && r.totalDuration(),
                                        r._startTime > n && this._sortChildren && !r._paused
                                            ? this.add(r, r._startTime - r._delay)
                                            : (n = r._startTime),
                                        0 > r._startTime &&
                                            !r._paused &&
                                            ((s -= r._startTime),
                                            this._timeline.smoothChildTiming &&
                                                (this._startTime += r._startTime / this._timeScale),
                                            this.shiftChildren(-r._startTime, !1, -9999999999),
                                            (n = 0)),
                                        (i = r._startTime + r._totalDuration / r._timeScale),
                                        i > s && (s = i),
                                        (r = e);
                                (this._duration = this._totalDuration = s), (this._dirty = !1);
                            }
                            return this._totalDuration;
                        }
                        return 0 !== this.totalDuration() && 0 !== t && this.timeScale(this._totalDuration / t), this;
                    }),
                    (m.paused = function (e) {
                        if (!e)
                            for (var i = this._first, s = this._time; i; )
                                i._startTime === s && "isPause" === i.data && (i._rawPrevTime = 0), (i = i._next);
                        return t.prototype.paused.apply(this, arguments);
                    }),
                    (m.usesFrames = function () {
                        for (var e = this._timeline; e._timeline; ) e = e._timeline;
                        return e === t._rootFramesTimeline;
                    }),
                    (m.rawTime = function () {
                        return this._paused
                            ? this._totalTime
                            : (this._timeline.rawTime() - this._startTime) * this._timeScale;
                    }),
                    s
                );
            },
            !0
        ),
        _gsScope._gsDefine(
            "TimelineMax",
            ["TimelineLite", "TweenLite", "easing.Ease"],
            function (t, e, i) {
                var s = function (e) {
                        t.call(this, e),
                            (this._repeat = this.vars.repeat || 0),
                            (this._repeatDelay = this.vars.repeatDelay || 0),
                            (this._cycle = 0),
                            (this._yoyo = this.vars.yoyo === !0),
                            (this._dirty = !0);
                    },
                    r = 1e-10,
                    n = e._internals,
                    o = n.lazyTweens,
                    a = n.lazyRender,
                    l = new i(null, null, 1, 0),
                    h = (s.prototype = new t());
                return (
                    (h.constructor = s),
                    (h.kill()._gc = !1),
                    (s.version = "1.18.0"),
                    (h.invalidate = function () {
                        return (
                            (this._yoyo = this.vars.yoyo === !0),
                            (this._repeat = this.vars.repeat || 0),
                            (this._repeatDelay = this.vars.repeatDelay || 0),
                            this._uncache(!0),
                            t.prototype.invalidate.call(this)
                        );
                    }),
                    (h.addCallback = function (t, i, s, r) {
                        return this.add(e.delayedCall(0, t, s, r), i);
                    }),
                    (h.removeCallback = function (t, e) {
                        if (t)
                            if (null == e) this._kill(null, t);
                            else
                                for (
                                    var i = this.getTweensOf(t, !1), s = i.length, r = this._parseTimeOrLabel(e);
                                    --s > -1;

                                )
                                    i[s]._startTime === r && i[s]._enabled(!1, !1);
                        return this;
                    }),
                    (h.removePause = function (e) {
                        return this.removeCallback(t._internals.pauseCallback, e);
                    }),
                    (h.tweenTo = function (t, i) {
                        i = i || {};
                        var s,
                            r,
                            n,
                            o = { ease: l, useFrames: this.usesFrames(), immediateRender: !1 };
                        for (r in i) o[r] = i[r];
                        return (
                            (o.time = this._parseTimeOrLabel(t)),
                            (s = Math.abs(Number(o.time) - this._time) / this._timeScale || 0.001),
                            (n = new e(this, s, o)),
                            (o.onStart = function () {
                                n.target.paused(!0),
                                    n.vars.time !== n.target.time() &&
                                        s === n.duration() &&
                                        n.duration(Math.abs(n.vars.time - n.target.time()) / n.target._timeScale),
                                    i.onStart && n._callback("onStart");
                            }),
                            n
                        );
                    }),
                    (h.tweenFromTo = function (t, e, i) {
                        (i = i || {}),
                            (t = this._parseTimeOrLabel(t)),
                            (i.startAt = { onComplete: this.seek, onCompleteParams: [t], callbackScope: this }),
                            (i.immediateRender = i.immediateRender !== !1);
                        var s = this.tweenTo(e, i);
                        return s.duration(Math.abs(s.vars.time - t) / this._timeScale || 0.001);
                    }),
                    (h.render = function (t, e, i) {
                        this._gc && this._enabled(!0, !1);
                        var s,
                            n,
                            l,
                            h,
                            c,
                            d,
                            p,
                            u = this._dirty ? this.totalDuration() : this._totalDuration,
                            f = this._duration,
                            _ = this._time,
                            m = this._totalTime,
                            g = this._startTime,
                            v = this._timeScale,
                            y = this._rawPrevTime,
                            T = this._paused,
                            w = this._cycle;
                        if (t >= u)
                            this._locked || ((this._totalTime = u), (this._cycle = this._repeat)),
                                this._reversed ||
                                    this._hasPausedChild() ||
                                    ((n = !0),
                                    (h = "onComplete"),
                                    (c = !!this._timeline.autoRemoveChildren),
                                    0 === this._duration &&
                                        (0 === t || 0 > y || y === r) &&
                                        y !== t &&
                                        this._first &&
                                        ((c = !0), y > r && (h = "onReverseComplete"))),
                                (this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r),
                                this._yoyo && 0 !== (1 & this._cycle)
                                    ? (this._time = t = 0)
                                    : ((this._time = f), (t = f + 1e-4));
                        else if (1e-7 > t)
                            if (
                                (this._locked || (this._totalTime = this._cycle = 0),
                                (this._time = 0),
                                (0 !== _ || (0 === f && y !== r && (y > 0 || (0 > t && y >= 0)) && !this._locked)) &&
                                    ((h = "onReverseComplete"), (n = this._reversed)),
                                0 > t)
                            )
                                (this._active = !1),
                                    this._timeline.autoRemoveChildren && this._reversed
                                        ? ((c = n = !0), (h = "onReverseComplete"))
                                        : y >= 0 && this._first && (c = !0),
                                    (this._rawPrevTime = t);
                            else {
                                if (
                                    ((this._rawPrevTime = f || !e || t || this._rawPrevTime === t ? t : r),
                                    0 === t && n)
                                )
                                    for (s = this._first; s && 0 === s._startTime; )
                                        s._duration || (n = !1), (s = s._next);
                                (t = 0), this._initted || (c = !0);
                            }
                        else if (
                            (0 === f && 0 > y && (c = !0),
                            (this._time = this._rawPrevTime = t),
                            this._locked ||
                                ((this._totalTime = t),
                                0 !== this._repeat &&
                                    ((d = f + this._repeatDelay),
                                    (this._cycle = (this._totalTime / d) >> 0),
                                    0 !== this._cycle && this._cycle === this._totalTime / d && this._cycle--,
                                    (this._time = this._totalTime - this._cycle * d),
                                    this._yoyo && 0 !== (1 & this._cycle) && (this._time = f - this._time),
                                    this._time > f
                                        ? ((this._time = f), (t = f + 1e-4))
                                        : 0 > this._time
                                          ? (this._time = t = 0)
                                          : (t = this._time))),
                            this._hasPause && !this._forcingPlayhead && !e)
                        ) {
                            if (((t = this._time), t >= _))
                                for (s = this._first; s && t >= s._startTime && !p; )
                                    s._duration ||
                                        "isPause" !== s.data ||
                                        s.ratio ||
                                        (0 === s._startTime && 0 === this._rawPrevTime) ||
                                        (p = s),
                                        (s = s._next);
                            else
                                for (s = this._last; s && s._startTime >= t && !p; )
                                    s._duration || ("isPause" === s.data && s._rawPrevTime > 0 && (p = s)),
                                        (s = s._prev);
                            p &&
                                ((this._time = t = p._startTime),
                                (this._totalTime = t + this._cycle * (this._totalDuration + this._repeatDelay)));
                        }
                        if (this._cycle !== w && !this._locked) {
                            var x = this._yoyo && 0 !== (1 & w),
                                b = x === (this._yoyo && 0 !== (1 & this._cycle)),
                                k = this._totalTime,
                                S = this._cycle,
                                P = this._rawPrevTime,
                                C = this._time;
                            if (
                                ((this._totalTime = w * f),
                                w > this._cycle ? (x = !x) : (this._totalTime += f),
                                (this._time = _),
                                (this._rawPrevTime = 0 === f ? y - 1e-4 : y),
                                (this._cycle = w),
                                (this._locked = !0),
                                (_ = x ? 0 : f),
                                this.render(_, e, 0 === f),
                                e || this._gc || (this.vars.onRepeat && this._callback("onRepeat")),
                                b && ((_ = x ? f + 1e-4 : -1e-4), this.render(_, !0, !1)),
                                (this._locked = !1),
                                this._paused && !T)
                            )
                                return;
                            (this._time = C), (this._totalTime = k), (this._cycle = S), (this._rawPrevTime = P);
                        }
                        if (!((this._time !== _ && this._first) || i || c || p))
                            return void (m !== this._totalTime && this._onUpdate && (e || this._callback("onUpdate")));
                        if (
                            (this._initted || (this._initted = !0),
                            this._active || (!this._paused && this._totalTime !== m && t > 0 && (this._active = !0)),
                            0 === m && this.vars.onStart && 0 !== this._totalTime && (e || this._callback("onStart")),
                            this._time >= _)
                        )
                            for (s = this._first; s && ((l = s._next), !this._paused || T); )
                                (s._active || (s._startTime <= this._time && !s._paused && !s._gc)) &&
                                    (p === s && this.pause(),
                                    s._reversed
                                        ? s.render(
                                              (s._dirty ? s.totalDuration() : s._totalDuration) -
                                                  (t - s._startTime) * s._timeScale,
                                              e,
                                              i
                                          )
                                        : s.render((t - s._startTime) * s._timeScale, e, i)),
                                    (s = l);
                        else
                            for (s = this._last; s && ((l = s._prev), !this._paused || T); ) {
                                if (s._active || (_ >= s._startTime && !s._paused && !s._gc)) {
                                    if (p === s) {
                                        for (p = s._prev; p && p.endTime() > this._time; )
                                            p.render(
                                                p._reversed
                                                    ? p.totalDuration() - (t - p._startTime) * p._timeScale
                                                    : (t - p._startTime) * p._timeScale,
                                                e,
                                                i
                                            ),
                                                (p = p._prev);
                                        (p = null), this.pause();
                                    }
                                    s._reversed
                                        ? s.render(
                                              (s._dirty ? s.totalDuration() : s._totalDuration) -
                                                  (t - s._startTime) * s._timeScale,
                                              e,
                                              i
                                          )
                                        : s.render((t - s._startTime) * s._timeScale, e, i);
                                }
                                s = l;
                            }
                        this._onUpdate && (e || (o.length && a(), this._callback("onUpdate"))),
                            h &&
                                (this._locked ||
                                    this._gc ||
                                    ((g === this._startTime || v !== this._timeScale) &&
                                        (0 === this._time || u >= this.totalDuration()) &&
                                        (n &&
                                            (o.length && a(),
                                            this._timeline.autoRemoveChildren && this._enabled(!1, !1),
                                            (this._active = !1)),
                                        !e && this.vars[h] && this._callback(h))));
                    }),
                    (h.getActive = function (t, e, i) {
                        null == t && (t = !0), null == e && (e = !0), null == i && (i = !1);
                        var s,
                            r,
                            n = [],
                            o = this.getChildren(t, e, i),
                            a = 0,
                            l = o.length;
                        for (s = 0; l > s; s++) (r = o[s]), r.isActive() && (n[a++] = r);
                        return n;
                    }),
                    (h.getLabelAfter = function (t) {
                        t || (0 !== t && (t = this._time));
                        var e,
                            i = this.getLabelsArray(),
                            s = i.length;
                        for (e = 0; s > e; e++) if (i[e].time > t) return i[e].name;
                        return null;
                    }),
                    (h.getLabelBefore = function (t) {
                        null == t && (t = this._time);
                        for (var e = this.getLabelsArray(), i = e.length; --i > -1; )
                            if (t > e[i].time) return e[i].name;
                        return null;
                    }),
                    (h.getLabelsArray = function () {
                        var t,
                            e = [],
                            i = 0;
                        for (t in this._labels) e[i++] = { time: this._labels[t], name: t };
                        return (
                            e.sort(function (t, e) {
                                return t.time - e.time;
                            }),
                            e
                        );
                    }),
                    (h.progress = function (t, e) {
                        return arguments.length
                            ? this.totalTime(
                                  this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - t : t) +
                                      this._cycle * (this._duration + this._repeatDelay),
                                  e
                              )
                            : this._time / this.duration();
                    }),
                    (h.totalProgress = function (t, e) {
                        return arguments.length
                            ? this.totalTime(this.totalDuration() * t, e)
                            : this._totalTime / this.totalDuration();
                    }),
                    (h.totalDuration = function (e) {
                        return arguments.length
                            ? -1 === this._repeat
                                ? this
                                : this.duration((e - this._repeat * this._repeatDelay) / (this._repeat + 1))
                            : (this._dirty &&
                                  (t.prototype.totalDuration.call(this),
                                  (this._totalDuration =
                                      -1 === this._repeat
                                          ? 999999999999
                                          : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat)),
                              this._totalDuration);
                    }),
                    (h.time = function (t, e) {
                        return arguments.length
                            ? (this._dirty && this.totalDuration(),
                              t > this._duration && (t = this._duration),
                              this._yoyo && 0 !== (1 & this._cycle)
                                  ? (t = this._duration - t + this._cycle * (this._duration + this._repeatDelay))
                                  : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)),
                              this.totalTime(t, e))
                            : this._time;
                    }),
                    (h.repeat = function (t) {
                        return arguments.length ? ((this._repeat = t), this._uncache(!0)) : this._repeat;
                    }),
                    (h.repeatDelay = function (t) {
                        return arguments.length ? ((this._repeatDelay = t), this._uncache(!0)) : this._repeatDelay;
                    }),
                    (h.yoyo = function (t) {
                        return arguments.length ? ((this._yoyo = t), this) : this._yoyo;
                    }),
                    (h.currentLabel = function (t) {
                        return arguments.length ? this.seek(t, !0) : this.getLabelBefore(this._time + 1e-8);
                    }),
                    s
                );
            },
            !0
        ),
        (function () {
            var t = 180 / Math.PI,
                e = [],
                i = [],
                s = [],
                r = {},
                n = _gsScope._gsDefine.globals,
                o = function (t, e, i, s) {
                    (this.a = t),
                        (this.b = e),
                        (this.c = i),
                        (this.d = s),
                        (this.da = s - t),
                        (this.ca = i - t),
                        (this.ba = e - t);
                },
                a =
                    ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
                l = function (t, e, i, s) {
                    var r = { a: t },
                        n = {},
                        o = {},
                        a = { c: s },
                        l = (t + e) / 2,
                        h = (e + i) / 2,
                        c = (i + s) / 2,
                        d = (l + h) / 2,
                        p = (h + c) / 2,
                        u = (p - d) / 8;
                    return (
                        (r.b = l + (t - l) / 4),
                        (n.b = d + u),
                        (r.c = n.a = (r.b + n.b) / 2),
                        (n.c = o.a = (d + p) / 2),
                        (o.b = p - u),
                        (a.b = c + (s - c) / 4),
                        (o.c = a.a = (o.b + a.b) / 2),
                        [r, n, o, a]
                    );
                },
                h = function (t, r, n, o, a) {
                    var h,
                        c,
                        d,
                        p,
                        u,
                        f,
                        _,
                        m,
                        g,
                        v,
                        y,
                        T,
                        w,
                        x = t.length - 1,
                        b = 0,
                        k = t[0].a;
                    for (h = 0; x > h; h++)
                        (u = t[b]),
                            (c = u.a),
                            (d = u.d),
                            (p = t[b + 1].d),
                            a
                                ? ((y = e[h]),
                                  (T = i[h]),
                                  (w = (0.25 * (T + y) * r) / (o ? 0.5 : s[h] || 0.5)),
                                  (f = d - (d - c) * (o ? 0.5 * r : 0 !== y ? w / y : 0)),
                                  (_ = d + (p - d) * (o ? 0.5 * r : 0 !== T ? w / T : 0)),
                                  (m = d - (f + (((_ - f) * ((3 * y) / (y + T) + 0.5)) / 4 || 0))))
                                : ((f = d - 0.5 * (d - c) * r), (_ = d + 0.5 * (p - d) * r), (m = d - (f + _) / 2)),
                            (f += m),
                            (_ += m),
                            (u.c = g = f),
                            (u.b = 0 !== h ? k : (k = u.a + 0.6 * (u.c - u.a))),
                            (u.da = d - c),
                            (u.ca = g - c),
                            (u.ba = k - c),
                            n ? ((v = l(c, k, g, d)), t.splice(b, 1, v[0], v[1], v[2], v[3]), (b += 4)) : b++,
                            (k = _);
                    (u = t[b]),
                        (u.b = k),
                        (u.c = k + 0.4 * (u.d - k)),
                        (u.da = u.d - u.a),
                        (u.ca = u.c - u.a),
                        (u.ba = k - u.a),
                        n && ((v = l(u.a, k, u.c, u.d)), t.splice(b, 1, v[0], v[1], v[2], v[3]));
                },
                c = function (t, s, r, n) {
                    var a,
                        l,
                        h,
                        c,
                        d,
                        p,
                        u = [];
                    if (n)
                        for (t = [n].concat(t), l = t.length; --l > -1; )
                            "string" == typeof (p = t[l][s]) &&
                                "=" === p.charAt(1) &&
                                (t[l][s] = n[s] + Number(p.charAt(0) + p.substr(2)));
                    if (((a = t.length - 2), 0 > a)) return (u[0] = new o(t[0][s], 0, 0, t[-1 > a ? 0 : 1][s])), u;
                    for (l = 0; a > l; l++)
                        (h = t[l][s]),
                            (c = t[l + 1][s]),
                            (u[l] = new o(h, 0, 0, c)),
                            r &&
                                ((d = t[l + 2][s]),
                                (e[l] = (e[l] || 0) + (c - h) * (c - h)),
                                (i[l] = (i[l] || 0) + (d - c) * (d - c)));
                    return (u[l] = new o(t[l][s], 0, 0, t[l + 1][s])), u;
                },
                d = function (t, n, o, l, d, p) {
                    var u,
                        f,
                        _,
                        m,
                        g,
                        v,
                        y,
                        T,
                        w = {},
                        x = [],
                        b = p || t[0];
                    (d = "string" == typeof d ? "," + d + "," : a), null == n && (n = 1);
                    for (f in t[0]) x.push(f);
                    if (t.length > 1) {
                        for (T = t[t.length - 1], y = !0, u = x.length; --u > -1; )
                            if (((f = x[u]), Math.abs(b[f] - T[f]) > 0.05)) {
                                y = !1;
                                break;
                            }
                        y && ((t = t.concat()), p && t.unshift(p), t.push(t[1]), (p = t[t.length - 3]));
                    }
                    for (e.length = i.length = s.length = 0, u = x.length; --u > -1; )
                        (f = x[u]), (r[f] = -1 !== d.indexOf("," + f + ",")), (w[f] = c(t, f, r[f], p));
                    for (u = e.length; --u > -1; ) (e[u] = Math.sqrt(e[u])), (i[u] = Math.sqrt(i[u]));
                    if (!l) {
                        for (u = x.length; --u > -1; )
                            if (r[f])
                                for (_ = w[x[u]], v = _.length - 1, m = 0; v > m; m++)
                                    (g = _[m + 1].da / i[m] + _[m].da / e[m]), (s[m] = (s[m] || 0) + g * g);
                        for (u = s.length; --u > -1; ) s[u] = Math.sqrt(s[u]);
                    }
                    for (u = x.length, m = o ? 4 : 1; --u > -1; )
                        (f = x[u]), (_ = w[f]), h(_, n, o, l, r[f]), y && (_.splice(0, m), _.splice(_.length - m, m));
                    return w;
                },
                p = function (t, e, i) {
                    e = e || "soft";
                    var s,
                        r,
                        n,
                        a,
                        l,
                        h,
                        c,
                        d,
                        p,
                        u,
                        f,
                        _ = {},
                        m = "cubic" === e ? 3 : 2,
                        g = "soft" === e,
                        v = [];
                    if ((g && i && (t = [i].concat(t)), null == t || m + 1 > t.length)) throw "invalid Bezier data";
                    for (p in t[0]) v.push(p);
                    for (h = v.length; --h > -1; ) {
                        for (p = v[h], _[p] = l = [], u = 0, d = t.length, c = 0; d > c; c++)
                            (s =
                                null == i
                                    ? t[c][p]
                                    : "string" == typeof (f = t[c][p]) && "=" === f.charAt(1)
                                      ? i[p] + Number(f.charAt(0) + f.substr(2))
                                      : Number(f)),
                                g && c > 1 && d - 1 > c && (l[u++] = (s + l[u - 2]) / 2),
                                (l[u++] = s);
                        for (d = u - m + 1, u = 0, c = 0; d > c; c += m)
                            (s = l[c]),
                                (r = l[c + 1]),
                                (n = l[c + 2]),
                                (a = 2 === m ? 0 : l[c + 3]),
                                (l[u++] = f =
                                    3 === m ? new o(s, r, n, a) : new o(s, (2 * r + s) / 3, (2 * r + n) / 3, n));
                        l.length = u;
                    }
                    return _;
                },
                u = function (t, e, i) {
                    for (var s, r, n, o, a, l, h, c, d, p, u, f = 1 / i, _ = t.length; --_ > -1; )
                        for (p = t[_], n = p.a, o = p.d - n, a = p.c - n, l = p.b - n, s = r = 0, c = 1; i >= c; c++)
                            (h = f * c),
                                (d = 1 - h),
                                (s = r - (r = (h * h * o + 3 * d * (h * a + d * l)) * h)),
                                (u = _ * i + c - 1),
                                (e[u] = (e[u] || 0) + s * s);
                },
                f = function (t, e) {
                    e = e >> 0 || 6;
                    var i,
                        s,
                        r,
                        n,
                        o = [],
                        a = [],
                        l = 0,
                        h = 0,
                        c = e - 1,
                        d = [],
                        p = [];
                    for (i in t) u(t[i], o, e);
                    for (r = o.length, s = 0; r > s; s++)
                        (l += Math.sqrt(o[s])),
                            (n = s % e),
                            (p[n] = l),
                            n === c && ((h += l), (n = (s / e) >> 0), (d[n] = p), (a[n] = h), (l = 0), (p = []));
                    return { length: h, lengths: a, segments: d };
                },
                _ = _gsScope._gsDefine.plugin({
                    propName: "bezier",
                    priority: -1,
                    version: "1.3.4",
                    API: 2,
                    global: !0,
                    init: function (t, e, i) {
                        (this._target = t),
                            e instanceof Array && (e = { values: e }),
                            (this._func = {}),
                            (this._round = {}),
                            (this._props = []),
                            (this._timeRes = null == e.timeResolution ? 6 : parseInt(e.timeResolution, 10));
                        var s,
                            r,
                            n,
                            o,
                            a,
                            l = e.values || [],
                            h = {},
                            c = l[0],
                            u = e.autoRotate || i.vars.orientToBezier;
                        this._autoRotate = u
                            ? u instanceof Array
                                ? u
                                : [["x", "y", "rotation", u === !0 ? 0 : Number(u) || 0]]
                            : null;
                        for (s in c) this._props.push(s);
                        for (n = this._props.length; --n > -1; )
                            (s = this._props[n]),
                                this._overwriteProps.push(s),
                                (r = this._func[s] = "function" == typeof t[s]),
                                (h[s] = r
                                    ? t[
                                          s.indexOf("set") || "function" != typeof t["get" + s.substr(3)]
                                              ? s
                                              : "get" + s.substr(3)
                                      ]()
                                    : parseFloat(t[s])),
                                a || (h[s] !== l[0][s] && (a = h));
                        if (
                            ((this._beziers =
                                "cubic" !== e.type && "quadratic" !== e.type && "soft" !== e.type
                                    ? d(
                                          l,
                                          isNaN(e.curviness) ? 1 : e.curviness,
                                          !1,
                                          "thruBasic" === e.type,
                                          e.correlate,
                                          a
                                      )
                                    : p(l, e.type, h)),
                            (this._segCount = this._beziers[s].length),
                            this._timeRes)
                        ) {
                            var _ = f(this._beziers, this._timeRes);
                            (this._length = _.length),
                                (this._lengths = _.lengths),
                                (this._segments = _.segments),
                                (this._l1 = this._li = this._s1 = this._si = 0),
                                (this._l2 = this._lengths[0]),
                                (this._curSeg = this._segments[0]),
                                (this._s2 = this._curSeg[0]),
                                (this._prec = 1 / this._curSeg.length);
                        }
                        if ((u = this._autoRotate))
                            for (
                                this._initialRotations = [],
                                    u[0] instanceof Array || (this._autoRotate = u = [u]),
                                    n = u.length;
                                --n > -1;

                            ) {
                                for (o = 0; 3 > o; o++)
                                    (s = u[n][o]),
                                        (this._func[s] =
                                            "function" == typeof t[s]
                                                ? t[
                                                      s.indexOf("set") || "function" != typeof t["get" + s.substr(3)]
                                                          ? s
                                                          : "get" + s.substr(3)
                                                  ]
                                                : !1);
                                (s = u[n][2]),
                                    (this._initialRotations[n] = this._func[s]
                                        ? this._func[s].call(this._target)
                                        : this._target[s]);
                            }
                        return (this._startRatio = i.vars.runBackwards ? 1 : 0), !0;
                    },
                    set: function (e) {
                        var i,
                            s,
                            r,
                            n,
                            o,
                            a,
                            l,
                            h,
                            c,
                            d,
                            p = this._segCount,
                            u = this._func,
                            f = this._target,
                            _ = e !== this._startRatio;
                        if (this._timeRes) {
                            if (
                                ((c = this._lengths),
                                (d = this._curSeg),
                                (e *= this._length),
                                (r = this._li),
                                e > this._l2 && p - 1 > r)
                            ) {
                                for (h = p - 1; h > r && e >= (this._l2 = c[++r]); );
                                (this._l1 = c[r - 1]),
                                    (this._li = r),
                                    (this._curSeg = d = this._segments[r]),
                                    (this._s2 = d[(this._s1 = this._si = 0)]);
                            } else if (this._l1 > e && r > 0) {
                                for (; r > 0 && (this._l1 = c[--r]) >= e; );
                                0 === r && this._l1 > e ? (this._l1 = 0) : r++,
                                    (this._l2 = c[r]),
                                    (this._li = r),
                                    (this._curSeg = d = this._segments[r]),
                                    (this._s1 = d[(this._si = d.length - 1) - 1] || 0),
                                    (this._s2 = d[this._si]);
                            }
                            if (((i = r), (e -= this._l1), (r = this._si), e > this._s2 && d.length - 1 > r)) {
                                for (h = d.length - 1; h > r && e >= (this._s2 = d[++r]); );
                                (this._s1 = d[r - 1]), (this._si = r);
                            } else if (this._s1 > e && r > 0) {
                                for (; r > 0 && (this._s1 = d[--r]) >= e; );
                                0 === r && this._s1 > e ? (this._s1 = 0) : r++, (this._s2 = d[r]), (this._si = r);
                            }
                            a = (r + (e - this._s1) / (this._s2 - this._s1)) * this._prec;
                        } else (i = 0 > e ? 0 : e >= 1 ? p - 1 : (p * e) >> 0), (a = (e - i * (1 / p)) * p);
                        for (s = 1 - a, r = this._props.length; --r > -1; )
                            (n = this._props[r]),
                                (o = this._beziers[n][i]),
                                (l = (a * a * o.da + 3 * s * (a * o.ca + s * o.ba)) * a + o.a),
                                this._round[n] && (l = Math.round(l)),
                                u[n] ? f[n](l) : (f[n] = l);
                        if (this._autoRotate) {
                            var m,
                                g,
                                v,
                                y,
                                T,
                                w,
                                x,
                                b = this._autoRotate;
                            for (r = b.length; --r > -1; )
                                (n = b[r][2]),
                                    (w = b[r][3] || 0),
                                    (x = b[r][4] === !0 ? 1 : t),
                                    (o = this._beziers[b[r][0]]),
                                    (m = this._beziers[b[r][1]]),
                                    o &&
                                        m &&
                                        ((o = o[i]),
                                        (m = m[i]),
                                        (g = o.a + (o.b - o.a) * a),
                                        (y = o.b + (o.c - o.b) * a),
                                        (g += (y - g) * a),
                                        (y += (o.c + (o.d - o.c) * a - y) * a),
                                        (v = m.a + (m.b - m.a) * a),
                                        (T = m.b + (m.c - m.b) * a),
                                        (v += (T - v) * a),
                                        (T += (m.c + (m.d - m.c) * a - T) * a),
                                        (l = _ ? Math.atan2(T - v, y - g) * x + w : this._initialRotations[r]),
                                        u[n] ? f[n](l) : (f[n] = l));
                        }
                    },
                }),
                m = _.prototype;
            (_.bezierThrough = d),
                (_.cubicToQuadratic = l),
                (_._autoCSS = !0),
                (_.quadraticToCubic = function (t, e, i) {
                    return new o(t, (2 * e + t) / 3, (2 * e + i) / 3, i);
                }),
                (_._cssRegister = function () {
                    var t = n.CSSPlugin;
                    if (t) {
                        var e = t._internals,
                            i = e._parseToProxy,
                            s = e._setPluginRatio,
                            r = e.CSSPropTween;
                        e._registerComplexSpecialProp("bezier", {
                            parser: function (t, e, n, o, a, l) {
                                e instanceof Array && (e = { values: e }), (l = new _());
                                var h,
                                    c,
                                    d,
                                    p = e.values,
                                    u = p.length - 1,
                                    f = [],
                                    m = {};
                                if (0 > u) return a;
                                for (h = 0; u >= h; h++) (d = i(t, p[h], o, a, l, u !== h)), (f[h] = d.end);
                                for (c in e) m[c] = e[c];
                                return (
                                    (m.values = f),
                                    (a = new r(t, "bezier", 0, 0, d.pt, 2)),
                                    (a.data = d),
                                    (a.plugin = l),
                                    (a.setRatio = s),
                                    0 === m.autoRotate && (m.autoRotate = !0),
                                    !m.autoRotate ||
                                        m.autoRotate instanceof Array ||
                                        ((h = m.autoRotate === !0 ? 0 : Number(m.autoRotate)),
                                        (m.autoRotate =
                                            null != d.end.left
                                                ? [["left", "top", "rotation", h, !1]]
                                                : null != d.end.x
                                                  ? [["x", "y", "rotation", h, !1]]
                                                  : !1)),
                                    m.autoRotate &&
                                        (o._transform || o._enableTransforms(!1),
                                        (d.autoRotate = o._target._gsTransform)),
                                    l._onInitTween(d.proxy, m, o._tween),
                                    a
                                );
                            },
                        });
                    }
                }),
                (m._roundProps = function (t, e) {
                    for (var i = this._overwriteProps, s = i.length; --s > -1; )
                        (t[i[s]] || t.bezier || t.bezierThrough) && (this._round[i[s]] = e);
                }),
                (m._kill = function (t) {
                    var e,
                        i,
                        s = this._props;
                    for (e in this._beziers)
                        if (e in t)
                            for (delete this._beziers[e], delete this._func[e], i = s.length; --i > -1; )
                                s[i] === e && s.splice(i, 1);
                    return this._super._kill.call(this, t);
                });
        })(),
        _gsScope._gsDefine(
            "plugins.CSSPlugin",
            ["plugins.TweenPlugin", "TweenLite"],
            function (t, e) {
                var i,
                    s,
                    r,
                    n,
                    o = function () {
                        t.call(this, "css"), (this._overwriteProps.length = 0), (this.setRatio = o.prototype.setRatio);
                    },
                    a = _gsScope._gsDefine.globals,
                    l = {},
                    h = (o.prototype = new t("css"));
                (h.constructor = o),
                    (o.version = "1.18.0"),
                    (o.API = 2),
                    (o.defaultTransformPerspective = 0),
                    (o.defaultSkewType = "compensated"),
                    (o.defaultSmoothOrigin = !0),
                    (h = "px"),
                    (o.suffixMap = {
                        top: h,
                        right: h,
                        bottom: h,
                        left: h,
                        width: h,
                        height: h,
                        fontSize: h,
                        padding: h,
                        margin: h,
                        perspective: h,
                        lineHeight: "",
                    });
                var c,
                    d,
                    p,
                    u,
                    f,
                    _,
                    m = /(?:\d|\-\d|\.\d|\-\.\d)+/g,
                    g = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
                    v = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
                    y = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
                    T = /(?:\d|\-|\+|=|#|\.)*/g,
                    w = /opacity *= *([^)]*)/i,
                    x = /opacity:([^;]*)/i,
                    b = /alpha\(opacity *=.+?\)/i,
                    k = /^(rgb|hsl)/,
                    S = /([A-Z])/g,
                    P = /-([a-z])/gi,
                    C = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
                    O = function (t, e) {
                        return e.toUpperCase();
                    },
                    A = /(?:Left|Right|Width)/i,
                    $ = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
                    R = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
                    M = /,(?=[^\)]*(?:\(|$))/gi,
                    D = Math.PI / 180,
                    z = 180 / Math.PI,
                    F = {},
                    I = document,
                    L = function (t) {
                        return I.createElementNS
                            ? I.createElementNS("http://www.w3.org/1999/xhtml", t)
                            : I.createElement(t);
                    },
                    E = L("div"),
                    X = L("img"),
                    N = (o._internals = { _specialProps: l }),
                    j = navigator.userAgent,
                    H = (function () {
                        var t = j.indexOf("Android"),
                            e = L("a");
                        return (
                            (p =
                                -1 !== j.indexOf("Safari") &&
                                -1 === j.indexOf("Chrome") &&
                                (-1 === t || Number(j.substr(t + 8, 1)) > 3)),
                            (f = p && 6 > Number(j.substr(j.indexOf("Version/") + 8, 1))),
                            (u = -1 !== j.indexOf("Firefox")),
                            (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(j) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(j)) &&
                                (_ = parseFloat(RegExp.$1)),
                            e ? ((e.style.cssText = "top:1px;opacity:.55;"), /^0.55/.test(e.style.opacity)) : !1
                        );
                    })(),
                    Y = function (t) {
                        return w.test(
                            "string" == typeof t ? t : (t.currentStyle ? t.currentStyle.filter : t.style.filter) || ""
                        )
                            ? parseFloat(RegExp.$1) / 100
                            : 1;
                    },
                    B = function (t) {
                        window.console && console.log(t);
                    },
                    W = "",
                    q = "",
                    U = function (t, e) {
                        e = e || E;
                        var i,
                            s,
                            r = e.style;
                        if (void 0 !== r[t]) return t;
                        for (
                            t = t.charAt(0).toUpperCase() + t.substr(1), i = ["O", "Moz", "ms", "Ms", "Webkit"], s = 5;
                            --s > -1 && void 0 === r[i[s] + t];

                        );
                        return s >= 0 ? ((q = 3 === s ? "ms" : i[s]), (W = "-" + q.toLowerCase() + "-"), q + t) : null;
                    },
                    V = I.defaultView ? I.defaultView.getComputedStyle : function () {},
                    G = (o.getStyle = function (t, e, i, s, r) {
                        var n;
                        return H || "opacity" !== e
                            ? (!s && t.style[e]
                                  ? (n = t.style[e])
                                  : (i = i || V(t))
                                    ? (n =
                                          i[e] ||
                                          i.getPropertyValue(e) ||
                                          i.getPropertyValue(e.replace(S, "-$1").toLowerCase()))
                                    : t.currentStyle && (n = t.currentStyle[e]),
                              null == r || (n && "none" !== n && "auto" !== n && "auto auto" !== n) ? n : r)
                            : Y(t);
                    }),
                    Z = (N.convertToPixels = function (t, i, s, r, n) {
                        if ("px" === r || !r) return s;
                        if ("auto" === r || !s) return 0;
                        var a,
                            l,
                            h,
                            c = A.test(i),
                            d = t,
                            p = E.style,
                            u = 0 > s;
                        if ((u && (s = -s), "%" === r && -1 !== i.indexOf("border")))
                            a = (s / 100) * (c ? t.clientWidth : t.clientHeight);
                        else {
                            if (
                                ((p.cssText = "border:0 solid red;position:" + G(t, "position") + ";line-height:0;"),
                                "%" !== r && d.appendChild && "v" !== r.charAt(0) && "rem" !== r)
                            )
                                p[c ? "borderLeftWidth" : "borderTopWidth"] = s + r;
                            else {
                                if (
                                    ((d = t.parentNode || I.body),
                                    (l = d._gsCache),
                                    (h = e.ticker.frame),
                                    l && c && l.time === h)
                                )
                                    return (l.width * s) / 100;
                                p[c ? "width" : "height"] = s + r;
                            }
                            d.appendChild(E),
                                (a = parseFloat(E[c ? "offsetWidth" : "offsetHeight"])),
                                d.removeChild(E),
                                c &&
                                    "%" === r &&
                                    o.cacheWidths !== !1 &&
                                    ((l = d._gsCache = d._gsCache || {}), (l.time = h), (l.width = 100 * (a / s))),
                                0 !== a || n || (a = Z(t, i, s, r, !0));
                        }
                        return u ? -a : a;
                    }),
                    Q = (N.calculateOffset = function (t, e, i) {
                        if ("absolute" !== G(t, "position", i)) return 0;
                        var s = "left" === e ? "Left" : "Top",
                            r = G(t, "margin" + s, i);
                        return t["offset" + s] - (Z(t, e, parseFloat(r), r.replace(T, "")) || 0);
                    }),
                    J = function (t, e) {
                        var i,
                            s,
                            r,
                            n = {};
                        if ((e = e || V(t, null)))
                            if ((i = e.length))
                                for (; --i > -1; )
                                    (r = e[i]),
                                        (-1 === r.indexOf("-transform") || Se === r) &&
                                            (n[r.replace(P, O)] = e.getPropertyValue(r));
                            else for (i in e) (-1 === i.indexOf("Transform") || ke === i) && (n[i] = e[i]);
                        else if ((e = t.currentStyle || t.style))
                            for (i in e) "string" == typeof i && void 0 === n[i] && (n[i.replace(P, O)] = e[i]);
                        return (
                            H || (n.opacity = Y(t)),
                            (s = Le(t, e, !1)),
                            (n.rotation = s.rotation),
                            (n.skewX = s.skewX),
                            (n.scaleX = s.scaleX),
                            (n.scaleY = s.scaleY),
                            (n.x = s.x),
                            (n.y = s.y),
                            Ce &&
                                ((n.z = s.z),
                                (n.rotationX = s.rotationX),
                                (n.rotationY = s.rotationY),
                                (n.scaleZ = s.scaleZ)),
                            n.filters && delete n.filters,
                            n
                        );
                    },
                    K = function (t, e, i, s, r) {
                        var n,
                            o,
                            a,
                            l = {},
                            h = t.style;
                        for (o in i)
                            "cssText" !== o &&
                                "length" !== o &&
                                isNaN(o) &&
                                (e[o] !== (n = i[o]) || (r && r[o])) &&
                                -1 === o.indexOf("Origin") &&
                                ("number" == typeof n || "string" == typeof n) &&
                                ((l[o] =
                                    "auto" !== n || ("left" !== o && "top" !== o)
                                        ? ("" !== n && "auto" !== n && "none" !== n) ||
                                          "string" != typeof e[o] ||
                                          "" === e[o].replace(y, "")
                                            ? n
                                            : 0
                                        : Q(t, o)),
                                void 0 !== h[o] && (a = new fe(h, o, h[o], a)));
                        if (s) for (o in s) "className" !== o && (l[o] = s[o]);
                        return { difs: l, firstMPT: a };
                    },
                    te = { width: ["Left", "Right"], height: ["Top", "Bottom"] },
                    ee = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
                    ie = function (t, e, i) {
                        var s = parseFloat("width" === e ? t.offsetWidth : t.offsetHeight),
                            r = te[e],
                            n = r.length;
                        for (i = i || V(t, null); --n > -1; )
                            (s -= parseFloat(G(t, "padding" + r[n], i, !0)) || 0),
                                (s -= parseFloat(G(t, "border" + r[n] + "Width", i, !0)) || 0);
                        return s;
                    },
                    se = function (t, e) {
                        if ("contain" === t || "auto" === t || "auto auto" === t) return t + " ";
                        (null == t || "" === t) && (t = "0 0");
                        var i = t.split(" "),
                            s = -1 !== t.indexOf("left") ? "0%" : -1 !== t.indexOf("right") ? "100%" : i[0],
                            r = -1 !== t.indexOf("top") ? "0%" : -1 !== t.indexOf("bottom") ? "100%" : i[1];
                        return (
                            null == r ? (r = "center" === s ? "50%" : "0") : "center" === r && (r = "50%"),
                            ("center" === s || (isNaN(parseFloat(s)) && -1 === (s + "").indexOf("="))) && (s = "50%"),
                            (t = s + " " + r + (i.length > 2 ? " " + i[2] : "")),
                            e &&
                                ((e.oxp = -1 !== s.indexOf("%")),
                                (e.oyp = -1 !== r.indexOf("%")),
                                (e.oxr = "=" === s.charAt(1)),
                                (e.oyr = "=" === r.charAt(1)),
                                (e.ox = parseFloat(s.replace(y, ""))),
                                (e.oy = parseFloat(r.replace(y, ""))),
                                (e.v = t)),
                            e || t
                        );
                    },
                    re = function (t, e) {
                        return "string" == typeof t && "=" === t.charAt(1)
                            ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2))
                            : parseFloat(t) - parseFloat(e);
                    },
                    ne = function (t, e) {
                        return null == t
                            ? e
                            : "string" == typeof t && "=" === t.charAt(1)
                              ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) + e
                              : parseFloat(t);
                    },
                    oe = function (t, e, i, s) {
                        var r,
                            n,
                            o,
                            a,
                            l,
                            h = 1e-6;
                        return (
                            null == t
                                ? (a = e)
                                : "number" == typeof t
                                  ? (a = t)
                                  : ((r = 360),
                                    (n = t.split("_")),
                                    (l = "=" === t.charAt(1)),
                                    (o =
                                        (l
                                            ? parseInt(t.charAt(0) + "1", 10) * parseFloat(n[0].substr(2))
                                            : parseFloat(n[0])) *
                                            (-1 === t.indexOf("rad") ? 1 : z) -
                                        (l ? 0 : e)),
                                    n.length &&
                                        (s && (s[i] = e + o),
                                        -1 !== t.indexOf("short") &&
                                            ((o %= r), o !== o % (r / 2) && (o = 0 > o ? o + r : o - r)),
                                        -1 !== t.indexOf("_cw") && 0 > o
                                            ? (o = ((o + 9999999999 * r) % r) - (0 | (o / r)) * r)
                                            : -1 !== t.indexOf("ccw") &&
                                              o > 0 &&
                                              (o = ((o - 9999999999 * r) % r) - (0 | (o / r)) * r)),
                                    (a = e + o)),
                            h > a && a > -h && (a = 0),
                            a
                        );
                    },
                    ae = {
                        aqua: [0, 255, 255],
                        lime: [0, 255, 0],
                        silver: [192, 192, 192],
                        black: [0, 0, 0],
                        maroon: [128, 0, 0],
                        teal: [0, 128, 128],
                        blue: [0, 0, 255],
                        navy: [0, 0, 128],
                        white: [255, 255, 255],
                        fuchsia: [255, 0, 255],
                        olive: [128, 128, 0],
                        yellow: [255, 255, 0],
                        orange: [255, 165, 0],
                        gray: [128, 128, 128],
                        purple: [128, 0, 128],
                        green: [0, 128, 0],
                        red: [255, 0, 0],
                        pink: [255, 192, 203],
                        cyan: [0, 255, 255],
                        transparent: [255, 255, 255, 0],
                    },
                    le = function (t, e, i) {
                        return (
                            (t = 0 > t ? t + 1 : t > 1 ? t - 1 : t),
                            0 |
                                (255 *
                                    (1 > 6 * t
                                        ? e + 6 * (i - e) * t
                                        : 0.5 > t
                                          ? i
                                          : 2 > 3 * t
                                            ? e + 6 * (i - e) * (2 / 3 - t)
                                            : e) +
                                    0.5)
                        );
                    },
                    he = (o.parseColor = function (t, e) {
                        var i, s, r, n, o, a, l, h, c, d, p;
                        if (t)
                            if ("number" == typeof t) i = [t >> 16, 255 & (t >> 8), 255 & t];
                            else {
                                if (("," === t.charAt(t.length - 1) && (t = t.substr(0, t.length - 1)), ae[t]))
                                    i = ae[t];
                                else if ("#" === t.charAt(0))
                                    4 === t.length &&
                                        ((s = t.charAt(1)),
                                        (r = t.charAt(2)),
                                        (n = t.charAt(3)),
                                        (t = "#" + s + s + r + r + n + n)),
                                        (t = parseInt(t.substr(1), 16)),
                                        (i = [t >> 16, 255 & (t >> 8), 255 & t]);
                                else if ("hsl" === t.substr(0, 3))
                                    if (((i = p = t.match(m)), e)) {
                                        if (-1 !== t.indexOf("=")) return t.match(g);
                                    } else
                                        (o = (Number(i[0]) % 360) / 360),
                                            (a = Number(i[1]) / 100),
                                            (l = Number(i[2]) / 100),
                                            (r = 0.5 >= l ? l * (a + 1) : l + a - l * a),
                                            (s = 2 * l - r),
                                            i.length > 3 && (i[3] = Number(t[3])),
                                            (i[0] = le(o + 1 / 3, s, r)),
                                            (i[1] = le(o, s, r)),
                                            (i[2] = le(o - 1 / 3, s, r));
                                else i = t.match(m) || ae.transparent;
                                (i[0] = Number(i[0])),
                                    (i[1] = Number(i[1])),
                                    (i[2] = Number(i[2])),
                                    i.length > 3 && (i[3] = Number(i[3]));
                            }
                        else i = ae.black;
                        return (
                            e &&
                                !p &&
                                ((s = i[0] / 255),
                                (r = i[1] / 255),
                                (n = i[2] / 255),
                                (h = Math.max(s, r, n)),
                                (c = Math.min(s, r, n)),
                                (l = (h + c) / 2),
                                h === c
                                    ? (o = a = 0)
                                    : ((d = h - c),
                                      (a = l > 0.5 ? d / (2 - h - c) : d / (h + c)),
                                      (o =
                                          h === s
                                              ? (r - n) / d + (n > r ? 6 : 0)
                                              : h === r
                                                ? (n - s) / d + 2
                                                : (s - r) / d + 4),
                                      (o *= 60)),
                                (i[0] = 0 | (o + 0.5)),
                                (i[1] = 0 | (100 * a + 0.5)),
                                (i[2] = 0 | (100 * l + 0.5))),
                            i
                        );
                    }),
                    ce = function (t, e) {
                        var i,
                            s,
                            r,
                            n = t.match(de) || [],
                            o = 0,
                            a = n.length ? "" : t;
                        for (i = 0; n.length > i; i++)
                            (s = n[i]),
                                (r = t.substr(o, t.indexOf(s, o) - o)),
                                (o += r.length + s.length),
                                (s = he(s, e)),
                                3 === s.length && s.push(1),
                                (a +=
                                    r +
                                    (e
                                        ? "hsla(" + s[0] + "," + s[1] + "%," + s[2] + "%," + s[3]
                                        : "rgba(" + s.join(",")) +
                                    ")");
                        return a;
                    },
                    de = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";
                for (h in ae) de += "|" + h + "\\b";
                (de = RegExp(de + ")", "gi")),
                    (o.colorStringFilter = function (t) {
                        var e,
                            i = t[0] + t[1];
                        (de.lastIndex = 0),
                            de.test(i) &&
                                ((e = -1 !== i.indexOf("hsl(") || -1 !== i.indexOf("hsla(")),
                                (t[0] = ce(t[0], e)),
                                (t[1] = ce(t[1], e)));
                    }),
                    e.defaultStringFilter || (e.defaultStringFilter = o.colorStringFilter);
                var pe = function (t, e, i, s) {
                        if (null == t)
                            return function (t) {
                                return t;
                            };
                        var r,
                            n = e ? (t.match(de) || [""])[0] : "",
                            o = t.split(n).join("").match(v) || [],
                            a = t.substr(0, t.indexOf(o[0])),
                            l = ")" === t.charAt(t.length - 1) ? ")" : "",
                            h = -1 !== t.indexOf(" ") ? " " : ",",
                            c = o.length,
                            d = c > 0 ? o[0].replace(m, "") : "";
                        return c
                            ? (r = e
                                  ? function (t) {
                                        var e, p, u, f;
                                        if ("number" == typeof t) t += d;
                                        else if (s && M.test(t)) {
                                            for (f = t.replace(M, "|").split("|"), u = 0; f.length > u; u++)
                                                f[u] = r(f[u]);
                                            return f.join(",");
                                        }
                                        if (
                                            ((e = (t.match(de) || [n])[0]),
                                            (p = t.split(e).join("").match(v) || []),
                                            (u = p.length),
                                            c > u--)
                                        )
                                            for (; c > ++u; ) p[u] = i ? p[0 | ((u - 1) / 2)] : o[u];
                                        return a + p.join(h) + h + e + l + (-1 !== t.indexOf("inset") ? " inset" : "");
                                    }
                                  : function (t) {
                                        var e, n, p;
                                        if ("number" == typeof t) t += d;
                                        else if (s && M.test(t)) {
                                            for (n = t.replace(M, "|").split("|"), p = 0; n.length > p; p++)
                                                n[p] = r(n[p]);
                                            return n.join(",");
                                        }
                                        if (((e = t.match(v) || []), (p = e.length), c > p--))
                                            for (; c > ++p; ) e[p] = i ? e[0 | ((p - 1) / 2)] : o[p];
                                        return a + e.join(h) + l;
                                    })
                            : function (t) {
                                  return t;
                              };
                    },
                    ue = function (t) {
                        return (
                            (t = t.split(",")),
                            function (e, i, s, r, n, o, a) {
                                var l,
                                    h = (i + "").split(" ");
                                for (a = {}, l = 0; 4 > l; l++) a[t[l]] = h[l] = h[l] || h[((l - 1) / 2) >> 0];
                                return r.parse(e, a, n, o);
                            }
                        );
                    },
                    fe =
                        ((N._setPluginRatio = function (t) {
                            this.plugin.setRatio(t);
                            for (var e, i, s, r, n = this.data, o = n.proxy, a = n.firstMPT, l = 1e-6; a; )
                                (e = o[a.v]),
                                    a.r ? (e = Math.round(e)) : l > e && e > -l && (e = 0),
                                    (a.t[a.p] = e),
                                    (a = a._next);
                            if ((n.autoRotate && (n.autoRotate.rotation = o.rotation), 1 === t))
                                for (a = n.firstMPT; a; ) {
                                    if (((i = a.t), i.type)) {
                                        if (1 === i.type) {
                                            for (r = i.xs0 + i.s + i.xs1, s = 1; i.l > s; s++)
                                                r += i["xn" + s] + i["xs" + (s + 1)];
                                            i.e = r;
                                        }
                                    } else i.e = i.s + i.xs0;
                                    a = a._next;
                                }
                        }),
                        function (t, e, i, s, r) {
                            (this.t = t),
                                (this.p = e),
                                (this.v = i),
                                (this.r = r),
                                s && ((s._prev = this), (this._next = s));
                        }),
                    _e =
                        ((N._parseToProxy = function (t, e, i, s, r, n) {
                            var o,
                                a,
                                l,
                                h,
                                c,
                                d = s,
                                p = {},
                                u = {},
                                f = i._transform,
                                _ = F;
                            for (
                                i._transform = null,
                                    F = e,
                                    s = c = i.parse(t, e, s, r),
                                    F = _,
                                    n &&
                                        ((i._transform = f),
                                        d && ((d._prev = null), d._prev && (d._prev._next = null)));
                                s && s !== d;

                            ) {
                                if (
                                    1 >= s.type &&
                                    ((a = s.p),
                                    (u[a] = s.s + s.c),
                                    (p[a] = s.s),
                                    n || ((h = new fe(s, "s", a, h, s.r)), (s.c = 0)),
                                    1 === s.type)
                                )
                                    for (o = s.l; --o > 0; )
                                        (l = "xn" + o),
                                            (a = s.p + "_" + l),
                                            (u[a] = s.data[l]),
                                            (p[a] = s[l]),
                                            n || (h = new fe(s, l, a, h, s.rxp[l]));
                                s = s._next;
                            }
                            return { proxy: p, end: u, firstMPT: h, pt: c };
                        }),
                        (N.CSSPropTween = function (t, e, s, r, o, a, l, h, c, d, p) {
                            (this.t = t),
                                (this.p = e),
                                (this.s = s),
                                (this.c = r),
                                (this.n = l || e),
                                t instanceof _e || n.push(this.n),
                                (this.r = h),
                                (this.type = a || 0),
                                c && ((this.pr = c), (i = !0)),
                                (this.b = void 0 === d ? s : d),
                                (this.e = void 0 === p ? s + r : p),
                                o && ((this._next = o), (o._prev = this));
                        })),
                    me = function (t, e, i, s, r, n) {
                        var o = new _e(t, e, i, s - i, r, -1, n);
                        return (o.b = i), (o.e = o.xs0 = s), o;
                    },
                    ge = (o.parseComplex = function (t, e, i, s, r, n, o, a, l, h) {
                        (i = i || n || ""), (o = new _e(t, e, 0, 0, o, h ? 2 : 1, null, !1, a, i, s)), (s += "");
                        var d,
                            p,
                            u,
                            f,
                            _,
                            v,
                            y,
                            T,
                            w,
                            x,
                            b,
                            k,
                            S,
                            P = i.split(", ").join(",").split(" "),
                            C = s.split(", ").join(",").split(" "),
                            O = P.length,
                            A = c !== !1;
                        for (
                            (-1 !== s.indexOf(",") || -1 !== i.indexOf(",")) &&
                                ((P = P.join(" ").replace(M, ", ").split(" ")),
                                (C = C.join(" ").replace(M, ", ").split(" ")),
                                (O = P.length)),
                                O !== C.length && ((P = (n || "").split(" ")), (O = P.length)),
                                o.plugin = l,
                                o.setRatio = h,
                                de.lastIndex = 0,
                                d = 0;
                            O > d;
                            d++
                        )
                            if (((f = P[d]), (_ = C[d]), (T = parseFloat(f)), T || 0 === T))
                                o.appendXtra("", T, re(_, T), _.replace(g, ""), A && -1 !== _.indexOf("px"), !0);
                            else if (r && de.test(f))
                                (k = "," === _.charAt(_.length - 1) ? ")," : ")"),
                                    (S = -1 !== _.indexOf("hsl") && H),
                                    (f = he(f, S)),
                                    (_ = he(_, S)),
                                    (w = f.length + _.length > 6),
                                    w && !H && 0 === _[3]
                                        ? ((o["xs" + o.l] += o.l ? " transparent" : "transparent"),
                                          (o.e = o.e.split(C[d]).join("transparent")))
                                        : (H || (w = !1),
                                          S
                                              ? o
                                                    .appendXtra(w ? "hsla(" : "hsl(", f[0], re(_[0], f[0]), ",", !1, !0)
                                                    .appendXtra("", f[1], re(_[1], f[1]), "%,", !1)
                                                    .appendXtra("", f[2], re(_[2], f[2]), w ? "%," : "%" + k, !1)
                                              : o
                                                    .appendXtra(w ? "rgba(" : "rgb(", f[0], _[0] - f[0], ",", !0, !0)
                                                    .appendXtra("", f[1], _[1] - f[1], ",", !0)
                                                    .appendXtra("", f[2], _[2] - f[2], w ? "," : k, !0),
                                          w &&
                                              ((f = 4 > f.length ? 1 : f[3]),
                                              o.appendXtra("", f, (4 > _.length ? 1 : _[3]) - f, k, !1))),
                                    (de.lastIndex = 0);
                            else if ((v = f.match(m))) {
                                if (((y = _.match(g)), !y || y.length !== v.length)) return o;
                                for (u = 0, p = 0; v.length > p; p++)
                                    (b = v[p]),
                                        (x = f.indexOf(b, u)),
                                        o.appendXtra(
                                            f.substr(u, x - u),
                                            Number(b),
                                            re(y[p], b),
                                            "",
                                            A && "px" === f.substr(x + b.length, 2),
                                            0 === p
                                        ),
                                        (u = x + b.length);
                                o["xs" + o.l] += f.substr(u);
                            } else o["xs" + o.l] += o.l ? " " + f : f;
                        if (-1 !== s.indexOf("=") && o.data) {
                            for (k = o.xs0 + o.data.s, d = 1; o.l > d; d++) k += o["xs" + d] + o.data["xn" + d];
                            o.e = k + o["xs" + d];
                        }
                        return o.l || ((o.type = -1), (o.xs0 = o.e)), o.xfirst || o;
                    }),
                    ve = 9;
                for (h = _e.prototype, h.l = h.pr = 0; --ve > 0; ) (h["xn" + ve] = 0), (h["xs" + ve] = "");
                (h.xs0 = ""),
                    (h._next = h._prev = h.xfirst = h.data = h.plugin = h.setRatio = h.rxp = null),
                    (h.appendXtra = function (t, e, i, s, r, n) {
                        var o = this,
                            a = o.l;
                        return (
                            (o["xs" + a] += n && a ? " " + t : t || ""),
                            i || 0 === a || o.plugin
                                ? (o.l++,
                                  (o.type = o.setRatio ? 2 : 1),
                                  (o["xs" + o.l] = s || ""),
                                  a > 0
                                      ? ((o.data["xn" + a] = e + i),
                                        (o.rxp["xn" + a] = r),
                                        (o["xn" + a] = e),
                                        o.plugin ||
                                            ((o.xfirst = new _e(o, "xn" + a, e, i, o.xfirst || o, 0, o.n, r, o.pr)),
                                            (o.xfirst.xs0 = 0)),
                                        o)
                                      : ((o.data = { s: e + i }), (o.rxp = {}), (o.s = e), (o.c = i), (o.r = r), o))
                                : ((o["xs" + a] += e + (s || "")), o)
                        );
                    });
                var ye = function (t, e) {
                        (e = e || {}),
                            (this.p = e.prefix ? U(t) || t : t),
                            (l[t] = l[this.p] = this),
                            (this.format = e.formatter || pe(e.defaultValue, e.color, e.collapsible, e.multi)),
                            e.parser && (this.parse = e.parser),
                            (this.clrs = e.color),
                            (this.multi = e.multi),
                            (this.keyword = e.keyword),
                            (this.dflt = e.defaultValue),
                            (this.pr = e.priority || 0);
                    },
                    Te = (N._registerComplexSpecialProp = function (t, e, i) {
                        "object" != typeof e && (e = { parser: i });
                        var s,
                            r,
                            n = t.split(","),
                            o = e.defaultValue;
                        for (i = i || [o], s = 0; n.length > s; s++)
                            (e.prefix = 0 === s && e.prefix), (e.defaultValue = i[s] || o), (r = new ye(n[s], e));
                    }),
                    we = function (t) {
                        if (!l[t]) {
                            var e = t.charAt(0).toUpperCase() + t.substr(1) + "Plugin";
                            Te(t, {
                                parser: function (t, i, s, r, n, o, h) {
                                    var c = a.com.greensock.plugins[e];
                                    return c
                                        ? (c._cssRegister(), l[s].parse(t, i, s, r, n, o, h))
                                        : (B("Error: " + e + " js file not loaded."), n);
                                },
                            });
                        }
                    };
                (h = ye.prototype),
                    (h.parseComplex = function (t, e, i, s, r, n) {
                        var o,
                            a,
                            l,
                            h,
                            c,
                            d,
                            p = this.keyword;
                        if (
                            (this.multi &&
                                (M.test(i) || M.test(e)
                                    ? ((a = e.replace(M, "|").split("|")), (l = i.replace(M, "|").split("|")))
                                    : p && ((a = [e]), (l = [i]))),
                            l)
                        ) {
                            for (h = l.length > a.length ? l.length : a.length, o = 0; h > o; o++)
                                (e = a[o] = a[o] || this.dflt),
                                    (i = l[o] = l[o] || this.dflt),
                                    p &&
                                        ((c = e.indexOf(p)),
                                        (d = i.indexOf(p)),
                                        c !== d &&
                                            (-1 === d
                                                ? (a[o] = a[o].split(p).join(""))
                                                : -1 === c && (a[o] += " " + p)));
                            (e = a.join(", ")), (i = l.join(", "));
                        }
                        return ge(t, this.p, e, i, this.clrs, this.dflt, s, this.pr, r, n);
                    }),
                    (h.parse = function (t, e, i, s, n, o) {
                        return this.parseComplex(
                            t.style,
                            this.format(G(t, this.p, r, !1, this.dflt)),
                            this.format(e),
                            n,
                            o
                        );
                    }),
                    (o.registerSpecialProp = function (t, e, i) {
                        Te(t, {
                            parser: function (t, s, r, n, o, a) {
                                var l = new _e(t, r, 0, 0, o, 2, r, !1, i);
                                return (l.plugin = a), (l.setRatio = e(t, s, n._tween, r)), l;
                            },
                            priority: i,
                        });
                    }),
                    (o.useSVGTransformAttr = p || u);
                var xe,
                    be =
                        "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(
                            ","
                        ),
                    ke = U("transform"),
                    Se = W + "transform",
                    Pe = U("transformOrigin"),
                    Ce = null !== U("perspective"),
                    Oe = (N.Transform = function () {
                        (this.perspective = parseFloat(o.defaultTransformPerspective) || 0),
                            (this.force3D = o.defaultForce3D !== !1 && Ce ? o.defaultForce3D || "auto" : !1);
                    }),
                    Ae = window.SVGElement,
                    $e = function (t, e, i) {
                        var s,
                            r = I.createElementNS("http://www.w3.org/2000/svg", t),
                            n = /([a-z])([A-Z])/g;
                        for (s in i) r.setAttributeNS(null, s.replace(n, "$1-$2").toLowerCase(), i[s]);
                        return e.appendChild(r), r;
                    },
                    Re = I.documentElement,
                    Me = (function () {
                        var t,
                            e,
                            i,
                            s = _ || (/Android/i.test(j) && !window.chrome);
                        return (
                            I.createElementNS &&
                                !s &&
                                ((t = $e("svg", Re)),
                                (e = $e("rect", t, { width: 100, height: 50, x: 100 })),
                                (i = e.getBoundingClientRect().width),
                                (e.style[Pe] = "50% 50%"),
                                (e.style[ke] = "scaleX(0.5)"),
                                (s = i === e.getBoundingClientRect().width && !(u && Ce)),
                                Re.removeChild(t)),
                            s
                        );
                    })(),
                    De = function (t, e, i, s, r) {
                        var n,
                            a,
                            l,
                            h,
                            c,
                            d,
                            p,
                            u,
                            f,
                            _,
                            m,
                            g,
                            v,
                            y,
                            T = t._gsTransform,
                            w = Ie(t, !0);
                        T && ((v = T.xOrigin), (y = T.yOrigin)),
                            (!s || 2 > (n = s.split(" ")).length) &&
                                ((p = t.getBBox()),
                                (e = se(e).split(" ")),
                                (n = [
                                    (-1 !== e[0].indexOf("%") ? (parseFloat(e[0]) / 100) * p.width : parseFloat(e[0])) +
                                        p.x,
                                    (-1 !== e[1].indexOf("%")
                                        ? (parseFloat(e[1]) / 100) * p.height
                                        : parseFloat(e[1])) + p.y,
                                ])),
                            (i.xOrigin = h = parseFloat(n[0])),
                            (i.yOrigin = c = parseFloat(n[1])),
                            s &&
                                w !== Fe &&
                                ((d = w[0]),
                                (p = w[1]),
                                (u = w[2]),
                                (f = w[3]),
                                (_ = w[4]),
                                (m = w[5]),
                                (g = d * f - p * u),
                                (a = h * (f / g) + c * (-u / g) + (u * m - f * _) / g),
                                (l = h * (-p / g) + c * (d / g) - (d * m - p * _) / g),
                                (h = i.xOrigin = n[0] = a),
                                (c = i.yOrigin = n[1] = l)),
                            T &&
                                (r || (r !== !1 && o.defaultSmoothOrigin !== !1)
                                    ? ((a = h - v),
                                      (l = c - y),
                                      (T.xOffset += a * w[0] + l * w[2] - a),
                                      (T.yOffset += a * w[1] + l * w[3] - l))
                                    : (T.xOffset = T.yOffset = 0)),
                            t.setAttribute("data-svg-origin", n.join(" "));
                    },
                    ze = function (t) {
                        return !!(
                            Ae &&
                            "function" == typeof t.getBBox &&
                            t.getCTM &&
                            (!t.parentNode || (t.parentNode.getBBox && t.parentNode.getCTM))
                        );
                    },
                    Fe = [1, 0, 0, 1, 0, 0],
                    Ie = function (t, e) {
                        var i,
                            s,
                            r,
                            n,
                            o,
                            a = t._gsTransform || new Oe(),
                            l = 1e5;
                        if (
                            (ke
                                ? (s = G(t, Se, null, !0))
                                : t.currentStyle &&
                                  ((s = t.currentStyle.filter.match($)),
                                  (s =
                                      s && 4 === s.length
                                          ? [
                                                s[0].substr(4),
                                                Number(s[2].substr(4)),
                                                Number(s[1].substr(4)),
                                                s[3].substr(4),
                                                a.x || 0,
                                                a.y || 0,
                                            ].join(",")
                                          : "")),
                            (i = !s || "none" === s || "matrix(1, 0, 0, 1, 0, 0)" === s),
                            (a.svg || (t.getBBox && ze(t))) &&
                                (i && -1 !== (t.style[ke] + "").indexOf("matrix") && ((s = t.style[ke]), (i = 0)),
                                (r = t.getAttribute("transform")),
                                i &&
                                    r &&
                                    (-1 !== r.indexOf("matrix")
                                        ? ((s = r), (i = 0))
                                        : -1 !== r.indexOf("translate") &&
                                          ((s = "matrix(1,0,0,1," + r.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",") + ")"),
                                          (i = 0)))),
                            i)
                        )
                            return Fe;
                        for (r = (s || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [], ve = r.length; --ve > -1; )
                            (n = Number(r[ve])),
                                (r[ve] = (o = n - (n |= 0)) ? (0 | (o * l + (0 > o ? -0.5 : 0.5))) / l + n : n);
                        return e && r.length > 6 ? [r[0], r[1], r[4], r[5], r[12], r[13]] : r;
                    },
                    Le = (N.getTransform = function (t, i, s, n) {
                        if (t._gsTransform && s && !n) return t._gsTransform;
                        var a,
                            l,
                            h,
                            c,
                            d,
                            p,
                            u = s ? t._gsTransform || new Oe() : new Oe(),
                            f = 0 > u.scaleX,
                            _ = 2e-5,
                            m = 1e5,
                            g = Ce ? parseFloat(G(t, Pe, i, !1, "0 0 0").split(" ")[2]) || u.zOrigin || 0 : 0,
                            v = parseFloat(o.defaultTransformPerspective) || 0;
                        if (
                            ((u.svg = !(!t.getBBox || !ze(t))),
                            u.svg &&
                                (De(t, G(t, Pe, r, !1, "50% 50%") + "", u, t.getAttribute("data-svg-origin")),
                                (xe = o.useSVGTransformAttr || Me)),
                            (a = Ie(t)),
                            a !== Fe)
                        ) {
                            if (16 === a.length) {
                                var y,
                                    T,
                                    w,
                                    x,
                                    b,
                                    k = a[0],
                                    S = a[1],
                                    P = a[2],
                                    C = a[3],
                                    O = a[4],
                                    A = a[5],
                                    $ = a[6],
                                    R = a[7],
                                    M = a[8],
                                    D = a[9],
                                    F = a[10],
                                    I = a[12],
                                    L = a[13],
                                    E = a[14],
                                    X = a[11],
                                    N = Math.atan2($, F);
                                u.zOrigin &&
                                    ((E = -u.zOrigin),
                                    (I = M * E - a[12]),
                                    (L = D * E - a[13]),
                                    (E = F * E + u.zOrigin - a[14])),
                                    (u.rotationX = N * z),
                                    N &&
                                        ((x = Math.cos(-N)),
                                        (b = Math.sin(-N)),
                                        (y = O * x + M * b),
                                        (T = A * x + D * b),
                                        (w = $ * x + F * b),
                                        (M = O * -b + M * x),
                                        (D = A * -b + D * x),
                                        (F = $ * -b + F * x),
                                        (X = R * -b + X * x),
                                        (O = y),
                                        (A = T),
                                        ($ = w)),
                                    (N = Math.atan2(M, F)),
                                    (u.rotationY = N * z),
                                    N &&
                                        ((x = Math.cos(-N)),
                                        (b = Math.sin(-N)),
                                        (y = k * x - M * b),
                                        (T = S * x - D * b),
                                        (w = P * x - F * b),
                                        (D = S * b + D * x),
                                        (F = P * b + F * x),
                                        (X = C * b + X * x),
                                        (k = y),
                                        (S = T),
                                        (P = w)),
                                    (N = Math.atan2(S, k)),
                                    (u.rotation = N * z),
                                    N &&
                                        ((x = Math.cos(-N)),
                                        (b = Math.sin(-N)),
                                        (k = k * x + O * b),
                                        (T = S * x + A * b),
                                        (A = S * -b + A * x),
                                        ($ = P * -b + $ * x),
                                        (S = T)),
                                    u.rotationX &&
                                        Math.abs(u.rotationX) + Math.abs(u.rotation) > 359.9 &&
                                        ((u.rotationX = u.rotation = 0), (u.rotationY += 180)),
                                    (u.scaleX = (0 | (Math.sqrt(k * k + S * S) * m + 0.5)) / m),
                                    (u.scaleY = (0 | (Math.sqrt(A * A + D * D) * m + 0.5)) / m),
                                    (u.scaleZ = (0 | (Math.sqrt($ * $ + F * F) * m + 0.5)) / m),
                                    (u.skewX = 0),
                                    (u.perspective = X ? 1 / (0 > X ? -X : X) : 0),
                                    (u.x = I),
                                    (u.y = L),
                                    (u.z = E),
                                    u.svg &&
                                        ((u.x -= u.xOrigin - (u.xOrigin * k - u.yOrigin * O)),
                                        (u.y -= u.yOrigin - (u.yOrigin * S - u.xOrigin * A)));
                            } else if (
                                !(
                                    (Ce &&
                                        !n &&
                                        a.length &&
                                        u.x === a[4] &&
                                        u.y === a[5] &&
                                        (u.rotationX || u.rotationY)) ||
                                    (void 0 !== u.x && "none" === G(t, "display", i))
                                )
                            ) {
                                var j = a.length >= 6,
                                    H = j ? a[0] : 1,
                                    Y = a[1] || 0,
                                    B = a[2] || 0,
                                    W = j ? a[3] : 1;
                                (u.x = a[4] || 0),
                                    (u.y = a[5] || 0),
                                    (h = Math.sqrt(H * H + Y * Y)),
                                    (c = Math.sqrt(W * W + B * B)),
                                    (d = H || Y ? Math.atan2(Y, H) * z : u.rotation || 0),
                                    (p = B || W ? Math.atan2(B, W) * z + d : u.skewX || 0),
                                    Math.abs(p) > 90 &&
                                        270 > Math.abs(p) &&
                                        (f
                                            ? ((h *= -1), (p += 0 >= d ? 180 : -180), (d += 0 >= d ? 180 : -180))
                                            : ((c *= -1), (p += 0 >= p ? 180 : -180))),
                                    (u.scaleX = h),
                                    (u.scaleY = c),
                                    (u.rotation = d),
                                    (u.skewX = p),
                                    Ce && ((u.rotationX = u.rotationY = u.z = 0), (u.perspective = v), (u.scaleZ = 1)),
                                    u.svg &&
                                        ((u.x -= u.xOrigin - (u.xOrigin * H + u.yOrigin * B)),
                                        (u.y -= u.yOrigin - (u.xOrigin * Y + u.yOrigin * W)));
                            }
                            u.zOrigin = g;
                            for (l in u) _ > u[l] && u[l] > -_ && (u[l] = 0);
                        }
                        return (
                            s &&
                                ((t._gsTransform = u),
                                u.svg &&
                                    (xe && t.style[ke]
                                        ? e.delayedCall(0.001, function () {
                                              je(t.style, ke);
                                          })
                                        : !xe &&
                                          t.getAttribute("transform") &&
                                          e.delayedCall(0.001, function () {
                                              t.removeAttribute("transform");
                                          }))),
                            u
                        );
                    }),
                    Ee = function (t) {
                        var e,
                            i,
                            s = this.data,
                            r = -s.rotation * D,
                            n = r + s.skewX * D,
                            o = 1e5,
                            a = (0 | (Math.cos(r) * s.scaleX * o)) / o,
                            l = (0 | (Math.sin(r) * s.scaleX * o)) / o,
                            h = (0 | (Math.sin(n) * -s.scaleY * o)) / o,
                            c = (0 | (Math.cos(n) * s.scaleY * o)) / o,
                            d = this.t.style,
                            p = this.t.currentStyle;
                        if (p) {
                            (i = l), (l = -h), (h = -i), (e = p.filter), (d.filter = "");
                            var u,
                                f,
                                m = this.t.offsetWidth,
                                g = this.t.offsetHeight,
                                v = "absolute" !== p.position,
                                y =
                                    "progid:DXImageTransform.Microsoft.Matrix(M11=" +
                                    a +
                                    ", M12=" +
                                    l +
                                    ", M21=" +
                                    h +
                                    ", M22=" +
                                    c,
                                x = s.x + (m * s.xPercent) / 100,
                                b = s.y + (g * s.yPercent) / 100;
                            if (
                                (null != s.ox &&
                                    ((u = (s.oxp ? 0.01 * m * s.ox : s.ox) - m / 2),
                                    (f = (s.oyp ? 0.01 * g * s.oy : s.oy) - g / 2),
                                    (x += u - (u * a + f * l)),
                                    (b += f - (u * h + f * c))),
                                v
                                    ? ((u = m / 2),
                                      (f = g / 2),
                                      (y +=
                                          ", Dx=" +
                                          (u - (u * a + f * l) + x) +
                                          ", Dy=" +
                                          (f - (u * h + f * c) + b) +
                                          ")"))
                                    : (y += ", sizingMethod='auto expand')"),
                                (d.filter =
                                    -1 !== e.indexOf("DXImageTransform.Microsoft.Matrix(")
                                        ? e.replace(R, y)
                                        : y + " " + e),
                                (0 === t || 1 === t) &&
                                    1 === a &&
                                    0 === l &&
                                    0 === h &&
                                    1 === c &&
                                    ((v && -1 === y.indexOf("Dx=0, Dy=0")) ||
                                        (w.test(e) && 100 !== parseFloat(RegExp.$1)) ||
                                        (-1 === e.indexOf("gradient(" && e.indexOf("Alpha")) &&
                                            d.removeAttribute("filter"))),
                                !v)
                            ) {
                                var k,
                                    S,
                                    P,
                                    C = 8 > _ ? 1 : -1;
                                for (
                                    u = s.ieOffsetX || 0,
                                        f = s.ieOffsetY || 0,
                                        s.ieOffsetX = Math.round(
                                            (m - ((0 > a ? -a : a) * m + (0 > l ? -l : l) * g)) / 2 + x
                                        ),
                                        s.ieOffsetY = Math.round(
                                            (g - ((0 > c ? -c : c) * g + (0 > h ? -h : h) * m)) / 2 + b
                                        ),
                                        ve = 0;
                                    4 > ve;
                                    ve++
                                )
                                    (S = ee[ve]),
                                        (k = p[S]),
                                        (i =
                                            -1 !== k.indexOf("px")
                                                ? parseFloat(k)
                                                : Z(this.t, S, parseFloat(k), k.replace(T, "")) || 0),
                                        (P =
                                            i !== s[S]
                                                ? 2 > ve
                                                    ? -s.ieOffsetX
                                                    : -s.ieOffsetY
                                                : 2 > ve
                                                  ? u - s.ieOffsetX
                                                  : f - s.ieOffsetY),
                                        (d[S] = (s[S] = Math.round(i - P * (0 === ve || 2 === ve ? 1 : C))) + "px");
                            }
                        }
                    },
                    Xe =
                        (N.set3DTransformRatio =
                        N.setTransformRatio =
                            function (t) {
                                var e,
                                    i,
                                    s,
                                    r,
                                    n,
                                    o,
                                    a,
                                    l,
                                    h,
                                    c,
                                    d,
                                    p,
                                    f,
                                    _,
                                    m,
                                    g,
                                    v,
                                    y,
                                    T,
                                    w,
                                    x,
                                    b,
                                    k,
                                    S = this.data,
                                    P = this.t.style,
                                    C = S.rotation,
                                    O = S.rotationX,
                                    A = S.rotationY,
                                    $ = S.scaleX,
                                    R = S.scaleY,
                                    M = S.scaleZ,
                                    z = S.x,
                                    F = S.y,
                                    I = S.z,
                                    L = S.svg,
                                    E = S.perspective,
                                    X = S.force3D;
                                if (
                                    !(
                                        (((1 !== t && 0 !== t) ||
                                            "auto" !== X ||
                                            (this.tween._totalTime !== this.tween._totalDuration &&
                                                this.tween._totalTime)) &&
                                            X) ||
                                        I ||
                                        E ||
                                        A ||
                                        O
                                    ) ||
                                    (xe && L) ||
                                    !Ce
                                )
                                    return void (C || S.skewX || L
                                        ? ((C *= D),
                                          (b = S.skewX * D),
                                          (k = 1e5),
                                          (e = Math.cos(C) * $),
                                          (r = Math.sin(C) * $),
                                          (i = Math.sin(C - b) * -R),
                                          (n = Math.cos(C - b) * R),
                                          b &&
                                              "simple" === S.skewType &&
                                              ((v = Math.tan(b)),
                                              (v = Math.sqrt(1 + v * v)),
                                              (i *= v),
                                              (n *= v),
                                              S.skewY && ((e *= v), (r *= v))),
                                          L &&
                                              ((z += S.xOrigin - (S.xOrigin * e + S.yOrigin * i) + S.xOffset),
                                              (F += S.yOrigin - (S.xOrigin * r + S.yOrigin * n) + S.yOffset),
                                              xe &&
                                                  (S.xPercent || S.yPercent) &&
                                                  ((_ = this.t.getBBox()),
                                                  (z += 0.01 * S.xPercent * _.width),
                                                  (F += 0.01 * S.yPercent * _.height)),
                                              (_ = 1e-6),
                                              _ > z && z > -_ && (z = 0),
                                              _ > F && F > -_ && (F = 0)),
                                          (T =
                                              (0 | (e * k)) / k +
                                              "," +
                                              (0 | (r * k)) / k +
                                              "," +
                                              (0 | (i * k)) / k +
                                              "," +
                                              (0 | (n * k)) / k +
                                              "," +
                                              z +
                                              "," +
                                              F +
                                              ")"),
                                          L && xe
                                              ? this.t.setAttribute("transform", "matrix(" + T)
                                              : (P[ke] =
                                                    (S.xPercent || S.yPercent
                                                        ? "translate(" + S.xPercent + "%," + S.yPercent + "%) matrix("
                                                        : "matrix(") + T))
                                        : (P[ke] =
                                              (S.xPercent || S.yPercent
                                                  ? "translate(" + S.xPercent + "%," + S.yPercent + "%) matrix("
                                                  : "matrix(") +
                                              $ +
                                              ",0,0," +
                                              R +
                                              "," +
                                              z +
                                              "," +
                                              F +
                                              ")"));
                                if (
                                    (u &&
                                        ((_ = 1e-4),
                                        _ > $ && $ > -_ && ($ = M = 2e-5),
                                        _ > R && R > -_ && (R = M = 2e-5),
                                        !E || S.z || S.rotationX || S.rotationY || (E = 0)),
                                    C || S.skewX)
                                )
                                    (C *= D),
                                        (m = e = Math.cos(C)),
                                        (g = r = Math.sin(C)),
                                        S.skewX &&
                                            ((C -= S.skewX * D),
                                            (m = Math.cos(C)),
                                            (g = Math.sin(C)),
                                            "simple" === S.skewType &&
                                                ((v = Math.tan(S.skewX * D)),
                                                (v = Math.sqrt(1 + v * v)),
                                                (m *= v),
                                                (g *= v),
                                                S.skewY && ((e *= v), (r *= v)))),
                                        (i = -g),
                                        (n = m);
                                else {
                                    if (!(A || O || 1 !== M || E || L))
                                        return void (P[ke] =
                                            (S.xPercent || S.yPercent
                                                ? "translate(" + S.xPercent + "%," + S.yPercent + "%) translate3d("
                                                : "translate3d(") +
                                            z +
                                            "px," +
                                            F +
                                            "px," +
                                            I +
                                            "px)" +
                                            (1 !== $ || 1 !== R ? " scale(" + $ + "," + R + ")" : ""));
                                    (e = n = 1), (i = r = 0);
                                }
                                (h = 1),
                                    (s = o = a = l = c = d = 0),
                                    (p = E ? -1 / E : 0),
                                    (f = S.zOrigin),
                                    (_ = 1e-6),
                                    (w = ","),
                                    (x = "0"),
                                    (C = A * D),
                                    C &&
                                        ((m = Math.cos(C)),
                                        (g = Math.sin(C)),
                                        (a = -g),
                                        (c = p * -g),
                                        (s = e * g),
                                        (o = r * g),
                                        (h = m),
                                        (p *= m),
                                        (e *= m),
                                        (r *= m)),
                                    (C = O * D),
                                    C &&
                                        ((m = Math.cos(C)),
                                        (g = Math.sin(C)),
                                        (v = i * m + s * g),
                                        (y = n * m + o * g),
                                        (l = h * g),
                                        (d = p * g),
                                        (s = i * -g + s * m),
                                        (o = n * -g + o * m),
                                        (h *= m),
                                        (p *= m),
                                        (i = v),
                                        (n = y)),
                                    1 !== M && ((s *= M), (o *= M), (h *= M), (p *= M)),
                                    1 !== R && ((i *= R), (n *= R), (l *= R), (d *= R)),
                                    1 !== $ && ((e *= $), (r *= $), (a *= $), (c *= $)),
                                    (f || L) &&
                                        (f && ((z += s * -f), (F += o * -f), (I += h * -f + f)),
                                        L &&
                                            ((z += S.xOrigin - (S.xOrigin * e + S.yOrigin * i) + S.xOffset),
                                            (F += S.yOrigin - (S.xOrigin * r + S.yOrigin * n) + S.yOffset)),
                                        _ > z && z > -_ && (z = x),
                                        _ > F && F > -_ && (F = x),
                                        _ > I && I > -_ && (I = 0)),
                                    (T =
                                        S.xPercent || S.yPercent
                                            ? "translate(" + S.xPercent + "%," + S.yPercent + "%) matrix3d("
                                            : "matrix3d("),
                                    (T +=
                                        (_ > e && e > -_ ? x : e) +
                                        w +
                                        (_ > r && r > -_ ? x : r) +
                                        w +
                                        (_ > a && a > -_ ? x : a)),
                                    (T +=
                                        w +
                                        (_ > c && c > -_ ? x : c) +
                                        w +
                                        (_ > i && i > -_ ? x : i) +
                                        w +
                                        (_ > n && n > -_ ? x : n)),
                                    O || A
                                        ? ((T +=
                                              w +
                                              (_ > l && l > -_ ? x : l) +
                                              w +
                                              (_ > d && d > -_ ? x : d) +
                                              w +
                                              (_ > s && s > -_ ? x : s)),
                                          (T +=
                                              w +
                                              (_ > o && o > -_ ? x : o) +
                                              w +
                                              (_ > h && h > -_ ? x : h) +
                                              w +
                                              (_ > p && p > -_ ? x : p) +
                                              w))
                                        : (T += ",0,0,0,0,1,0,"),
                                    (T += z + w + F + w + I + w + (E ? 1 + -I / E : 1) + ")"),
                                    (P[ke] = T);
                            });
                (h = Oe.prototype),
                    (h.x =
                        h.y =
                        h.z =
                        h.skewX =
                        h.skewY =
                        h.rotation =
                        h.rotationX =
                        h.rotationY =
                        h.zOrigin =
                        h.xPercent =
                        h.yPercent =
                        h.xOffset =
                        h.yOffset =
                            0),
                    (h.scaleX = h.scaleY = h.scaleZ = 1),
                    Te(
                        "transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin",
                        {
                            parser: function (t, e, i, s, n, a, l) {
                                if (s._lastParsedTransform === l) return n;
                                s._lastParsedTransform = l;
                                var h,
                                    c,
                                    d,
                                    p,
                                    u,
                                    f,
                                    _,
                                    m,
                                    g,
                                    v,
                                    y = t._gsTransform,
                                    T = t.style,
                                    w = 1e-6,
                                    x = be.length,
                                    b = l,
                                    k = {},
                                    S = "transformOrigin";
                                if (
                                    (l.display
                                        ? ((p = G(t, "display")),
                                          (T.display = "block"),
                                          (h = Le(t, r, !0, l.parseTransform)),
                                          (T.display = p))
                                        : (h = Le(t, r, !0, l.parseTransform)),
                                    (s._transform = h),
                                    "string" == typeof b.transform && ke)
                                )
                                    (p = E.style),
                                        (p[ke] = b.transform),
                                        (p.display = "block"),
                                        (p.position = "absolute"),
                                        I.body.appendChild(E),
                                        (c = Le(E, null, !1)),
                                        I.body.removeChild(E),
                                        c.perspective || (c.perspective = h.perspective),
                                        null != b.xPercent && (c.xPercent = ne(b.xPercent, h.xPercent)),
                                        null != b.yPercent && (c.yPercent = ne(b.yPercent, h.yPercent));
                                else if ("object" == typeof b) {
                                    if (
                                        ((c = {
                                            scaleX: ne(null != b.scaleX ? b.scaleX : b.scale, h.scaleX),
                                            scaleY: ne(null != b.scaleY ? b.scaleY : b.scale, h.scaleY),
                                            scaleZ: ne(b.scaleZ, h.scaleZ),
                                            x: ne(b.x, h.x),
                                            y: ne(b.y, h.y),
                                            z: ne(b.z, h.z),
                                            xPercent: ne(b.xPercent, h.xPercent),
                                            yPercent: ne(b.yPercent, h.yPercent),
                                            perspective: ne(b.transformPerspective, h.perspective),
                                        }),
                                        (m = b.directionalRotation),
                                        null != m)
                                    )
                                        if ("object" == typeof m) for (p in m) b[p] = m[p];
                                        else b.rotation = m;
                                    "string" == typeof b.x &&
                                        -1 !== b.x.indexOf("%") &&
                                        ((c.x = 0), (c.xPercent = ne(b.x, h.xPercent))),
                                        "string" == typeof b.y &&
                                            -1 !== b.y.indexOf("%") &&
                                            ((c.y = 0), (c.yPercent = ne(b.y, h.yPercent))),
                                        (c.rotation = oe(
                                            "rotation" in b
                                                ? b.rotation
                                                : "shortRotation" in b
                                                  ? b.shortRotation + "_short"
                                                  : "rotationZ" in b
                                                    ? b.rotationZ
                                                    : h.rotation,
                                            h.rotation,
                                            "rotation",
                                            k
                                        )),
                                        Ce &&
                                            ((c.rotationX = oe(
                                                "rotationX" in b
                                                    ? b.rotationX
                                                    : "shortRotationX" in b
                                                      ? b.shortRotationX + "_short"
                                                      : h.rotationX || 0,
                                                h.rotationX,
                                                "rotationX",
                                                k
                                            )),
                                            (c.rotationY = oe(
                                                "rotationY" in b
                                                    ? b.rotationY
                                                    : "shortRotationY" in b
                                                      ? b.shortRotationY + "_short"
                                                      : h.rotationY || 0,
                                                h.rotationY,
                                                "rotationY",
                                                k
                                            ))),
                                        (c.skewX = null == b.skewX ? h.skewX : oe(b.skewX, h.skewX)),
                                        (c.skewY = null == b.skewY ? h.skewY : oe(b.skewY, h.skewY)),
                                        (d = c.skewY - h.skewY) && ((c.skewX += d), (c.rotation += d));
                                }
                                for (
                                    Ce && null != b.force3D && ((h.force3D = b.force3D), (_ = !0)),
                                        h.skewType = b.skewType || h.skewType || o.defaultSkewType,
                                        f =
                                            h.force3D ||
                                            h.z ||
                                            h.rotationX ||
                                            h.rotationY ||
                                            c.z ||
                                            c.rotationX ||
                                            c.rotationY ||
                                            c.perspective,
                                        f || null == b.scale || (c.scaleZ = 1);
                                    --x > -1;

                                )
                                    (i = be[x]),
                                        (u = c[i] - h[i]),
                                        (u > w || -w > u || null != b[i] || null != F[i]) &&
                                            ((_ = !0),
                                            (n = new _e(h, i, h[i], u, n)),
                                            i in k && (n.e = k[i]),
                                            (n.xs0 = 0),
                                            (n.plugin = a),
                                            s._overwriteProps.push(n.n));
                                return (
                                    (u = b.transformOrigin),
                                    h.svg &&
                                        (u || b.svgOrigin) &&
                                        ((g = h.xOffset),
                                        (v = h.yOffset),
                                        De(t, se(u), c, b.svgOrigin, b.smoothOrigin),
                                        (n = me(h, "xOrigin", (y ? h : c).xOrigin, c.xOrigin, n, S)),
                                        (n = me(h, "yOrigin", (y ? h : c).yOrigin, c.yOrigin, n, S)),
                                        (g !== h.xOffset || v !== h.yOffset) &&
                                            ((n = me(h, "xOffset", y ? g : h.xOffset, h.xOffset, n, S)),
                                            (n = me(h, "yOffset", y ? v : h.yOffset, h.yOffset, n, S))),
                                        (u = xe ? null : "0px 0px")),
                                    (u || (Ce && f && h.zOrigin)) &&
                                        (ke
                                            ? ((_ = !0),
                                              (i = Pe),
                                              (u = (u || G(t, i, r, !1, "50% 50%")) + ""),
                                              (n = new _e(T, i, 0, 0, n, -1, S)),
                                              (n.b = T[i]),
                                              (n.plugin = a),
                                              Ce
                                                  ? ((p = h.zOrigin),
                                                    (u = u.split(" ")),
                                                    (h.zOrigin =
                                                        (u.length > 2 && (0 === p || "0px" !== u[2])
                                                            ? parseFloat(u[2])
                                                            : p) || 0),
                                                    (n.xs0 = n.e = u[0] + " " + (u[1] || "50%") + " 0px"),
                                                    (n = new _e(h, "zOrigin", 0, 0, n, -1, n.n)),
                                                    (n.b = p),
                                                    (n.xs0 = n.e = h.zOrigin))
                                                  : (n.xs0 = n.e = u))
                                            : se(u + "", h)),
                                    _ &&
                                        (s._transformType = (h.svg && xe) || (!f && 3 !== this._transformType) ? 2 : 3),
                                    n
                                );
                            },
                            prefix: !0,
                        }
                    ),
                    Te("boxShadow", {
                        defaultValue: "0px 0px 0px 0px #999",
                        prefix: !0,
                        color: !0,
                        multi: !0,
                        keyword: "inset",
                    }),
                    Te("borderRadius", {
                        defaultValue: "0px",
                        parser: function (t, e, i, n, o) {
                            e = this.format(e);
                            var a,
                                l,
                                h,
                                c,
                                d,
                                p,
                                u,
                                f,
                                _,
                                m,
                                g,
                                v,
                                y,
                                T,
                                w,
                                x,
                                b = [
                                    "borderTopLeftRadius",
                                    "borderTopRightRadius",
                                    "borderBottomRightRadius",
                                    "borderBottomLeftRadius",
                                ],
                                k = t.style;
                            for (
                                _ = parseFloat(t.offsetWidth), m = parseFloat(t.offsetHeight), a = e.split(" "), l = 0;
                                b.length > l;
                                l++
                            )
                                this.p.indexOf("border") && (b[l] = U(b[l])),
                                    (d = c = G(t, b[l], r, !1, "0px")),
                                    -1 !== d.indexOf(" ") && ((c = d.split(" ")), (d = c[0]), (c = c[1])),
                                    (p = h = a[l]),
                                    (u = parseFloat(d)),
                                    (v = d.substr((u + "").length)),
                                    (y = "=" === p.charAt(1)),
                                    y
                                        ? ((f = parseInt(p.charAt(0) + "1", 10)),
                                          (p = p.substr(2)),
                                          (f *= parseFloat(p)),
                                          (g = p.substr((f + "").length - (0 > f ? 1 : 0)) || ""))
                                        : ((f = parseFloat(p)), (g = p.substr((f + "").length))),
                                    "" === g && (g = s[i] || v),
                                    g !== v &&
                                        ((T = Z(t, "borderLeft", u, v)),
                                        (w = Z(t, "borderTop", u, v)),
                                        "%" === g
                                            ? ((d = 100 * (T / _) + "%"), (c = 100 * (w / m) + "%"))
                                            : "em" === g
                                              ? ((x = Z(t, "borderLeft", 1, "em")),
                                                (d = T / x + "em"),
                                                (c = w / x + "em"))
                                              : ((d = T + "px"), (c = w + "px")),
                                        y && ((p = parseFloat(d) + f + g), (h = parseFloat(c) + f + g))),
                                    (o = ge(k, b[l], d + " " + c, p + " " + h, !1, "0px", o));
                            return o;
                        },
                        prefix: !0,
                        formatter: pe("0px 0px 0px 0px", !1, !0),
                    }),
                    Te("backgroundPosition", {
                        defaultValue: "0 0",
                        parser: function (t, e, i, s, n, o) {
                            var a,
                                l,
                                h,
                                c,
                                d,
                                p,
                                u = "background-position",
                                f = r || V(t, null),
                                m = this.format(
                                    (f
                                        ? _
                                            ? f.getPropertyValue(u + "-x") + " " + f.getPropertyValue(u + "-y")
                                            : f.getPropertyValue(u)
                                        : t.currentStyle.backgroundPositionX +
                                          " " +
                                          t.currentStyle.backgroundPositionY) || "0 0"
                                ),
                                g = this.format(e);
                            if (
                                (-1 !== m.indexOf("%")) != (-1 !== g.indexOf("%")) &&
                                ((p = G(t, "backgroundImage").replace(C, "")), p && "none" !== p)
                            ) {
                                for (a = m.split(" "), l = g.split(" "), X.setAttribute("src", p), h = 2; --h > -1; )
                                    (m = a[h]),
                                        (c = -1 !== m.indexOf("%")),
                                        c !== (-1 !== l[h].indexOf("%")) &&
                                            ((d = 0 === h ? t.offsetWidth - X.width : t.offsetHeight - X.height),
                                            (a[h] = c
                                                ? (parseFloat(m) / 100) * d + "px"
                                                : 100 * (parseFloat(m) / d) + "%"));
                                m = a.join(" ");
                            }
                            return this.parseComplex(t.style, m, g, n, o);
                        },
                        formatter: se,
                    }),
                    Te("backgroundSize", { defaultValue: "0 0", formatter: se }),
                    Te("perspective", { defaultValue: "0px", prefix: !0 }),
                    Te("perspectiveOrigin", { defaultValue: "50% 50%", prefix: !0 }),
                    Te("transformStyle", { prefix: !0 }),
                    Te("backfaceVisibility", { prefix: !0 }),
                    Te("userSelect", { prefix: !0 }),
                    Te("margin", { parser: ue("marginTop,marginRight,marginBottom,marginLeft") }),
                    Te("padding", { parser: ue("paddingTop,paddingRight,paddingBottom,paddingLeft") }),
                    Te("clip", {
                        defaultValue: "rect(0px,0px,0px,0px)",
                        parser: function (t, e, i, s, n, o) {
                            var a, l, h;
                            return (
                                9 > _
                                    ? ((l = t.currentStyle),
                                      (h = 8 > _ ? " " : ","),
                                      (a =
                                          "rect(" +
                                          l.clipTop +
                                          h +
                                          l.clipRight +
                                          h +
                                          l.clipBottom +
                                          h +
                                          l.clipLeft +
                                          ")"),
                                      (e = this.format(e).split(",").join(h)))
                                    : ((a = this.format(G(t, this.p, r, !1, this.dflt))), (e = this.format(e))),
                                this.parseComplex(t.style, a, e, n, o)
                            );
                        },
                    }),
                    Te("textShadow", { defaultValue: "0px 0px 0px #999", color: !0, multi: !0 }),
                    Te("autoRound,strictUnits", {
                        parser: function (t, e, i, s, r) {
                            return r;
                        },
                    }),
                    Te("border", {
                        defaultValue: "0px solid #000",
                        parser: function (t, e, i, s, n, o) {
                            return this.parseComplex(
                                t.style,
                                this.format(
                                    G(t, "borderTopWidth", r, !1, "0px") +
                                        " " +
                                        G(t, "borderTopStyle", r, !1, "solid") +
                                        " " +
                                        G(t, "borderTopColor", r, !1, "#000")
                                ),
                                this.format(e),
                                n,
                                o
                            );
                        },
                        color: !0,
                        formatter: function (t) {
                            var e = t.split(" ");
                            return e[0] + " " + (e[1] || "solid") + " " + (t.match(de) || ["#000"])[0];
                        },
                    }),
                    Te("borderWidth", {
                        parser: ue("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth"),
                    }),
                    Te("float,cssFloat,styleFloat", {
                        parser: function (t, e, i, s, r) {
                            var n = t.style,
                                o = "cssFloat" in n ? "cssFloat" : "styleFloat";
                            return new _e(n, o, 0, 0, r, -1, i, !1, 0, n[o], e);
                        },
                    });
                var Ne = function (t) {
                    var e,
                        i = this.t,
                        s = i.filter || G(this.data, "filter") || "",
                        r = 0 | (this.s + this.c * t);
                    100 === r &&
                        (-1 === s.indexOf("atrix(") && -1 === s.indexOf("radient(") && -1 === s.indexOf("oader(")
                            ? (i.removeAttribute("filter"), (e = !G(this.data, "filter")))
                            : ((i.filter = s.replace(b, "")), (e = !0))),
                        e ||
                            (this.xn1 && (i.filter = s = s || "alpha(opacity=" + r + ")"),
                            -1 === s.indexOf("pacity")
                                ? (0 === r && this.xn1) || (i.filter = s + " alpha(opacity=" + r + ")")
                                : (i.filter = s.replace(w, "opacity=" + r)));
                };
                Te("opacity,alpha,autoAlpha", {
                    defaultValue: "1",
                    parser: function (t, e, i, s, n, o) {
                        var a = parseFloat(G(t, "opacity", r, !1, "1")),
                            l = t.style,
                            h = "autoAlpha" === i;
                        return (
                            "string" == typeof e &&
                                "=" === e.charAt(1) &&
                                (e = ("-" === e.charAt(0) ? -1 : 1) * parseFloat(e.substr(2)) + a),
                            h && 1 === a && "hidden" === G(t, "visibility", r) && 0 !== e && (a = 0),
                            H
                                ? (n = new _e(l, "opacity", a, e - a, n))
                                : ((n = new _e(l, "opacity", 100 * a, 100 * (e - a), n)),
                                  (n.xn1 = h ? 1 : 0),
                                  (l.zoom = 1),
                                  (n.type = 2),
                                  (n.b = "alpha(opacity=" + n.s + ")"),
                                  (n.e = "alpha(opacity=" + (n.s + n.c) + ")"),
                                  (n.data = t),
                                  (n.plugin = o),
                                  (n.setRatio = Ne)),
                            h &&
                                ((n = new _e(
                                    l,
                                    "visibility",
                                    0,
                                    0,
                                    n,
                                    -1,
                                    null,
                                    !1,
                                    0,
                                    0 !== a ? "inherit" : "hidden",
                                    0 === e ? "hidden" : "inherit"
                                )),
                                (n.xs0 = "inherit"),
                                s._overwriteProps.push(n.n),
                                s._overwriteProps.push(i)),
                            n
                        );
                    },
                });
                var je = function (t, e) {
                        e &&
                            (t.removeProperty
                                ? (("ms" === e.substr(0, 2) || "webkit" === e.substr(0, 6)) && (e = "-" + e),
                                  t.removeProperty(e.replace(S, "-$1").toLowerCase()))
                                : t.removeAttribute(e));
                    },
                    He = function (t) {
                        if (((this.t._gsClassPT = this), 1 === t || 0 === t)) {
                            this.t.setAttribute("class", 0 === t ? this.b : this.e);
                            for (var e = this.data, i = this.t.style; e; )
                                e.v ? (i[e.p] = e.v) : je(i, e.p), (e = e._next);
                            1 === t && this.t._gsClassPT === this && (this.t._gsClassPT = null);
                        } else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e);
                    };
                Te("className", {
                    parser: function (t, e, s, n, o, a, l) {
                        var h,
                            c,
                            d,
                            p,
                            u,
                            f = t.getAttribute("class") || "",
                            _ = t.style.cssText;
                        if (
                            ((o = n._classNamePT = new _e(t, s, 0, 0, o, 2)),
                            (o.setRatio = He),
                            (o.pr = -11),
                            (i = !0),
                            (o.b = f),
                            (c = J(t, r)),
                            (d = t._gsClassPT))
                        ) {
                            for (p = {}, u = d.data; u; ) (p[u.p] = 1), (u = u._next);
                            d.setRatio(1);
                        }
                        return (
                            (t._gsClassPT = o),
                            (o.e =
                                "=" !== e.charAt(1)
                                    ? e
                                    : f.replace(RegExp("\\s*\\b" + e.substr(2) + "\\b"), "") +
                                      ("+" === e.charAt(0) ? " " + e.substr(2) : "")),
                            t.setAttribute("class", o.e),
                            (h = K(t, c, J(t), l, p)),
                            t.setAttribute("class", f),
                            (o.data = h.firstMPT),
                            (t.style.cssText = _),
                            (o = o.xfirst = n.parse(t, h.difs, o, a))
                        );
                    },
                });
                var Ye = function (t) {
                    if (
                        (1 === t || 0 === t) &&
                        this.data._totalTime === this.data._totalDuration &&
                        "isFromStart" !== this.data.data
                    ) {
                        var e,
                            i,
                            s,
                            r,
                            n,
                            o = this.t.style,
                            a = l.transform.parse;
                        if ("all" === this.e) (o.cssText = ""), (r = !0);
                        else
                            for (e = this.e.split(" ").join("").split(","), s = e.length; --s > -1; )
                                (i = e[s]),
                                    l[i] && (l[i].parse === a ? (r = !0) : (i = "transformOrigin" === i ? Pe : l[i].p)),
                                    je(o, i);
                        r &&
                            (je(o, ke),
                            (n = this.t._gsTransform),
                            n && (n.svg && this.t.removeAttribute("data-svg-origin"), delete this.t._gsTransform));
                    }
                };
                for (
                    Te("clearProps", {
                        parser: function (t, e, s, r, n) {
                            return (
                                (n = new _e(t, s, 0, 0, n, 2)),
                                (n.setRatio = Ye),
                                (n.e = e),
                                (n.pr = -10),
                                (n.data = r._tween),
                                (i = !0),
                                n
                            );
                        },
                    }),
                        h = "bezier,throwProps,physicsProps,physics2D".split(","),
                        ve = h.length;
                    ve--;

                )
                    we(h[ve]);
                (h = o.prototype),
                    (h._firstPT = h._lastParsedTransform = h._transform = null),
                    (h._onInitTween = function (t, e, a) {
                        if (!t.nodeType) return !1;
                        (this._target = t),
                            (this._tween = a),
                            (this._vars = e),
                            (c = e.autoRound),
                            (i = !1),
                            (s = e.suffixMap || o.suffixMap),
                            (r = V(t, "")),
                            (n = this._overwriteProps);
                        var h,
                            u,
                            _,
                            m,
                            g,
                            v,
                            y,
                            T,
                            w,
                            b = t.style;
                        if (
                            (d &&
                                "" === b.zIndex &&
                                ((h = G(t, "zIndex", r)),
                                ("auto" === h || "" === h) && this._addLazySet(b, "zIndex", 0)),
                            "string" == typeof e &&
                                ((m = b.cssText),
                                (h = J(t, r)),
                                (b.cssText = m + ";" + e),
                                (h = K(t, h, J(t)).difs),
                                !H && x.test(e) && (h.opacity = parseFloat(RegExp.$1)),
                                (e = h),
                                (b.cssText = m)),
                            (this._firstPT = u =
                                e.className
                                    ? l.className.parse(t, e.className, "className", this, null, null, e)
                                    : this.parse(t, e, null)),
                            this._transformType)
                        ) {
                            for (
                                w = 3 === this._transformType,
                                    ke
                                        ? p &&
                                          ((d = !0),
                                          "" === b.zIndex &&
                                              ((y = G(t, "zIndex", r)),
                                              ("auto" === y || "" === y) && this._addLazySet(b, "zIndex", 0)),
                                          f &&
                                              this._addLazySet(
                                                  b,
                                                  "WebkitBackfaceVisibility",
                                                  this._vars.WebkitBackfaceVisibility || (w ? "visible" : "hidden")
                                              ))
                                        : (b.zoom = 1),
                                    _ = u;
                                _ && _._next;

                            )
                                _ = _._next;
                            (T = new _e(t, "transform", 0, 0, null, 2)),
                                this._linkCSSP(T, null, _),
                                (T.setRatio = ke ? Xe : Ee),
                                (T.data = this._transform || Le(t, r, !0)),
                                (T.tween = a),
                                (T.pr = -1),
                                n.pop();
                        }
                        if (i) {
                            for (; u; ) {
                                for (v = u._next, _ = m; _ && _.pr > u.pr; ) _ = _._next;
                                (u._prev = _ ? _._prev : g) ? (u._prev._next = u) : (m = u),
                                    (u._next = _) ? (_._prev = u) : (g = u),
                                    (u = v);
                            }
                            this._firstPT = m;
                        }
                        return !0;
                    }),
                    (h.parse = function (t, e, i, n) {
                        var o,
                            a,
                            h,
                            d,
                            p,
                            u,
                            f,
                            _,
                            m,
                            g,
                            v = t.style;
                        for (o in e)
                            (u = e[o]),
                                (a = l[o]),
                                a
                                    ? (i = a.parse(t, u, o, this, i, n, e))
                                    : ((p = G(t, o, r) + ""),
                                      (m = "string" == typeof u),
                                      "color" === o ||
                                      "fill" === o ||
                                      "stroke" === o ||
                                      -1 !== o.indexOf("Color") ||
                                      (m && k.test(u))
                                          ? (m ||
                                                ((u = he(u)),
                                                (u = (u.length > 3 ? "rgba(" : "rgb(") + u.join(",") + ")")),
                                            (i = ge(v, o, p, u, !0, "transparent", i, 0, n)))
                                          : !m || (-1 === u.indexOf(" ") && -1 === u.indexOf(","))
                                            ? ((h = parseFloat(p)),
                                              (f = h || 0 === h ? p.substr((h + "").length) : ""),
                                              ("" === p || "auto" === p) &&
                                                  ("width" === o || "height" === o
                                                      ? ((h = ie(t, o, r)), (f = "px"))
                                                      : "left" === o || "top" === o
                                                        ? ((h = Q(t, o, r)), (f = "px"))
                                                        : ((h = "opacity" !== o ? 0 : 1), (f = ""))),
                                              (g = m && "=" === u.charAt(1)),
                                              g
                                                  ? ((d = parseInt(u.charAt(0) + "1", 10)),
                                                    (u = u.substr(2)),
                                                    (d *= parseFloat(u)),
                                                    (_ = u.replace(T, "")))
                                                  : ((d = parseFloat(u)), (_ = m ? u.replace(T, "") : "")),
                                              "" === _ && (_ = o in s ? s[o] : f),
                                              (u = d || 0 === d ? (g ? d + h : d) + _ : e[o]),
                                              f !== _ &&
                                                  "" !== _ &&
                                                  (d || 0 === d) &&
                                                  h &&
                                                  ((h = Z(t, o, h, f)),
                                                  "%" === _
                                                      ? ((h /= Z(t, o, 100, "%") / 100),
                                                        e.strictUnits !== !0 && (p = h + "%"))
                                                      : "em" === _ || "rem" === _
                                                        ? (h /= Z(t, o, 1, _))
                                                        : "px" !== _ && ((d = Z(t, o, d, _)), (_ = "px")),
                                                  g && (d || 0 === d) && (u = d + h + _)),
                                              g && (d += h),
                                              (!h && 0 !== h) || (!d && 0 !== d)
                                                  ? void 0 !== v[o] && (u || ("NaN" != u + "" && null != u))
                                                      ? ((i = new _e(v, o, d || h || 0, 0, i, -1, o, !1, 0, p, u)),
                                                        (i.xs0 =
                                                            "none" !== u ||
                                                            ("display" !== o && -1 === o.indexOf("Style"))
                                                                ? u
                                                                : p))
                                                      : B("invalid " + o + " tween value: " + e[o])
                                                  : ((i = new _e(
                                                        v,
                                                        o,
                                                        h,
                                                        d - h,
                                                        i,
                                                        0,
                                                        o,
                                                        c !== !1 && ("px" === _ || "zIndex" === o),
                                                        0,
                                                        p,
                                                        u
                                                    )),
                                                    (i.xs0 = _)))
                                            : (i = ge(v, o, p, u, !0, null, i, 0, n))),
                                n && i && !i.plugin && (i.plugin = n);
                        return i;
                    }),
                    (h.setRatio = function (t) {
                        var e,
                            i,
                            s,
                            r = this._firstPT,
                            n = 1e-6;
                        if (1 !== t || (this._tween._time !== this._tween._duration && 0 !== this._tween._time))
                            if (
                                t ||
                                (this._tween._time !== this._tween._duration && 0 !== this._tween._time) ||
                                this._tween._rawPrevTime === -1e-6
                            )
                                for (; r; ) {
                                    if (
                                        ((e = r.c * t + r.s),
                                        r.r ? (e = Math.round(e)) : n > e && e > -n && (e = 0),
                                        r.type)
                                    )
                                        if (1 === r.type)
                                            if (((s = r.l), 2 === s)) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2;
                                            else if (3 === s)
                                                r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3;
                                            else if (4 === s)
                                                r.t[r.p] =
                                                    r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4;
                                            else if (5 === s)
                                                r.t[r.p] =
                                                    r.xs0 +
                                                    e +
                                                    r.xs1 +
                                                    r.xn1 +
                                                    r.xs2 +
                                                    r.xn2 +
                                                    r.xs3 +
                                                    r.xn3 +
                                                    r.xs4 +
                                                    r.xn4 +
                                                    r.xs5;
                                            else {
                                                for (i = r.xs0 + e + r.xs1, s = 1; r.l > s; s++)
                                                    i += r["xn" + s] + r["xs" + (s + 1)];
                                                r.t[r.p] = i;
                                            }
                                        else -1 === r.type ? (r.t[r.p] = r.xs0) : r.setRatio && r.setRatio(t);
                                    else r.t[r.p] = e + r.xs0;
                                    r = r._next;
                                }
                            else for (; r; ) 2 !== r.type ? (r.t[r.p] = r.b) : r.setRatio(t), (r = r._next);
                        else
                            for (; r; ) {
                                if (2 !== r.type)
                                    if (r.r && -1 !== r.type)
                                        if (((e = Math.round(r.s + r.c)), r.type)) {
                                            if (1 === r.type) {
                                                for (s = r.l, i = r.xs0 + e + r.xs1, s = 1; r.l > s; s++)
                                                    i += r["xn" + s] + r["xs" + (s + 1)];
                                                r.t[r.p] = i;
                                            }
                                        } else r.t[r.p] = e + r.xs0;
                                    else r.t[r.p] = r.e;
                                else r.setRatio(t);
                                r = r._next;
                            }
                    }),
                    (h._enableTransforms = function (t) {
                        (this._transform = this._transform || Le(this._target, r, !0)),
                            (this._transformType =
                                (this._transform.svg && xe) || (!t && 3 !== this._transformType) ? 2 : 3);
                    });
                var Be = function () {
                    (this.t[this.p] = this.e), this.data._linkCSSP(this, this._next, null, !0);
                };
                (h._addLazySet = function (t, e, i) {
                    var s = (this._firstPT = new _e(t, e, 0, 0, this._firstPT, 2));
                    (s.e = i), (s.setRatio = Be), (s.data = this);
                }),
                    (h._linkCSSP = function (t, e, i, s) {
                        return (
                            t &&
                                (e && (e._prev = t),
                                t._next && (t._next._prev = t._prev),
                                t._prev
                                    ? (t._prev._next = t._next)
                                    : this._firstPT === t && ((this._firstPT = t._next), (s = !0)),
                                i ? (i._next = t) : s || null !== this._firstPT || (this._firstPT = t),
                                (t._next = e),
                                (t._prev = i)),
                            t
                        );
                    }),
                    (h._kill = function (e) {
                        var i,
                            s,
                            r,
                            n = e;
                        if (e.autoAlpha || e.alpha) {
                            n = {};
                            for (s in e) n[s] = e[s];
                            (n.opacity = 1), n.autoAlpha && (n.visibility = 1);
                        }
                        return (
                            e.className &&
                                (i = this._classNamePT) &&
                                ((r = i.xfirst),
                                r && r._prev
                                    ? this._linkCSSP(r._prev, i._next, r._prev._prev)
                                    : r === this._firstPT && (this._firstPT = i._next),
                                i._next && this._linkCSSP(i._next, i._next._next, r._prev),
                                (this._classNamePT = null)),
                            t.prototype._kill.call(this, n)
                        );
                    });
                var We = function (t, e, i) {
                    var s, r, n, o;
                    if (t.slice) for (r = t.length; --r > -1; ) We(t[r], e, i);
                    else
                        for (s = t.childNodes, r = s.length; --r > -1; )
                            (n = s[r]),
                                (o = n.type),
                                n.style && (e.push(J(n)), i && i.push(n)),
                                (1 !== o && 9 !== o && 11 !== o) || !n.childNodes.length || We(n, e, i);
                };
                return (
                    (o.cascadeTo = function (t, i, s) {
                        var r,
                            n,
                            o,
                            a,
                            l = e.to(t, i, s),
                            h = [l],
                            c = [],
                            d = [],
                            p = [],
                            u = e._internals.reservedProps;
                        for (
                            t = l._targets || l.target,
                                We(t, c, p),
                                l.render(i, !0, !0),
                                We(t, d),
                                l.render(0, !0, !0),
                                l._enabled(!0),
                                r = p.length;
                            --r > -1;

                        )
                            if (((n = K(p[r], c[r], d[r])), n.firstMPT)) {
                                n = n.difs;
                                for (o in s) u[o] && (n[o] = s[o]);
                                a = {};
                                for (o in n) a[o] = c[r][o];
                                h.push(e.fromTo(p[r], i, a, n));
                            }
                        return h;
                    }),
                    t.activate([o]),
                    o
                );
            },
            !0
        ),
        (function () {
            var t = _gsScope._gsDefine.plugin({
                    propName: "roundProps",
                    version: "1.5",
                    priority: -1,
                    API: 2,
                    init: function (t, e, i) {
                        return (this._tween = i), !0;
                    },
                }),
                e = function (t) {
                    for (; t; ) t.f || t.blob || (t.r = 1), (t = t._next);
                },
                i = t.prototype;
            (i._onInitAllProps = function () {
                for (
                    var t,
                        i,
                        s,
                        r = this._tween,
                        n = r.vars.roundProps.join ? r.vars.roundProps : r.vars.roundProps.split(","),
                        o = n.length,
                        a = {},
                        l = r._propLookup.roundProps;
                    --o > -1;

                )
                    a[n[o]] = 1;
                for (o = n.length; --o > -1; )
                    for (t = n[o], i = r._firstPT; i; )
                        (s = i._next),
                            i.pg
                                ? i.t._roundProps(a, !0)
                                : i.n === t &&
                                  (2 === i.f && i.t
                                      ? e(i.t._firstPT)
                                      : (this._add(i.t, t, i.s, i.c),
                                        s && (s._prev = i._prev),
                                        i._prev ? (i._prev._next = s) : r._firstPT === i && (r._firstPT = s),
                                        (i._next = i._prev = null),
                                        (r._propLookup[t] = l))),
                            (i = s);
                return !1;
            }),
                (i._add = function (t, e, i, s) {
                    this._addTween(t, e, i, i + s, e, !0), this._overwriteProps.push(e);
                });
        })(),
        (function () {
            _gsScope._gsDefine.plugin({
                propName: "attr",
                API: 2,
                version: "0.5.0",
                init: function (t, e) {
                    var i;
                    if ("function" != typeof t.setAttribute) return !1;
                    for (i in e)
                        this._addTween(t, "setAttribute", t.getAttribute(i) + "", e[i] + "", i, !1, i),
                            this._overwriteProps.push(i);
                    return !0;
                },
            });
        })(),
        (_gsScope._gsDefine.plugin({
            propName: "directionalRotation",
            version: "0.2.1",
            API: 2,
            init: function (t, e) {
                "object" != typeof e && (e = { rotation: e }), (this.finals = {});
                var i,
                    s,
                    r,
                    n,
                    o,
                    a,
                    l = e.useRadians === !0 ? 2 * Math.PI : 360,
                    h = 1e-6;
                for (i in e)
                    "useRadians" !== i &&
                        ((a = (e[i] + "").split("_")),
                        (s = a[0]),
                        (r = parseFloat(
                            "function" != typeof t[i]
                                ? t[i]
                                : t[
                                      i.indexOf("set") || "function" != typeof t["get" + i.substr(3)]
                                          ? i
                                          : "get" + i.substr(3)
                                  ]()
                        )),
                        (n = this.finals[i] =
                            "string" == typeof s && "=" === s.charAt(1)
                                ? r + parseInt(s.charAt(0) + "1", 10) * Number(s.substr(2))
                                : Number(s) || 0),
                        (o = n - r),
                        a.length &&
                            ((s = a.join("_")),
                            -1 !== s.indexOf("short") && ((o %= l), o !== o % (l / 2) && (o = 0 > o ? o + l : o - l)),
                            -1 !== s.indexOf("_cw") && 0 > o
                                ? (o = ((o + 9999999999 * l) % l) - (0 | (o / l)) * l)
                                : -1 !== s.indexOf("ccw") &&
                                  o > 0 &&
                                  (o = ((o - 9999999999 * l) % l) - (0 | (o / l)) * l)),
                        (o > h || -h > o) && (this._addTween(t, i, r, r + o, i), this._overwriteProps.push(i)));
                return !0;
            },
            set: function (t) {
                var e;
                if (1 !== t) this._super.setRatio.call(this, t);
                else
                    for (e = this._firstPT; e; )
                        e.f ? e.t[e.p](this.finals[e.p]) : (e.t[e.p] = this.finals[e.p]), (e = e._next);
            },
        })._autoCSS = !0),
        _gsScope._gsDefine(
            "easing.Back",
            ["easing.Ease"],
            function (t) {
                var e,
                    i,
                    s,
                    r = _gsScope.GreenSockGlobals || _gsScope,
                    n = r.com.greensock,
                    o = 2 * Math.PI,
                    a = Math.PI / 2,
                    l = n._class,
                    h = function (e, i) {
                        var s = l("easing." + e, function () {}, !0),
                            r = (s.prototype = new t());
                        return (r.constructor = s), (r.getRatio = i), s;
                    },
                    c = t.register || function () {},
                    d = function (t, e, i, s) {
                        var r = l("easing." + t, { easeOut: new e(), easeIn: new i(), easeInOut: new s() }, !0);
                        return c(r, t), r;
                    },
                    p = function (t, e, i) {
                        (this.t = t),
                            (this.v = e),
                            i && ((this.next = i), (i.prev = this), (this.c = i.v - e), (this.gap = i.t - t));
                    },
                    u = function (e, i) {
                        var s = l(
                                "easing." + e,
                                function (t) {
                                    (this._p1 = t || 0 === t ? t : 1.70158), (this._p2 = 1.525 * this._p1);
                                },
                                !0
                            ),
                            r = (s.prototype = new t());
                        return (
                            (r.constructor = s),
                            (r.getRatio = i),
                            (r.config = function (t) {
                                return new s(t);
                            }),
                            s
                        );
                    },
                    f = d(
                        "Back",
                        u("BackOut", function (t) {
                            return (t -= 1) * t * ((this._p1 + 1) * t + this._p1) + 1;
                        }),
                        u("BackIn", function (t) {
                            return t * t * ((this._p1 + 1) * t - this._p1);
                        }),
                        u("BackInOut", function (t) {
                            return 1 > (t *= 2)
                                ? 0.5 * t * t * ((this._p2 + 1) * t - this._p2)
                                : 0.5 * ((t -= 2) * t * ((this._p2 + 1) * t + this._p2) + 2);
                        })
                    ),
                    _ = l(
                        "easing.SlowMo",
                        function (t, e, i) {
                            (e = e || 0 === e ? e : 0.7),
                                null == t ? (t = 0.7) : t > 1 && (t = 1),
                                (this._p = 1 !== t ? e : 0),
                                (this._p1 = (1 - t) / 2),
                                (this._p2 = t),
                                (this._p3 = this._p1 + this._p2),
                                (this._calcEnd = i === !0);
                        },
                        !0
                    ),
                    m = (_.prototype = new t());
                return (
                    (m.constructor = _),
                    (m.getRatio = function (t) {
                        var e = t + (0.5 - t) * this._p;
                        return this._p1 > t
                            ? this._calcEnd
                                ? 1 - (t = 1 - t / this._p1) * t
                                : e - (t = 1 - t / this._p1) * t * t * t * e
                            : t > this._p3
                              ? this._calcEnd
                                  ? 1 - (t = (t - this._p3) / this._p1) * t
                                  : e + (t - e) * (t = (t - this._p3) / this._p1) * t * t * t
                              : this._calcEnd
                                ? 1
                                : e;
                    }),
                    (_.ease = new _(0.7, 0.7)),
                    (m.config = _.config =
                        function (t, e, i) {
                            return new _(t, e, i);
                        }),
                    (e = l(
                        "easing.SteppedEase",
                        function (t) {
                            (t = t || 1), (this._p1 = 1 / t), (this._p2 = t + 1);
                        },
                        !0
                    )),
                    (m = e.prototype = new t()),
                    (m.constructor = e),
                    (m.getRatio = function (t) {
                        return 0 > t ? (t = 0) : t >= 1 && (t = 0.999999999), ((this._p2 * t) >> 0) * this._p1;
                    }),
                    (m.config = e.config =
                        function (t) {
                            return new e(t);
                        }),
                    (i = l(
                        "easing.RoughEase",
                        function (e) {
                            e = e || {};
                            for (
                                var i,
                                    s,
                                    r,
                                    n,
                                    o,
                                    a,
                                    l = e.taper || "none",
                                    h = [],
                                    c = 0,
                                    d = 0 | (e.points || 20),
                                    u = d,
                                    f = e.randomize !== !1,
                                    _ = e.clamp === !0,
                                    m = e.template instanceof t ? e.template : null,
                                    g = "number" == typeof e.strength ? 0.4 * e.strength : 0.4;
                                --u > -1;

                            )
                                (i = f ? Math.random() : (1 / d) * u),
                                    (s = m ? m.getRatio(i) : i),
                                    "none" === l
                                        ? (r = g)
                                        : "out" === l
                                          ? ((n = 1 - i), (r = n * n * g))
                                          : "in" === l
                                            ? (r = i * i * g)
                                            : 0.5 > i
                                              ? ((n = 2 * i), (r = 0.5 * n * n * g))
                                              : ((n = 2 * (1 - i)), (r = 0.5 * n * n * g)),
                                    f ? (s += Math.random() * r - 0.5 * r) : u % 2 ? (s += 0.5 * r) : (s -= 0.5 * r),
                                    _ && (s > 1 ? (s = 1) : 0 > s && (s = 0)),
                                    (h[c++] = { x: i, y: s });
                            for (
                                h.sort(function (t, e) {
                                    return t.x - e.x;
                                }),
                                    a = new p(1, 1, null),
                                    u = d;
                                --u > -1;

                            )
                                (o = h[u]), (a = new p(o.x, o.y, a));
                            this._prev = new p(0, 0, 0 !== a.t ? a : a.next);
                        },
                        !0
                    )),
                    (m = i.prototype = new t()),
                    (m.constructor = i),
                    (m.getRatio = function (t) {
                        var e = this._prev;
                        if (t > e.t) {
                            for (; e.next && t >= e.t; ) e = e.next;
                            e = e.prev;
                        } else for (; e.prev && e.t >= t; ) e = e.prev;
                        return (this._prev = e), e.v + ((t - e.t) / e.gap) * e.c;
                    }),
                    (m.config = function (t) {
                        return new i(t);
                    }),
                    (i.ease = new i()),
                    d(
                        "Bounce",
                        h("BounceOut", function (t) {
                            return 1 / 2.75 > t
                                ? 7.5625 * t * t
                                : 2 / 2.75 > t
                                  ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
                                  : 2.5 / 2.75 > t
                                    ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
                                    : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
                        }),
                        h("BounceIn", function (t) {
                            return 1 / 2.75 > (t = 1 - t)
                                ? 1 - 7.5625 * t * t
                                : 2 / 2.75 > t
                                  ? 1 - (7.5625 * (t -= 1.5 / 2.75) * t + 0.75)
                                  : 2.5 / 2.75 > t
                                    ? 1 - (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375)
                                    : 1 - (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375);
                        }),
                        h("BounceInOut", function (t) {
                            var e = 0.5 > t;
                            return (
                                (t = e ? 1 - 2 * t : 2 * t - 1),
                                (t =
                                    1 / 2.75 > t
                                        ? 7.5625 * t * t
                                        : 2 / 2.75 > t
                                          ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
                                          : 2.5 / 2.75 > t
                                            ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
                                            : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375),
                                e ? 0.5 * (1 - t) : 0.5 * t + 0.5
                            );
                        })
                    ),
                    d(
                        "Circ",
                        h("CircOut", function (t) {
                            return Math.sqrt(1 - (t -= 1) * t);
                        }),
                        h("CircIn", function (t) {
                            return -(Math.sqrt(1 - t * t) - 1);
                        }),
                        h("CircInOut", function (t) {
                            return 1 > (t *= 2)
                                ? -0.5 * (Math.sqrt(1 - t * t) - 1)
                                : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
                        })
                    ),
                    (s = function (e, i, s) {
                        var r = l(
                                "easing." + e,
                                function (t, e) {
                                    (this._p1 = t >= 1 ? t : 1),
                                        (this._p2 = (e || s) / (1 > t ? t : 1)),
                                        (this._p3 = (this._p2 / o) * (Math.asin(1 / this._p1) || 0)),
                                        (this._p2 = o / this._p2);
                                },
                                !0
                            ),
                            n = (r.prototype = new t());
                        return (
                            (n.constructor = r),
                            (n.getRatio = i),
                            (n.config = function (t, e) {
                                return new r(t, e);
                            }),
                            r
                        );
                    }),
                    d(
                        "Elastic",
                        s(
                            "ElasticOut",
                            function (t) {
                                return this._p1 * Math.pow(2, -10 * t) * Math.sin((t - this._p3) * this._p2) + 1;
                            },
                            0.3
                        ),
                        s(
                            "ElasticIn",
                            function (t) {
                                return -(this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2));
                            },
                            0.3
                        ),
                        s(
                            "ElasticInOut",
                            function (t) {
                                return 1 > (t *= 2)
                                    ? -0.5 * this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2)
                                    : 0.5 *
                                          this._p1 *
                                          Math.pow(2, -10 * (t -= 1)) *
                                          Math.sin((t - this._p3) * this._p2) +
                                          1;
                            },
                            0.45
                        )
                    ),
                    d(
                        "Expo",
                        h("ExpoOut", function (t) {
                            return 1 - Math.pow(2, -10 * t);
                        }),
                        h("ExpoIn", function (t) {
                            return Math.pow(2, 10 * (t - 1)) - 0.001;
                        }),
                        h("ExpoInOut", function (t) {
                            return 1 > (t *= 2)
                                ? 0.5 * Math.pow(2, 10 * (t - 1))
                                : 0.5 * (2 - Math.pow(2, -10 * (t - 1)));
                        })
                    ),
                    d(
                        "Sine",
                        h("SineOut", function (t) {
                            return Math.sin(t * a);
                        }),
                        h("SineIn", function (t) {
                            return -Math.cos(t * a) + 1;
                        }),
                        h("SineInOut", function (t) {
                            return -0.5 * (Math.cos(Math.PI * t) - 1);
                        })
                    ),
                    l(
                        "easing.EaseLookup",
                        {
                            find: function (e) {
                                return t.map[e];
                            },
                        },
                        !0
                    ),
                    c(r.SlowMo, "SlowMo", "ease,"),
                    c(i, "RoughEase", "ease,"),
                    c(e, "SteppedEase", "ease,"),
                    f
                );
            },
            !0
        );
}),
    _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    (function (t, e) {
        "use strict";
        var i = (t.GreenSockGlobals = t.GreenSockGlobals || t);
        if (!i.TweenLite) {
            var s,
                r,
                n,
                o,
                a,
                l = function (t) {
                    var e,
                        s = t.split("."),
                        r = i;
                    for (e = 0; s.length > e; e++) r[s[e]] = r = r[s[e]] || {};
                    return r;
                },
                h = l("com.greensock"),
                c = 1e-10,
                d = function (t) {
                    var e,
                        i = [],
                        s = t.length;
                    for (e = 0; e !== s; i.push(t[e++]));
                    return i;
                },
                p = function () {},
                u = (function () {
                    var t = Object.prototype.toString,
                        e = t.call([]);
                    return function (i) {
                        return (
                            null != i && (i instanceof Array || ("object" == typeof i && !!i.push && t.call(i) === e))
                        );
                    };
                })(),
                f = {},
                _ = function (s, r, n, o) {
                    (this.sc = f[s] ? f[s].sc : []), (f[s] = this), (this.gsClass = null), (this.func = n);
                    var a = [];
                    (this.check = function (h) {
                        for (var c, d, p, u, m, g = r.length, v = g; --g > -1; )
                            (c = f[r[g]] || new _(r[g], [])).gsClass ? ((a[g] = c.gsClass), v--) : h && c.sc.push(this);
                        if (0 === v && n)
                            for (
                                d = ("com.greensock." + s).split("."),
                                    p = d.pop(),
                                    u = l(d.join("."))[p] = this.gsClass = n.apply(n, a),
                                    o &&
                                        ((i[p] = u),
                                        (m = "undefined" != typeof module && module.exports),
                                        !m && "function" == typeof define && define.amd
                                            ? define(
                                                  (t.GreenSockAMDPath ? t.GreenSockAMDPath + "/" : "") +
                                                      s.split(".").pop(),
                                                  [],
                                                  function () {
                                                      return u;
                                                  }
                                              )
                                            : s === e && m && (module.exports = u)),
                                    g = 0;
                                this.sc.length > g;
                                g++
                            )
                                this.sc[g].check();
                    }),
                        this.check(!0);
                },
                m = (t._gsDefine = function (t, e, i, s) {
                    return new _(t, e, i, s);
                }),
                g = (h._class = function (t, e, i) {
                    return (
                        (e = e || function () {}),
                        m(
                            t,
                            [],
                            function () {
                                return e;
                            },
                            i
                        ),
                        e
                    );
                });
            m.globals = i;
            var v = [0, 0, 1, 1],
                y = [],
                T = g(
                    "easing.Ease",
                    function (t, e, i, s) {
                        (this._func = t),
                            (this._type = i || 0),
                            (this._power = s || 0),
                            (this._params = e ? v.concat(e) : v);
                    },
                    !0
                ),
                w = (T.map = {}),
                x = (T.register = function (t, e, i, s) {
                    for (
                        var r,
                            n,
                            o,
                            a,
                            l = e.split(","),
                            c = l.length,
                            d = (i || "easeIn,easeOut,easeInOut").split(",");
                        --c > -1;

                    )
                        for (n = l[c], r = s ? g("easing." + n, null, !0) : h.easing[n] || {}, o = d.length; --o > -1; )
                            (a = d[o]), (w[n + "." + a] = w[a + n] = r[a] = t.getRatio ? t : t[a] || new t());
                });
            for (
                n = T.prototype,
                    n._calcEnd = !1,
                    n.getRatio = function (t) {
                        if (this._func) return (this._params[0] = t), this._func.apply(null, this._params);
                        var e = this._type,
                            i = this._power,
                            s = 1 === e ? 1 - t : 2 === e ? t : 0.5 > t ? 2 * t : 2 * (1 - t);
                        return (
                            1 === i
                                ? (s *= s)
                                : 2 === i
                                  ? (s *= s * s)
                                  : 3 === i
                                    ? (s *= s * s * s)
                                    : 4 === i && (s *= s * s * s * s),
                            1 === e ? 1 - s : 2 === e ? s : 0.5 > t ? s / 2 : 1 - s / 2
                        );
                    },
                    s = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"],
                    r = s.length;
                --r > -1;

            )
                (n = s[r] + ",Power" + r),
                    x(new T(null, null, 1, r), n, "easeOut", !0),
                    x(new T(null, null, 2, r), n, "easeIn" + (0 === r ? ",easeNone" : "")),
                    x(new T(null, null, 3, r), n, "easeInOut");
            (w.linear = h.easing.Linear.easeIn), (w.swing = h.easing.Quad.easeInOut);
            var b = g("events.EventDispatcher", function (t) {
                (this._listeners = {}), (this._eventTarget = t || this);
            });
            (n = b.prototype),
                (n.addEventListener = function (t, e, i, s, r) {
                    r = r || 0;
                    var n,
                        l,
                        h = this._listeners[t],
                        c = 0;
                    for (null == h && (this._listeners[t] = h = []), l = h.length; --l > -1; )
                        (n = h[l]), n.c === e && n.s === i ? h.splice(l, 1) : 0 === c && r > n.pr && (c = l + 1);
                    h.splice(c, 0, { c: e, s: i, up: s, pr: r }), this !== o || a || o.wake();
                }),
                (n.removeEventListener = function (t, e) {
                    var i,
                        s = this._listeners[t];
                    if (s) for (i = s.length; --i > -1; ) if (s[i].c === e) return void s.splice(i, 1);
                }),
                (n.dispatchEvent = function (t) {
                    var e,
                        i,
                        s,
                        r = this._listeners[t];
                    if (r)
                        for (e = r.length, i = this._eventTarget; --e > -1; )
                            (s = r[e]), s && (s.up ? s.c.call(s.s || i, { type: t, target: i }) : s.c.call(s.s || i));
                });
            var k = t.requestAnimationFrame,
                S = t.cancelAnimationFrame,
                P =
                    Date.now ||
                    function () {
                        return new Date().getTime();
                    },
                C = P();
            for (s = ["ms", "moz", "webkit", "o"], r = s.length; --r > -1 && !k; )
                (k = t[s[r] + "RequestAnimationFrame"]),
                    (S = t[s[r] + "CancelAnimationFrame"] || t[s[r] + "CancelRequestAnimationFrame"]);
            g("Ticker", function (t, e) {
                var i,
                    s,
                    r,
                    n,
                    l,
                    h = this,
                    d = P(),
                    u = e !== !1 && k,
                    f = 500,
                    _ = 33,
                    m = "tick",
                    g = function (t) {
                        var e,
                            o,
                            a = P() - C;
                        a > f && (d += a - _),
                            (C += a),
                            (h.time = (C - d) / 1e3),
                            (e = h.time - l),
                            (!i || e > 0 || t === !0) && (h.frame++, (l += e + (e >= n ? 0.004 : n - e)), (o = !0)),
                            t !== !0 && (r = s(g)),
                            o && h.dispatchEvent(m);
                    };
                b.call(h),
                    (h.time = h.frame = 0),
                    (h.tick = function () {
                        g(!0);
                    }),
                    (h.lagSmoothing = function (t, e) {
                        (f = t || 1 / c), (_ = Math.min(e, f, 0));
                    }),
                    (h.sleep = function () {
                        null != r && (u && S ? S(r) : clearTimeout(r), (s = p), (r = null), h === o && (a = !1));
                    }),
                    (h.wake = function () {
                        null !== r ? h.sleep() : h.frame > 10 && (C = P() - f + 5),
                            (s =
                                0 === i
                                    ? p
                                    : u && k
                                      ? k
                                      : function (t) {
                                            return setTimeout(t, 0 | (1e3 * (l - h.time) + 1));
                                        }),
                            h === o && (a = !0),
                            g(2);
                    }),
                    (h.fps = function (t) {
                        return arguments.length
                            ? ((i = t), (n = 1 / (i || 60)), (l = this.time + n), void h.wake())
                            : i;
                    }),
                    (h.useRAF = function (t) {
                        return arguments.length ? (h.sleep(), (u = t), void h.fps(i)) : u;
                    }),
                    h.fps(t),
                    setTimeout(function () {
                        u && 5 > h.frame && h.useRAF(!1);
                    }, 1500);
            }),
                (n = h.Ticker.prototype = new h.events.EventDispatcher()),
                (n.constructor = h.Ticker);
            var O = g("core.Animation", function (t, e) {
                if (
                    ((this.vars = e = e || {}),
                    (this._duration = this._totalDuration = t || 0),
                    (this._delay = Number(e.delay) || 0),
                    (this._timeScale = 1),
                    (this._active = e.immediateRender === !0),
                    (this.data = e.data),
                    (this._reversed = e.reversed === !0),
                    U)
                ) {
                    a || o.wake();
                    var i = this.vars.useFrames ? q : U;
                    i.add(this, i._time), this.vars.paused && this.paused(!0);
                }
            });
            (o = O.ticker = new h.Ticker()),
                (n = O.prototype),
                (n._dirty = n._gc = n._initted = n._paused = !1),
                (n._totalTime = n._time = 0),
                (n._rawPrevTime = -1),
                (n._next = n._last = n._onUpdate = n._timeline = n.timeline = null),
                (n._paused = !1);
            var A = function () {
                a && P() - C > 2e3 && o.wake(), setTimeout(A, 2e3);
            };
            A(),
                (n.play = function (t, e) {
                    return null != t && this.seek(t, e), this.reversed(!1).paused(!1);
                }),
                (n.pause = function (t, e) {
                    return null != t && this.seek(t, e), this.paused(!0);
                }),
                (n.resume = function (t, e) {
                    return null != t && this.seek(t, e), this.paused(!1);
                }),
                (n.seek = function (t, e) {
                    return this.totalTime(Number(t), e !== !1);
                }),
                (n.restart = function (t, e) {
                    return this.reversed(!1)
                        .paused(!1)
                        .totalTime(t ? -this._delay : 0, e !== !1, !0);
                }),
                (n.reverse = function (t, e) {
                    return null != t && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1);
                }),
                (n.render = function () {}),
                (n.invalidate = function () {
                    return (
                        (this._time = this._totalTime = 0),
                        (this._initted = this._gc = !1),
                        (this._rawPrevTime = -1),
                        (this._gc || !this.timeline) && this._enabled(!0),
                        this
                    );
                }),
                (n.isActive = function () {
                    var t,
                        e = this._timeline,
                        i = this._startTime;
                    return (
                        !e ||
                        (!this._gc &&
                            !this._paused &&
                            e.isActive() &&
                            (t = e.rawTime()) >= i &&
                            i + this.totalDuration() / this._timeScale > t)
                    );
                }),
                (n._enabled = function (t, e) {
                    return (
                        a || o.wake(),
                        (this._gc = !t),
                        (this._active = this.isActive()),
                        e !== !0 &&
                            (t && !this.timeline
                                ? this._timeline.add(this, this._startTime - this._delay)
                                : !t && this.timeline && this._timeline._remove(this, !0)),
                        !1
                    );
                }),
                (n._kill = function () {
                    return this._enabled(!1, !1);
                }),
                (n.kill = function (t, e) {
                    return this._kill(t, e), this;
                }),
                (n._uncache = function (t) {
                    for (var e = t ? this : this.timeline; e; ) (e._dirty = !0), (e = e.timeline);
                    return this;
                }),
                (n._swapSelfInParams = function (t) {
                    for (var e = t.length, i = t.concat(); --e > -1; ) "{self}" === t[e] && (i[e] = this);
                    return i;
                }),
                (n._callback = function (t) {
                    var e = this.vars;
                    e[t].apply(e[t + "Scope"] || e.callbackScope || this, e[t + "Params"] || y);
                }),
                (n.eventCallback = function (t, e, i, s) {
                    if ("on" === (t || "").substr(0, 2)) {
                        var r = this.vars;
                        if (1 === arguments.length) return r[t];
                        null == e
                            ? delete r[t]
                            : ((r[t] = e),
                              (r[t + "Params"] =
                                  u(i) && -1 !== i.join("").indexOf("{self}") ? this._swapSelfInParams(i) : i),
                              (r[t + "Scope"] = s)),
                            "onUpdate" === t && (this._onUpdate = e);
                    }
                    return this;
                }),
                (n.delay = function (t) {
                    return arguments.length
                        ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + t - this._delay),
                          (this._delay = t),
                          this)
                        : this._delay;
                }),
                (n.duration = function (t) {
                    return arguments.length
                        ? ((this._duration = this._totalDuration = t),
                          this._uncache(!0),
                          this._timeline.smoothChildTiming &&
                              this._time > 0 &&
                              this._time < this._duration &&
                              0 !== t &&
                              this.totalTime(this._totalTime * (t / this._duration), !0),
                          this)
                        : ((this._dirty = !1), this._duration);
                }),
                (n.totalDuration = function (t) {
                    return (this._dirty = !1), arguments.length ? this.duration(t) : this._totalDuration;
                }),
                (n.time = function (t, e) {
                    return arguments.length
                        ? (this._dirty && this.totalDuration(),
                          this.totalTime(t > this._duration ? this._duration : t, e))
                        : this._time;
                }),
                (n.totalTime = function (t, e, i) {
                    if ((a || o.wake(), !arguments.length)) return this._totalTime;
                    if (this._timeline) {
                        if ((0 > t && !i && (t += this.totalDuration()), this._timeline.smoothChildTiming)) {
                            this._dirty && this.totalDuration();
                            var s = this._totalDuration,
                                r = this._timeline;
                            if (
                                (t > s && !i && (t = s),
                                (this._startTime =
                                    (this._paused ? this._pauseTime : r._time) -
                                    (this._reversed ? s - t : t) / this._timeScale),
                                r._dirty || this._uncache(!1),
                                r._timeline)
                            )
                                for (; r._timeline; )
                                    r._timeline._time !== (r._startTime + r._totalTime) / r._timeScale &&
                                        r.totalTime(r._totalTime, !0),
                                        (r = r._timeline);
                        }
                        this._gc && this._enabled(!0, !1),
                            (this._totalTime !== t || 0 === this._duration) &&
                                (z.length && G(), this.render(t, e, !1), z.length && G());
                    }
                    return this;
                }),
                (n.progress = n.totalProgress =
                    function (t, e) {
                        var i = this.duration();
                        return arguments.length ? this.totalTime(i * t, e) : i ? this._time / i : this.ratio;
                    }),
                (n.startTime = function (t) {
                    return arguments.length
                        ? (t !== this._startTime &&
                              ((this._startTime = t),
                              this.timeline && this.timeline._sortChildren && this.timeline.add(this, t - this._delay)),
                          this)
                        : this._startTime;
                }),
                (n.endTime = function (t) {
                    return this._startTime + (0 != t ? this.totalDuration() : this.duration()) / this._timeScale;
                }),
                (n.timeScale = function (t) {
                    if (!arguments.length) return this._timeScale;
                    if (((t = t || c), this._timeline && this._timeline.smoothChildTiming)) {
                        var e = this._pauseTime,
                            i = e || 0 === e ? e : this._timeline.totalTime();
                        this._startTime = i - ((i - this._startTime) * this._timeScale) / t;
                    }
                    return (this._timeScale = t), this._uncache(!1);
                }),
                (n.reversed = function (t) {
                    return arguments.length
                        ? (t != this._reversed &&
                              ((this._reversed = t),
                              this.totalTime(
                                  this._timeline && !this._timeline.smoothChildTiming
                                      ? this.totalDuration() - this._totalTime
                                      : this._totalTime,
                                  !0
                              )),
                          this)
                        : this._reversed;
                }),
                (n.paused = function (t) {
                    if (!arguments.length) return this._paused;
                    var e,
                        i,
                        s = this._timeline;
                    return (
                        t != this._paused &&
                            s &&
                            (a || t || o.wake(),
                            (e = s.rawTime()),
                            (i = e - this._pauseTime),
                            !t && s.smoothChildTiming && ((this._startTime += i), this._uncache(!1)),
                            (this._pauseTime = t ? e : null),
                            (this._paused = t),
                            (this._active = this.isActive()),
                            !t &&
                                0 !== i &&
                                this._initted &&
                                this.duration() &&
                                ((e = s.smoothChildTiming ? this._totalTime : (e - this._startTime) / this._timeScale),
                                this.render(e, e === this._totalTime, !0))),
                        this._gc && !t && this._enabled(!0, !1),
                        this
                    );
                });
            var $ = g("core.SimpleTimeline", function (t) {
                O.call(this, 0, t), (this.autoRemoveChildren = this.smoothChildTiming = !0);
            });
            (n = $.prototype = new O()),
                (n.constructor = $),
                (n.kill()._gc = !1),
                (n._first = n._last = n._recent = null),
                (n._sortChildren = !1),
                (n.add = n.insert =
                    function (t, e) {
                        var i, s;
                        if (
                            ((t._startTime = Number(e || 0) + t._delay),
                            t._paused &&
                                this !== t._timeline &&
                                (t._pauseTime = t._startTime + (this.rawTime() - t._startTime) / t._timeScale),
                            t.timeline && t.timeline._remove(t, !0),
                            (t.timeline = t._timeline = this),
                            t._gc && t._enabled(!0, !0),
                            (i = this._last),
                            this._sortChildren)
                        )
                            for (s = t._startTime; i && i._startTime > s; ) i = i._prev;
                        return (
                            i ? ((t._next = i._next), (i._next = t)) : ((t._next = this._first), (this._first = t)),
                            t._next ? (t._next._prev = t) : (this._last = t),
                            (t._prev = i),
                            (this._recent = t),
                            this._timeline && this._uncache(!0),
                            this
                        );
                    }),
                (n._remove = function (t, e) {
                    return (
                        t.timeline === this &&
                            (e || t._enabled(!1, !0),
                            t._prev ? (t._prev._next = t._next) : this._first === t && (this._first = t._next),
                            t._next ? (t._next._prev = t._prev) : this._last === t && (this._last = t._prev),
                            (t._next = t._prev = t.timeline = null),
                            t === this._recent && (this._recent = this._last),
                            this._timeline && this._uncache(!0)),
                        this
                    );
                }),
                (n.render = function (t, e, i) {
                    var s,
                        r = this._first;
                    for (this._totalTime = this._time = this._rawPrevTime = t; r; )
                        (s = r._next),
                            (r._active || (t >= r._startTime && !r._paused)) &&
                                (r._reversed
                                    ? r.render(
                                          (r._dirty ? r.totalDuration() : r._totalDuration) -
                                              (t - r._startTime) * r._timeScale,
                                          e,
                                          i
                                      )
                                    : r.render((t - r._startTime) * r._timeScale, e, i)),
                            (r = s);
                }),
                (n.rawTime = function () {
                    return a || o.wake(), this._totalTime;
                });
            var R = g(
                    "TweenLite",
                    function (e, i, s) {
                        if ((O.call(this, i, s), (this.render = R.prototype.render), null == e))
                            throw "Cannot tween a null target.";
                        this.target = e = "string" != typeof e ? e : R.selector(e) || e;
                        var r,
                            n,
                            o,
                            a =
                                e.jquery ||
                                (e.length &&
                                    e !== t &&
                                    e[0] &&
                                    (e[0] === t || (e[0].nodeType && e[0].style && !e.nodeType))),
                            l = this.vars.overwrite;
                        if (
                            ((this._overwrite = l =
                                null == l ? W[R.defaultOverwrite] : "number" == typeof l ? l >> 0 : W[l]),
                            (a || e instanceof Array || (e.push && u(e))) && "number" != typeof e[0])
                        )
                            for (
                                this._targets = o = d(e), this._propLookup = [], this._siblings = [], r = 0;
                                o.length > r;
                                r++
                            )
                                (n = o[r]),
                                    n
                                        ? "string" != typeof n
                                            ? n.length &&
                                              n !== t &&
                                              n[0] &&
                                              (n[0] === t || (n[0].nodeType && n[0].style && !n.nodeType))
                                                ? (o.splice(r--, 1), (this._targets = o = o.concat(d(n))))
                                                : ((this._siblings[r] = Z(n, this, !1)),
                                                  1 === l &&
                                                      this._siblings[r].length > 1 &&
                                                      J(n, this, null, 1, this._siblings[r]))
                                            : ((n = o[r--] = R.selector(n)), "string" == typeof n && o.splice(r + 1, 1))
                                        : o.splice(r--, 1);
                        else
                            (this._propLookup = {}),
                                (this._siblings = Z(e, this, !1)),
                                1 === l && this._siblings.length > 1 && J(e, this, null, 1, this._siblings);
                        (this.vars.immediateRender ||
                            (0 === i && 0 === this._delay && this.vars.immediateRender !== !1)) &&
                            ((this._time = -c), this.render(-this._delay));
                    },
                    !0
                ),
                M = function (e) {
                    return (
                        e && e.length && e !== t && e[0] && (e[0] === t || (e[0].nodeType && e[0].style && !e.nodeType))
                    );
                },
                D = function (t, e) {
                    var i,
                        s = {};
                    for (i in t)
                        B[i] ||
                            (i in e &&
                                "transform" !== i &&
                                "x" !== i &&
                                "y" !== i &&
                                "width" !== i &&
                                "height" !== i &&
                                "className" !== i &&
                                "border" !== i) ||
                            !(!j[i] || (j[i] && j[i]._autoCSS)) ||
                            ((s[i] = t[i]), delete t[i]);
                    t.css = s;
                };
            (n = R.prototype = new O()),
                (n.constructor = R),
                (n.kill()._gc = !1),
                (n.ratio = 0),
                (n._firstPT = n._targets = n._overwrittenProps = n._startAt = null),
                (n._notifyPluginsOfEnabled = n._lazy = !1),
                (R.version = "1.18.0"),
                (R.defaultEase = n._ease = new T(null, null, 1, 1)),
                (R.defaultOverwrite = "auto"),
                (R.ticker = o),
                (R.autoSleep = 120),
                (R.lagSmoothing = function (t, e) {
                    o.lagSmoothing(t, e);
                }),
                (R.selector =
                    t.$ ||
                    t.jQuery ||
                    function (e) {
                        var i = t.$ || t.jQuery;
                        return i
                            ? ((R.selector = i), i(e))
                            : "undefined" == typeof document
                              ? e
                              : document.querySelectorAll
                                ? document.querySelectorAll(e)
                                : document.getElementById("#" === e.charAt(0) ? e.substr(1) : e);
                    });
            var z = [],
                F = {},
                I = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
                L = function (t) {
                    for (var e, i = this._firstPT, s = 1e-6; i; )
                        (e = i.blob ? (t ? this.join("") : this.start) : i.c * t + i.s),
                            i.r ? (e = Math.round(e)) : s > e && e > -s && (e = 0),
                            i.f ? (i.fp ? i.t[i.p](i.fp, e) : i.t[i.p](e)) : (i.t[i.p] = e),
                            (i = i._next);
                },
                E = function (t, e, i, s) {
                    var r,
                        n,
                        o,
                        a,
                        l,
                        h,
                        c,
                        d = [t, e],
                        p = 0,
                        u = "",
                        f = 0;
                    for (
                        d.start = t,
                            i && (i(d), (t = d[0]), (e = d[1])),
                            d.length = 0,
                            r = t.match(I) || [],
                            n = e.match(I) || [],
                            s && ((s._next = null), (s.blob = 1), (d._firstPT = s)),
                            l = n.length,
                            a = 0;
                        l > a;
                        a++
                    )
                        (c = n[a]),
                            (h = e.substr(p, e.indexOf(c, p) - p)),
                            (u += h || !a ? h : ","),
                            (p += h.length),
                            f ? (f = (f + 1) % 5) : "rgba(" === h.substr(-5) && (f = 1),
                            c === r[a] || a >= r.length
                                ? (u += c)
                                : (u && (d.push(u), (u = "")),
                                  (o = parseFloat(r[a])),
                                  d.push(o),
                                  (d._firstPT = {
                                      _next: d._firstPT,
                                      t: d,
                                      p: d.length - 1,
                                      s: o,
                                      c:
                                          ("=" === c.charAt(1)
                                              ? parseInt(c.charAt(0) + "1", 10) * parseFloat(c.substr(2))
                                              : parseFloat(c) - o) || 0,
                                      f: 0,
                                      r: f && 4 > f,
                                  })),
                            (p += c.length);
                    return (u += e.substr(p)), u && d.push(u), (d.setRatio = L), d;
                },
                X = function (t, e, i, s, r, n, o, a) {
                    var l,
                        h,
                        c = "get" === i ? t[e] : i,
                        d = typeof t[e],
                        p = "string" == typeof s && "=" === s.charAt(1),
                        u = {
                            t: t,
                            p: e,
                            s: c,
                            f: "function" === d,
                            pg: 0,
                            n: r || e,
                            r: n,
                            pr: 0,
                            c: p ? parseInt(s.charAt(0) + "1", 10) * parseFloat(s.substr(2)) : parseFloat(s) - c || 0,
                        };
                    return (
                        "number" !== d &&
                            ("function" === d &&
                                "get" === i &&
                                ((h =
                                    e.indexOf("set") || "function" != typeof t["get" + e.substr(3)]
                                        ? e
                                        : "get" + e.substr(3)),
                                (u.s = c = o ? t[h](o) : t[h]())),
                            "string" == typeof c && (o || isNaN(c))
                                ? ((u.fp = o),
                                  (l = E(c, s, a || R.defaultStringFilter, u)),
                                  (u = { t: l, p: "setRatio", s: 0, c: 1, f: 2, pg: 0, n: r || e, pr: 0 }))
                                : p || (u.c = parseFloat(s) - parseFloat(c) || 0)),
                        u.c ? ((u._next = this._firstPT) && (u._next._prev = u), (this._firstPT = u), u) : void 0
                    );
                },
                N = (R._internals = { isArray: u, isSelector: M, lazyTweens: z, blobDif: E }),
                j = (R._plugins = {}),
                H = (N.tweenLookup = {}),
                Y = 0,
                B = (N.reservedProps = {
                    ease: 1,
                    delay: 1,
                    overwrite: 1,
                    onComplete: 1,
                    onCompleteParams: 1,
                    onCompleteScope: 1,
                    useFrames: 1,
                    runBackwards: 1,
                    startAt: 1,
                    onUpdate: 1,
                    onUpdateParams: 1,
                    onUpdateScope: 1,
                    onStart: 1,
                    onStartParams: 1,
                    onStartScope: 1,
                    onReverseComplete: 1,
                    onReverseCompleteParams: 1,
                    onReverseCompleteScope: 1,
                    onRepeat: 1,
                    onRepeatParams: 1,
                    onRepeatScope: 1,
                    easeParams: 1,
                    yoyo: 1,
                    immediateRender: 1,
                    repeat: 1,
                    repeatDelay: 1,
                    data: 1,
                    paused: 1,
                    reversed: 1,
                    autoCSS: 1,
                    lazy: 1,
                    onOverwrite: 1,
                    callbackScope: 1,
                    stringFilter: 1,
                }),
                W = { none: 0, all: 1, auto: 2, concurrent: 3, allOnStart: 4, preexisting: 5, true: 1, false: 0 },
                q = (O._rootFramesTimeline = new $()),
                U = (O._rootTimeline = new $()),
                V = 30,
                G = (N.lazyRender = function () {
                    var t,
                        e = z.length;
                    for (F = {}; --e > -1; )
                        (t = z[e]), t && t._lazy !== !1 && (t.render(t._lazy[0], t._lazy[1], !0), (t._lazy = !1));
                    z.length = 0;
                });
            (U._startTime = o.time),
                (q._startTime = o.frame),
                (U._active = q._active = !0),
                setTimeout(G, 1),
                (O._updateRoot = R.render =
                    function () {
                        var t, e, i;
                        if (
                            (z.length && G(),
                            U.render((o.time - U._startTime) * U._timeScale, !1, !1),
                            q.render((o.frame - q._startTime) * q._timeScale, !1, !1),
                            z.length && G(),
                            o.frame >= V)
                        ) {
                            V = o.frame + (parseInt(R.autoSleep, 10) || 120);
                            for (i in H) {
                                for (e = H[i].tweens, t = e.length; --t > -1; ) e[t]._gc && e.splice(t, 1);
                                0 === e.length && delete H[i];
                            }
                            if (
                                ((i = U._first),
                                (!i || i._paused) && R.autoSleep && !q._first && 1 === o._listeners.tick.length)
                            ) {
                                for (; i && i._paused; ) i = i._next;
                                i || o.sleep();
                            }
                        }
                    }),
                o.addEventListener("tick", O._updateRoot);
            var Z = function (t, e, i) {
                    var s,
                        r,
                        n = t._gsTweenID;
                    if (
                        (H[n || (t._gsTweenID = n = "t" + Y++)] || (H[n] = { target: t, tweens: [] }),
                        e && ((s = H[n].tweens), (s[(r = s.length)] = e), i))
                    )
                        for (; --r > -1; ) s[r] === e && s.splice(r, 1);
                    return H[n].tweens;
                },
                Q = function (t, e, i, s) {
                    var r,
                        n,
                        o = t.vars.onOverwrite;
                    return (
                        o && (r = o(t, e, i, s)), (o = R.onOverwrite), o && (n = o(t, e, i, s)), r !== !1 && n !== !1
                    );
                },
                J = function (t, e, i, s, r) {
                    var n, o, a, l;
                    if (1 === s || s >= 4) {
                        for (l = r.length, n = 0; l > n; n++)
                            if ((a = r[n]) !== e) a._gc || (a._kill(null, t, e) && (o = !0));
                            else if (5 === s) break;
                        return o;
                    }
                    var h,
                        d = e._startTime + c,
                        p = [],
                        u = 0,
                        f = 0 === e._duration;
                    for (n = r.length; --n > -1; )
                        (a = r[n]) === e ||
                            a._gc ||
                            a._paused ||
                            (a._timeline !== e._timeline
                                ? ((h = h || K(e, 0, f)), 0 === K(a, h, f) && (p[u++] = a))
                                : d >= a._startTime &&
                                  a._startTime + a.totalDuration() / a._timeScale > d &&
                                  (((f || !a._initted) && 2e-10 >= d - a._startTime) || (p[u++] = a)));
                    for (n = u; --n > -1; )
                        if (
                            ((a = p[n]),
                            2 === s && a._kill(i, t, e) && (o = !0),
                            2 !== s || (!a._firstPT && a._initted))
                        ) {
                            if (2 !== s && !Q(a, e)) continue;
                            a._enabled(!1, !1) && (o = !0);
                        }
                    return o;
                },
                K = function (t, e, i) {
                    for (var s = t._timeline, r = s._timeScale, n = t._startTime; s._timeline; ) {
                        if (((n += s._startTime), (r *= s._timeScale), s._paused)) return -100;
                        s = s._timeline;
                    }
                    return (
                        (n /= r),
                        n > e
                            ? n - e
                            : (i && n === e) || (!t._initted && 2 * c > n - e)
                              ? c
                              : (n += t.totalDuration() / t._timeScale / r) > e + c
                                ? 0
                                : n - e - c
                    );
                };
            (n._init = function () {
                var t,
                    e,
                    i,
                    s,
                    r,
                    n = this.vars,
                    o = this._overwrittenProps,
                    a = this._duration,
                    l = !!n.immediateRender,
                    h = n.ease;
                if (n.startAt) {
                    this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), (r = {});
                    for (s in n.startAt) r[s] = n.startAt[s];
                    if (
                        ((r.overwrite = !1),
                        (r.immediateRender = !0),
                        (r.lazy = l && n.lazy !== !1),
                        (r.startAt = r.delay = null),
                        (this._startAt = R.to(this.target, 0, r)),
                        l)
                    )
                        if (this._time > 0) this._startAt = null;
                        else if (0 !== a) return;
                } else if (n.runBackwards && 0 !== a)
                    if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), (this._startAt = null);
                    else {
                        0 !== this._time && (l = !1), (i = {});
                        for (s in n) (B[s] && "autoCSS" !== s) || (i[s] = n[s]);
                        if (
                            ((i.overwrite = 0),
                            (i.data = "isFromStart"),
                            (i.lazy = l && n.lazy !== !1),
                            (i.immediateRender = l),
                            (this._startAt = R.to(this.target, 0, i)),
                            l)
                        ) {
                            if (0 === this._time) return;
                        } else
                            this._startAt._init(),
                                this._startAt._enabled(!1),
                                this.vars.immediateRender && (this._startAt = null);
                    }
                if (
                    ((this._ease = h =
                        h
                            ? h instanceof T
                                ? h
                                : "function" == typeof h
                                  ? new T(h, n.easeParams)
                                  : w[h] || R.defaultEase
                            : R.defaultEase),
                    n.easeParams instanceof Array && h.config && (this._ease = h.config.apply(h, n.easeParams)),
                    (this._easeType = this._ease._type),
                    (this._easePower = this._ease._power),
                    (this._firstPT = null),
                    this._targets)
                )
                    for (t = this._targets.length; --t > -1; )
                        this._initProps(
                            this._targets[t],
                            (this._propLookup[t] = {}),
                            this._siblings[t],
                            o ? o[t] : null
                        ) && (e = !0);
                else e = this._initProps(this.target, this._propLookup, this._siblings, o);
                if (
                    (e && R._onPluginEvent("_onInitAllProps", this),
                    o && (this._firstPT || ("function" != typeof this.target && this._enabled(!1, !1))),
                    n.runBackwards)
                )
                    for (i = this._firstPT; i; ) (i.s += i.c), (i.c = -i.c), (i = i._next);
                (this._onUpdate = n.onUpdate), (this._initted = !0);
            }),
                (n._initProps = function (e, i, s, r) {
                    var n, o, a, l, h, c;
                    if (null == e) return !1;
                    F[e._gsTweenID] && G(),
                        this.vars.css ||
                            (e.style && e !== t && e.nodeType && j.css && this.vars.autoCSS !== !1 && D(this.vars, e));
                    for (n in this.vars)
                        if (((c = this.vars[n]), B[n]))
                            c &&
                                (c instanceof Array || (c.push && u(c))) &&
                                -1 !== c.join("").indexOf("{self}") &&
                                (this.vars[n] = c = this._swapSelfInParams(c, this));
                        else if (j[n] && (l = new j[n]())._onInitTween(e, this.vars[n], this)) {
                            for (
                                this._firstPT = h =
                                    {
                                        _next: this._firstPT,
                                        t: l,
                                        p: "setRatio",
                                        s: 0,
                                        c: 1,
                                        f: 1,
                                        n: n,
                                        pg: 1,
                                        pr: l._priority,
                                    },
                                    o = l._overwriteProps.length;
                                --o > -1;

                            )
                                i[l._overwriteProps[o]] = this._firstPT;
                            (l._priority || l._onInitAllProps) && (a = !0),
                                (l._onDisable || l._onEnable) && (this._notifyPluginsOfEnabled = !0),
                                h._next && (h._next._prev = h);
                        } else i[n] = X.call(this, e, n, "get", c, n, 0, null, this.vars.stringFilter);
                    return r && this._kill(r, e)
                        ? this._initProps(e, i, s, r)
                        : this._overwrite > 1 && this._firstPT && s.length > 1 && J(e, this, i, this._overwrite, s)
                          ? (this._kill(i, e), this._initProps(e, i, s, r))
                          : (this._firstPT &&
                                ((this.vars.lazy !== !1 && this._duration) || (this.vars.lazy && !this._duration)) &&
                                (F[e._gsTweenID] = !0),
                            a);
                }),
                (n.render = function (t, e, i) {
                    var s,
                        r,
                        n,
                        o,
                        a = this._time,
                        l = this._duration,
                        h = this._rawPrevTime;
                    if (t >= l)
                        (this._totalTime = this._time = l),
                            (this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1),
                            this._reversed ||
                                ((s = !0), (r = "onComplete"), (i = i || this._timeline.autoRemoveChildren)),
                            0 === l &&
                                (this._initted || !this.vars.lazy || i) &&
                                (this._startTime === this._timeline._duration && (t = 0),
                                (0 === t || 0 > h || (h === c && "isPause" !== this.data)) &&
                                    h !== t &&
                                    ((i = !0), h > c && (r = "onReverseComplete")),
                                (this._rawPrevTime = o = !e || t || h === t ? t : c));
                    else if (1e-7 > t)
                        (this._totalTime = this._time = 0),
                            (this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0),
                            (0 !== a || (0 === l && h > 0)) && ((r = "onReverseComplete"), (s = this._reversed)),
                            0 > t &&
                                ((this._active = !1),
                                0 === l &&
                                    (this._initted || !this.vars.lazy || i) &&
                                    (h >= 0 && (h !== c || "isPause" !== this.data) && (i = !0),
                                    (this._rawPrevTime = o = !e || t || h === t ? t : c))),
                            this._initted || (i = !0);
                    else if (((this._totalTime = this._time = t), this._easeType)) {
                        var d = t / l,
                            p = this._easeType,
                            u = this._easePower;
                        (1 === p || (3 === p && d >= 0.5)) && (d = 1 - d),
                            3 === p && (d *= 2),
                            1 === u
                                ? (d *= d)
                                : 2 === u
                                  ? (d *= d * d)
                                  : 3 === u
                                    ? (d *= d * d * d)
                                    : 4 === u && (d *= d * d * d * d),
                            (this.ratio = 1 === p ? 1 - d : 2 === p ? d : 0.5 > t / l ? d / 2 : 1 - d / 2);
                    } else this.ratio = this._ease.getRatio(t / l);
                    if (this._time !== a || i) {
                        if (!this._initted) {
                            if ((this._init(), !this._initted || this._gc)) return;
                            if (
                                !i &&
                                this._firstPT &&
                                ((this.vars.lazy !== !1 && this._duration) || (this.vars.lazy && !this._duration))
                            )
                                return (
                                    (this._time = this._totalTime = a),
                                    (this._rawPrevTime = h),
                                    z.push(this),
                                    void (this._lazy = [t, e])
                                );
                            this._time && !s
                                ? (this.ratio = this._ease.getRatio(this._time / l))
                                : s &&
                                  this._ease._calcEnd &&
                                  (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1));
                        }
                        for (
                            this._lazy !== !1 && (this._lazy = !1),
                                this._active || (!this._paused && this._time !== a && t >= 0 && (this._active = !0)),
                                0 === a &&
                                    (this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : r || (r = "_dummyGS")),
                                    this.vars.onStart &&
                                        (0 !== this._time || 0 === l) &&
                                        (e || this._callback("onStart"))),
                                n = this._firstPT;
                            n;

                        )
                            n.f ? n.t[n.p](n.c * this.ratio + n.s) : (n.t[n.p] = n.c * this.ratio + n.s), (n = n._next);
                        this._onUpdate &&
                            (0 > t && this._startAt && t !== -1e-4 && this._startAt.render(t, e, i),
                            e || ((this._time !== a || s) && this._callback("onUpdate"))),
                            r &&
                                (!this._gc || i) &&
                                (0 > t &&
                                    this._startAt &&
                                    !this._onUpdate &&
                                    t !== -1e-4 &&
                                    this._startAt.render(t, e, i),
                                s && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), (this._active = !1)),
                                !e && this.vars[r] && this._callback(r),
                                0 === l && this._rawPrevTime === c && o !== c && (this._rawPrevTime = 0));
                    }
                }),
                (n._kill = function (t, e, i) {
                    if (("all" === t && (t = null), null == t && (null == e || e === this.target)))
                        return (this._lazy = !1), this._enabled(!1, !1);
                    e = "string" != typeof e ? e || this._targets || this.target : R.selector(e) || e;
                    var s,
                        r,
                        n,
                        o,
                        a,
                        l,
                        h,
                        c,
                        d,
                        p = i && this._time && i._startTime === this._startTime && this._timeline === i._timeline;
                    if ((u(e) || M(e)) && "number" != typeof e[0])
                        for (s = e.length; --s > -1; ) this._kill(t, e[s], i) && (l = !0);
                    else {
                        if (this._targets) {
                            for (s = this._targets.length; --s > -1; )
                                if (e === this._targets[s]) {
                                    (a = this._propLookup[s] || {}),
                                        (this._overwrittenProps = this._overwrittenProps || []),
                                        (r = this._overwrittenProps[s] = t ? this._overwrittenProps[s] || {} : "all");
                                    break;
                                }
                        } else {
                            if (e !== this.target) return !1;
                            (a = this._propLookup),
                                (r = this._overwrittenProps = t ? this._overwrittenProps || {} : "all");
                        }
                        if (a) {
                            if (
                                ((h = t || a),
                                (c = t !== r && "all" !== r && t !== a && ("object" != typeof t || !t._tempKill)),
                                i && (R.onOverwrite || this.vars.onOverwrite))
                            ) {
                                for (n in h) a[n] && (d || (d = []), d.push(n));
                                if ((d || !t) && !Q(this, i, e, d)) return !1;
                            }
                            for (n in h)
                                (o = a[n]) &&
                                    (p && (o.f ? o.t[o.p](o.s) : (o.t[o.p] = o.s), (l = !0)),
                                    o.pg && o.t._kill(h) && (l = !0),
                                    (o.pg && 0 !== o.t._overwriteProps.length) ||
                                        (o._prev
                                            ? (o._prev._next = o._next)
                                            : o === this._firstPT && (this._firstPT = o._next),
                                        o._next && (o._next._prev = o._prev),
                                        (o._next = o._prev = null)),
                                    delete a[n]),
                                    c && (r[n] = 1);
                            !this._firstPT && this._initted && this._enabled(!1, !1);
                        }
                    }
                    return l;
                }),
                (n.invalidate = function () {
                    return (
                        this._notifyPluginsOfEnabled && R._onPluginEvent("_onDisable", this),
                        (this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null),
                        (this._notifyPluginsOfEnabled = this._active = this._lazy = !1),
                        (this._propLookup = this._targets ? {} : []),
                        O.prototype.invalidate.call(this),
                        this.vars.immediateRender && ((this._time = -c), this.render(-this._delay)),
                        this
                    );
                }),
                (n._enabled = function (t, e) {
                    if ((a || o.wake(), t && this._gc)) {
                        var i,
                            s = this._targets;
                        if (s) for (i = s.length; --i > -1; ) this._siblings[i] = Z(s[i], this, !0);
                        else this._siblings = Z(this.target, this, !0);
                    }
                    return (
                        O.prototype._enabled.call(this, t, e),
                        this._notifyPluginsOfEnabled && this._firstPT
                            ? R._onPluginEvent(t ? "_onEnable" : "_onDisable", this)
                            : !1
                    );
                }),
                (R.to = function (t, e, i) {
                    return new R(t, e, i);
                }),
                (R.from = function (t, e, i) {
                    return (i.runBackwards = !0), (i.immediateRender = 0 != i.immediateRender), new R(t, e, i);
                }),
                (R.fromTo = function (t, e, i, s) {
                    return (
                        (s.startAt = i),
                        (s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender),
                        new R(t, e, s)
                    );
                }),
                (R.delayedCall = function (t, e, i, s, r) {
                    return new R(e, 0, {
                        delay: t,
                        onComplete: e,
                        onCompleteParams: i,
                        callbackScope: s,
                        onReverseComplete: e,
                        onReverseCompleteParams: i,
                        immediateRender: !1,
                        lazy: !1,
                        useFrames: r,
                        overwrite: 0,
                    });
                }),
                (R.set = function (t, e) {
                    return new R(t, 0, e);
                }),
                (R.getTweensOf = function (t, e) {
                    if (null == t) return [];
                    t = "string" != typeof t ? t : R.selector(t) || t;
                    var i, s, r, n;
                    if ((u(t) || M(t)) && "number" != typeof t[0]) {
                        for (i = t.length, s = []; --i > -1; ) s = s.concat(R.getTweensOf(t[i], e));
                        for (i = s.length; --i > -1; ) for (n = s[i], r = i; --r > -1; ) n === s[r] && s.splice(i, 1);
                    } else
                        for (s = Z(t).concat(), i = s.length; --i > -1; )
                            (s[i]._gc || (e && !s[i].isActive())) && s.splice(i, 1);
                    return s;
                }),
                (R.killTweensOf = R.killDelayedCallsTo =
                    function (t, e, i) {
                        "object" == typeof e && ((i = e), (e = !1));
                        for (var s = R.getTweensOf(t, e), r = s.length; --r > -1; ) s[r]._kill(i, t);
                    });
            var te = g(
                "plugins.TweenPlugin",
                function (t, e) {
                    (this._overwriteProps = (t || "").split(",")),
                        (this._propName = this._overwriteProps[0]),
                        (this._priority = e || 0),
                        (this._super = te.prototype);
                },
                !0
            );
            if (
                ((n = te.prototype),
                (te.version = "1.18.0"),
                (te.API = 2),
                (n._firstPT = null),
                (n._addTween = X),
                (n.setRatio = L),
                (n._kill = function (t) {
                    var e,
                        i = this._overwriteProps,
                        s = this._firstPT;
                    if (null != t[this._propName]) this._overwriteProps = [];
                    else for (e = i.length; --e > -1; ) null != t[i[e]] && i.splice(e, 1);
                    for (; s; )
                        null != t[s.n] &&
                            (s._next && (s._next._prev = s._prev),
                            s._prev
                                ? ((s._prev._next = s._next), (s._prev = null))
                                : this._firstPT === s && (this._firstPT = s._next)),
                            (s = s._next);
                    return !1;
                }),
                (n._roundProps = function (t, e) {
                    for (var i = this._firstPT; i; )
                        (t[this._propName] || (null != i.n && t[i.n.split(this._propName + "_").join("")])) &&
                            (i.r = e),
                            (i = i._next);
                }),
                (R._onPluginEvent = function (t, e) {
                    var i,
                        s,
                        r,
                        n,
                        o,
                        a = e._firstPT;
                    if ("_onInitAllProps" === t) {
                        for (; a; ) {
                            for (o = a._next, s = r; s && s.pr > a.pr; ) s = s._next;
                            (a._prev = s ? s._prev : n) ? (a._prev._next = a) : (r = a),
                                (a._next = s) ? (s._prev = a) : (n = a),
                                (a = o);
                        }
                        a = e._firstPT = r;
                    }
                    for (; a; ) a.pg && "function" == typeof a.t[t] && a.t[t]() && (i = !0), (a = a._next);
                    return i;
                }),
                (te.activate = function (t) {
                    for (var e = t.length; --e > -1; ) t[e].API === te.API && (j[new t[e]()._propName] = t[e]);
                    return !0;
                }),
                (m.plugin = function (t) {
                    if (!(t && t.propName && t.init && t.API)) throw "illegal plugin definition.";
                    var e,
                        i = t.propName,
                        s = t.priority || 0,
                        r = t.overwriteProps,
                        n = {
                            init: "_onInitTween",
                            set: "setRatio",
                            kill: "_kill",
                            round: "_roundProps",
                            initAll: "_onInitAllProps",
                        },
                        o = g(
                            "plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin",
                            function () {
                                te.call(this, i, s), (this._overwriteProps = r || []);
                            },
                            t.global === !0
                        ),
                        a = (o.prototype = new te(i));
                    (a.constructor = o), (o.API = t.API);
                    for (e in n) "function" == typeof t[e] && (a[n[e]] = t[e]);
                    return (o.version = t.version), te.activate([o]), o;
                }),
                (s = t._gsQueue))
            ) {
                for (r = 0; s.length > r; r++) s[r]();
                for (n in f) f[n].func || t.console.log("GSAP encountered missing dependency: com.greensock." + n);
            }
            a = !1;
        }
    })(
        "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window,
        "TweenMax"
    ); /*!
 * VERSION: 1.7.5
 * DATE: 2015-02-26
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2015, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
    "use strict";
    var t = document.documentElement,
        e = window,
        i = function (i, s) {
            var r = "x" === s ? "Width" : "Height",
                n = "scroll" + r,
                o = "client" + r,
                a = document.body;
            return i === e || i === t || i === a
                ? Math.max(t[n], a[n]) - (e["inner" + r] || t[o] || a[o])
                : i[n] - i["offset" + r];
        },
        s = _gsScope._gsDefine.plugin({
            propName: "scrollTo",
            API: 2,
            version: "1.7.5",
            init: function (t, s, r) {
                return (
                    (this._wdw = t === e),
                    (this._target = t),
                    (this._tween = r),
                    "object" != typeof s && (s = { y: s }),
                    (this.vars = s),
                    (this._autoKill = s.autoKill !== !1),
                    (this.x = this.xPrev = this.getX()),
                    (this.y = this.yPrev = this.getY()),
                    null != s.x
                        ? (this._addTween(this, "x", this.x, "max" === s.x ? i(t, "x") : s.x, "scrollTo_x", !0),
                          this._overwriteProps.push("scrollTo_x"))
                        : (this.skipX = !0),
                    null != s.y
                        ? (this._addTween(this, "y", this.y, "max" === s.y ? i(t, "y") : s.y, "scrollTo_y", !0),
                          this._overwriteProps.push("scrollTo_y"))
                        : (this.skipY = !0),
                    !0
                );
            },
            set: function (t) {
                this._super.setRatio.call(this, t);
                var s = this._wdw || !this.skipX ? this.getX() : this.xPrev,
                    r = this._wdw || !this.skipY ? this.getY() : this.yPrev,
                    n = r - this.yPrev,
                    o = s - this.xPrev;
                this._autoKill &&
                    (!this.skipX && (o > 7 || -7 > o) && i(this._target, "x") > s && (this.skipX = !0),
                    !this.skipY && (n > 7 || -7 > n) && i(this._target, "y") > r && (this.skipY = !0),
                    this.skipX &&
                        this.skipY &&
                        (this._tween.kill(),
                        this.vars.onAutoKill &&
                            this.vars.onAutoKill.apply(
                                this.vars.onAutoKillScope || this._tween,
                                this.vars.onAutoKillParams || []
                            ))),
                    this._wdw
                        ? e.scrollTo(this.skipX ? s : this.x, this.skipY ? r : this.y)
                        : (this.skipY || (this._target.scrollTop = this.y),
                          this.skipX || (this._target.scrollLeft = this.x)),
                    (this.xPrev = this.x),
                    (this.yPrev = this.y);
            },
        }),
        r = s.prototype;
    (s.max = i),
        (r.getX = function () {
            return this._wdw
                ? null != e.pageXOffset
                    ? e.pageXOffset
                    : null != t.scrollLeft
                      ? t.scrollLeft
                      : document.body.scrollLeft
                : this._target.scrollLeft;
        }),
        (r.getY = function () {
            return this._wdw
                ? null != e.pageYOffset
                    ? e.pageYOffset
                    : null != t.scrollTop
                      ? t.scrollTop
                      : document.body.scrollTop
                : this._target.scrollTop;
        }),
        (r._kill = function (t) {
            return (
                t.scrollTo_x && (this.skipX = !0), t.scrollTo_y && (this.skipY = !0), this._super._kill.call(this, t)
            );
        });
}),
    _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    !(function (t) {
        "use strict";
        "function" == typeof define && define.amd
            ? define(["jquery"], t)
            : "undefined" != typeof exports
              ? (module.exports = t(require("jquery")))
              : t(jQuery);
    })(function (t) {
        "use strict";
        var e = window.Slick || {};
        (e = (function () {
            function e(e, s) {
                var r,
                    n = this;
                (n.defaults = {
                    accessibility: !0,
                    adaptiveHeight: !1,
                    appendArrows: t(e),
                    appendDots: t(e),
                    arrows: !0,
                    asNavFor: null,
                    prevArrow:
                        '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                    nextArrow:
                        '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                    autoplay: !1,
                    autoplaySpeed: 3e3,
                    centerMode: !1,
                    centerPadding: "50px",
                    cssEase: "ease",
                    customPaging: function (t, e) {
                        return (
                            '<button type="button" data-role="none" role="button" aria-required="false" tabindex="0">' +
                            (e + 1) +
                            "</button>"
                        );
                    },
                    dots: !1,
                    dotsClass: "slick-dots",
                    draggable: !0,
                    easing: "linear",
                    edgeFriction: 0.35,
                    fade: !1,
                    focusOnSelect: !1,
                    infinite: !0,
                    initialSlide: 0,
                    lazyLoad: "ondemand",
                    mobileFirst: !1,
                    pauseOnHover: !0,
                    pauseOnDotsHover: !1,
                    respondTo: "window",
                    responsive: null,
                    rows: 1,
                    rtl: !1,
                    slide: "",
                    slidesPerRow: 1,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 500,
                    swipe: !0,
                    swipeToSlide: !1,
                    touchMove: !0,
                    touchThreshold: 5,
                    useCSS: !0,
                    useTransform: !1,
                    variableWidth: !1,
                    vertical: !1,
                    verticalSwiping: !1,
                    waitForAnimate: !0,
                    zIndex: 1e3,
                }),
                    (n.initials = {
                        animating: !1,
                        dragging: !1,
                        autoPlayTimer: null,
                        currentDirection: 0,
                        currentLeft: null,
                        currentSlide: 0,
                        direction: 1,
                        $dots: null,
                        listWidth: null,
                        listHeight: null,
                        loadIndex: 0,
                        $nextArrow: null,
                        $prevArrow: null,
                        slideCount: null,
                        slideWidth: null,
                        $slideTrack: null,
                        $slides: null,
                        sliding: !1,
                        slideOffset: 0,
                        swipeLeft: null,
                        $list: null,
                        touchObject: {},
                        transformsEnabled: !1,
                        unslicked: !1,
                    }),
                    t.extend(n, n.initials),
                    (n.activeBreakpoint = null),
                    (n.animType = null),
                    (n.animProp = null),
                    (n.breakpoints = []),
                    (n.breakpointSettings = []),
                    (n.cssTransitions = !1),
                    (n.hidden = "hidden"),
                    (n.paused = !1),
                    (n.positionProp = null),
                    (n.respondTo = null),
                    (n.rowCount = 1),
                    (n.shouldClick = !0),
                    (n.$slider = t(e)),
                    (n.$slidesCache = null),
                    (n.transformType = null),
                    (n.transitionType = null),
                    (n.visibilityChange = "visibilitychange"),
                    (n.windowWidth = 0),
                    (n.windowTimer = null),
                    (r = t(e).data("slick") || {}),
                    (n.options = t.extend({}, n.defaults, r, s)),
                    (n.currentSlide = n.options.initialSlide),
                    (n.originalSettings = n.options),
                    "undefined" != typeof document.mozHidden
                        ? ((n.hidden = "mozHidden"), (n.visibilityChange = "mozvisibilitychange"))
                        : "undefined" != typeof document.webkitHidden &&
                          ((n.hidden = "webkitHidden"), (n.visibilityChange = "webkitvisibilitychange")),
                    (n.autoPlay = t.proxy(n.autoPlay, n)),
                    (n.autoPlayClear = t.proxy(n.autoPlayClear, n)),
                    (n.changeSlide = t.proxy(n.changeSlide, n)),
                    (n.clickHandler = t.proxy(n.clickHandler, n)),
                    (n.selectHandler = t.proxy(n.selectHandler, n)),
                    (n.setPosition = t.proxy(n.setPosition, n)),
                    (n.swipeHandler = t.proxy(n.swipeHandler, n)),
                    (n.dragHandler = t.proxy(n.dragHandler, n)),
                    (n.keyHandler = t.proxy(n.keyHandler, n)),
                    (n.autoPlayIterator = t.proxy(n.autoPlayIterator, n)),
                    (n.instanceUid = i++),
                    (n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
                    n.registerBreakpoints(),
                    n.init(!0),
                    n.checkResponsive(!0);
            }
            var i = 0;
            return e;
        })()),
            (e.prototype.addSlide = e.prototype.slickAdd =
                function (e, i, s) {
                    var r = this;
                    if ("boolean" == typeof i) (s = i), (i = null);
                    else if (0 > i || i >= r.slideCount) return !1;
                    r.unload(),
                        "number" == typeof i
                            ? 0 === i && 0 === r.$slides.length
                                ? t(e).appendTo(r.$slideTrack)
                                : s
                                  ? t(e).insertBefore(r.$slides.eq(i))
                                  : t(e).insertAfter(r.$slides.eq(i))
                            : s === !0
                              ? t(e).prependTo(r.$slideTrack)
                              : t(e).appendTo(r.$slideTrack),
                        (r.$slides = r.$slideTrack.children(this.options.slide)),
                        r.$slideTrack.children(this.options.slide).detach(),
                        r.$slideTrack.append(r.$slides),
                        r.$slides.each(function (e, i) {
                            t(i).attr("data-slick-index", e);
                        }),
                        (r.$slidesCache = r.$slides),
                        r.reinit();
                }),
            (e.prototype.animateHeight = function () {
                var t = this;
                if (1 === t.options.slidesToShow && t.options.adaptiveHeight === !0 && t.options.vertical === !1) {
                    var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
                    t.$list.animate({ height: e }, t.options.speed);
                }
            }),
            (e.prototype.animateSlide = function (e, i) {
                var s = {},
                    r = this;
                r.animateHeight(),
                    r.options.rtl === !0 && r.options.vertical === !1 && (e = -e),
                    r.transformsEnabled === !1
                        ? r.options.vertical === !1
                            ? r.$slideTrack.animate({ left: e }, r.options.speed, r.options.easing, i)
                            : r.$slideTrack.animate({ top: e }, r.options.speed, r.options.easing, i)
                        : r.cssTransitions === !1
                          ? (r.options.rtl === !0 && (r.currentLeft = -r.currentLeft),
                            t({ animStart: r.currentLeft }).animate(
                                { animStart: e },
                                {
                                    duration: r.options.speed,
                                    easing: r.options.easing,
                                    step: function (t) {
                                        (t = Math.ceil(t)),
                                            r.options.vertical === !1
                                                ? ((s[r.animType] = "translate(" + t + "px, 0px)"),
                                                  r.$slideTrack.css(s))
                                                : ((s[r.animType] = "translate(0px," + t + "px)"),
                                                  r.$slideTrack.css(s));
                                    },
                                    complete: function () {
                                        i && i.call();
                                    },
                                }
                            ))
                          : (r.applyTransition(),
                            (e = Math.ceil(e)),
                            (s[r.animType] =
                                r.options.vertical === !1
                                    ? "translate3d(" + e + "px, 0px, 0px)"
                                    : "translate3d(0px," + e + "px, 0px)"),
                            r.$slideTrack.css(s),
                            i &&
                                setTimeout(function () {
                                    r.disableTransition(), i.call();
                                }, r.options.speed));
            }),
            (e.prototype.asNavFor = function (e) {
                var i = this,
                    s = i.options.asNavFor;
                s && null !== s && (s = t(s).not(i.$slider)),
                    null !== s &&
                        "object" == typeof s &&
                        s.each(function () {
                            var i = t(this).slick("getSlick");
                            i.unslicked || i.slideHandler(e, !0);
                        });
            }),
            (e.prototype.applyTransition = function (t) {
                var e = this,
                    i = {};
                (i[e.transitionType] =
                    e.options.fade === !1
                        ? e.transformType + " " + e.options.speed + "ms " + e.options.cssEase
                        : "opacity " + e.options.speed + "ms " + e.options.cssEase),
                    e.options.fade === !1 ? e.$slideTrack.css(i) : e.$slides.eq(t).css(i);
            }),
            (e.prototype.autoPlay = function () {
                var t = this;
                t.autoPlayTimer && clearInterval(t.autoPlayTimer),
                    t.slideCount > t.options.slidesToShow &&
                        t.paused !== !0 &&
                        (t.autoPlayTimer = setInterval(t.autoPlayIterator, t.options.autoplaySpeed));
            }),
            (e.prototype.autoPlayClear = function () {
                var t = this;
                t.autoPlayTimer && clearInterval(t.autoPlayTimer);
            }),
            (e.prototype.autoPlayIterator = function () {
                var t = this;
                t.options.infinite === !1
                    ? 1 === t.direction
                        ? (t.currentSlide + 1 === t.slideCount - 1 && (t.direction = 0),
                          t.slideHandler(t.currentSlide + t.options.slidesToScroll))
                        : (t.currentSlide - 1 === 0 && (t.direction = 1),
                          t.slideHandler(t.currentSlide - t.options.slidesToScroll))
                    : t.slideHandler(t.currentSlide + t.options.slidesToScroll);
            }),
            (e.prototype.buildArrows = function () {
                var e = this;
                e.options.arrows === !0 &&
                    ((e.$prevArrow = t(e.options.prevArrow).addClass("slick-arrow")),
                    (e.$nextArrow = t(e.options.nextArrow).addClass("slick-arrow")),
                    e.slideCount > e.options.slidesToShow
                        ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
                          e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
                          e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows),
                          e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows),
                          e.options.infinite !== !0 &&
                              e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"))
                        : e.$prevArrow
                              .add(e.$nextArrow)
                              .addClass("slick-hidden")
                              .attr({ "aria-disabled": "true", tabindex: "-1" }));
            }),
            (e.prototype.buildDots = function () {
                var e,
                    i,
                    s = this;
                if (s.options.dots === !0 && s.slideCount > s.options.slidesToShow) {
                    for (i = '<ul class="' + s.options.dotsClass + '">', e = 0; e <= s.getDotCount(); e += 1)
                        i += "<li>" + s.options.customPaging.call(this, s, e) + "</li>";
                    (i += "</ul>"),
                        (s.$dots = t(i).appendTo(s.options.appendDots)),
                        s.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false");
                }
            }),
            (e.prototype.buildOut = function () {
                var e = this;
                (e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide")),
                    (e.slideCount = e.$slides.length),
                    e.$slides.each(function (e, i) {
                        t(i)
                            .attr("data-slick-index", e)
                            .data("originalStyling", t(i).attr("style") || "");
                    }),
                    e.$slider.addClass("slick-slider"),
                    (e.$slideTrack =
                        0 === e.slideCount
                            ? t('<div class="slick-track"/>').appendTo(e.$slider)
                            : e.$slides.wrapAll('<div class="slick-track"/>').parent()),
                    (e.$list = e.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent()),
                    e.$slideTrack.css("opacity", 0),
                    (e.options.centerMode === !0 || e.options.swipeToSlide === !0) && (e.options.slidesToScroll = 1),
                    t("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"),
                    e.setupInfinite(),
                    e.buildArrows(),
                    e.buildDots(),
                    e.updateDots(),
                    e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0),
                    e.options.draggable === !0 && e.$list.addClass("draggable");
            }),
            (e.prototype.buildRows = function () {
                var t,
                    e,
                    i,
                    s,
                    r,
                    n,
                    o,
                    a = this;
                if (((s = document.createDocumentFragment()), (n = a.$slider.children()), a.options.rows > 1)) {
                    for (o = a.options.slidesPerRow * a.options.rows, r = Math.ceil(n.length / o), t = 0; r > t; t++) {
                        var l = document.createElement("div");
                        for (e = 0; e < a.options.rows; e++) {
                            var h = document.createElement("div");
                            for (i = 0; i < a.options.slidesPerRow; i++) {
                                var c = t * o + (e * a.options.slidesPerRow + i);
                                n.get(c) && h.appendChild(n.get(c));
                            }
                            l.appendChild(h);
                        }
                        s.appendChild(l);
                    }
                    a.$slider.html(s),
                        a.$slider
                            .children()
                            .children()
                            .children()
                            .css({ width: 100 / a.options.slidesPerRow + "%", display: "inline-block" });
                }
            }),
            (e.prototype.checkResponsive = function (e, i) {
                var s,
                    r,
                    n,
                    o = this,
                    a = !1,
                    l = o.$slider.width(),
                    h = window.innerWidth || t(window).width();
                if (
                    ("window" === o.respondTo
                        ? (n = h)
                        : "slider" === o.respondTo
                          ? (n = l)
                          : "min" === o.respondTo && (n = Math.min(h, l)),
                    o.options.responsive && o.options.responsive.length && null !== o.options.responsive)
                ) {
                    r = null;
                    for (s in o.breakpoints)
                        o.breakpoints.hasOwnProperty(s) &&
                            (o.originalSettings.mobileFirst === !1
                                ? n < o.breakpoints[s] && (r = o.breakpoints[s])
                                : n > o.breakpoints[s] && (r = o.breakpoints[s]));
                    null !== r
                        ? null !== o.activeBreakpoint
                            ? (r !== o.activeBreakpoint || i) &&
                              ((o.activeBreakpoint = r),
                              "unslick" === o.breakpointSettings[r]
                                  ? o.unslick(r)
                                  : ((o.options = t.extend({}, o.originalSettings, o.breakpointSettings[r])),
                                    e === !0 && (o.currentSlide = o.options.initialSlide),
                                    o.refresh(e)),
                              (a = r))
                            : ((o.activeBreakpoint = r),
                              "unslick" === o.breakpointSettings[r]
                                  ? o.unslick(r)
                                  : ((o.options = t.extend({}, o.originalSettings, o.breakpointSettings[r])),
                                    e === !0 && (o.currentSlide = o.options.initialSlide),
                                    o.refresh(e)),
                              (a = r))
                        : null !== o.activeBreakpoint &&
                          ((o.activeBreakpoint = null),
                          (o.options = o.originalSettings),
                          e === !0 && (o.currentSlide = o.options.initialSlide),
                          o.refresh(e),
                          (a = r)),
                        e || a === !1 || o.$slider.trigger("breakpoint", [o, a]);
                }
            }),
            (e.prototype.changeSlide = function (e, i) {
                var s,
                    r,
                    n,
                    o = this,
                    a = t(e.target);
                switch (
                    (a.is("a") && e.preventDefault(),
                    a.is("li") || (a = a.closest("li")),
                    (n = o.slideCount % o.options.slidesToScroll !== 0),
                    (s = n ? 0 : (o.slideCount - o.currentSlide) % o.options.slidesToScroll),
                    e.data.message)
                ) {
                    case "previous":
                        (r = 0 === s ? o.options.slidesToScroll : o.options.slidesToShow - s),
                            o.slideCount > o.options.slidesToShow && o.slideHandler(o.currentSlide - r, !1, i);
                        break;
                    case "next":
                        (r = 0 === s ? o.options.slidesToScroll : s),
                            o.slideCount > o.options.slidesToShow && o.slideHandler(o.currentSlide + r, !1, i);
                        break;
                    case "index":
                        var l = 0 === e.data.index ? 0 : e.data.index || a.index() * o.options.slidesToScroll;
                        o.slideHandler(o.checkNavigable(l), !1, i), a.children().trigger("focus");
                        break;
                    default:
                        return;
                }
            }),
            (e.prototype.checkNavigable = function (t) {
                var e,
                    i,
                    s = this;
                if (((e = s.getNavigableIndexes()), (i = 0), t > e[e.length - 1])) t = e[e.length - 1];
                else
                    for (var r in e) {
                        if (t < e[r]) {
                            t = i;
                            break;
                        }
                        i = e[r];
                    }
                return t;
            }),
            (e.prototype.cleanUpEvents = function () {
                var e = this;
                e.options.dots &&
                    null !== e.$dots &&
                    (t("li", e.$dots).off("click.slick", e.changeSlide),
                    e.options.pauseOnDotsHover === !0 &&
                        e.options.autoplay === !0 &&
                        t("li", e.$dots)
                            .off("mouseenter.slick", t.proxy(e.setPaused, e, !0))
                            .off("mouseleave.slick", t.proxy(e.setPaused, e, !1))),
                    e.options.arrows === !0 &&
                        e.slideCount > e.options.slidesToShow &&
                        (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide),
                        e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide)),
                    e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler),
                    e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler),
                    e.$list.off("touchend.slick mouseup.slick", e.swipeHandler),
                    e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler),
                    e.$list.off("click.slick", e.clickHandler),
                    t(document).off(e.visibilityChange, e.visibility),
                    e.$list.off("mouseenter.slick", t.proxy(e.setPaused, e, !0)),
                    e.$list.off("mouseleave.slick", t.proxy(e.setPaused, e, !1)),
                    e.options.accessibility === !0 && e.$list.off("keydown.slick", e.keyHandler),
                    e.options.focusOnSelect === !0 && t(e.$slideTrack).children().off("click.slick", e.selectHandler),
                    t(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange),
                    t(window).off("resize.slick.slick-" + e.instanceUid, e.resize),
                    t("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault),
                    t(window).off("load.slick.slick-" + e.instanceUid, e.setPosition),
                    t(document).off("ready.slick.slick-" + e.instanceUid, e.setPosition);
            }),
            (e.prototype.cleanUpRows = function () {
                var t,
                    e = this;
                e.options.rows > 1 && ((t = e.$slides.children().children()), t.removeAttr("style"), e.$slider.html(t));
            }),
            (e.prototype.clickHandler = function (t) {
                var e = this;
                e.shouldClick === !1 && (t.stopImmediatePropagation(), t.stopPropagation(), t.preventDefault());
            }),
            (e.prototype.destroy = function (e) {
                var i = this;
                i.autoPlayClear(),
                    (i.touchObject = {}),
                    i.cleanUpEvents(),
                    t(".slick-cloned", i.$slider).detach(),
                    i.$dots && i.$dots.remove(),
                    i.$prevArrow &&
                        i.$prevArrow.length &&
                        (i.$prevArrow
                            .removeClass("slick-disabled slick-arrow slick-hidden")
                            .removeAttr("aria-hidden aria-disabled tabindex")
                            .css("display", ""),
                        i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.remove()),
                    i.$nextArrow &&
                        i.$nextArrow.length &&
                        (i.$nextArrow
                            .removeClass("slick-disabled slick-arrow slick-hidden")
                            .removeAttr("aria-hidden aria-disabled tabindex")
                            .css("display", ""),
                        i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.remove()),
                    i.$slides &&
                        (i.$slides
                            .removeClass("slick-slide slick-active slick-center slick-visible slick-current")
                            .removeAttr("aria-hidden")
                            .removeAttr("data-slick-index")
                            .each(function () {
                                t(this).attr("style", t(this).data("originalStyling"));
                            }),
                        i.$slideTrack.children(this.options.slide).detach(),
                        i.$slideTrack.detach(),
                        i.$list.detach(),
                        i.$slider.append(i.$slides)),
                    i.cleanUpRows(),
                    i.$slider.removeClass("slick-slider"),
                    i.$slider.removeClass("slick-initialized"),
                    (i.unslicked = !0),
                    e || i.$slider.trigger("destroy", [i]);
            }),
            (e.prototype.disableTransition = function (t) {
                var e = this,
                    i = {};
                (i[e.transitionType] = ""), e.options.fade === !1 ? e.$slideTrack.css(i) : e.$slides.eq(t).css(i);
            }),
            (e.prototype.fadeSlide = function (t, e) {
                var i = this;
                i.cssTransitions === !1
                    ? (i.$slides.eq(t).css({ zIndex: i.options.zIndex }),
                      i.$slides.eq(t).animate({ opacity: 1 }, i.options.speed, i.options.easing, e))
                    : (i.applyTransition(t),
                      i.$slides.eq(t).css({ opacity: 1, zIndex: i.options.zIndex }),
                      e &&
                          setTimeout(function () {
                              i.disableTransition(t), e.call();
                          }, i.options.speed));
            }),
            (e.prototype.fadeSlideOut = function (t) {
                var e = this;
                e.cssTransitions === !1
                    ? e.$slides
                          .eq(t)
                          .animate({ opacity: 0, zIndex: e.options.zIndex - 2 }, e.options.speed, e.options.easing)
                    : (e.applyTransition(t), e.$slides.eq(t).css({ opacity: 0, zIndex: e.options.zIndex - 2 }));
            }),
            (e.prototype.filterSlides = e.prototype.slickFilter =
                function (t) {
                    var e = this;
                    null !== t &&
                        ((e.$slidesCache = e.$slides),
                        e.unload(),
                        e.$slideTrack.children(this.options.slide).detach(),
                        e.$slidesCache.filter(t).appendTo(e.$slideTrack),
                        e.reinit());
                }),
            (e.prototype.getCurrent = e.prototype.slickCurrentSlide =
                function () {
                    var t = this;
                    return t.currentSlide;
                }),
            (e.prototype.getDotCount = function () {
                var t = this,
                    e = 0,
                    i = 0,
                    s = 0;
                if (t.options.infinite === !0)
                    for (; e < t.slideCount; )
                        ++s,
                            (e = i + t.options.slidesToScroll),
                            (i +=
                                t.options.slidesToScroll <= t.options.slidesToShow
                                    ? t.options.slidesToScroll
                                    : t.options.slidesToShow);
                else if (t.options.centerMode === !0) s = t.slideCount;
                else
                    for (; e < t.slideCount; )
                        ++s,
                            (e = i + t.options.slidesToScroll),
                            (i +=
                                t.options.slidesToScroll <= t.options.slidesToShow
                                    ? t.options.slidesToScroll
                                    : t.options.slidesToShow);
                return s - 1;
            }),
            (e.prototype.getLeft = function (t) {
                var e,
                    i,
                    s,
                    r = this,
                    n = 0;
                return (
                    (r.slideOffset = 0),
                    (i = r.$slides.first().outerHeight(!0)),
                    r.options.infinite === !0
                        ? (r.slideCount > r.options.slidesToShow &&
                              ((r.slideOffset = r.slideWidth * r.options.slidesToShow * -1),
                              (n = i * r.options.slidesToShow * -1)),
                          r.slideCount % r.options.slidesToScroll !== 0 &&
                              t + r.options.slidesToScroll > r.slideCount &&
                              r.slideCount > r.options.slidesToShow &&
                              (t > r.slideCount
                                  ? ((r.slideOffset =
                                        (r.options.slidesToShow - (t - r.slideCount)) * r.slideWidth * -1),
                                    (n = (r.options.slidesToShow - (t - r.slideCount)) * i * -1))
                                  : ((r.slideOffset = (r.slideCount % r.options.slidesToScroll) * r.slideWidth * -1),
                                    (n = (r.slideCount % r.options.slidesToScroll) * i * -1))))
                        : t + r.options.slidesToShow > r.slideCount &&
                          ((r.slideOffset = (t + r.options.slidesToShow - r.slideCount) * r.slideWidth),
                          (n = (t + r.options.slidesToShow - r.slideCount) * i)),
                    r.slideCount <= r.options.slidesToShow && ((r.slideOffset = 0), (n = 0)),
                    r.options.centerMode === !0 && r.options.infinite === !0
                        ? (r.slideOffset += r.slideWidth * Math.floor(r.options.slidesToShow / 2) - r.slideWidth)
                        : r.options.centerMode === !0 &&
                          ((r.slideOffset = 0),
                          (r.slideOffset += r.slideWidth * Math.floor(r.options.slidesToShow / 2))),
                    (e = r.options.vertical === !1 ? t * r.slideWidth * -1 + r.slideOffset : t * i * -1 + n),
                    r.options.variableWidth === !0 &&
                        ((s = r.$slideTrack
                            .children(".slick-slide")
                            .eq(
                                r.slideCount <= r.options.slidesToShow || r.options.infinite === !1
                                    ? t
                                    : t + r.options.slidesToShow
                            )),
                        (e =
                            r.options.rtl === !0
                                ? s[0]
                                    ? -1 * (r.$slideTrack.width() - s[0].offsetLeft - s.width())
                                    : 0
                                : s[0]
                                  ? -1 * s[0].offsetLeft
                                  : 0),
                        r.options.centerMode === !0 &&
                            ((s = r.$slideTrack
                                .children(".slick-slide")
                                .eq(
                                    r.slideCount <= r.options.slidesToShow || r.options.infinite === !1
                                        ? t
                                        : t + r.options.slidesToShow + 1
                                )),
                            (e =
                                r.options.rtl === !0
                                    ? s[0]
                                        ? -1 * (r.$slideTrack.width() - s[0].offsetLeft - s.width())
                                        : 0
                                    : s[0]
                                      ? -1 * s[0].offsetLeft
                                      : 0),
                            (e += (r.$list.width() - s.outerWidth()) / 2))),
                    e
                );
            }),
            (e.prototype.getOption = e.prototype.slickGetOption =
                function (t) {
                    var e = this;
                    return e.options[t];
                }),
            (e.prototype.getNavigableIndexes = function () {
                var t,
                    e = this,
                    i = 0,
                    s = 0,
                    r = [];
                for (
                    e.options.infinite === !1
                        ? (t = e.slideCount)
                        : ((i = -1 * e.options.slidesToScroll),
                          (s = -1 * e.options.slidesToScroll),
                          (t = 2 * e.slideCount));
                    t > i;

                )
                    r.push(i),
                        (i = s + e.options.slidesToScroll),
                        (s +=
                            e.options.slidesToScroll <= e.options.slidesToShow
                                ? e.options.slidesToScroll
                                : e.options.slidesToShow);
                return r;
            }),
            (e.prototype.getSlick = function () {
                return this;
            }),
            (e.prototype.getSlideCount = function () {
                var e,
                    i,
                    s,
                    r = this;
                return (
                    (s = r.options.centerMode === !0 ? r.slideWidth * Math.floor(r.options.slidesToShow / 2) : 0),
                    r.options.swipeToSlide === !0
                        ? (r.$slideTrack.find(".slick-slide").each(function (e, n) {
                              return n.offsetLeft - s + t(n).outerWidth() / 2 > -1 * r.swipeLeft
                                  ? ((i = n), !1)
                                  : void 0;
                          }),
                          (e = Math.abs(t(i).attr("data-slick-index") - r.currentSlide) || 1))
                        : r.options.slidesToScroll
                );
            }),
            (e.prototype.goTo = e.prototype.slickGoTo =
                function (t, e) {
                    var i = this;
                    i.changeSlide({ data: { message: "index", index: parseInt(t) } }, e);
                }),
            (e.prototype.init = function (e) {
                var i = this;
                t(i.$slider).hasClass("slick-initialized") ||
                    (t(i.$slider).addClass("slick-initialized"),
                    i.buildRows(),
                    i.buildOut(),
                    i.setProps(),
                    i.startLoad(),
                    i.loadSlider(),
                    i.initializeEvents(),
                    i.updateArrows(),
                    i.updateDots()),
                    e && i.$slider.trigger("init", [i]),
                    i.options.accessibility === !0 && i.initADA();
            }),
            (e.prototype.initArrowEvents = function () {
                var t = this;
                t.options.arrows === !0 &&
                    t.slideCount > t.options.slidesToShow &&
                    (t.$prevArrow.on("click.slick", { message: "previous" }, t.changeSlide),
                    t.$nextArrow.on("click.slick", { message: "next" }, t.changeSlide));
            }),
            (e.prototype.initDotEvents = function () {
                var e = this;
                e.options.dots === !0 &&
                    e.slideCount > e.options.slidesToShow &&
                    t("li", e.$dots).on("click.slick", { message: "index" }, e.changeSlide),
                    e.options.dots === !0 &&
                        e.options.pauseOnDotsHover === !0 &&
                        e.options.autoplay === !0 &&
                        t("li", e.$dots)
                            .on("mouseenter.slick", t.proxy(e.setPaused, e, !0))
                            .on("mouseleave.slick", t.proxy(e.setPaused, e, !1));
            }),
            (e.prototype.initializeEvents = function () {
                var e = this;
                e.initArrowEvents(),
                    e.initDotEvents(),
                    e.$list.on("touchstart.slick mousedown.slick", { action: "start" }, e.swipeHandler),
                    e.$list.on("touchmove.slick mousemove.slick", { action: "move" }, e.swipeHandler),
                    e.$list.on("touchend.slick mouseup.slick", { action: "end" }, e.swipeHandler),
                    e.$list.on("touchcancel.slick mouseleave.slick", { action: "end" }, e.swipeHandler),
                    e.$list.on("click.slick", e.clickHandler),
                    t(document).on(e.visibilityChange, t.proxy(e.visibility, e)),
                    e.$list.on("mouseenter.slick", t.proxy(e.setPaused, e, !0)),
                    e.$list.on("mouseleave.slick", t.proxy(e.setPaused, e, !1)),
                    e.options.accessibility === !0 && e.$list.on("keydown.slick", e.keyHandler),
                    e.options.focusOnSelect === !0 && t(e.$slideTrack).children().on("click.slick", e.selectHandler),
                    t(window).on("orientationchange.slick.slick-" + e.instanceUid, t.proxy(e.orientationChange, e)),
                    t(window).on("resize.slick.slick-" + e.instanceUid, t.proxy(e.resize, e)),
                    t("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault),
                    t(window).on("load.slick.slick-" + e.instanceUid, e.setPosition),
                    t(document).on("ready.slick.slick-" + e.instanceUid, e.setPosition);
            }),
            (e.prototype.initUI = function () {
                var t = this;
                t.options.arrows === !0 &&
                    t.slideCount > t.options.slidesToShow &&
                    (t.$prevArrow.show(), t.$nextArrow.show()),
                    t.options.dots === !0 && t.slideCount > t.options.slidesToShow && t.$dots.show(),
                    t.options.autoplay === !0 && t.autoPlay();
            }),
            (e.prototype.keyHandler = function (t) {
                var e = this;
                t.target.tagName.match("TEXTAREA|INPUT|SELECT") ||
                    (37 === t.keyCode && e.options.accessibility === !0
                        ? e.changeSlide({ data: { message: "previous" } })
                        : 39 === t.keyCode &&
                          e.options.accessibility === !0 &&
                          e.changeSlide({ data: { message: "next" } }));
            }),
            (e.prototype.lazyLoad = function () {
                function e(e) {
                    t("img[data-lazy]", e).each(function () {
                        var e = t(this),
                            i = t(this).attr("data-lazy"),
                            s = document.createElement("img");
                        (s.onload = function () {
                            e.animate({ opacity: 0 }, 100, function () {
                                e.attr("src", i).animate({ opacity: 1 }, 200, function () {
                                    e.removeAttr("data-lazy").removeClass("slick-loading");
                                });
                            });
                        }),
                            (s.src = i);
                    });
                }
                var i,
                    s,
                    r,
                    n,
                    o = this;
                o.options.centerMode === !0
                    ? o.options.infinite === !0
                        ? ((r = o.currentSlide + (o.options.slidesToShow / 2 + 1)),
                          (n = r + o.options.slidesToShow + 2))
                        : ((r = Math.max(0, o.currentSlide - (o.options.slidesToShow / 2 + 1))),
                          (n = 2 + (o.options.slidesToShow / 2 + 1) + o.currentSlide))
                    : ((r = o.options.infinite ? o.options.slidesToShow + o.currentSlide : o.currentSlide),
                      (n = r + o.options.slidesToShow),
                      o.options.fade === !0 && (r > 0 && r--, n <= o.slideCount && n++)),
                    (i = o.$slider.find(".slick-slide").slice(r, n)),
                    e(i),
                    o.slideCount <= o.options.slidesToShow
                        ? ((s = o.$slider.find(".slick-slide")), e(s))
                        : o.currentSlide >= o.slideCount - o.options.slidesToShow
                          ? ((s = o.$slider.find(".slick-cloned").slice(0, o.options.slidesToShow)), e(s))
                          : 0 === o.currentSlide &&
                            ((s = o.$slider.find(".slick-cloned").slice(-1 * o.options.slidesToShow)), e(s));
            }),
            (e.prototype.loadSlider = function () {
                var t = this;
                t.setPosition(),
                    t.$slideTrack.css({ opacity: 1 }),
                    t.$slider.removeClass("slick-loading"),
                    t.initUI(),
                    "progressive" === t.options.lazyLoad && t.progressiveLazyLoad();
            }),
            (e.prototype.next = e.prototype.slickNext =
                function () {
                    var t = this;
                    t.changeSlide({ data: { message: "next" } });
                }),
            (e.prototype.orientationChange = function () {
                var t = this;
                t.checkResponsive(), t.setPosition();
            }),
            (e.prototype.pause = e.prototype.slickPause =
                function () {
                    var t = this;
                    t.autoPlayClear(), (t.paused = !0);
                }),
            (e.prototype.play = e.prototype.slickPlay =
                function () {
                    var t = this;
                    (t.paused = !1), t.autoPlay();
                }),
            (e.prototype.postSlide = function (t) {
                var e = this;
                e.$slider.trigger("afterChange", [e, t]),
                    (e.animating = !1),
                    e.setPosition(),
                    (e.swipeLeft = null),
                    e.options.autoplay === !0 && e.paused === !1 && e.autoPlay(),
                    e.options.accessibility === !0 && e.initADA();
            }),
            (e.prototype.prev = e.prototype.slickPrev =
                function () {
                    var t = this;
                    t.changeSlide({ data: { message: "previous" } });
                }),
            (e.prototype.preventDefault = function (t) {
                t.preventDefault();
            }),
            (e.prototype.progressiveLazyLoad = function () {
                var e,
                    i,
                    s = this;
                (e = t("img[data-lazy]", s.$slider).length),
                    e > 0 &&
                        ((i = t("img[data-lazy]", s.$slider).first()),
                        i.attr("src", null),
                        i
                            .attr("src", i.attr("data-lazy"))
                            .removeClass("slick-loading")
                            .load(function () {
                                i.removeAttr("data-lazy"),
                                    s.progressiveLazyLoad(),
                                    s.options.adaptiveHeight === !0 && s.setPosition();
                            })
                            .error(function () {
                                i.removeAttr("data-lazy"), s.progressiveLazyLoad();
                            }));
            }),
            (e.prototype.refresh = function (e) {
                var i,
                    s,
                    r = this;
                (s = r.slideCount - r.options.slidesToShow),
                    r.options.infinite ||
                        (r.slideCount <= r.options.slidesToShow
                            ? (r.currentSlide = 0)
                            : r.currentSlide > s && (r.currentSlide = s)),
                    (i = r.currentSlide),
                    r.destroy(!0),
                    t.extend(r, r.initials, { currentSlide: i }),
                    r.init(),
                    e || r.changeSlide({ data: { message: "index", index: i } }, !1);
            }),
            (e.prototype.registerBreakpoints = function () {
                var e,
                    i,
                    s,
                    r = this,
                    n = r.options.responsive || null;
                if ("array" === t.type(n) && n.length) {
                    r.respondTo = r.options.respondTo || "window";
                    for (e in n)
                        if (((s = r.breakpoints.length - 1), (i = n[e].breakpoint), n.hasOwnProperty(e))) {
                            for (; s >= 0; )
                                r.breakpoints[s] && r.breakpoints[s] === i && r.breakpoints.splice(s, 1), s--;
                            r.breakpoints.push(i), (r.breakpointSettings[i] = n[e].settings);
                        }
                    r.breakpoints.sort(function (t, e) {
                        return r.options.mobileFirst ? t - e : e - t;
                    });
                }
            }),
            (e.prototype.reinit = function () {
                var e = this;
                (e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide")),
                    (e.slideCount = e.$slides.length),
                    e.currentSlide >= e.slideCount &&
                        0 !== e.currentSlide &&
                        (e.currentSlide = e.currentSlide - e.options.slidesToScroll),
                    e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0),
                    e.registerBreakpoints(),
                    e.setProps(),
                    e.setupInfinite(),
                    e.buildArrows(),
                    e.updateArrows(),
                    e.initArrowEvents(),
                    e.buildDots(),
                    e.updateDots(),
                    e.initDotEvents(),
                    e.checkResponsive(!1, !0),
                    e.options.focusOnSelect === !0 && t(e.$slideTrack).children().on("click.slick", e.selectHandler),
                    e.setSlideClasses(0),
                    e.setPosition(),
                    e.$slider.trigger("reInit", [e]),
                    e.options.autoplay === !0 && e.focusHandler();
            }),
            (e.prototype.resize = function () {
                var e = this;
                t(window).width() !== e.windowWidth &&
                    (clearTimeout(e.windowDelay),
                    (e.windowDelay = window.setTimeout(function () {
                        (e.windowWidth = t(window).width()), e.checkResponsive(), e.unslicked || e.setPosition();
                    }, 50)));
            }),
            (e.prototype.removeSlide = e.prototype.slickRemove =
                function (t, e, i) {
                    var s = this;
                    return (
                        "boolean" == typeof t
                            ? ((e = t), (t = e === !0 ? 0 : s.slideCount - 1))
                            : (t = e === !0 ? --t : t),
                        s.slideCount < 1 || 0 > t || t > s.slideCount - 1
                            ? !1
                            : (s.unload(),
                              i === !0
                                  ? s.$slideTrack.children().remove()
                                  : s.$slideTrack.children(this.options.slide).eq(t).remove(),
                              (s.$slides = s.$slideTrack.children(this.options.slide)),
                              s.$slideTrack.children(this.options.slide).detach(),
                              s.$slideTrack.append(s.$slides),
                              (s.$slidesCache = s.$slides),
                              void s.reinit())
                    );
                }),
            (e.prototype.setCSS = function (t) {
                var e,
                    i,
                    s = this,
                    r = {};
                s.options.rtl === !0 && (t = -t),
                    (e = "left" == s.positionProp ? Math.ceil(t) + "px" : "0px"),
                    (i = "top" == s.positionProp ? Math.ceil(t) + "px" : "0px"),
                    (r[s.positionProp] = t),
                    s.transformsEnabled === !1
                        ? s.$slideTrack.css(r)
                        : ((r = {}),
                          s.cssTransitions === !1
                              ? ((r[s.animType] = "translate(" + e + ", " + i + ")"), s.$slideTrack.css(r))
                              : ((r[s.animType] = "translate3d(" + e + ", " + i + ", 0px)"), s.$slideTrack.css(r)));
            }),
            (e.prototype.setDimensions = function () {
                var t = this;
                t.options.vertical === !1
                    ? t.options.centerMode === !0 && t.$list.css({ padding: "0px " + t.options.centerPadding })
                    : (t.$list.height(t.$slides.first().outerHeight(!0) * t.options.slidesToShow),
                      t.options.centerMode === !0 && t.$list.css({ padding: t.options.centerPadding + " 0px" })),
                    (t.listWidth = t.$list.width()),
                    (t.listHeight = t.$list.height()),
                    t.options.vertical === !1 && t.options.variableWidth === !1
                        ? ((t.slideWidth = Math.ceil(t.listWidth / t.options.slidesToShow)),
                          t.$slideTrack.width(Math.ceil(t.slideWidth * t.$slideTrack.children(".slick-slide").length)))
                        : t.options.variableWidth === !0
                          ? t.$slideTrack.width(5e3 * t.slideCount)
                          : ((t.slideWidth = Math.ceil(t.listWidth)),
                            t.$slideTrack.height(
                                Math.ceil(
                                    t.$slides.first().outerHeight(!0) * t.$slideTrack.children(".slick-slide").length
                                )
                            ));
                var e = t.$slides.first().outerWidth(!0) - t.$slides.first().width();
                t.options.variableWidth === !1 && t.$slideTrack.children(".slick-slide").width(t.slideWidth - e);
            }),
            (e.prototype.setFade = function () {
                var e,
                    i = this;
                i.$slides.each(function (s, r) {
                    (e = i.slideWidth * s * -1),
                        t(r).css(
                            i.options.rtl === !0
                                ? { position: "relative", right: e, top: 0, zIndex: i.options.zIndex - 2, opacity: 0 }
                                : { position: "relative", left: e, top: 0, zIndex: i.options.zIndex - 2, opacity: 0 }
                        );
                }),
                    i.$slides.eq(i.currentSlide).css({ zIndex: i.options.zIndex - 1, opacity: 1 });
            }),
            (e.prototype.setHeight = function () {
                var t = this;
                if (1 === t.options.slidesToShow && t.options.adaptiveHeight === !0 && t.options.vertical === !1) {
                    var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
                    t.$list.css("height", e);
                }
            }),
            (e.prototype.setOption = e.prototype.slickSetOption =
                function (e, i, s) {
                    var r,
                        n,
                        o = this;
                    if ("responsive" === e && "array" === t.type(i))
                        for (n in i)
                            if ("array" !== t.type(o.options.responsive)) o.options.responsive = [i[n]];
                            else {
                                for (r = o.options.responsive.length - 1; r >= 0; )
                                    o.options.responsive[r].breakpoint === i[n].breakpoint &&
                                        o.options.responsive.splice(r, 1),
                                        r--;
                                o.options.responsive.push(i[n]);
                            }
                    else o.options[e] = i;
                    s === !0 && (o.unload(), o.reinit());
                }),
            (e.prototype.setPosition = function () {
                var t = this;
                t.setDimensions(),
                    t.setHeight(),
                    t.options.fade === !1 ? t.setCSS(t.getLeft(t.currentSlide)) : t.setFade(),
                    t.$slider.trigger("setPosition", [t]);
            }),
            (e.prototype.setProps = function () {
                var t = this,
                    e = document.body.style;
                (t.positionProp = t.options.vertical === !0 ? "top" : "left"),
                    "top" === t.positionProp
                        ? t.$slider.addClass("slick-vertical")
                        : t.$slider.removeClass("slick-vertical"),
                    (void 0 !== e.WebkitTransition || void 0 !== e.MozTransition || void 0 !== e.msTransition) &&
                        t.options.useCSS === !0 &&
                        (t.cssTransitions = !0),
                    t.options.fade &&
                        ("number" == typeof t.options.zIndex
                            ? t.options.zIndex < 3 && (t.options.zIndex = 3)
                            : (t.options.zIndex = t.defaults.zIndex)),
                    void 0 !== e.OTransform &&
                        ((t.animType = "OTransform"),
                        (t.transformType = "-o-transform"),
                        (t.transitionType = "OTransition"),
                        void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)),
                    void 0 !== e.MozTransform &&
                        ((t.animType = "MozTransform"),
                        (t.transformType = "-moz-transform"),
                        (t.transitionType = "MozTransition"),
                        void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (t.animType = !1)),
                    void 0 !== e.webkitTransform &&
                        ((t.animType = "webkitTransform"),
                        (t.transformType = "-webkit-transform"),
                        (t.transitionType = "webkitTransition"),
                        void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)),
                    void 0 !== e.msTransform &&
                        ((t.animType = "msTransform"),
                        (t.transformType = "-ms-transform"),
                        (t.transitionType = "msTransition"),
                        void 0 === e.msTransform && (t.animType = !1)),
                    void 0 !== e.transform &&
                        t.animType !== !1 &&
                        ((t.animType = "transform"),
                        (t.transformType = "transform"),
                        (t.transitionType = "transition")),
                    (t.transformsEnabled = t.options.useTransform && null !== t.animType && t.animType !== !1);
            }),
            (e.prototype.setSlideClasses = function (t) {
                var e,
                    i,
                    s,
                    r,
                    n = this;
                (i = n.$slider
                    .find(".slick-slide")
                    .removeClass("slick-active slick-center slick-current")
                    .attr("aria-hidden", "true")),
                    n.$slides.eq(t).addClass("slick-current"),
                    n.options.centerMode === !0
                        ? ((e = Math.floor(n.options.slidesToShow / 2)),
                          n.options.infinite === !0 &&
                              (t >= e && t <= n.slideCount - 1 - e
                                  ? n.$slides
                                        .slice(t - e, t + e + 1)
                                        .addClass("slick-active")
                                        .attr("aria-hidden", "false")
                                  : ((s = n.options.slidesToShow + t),
                                    i
                                        .slice(s - e + 1, s + e + 2)
                                        .addClass("slick-active")
                                        .attr("aria-hidden", "false")),
                              0 === t
                                  ? i.eq(i.length - 1 - n.options.slidesToShow).addClass("slick-center")
                                  : t === n.slideCount - 1 && i.eq(n.options.slidesToShow).addClass("slick-center")),
                          n.$slides.eq(t).addClass("slick-center"))
                        : t >= 0 && t <= n.slideCount - n.options.slidesToShow
                          ? n.$slides
                                .slice(t, t + n.options.slidesToShow)
                                .addClass("slick-active")
                                .attr("aria-hidden", "false")
                          : i.length <= n.options.slidesToShow
                            ? i.addClass("slick-active").attr("aria-hidden", "false")
                            : ((r = n.slideCount % n.options.slidesToShow),
                              (s = n.options.infinite === !0 ? n.options.slidesToShow + t : t),
                              n.options.slidesToShow == n.options.slidesToScroll &&
                              n.slideCount - t < n.options.slidesToShow
                                  ? i
                                        .slice(s - (n.options.slidesToShow - r), s + r)
                                        .addClass("slick-active")
                                        .attr("aria-hidden", "false")
                                  : i
                                        .slice(s, s + n.options.slidesToShow)
                                        .addClass("slick-active")
                                        .attr("aria-hidden", "false")),
                    "ondemand" === n.options.lazyLoad && n.lazyLoad();
            }),
            (e.prototype.setupInfinite = function () {
                var e,
                    i,
                    s,
                    r = this;
                if (
                    (r.options.fade === !0 && (r.options.centerMode = !1),
                    r.options.infinite === !0 &&
                        r.options.fade === !1 &&
                        ((i = null), r.slideCount > r.options.slidesToShow))
                ) {
                    for (
                        s = r.options.centerMode === !0 ? r.options.slidesToShow + 1 : r.options.slidesToShow,
                            e = r.slideCount;
                        e > r.slideCount - s;
                        e -= 1
                    )
                        (i = e - 1),
                            t(r.$slides[i])
                                .clone(!0)
                                .attr("id", "")
                                .attr("data-slick-index", i - r.slideCount)
                                .prependTo(r.$slideTrack)
                                .addClass("slick-cloned");
                    for (e = 0; s > e; e += 1)
                        (i = e),
                            t(r.$slides[i])
                                .clone(!0)
                                .attr("id", "")
                                .attr("data-slick-index", i + r.slideCount)
                                .appendTo(r.$slideTrack)
                                .addClass("slick-cloned");
                    r.$slideTrack
                        .find(".slick-cloned")
                        .find("[id]")
                        .each(function () {
                            t(this).attr("id", "");
                        });
                }
            }),
            (e.prototype.setPaused = function (t) {
                var e = this;
                e.options.autoplay === !0 &&
                    e.options.pauseOnHover === !0 &&
                    ((e.paused = t), t ? e.autoPlayClear() : e.autoPlay());
            }),
            (e.prototype.selectHandler = function (e) {
                var i = this,
                    s = t(e.target).is(".slick-slide") ? t(e.target) : t(e.target).parents(".slick-slide"),
                    r = parseInt(s.attr("data-slick-index"));
                return (
                    r || (r = 0),
                    i.slideCount <= i.options.slidesToShow
                        ? (i.setSlideClasses(r), void i.asNavFor(r))
                        : void i.slideHandler(r)
                );
            }),
            (e.prototype.slideHandler = function (t, e, i) {
                var s,
                    r,
                    n,
                    o,
                    a = null,
                    l = this;
                return (
                    (e = e || !1),
                    (l.animating === !0 && l.options.waitForAnimate === !0) ||
                    (l.options.fade === !0 && l.currentSlide === t) ||
                    l.slideCount <= l.options.slidesToShow
                        ? void 0
                        : (e === !1 && l.asNavFor(t),
                          (s = t),
                          (a = l.getLeft(s)),
                          (o = l.getLeft(l.currentSlide)),
                          (l.currentLeft = null === l.swipeLeft ? o : l.swipeLeft),
                          l.options.infinite === !1 &&
                          l.options.centerMode === !1 &&
                          (0 > t || t > l.getDotCount() * l.options.slidesToScroll)
                              ? void (
                                    l.options.fade === !1 &&
                                    ((s = l.currentSlide),
                                    i !== !0
                                        ? l.animateSlide(o, function () {
                                              l.postSlide(s);
                                          })
                                        : l.postSlide(s))
                                )
                              : l.options.infinite === !1 &&
                                  l.options.centerMode === !0 &&
                                  (0 > t || t > l.slideCount - l.options.slidesToScroll)
                                ? void (
                                      l.options.fade === !1 &&
                                      ((s = l.currentSlide),
                                      i !== !0
                                          ? l.animateSlide(o, function () {
                                                l.postSlide(s);
                                            })
                                          : l.postSlide(s))
                                  )
                                : (l.options.autoplay === !0 && clearInterval(l.autoPlayTimer),
                                  (r =
                                      0 > s
                                          ? l.slideCount % l.options.slidesToScroll !== 0
                                              ? l.slideCount - (l.slideCount % l.options.slidesToScroll)
                                              : l.slideCount + s
                                          : s >= l.slideCount
                                            ? l.slideCount % l.options.slidesToScroll !== 0
                                                ? 0
                                                : s - l.slideCount
                                            : s),
                                  (l.animating = !0),
                                  l.$slider.trigger("beforeChange", [l, l.currentSlide, r]),
                                  (n = l.currentSlide),
                                  (l.currentSlide = r),
                                  l.setSlideClasses(l.currentSlide),
                                  l.updateDots(),
                                  l.updateArrows(),
                                  l.options.fade === !0
                                      ? (i !== !0
                                            ? (l.fadeSlideOut(n),
                                              l.fadeSlide(r, function () {
                                                  l.postSlide(r);
                                              }))
                                            : l.postSlide(r),
                                        void l.animateHeight())
                                      : void (i !== !0
                                            ? l.animateSlide(a, function () {
                                                  l.postSlide(r);
                                              })
                                            : l.postSlide(r))))
                );
            }),
            (e.prototype.startLoad = function () {
                var t = this;
                t.options.arrows === !0 &&
                    t.slideCount > t.options.slidesToShow &&
                    (t.$prevArrow.hide(), t.$nextArrow.hide()),
                    t.options.dots === !0 && t.slideCount > t.options.slidesToShow && t.$dots.hide(),
                    t.$slider.addClass("slick-loading");
            }),
            (e.prototype.swipeDirection = function () {
                var t,
                    e,
                    i,
                    s,
                    r = this;
                return (
                    (t = r.touchObject.startX - r.touchObject.curX),
                    (e = r.touchObject.startY - r.touchObject.curY),
                    (i = Math.atan2(e, t)),
                    (s = Math.round((180 * i) / Math.PI)),
                    0 > s && (s = 360 - Math.abs(s)),
                    45 >= s && s >= 0
                        ? r.options.rtl === !1
                            ? "left"
                            : "right"
                        : 360 >= s && s >= 315
                          ? r.options.rtl === !1
                              ? "left"
                              : "right"
                          : s >= 135 && 225 >= s
                            ? r.options.rtl === !1
                                ? "right"
                                : "left"
                            : r.options.verticalSwiping === !0
                              ? s >= 35 && 135 >= s
                                  ? "left"
                                  : "right"
                              : "vertical"
                );
            }),
            (e.prototype.swipeEnd = function () {
                var t,
                    e = this;
                if (
                    ((e.dragging = !1),
                    (e.shouldClick = e.touchObject.swipeLength > 10 ? !1 : !0),
                    void 0 === e.touchObject.curX)
                )
                    return !1;
                if (
                    (e.touchObject.edgeHit === !0 && e.$slider.trigger("edge", [e, e.swipeDirection()]),
                    e.touchObject.swipeLength >= e.touchObject.minSwipe)
                )
                    switch (e.swipeDirection()) {
                        case "left":
                            (t = e.options.swipeToSlide
                                ? e.checkNavigable(e.currentSlide + e.getSlideCount())
                                : e.currentSlide + e.getSlideCount()),
                                e.slideHandler(t),
                                (e.currentDirection = 0),
                                (e.touchObject = {}),
                                e.$slider.trigger("swipe", [e, "left"]);
                            break;
                        case "right":
                            (t = e.options.swipeToSlide
                                ? e.checkNavigable(e.currentSlide - e.getSlideCount())
                                : e.currentSlide - e.getSlideCount()),
                                e.slideHandler(t),
                                (e.currentDirection = 1),
                                (e.touchObject = {}),
                                e.$slider.trigger("swipe", [e, "right"]);
                    }
                else
                    e.touchObject.startX !== e.touchObject.curX &&
                        (e.slideHandler(e.currentSlide), (e.touchObject = {}));
            }),
            (e.prototype.swipeHandler = function (t) {
                var e = this;
                if (
                    !(
                        e.options.swipe === !1 ||
                        ("ontouchend" in document && e.options.swipe === !1) ||
                        (e.options.draggable === !1 && -1 !== t.type.indexOf("mouse"))
                    )
                )
                    switch (
                        ((e.touchObject.fingerCount =
                            t.originalEvent && void 0 !== t.originalEvent.touches ? t.originalEvent.touches.length : 1),
                        (e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold),
                        e.options.verticalSwiping === !0 &&
                            (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold),
                        t.data.action)
                    ) {
                        case "start":
                            e.swipeStart(t);
                            break;
                        case "move":
                            e.swipeMove(t);
                            break;
                        case "end":
                            e.swipeEnd(t);
                    }
            }),
            (e.prototype.swipeMove = function (t) {
                var e,
                    i,
                    s,
                    r,
                    n,
                    o = this;
                return (
                    (n = void 0 !== t.originalEvent ? t.originalEvent.touches : null),
                    !o.dragging || (n && 1 !== n.length)
                        ? !1
                        : ((e = o.getLeft(o.currentSlide)),
                          (o.touchObject.curX = void 0 !== n ? n[0].pageX : t.clientX),
                          (o.touchObject.curY = void 0 !== n ? n[0].pageY : t.clientY),
                          (o.touchObject.swipeLength = Math.round(
                              Math.sqrt(Math.pow(o.touchObject.curX - o.touchObject.startX, 2))
                          )),
                          o.options.verticalSwiping === !0 &&
                              (o.touchObject.swipeLength = Math.round(
                                  Math.sqrt(Math.pow(o.touchObject.curY - o.touchObject.startY, 2))
                              )),
                          (i = o.swipeDirection()),
                          "vertical" !== i
                              ? (void 0 !== t.originalEvent && o.touchObject.swipeLength > 4 && t.preventDefault(),
                                (r =
                                    (o.options.rtl === !1 ? 1 : -1) *
                                    (o.touchObject.curX > o.touchObject.startX ? 1 : -1)),
                                o.options.verticalSwiping === !0 &&
                                    (r = o.touchObject.curY > o.touchObject.startY ? 1 : -1),
                                (s = o.touchObject.swipeLength),
                                (o.touchObject.edgeHit = !1),
                                o.options.infinite === !1 &&
                                    ((0 === o.currentSlide && "right" === i) ||
                                        (o.currentSlide >= o.getDotCount() && "left" === i)) &&
                                    ((s = o.touchObject.swipeLength * o.options.edgeFriction),
                                    (o.touchObject.edgeHit = !0)),
                                (o.swipeLeft =
                                    o.options.vertical === !1
                                        ? e + s * r
                                        : e + s * (o.$list.height() / o.listWidth) * r),
                                o.options.verticalSwiping === !0 && (o.swipeLeft = e + s * r),
                                o.options.fade === !0 || o.options.touchMove === !1
                                    ? !1
                                    : o.animating === !0
                                      ? ((o.swipeLeft = null), !1)
                                      : void o.setCSS(o.swipeLeft))
                              : void 0)
                );
            }),
            (e.prototype.swipeStart = function (t) {
                var e,
                    i = this;
                return 1 !== i.touchObject.fingerCount || i.slideCount <= i.options.slidesToShow
                    ? ((i.touchObject = {}), !1)
                    : (void 0 !== t.originalEvent &&
                          void 0 !== t.originalEvent.touches &&
                          (e = t.originalEvent.touches[0]),
                      (i.touchObject.startX = i.touchObject.curX = void 0 !== e ? e.pageX : t.clientX),
                      (i.touchObject.startY = i.touchObject.curY = void 0 !== e ? e.pageY : t.clientY),
                      void (i.dragging = !0));
            }),
            (e.prototype.unfilterSlides = e.prototype.slickUnfilter =
                function () {
                    var t = this;
                    null !== t.$slidesCache &&
                        (t.unload(),
                        t.$slideTrack.children(this.options.slide).detach(),
                        t.$slidesCache.appendTo(t.$slideTrack),
                        t.reinit());
                }),
            (e.prototype.unload = function () {
                var e = this;
                t(".slick-cloned", e.$slider).remove(),
                    e.$dots && e.$dots.remove(),
                    e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(),
                    e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(),
                    e.$slides
                        .removeClass("slick-slide slick-active slick-visible slick-current")
                        .attr("aria-hidden", "true")
                        .css("width", "");
            }),
            (e.prototype.unslick = function (t) {
                var e = this;
                e.$slider.trigger("unslick", [e, t]), e.destroy();
            }),
            (e.prototype.updateArrows = function () {
                var t,
                    e = this;
                (t = Math.floor(e.options.slidesToShow / 2)),
                    e.options.arrows === !0 &&
                        e.slideCount > e.options.slidesToShow &&
                        !e.options.infinite &&
                        (e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
                        e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
                        0 === e.currentSlide
                            ? (e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
                              e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"))
                            : e.currentSlide >= e.slideCount - e.options.slidesToShow && e.options.centerMode === !1
                              ? (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
                                e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"))
                              : e.currentSlide >= e.slideCount - 1 &&
                                e.options.centerMode === !0 &&
                                (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
                                e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")));
            }),
            (e.prototype.updateDots = function () {
                var t = this;
                null !== t.$dots &&
                    (t.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"),
                    t.$dots
                        .find("li")
                        .eq(Math.floor(t.currentSlide / t.options.slidesToScroll))
                        .addClass("slick-active")
                        .attr("aria-hidden", "false"));
            }),
            (e.prototype.visibility = function () {
                var t = this;
                document[t.hidden]
                    ? ((t.paused = !0), t.autoPlayClear())
                    : t.options.autoplay === !0 && ((t.paused = !1), t.autoPlay());
            }),
            (e.prototype.initADA = function () {
                var e = this;
                e.$slides
                    .add(e.$slideTrack.find(".slick-cloned"))
                    .attr({ "aria-hidden": "true", tabindex: "-1" })
                    .find("a, input, button, select")
                    .attr({ tabindex: "-1" }),
                    e.$slideTrack.attr("role", "listbox"),
                    e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function (i) {
                        t(this).attr({ role: "option", "aria-describedby": "slick-slide" + e.instanceUid + i });
                    }),
                    null !== e.$dots &&
                        e.$dots
                            .attr("role", "tablist")
                            .find("li")
                            .each(function (i) {
                                t(this).attr({
                                    role: "presentation",
                                    "aria-selected": "false",
                                    "aria-controls": "navigation" + e.instanceUid + i,
                                    id: "slick-slide" + e.instanceUid + i,
                                });
                            })
                            .first()
                            .attr("aria-selected", "true")
                            .end()
                            .find("button")
                            .attr("role", "button")
                            .end()
                            .closest("div")
                            .attr("role", "toolbar"),
                    e.activateADA();
            }),
            (e.prototype.activateADA = function () {
                var t = this;
                t.$slideTrack
                    .find(".slick-active")
                    .attr({ "aria-hidden": "false" })
                    .find("a, input, button, select")
                    .attr({ tabindex: "0" });
            }),
            (e.prototype.focusHandler = function () {
                var e = this;
                e.$slider.on("focus.slick blur.slick", "*", function (i) {
                    i.stopImmediatePropagation();
                    var s = t(this);
                    setTimeout(function () {
                        e.isPlay &&
                            (s.is(":focus") ? (e.autoPlayClear(), (e.paused = !0)) : ((e.paused = !1), e.autoPlay()));
                    }, 0);
                });
            }),
            (t.fn.slick = function () {
                var t,
                    i,
                    s = this,
                    r = arguments[0],
                    n = Array.prototype.slice.call(arguments, 1),
                    o = s.length;
                for (t = 0; o > t; t++)
                    if (
                        ("object" == typeof r || "undefined" == typeof r
                            ? (s[t].slick = new e(s[t], r))
                            : (i = s[t].slick[r].apply(s[t].slick, n)),
                        "undefined" != typeof i)
                    )
                        return i;
                return s;
            });
    });
