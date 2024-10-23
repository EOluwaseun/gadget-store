const backendDomain = 'http://localhost:5000';

const SummaryApi = {
  signUp: {
    url: `${backendDomain}/api/sign-up`,
    method: 'post',
  },
  signIn: {
    url: `${backendDomain}/api/sign-in`,
    method: 'post',
  },
  current_user: {
    url: `${backendDomain}/api/user-details`,
    method: 'get',
  },
  userLogout: {
    url: `${backendDomain}/api/user-logout`,
    method: 'get',
  },
  allUsers: {
    url: `${backendDomain}/api/all-users`,
    method: 'get',
  },
  updateUsers: {
    url: `${backendDomain}/api/update-users`,
    method: 'post',
  },
  uploadProduct: {
    url: `${backendDomain}/api/upload-product`,
    method: 'post',
  },
  allProduct: {
    url: `${backendDomain}/api/all-product`,
    method: 'get',
  },
  updateProduct: {
    url: `${backendDomain}/api/update-product`,
    method: 'post',
  },
  getProductCategory: {
    url: `${backendDomain}/api/get-categoryProduct`,
    method: 'get',
  },
  categoryWiseProduct: {
    url: `${backendDomain}/api/category-product`,
    method: 'post',
  },

  productDetail: {
    url: `${backendDomain}/api/product-details`,
    method: 'post',
  },
  addProductToCart: {
    url: `${backendDomain}/api/addtocart`,
    method: 'post',
  },
  addProductToCartCount: {
    url: `${backendDomain}/api/countAddToCart`,
    method: 'get',
  },
  addToCartView: {
    url: `${backendDomain}/api/viewCartProduct`,
    method: 'get',
  },
  updateCartProduct: {
    url: `${backendDomain}/api/update-cart-product`,
    method: 'post',
  },
  deleteCartProduct: {
    url: `${backendDomain}/api/delete-cart-product`,
    method: 'post',
  },
  searchProduct: {
    url: `${backendDomain}/api/search`,
    method: 'get',
  },
  filterProduct: {
    url: `${backendDomain}/api/filter-product`,
    method: 'post',
  },
  payment: {
    url: `${backendDomain}/api/checkout`,
    method: 'post',
  },

  getOrder: {
    url: `${backendDomain}/api/order-list`,
    method: 'get',
  },

  allOrder: {
    url: `${backendDomain}/api/all-order`,
    method: 'get',
  },
};
export default SummaryApi;
