export default {
  isContacts: false,
  customShowListable: 'Mostrar',
  listCustomerInfo: false,
  loggingIn: false,
  loginError: null,
  menu: [
    {
      name: 'Brokers',
      permission: 'users',
      url: '/users',
      icon: 'group'
    },
    {
      name: 'Contactos',
      icon: 'person',
      permission: 'contacts',
      url: '/contacts'
    },
    {
      name: 'Pólizas',
      icon: 'attach_money',
      permission: 'sales',
      url: '',
      children: [
        {
          name: 'Salud',
          permission: 'sales.health',
          url: '/health/new'
        },
        {
          name: 'Vehiculo',
          permission: 'sales.vehicle',
          url: '/vehicle/new'
        }
      ]
    },
    {
      name: 'Clientes',
      icon: 'how_to_reg',
      permission: 'customers',
      url: '',
      children: [
        {
          name: 'Lista de Clientes',
          permission: 'customers.listCustomers',
          url: '/customers/list'
        },
        {
          name: 'Cumpleaños de Clientes',
          permission: 'customers.birthday',
          url: '/customers/birthday'
        },
        {
          name: 'Listado de Polizas Activas',
          permission: 'customers.policies',
          url: '/customers/policies'
        }
      ]
    },
    {
      name: 'Renovaciones',
      icon: 'autorenew',
      permission: 'renovations',
      children: [
        {
          name: 'Pólizas a Vencer',
          permission: 'renovations.listRenovations',
          url: '/renovationsSoon'
        },
        {
          name: 'Pólizas Vencidas',
          permission: 'renovations.birthday',
          url: '/renovationsExpired'
        }
      ]
    },
    {
      name: 'Pagos de Clientes',
      icon: 'payment',
      permission: 'Permiso1'
    },
    {
      name: 'Correo',
      permission: 'emails',
      icon: 'email',
      url: '',
      children: [
        {
          name: 'Configurar Correo',
          permission: 'emails.configuration',
          url: '/emails'
        },
        {
          name: 'Eventos',
          permission: 'emails.events',
          url: '/emailsEvents'
        },
        {
          name: 'Formatos',
          permission: 'emails.formats',
          url: '/emailsFormats'
        },
        {
          name: 'Enviar Correos',
          permission: 'emails.sendEmails',
          url: '/sendEmails'
        }
      ]
    },
    {
      name: 'Cobranzas',
      icon: 'payment',
      permission: 'collections',
      url: '/collections'
    },
    {
      name: 'Reportes',
      icon: 'assignment',
      permission: 'reports',
      children: [
        {
          name: 'Reportes de Ventas',
          permission: 'reports.sales',
          url: '/reportSales'
        },
        {
          name: 'Salud Detallado',
          permission: 'reports.detailHealth',
          url: '/detailsHealth'
        },
        {
          name: 'Comisiones Salud',
          permission: 'reports.comissionsHealth',
          url: '/comissionsHealth'
        }
      ]
    }

  ],
  mainConfiguration: [
    {
      icon: 'settings',
      permission: 'configuration',
      url: '',
      children: [
        {
          name: 'Tipo de Seguro',
          permission: 'configuration.insuranceTypes',
          url: '/insuranceTypes'
        },
        {
          name: 'Frecuencia de Pago',
          permission: 'configuration.frecuencyPayments',
          url: '/frecuencyPayments'
        },
        {
          name: 'Aseguradoras',
          permission: 'configuration.insurers',
          url: '/insurers'
        },
        {
          name: 'Forma de Pago',
          permission: 'Permiso1'
        },
        {
          name: 'Aseguradoras',
          permission: 'Permiso1'
        },
        {
          name: 'Servicios y Productos',
          permission: 'Permiso1'
        },
        {
          name: 'Roles',
          permission: 'configuration.roles',
          url: '/roles'
        },
        {
          name: 'Permisos',
          permission: 'configuration.permissions',
          url: '/permissions'
        },
        {
          name: 'Planes',
          permission: 'configuration.plans',
          url: '/plans'
        },
        {
          name: 'Formas de Pago',
          permission: 'configuration.payment_methods',
          url: '/paymentMethods'
        },
        {
          name: 'Marcas de Vehiculo',
          permission: 'configuration.vehicleBrands',
          url: '/vehicleBrands'
        }
      ]
    }
  ],
  userInfo: null,
  currentModel: null,
  currentModule: null,
  sessionInfo: null
}
