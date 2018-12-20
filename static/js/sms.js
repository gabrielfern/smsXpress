angular.module('smsXpress', [])
.controller('sms', function($scope) {
  $scope.protocol = 'Protocol: '
  $scope.numbersCheck = 'Numbers: '
  $scope.messageCheck = 'Message: '
  $scope.sendSms = function() {
    fetch('/api/sms', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        create: true,
        numbers: $scope.numbers,
        message: $scope.message,
      })
    })
      .then(resp => {
        if (resp.status < 300) {
          return resp.json()
        }
      })
      .then(json => {
        $scope.protocol = 'Protocol: ' + json.protocol
        $scope.$apply()
      })
  }

  $scope.getSms = function() {
    fetch('/api/sms', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        protocol: $scope.protocolCheck,
      })
    })
      .then(resp => {
        if (resp.status < 300) {
          return resp.json()
        }
      })
      .then(json => {
        $scope.numbersCheck = 'Numbers: ' + json.numbers
        $scope.messageCheck = 'Message: ' + json.message
        $scope.$apply()
      })
  }
})
