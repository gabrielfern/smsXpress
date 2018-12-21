angular.module('smsXpress', [])
.controller('sms', function($scope) {
  $scope.protocol = 'Protocolo: '
  $scope.numbersCheck = 'Números: '
  $scope.messageCheck = 'Mensagem: '
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
        $scope.showProtocol = true
        $scope.protocol = 'Protocolo: ' + json.protocol
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
