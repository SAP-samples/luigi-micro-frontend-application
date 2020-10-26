var luigiConfig = {
    navigation: {
      nodeAccessibilityResolver: nodeAccessibilityResolver,
      nodes: () => [
          {
            pathSegment: 'home',
            label: 'Home',
            icon: 'home',
            viewUrl: '/app.html#/home',
            children: [{
                pathSegment: 'products',
                label: 'PRODUCTS',
                icon: 'list',
                viewUrl: '/app.html#/products',
                keepSelectedForChildren: true,
                children: [{
                    pathSegment: ':id',
                    viewUrl: '/app.html#/productDetail/:id'
                }]
            },{
                pathSegment: 'order',
                label: 'ORDERHISTORY',
                icon: 'history',
                viewUrl: 'http://localhost:8080/index.html'
            }]
          },
          {
            pathSegment: 'doc',
            label: 'Luigi Doc',
            icon: 'document',
            externalLink: {
              url: 'https://docs.luigi-project.io/',
              sameWindow: false
            }
          }
      ]
    },
    settings: {
      header: {
        title: 'Luigi Application',
        logo: '/logo.png'
      },
      responsiveNavigation: 'simpleMobileOnly',
      customTranslationImplementation: myTranslationProvider
    },
    lifecycleHooks: {
      luigiAfterInit: () => {
        Luigi.i18n().setCurrentLocale(defaultLocale);
      }
    },
    communication: {
      customMessagesListeners: {
        'set-language': (msg) => {
          Luigi.i18n().setCurrentLocale(msg.locale);
        }
      }
    }
};

var isLocalhost8080ready = false;
const URL = 'http://localhost:8080';


fetch(URL)
    .then(response => {
        if (response && response.status === 200) {
            isLocalhost8080ready = true;
        }
        Luigi.setConfig(luigiConfig);
    })
    .catch(error => {
        console.warn('Server for UI5 micro-frontend on localhost:8080 not running, not showing order history tab', error);
        Luigi.setConfig(luigiConfig);
    });

var defaultLocale = 'en-US';
function myTranslationProvider() {
  var dict = {
    'de-DE': { PRODUCTS: 'Produkte', 'ORDERHISTORY': 'Bestellungen' },
    'en-US': { PRODUCTS: 'Products', 'ORDERHISTORY': 'Order History' }
  };
  return {
    getTranslation: function (label, interpolation, locale) {
      return dict[locale || Luigi.i18n().getCurrentLocale() || defaultLocale][label] || label;
    }
  }
};

function nodeAccessibilityResolver(nodeToCheckPermissionFor, parentNode, currentContext) {
    // take care only of the nodes of server 8080
    if (nodeToCheckPermissionFor.viewUrl && nodeToCheckPermissionFor.viewUrl.startsWith(URL)) {
        return isLocalhost8080ready;
    }

    return true;
};
