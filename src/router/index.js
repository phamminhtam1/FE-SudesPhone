import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminLogin from '@/views/Admin/LoginPage.vue'
import RegisterPage from '@/views/Admin/RegisterPage.vue'
import DashboardPage from '@/views/Admin/DashboardPage.vue'
import ListBranch from '@/views/Admin/Branch/ListBranch.vue'
import CreateBrand from '@/views/Admin/Branch/CreateBrand.vue'
import EditBranch from '@/views/Admin/Branch/EditBranch.vue'
import ListUser from '@/views/Admin/User/ListUser.vue'
import ListRole from '@/views/Admin/Role/ListRole.vue'
import CreateRole from '@/views/Admin/Role/CreateRole.vue'
import EditRole from '@/views/Admin/Role/EditRole.vue'
import CreateUser from '@/views/Admin/User/CreateUser.vue'
import EditUser from '@/views/Admin/User/EditUser.vue'
import ListCategory from '@/views/Admin/Category/ListCategory.vue'
import CreateCategory from '@/views/Admin/Category/CreateCategory.vue'
import EditCategory from '@/views/Admin/Category/EditCategory.vue'
import ListProduct from '@/views/Admin/Product/ListProduct.vue'
import ShowProductDetail from '@/views/Admin/Product/ShowProductDetail.vue'
import CreateProduct from '@/views/Admin/Product/CreateProduct.vue'
import EditProduct from '@/views/Admin/Product/EditProduct.vue'
import ListSupplier from '@/views/Admin/Supplier/ListSupplier.vue'
import CreateSupplier from '@/views/Admin/Supplier/CreateSupplier.vue'
import EditSupplier from '@/views/Admin/Supplier/EditSupplier.vue'
import ListStockReceipt from '@/views/Admin/Stock/ListStockReceipt.vue'
import CreateStockReceipt from '@/views/Admin/Stock/CreateStockReceipt.vue'
import DetailStockReceipt from '@/views/Admin/Stock/DetailStockReceipt.vue'
import LoginCustomerPage from '@/views/LoginCustomerPage.vue'
import RegisterCustomerPage from '@/views/RegisterCustomerPage.vue'
import ProfileCustomerPage from '@/views/ProfileCustomerPage.vue'
import ProductDetail from '@/views/ProductDetail.vue'
import CategroyPage from '@/views/CategroyPage.vue'
import CartPage from '@/views/CartPage.vue'
import FrontendLayout from '@/components/layout/frontend/FrontendLayout.vue'
import CheckoutPage from '@/views/CheckoutPage.vue'
import CheckoutDonePage from '@/views/CheckoutDonePage.vue'
import ThankYouPage from '@/views/ThankYouPage.vue'
import OrderDetailPage from '@/views/OrderDetailPage.vue'
import ListCustomer from '@/views/Admin/Customer/ListCustomer.vue'
import CustomerDetail from '@/views/Admin/Customer/CustomerDetail.vue'
import OrderManagerment from '@/views/Admin/Customer/OrderManagerment.vue'

// Branch routes
const branchRoutes = [
  {
    path: '/admin/branch',
    name: 'branch',
    component: ListBranch,
    meta: { requiresAuth: true, name_page: 'Danh sách chi nhánh' },
  },
  {
    path: '/admin/branch/create',
    name: 'create_branch',
    component: CreateBrand,
    meta: { requiresAuth: true, name_page: 'Thêm chi nhánh' },
  },
  {
    path: '/admin/branch/edit/:id',
    name: 'edit_branch',
    component: EditBranch,
    props: true,
    meta: { requiresAuth: true, name_page: 'Chỉnh sửa chi nhánh' },
  },
]

// Role routes
const roleRouters = [
  {
    path: '/admin/user/role',
    name: 'role',
    component: ListRole,
    meta: { requiresAuth: true, name_page: 'Danh sách phân quyền' },
  },
  {
    path: '/admin/user/role/create',
    name: 'create_role',
    component: CreateRole,
    meta: { requiresAuth: true, name_page: 'Thêm phân quyền' },
  },
  {
    path: '/admin/user/role/edit/:id',
    name: 'edit_role',
    component: EditRole,
    props: true,
    meta: { requiresAuth: true, name_page: 'Chỉnh sửa phân quyền' },
  },
]

// User routes
const userRouters = [
  {
    path: '/admin/user',
    name: 'user',
    component: ListUser,
    meta: { requiresAuth: true, name_page: 'Danh sách nhân sự' },
  },
  {
    path: '/admin/user/create',
    name: 'create_user',
    component: CreateUser,
    meta: { requiresAuth: true, name_page: 'Thêm nhân sự' },
  },
  {
    path: '/admin/user/edit/:id',
    name: 'edit_user',
    component: EditUser,
    props: true,
    meta: { requiresAuth: true, name_page: 'Chỉnh sửa nhân sự' },
  },
]

//Category routes
const categoryRouters = [
  {
    path: '/admin/category',
    name: 'category',
    component: ListCategory,
    meta: { requiresAuth: true, name_page: 'Quản lý danh mục' },
  },
  {
    path: '/admin/category/create',
    name: 'create_category',
    component: CreateCategory,
    meta: { requiresAuth: true, name_page: 'Thêm danh mục' },
  },
  {
    path: '/admin/category/edit/:id',
    name: 'edit_category',
    component: EditCategory,
    props: true,
    meta: { requiresAuth: true, name_page: 'Chỉnh sửa danh mục' },
  },
]

const productRouters = [
  {
    path: '/admin/category/product',
    name: 'product',
    component: ListProduct,
    meta: { requiresAuth: true, name_page: 'Danh sách sản phẩm' },
  },
  {
    path: '/admin/category/product/show/:id',
    name: 'show_product_detail',
    props: true,
    component: ShowProductDetail,
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/category/product/create',
    name: 'create_product',
    component: CreateProduct,
    meta: { requiresAuth: true, name_page: 'Thêm sản phẩm' },
  },
  {
    path: '/admin/category/product/edit/:id',
    name: 'edit_product',
    props: true,
    component: EditProduct,
    meta: { requiresAuth: true, name_page: 'Chỉnh sửa sản phẩm' },
  },
]

const supplierRouters = [
  {
    path: '/admin/purchase/supplier',
    name: 'supplier',
    component: ListSupplier,
    meta: { requiresAuth: true, name_page: 'Danh sách nhà cung cấp' },
  },
  {
    path: '/admin/purchase/supplier/create',
    name: 'create_supplier',
    component: CreateSupplier,
    meta: { requiresAuth: true, name_page: 'Thêm nhà cung cấp' },
  },
  {
    path: '/admin/purchase/supplier/edit/:id',
    name: 'edit_supplier',
    component: EditSupplier,
    props: true,
    meta: { requiresAuth: true, name_page: 'Chỉnh sửa nhà cung cấp' },
  },
]

const StockReceipt = [
  {
    path: '/admin/purchase/stock-receipt',
    name: 'stock-receipt',
    component: ListStockReceipt,
    meta: { requiresAuth: true, name_page: 'Quản lý nhập kho' },
  },
  {
    path: '/admin/purchase/stock-receipt/create',
    name: 'create_stock-receipt',
    component: CreateStockReceipt,
    meta: { requiresAuth: true, name_page: 'Tạo phiếu nhập kho' },
  },
  {
    path: '/admin/purchase/stock-receipt/detail/:id',
    name: 'detail-stock-receipt',
    component: DetailStockReceipt,
    props: true,
    meta: { requiresAuth: true, name_page: 'Kiểm tra phiếu nhập kho' },
  },
]

const customerRouters = [
  {
    path: '/admin/customer',
    name: 'customer',
    component: ListCustomer,
    meta: { requiresAuth: true, name_page: 'Danh sách khách hàng' },
  },
  {
    path: '/admin/customer/detail/:id',
    name: 'customer-detail',
    component: CustomerDetail,
    props: true,
    meta: { requiresAuth: true, name_page: 'Chi tiết khách hàng' },
  },
  {
    path: '/admin/customer/order-management',
    name: 'order-management',
    component: OrderManagerment,
    meta: { requiresAuth: true, name_page: 'Quản lý đơn hàng' },
  },
]

const FERouters = [
  {
    path: '/',
    component: FrontendLayout,
    meta: { breadcrumb: 'Trang chủ' },
    children: [
      { path: '', name: 'home', component: HomeView },
      {
        path: '/product-detail/:id',
        name: 'product-detail',
        component: ProductDetail,
        props: true,
        meta: { breadcrumb: 'productName' },
      },
      {
        path: '/category/:id',
        name: 'fe-category',
        component: CategroyPage,
        props: true,
        meta: { breadcrumb: 'categoryName' },
      },
      {
        path: '/login-customer',
        name: 'login-customer',
        component: LoginCustomerPage,
      },
      {
        path: '/register-customer',
        name: 'register-customer',
        component: RegisterCustomerPage,
      },
      {
        path: '/profile-customer',
        name: 'profile-customer',
        component: ProfileCustomerPage,
      },
      {
        path: '/cart',
        name: 'my-cart',
        component: CartPage,
      },
    ],
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: CheckoutPage,
  },
  {
    path: '/checkout/thankyou',
    name: 'thank-you',
    component: ThankYouPage,
  },
  {
    path: '/checkout/thank-you',
    name: 'checkoutdone',
    component: CheckoutDonePage,
  },
  {
    path: '/order/:id',
    name: 'orderdetail',
    component: OrderDetailPage,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin/login',
      name: 'login',
      component: AdminLogin,
    },
    {
      path: '/admin/register',
      name: 'register',
      component: RegisterPage,
    },
    {
      path: '/admin/dasboard',
      name: 'dasboard',
      component: DashboardPage,
      meta: { requiresAuth: true, name_page: 'Trang chủ' },
    },
    ...branchRoutes,
    ...userRouters,
    ...roleRouters,
    ...categoryRouters,
    ...productRouters,
    ...supplierRouters,
    ...StockReceipt,
    ...customerRouters,
    ...FERouters,
  ],
  scrollBehavior(to, from, savedPosition) {
    // Nếu có savedPosition (reload hoặc back/forward), trả về vị trí đó
    if (savedPosition) {
      return savedPosition
    }
    // Nếu là chuyển route, scroll lên đầu
    return { top: 0 }
  },
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!token) {
      return next({
        path: '/admin/login',
        query: { redirect: to.fullPath },
      })
    }
    next()
  } else {
    next()
  }
})

export default router
