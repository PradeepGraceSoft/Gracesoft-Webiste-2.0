// override the hbspt functionality while hubspot is loading
var hbspt = {
  //push form to hubcache queue
  forms: {
    create: function (c) {
      hubspot.forms.push(c);
    },
  },
};

// cache hubspot forms here
var hubcache = {
  forms: [],
  letsgo: function () {
    for (var i in hubspot.forms) {
      //hubspot is now loaded
      hbspt.forms.create(hubcache.forms[i]);
    }
  },
};

window.loadAsyncJs('_hcms/forms/v2.js', hubcache.letsgo);
