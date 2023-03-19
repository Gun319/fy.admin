import $http from './Interceptor';

interface loginData {
  userName: string,
  password: string;
}

export default {
  login(data: loginData) {
    return $http({ url: "/WeatherForecast", method:"post",  data });
  }
};
