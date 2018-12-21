angular.module('smsXpress', [])
.controller('sms', function($scope) {
  $scope.protocol = 'Esse é seu protocolo: '
  $scope.numbersCheck = 'Números: '
  $scope.messageCheck = 'Mensagem: '
  $scope.showConfirmation = false
  $scope.showProtocol = false
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
        $scope.showConfirmation = false
        $scope.showProtocol = true
        $scope.protocol = 'Esse é seu protocolo: ' + json.protocol
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
        $scope.numbersCheck = 'Números: ' + json.numbers
        $scope.messageCheck = 'Mensagem: ' + json.message
        $scope.$apply()
      })
  }
})
