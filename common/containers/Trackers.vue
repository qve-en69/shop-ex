<template></template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'Trackers',
  methods: {
    intercomInit() {
      // https://developers.intercom.com/installing-intercom/docs/javascript-api-attributes-objects
      window.intercomSettings = {
        app_id: this.$env.INTERCOM_APP_ID,
        name: `${this.user?.first_name || ''} ${this.user?.last_name || ''}`.trim(),
        hide_default_launcher: true,
        email: this.user?.email,
        phone: this.user?.phone_number,
        created_at: !this.user ? null : Math.floor(new Date(this.user.created_at).getTime() / 1000),
        user_id: this.user?.id.toString(),
        user_hash: this.user?.intercom_user_hash,
        is_influencer: this.user?.is_influencer,
        is_merchant: this.user?.is_merchant,
        has_orders: this.user?.has_orders
      };

      (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/vtipe3ia';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
    }
  },
  computed: {
    ...mapState('auth', {
      user: state => state.info
    })
  },
  created() {
    const isTrackersEnabled = this.$env.ENVIRONMENT === 'production';
    if (isTrackersEnabled) {
      this.intercomInit();
    }
  }
}
</script>
