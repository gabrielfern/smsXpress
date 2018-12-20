angular.module('smsXpress', [])
.controller('sms', function($scope) {
  $scope.sendSms = function() {
    fetch('/api/sms', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: $scope.numbers,
        message: $scope.message,
      })
    })
  }
})
