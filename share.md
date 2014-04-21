---
layout: main-sharing
title: HDI Explorer
---

{% include country-information.html %}

<div class="container-fluid">
    <div class="row">
        <div class="col-md-8" id="chart"></div>
        <div class="col-md-4">
            <div class="country-summary container-fluid" id="table">
            </div>


            <!-- Sharing Buttons -->
            <div class="sharing">

                <!-- Twitter 'share a link' -->
                <a href="https://twitter.com/share" class="twitter-share-button"
                    data-url="http://hdi-explorer.s3-website-us-east-1.amazonaws.com/"
                    data-text="Human Development Index Explorer" data-via="pnavarrc"
                    data-count="none"
                    data-dnt="true">Tweet</a>

                <div class="fb-share-button"
                  data-href="http://hdi-explorer.s3-website-us-east-1.amazonaws.com/"
                  data-type="button"></div>

                <div class="g-plusone"
                  data-size="medium"
                  data-annotation="none"
                  data-href="http://hdi-explorer.s3-website-us-east-1.amazonaws.com/">
                </div>

            </div>
        </div>
    </div>
</div>

<script src="{{ site.baseurl }}/dependencies.min.js"></script>
<script src="{{ site.baseurl }}/hdi.min.js"></script>


<!-- Twitter Share a link -->
<script>
!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');
</script>

<!-- Facebook -->
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>

<!-- Google Plus -->
<script type="text/javascript">
  (function() {
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/platform.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
  })();
</script>

<script>

  var dataRef = new Firebase('https://hdi-explorer.firebaseio.com/');

  dataRef.on('value', function(snapshot) {
    app.state.set('code', snapshot.val().code);
  });

  var updateFirebase = {};
  _.extend(updateFirebase, Backbone.Events);

  updateFirebase.listenTo(app.state, 'change:code', function(model) {
    dataRef.set({code: model.get('code')});
  });
</script>

