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
};
export default SummaryApi;
