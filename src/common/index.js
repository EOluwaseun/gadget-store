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
};
export default SummaryApi;
