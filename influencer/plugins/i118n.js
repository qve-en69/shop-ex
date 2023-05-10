export default ({ app }, inject) => {
 const t = (str, params) => {
    return app.i18n.t(str, params) ? app.i18n.t(str, params) : str;
 }

  inject('t', t)
};
