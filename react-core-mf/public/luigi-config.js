Luigi.setConfig({
  navigation: {
    nodes: () => [
      {
        pathSegment: "home",
        label: "Home",
        icon: "home",
        viewUrl: "/sampleapp.html#/microfrontend/home",
        children: [
          {
            pathSegment: "products",
            label: "Products",
            icon: "product",
            viewUrl: "/sampleapp.html#/microfrontend/products",
            keepSelectedForChildren: true,
            children: [{
              pathSegment: ':id',
              viewUrl: '/sampleapp.html#/microfrontend/productDetail/:id',
              context: { id: ':id' }
            }]
          },
          {
            pathSegment: 'order',
            label: 'Order History',
            icon: 'history',
            viewUrl: 'http://localhost:8080/index.html'
          }
        ],
      },
    ],
  },
  settings: {
    header: { title: "Luigi React App", logo: "/logo.png" },
    responsiveNavigation: "simpleMobileOnly",
    customTranslationImplementation: myTranslationProvider,
  },
  lifecycleHooks: {
    luigiAfterInit: () => {
      Luigi.i18n().setCurrentLocale(defaultLocale);
    },
  },
  communication: {
    customMessagesListeners: {
      "set-language": (msg) => {
        Luigi.i18n().setCurrentLocale(msg.locale);
      },
    },
  },
});

var defaultLocale = "en-US";
function myTranslationProvider() {
  var dict = {
    "en-US": { PRODUCTS: "Products", ORDERHISTORY: "Order History" },
    "de-DE": { PRODUCTS: "Produkte", ORDERHISTORY: "Bestellungen" },
  };
  return {
    getTranslation: function (label, interpolation, locale) {
      const local = locale || Luigi.i18n().getCurrentLocale() || defaultLocale
      return (
        dict[local][label] || label
      );
    },
  };
}