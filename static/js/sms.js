angular.module('smsXpress', [])
.controller('sms', function($scope) {
  $scope.protocol = 'Esse é seu protocolo: '
  $scope.numbersCheck = 'Números: '
  $scope.messageCheck = 'Mensagem: '
  $scope.showConfirmation = false
  $scope.showProtocol = false
  $scope.price = 0

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

  $scope.calculatePrice = function() {
    if ($scope.numbers && $scope.message) {
      let nums = $scope.numbers.replace(/[\s+]/g, '')
      let messg = $scope.message.replace(/\s/g, '')
      $scope.price += nums.length/8*0.10
      $scope.price += messg.length/10*0.05
    } else {
      $scope.price = 0
    }
  }
})
