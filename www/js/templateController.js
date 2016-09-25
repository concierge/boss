bossControllers.controller('TemplateController', ['$scope', '$location', 'socket',
    function ($scope, $location, socket) {
        $scope.appName = AppName;
        $scope.offline = false;

        $scope.getRoutes = function() {
            return routes;
        }

        $scope.current = function (currLocation) {
            return $location.path().startsWith(currLocation);
        };

        socket.on('disconnect', () => {
            $scope.offline = true;
        });

        socket.on('reconnect', () => {
            $scope.offline = false;
        });
    }
]);
