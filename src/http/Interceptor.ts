import axios from 'axios';
import { ElMessage } from 'element-plus';

// 创建axios实例
const $http = axios.create({
  // 请求的域名，基本地址
  baseURL: "/api",
  // 跨域请求时发送Cookie
  // withCredentials: true,

  // 超时时间
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
});

// 请求拦截器
$http.interceptors.request.use((config) => {
  config.headers = config.headers || {};
  if (localStorage.getItem("token")) {
    
  }
  return config;
});

// 响应拦截器
$http.interceptors.response.use((response) => {
  return response;
}, (error) => {
  ResponseProcessing(error);
});

/**
 * 响应处理
 * @param error 
 * @returns 
 */
const ResponseProcessing = (error: { response: { status: any; data: any; }; }) => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        ElMessage.warning("资源没有访问权限！");
        break;
      case 404:
        ElMessage.warning("接口不存在，请检查接口地址是否正确！");
        break;
      case 500:
        ElMessage.warning("内部服务器错误，请联系系统管理员！");
        break;
      default:
        return Promise.reject(error.response.data); // 返回接口返回的错误信息
    }
  } else {
    ElMessage.error("遇到跨域错误，请设置代理或者修改后端允许跨域访问！");
  }
};

export default $http;