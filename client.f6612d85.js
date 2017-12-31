webpackJsonp([1],{112:function(t,e,s){t.exports=s(113)},113:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s(114),n=s(118);s(290);i.a.config.productionTip=!1,e.default=new i.a({el:"#app",render:function(t){return t(n.a)}})},118:function(t,e,s){"use strict";function i(t){s(119)}var n=s(120),a=s(289),r=s(4),o=i,u=r(n.a,a.a,!1,o,null,null);e.a=u.exports},119:function(t,e){},120:function(t,e,s){"use strict";var i=s(121),n=(s.n(i),s(21)),a=s(125),r=s(275),o=s(278),u=s(286);e.a={name:"root",components:{Carousel:i.Carousel,Slide:i.Slide,Controls:r.a,Settings:o.a,Timer:a.a,Tabs:u.a},filters:{json:function(t){return JSON.stringify(t,null,2)}},data:function(){return{focus:n.d.load(),activeTab:0}},mounted:function(){var t=this;this.focus.start(),this.$watch("focus.state",function(){return t.focus.save()},{deep:!0})},computed:{classes:function(){var t=this.focus,e=t.isShort,s=t.isLong;return{root:{"b-application--break":e||s,"b-application--short":e,"b-application--long":s}}}},methods:{handlePageChange:function(t){this.activeTab=t}}}},123:function(t,e,s){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}s.d(e,"a",function(){return r});var n=s(55),a=function(){function t(t,e){for(var s=0;s<e.length;s++){var i=e[s];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,s,i){return s&&t(e.prototype,s),i&&t(e,i),e}}(),r=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};i(this,t),this.state=Object(n.a)(t.state,e),this.time=Date.now(),this.tick()}return a(t,null,[{key:"state",get:function(){return{createdAt:Date.now(),duration:0,skipped:!1,type:null,pauses:[]}}}]),a(t,[{key:"tick",value:function(){this.finished||(this.time=Date.now())}},{key:"pause",value:function(){var t=this.state.pauses,e=t[t.length-1];void 0!==e&&null===e.end||t.push({start:this.time,end:null})}},{key:"unpause",value:function(){var t=this.state.pauses,e=t[t.length-1];if(void 0!==e&&null===e.end){var s=this.time;e.start===s?t.pop():e.end=s}}},{key:"pauses",get:function(){var t=this;return this.state.pauses.reduce(function(e,s){var i=new Date(s.start);return e+((null!==s.end?s.end:t.time)-i)},0)}},{key:"paused",get:function(){var t=this.state.pauses,e=t[t.length-1];return void 0!==e&&null===e.end}},{key:"createdAt",get:function(){return this.state.createdAt}},{key:"type",get:function(){return this.state.type}},{key:"duration",get:function(){return this.state.duration}},{key:"skipped",get:function(){return this.state.skipped}},{key:"interval",get:function(){return this.skipped?this.duration+1:this.time-(this.createdAt+this.pauses)}},{key:"elapsed",get:function(){var t=this.duration-this.interval;return t>0?t:0}},{key:"finished",get:function(){return this.skipped||this.elapsed<=0}}]),t}()},124:function(t,e,s){"use strict";var i=function(){for(var t=arguments.length,e=Array(t),s=0;s<t;s++)e[s]=arguments[s];return new(Function.prototype.bind.apply(Notification,[null].concat(e)))},n=null;try{navigator.serviceWorker.register("sw.js"),navigator.serviceWorker.ready.then(function(t){n=function(){return t.showNotification.apply(t,arguments)}})}catch(t){}e.a=function(){n?n.apply(void 0,arguments):i.apply(void 0,arguments)}},125:function(t,e,s){"use strict";var i=s(126),n=s(274),a=s(4),r=a(i.a,n.a,!1,null,null,null);e.a=r.exports},126:function(t,e,s){"use strict";var i=s(21),n=s(127),a=s(130),r=s(203),o=s(206);e.a={name:"timer",components:{Process:a.a,Target:r.a,Clock:n.a,Heatmap:o.a},props:{focus:{type:i.d,required:!0}},data:function(){return{stats:[]}},mounted:function(){this.setStats(),this.focus.on("update",this.setStats)},methods:{setStats:function(){this.stats=JSON.parse(localStorage.getItem("statistics"))}}}},127:function(t,e,s){"use strict";var i=s(128),n=s(129),a=s(4),r=a(i.a,n.a,!1,null,null,null);e.a=r.exports},128:function(t,e,s){"use strict";var i=s(22);e.a={props:{elapsed:{type:Number,default:0},pauses:{type:Number,default:0},paused:{type:Boolean,default:!1}},filters:{zeroify:i.g},computed:{clock:function(){var t=Math.floor(this.elapsed/1e3),e=t%60;return{seconds:e,minutes:(t-e)/60}},pause:function(){var t=Math.floor(this.pauses/1e3),e=t%60;return{seconds:e,minutes:(t-e)/60}},pauseClock:function(){var t=this.pause.minutes,e=Object(i.g)(this.pause.seconds);return 0===t?e:t+":"+e},classes:function(){return{clock:{"b-clock":!0,"b-clock--paused":this.paused},minutes:{"b-clock__minutes":!0},seconds:{"b-clock__seconds":!0},pauses:{"b-clock__pauses":!0,"b-clock__pauses--hidden":0===this.pauses,"b-clock__pauses--small":0!==this.pause.minutes}}}}}},129:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{class:t.classes.clock},[s("div",{class:t.classes.minutes},[t._v(t._s(t._f("zeroify")(t.clock.minutes)))]),t._v(" "),s("div",{class:t.classes.seconds},[t._v(t._s(t._f("zeroify")(t.clock.seconds)))]),t._v(" "),s("div",{class:t.classes.pauses},[t._v(t._s(t.pauseClock))])])},n=[],a={render:i,staticRenderFns:n};e.a=a},130:function(t,e,s){"use strict";var i=s(131),n=s(202),a=s(4),r=a(i.a,n.a,!1,null,null,null);e.a=r.exports},131:function(t,e,s){"use strict";var i=s(56),n=s.n(i),a=s(1),r=s(5),o=s(70);e.a={name:"process",props:{value:{type:Number,required:!0},max:{type:Number,required:!0}},data:function(){return{width:500,height:500,weight:4}},created:function(){this.update=n()(this.update.bind(this),500)},mounted:function(){var t=this;this.arcTween=function(e){var s=Object(r.a)(this.$angle,e);return this.$angle=s(0),function(e){return t.arc(s(e))}},this.svg=Object(a.c)(this.$el),this.root=this.svg.append("g").attr("transform","translate("+this.width/2+", "+this.height/2+")"),this.pie=Object(o.b)().sort(null).value(function(t){return t}),this.arc=Object(o.a)().outerRadius(this.radius).innerRadius(this.radius-this.weight).padAngle(.03).cornerRadius(this.weight),this.root.selectAll("path").data(this.pie(this.values)).enter().append("path").attr("d",this.arc).classed("b-process__value",function(t){return 0===t.index}).classed("b-process__bar",function(t){return 0!==t.index}).each(function(t){this.$angle=t}),document.addEventListener("visibilitychange",this.update)},computed:{viewBox:function(){return"0 0 "+this.width+" "+this.height},radius:function(){return Math.min(this.width,this.height)/2},values:function(){return[this.value,this.max-this.value||1]}},watch:{values:function(){this.update()}},methods:{update:function(){this.root.selectAll("path").data(this.pie(this.values)).transition().duration(200).attrTween("d",this.arcTween).style("fill",function(t){return t.data.color})}}}},202:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement;return(t._self._c||e)("svg",{staticClass:"b-process",attrs:{viewBox:t.viewBox}})},n=[],a={render:i,staticRenderFns:n};e.a=a},203:function(t,e,s){"use strict";var i=s(204),n=s(205),a=s(4),r=a(i.a,n.a,!1,null,null,null);e.a=r.exports},204:function(t,e,s){"use strict";var i=s(56),n=s.n(i),a=s(1),r=s(5),o=s(70);e.a={name:"target",props:{goal:{type:Number,required:!0},completed:{type:Array,default:function(){return[]}}},data:function(){return{width:500,height:500,weight:4}},created:function(){this.update=n()(this.update.bind(this),500)},mounted:function(){var t=this;this.svg=Object(a.c)(this.$el),this.pie=Object(o.b)().sort(null).value(function(t){return t.value}),this.arcTween=function(e){var s=Object(r.a)(this.$angle,e);return this.$angle=s(0),function(e){return t.arc(s(e))}},this.root=this.svg.append("g").attr("transform","translate("+this.width/2+", "+this.height/2+")"),this.arc=Object(o.a)().outerRadius(this.radius).innerRadius(this.radius-this.weight).padAngle(.03).cornerRadius(this.weight),this.root.selectAll("path").data(this.pie(this.values)).enter().append("path").attr("d",this.arc).classed("b-target__item",!0).classed("b-target__item--finished",function(t){return t.data.finished}).classed("b-target__item--extra",function(t){return t.data.extra}).classed("b-target__item--skipped",function(t){return t.data.skipped}).each(function(t){this.$angle=t}),document.addEventListener("visibilitychange",this.update)},computed:{amount:function(){return this.completed.length},viewBox:function(){return"0 0 "+this.width+" "+this.height},radius:function(){return Math.min(this.width,this.height)/2},values:function(){var t=this,e=this.amount,s=this.completed,i=e>=this.goal?e+1:this.goal;return new Array(i).fill().map(function(i,n){var a=n<e;return{value:1,finished:a,extra:a&&n>=t.goal,skipped:!!s[n]&&s[n].skipped}})}},watch:{values:function(){this.update()}},methods:{update:function(){var t=this.root.selectAll("path").data(this.pie(this.values)).classed("b-target__item",!0).classed("b-target__item--finished",function(t){return t.data.finished}).classed("b-target__item--extra",function(t){return t.data.extra}).classed("b-target__item--skipped",function(t){return t.data.skipped}),e=t.enter().append("path").classed("b-target__item",!0).each(function(t){this.$angle=t});t.transition().duration(200).attrTween("d",this.arcTween),t.exit().remove(),e.transition().delay(200).duration(400).attrTween("d",this.arcTween)}}}},205:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement;return(t._self._c||e)("svg",{staticClass:"b-target",attrs:{viewBox:t.viewBox}})},n=[],a={render:i,staticRenderFns:n};e.a=a},206:function(t,e,s){"use strict";var i=s(207),n=s(273),a=s(4),r=a(i.a,n.a,!1,null,null,null);e.a=r.exports},207:function(t,e,s){"use strict";function i(t){if(Array.isArray(t)){for(var e=0,s=Array(t.length);e<t.length;e++)s[e]=t[e];return s}return Array.from(t)}var n=s(1),a=s(208),r=s(272),o=s.n(r),u=s(22);e.a={name:"heatmap",props:{stats:{required:!0,default:function(){return{}}}},computed:{values:function(){var t=Date.now(),e=Object(u.a)(30).map(function(t,e){return e}),s=this.stats||{};return e.map(function(e){var i=Object(u.b)(t-Object(u.c)(e)),n=s[i]||{completed:0,time:0,target:0};return Object.assign({day:i},n)})},completedMax:function(){var t=this.values.map(function(t){return t.completed});return Math.max.apply(Math,i(t))},color:function(){return Object(a.a)().range(["#4c525f","#97ce28"]).domain([0,this.completedMax])}},mounted:function(){var t=this;this.heatmap=Object(n.c)(this.$el),this.heatmap.selectAll(".b-heatmap__box").data(this.values).enter().append("div").classed("b-heatmap__box",!0).style("background-color",function(e){return t.color(e.completed)}).append("div").classed("b-heatmap__title",!0).html(this.title)},watch:{values:function(){this.update()}},methods:{title:function(t){var e='\n        <div class="b-heatmap__day">'+t.day+"</div>\n      ";return 0!==t.completed&&(e+='\n          <div class="b-heatmap__pomodoros"><b>'+t.completed+"</b>/"+t.target+" pomidorus</div>\n        "),0!==t.time&&(e+='\n          <div class="b-heatmap__time">'+o()(t.time)+"</div>\n        "),e},update:function(){var t=this;this.heatmap.selectAll(".b-heatmap__box").data(this.values).style("background-color",function(e){return t.color(e.completed)}),this.heatmap.selectAll(".b-heatmap__title").data(this.values).html(this.title)}}}},21:function(t,e,s){"use strict";function i(t,e,s){return e in t?Object.defineProperty(t,e,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[e]=s,t}function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}s.d(e,"a",function(){return d}),s.d(e,"c",function(){return h}),s.d(e,"b",function(){return p}),s.d(e,"d",function(){return v});var a=s(55),r=s(122),o=s.n(r),u=s(22),c=s(123),l=s(124),f=function(){function t(t,e){for(var s=0;s<e.length;s++){var i=e[s];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,s,i){return s&&t(e.prototype,s),i&&t(e,i),e}}(),d="DEFAULT",h="SHORT",p="LONG",v=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};n(this,t);var s=new o.a;this.state=Object(a.a)(t.state,e),this.pending=null,this.touched=!1,this.on=s.on,this.emit=s.emit,this.isEmpty||(this.state.items=this.items.map(function(t){return new c.a(t)}))}return f(t,null,[{key:"load",value:function(){return new this(JSON.parse(localStorage.getItem("state"))||{})}},{key:"state",get:function(){var t;return{items:[],options:{auto:!1,notifications:!1,target:10,longAfter:4,durations:(t={},i(t,d,Object(u.d)(25)),i(t,h,Object(u.d)(5)),i(t,p,Object(u.d)(15)),t)}}}}]),f(t,[{key:"start",value:function(){setInterval(this.tick.bind(this),1e3),this.touched=this.isActive}},{key:"tick",value:function(){if(this.items.forEach(function(t){return t.tick()}),this.isActive)return void this.emit("tick");this.isFinished&&this.touched&&null==this.pending&&(this.current.skipped||(this.emit("finish",this.current),this.notify()),this.pending=this.current,this.options.auto&&this.play())}},{key:"play",value:function(){if(!0!==this.isActive){var t=void 0,e=void 0;(this.isEmpty||this.isShort||this.isLong)&&(t=d,e=this.durations[d]),this.isWork&&(t=this.isTimeToLong?p:h,e=this.durations[t]),this.touched=!0,this.pending=null;var s=new c.a({type:t,duration:e});this.state.items.push(s)}}},{key:"pause",value:function(){this.current&&this.current.pause()}},{key:"unpause",value:function(){this.current&&this.current.unpause()}},{key:"stop",value:function(){this.isActive&&this.items.pop()}},{key:"reset",value:function(){this.state.items=[]}},{key:"skip",value:function(){this.isActive&&(this.current.state.skipped=!0)}},{key:"toJson",value:function(){var t=Object.assign({},this.state);return 0!==t.items.length&&(t.items=t.items.map(function(t){return Object.assign({},t.state)})),t}},{key:"statistics",value:function(){return{completed:this.completed.length,target:this.target,time:this.time}}},{key:"save",value:function(){var t=Object(u.f)(),e=this.toJson(),s=JSON.parse(localStorage.getItem("statistics"))||{};s[t]||this.reset(),s[t]=Object(u.e)(this.statistics(),100),localStorage.setItem("state",JSON.stringify(e)),localStorage.setItem("statistics",JSON.stringify(s)),this.emit("update")}},{key:"notify",value:function(){if(this.options.notifications){var t=this.current.type,e="It's time to work";return t===d&&(e=this.isTimeToLong?"It's time to long break":"It's time to break"),Object(l.a)(e,{icon:"android-chrome-192x192.png"})}}},{key:"items",get:function(){return this.state.items}},{key:"options",get:function(){return this.state.options}},{key:"target",get:function(){return this.options.target}},{key:"completed",get:function(){return this.items.filter(function(t){return t.type===d&&t.finished})}},{key:"time",get:function(){return this.completed.reduce(function(t,e){return t+e.duration},0)}},{key:"durations",get:function(){return this.options.durations}},{key:"longAfter",get:function(){return this.options.longAfter}},{key:"isTimeToLong",get:function(){return this.completed.length%this.longAfter==0}},{key:"elapsed",get:function(){return this.current?this.current.elapsed:0}},{key:"pauses",get:function(){return this.current?this.current.pauses:0}},{key:"interval",get:function(){return this.current?this.current.interval:0}},{key:"duration",get:function(){return this.current?this.current.duration:0}},{key:"current",get:function(){return this.items[this.items.length-1]}},{key:"isWork",get:function(){return this.current&&this.current.type===d}},{key:"isShort",get:function(){return this.current&&this.current.type===h}},{key:"isLong",get:function(){return this.current&&this.current.type===p}},{key:"isEmpty",get:function(){return 0===this.items.length}},{key:"isActive",get:function(){return this.current&&!this.current.finished}},{key:"isFinished",get:function(){return this.current&&this.current.finished}},{key:"isPaused",get:function(){return void 0!==this.current&&this.current.paused}}]),t}()},22:function(t,e,s){"use strict";function i(t){if(Array.isArray(t)){for(var e=0,s=Array(t.length);e<t.length;e++)s[e]=t[e];return s}return Array.from(t)}s.d(e,"e",function(){return a}),s.d(e,"a",function(){return r}),s.d(e,"g",function(){return o}),s.d(e,"b",function(){return u}),s.d(e,"f",function(){return c}),s.d(e,"d",function(){return f}),s.d(e,"c",function(){return h});var n=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],a=function(t,e){var s={};return Object.keys(t).slice(0,e).forEach(function(e){s[e]=t[e]}),s},r=function(t){return[].concat(i(Array(t)))},o=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;return("0".repeat(e-1)+t).slice(-e)},u=function(t){t=new Date(t);var e=n[t.getMonth()];return t.getDate()+" "+e},c=function(){return u(new Date)},l=function(t){return 1e3*t},f=function(t){return t*l(60)},d=function(t){return t*f(60)},h=function(t){return t*d(24)}},273:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"b-heatmap"})},n=[],a={render:i,staticRenderFns:n};e.a=a},274:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"b-timer"},[s("clock",{attrs:{elapsed:t.focus.elapsed,paused:t.focus.isPaused,pauses:t.focus.pauses}}),t._v(" "),s("process",{attrs:{value:t.focus.interval,max:t.focus.duration,"is-break":t.focus.isLong||t.focus.isShort}}),t._v(" "),s("heatmap",{attrs:{stats:t.stats}}),t._v(" "),s("target",{attrs:{goal:t.focus.target,completed:t.focus.completed}})],1)},n=[],a={render:i,staticRenderFns:n};e.a=a},275:function(t,e,s){"use strict";var i=s(276),n=s(277),a=s(4),r=a(i.a,n.a,!1,null,null,null);e.a=r.exports},276:function(t,e,s){"use strict";var i=s(21);e.a={props:{focus:{type:i.d,required:!0}},methods:{stop:function(){confirm("Current timer will be stopped.")&&this.focus.stop()},skip:function(){confirm("Current timer will be skipped.")&&this.focus.skip()}}}},277:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"b-controls"},[s("div",{staticClass:"b-controls__body"},[s("a",{staticClass:"b-controls__action",on:{click:function(e){e.preventDefault(),t.skip(e)}}},[t._v("Skip")]),t._v(" "),t.focus.isActive?t._e():s("button",{staticClass:"b-controls__button",on:{click:function(e){t.focus.play()}}},[t._v("\n      Start\n    ")]),t._v(" "),t.focus.isActive&&!t.focus.isPaused?s("button",{staticClass:"b-controls__button",on:{click:function(e){t.focus.pause()}}},[t._v("\n      Pause\n    ")]):t._e(),t._v(" "),t.focus.isPaused?s("button",{staticClass:"b-controls__button",on:{click:function(e){t.focus.unpause()}}},[t._v("\n      Resume\n    ")]):t._e(),t._v(" "),s("a",{staticClass:"b-controls__action",on:{click:function(e){e.preventDefault(),t.stop(e)}}},[t._v("Stop")])])])},n=[],a={render:i,staticRenderFns:n};e.a=a},278:function(t,e,s){"use strict";var i=s(279),n=s(285),a=s(4),r=a(i.a,n.a,!1,null,null,null);e.a=r.exports},279:function(t,e,s){"use strict";var i=s(280),n=s(284),a=s.n(n),r=s(21),o=s(22);e.a={name:"settings",components:{Toggle:i.a,Slider:a.a},props:{focus:{type:r.d,required:!0}},data:function(){return{DEFAULT_TYPE:r.a,LONG_TYPE:r.b,SHORT_TYPE:r.c,notifications:{pending:!1,status:null}}},mounted:function(){document.addEventListener("transitionend",this.refresh,{passive:!0}),this.$watch("focus.options.notifications",this.notificationPerms),this.notifications.status=Notification.permission},destroyed:function(){document.removeEventListener("transitionend",this.refresh)},methods:{minutes:o.d,refresh:function(){this.$el.querySelectorAll(".vue-slider-component").forEach(function(t){t.__vue__&&t.__vue__.refresh()})},notificationPerms:function(t){var e=this;if(t&&!this.pending){this.notifications.pending=!0;var s=Notification.requestPermission();s.then(function(t){e.notifications.pending=!1,e.notifications.status=t}),s.catch(function(){alert(1)})}},restoreDefault:function(){confirm("Reset settings to default values?")&&(this.focus.state.options=r.d.state.options)},resetSession:function(){confirm("Today's completed pomodoros will be reset.")&&this.focus.reset()}}}},285:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"b-settings"},[s("div",{staticClass:"b-settings__field"},[s("div",{staticClass:"b-settings__label"},[t._v("Daily target")]),t._v(" "),s("div",{staticClass:"b-settings__control"},[s("slider",{attrs:{min:0,max:50,interval:1,formatter:function(t){return t+" pomirorus"},height:3,"stop-propagation":!0,tooltip:"hover"},model:{value:t.focus.options.target,callback:function(e){t.$set(t.focus.options,"target",e)},expression:"focus.options.target"}})],1)]),t._v(" "),s("div",{staticClass:"b-settings__field"},[s("div",{staticClass:"b-settings__label"},[t._v("Work interval")]),t._v(" "),s("div",{staticClass:"b-settings__control"},[s("slider",{attrs:{min:t.minutes(1),max:t.minutes(60),interval:t.minutes(1),formatter:function(t){return t/1e3/60+" minutes"},height:3,"stop-propagation":!0,tooltip:"hover"},model:{value:t.focus.options.durations[t.DEFAULT_TYPE],callback:function(e){t.$set(t.focus.options.durations,t.DEFAULT_TYPE,e)},expression:"focus.options.durations[DEFAULT_TYPE]"}})],1)]),t._v(" "),s("div",{staticClass:"b-settings__field"},[s("div",{staticClass:"b-settings__label"},[t._v("Short break")]),t._v(" "),s("div",{staticClass:"b-settings__control"},[s("slider",{attrs:{min:t.minutes(1),max:t.minutes(60),interval:t.minutes(1),formatter:function(t){return t/1e3/60+" minutes"},height:3,"stop-propagation":!0,tooltip:"hover"},model:{value:t.focus.options.durations[t.SHORT_TYPE],callback:function(e){t.$set(t.focus.options.durations,t.SHORT_TYPE,e)},expression:"focus.options.durations[SHORT_TYPE]"}})],1)]),t._v(" "),s("div",{staticClass:"b-settings__field"},[s("div",{staticClass:"b-settings__label"},[t._v("Long break")]),t._v(" "),s("div",{staticClass:"b-settings__control"},[s("slider",{attrs:{min:t.minutes(1),max:t.minutes(60),interval:t.minutes(1),formatter:function(t){return t/1e3/60+" minutes"},height:3,"stop-propagation":!0,tooltip:"hover"},model:{value:t.focus.options.durations[t.LONG_TYPE],callback:function(e){t.$set(t.focus.options.durations,t.LONG_TYPE,e)},expression:"focus.options.durations[LONG_TYPE]"}})],1)]),t._v(" "),s("div",{staticClass:"b-settings__field"},[s("div",{staticClass:"b-settings__label"},[t._v("Long break after")]),t._v(" "),s("div",{staticClass:"b-settings__control"},[s("slider",{attrs:{min:0,max:50,interval:1,formatter:function(t){return t+" pomirorus"},height:3,"stop-propagation":!0,tooltip:"hover"},model:{value:t.focus.options.longAfter,callback:function(e){t.$set(t.focus.options,"longAfter",e)},expression:"focus.options.longAfter"}})],1)]),t._v(" "),s("div",{staticClass:"b-settings__field"},[s("div",{staticClass:"b-settings__label"},[t._v("Auto-start timer")]),t._v(" "),s("div",{staticClass:"b-settings__control"},[s("toggle",{attrs:{height:20,width:45,"css-colors":!0,sync:!0},model:{value:t.focus.options.auto,callback:function(e){t.$set(t.focus.options,"auto",e)},expression:"focus.options.auto"}})],1)]),t._v(" "),s("div",{staticClass:"b-settings__field"},[s("div",{staticClass:"b-settings__label"},[t._v("Notifications")]),t._v(" "),s("div",{staticClass:"b-settings__control"},[s("toggle",{attrs:{height:20,width:45,"css-colors":!0,sync:!0},model:{value:t.focus.options.notifications,callback:function(e){t.$set(t.focus.options,"notifications",e)},expression:"focus.options.notifications"}}),t._v(" "),"denied"===t.notifications.status?s("span",{staticClass:"b-settings__warning"},[t._v("\n        Permissions denied\n      ")]):"granted"!==t.notifications.status?s("span",{staticClass:"b-settings__warning"},[t._v("\n        Requires user permissions\n      ")]):t._e()],1)]),t._v(" "),s("div",{staticClass:"b-settings__buttons"},[s("button",{staticClass:"b-settings__button",on:{click:t.restoreDefault}},[t._v("Restore defaults")]),t._v(" "),s("button",{staticClass:"b-settings__button",on:{click:t.resetSession}},[t._v("Reset current session")])])])},n=[],a={render:i,staticRenderFns:n};e.a=a},286:function(t,e,s){"use strict";var i=s(287),n=s(288),a=s(4),r=a(i.a,n.a,!1,null,null,null);e.a=r.exports},287:function(t,e,s){"use strict";e.a={name:"Tabs",props:["current"],methods:{active:function(t){return this.current===t?{"b-tabs__item--active":!0}:{}},goTo:function(t){this.$emit("go-to",t)}}}},288:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ul",{staticClass:"b-tabs"},[s("li",{staticClass:"b-tabs__item",class:t.active(0),on:{click:function(e){t.goTo(0)}}},[t._v("Timer")]),t._v(" "),s("li",{staticClass:"b-tabs__item",class:t.active(1),on:{click:function(e){t.goTo(1)}}},[t._v("Settings")])])},n=[],a={render:i,staticRenderFns:n};e.a=a},289:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"b-application",class:t.classes.root},[s("div",{staticClass:"b-application__middle"},[s("div",{staticClass:"b-application__header"},[s("tabs",{attrs:{current:t.activeTab},on:{"go-to":function(e){return t.$refs.carousel.goToPage(e)}}})],1),t._v(" "),s("div",{staticClass:"b-application__body"},[s("carousel",{ref:"carousel",staticClass:"b-application__sections",attrs:{perPage:1,paginationEnabled:!1,easing:"cubic-bezier(0.165, 0.84, 0.44, 1)"},on:{pageChange:t.handlePageChange}},[s("slide",{staticClass:"b-application__section"},[s("div",{staticClass:"b-application__wrapper b-application__wrapper--timer"},[s("timer",{attrs:{focus:t.focus}}),t._v(" "),s("controls",{attrs:{focus:t.focus}})],1)]),t._v(" "),s("slide",{staticClass:"b-application__section"},[s("div",{staticClass:"b-application__wrapper b-application__wrapper--settings"},[s("settings",{ref:"settings",attrs:{focus:t.focus}})],1)])],1)],1)])])},n=[],a={render:i,staticRenderFns:n};e.a=a}},[112]);