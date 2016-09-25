bossControllers.controller('AuditController', ['$scope', '$http', 'socket', function ($scope, $http, socket) {
    $scope.logs = [];

    $scope.determineType = (logAction) => {
        if (logAction.toLowerCase().indexOf('door') >= 0) {
            return 'door';
        }
        return 'video';
    };

    let getAuditLog = () => {
        $http.get('/api/auditLog').then((response) => {
            $scope.logs = response.data.data;
        });
    };

    socket.on('state', getAuditLog);
    socket.on('videos', getAuditLog);

    getAuditLog();
}]);
