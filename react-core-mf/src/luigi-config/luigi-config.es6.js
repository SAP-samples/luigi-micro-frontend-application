Luigi.setConfig({
  navigation: {
    nodes: () => [
      {
        pathSegment: 'home',
        label: 'Home',
        icon: 'home',
        viewUrl: '/sampleapp.html#/home',
        children: [
          {
            pathSegment: 'product',
            label: 'First',
            icon: 'nutrition-activity',
            viewUrl: '/sampleapp.html#/product',
            keepSelectedForChildren: true,
            children: [{
                pathSegment: ':id',
                viewUrl: '/sampleapp.html#/productDetail/:id'
            }]
          },
        ]
      }
    ]
  },
  settings: {
    header: {
      title: 'Luigi React App',
      logo: '/logo.png'
    },
    responsiveNavigation: 'simpleMobileOnly'
  }
});
