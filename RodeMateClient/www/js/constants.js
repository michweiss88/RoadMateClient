angular.module('starter')


.constant('SERVER_API_URL', "http://192.168.1.19:3333/api/v1")

.constant('USER_DATA_KEYS', {
    token: 'token',
    phoneNumber: 'phone_number',
    imei: 'imei'
})

.constant('CONTACTS_CONFIG', {
    fileName: 'contacts.txt'
})
.constant('GPS_CONFIG', {
    GpsInterval: 3000 //msec
})