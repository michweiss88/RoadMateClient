angular.module('starter')

.constant('SERVER_API_URL', "http://road-mate.herokuapp.com/api/v1/")

.constant('USER_DATA_KEYS', {
    token: 'token',
    phoneNumber: 'phone_number',
    imei: 'imei'
})

.constant('GPS_CONFIG', {
    GpsInterval: 3000 //msec
})