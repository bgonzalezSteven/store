
const routes = [
  {
    path: '/menu',
    component: () => import('layouts/Menu.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      // Rutas para el acceso del sistema
      { path: '/rol', component: () => import('pages/Admin/Role/List.vue'), meta: { permission: 'configuration.role'} },
      { path: '/rol/agg_rol', component: () => import('pages/Admin/Role/Form.vue'), meta: { permission: 'configuration.role'} },
      { path: '/rol/edit_rol/:id', component: () => import('pages/Admin/Role/Form.vue'), meta: { permission: 'configuration.role'} },
      // Rutas de listado de usuarios registrados
      { path: '/control', component: () => import('pages/Admin/Business/List.vue'), meta: { permission: 'configuration.bussines' } },
      // Rutas del negocio
      { path: '/information', component: () => import('pages/Store/Information/Form.vue'), meta: { permission: 'bussines.information' } },
      // Rutas para los productos
      { path: '/product', component: () => import('pages/Store/Inventory/products/List.vue'), meta: { permission: 'bussines.inventories'} },
      { path: '/product/agg_product', component: () => import('pages/Store/Inventory/products/Form.vue'), meta: { permission: 'bussines.inventories'} },
      { path: '/product/edit_product/:id', component: () => import('pages/Store/Inventory/products/Form.vue'), meta: { permission: 'bussines.inventories'} },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
  },
  {
    path: '/register',
    component: () => import('layouts/LoginLayout.vue'),
  },
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
